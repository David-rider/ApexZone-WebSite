'use client';

import { useTranslations } from 'next-intl';
import { useWizard } from './WizardContext';
import styles from '../page.module.css';

const OPTIONS = [
  { key: 'asap',     icon: '⚡', weeks: '~2 wks' },
  { key: 'month',    icon: '📅', weeks: '~4 wks' },
  { key: 'quarter',  icon: '🗓️', weeks: '8-12 wks' },
  { key: 'flexible', icon: '🌊', weeks: 'Open' },
];

export default function StepTimeline() {
  const t = useTranslations('aiWizard.steps.timeline');
  const { answers, setAnswer, goNext } = useWizard();

  function select(key: string) {
    setAnswer('timeline', key);
    setTimeout(goNext, 260);
  }

  return (
    <div className={styles.stepContent}>
      <p className={styles.stepHint}>{t('hint')}</p>
      <div className={`${styles.optionGrid} ${styles.optionGrid2}`}>
        {OPTIONS.map(o => (
          <button
            key={o.key}
            className={`selection-card ${styles.selectionCardLg} ${answers.timeline === o.key ? 'selected' : ''}`}
            onClick={() => select(o.key)}
          >
            <span className="selection-card__icon">{o.icon}</span>
            <span className="selection-card__label">{t(`options.${o.key}`)}</span>
            <span className={styles.optionSubLabel}>{o.weeks}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
