import Link from 'next/link';
import { useTranslations } from 'next-intl';

// Custom 404 page — shown when a route doesn't exist under this locale
export default function NotFound() {
  const t = useTranslations('common');

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <p className="text-6xl font-light text-primary-500 mb-4">404</p>
        <h1 className="text-2xl mb-3">{t('notFound')}</h1>
        <p className="text-muted mb-8 leading-relaxed">
          {t('notFoundDescription')}
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="px-6 py-3 bg-foreground text-background rounded-lg text-sm font-semibold hover:bg-foreground/85 transition-colors"
          >
            {t('goHome')}
          </Link>
          <Link
            href="/resources"
            className="px-6 py-3 text-foreground rounded-lg text-sm font-semibold hover:bg-warm-100 transition-colors border border-border"
          >
            {t('browseResources')}
          </Link>
        </div>
      </div>
    </div>
  );
}
