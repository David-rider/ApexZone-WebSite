import { getTranslations } from 'next-intl/server';
import { blogPosts } from '@/data/blog';
import BlogClient from './BlogClient';
import styles from './page.module.css';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata.blog' });
  
  return {
    title: t('title'),
    description: t('description'),
    keywords: t('keywords').split(',').map(k => k.trim()),
  };
}

export default async function BlogPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'blog' });
  
  const featured = blogPosts.find(p => p.featured);

  return (
    <div className={styles.page}>
      {/* Header */}
      <div className={styles.pageHeader}>
        <div className="container">
          <div className="section-title__label">{t('label')}</div>
          <h1 className="md-display-small">{t('title')}</h1>
          <p className="md-body-large">{t('subtitle')}</p>
        </div>
      </div>

      <BlogClient featured={featured} />
    </div>
  );
}

