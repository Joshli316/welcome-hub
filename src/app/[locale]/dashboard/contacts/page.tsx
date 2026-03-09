'use client';

import { useState, useMemo } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { useDashboardContacts } from '@/hooks/useDashboard';
import { stageLabels } from '@/types/dashboard';
import ContactRow from '@/components/dashboard/ContactRow';
import ContactForm from '@/components/dashboard/ContactForm';
import Card from '@/components/ui/Card';

// Contact management page — list, filter, add contacts
export default function ContactsPage() {
  const t = useTranslations('dashboard');
  const locale = useLocale();
  const lang = locale === 'zh' ? 'zh' : 'en';
  const { contacts, addContact } = useDashboardContacts();
  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState('');
  const [stageFilter, setStageFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');

  // Filter contacts
  const filtered = useMemo(() => {
    return contacts.filter(c => {
      if (stageFilter !== 'all' && c.stage !== stageFilter) return false;
      if (typeFilter !== 'all' && c.type !== typeFilter) return false;
      if (search) {
        const q = search.toLowerCase();
        return c.name.toLowerCase().includes(q)
          || c.city.toLowerCase().includes(q)
          || (c.university?.toLowerCase().includes(q) ?? false);
      }
      return true;
    });
  }, [contacts, search, stageFilter, typeFilter]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">{t('nav.contacts')}</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-primary-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary-700 transition-colors"
        >
          {showForm ? t('form.cancel') : t('contacts.add')}
        </button>
      </div>

      {/* Add contact form */}
      {showForm && (
        <Card>
          <h2 className="font-semibold mb-4">{t('contacts.add')}</h2>
          <ContactForm
            locale={locale}
            onSubmit={contact => { addContact(contact); setShowForm(false); }}
            onCancel={() => setShowForm(false)}
          />
        </Card>
      )}

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder={t('contacts.searchPlaceholder')}
          className="px-3 py-2 border border-border rounded-lg text-sm w-64 focus:outline-none focus:ring-2 focus:ring-primary-300"
        />
        <select
          value={stageFilter}
          onChange={e => setStageFilter(e.target.value)}
          className="px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-300"
        >
          <option value="all">{t('contacts.allStages')}</option>
          {Object.entries(stageLabels).map(([key, label]) => (
            <option key={key} value={key}>{label[lang]}</option>
          ))}
        </select>
        <select
          value={typeFilter}
          onChange={e => setTypeFilter(e.target.value)}
          className="px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-300"
        >
          <option value="all">{t('contacts.allTypes')}</option>
          <option value="student">{t('types.student')}</option>
          <option value="returnee">{t('types.returnee')}</option>
          <option value="volunteer">{t('types.volunteer')}</option>
          <option value="other">{t('types.other')}</option>
        </select>
      </div>

      {/* Contacts list */}
      <Card className="p-0 overflow-hidden">
        {/* Header row */}
        <div className="flex items-center gap-4 px-4 py-2 bg-warm-50 border-b border-border text-xs text-muted font-medium">
          <span className="flex-1">{t('form.name')}</span>
          <span className="hidden md:block w-28">{t('form.city')}</span>
          <span className="w-24">{t('form.stage')}</span>
          <span className="hidden lg:block w-40">{t('form.tags')}</span>
          <span className="hidden sm:block w-28 text-right">{t('contacts.lastContact')}</span>
          <span className="w-12 text-right">{t('contacts.notes')}</span>
        </div>

        {filtered.length === 0 ? (
          <p className="text-sm text-muted py-8 text-center">{t('contacts.empty')}</p>
        ) : (
          filtered.map(contact => (
            <ContactRow key={contact.id} contact={contact} />
          ))
        )}
      </Card>

      <p className="text-xs text-muted">
        {t('contacts.showing', { count: filtered.length, total: contacts.length })}
      </p>
    </div>
  );
}
