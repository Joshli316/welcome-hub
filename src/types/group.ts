export interface SmallGroup {
  id: string;
  name: string;
  nameZh: string;
  description: string;
  descriptionZh: string;
  type: 'study' | 'social' | 'hobby' | 'faith' | 'professional' | 'support';
  topics: string[]; // e.g. ["cooking", "chinese-cuisine"]
  city: string;
  university?: string; // optional — some groups are city-wide
  meetingSchedule: string; // e.g. "Every Friday 7-9pm"
  meetingScheduleZh: string;
  meetingLocation: string;
  meetingLocationZh: string;
  hostName: string;
  hostContact: string;
  maxMembers?: number;
  currentMembers: number;
  signupUrl?: string;
  imageUrl?: string;
  isOpen: boolean; // whether accepting new members
}
