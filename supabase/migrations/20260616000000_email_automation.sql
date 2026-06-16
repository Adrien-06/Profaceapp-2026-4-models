-- ============================================================
-- Email Automation + Free Credit on Signup
-- ============================================================

-- 1. Email campaigns table to track automation
create table if not exists public.email_campaigns (
  id          uuid default gen_random_uuid() primary key,
  user_id     uuid references public.profiles(id) on delete cascade not null,
  campaign    text not null, -- 'welcome' | 'day3_invite' | 'day7_offer'
  status      text not null default 'pending', -- 'pending' | 'sent' | 'failed'
  sent_at     timestamptz,
  scheduled_for timestamptz not null,
  retry_count int default 0,
  created_at  timestamptz default now(),
  updated_at  timestamptz default now(),
  unique(user_id, campaign)
);

-- 2. Add index for efficient querying of pending emails
create index idx_email_campaigns_pending
  on public.email_campaigns(status, scheduled_for)
  where status = 'pending';

-- 3. Modify handle_new_user to give 1 free credit
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, email, full_name, credits)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'full_name', ''),
    10  -- 1 free photo (10 credits) on signup
  );

  -- Log the free credit
  insert into public.credits_log (user_id, delta, reason)
  values (new.id, 10, 'signup_free_photo');

  -- Schedule welcome email (send immediately - now)
  insert into public.email_campaigns (user_id, campaign, scheduled_for)
  values (new.id, 'welcome', now());

  -- Schedule day 3 invite email (3 days from now)
  insert into public.email_campaigns (user_id, campaign, scheduled_for)
  values (new.id, 'day3_invite', now() + interval '3 days');

  -- Schedule day 7 offer email (7 days from now)
  insert into public.email_campaigns (user_id, campaign, scheduled_for)
  values (new.id, 'day7_offer', now() + interval '7 days');

  return new;
end;
$$;

-- 4. Drop and recreate trigger
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
