import { CommunityEvent } from '@/types/event';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import { formatDate } from '@/lib/utils/date';
import { localized } from '@/lib/utils/localize';
import { useLocale, useTranslations } from 'next-intl';
import { safeExternalUrl } from '@/lib/utils/sanitize';

interface EventCardProps {
  event: CommunityEvent;
}

// Maps event type → badge color for visual grouping
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

  const title = localized(event, 'title', locale);
  const description = localized(event, 'description', locale);
  const location = localized(event, 'location', locale);

  return (
    <Card className="flex flex-col h-full animate-fade-up group hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300">
      <div className="flex items-center gap-2.5 mb-3">
        <Badge variant={typeBadgeVariant[event.type]}>{tTypes(event.type)}</Badge>
        <span className="text-base text-muted">{formatDate(event.date, locale)}</span>
      </div>
      <h3 className="font-bold text-xl mb-1.5">{title}</h3>
      <p className="text-base text-muted mb-3 flex-1 leading-relaxed">{description}</p>
      <div className="text-base text-muted space-y-1 mb-3">
        <p><span aria-hidden="true">📍</span> {location}</p>
        <p><span aria-hidden="true">🕐</span> {event.time}</p>
      </div>
      {/* safeExternalUrl blocks javascript: and data: protocol URLs */}
      {event.signupUrl && safeExternalUrl(event.signupUrl) && (
        <a
          href={safeExternalUrl(event.signupUrl)!}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-base font-bold text-primary-600 hover:text-primary-700 hover:gap-2.5 transition-all link-hover"
        >
          {t('signup')} &rarr;
        </a>
      )}
    </Card>
  );
}
