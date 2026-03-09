import { useTranslations } from 'next-intl';
import { getReturnees, getUniqueReturneeLocations, getUniqueReturneeTopics } from '@/lib/data/returnees';
import ReturneeGrid from '@/components/reentry/ReturneeGrid';

export default function ReturneesPage() {
  const t = useTranslations('reentry.returnees');
  const returnees = getReturnees();
  const cities = getUniqueReturneeLocations();
  const topics = getUniqueReturneeTopics();

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="mb-10">
        <h1 className="text-3xl font-bold mb-2">{t('title')}</h1>
        <p className="text-muted">{t('subtitle')}</p>
      </div>

      <ReturneeGrid returnees={returnees} cities={cities} topics={topics} />
    </div>
  );
}
