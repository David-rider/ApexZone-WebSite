'use client';

import { useTranslations } from 'next-intl';
import { Check } from 'lucide-react';
import { useWizard } from './WizardContext';
import styles from '../page.module.css';

const OPTIONS = [
  { key: 'usEnglish', icon: '🇺🇸' },
  { key: 'chinese',   icon: '🇨🇳' },
  { key: 'multilingual', icon: '🌐' },
];

export default function StepAudience() {
  const t = useTranslations('aiWizard.steps.audience');
  const { answers, setAnswer } = useWizard();
  const selected = answers.audience;

  function toggle(key: string) {
    const next = selected.includes(key)
      ? selected.filter(k => k !== key)
      : [...selected, key];
    setAnswer('audience', next);
  }

  return (
    <div className={styles.stepContent}>
      <p className={styles.stepHint}>{t('hint')}</p>
      <div className={`${styles.optionGrid} ${styles.optionGrid3}`}>
        {OPTIONS.map(o => {
          const on = selected.includes(o.key);
          return (
            <button
              key={o.key}
              className={`selection-card ${on ? 'selected' : ''}`}
              onClick={() => toggle(o.key)}
              aria-pressed={on}
            >
              {on && (
                <div className={styles.checkMark}>
                  <Check size={12} />
                </div>
              )}
              <span className="selection-card__icon">{o.icon}</span>
              <span className="selection-card__label">{t(`options.${o.key}`)}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
