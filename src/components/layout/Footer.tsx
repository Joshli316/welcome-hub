import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';

export default function Footer() {
  const locale = useLocale();
  const t = useTranslations('footer');
  const tNav = useTranslations('nav');

  return (
    <footer className="relative section-dark overflow-hidden">
      <div className="gold-line" />

      <div className="relative max-w-6xl mx-auto px-4 py-20">
        <div className="flex flex-col md:flex-row md:justify-between gap-12">
          {/* Brand */}
          <div className="max-w-sm">
            <Link href={`/${locale}`} className="inline-flex items-center gap-2.5 mb-4 hover:opacity-80 transition-opacity">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-primary-500 to-amber-500 flex items-center justify-center shadow-glow-primary">
                <span className="text-[#2a2520] text-sm font-extrabold">C</span>
              </div>
              <span className="text-white/90 font-bold text-lg tracking-tight">
                {locale === 'zh' ? '与你同行' : 'Companion'}
              </span>
            </Link>
            <p className="text-lg text-[#a8a29e] leading-relaxed">{t('tagline')}</p>
          </div>

          {/* Nav */}
          <nav aria-label="Footer navigation" className="flex flex-wrap gap-x-8 gap-y-4 text-base">
            <Link href={`/${locale}/resources`} className="text-white/40 font-medium hover:text-white transition-colors">{tNav('resources')}</Link>
            <Link href={`/${locale}/checklist`} className="text-white/40 font-medium hover:text-white transition-colors">{tNav('checklist')}</Link>
            <Link href={`/${locale}/connect`} className="text-white/40 font-medium hover:text-white transition-colors">{tNav('connect')}</Link>
            <Link href={`/${locale}/groups`} className="text-white/40 font-medium hover:text-white transition-colors">{tNav('groups')}</Link>
            <Link href={`/${locale}/community`} className="text-white/40 font-medium hover:text-white transition-colors">{tNav('community')}</Link>
            <Link href={`/${locale}/about`} className="text-white/40 font-medium hover:text-white transition-colors">{tNav('about')}</Link>
          </nav>
        </div>

        <div className="mt-16 pt-8 border-t border-white/8 flex items-center justify-between text-sm text-white/30">
          <span>&copy; {new Date().getFullYear()} Companion</span>
          <Link href={`/${locale}/dashboard`} className="hover:text-white/60 transition-colors">
            {locale === 'zh' ? '管理面板' : 'Dashboard'}
          </Link>
        </div>
      </div>
    </footer>
  );
}
