import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const RECIPIENT = 'hello@apexzone.xyz';
// Before domain is verified in Resend, use the onboarding sender.
// After DNS verification, change to: 'Apex Zone <noreply@apexzone.xyz>'
const SENDER = process.env.RESEND_FROM ?? 'Apex Zone <onboarding@resend.dev>';

export async function POST(req: Request) {
  try {
    if (!process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY is not configured');
      return NextResponse.json({ success: false, error: 'Email service not configured' }, { status: 503 });
    }

    const resend = new Resend(process.env.RESEND_API_KEY);
    const data = await req.json();
    const { name, email, phone, company, service, message, locale, source } = data;

    if (!name || !email || !message) {
      return NextResponse.json({ success: false, error: 'Missing required fields' }, { status: 400 });
    }

    const isWizard = source === 'wizard';
    const subject  = isWizard
      ? `[AI Wizard Lead] ${name} — ${service || 'Project Blueprint'}`
      : `[Website Inquiry] ${service ? `${service} · ` : ''}${name}`;

    const html = `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; color: #333;">
        <div style="background: #1a472a; padding: 16px 24px; border-radius: 8px 8px 0 0;">
          <h2 style="color: #fff; margin: 0; font-size: 18px;">
            ${isWizard ? '🧙 New AI Wizard Lead' : '📬 New Contact Form Inquiry'}
          </h2>
        </div>
        <div style="border: 1px solid #e0e0e0; border-top: none; padding: 24px; border-radius: 0 0 8px 8px;">
          <table style="width:100%; border-collapse: collapse;">
            <tr><td style="padding:8px 0; color:#666; width:120px;">Name</td><td style="padding:8px 0; font-weight:600;">${name}</td></tr>
            <tr><td style="padding:8px 0; color:#666;">Reply-to</td><td style="padding:8px 0;"><a href="mailto:${email}" style="color:#1a472a;">${email}</a></td></tr>
            ${phone   ? `<tr><td style="padding:8px 0; color:#666;">Phone</td><td style="padding:8px 0;">${phone}</td></tr>` : ''}
            ${company ? `<tr><td style="padding:8px 0; color:#666;">Company</td><td style="padding:8px 0;">${company}</td></tr>` : ''}
            ${service ? `<tr><td style="padding:8px 0; color:#666;">Service</td><td style="padding:8px 0;">${service}</td></tr>` : ''}
            <tr><td style="padding:8px 0; color:#666;">Language</td><td style="padding:8px 0;">${locale}</td></tr>
          </table>
          <hr style="border:none; border-top:1px solid #eee; margin:16px 0;" />
          <p style="color:#666; margin:0 0 8px;">Message</p>
          <p style="background:#f9f9f9; padding:16px; border-radius:6px; margin:0; white-space:pre-wrap;">${message}</p>
        </div>
        <p style="color:#aaa; font-size:12px; margin-top:16px; text-align:center;">
          Sent via apexzone.xyz · ${new Date().toUTCString()}
        </p>
      </div>
    `;

    const { error } = await resend.emails.send({
      from:     SENDER,
      to:       [RECIPIENT],
      replyTo:  email,
      subject,
      html,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Contact API Error:', err);
    return NextResponse.json({ success: false, error: 'Internal error' }, { status: 500 });
  }
}
