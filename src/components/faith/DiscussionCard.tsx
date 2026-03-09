import Link from 'next/link';
import { DiscussionTopic } from '@/types/faith';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import { useLocale, useTranslations } from 'next-intl';

interface DiscussionCardProps {
  discussion: DiscussionTopic;
}

// Shows a discussion topic card with a preview of questions
export default function DiscussionCard({ discussion }: DiscussionCardProps) {
  const locale = useLocale();
  const t = useTranslations('faith');
  const title = locale === 'zh' ? discussion.titleZh : discussion.title;
  const description = locale === 'zh' ? discussion.descriptionZh : discussion.description;
  const questions = locale === 'zh' ? discussion.questionsZh : discussion.questions;

  return (
    <Card className="h-full flex flex-col">
      <div className="flex items-center gap-2 mb-3">
        <Badge variant="sky">{discussion.category}</Badge>
      </div>
      <h3 className="font-semibold text-lg mb-2">{title}</h3>
      <p className="text-sm text-muted mb-4">{description}</p>
      <div className="space-y-2 mb-4 flex-1">
        {questions.slice(0, 2).map((q, i) => (
          <p key={i} className="text-sm text-foreground pl-3 border-l-2 border-primary-200">
            {q}
          </p>
        ))}
        {questions.length > 2 && (
          <p className="text-xs text-muted pl-3">
            +{questions.length - 2} {t('moreQuestions')}
          </p>
        )}
      </div>
      {discussion.relatedArticleSlug && (
        <Link
          href={`/${locale}/faith-and-work/articles/${discussion.relatedArticleSlug}`}
          className="text-sm text-primary-600 font-medium hover:text-primary-700"
        >
          {t('relatedArticle')} →
        </Link>
      )}
    </Card>
  );
}
