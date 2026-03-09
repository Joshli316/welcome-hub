export interface ChecklistItem {
  id: string;
  titleKey: string; // i18n key
  descriptionKey: string; // i18n key
  phase: 'before-arrival' | 'first-week' | 'first-month' | 'first-semester';
  resourceLink?: string; // link to relevant resource page
  sortOrder: number;
}

export interface ChecklistState {
  [itemId: string]: boolean;
}
