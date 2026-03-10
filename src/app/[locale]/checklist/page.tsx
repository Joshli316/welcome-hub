'use client';

import { useTranslations } from 'next-intl';
import { getChecklistItems, checklistPhases } from '@/lib/data/checklist';
import { useChecklist } from '@/hooks/useChecklist';
import ChecklistGroup from '@/components/checklist/ChecklistGroup';
import ChecklistProgress from '@/components/checklist/ChecklistProgress';
import PageHeader from '@/components/ui/PageHeader';

export default function ChecklistPage() {
  const t = useTranslations('checklist');
  const items = getChecklistItems();
  const { isChecked, toggle, completedCount, resetAll } = useChecklist();

  return (
    <div>
      {/* Page banner */}
      <div className="bg-gradient-to-b from-warm-100/60 to-background pt-10 pb-2">
        <div className="max-w-3xl mx-auto px-4">
          <PageHeader title={t('title')} subtitle={t('subtitle')} />
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 pb-12">
        <ChecklistProgress completed={completedCount} total={items.length} />

        {checklistPhases.map(phase => {
          const phaseItems = items.filter(item => item.phase === phase);
          if (phaseItems.length === 0) return null;
          return (
            <ChecklistGroup
              key={phase}
              phase={phase}
              items={phaseItems}
              isChecked={isChecked}
              onToggle={toggle}
            />
          );
        })}

        {completedCount > 0 && (
          <div className="text-center mt-8">
            <button
              onClick={() => {
                if (window.confirm(t('resetConfirm'))) {
                  resetAll();
                }
              }}
              className="text-sm text-muted hover:text-foreground transition-colors"
            >
              {t('resetAll')}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
