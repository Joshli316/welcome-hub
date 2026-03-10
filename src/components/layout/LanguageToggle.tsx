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
      className="px-2.5 py-1 text-[12px] font-medium rounded-md border border-white/15 text-white/60 hover:text-white hover:bg-white/10 transition-all duration-150"
      aria-label={t('switchLang')}
    >
      {t('language')}
    </button>
  );
}
