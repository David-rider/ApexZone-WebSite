import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import styles from './page.module.css';

const VALUES = ['quality', 'results', 'partnership', 'innovation'] as const;
const VALUE_ICONS = ['⭐', '📊', '🤝', '🔬'];

const STATS = [
  { value: '50+',  key: 'clients'      },
  { value: '80+',  key: 'projects'     },
  { value: '98%',  key: 'satisfaction' },
  { value: '5+',   key: 'years'        },
];

export default function AboutPage() {
  const t      = useTranslations('about');
  const locale = useLocale();

  return (
    <div className={styles.page}>
      {/* Header */}
      <div className={styles.pageHeader}>
        <div className="container">
          <div className="section-title__label">{t('label')}</div>
          <h1 className="md-display-small">{t('title')}</h1>
          <p className="md-body-large">{t('subtitle')}</p>
        </div>
      </div>

      {/* Story */}
      <section className="section">
        <div className="container">
          <div className={styles.storyGrid}>
            <div className={styles.storyLeft}>
              <div className="section-title__label">{t('missionLabel')}</div>
              <h2 className="md-headline-medium">{t('mission')}</h2>
              <p className="md-body-large">{t('story')}</p>
            </div>
            <div className={styles.storyRight}>
              <div className={styles.statsCard}>
                {STATS.map(s => (
                  <div key={s.key} className={styles.statItem}>
                    <div className="stat-number">{s.value}</div>
                    <div className={styles.statLabel}>{t(`stats.${s.key}`)}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className={`section ${styles.valuesBg}`}>
        <div className="container">
          <div className="section-title">
            <div className="section-title__label">{t('values.title')}</div>
            <h2 className="md-headline-large">{t('values.title')}</h2>
          </div>
          <div className="grid-2">
            {VALUES.map((key, i) => (
              <div key={key} className={styles.valueCard}>
                <div className={styles.valueIcon}>{VALUE_ICONS[i]}</div>
                <div>
                  <h3 className="md-title-large">{t(`values.${key}.title`)}</h3>
                  <p className="md-body-medium">{t(`values.${key}.desc`)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why us */}
      <section className="section">
        <div className="container">
          <div className={styles.whyGrid}>
            <div className="reveal">
              <div className="section-title__label">{t('why.label')}</div>
              <h2 className="md-headline-medium">{t('why.title')}</h2>
              <div className={styles.whyList}>
                {(t.raw('why.items') as string[]).map((item, i) => (
                  <div key={i} className={styles.whyItem} style={{ animationDelay: `${i * 0.1}s` }}>
                    <CheckCircle2 size={18} color="var(--md-sys-color-primary)" />
                    <span className="md-body-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className={`${styles.whyVisual} reveal`}>
              <div className={styles.whyCard}>
                <div className={styles.whyCardInner}>
                  <div className={styles.whyLogo}>AZ</div>
                  <p className="md-title-medium">Apex Zone Agency</p>
                  <p className="md-body-small text-muted">{t('why.visualSubtitle')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className={styles.cta}>
        <div className="container reveal">
          <h2 className="md-headline-medium">{t('cta.title')}</h2>
          <Link href={`/${locale}/contact`} className="btn btn-primary btn-lg" style={{ marginTop: '24px' }}>
            {t('cta.button')} <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </div>
  );
}
