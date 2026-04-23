'use client';

import { useTranslations } from 'next-intl';
import { useWizard } from './WizardContext';
import styles from '../page.module.css';

const OPTIONS = [
  { key: 'clean',   icon: '🧊', color: '#E8F4FD' },
  { key: 'bold',    icon: '⚡', color: '#FFF3CD' },
  { key: 'minimal', icon: '◻️', color: '#F8F9FA' },
  { key: 'warm',    icon: '🌸', color: '#FDE8EC' },
  { key: 'tech',    icon: '🤖', color: '#E8F0FE' },
  { key: 'luxe',    icon: '💎', color: '#F5F0FF' },
];

export default function StepDesignStyle() {
  const t = useTranslations('aiWizard.steps.designStyle');
  const { answers, setAnswer, goNext } = useWizard();

  function select(key: string) {
    setAnswer('designStyle', key);
    setTimeout(goNext, 260);
  }

  return (
    <div className={styles.stepContent}>
      <p className={styles.stepHint}>{t('hint')}</p>
      <div className={`${styles.optionGrid} ${styles.optionGrid3}`}>
        {OPTIONS.map(o => (
          <button
            key={o.key}
            className={`selection-card ${answers.designStyle === o.key ? 'selected' : ''}`}
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
