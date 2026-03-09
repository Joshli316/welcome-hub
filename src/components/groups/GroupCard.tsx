import Link from 'next/link';
import { SmallGroup } from '@/types/group';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import { useLocale, useTranslations } from 'next-intl';

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

  const name = locale === 'zh' ? group.nameZh : group.name;
  const description = locale === 'zh' ? group.descriptionZh : group.description;
  const schedule = locale === 'zh' ? group.meetingScheduleZh : group.meetingSchedule;
  const location = locale === 'zh' ? group.meetingLocationZh : group.meetingLocation;

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
          <p>📍 {location}</p>
          <p>🕐 {schedule}</p>
          <p>👥 {group.currentMembers}{group.maxMembers ? `/${group.maxMembers}` : ''} {t('members')}</p>
        </div>
      </Card>
    </Link>
  );
}
