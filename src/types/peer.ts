export interface PeerProfile {
  id: string;
  name: string;
  university: string;
  city: string;
  major: string;
  degreeLevel: 'undergrad' | 'masters' | 'phd' | 'visiting' | 'language';
  arrivalSemester: string; // e.g. "Fall 2026"
  interests: string[]; // from a predefined list
  languages: string[];
  bio: string;
  contactMethod: 'wechat' | 'email';
  contactValue: string;
  photoUrl?: string;
  createdAt: string; // ISO date
}

// The user's own profile, stored in localStorage
export type MyProfile = PeerProfile;

// Predefined interest options (used in profile form and matching)
export const interestOptions = [
  'cooking',
  'sports',
  'music',
  'movies',
  'gaming',
  'hiking',
  'photography',
  'reading',
  'travel',
  'tech',
  'art',
  'faith',
  'business',
  'fitness',
  'food-exploration',
  'language-exchange',
] as const;

export type Interest = typeof interestOptions[number];

export const degreeLevelOptions = [
  'undergrad',
  'masters',
  'phd',
  'visiting',
  'language',
] as const;
