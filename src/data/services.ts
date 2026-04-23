export interface ServiceDetail {
  slug: string;
  category: string;
  icon: string;
  title: string;
  titleZh: string;
  titleEs?: string;
  titleKo?: string;
  titleJa?: string;
  titleRu?: string;
  titleIt?: string;
  desc: string;
  descZh: string;
  descEs?: string;
  descKo?: string;
  descJa?: string;
  descRu?: string;
  descIt?: string;
  features: { 
    title: string; titleZh: string; titleEs?: string; titleKo?: string; titleJa?: string; titleRu?: string; titleIt?: string;
    desc: string; descZh: string; descEs?: string; descKo?: string; descJa?: string; descRu?: string; descIt?: string;
  }[];
  process: { 
    step: string; stepZh: string; stepEs?: string; stepKo?: string; stepJa?: string; stepRu?: string; stepIt?: string;
    title: string; titleZh: string; titleEs?: string; titleKo?: string; titleJa?: string; titleRu?: string; titleIt?: string;
  }[];
  faqs: { 
    q: string; qZh: string; qEs?: string; qKo?: string; qJa?: string; qRu?: string; qIt?: string;
    a: string; aZh: string; aEs?: string; aKo?: string; aJa?: string; aRu?: string; aIt?: string;
  }[];
}

