import Link from 'next/link';
import { FaithArticle } from '@/types/faith';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import { formatDate } from '@/lib/utils/date';
import { useLocale } from 'next-intl';

interface FaithArticleCardProps {
  article: FaithArticle;
}

// Displays a card linking to a faith article
export default function FaithArticleCard({ article }: FaithArticleCardProps) {
  const locale = useLocale();
  const title = locale === 'zh' ? article.titleZh : article.title;
  const summary = locale === 'zh' ? article.summaryZh : article.summary;

  return (
    <Link href={`/${locale}/faith-and-work/articles/${article.slug}`}>
      <Card hover className="h-full flex flex-col">
        <Badge variant="primary" className="self-start mb-3">{article.category}</Badge>
        <h3 className="font-semibold text-lg mb-2">{title}</h3>
        <p className="text-sm text-muted mb-3 flex-1">{summary}</p>
        <span className="text-xs text-muted">{formatDate(article.lastUpdated, locale)}</span>
      </Card>
    </Link>
  );
}
