-- Configuration for email verification on signup
-- This ensures users must verify their email before full access

-- Note: Email verification is configured in Supabase Dashboard under:
-- Project Settings > Authentication > Email
-- Enable "Confirm email" under "Email Verification Settings"

-- This migration documents the requirement and sets up any database-level triggers if needed

-- Users table should have email_confirmed_at field (managed by Supabase Auth)
-- The profiles table references auth.users so email verification is inherited

-- Optional: Create a trigger to log email verification events
create or replace function public.log_email_verification()
returns trigger as $$
begin
  if new.email_confirmed_at is not null and old.email_confirmed_at is null then
    insert into public.credits_log (user_id, delta, reason)
    values (new.id, 50, 'email_verified_bonus');
  end if;
  return new;
end;
$$ language plpgsql security definer;

-- Note: This trigger requires auth.users to be accessible via RLS
-- For now, email verification is handled by Supabase Auth natively
-- Configure email settings in the Supabase Dashboard to enforce verification
