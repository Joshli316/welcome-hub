import { ContentBlock } from './resource';

export interface FaithArticle {
  slug: string;
  title: string;
  titleZh: string;
  summary: string;
  summaryZh: string;
  content: ContentBlock[];
  contentZh: ContentBlock[];
  category: 'workplace' | 'community' | 'identity' | 'culture';
  lastUpdated: string;
  relatedSlugs?: string[];
}

export interface Testimony {
  id: string;
  authorName: string;
  authorCity: string; // city in China
  authorRole: string;
  authorRoleZh: string;
  title: string;
  titleZh: string;
  excerpt: string;
  excerptZh: string;
  content: string; // long-form text
  contentZh: string;
  themes: string[]; // e.g. "workplace-faith", "finding-community"
  videoUrl?: string; // optional YouTube/Bilibili embed
  publishedDate: string;
  photoUrl?: string;
}

export interface DiscussionTopic {
  id: string;
  title: string;
  titleZh: string;
  description: string;
  descriptionZh: string;
  questions: string[];
  questionsZh: string[];
  category: 'workplace' | 'relationships' | 'identity' | 'culture' | 'purpose';
  relatedArticleSlug?: string;
}

export interface CityGuide {
  id: string;
  city: string;
  cityZh: string;
  description: string;
  descriptionZh: string;
  resources: CityResource[];
}

export interface CityResource {
  name: string;
  nameZh: string;
  type: 'community' | 'church' | 'professional' | 'social';
  description: string;
  descriptionZh: string;
  contactInfo?: string;
}
