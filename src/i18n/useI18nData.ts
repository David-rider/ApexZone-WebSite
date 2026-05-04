/**
 * useI18nData Hook
 * 
 * Helper hook for translating data with i18n keys
 * Simplifies component usage of the new translation key system
 */

'use client';

import { useTranslations } from 'next-intl';
import type { PortfolioItem } from '@/data/portfolio-new';

/**
 * Safely get translation from a key
 * Falls back to key name if translation not found
 */
export function usePortfolioTranslations() {
  const t = useTranslations();

  return {
    /**
     * Get translated portfolio item fields
     */
    getProjectTitle: (item: PortfolioItem): string => {
      try {
        return t(item.titleKey);
      } catch {
        return item.titleKey;
      }
    },

    getProjectClient: (item: PortfolioItem): string => {
      try {
        return t(item.clientKey);
      } catch {
        return item.clientKey;
      }
    },

    getProjectDescription: (item: PortfolioItem): string => {
      try {
        return t(item.descriptionKey);
      } catch {
        return item.descriptionKey;
      }
    },

    getProjectChallenge: (item: PortfolioItem): string => {
      try {
        return t(item.challengeKey);
      } catch {
        return item.challengeKey;
      }
    },

    getProjectSolution: (item: PortfolioItem): string => {
      try {
        return t(item.solutionKey);
      } catch {
        return item.solutionKey;
      }
    },

    /**
     * Get translated arrays (results, tags, etc.)
     */
    getProjectResults: (item: PortfolioItem): string[] => {
      try {
        const results = t.raw(item.resultsKey);
        return Array.isArray(results) ? results : [];
      } catch {
        return [];
      }
    },

    getProjectTags: (item: PortfolioItem): string[] => {
      try {
        const tags = t.raw(item.tagsKey);
        return Array.isArray(tags) ? tags : [];
      } catch {
        return [];
      }
    },

    getProjectLocation: (item: PortfolioItem): string => {
      try {
        return t(item.locationKey);
      } catch {
        return item.locationKey;
      }
    },

    /**
     * Get category label (e.g., 'brandSite' → 'Brand Website')
     */
    getCategoryLabel: (category: PortfolioItem['category']): string => {
      try {
        return t(`portfolio.categories.${category}`);
      } catch {
        return category;
      }
    },

    /**
     * Get industry label (e.g., 'tech' → 'Technology')
     */
    getIndustryLabel: (industry: PortfolioItem['industry']): string => {
      try {
        return t(`portfolio.industries.${industry}`);
      } catch {
        return industry;
      }
    },
  };
}

/**
 * Service data translation helper
 */
export function useServiceTranslations() {
  const t = useTranslations();

  return {
    getServiceTitle: (slug: string): string => {
      try {
        return t(`services.${slug}.title`);
      } catch {
        return slug;
      }
    },

    getServiceDescription: (slug: string): string => {
      try {
        return t(`services.${slug}.description`);
      } catch {
        return '';
      }
    },

    getFeatureTitle: (slug: string, index: number): string => {
      try {
        return t(`services.${slug}.features.${index}.title`);
      } catch {
        return '';
      }
    },

    getFeatureDescription: (slug: string, index: number): string => {
      try {
        return t(`services.${slug}.features.${index}.description`);
      } catch {
        return '';
      }
    },

    getProcessTitle: (slug: string, index: number): string => {
      try {
        return t(`services.${slug}.process.${index}.title`);
      } catch {
        return '';
      }
    },

    getFaqQuestion: (slug: string, index: number): string => {
      try {
        return t(`services.${slug}.faqs.${index}.question`);
      } catch {
        return '';
      }
    },

    getFaqAnswer: (slug: string, index: number): string => {
      try {
        return t(`services.${slug}.faqs.${index}.answer`);
      } catch {
        return '';
      }
    },
  };
}

/**
 * Blog translation helper
 */
export function useBlogTranslations() {
  const t = useTranslations();

  return {
    getBlogTitle: (slug: string): string => {
      try {
        return t(`blog.posts.${slug}.title`);
      } catch {
        return slug;
      }
    },

    getBlogExcerpt: (slug: string): string => {
      try {
        return t(`blog.posts.${slug}.excerpt`);
      } catch {
        return '';
      }
    },

    getBlogContent: (slug: string): string => {
      try {
        return t(`blog.posts.${slug}.content`);
      } catch {
        return '';
      }
    },

    getCategoryLabel: (category: string): string => {
      try {
        return t(`blog.categories.${category}`);
      } catch {
        return category;
      }
    },
  };
}
