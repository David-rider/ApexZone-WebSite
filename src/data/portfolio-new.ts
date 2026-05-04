/**
 * Simplified Portfolio Data with i18n Translation Keys
 * 
 * Migration from hardcoded translations to centralized i18n system
 * All text content is managed through messages/*.json files
 */

export interface PortfolioItem {
  id: string;
  slug: string;
  
  // ─── Translation Keys (new system) ─────────────────────────────────
  titleKey: string;           // e.g., 'portfolio.projects.noviant.title'
  clientKey: string;
  descriptionKey: string;
  challengeKey: string;
  solutionKey: string;
  resultsKey: string;         // Results are arrays
  tagsKey: string;            // Tags are arrays
  locationKey: string;
  
  // ─── Structured Metadata ───────────────────────────────────────────
  category: 'brandSite' | 'platform' | 'app' | 'brandDesign' | 'ecommerce' | 'miniProgram';
  industry: 'tech' | 'finance' | 'retail' | 'healthcare' | 'realEstate' | 'education' | 'other';
  
  // ─── Media & Links ──────────────────────────────────────────────────
  image: string;
  url?: string;
  tech: string[];
  featured: boolean;
  year: number;
}

export const portfolioItems: PortfolioItem[] = [
  {
    id: '1',
    slug: 'noviant',
    titleKey: 'portfolio.projects.noviant.title',
    clientKey: 'portfolio.projects.noviant.client',
    descriptionKey: 'portfolio.projects.noviant.description',
    challengeKey: 'portfolio.projects.noviant.challenge',
    solutionKey: 'portfolio.projects.noviant.solution',
    resultsKey: 'portfolio.projects.noviant.results',
    tagsKey: 'portfolio.projects.noviant.tags',
    locationKey: 'portfolio.projects.noviant.location',
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
    titleKey: 'portfolio.projects.springShore.title',
    clientKey: 'portfolio.projects.springShore.client',
    descriptionKey: 'portfolio.projects.springShore.description',
    challengeKey: 'portfolio.projects.springShore.challenge',
    solutionKey: 'portfolio.projects.springShore.solution',
    resultsKey: 'portfolio.projects.springShore.results',
    tagsKey: 'portfolio.projects.springShore.tags',
    locationKey: 'portfolio.projects.springShore.location',
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
    titleKey: 'portfolio.projects.retailMiniProgram.title',
    clientKey: 'portfolio.projects.retailMiniProgram.client',
    descriptionKey: 'portfolio.projects.retailMiniProgram.description',
    challengeKey: 'portfolio.projects.retailMiniProgram.challenge',
    solutionKey: 'portfolio.projects.retailMiniProgram.solution',
    resultsKey: 'portfolio.projects.retailMiniProgram.results',
    tagsKey: 'portfolio.projects.retailMiniProgram.tags',
    locationKey: 'portfolio.projects.retailMiniProgram.location',
    category: 'miniProgram',
    industry: 'retail',
    image: '/images/mock/ecommerce.png',
    tech: ['Mini-Program SDK', 'JavaScript', 'Cloud Functions'],
    featured: false,
    year: 2025,
  },
];
