// Content block types for rich article rendering
export type ContentBlock =
  | { type: 'paragraph'; text: string }
  | { type: 'heading'; text: string; level: 2 | 3 }
  | { type: 'list'; items: string[]; ordered?: boolean }
  | { type: 'tip'; text: string }
  | { type: 'warning'; text: string }
  | { type: 'comparison'; title: string; items: { label: string; description: string }[] }
  | { type: 'steps'; items: { title: string; description: string }[] };

export interface ResourceArticle {
  slug: string;
  categoryId: string;
  title: string;
  summary: string;
  content: ContentBlock[];
  lastUpdated: string; // ISO date string
  relatedSlugs?: string[];
}

export interface ResourceCategory {
  id: string;
  titleKey: string; // i18n key
  descriptionKey: string;
  icon: string; // emoji
  phase: 'first-week' | 'first-month' | 'first-semester';
  sortOrder: number;
}
