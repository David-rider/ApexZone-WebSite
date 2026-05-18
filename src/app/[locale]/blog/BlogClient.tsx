'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { blogPosts, type BlogPost } from '@/data/blog';
import { useBlogTranslations } from '@/i18n/useI18nData';
import styles from './page.module.css';

type Category = 'all' | BlogPost['category'];
const CATS: Category[] = ['all', 'webDesign', 'seo', 'marketing', 'tech', 'caseStudy'];

interface BlogClientProps {
  featured: BlogPost | undefined;
}

export default function BlogClient({ featured }: BlogClientProps) {
  const t = useTranslations('blog');
  const locale = useLocale();
  const [cat, setCat] = useState<Category>('all');
  const { getBlogTitle, getBlogExcerpt } = useBlogTranslations();

  const filtered = cat === 'all' ? blogPosts : blogPosts.filter(p => p.category === cat);

  return (
    <div className={styles.page}>
      {/* Page Header is passed from server component if preferred, but here we keep it for now */}
      
      {/* Featured post */}
      {featured && cat === 'all' && (
        <section className="section-sm">
          <div className="container">
            <Link href={`/${locale}/blog/${featured.slug}`} className={styles.featured}>
              <div className={styles.featuredImg}>
                {featured.cover ? (
                  <Image
                    src={featured.cover}
                    alt={getBlogTitle(featured.titleKey)}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    style={{ objectFit: 'cover' }}
                  />
                ) : (
                  <div style={{ width: '100%', height: '100%', background: featured.coverColor }} />
                )}
              </div>
              <div className={styles.featuredBody}>
                <span className="badge badge-sage">{t(`categories.${featured.category}`)}</span>
                <h2 className="md-headline-medium">
                  {getBlogTitle(featured.titleKey)}
                </h2>
                <p className="md-body-large">{getBlogExcerpt(featured.excerptKey)}</p>
                <div className={styles.postMeta}>
                  <span className="md-body-small text-muted">{featured.author}</span>
                  <span className="md-body-small text-muted">·</span>
                  <span className="md-body-small text-muted">{featured.readTime} {t('minRead')}</span>
                </div>
                <div className="btn btn-primary" style={{ display: 'inline-flex', gap: '8px', marginTop: '4px' }}>
                  {t('readMore')} <ArrowRight size={16} />
                </div>
              </div>
            </Link>
          </div>
        </section>
      )}

      {/* Filter + grid */}
      <section className="section">
        <div className="container">
          <div className="filter-tabs">
            {CATS.map(c => (
              <button
                key={c}
                className={`filter-tab ${cat === c ? 'active' : ''}`}
                onClick={() => setCat(c)}
              >
                {t(`categories.${c}`)}
              </button>
            ))}
          </div>

          <div className={styles.grid}>
            {filtered.map(post => (
              <Link key={post.id} href={`/${locale}/blog/${post.slug}`} className="blog-card">
                <div className="blog-card__image">
                  {post.cover ? (
                    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                      <Image
                        src={post.cover}
                        alt={getBlogTitle(post.titleKey)}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        style={{ objectFit: 'cover' }}
                      />
                    </div>
                  ) : (
                    <div style={{ width:'100%',height:'100%',background:post.coverColor }} />
                  )}
                </div>
                <div className="blog-card__body">
                  <div className={styles.postTop}>
                    <span className="badge badge-sage">{t(`categories.${post.category}`)}</span>
                    <span className="md-label-small text-muted">{post.readTime} {t('minRead')}</span>
                  </div>
                  <h3 className="md-title-medium" style={{ margin: '12px 0 8px' }}>
                    {getBlogTitle(post.titleKey)}
                  </h3>
                  <p className="md-body-small text-muted">
                    {getBlogExcerpt(post.excerptKey)}
                  </p>
                  <div className={styles.postMeta} style={{ marginTop: '16px' }}>
                    <span className="md-label-small text-muted">{post.author}</span>
                    <span className="md-label-small text-muted">·</span>
                    <span className="md-label-small text-muted">
                      {new Date(post.date).toLocaleDateString(locale, { month: 'short', day: 'numeric', year: 'numeric' })}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
