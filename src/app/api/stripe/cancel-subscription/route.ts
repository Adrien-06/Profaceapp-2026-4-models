import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createClient } from '@/lib/supabase/server';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2023-10-16' });

export async function POST(req: Request) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { subscriptionId } = await req.json();

  if (!subscriptionId || typeof subscriptionId !== 'string') {
    return NextResponse.json({ error: 'Missing or invalid subscriptionId' }, { status: 400 });
  }

  try {
    // Verify subscription belongs to this user
    const subscription = await stripe.subscriptions.retrieve(subscriptionId);

    if (subscription.metadata?.user_id !== user.id) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    // Cancel at period end (stop billing but keep access until renewal date)
    const updated = await stripe.subscriptions.update(subscriptionId, {
      cancel_at_period_end: true,
    });

    console.log(`[cancel-subscription] subscription ${subscriptionId} marked for cancellation at period end`);

    return NextResponse.json({
      success: true,
      subscription: {
        id: updated.id,
        cancel_at_period_end: updated.cancel_at_period_end,
        current_period_end: updated.current_period_end,
      },
    });
  } catch (error: unknown) {
    const e = error as { status?: number; message?: string };
    console.error('[cancel-subscription] error:', e);
    return NextResponse.json(
      { error: e?.message ?? 'Failed to cancel subscription' },
      { status: e?.status ?? 500 }
    );
  }
}
