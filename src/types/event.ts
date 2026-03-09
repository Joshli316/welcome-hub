export interface CommunityEvent {
  id: string;
  title: string;
  titleZh: string;
  description: string;
  descriptionZh: string;
  date: string; // ISO date
  time: string; // e.g. "14:00-16:00"
  location: string;
  locationZh: string;
  type: 'social' | 'workshop' | 'trip' | 'meal' | 'other';
  signupUrl?: string;
  imageUrl?: string;
}
