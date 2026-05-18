import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const RECIPIENT = 'hello@apexzone.xyz';
const SENDER    = process.env.RESEND_FROM ?? 'Apex Zone <onboarding@resend.dev>';

// ─── Label maps (keep server-side, no i18n needed) ────────────────────────────

const INDUSTRY_LABEL: Record<string, string> = {
  restaurant: '🍽️ Restaurant / F&B', retail: '🛍️ Retail / E-Commerce',
  tech: '💻 Technology / SaaS', healthcare: '❤️ Healthcare / Medical',
  finance: '💰 Finance / Accounting', education: '📚 Education',
  realEstate: '🏡 Real Estate', manufacturing: '⚙️ Manufacturing',
  beauty: '💄 Beauty / Wellness', other: '🏢 Other',
};
const PROJECT_LABEL: Record<string, string> = {
  corporate: 'Corporate Website', ecommerce: 'E-Commerce Store',
  portfolio: 'Portfolio Site', blog: 'Blog / Media',
  booking: 'Booking System', miniProgram: 'WeChat Mini-Program',
  landing: 'Landing Page', platform: 'SaaS / Platform',
};
const GOAL_LABEL: Record<string, string> = {
  leads: 'Generate Leads', sales: 'Drive Online Sales',
  credibility: 'Build Brand Authority', showcase: 'Showcase Portfolio',
  automate: 'Automate Workflows', launch: 'Launch Online Presence',
};
const AUDIENCE_LABEL: Record<string, string> = {
  usEnglish: 'English-speaking (US)', chinese: 'Chinese-speaking',
  multilingual: 'Global / Multilingual', b2b: 'B2B', b2c: 'B2C', local: 'Local Community',
};
const STYLE_LABEL: Record<string, string> = {
  clean: '🟢 Clean & Professional', bold: '🔵 Bold & Modern',
  minimal: '⚪ Minimal & Elegant', warm: '🟠 Warm & Friendly',
  tech: '🔷 Tech & Futuristic', luxe: '⭐ Luxury & Premium',
};
const FEATURE_LABEL: Record<string, string> = {
  contactForm: 'Smart Contact Form', booking: 'Online Booking / Calendar',
  ecommerce: 'E-Commerce Cart', blog: 'Blog / News CMS',
  multilingual: 'Bilingual i18n', aiChat: 'AI Chat Assistant',
  memberLogin: 'Member Login & Dashboard', video: 'Video Background',
  map: 'Interactive Map', seo: 'Technical SEO & Analytics',
};
const CONTENT_LABEL: Record<string, string> = {
  ready: '✅ Content Ready', ideas: '💡 Have Ideas, Need Help', scratch: '✏️ Starting from Scratch',
};
const TIMELINE_LABEL: Record<string, string> = {
  asap: '🔥 ASAP (< 1 month)', month: '📅 Within 1 Month',
  quarter: '📆 Within 3 Months', flexible: '🤝 Flexible',
};
const BUDGET_LABEL: Record<string, string> = {
  under1k: '< $1,000', '1kTo3k': '$1,000–$3,000', '3kTo8k': '$3,000–$8,000',
  '8kTo20k': '$8,000–$20,000', above20k: '$20,000+', discuss: 'Let\'s Discuss',
};

// ─── HTML email builders ──────────────────────────────────────────────────────

function row(label: string, value: string) {
  if (!value) return '';
  return `
    <tr>
      <td style="padding:9px 12px;color:#6B7280;font-size:13px;white-space:nowrap;vertical-align:top;width:140px;">${label}</td>
      <td style="padding:9px 12px;font-size:14px;font-weight:600;color:#111827;vertical-align:top;">${value}</td>
    </tr>`;
}

function section(title: string, rows: string) {
  return `
    <div style="margin-bottom:20px;">
      <div style="font-size:11px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#3A7D5C;margin-bottom:8px;">${title}</div>
      <table style="width:100%;border-collapse:collapse;border:1px solid #E5E7EB;border-radius:8px;overflow:hidden;">
        ${rows}
      </table>
    </div>`;
}

