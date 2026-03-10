import Link from 'next/link';
import { ReturneeStory } from '@/types/returnee';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import { formatDate } from '@/lib/utils/date';
import { useLocale } from 'next-intl';
import { localized } from '@/lib/utils/localize';

interface StoryCardProps {
  story: ReturneeStory;
}

export default function StoryCard({ story }: StoryCardProps) {
  const locale = useLocale();
  const title = localized(story, 'title', locale);
  const excerpt = localized(story, 'excerpt', locale);

  return (
    <Link href={`/${locale}/reentry/stories/${story.id}`}>
      <Card hover className="h-full flex flex-col">
        <div className="flex items-center gap-2 mb-3 text-xs text-muted">
          <span>{story.authorName}</span>
          <span>·</span>
          <span>{story.authorUniversity} {story.authorGradYear}</span>
        </div>
        <h3 className="font-semibold text-lg mb-2">{title}</h3>
        <p className="text-sm text-muted mb-3 flex-1">{excerpt}</p>
        <div className="flex items-center justify-between">
          <div className="flex flex-wrap gap-1.5">
            {story.tags.slice(0, 2).map(tag => (
              <Badge key={tag} variant="default">{tag}</Badge>
            ))}
          </div>
          <span className="text-xs text-muted">{formatDate(story.publishedDate, locale)}</span>
        </div>
      </Card>
    </Link>
  );
}
