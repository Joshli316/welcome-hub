import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getLocale, getTranslations } from 'next-intl/server';
import { getGroupById } from '@/lib/data/groups';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';

const typeBadgeVariant: Record<string, 'default' | 'primary' | 'sage' | 'sky'> = {
  study: 'sky',
  social: 'primary',
  hobby: 'default',
  faith: 'sage',
  professional: 'primary',
  support: 'sage',
};

export default async function GroupDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const locale = await getLocale();
  const t = await getTranslations('groups');
  const tTypes = await getTranslations('groups.types');

  const group = getGroupById(id);
  if (!group) notFound();

  const name = locale === 'zh' ? group.nameZh : group.name;
  const description = locale === 'zh' ? group.descriptionZh : group.description;
  const schedule = locale === 'zh' ? group.meetingScheduleZh : group.meetingSchedule;
  const location = locale === 'zh' ? group.meetingLocationZh : group.meetingLocation;

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      {/* Back link */}
      <div className="mb-6">
        <Link href={`/${locale}/groups`} className="text-sm text-muted hover:text-foreground">
          ← {t('backToAll')}
        </Link>
      </div>

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-3">
          <Badge variant={typeBadgeVariant[group.type]}>{tTypes(group.type)}</Badge>
          {group.isOpen ? (
            <Badge variant="sage">{t('openForSignup')}</Badge>
          ) : (
            <Badge variant="default">{t('full')}</Badge>
          )}
        </div>
        <h1 className="text-3xl font-bold mb-3">{name}</h1>
        <p className="text-muted text-lg">{description}</p>
      </div>

      {/* Details card */}
      <Card className="mb-8">
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <span className="text-lg mt-0.5" aria-hidden="true">🕐</span>
            <div>
              <p className="font-medium text-sm">{t('schedule')}</p>
              <p className="text-muted">{schedule}</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-lg mt-0.5" aria-hidden="true">📍</span>
            <div>
              <p className="font-medium text-sm">{t('location')}</p>
              <p className="text-muted">{location}</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-lg mt-0.5" aria-hidden="true">👥</span>
            <div>
              <p className="font-medium text-sm">{t('members')}</p>
              <p className="text-muted">
                {group.currentMembers}{group.maxMembers ? ` / ${group.maxMembers}` : ''} {t('members')}
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-lg mt-0.5">🙋</span>
            <div>
              <p className="font-medium text-sm">{t('host')}</p>
              <p className="text-muted">{group.hostName}</p>
            </div>
          </div>
        </div>
      </Card>

      {/* Signup button */}
      {group.isOpen && group.signupUrl && (
        <div className="text-center">
          <a
            href={group.signupUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-8 py-3 bg-primary-500 text-white rounded-xl font-semibold hover:bg-primary-600 transition-colors text-lg"
          >
            {t('joinGroup')}
          </a>
        </div>
      )}

      {!group.isOpen && (
        <Card className="text-center bg-warm-50">
          <p className="text-muted">{t('fullMessage')}</p>
          <p className="text-sm text-muted mt-2">{t('contactHost')}: {group.hostContact}</p>
        </Card>
      )}
    </div>
  );
}
