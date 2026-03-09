import { CommunityEvent } from '@/types/event';
import EventCard from './EventCard';

interface EventListProps {
  events: CommunityEvent[];
}

export default function EventList({ events }: EventListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {events.map(event => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  );
}
