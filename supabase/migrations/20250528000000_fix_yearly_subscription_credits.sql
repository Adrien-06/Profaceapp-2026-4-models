-- ============================================================
-- Fix yearly subscription credits distribution bugs
-- ============================================================

-- New function to add monthly credits for yearly subscriptions
-- Handles first month credit + tracking atomically
create or replace function public.add_yearly_subscription_month_credit(
  p_user_id uuid,
  p_subscription_id text,
  p_monthly_amount int
)
returns boolean
language plpgsql
security definer set search_path = public
as $$
begin
  -- Add credits to profile
  update public.profiles
  set
    credits = credits + p_monthly_amount,
    updated_at = now()
  where id = p_user_id;

  -- Mark month 0 as distributed (prevents redispatch on cron)
  insert into public.monthly_credits_distributed (user_id, subscription_id, month_index)
  values (p_user_id, p_subscription_id, 0)
  on conflict (user_id, subscription_id, month_index) do nothing;

  -- Log the transaction
  insert into public.credits_log (user_id, delta, reason)
  values (p_user_id, p_monthly_amount, 'yearly_subscription_month_1');

  return true;
end;
$$;

-- Modify distribute_monthly_credits to:
-- 1. Only process each subscription once per calendar month
-- 2. Track last distribution timestamp
alter table if exists public.subscription_monthly_credits
add column if not exists last_month_distributed_at timestamp with time zone;

-- Updated distribution function with temporal guard and proper tracking
create or replace function public.distribute_monthly_credits()
returns table(user_id_ret uuid, credits_added int, count_distributed int) as $$
declare
  v_record record;
  v_credits_to_add int;
  v_distributed_count int := 0;
  v_current_month_start timestamp with time zone;
begin
  -- Start of current month in UTC
  v_current_month_start := date_trunc('month', now() at time zone 'UTC');

  -- Find all active subscription monthly credit plans
  -- Only those that haven't distributed this month
  for v_record in
    select
      smc.id,
      smc.user_id,
      smc.subscription_id,
      smc.monthly_credit_amount,
      smc.total_months,
      count(mcd.month_index) as months_already_credited
    from public.subscription_monthly_credits smc
    left join public.monthly_credits_distributed mcd
      on smc.user_id = mcd.user_id
      and smc.subscription_id = mcd.subscription_id
    where
      -- Only process if haven't distributed this calendar month
      (smc.last_month_distributed_at is null
       or date_trunc('month', smc.last_month_distributed_at) < v_current_month_start)
      -- And haven't reached 12 months total
      and count(mcd.month_index) < smc.total_months
    group by smc.id, smc.user_id, smc.subscription_id, smc.monthly_credit_amount, smc.total_months
  loop
    -- Add credits for this month
    v_credits_to_add := v_record.monthly_credit_amount;

    update public.profiles
    set
      credits = credits + v_credits_to_add,
      updated_at = now()
    where id = v_record.user_id;

    -- Log the credit addition
    insert into public.credits_log (user_id, delta, reason)
    values (v_record.user_id, v_credits_to_add, 'monthly_subscription_distribution');

    -- Mark this month as distributed (use months_already_credited as the index)
    insert into public.monthly_credits_distributed (user_id, subscription_id, month_index)
    values (v_record.user_id, v_record.subscription_id, v_record.months_already_credited)
    on conflict (user_id, subscription_id, month_index) do nothing;

    -- Update last distribution timestamp to prevent re-processing this month
    update public.subscription_monthly_credits
    set last_month_distributed_at = now()
    where id = v_record.id;

    v_distributed_count := v_distributed_count + 1;
  end loop;

  return query select v_record.user_id, v_record.monthly_credit_amount, v_distributed_count;
end;
$$ language plpgsql security definer;

-- ============================================================
-- MANUAL SETUP REQUIRED: pg_cron scheduled job
-- ============================================================
-- To enable automatic monthly credit distribution for yearly subscriptions,
-- run this in the Supabase SQL editor (or via Dashboard > Functions > Cron Jobs):
--
-- select cron.schedule(
--   'distribute-yearly-subscription-credits',
--   '0 1 * * *',
--   'select public.distribute_monthly_credits();'
-- );
--
-- This schedules the distribution function to run daily at 1 AM UTC.
-- The function includes a temporal guard to distribute credits only once per calendar month.
