import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, CheckCircle2, Globe, Smartphone, Palette, TrendingUp } from 'lucide-react';
import styles from './page.module.css';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const isZh = locale.startsWith('zh');
  
  return {
    title: isZh ? '我们的服务 | 纽约网站设计与全案开发 (NYC)' : 'Our Services | Web Design & Development in New York (NYC)',
    description: isZh 
      ? '提供纽约最专业的网站建设、APP开发、品牌设计及本地 SEO 营销服务，助力您的业务在全美增长。' 
      : 'Professional web design, app development, brand identity, and Local SEO services in NYC to grow your business across the US.',
    keywords: isZh
      ? ['纽约APP开发', '美国软件外包', '纽约SEO服务', '中英双语UI设计', '纽约数字营销代理']
      : ['App Development NYC', 'Software Outsourcing New York', 'SEO Services NYC', 'Bilingual UI Design', 'Digital Marketing Agency NYC'],
  };
}

const SERVICES = [
  {
    key:   'webDesign',
    icon:  Globe,
    image: '/images/services/web.png',
    slug:  'web-design',
  },
  {
    key:   'appDev',
    icon:  Smartphone,
    image: '/images/services/app.png',
    slug:  'app-dev',
  },
  {
    key:   'brandDesign',
    icon:  Palette,
    image: '/images/services/brand.png',
    slug:  'brand-design',
  },
  {
    key:   'seoMarketing',
    icon:  TrendingUp,
    image: '/images/services/seo.png',
    slug:  'seo-marketing',
  },
] as const;

export default function ServicesPage() {
  const t      = useTranslations();
  const locale = useLocale();
  const s      = useTranslations('services');
  const h      = useTranslations('home.cta');

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
        {SERVICES.map(({ key, image, slug }) => {
          const items: string[] = s.raw(`${key}.items`) as string[];
          return (
            <section key={key} id={slug} className={styles.serviceSection}>
              <div className="container">
                <div className={`${styles.serviceBlock} reveal`}>
                  <div className={styles.content}>
                    <div className={styles.label}>{s(`${key}.title`)}</div>
                    <h2 className="md-display-small">
                      {locale.startsWith('zh') ? '开启数字化' : 'Empowering Your'} {s(`${key}.title`)}
                    </h2>
                    <p className={styles.desc}>{s(`${key}.desc`)}</p>
                    
                    <ul className={styles.serviceList}>
                      {items.map((item, i) => (
                        <li key={i} className={styles.serviceListItem}>
                          <CheckCircle2 size={18} className="text-primary" />
                          <span>{item}</span>
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
                      alt={s(`${key}.title`)}
                      width={800}
                      height={500}
                      priority={key === 'webDesign'}
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
