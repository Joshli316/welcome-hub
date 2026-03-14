import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getLocale, getTranslations } from 'next-intl/server';
import { ResourceArticle } from '@/types/resource';
import ArticleRenderer from '@/components/resources/ArticleRenderer';
import Card from '@/components/ui/Card';
import { formatDate } from '@/lib/utils/date';

async function getReentryArticles(locale: string): Promise<ResourceArticle[]> {
  const data = locale === 'zh'
    ? await import('@/data/resources/reentry.zh.json')
    : await import('@/data/resources/reentry.en.json');
  return data.default as ResourceArticle[];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const locale = await getLocale();
  const articles = await getReentryArticles(locale);
  const article = articles.find(a => a.slug === slug);
  if (!article) return {};
  return {
    title: article.title,
    description: article.summary,
  };
}

export default async function ReentryArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const locale = await getLocale();
  const t = await getTranslations('reentry.resources');

  const articles = await getReentryArticles(locale);
  const article = articles.find(a => a.slug === slug);
  if (!article) notFound();

  const relatedArticles = article.relatedSlugs
    ? articles.filter(a => article.relatedSlugs?.includes(a.slug))
    : [];

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <div className="mb-6 text-sm text-muted">
        <Link href={`/${locale}/reentry`} className="hover:text-foreground">
          {t('backToReentry')}
        </Link>
        <span className="mx-2">→</span>
        <Link href={`/${locale}/reentry/resources`} className="hover:text-foreground">
          {t('title')}
        </Link>
        <span className="mx-2">→</span>
        <span>{article.title}</span>
      </div>

      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-3">{article.title}</h1>
        <p className="text-muted mb-2">{article.summary}</p>
        <p className="text-xs text-muted">
          {t('lastUpdated')}: {formatDate(article.lastUpdated, locale)}
        </p>
      </div>

      <ArticleRenderer content={article.content} />

      {relatedArticles.length > 0 && (
        <div className="mt-12 pt-8 border-t border-border">
          <h2 className="text-xl font-bold mb-4">{t('relatedGuides')}</h2>
          <div className="space-y-3">
            {relatedArticles.map(related => (
              <Link key={related.slug} href={`/${locale}/reentry/resources/${related.slug}`}>
                <Card hover className="mb-3">
                  <h3 className="font-semibold">{related.title}</h3>
                  <p className="text-sm text-muted">{related.summary}</p>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      )}

      <div className="mt-8">
        <Link href={`/${locale}/reentry/resources`} className="text-primary-600 font-medium hover:text-primary-700">
          ← {t('backToResources')}
        </Link>
      </div>
    </div>
  );
}
