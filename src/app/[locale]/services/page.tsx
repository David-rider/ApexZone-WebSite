import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { servicesData } from '@/data/services';
import { getServiceServerTranslations } from '@/i18n/getI18nData';
import styles from './page.module.css';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata.services' });
  
  return {
    title: t('title'),
    description: t('description'),
    keywords: t('keywords').split(',').map(k => k.trim()),
  };
}

export default async function ServicesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale });
  const s = await getTranslations({ locale, namespace: 'services' });
  const h = await getTranslations({ locale, namespace: 'home.cta' });
  
  const { getServiceTitle, getServiceDescription, getFeatureTitle, getFeatureDescription } = await getServiceServerTranslations(locale);

  return (
    <div className={styles.page}>
      {/* Page header */}
      <div className={styles.pageHeader}>
        <div className="container reveal">
          <div className="section-title__label">{s('label')}</div>
          <h1 className="md-display-small">{s('title')}</h1>
          <p className="md-body-large">{s('subtitle')}</p>
        </div>
      </div>

      {/* Services Sections */}
      <div className={styles.servicesGrid}>
        {servicesData.map((service) => {
          const { category, slug, image, featureCount } = service;
          return (
            <section key={slug} id={slug} className={styles.serviceSection}>
              <div className="container">
                <div className={`${styles.serviceBlock} reveal`}>
                  <div className={styles.content}>
                    <div className={styles.label}>{getServiceTitle(category)}</div>
                    <h2 className="md-display-small">
                      {locale.startsWith('zh') ? '开启数字化' : 'Empowering Your'} {getServiceTitle(category)}
                    </h2>
                    <p className={styles.desc}>{getServiceDescription(category)}</p>
                    
                    <ul className={styles.serviceList}>
                      {Array.from({ length: featureCount }).map((_, i) => (
                        <li key={i} className={styles.serviceListItem}>
                          <CheckCircle2 size={18} className="text-primary" />
                          <div>
                            <strong>{getFeatureTitle(category, i)}</strong>
                            <p className="md-body-small opacity-80">{getFeatureDescription(category, i)}</p>
                          </div>
                        </li>
                      ))}
                    </ul>

                    <div className={styles.actions}>
                      <Link href={`/${locale}/contact`} className="btn btn-primary">
                        {t('common.getQuote')} <ArrowRight size={16} />
                      </Link>
                      <Link href={`/${locale}/portfolio`} className="btn btn-outline">
                        {t('common.viewProject')}
                      </Link>
                    </div>
                  </div>

                  <div className={styles.visual}>
                    <Image
                      src={image}
                      alt={getServiceTitle(category)}
                      width={800}
                      height={500}
                      priority={slug === 'web-design'}
                    />
                  </div>
                </div>
              </div>
            </section>
          );
        })}
      </div>

      {/* CTA section */}
      <section className={styles.cta}>
        <div className="container reveal">
          <h2 className="md-display-small">{h('title')}</h2>
          <p className="md-body-large">{h('subtitle')}</p>
          <div className="flex justify-center gap-4">
            <Link href={`/${locale}/contact`} className="btn btn-primary btn-lg">
              {h('button')} <ArrowRight size={18} />
            </Link>
            <Link href={`/${locale}/ai-wizard`} className="btn btn-secondary btn-lg">
              {t('nav.aiWizard')}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

