import { NextResponse } from 'next/server';
import { createServiceClient } from '@/lib/supabase/server';

export async function POST(request: Request) {
  try {
    const { userId } = await request.json();
    if (!userId) return NextResponse.json({ error: 'Missing userId' }, { status: 400 });

    const admin = createServiceClient();
    await admin.auth.admin.updateUserById(userId, {
      email_confirmed_at: new Date().toISOString(),
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: 'Failed to confirm email' }, { status: 500 });
  }
}
