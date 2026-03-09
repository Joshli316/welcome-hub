import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getLocale, getTranslations } from 'next-intl/server';
import { getStoryById } from '@/lib/data/returnees';
import Badge from '@/components/ui/Badge';
import { formatDate } from '@/lib/utils/date';

export default async function StoryDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const locale = await getLocale();
  const t = await getTranslations('reentry.stories');

  const story = getStoryById(id);
  if (!story) notFound();

  const title = locale === 'zh' ? story.titleZh : story.title;
  const content = locale === 'zh' ? story.contentZh : story.content;

  // Split content into paragraphs for rendering
  const paragraphs = content.split('\n\n').filter(Boolean);

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      {/* Breadcrumb */}
      <div className="mb-6 text-sm text-muted">
        <Link href={`/${locale}/reentry`} className="hover:text-foreground">
          {t('backToReentry')}
        </Link>
        <span className="mx-2">→</span>
        <Link href={`/${locale}/reentry/stories`} className="hover:text-foreground">
          {t('title')}
        </Link>
      </div>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">{title}</h1>
        <div className="flex items-center gap-3 text-sm text-muted mb-4">
          <span>{story.authorName}</span>
          <span>·</span>
          <span>{story.authorUniversity} {story.authorGradYear}</span>
          <span>·</span>
          <span>{formatDate(story.publishedDate, locale)}</span>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {story.tags.map(tag => (
            <Badge key={tag} variant="default">{tag}</Badge>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="space-y-4">
        {paragraphs.map((paragraph, i) => (
          <p key={i} className="text-foreground leading-relaxed">{paragraph}</p>
        ))}
      </div>

      {/* Back */}
      <div className="mt-12 pt-8 border-t border-border">
        <Link href={`/${locale}/reentry/stories`} className="text-primary-600 font-medium hover:text-primary-700">
          ← {t('backToStories')}
        </Link>
      </div>
    </div>
  );
}
