import type { WizardAnswers } from './WizardContext';

// ─── Theme System ─────────────────────────────────────────────────────────────

interface Theme {
  primary: string;
  primaryRgb: string;
  accent: string;
  bg: string;
  bgAlt: string;
  bgCard: string;
  text: string;
  textMuted: string;
  border: string;
  navBg: string;
  font: string;
  headingFont: string;
  radius: string;
  radiusSm: string;
  heroGradient: string;
  buttonCSS: string;
  shadowColor: string;
  headingGradient: string;
}

const THEMES: Record<string, Theme> = {
  clean: {
    primary:       '#3A7D5C',
    primaryRgb:    '58,125,92',
    accent:        '#2BB5A0',
    bg:            '#FFFFFF',
    bgAlt:         '#F7FAF8',
    bgCard:        '#FFFFFF',
    text:          '#1A2E25',
    textMuted:     '#5C7268',
    border:        '#E0EDE7',
    navBg:         'rgba(255,255,255,0.96)',
    font:          "-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif",
    headingFont:   "-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif",
    radius:        '12px',
    radiusSm:      '8px',
    heroGradient:  'linear-gradient(135deg,#F0F9F4 0%,#E8F5EE 60%,#D4EEE3 100%)',
    buttonCSS:     'background:#3A7D5C;color:#fff;border:none;',
    shadowColor:   'rgba(58,125,92,0.12)',
    headingGradient: '',
  },
  bold: {
    primary:       '#2563EB',
    primaryRgb:    '37,99,235',
    accent:        '#7C3AED',
    bg:            '#0F172A',
    bgAlt:         '#1E293B',
    bgCard:        '#1E293B',
    text:          '#F8FAFC',
    textMuted:     '#94A3B8',
    border:        '#334155',
    navBg:         'rgba(15,23,42,0.96)',
    font:          "-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif",
    headingFont:   "-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif",
    radius:        '8px',
    radiusSm:      '6px',
    heroGradient:  'linear-gradient(135deg,#0F172A 0%,#1E293B 50%,#162040 100%)',
    buttonCSS:     'background:linear-gradient(135deg,#2563EB,#7C3AED);color:#fff;border:none;',
    shadowColor:   'rgba(37,99,235,0.25)',
    headingGradient: 'background:linear-gradient(135deg,#60A5FA,#A78BFA);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;',
  },
  minimal: {
    primary:       '#1F2937',
    primaryRgb:    '31,41,55',
    accent:        '#6B7280',
    bg:            '#FAFAFA',
    bgAlt:         '#F3F4F6',
    bgCard:        '#FFFFFF',
    text:          '#111827',
    textMuted:     '#6B7280',
    border:        '#E5E7EB',
    navBg:         'rgba(250,250,250,0.98)',
    font:          "Georgia,'Times New Roman',serif",
    headingFont:   "Georgia,'Times New Roman',serif",
    radius:        '4px',
    radiusSm:      '2px',
    heroGradient:  'linear-gradient(135deg,#FAFAFA 0%,#F3F4F6 100%)',
    buttonCSS:     'background:#1F2937;color:#fff;border:none;',
    shadowColor:   'rgba(0,0,0,0.06)',
    headingGradient: '',
  },
  warm: {
    primary:       '#B45309',
    primaryRgb:    '180,83,9',
    accent:        '#DC2626',
    bg:            '#FFFBF5',
    bgAlt:         '#FEF9EE',
    bgCard:        '#FFFFFF',
    text:          '#1C1917',
    textMuted:     '#78716C',
    border:        '#FDE68A',
    navBg:         'rgba(255,251,245,0.96)',
    font:          "-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif",
    headingFont:   "Georgia,'Times New Roman',serif",
    radius:        '16px',
    radiusSm:      '10px',
    heroGradient:  'linear-gradient(135deg,#FFFBF5 0%,#FEF9EE 50%,#FEF3C7 100%)',
    buttonCSS:     'background:#B45309;color:#fff;border:none;',
    shadowColor:   'rgba(180,83,9,0.12)',
    headingGradient: '',
  },
  tech: {
    primary:       '#06B6D4',
    primaryRgb:    '6,182,212',
    accent:        '#8B5CF6',
    bg:            '#080D1A',
    bgAlt:         '#0D1626',
    bgCard:        '#0D1626',
    text:          '#E2E8F0',
    textMuted:     '#64748B',
    border:        '#1E3A5F',
    navBg:         'rgba(8,13,26,0.96)',
    font:          "'Courier New',Consolas,monospace",
    headingFont:   "-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif",
    radius:        '6px',
    radiusSm:      '4px',
    heroGradient:  'linear-gradient(135deg,#080D1A 0%,#0D1626 60%,#0C1A35 100%)',
    buttonCSS:     'background:transparent;color:#06B6D4;border:1px solid #06B6D4;',
    shadowColor:   'rgba(6,182,212,0.2)',
    headingGradient: 'background:linear-gradient(135deg,#06B6D4,#8B5CF6);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;',
  },
  luxe: {
    primary:       '#B8860B',
    primaryRgb:    '184,134,11',
    accent:        '#DAA520',
    bg:            '#09090A',
    bgAlt:         '#111110',
    bgCard:        '#111110',
    text:          '#F5F0E8',
    textMuted:     '#8A8070',
    border:        '#2A2410',
    navBg:         'rgba(9,9,10,0.98)',
    font:          "Georgia,'Times New Roman',serif",
    headingFont:   "Georgia,'Times New Roman',serif",
    radius:        '2px',
    radiusSm:      '1px',
    heroGradient:  'linear-gradient(135deg,#09090A 0%,#111110 100%)',
    buttonCSS:     'background:transparent;color:#DAA520;border:1px solid #B8860B;',
    shadowColor:   'rgba(184,134,11,0.15)',
    headingGradient: 'background:linear-gradient(135deg,#DAA520,#B8860B);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;',
  },
};

