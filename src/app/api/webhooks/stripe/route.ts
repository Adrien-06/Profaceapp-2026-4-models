import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createServiceClient } from '@/lib/supabase/server';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2024-11-20' });

const PLAN_CREDITS: Record<string, number> = {
  oneshot: 400,
  pro:     1000,
  max:     2500,
};

async function addCredits(
  userId: string | null,
  email: string | null,
  credits: number,
  plan: string,
  sessionId: string,
  billing?: string,
  subscriptionId?: string,
) {
  const supabase = createServiceClient();

  if (!userId && !email) {
    console.error('[stripe-webhook] no user_id or email in session', sessionId);
    return false;
  }

  // Resolve profile
  let query = supabase.from('profiles').select('id').limit(1);
  if (userId) {
    query = query.eq('id', userId);
  } else {
    query = query.eq('email', email!);
  }

  const { data: profiles, error: selectError } = await query;
  if (selectError || !profiles || profiles.length === 0) {
    console.error('[stripe-webhook] user not found', { userId, email, selectError });
    return false;
  }

  const profileId: string = profiles[0].id;

  // For yearly subscriptions: distribute credits monthly (12 months × monthly rate)
  if (billing === 'yearly' && subscriptionId) {
    const monthlyAmount = credits; // Pro: 1000/month, Max: 2500/month (not divided)
    const totalMonths = 12;

    // Create the monthly credits allocation record
    const { error: insertError } = await supabase
      .from('subscription_monthly_credits')
      .upsert({
        user_id: profileId,
        subscription_id: subscriptionId,
        total_credits: credits * totalMonths, // Total over 12 months
        monthly_credit_amount: monthlyAmount,
        billing_cycle_month: 0,
        total_months: totalMonths,
      });

    if (insertError) {
      console.error('[stripe-webhook] failed to create monthly credits allocation:', insertError);
      return false;
    }

    // Distribute first month credits + mark month 0 as distributed
    const { error: creditError } = await supabase.rpc('add_yearly_subscription_month_credit', {
      p_user_id: profileId,
      p_subscription_id: subscriptionId,
      p_monthly_amount: monthlyAmount,
    });

    if (creditError) {
      console.error('[stripe-webhook] failed to add first month credits:', creditError);
      return false;
    }

    console.log(`[stripe-webhook] yearly subscription setup: +${monthlyAmount} cr/month × ${totalMonths} months → user ${profileId}`);
    return true;
  }

  // For monthly subscriptions or one-time: apply all credits immediately via DB function
  const { data: credited, error: rpcError } = await supabase.rpc('credit_stripe_session', {
    p_session_id: sessionId,
    p_user_id: profileId,
    p_credits: credits,
    p_plan: plan,
  });

  if (rpcError) {
    console.error('[stripe-webhook] rpc error:', rpcError);
    return false;
  }

  if (credited) {
    console.log(`[stripe-webhook] +${credits} credits → user ${profileId} (plan: ${plan}, session: ${sessionId})`);
  } else {
    console.log(`[stripe-webhook] session ${sessionId} already credited, skipping`);
  }

  return true;
}

export async function POST(req: Request) {
  const body      = await req.text();
  const signature = req.headers.get('stripe-signature');
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event: Stripe.Event;

  if (webhookSecret && signature) {
    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Webhook verification failed';
      console.error('[stripe-webhook] verification failed:', msg);
      return new NextResponse(`Webhook Error: ${msg}`, { status: 400 });
    }
  } else {
    console.warn('[stripe-webhook] STRIPE_WEBHOOK_SECRET not set — skipping signature verification');
    try {
      event = JSON.parse(body) as Stripe.Event;
    } catch {
      return new NextResponse('Invalid JSON body', { status: 400 });
    }
  }

  // checkout.session.completed — fires for both subscription & one-time payments
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    const userId  = session.metadata?.user_id ?? null;
    const email   = session.customer_details?.email ?? session.metadata?.user_email ?? null;
    const plan    = session.metadata?.plan ?? 'pro';
    const billing = session.metadata?.billing ?? 'monthly';
    const credits = parseInt(session.metadata?.credits ?? '0', 10) || PLAN_CREDITS[plan] || 0;
    const subscriptionId = session.subscription as string | null;

    if (!credits) {
      console.error('[stripe-webhook] credits = 0, skipping', session.id);
      return NextResponse.json({ received: true });
    }

    await addCredits(userId, email, credits, plan, session.id, billing, subscriptionId ?? undefined);
  }

  // invoice.payment_succeeded — fires on subscription renewals
  if (event.type === 'invoice.payment_succeeded') {
    const invoice = event.data.object as Stripe.Invoice;
    // Only handle subscription renewals
    if (invoice.billing_reason !== 'subscription_cycle') {
      return NextResponse.json({ received: true });
    }

    const subscriptionId = typeof invoice.subscription === 'string'
      ? invoice.subscription
      : invoice.subscription?.id;

    if (!subscriptionId) return NextResponse.json({ received: true });

    const subscription = await stripe.subscriptions.retrieve(subscriptionId);
    const userId  = subscription.metadata?.user_id ?? null;
    const email   = invoice.customer_email ?? null;
    const plan    = subscription.metadata?.plan ?? 'pro';
    const billing = subscription.metadata?.billing ?? 'monthly';
    const credits = parseInt(subscription.metadata?.credits ?? '0', 10) || PLAN_CREDITS[plan] || 0;

    if (credits && userId) {
      if (billing === 'monthly') {
        // Monthly: add full credits immediately on each renewal
        await addCredits(userId, email, credits, plan, invoice.id, billing, subscriptionId);
      } else {
        // Yearly renewal (year 2+): reset the 12-month distribution cycle
        // and credit month 1 of the new cycle immediately
        const admin = createServiceClient();
        const { error: resetError } = await admin.rpc('reset_yearly_subscription_cycle', {
          p_user_id: userId,
          p_subscription_id: subscriptionId,
          p_monthly_amount: credits,
        });
        if (resetError) {
          console.error('[stripe-webhook] failed to reset yearly cycle:', resetError);
        } else {
          console.log(`[stripe-webhook] yearly subscription renewal (${subscriptionId}): new 12-month cycle started, +${credits} cr month 1`);
        }
      }
    }
  }

  return NextResponse.json({ received: true });
}
