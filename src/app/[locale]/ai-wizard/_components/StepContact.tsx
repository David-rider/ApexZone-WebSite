'use client';

import { useTranslations } from 'next-intl';
import { useWizard } from './WizardContext';
import styles from '../page.module.css';

export default function StepContact() {
  const t = useTranslations('aiWizard.steps.contact');
  const { answers, setAnswer } = useWizard();
  const { name, email, phone, company } = answers.contact;

  function update(field: keyof typeof answers.contact, value: string) {
    setAnswer('contact', { ...answers.contact, [field]: value });
  }

  return (
    <div className={styles.stepContent}>
      <p className={styles.stepHint}>{t('hint')}</p>
      <div className={styles.contactForm}>
        <div className="form-group">
          <label className="form-label" htmlFor="wiz-name">
            {t('name')} <span className={styles.required}>*</span>
          </label>
          <input
            id="wiz-name"
            className="form-control"
            type="text"
            placeholder={t('namePlaceholder')}
            value={name}
            onChange={e => update('name', e.target.value)}
            autoComplete="name"
          />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="wiz-email">
            {t('email')} <span className={styles.required}>*</span>
          </label>
          <input
            id="wiz-email"
            className="form-control"
            type="email"
            placeholder={t('emailPlaceholder')}
            value={email}
            onChange={e => update('email', e.target.value)}
            autoComplete="email"
          />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="wiz-phone">{t('phone')}</label>
          <input
            id="wiz-phone"
            className="form-control"
            type="tel"
            placeholder={t('phonePlaceholder')}
            value={phone}
            onChange={e => update('phone', e.target.value)}
            autoComplete="tel"
          />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="wiz-company">{t('company')}</label>
          <input
            id="wiz-company"
            className="form-control"
            type="text"
            placeholder={t('companyPlaceholder')}
            value={company}
            onChange={e => update('company', e.target.value)}
            autoComplete="organization"
          />
        </div>
      </div>
    </div>
  );
}
