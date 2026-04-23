import type { WizardAnswers } from './WizardContext';

// ─── Blueprint Output Type ───────────────────────────────────────────────────

export interface Blueprint {
  projectSummary:   string;
  pageStructure:    string[];
  featureModules:   string[];
  designDirection:  string;
  techStack:        string[];
  seoKeywords:      string[];
  timeline:         string;
  investment:       string;
}

// ─── Lookup Tables ────────────────────────────────────────────────────────────

const PAGE_STRUCTURES: Record<string, string[]> = {
  corporate:   ['Home', 'About', 'Services', 'Team', 'Contact'],
  ecommerce:   ['Home', 'Shop', 'Product Detail', 'Cart', 'Checkout', 'Order Confirmation', 'Account'],
  portfolio:   ['Home', 'Portfolio', 'Case Study', 'About', 'Contact'],
  blog:        ['Home', 'Blog Listing', 'Article', 'Category', 'About', 'Contact'],
  booking:     ['Home', 'Services', 'Booking Calendar', 'Confirmation', 'Contact'],
  miniProgram: ['Home Tab', 'Browse/Explore', 'Detail', 'Cart/Order', 'My Account'],
  landing:     ['Hero Section', 'Benefits', 'Social Proof', 'CTA', 'FAQ'],
  platform:    ['Dashboard', 'Features', 'Pricing', 'Documentation', 'Login/Register', 'Contact'],
};

const SEO_KEYWORDS: Record<string, string[]> = {
  restaurant:    ['best restaurant near me', 'online ordering', 'restaurant reservations', 'menu delivery'],
  retail:        ['online store', 'shop online', 'fashion boutique', 'free shipping'],
  tech:          ['software solution', 'SaaS platform', 'cloud services', 'enterprise software'],
  healthcare:    ['doctor near me', 'medical clinic', 'telehealth', 'patient portal'],
  finance:       ['financial advisor', 'accounting services', 'tax preparation', 'investment management'],
  education:     ['online courses', 'tutoring services', 'e-learning platform', 'certification programs'],
  realEstate:    ['homes for sale', 'real estate agent', 'property listings', 'buy home'],
  manufacturing: ['industrial solutions', 'manufacturing services', 'B2B supplier', 'custom parts'],
  beauty:        ['beauty salon near me', 'spa services', 'skincare products', 'hair salon'],
  other:         ['professional services', 'business solutions', 'local services'],
};

const TECH_STACKS: Record<string, string[]> = {
  corporate:   ['Next.js', 'TypeScript', 'CSS Modules', 'Vercel'],
  ecommerce:   ['Next.js', 'Shopify API', 'Stripe', 'TypeScript', 'Vercel'],
  portfolio:   ['Next.js', 'Framer Motion', 'TypeScript', 'Vercel'],
  blog:        ['Next.js', 'MDX', 'TypeScript', 'Contentlayer'],
  booking:     ['Next.js', 'Calendly API / Custom', 'PostgreSQL', 'Stripe'],
  miniProgram: ['WeChat Mini-Program', 'WXML/WXSS', 'WeChat Cloud'],
  landing:     ['Next.js', 'Framer Motion', 'TypeScript', 'Vercel'],
  platform:    ['Next.js', 'PostgreSQL', 'REST API', 'Auth.js', 'Vercel'],
};

const TIMELINE_MAP: Record<string, Record<string, string>> = {
  asap:     { corporate: '2–3 weeks', ecommerce: '3–4 weeks', platform: '4–6 weeks',     _default: '2–3 weeks' },
  month:    { corporate: '3–4 weeks', ecommerce: '4–6 weeks', platform: '6–8 weeks',     _default: '3–5 weeks' },
  quarter:  { corporate: '6–8 weeks', ecommerce: '8–12 weeks', platform: '10–14 weeks',  _default: '6–10 weeks' },
  flexible: { corporate: '4–8 weeks', ecommerce: '6–10 weeks', platform: '8–14 weeks',   _default: '4–10 weeks' },
};

const INVESTMENT_MAP: Record<string, string> = {
  under1k:  '$500–$1,000 · Starter landing page or template-based site',
  '1kTo3k':   '$1,000–$3,000 · Professional 5–8 page website with custom design',
  '3kTo8k':   '$3,000–$8,000 · Full-featured site with integrations & SEO',
  '8kTo20k':  '$8,000–$20,000 · Enterprise platform, e-commerce, or complex system',
  above20k: '$20,000+ · Large-scale platform, SaaS, or multi-phase project',
  discuss:  'Custom pricing based on scope — let\'s discuss your needs',
};

const DESIGN_DIRECTION: Record<string, string> = {
  clean:   'Clean & Professional — White-dominant, structured layout, sans-serif typography, trust-building.',
  bold:    'Bold & Modern — Strong contrasts, large typography, dynamic shapes, high impact.',
  minimal: 'Minimal & Elegant — Generous whitespace, refined details, restrained color palette.',
  warm:    'Warm & Friendly — Soft rounded corners, warm tones, approachable imagery.',
  tech:    'Tech & Futuristic — Dark mode, glowing accents, geometric patterns, cutting-edge feel.',
  luxe:    'Luxury & Premium — Rich materials, gold/silver accents, editorial photography style.',
};

// ─── Blueprint Generator ──────────────────────────────────────────────────────

