import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createClient, createServiceClient } from '@/lib/supabase/server';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2024-06-20' });

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

  // subscription mode: payment_status stays 'unpaid' but status becomes 'complete'
  // payment mode: payment_status becomes 'paid'
  const isComplete = session.status === 'complete' || session.payment_status === 'paid';

  if (!isComplete) {
    return NextResponse.json({ credited: false, reason: 'not_paid' });
  }

  // Fallback: add credits directly in case webhook hasn't fired yet.
  // credit_stripe_session is idempotent — safe to call even if webhook already ran.
  const plan    = session.metadata?.plan ?? 'pro';
  const credits = parseInt(session.metadata?.credits ?? '0', 10) || PLAN_CREDITS[plan] || 0;

  if (!credits) {
    console.error('[checkout-confirm] credits = 0 in metadata', sessionId);
    return NextResponse.json({ credited: false, reason: 'no_credits' });
  }

  const admin = createServiceClient();
  const { data: credited, error } = await admin.rpc('credit_stripe_session', {
    p_session_id: sessionId,
    p_user_id:    user.id,
    p_credits:    credits,
    p_plan:       plan,
  });

  if (error) {
    console.error('[checkout-confirm] rpc error:', error);
    // Session is complete — credits will arrive via webhook
    return NextResponse.json({ credited: false, pending: true });
  }

  if (credited) {
    console.log(`[checkout-confirm] +${credits} credits → user ${user.id} (session: ${sessionId})`);
  } else {
    console.log(`[checkout-confirm] session ${sessionId} already credited by webhook`);
  }

  return NextResponse.json({ credited: true });
}
