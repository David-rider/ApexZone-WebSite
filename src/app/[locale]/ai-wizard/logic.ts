export interface Recommendation {
  features: string[];
  reasonEn: string;
  reasonZh: string;
}

export const INDUSTRY_RECOMMENDATIONS: Record<string, Recommendation> = {
  restaurant: {
    features: ['booking', 'map', 'contactForm'],
    reasonEn: "Essential for managing reservations and local discovery.",
    reasonZh: "餐厅经营必备：在线订位与地图定位能极大地提升转化。",
  },
  retail: {
    features: ['ecommerce', 'aiChat', 'seo'],
    reasonEn: "Optimized for sales conversion and customer support.",
    reasonZh: "零售核心：通过电商模块与 AI 助手实现 24/7 销售。",
  },
  tech: {
    features: ['aiChat', 'seo'],
    reasonEn: "Global readiness and scalable automated support.",
    reasonZh: "出海与科技标配：通过 AI 客服与 SEO 策略实现规模化增长。",
  },
  healthcare: {
    features: ['booking', 'map', 'contactForm'],
    reasonEn: "Streamlined appointment booking and clinic location.",
    reasonZh: "健康服务核心：方便客户在线挂号与寻找诊所位置。",
  },
  realEstate: {
    features: ['map', 'video', 'booking'],
    reasonEn: "Showcase properties visually with interactive location data.",
    reasonZh: "地产展示：视频展示与地图看房是吸引客户的关键。",
  },
  finance: {
    features: ['memberLogin', 'seo', 'contactForm'],
    reasonEn: "Focus on secure client portals and organic credibility.",
    reasonZh: "金融/法律：会员区提供私密服务，SEO 建立专业信任感。",
  },
  education: {
    features: ['blog', 'video', 'memberLogin'],
    reasonEn: "Ideal for content-driven learning and student portals.",
    reasonZh: "教育培训：通过视频与博客分享知识，会员区管理学员。",
  }
};

export const PROJECT_TYPE_RECOMMENDATIONS: Record<string, string[]> = {
  ecommerce:   ['ecommerce', 'seo', 'aiChat'],
  booking:     ['booking', 'map'],
  landing:     ['contactForm', 'seo'],
  portfolio:   ['blog', 'video'], // Blog serves as gallery/case study
  miniProgram: ['aiChat', 'ecommerce'],
};

/**
 * Merges and returns unique recommended features based on user's current answers.
 */
export function getRecommendedFeatures(industry: string, projectType: string): string[] {
  const indRec = INDUSTRY_RECOMMENDATIONS[industry]?.features || [];
  const typeRec = PROJECT_TYPE_RECOMMENDATIONS[projectType] || [];
  return Array.from(new Set([...indRec, ...typeRec]));
}
