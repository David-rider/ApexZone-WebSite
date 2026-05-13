import { MetadataRoute } from 'next';
import { portfolioItems } from '@/data/portfolio';
import { blogPosts } from '@/data/blog';
import { servicesData } from '@/data/services';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://apexzone.us';
  const locales = ['en', 'zh-CN', 'zh-TW', 'es', 'ko', 'ja', 'ru', 'it'];
  
  const staticPages = ['', '/services', '/portfolio', '/blog', '/about', '/contact', '/ai-wizard'];
  
  const entries: MetadataRoute.Sitemap = [];

  // Static pages for each locale
  locales.forEach(locale => {
    staticPages.forEach(page => {
      entries.push({
        url: `${baseUrl}/${locale}${page}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: page === '' ? 1 : 0.8,
      });
    });
  });

  // Dynamic portfolio pages
  locales.forEach(locale => {
    portfolioItems.forEach(item => {
      entries.push({
        url: `${baseUrl}/${locale}/portfolio/${item.slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.6,
      });
    });
  });

  // Dynamic blog pages
  locales.forEach(locale => {
    blogPosts.forEach(post => {
      entries.push({
        url: `${baseUrl}/${locale}/blog/${post.slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.7,
      });
    });
  });

  // Dynamic service detail pages
  locales.forEach(locale => {
    servicesData.forEach(service => {
      entries.push({
        url: `${baseUrl}/${locale}/services/${service.slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.6,
      });
    });
  });

  return entries;
}
