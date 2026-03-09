import { CommunityEvent } from '@/types/event';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import { formatDate } from '@/lib/utils/date';
import { useLocale, useTranslations } from 'next-intl';

interface EventCardProps {
  event: CommunityEvent;
}

const typeBadgeVariant: Record<string, 'default' | 'primary' | 'sage' | 'sky'> = {
  social: 'sky',
  workshop: 'primary',
  trip: 'sage',
  meal: 'default',
  other: 'default',
};

export default function EventCard({ event }: EventCardProps) {
  const locale = useLocale();
  const t = useTranslations('community.events');
  const tTypes = useTranslations('eventTypes');

  const title = locale === 'zh' ? event.titleZh : event.title;
  const description = locale === 'zh' ? event.descriptionZh : event.description;
  const location = locale === 'zh' ? event.locationZh : event.location;

  return (
    <Card className="flex flex-col h-full">
      <div className="flex items-center gap-2 mb-3">
        <Badge variant={typeBadgeVariant[event.type]}>{tTypes(event.type)}</Badge>
        <span className="text-xs text-muted">{formatDate(event.date, locale)}</span>
      </div>
      <h3 className="font-semibold text-lg mb-2">{title}</h3>
      <p className="text-sm text-muted mb-3 flex-1">{description}</p>
      <div className="text-xs text-muted space-y-1 mb-4">
        <p>📍 {location}</p>
        <p>🕐 {event.time}</p>
      </div>
      {event.signupUrl && (
        <a
          href={event.signupUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block text-center px-4 py-2 bg-primary-500 text-white rounded-lg text-sm font-medium hover:bg-primary-600 transition-colors"
        >
          {t('signup')}
        </a>
      )}
    </Card>
  );
}
