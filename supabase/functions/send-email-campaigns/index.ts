import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.43.4'

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')
const SUPABASE_URL = Deno.env.get('SUPABASE_URL')
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')

const supabase = createClient(SUPABASE_URL!, SUPABASE_SERVICE_ROLE_KEY!)

interface EmailTemplate {
  subject: string
  html: string
}

const emailTemplates: Record<string, EmailTemplate> = {
  welcome: {
    subject: '🎉 Bienvenue sur ProFaceApp! Votre crédit gratuit vous attend',
    html: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #0f1419; font-size: 24px; margin-bottom: 20px;">Bienvenue sur ProFaceApp! 🎉</h1>
        <p style="color: #57606e; font-size: 16px; line-height: 1.6;">Vous avez reçu <strong>1 photo professionnelle gratuite</strong> pour commencer.</p>
        <p style="color: #57606e; font-size: 16px; line-height: 1.6;">Générez votre première photo de profil en 90 secondes - aucune limite technique, juste du résultat.</p>

        <div style="margin: 30px 0;">
          <a href="https://profaceapp.com/?auth=dashboard" style="background: #0066ff; color: white; padding: 14px 28px; border-radius: 8px; text-decoration: none; display: inline-block; font-weight: 600; font-size: 16px;">Générer Ma Photo Gratuite</a>
        </div>

        <p style="color: #57606e; font-size: 14px; line-height: 1.6; margin-top: 40px;">
          Questions? Répondez simplement à cet email ou contactez notre équipe.
        </p>
        <p style="color: #57606e; font-size: 14px;">ProFaceApp - Des photos professionnelles en 90 secondes</p>
      </div>
    `,
  },
  day3_invite: {
    subject: '📸 Vous aviez une photo gratuite en attente?',
    html: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #0f1419; font-size: 24px; margin-bottom: 20px;">Votre crédit gratuit vous attend 📸</h1>
        <p style="color: #57606e; font-size: 16px; line-height: 1.6;">Vous n'avez pas encore utilisé votre photo professionnelle gratuite.</p>
        <p style="color: #57606e; font-size: 16px; line-height: 1.6;">C'est facile: <strong>1 selfie → 1 minute → Photo profesionnelle</strong></p>

        <p style="color: #57606e; font-size: 16px; line-height: 1.6; margin-top: 30px;">Des milliers de professionnels utilisent déjà ProFaceApp pour:</p>
        <ul style="color: #57606e; font-size: 16px; line-height: 1.8;">
          <li>✅ LinkedIn profile photos</li>
          <li>✅ Pitch decks for investors</li>
          <li>✅ Company websites</li>
          <li>✅ Professional branding</li>
        </ul>

        <div style="margin: 30px 0;">
          <a href="https://profaceapp.com/?auth=dashboard" style="background: #0066ff; color: white; padding: 14px 28px; border-radius: 8px; text-decoration: none; display: inline-block; font-weight: 600; font-size: 16px;">Utiliser Mon Crédit Gratuit</a>
        </div>

        <p style="color: #57606e; font-size: 14px; line-height: 1.6; margin-top: 40px;">
          Votre crédit gratuit expire dans 30 jours. Ne le manquez pas!
        </p>
      </div>
    `,
  },
  day7_offer: {
    subject: '🎁 50% de réduction - ProFaceApp',
    html: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #0f1419; font-size: 24px; margin-bottom: 20px;">Special Offer for ProFaceApp Users 🎁</h1>
        <p style="color: #57606e; font-size: 16px; line-height: 1.6;">As a valued new member, here's an exclusive offer:</p>

        <div style="background: #f0f7ff; border-left: 4px solid #0066ff; padding: 20px; margin: 30px 0; border-radius: 4px;">
          <p style="color: #0066ff; font-size: 18px; font-weight: 600; margin: 0;">50% OFF your first purchase</p>
          <p style="color: #57606e; font-size: 14px; margin: 10px 0 0 0;">Use code: <strong>WELCOME50</strong></p>
        </div>

        <p style="color: #57606e; font-size: 16px; line-height: 1.6;">Get unlimited professional photos for just <strong>$19.50 this month</strong> (instead of $39).</p>

        <div style="margin: 30px 0;">
          <a href="https://profaceapp.com/?auth=dashboard" style="background: #0066ff; color: white; padding: 14px 28px; border-radius: 8px; text-decoration: none; display: inline-block; font-weight: 600; font-size: 16px;">Claim My 50% Discount</a>
        </div>

        <p style="color: #57606e; font-size: 14px; line-height: 1.6; margin-top: 40px;">
          This special offer expires in 7 days. Don't miss out!
        </p>
      </div>
    `,
  },
}

async function sendEmailWithResend(
  email: string,
  template: EmailTemplate
): Promise<boolean> {
  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'ProFaceApp <hello@profaceapp.com>',
        to: email,
        subject: template.subject,
        html: template.html,
      }),
    })

    return response.ok
  } catch (error) {
    console.error('Resend error:', error)
    return false
  }
}

async function processPendingCampaigns() {
  // Get all pending campaigns scheduled for now or earlier
  const { data: campaigns, error: fetchError } = await supabase
    .from('email_campaigns')
    .select('id, user_id, campaign, scheduled_for')
    .eq('status', 'pending')
    .lte('scheduled_for', new Date().toISOString())
    .limit(100)

  if (fetchError) {
    console.error('Error fetching campaigns:', fetchError)
    return { error: fetchError }
  }

  if (!campaigns || campaigns.length === 0) {
    return { success: true, processed: 0 }
  }

  let processed = 0
  let failed = 0

  for (const campaign of campaigns) {
    // Get user email
    const { data: profile } = await supabase
      .from('profiles')
      .select('email')
      .eq('id', campaign.user_id)
      .single()

    if (!profile) {
      console.error(`Profile not found for campaign ${campaign.id}`)
      failed++
      continue
    }

    // Get email template
    const template = emailTemplates[campaign.campaign]
    if (!template) {
      console.error(`Template not found for campaign: ${campaign.campaign}`)
      failed++
      continue
    }

    // Send email
    const sent = await sendEmailWithResend(profile.email, template)

    if (sent) {
      // Update campaign status to sent
      await supabase
        .from('email_campaigns')
        .update({
          status: 'sent',
          sent_at: new Date().toISOString(),
        })
        .eq('id', campaign.id)

      processed++
    } else {
      // Increment retry count
      await supabase
        .from('email_campaigns')
        .update({
          retry_count: (campaign.retry_count || 0) + 1,
        })
        .eq('id', campaign.id)

      failed++
    }

    // Rate limiting - wait 100ms between sends
    await new Promise((resolve) => setTimeout(resolve, 100))
  }

  return { success: true, processed, failed }
}

Deno.serve(async (req) => {
  // Verify it's a cron request (from Supabase or your own cron service)
  const authHeader = req.headers.get('Authorization')
  const expectedToken = Deno.env.get('CRON_SECRET')

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 })
  }

  const token = authHeader.substring(7)
  if (token !== expectedToken) {
    return new Response(JSON.stringify({ error: 'Invalid token' }), { status: 401 })
  }

  try {
    const result = await processPendingCampaigns()
    return new Response(JSON.stringify(result), {
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error) {
    console.error('Error processing campaigns:', error)
    return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500 })
  }
})
