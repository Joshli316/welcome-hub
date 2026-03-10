import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';

export default function Footer() {
  const locale = useLocale();
  const t = useTranslations('footer');
  const tNav = useTranslations('nav');

  return (
    <footer className="border-t border-border">
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="flex flex-col md:flex-row md:justify-between gap-10">
          {/* Brand */}
          <div className="max-w-sm">
            <Link href={`/${locale}`} className="text-primary-600 font-semibold text-[15px] mb-2 inline-block hover:opacity-75 transition-opacity">
              {locale === 'zh' ? '欢迎之家' : 'Welcome Hub'}
            </Link>
            <p className="text-sm text-muted leading-relaxed">{t('tagline')}</p>
          </div>

          {/* Nav */}
          <nav className="flex flex-wrap gap-x-8 gap-y-3 text-[13px]">
            <Link href={`/${locale}/resources`} className="text-muted hover:text-foreground transition-colors">{tNav('resources')}</Link>
            <Link href={`/${locale}/checklist`} className="text-muted hover:text-foreground transition-colors">{tNav('checklist')}</Link>
            <Link href={`/${locale}/connect`} className="text-muted hover:text-foreground transition-colors">{tNav('connect')}</Link>
            <Link href={`/${locale}/groups`} className="text-muted hover:text-foreground transition-colors">{tNav('groups')}</Link>
            <Link href={`/${locale}/community`} className="text-muted hover:text-foreground transition-colors">{tNav('community')}</Link>
            <Link href={`/${locale}/about`} className="text-muted hover:text-foreground transition-colors">{tNav('about')}</Link>
          </nav>
        </div>

        <div className="mt-12 pt-6 border-t border-border/50 flex items-center justify-between text-xs text-muted/60">
          <span>&copy; {new Date().getFullYear()} Welcome Hub</span>
          <Link href={`/${locale}/dashboard`} className="hover:text-foreground transition-colors">
            {locale === 'zh' ? '管理面板' : 'Dashboard'}
          </Link>
        </div>
      </div>
    </footer>
  );
}
