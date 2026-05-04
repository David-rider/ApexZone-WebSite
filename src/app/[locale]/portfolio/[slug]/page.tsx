import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { portfolioItems } from '@/data/portfolio';
import { getTranslations } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import styles from './page.module.css';

interface Props {
  params: Promise<{ slug: string; locale: string }>;
}

export async function generateStaticParams() {
  return portfolioItems.flatMap(item =>
    routing.locales.map(locale => ({ locale, slug: item.slug }))
  );
}

export async function generateMetadata({ params }: Props) {
  const { slug, locale } = await params;
  const item = portfolioItems.find(p => p.slug === slug);
  if (!item) return {};

  const t = await getTranslations({ locale });

  const title = t(item.titleKey as any);
  const desc  = t(item.descriptionKey as any);
  const tags  = t.raw(item.tagsKey as any) as string[];

  return {
    title: `${title} | Portfolio`,
    description: desc,
    keywords: tags,
  };
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug, locale } = await params;
  const item = portfolioItems.find(p => p.slug === slug);
  if (!item) notFound();

  const t  = await getTranslations({ locale });
  const tp = await getTranslations({ locale, namespace: 'portfolio' });

  // Resolve all translated strings server-side
  const title       = t(item.titleKey       as any);
  const description = t(item.descriptionKey as any);
  const challenge   = t(item.challengeKey   as any);
  const solution    = t(item.solutionKey    as any);
  const client      = t(item.clientKey      as any);
  const location    = t(item.locationKey    as any);
  const results     = t.raw(item.resultsKey as any) as string[];
  const tags        = t.raw(item.tagsKey    as any) as string[];

  return (
    <div className={styles.page}>
      {/* Back */}
      <div className="container">
        <Link href={`/${locale}/portfolio`} className={`${styles.backLink} btn btn-elevated btn-sm`}>
          <ArrowLeft size={16} /> {tp('detail.back')}
        </Link>
      </div>

      {/* Hero */}
      <div className={styles.caseHero}>
        <div
          className={styles.caseMockup}
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
                  <h2 className="md-title-large">{tp('detail.challenge')}</h2>
                  <p className="md-body-medium">{challenge}</p>
                </div>
                <div>
                  <h2 className="md-title-large">{tp('detail.solution')}</h2>
                  <p className="md-body-medium">{solution}</p>
                </div>
              </div>

              {/* Results */}
              <div className={styles.results}>
                <h2 className="md-headline-small">{tp('detail.results')}</h2>
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
                  <span className={styles.sideLabel}>{tp('detail.client')}</span>
                  <span>{client}</span>
                </div>
                <div className={styles.sideRow}>
                  <span className={styles.sideLabel}>{tp('detail.year')}</span>
                  <span>{item.year}</span>
                </div>
                <div className={styles.sideRow}>
                  <span className={styles.sideLabel}>{tp('detail.industry')}</span>
                  <span>{t(`portfolio.industries.${item.industry}` as any)}</span>
                </div>
                <div className={styles.sideRow}>
                  <span className={styles.sideLabel}>{tp('detail.location')}</span>
                  <span>{location}</span>
                </div>
                <div className={styles.sideRow}>
                  <span className={styles.sideLabel}>{tp('detail.tech')}</span>
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
                    {tp('detail.visit')} <ExternalLink size={14} />
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
