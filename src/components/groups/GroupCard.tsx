import Link from 'next/link';
import { SmallGroup } from '@/types/group';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import { useLocale, useTranslations } from 'next-intl';
import { localized } from '@/lib/utils/localize';

interface GroupCardProps {
  group: SmallGroup;
}

const typeBadgeVariant: Record<string, 'default' | 'primary' | 'sage' | 'sky'> = {
  study: 'sky',
  social: 'primary',
  hobby: 'default',
  faith: 'sage',
  professional: 'primary',
  support: 'sage',
};

export default function GroupCard({ group }: GroupCardProps) {
  const locale = useLocale();
  const t = useTranslations('groups');
  const tTypes = useTranslations('groups.types');

  const name = localized(group, 'name', locale);
  const description = localized(group, 'description', locale);
  const schedule = localized(group, 'meetingSchedule', locale);
  const location = localized(group, 'meetingLocation', locale);

  return (
    <Link href={`/${locale}/groups/${group.id}`}>
      <Card hover className="flex flex-col h-full">
        <div className="flex items-center gap-2 mb-3">
          <Badge variant={typeBadgeVariant[group.type]}>{tTypes(group.type)}</Badge>
          {!group.isOpen && <Badge variant="default">{t('full')}</Badge>}
        </div>

        <h3 className="font-semibold text-lg mb-2">{name}</h3>
        <p className="text-sm text-muted mb-3 flex-1">{description}</p>

        <div className="text-xs text-muted space-y-1">
          <p><span aria-hidden="true">📍</span> {location}</p>
          <p><span aria-hidden="true">🕐</span> {schedule}</p>
          <p><span aria-hidden="true">👥</span> {group.currentMembers}{group.maxMembers ? `/${group.maxMembers}` : ''} {t('members')}</p>
        </div>
      </Card>
    </Link>
  );
}
