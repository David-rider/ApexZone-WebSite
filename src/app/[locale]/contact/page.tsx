import { getTranslations } from 'next-intl/server';
import ContactClient from './ContactClient';
import styles from './page.module.css';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata.contact' });
  
  return {
    title: t('title'),
    description: t('description'),
    keywords: t('keywords').split(',').map(k => k.trim()),
  };
}

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'contact' });

  return (
    <div className={styles.page}>
      {/* Header */}
      <div className={styles.pageHeader}>
        <div className="container reveal">
          <div className="section-title__label">{t('label')}</div>
          <h1 className="md-display-small">{t('title')}</h1>
          <p className="md-body-large">{t('subtitle')}</p>
        </div>
      </div>

      <section className="section">
        <div className="container reveal">
          <ContactClient />
        </div>
      </section>
    </div>
  );
}
