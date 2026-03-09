import { useTranslations } from 'next-intl';
import { getCategoriesByPhase } from '@/lib/data/resources';
import ResourceGrid from '@/components/resources/ResourceGrid';

export default function ResourcesPage() {
  const t = useTranslations('resources');

  const phases = ['first-week', 'first-month', 'first-semester'] as const;

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="mb-10">
        <h1 className="text-3xl font-bold mb-2">{t('title')}</h1>
        <p className="text-muted">{t('subtitle')}</p>
      </div>

      {phases.map(phase => {
        const cats = getCategoriesByPhase(phase);
        return (
          <div key={phase} className="mb-12">
            <h2 className="text-xl font-bold mb-4 pb-2 border-b border-border">
              {t(`phases.${phase}`)}
            </h2>
            <ResourceGrid categories={cats} />
          </div>
        );
      })}
    </div>
  );
}
