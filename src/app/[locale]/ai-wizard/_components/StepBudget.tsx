'use client';

import { useTranslations } from 'next-intl';
import { useWizard } from './WizardContext';
import styles from '../page.module.css';

const OPTIONS = [
  { key: 'under1k',  icon: '🌱', color: '#E8F5E9' },
  { key: '1kTo3k',   icon: '🌿', color: '#C8E6C9' },
  { key: '3kTo8k',   icon: '🌲', color: '#A5D6A7' },
  { key: '8kTo20k',  icon: '🏔️', color: '#81C784' },
  { key: 'above20k', icon: '💎', color: '#66BB6A' },
  { key: 'discuss',  icon: '💬', color: '#EEF3F0' },
];

export default function StepBudget() {
  const t = useTranslations('aiWizard.steps.budget');
  const { answers, setAnswer, goNext } = useWizard();

  function select(key: string) {
    setAnswer('budget', key);
    setTimeout(goNext, 260);
  }

  return (
    <div className={styles.stepContent}>
      <p className={styles.stepHint}>{t('hint')}</p>
      <div className={`${styles.optionGrid} ${styles.optionGrid3}`}>
        {OPTIONS.map(o => (
          <button
            key={o.key}
            className={`selection-card ${answers.budget === o.key ? 'selected' : ''}`}
            onClick={() => select(o.key)}
            style={{ '--card-color': o.color } as React.CSSProperties}
          >
            <span className="selection-card__icon">{o.icon}</span>
            <span className="selection-card__label">{t(`options.${o.key}`)}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
