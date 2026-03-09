'use client';

import { useTranslations, useLocale } from 'next-intl';
import { getEvents } from '@/lib/data/events';
import { isFutureDate } from '@/lib/utils/date';
import { formatDate } from '@/lib/utils/date';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';

// Events overview for ministry workers — shows all events with status
export default function DashboardEventsPage() {
  const t = useTranslations('dashboard');
  const tEventTypes = useTranslations('eventTypes');
  const locale = useLocale();

  const allEvents = getEvents();
  const upcoming = allEvents.filter(e => isFutureDate(e.date));
  const past = allEvents.filter(e => !isFutureDate(e.date));

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold">{t('nav.events')}</h1>

      {/* Upcoming events */}
      <section>
        <h2 className="font-semibold mb-4">{t('events.upcoming')} ({upcoming.length})</h2>
        {upcoming.length === 0 ? (
          <Card><p className="text-sm text-muted">{t('activity.noEvents')}</p></Card>
        ) : (
          <div className="space-y-3">
            {upcoming.map(event => (
              <Card key={event.id}>
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-medium">{locale === 'zh' ? event.titleZh : event.title}</h3>
                      <Badge variant="sage">{tEventTypes(event.type)}</Badge>
                    </div>
                    <p className="text-sm text-muted mb-1">
                      {locale === 'zh' ? event.descriptionZh : event.description}
                    </p>
                    <div className="flex gap-4 text-xs text-muted">
                      <span>{formatDate(event.date, locale)}</span>
                      <span>{event.time}</span>
                      <span>{locale === 'zh' ? event.locationZh : event.location}</span>
                    </div>
                  </div>
                  {event.signupUrl && (
                    <a
                      href={event.signupUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-primary-600 hover:text-primary-700 flex-shrink-0"
                    >
                      {t('events.signupLink')} →
                    </a>
                  )}
                </div>
              </Card>
            ))}
          </div>
        )}
      </section>

      {/* Past events */}
      {past.length > 0 && (
        <section>
          <h2 className="font-semibold mb-4 text-muted">{t('events.past')} ({past.length})</h2>
          <div className="space-y-2 opacity-75">
            {past.map(event => (
              <Card key={event.id}>
                <div className="flex items-center gap-4">
                  <span className="text-sm text-muted w-28">{formatDate(event.date, locale)}</span>
                  <span className="text-sm flex-1">{locale === 'zh' ? event.titleZh : event.title}</span>
                  <Badge variant="default">{tEventTypes(event.type)}</Badge>
                </div>
              </Card>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
