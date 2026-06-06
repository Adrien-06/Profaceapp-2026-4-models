import { redirect } from 'next/navigation';
import HomeClient from './HomeClient';

export const dynamic = 'force-dynamic';

interface PageProps {
  searchParams: Promise<{ code?: string; [key: string]: string | string[] | undefined }>;
}

export default async function Page({ searchParams }: PageProps) {
  const params = await searchParams;

  // Supabase PKCE email verification redirects to /?code=xxx when
  // redirect_to is not in the allowed list and falls back to Site URL.
  // Intercept and forward to /auth/callback to complete the session exchange.
  if (params.code) {
    redirect(`/auth/callback?code=${params.code}&type=signup`);
  }

  return <HomeClient />;
}
