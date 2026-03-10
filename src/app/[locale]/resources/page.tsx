import type { Metadata } from 'next';
import { useTranslations } from 'next-intl';
import { getCategoriesByPhase } from '@/lib/data/resources';
import ResourceGrid from '@/components/resources/ResourceGrid';
import PageHeader from '@/components/ui/PageHeader';

export const metadata: Metadata = {
  title: 'Practical Guides 实用指南',
  description: 'Step-by-step guides for banking, housing, phone, campus life, and more — organized by urgency for newly arrived Chinese international students.',
};

export default function ResourcesPage() {
  const t = useTranslations('resources');

  const phases = ['first-week', 'first-month', 'first-semester'] as const;

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <PageHeader title={t('title')} subtitle={t('subtitle')} />

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
