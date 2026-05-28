import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createClient, createServiceClient } from '@/lib/supabase/server';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2023-10-16' });

const PLAN_CREDITS: Record<string, number> = {
  oneshot: 400,
  pro:     1000,
  max:     2500,
};

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const sessionId = searchParams.get('session_id');

  if (!sessionId) {
    return NextResponse.json({ error: 'Missing session_id' }, { status: 400 });
  }

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  let session: Stripe.Checkout.Session;
  try {
    session = await stripe.checkout.sessions.retrieve(sessionId);
  } catch {
    return NextResponse.json({ error: 'Invalid session' }, { status: 400 });
  }

  if (session.payment_status !== 'paid') {
    return NextResponse.json({ credited: false, reason: 'not_paid' });
  }

  // Verify the session belongs to this user
  const sessionUserId = session.metadata?.user_id;
  if (sessionUserId && sessionUserId !== user.id) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  const plan    = session.metadata?.plan ?? 'pro';
  const credits = parseInt(session.metadata?.credits ?? '0', 10) || PLAN_CREDITS[plan] || 0;

  if (credits > 0) {
    const admin = createServiceClient();
    const { data: credited, error: rpcError } = await admin.rpc('credit_stripe_session', {
      p_session_id: sessionId,
      p_user_id:    user.id,
      p_credits:    credits,
      p_plan:       plan,
    });

    if (rpcError) {
      console.error('[checkout-confirm] rpc error:', rpcError);
    } else if (credited) {
      console.log(`[checkout-confirm] fallback credit: +${credits} → user ${user.id} (plan: ${plan}, session: ${sessionId})`);
    } else {
      console.log(`[checkout-confirm] session ${sessionId} already credited by webhook`);
    }
  }

  console.log(`[checkout-confirm] payment confirmed for session ${sessionId} (user: ${user.id})`);
  return NextResponse.json({ credited: true });
}
