/**
 * Portfolio Data — i18n Architecture v2
 *
 * All text content is managed through messages/*.json files.
 * Each item stores translation KEY REFERENCES, not actual strings.
 * Use usePortfolioTranslations() hook in client components,
 * or getTranslations() in server components to resolve the keys.
 */

export interface PortfolioItem {
  id: string;
  slug: string;

  // ─── Translation Keys (resolved via next-intl) ──────────────────────
  titleKey: string;        // e.g. 'portfolio.projects.noviant.title'
  clientKey: string;
  descriptionKey: string;
  challengeKey: string;
  solutionKey: string;
  resultsKey: string;      // points to an array in messages JSON
  tagsKey: string;         // points to an array in messages JSON
  locationKey: string;

  // ─── Language-agnostic metadata ─────────────────────────────────────
  category: 'brandSite' | 'platform' | 'app' | 'brandDesign' | 'ecommerce' | 'miniProgram';
  industry: 'tech' | 'finance' | 'retail' | 'healthcare' | 'realEstate' | 'education' | 'other';

  // ─── Media & links ───────────────────────────────────────────────────
  image: string;
  url?: string;
  tech: string[];   // tech stack labels (intentionally NOT translated)
  featured: boolean;
  year: number;
}

// Helper: build all keys for a given projectId
const keys = (projectId: string) => ({
  titleKey:       `portfolio.projects.${projectId}.title`,
  clientKey:      `portfolio.projects.${projectId}.client`,
  descriptionKey: `portfolio.projects.${projectId}.description`,
  challengeKey:   `portfolio.projects.${projectId}.challenge`,
  solutionKey:    `portfolio.projects.${projectId}.solution`,
  resultsKey:     `portfolio.projects.${projectId}.results`,
  tagsKey:        `portfolio.projects.${projectId}.tags`,
  locationKey:    `portfolio.projects.${projectId}.location`,
});

export const portfolioItems: PortfolioItem[] = [
  {
    id: '1',
    slug: 'noviant',
    ...keys('noviant'),
    category: 'brandSite',
    industry: 'tech',
    image: '/images/portfolio/noviant_msp_site.png',
    url: 'https://msp.noviant.com',
    tech: ['Next.js 15', 'TypeScript', 'next-intl', 'CSS Modules', 'Vercel'],
    featured: true,
    year: 2026,
  },
  {
    id: '2',
    slug: 'spring-shore-cim',
    ...keys('springShore'),
    category: 'platform',
    industry: 'realEstate',
    image: '/images/portfolio/cim_spring_shore.jpg',
    tech: ['WebGL', 'Three.js', 'React', 'GIS'],
    featured: true,
    year: 2026,
  },
  {
    id: '3',
    slug: 'retail-mini-program',
    ...keys('retailMiniProgram'),
    category: 'miniProgram',
    industry: 'retail',
    image: '/images/mock/ecommerce.png',
    tech: ['Mini-Program SDK', 'JavaScript', 'Cloud Functions'],
    featured: false,
    year: 2025,
  },
  {
    id: '4',
    slug: 'fintech-brand-identity',
    ...keys('fintechBrand'),
    category: 'brandDesign',
    industry: 'finance',
    image: '/images/portfolio/fintech_vi.png',
    tech: ['Illustrator', 'Figma', 'After Effects'],
    featured: false,
    year: 2025,
  },
  {
    id: '5',
    slug: 'healthcare-booking',
    ...keys('healthcareBooking'),
    category: 'brandSite',
    industry: 'healthcare',
    image: '/images/mock/fintech.png',
    tech: ['Figma', 'Illustrator', 'Motion Graphics'],
    featured: true,
    year: 2025,
  },
  {
    id: '6',
    slug: 'noviant-managed',
    ...keys('noviantManaged'),
    category: 'app',
    industry: 'tech',
    image: '/images/mock/tech.png',
    tech: ['React', 'Node.js', 'AWS', 'WebSockets'],
    featured: false,
    year: 2026,
  },
  {
    id: '7',
    slug: 'spring-shore-tourism',
    ...keys('springShoreTourism'),
    category: 'platform',
    industry: 'realEstate',
    image: '/images/portfolio/cim_spring_shore.jpg',
    tech: ['CIM', 'Real-time Rendering', 'Visualization'],
    featured: false,
    year: 2025,
  },
  {
    id: '8',
    slug: 'jinjiang-glory',
    ...keys('jinjiangGlory'),
    category: 'platform',
    industry: 'realEstate',
    image: '/images/portfolio/cim_jinjiang_glory.jpg',
    tech: ['UE5', 'WebGL', 'React', 'Digital Twin'],
    featured: false,
    year: 2025,
  },
  {
    id: '9',
    slug: 'meijiang-heyue',
    ...keys('meijiangHeyue'),
    category: 'platform',
    industry: 'realEstate',
    image: '/images/portfolio/cim_meijiang_heyue.jpg',
    tech: ['Custom UI', '3D Mapping', 'Next.js'],
    featured: false,
    year: 2025,
  },
  {
    id: '10',
    slug: 'jinmao-smart-city',
    ...keys('jinmaoSmartCity'),
    category: 'platform',
    industry: 'tech',
    image: '/images/portfolio/cim_jinmao_smart.png',
    tech: ['CIM', 'Big Data', '3D Visualization'],
    featured: true,
    year: 2026,
  },
  {
    id: '11',
    slug: 'education-placeholder',
    ...keys('educationPlaceholder'),
    category: 'platform',
    industry: 'education',
    image: '/images/portfolio/education_placeholder.png',
    tech: ['Next.js', 'LMS'],
    featured: false,
    year: 2025,
  },
  {
    id: '12',
    slug: 'app-placeholder',
    ...keys('appPlaceholder'),
    category: 'app',
    industry: 'tech',
    image: '/images/portfolio/app_dev.png',
    tech: ['Flutter', 'React Native'],
    featured: false,
    year: 2025,
  },
  {
    id: '13',
    slug: 'ecommerce-placeholder',
    ...keys('ecommercePlaceholder'),
    category: 'ecommerce',
    industry: 'retail',
    image: '/images/portfolio/ecommerce_site.png',
    tech: ['Shopify', 'Stripe'],
    featured: false,
    year: 2025,
  },
];

export const portfolioCategories = [
  'all', 'brandSite', 'platform', 'app', 'brandDesign', 'ecommerce', 'miniProgram',
] as const;
