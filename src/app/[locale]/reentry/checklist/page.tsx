'use client';

import { useTranslations } from 'next-intl';
import { getReentryChecklist, reentryPhases } from '@/lib/data/returnees';
import { useReentryChecklist } from '@/hooks/useReentryChecklist';
import ReentryChecklistItem from '@/components/reentry/ReentryChecklistItem';
import ProgressBar from '@/components/ui/ProgressBar';

export default function ReentryChecklistPage() {
  const t = useTranslations('reentry.checklist');
  const tPhases = useTranslations('reentry.checklist.phases');
  const items = getReentryChecklist();
  const { isChecked, toggle, completedCount, resetAll } = useReentryChecklist();

  const percentage = items.length > 0 ? Math.round((completedCount / items.length) * 100) : 0;

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">{t('title')}</h1>
        <p className="text-muted">{t('subtitle')}</p>
      </div>

      {/* Progress */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm font-medium text-muted">
            {t('progress', { completed: completedCount, total: items.length })}
          </p>
          <span className="text-sm font-bold text-warm-600">{percentage}%</span>
        </div>
        <ProgressBar value={percentage} />
      </div>

      {/* Phases */}
      {reentryPhases.map(phase => {
        const phaseItems = items.filter(item => item.phase === phase);
        if (phaseItems.length === 0) return null;
        const phaseCompleted = phaseItems.filter(item => isChecked(item.id)).length;

        return (
          <div key={phase} className="mb-8">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-bold">{tPhases(phase)}</h2>
              <span className="text-sm text-muted">{phaseCompleted}/{phaseItems.length}</span>
            </div>
            <div className="space-y-2">
              {phaseItems.map(item => (
                <ReentryChecklistItem
                  key={item.id}
                  titleKey={item.titleKey}
                  descriptionKey={item.descriptionKey}
                  checked={isChecked(item.id)}
                  onToggle={() => toggle(item.id)}
                  resourceLink={item.resourceLink}
                />
              ))}
            </div>
          </div>
        );
      })}

      {completedCount > 0 && (
        <div className="text-center mt-8">
          <button
            onClick={() => {
              if (window.confirm(t('resetConfirm'))) resetAll();
            }}
            className="text-sm text-muted hover:text-foreground transition-colors"
          >
            {t('resetAll')}
          </button>
        </div>
      )}
    </div>
  );
}
