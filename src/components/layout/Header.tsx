import Link from 'next/link';
import { getLocale, getTranslations } from 'next-intl/server';
import LanguageToggle from './LanguageToggle';
import MobileMenuToggle from './MobileMenuToggle';

// Server component — only LanguageToggle and MobileMenuToggle ship client JS.
// Logo and desktop nav are pure HTML with zero JS overhead.
export default async function Header() {
  const locale = await getLocale();
  const t = await getTranslations('nav');

  const navLinks = [
    { href: `/${locale}`, label: t('home') },
    { href: `/${locale}/resources`, label: t('resources') },
    { href: `/${locale}/checklist`, label: t('checklist') },
    { href: `/${locale}/connect`, label: t('connect') },
    { href: `/${locale}/groups`, label: t('groups') },
    { href: `/${locale}/reentry`, label: t('reentry') },
    { href: `/${locale}/faith-and-work`, label: t('faithAndWork') },
    { href: `/${locale}/community`, label: t('community') },
    { href: `/${locale}/about`, label: t('about') },
  ];

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
        {/* Logo */}
        <Link href={`/${locale}`} className="flex items-center gap-2 hover:opacity-75 transition-opacity">
          <span className="text-primary-600 font-semibold text-[15px]">
            {locale === 'zh' ? '欢迎之家' : 'Welcome Hub'}
          </span>
        </Link>

        {/* Desktop nav — server-rendered, zero JS */}
        <nav className="hidden md:flex items-center gap-0.5">
          {navLinks.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[13px] text-muted hover:text-foreground px-2.5 py-1.5 rounded-md transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <div className="ml-3 pl-3 border-l border-border">
            <LanguageToggle />
          </div>
        </nav>

        {/* Mobile — client islands for toggle and language */}
        <div className="flex items-center gap-2 md:hidden">
          <LanguageToggle />
          <MobileMenuToggle links={navLinks} />
        </div>
      </div>
    </header>
  );
}