function buildWizardEmail(data: Record<string, unknown>): string {
  const { name, email, phone, company, locale } = data as Record<string, string>;
  const wa = (data.wizardAnswers ?? {}) as Record<string, unknown>;

  const industry    = INDUSTRY_LABEL[wa.industry    as string] ?? String(wa.industry    ?? '—');
  const projectType = PROJECT_LABEL [wa.projectType as string] ?? String(wa.projectType ?? '—');
  const goal        = GOAL_LABEL    [wa.goal        as string] ?? String(wa.goal        ?? '—');
  const style       = STYLE_LABEL   [wa.designStyle as string] ?? String(wa.designStyle ?? '—');
  const content     = CONTENT_LABEL [wa.content     as string] ?? String(wa.content     ?? '—');
  const timeline    = TIMELINE_LABEL[wa.timeline    as string] ?? String(wa.timeline    ?? '—');
  const budget      = BUDGET_LABEL  [wa.budget      as string] ?? String(wa.budget      ?? '—');

  const audience = ((wa.audience as string[]) ?? []).map(k => AUDIENCE_LABEL[k] ?? k).join(', ') || '—';
  const features = ((wa.features as string[]) ?? []).map(k => FEATURE_LABEL[k] ?? k).join(' · ') || '—';

  return `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#F3F4F6;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#F3F4F6;padding:32px 16px;">
<tr><td align="center">
<table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

  <!-- Header -->
  <tr><td style="background:linear-gradient(135deg,#1a3a2a,#2d6a4f);border-radius:12px 12px 0 0;padding:28px 32px;">
    <div style="font-size:22px;font-weight:800;color:#fff;margin-bottom:4px;">🧙 New AI Wizard Lead</div>
    <div style="font-size:13px;color:rgba(255,255,255,.65);">Submitted via apexzone.xyz · ${new Date().toUTCString()}</div>
  </td></tr>

  <!-- Body -->
  <tr><td style="background:#fff;border:1px solid #E5E7EB;border-top:none;padding:28px 32px;border-radius:0 0 12px 12px;">

    ${section('📋 Contact Information', `
      ${row('Name',    name)}
      ${row('Email',   `<a href="mailto:${email}" style="color:#3A7D5C;">${email}</a>`)}
      ${row('Phone',   phone)}
      ${row('Company', company)}
      ${row('Language', locale)}
    `)}

    ${section('🎯 Project Specifications', `
      ${row('Industry',     industry)}
      ${row('Project Type', projectType)}
      ${row('Primary Goal', goal)}
      ${row('Audience',     audience)}
    `)}

    ${section('🎨 Design & Scope', `
      ${row('Design Style', style)}
      ${row('Features',     features)}
      ${row('Content',      content)}
      ${row('Timeline',     timeline)}
      ${row('Budget',       budget)}
    `)}

    <!-- Preview callout -->
    <div style="background:#F0F9F4;border:1px solid #BBD9C8;border-radius:8px;padding:16px 20px;margin-bottom:20px;">
      <div style="font-size:13px;font-weight:700;color:#3A7D5C;margin-bottom:6px;">🖥️ Website Preview Was Generated</div>
      <div style="font-size:13px;color:#374151;">
        The client was shown a live <strong>${style}</strong> website mockup based on their
        selections. Industry: <strong>${industry}</strong>.
        The preview was rendered in-browser — no image stored.
      </div>
    </div>

    <!-- Reply CTA -->
    <div style="text-align:center;margin-top:8px;">
      <a href="mailto:${email}?subject=Re: Your Apex Zone Project Blueprint"
         style="display:inline-block;background:#3A7D5C;color:#fff;padding:13px 28px;border-radius:8px;font-size:15px;font-weight:700;text-decoration:none;">
        Reply to ${name} →
      </a>
    </div>

  </td></tr>

  <!-- Footer -->
  <tr><td style="padding:16px 0;text-align:center;">
    <div style="font-size:12px;color:#9CA3AF;">Apex Zone · apexzone.xyz</div>
  </td></tr>

</table>
</td></tr>
</table>
</body>
</html>`;
}

