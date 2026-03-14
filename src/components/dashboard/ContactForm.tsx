'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Contact, StudentStage, contactTags, stageLabels } from '@/types/dashboard';
import { isValidEmail } from '@/lib/utils/sanitize';

interface ContactFormProps {
  onSubmit: (contact: Omit<Contact, 'id' | 'createdAt' | 'notes'>) => void;
  onCancel: () => void;
  initial?: Contact;
  locale: string;
}

// Form to add or edit a contact in the CRM
export default function ContactForm({ onSubmit, onCancel, initial, locale }: ContactFormProps) {
  const t = useTranslations('dashboard');
  const [name, setName] = useState(initial?.name ?? '');
  const [type, setType] = useState<Contact['type']>(initial?.type ?? 'student');
  const [city, setCity] = useState(initial?.city ?? '');
  const [university, setUniversity] = useState(initial?.university ?? '');
  const [email, setEmail] = useState(initial?.email ?? '');
  const [wechat, setWechat] = useState(initial?.wechat ?? '');
  const [stage, setStage] = useState<StudentStage>(initial?.stage ?? 'pre-arrival');
  const [selectedTags, setSelectedTags] = useState<string[]>(initial?.tags ?? []);

  const [validationError, setValidationError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    setValidationError('');

    // Validate email format if provided
    if (email && !isValidEmail(email)) {
      setValidationError('Please enter a valid email address.');
      return;
    }

    // Length guards
    if (name.length > 100 || city.length > 100 || university.length > 100) {
      setValidationError('One or more fields exceed the maximum length.');
      return;
    }

    setIsSubmitting(true);
    onSubmit({
      name,
      type,
      city,
      university,
      email,
      wechat,
      stage,
      tags: selectedTags,
      lastContactedAt: initial?.lastContactedAt,
    });
    setIsSubmitting(false);
  };

  const toggleTag = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const lang = locale === 'zh' ? 'zh' : 'en';

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Name */}
      <div>
        <label htmlFor="contact-name" className="block text-sm font-medium mb-1">{t('form.name')}</label>
        <input
          id="contact-name"
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          required
          maxLength={100}
          className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-300"
        />
      </div>

      {/* Type + Stage row */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="contact-type" className="block text-sm font-medium mb-1">{t('form.type')}</label>
          <select
            id="contact-type"
            value={type}
            onChange={e => setType(e.target.value as Contact['type'])}
            className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-300"
          >
            <option value="student">{t('types.student')}</option>
            <option value="returnee">{t('types.returnee')}</option>
            <option value="volunteer">{t('types.volunteer')}</option>
            <option value="other">{t('types.other')}</option>
          </select>
        </div>
        <div>
          <label htmlFor="contact-stage" className="block text-sm font-medium mb-1">{t('form.stage')}</label>
          <select
            id="contact-stage"
            value={stage}
            onChange={e => setStage(e.target.value as StudentStage)}
            className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-300"
          >
            {Object.entries(stageLabels).map(([key, label]) => (
              <option key={key} value={key}>{label[lang]}</option>
            ))}
          </select>
        </div>
      </div>

      {/* City + University row */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="contact-city" className="block text-sm font-medium mb-1">{t('form.city')}</label>
          <input
            id="contact-city"
            type="text"
            value={city}
            onChange={e => setCity(e.target.value)}
            className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-300"
          />
        </div>
        <div>
          <label htmlFor="contact-university" className="block text-sm font-medium mb-1">{t('form.university')}</label>
          <input
            id="contact-university"
            type="text"
            value={university}
            onChange={e => setUniversity(e.target.value)}
            className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-300"
          />
        </div>
      </div>

      {/* Contact info row */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="contact-email" className="block text-sm font-medium mb-1">{t('form.email')}</label>
          <input
            id="contact-email"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-300"
          />
        </div>
        <div>
          <label htmlFor="contact-wechat" className="block text-sm font-medium mb-1">{t('form.wechat')}</label>
          <input
            id="contact-wechat"
            type="text"
            value={wechat}
            onChange={e => setWechat(e.target.value)}
            className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-300"
          />
        </div>
      </div>

      {/* Tags */}
      <div>
        <label className="block text-sm font-medium mb-2">{t('form.tags')}</label>
        <div className="flex flex-wrap gap-2">
          {contactTags.map(tag => (
            <button
              key={tag}
              type="button"
              onClick={() => toggleTag(tag)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                selectedTags.includes(tag)
                  ? 'bg-primary-100 text-primary-700 ring-1 ring-primary-300'
                  : 'bg-warm-100 text-warm-600 hover:bg-warm-200'
              }`}
            >
              {t(`tags.${tag}`)}
            </button>
          ))}
        </div>
      </div>

      {validationError && (
        <p role="alert" className="text-red-500 text-sm">{validationError}</p>
      )}

      {/* Buttons */}
      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-primary-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {initial ? t('form.update') : t('form.create')}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="px-6 py-2 rounded-lg font-medium text-muted hover:bg-warm-100 transition-colors"
        >
          {t('form.cancel')}
        </button>
      </div>
    </form>
  );
}
