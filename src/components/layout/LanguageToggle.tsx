'use client';

import { useLocale, useTranslations } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';

export default function LanguageToggle() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations('common');

  function switchLocale() {
    const newLocale = locale === 'zh' ? 'en' : 'zh';
    // Replace the locale segment in the pathname
    const newPath = pathname.replace(`/${locale}`, `/${newLocale}`);
    router.push(newPath);
  }

  return (
    <button
      onClick={switchLocale}
      className="px-2.5 py-1 text-[12px] font-medium rounded-md border border-border hover:bg-warm-100 transition-all duration-150"
      aria-label={t('switchLang')}
    >
      {t('language')}
    </button>
  );
}
