import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { getCategories } from '@/lib/data/resources';
import { getUpcomingEvents } from '@/lib/data/events';
import ResourceCard from '@/components/resources/ResourceCard';
import EventCard from '@/components/community/EventCard';
import Card from '@/components/ui/Card';

export default function HomePage() {
  const locale = useLocale();
  const t = useTranslations('home');
  const tConnect = useTranslations('connect');

  // Show first 6 categories on the landing page
  const categories = getCategories().slice(0, 6);
  const upcomingEvents = getUpcomingEvents(3);

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 via-warm-50 to-sage-50 py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            {t('hero.title')}
          </h1>
          <p className="text-lg md:text-xl text-muted max-w-2xl mx-auto mb-8">
            {t('hero.subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href={`/${locale}/checklist`}
              className="px-6 py-3 bg-primary-500 text-white rounded-xl font-semibold hover:bg-primary-600 transition-colors shadow-md"
            >
              {t('hero.cta')}
            </Link>
            <Link
              href={`/${locale}/resources`}
              className="px-6 py-3 bg-white text-primary-700 rounded-xl font-semibold hover:bg-warm-50 transition-colors border border-primary-200"
            >
              {t('hero.ctaSecondary')}
            </Link>
          </div>
        </div>
      </section>

      {/* Resource Categories */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">{t('resources.title')}</h2>
          <p className="text-muted">{t('resources.subtitle')}</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map(cat => (
            <ResourceCard
              key={cat.id}
              categoryId={cat.id}
              icon={cat.icon}
              titleKey={cat.titleKey}
              descriptionKey={cat.descriptionKey}
            />
          ))}
        </div>
        <div className="text-center mt-8">
          <Link
            href={`/${locale}/resources`}
            className="text-primary-600 font-medium hover:text-primary-700"
          >
            {t('resources.viewAll')} →
          </Link>
        </div>
      </section>

      {/* Find Peers & Groups */}
      <section className="bg-sage-50 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold mb-2">{tConnect('title')}</h2>
            <p className="text-muted">{tConnect('subtitle')}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto">
            <Link href={`/${locale}/connect`}>
              <Card hover className="h-full text-center py-8">
                <div className="text-4xl mb-3">🤝</div>
                <h3 className="font-semibold text-lg mb-2">{tConnect('features.findPeers.title')}</h3>
                <p className="text-sm text-muted">{tConnect('features.findPeers.description')}</p>
              </Card>
            </Link>
            <Link href={`/${locale}/groups`}>
              <Card hover className="h-full text-center py-8">
                <div className="text-4xl mb-3">👥</div>
                <h3 className="font-semibold text-lg mb-2">{tConnect('features.smallGroups.title')}</h3>
                <p className="text-sm text-muted">{tConnect('features.smallGroups.description')}</p>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="bg-warm-50 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold mb-2">{t('events.title')}</h2>
            <p className="text-muted">{t('events.subtitle')}</p>
          </div>
          {upcomingEvents.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {upcomingEvents.map(event => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
              <div className="text-center mt-8">
                <Link
                  href={`/${locale}/community`}
                  className="text-primary-600 font-medium hover:text-primary-700"
                >
                  {t('events.viewAll')} →
                </Link>
              </div>
            </>
          ) : (
            <p className="text-center text-muted">{t('events.noEvents')}</p>
          )}
        </div>
      </section>
    </div>
  );
}
