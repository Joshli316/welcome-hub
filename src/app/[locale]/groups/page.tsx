import type { Metadata } from 'next';
import { useTranslations } from 'next-intl';
import { getGroups, getUniqueGroupCities, getUniqueGroupTypes } from '@/lib/data/groups';
import GroupGrid from '@/components/groups/GroupGrid';
import PageHeader from '@/components/ui/PageHeader';

export const metadata: Metadata = {
  title: 'Small Groups 小组活动',
  description: 'Join study groups, hobby groups, and social groups to build real friendships with fellow students.',
};

export default function GroupsPage() {
  const t = useTranslations('groups');
  const groups = getGroups();
  const cities = getUniqueGroupCities();
  const types = getUniqueGroupTypes();

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <PageHeader title={t('title')} subtitle={t('subtitle')} />

      <GroupGrid groups={groups} cities={cities} types={types} />
    </div>
  );
}
