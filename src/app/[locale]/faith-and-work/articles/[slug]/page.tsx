import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getLocale, getTranslations } from 'next-intl/server';
import { getFaithArticleBySlug, getFaithArticles } from '@/lib/data/faith';
import ArticleRenderer from '@/components/resources/ArticleRenderer';
import FaithArticleCard from '@/components/faith/FaithArticleCard';
import { formatDate } from '@/lib/utils/date';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const locale = await getLocale();
  const article = getFaithArticleBySlug(slug);
  if (!article) return {};
  return {
    title: locale === 'zh' ? article.titleZh : article.title,
  };
}

// Detail page for a single faith article — reuses ArticleRenderer from Phase 1
export default async function FaithArticleDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const locale = await getLocale();
  const t = await getTranslations('faith');

  const article = getFaithArticleBySlug(slug);
  if (!article) notFound();

  const title = locale === 'zh' ? article.titleZh : article.title;
  const content = locale === 'zh' ? article.contentZh : article.content;

  // Find related articles if any
  const relatedArticles = (article.relatedSlugs ?? [])
    .map(s => getFaithArticleBySlug(s))
    .filter(Boolean);

  // Also look for articles that reference this one
  const allArticles = getFaithArticles();
  const backlinks = allArticles.filter(
    a => a.slug !== slug && a.relatedSlugs?.includes(slug)
  );
  const combined = [...relatedArticles, ...backlinks].filter(
    (a, i, arr) => a && arr.findIndex(b => b?.slug === a?.slug) === i
  );

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      {/* Breadcrumb */}
      <div className="mb-6 text-sm text-muted">
        <Link href={`/${locale}/faith-and-work`} className="hover:text-foreground">
          {t('title')}
        </Link>
        <span className="mx-2">→</span>
        <Link href={`/${locale}/faith-and-work/articles`} className="hover:text-foreground">
          {t('features.articles.title')}
        </Link>
      </div>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-3">{title}</h1>
        <span className="text-sm text-muted">{t('lastUpdated')}: {formatDate(article.lastUpdated, locale)}</span>
      </div>

      {/* Article content — rendered using existing ArticleRenderer */}
      <ArticleRenderer content={content} />

      {/* Related articles */}
      {combined.length > 0 && (
        <div className="mt-12 pt-8 border-t border-border">
          <h2 className="text-xl font-bold mb-4">{t('relatedArticles')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {combined.map(a => a && (
              <FaithArticleCard key={a.slug} article={a} />
            ))}
          </div>
        </div>
      )}

      {/* Back */}
      <div className="mt-12 pt-8 border-t border-border">
        <Link href={`/${locale}/faith-and-work/articles`} className="text-primary-600 font-medium hover:text-primary-700">
          ← {t('backToArticles')}
        </Link>
      </div>
    </div>
  );
}
