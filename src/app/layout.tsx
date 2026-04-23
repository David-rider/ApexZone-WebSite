import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    default: 'Apex Zone | Professional Web Design & Digital Marketing',
    template: '%s | Apex Zone',
  },
  description: 'Apex Zone builds high-converting websites, apps, and brand identities for businesses in the US. Bilingual (EN/ZH) web design, SEO, and digital marketing services.',
  keywords: ['web design', 'website development', 'SEO', 'digital marketing', 'bilingual website', 'Chinese web design', 'New York web design'],
  openGraph: {
    type: 'website',
    siteName: 'Apex Zone',
    locale: 'en_US',
  },
  twitter: { card: 'summary_large_image' },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
