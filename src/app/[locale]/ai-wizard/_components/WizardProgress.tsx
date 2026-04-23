'use client';

import { useWizard } from './WizardContext';
import styles from '../page.module.css';

interface Props {
  locale: string;
}

export default function WizardProgress({ locale: _locale }: Props) {
  const { step, totalSteps, goToStep, answers } = useWizard();

  // A step is "done" if the key answer is filled
  const stepKeys: (keyof typeof answers)[] = [
    'industry', 'projectType', 'goal', 'audience',
    'designStyle', 'features', 'content', 'timeline', 'budget', 'contact',
  ];

  function isDone(i: number) {
    const key = stepKeys[i];
    const val = answers[key];
    if (!val) return false;
    if (Array.isArray(val)) return val.length > 0;
    if (typeof val === 'object') return !!(val as { name: string }).name && !!(val as { email: string }).email;
    return !!val;
  }

  return (
    <div className={styles.progress} role="progressbar" aria-valuenow={step} aria-valuemax={totalSteps}>
      <div className={styles.progressTrack}>
        {Array.from({ length: totalSteps }, (_, i) => {
          const n      = i + 1;
          const active = n === step;
          const done   = isDone(i) && n < step;
          return (
            <button
              key={n}
              className={`${styles.progressDot} ${active ? styles.progressDotActive : ''} ${done ? styles.progressDotDone : ''}`}
              onClick={() => n < step && goToStep(n)}
              aria-label={`Step ${n}`}
              title={`Step ${n}`}
              disabled={n > step}
            >
              {done ? '✓' : n}
            </button>
          );
        })}
      </div>
      <div className={styles.progressBar}>
        <div
          className={styles.progressFill}
          style={{ width: `${((step - 1) / (totalSteps - 1)) * 100}%` }}
        />
      </div>
    </div>
  );
}
