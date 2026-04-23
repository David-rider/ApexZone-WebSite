import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { portfolioItems } from '@/data/portfolio';
import styles from './page.module.css';

interface Props {
  params: { slug: string; locale: string };
}

export async function generateStaticParams() {
  const locales = ['en', 'zh', 'es', 'ko', 'ja', 'ru', 'it'];
  return portfolioItems.flatMap(item =>
    locales.map(locale => ({ locale, slug: item.slug }))
  );
}

export async function generateMetadata({ params }: Props) {
  const { slug, locale } = await params;
  const item = portfolioItems.find(p => p.slug === slug);
  if (!item) return {};
  
  const getField = (base: string) => {
    if (locale === 'en') return (item as any)[base];
    const key = `${base}${locale.charAt(0).toUpperCase() + locale.slice(1)}`;
    return (item as any)[key] || (item as any)[base];
  };

  const title = getField('title');
  const desc = getField('description');
  
  return {
    title: `${title} | Portfolio`,
    description: desc,
    keywords: locale === 'zh'
      ? [...item.tagsZh, item.clientZh, '数字孪生', '纽约网站设计']
      : [...item.tags, item.client, 'Digital Twin NYC', 'Web Design New York'],
  };
}

import { getTranslations } from 'next-intl/server';

export default async function CaseStudyPage({ params }: Props) {
  const { slug, locale } = await params;
  const item = portfolioItems.find(p => p.slug === slug);
  if (!item) notFound();

  const t = await getTranslations({ locale, namespace: 'portfolio' });

  const getField = (base: string) => {
    if (locale === 'en') return (item as any)[base];
    const key = `${base}${locale.charAt(0).toUpperCase() + locale.slice(1)}`;
    return (item as any)[key] || (item as any)[base];
  };

  const title       = getField('title');
  const description = getField('description');
  const challenge   = getField('challenge');
  const solution    = getField('solution');
  const results     = getField('results');
  const client      = getField('client');
  const tags        = getField('tags');
  const industry    = getField('industry');
  const location    = getField('location');

  const labelMap: Record<string, any> = {
    en: { back: 'Back to List', challenge: 'Challenge', solution: 'Solution', results: 'Results', client: 'Client', year: 'Year', industry: 'Industry', tech: 'Tech Stack', visit: 'Visit Site', location: 'Location' },
    zh: { back: '返回作品集', challenge: '项目挑战', solution: '解决方案', results: '项目成果', client: '客户名称', year: '项目年份', industry: '所属行业', tech: '技术栈', visit: '访问网站', location: '项目地点' },
    es: { back: 'Volver', challenge: 'Desafío', solution: 'Solución', results: 'Resultados', client: 'Cliente', year: 'Año', industry: 'Industria', tech: 'Tecnologías', visit: 'Visitar sitio', location: 'Ubicación' },
    ko: { back: '목록으로', challenge: '과제', solution: '솔루션', results: '결과', client: '클라이언트', year: '연도', industry: '산업분야', tech: '기술 스택', visit: '사이트 방문', location: '위치' },
    ja: { back: '一覧へ戻る', challenge: '課題', solution: '解決策', results: '成果', client: 'クライアント', year: '制作年', industry: '業界', tech: '使用技術', visit: 'サイト訪問', location: '所在地' },
    ru: { back: 'Назад', challenge: 'Задача', solution: 'Решение', results: 'Результаты', client: 'Клиент', year: 'Год', industry: 'Отрасль', tech: 'Стек технологий', visit: 'Посетить сайт', location: 'Местоположение' },
    it: { back: 'Indietro', challenge: 'Sfida', solution: 'Soluzione', results: 'Risultati', client: 'Cliente', year: 'Anno', industry: 'Settore', tech: 'Stack Tecnologico', visit: 'Visita Sito', location: 'Sede' }
  };
  const labels = labelMap[locale] || labelMap.en;

  return (
    <div className={styles.page}>
      {/* Back */}
      <div className="container">
        <Link href={`/${locale}/portfolio`} className={`${styles.backLink} btn btn-elevated btn-sm`}>
          <ArrowLeft size={16} /> {labels.back}
        </Link>
      </div>

      {/* Hero */}
      <div className={styles.caseHero}>
        <div className={styles.caseMockup}
          style={{
            background: item.slug === 'noviant'
              ? 'linear-gradient(135deg, #1A2A3A, #2C4A6E)'
              : 'linear-gradient(135deg, #0D2137, #183A5C)',
          }}
        >
          <span className={styles.caseMockupLabel}>{client}</span>
        </div>
      </div>

      {/* Content */}
      <section className="section">
        <div className="container">
          <div className={styles.layout}>
            {/* Main */}
            <div className={styles.main}>
              <div className={styles.tags}>
                {tags.map((tag: string) => <span key={tag} className="badge badge-sage">{tag}</span>)}
              </div>
              <h1 className="md-display-small">{title}</h1>
              <p className="md-body-large">{description}</p>

              <div className={styles.section3col}>
                <div>
                  <h2 className="md-title-large">{labels.challenge}</h2>
                  <p className="md-body-medium">{challenge}</p>
                </div>
                <div>
                  <h2 className="md-title-large">{labels.solution}</h2>
                  <p className="md-body-medium">{solution}</p>
                </div>
              </div>

              {/* Results */}
              <div className={styles.results}>
                <h2 className="md-headline-small">{labels.results}</h2>
                <div className={styles.resultsGrid}>
                  {results.map((r: string, i: number) => (
                    <div key={i} className={styles.resultCard}>
                      <span className={styles.resultIcon}>✅</span>
                      <span className="md-body-medium">{r}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <aside className={styles.sidebar}>
              <div className={styles.sideCard}>
                <div className={styles.sideRow}>
                  <span className={styles.sideLabel}>{labels.client}</span>
                  <span>{client}</span>
                </div>
                <div className={styles.sideRow}>
                  <span className={styles.sideLabel}>{labels.year}</span>
                  <span>{item.year}</span>
                </div>
                <div className={styles.sideRow}>
                  <span className={styles.sideLabel}>{labels.industry}</span>
                  <span>{industry}</span>
                </div>
                <div className={styles.sideRow}>
                  <span className={styles.sideLabel}>{labels.location}</span>
                  <span>{location}</span>
                </div>
                <div className={styles.sideRow}>
                  <span className={styles.sideLabel}>{labels.tech}</span>
                  <div className={styles.techList}>
                    {item.tech.map(tech => (
                      <span key={tech} className="badge badge-sky">{tech}</span>
                    ))}
                  </div>
                </div>
                {item.url && (
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary"
                    style={{ width: '100%', marginTop: '8px' }}
                  >
                    {labels.visit} <ExternalLink size={14} />
                  </a>
                )}
              </div>
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
}
