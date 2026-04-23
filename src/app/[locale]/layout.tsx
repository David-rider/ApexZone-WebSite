import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import '@/app/globals.css';

type Locale = 'en' | 'zh' | 'es' | 'ko' | 'ja' | 'ru' | 'it';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  const messages = await getMessages();
  const baseUrl = 'https://apexzone.us';
  const currentPath = ''; // In a real app, you'd get the pathname here if needed for deeper pages

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    'name': 'Apex Zone',
    'image': 'https://apexzone.us/images/logo/ApexZone_LOG_002.png',
    '@id': 'https://apexzone.us',
    'url': 'https://apexzone.us',
    'telephone': '+1-929-364-XXXX',
    'address': {
      '@type': 'PostalAddress',
      'streetAddress': 'New York City',
      'addressLocality': 'New York',
      'addressRegion': 'NY',
      'postalCode': '10001',
      'addressCountry': 'US'
    },
    'geo': {
      '@type': 'GeoCoordinates',
      'latitude': 40.7128,
      'longitude': -74.0060
    },
    'openingHoursSpecification': {
      '@type': 'OpeningHoursSpecification',
      'dayOfWeek': ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      'opens': '09:00',
      'closes': '18:00'
    },
    'sameAs': [
      'https://www.linkedin.com/company/apex-zone'
    ]
  };

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <link rel="canonical" href={`${baseUrl}/${locale}`} />
        {routing.locales.map((l) => (
          <link
            key={l}
            rel="alternate"
            hrefLang={l === 'zh' ? 'zh-Hans' : l}
            href={`${baseUrl}/${l}`}
          />
        ))}
        <link rel="alternate" hrefLang="x-default" href={`${baseUrl}/en`} />
        
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
