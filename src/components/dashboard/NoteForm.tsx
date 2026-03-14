'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { InteractionNote, noteTypeLabels } from '@/types/dashboard';

interface NoteFormProps {
  onSubmit: (note: Omit<InteractionNote, 'id' | 'contactId' | 'createdAt'>) => void;
  onCancel: () => void;
  locale: string;
}

// Form to add an interaction note to a contact
export default function NoteForm({ onSubmit, onCancel, locale }: NoteFormProps) {
  const t = useTranslations('dashboard');
  const [content, setContent] = useState('');
  const [type, setType] = useState<InteractionNote['type']>('meeting');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const lang = locale === 'zh' ? 'zh' : 'en';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim() || isSubmitting) return;
    setIsSubmitting(true);
    onSubmit({ content: content.trim(), type, date });
    setContent('');
    setIsSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3 bg-warm-50 rounded-lg p-4">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label htmlFor="note-type" className="block text-xs font-medium mb-1">{t('notes.type')}</label>
          <select
            id="note-type"
            value={type}
            onChange={e => setType(e.target.value as InteractionNote['type'])}
            className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-300"
          >
            {Object.entries(noteTypeLabels).map(([key, label]) => (
              <option key={key} value={key}>{label[lang]}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="note-date" className="block text-xs font-medium mb-1">{t('notes.date')}</label>
          <input
            id="note-date"
            type="date"
            value={date}
            onChange={e => setDate(e.target.value)}
            className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-300"
          />
        </div>
      </div>

      <div>
        <label htmlFor="note-content" className="block text-xs font-medium mb-1">{t('notes.content')}</label>
        <textarea
          id="note-content"
          value={content}
          onChange={e => setContent(e.target.value)}
          rows={3}
          required
          placeholder={t('notes.placeholder')}
          className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-300 resize-none"
        />
      </div>

      <div className="flex gap-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-primary-600 text-white px-4 py-1.5 rounded-lg text-sm font-medium hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {t('notes.add')}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-1.5 rounded-lg text-sm text-muted hover:bg-warm-100 transition-colors"
        >
          {t('form.cancel')}
        </button>
      </div>
    </form>
  );
}
