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

export async function generateStaticParams() {
  const locales = ['en', 'zh'];
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
  const service = servicesData.find(s => s.slug === slug);
  if (!service) return {};

  const isZh = locale === 'zh';
  const title = isZh ? service.titleZh : service.title;
  const desc = isZh ? service.descZh : service.desc;

  return {
    title: `${title} | Apex Zone NYC Agency`,
    description: desc,
    keywords: [title, 'New York Web Agency', 'NYC Digital Marketing', 'Bilingual Tech Solutions']
  };
}

export async function ServiceDetailPage({ params }: Props) {
  const { locale, slug } = await params;
  const service = servicesData.find(s => s.slug === slug);
  
  if (!service) {
    notFound();
  }

  const t = await getTranslations('common');
  const IconComp = ICONS[service.icon] || Layout;

  const getField = (obj: any, base: string) => {
    if (locale === 'en') return obj[base];
    const key = `${base}${locale.charAt(0).toUpperCase() + locale.slice(1)}`;
    return obj[key] || obj[base];
  };

  const labels: Record<string, any> = {
    en: { back: 'Back to Services', getStarted: 'Get Started', capabilities: 'Core Capabilities', process: 'Our Process', processDesc: 'From strategy to delivery, we ensure excellence.', faqs: 'FAQs', ready: 'Ready to start your project?', contact: 'Book a free strategy session', contactBtn: 'Contact Us Today' },
    zh: { back: '返回服务列表', getStarted: '立即咨询', capabilities: '核心优势', process: '服务流程', processDesc: '从策略到交付，我们确保每一步都追求卓越。', faqs: '常见问题', ready: '准备好开启您的项目了吗？', contact: '预约免费策略会议，获取定制化方案建议。', contactBtn: '预约咨询' },
    es: { back: 'Volver a Servicios', getStarted: 'Empezar', capabilities: 'Capacidades Principales', process: 'Nuestro Proceso', processDesc: 'Desde la estrategia hasta la entrega, aseguramos la excelencia.', faqs: 'Preguntas Frecuentes', ready: '¿Listo para empezar?', contact: 'Reserva una sesión estratégica gratuita', contactBtn: 'Contáctanos Hoy' },
    ko: { back: '서비스로 돌아가기', getStarted: '시작하기', capabilities: '핵심 역량', process: '진행 프로세스', processDesc: '전략부터 납품까지 탁월함을 보장합니다.', faqs: '자주 묻는 질문', ready: '프로젝트를 시작할 준비가 되셨나요?', contact: '무료 전략 세션을 예약하세요', contactBtn: '지금 문의하기' },
    ja: { back: 'サービス一覧へ', getStarted: '開始する', capabilities: '主な機能', process: '制作プロセス', processDesc: '戦略から納品まで、卓越性を追求します。', faqs: 'よくある質問', ready: 'プロジェクトを開始する準備はできましたか？', contact: '無料の戦略セッションを予約する', contactBtn: '今すぐお問い合わせ' },
    ru: { back: 'Назад к услугам', getStarted: 'Начать', capabilities: 'Ключевые возможности', process: 'Наш процесс', processDesc: 'От стратегии до реализации мы гарантируем качество.', faqs: 'Вопросы и ответы', ready: 'Готовы начать проект?', contact: 'Запишитесь на бесплатную консультацию', contactBtn: 'Связаться с нами' },
    it: { back: 'Torna ai Servizi', getStarted: 'Inizia', capabilities: 'Capacità Core', process: 'Il Nostro Processo', processDesc: 'Dalla strategia alla consegna, garantiamo l\'eccellenza.', faqs: 'Domande Frequenti', ready: 'Pronto per iniziare?', contact: 'Prenota una sessione strategica gratuita', contactBtn: 'Contattaci Oggi' }
  };

  const l = labels[locale] || labels.en;

  return (
    <div className={styles.page}>
      {/* Hero */}
      <section className={styles.hero}>
        <div className="container">
          <Link href={`/${locale}/services`} className={styles.backLink}>
            <ArrowLeft size={16} />
            <span>{l.back}</span>
          </Link>
          
          <div className={styles.heroGrid}>
            <div className={styles.heroInfo}>
              <div className={styles.iconBox}>
                <IconComp size={32} />
              </div>
              <h1 className="md-display-small">{getField(service, 'title')}</h1>
              <p className="md-body-large">{getField(service, 'desc')}</p>
              <div className={styles.heroActions}>
                <Link href={`/${locale}/contact`} className="btn btn-primary btn-lg">
                  {l.getStarted} <ArrowRight size={18} />
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
            <h2 className="md-headline-medium">{l.capabilities}</h2>
          </div>
          <div className={styles.featureGrid}>
            {service.features.map((f, i) => (
              <div key={i} className={styles.featureCard}>
                <div className={styles.featureIcon}>
                  <CheckCircle2 size={24} color="var(--md-sys-color-primary)" />
                </div>
                <div>
                  <h3 className="md-title-large">{getField(f, 'title')}</h3>
                  <p className="md-body-medium text-muted">{getField(f, 'desc')}</p>
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
            <h2 className="md-headline-medium">{l.process}</h2>
            <p className="md-body-large">{l.processDesc}</p>
          </div>
          <div className={styles.processGrid}>
            {service.process.map((p, i) => (
              <div key={i} className={styles.processItem}>
                <div className={styles.processStep}>{getField(p, 'step')}</div>
                <h3 className="md-title-medium">{getField(p, 'title')}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      {service.faqs.length > 0 && (
        <section className="section">
          <div className="container">
            <div className={styles.faqHeader}>
              <MessageCircleQuestion size={32} />
              <h2 className="md-headline-medium">{l.faqs}</h2>
            </div>
            <div className={styles.faqList}>
              {service.faqs.map((f, i) => (
                <div key={i} className={styles.faqItem}>
                  <h3 className="md-title-medium">{getField(f, 'q')}</h3>
                  <p className="md-body-medium text-muted">{getField(f, 'a')}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className={styles.cta}>
        <div className="container">
          <div className={styles.ctaCard}>
            <h2 className="md-headline-medium">
              {l.ready}
            </h2>
            <p className="md-body-large">
              {l.contact}
            </p>
            <Link href={`/${locale}/contact`} className="btn btn-white btn-lg" style={{ marginTop: '24px' }}>
              {l.contactBtn}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
