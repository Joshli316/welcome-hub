import type { Metadata } from 'next';
import { useTranslations } from 'next-intl';
import { getFaithArticles } from '@/lib/data/faith';
import FaithArticleCard from '@/components/faith/FaithArticleCard';

export const metadata: Metadata = {
  title: 'Articles & Guides 文章与指南',
  description: 'Practical wisdom for living out your faith in China\'s workplace and culture. 在中国职场和文化中活出信仰的实用智慧。',
};

// Lists all faith & work articles
export default function FaithArticlesPage() {
  const t = useTranslations('faith');
  const articles = getFaithArticles();

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="mb-10">
        <h1 className="text-3xl font-bold mb-2">{t('features.articles.title')}</h1>
        <p className="text-muted">{t('features.articles.description')}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {articles.map(article => (
          <FaithArticleCard key={article.slug} article={article} />
        ))}
      </div>
    </div>
  );
}
