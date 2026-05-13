import { getTranslations } from 'next-intl/server';
import PortfolioClient from './PortfolioClient';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata.portfolio' });
  
  return {
    title: t('title'),
    description: t('description'),
    keywords: t('keywords').split(',').map(k => k.trim()),
  };
}

export default function PortfolioPage() {
  return <PortfolioClient />;
}
