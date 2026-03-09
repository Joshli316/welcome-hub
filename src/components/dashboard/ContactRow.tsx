'use client';

import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { Contact, stageLabels } from '@/types/dashboard';
import Badge from '@/components/ui/Badge';
import { formatDate } from '@/lib/utils/date';

interface ContactRowProps {
  contact: Contact;
}

// Badge variant based on contact stage
const stageVariant: Record<string, 'default' | 'primary' | 'sage' | 'sky'> = {
  'pre-arrival': 'default',
  'arrival': 'sky',
  'adjustment': 'primary',
  'community': 'sage',
  'reentry': 'primary',
  'returned': 'default',
};

// A single row in the contacts list table
export default function ContactRow({ contact }: ContactRowProps) {
  const locale = useLocale();
  const t = useTranslations('dashboard');
  const lang = locale === 'zh' ? 'zh' : 'en';

  return (
    <Link
      href={`/${locale}/dashboard/contacts/${contact.id}`}
      className="flex items-center gap-4 px-4 py-3 hover:bg-warm-50 transition-colors border-b border-border"
    >
      {/* Name + type */}
      <div className="flex-1 min-w-0">
        <p className="font-medium text-sm truncate">{contact.name}</p>
        <p className="text-xs text-muted">{t(`types.${contact.type}`)}</p>
      </div>

      {/* City */}
      <div className="hidden md:block w-28 text-sm text-muted truncate">
        {contact.city}
      </div>

      {/* Stage */}
      <div className="w-24">
        <Badge variant={stageVariant[contact.stage] ?? 'default'}>
          {stageLabels[contact.stage]?.[lang] ?? contact.stage}
        </Badge>
      </div>

      {/* Tags */}
      <div className="hidden lg:flex gap-1 w-40 flex-wrap">
        {contact.tags.slice(0, 2).map(tag => (
          <Badge key={tag} variant="sage" className="text-[10px]">{t(`tags.${tag}`)}</Badge>
        ))}
        {contact.tags.length > 2 && (
          <span className="text-[10px] text-muted">+{contact.tags.length - 2}</span>
        )}
      </div>

      {/* Last contact */}
      <div className="hidden sm:block w-28 text-xs text-muted text-right">
        {contact.lastContactedAt ? formatDate(contact.lastContactedAt, locale) : '—'}
      </div>

      {/* Notes count */}
      <div className="w-12 text-xs text-muted text-right">
        {contact.notes.length > 0 ? `${contact.notes.length} 📝` : ''}
      </div>
    </Link>
  );
}
