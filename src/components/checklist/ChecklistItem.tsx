'use client';

import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';

interface ChecklistItemProps {
  titleKey: string;
  descriptionKey: string;
  checked: boolean;
  onToggle: () => void;
  resourceLink?: string;
}

export default function ChecklistItem({ titleKey, descriptionKey, checked, onToggle, resourceLink }: ChecklistItemProps) {
  const locale = useLocale();
  const t = useTranslations('checklistItems');
  const tChecklist = useTranslations('checklist');

  return (
    <div className={`flex items-start gap-4 px-5 py-4 rounded-xl transition-all duration-200 ${checked ? 'bg-sage-50/60' : 'hover:bg-warm-50/40'}`}>
      <button
        onClick={onToggle}
        className={`flex-shrink-0 w-6 h-6 mt-0.5 rounded-md border-2 flex items-center justify-center transition-all duration-200 ${
          checked
            ? 'bg-sage-500 border-sage-500 text-white shadow-glow-sage'
            : 'border-muted/30 hover:border-sage-400'
        }`}
        aria-label={`Toggle ${t(titleKey)}`}
      >
        {checked && (
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        )}
      </button>
      <div className="flex-1 min-w-0">
        <p className={`text-base font-semibold ${checked ? 'line-through text-muted/60' : ''}`}>{t(titleKey)}</p>
        <p className="text-[15px] text-muted mt-1 leading-relaxed">{t(descriptionKey)}</p>
        {resourceLink && (
          <Link
            href={`/${locale}${resourceLink}`}
            className="inline-block text-sm text-primary-600 hover:text-primary-700 mt-2.5 font-bold"
          >
            {tChecklist('viewGuide')} &rarr;
          </Link>
        )}
      </div>
    </div>
  );
}
