import { ResourceArticle, ResourceCategory } from '@/types/resource';

// Category definitions — in Phase 2+ these could come from a database
export const categories: ResourceCategory[] = [
  { id: 'airport', titleKey: 'airport', descriptionKey: 'airport-desc', icon: '✈️', phase: 'first-week', sortOrder: 1 },
  { id: 'housing', titleKey: 'housing', descriptionKey: 'housing-desc', icon: '🏠', phase: 'first-week', sortOrder: 2 },
  { id: 'phone', titleKey: 'phone', descriptionKey: 'phone-desc', icon: '📱', phase: 'first-week', sortOrder: 3 },
  { id: 'banking', titleKey: 'banking', descriptionKey: 'banking-desc', icon: '🏦', phase: 'first-week', sortOrder: 4 },
  { id: 'campus', titleKey: 'campus', descriptionKey: 'campus-desc', icon: '🎓', phase: 'first-month', sortOrder: 5 },
  { id: 'transportation', titleKey: 'transportation', descriptionKey: 'transportation-desc', icon: '🚗', phase: 'first-month', sortOrder: 6 },
  { id: 'food', titleKey: 'food', descriptionKey: 'food-desc', icon: '🍜', phase: 'first-month', sortOrder: 7 },
  { id: 'health', titleKey: 'health', descriptionKey: 'health-desc', icon: '🏥', phase: 'first-month', sortOrder: 8 },
  { id: 'academics', titleKey: 'academics', descriptionKey: 'academics-desc', icon: '📚', phase: 'first-semester', sortOrder: 9 },
  { id: 'daily-life', titleKey: 'daily-life', descriptionKey: 'daily-life-desc', icon: '🛒', phase: 'first-semester', sortOrder: 10 },
  { id: 'legal', titleKey: 'legal', descriptionKey: 'legal-desc', icon: '⚖️', phase: 'first-semester', sortOrder: 11 },
];

// Map of available resource files (add entries as content is created)
const resourceFiles: Record<string, Record<string, () => Promise<ResourceArticle[]>>> = {
  banking: {
    zh: () => import('@/data/resources/banking.zh.json').then(m => m.default as ResourceArticle[]),
    en: () => import('@/data/resources/banking.en.json').then(m => m.default as ResourceArticle[]),
  },
  phone: {
    zh: () => import('@/data/resources/phone.zh.json').then(m => m.default as ResourceArticle[]),
    en: () => import('@/data/resources/phone.en.json').then(m => m.default as ResourceArticle[]),
  },
  housing: {
    zh: () => import('@/data/resources/housing.zh.json').then(m => m.default as ResourceArticle[]),
    en: () => import('@/data/resources/housing.en.json').then(m => m.default as ResourceArticle[]),
  },
  airport: {
    zh: () => import('@/data/resources/airport.zh.json').then(m => m.default as ResourceArticle[]),
    en: () => import('@/data/resources/airport.en.json').then(m => m.default as ResourceArticle[]),
  },
  campus: {
    zh: () => import('@/data/resources/campus.zh.json').then(m => m.default as ResourceArticle[]),
    en: () => import('@/data/resources/campus.en.json').then(m => m.default as ResourceArticle[]),
  },
  transportation: {
    zh: () => import('@/data/resources/transportation.zh.json').then(m => m.default as ResourceArticle[]),
    en: () => import('@/data/resources/transportation.en.json').then(m => m.default as ResourceArticle[]),
  },
  food: {
    zh: () => import('@/data/resources/food.zh.json').then(m => m.default as ResourceArticle[]),
    en: () => import('@/data/resources/food.en.json').then(m => m.default as ResourceArticle[]),
  },
  health: {
    zh: () => import('@/data/resources/health.zh.json').then(m => m.default as ResourceArticle[]),
    en: () => import('@/data/resources/health.en.json').then(m => m.default as ResourceArticle[]),
  },
  academics: {
    zh: () => import('@/data/resources/academics.zh.json').then(m => m.default as ResourceArticle[]),
    en: () => import('@/data/resources/academics.en.json').then(m => m.default as ResourceArticle[]),
  },
  'daily-life': {
    zh: () => import('@/data/resources/daily-life.zh.json').then(m => m.default as ResourceArticle[]),
    en: () => import('@/data/resources/daily-life.en.json').then(m => m.default as ResourceArticle[]),
  },
  legal: {
    zh: () => import('@/data/resources/legal.zh.json').then(m => m.default as ResourceArticle[]),
    en: () => import('@/data/resources/legal.en.json').then(m => m.default as ResourceArticle[]),
  },
};

export function getCategories(): ResourceCategory[] {
  return categories;
}

export function getCategoryById(id: string): ResourceCategory | undefined {
  return categories.find(c => c.id === id);
}

export function getCategoriesByPhase(phase: ResourceCategory['phase']): ResourceCategory[] {
  return categories.filter(c => c.phase === phase).sort((a, b) => a.sortOrder - b.sortOrder);
}

export async function getArticlesByCategory(categoryId: string, locale: string): Promise<ResourceArticle[]> {
  const loader = resourceFiles[categoryId]?.[locale];
  if (!loader) return [];
  return loader();
}

export async function getArticle(categoryId: string, slug: string, locale: string): Promise<ResourceArticle | undefined> {
  const articles = await getArticlesByCategory(categoryId, locale);
  return articles.find(a => a.slug === slug);
}

export async function getAllArticles(locale: string): Promise<ResourceArticle[]> {
  const allArticles: ResourceArticle[] = [];
  for (const categoryId of Object.keys(resourceFiles)) {
    const articles = await getArticlesByCategory(categoryId, locale);
    allArticles.push(...articles);
  }
  return allArticles;
}
