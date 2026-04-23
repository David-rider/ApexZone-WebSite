'use client';

import { useTranslations } from 'next-intl';
import { useWizard } from './WizardContext';
import styles from '../page.module.css';

const OPTIONS = [
  { key: 'corporate',   icon: '🏢' },
  { key: 'ecommerce',   icon: '🛒' },
  { key: 'portfolio',   icon: '🖼️' },
  { key: 'blog',        icon: '✍️' },
  { key: 'booking',     icon: '📅' },
  { key: 'miniProgram', icon: '📱' },
  { key: 'landing',     icon: '🎯' },
  { key: 'platform',    icon: '⚙️' },
];

export default function StepProjectType() {
  const t = useTranslations('aiWizard.steps.projectType');
  const { answers, setAnswer, goNext } = useWizard();

  function select(key: string) {
    setAnswer('projectType', key);
    setTimeout(goNext, 260);
  }

  return (
    <div className={styles.stepContent}>
      <p className={styles.stepHint}>{t('hint')}</p>
      <div className={styles.optionGrid}>
        {OPTIONS.map(o => (
          <button
            key={o.key}
            className={`selection-card ${answers.projectType === o.key ? 'selected' : ''}`}
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
