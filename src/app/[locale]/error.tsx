'use client';

import { useTranslations } from 'next-intl';

// Global error boundary — catches runtime errors and shows a friendly message
export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslations('common');

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <p className="text-5xl mb-4" aria-hidden="true">⚠️</p>
        <h1 className="text-2xl mb-3">{t('error')}</h1>
        <p className="text-muted mb-8 leading-relaxed">
          {t('errorDescription')}
        </p>
        <button
          onClick={reset}
          className="px-6 py-3 bg-foreground text-background rounded-lg text-sm font-semibold hover:bg-foreground/85 transition-colors"
        >
          {t('tryAgain')}
        </button>
      </div>
    </div>
  );
}
