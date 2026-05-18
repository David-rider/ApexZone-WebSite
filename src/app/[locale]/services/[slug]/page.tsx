import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import { 
  ArrowLeft, 
  Layout, 
  Smartphone, 
  Palette, 
  TrendingUp, 
  CheckCircle2, 
  ArrowRight,
  MessageCircleQuestion
} from 'lucide-react';
import { servicesData } from '@/data/services';
import styles from './page.module.css';

interface Props {
  params: Promise<{ locale: string; slug: string }>;
}

const ICONS: Record<string, any> = {
  Layout,
  Smartphone,
  Palette,
  TrendingUp
};

const SLUG_TO_KEY: Record<string, string> = {
  'web-design-development': 'webDesign',
  'mobile-app-development': 'appDev',
  'brand-identity-design': 'brandDesign',
  'seo-digital-marketing': 'seoMarketing'
};

export async function generateStaticParams() {
  const locales = ['en', 'zh-CN', 'zh-TW', 'es', 'ko', 'ja', 'ru', 'it'];
  const params: { locale: string; slug: string }[] = [];
  
  locales.forEach(locale => {
    servicesData.forEach(service => {
      params.push({ locale, slug: service.slug });
    });
  });
  
  return params;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const serviceKey = SLUG_TO_KEY[slug];
  if (!serviceKey) return {};

  const t = await getTranslations({ locale, namespace: 'services' });
  const title = t(`${serviceKey}.title`);
  const desc = t(`${serviceKey}.description`);

  return {
    title: `${title} | Apex Zone NYC Agency`,
    description: desc,
    keywords: [title, 'New York Web Agency', 'NYC Digital Marketing', 'Bilingual Tech Solutions']
  };
}

export default async function ServiceDetailPage({ params }: Props) {
  const { locale, slug } = await params;
  const service = servicesData.find(s => s.slug === slug);
  const serviceKey = SLUG_TO_KEY[slug];
  
  if (!service || !serviceKey) {
    notFound();
  }

  const t = await getTranslations({ locale, namespace: 'services' });
  const tc = await getTranslations({ locale, namespace: 'common' });

  const IconComp = ICONS[service.icon] || Layout;

  // Resolve strings from JSON
  const title = t(`${serviceKey}.title`);
  const desc  = t(`${serviceKey}.description`);

  // UI labels from common + services namespaces
  const backBtn      = tc('back');
  const getStarted   = tc('startProject');
  const capabilities = t('capabilities');
  const processLabel = tc('ourProcess');
  const processDesc  = t('processDesc');
  const faqsLabel    = t('faq');
  const readyLabel   = t('ready');
  const contactLabel = tc('contactUs');
  const contactBtn   = tc('startProject');

  return (
    <div className={styles.page}>
      {/* Hero */}
      <section className={styles.hero}>
        <div className="container">
          <Link href={`/${locale}/services`} className={styles.backLink}>
            <ArrowLeft size={16} />
            <span>{backBtn}</span>
          </Link>
          
          <div className={styles.heroGrid}>
            <div className={styles.heroInfo}>
              <div className={styles.iconBox}>
                <IconComp size={32} />
              </div>
              <h1 className="md-display-small">{title}</h1>
              <p className="md-body-large">{desc}</p>
              <div className={styles.heroActions}>
                <Link href={`/${locale}/contact`} className="btn btn-primary btn-lg">
                  {getStarted} <ArrowRight size={18} />
                </Link>
              </div>
            </div>
            <div className={styles.heroVisual} aria-hidden>
              <div className={styles.decoCircle} />
              <div className={styles.decoDots} />
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="section">
        <div className="container">
          <div className="section-title">
            <h2 className="md-headline-medium">{capabilities}</h2>
          </div>
          <div className={styles.featureGrid}>
            {(t.raw(`${serviceKey}.features`) as any[]).map((f, i) => (
              <div key={i} className={styles.featureCard}>
                <div className={styles.featureIcon}>
                  <CheckCircle2 size={24} color="var(--md-sys-color-primary)" />
                </div>
                <div>
                  <h3 className="md-title-large">{f.title}</h3>
                  <p className="md-body-medium text-muted">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className={`section ${styles.processSection}`}>
        <div className="container">
          <div className="section-title">
            <h2 className="md-headline-medium">{processLabel}</h2>
            <p className="md-body-large">{processDesc}</p>
          </div>
          <div className={styles.processGrid}>
            {(t.raw(`${serviceKey}.process`) as any[]).map((p, i) => (
              <div key={i} className={styles.processItem}>
                <div className={styles.processStep}>{p.step}</div>
                <h3 className="md-title-medium">{p.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section">
        <div className="container">
          <div className={styles.faqHeader}>
            <MessageCircleQuestion size={32} />
            <h2 className="md-headline-medium">{faqsLabel}</h2>
          </div>
          <div className={styles.faqList}>
            {(t.raw(`${serviceKey}.faqs`) as any[]).map((f, i) => (
              <div key={i} className={styles.faqItem}>
                <h3 className="md-title-medium">{f.q}</h3>
                <p className="md-body-medium text-muted">{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className={styles.cta}>
        <div className="container">
          <div className={styles.ctaCard}>
            <h2 className="md-headline-medium">
              {readyLabel}
            </h2>
            <p className="md-body-large">
              {contactLabel}
            </p>
            <Link href={`/${locale}/contact`} className="btn btn-white btn-lg" style={{ marginTop: '24px' }}>
              {contactBtn}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
