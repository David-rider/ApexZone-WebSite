export interface BlogPost {
  id:          string;
  slug:        string;
  category:    'webDesign' | 'seo' | 'marketing' | 'tech' | 'caseStudy';
  title:       string;
  titleZh:     string;
  excerpt:     string;
  excerptZh:   string;
  content:     string;
  contentZh:   string;
  author:      string;
  date:        string;
  readTime:    number;
  featured:    boolean;
  coverColor:  string;
  cover?:      string;
}

export const blogPosts: BlogPost[] = [
  {
    id:       '1',
    slug:     'why-bilingual-website-matters-us-business',
    category: 'marketing',
    title:    'Why a Bilingual Website is a Competitive Advantage for US Businesses',
    titleZh:  '为什么双语网站是美国企业的竞争优势',
    excerpt:  'With 4+ million Chinese-speaking consumers in the US, a bilingual website isn\'t just thoughtful — it\'s a strategic growth channel.',
    excerptZh:'美国拥有超过400万华语消费者，双语网站不仅是体贴，更是战略性增长渠道。',
    content:  `
      <h2>The Landscape of the US Market</h2>
      <p>The United States is home to one of the largest and most influential Chinese-speaking populations in the world. For businesses operating in tech, finance, or retail, reaching this audience isn't just about language—it's about building trust and showing cultural competence.</p>
      
      <h3>1. Building Immediate Trust</h3>
      <p>When a visitor lands on a website in their native language, the bounce rate drops significantly. For Chinese-speaking entrepreneurs and families in the US, seeing high-quality, professional Chinese content signals that your business values their patronage and understands their needs.</p>
      
      <h3>2. SEO and Searchability</h3>
      <p>Bilingual SEO allows your business to rank for twice as many keywords. While your competitors are only fighting for English search terms, you are capturing the growing volume of Chinese search queries on Google and Baidu.</p>
      
      <h3>3. Conversion Rates</h3>
      <p>Studies show that customers are 75% more likely to buy from a website in their own language. By removing the language barrier, you're smoothing the path to a sale or a lead.</p>
    `,
    contentZh: `
      <h2>美国市场的现状</h2>
      <p>美国拥有全球规模最大、最具影响力的华语群体之一。对于科技、金融或零售行业的企业来说，触达这部分受众不仅仅是语言问题，更是建立信任和展示文化理解力的问题。</p>
      
      <h3>1. 建立即时信任</h3>
      <p>当访客进入一个母语网站时，跳出率会显著降低。对于美国的华语企业家和家庭来说，看到高质量、专业的中文内容意味着您的企业重视他们的光顾并了解他们的需求。</p>
      
      <h3>2. SEO 与可搜索性</h3>
      <p>双语 SEO 让您的企业能够竞争双倍的关键词。当您的竞争对手还在争夺英文搜索词时，您正在捕获谷歌和百度上日益增长的中文搜索查询。</p>
      
      <h3>3. 转化率</h3>
      <p>研究表明，客户在母语网站上购买的可能性高出 75%。通过消除语言障碍，您正在为销售或获取线索扫清道路。</p>
    `,
    author:   'Apex Zone Team',
    date:     '2026-03-15',
    readTime: 6,
    featured: true,
    coverColor: 'linear-gradient(135deg, #3A7D5C 0%, #2BB5A0 100%)',
    cover: '/images/mock/blog_ai.png',
  },
  {
    id:       '2',
    slug:     'core-web-vitals-2025-complete-guide',
    category: 'seo',
    title:    'Core Web Vitals 2025: The Complete Guide for Small Business Owners',
    titleZh:  '2025年网页核心性能指标完整指南：专为小企业主',
    excerpt:  'Google\'s ranking algorithm now heavily weighs page experience. Here\'s exactly what you need to score 90+ on Lighthouse.',
    excerptZh:'谷歌排名算法现在非常重视页面体验。以下是确保Lighthouse得分90+的完整方法。',
    content:  `
      <h2>What are Core Web Vitals?</h2>
      <p>Core Web Vitals are a set of specific factors that Google considers important in a webpage's overall user experience. They are made up of three specific page speed and user interaction measurements: LCP, FID, and CLS.</p>
      
      <h3>LCP: Largest Contentful Paint</h3>
      <p>This measures how long it takes for the largest piece of content on your page (usually an image or heading) to appear. For a good user experience, LCP should occur within 2.5 seconds.</p>
      
      <h3>FID: First Input Delay</h3>
      <p>FID measures the time from when a user first interacts with your site to the time when the browser is actually able to respond to that interaction. Ideally, this should be less than 100 milliseconds.</p>
      
      <h3>CLS: Cumulative Layout Shift</h3>
      <p>Have you ever tried to click a button only for the page to move at the last second? That's layout shift. CLS measures the total score of all unexpected layout shifts that occur during the entire lifespan of the page.</p>
    `,
    contentZh: `
      <h2>什么是网页核心性能指标？</h2>
      <p>网页核心性能指标（Core Web Vitals）是谷歌认为对网页整体用户体验至关重要的一组特定因素。它们由三个特定的页面速度和用户交互测量指标组成：LCP、FID 和 CLS。</p>
      
      <h3>LCP：最大内容渲染时间</h3>
      <p>这衡量页面上最大的内容块（通常是图片或标题）出现所需的时间。为了获得良好的用户体验，LCP 应在 2.5 秒内发生。</p>
      
      <h3>FID：首次输入延迟</h3>
      <p>FID 衡量从用户首次与您的网站交互到浏览器实际能够响应该交互的时间。理想情况下，这应少于 100 毫秒。</p>
      
      <h3>CLS：累积布局偏移</h3>
      <p>您是否曾尝试点击一个按钮，结果页面在最后一秒发生了移动？这就是布局偏移。CLS 衡量页面整个生命周期中发生的所有意外布局偏移的总分。</p>
    `,
    author:   'Apex Zone Team',
    date:     '2026-04-02',
    readTime: 8,
    featured: true,
    coverColor: 'linear-gradient(135deg, #3B82C4 0%, #1E5F9E 100%)',
    cover: '/images/mock/blog_tech.png',
  },
  {
    id:       '3',
    slug:     'noviant-case-study-bilingual-seo',
    category: 'caseStudy',
    title:    'Case Study: How We Built a 98-Score Bilingual Site for a NY Tech Firm',
    titleZh:  '案例解析：为纽约科技公司打造Lighthouse 98分双语网站',
    excerpt:  'A behind-the-scenes look at the technical decisions that drove exceptional performance and bilingual SEO for Noviant.',
    excerptZh:'深入了解为Noviant打造卓越性能和双语SEO背后的技术决策。',
    content:  `
      <h2>Project Overview</h2>
      <p>Noviant Inc. is a leading ICT and AI consulting firm in New York. They needed a digital presence that matched their technical expertise—fast, secure, and accessible to both English and Chinese speaking clients.</p>
      
      <h3>The Tech Stack</h3>
      <p>We chose Next.js for its superior performance and SEO capabilities. By using the App Router and React Server Components, we were able to deliver a site that is almost entirely static, leading to instant load times.</p>
      
      <h3>Bilingual Implementation</h3>
      <p>Using next-intl, we implemented a robust internationalization system that handles not just text, but also local SEO metadata and URL structures, ensuring Google indexes both versions correctly.</p>
      
      <h3>Results</h3>
      <p>The site launched with a 98/100 performance score on Lighthouse and saw a 40% increase in organic leads within the first three months.</p>
    `,
    contentZh: `
      <h2>项目概览</h2>
      <p>Noviant Inc. 是纽约领先的 ICT 和 AI 咨询公司。他们需要一个与其技术专业知识相匹配的数字形象——快速、安全，且能让中英文客户都能轻松访问。</p>
      
      <h3>技术栈选择</h3>
      <p>我们选择了 Next.js，因为它具有卓越的性能和 SEO 能力。通过使用 App Router 和 React Server 组件，我们能够交付一个几乎完全静态的站点，从而实现即时加载。</p>
      
      <h3>双语实施</h3>
      <p>使用 next-intl，我们实施了一个强大的国际化系统，不仅处理文本，还处理本地 SEO 元数据和 URL 结构，确保谷歌正确索引两个版本。</p>
      
      <h3>项目成果</h3>
      <p>该网站上线时在 Lighthouse 上的性能得分为 98/100，并在前三个月内实现了自然搜索线索 40% 的增长。</p>
    `,
    author:   'Apex Zone Team',
    date:     '2026-04-10',
    readTime: 10,
    featured: false,
    coverColor: 'linear-gradient(135deg, #1A2A3A 0%, #2C4A6E 100%)',
    cover: '/images/mock/fintech.png',
  },
];
