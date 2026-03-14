import type { Metadata, Viewport } from 'next';
import { SITE_URL } from '@/lib/config/site';
import './globals.css';

export const viewport: Viewport = {
  themeColor: '#d4763a',
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  title: {
    template: '%s | Companion 与你同行',
    default: 'Companion 与你同行',
  },
  description: 'Practical resources and community for Chinese international students in the US. 为来美国的中国留学生提供实用资源和温暖社区。',
  keywords: ['international students', 'Chinese students', 'study abroad', 'USA', '留学', '留学生', '美国', '欢迎'],
  openGraph: {
    title: 'Companion 与你同行',
    description: 'Practical resources and community for Chinese international students in the US.',
    siteName: 'Companion 与你同行',
    type: 'website',
    locale: 'zh_CN',
    alternateLocale: 'en_US',
    // OG image auto-detected from src/app/opengraph-image.tsx
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Companion 与你同行',
    description: 'Practical resources and community for Chinese international students in the US.',
    // Twitter image auto-detected from src/app/twitter-image.tsx
  },
  alternates: {
    canonical: SITE_URL,
    languages: {
      zh: `${SITE_URL}/zh`,
      en: `${SITE_URL}/en`,
    },
  },
  robots: {
    index: true,
    follow: true,
  },
  manifest: '/manifest.json',
  other: {
    'apple-mobile-web-app-title': 'Companion',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
