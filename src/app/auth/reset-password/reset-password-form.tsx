'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';

export default function ResetPasswordForm() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [tokenValid, setTokenValid] = useState(false);
  const supabase = createClient();

  useEffect(() => {
    const handleAuth = async () => {
      // First check if Supabase already set a session via the auth state change
      // (happens when Supabase redirects with #access_token in hash)
      const hash = window.location.hash.substring(1);

      if (hash) {
        const params = new URLSearchParams(hash);
        const accessToken = params.get('access_token');
        const type = params.get('type');

        if (accessToken && (type === 'recovery' || type === 'magiclink')) {
          const { error: sessionError } = await supabase.auth.setSession({
            access_token: accessToken,
            refresh_token: params.get('refresh_token') || '',
          });
          if (!sessionError) {
            // Clear hash from URL without reload
            window.history.replaceState(null, '', window.location.pathname);
            setTokenValid(true);
            return;
          }
        }
      }

      // Also listen for PASSWORD_RECOVERY auth event
      const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
        if (event === 'PASSWORD_RECOVERY' && session) {
          setTokenValid(true);
        }
      });

      // Check existing session
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        setTokenValid(true);
      } else if (!hash) {
        setError('Invalid or expired reset link. Please request a new one.');
      }

      return () => subscription.unsubscribe();
    };

    handleAuth();
  }, [supabase]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (password.length < 8) {
      setError('Password must be at least 8 characters');
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    try {
      const { error: updateError } = await supabase.auth.updateUser({
        password: password,
      });

      if (updateError) {
        setError(updateError.message);
        return;
      }

      setSuccess(true);
      setPassword('');
      setConfirmPassword('');

      setTimeout(() => {
        router.push('/?auth=login&reset=success');
      }, 2000);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Something went wrong';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  if (!tokenValid && !error) {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        backgroundColor: '#f5f5f5',
        fontFamily: 'system-ui, -apple-system, sans-serif',
      }}>
        <div style={{
          background: '#fff',
          padding: '32px',
          borderRadius: '8px',
          border: '1px solid #ebedf0',
          maxWidth: '400px',
          width: '100%',
        }}>
          <p>Checking reset link...</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      backgroundColor: '#f5f5f5',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      padding: '20px',
    }}>
      <div style={{
        background: '#fff',
        padding: '32px',
        borderRadius: '8px',
        border: '1px solid #ebedf0',
        maxWidth: '400px',
        width: '100%',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
      }}>
        {!success ? (
          <>
            <h2 style={{
              fontSize: '24px',
              fontWeight: '700',
              color: '#111111',
              marginTop: 0,
              marginBottom: '24px',
            }}>
              Reset Your Password
            </h2>
            <p style={{
              fontSize: '14px',
              color: '#666',
              marginBottom: '24px',
            }}>
              Enter your new password below. It must be at least 8 characters.
            </p>

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

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <label style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <span style={{ fontSize: '14px', fontWeight: '500', color: '#111' }}>New Password</span>
                <input
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  style={{
                    padding: '10px 12px',
                    border: '1px solid #ddd',
                    borderRadius: '6px',
                    fontSize: '14px',
                    fontFamily: 'inherit',
                  }}
                />
              </label>

              <label style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <span style={{ fontSize: '14px', fontWeight: '500', color: '#111' }}>Confirm Password</span>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  style={{
                    padding: '10px 12px',
                    border: '1px solid #ddd',
                    borderRadius: '6px',
                    fontSize: '14px',
                    fontFamily: 'inherit',
                  }}
                />
              </label>

              <button
                type="submit"
                disabled={loading}
                style={{
                  background: '#0B66E4',
                  color: '#fff',
                  border: 'none',
                  padding: '12px 16px',
                  borderRadius: '6px',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  opacity: loading ? 0.6 : 1,
                  marginTop: '8px',
                }}
              >
                {loading ? 'Resetting...' : 'Reset Password'}
              </button>
            </form>
          </>
        ) : (
          <div style={{ textAlign: 'center' }}>
            <h2 style={{
              fontSize: '20px',
              fontWeight: '700',
              color: '#22c55e',
              margin: '0 0 16px 0',
            }}>
              ✓ Password Reset Successful
            </h2>
            <p style={{
              fontSize: '14px',
              color: '#666',
              marginBottom: '8px',
            }}>
              Your password has been updated. Redirecting to login...
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
