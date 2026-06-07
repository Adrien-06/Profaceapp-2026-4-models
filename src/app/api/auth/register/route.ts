import { NextResponse } from 'next/server';
import { createServiceClient } from '@/lib/supabase/server';

export async function POST(request: Request) {
  try {
    const { name, email, password } = await request.json();
    if (!email || !password) return NextResponse.json({ error: 'Missing fields' }, { status: 400 });

    const admin = createServiceClient();

    // Create user with email already confirmed — no verification gate
    const { data, error } = await admin.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: { full_name: name ?? '' },
    });

    if (error) return NextResponse.json({ error: error.message }, { status: 400 });

    return NextResponse.json({ userId: data.user.id });
  } catch {
    return NextResponse.json({ error: 'Registration failed' }, { status: 500 });
  }
}
