import type { Metadata, Viewport } from 'next';
import './globals.css';

export const viewport: Viewport = {
  themeColor: '#d4763a',
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  title: {
    template: '%s | Welcome Hub 欢迎之家',
    default: 'Welcome Hub 欢迎之家',
  },
  description: 'Practical resources and community for Chinese international students in the US. 为来美国的中国留学生提供实用资源和温暖社区。',
  keywords: ['international students', 'Chinese students', 'study abroad', 'USA', '留学', '留学生', '美国', '欢迎'],
  openGraph: {
    title: 'Welcome Hub 欢迎之家',
    description: 'Practical resources and community for Chinese international students in the US.',
    siteName: 'Welcome Hub 欢迎之家',
    type: 'website',
    locale: 'zh_CN',
    alternateLocale: 'en_US',
    // OG image auto-detected from src/app/opengraph-image.tsx
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Welcome Hub 欢迎之家',
    description: 'Practical resources and community for Chinese international students in the US.',
    // Twitter image auto-detected from src/app/twitter-image.tsx
  },
  alternates: {
    canonical: 'https://welcome-hub.yellow-longitudinal.workers.dev',
    languages: {
      zh: 'https://welcome-hub.yellow-longitudinal.workers.dev/zh',
      en: 'https://welcome-hub.yellow-longitudinal.workers.dev/en',
    },
  },
  robots: {
    index: true,
    follow: true,
  },
  other: {
    'apple-mobile-web-app-title': 'Welcome Hub',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
