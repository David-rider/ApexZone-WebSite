/**
 * getI18nData Server Helpers
 * 
 * Server-side version of i18n data helpers for use in Server Components.
 * Uses getTranslations() from next-intl/server.
 */

import { getTranslations } from 'next-intl/server';
import type { PortfolioItem } from '@/data/portfolio';

export async function getPortfolioServerTranslations(locale: string) {
  const t = await getTranslations({ locale });

  return {
    getProjectTitle: (item: PortfolioItem): string => {
      try { return t(item.titleKey as any); } catch { return item.titleKey; }
    },
    getProjectClient: (item: PortfolioItem): string => {
      try { return t(item.clientKey as any); } catch { return item.clientKey; }
    },
    getProjectDescription: (item: PortfolioItem): string => {
      try { return t(item.descriptionKey as any); } catch { return item.descriptionKey; }
    },
    getProjectChallenge: (item: PortfolioItem): string => {
      try { return t(item.challengeKey as any); } catch { return item.challengeKey; }
    },
    getProjectSolution: (item: PortfolioItem): string => {
      try { return t(item.solutionKey as any); } catch { return item.solutionKey; }
    },
    getProjectResults: (item: PortfolioItem): string[] => {
      try {
        const results = t.raw(item.resultsKey as any);
        return Array.isArray(results) ? results : [];
      } catch { return []; }
    },
    getProjectTags: (item: PortfolioItem): string[] => {
      try {
        const tags = t.raw(item.tagsKey as any);
        return Array.isArray(tags) ? tags : [];
      } catch { return []; }
    },
    getProjectLocation: (item: PortfolioItem): string => {
      try { return t(item.locationKey as any); } catch { return item.locationKey; }
    },
    getCategoryLabel: (category: PortfolioItem['category']): string => {
      try { return t(`portfolio.categories.${category}` as any); } catch { return category; }
    },
    getIndustryLabel: (industry: PortfolioItem['industry']): string => {
      try { return t(`portfolio.industries.${industry}` as any); } catch { return industry; }
    },
  };
}

export async function getServiceServerTranslations(locale: string) {
  const t = await getTranslations({ locale });

  return {
    getServiceTitle: (slug: string): string => {
      try { return t(`services.${slug}.title` as any); } catch { return slug; }
    },
    getServiceDescription: (slug: string): string => {
      try { return t(`services.${slug}.description` as any); } catch { return ''; }
    },
    getFeatureTitle: (slug: string, index: number): string => {
      try { return t(`services.${slug}.features.${index}.title` as any); } catch { return ''; }
    },
    getFeatureDescription: (slug: string, index: number): string => {
      try { return t(`services.${slug}.features.${index}.description` as any); } catch { return ''; }
    },
    getProcessTitle: (slug: string, index: number): string => {
      try { return t(`services.${slug}.process.${index}.title` as any); } catch { return ''; }
    },
  };
}

export async function getBlogServerTranslations(locale: string) {
  const t = await getTranslations({ locale });

  return {
    getBlogTitle: (slug: string): string => {
      try { return t(`blog.posts.${slug}.title` as any); } catch { return slug; }
    },
    getBlogExcerpt: (slug: string): string => {
      try { return t(`blog.posts.${slug}.excerpt` as any); } catch { return ''; }
    },
    getBlogContent: (slug: string): string => {
      try { return t(`blog.posts.${slug}.content` as any); } catch { return ''; }
    },
    getCategoryLabel: (category: string): string => {
      try { return t(`blog.categories.${category}` as any); } catch { return category; }
    },
  };
}
