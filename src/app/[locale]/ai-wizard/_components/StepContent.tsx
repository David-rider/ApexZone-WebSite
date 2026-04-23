'use client';

import { useTranslations } from 'next-intl';
import { useWizard } from './WizardContext';
import styles from '../page.module.css';

const OPTIONS = [
  { key: 'ready',   icon: '✅', pct: 100 },
  { key: 'half',    icon: '📝', pct: 50 },
  { key: 'ideas',   icon: '💡', pct: 20 },
  { key: 'scratch', icon: '🌱', pct: 0  },
];

export default function StepContent() {
  const t = useTranslations('aiWizard.steps.content');
  const { answers, setAnswer, goNext } = useWizard();

  function select(key: string) {
    setAnswer('content', key);
    setTimeout(goNext, 260);
  }

  return (
    <div className={styles.stepContent}>
      <p className={styles.stepHint}>{t('hint')}</p>
      <div className={`${styles.optionGrid} ${styles.optionGrid2}`}>
        {OPTIONS.map(o => (
          <button
            key={o.key}
            className={`selection-card ${styles.selectionCardLg} ${answers.content === o.key ? 'selected' : ''}`}
            onClick={() => select(o.key)}
          >
            <span className="selection-card__icon">{o.icon}</span>
            <span className="selection-card__label">{t(`options.${o.key}`)}</span>
            <div className={styles.contentBar}>
              <div className={styles.contentBarFill} style={{ width: `${o.pct}%` }} />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
