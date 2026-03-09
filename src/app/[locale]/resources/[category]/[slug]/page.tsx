import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getLocale, getTranslations } from 'next-intl/server';
import { getCategoryById, getArticle, getArticlesByCategory } from '@/lib/data/resources';
import ArticleRenderer from '@/components/resources/ArticleRenderer';
import Card from '@/components/ui/Card';
import { formatDate } from '@/lib/utils/date';

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}) {
  const { category, slug } = await params;
  const locale = await getLocale();
  const t = await getTranslations('resources');
  const tCat = await getTranslations('categories');

  const cat = getCategoryById(category);
  if (!cat) notFound();

  const article = await getArticle(category, slug, locale);
  if (!article) notFound();

  // Load related articles
  const allArticles = await getArticlesByCategory(category, locale);
  const relatedArticles = article.relatedSlugs
    ? allArticles.filter(a => article.relatedSlugs?.includes(a.slug))
    : [];

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      {/* Breadcrumb */}
      <div className="mb-6 text-sm text-muted">
        <Link href={`/${locale}/resources`} className="hover:text-foreground">
          {t('backToAll')}
        </Link>
        <span className="mx-2">→</span>
        <Link href={`/${locale}/resources/${category}`} className="hover:text-foreground">
          {tCat(cat.titleKey)}
        </Link>
        <span className="mx-2">→</span>
        <span>{article.title}</span>
      </div>

      {/* Article header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-3">{article.title}</h1>
        <p className="text-muted mb-2">{article.summary}</p>
        <p className="text-xs text-muted">
          {t('lastUpdated')}: {formatDate(article.lastUpdated, locale)}
        </p>
      </div>

      {/* Article content */}
      <ArticleRenderer content={article.content} />

      {/* Related guides */}
      {relatedArticles.length > 0 && (
        <div className="mt-12 pt-8 border-t border-border">
          <h2 className="text-xl font-bold mb-4">{t('relatedGuides')}</h2>
          <div className="space-y-3">
            {relatedArticles.map(related => (
              <Link key={related.slug} href={`/${locale}/resources/${category}/${related.slug}`}>
                <Card hover className="mb-3">
                  <h3 className="font-semibold">{related.title}</h3>
                  <p className="text-sm text-muted">{related.summary}</p>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Back link */}
      <div className="mt-8">
        <Link
          href={`/${locale}/resources/${category}`}
          className="text-primary-600 font-medium hover:text-primary-700"
        >
          ← {t('backToCategory')}
        </Link>
      </div>
    </div>
  );
}
