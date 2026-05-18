'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { MapPin, Mail, Clock, SendHorizonal } from 'lucide-react';
import styles from './page.module.css';

const SERVICE_KEYS = ['webDesign', 'appDev', 'brandDesign', 'seoMarketing', 'consultation', 'other'] as const;
const RECIPIENT = 'support@apexzone.xyz';

function sendEmail(data: {
  name: string; email: string; phone: string;
  company: string; service: string; message: string;
  locale: string;
}): boolean {
  try {
    const subject = encodeURIComponent(
      `[Apex Zone Inquiry] ${data.service ? `${data.service} · ` : ''}${data.name}`
    );
    const body = encodeURIComponent(
      `Name: ${data.name}\n` +
      `Email: ${data.email}\n` +
      (data.phone   ? `Phone: ${data.phone}\n`   : '') +
      (data.company ? `Company: ${data.company}\n` : '') +
      (data.service ? `Service: ${data.service}\n` : '') +
      `\nMessage:\n${data.message}\n\n` +
      `---\nSent via Apex Zone website (/${data.locale})`
    );
    window.location.href = `mailto:${RECIPIENT}?subject=${subject}&body=${body}`;
    return true;
  } catch {
    return false;
  }
}

export default function ContactClient() {
  const t      = useTranslations('contact');
  const locale = useLocale();

  const [form, setForm] = useState({
    name: '', email: '', phone: '', company: '', service: '', message: '',
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  function update(field: string, value: string) {
    setForm(prev => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;

    setStatus('sending');
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, locale, source: 'contact' }),
      });

      if (response.ok) {
        setStatus('success');
      } else {
        setStatus('error');
      }
    } catch (err) {
      console.error('Submission error:', err);
      setStatus('error');
    }
  }

  return (
    <div className={styles.layout}>
      {/* ── Form ── */}
      <div className={styles.formWrap}>
        {status === 'success' ? (
          <div className={styles.successMsg}>
            <div className={styles.successIcon}>✅</div>
            <h3 className="md-headline-small">{t('form.success')}</h3>
            <p className="md-body-medium text-muted">
              {locale.startsWith('zh')
                ? '感谢您的咨询！我们会尽快与您联系。'
                : 'Thank you for your inquiry! We will get back to you shortly.'
              }
            </p>
            <button
              className="btn btn-secondary btn-sm"
              style={{ marginTop: 8 }}
              onClick={() => { setStatus('idle'); setForm({ name:'',email:'',phone:'',company:'',service:'',message:'' }); }}
            >
              {locale.startsWith('zh') ? '重新填写' : 'Send Another'}
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className={styles.form} noValidate>
            <div className={styles.formRow}>
              <div className="form-group">
                <label className="form-label" htmlFor="c-name">
                  {t('form.name')} <span className={styles.req}>*</span>
                </label>
                <input
                  id="c-name" className="form-control" type="text"
                  placeholder={t('form.namePlaceholder')}
                  value={form.name} onChange={e => update('name', e.target.value)}
                  required autoComplete="name"
                />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="c-email">
                  {t('form.email')} <span className={styles.req}>*</span>
                </label>
                <input
                  id="c-email" className="form-control" type="email"
                  placeholder={t('form.emailPlaceholder')}
                  value={form.email} onChange={e => update('email', e.target.value)}
                  required autoComplete="email"
                />
              </div>
            </div>
            <div className={styles.formRow}>
              <div className="form-group">
                <label className="form-label" htmlFor="c-phone">{t('form.phone')}</label>
                <input
                  id="c-phone" className="form-control" type="tel"
                  placeholder={t('form.phonePlaceholder')}
                  value={form.phone} onChange={e => update('phone', e.target.value)}
                  autoComplete="tel"
                />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="c-company">{t('form.company')}</label>
                <input
                  id="c-company" className="form-control" type="text"
                  placeholder={t('form.companyPlaceholder')}
                  value={form.company} onChange={e => update('company', e.target.value)}
                  autoComplete="organization"
                />
              </div>
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="c-service">{t('form.service')}</label>
              <select
                id="c-service" className="form-control"
                value={form.service} onChange={e => update('service', e.target.value)}
              >
                <option value="">—</option>
                {SERVICE_KEYS.map(k => (
                  <option key={k} value={k}>{t(`form.serviceOptions.${k}`)}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="c-msg">
                {t('form.message')} <span className={styles.req}>*</span>
              </label>
              <textarea
                id="c-msg" className="form-control"
                placeholder={t('form.messagePlaceholder')}
                rows={5}
                value={form.message} onChange={e => update('message', e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary btn-lg"
              disabled={status === 'sending'}
              style={{ width: '100%' }}
            >
              {status === 'sending'
                ? t('form.sending')
                : <><SendHorizonal size={18} /> {t('form.submit')}</>
              }
            </button>
            {status === 'error' && (
              <p className={styles.errorMsg}>{t('form.error')}</p>
            )}
          </form>
        )}
      </div>

      {/* ── Sidebar ── */}
      <aside className={styles.sidebar}>
        {/* Free consult card */}
        <div className={styles.consultCard}>
          <div className={styles.consultIcon}>📞</div>
          <h3 className="md-title-large">{t('freeConsult.title')}</h3>
          <p className="md-body-medium">{t('freeConsult.desc')}</p>
          <a
            href={`mailto:${RECIPIENT}?subject=${encodeURIComponent(locale.startsWith('zh') ? '预约免费咨询' : 'Free Consultation Request')}`}
            className="btn btn-white"
            style={{ marginTop: '4px' }}
          >
            {t('freeConsult.button')}
          </a>
        </div>

        {/* Contact info */}
        <div className={styles.infoCard}>
          {([
            { icon: MapPin, label: t('info.address'), val: t('info.addressVal') },
            { icon: Mail,   label: t('info.email'),   val: RECIPIENT,            href: `mailto:${RECIPIENT}` },
            { icon: Clock,  label: t('info.hours'),   val: t('info.hoursVal') },
          ] as const).map(({ icon: Icon, label, val, ...rest }) => {
            const href = (rest as { href?: string }).href;
            return (
              <div key={label} className={styles.infoRow}>
                <div className={styles.infoIcon}><Icon size={16} /></div>
                <div>
                  <div className={styles.infoLabel}>{label}</div>
                  {href
                    ? <a href={href} className="md-body-medium" style={{ color: 'inherit' }}>{val}</a>
                    : <div className="md-body-medium">{val}</div>
                  }
                </div>
              </div>
            );
          })}
        </div>

        {/* WeChat */}
        <div className={styles.wechatCard}>
          <div className={styles.wechatIcon}>💬</div>
          <div>
            <div className={styles.infoLabel}>WeChat / 微信</div>
            <div className="md-body-medium">ApexZoneAgency</div>
          </div>
        </div>
      </aside>
    </div>
  );
}
