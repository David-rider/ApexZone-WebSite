import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import Image from 'next/image';
import {
  Globe, Smartphone, Palette, TrendingUp,
  ArrowRight, CheckCircle2, Star, Sparkles,
  ChevronRight, Mail
} from 'lucide-react';
import { portfolioItems } from '@/data/portfolio';
import styles from './page.module.css';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata.home' });
  
  return {
    title: t('title'),
    description: t('description'),
    keywords: t('keywords').split(',').map(k => k.trim()),
  };
}

import HomeContent from '@/components/home/HomeContent';

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  
  // Get featured items for preview (limited to 3)
  const previewItems = portfolioItems.filter(item => item.featured).slice(0, 3);

  const serviceKeys   = ['webDesign', 'appDev', 'brandDesign', 'seoMarketing'];
  const servicePaths  = ['web-design', 'app-dev', 'brand-design', 'seo-marketing'];
  const serviceColors = ['sage', 'sky', 'blossom', 'teal'];

  const stats = [
    { value: '50+', key: 'clients'      },
    { value: '5+',  key: 'years'        },
    { value: '98%', key: 'satisfaction' },
    { value: '12+', key: 'industries'   },
  ];

  const processKeys  = ['step1', 'step2', 'step3', 'step4'];
  const processIcons = ['🔍', '✏️', '⚡', '🚀'];

  return (
    <HomeContent 
      portfolioItems={previewItems}
      serviceKeys={serviceKeys}
      servicePaths={servicePaths}
      serviceColors={serviceColors}
      stats={stats}
      processKeys={processKeys}
      processIcons={processIcons}
    />
  );
}
