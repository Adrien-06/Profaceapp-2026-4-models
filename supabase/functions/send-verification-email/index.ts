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

    // Generate verification token
    const { data, error } = await supabase.auth.admin.generateLink({
      type: 'signup',
      email,
      password: undefined,
      options: {
        redirectTo: `${APP_URL}/auth/callback?type=signup`,
      },
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

    // Professional email template with logo
    const emailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <style>
            body {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
              color: #111111;
              background-color: #f5f5f5;
              margin: 0;
              padding: 0;
            }
            .container {
              max-width: 550px;
              margin: 32px auto;
              padding: 32px;
              border: 1px solid #ebedf0;
              border-radius: 8px;
              background-color: #ffffff;
            }
            .logo {
              text-align: center;
              margin-bottom: 32px;
            }
            .logo img {
              width: 48px;
              height: 48px;
              border-radius: 12px;
            }
            h2 {
              font-size: 24px;
              font-weight: 700;
              color: #111111;
              margin-top: 0;
              margin-bottom: 24px;
            }
            p {
              font-size: 16px;
              line-height: 24px;
              color: #444444;
              margin: 0 0 24px 0;
            }
            .button-container {
              text-align: center;
              margin: 32px 0;
            }
            .button {
              background-color: #0B66E4;
              color: #ffffff;
              padding: 12px 28px;
              text-decoration: none;
              border-radius: 6px;
              font-size: 16px;
              font-weight: 600;
              display: inline-block;
              transition: background-color 0.2s ease;
            }
            .button:hover {
              background-color: #0952B8;
            }
            .divider {
              border: none;
              border-top: 1px solid #ebedf0;
              margin: 24px 0;
            }
            .footer {
              font-size: 12px;
              line-height: 18px;
              color: #888888;
            }
            .footer-link {
              color: #0066cc;
              word-break: break-all;
            }
            .signature {
              font-size: 12px;
              color: #888888;
              margin-top: 20px;
              margin-bottom: 0;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="logo">
              <img src="${APP_URL}/logo.png" alt="ProFaceApp" />
            </div>

            <h2>Welcome to ProFace!</h2>

            <p>Thanks for signing up. To complete your registration and activate your account, please verify your email address by clicking the button below:</p>

            <div class="button-container">
              <a href="${verificationLink}" class="button">Verify Email Address</a>
            </div>

            <p>This link will expire in 24 hours. If you did not create a ProFace account, no further action is required and you can safely ignore this email.</p>

            <hr class="divider" />

            <div class="footer">
              <p>If you're having trouble clicking the button, copy and paste the URL below into your web browser:<br />
              <span class="footer-link">${verificationLink}</span></p>

              <p class="signature">
                Best regards,<br />
                <strong>The ProFace Team</strong>
              </p>
            </div>
          </div>
        </body>
      </html>
    `

    // Send email via Resend
    const resendResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: 'ProFaceApp <noreply@profaceapp.com>',
        to: email,
        subject: 'Welcome to ProFace app - Confirm your email address',
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

