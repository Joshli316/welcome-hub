'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { cn } from '@/lib/utils/cn';

// Sidebar nav for the ministry worker dashboard
export default function DashboardSidebar() {
  const locale = useLocale();
  const pathname = usePathname();
  const t = useTranslations('dashboard');

  const links = [
    { href: `/${locale}/dashboard`, label: t('nav.overview'), icon: '📊' },
    { href: `/${locale}/dashboard/contacts`, label: t('nav.contacts'), icon: '👥' },
    { href: `/${locale}/dashboard/events`, label: t('nav.events'), icon: '📅' },
    { href: `/${locale}/dashboard/analytics`, label: t('nav.analytics'), icon: '📈' },
  ];

  return (
    <aside className="w-56 bg-white border-r border-border min-h-screen p-4 flex flex-col">
      {/* Dashboard brand */}
      <Link href={`/${locale}/dashboard`} className="flex items-center gap-2 font-bold text-primary-700 mb-8">
        <span className="text-xl">🏡</span>
        <span className="text-sm">{t('title')}</span>
      </Link>

      {/* Nav links */}
      <nav className="flex flex-col gap-1 flex-1">
        {links.map(link => {
          // Match exact for overview, prefix for sub-pages
          const isActive = link.href === `/${locale}/dashboard`
            ? pathname === link.href
            : pathname.startsWith(link.href);

          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                isActive
                  ? 'bg-primary-50 text-primary-700'
                  : 'text-muted hover:bg-warm-50 hover:text-foreground'
              )}
            >
              <span>{link.icon}</span>
              <span>{link.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Back to main site */}
      <Link
        href={`/${locale}`}
        className="flex items-center gap-2 px-3 py-2 text-xs text-muted hover:text-foreground transition-colors mt-4"
      >
        ← {t('backToSite')}
      </Link>
    </aside>
  );
}