// ─── Industry Content ─────────────────────────────────────────────────────────

interface IndustryContent {
  hero:        string;
  heroSub:     string;
  services:    [string, string, string];
  icons:       [string, string, string];
  descs:       [string, string, string];
  cta:         string;
  ctaSub:      string;
  stats:       [{ val: string; label: string }, { val: string; label: string }, { val: string; label: string }];
  navLinks:    [string, string, string, string];
}

const CONTENT_EN: Record<string, IndustryContent> = {
  restaurant: {
    hero: 'Exceptional Dining, Unforgettable Moments',
    heroSub: 'Fresh ingredients, authentic flavors, and warm hospitality — crafted just for you.',
    services: ['Fine Dining', 'Online Reservations', 'Private Events'],
    icons:    ['🍽️', '📅', '🎉'],
    descs:    ['Curated menus featuring the finest seasonal ingredients and local produce.','Book your table online in seconds — no waiting, no hassle.','From intimate gatherings to grand celebrations, we handle every detail.'],
    cta: 'Reserve Your Table Tonight',
    ctaSub: 'Join thousands of guests who have made us their favorite dining destination.',
    stats: [{ val: '1,200+', label: 'Guests/Month' }, { val: '4.9★', label: 'Average Rating' }, { val: '12 yrs', label: 'Excellence' }],
    navLinks: ['Menu', 'Reservations', 'Events', 'Contact'],
  },
  retail: {
    hero: 'Shop Smarter. Live Better.',
    heroSub: 'Premium products, exclusive deals, and a seamless shopping experience — all in one place.',
    services: ['Curated Collections', 'Fast Delivery', 'Easy Returns'],
    icons:    ['🛍️', '🚚', '↩️'],
    descs:    ['Hand-picked products that meet our strict quality standards.','Same-day and next-day delivery available to your doorstep.','Hassle-free 30-day return policy on every order.'],
    cta: 'Shop New Arrivals',
    ctaSub: 'Over 10,000 satisfied customers trust us for quality and value.',
    stats: [{ val: '10k+', label: 'Happy Customers' }, { val: '5,000+', label: 'Products' }, { val: '99%', label: 'Satisfaction' }],
    navLinks: ['Shop', 'Collections', 'Sale', 'Contact'],
  },
  tech: {
    hero: 'Intelligent Solutions for a Digital World',
    heroSub: 'Transforming businesses through innovative technology, AI, and data-driven strategies.',
    services: ['AI & Automation', 'Cloud Solutions', 'Cybersecurity'],
    icons:    ['🤖', '☁️', '🔐'],
    descs:    ['Harness AI to automate workflows and scale your operations efficiently.','Secure, scalable cloud infrastructure built for enterprise demands.','End-to-end security solutions to protect your data and reputation.'],
    cta: 'Schedule a Free Consultation',
    ctaSub: 'Join 200+ companies that trust us to power their digital transformation.',
    stats: [{ val: '200+', label: 'Enterprise Clients' }, { val: '99.9%', label: 'Uptime SLA' }, { val: '24/7', label: 'Expert Support' }],
    navLinks: ['Solutions', 'Products', 'About', 'Contact'],
  },
  healthcare: {
    hero: 'Your Health. Our Priority.',
    heroSub: 'Compassionate, expert care delivered with the latest medical technology.',
    services: ['Primary Care', 'Online Appointments', 'Specialist Referrals'],
    icons:    ['❤️', '💻', '👨‍⚕️'],
    descs:    ['Comprehensive health assessments and personalized preventive care.','Book appointments online from the comfort of your home.','Seamless coordination with top specialists in your area.'],
    cta: 'Book Your Appointment',
    ctaSub: 'Trusted by 5,000+ patients. Your wellness journey starts here.',
    stats: [{ val: '5,000+', label: 'Patients Served' }, { val: '15+', label: 'Specialists' }, { val: '98%', label: 'Satisfaction' }],
    navLinks: ['Services', 'Appointments', 'Doctors', 'Contact'],
  },
  finance: {
    hero: 'Secure Your Financial Future',
    heroSub: 'Expert wealth management, strategic planning, and personalized financial solutions.',
    services: ['Wealth Management', 'Tax Planning', 'Investment Advisory'],
    icons:    ['📈', '💰', '🏦'],
    descs:    ['Tailored investment strategies designed around your long-term goals.','Maximize returns and minimize tax liability with expert guidance.','Diversified portfolio management backed by decades of expertise.'],
    cta: 'Get a Free Financial Review',
    ctaSub: 'Over $2B in assets managed for clients across North America.',
    stats: [{ val: '$2B+', label: 'Assets Managed' }, { val: '500+', label: 'Clients' }, { val: '20+ yrs', label: 'Experience' }],
    navLinks: ['Services', 'About', 'Resources', 'Contact'],
  },
  education: {
    hero: 'Learn Without Limits',
    heroSub: 'World-class education, flexible schedules, and expert instructors — all online.',
    services: ['Online Courses', 'Live Tutoring', 'Certifications'],
    icons:    ['📚', '🎓', '📜'],
    descs:    ['500+ courses across tech, business, design, and more.','One-on-one sessions with experienced industry professionals.','Recognized certifications that boost your career prospects.'],
    cta: 'Start Learning Free',
    ctaSub: 'Join 50,000+ learners already advancing their careers.',
    stats: [{ val: '50k+', label: 'Active Learners' }, { val: '500+', label: 'Courses' }, { val: '95%', label: 'Completion Rate' }],
    navLinks: ['Courses', 'Tutoring', 'Certifications', 'Contact'],
  },
  realEstate: {
    hero: 'Find Your Perfect Home',
    heroSub: 'Expert real estate services for buyers, sellers, and investors across the region.',
    services: ['Property Listings', 'Market Analysis', 'Investment Consulting'],
    icons:    ['🏡', '📊', '💼'],
    descs:    ['Exclusive listings and off-market properties hand-selected for you.','Data-driven market insights to guide your investment decisions.','Strategic consulting for commercial and residential investors.'],
    cta: 'Browse Listings',
    ctaSub: '300+ properties sold. Your dream home is waiting.',
    stats: [{ val: '300+', label: 'Properties Sold' }, { val: '$150M+', label: 'Volume' }, { val: '98%', label: 'Client Retention' }],
    navLinks: ['Listings', 'Services', 'About', 'Contact'],
  },
  manufacturing: {
    hero: 'Precision Engineering, Delivered',
    heroSub: 'Custom manufacturing solutions that power industries across North America.',
    services: ['Custom Fabrication', 'Quality Assurance', 'Supply Chain'],
    icons:    ['⚙️', '✅', '🚛'],
    descs:    ['Precision-engineered components built to your exact specifications.','ISO-certified quality control at every stage of production.','Streamlined supply chain management for on-time delivery.'],
    cta: 'Request a Quote',
    ctaSub: '50+ years of manufacturing excellence. Trusted by Fortune 500 companies.',
    stats: [{ val: '50+ yrs', label: 'In Business' }, { val: '1,000+', label: 'Parts/Day' }, { val: 'ISO 9001', label: 'Certified' }],
    navLinks: ['Products', 'Capabilities', 'About', 'Contact'],
  },
  beauty: {
    hero: 'Beauty Elevated. Confidence Redefined.',
    heroSub: 'Premium beauty services crafted to bring out your very best self.',
    services: ['Hair & Styling', 'Skin Treatments', 'Spa & Wellness'],
    icons:    ['💇', '✨', '🌸'],
    descs:    ['Expert cuts, color, and styling tailored to your unique personality.','Advanced skincare treatments using luxury clinical products.','Holistic spa experiences designed to relax, restore, and revive.'],
    cta: 'Book Your Session',
    ctaSub: '2,000+ clients trust us for their beauty and wellness needs.',
    stats: [{ val: '2,000+', label: 'Happy Clients' }, { val: '4.9★', label: 'Rating' }, { val: '10+ yrs', label: 'Of Beauty' }],
    navLinks: ['Services', 'Gallery', 'Booking', 'Contact'],
  },
  other: {
    hero: 'Professional Services That Deliver Results',
    heroSub: 'Tailored solutions backed by expertise, integrity, and commitment to your success.',
    services: ['Strategy Consulting', 'Implementation', 'Ongoing Support'],
    icons:    ['🎯', '⚡', '🤝'],
    descs:    ['Customized strategies that align with your business objectives.','Seamless execution from planning through to completion.','Dedicated support team ensuring long-term success.'],
    cta: 'Get a Free Consultation',
    ctaSub: 'Trusted by businesses across industries. Let us help you grow.',
    stats: [{ val: '100+', label: 'Clients Served' }, { val: '98%', label: 'Success Rate' }, { val: '10+ yrs', label: 'Experience' }],
    navLinks: ['Services', 'About', 'Portfolio', 'Contact'],
  },
};

