import type { Metadata } from 'next';
import Link from 'next/link';
import { getLocale, getTranslations } from 'next-intl/server';
import { ResourceArticle } from '@/types/resource';
import Card from '@/components/ui/Card';
import { formatDate } from '@/lib/utils/date';

export const metadata: Metadata = {
  title: 'Re-entry Guides 回国指南',
  description: 'Reverse culture shock, job hunting, shipping belongings, and more — practical guides for returning to China. 逆向文化冲击、求职、运送行李等实用指南。',
};

async function getReentryArticles(locale: string): Promise<ResourceArticle[]> {
  const data = locale === 'zh'
    ? await import('@/data/resources/reentry.zh.json')
    : await import('@/data/resources/reentry.en.json');
  return data.default as ResourceArticle[];
}

export default async function ReentryResourcesPage() {
  const locale = await getLocale();
  const t = await getTranslations('reentry.resources');

  const articles = await getReentryArticles(locale);

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <div className="mb-6 text-sm text-muted">
        <Link href={`/${locale}/reentry`} className="hover:text-foreground">
          ← {t('backToReentry')}
        </Link>
      </div>

      <div className="mb-10">
        <h1 className="text-3xl font-bold mb-2">{t('title')}</h1>
        <p className="text-muted">{t('subtitle')}</p>
      </div>

      <div className="space-y-4">
        {articles.map(article => (
          <Link key={article.slug} href={`/${locale}/reentry/resources/${article.slug}`}>
            <Card hover className="mb-4">
              <h2 className="text-xl font-semibold mb-2">{article.title}</h2>
              <p className="text-sm text-muted mb-2">{article.summary}</p>
              <p className="text-xs text-muted">
                {t('lastUpdated')}: {formatDate(article.lastUpdated, locale)}
              </p>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
