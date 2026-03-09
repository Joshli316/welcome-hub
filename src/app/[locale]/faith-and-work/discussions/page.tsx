import { useTranslations } from 'next-intl';
import { getDiscussions } from '@/lib/data/faith';
import DiscussionCard from '@/components/faith/DiscussionCard';

// Displays all discussion topics for small group conversations
export default function DiscussionsPage() {
  const t = useTranslations('faith');
  const discussions = getDiscussions();

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="mb-10">
        <h1 className="text-3xl font-bold mb-2">{t('features.discussions.title')}</h1>
        <p className="text-muted">{t('features.discussions.description')}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {discussions.map(disc => (
          <DiscussionCard key={disc.id} discussion={disc} />
        ))}
      </div>
    </div>
  );
}
