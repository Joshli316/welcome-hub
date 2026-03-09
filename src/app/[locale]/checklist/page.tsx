'use client';

import { useTranslations } from 'next-intl';
import { getChecklistItems, checklistPhases } from '@/lib/data/checklist';
import { useChecklist } from '@/hooks/useChecklist';
import ChecklistGroup from '@/components/checklist/ChecklistGroup';
import ChecklistProgress from '@/components/checklist/ChecklistProgress';

export default function ChecklistPage() {
  const t = useTranslations('checklist');
  const items = getChecklistItems();
  const { isChecked, toggle, completedCount, resetAll } = useChecklist();

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">{t('title')}</h1>
        <p className="text-muted">{t('subtitle')}</p>
      </div>

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
