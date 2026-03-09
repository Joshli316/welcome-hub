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
    <div className={`flex items-start gap-3 p-4 rounded-lg transition-colors ${checked ? 'bg-sage-50' : 'bg-white'}`}>
      <button
        onClick={onToggle}
        className={`flex-shrink-0 w-6 h-6 mt-0.5 rounded-md border-2 flex items-center justify-center transition-colors ${
          checked
            ? 'bg-sage-500 border-sage-500 text-white'
            : 'border-border hover:border-sage-300'
        }`}
        aria-label={`Toggle ${t(titleKey)}`}
      >
        {checked && (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        )}
      </button>
      <div className="flex-1 min-w-0">
        <p className={`font-medium ${checked ? 'line-through text-muted' : ''}`}>{t(titleKey)}</p>
        <p className="text-sm text-muted mt-0.5">{t(descriptionKey)}</p>
        {resourceLink && (
          <Link
            href={`/${locale}${resourceLink}`}
            className="inline-block text-xs text-primary-600 hover:text-primary-700 mt-1.5 font-medium"
          >
            {tChecklist('viewGuide')} →
          </Link>
        )}
      </div>
    </div>
  );
}
