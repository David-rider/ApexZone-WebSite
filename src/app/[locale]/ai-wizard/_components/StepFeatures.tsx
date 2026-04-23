import { useTranslations, useLocale } from 'next-intl';
import { Check, Sparkles } from 'lucide-react';
import { useWizard } from './WizardContext';
import { INDUSTRY_RECOMMENDATIONS, PROJECT_TYPE_RECOMMENDATIONS } from '../logic';
import styles from '../page.module.css';

const OPTIONS = [
  { key: 'contactForm',  icon: '📝' },
  { key: 'booking',      icon: '📅' },
  { key: 'ecommerce',    icon: '🛒' },
  { key: 'blog',         icon: '📰' },
  { key: 'multilingual', icon: '🌐' },
  { key: 'aiChat',       icon: '🤖' },
  { key: 'memberLogin',  icon: '🔐' },
  { key: 'video',        icon: '🎥' },
  { key: 'map',          icon: '📍' },
  { key: 'seo',          icon: '📈' },
];

export default function StepFeatures() {
  const t = useTranslations('aiWizard.steps.features');
  const locale = useLocale();
  const { answers, setAnswer } = useWizard();
  const selected = answers.features;

  const indRec = INDUSTRY_RECOMMENDATIONS[answers.industry];
  const typeRec = PROJECT_TYPE_RECOMMENDATIONS[answers.projectType] || [];
  const allRecs = new Set([...(indRec?.features || []), ...typeRec]);

  function toggle(key: string) {
    const next = selected.includes(key)
      ? selected.filter(k => k !== key)
      : [...selected, key];
    setAnswer('features', next);
  }

  return (
    <div className={styles.stepContent}>
      <p className={styles.stepHint}>{t('hint')}</p>
      
      {indRec && (
        <div className={styles.recBanner}>
          <Sparkles size={16} />
          <span>{locale === 'zh' ? indRec.reasonZh : indRec.reasonEn}</span>
        </div>
      )}

      <div className={styles.optionGrid}>
        {OPTIONS.map(o => {
          const on = selected.includes(o.key);
          const isRec = allRecs.has(o.key);
          
          return (
            <button
              key={o.key}
              className={`selection-card ${on ? 'selected' : ''} ${isRec ? styles.recCard : ''}`}
              onClick={() => toggle(o.key)}
              aria-pressed={on}
            >
              {isRec && (
                <div className={styles.recBadge}>
                  {locale === 'zh' ? '专家推荐' : 'Recommended'}
                </div>
              )}
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

