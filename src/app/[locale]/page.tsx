import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import Image from 'next/image';
import {
  Globe, Smartphone, Palette, TrendingUp,
  ArrowRight, CheckCircle2, Star, Sparkles,
  ChevronRight, Phone
} from 'lucide-react';
import { portfolioItems } from '@/data/portfolio';
import styles from './page.module.css';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  
  const translations: Record<string, any> = {
    en: {
      title: 'Home | Apex Zone Professional Web Design & Digital Marketing in New York (NYC)',
      description: 'Apex Zone builds high-converting websites, apps, and brand identities for businesses in New York City (NYC). Bilingual (EN/ZH) web design, Local SEO, and digital marketing services.',
      keywords: ['Web Design New York', 'NYC Website Development', 'Local SEO NYC', 'Bilingual Web Design NYC', 'Real Estate Digital Marketing', 'Digital Twin Solutions', 'SEO/GEO Promotion', 'Media Digital Operations', 'Premium Web Design New York', 'AI-Powered Web Design']
    },
    zh: {
      title: '首页 | Apex Zone 纽约专业网站设计与数字营销 (NYC)',
      description: 'Apex Zone 为纽约 (New York) 及全美企业打造高转化率的网站、应用和品牌形象。提供中英双语网站设计、本地 SEO 和数字营销服务。',
      keywords: ['纽约网站设计', 'NYC 网页开发', '纽约 SEO', '中英双语网站', '纽约品牌设计', '地产数字营销系统', '数字孪生可视化', '网站SEO/GEO推广', '媒体数字化运营', '美国华人网页设计']
    },
    es: {
      title: 'Inicio | Apex Zone Diseño Web Profesional y Marketing Digital en Nueva York (NYC)',
      description: 'Apex Zone crea sitios web, aplicaciones e identidades de marca de alta conversión para empresas en la ciudad de Nueva York (NYC). Diseño web, SEO local y marketing digital.',
      keywords: ['Diseño Web Nueva York', 'Desarrollo Web NYC', 'SEO Local NYC', 'Marketing Digital NYC', 'Diseño de Marca NYC']
    },
    ko: {
      title: '홈 | Apex Zone 뉴욕 전문 웹 디자인 및 디지털 마케팅 (NYC)',
      description: 'Apex Zone은 뉴욕시(NYC) 기업을 위한 전환율 높은 웹사이트, 앱 및 브랜드 아이덴티티를 구축합니다. 웹 디자인, 로컬 SEO 및 디지털 마케팅 서비스를 제공합니다.',
      keywords: ['뉴욕 웹 디자인', 'NYC 웹 개발', '뉴욕 SEO', '디지털 마케팅 뉴욕', '브랜드 디자인 NYC']
    },
    ja: {
      title: 'ホーム | Apex Zone ニューヨークのプロフェッショナルなウェブデザインとデジタルマーケティング (NYC)',
      description: 'Apex Zoneは、ニューヨーク市（NYC）の企業向けに、コンバージョン率の高いウェブサイト、アプリ、ブランドアイデンティティを構築します。ウェブデザイン、ローカルSEO、デジタルマーケティングサービス。',
      keywords: ['ニューヨーク ウェブデザイン', 'NYC ウェブ開発', 'ニューヨーク SEO', 'デジタルマーケティング ニューヨーク', 'ブランドデザイン NYC']
    },
    ru: {
      title: 'Главная | Apex Zone Профессиональный веб-дизайн и цифровой маркетинг в Нью-Йорке (NYC)',
      description: 'Apex Zone создает высококонверсионные веб-сайты, приложения и айдентику брендов для бизнеса в Нью-Йорке (NYC). Веб-дизайн, локальное SEO и цифровой маркетинг.',
      keywords: ['Веб-дизайн Нью-Йорк', 'Разработка сайтов NYC', 'Локальное SEO NYC', 'Цифровой маркетинг NYC', 'Дизайн бренда NYC']
    },
    it: {
      title: 'Home | Apex Zone Design Web Professionale e Marketing Digitale a New York (NYC)',
      description: 'Apex Zone realizza siti web, app e identità di brand ad alta conversione per aziende a New York City (NYC). Web design, SEO locale e marketing digitale.',
      keywords: ['Design Web New York', 'Sviluppo Web NYC', 'SEO Locale NYC', 'Marketing Digitale NYC', 'Design del Brand NYC']
    }
  };

  const meta = translations[locale] || translations.en;
  
  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
  };
}

