import { useTranslations } from 'next-intl';
import { getCityGuides } from '@/lib/data/faith';
import CityGuideCard from '@/components/faith/CityGuideCard';

// City-by-city guide to faith communities and resources in China
export default function CityGuidePage() {
  const t = useTranslations('faith');
  const guides = getCityGuides();

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="mb-10">
        <h1 className="text-3xl font-bold mb-2">{t('features.cityGuide.title')}</h1>
        <p className="text-muted">{t('features.cityGuide.description')}</p>
      </div>

      <div className="space-y-6">
        {guides.map(guide => (
          <CityGuideCard key={guide.id} guide={guide} />
        ))}
      </div>
    </div>
  );
}
