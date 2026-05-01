import PortfolioClient from './PortfolioClient';
import { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const titles: Record<string, string> = {
    en: 'Our Portfolio | Apex Zone NYC Digital Agency',
    'zh-CN': '案例展示 | Apex Zone 纽约数字营销机构',
    'zh-TW': '案例展示 | Apex Zone 紐約數位行銷機構',
    es: 'Nuestro Portafolio | Agencia Digital Apex Zone NYC',
    ko: '포트폴리오 | Apex Zone 뉴욕 디지털 에이전시',
    ja: '制作実績 | Apex Zone ニューヨーク・デジタルエージェンシー',
    ru: 'Портфолио | Диджитал-агентство Apex Zone NYC',
    it: 'Nostro Portfolio | Agenzia Digitale Apex Zone NYC'
  };
  const descs: Record<string, string> = {
    en: 'Explore our selected projects in web design, app development, and branding for NYC businesses.',
    'zh-CN': '探索我们为纽约企业精心打造的网站设计、应用开发及品牌设计项目。',
    'zh-TW': '探索我們為紐約企業精心打造的網站設計、應用開發及品牌設計項目。',
    es: 'Explore nuestros proyectos seleccionados en diseño web, desarrollo de apps y branding para empresas de NYC.',
    ko: '뉴욕 기업을 위한 웹 디자인, 앱 개발 및 브랜딩 분야의 주요 프로젝트를 확인하세요.',
    ja: 'ニューヨーク企業向けのウェブデザイン、アプリ開発、ブランディングの主要プロジェクトをご紹介します。',
    ru: 'Ознакомьтесь с нашими избранными проектами в области веб-дизайна, разработки приложений и брендинга для бизнеса в Нью-Йорке.',
    it: 'Esplora i nostri progetti selezionati in web design, sviluppo app e branding per aziende di NYC.'
  };

  return {
    title: titles[locale] || titles.en,
    description: descs[locale] || descs.en,
  };
}

export default function PortfolioPage() {
  return <PortfolioClient />;
}
