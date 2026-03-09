'use client';

import { useMemo } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { useDashboardContacts } from '@/hooks/useDashboard';
import { StudentStage } from '@/types/dashboard';
import Card from '@/components/ui/Card';
import StagePipeline from '@/components/dashboard/StagePipeline';

// Analytics page — engagement metrics and trends from contact data
export default function AnalyticsPage() {
  const t = useTranslations('dashboard');
  const locale = useLocale();
  const { contacts } = useDashboardContacts();

  const stats = useMemo(() => {
    const stages: StudentStage[] = ['pre-arrival', 'arrival', 'adjustment', 'community', 'reentry', 'returned'];
    const byStage = stages.reduce((acc, s) => {
      acc[s] = contacts.filter(c => c.stage === s).length;
      return acc;
    }, {} as Record<StudentStage, number>);

    const byType = {
      student: contacts.filter(c => c.type === 'student').length,
      returnee: contacts.filter(c => c.type === 'returnee').length,
      volunteer: contacts.filter(c => c.type === 'volunteer').length,
      other: contacts.filter(c => c.type === 'other').length,
    };

    // Notes per month (last 6 months)
    const allNotes = contacts.flatMap(c => c.notes);
    const monthCounts: { month: string; count: number }[] = [];
    for (let i = 5; i >= 0; i--) {
      const d = new Date();
      d.setMonth(d.getMonth() - i);
      const yearMonth = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
      const label = d.toLocaleDateString(locale === 'zh' ? 'zh-CN' : 'en-US', { month: 'short', year: 'numeric' });
      const count = allNotes.filter(n => n.date.startsWith(yearMonth)).length;
      monthCounts.push({ month: label, count });
    }

    // Top tags
    const tagCounts: Record<string, number> = {};
    contacts.forEach(c => c.tags.forEach(tag => {
      tagCounts[tag] = (tagCounts[tag] || 0) + 1;
    }));
    const topTags = Object.entries(tagCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 8);

    // Contacts without recent interaction (> 30 days)
    const now = new Date();
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000).toISOString();
    const needsAttention = contacts.filter(c =>
      !c.lastContactedAt || c.lastContactedAt < thirtyDaysAgo
    );

    return { byStage, byType, monthCounts, topTags, needsAttention };
  }, [contacts, locale]);

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold">{t('nav.analytics')}</h1>

      {/* Pipeline */}
      <Card>
        <h2 className="font-semibold mb-4">{t('pipeline.title')}</h2>
        <StagePipeline byStage={stats.byStage} total={contacts.length} />
      </Card>

      {/* Contact type breakdown + tags */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <h2 className="font-semibold mb-4">{t('analytics.byType')}</h2>
          <div className="space-y-3">
            {Object.entries(stats.byType).map(([type, count]) => (
              <div key={type} className="flex items-center justify-between">
                <span className="text-sm">{t(`types.${type}`)}</span>
                <div className="flex items-center gap-2">
                  <div className="w-32 h-2 bg-warm-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary-400 rounded-full"
                      style={{ width: contacts.length > 0 ? `${(count / contacts.length) * 100}%` : '0%' }}
                    />
                  </div>
                  <span className="text-sm font-medium w-8 text-right">{count}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <h2 className="font-semibold mb-4">{t('analytics.topTags')}</h2>
          {stats.topTags.length === 0 ? (
            <p className="text-sm text-muted">{t('analytics.noTags')}</p>
          ) : (
            <div className="space-y-3">
              {stats.topTags.map(([tag, count]) => (
                <div key={tag} className="flex items-center justify-between">
                  <span className="text-sm">{t(`tags.${tag}`)}</span>
                  <span className="text-sm font-medium">{count}</span>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>

      {/* Interaction trend */}
      <Card>
        <h2 className="font-semibold mb-4">{t('analytics.interactionTrend')}</h2>
        <div className="flex items-end gap-2 h-32">
          {stats.monthCounts.map(({ month, count }) => {
            const maxCount = Math.max(...stats.monthCounts.map(m => m.count), 1);
            const height = (count / maxCount) * 100;
            return (
              <div key={month} className="flex-1 flex flex-col items-center gap-1">
                <span className="text-xs font-medium">{count}</span>
                <div className="w-full bg-warm-100 rounded-t" style={{ height: '100%', position: 'relative' }}>
                  <div
                    className="absolute bottom-0 w-full bg-primary-300 rounded-t transition-all"
                    style={{ height: `${height}%` }}
                  />
                </div>
                <span className="text-[10px] text-muted">{month}</span>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Needs attention */}
      <Card>
        <h2 className="font-semibold mb-4">{t('analytics.needsAttention')}</h2>
        <p className="text-xs text-muted mb-3">{t('analytics.needsAttentionDesc')}</p>
        {stats.needsAttention.length === 0 ? (
          <p className="text-sm text-sage-600">{t('analytics.allGood')}</p>
        ) : (
          <div className="space-y-2">
            {stats.needsAttention.slice(0, 10).map(c => (
              <div key={c.id} className="flex items-center justify-between text-sm py-1 border-b border-border last:border-0">
                <span className="font-medium">{c.name}</span>
                <span className="text-xs text-muted">
                  {c.lastContactedAt ? t('analytics.lastContact', { date: new Intl.DateTimeFormat(locale === 'zh' ? 'zh-CN' : 'en-US').format(new Date(c.lastContactedAt)) }) : t('analytics.neverContacted')}
                </span>
              </div>
            ))}
            {stats.needsAttention.length > 10 && (
              <p className="text-xs text-muted">+{stats.needsAttention.length - 10} {t('analytics.more')}</p>
            )}
          </div>
        )}
      </Card>
    </div>
  );
}
