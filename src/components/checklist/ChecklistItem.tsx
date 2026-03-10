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
    <div className={`flex items-start gap-3.5 px-4 py-3.5 rounded-lg transition-all duration-200 ${checked ? 'bg-sage-50/60' : 'hover:bg-warm-50/40'}`}>
      <button
        onClick={onToggle}
        className={`flex-shrink-0 w-5 h-5 mt-0.5 rounded border-[1.5px] flex items-center justify-center transition-all duration-200 ${
          checked
            ? 'bg-sage-500 border-sage-500 text-white'
            : 'border-muted/30 hover:border-sage-400'
        }`}
        aria-label={`Toggle ${t(titleKey)}`}
      >
        {checked && (
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        )}
      </button>
      <div className="flex-1 min-w-0">
        <p className={`text-[15px] font-medium ${checked ? 'line-through text-muted/60' : ''}`}>{t(titleKey)}</p>
        <p className="text-[13px] text-muted mt-0.5 leading-relaxed">{t(descriptionKey)}</p>
        {resourceLink && (
          <Link
            href={`/${locale}${resourceLink}`}
            className="inline-block text-xs text-primary-600 hover:text-primary-700 mt-2 font-medium"
          >
            {tChecklist('viewGuide')} &rarr;
          </Link>
        )}
      </div>
    </div>
  );
}
