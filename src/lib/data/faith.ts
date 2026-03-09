import { FaithArticle, Testimony, DiscussionTopic, CityGuide } from '@/types/faith';
import articlesData from '@/data/faith/articles.json';
import testimoniesData from '@/data/faith/testimonies.json';
import discussionsData from '@/data/faith/discussions.json';
import cityGuidesData from '@/data/faith/city-guides.json';

// --- Articles ---

export function getFaithArticles(): FaithArticle[] {
  return articlesData as unknown as FaithArticle[];
}

export function getFaithArticleBySlug(slug: string): FaithArticle | undefined {
  return getFaithArticles().find(a => a.slug === slug);
}

// --- Testimonies ---

export function getTestimonies(): Testimony[] {
  return (testimoniesData as Testimony[]).sort(
    (a, b) => new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime()
  );
}

export function getTestimonyById(id: string): Testimony | undefined {
  return getTestimonies().find(t => t.id === id);
}

// --- Discussions ---

export function getDiscussions(): DiscussionTopic[] {
  return discussionsData as DiscussionTopic[];
}

export function getDiscussionById(id: string): DiscussionTopic | undefined {
  return getDiscussions().find(d => d.id === id);
}

// --- City Guides ---

export function getCityGuides(): CityGuide[] {
  return cityGuidesData as unknown as CityGuide[];
}

export function getCityGuideById(id: string): CityGuide | undefined {
  return getCityGuides().find(g => g.id === id);
}
