import { NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/server'

export async function POST(request: Request) {
  // Verify cron secret header
  const authHeader = request.headers.get('Authorization')
  const cronSecret = process.env.CRON_SECRET

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const token = authHeader.substring(7)
  if (!cronSecret || token !== cronSecret) {
    return NextResponse.json({ error: 'Invalid token' }, { status: 401 })
  }

  try {
    const admin = createServiceClient()

    // Get pending campaigns scheduled for now or earlier
    const { data: campaigns, error: fetchError } = await admin
      .from('email_campaigns')
      .select('id, user_id, campaign, scheduled_for')
      .eq('status', 'pending')
      .lte('scheduled_for', new Date().toISOString())
      .limit(100)

    if (fetchError) {
      console.error('Error fetching campaigns:', fetchError)
      return NextResponse.json({ error: fetchError.message }, { status: 500 })
    }

    if (!campaigns || campaigns.length === 0) {
      return NextResponse.json({ success: true, processed: 0 })
    }

    let processed = 0
    let failed = 0

    for (const campaign of campaigns) {
      // Get user email
      const { data: profile } = await admin
        .from('profiles')
        .select('email, full_name')
        .eq('id', campaign.user_id)
        .single()

      if (!profile) {
        console.error(`Profile not found for campaign ${campaign.id}`)
        failed++
        continue
      }

      // Send email via Resend
      const emailSent = await sendEmailViaBrowserFunction(
        profile.email,
        profile.full_name,
        campaign.campaign
      )

      if (emailSent) {
        // Update campaign status to sent
        await admin
          .from('email_campaigns')
          .update({
            status: 'sent',
            sent_at: new Date().toISOString(),
          })
          .eq('id', campaign.id)

        processed++
      } else {
        // Increment retry count
        const { data: currentCampaign } = await admin
          .from('email_campaigns')
          .select('retry_count')
          .eq('id', campaign.id)
          .single()

        const newRetryCount = (currentCampaign?.retry_count || 0) + 1

        await admin
          .from('email_campaigns')
          .update({
            retry_count: newRetryCount,
            status: newRetryCount >= 3 ? 'failed' : 'pending',
          })
          .eq('id', campaign.id)

        failed++
      }

      // Rate limiting
      await new Promise((resolve) => setTimeout(resolve, 100))
    }

    return NextResponse.json({ success: true, processed, failed })
  } catch (error) {
    console.error('Error in email campaigns cron:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

async function sendEmailViaBrowserFunction(
  email: string,
  name: string,
  campaign: string
): Promise<boolean> {
  const resendApiKey = process.env.RESEND_API_KEY
  if (!resendApiKey) {
    console.error('RESEND_API_KEY not configured')
    return false
  }

  const templates: Record<string, { subject: string; html: string }> = {
    welcome: {
      subject: '🎉 Bienvenue sur ProFaceApp! Votre crédit gratuit vous attend',
      html: generateWelcomeEmail(name),
    },
    day3_invite: {
      subject: '📸 Vous aviez une photo gratuite en attente?',
      html: generateDay3Email(name),
    },
    day7_offer: {
      subject: '🎁 50% de réduction - ProFaceApp',
      html: generateDay7Email(name),
    },
  }

  const template = templates[campaign]
  if (!template) {
    console.error(`Unknown campaign: ${campaign}`)
    return false
  }

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${resendApiKey}`,
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

function generateWelcomeEmail(name: string): string {
  return `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <h1 style="color: #0f1419; font-size: 24px; margin-bottom: 20px;">Bienvenue sur ProFaceApp! 🎉</h1>
      <p style="color: #57606e; font-size: 16px; line-height: 1.6;">Bonjour ${name},</p>
      <p style="color: #57606e; font-size: 16px; line-height: 1.6;">Vous avez reçu <strong>1 photo professionnelle gratuite</strong> pour commencer.</p>
      <p style="color: #57606e; font-size: 16px; line-height: 1.6;">Générez votre première photo de profil en 90 secondes - aucune limite technique, juste du résultat.</p>

      <div style="margin: 30px 0; text-align: center;">
        <a href="https://profaceapp.com/?auth=dashboard" style="background: #0066ff; color: white; padding: 14px 28px; border-radius: 8px; text-decoration: none; display: inline-block; font-weight: 600; font-size: 16px;">Générer Ma Photo Gratuite</a>
      </div>

      <p style="color: #57606e; font-size: 14px; line-height: 1.6; margin-top: 40px; border-top: 1px solid #e3e6ea; padding-top: 20px;">
        Questions? Répondez simplement à cet email ou visitez <a href="https://profaceapp.com" style="color: #0066ff; text-decoration: none;">profaceapp.com</a>
      </p>
      <p style="color: #999; font-size: 12px; margin-top: 20px;">ProFaceApp - Des photos professionnelles en 90 secondes</p>
    </div>
  `
}

function generateDay3Email(name: string): string {
  return `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <h1 style="color: #0f1419; font-size: 24px; margin-bottom: 20px;">Votre crédit gratuit vous attend 📸</h1>
      <p style="color: #57606e; font-size: 16px; line-height: 1.6;">Bonjour ${name},</p>
      <p style="color: #57606e; font-size: 16px; line-height: 1.6;">Vous n'avez pas encore utilisé votre photo professionnelle gratuite.</p>
      <p style="color: #57606e; font-size: 16px; line-height: 1.6;">C'est facile: <strong>1 selfie → 1 minute → Photo profesionnelle</strong></p>

      <p style="color: #57606e; font-size: 16px; line-height: 1.6; margin-top: 30px;">Des milliers de professionnels utilisent déjà ProFaceApp pour:</p>
      <ul style="color: #57606e; font-size: 16px; line-height: 1.8;">
        <li>✅ LinkedIn profile photos</li>
        <li>✅ Pitch decks for investors</li>
        <li>✅ Company websites</li>
        <li>✅ Professional branding</li>
      </ul>

      <div style="margin: 30px 0; text-align: center;">
        <a href="https://profaceapp.com/?auth=dashboard" style="background: #0066ff; color: white; padding: 14px 28px; border-radius: 8px; text-decoration: none; display: inline-block; font-weight: 600; font-size: 16px;">Utiliser Mon Crédit Gratuit</a>
      </div>

      <p style="color: #57606e; font-size: 14px; line-height: 1.6; margin-top: 40px; border-top: 1px solid #e3e6ea; padding-top: 20px;">
        Votre crédit gratuit expire dans 30 jours. Ne le manquez pas!
      </p>
    </div>
  `
}

function generateDay7Email(name: string): string {
  return `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <h1 style="color: #0f1419; font-size: 24px; margin-bottom: 20px;">Offre Exclusive - 50% de réduction 🎁</h1>
      <p style="color: #57606e; font-size: 16px; line-height: 1.6;">Bonjour ${name},</p>
      <p style="color: #57606e; font-size: 16px; line-height: 1.6;">En tant que nouveau membre, voici une offre exclusive rien que pour vous:</p>

      <div style="background: #f0f7ff; border-left: 4px solid #0066ff; padding: 20px; margin: 30px 0; border-radius: 4px;">
        <p style="color: #0066ff; font-size: 18px; font-weight: 600; margin: 0;">50% DE RÉDUCTION</p>
        <p style="color: #57606e; font-size: 14px; margin: 10px 0 0 0;">Code: <strong>WELCOME50</strong></p>
      </div>

      <p style="color: #57606e; font-size: 16px; line-height: 1.6;">Obtenez des photos professionnelles illimitées pour seulement <strong>19,50€ ce mois-ci</strong> (au lieu de 39€).</p>

      <div style="margin: 30px 0; text-align: center;">
        <a href="https://profaceapp.com/?auth=dashboard" style="background: #0066ff; color: white; padding: 14px 28px; border-radius: 8px; text-decoration: none; display: inline-block; font-weight: 600; font-size: 16px;">Réclamer Ma Réduction 50%</a>
      </div>

      <p style="color: #57606e; font-size: 14px; line-height: 1.6; margin-top: 40px; border-top: 1px solid #e3e6ea; padding-top: 20px;">
        Cette offre spéciale expire dans 7 jours. Ne la manquez pas!
      </p>
    </div>
  `
}