const CONTENT_ZH: Partial<Record<string, IndustryContent>> = {
  restaurant: {
    hero: '精致餐饮，难忘体验',
    heroSub: '甄选食材，匠心厨艺，温馨待客 — 为您倾心打造。',
    services: ['精品料理', '在线预约', '私人宴会'],
    icons:    ['🍽️', '📅', '🎉'],
    descs:    ['精选时令食材，呈现地道风味佳肴。','在线即时预约，告别繁琐等待。','从小型聚会到盛大宴席，全程精心打理。'],
    cta: '立即预约座位',
    ctaSub: '数千名食客的共同选择，成为我们的下一位贵宾。',
    stats: [{ val: '1,200+', label: '月均就餐人次' }, { val: '4.9★', label: '综合评分' }, { val: '12年', label: '餐饮经验' }],
    navLinks: ['菜单', '预约', '活动', '联系我们'],
  },
  tech: {
    hero: '智能解决方案，驱动数字未来',
    heroSub: '通过创新技术、人工智能和数据驱动战略，助力企业转型升级。',
    services: ['AI与自动化', '云端解决方案', '网络安全'],
    icons:    ['🤖', '☁️', '🔐'],
    descs:    ['运用AI自动化工作流程，高效扩展业务规模。','安全可靠的云基础设施，满足企业级需求。','端到端安全解决方案，守护您的数据与声誉。'],
    cta: '预约免费咨询',
    ctaSub: '已有200+企业信任我们，共同推进数字化转型。',
    stats: [{ val: '200+', label: '企业客户' }, { val: '99.9%', label: '服务可用率' }, { val: '24/7', label: '专家支持' }],
    navLinks: ['解决方案', '产品', '关于我们', '联系我们'],
  },
  realEstate: {
    hero: '寻找您的理想居所',
    heroSub: '专业房产服务，为买家、卖家和投资者提供全方位支持。',
    services: ['精选房源', '市场分析', '投资咨询'],
    icons:    ['🏡', '📊', '💼'],
    descs:    ['独家房源及场外挂牌，为您精心甄选。','数据驱动的市场洞察，指导您的投资决策。','商业及住宅投资的专业战略顾问服务。'],
    cta: '浏览精选房源',
    ctaSub: '成功成交300+套物业，您的理想家园正在等待。',
    stats: [{ val: '300+', label: '成功成交' }, { val: '1.5亿+', label: '交易总额' }, { val: '98%', label: '客户续约率' }],
    navLinks: ['房源', '服务', '关于我们', '联系我们'],
  },
  finance: {
    hero: '守护您的财务未来',
    heroSub: '专业财富管理、战略规划与个性化金融解决方案。',
    services: ['财富管理', '税务规划', '投资顾问'],
    icons:    ['📈', '💰', '🏦'],
    descs:    ['围绕您的长期目标定制投资策略。','专业指导，实现收益最大化，税负最小化。','数十年经验支撑的多元化投资组合管理。'],
    cta: '预约免费财务诊断',
    ctaSub: '北美客户资产管理规模超20亿美元。',
    stats: [{ val: '$20亿+', label: '管理规模' }, { val: '500+', label: '服务客户' }, { val: '20+年', label: '行业经验' }],
    navLinks: ['服务', '关于我们', '资讯', '联系我们'],
  },
  other: {
    hero: '专业服务，创造卓越成果',
    heroSub: '以专业、诚信和对您成功的承诺，提供量身定制的解决方案。',
    services: ['战略咨询', '项目实施', '持续支持'],
    icons:    ['🎯', '⚡', '🤝'],
    descs:    ['与您业务目标高度契合的定制化战略方案。','从规划到落地，全程无缝执行推进。','专属支持团队，确保长期稳定成功。'],
    cta: '预约免费咨询',
    ctaSub: '已服务跨行业百余家企业，助力您的成长之路。',
    stats: [{ val: '100+', label: '服务客户' }, { val: '98%', label: '成功率' }, { val: '10+年', label: '行业经验' }],
    navLinks: ['服务', '关于我们', '案例', '联系我们'],
  },
};

