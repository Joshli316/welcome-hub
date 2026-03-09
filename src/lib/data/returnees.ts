import { ReturneeProfile, ReturneeStory, ReentryChecklistItem } from '@/types/returnee';
import returneesData from '@/data/returnees.json';
import storiesData from '@/data/returnee-stories.json';
import checklistData from '@/data/reentry-checklist.json';

// --- Returnee Profiles ---

export function getReturnees(): ReturneeProfile[] {
  return returneesData as ReturneeProfile[];
}

export function getReturneeById(id: string): ReturneeProfile | undefined {
  return getReturnees().find(r => r.id === id);
}

export function getUniqueReturneeLocations(): string[] {
  return [...new Set(getReturnees().map(r => r.currentCity))];
}

export function getUniqueReturneeTopics(): string[] {
  return [...new Set(getReturnees().flatMap(r => r.topics))];
}

// --- Returnee Stories ---

export function getStories(): ReturneeStory[] {
  return (storiesData as ReturneeStory[]).sort(
    (a, b) => new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime()
  );
}

export function getStoryById(id: string): ReturneeStory | undefined {
  return getStories().find(s => s.id === id);
}

// --- Re-entry Checklist ---

export function getReentryChecklist(): ReentryChecklistItem[] {
  return (checklistData as ReentryChecklistItem[]).sort((a, b) => a.sortOrder - b.sortOrder);
}

export const reentryPhases: ReentryChecklistItem['phase'][] = [
  'six-months-before',
  'three-months-before',
  'one-month-before',
  'final-week',
];
