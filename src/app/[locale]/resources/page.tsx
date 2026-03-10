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
    <div>
      {/* Page banner for visual continuity with dark header */}
      <div className="bg-gradient-to-b from-warm-100/60 to-background pt-10 pb-2">
        <div className="max-w-6xl mx-auto px-4">
          <PageHeader title={t('title')} subtitle={t('subtitle')} />
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 pb-12">
        {phases.map(phase => {
          const cats = getCategoriesByPhase(phase);
          return (
            <div key={phase} className="mb-12">
              <h2 className="text-2xl font-bold mb-5 pb-3 border-b border-border/40">
                {t(`phases.${phase}`)}
              </h2>
              <ResourceGrid categories={cats} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