export default function HomePage() {
  const t      = useTranslations('home');
  const c      = useTranslations('common');
  const pt     = useTranslations('portfolio');
  const locale = useLocale();
  const isZh   = locale === 'zh';

  // Get first two items for preview
  const previewItems = portfolioItems.slice(0, 2);

  const serviceIcons  = [Globe, Smartphone, Palette, TrendingUp];
  const serviceKeys   = ['webDesign', 'appDev', 'brandDesign', 'seoMarketing'] as const;
  const servicePaths  = ['web-design', 'app-dev', 'brand-design', 'seo-marketing'];
  const serviceColors = ['sage', 'sky', 'blossom', 'teal'];

  const stats = [
    { value: '50+', key: 'clients'      },
    { value: '5+',  key: 'years'        },
    { value: '98%', key: 'satisfaction' },
    { value: '12+', key: 'industries'   },
  ];

  const processKeys  = ['step1', 'step2', 'step3', 'step4'] as const;
  const processIcons = ['🔍', '✏️', '⚡', '🚀'];

  return (
    <>
      {/* ===== HERO ===== */}
      <section className={styles.hero}>
        <div className={styles.heroParticles} aria-hidden>
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className={styles.particle}
              style={{
                left:              `${10 + i * 8}%`,
                top:               `${15 + (i % 5) * 15}%`,
                animationDuration: `${5 + i * 0.7}s`,
                animationDelay:    `${i * 0.4}s`,
                opacity:            0.07 + (i % 4) * 0.025,
                fontSize:          `${16 + (i % 3) * 8}px`,
              }}
            >
              {['🌿', '🍃', '✦', '◆', '∘', '·'][i % 6]}
            </div>
          ))}
        </div>

        <div className="container">
          <div className={styles.heroGrid}>
            {/* Left */}
            <div className={styles.heroContent}>
              <div className={styles.heroBadge}>
                <Sparkles size={12} />
                {t('hero.badge')}
              </div>
              <h1 className={`md-display-large ${styles.heroTitle}`}>
                {t('hero.title')}
              </h1>
              <p className={`md-body-large ${styles.heroSubtitle}`}>
                {t('hero.subtitle')}
              </p>
              <div className={styles.heroCtas}>
                <Link href={`/${locale}/portfolio`} className="btn btn-primary btn-lg">
                  {t('hero.cta1')}
                  <ArrowRight size={18} />
                </Link>
                <Link href={`/${locale}/contact`} className="btn btn-secondary btn-lg">
                  {t('hero.cta2')}
                </Link>
              </div>
              <div className={styles.heroTrust}>
                <div className={styles.heroStars}>
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} fill="var(--amber)" color="var(--amber)" />
                  ))}
                </div>
                <span className="md-body-small text-muted">{c('trustLabel')}</span>
              </div>
            </div>

            {/* Right visual */}
            <div className={styles.heroVisual}>
              <div className={styles.heroCard}>
                <div className={styles.heroCardMock}>
                  <div className={styles.mockBar}>
                    <div className={styles.mockDots}>
                      <span style={{ background: 'var(--error)' }} />
                      <span style={{ background: 'var(--warning)' }} />
                      <span style={{ background: 'var(--success)' }} />
                    </div>
                    <div className={styles.mockUrl}>apexzone.us</div>
                  </div>
                  <div className={styles.mockContent}>
                    <div className={styles.mockHero} />
                    <div className={styles.mockNav}>
                      {[...Array(4)].map((_, i) => <div key={i} className={styles.mockPill} />)}
                    </div>
                    <div className={styles.mockCards}>
                      {[...Array(3)].map((_, i) => <div key={i} className={styles.mockCardItem} />)}
                    </div>
                  </div>
                </div>
                <div className={styles.heroCardBadge}>
                  <CheckCircle2 size={14} color="var(--md-sys-color-primary)" />
                  <span>{t('hero.liveOptimized')}</span>
                </div>
              </div>

              <div className={`${styles.floatCard} ${styles.floatCard1}`}>
                <div className={styles.floatCardIcon}>📈</div>
                <div>
                  <div className={styles.floatCardValue}>+240%</div>
                  <div className={styles.floatCardLabel}>{t('hero.organicTraffic')}</div>
                </div>
              </div>
              <div className={`${styles.floatCard} ${styles.floatCard2}`}>
                <div className={styles.floatCardIcon}>⚡</div>
                <div>
                  <div className={styles.floatCardValue}>98</div>
                  <div className={styles.floatCardLabel}>{t('hero.lighthouseScore')}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== STATS BAR ===== */}
      <section className={styles.statsBar}>
        <div className="container">
          <div className={styles.statsGrid}>
            {stats.map(s => (
              <div key={s.key} className={styles.statItem}>
                <div className="stat-number">{s.value}</div>
                <div className={styles.statLabel}>{t(`stats.${s.key}`)}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SERVICES ===== */}
      <section className="section">
        <div className="container">
          <div className="section-title">
            <div className="section-title__label">{t('services.label')}</div>
            <h2 className="text-h2">{t('services.title')}</h2>
            <p>{t('services.subtitle')}</p>
          </div>
          <div className="grid-4">
            {serviceKeys.map((key, i) => {
              const Icon = serviceIcons[i];
              return (
                <Link
                  key={key}
                  href={`/${locale}/services#${servicePaths[i]}`}
                  className={styles.serviceCard}
                >
                  <div className={`${styles.serviceIcon} ${styles[`serviceIcon_${serviceColors[i]}`]}`}>
                    <Icon size={24} />
                  </div>
                  <h3 className={styles.serviceTitle}>{t(`services.${key}.title`)}</h3>
                  <p className={styles.serviceDesc}>{t(`services.${key}.desc`)}</p>
                  <div className={styles.serviceArrow}>
                    <ChevronRight size={16} />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== PORTFOLIO PREVIEW ===== */}
      <section className={`section ${styles.portfolioSection}`}>
        <div className="container">
          <div className="section-title">
            <div className="section-title__label">{t('portfolio.label')}</div>
            <h2 className="text-h2">{t('portfolio.title')}</h2>
            <p>{t('portfolio.subtitle')}</p>
          </div>
          <div className={styles.portfolioGrid}>
            {previewItems.map(item => {
              const getField = (obj: any, base: string) => {
                if (locale === 'en') return obj[base];
                const key = `${base}${locale.charAt(0).toUpperCase() + locale.slice(1)}`;
                return obj[key] || obj[base];
              };
              const title = getField(item, 'title');
              const client = getField(item, 'client');
              const location = getField(item, 'location');

              return (
                <Link key={item.id} href={`/${locale}/portfolio/${item.slug}`} className={styles.portfolioItem}>
                  <div className={styles.portfolioImg}>
                    <Image 
                      src={item.image} 
                      alt={client} 
                      fill 
                      style={{ objectFit: 'cover' }}
                    />
                    <div className={styles.portfolioOverlay}>
                      <ArrowRight size={24} color="white" />
                    </div>
                  </div>
                  <div className={styles.portfolioBody}>
                    <div className={styles.portfolioTags}>
                      <span className="badge badge-sage">
                        {pt(`filters.${item.category}`)}
                      </span>
                      <span className="badge badge-sky">
                        {pt(`industries.${item.industry}`)}
                      </span>
                    </div>
                    <h3 className={styles.portfolioTitle}>
                      {title}
                    </h3>
                    <p className={styles.portfolioClient}>
                      {client} · {location}
                    </p>
                  </div>
                </Link>
              );
            })}

            {/* CTA card */}
            <div className={styles.portfolioCta}>
              <div className={styles.portfolioCtaIcon}>🎯</div>
              <h3 className="md-title-large">{t('portfolio.ctaTitle')}</h3>
              <p className="md-body-medium text-muted">{t('portfolio.ctaDesc')}</p>
              <Link href={`/${locale}/contact`} className="btn btn-primary">
                {t('portfolio.ctaBtn')}
              </Link>
            </div>
          </div>

          <div className={styles.portfolioViewAll}>
            <Link href={`/${locale}/portfolio`} className="btn btn-secondary">
              {t('portfolio.viewAll')} <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ===== PROCESS ===== */}
      <section className="section">
        <div className="container">
          <div className="section-title">
            <div className="section-title__label">{t('process.label')}</div>
            <h2 className="text-h2">{t('process.title')}</h2>
            <p>{t('process.subtitle')}</p>
          </div>
          <div className={styles.processGrid}>
            {processKeys.map((key, i) => (
              <div key={key} className={styles.processStep}>
                <div className={styles.processNum}>{processIcons[i]}</div>
                <h4 className={styles.processTitle}>{t(`process.${key}.title`)}</h4>
                <p className={styles.processDesc}>{t(`process.${key}.desc`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA SECTION ===== */}
      <section className={styles.ctaSection}>
        <div className={styles.ctaBg} aria-hidden />
        <div className="container">
          <div className={styles.ctaInner}>
            <div className={styles.ctaBadge}>
              <Sparkles size={14} />
              {t('cta.label')}
            </div>
            <h2 className={`md-headline-large ${styles.ctaTitle}`}>{t('cta.title')}</h2>
            <p className={styles.ctaSubtitle}>{t('cta.subtitle')}</p>
            <div className={styles.ctaActions}>
              <Link href={`/${locale}/contact`} className={`btn btn-primary btn-lg ${styles.ctaBtn}`}>
                {t('cta.button')}
                <ArrowRight size={18} />
              </Link>
              <a href="tel:+1929XXXXXXX" className={styles.ctaPhone}>
                <Phone size={16} />
                {t('cta.phone')}
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