export function generateBlueprint(answers: WizardAnswers, locale: 'en' | 'zh'): Blueprint {
  const {
    industry, projectType, goal, audience,
    designStyle, features, content, timeline, budget,
  } = answers;

  // Page structure
  const pages = PAGE_STRUCTURES[projectType] ?? PAGE_STRUCTURES.corporate;
  // Add multilingual page if selected
  if (audience.includes('multilingual') || audience.includes('chinese')) {
    pages.push('Multilingual Support (7 Languages)');
  }
  // Add blog if feature selected
  if (features.includes('blog') && !pages.includes('Blog')) {
    pages.push('Blog / News');
  }
  // Add member area if selected
  if (features.includes('memberLogin') && !pages.includes('Login/Register')) {
    pages.push('Member Login & Dashboard');
  }

  // Feature modules (based on selected features)
  const featureLabels: Record<string, string> = {
    contactForm:  '📝 Smart Contact Form with auto-reply',
    booking:      '📅 Online Booking & Calendar Integration',
    ecommerce:    '🛒 E-Commerce Cart & Secure Checkout',
    blog:         '📰 Blog / News CMS',
    multilingual: '🌐 Bilingual (EN/ZH) i18n System',
    aiChat:       '🤖 AI Chat Assistant (Gemini API)',
    memberLogin:  '🔐 Member Authentication & Dashboard',
    video:        '🎥 Video Background & Embed Integration',
    map:          '📍 Interactive Map & Location',
    seo:          '📈 Technical SEO & Analytics Setup',
  };
  const featureModules = features.map(f => featureLabels[f] ?? f);
  // Always add basics
  featureModules.unshift('📱 Mobile-First Responsive Design', '⚡ Performance Optimization (Core Web Vitals)');

  // Tech stack
  const tech = TECH_STACKS[projectType] ?? TECH_STACKS.corporate;
  if (audience.includes('multilingual')) tech.push('next-intl');
  if (features.includes('aiChat')) tech.push('Google Gemini API');
  if (features.includes('ecommerce')) tech.push('Stripe');

  // SEO keywords
  const keywords = SEO_KEYWORDS[industry] ?? SEO_KEYWORDS.other;
  if (audience.includes('chinese') || audience.includes('multilingual')) {
    keywords.push('Chinese website', '中文网站', 'multilingual business website');
  }
  if (audience.includes('local')) {
    keywords.push('near me', 'local business', 'NYC business');
  }

  // Timeline
  const tlMap = TIMELINE_MAP[timeline] ?? TIMELINE_MAP.flexible;
  const tlValue = (tlMap[projectType] ?? tlMap._default) as string;
  const contentNote = content === 'scratch' ? ' (+2 weeks for content creation)' : content === 'ideas' ? ' (+1 week for content)' : '';

  // Investment
  const inv = INVESTMENT_MAP[budget] ?? INVESTMENT_MAP.discuss;

  // Project summary
  const goalLabels: Record<string,string> = {
    leads: 'generate high-quality leads',
    sales: 'drive online sales',
    credibility: 'build brand authority',
    showcase: 'showcase your portfolio',
    automate: 'automate business workflows',
    launch: 'establish your online presence',
  };

  const summary = locale === 'zh'
    ? `为${industryZh(industry)}行业打造${projectTypeZh(projectType)}，主要目标是${goalZh(goal)}。项目将采用${designStyleZh(designStyle)}设计风格，面向${audienceZh(audience)}用户群体。`
    : `A ${projectType.replace(/([A-Z])/g, ' $1').toLowerCase()} for the ${industry} industry, designed to ${goalLabels[goal] ?? goal}. Using a ${designStyle} design direction, targeting ${audience.join(' & ')} audiences.`;

  return {
    projectSummary: summary,
    pageStructure:  pages,
    featureModules,
    designDirection: DESIGN_DIRECTION[designStyle] ?? DESIGN_DIRECTION.clean,
    techStack:      [...new Set(tech)],
    seoKeywords:    keywords.slice(0, 8),
    timeline:       tlValue + contentNote,
    investment:     inv,
  };
}

// ─── Chinese helpers ──────────────────────────────────────────────────────────

function industryZh(key: string) {
  const m: Record<string,string> = {
    restaurant:'餐饮',retail:'零售',tech:'科技',healthcare:'医疗',
    finance:'金融',education:'教育',realEstate:'房地产',
    manufacturing:'制造',beauty:'美容',other:'综合',
  };
  return m[key] ?? key;
}

function projectTypeZh(key: string) {
  const m: Record<string,string> = {
    corporate:'企业官网',ecommerce:'电商独立站',portfolio:'作品展示站',
    blog:'博客媒体网站',booking:'预约系统',miniProgram:'微信小程序',
    landing:'落地页',platform:'平台/SaaS',
  };
  return m[key] ?? key;
}

function goalZh(key: string) {
  const m: Record<string,string> = {
    leads:'获取更多线索',sales:'提升在线销售',credibility:'建立品牌可信度',
    showcase:'展示作品案例',automate:'自动化业务流程',launch:'线上开业',
  };
  return m[key] ?? key;
}

function designStyleZh(key: string) {
  const m: Record<string,string> = {
    clean:'简洁专业',bold:'大胆现代',minimal:'极简优雅',
    warm:'温暖亲切',tech:'科技未来感',luxe:'豪华高端',
  };
  return m[key] ?? key;
}

function audienceZh(keys: string[]) {
  const m: Record<string,string> = {
    usEnglish:'英语',chinese:'中文',multilingual:'全球多语言',
    b2b:'B2B企业',b2c:'B2C消费者',local:'本地',
  };
  return keys.map(k => m[k] ?? k).join('、');
}
