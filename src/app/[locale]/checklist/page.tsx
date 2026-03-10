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
    <div className="max-w-3xl mx-auto px-4 py-12">
      <PageHeader title={t('title')} subtitle={t('subtitle')} />

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

      {/* Reset button */}
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
  );
}
