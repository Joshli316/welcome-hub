import type { Metadata } from 'next';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { getStories } from '@/lib/data/returnees';
import Card from '@/components/ui/Card';
import StoryCard from '@/components/reentry/StoryCard';
import PageHeader from '@/components/ui/PageHeader';

export const metadata: Metadata = {
  title: 'Re-entry Planning 回国准备',
  description: 'Departure checklists, re-entry guides, returnee mentors, and real stories to help you prepare for going back to China.',
};

export default function ReentryPage() {
  const locale = useLocale();
  const t = useTranslations('reentry');
  const latestStories = getStories().slice(0, 2);

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <PageHeader title={t('title')} subtitle={t('subtitle')} />

      {/* Feature cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
        <Link href={`/${locale}/reentry/checklist`}>
          <Card hover className="h-full text-center py-6">
            <div className="text-3xl mb-2" aria-hidden="true">📋</div>
            <h3 className="font-semibold mb-1">{t('features.checklist.title')}</h3>
            <p className="text-sm text-muted">{t('features.checklist.description')}</p>
          </Card>
        </Link>
        <Link href={`/${locale}/reentry/resources`}>
          <Card hover className="h-full text-center py-6">
            <div className="text-3xl mb-2" aria-hidden="true">📖</div>
            <h3 className="font-semibold mb-1">{t('features.resources.title')}</h3>
            <p className="text-sm text-muted">{t('features.resources.description')}</p>
          </Card>
        </Link>
        <Link href={`/${locale}/reentry/returnees`}>
          <Card hover className="h-full text-center py-6">
            <div className="text-3xl mb-2" aria-hidden="true">🤝</div>
            <h3 className="font-semibold mb-1">{t('features.returnees.title')}</h3>
            <p className="text-sm text-muted">{t('features.returnees.description')}</p>
          </Card>
        </Link>
        <Link href={`/${locale}/reentry/stories`}>
          <Card hover className="h-full text-center py-6">
            <div className="text-3xl mb-2" aria-hidden="true">💬</div>
            <h3 className="font-semibold mb-1">{t('features.stories.title')}</h3>
            <p className="text-sm text-muted">{t('features.stories.description')}</p>
          </Card>
        </Link>
      </div>

      {/* Latest stories preview */}
      {latestStories.length > 0 && (
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">{t('latestStories')}</h2>
            <Link href={`/${locale}/reentry/stories`} className="text-primary-600 text-sm font-medium hover:text-primary-700">
              {t('viewAllStories')} →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {latestStories.map(story => (
              <StoryCard key={story.id} story={story} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
