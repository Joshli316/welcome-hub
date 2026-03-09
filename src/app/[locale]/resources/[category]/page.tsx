import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getLocale, getTranslations } from 'next-intl/server';
import { getCategoryById, getArticlesByCategory } from '@/lib/data/resources';
import Card from '@/components/ui/Card';
import { formatDate } from '@/lib/utils/date';

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const locale = await getLocale();
  const t = await getTranslations('resources');
  const tCat = await getTranslations('categories');
  const tCommon = await getTranslations('common');

  const cat = getCategoryById(category);
  if (!cat) notFound();

  const articles = await getArticlesByCategory(category, locale);

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      {/* Breadcrumb */}
      <div className="mb-6 text-sm text-muted">
        <Link href={`/${locale}/resources`} className="hover:text-foreground">
          {t('backToAll')}
        </Link>
        <span className="mx-2">→</span>
        <span>{tCat(cat.titleKey)}</span>
      </div>

      <div className="mb-10">
        <div className="text-4xl mb-3">{cat.icon}</div>
        <h1 className="text-3xl font-bold mb-2">{tCat(cat.titleKey)}</h1>
        <p className="text-muted">{tCat(cat.descriptionKey)}</p>
      </div>

      {articles.length > 0 ? (
        <div className="space-y-4">
          {articles.map(article => (
            <Link key={article.slug} href={`/${locale}/resources/${category}/${article.slug}`}>
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
      ) : (
        <Card>
          <p className="text-muted text-center py-8">
            {tCommon('noContentYet')}
          </p>
        </Card>
      )}
    </div>
  );
}
