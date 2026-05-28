'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';

type SubscriptionInfo = {
  id: string;
  plan: string;
  billing: 'monthly' | 'yearly';
  status: string;
  current_period_end: number;
  cancel_at_period_end: boolean;
};

const PLAN_NAMES = {
  pro: 'Pro',
  max: 'Max',
  oneshot: 'One-shot',
};

const PLAN_BENEFITS = {
  pro: ['1000 credits/month', '100 photos/month', 'Priority support'],
  max: ['2500 credits/month', '250 photos/month', 'Dedicated support', 'API access'],
  oneshot: ['400 credits', '40 photos', 'One-time payment'],
};

export default function ChangePlanClient() {
  const router = useRouter();
  const supabase = createClient();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [subscription, setSubscription] = useState<SubscriptionInfo | null>(null);
  const [cancelling, setCancelling] = useState(false);
  const [error, setError] = useState('');
  const [step, setStep] = useState<'info' | 'confirm' | 'success'>('info');

  useEffect(() => {
    const getSubscription = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push('/');
        return;
      }
      setUser(user);

      // Fetch subscription from API
      const res = await fetch('/api/stripe/subscription');
      if (res.ok) {
        const data = await res.json();
        setSubscription(data.subscription);
      }
      setLoading(false);
    };

    getSubscription();
  }, [supabase, router]);

  const handleCancelClick = () => {
    setStep('confirm');
  };

  const handleConfirmCancel = async () => {
    if (!subscription) return;
    setCancelling(true);
    setError('');

    try {
      const res = await fetch('/api/stripe/cancel-subscription', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ subscriptionId: subscription.id }),
      });

      if (!res.ok) {
        const err = await res.json();
        setError(err.error || 'Failed to cancel subscription');
        setCancelling(false);
        return;
      }

      setStep('success');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setCancelling(false);
    }
  };

  if (loading) {
    return (
      <div style={{ padding: '40px', textAlign: 'center' }}>
        <p>Loading subscription info...</p>
      </div>
    );
  }

  if (!subscription) {
    return (
      <div style={{ padding: '40px', textAlign: 'center' }}>
        <h2>No Active Subscription</h2>
        <p>You don't have an active subscription to manage.</p>
        <button
          onClick={() => router.push('/')}
          style={{
            marginTop: '16px',
            padding: '12px 24px',
            background: '#0B66E4',
            color: '#fff',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '14px',
          }}
        >
          Back to Home
        </button>
      </div>
    );
  }

  const endDate = new Date(subscription.current_period_end * 1000);
  const billingText = subscription.billing === 'yearly' ? 'Annual' : 'Monthly';

  if (step === 'success') {
    return (
      <div style={{
        maxWidth: '600px',
        margin: '60px auto',
        padding: '40px',
        textAlign: 'center',
        background: '#f9fafb',
        borderRadius: '8px',
        border: '1px solid #ebedf0',
      }}>
        <h2 style={{ color: '#22c55e', marginBottom: '16px' }}>✓ Cancellation Confirmed</h2>
        <p style={{ marginBottom: '24px', color: '#666', fontSize: '15px' }}>
          Your {PLAN_NAMES[subscription.plan as keyof typeof PLAN_NAMES]} subscription has been cancelled. No refund applies.
        </p>
        {subscription.billing === 'yearly' ? (
          <p style={{ marginBottom: '24px', color: '#666', fontSize: '15px' }}>
            Your annual billing will not renew on <strong>{endDate.toLocaleDateString()}</strong>.
            You'll continue to receive your monthly credits every month until the end of your paid annual period.
          </p>
        ) : (
          <p style={{ marginBottom: '24px', color: '#666', fontSize: '15px' }}>
            Your monthly billing will stop on <strong>{endDate.toLocaleDateString()}</strong>.
            You keep your current credits and full access until then.
          </p>
        )}
        <button
          onClick={() => router.push('/')}
          style={{
            padding: '12px 24px',
            background: '#0B66E4',
            color: '#fff',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '14px',
          }}
        >
          Return Home
        </button>
      </div>
    );
  }

  if (step === 'confirm') {
    return (
      <div style={{
        maxWidth: '600px',
        margin: '60px auto',
        padding: '40px',
        background: '#fff',
        borderRadius: '8px',
        border: '1px solid #ebedf0',
      }}>
        <h2 style={{ marginBottom: '24px', color: '#111' }}>Are you sure?</h2>

        <div style={{
          background: '#fef3c7',
          border: '1px solid #fcd34d',
          borderRadius: '6px',
          padding: '16px',
          marginBottom: '24px',
        }}>
          <p style={{ margin: '0', fontSize: '14px', color: '#92400e' }}>
            <strong>Your {PLAN_NAMES[subscription.plan as keyof typeof PLAN_NAMES]} plan provides:</strong>
          </p>
          <ul style={{ margin: '8px 0 0 16px', fontSize: '14px', color: '#92400e' }}>
            {PLAN_BENEFITS[subscription.plan as keyof typeof PLAN_BENEFITS]?.map((benefit, i) => (
              <li key={i}>{benefit}</li>
            ))}
          </ul>
        </div>

        {subscription.billing === 'yearly' ? (
          <p style={{ fontSize: '14px', color: '#666', marginBottom: '24px' }}>
            If you cancel, your annual subscription will not renew on {endDate.toLocaleDateString()}.
            There is no refund, and you'll continue to receive your monthly credits every month until the end of your paid annual period.
          </p>
        ) : (
          <p style={{ fontSize: '14px', color: '#666', marginBottom: '24px' }}>
            If you cancel, your monthly billing will stop on {endDate.toLocaleDateString()}.
            There is no refund, and you keep your current credits and access until then.
          </p>
        )}

        {error && (
          <div style={{
            background: '#fee',
            border: '1px solid #fcc',
            borderRadius: '6px',
            padding: '12px',
            marginBottom: '20px',
            color: '#c33',
            fontSize: '14px',
          }}>
            {error}
          </div>
        )}

        <div style={{ display: 'flex', gap: '12px' }}>
          <button
            onClick={() => setStep('info')}
            disabled={cancelling}
            style={{
              flex: 1,
              padding: '12px 16px',
              background: '#f3f4f6',
              color: '#111',
              border: '1px solid #ddd',
              borderRadius: '6px',
              cursor: cancelling ? 'not-allowed' : 'pointer',
              fontSize: '14px',
              fontWeight: '500',
            }}
          >
            Keep Plan
          </button>
          <button
            onClick={handleConfirmCancel}
            disabled={cancelling}
            style={{
              flex: 1,
              padding: '12px 16px',
              background: '#ef4444',
              color: '#fff',
              border: 'none',
              borderRadius: '6px',
              cursor: cancelling ? 'not-allowed' : 'pointer',
              fontSize: '14px',
              fontWeight: '500',
              opacity: cancelling ? 0.6 : 1,
            }}
          >
            {cancelling ? 'Cancelling...' : 'Yes, Cancel'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      maxWidth: '600px',
      margin: '60px auto',
      padding: '40px',
      background: '#fff',
      borderRadius: '8px',
      border: '1px solid #ebedf0',
    }}>
      <h1 style={{ marginBottom: '8px', fontSize: '28px', color: '#111' }}>Manage Subscription</h1>
      <p style={{ marginBottom: '32px', color: '#666', fontSize: '15px' }}>Your current plan and billing details.</p>

      <div style={{
        background: '#f9fafb',
        padding: '20px',
        borderRadius: '6px',
        marginBottom: '24px',
      }}>
        <div style={{ marginBottom: '16px' }}>
          <p style={{ margin: '0 0 4px 0', color: '#666', fontSize: '13px' }}>Plan</p>
          <h3 style={{ margin: 0, color: '#111', fontSize: '16px' }}>
            {PLAN_NAMES[subscription.plan as keyof typeof PLAN_NAMES]}
          </h3>
        </div>

        <div style={{ marginBottom: '16px' }}>
          <p style={{ margin: '0 0 4px 0', color: '#666', fontSize: '13px' }}>Billing Cycle</p>
          <p style={{ margin: 0, color: '#111', fontSize: '14px' }}>{billingText}</p>
        </div>

        <div>
          <p style={{ margin: '0 0 4px 0', color: '#666', fontSize: '13px' }}>Renews On</p>
          <p style={{ margin: 0, color: '#111', fontSize: '14px' }}>
            {endDate.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>

        {subscription.cancel_at_period_end && (
          <div style={{
            marginTop: '16px',
            padding: '12px',
            background: '#fef3c7',
            border: '1px solid #fcd34d',
            borderRadius: '4px',
            fontSize: '14px',
            color: '#92400e',
          }}>
            ⚠️ This subscription is marked for cancellation and will not renew.
          </div>
        )}
      </div>

      {!subscription.cancel_at_period_end && (
        <button
          onClick={handleCancelClick}
          style={{
            width: '100%',
            padding: '12px 16px',
            background: '#fee2e2',
            color: '#dc2626',
            border: '1px solid #fca5a5',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: '500',
          }}
        >
          Cancel Subscription
        </button>
      )}
    </div>
  );
}
