export interface ReturneeProfile {
  id: string;
  name: string;
  currentCity: string; // city in China
  previousUniversity: string; // US university
  previousCity: string; // US city
  graduationYear: string;
  major: string;
  currentRole: string; // current job/role in China
  bio: string;
  bioZh: string;
  topics: string[]; // what they can mentor on
  contactMethod: 'wechat' | 'email';
  contactValue: string;
  photoUrl?: string;
}

export interface ReturneeStory {
  id: string;
  authorName: string;
  authorUniversity: string;
  authorGradYear: string;
  title: string;
  titleZh: string;
  excerpt: string;
  excerptZh: string;
  content: string; // markdown-like simple text
  contentZh: string;
  tags: string[];
  publishedDate: string;
}

export interface ReentryChecklistItem {
  id: string;
  titleKey: string;
  descriptionKey: string;
  phase: 'six-months-before' | 'three-months-before' | 'one-month-before' | 'final-week';
  resourceLink?: string;
  sortOrder: number;
}
