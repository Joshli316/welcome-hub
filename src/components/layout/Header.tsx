'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import LanguageToggle from './LanguageToggle';
import MobileNav from './MobileNav';

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const locale = useLocale();
  const t = useTranslations('nav');

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
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b border-border">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo / site name */}
        <Link href={`/${locale}`} className="flex items-center gap-2 font-bold text-lg text-primary-700">
          <span className="text-2xl">🏡</span>
          <span className="hidden sm:inline">{locale === 'zh' ? '欢迎之家' : 'Welcome Hub'}</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted hover:text-foreground transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <LanguageToggle />
        </nav>

        {/* Mobile menu button */}
        <div className="flex items-center gap-3 md:hidden">
          <LanguageToggle />
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-2 rounded-lg hover:bg-warm-100 transition-colors"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile nav overlay */}
      {mobileOpen && <MobileNav links={navLinks} onClose={() => setMobileOpen(false)} />}
    </header>
  );
}
