'use client';

import { useTranslations } from 'next-intl';
import { useWizard } from './WizardContext';
import styles from '../page.module.css';

const OPTIONS = [
  { key: 'leads',       icon: '📊' },
  { key: 'sales',       icon: '💳' },
  { key: 'credibility', icon: '🏆' },
  { key: 'showcase',    icon: '🎨' },
  { key: 'automate',    icon: '🤖' },
  { key: 'launch',      icon: '🚀' },
];

export default function StepGoal() {
  const t = useTranslations('aiWizard.steps.goal');
  const { answers, setAnswer, goNext } = useWizard();

  function select(key: string) {
    setAnswer('goal', key);
    setTimeout(goNext, 260);
  }

  return (
    <div className={styles.stepContent}>
      <p className={styles.stepHint}>{t('hint')}</p>
      <div className={`${styles.optionGrid} ${styles.optionGrid3}`}>
        {OPTIONS.map(o => (
          <button
            key={o.key}
            className={`selection-card ${answers.goal === o.key ? 'selected' : ''}`}
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
