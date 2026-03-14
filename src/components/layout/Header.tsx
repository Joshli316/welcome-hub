import Link from 'next/link';
import { getLocale, getTranslations } from 'next-intl/server';
import LanguageToggle from './LanguageToggle';
import MobileMenuToggle from './MobileMenuToggle';

// Server component — only LanguageToggle and MobileMenuToggle ship client JS.
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
    <header className="sticky top-0 z-50 bg-[#2a2520]/95 backdrop-blur-xl border-b border-white/10 shadow-[0_1px_8px_rgba(0,0,0,0.15)]">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href={`/${locale}`} className="flex items-center gap-2.5 hover:opacity-80 transition-opacity">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-primary-500 to-amber-500 flex items-center justify-center shadow-glow-primary">
            <span className="text-[#2a2520] text-sm font-extrabold">C</span>
          </div>
          <span className="text-white/90 font-bold text-lg tracking-tight">
            {locale === 'zh' ? '与你同行' : 'Companion'}
          </span>
        </Link>

        {/* Desktop nav */}
        <nav aria-label="Main navigation" className="hidden md:flex items-center gap-0.5">
          {navLinks.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-white/50 font-medium hover:text-white px-3 py-2 rounded-lg hover:bg-white/8 transition-all duration-200"
            >
              {link.label}
            </Link>
          ))}
          <div className="ml-3 pl-3 border-l border-white/10">
            <LanguageToggle />
          </div>
        </nav>

        {/* Mobile */}
        <div className="flex items-center gap-2 md:hidden">
          <LanguageToggle />
          <MobileMenuToggle links={navLinks} />
        </div>
      </div>
    </header>
  );
}