export const servicesData: ServiceDetail[] = [
  {
    slug: 'web-design',
    category: 'webDesign',
    icon: 'Layout',
    title: 'Web Design & Development',
    titleZh: '网站设计与开发',
    titleEs: 'Diseño y Desarrollo Web',
    titleKo: '웹 디자인 및 개발',
    titleJa: 'ウェブデザイン・開発',
    titleRu: 'Веб-дизайн и разработка',
    titleIt: 'Design e Sviluppo Web',
    desc: 'High-performance, bespoke websites that blend stunning aesthetics with conversion-focused strategy.',
    descZh: '高性能、定制化的网站方案。我们将前沿美学与转化策略完美结合。',
    descEs: 'Sitios web a medida de alto rendimiento que combinan una estética impresionante con una estrategia centrada en la conversión.',
    descKo: '멋진 디자인과 전환 중심 전략이 조화를 이루는 고성능 맞춤형 웹사이트입니다.',
    descJa: '優れた美しさとコンバージョン重視の戦略を融合させた、高性能なカスタムウェブサイト。',
    descRu: 'Высокопроизводительные сайты на заказ, сочетающие потрясающую эстетику со стратегией, ориентированной на конверсию.',
    descIt: 'Siti web su misura ad alte prestazioni che combinano un\'estetica straordinaria con una strategia focalizzata sulla conversione.',
    features: [
      {
        title: 'Bilingual Optimization',
        titleZh: '中英双语优化',
        titleEs: 'Optimización Bilingüe',
        titleKo: '이중 언어 최적화',
        titleJa: '多言語最適化',
        titleRu: 'Двуязычная оптимизация',
        titleIt: 'Ottimizzazione Bilingue',
        desc: 'Seamless multi-language architecture for global market reach.',
        descZh: '专为全球市场打造的无缝多语言架构。',
        descEs: 'Arquitectura multilingüe fluida para el alcance del mercado global.',
        descKo: '글로벌 시장 진출을 위한 원활한 다국어 아키텍처.',
        descJa: 'グローバル市場へのリーチを可能にするシームレスな多言語アーキテクチャ。',
        descRu: 'Бесшовная многоязычная архитектура для охвата мирового рынка.',
        descIt: 'Architettura multilingua senza interruzioni per la portata del mercato globale.'
      },
      {
        title: 'SEO & Performance',
        titleZh: 'SEO 与极致性能',
        titleEs: 'SEO y Rendimiento',
        titleKo: 'SEO 및 성능',
        titleJa: 'SEOとパフォーマンス',
        titleRu: 'SEO и производительность',
        titleIt: 'SEO e Prestazioni',
        desc: '90+ Lighthouse scores ensuring top rankings and instant load times.',
        descZh: 'Lighthouse 全项 90+ 评分，确保谷歌排名优势。',
        descEs: 'Puntuaciones de Lighthouse de 90+ que aseguran los mejores rankings.',
        descKo: '최고의 순위와 빠른 로딩을 보장하는 90점 이상의 Lighthouse 점수.',
        descJa: 'トップランクと即時ロードを保証する90点以上のLighthouseスコア。',
        descRu: 'Оценки Lighthouse 90+, обеспечивающие высокие рейтинги и мгновенную загрузку.',
        descIt: 'Punteggi Lighthouse 90+ che garantiscono posizionamenti al top.'
      }
    ],
    process: [
      { step: '01', stepZh: '01', title: 'Strategy', titleZh: '需求战略', titleEs: 'Estrategia', titleKo: '전략', titleJa: '戦略', titleRu: 'Стратегия', titleIt: 'Strategia' },
      { step: '02', stepZh: '02', title: 'Design', titleZh: '视觉设计', titleEs: 'Diseño', titleKo: '디자인', titleJa: 'デザイン', titleRu: 'Дизайн', titleIt: 'Design' },
      { step: '03', stepZh: '03', title: 'Agile Dev', titleZh: '敏捷开发', titleEs: 'Desarrollo', titleKo: '개발', titleJa: '開発', titleRu: 'Разработка', titleIt: 'Sviluppo' },
      { step: '04', stepZh: '04', title: 'Launch', titleZh: '质检上线', titleEs: 'Lanzamiento', titleKo: '런칭', titleJa: '公開', titleRu: 'Запуск', titleIt: 'Lancio' }
    ],
    faqs: [
      {
        q: 'How long does it take?',
        qZh: '需要多长时间？',
        qEs: '¿Cuánto tiempo toma?',
        qKo: '얼마나 걸리나요?',
        qJa: 'どのくらい時間がかかりますか？',
        qRu: 'Сколько времени это займет?',
        qIt: 'Quanto tempo ci vuole?',
        a: 'Usually 4-8 weeks depending on complexity.',
        aZh: '通常需要 4-8 周，具体取决于复杂度。',
        aEs: 'Generalmente de 4 a 8 semanas dependiendo de la complejidad.',
        aKo: '복잡성에 따라 보통 4-8주 정도 소요됩니다.',
        aJa: '複雑さによりますが、通常は4〜8週間です。',
        aRu: 'Обычно 4-8 недель в зависимости от сложности.',
        aIt: 'Di solito 4-8 settimane a seconda della complessità.'
      }
    ]
  },
  {
    slug: 'app-dev',
    category: 'appDev',
    icon: 'Smartphone',
    title: 'App & Mini-Program Development',
    titleZh: 'APP 与小程序开发',
    desc: 'Custom mobile solutions ranging from native iOS/Android apps to lightweight WeChat Mini-Programs.',
    descZh: '从原生的 iOS/Android 应用到轻量级的微信小程序，为您提供全方位的移动端解决方案。',
    features: [
      {
        title: 'Cross-Platform ROI',
        titleZh: '高回报跨平台方案',
        desc: 'Build once, deploy everywhere with Flutter or React Native.',
        descZh: '采用 Flutter 或 React Native 技术，实现一次编写，全端部署。'
      },
      {
        title: 'Mini-Program Ecosystem',
        titleZh: '小程序生态深度集成',
        desc: 'Specialized in WeChat ecosystem integration for the Asian market.',
        descZh: '深耕微信生态系统，助力品牌在亚洲市场快速获客。'
      }
    ],
    process: [
      { step: '01', stepZh: '01', title: 'Prototype', titleZh: '交互原型' },
      { step: '02', stepZh: '02', title: 'Development', titleZh: '核心开发' },
      { step: '03', stepZh: '03', title: 'Testing', titleZh: '全端测试' },
      { step: '04', stepZh: '04', title: 'Deployment', titleZh: '审核发布' }
    ],
    faqs: [
      {
        q: 'Can you help with Apple App Store submission?',
        qZh: '你们能协助上架苹果应用商店吗？',
        a: 'Absolutely, we handle the entire process from binary to approval.',
        aZh: '当然，我们负责从代码打包到审核通过的全过程。'
      }
    ]
  },
  {
    slug: 'brand-design',
    category: 'brandDesign',
    icon: 'Palette',
    title: 'Brand Visual Identity',
    titleZh: '品牌视觉识别系统',
    desc: 'Crafting unique brand voices through visual language. From logos to complete VI systems.',
    descZh: '通过视觉语言塑造独特的品牌声音。从 Logo 设计到完整的 VI 视觉系统。',
    features: [
      {
        title: 'VI Systems',
        titleZh: '完整的 VI 系统',
        desc: 'Cohesive guidelines for consistent brand presence.',
        descZh: '统一的设计规范，确保品牌形象在所有场景下的连贯性。'
      },
      {
        title: 'Storytelling UI',
        titleZh: '故事化 UI 设计',
        desc: 'Design that speaks to your target audience emotionally.',
        descZh: '通过设计与目标受众产生情感共鸣，讲述品牌故事。'
      }
    ],
    process: [
      { step: '01', stepZh: '01', title: 'Concept', titleZh: '创意构思' },
      { step: '02', stepZh: '02', title: 'Drafting', titleZh: '草图绘制' },
      { step: '03', stepZh: '03', title: 'Refinement', titleZh: '细节打磨' },
      { step: '04', stepZh: '04', title: 'Delivery', titleZh: '最终交付' }
    ],
    faqs: []
  },
  {
    slug: 'seo-marketing',
    category: 'seoMarketing',
    icon: 'TrendingUp',
    title: 'SEO & Local GEO Marketing',
    titleZh: 'SEO 与本地 GEO 营销',
    desc: 'New York targeted search optimization to put your business in front of the right local customers.',
    descZh: '针对纽约本地市场的精准搜索优化，让您的业务精准呈现在目标客户面前。',
    features: [
      {
        title: 'Local SEO Mastery',
        titleZh: '本地 SEO 专家级服务',
        desc: 'Rank on top of NYC local maps and organic results.',
        descZh: '助力品牌在纽约本地地图及自然搜索结果中名列前茅。'
      },
      {
        title: 'AI Search Optimization',
        titleZh: 'AI 搜索时代优化',
        desc: 'Optimized for AI search engines like Perplexity and ChatGPT Search.',
        descZh: '针对 Perplexity 和 ChatGPT Search 等 AI 搜索引擎进行深度优化。'
      }
    ],
    process: [
      { step: '01', stepZh: '01', title: 'Audit', titleZh: '现状审计' },
      { step: '02', stepZh: '02', title: 'Keywords', titleZh: '关键词策略' },
      { step: '03', stepZh: '03', title: 'On-Page', titleZh: '站内优化' },
      { step: '04', stepZh: '04', title: 'Content', titleZh: '内容营销' }
    ],
    faqs: [
      {
        q: 'When will I see SEO results?',
        qZh: '多久能看到 SEO 效果？',
        a: 'Local SEO usually shows movement in 1-3 months, major organic results in 3-6 months.',
        aZh: '本地 SEO 通常在 1-3 个月内见效，重大自然排名提升约需 3-6 个月。'
      }
    ]
  }
];