function getContent(industry: string, locale: string): IndustryContent {
  const isZh = locale.startsWith('zh');
  if (isZh) {
    return (CONTENT_ZH[industry] ?? CONTENT_ZH['other']) as IndustryContent;
  }
  return CONTENT_EN[industry] ?? CONTENT_EN['other']!;
}

// ─── Industry Hero Images (Unsplash — free commercial license) ────────────────
// Each photo ID is fixed so the same industry always renders the same image.
// Attribution: photos from unsplash.com (Unsplash License allows free commercial use).

const HERO_IMAGES: Record<string, string> = {
  restaurant:    'photo-1414235077428-338989a2e8c0', // warm restaurant interior
  retail:        'photo-1441986300917-64674bd600d8', // clean modern boutique
  tech:          'photo-1518770660439-4636190af475', // circuit board macro
  healthcare:    'photo-1576091160399-112ba8d25d1d', // doctor / medical
  finance:       'photo-1611974789855-9c2a0a7236a3', // trading / finance charts
  education:     'photo-1523050854058-8df90110c9f1', // campus / students
  realEstate:    'photo-1560448204-e02f11c3d0e2',    // modern house exterior
  manufacturing: 'photo-1581091226825-a6a2a5aee158', // factory / industrial
  beauty:        'photo-1560472354-b33ff0c44a43',    // beauty salon interior
  other:         'photo-1497366216548-37526070297c',  // modern bright office
};

