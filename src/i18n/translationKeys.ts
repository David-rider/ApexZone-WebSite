/**
 * i18n Translation Keys System
 * 
 * This module provides type-safe translation key builders and utilities
 * to maintain consistency across the application and enable full i18n migration.
 */

// ─── Portfolio Translation Keys ───────────────────────────────────────────
export const portfolioKeys = {
  project: (projectId: string) => ({
    title: `portfolio.projects.${projectId}.title`,
    description: `portfolio.projects.${projectId}.description`,
    client: `portfolio.projects.${projectId}.client`,
    industry: `portfolio.projects.${projectId}.industry`,
    location: `portfolio.projects.${projectId}.location`,
    challenge: `portfolio.projects.${projectId}.challenge`,
    solution: `portfolio.projects.${projectId}.solution`,
    results: `portfolio.projects.${projectId}.results`,
    tags: `portfolio.projects.${projectId}.tags`,
  }),
  categories: {
    brandSite: 'portfolio.categories.brandSite',
    platform: 'portfolio.categories.platform',
    app: 'portfolio.categories.app',
    brandDesign: 'portfolio.categories.brandDesign',
    ecommerce: 'portfolio.categories.ecommerce',
    miniProgram: 'portfolio.categories.miniProgram',
  },
  industries: {
    tech: 'portfolio.industries.tech',
    finance: 'portfolio.industries.finance',
    retail: 'portfolio.industries.retail',
    healthcare: 'portfolio.industries.healthcare',
    realEstate: 'portfolio.industries.realEstate',
    education: 'portfolio.industries.education',
    other: 'portfolio.industries.other',
  },
};

// ─── Services Translation Keys ───────────────────────────────────────────
export const serviceKeys = {
  service: (serviceSlug: string) => ({
    title: `services.${serviceSlug}.title`,
    description: `services.${serviceSlug}.description`,
    feature: (index: number) => ({
      title: `services.${serviceSlug}.features.${index}.title`,
      description: `services.${serviceSlug}.features.${index}.description`,
    }),
    process: (index: number) => ({
      step: `services.${serviceSlug}.process.${index}.step`,
      title: `services.${serviceSlug}.process.${index}.title`,
    }),
    faq: (index: number) => ({
      question: `services.${serviceSlug}.faqs.${index}.question`,
      answer: `services.${serviceSlug}.faqs.${index}.answer`,
    }),
  }),
};

// ─── Blog Translation Keys ───────────────────────────────────────────────
export const blogKeys = {
  post: (slug: string) => ({
    title: `blog.posts.${slug}.title`,
    excerpt: `blog.posts.${slug}.excerpt`,
    content: `blog.posts.${slug}.content`,
  }),
  categories: {
    webDesign: 'blog.categories.webDesign',
    seo: 'blog.categories.seo',
    marketing: 'blog.categories.marketing',
    tech: 'blog.categories.tech',
    caseStudy: 'blog.categories.caseStudy',
  },
};

// ─── AI Wizard Translation Keys ───────────────────────────────────────────
export const wizardKeys = {
  industries: {
    restaurant: 'wizard.industries.restaurant',
    retail: 'wizard.industries.retail',
    tech: 'wizard.industries.tech',
    healthcare: 'wizard.industries.healthcare',
    realEstate: 'wizard.industries.realEstate',
    finance: 'wizard.industries.finance',
    education: 'wizard.industries.education',
    other: 'wizard.industries.other',
  },
  projectTypes: {
    website: 'wizard.projectTypes.website',
    app: 'wizard.projectTypes.app',
    miniProgram: 'wizard.projectTypes.miniProgram',
    saas: 'wizard.projectTypes.saas',
    other: 'wizard.projectTypes.other',
  },
};

// ─── Helper: Extract translation key without locale ───────────────────────
/**
 * Converts a translation key namespace to its JSON path
 * Example: 'portfolio.projects.noviant.title' → ['portfolio', 'projects', 'noviant', 'title']
 */
export function keyToPath(key: string): string[] {
  return key.split('.');
}

/**
 * Safely get nested value from translation object
 */
export function getNestedValue(obj: Record<string, any>, path: string[]): string | undefined {
  let current = obj;
  for (const segment of path) {
    if (typeof current !== 'object' || current === null || !(segment in current)) {
      return undefined;
    }
    current = current[segment];
  }
  return typeof current === 'string' ? current : undefined;
}
