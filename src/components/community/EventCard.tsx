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
    <Card className="flex flex-col h-full animate-fade-up">
      <div className="flex items-center gap-2 mb-3">
        <Badge variant={typeBadgeVariant[event.type]}>{tTypes(event.type)}</Badge>
        <span className="text-xs text-muted">{formatDate(event.date, locale)}</span>
      </div>
      <h3 className="font-semibold text-[15px] mb-1.5">{title}</h3>
      <p className="text-[13px] text-muted mb-3 flex-1 leading-relaxed">{description}</p>
      <div className="text-xs text-muted space-y-0.5 mb-4">
        <p><span aria-hidden="true">📍</span> {location}</p>
        <p><span aria-hidden="true">🕐</span> {event.time}</p>
      </div>
      {/* safeExternalUrl blocks javascript: and data: protocol URLs */}
      {event.signupUrl && safeExternalUrl(event.signupUrl) && (
        <a
          href={safeExternalUrl(event.signupUrl)!}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-[13px] font-medium text-primary-600 hover:text-primary-700 transition-colors"
        >
          {t('signup')} &rarr;
        </a>
      )}
    </Card>
  );
}
