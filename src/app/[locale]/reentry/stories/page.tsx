import { useTranslations } from 'next-intl';
import { getStories } from '@/lib/data/returnees';
import StoryCard from '@/components/reentry/StoryCard';

export default function StoriesPage() {
  const t = useTranslations('reentry.stories');
  const stories = getStories();

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="mb-10">
        <h1 className="text-3xl font-bold mb-2">{t('title')}</h1>
        <p className="text-muted">{t('subtitle')}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {stories.map(story => (
          <StoryCard key={story.id} story={story} />
        ))}
      </div>
    </div>
  );
}
