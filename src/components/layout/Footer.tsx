import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';

export default function Footer() {
  const locale = useLocale();
  const t = useTranslations('footer');
  const tNav = useTranslations('nav');

  return (
    <footer className="border-t border-border bg-warm-50 mt-16">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 font-bold text-lg text-primary-700 mb-3">
              <span className="text-2xl">🏡</span>
              {locale === 'zh' ? '欢迎之家' : 'Welcome Hub'}
            </div>
            <p className="text-sm text-muted">{t('tagline')}</p>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="font-semibold mb-3 text-sm">{tNav('resources')}</h3>
            <div className="flex flex-col gap-2">
              <Link href={`/${locale}/resources`} className="text-sm text-muted hover:text-foreground transition-colors">
                {tNav('resources')}
              </Link>
              <Link href={`/${locale}/checklist`} className="text-sm text-muted hover:text-foreground transition-colors">
                {tNav('checklist')}
              </Link>
              <Link href={`/${locale}/connect`} className="text-sm text-muted hover:text-foreground transition-colors">
                {tNav('connect')}
              </Link>
              <Link href={`/${locale}/groups`} className="text-sm text-muted hover:text-foreground transition-colors">
                {tNav('groups')}
              </Link>
              <Link href={`/${locale}/reentry`} className="text-sm text-muted hover:text-foreground transition-colors">
                {tNav('reentry')}
              </Link>
              <Link href={`/${locale}/faith-and-work`} className="text-sm text-muted hover:text-foreground transition-colors">
                {tNav('faithAndWork')}
              </Link>
              <Link href={`/${locale}/community`} className="text-sm text-muted hover:text-foreground transition-colors">
                {tNav('community')}
              </Link>
            </div>
          </div>

          {/* About */}
          <div>
            <h3 className="font-semibold mb-3 text-sm">{tNav('about')}</h3>
            <div className="flex flex-col gap-2">
              <Link href={`/${locale}/about`} className="text-sm text-muted hover:text-foreground transition-colors">
                {tNav('about')}
              </Link>
              <p className="text-sm text-muted">welcome@example.com</p>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-border flex items-center justify-between text-xs text-muted">
          <span>&copy; {new Date().getFullYear()} Welcome Hub. Made with love.</span>
          <Link href={`/${locale}/dashboard`} className="hover:text-foreground transition-colors">
            {locale === 'zh' ? '管理面板' : 'Dashboard'}
          </Link>
        </div>
      </div>
    </footer>
  );
}
