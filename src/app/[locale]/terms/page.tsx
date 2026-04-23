import { useTranslations } from 'next-intl';
import styles from '../about/page.module.css';

export default function TermsPage() {
  const t = useTranslations('terms');

  return (
    <div className={styles.page}>
      <div className={styles.pageHeader}>
        <div className="container">
          <h1 className="md-display-small">{t('title')}</h1>
          <p className="md-body-large">{t('lastUpdated')}</p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <p className="md-body-large" style={{ marginBottom: '40px' }}>
              {t('intro')}
            </p>

            {(t.raw('sections') as any[]).map((section, i) => (
              <div key={i} style={{ marginBottom: '32px' }}>
                <h2 className="md-title-large" style={{ marginBottom: '12px' }}>
                  {section.title}
                </h2>
                <p className="md-body-medium text-muted">
                  {section.content}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
