import { ChecklistItem } from '@/types/checklist';
import checklistData from '@/data/checklist.json';

export function getChecklistItems(): ChecklistItem[] {
  return (checklistData as ChecklistItem[]).sort((a, b) => a.sortOrder - b.sortOrder);
}

export function getChecklistByPhase(phase: ChecklistItem['phase']): ChecklistItem[] {
  return getChecklistItems().filter(item => item.phase === phase);
}

export const checklistPhases: ChecklistItem['phase'][] = [
  'before-arrival',
  'first-week',
  'first-month',
  'first-semester',
];
