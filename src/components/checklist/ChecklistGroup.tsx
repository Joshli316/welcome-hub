'use client';

import { ChecklistItem as ChecklistItemType } from '@/types/checklist';
import ChecklistItem from './ChecklistItem';
import { useTranslations } from 'next-intl';

interface ChecklistGroupProps {
  phase: string;
  items: ChecklistItemType[];
  isChecked: (id: string) => boolean;
  onToggle: (id: string) => void;
}

export default function ChecklistGroup({ phase, items, isChecked, onToggle }: ChecklistGroupProps) {
  const t = useTranslations('checklist.phases');
  const completedInGroup = items.filter(item => isChecked(item.id)).length;

  return (
    <div className="mb-10">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl">{t(phase)}</h2>
        <span className="text-[13px] text-muted tabular-nums">{completedInGroup}/{items.length}</span>
      </div>
      <div className="space-y-1 border border-border rounded-lg overflow-hidden bg-white">
        {items.map(item => (
          <ChecklistItem
            key={item.id}
            titleKey={item.titleKey}
            descriptionKey={item.descriptionKey}
            checked={isChecked(item.id)}
            onToggle={() => onToggle(item.id)}
            resourceLink={item.resourceLink}
          />
        ))}
      </div>
    </div>
  );
}
