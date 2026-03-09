'use client';

import { useMemo } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { useDashboardContacts } from '@/hooks/useDashboard';
import { getEvents } from '@/lib/data/events';
import { StudentStage } from '@/types/dashboard';
import StatsCard from '@/components/dashboard/StatsCard';
import StagePipeline from '@/components/dashboard/StagePipeline';
import Card from '@/components/ui/Card';
import { formatDate, isFutureDate } from '@/lib/utils/date';

// Dashboard overview — stats, pipeline, recent activity
export default function DashboardOverviewPage() {
  const t = useTranslations('dashboard');
  const locale = useLocale();
  const { contacts } = useDashboardContacts();

  // Compute stats inside useMemo to avoid impure Date.now() during render
  const { byStage, recentNotes, upcomingEvents } = useMemo(() => {
    const stages: StudentStage[] = ['pre-arrival', 'arrival', 'adjustment', 'community', 'reentry', 'returned'];
    const byStage = stages.reduce((acc, stage) => {
      acc[stage] = contacts.filter(c => c.stage === stage).length;
      return acc;
    }, {} as Record<StudentStage, number>);

    const now = new Date();
    const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString();
    const recentNotes = contacts.flatMap(c => c.notes).filter(n => n.createdAt > sevenDaysAgo);
    const upcomingEvents = getEvents().filter(e => isFutureDate(e.date));

    return { byStage, recentNotes, upcomingEvents };
  }, [contacts]);

  // Recent notes across all contacts for activity feed
  const allNotes = contacts
    .flatMap(c => c.notes.map(n => ({ ...n, contactName: c.name })))
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
    .slice(0, 10);

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold">{t('nav.overview')}</h1>

      {/* Stats grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          label={t('stats.totalContacts')}
          value={contacts.length}
          icon="👥"
        />
        <StatsCard
          label={t('stats.needsFollowUp')}
          value={contacts.filter(c => c.tags.includes('needs-follow-up')).length}
          icon="⚡"
        />
        <StatsCard
          label={t('stats.recentNotes')}
          value={recentNotes.length}
          icon="📝"
          subtitle={t('stats.last7Days')}
        />
        <StatsCard
          label={t('stats.upcomingEvents')}
          value={upcomingEvents.length}
          icon="📅"
        />
      </div>

      {/* Pipeline */}
      <Card>
        <h2 className="font-semibold mb-4">{t('pipeline.title')}</h2>
        <StagePipeline byStage={byStage} total={contacts.length} />
      </Card>

      {/* Recent activity */}
      <Card>
        <h2 className="font-semibold mb-4">{t('activity.title')}</h2>
        {allNotes.length === 0 ? (
          <p className="text-sm text-muted">{t('activity.empty')}</p>
        ) : (
          <div className="space-y-3">
            {allNotes.map(note => (
              <div key={note.id} className="flex gap-3 text-sm">
                <span className="text-muted w-20 flex-shrink-0">{formatDate(note.date, locale)}</span>
                <span className="font-medium w-28 flex-shrink-0 truncate">{note.contactName}</span>
                <span className="text-muted flex-1 truncate">{note.content}</span>
              </div>
            ))}
          </div>
        )}
      </Card>

      {/* Upcoming events from JSON data */}
      <Card>
        <h2 className="font-semibold mb-4">{t('stats.upcomingEvents')}</h2>
        {upcomingEvents.length === 0 ? (
          <p className="text-sm text-muted">{t('activity.noEvents')}</p>
        ) : (
          <div className="space-y-3">
            {upcomingEvents.slice(0, 5).map(event => (
              <div key={event.id} className="flex gap-3 text-sm border-b border-border pb-2 last:border-0">
                <span className="text-muted w-20 flex-shrink-0">{formatDate(event.date, locale)}</span>
                <span className="font-medium flex-1">
                  {locale === 'zh' ? event.titleZh : event.title}
                </span>
                <span className="text-muted">{event.time}</span>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}
