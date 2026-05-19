/**
 * Blog Data — i18n Architecture v2
 * 
 * All text content is managed through messages/*.json files.
 * Each blog post stores key references to its localized content.
 */

export interface BlogPost {
  id: string;
  slug: string;
  category: 'webDesign' | 'seo' | 'marketing' | 'tech' | 'caseStudy';
  
  // Translation Keys
  titleKey: string;
  excerptKey: string;
  contentKey: string;
  
  author: string;
  date: string;
  readTime: number;
  featured: boolean;
  coverColor: string;
  cover?: string;
}

// Helper: build keys for a blog post based on its camelCase id
const keys = (id: string) => ({
  titleKey:   `blog.posts.${id}.title`,
  excerptKey: `blog.posts.${id}.excerpt`,
  contentKey: `blog.posts.${id}.content`,
});

export const blogPosts: BlogPost[] = [
  {
    id: '1',
    slug: 'why-bilingual-website-matters-us-business',
    category: 'marketing',
    ...keys('whyBilingualWebsite'),
    author: 'Apex Zone Team',
    date: '2026-03-15',
    readTime: 6,
    featured: true,
    coverColor: 'linear-gradient(135deg, #3A7D5C 0%, #2BB5A0 100%)',
    cover: '/images/mock/blog_ai.png',
  },
  {
    id: '2',
    slug: 'core-web-vitals-2025-complete-guide',
    category: 'seo',
    ...keys('coreWebVitals'),
    author: 'Apex Zone Team',
    date: '2026-04-02',
    readTime: 8,
    featured: true,
    coverColor: 'linear-gradient(135deg, #3B82C4 0%, #1E5F9E 100%)',
    cover: '/images/mock/blog_tech.png',
  },
  {
    id: '3',
    slug: 'noviant-case-study-bilingual-seo',
    category: 'caseStudy',
    ...keys('noviantCaseStudy'),
    author: 'Apex Zone Team',
    date: '2026-04-10',
    readTime: 10,
    featured: false,
    coverColor: 'linear-gradient(135deg, #1A2A3A 0%, #2C4A6E 100%)',
    cover: '/images/mock/fintech.png',
  },
  {
    id: '4',
    slug: 'musk-openai-verdict-ai-enterprise-impact',
    category: 'tech',
    ...keys('openAiMuskVerdict'),
    author: 'Apex Zone Team',
    date: '2026-05-18',
    readTime: 10,
    featured: true,
    coverColor: 'linear-gradient(135deg, #0f172a 0%, #1e3a5f 100%)',
    cover: '/images/mock/blog_tech.png',
  },
];