function getHeroImageUrl(industry: string, designStyle: string): string {
  const photoId = HERO_IMAGES[industry] ?? HERO_IMAGES['other'];
  // Use larger crop for a cinematic feel; portrait crops for mobile-frame
  return `https://images.unsplash.com/${photoId}?w=1400&h=700&fit=crop&crop=center&q=80&auto=format`;
}

// Overlay opacity per theme — dark themes need lighter overlay, light themes darker
function getHeroOverlay(designStyle: string, primaryRgb: string): string {
  switch (designStyle) {
    case 'bold':    return `rgba(15,23,42,0.78)`;
    case 'tech':    return `rgba(8,13,26,0.82)`;
    case 'luxe':    return `rgba(9,9,10,0.80)`;
    case 'minimal': return `rgba(250,250,250,0.72)`;
    case 'warm':    return `rgba(255,251,245,0.70)`;
    default:        return `rgba(255,255,255,0.68)`;   // clean
  }
}

// ─── Main Generator ───────────────────────────────────────────────────────────

export function generatePreviewHTML(answers: WizardAnswers, locale: string): string {
  const theme      = THEMES[answers.designStyle] ?? THEMES['clean'];
  const content    = getContent(answers.industry, locale);
  const isZh       = locale.startsWith('zh');
  const heroImgUrl = getHeroImageUrl(answers.industry, answers.designStyle);
  const heroOverlay= getHeroOverlay(answers.designStyle, theme.primaryRgb);

  const company = answers.contact.company || answers.contact.name || (isZh ? '您的公司' : 'Your Company');
  const email   = answers.contact.email || (isZh ? 'hello@yourcompany.com' : 'hello@yourcompany.com');
  const phone   = answers.contact.phone || '';

  const learnMore   = isZh ? '了解更多'   : 'Learn More';
  const ourServices = isZh ? '核心服务'   : 'OUR SERVICES';
  const whatWeDo    = isZh ? '我们的专业能力' : 'What We Do Best';
  const servSub     = isZh ? '专注为客户提供卓越的专业服务与解决方案。' : 'Expert services tailored to your needs and business goals.';
  const contactUs   = isZh ? '联系我们'   : 'CONTACT US';
  const workTogether= isZh ? '期待与您合作' : "Let's Work Together";
  const contactSub  = isZh ? '有任何问题或合作意向，请随时联系我们，我们将尽快回复。' : "Have a project in mind? We'd love to hear from you.";
  const namePH      = isZh ? '您的姓名'   : 'Your Name';
  const emailPH     = isZh ? '邮箱地址'   : 'Email Address';
  const subjectPH   = isZh ? '主题'       : 'Subject';
  const msgPH       = isZh ? '请描述您的需求...' : 'Tell us about your project...';
  const sendMsg     = isZh ? '发送消息'   : 'Send Message';
  const location    = isZh ? '纽约，美国' : 'New York, USA';
  const allRights   = isZh ? '保留所有权利。' : 'All rights reserved.';
  const proLabel    = isZh ? '专业服务商' : 'Professional Services';

  // tech-specific glow effect
  const techGlow = answers.designStyle === 'tech' ? `
    .card:hover { box-shadow: 0 0 32px rgba(6,182,212,0.18); border-color: rgba(6,182,212,0.4); }
    .hero::after { content:''; position:absolute; top:50%; left:50%; transform:translate(-50%,-50%); width:500px; height:500px; border-radius:50%; background:radial-gradient(circle,rgba(6,182,212,0.06) 0%,transparent 70%); pointer-events:none; }
  ` : '';

  const luxeAccent = answers.designStyle === 'luxe' ? `
    .card:hover { border-color:rgba(184,134,11,0.4); box-shadow:0 8px 32px rgba(184,134,11,0.12); }
    .stats-bar { background:#111110; }
  ` : '';

  return `<!DOCTYPE html>
<html lang="${locale}">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>${company}</title>
<style>
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth}
body{font-family:${theme.font};background:${theme.bg};color:${theme.text};line-height:1.6;font-size:15px}

/* NAV */
nav{position:sticky;top:0;z-index:100;background:${theme.navBg};backdrop-filter:blur(12px);border-bottom:1px solid ${theme.border};padding:0 40px;height:64px;display:flex;align-items:center;justify-content:space-between}
.logo{font-family:${theme.headingFont};font-size:19px;font-weight:700;color:${theme.primary};letter-spacing:-0.4px;text-decoration:none}
.nav-links{display:flex;gap:28px;list-style:none}
.nav-links a{color:${theme.text};text-decoration:none;font-size:14px;font-weight:500;opacity:0.75;transition:opacity .2s,color .2s}
.nav-links a:hover{opacity:1;color:${theme.primary}}
.nav-btn{padding:8px 20px;border-radius:${theme.radiusSm};font-size:14px;font-weight:600;cursor:pointer;text-decoration:none;transition:opacity .2s,transform .2s;${theme.buttonCSS}}
.nav-btn:hover{opacity:.85;transform:translateY(-1px)}

/* HERO */
.hero{background:${theme.heroGradient};padding:96px 40px 80px;text-align:center;position:relative;overflow:hidden;background-image:url('${heroImgUrl}');background-size:cover;background-position:center}
.hero::before{content:'';position:absolute;inset:0;background:${heroOverlay};backdrop-filter:blur(1px)}
.badge{display:inline-flex;align-items:center;gap:6px;background:rgba(${theme.primaryRgb},.1);color:${theme.primary};border:1px solid rgba(${theme.primaryRgb},.2);border-radius:100px;padding:6px 16px;font-size:13px;font-weight:600;margin-bottom:24px;letter-spacing:.5px;position:relative}
h1{font-family:${theme.headingFont};font-size:clamp(30px,5vw,54px);font-weight:800;line-height:1.15;letter-spacing:-1px;margin-bottom:20px;max-width:780px;margin-left:auto;margin-right:auto;position:relative;${theme.headingGradient}}
.hero-sub{font-size:18px;color:${theme.textMuted};max-width:540px;margin:0 auto 36px;line-height:1.7;position:relative}
.hero-actions{display:flex;gap:12px;justify-content:center;flex-wrap:wrap;position:relative}

/* BUTTONS */
.btn{padding:13px 30px;border-radius:${theme.radiusSm};font-size:15px;font-weight:600;cursor:pointer;text-decoration:none;display:inline-flex;align-items:center;gap:8px;transition:opacity .2s,transform .2s}
.btn-p{${theme.buttonCSS}box-shadow:0 4px 16px rgba(${theme.primaryRgb},.28)}
.btn-p:hover{opacity:.88;transform:translateY(-2px)}
.btn-s{background:transparent;color:${theme.text};border:1px solid ${theme.border}}
.btn-s:hover{border-color:${theme.primary};transform:translateY(-2px)}
.btn-w{background:#fff;color:${theme.primary};border:none;box-shadow:0 4px 16px rgba(0,0,0,.15)}
.btn-w:hover{opacity:.9;transform:translateY(-2px)}

/* STATS */
.stats{background:${theme.bgCard};border-top:1px solid ${theme.border};border-bottom:1px solid ${theme.border};padding:32px 40px;display:flex;justify-content:center;gap:72px;flex-wrap:wrap}
.stat{text-align:center}
.stat-v{font-family:${theme.headingFont};font-size:30px;font-weight:800;color:${theme.primary};line-height:1;margin-bottom:4px}
.stat-l{font-size:13px;color:${theme.textMuted};font-weight:500}

/* SECTIONS */
.sec{padding:76px 40px}
.sec-alt{padding:76px 40px;background:${theme.bgAlt}}
.sec-hd{text-align:center;margin-bottom:48px}
.sec-label{display:inline-block;color:${theme.primary};font-size:11px;font-weight:700;letter-spacing:2.5px;text-transform:uppercase;margin-bottom:12px}
.sec-title{font-family:${theme.headingFont};font-size:clamp(22px,3vw,36px);font-weight:700;line-height:1.2;letter-spacing:-.4px;margin-bottom:12px}
.sec-sub{font-size:15px;color:${theme.textMuted};max-width:460px;margin:0 auto}

/* CARDS */
.cards{display:grid;grid-template-columns:repeat(3,1fr);gap:22px;max-width:1080px;margin:0 auto}
.card{background:${theme.bgCard};border:1px solid ${theme.border};border-radius:${theme.radius};padding:30px 26px;transition:transform .3s,box-shadow .3s,border-color .3s;position:relative;overflow:hidden}
.card::before{content:'';position:absolute;top:0;left:0;right:0;height:3px;background:${theme.primary};opacity:0;transition:opacity .3s}
.card:hover{transform:translateY(-6px);box-shadow:0 12px 32px ${theme.shadowColor};border-color:rgba(${theme.primaryRgb},.3)}
.card:hover::before{opacity:1}
.card-icon{font-size:30px;margin-bottom:14px;display:block}
.card-title{font-family:${theme.headingFont};font-size:17px;font-weight:700;margin-bottom:10px}
.card-desc{font-size:14px;color:${theme.textMuted};line-height:1.65}

/* CTA BAND */
.cta-band{padding:76px 40px;text-align:center;background:${theme.primary};position:relative;overflow:hidden}
.cta-band::before{content:'';position:absolute;inset:0;background:linear-gradient(135deg,transparent 40%,rgba(255,255,255,.06) 100%)}
.cta-band h2{font-family:${theme.headingFont};font-size:clamp(22px,3vw,38px);font-weight:800;color:#fff;margin-bottom:12px;position:relative}
.cta-band p{font-size:15px;color:rgba(255,255,255,.8);max-width:460px;margin:0 auto 28px;position:relative}

/* CONTACT */
.contact-grid{display:grid;grid-template-columns:1fr 1fr;gap:48px;max-width:940px;margin:0 auto;align-items:center}
.contact-info h3{font-family:${theme.headingFont};font-size:26px;font-weight:700;margin-bottom:14px}
.contact-info p{font-size:14px;color:${theme.textMuted};margin-bottom:24px;line-height:1.7}
.c-items{display:flex;flex-direction:column;gap:12px}
.c-item{display:flex;align-items:center;gap:12px;font-size:14px;color:${theme.textMuted}}
.c-icon{width:36px;height:36px;background:rgba(${theme.primaryRgb},.1);color:${theme.primary};border-radius:${theme.radiusSm};display:flex;align-items:center;justify-content:center;font-size:15px;flex-shrink:0}
.c-form{background:${theme.bgCard};border:1px solid ${theme.border};border-radius:${theme.radius};padding:28px;display:flex;flex-direction:column;gap:14px;box-shadow:0 4px 20px ${theme.shadowColor}}
.f-input{width:100%;padding:11px 14px;border:1px solid ${theme.border};border-radius:${theme.radiusSm};background:${theme.bgAlt};color:${theme.text};font-size:14px;font-family:${theme.font};outline:none;transition:border-color .2s}
.f-input:focus{border-color:${theme.primary}}
.f-row{display:grid;grid-template-columns:1fr 1fr;gap:12px}

/* FOOTER */
footer{background:${theme.bgCard};border-top:1px solid ${theme.border};padding:36px 40px;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:16px}
.f-logo{font-family:${theme.headingFont};font-size:17px;font-weight:700;color:${theme.primary}}
.f-copy{font-size:13px;color:${theme.textMuted}}
.f-links{display:flex;gap:22px;list-style:none}
.f-links a{font-size:13px;color:${theme.textMuted};text-decoration:none;transition:color .2s}
.f-links a:hover{color:${theme.primary}}

${techGlow}
${luxeAccent}
</style>
</head>
<body>

<!-- NAV -->
<nav>
  <a class="logo" href="#">${company}</a>
  <ul class="nav-links">
    ${content.navLinks.map(l => `<li><a href="#">${l}</a></li>`).join('')}
  </ul>
  <a class="nav-btn" href="#contact">${isZh ? '立即开始' : 'Get Started'}</a>
</nav>

<!-- HERO -->
<section class="hero">
  <div class="badge">✦ ${proLabel}</div>
  <h1>${content.hero}</h1>
  <p class="hero-sub">${content.heroSub}</p>
  <div class="hero-actions">
    <a class="btn btn-p" href="#contact">${content.cta} →</a>
    <a class="btn btn-s" href="#services">${learnMore}</a>
  </div>
</section>

<!-- STATS -->
<div class="stats">
  ${content.stats.map(s => `<div class="stat"><div class="stat-v">${s.val}</div><div class="stat-l">${s.label}</div></div>`).join('')}
</div>

<!-- SERVICES -->
<section class="sec-alt" id="services">
  <div class="sec-hd">
    <div class="sec-label">${ourServices}</div>
    <h2 class="sec-title">${whatWeDo}</h2>
    <p class="sec-sub">${servSub}</p>
  </div>
  <div class="cards">
    ${content.services.map((svc, i) => `
    <div class="card">
      <span class="card-icon">${content.icons[i]}</span>
      <div class="card-title">${svc}</div>
      <div class="card-desc">${content.descs[i]}</div>
    </div>`).join('')}
  </div>
</section>

<!-- CTA BAND -->
<section class="cta-band">
  <h2>${content.cta}</h2>
  <p>${content.ctaSub}</p>
  <a class="btn btn-w" href="#contact">${isZh ? '立即咨询 →' : 'Get Started →'}</a>
</section>

<!-- CONTACT -->
<section class="sec" id="contact">
  <div class="contact-grid">
    <div class="contact-info">
      <div class="sec-label">${contactUs}</div>
      <h3>${workTogether}</h3>
      <p>${contactSub}</p>
      <div class="c-items">
        <div class="c-item"><div class="c-icon">📧</div><span>${email}</span></div>
        ${phone ? `<div class="c-item"><div class="c-icon">📞</div><span>${phone}</span></div>` : ''}
        <div class="c-item"><div class="c-icon">📍</div><span>${location}</span></div>
      </div>
    </div>
    <div class="c-form">
      <div class="f-row">
        <input class="f-input" placeholder="${namePH}" />
        <input class="f-input" placeholder="${emailPH}" />
      </div>
      <input class="f-input" placeholder="${subjectPH}" />
      <textarea class="f-input" rows="4" placeholder="${msgPH}" style="resize:vertical"></textarea>
      <button class="btn btn-p" style="width:100%;justify-content:center">${sendMsg}</button>
    </div>
  </div>
</section>

<!-- FOOTER -->
<footer>
  <div class="f-logo">${company}</div>
  <div class="f-copy">© ${new Date().getFullYear()} ${company}. ${allRights}</div>
  <ul class="f-links">
    ${content.navLinks.map(l => `<li><a href="#">${l}</a></li>`).join('')}
  </ul>
</footer>
<div style="text-align:center;padding:8px;font-size:11px;color:${theme.textMuted};background:${theme.bgAlt};border-top:1px solid ${theme.border};">
  ${isZh ? '演示预览 · 图片来源' : 'Preview mockup · Photos by'} <a href="https://unsplash.com" target="_blank" style="color:${theme.primary};text-decoration:none;">Unsplash</a>
</div>

</body>
</html>`;
}
