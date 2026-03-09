import { useTranslations } from 'next-intl';
import { getGroups, getUniqueGroupCities, getUniqueGroupTypes } from '@/lib/data/groups';
import GroupGrid from '@/components/groups/GroupGrid';

export default function GroupsPage() {
  const t = useTranslations('groups');
  const groups = getGroups();
  const cities = getUniqueGroupCities();
  const types = getUniqueGroupTypes();

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="mb-10">
        <h1 className="text-3xl font-bold mb-2">{t('title')}</h1>
        <p className="text-muted">{t('subtitle')}</p>
      </div>

      <GroupGrid groups={groups} cities={cities} types={types} />
    </div>
  );
}
