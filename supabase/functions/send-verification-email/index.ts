import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.38.5'

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')
const SUPABASE_URL = Deno.env.get('SUPABASE_URL')
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')
const APP_URL = Deno.env.get('NEXT_PUBLIC_APP_URL') || 'http://localhost:3000'

interface RequestBody {
  email: string
  user_id: string
  full_name?: string
}

serve(async (req: Request) => {
  // Only allow POST
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 })
  }

  try {
    const body: RequestBody = await req.json()
    const { email, user_id, full_name } = body

    if (!email || !user_id) {
      return new Response(JSON.stringify({ error: 'Missing email or user_id' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    // Create Supabase client
    const supabase = createClient(SUPABASE_URL!, SUPABASE_SERVICE_ROLE_KEY!)

    // Generate verification token (using Supabase's built-in token)
    const { data, error } = await supabase.auth.admin.generateLink({
      type: 'signup',
      email,
      password: undefined,
    })

    if (error || !data?.properties?.action_link) {
      console.error('Error generating verification link:', error)
      return new Response(JSON.stringify({ error: 'Failed to generate verification link' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    const verificationLink = data.properties.action_link
    const name = full_name?.split(' ')[0] || 'User'

    // Send email via Resend
    const emailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", sans-serif; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #0B66E4; color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px; }
            .button {
              display: inline-block;
              background: #0B66E4;
              color: white;
              padding: 12px 32px;
              text-decoration: none;
              border-radius: 6px;
              margin: 20px 0;
            }
            .footer { color: #666; font-size: 12px; margin-top: 20px; border-top: 1px solid #ddd; padding-top: 20px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Verify Your Email</h1>
            </div>
            <div class="content">
              <p>Hi ${name},</p>
              <p>Thanks for signing up for ProFaceApp! Please verify your email address by clicking the button below:</p>
              <a href="${verificationLink}" class="button">Verify Email Address</a>
              <p>Or copy this link: <a href="${verificationLink}">${verificationLink}</a></p>
              <p>This link expires in 24 hours.</p>
              <p>If you didn't create this account, you can ignore this email.</p>
              <div class="footer">
                <p>ProFaceApp - Professional AI Headshots</p>
                <p>© 2026 ProFaceApp. All rights reserved.</p>
              </div>
            </div>
          </div>
        </body>
      </html>
    `

    const resendResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: 'ProFaceApp <noreply@profaceapp.com>',
        to: email,
        subject: 'Verify Your ProFaceApp Email',
        html: emailHtml,
      }),
    })

    if (!resendResponse.ok) {
      const resendError = await resendResponse.text()
      console.error('Resend API error:', resendError)
      return new Response(JSON.stringify({ error: 'Failed to send verification email' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    return new Response(JSON.stringify({ success: true, message: 'Verification email sent' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (err: unknown) {
    const error = err as Error
    console.error('Function error:', error.message)
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
})
