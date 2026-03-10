import type { Metadata } from 'next';
import Link from 'next/link';
import { getLocale, getTranslations } from 'next-intl/server';
import { getCategories } from '@/lib/data/resources';
import { getUpcomingEvents } from '@/lib/data/events';
import ResourceCard from '@/components/resources/ResourceCard';
import EventCard from '@/components/community/EventCard';
import Card from '@/components/ui/Card';

export const metadata: Metadata = {
  title: 'Welcome Hub 欢迎之家 — Resources for Chinese International Students',
  description: 'Practical arrival guides, community events, and peer connections for Chinese international students in the US. 为来美国的中国留学生提供实用资源和温暖社区。',
};

// Server component — no client JS shipped for the landing page
export default async function HomePage() {
  const locale = await getLocale();
  const t = await getTranslations('home');
  const tConnect = await getTranslations('connect');

  // Show first 6 categories on the landing page
  const categories = getCategories().slice(0, 6);
  const upcomingEvents = getUpcomingEvents(3);

  return (
    <div>
      {/* Hero */}
      <section className="pt-20 pb-24 md:pt-28 md:pb-32">
        <div className="max-w-6xl mx-auto px-4">
          <div className="max-w-2xl animate-fade-up">
            <h1 className="text-4xl md:text-5xl lg:text-[3.75rem] text-foreground mb-6 leading-[1.12]">
              {t('hero.title')}
            </h1>
            <p className="text-lg text-muted mb-10 leading-relaxed max-w-lg">
              {t('hero.subtitle')}
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href={`/${locale}/checklist`}
                className="px-7 py-3 bg-foreground text-background rounded-lg text-sm font-semibold hover:bg-foreground/85 transition-colors"
              >
                {t('hero.cta')}
              </Link>
              <Link
                href={`/${locale}/resources`}
                className="px-7 py-3 text-foreground rounded-lg text-sm font-semibold hover:bg-warm-100 transition-colors border border-border"
              >
                {t('hero.ctaSecondary')}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Resources */}
      <section className="border-t border-border">
        <div className="max-w-6xl mx-auto px-4 py-20 md:py-24">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="text-3xl md:text-4xl mb-2">{t('resources.title')}</h2>
              <p className="text-muted">{t('resources.subtitle')}</p>
            </div>
            <Link
              href={`/${locale}/resources`}
              className="hidden sm:inline-flex text-sm text-primary-600 font-medium hover:text-primary-700 items-center gap-1 flex-shrink-0 pb-1"
            >
              {t('resources.viewAll')} &rarr;
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 stagger">
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
          <div className="sm:hidden mt-8">
            <Link
              href={`/${locale}/resources`}
              className="text-sm text-primary-600 font-medium hover:text-primary-700"
            >
              {t('resources.viewAll')} &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* Connect */}
      <section className="bg-sage-50/50 border-t border-border">
        <div className="max-w-6xl mx-auto px-4 py-20 md:py-24">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-10 items-start">
            <div className="md:col-span-2">
              <h2 className="text-3xl md:text-4xl mb-3">{tConnect('title')}</h2>
              <p className="text-muted leading-relaxed">{tConnect('subtitle')}</p>
            </div>
            <div className="md:col-span-3 space-y-4">
              <Link href={`/${locale}/connect`} className="block group">
                <Card hover className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary-100 flex items-center justify-center text-lg flex-shrink-0 group-hover:bg-primary-200 transition-colors" aria-hidden="true">
                    🤝
                  </div>
                  <div>
                    <h3 className="font-semibold text-[15px] mb-0.5">{tConnect('features.findPeers.title')}</h3>
                    <p className="text-sm text-muted leading-relaxed">{tConnect('features.findPeers.description')}</p>
                  </div>
                </Card>
              </Link>
              <Link href={`/${locale}/groups`} className="block group">
                <Card hover className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-sage-100 flex items-center justify-center text-lg flex-shrink-0 group-hover:bg-sage-200 transition-colors" aria-hidden="true">
                    👥
                  </div>
                  <div>
                    <h3 className="font-semibold text-[15px] mb-0.5">{tConnect('features.smallGroups.title')}</h3>
                    <p className="text-sm text-muted leading-relaxed">{tConnect('features.smallGroups.description')}</p>
                  </div>
                </Card>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Events */}
      <section className="border-t border-border">
        <div className="max-w-6xl mx-auto px-4 py-20 md:py-24">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="text-3xl md:text-4xl mb-2">{t('events.title')}</h2>
              <p className="text-muted">{t('events.subtitle')}</p>
            </div>
            {upcomingEvents.length > 0 && (
              <Link
                href={`/${locale}/community`}
                className="hidden sm:inline-flex text-sm text-primary-600 font-medium hover:text-primary-700 items-center gap-1 flex-shrink-0 pb-1"
              >
                {t('events.viewAll')} &rarr;
              </Link>
            )}
          </div>
          {upcomingEvents.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 stagger">
                {upcomingEvents.map(event => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
              <div className="sm:hidden mt-8">
                <Link
                  href={`/${locale}/community`}
                  className="text-sm text-primary-600 font-medium hover:text-primary-700"
                >
                  {t('events.viewAll')} &rarr;
                </Link>
              </div>
            </>
          ) : (
            <p className="text-muted">{t('events.noEvents')}</p>
          )}
        </div>
      </section>
    </div>
  );
}
