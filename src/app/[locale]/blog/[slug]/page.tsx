import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Clock, User, Tag } from 'lucide-react';
import { blogPosts } from '@/data/blog';
import styles from './page.module.css';
import { getTranslations } from 'next-intl/server';
import ShareButtons from './_components/ShareButtons';

export async function generateStaticParams() {
  const locales = ['en', 'zh-CN', 'zh-TW', 'es', 'ko', 'ja', 'ru', 'it'];
  return blogPosts.flatMap(p =>
    locales.map(locale => ({ locale, slug: p.slug }))
  );
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string, locale: string }> }) {
  const { slug, locale } = await params;
  const post = blogPosts.find(p => p.slug === slug);
  if (!post) return {};
  
  const t = await getTranslations({ locale, namespace: 'blog.posts' });
  // Map slug to camelCase key used in JSON
  const keyMap: Record<string, string> = {
    'why-bilingual-website-matters-us-business': 'whyBilingualWebsite',
    'core-web-vitals-2025-complete-guide': 'coreWebVitals',
    'noviant-case-study-bilingual-seo': 'noviantCaseStudy'
  };
  const key = keyMap[slug] || slug;

  return {
    title: `${t(`${key}.title`)} | Blog`,
    description: t(`${key}.excerpt`),
  };
}

export default async function BlogArticlePage({ params }: { params: Promise<{ slug: string, locale: string }> }) {
  const { slug, locale } = await params;
  const post = blogPosts.find(p => p.slug === slug);
  if (!post) notFound();

  const t = await getTranslations('blog');
  const tp = await getTranslations('blog.posts');
  
  // Map slug to camelCase key used in JSON
  const keyMap: Record<string, string> = {
    'why-bilingual-website-matters-us-business': 'whyBilingualWebsite',
    'core-web-vitals-2025-complete-guide': 'coreWebVitals',
    'noviant-case-study-bilingual-seo': 'noviantCaseStudy'
  };
  const key = keyMap[slug] || slug;

  const title   = tp(`${key}.title`);
  const excerpt = tp(`${key}.excerpt`);
  const content = tp(`${key}.content`);
  const currentUrl = `https://apexzone.xyz/${locale}/blog/${post.slug}`;

  // Related posts
  const related = blogPosts.filter(p => p.slug !== post.slug).slice(0, 2);

  return (
    <div className={styles.page}>
      {/* Back */}
      <div className="container" style={{ paddingTop: '32px' }}>
        <Link href={`/${locale}/blog`} className={`btn btn-elevated btn-sm ${styles.backBtn}`}>
          <ArrowLeft size={16} />
          {t('back')}
        </Link>
      </div>

      {/* Hero */}
      <div className={styles.articleHero}>
        <div 
          className={styles.heroBackground}
          style={{ 
            backgroundColor: post.coverColor || 'var(--md-sys-color-primary-container)',
            backgroundImage: post.cover ? `url(${post.cover})` : 'none',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          {post.cover && (
            <div className={styles.heroOverlay} />
          )}
        </div>
        <div className="container">
          <div className={styles.articleHeader}>
            <span className="badge badge-sage">{t(`categories.${post.category}`)}</span>
            <h1 className={`md-display-small ${styles.articleTitle}`}>{title}</h1>
            <p className={`md-body-large ${styles.articleExcerpt}`}>{excerpt}</p>
            <div className={styles.articleMeta}>
              <span className={styles.metaItem}><User size={14} /> {post.author}</span>
              <span className={styles.metaItem}><Clock size={14} /> {post.readTime} {t('minRead')}</span>
              <span className={styles.metaItem}>
                <Tag size={14} />
                {new Date(post.date).toLocaleDateString(locale === 'zh-TW' ? 'zh-TW' : locale === 'zh-CN' ? 'zh-CN' : 'en-US', {
                  year: 'numeric', month: 'long', day: 'numeric',
                })}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Article body */}
      <section className="section">
        <div className="container">
          <div className={styles.articleLayout}>
            {/* Content */}
            <article className={styles.articleBody}>
              <div 
                className={styles.contentRich}
                dangerouslySetInnerHTML={{ __html: content }} 
              />
            </article>

            {/* Sidebar */}
            <aside className={styles.articleSidebar}>
              {/* Author card */}
              <div className={styles.authorCard}>
                <div className={styles.authorAvatar}>AZ</div>
                <div>
                  <div className="md-title-small">{post.author}</div>
                  <div className="md-body-small text-muted">
                    {t('authorTeam')}
                  </div>
                </div>
              </div>

              {/* Share */}
              <div className={styles.shareCard}>
                <div className="md-label-medium">{t('share')}</div>
                <ShareButtons title={title} url={currentUrl} locale={locale} />
              </div>

              {/* CTA */}
              <div className={styles.ctaCard}>
                <div className={styles.ctaCardIcon}>🚀</div>
                <h4 className="md-title-medium">
                  {t('ctaReady')}
                </h4>
                <Link href={`/${locale}/ai-wizard`} className="btn btn-primary btn-sm" style={{ marginTop: '12px' }}>
                  {t('ctaPlanner')}
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Related posts */}
      {related.length > 0 && (
        <section className="section" style={{ paddingTop: 0 }}>
          <div className="container">
            <h2 className="md-headline-small" style={{ marginBottom: '24px' }}>
              {t('related')}
            </h2>
            <div className={styles.relatedGrid}>
              {related.map(rp => {
                const rKey = keyMap[rp.slug] || rp.slug;
                return (
                  <Link key={rp.slug} href={`/${locale}/blog/${rp.slug}`} className="blog-card">
                    <div className="blog-card__image">
                      <div style={{ width: '100%', height: '100%', background: rp.coverColor }} />
                    </div>
                    <div className="blog-card__body">
                      <span className="badge badge-sage">{t(`categories.${rp.category}`)}</span>
                      <h3 className="md-title-medium" style={{ margin: '10px 0 6px' }}>
                        {tp(`${rKey}.title`)}
                      </h3>
                      <p className="md-body-small text-muted">{rp.readTime} {t('minRead')}</p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

