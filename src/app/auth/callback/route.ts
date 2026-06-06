import { NextResponse } from 'next/server';
import { createClient, createServiceClient } from '@/lib/supabase/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');
  const type = searchParams.get('type');
  const next = searchParams.get('next') ?? '/dashboard';

  if (code) {
    const supabase = await createClient();
    const { error, data } = await supabase.auth.exchangeCodeForSession(code);
    if (!error && data.user) {
      // Mark email as confirmed for signup flow
      if (type === 'signup') {
        const adminClient = createServiceClient();
        await adminClient.auth.admin.updateUserById(data.user.id, {
          email_confirmed_at: new Date().toISOString(),
        });
      }
      // If this is a password recovery, redirect to reset password page
      if (type === 'recovery') {
        return NextResponse.redirect(new URL('/auth/reset-password', request.url));
      }
      return NextResponse.redirect(new URL(next, request.url));
    }
  }

  return NextResponse.redirect(new URL('/?auth=login&error=verification_failed', request.url));
}
