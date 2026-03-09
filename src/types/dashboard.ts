// Phase 5: Ministry Worker Dashboard types

// A contact aggregates people from all phases into a unified CRM view
export interface Contact {
  id: string;
  name: string;
  type: 'student' | 'returnee' | 'volunteer' | 'other';
  city: string;
  university?: string;
  email?: string;
  wechat?: string;
  phone?: string;
  stage: StudentStage;
  tags: string[];
  notes: InteractionNote[];
  createdAt: string; // ISO date
  lastContactedAt?: string; // ISO date
}

// Maps to the ISM 5-stage student journey
export type StudentStage =
  | 'pre-arrival'
  | 'arrival'
  | 'adjustment'
  | 'community'
  | 'reentry'
  | 'returned';

// An interaction note logged by a ministry worker
export interface InteractionNote {
  id: string;
  contactId: string;
  content: string;
  type: 'meeting' | 'call' | 'message' | 'event' | 'prayer' | 'other';
  date: string; // ISO date
  createdAt: string;
}

// Dashboard overview stats
export interface DashboardStats {
  totalContacts: number;
  byStage: Record<StudentStage, number>;
  byType: Record<Contact['type'], number>;
  recentNotes: number; // notes in last 7 days
  upcomingEvents: number;
}

// Predefined tag options for contacts
export const contactTags = [
  'new-believer',
  'seeking',
  'connected',
  'needs-follow-up',
  'leader-potential',
  'mentor',
  'inactive',
  'high-priority',
] as const;

export type ContactTag = typeof contactTags[number];

export const stageLabels: Record<StudentStage, { en: string; zh: string }> = {
  'pre-arrival': { en: 'Pre-Arrival', zh: '到达前' },
  'arrival': { en: 'Arrival', zh: '刚到达' },
  'adjustment': { en: 'Adjustment', zh: '适应期' },
  'community': { en: 'Community', zh: '融入社区' },
  'reentry': { en: 'Re-entry', zh: '准备回国' },
  'returned': { en: 'Returned', zh: '已回国' },
};

export const noteTypeLabels: Record<InteractionNote['type'], { en: string; zh: string }> = {
  'meeting': { en: 'Meeting', zh: '见面' },
  'call': { en: 'Call', zh: '电话' },
  'message': { en: 'Message', zh: '消息' },
  'event': { en: 'Event', zh: '活动' },
  'prayer': { en: 'Prayer', zh: '祷告' },
  'other': { en: 'Other', zh: '其他' },
};
