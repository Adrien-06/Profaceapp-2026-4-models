-- ============================================================
-- Reset a yearly subscription's monthly distribution cycle on renewal (year 2+)
-- Clears distribution tracking, restarts 12-month cycle, credits month 1 immediately
-- ============================================================
create or replace function public.reset_yearly_subscription_cycle(
  p_user_id uuid,
  p_subscription_id text,
  p_monthly_amount int
)
returns boolean
language plpgsql
security definer set search_path = public
as $$
begin
  -- Clear previous cycle's distribution tracking
  delete from public.monthly_credits_distributed
  where user_id = p_user_id and subscription_id = p_subscription_id;

  -- Reset the allocation record for a fresh 12-month cycle
  update public.subscription_monthly_credits
  set
    monthly_credit_amount = p_monthly_amount,
    total_credits = p_monthly_amount * 12,
    total_months = 12,
    last_month_distributed_at = now()
  where user_id = p_user_id and subscription_id = p_subscription_id;

  -- If no allocation row exists (edge case), create one
  if not found then
    insert into public.subscription_monthly_credits
      (user_id, subscription_id, total_credits, monthly_credit_amount, billing_cycle_month, total_months, last_month_distributed_at)
    values
      (p_user_id, p_subscription_id, p_monthly_amount * 12, p_monthly_amount, 0, 12, now());
  end if;

  -- Credit month 1 of the new cycle immediately + mark month 0 distributed
  update public.profiles
  set credits = credits + p_monthly_amount, updated_at = now()
  where id = p_user_id;

  insert into public.monthly_credits_distributed (user_id, subscription_id, month_index)
  values (p_user_id, p_subscription_id, 0)
  on conflict (user_id, subscription_id, month_index) do nothing;

  insert into public.credits_log (user_id, delta, reason)
  values (p_user_id, p_monthly_amount, 'yearly_subscription_renewal');

  return true;
end;
$$;
