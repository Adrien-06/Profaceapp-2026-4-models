import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json(
        { error: 'Missing email' },
        { status: 400 }
      );
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseServiceKey) {
      console.error('Missing Supabase configuration');
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      );
    }

    // Create Supabase client with service role key
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Generate password reset link using admin API
    const { data, error } = await supabase.auth.admin.generateLink({
      type: 'recovery',
      email,
    });

    if (error || !data?.properties?.action_link) {
      console.error('Error generating recovery link:', error);
      return NextResponse.json(
        { error: 'Failed to generate recovery link' },
        { status: 500 }
      );
    }

    const recoveryLink = data.properties.action_link;

    // Professional email template
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://profaceapp.com';
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
            .warning {
              background-color: #fff3cd;
              border: 1px solid #ffc107;
              border-radius: 4px;
              padding: 12px;
              margin: 20px 0;
              font-size: 14px;
              color: #856404;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h2>Reset Your Password</h2>

            <p>We received a request to reset the password for your ProFaceApp account. Click the button below to create a new password:</p>

            <div class="button-container">
              <a href="${recoveryLink}" class="button">Reset Password</a>
            </div>

            <div class="warning">
              <strong>Security Note:</strong> This link will expire in 1 hour. If you did not request a password reset, you can safely ignore this email.
            </div>

            <hr class="divider" />

            <div class="footer">
              <p>If you're having trouble clicking the button, copy and paste the URL below into your web browser:<br />
              <span class="footer-link">${recoveryLink}</span></p>

              <p class="signature">
                Best regards,<br />
                <strong>The ProFace Team</strong>
              </p>
            </div>
          </div>
        </body>
      </html>
    `;

    // Send email via Resend
    const resendApiKey = process.env.RESEND_API_KEY;
    if (!resendApiKey) {
      console.error('Missing RESEND_API_KEY');
      return NextResponse.json(
        { error: 'Email service not configured' },
        { status: 500 }
      );
    }

    const resendResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${resendApiKey}`,
      },
      body: JSON.stringify({
        from: 'ProFaceApp <noreply@profaceapp.com>',
        to: email,
        subject: 'Reset Your ProFaceApp Password',
        html: emailHtml,
      }),
    });

    if (!resendResponse.ok) {
      const resendError = await resendResponse.text();
      console.error('Resend API error:', resendError);
      return NextResponse.json(
        { error: 'Failed to send email' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Password reset email sent'
    });
  } catch (err: unknown) {
    const error = err as Error;
    console.error('API route error:', error.message);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}

