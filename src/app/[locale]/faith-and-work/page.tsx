import type { Metadata } from 'next';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { getTestimonies } from '@/lib/data/faith';
import Card from '@/components/ui/Card';
import TestimonyCard from '@/components/faith/TestimonyCard';
import PageHeader from '@/components/ui/PageHeader';

export const metadata: Metadata = {
  title: 'Faith & Work 信仰与职场',
  description: 'Articles, testimonies, discussion topics, and city guides for integrating faith with professional life after returning to China.',
};

// Faith & Work hub — entry point for Phase 4 features
export default function FaithAndWorkPage() {
  const locale = useLocale();
  const t = useTranslations('faith');
  const latestTestimonies = getTestimonies().slice(0, 2);

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <PageHeader title={t('title')} subtitle={t('subtitle')} large />

      {/* Feature cards — 4 sections of faith & work */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
        <Link href={`/${locale}/faith-and-work/articles`}>
          <Card hover className="h-full text-center py-6">
            <div className="text-3xl mb-2" aria-hidden="true">📖</div>
            <h3 className="font-semibold mb-1">{t('features.articles.title')}</h3>
            <p className="text-sm text-muted">{t('features.articles.description')}</p>
          </Card>
        </Link>
        <Link href={`/${locale}/faith-and-work/testimonies`}>
          <Card hover className="h-full text-center py-6">
            <div className="text-3xl mb-2" aria-hidden="true">💬</div>
            <h3 className="font-semibold mb-1">{t('features.testimonies.title')}</h3>
            <p className="text-sm text-muted">{t('features.testimonies.description')}</p>
          </Card>
        </Link>
        <Link href={`/${locale}/faith-and-work/discussions`}>
          <Card hover className="h-full text-center py-6">
            <div className="text-3xl mb-2" aria-hidden="true">🗣️</div>
            <h3 className="font-semibold mb-1">{t('features.discussions.title')}</h3>
            <p className="text-sm text-muted">{t('features.discussions.description')}</p>
          </Card>
        </Link>
        <Link href={`/${locale}/faith-and-work/city-guide`}>
          <Card hover className="h-full text-center py-6">
            <div className="text-3xl mb-2" aria-hidden="true">🗺️</div>
            <h3 className="font-semibold mb-1">{t('features.cityGuide.title')}</h3>
            <p className="text-sm text-muted">{t('features.cityGuide.description')}</p>
          </Card>
        </Link>
      </div>

      {/* Latest testimonies preview */}
      {latestTestimonies.length > 0 && (
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">{t('latestTestimonies')}</h2>
            <Link href={`/${locale}/faith-and-work/testimonies`} className="text-primary-600 text-sm font-medium hover:text-primary-700">
              {t('viewAllTestimonies')} →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {latestTestimonies.map(testimony => (
              <TestimonyCard key={testimony.id} testimony={testimony} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
