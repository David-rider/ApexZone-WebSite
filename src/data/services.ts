/**
 * Services Data — i18n Architecture v2
 * 
 * All text content is managed through messages/*.json files.
 * Each service item stores key references and counts for iteration.
 */

export interface ServiceDetail {
  slug: string;
  category: string;
  icon: string;
  image: string;
  // Translation Keys
  titleKey: string;
  descriptionKey: string;
  // Counts for iterative fields (features, process, faqs)
  featureCount: number;
  processCount: number;
  faqCount: number;
}


// Helper: build main keys for a given service slug
const keys = (slug: string) => ({
  titleKey: `services.${slug}.title`,
  descriptionKey: `services.${slug}.description`,
});

export const servicesData: ServiceDetail[] = [
  {
    slug: 'web-design',
    category: 'webDesign',
    icon: 'Layout',
    image: '/images/services/web.png',
    ...keys('webDesign'),
    featureCount: 2,
    processCount: 4,
    faqCount: 1
  },
  {
    slug: 'app-dev',
    category: 'appDev',
    icon: 'Smartphone',
    image: '/images/services/app.png',
    ...keys('appDev'),
    featureCount: 2,
    processCount: 4,
    faqCount: 1
  },
  {
    slug: 'brand-design',
    category: 'brandDesign',
    icon: 'Palette',
    image: '/images/services/brand.png',
    ...keys('brandDesign'),
    featureCount: 2,
    processCount: 4,
    faqCount: 0
  },
  {
    slug: 'seo-marketing',
    category: 'seoMarketing',
    icon: 'TrendingUp',
    image: '/images/services/seo.png',
    ...keys('seoMarketing'),
    featureCount: 2,
    processCount: 4,
    faqCount: 1
  }
];


