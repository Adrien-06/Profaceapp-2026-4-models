-- Table to track monthly credit allocations for yearly subscriptions
create table if not exists public.subscription_monthly_credits (
  id bigserial primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  subscription_id text not null,
  total_credits int not null,
  monthly_credit_amount int not null,
  billing_cycle_month int not null,
  total_months int not null,
  created_at timestamp with time zone default now(),
  unique(user_id, subscription_id)
);

alter table public.subscription_monthly_credits enable row level security;

create policy "monthly_credits_insert"
  on public.subscription_monthly_credits for insert
  with check (auth.uid() = user_id);

-- Table to track which months have been credited
create table if not exists public.monthly_credits_distributed (
  id bigserial primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  subscription_id text not null,
  month_index int not null,
  credited_at timestamp with time zone default now(),
  unique(user_id, subscription_id, month_index)
);

alter table public.monthly_credits_distributed enable row level security;

-- Function to distribute monthly credits
create or replace function public.distribute_monthly_credits()
returns table(user_id_ret uuid, credits_added int, count_distributed int) as $$
declare
  v_record record;
  v_credits_to_add int;
  v_distributed_count int := 0;
begin
  -- Find all active subscription monthly credit plans
  for v_record in 
    select 
      smc.user_id,
      smc.subscription_id,
      smc.monthly_credit_amount,
      smc.total_months,
      count(mcd.month_index) as months_already_credited
    from public.subscription_monthly_credits smc
    left join public.monthly_credits_distributed mcd 
      on smc.user_id = mcd.user_id 
      and smc.subscription_id = mcd.subscription_id
    group by smc.user_id, smc.subscription_id, smc.monthly_credit_amount, smc.total_months
    having count(mcd.month_index) < smc.total_months
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
    
    -- Mark this month as distributed
    insert into public.monthly_credits_distributed (user_id, subscription_id, month_index)
    values (v_record.user_id, v_record.subscription_id, v_record.months_already_credited);
    
    v_distributed_count := v_distributed_count + 1;
  end loop;
  
  return query select v_record.user_id, v_record.monthly_credit_amount, v_distributed_count;
end;
$$ language plpgsql security definer;
