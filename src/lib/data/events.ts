import { CommunityEvent } from '@/types/event';
import eventsData from '@/data/events.json';

export function getEvents(): CommunityEvent[] {
  return eventsData as CommunityEvent[];
}

export function getUpcomingEvents(limit?: number): CommunityEvent[] {
  const now = new Date();
  const upcoming = getEvents()
    .filter(e => new Date(e.date) >= now)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  return limit ? upcoming.slice(0, limit) : upcoming;
}

export function getEventById(id: string): CommunityEvent | undefined {
  return getEvents().find(e => e.id === id);
}
