'use client';

import { useTranslations } from 'next-intl';
import { useWizard } from './WizardContext';
import styles from '../page.module.css';

const OPTIONS = [
  { key: 'restaurant',    icon: '🍜' },
  { key: 'retail',        icon: '🛍️' },
  { key: 'tech',          icon: '💻' },
  { key: 'healthcare',    icon: '🏥' },
  { key: 'finance',       icon: '💰' },
  { key: 'education',     icon: '📚' },
  { key: 'realEstate',    icon: '🏡' },
  { key: 'manufacturing', icon: '🏭' },
  { key: 'beauty',        icon: '💄' },
  { key: 'other',         icon: '✨' },
];

export default function StepIndustry() {
  const t = useTranslations('aiWizard.steps.industry');
  const { answers, setAnswer, goNext } = useWizard();

  function select(key: string) {
    setAnswer('industry', key);
    setTimeout(goNext, 260);
  }

  return (
    <div className={styles.stepContent}>
      <p className={styles.stepHint}>{t('hint')}</p>
      <div className={styles.optionGrid}>
        {OPTIONS.map(o => (
          <button
            key={o.key}
            className={`selection-card ${answers.industry === o.key ? 'selected' : ''}`}
            onClick={() => select(o.key)}
          >
            <span className="selection-card__icon">{o.icon}</span>
            <span className="selection-card__label">{t(`options.${o.key}`)}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
