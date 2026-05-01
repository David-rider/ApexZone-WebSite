'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';

const SLIDES = [
  { id: 'spring-shore', image: '/images/portfolio/cim_spring_shore.jpg' },
  { id: 'jinjiang-glory', image: '/images/portfolio/cim_jinjiang_glory.jpg' },
  { id: 'meijiang-heyue', image: '/images/portfolio/cim_meijiang_heyue.jpg' },
  { id: 'jinmao-smart-city', image: '/images/portfolio/cim_jinmao_smart.png' }
];

export default function PortfolioHero() {
  const t = useTranslations();
  const locale = useLocale();
  const containerRef = useRef<HTMLDivElement>(null);
  
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-play carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    }, 4000); // 4 seconds per slide
    return () => clearInterval(timer);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Smooth Scrolling Transformations
  const width = useTransform(scrollYProgress, [0, 0.5], ["320px", "100%"]);
  const height = useTransform(scrollYProgress, [0, 0.5], ["220px", "100%"]);
  const top = useTransform(scrollYProgress, [0, 0.5], ["40px", "0px"]);
  const right = useTransform(scrollYProgress, [0, 0.5], ["40px", "0px"]);
  const borderRadius = useTransform(scrollYProgress, [0, 0.4], ["24px", "0px"]);
  const scale = useTransform(scrollYProgress, [0, 0.8], [1, 1.1]);

  // Text animations for the background text
  const textY = useTransform(scrollYProgress, [0, 0.3], [0, -50]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  // Reliable labels
  const heroLabelMap: Record<string, any> = {
    en: { label: 'Our Work', title: 'Portfolio', subtitle: 'Built to convert', featured: 'Featured Showcase' },
    'zh-CN': { label: '我们的作品', title: '作品集', subtitle: '每个项目都以转化为核心', featured: '案例展播' },
    'zh-TW': { label: '我們的作品', title: '作品集', subtitle: '每個項目都以轉化為核心', featured: '案例展播' },
    es: { label: 'Nuestro Trabajo', title: 'Portafolio', subtitle: 'Diseñado para convertir', featured: 'Casos Destacados' },
    ko: { label: '포트폴리오', title: '프로젝트', subtitle: '전환을 위한 디자인', featured: '주요 사례' },
    ja: { label: '実績紹介', title: 'ポートフォリオ', subtitle: '成果を生むデザイン', featured: '注目の事例' },
    ru: { label: 'Наши работы', title: 'Портфолио', subtitle: 'Создано для конверсии', featured: 'Избранные кейсы' },
    it: { label: 'I Nostri Lavori', title: 'Portfolio', subtitle: 'Costruito per convertire', featured: 'Vetrina Progetti' }
  };
  const heroLabels = heroLabelMap[locale] || heroLabelMap.en;

  // Final fallback map for hero content
  const SLIDE_CONTENT: Record<string, any> = {
    'spring-shore': {
      title: {
        en: 'The Spring Shore CIM System', zh: '悦海长滩 CIM 实景仿真系统', 
        es: 'Sistema CIM Spring Shore', ko: '스프링 쇼어 CIM 시스템',
        ja: 'スプリングショア CIMシステム', ru: 'Система CIM Spring Shore',
        it: 'Sistema CIM Spring Shore'
      }[locale] || 'The Spring Shore CIM System',
      subtitle: {
        en: 'CCCC Group · Hainan', zh: '中国交建 · 海南', 
        es: 'Grupo CCCC · Hainan', ko: 'CCCC 그룹 · 하이난',
        ja: 'CCCCグループ · 海南', ru: 'CCCC Group · Хайнань',
        it: 'Gruppo CCCC · Hainan'
      }[locale] || 'CCCC Group · Hainan'
    },
    'jinjiang-glory': {
      title: {
        en: 'Jinjiang Glory CIM Marketing', zh: '锦江大院 CIM 数字化营销系统',
        es: 'Marketing CIM Jinjiang Glory', ko: '진장 글로리 CIM 마케팅',
        ja: '錦江大院 CIMマーケティング', ru: 'CIM Маркетинг Jinjiang Glory',
        it: 'CIM Marketing Jinjiang Glory'
      }[locale] || 'Jinjiang Glory CIM Marketing',
      subtitle: {
        en: 'Zhongmao Real Estate · Chengdu', zh: '中茂地产 · 成都',
        es: 'Inmobiliaria Zhongmao · Chengdu', ko: '중마오 부동산 · 청두',
        ja: '中茂地産 · 成都', ru: 'Zhongmao Real Estate · Чэнду',
        it: 'Zhongmao Real Estate · Chengdu'
      }[locale] || 'Zhongmao Real Estate · Chengdu'
    },
    'meijiang-heyue': {
      title: {
        en: 'Meijiang Heyue CIM System', zh: '梅江和悦高端住宅 CIM 系统',
        es: 'Sistema CIM Meijiang Heyue', ko: '메이장 허위에 CIM 시스템',
        ja: '梅江和悦 CIMシステム', ru: 'Система CIM Meijiang Heyue',
        it: 'Sistema CIM Meijiang Heyue'
      }[locale] || 'Meijiang Heyue CIM System',
      subtitle: {
        en: 'Lianhui Real Estate · Tianjin', zh: '联汇地产 · 天津',
        es: 'Inmobiliaria Lianhui · Tianjin', ko: '리안후이 부동산 · 텐진',
        ja: '聯匯地産 · 天津', ru: 'Lianhui Real Estate · Тяньцзинь',
        it: 'Lianhui Real Estate · Tianjin'
      }[locale] || 'Lianhui Real Estate · Tianjin'
    },
    'jinmao-smart-city': {
      title: {
        en: 'Jinmao Smart City CIM Planning', zh: '金茂智慧科学城 CIM 规划系统',
        es: 'Planificación CIM Jinmao Smart City', ko: '진마오 스마트 시티 CIM 기획',
        ja: '金茂智慧科学城 CIM計画', ru: 'Планирование CIM Jinmao Smart City',
        it: 'CIM Planning Jinmao Smart City'
      }[locale] || 'Jinmao Smart City CIM Planning',
      subtitle: {
        en: 'China Jinmao · Smart City', zh: '中国金茂 · 智慧城市',
        es: 'China Jinmao · Smart City', ko: '차이나 진마오 · 스마트 시티',
        ja: '中国金茂 · スマートシティ', ru: 'China Jinmao · Смарт Сити',
        it: 'China Jinmao · Smart City'
      }[locale] || 'China Jinmao · Smart City'
    }
  };

  const currentContent = SLIDE_CONTENT[SLIDES[currentSlide].id];

  return (
    <div ref={containerRef} style={{ height: '150vh', position: 'relative' }}>
      <div style={{ 
        position: 'sticky', 
        top: 0, 
        height: '100vh', 
        width: '100%', 
        overflow: 'hidden', 
        background: 'var(--md-sys-color-surface)'
      }}>
        
        {/* Static Background Text */}
        <motion.div 
          className="container"
          style={{ 
            paddingTop: '120px',
            position: 'relative',
            zIndex: 1,
            y: textY,
            opacity: textOpacity
          }}
        >
          <div className="section-title__label" style={{ color: 'var(--md-sys-color-primary)' }}>
            {heroLabels.label}
          </div>
          <h1 className="md-display-medium" style={{ maxWidth: '600px', margin: '16px 0' }}>
            {heroLabels.title}
          </h1>
          <p className="md-body-large text-muted" style={{ maxWidth: '500px' }}>
            {heroLabels.subtitle}
          </p>
        </motion.div>

        {/* The Expanding Carousel Window */}
        <motion.div
          style={{
            position: 'absolute',
            top,
            right,
            width,
            height,
            borderRadius,
            overflow: 'hidden',
            boxShadow: 'var(--md-sys-elevation-level3)',
            zIndex: 10,
          }}
        >
          <div style={{ position: 'relative', width: '100%', height: '100%' }}>
            {/* Carousel Images with Cross-fade */}
            <AnimatePresence mode="wait">
              <motion.div
                key={SLIDES[currentSlide].id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
                style={{ position: 'absolute', inset: 0 }}
              >
                <motion.div style={{ width: '100%', height: '100%', scale }}>
                  <Image
                    src={SLIDES[currentSlide].image}
                    alt="Portfolio Preview"
                    fill
                    priority
                    style={{ objectFit: 'cover' }}
                  />
                  
                  {/* Dark overlay */}
                  <motion.div 
                    style={{ 
                      position: 'absolute', 
                      inset: 0, 
                      background: 'rgba(0,0,0,0.3)',
                      opacity: useTransform(scrollYProgress, [0, 0.5], [0, 0.5])
                    }} 
                  />

                  {/* Caption */}
                  <motion.div
                    style={{
                      position: 'absolute',
                      bottom: '60px',
                      left: '60px',
                      color: 'white',
                      opacity: useTransform(scrollYProgress, [0.3, 0.5], [0, 1]),
                      y: useTransform(scrollYProgress, [0.3, 0.5], [20, 0])
                    }}
                  >
                    <div className="badge badge-sage" style={{ marginBottom: '16px', background: 'var(--md-sys-color-primary)', border: 'none' }}>
                      {heroLabels.featured}
                    </div>
                    <h2 className="md-display-medium" style={{ marginBottom: '8px', fontWeight: 800 }}>
                      {currentContent.title}
                    </h2>
                    <p className="md-body-large" style={{ opacity: 0.9, fontSize: '1.2rem' }}>
                      {currentContent.subtitle}
                    </p>
                  </motion.div>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
