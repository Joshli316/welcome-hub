'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useTranslations, useLocale } from 'next-intl';
import { useDashboardContacts } from '@/hooks/useDashboard';
import { stageLabels, noteTypeLabels, contactTags } from '@/types/dashboard';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import NoteForm from '@/components/dashboard/NoteForm';
import ContactForm from '@/components/dashboard/ContactForm';
import { formatDate } from '@/lib/utils/date';

// Contact detail page — view/edit contact, manage notes and tags
export default function ContactDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations('dashboard');
  const lang = locale === 'zh' ? 'zh' : 'en';
  const { contacts, updateContact, deleteContact, addNote, deleteNote, updateStage, addTag, removeTag } = useDashboardContacts();

  const contact = contacts.find(c => c.id === id);
  const [showNoteForm, setShowNoteForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);

  if (!contact) {
    return (
      <div className="text-center py-16">
        <p className="text-muted">{t('contacts.notFound')}</p>
      </div>
    );
  }

  const handleDelete = () => {
    if (confirm(t('contacts.deleteConfirm'))) {
      deleteContact(contact.id);
      router.push(`/${locale}/dashboard/contacts`);
    }
  };

  return (
    <div className="max-w-3xl space-y-6">
      {/* Breadcrumb */}
      <button
        onClick={() => router.push(`/${locale}/dashboard/contacts`)}
        className="text-sm text-muted hover:text-foreground transition-colors"
      >
        ← {t('nav.contacts')}
      </button>

      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold mb-1">{contact.name}</h1>
          <div className="flex items-center gap-2 text-sm text-muted">
            <span>{t(`types.${contact.type}`)}</span>
            {contact.city && <><span>·</span><span>{contact.city}</span></>}
            {contact.university && <><span>·</span><span>{contact.university}</span></>}
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setShowEditForm(!showEditForm)}
            className="px-3 py-1.5 rounded-lg text-sm font-medium bg-warm-100 hover:bg-warm-200 transition-colors"
          >
            {showEditForm ? t('form.cancel') : t('contacts.edit')}
          </button>
          <button
            onClick={handleDelete}
            className="px-3 py-1.5 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
          >
            {t('contacts.delete')}
          </button>
        </div>
      </div>

      {/* Edit form */}
      {showEditForm && (
        <Card>
          <ContactForm
            locale={locale}
            initial={contact}
            onSubmit={updates => {
              updateContact(contact.id, updates);
              setShowEditForm(false);
            }}
            onCancel={() => setShowEditForm(false)}
          />
        </Card>
      )}

      {/* Stage + Contact info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <h3 className="text-sm font-medium text-muted mb-3">{t('form.stage')}</h3>
          <div className="flex flex-wrap gap-2">
            {Object.entries(stageLabels).map(([key, label]) => (
              <button
                key={key}
                onClick={() => updateStage(contact.id, key as typeof contact.stage)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  contact.stage === key
                    ? 'bg-primary-100 text-primary-700 ring-1 ring-primary-300'
                    : 'bg-warm-50 text-muted hover:bg-warm-100'
                }`}
              >
                {label[lang]}
              </button>
            ))}
          </div>
        </Card>

        <Card>
          <h3 className="text-sm font-medium text-muted mb-3">{t('contacts.contactInfo')}</h3>
          <div className="space-y-2 text-sm">
            {contact.email && <p>Email: {contact.email}</p>}
            {contact.wechat && <p>WeChat: {contact.wechat}</p>}
            {contact.phone && <p>Phone: {contact.phone}</p>}
            {!contact.email && !contact.wechat && !contact.phone && (
              <p className="text-muted">{t('contacts.noContactInfo')}</p>
            )}
          </div>
        </Card>
      </div>

      {/* Tags */}
      <Card>
        <h3 className="text-sm font-medium text-muted mb-3">{t('form.tags')}</h3>
        <div className="flex flex-wrap gap-2">
          {contactTags.map(tag => {
            const active = contact.tags.includes(tag);
            return (
              <button
                key={tag}
                onClick={() => active ? removeTag(contact.id, tag) : addTag(contact.id, tag)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                  active
                    ? 'bg-primary-100 text-primary-700 ring-1 ring-primary-300'
                    : 'bg-warm-100 text-warm-600 hover:bg-warm-200'
                }`}
              >
                {t(`tags.${tag}`)}
              </button>
            );
          })}
        </div>
      </Card>

      {/* Notes */}
      <Card>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-medium text-muted">{t('notes.title')}</h3>
          <button
            onClick={() => setShowNoteForm(!showNoteForm)}
            className="text-sm text-primary-600 font-medium hover:text-primary-700"
          >
            {showNoteForm ? t('form.cancel') : t('notes.add')}
          </button>
        </div>

        {showNoteForm && (
          <div className="mb-4">
            <NoteForm
              locale={locale}
              onSubmit={note => { addNote(contact.id, note); setShowNoteForm(false); }}
              onCancel={() => setShowNoteForm(false)}
            />
          </div>
        )}

        {contact.notes.length === 0 ? (
          <p className="text-sm text-muted">{t('notes.empty')}</p>
        ) : (
          <div className="space-y-4">
            {contact.notes.map(note => (
              <div key={note.id} className="border-b border-border pb-3 last:border-0">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <Badge variant="sky">{noteTypeLabels[note.type]?.[lang] ?? note.type}</Badge>
                    <span className="text-xs text-muted">{formatDate(note.date, locale)}</span>
                  </div>
                  <button
                    onClick={() => { if (confirm(t('notes.deleteConfirm'))) deleteNote(contact.id, note.id); }}
                    className="text-xs text-muted hover:text-red-500 transition-colors"
                  >
                    ×
                  </button>
                </div>
                <p className="text-sm">{note.content}</p>
              </div>
            ))}
          </div>
        )}
      </Card>

      {/* Metadata */}
      <p className="text-xs text-muted">
        {t('contacts.createdAt')}: {formatDate(contact.createdAt, locale)}
        {contact.lastContactedAt && ` · ${t('contacts.lastContact')}: ${formatDate(contact.lastContactedAt, locale)}`}
      </p>
    </div>
  );
}
