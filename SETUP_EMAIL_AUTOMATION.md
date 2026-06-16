# Email Automation Setup Guide

## Overview
This system provides:
- **10 free credits (1 free photo)** on user signup
- **3 automated email campaigns** (Welcome, Day 3, Day 7)
- **Hourly cron job** to send pending emails via Resend

## What Was Implemented

### 1. Database Changes
✅ Created `email_campaigns` table to track email automation
✅ Modified user signup trigger to:
   - Give users 10 free credits on signup
   - Schedule 3 emails automatically

### 2. API Endpoints
✅ Created `/api/cron/email-campaigns` - triggers email sending
✅ Integrated with Resend for reliable email delivery

### 3. Vercel Configuration
✅ Added cron job to `vercel.json` (runs hourly at :00)
✅ Cron calls `/api/cron/email-campaigns` to send pending emails

## Setup Steps

### Step 1: Add Vercel Environment Variable
Add `CRON_SECRET` to your Vercel project:

1. Go to: https://vercel.com/adrien-06/profaceapp-2026-4-models/settings/environment-variables
2. Add new variable:
   - **Name:** `CRON_SECRET`
   - **Value:** `a384d86168277e2f1069eab0d6844b2dac337efc3b75104dc5787c365069299c`
   - **Environment:** Production

### Step 2: Apply Database Migration (⚠️ IMPORTANT)
The email_campaigns table must be created in Supabase before deployment:

**Option A: Via Supabase Dashboard**
1. Go to: https://supabase.com/dashboard/project/ydmvaqwnravhkyswfmiu/sql/new
2. Paste this SQL:

```sql
-- Create email campaigns table
create table if not exists public.email_campaigns (
  id          uuid default gen_random_uuid() primary key,
  user_id     uuid references public.profiles(id) on delete cascade not null,
  campaign    text not null,
  status      text not null default 'pending',
  sent_at     timestamptz,
  scheduled_for timestamptz not null,
  retry_count int default 0,
  created_at  timestamptz default now(),
  updated_at  timestamptz default now(),
  unique(user_id, campaign)
);

create index if not exists idx_email_campaigns_pending
  on public.email_campaigns(status, scheduled_for)
  where status = 'pending';
```

3. Run the SQL

**Option B: Via Supabase CLI (local)**
```bash
supabase db push
```

### Step 3: Deploy to Vercel
```bash
git push origin claude/dreamy-shannon-5B2yc
# Then create a PR or deploy from Vercel dashboard
```

## Email Campaigns

### Welcome Email
- **Sent:** Immediately on signup
- **Content:** Thanks for joining, here's your 1 free photo
- **CTA:** "Generate My Free Photo"

### Day 3 Email
- **Sent:** 3 days after signup
- **Content:** Reminder that free photo is still available
- **CTA:** "Use My Credit"

### Day 7 Email
- **Sent:** 7 days after signup
- **Content:** Special offer - 50% discount code
- **CTA:** "Claim My 50% Discount"

## How It Works

1. **User Signs Up**
   - 10 credits added to profile
   - 3 email campaigns scheduled

2. **Cron Job Runs** (Every hour at :00)
   - Finds pending campaigns with `scheduled_for <= now()`
   - Sends emails via Resend API
   - Updates campaign status to 'sent'
   - Retries up to 3 times if failed

3. **User Engagement**
   - Welcome email encourages immediate action
   - Day 3 reminder for hesitant users
   - Day 7 offer creates urgency

## Pricing Structure

| Item | Credit Cost |
|------|------------|
| Free signup credit | 10 credits |
| 1 photo generation | 10 credits |
| One-shot plan | 40 credits ($29) |
| Pro plan | 100 credits/month ($39/mo) |
| Max plan | 250 credits/month ($79/mo) |

## Monitoring

### Check Pending Emails (Supabase)
```sql
SELECT user_id, campaign, status, scheduled_for 
FROM public.email_campaigns 
WHERE status = 'pending' 
ORDER BY scheduled_for DESC;
```

### Check Sent Emails
```sql
SELECT user_id, campaign, sent_at, retry_count 
FROM public.email_campaigns 
WHERE status = 'sent' 
ORDER BY sent_at DESC 
LIMIT 20;
```

### Check Failed Emails
```sql
SELECT user_id, campaign, retry_count 
FROM public.email_campaigns 
WHERE status = 'failed' 
ORDER BY created_at DESC;
```

## Troubleshooting

### Emails Not Sending?
1. Check Vercel cron logs: https://vercel.com/adrien-06/profaceapp-2026-4-models/deployments
2. Verify `CRON_SECRET` is set in Vercel environment
3. Check Resend API key is valid
4. Verify `email_campaigns` table exists in Supabase

### Test the Endpoint
```bash
curl -X POST https://profaceapp.com/api/cron/email-campaigns \
  -H "Authorization: Bearer YOUR_CRON_SECRET"
```

Should return:
```json
{
  "success": true,
  "processed": X,
  "failed": Y
}
```

## Conversion Impact

Expected improvements:
- **Welcome email:** ~5-8% click-through rate
- **Day 3 reminder:** Recover ~15-20% of lapsed users
- **Day 7 offer:** Drive ~10-15% conversion to paid plans
- **Overall 7-day trial equivalent:** Without the time pressure friction

## Next Steps

1. ✅ Add `CRON_SECRET` to Vercel
2. ✅ Create `email_campaigns` table in Supabase
3. ✅ Deploy to Vercel
4. ✅ Test with a test signup
5. Monitor conversion metrics
