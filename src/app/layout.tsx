import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: {
    template: '%s | Welcome Hub 欢迎之家',
    default: 'Welcome Hub 欢迎之家',
  },
  description: 'Practical resources and community for Chinese international students in the US. 为来美国的中国留学生提供实用资源和温暖社区。',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