function buildContactEmail(data: Record<string, string>): string {
  const { name, email, phone, company, service, message, locale } = data;
  const isZh = locale?.startsWith('zh');

  return `
<!DOCTYPE html>
<html lang="${locale}">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#F3F4F6;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#F3F4F6;padding:32px 16px;">
<tr><td align="center">
<table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

  <!-- Header -->
  <tr><td style="background:linear-gradient(135deg,#1a3a2a,#2d6a4f);border-radius:12px 12px 0 0;padding:28px 32px;">
    <div style="font-size:22px;font-weight:800;color:#fff;margin-bottom:4px;">
      ${isZh ? '📬 新咨询消息' : '📬 New Contact Inquiry'}
    </div>
    <div style="font-size:13px;color:rgba(255,255,255,.65);">${new Date().toUTCString()}</div>
  </td></tr>

  <!-- Body -->
  <tr><td style="background:#fff;border:1px solid #E5E7EB;border-top:none;padding:28px 32px;border-radius:0 0 12px 12px;">

    ${section('📋 Contact Information', `
      ${row('Name',    name)}
      ${row('Email',   `<a href="mailto:${email}" style="color:#3A7D5C;">${email}</a>`)}
      ${row('Phone',   phone)}
      ${row('Company', company)}
      ${service ? row('Service Interest', service) : ''}
      ${row('Language', locale)}
    `)}

    <div style="margin-bottom:20px;">
      <div style="font-size:11px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#3A7D5C;margin-bottom:8px;">
        ${isZh ? '留言内容' : 'MESSAGE'}
      </div>
      <div style="background:#F9FAFB;border:1px solid #E5E7EB;border-radius:8px;padding:16px 20px;font-size:14px;color:#374151;line-height:1.7;white-space:pre-wrap;">${message}</div>
    </div>

    <div style="text-align:center;">
      <a href="mailto:${email}?subject=Re: Your Apex Zone Inquiry"
         style="display:inline-block;background:#3A7D5C;color:#fff;padding:13px 28px;border-radius:8px;font-size:15px;font-weight:700;text-decoration:none;">
        Reply to ${name} →
      </a>
    </div>

  </td></tr>

  <tr><td style="padding:16px 0;text-align:center;">
    <div style="font-size:12px;color:#9CA3AF;">Apex Zone · apexzone.xyz</div>
  </td></tr>

</table>
</td></tr>
</table>
</body>
</html>`;
}

// ─── Route Handler ────────────────────────────────────────────────────────────

export async function POST(req: Request) {
  try {
    if (!process.env.RESEND_API_KEY) {
      console.warn('[contact] RESEND_API_KEY not set — email skipped');
      // Return success so the UI doesn't show an error during development
      return NextResponse.json({ success: true, dev: true });
    }

    const resend = new Resend(process.env.RESEND_API_KEY);
    const data   = await req.json() as Record<string, unknown>;

    const { name, email, source } = data as { name: string; email: string; source?: string };

    if (!name || !email) {
      return NextResponse.json({ success: false, error: 'Missing required fields' }, { status: 400 });
    }

    const isWizard = source === 'wizard';

    const subject = isWizard
      ? `[AI Wizard Lead] ${(data.company as string) || name} — ${(data.wizardAnswers as Record<string,string>)?.projectType ?? 'Blueprint'}`
      : `[Website Inquiry] ${(data.service as string) ? `${data.service} · ` : ''}${name}`;

    const html = isWizard
      ? buildWizardEmail(data as Record<string, unknown>)
      : buildContactEmail(data as Record<string, string>);

    const { error } = await resend.emails.send({
      from:    SENDER,
      to:      [RECIPIENT],
      replyTo: email,
      subject,
      html,
    });

    if (error) {
      console.error('[contact] Resend error:', error);
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });

  } catch (err) {
    console.error('[contact] Unexpected error:', err);
    return NextResponse.json({ success: false, error: 'Internal error' }, { status: 500 });
  }
}
