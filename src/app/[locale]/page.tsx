import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { getLocale, getTranslations } from 'next-intl/server';
import { getCategories } from '@/lib/data/resources';
import { getUpcomingEvents } from '@/lib/data/events';
import ResourceCard from '@/components/resources/ResourceCard';
import EventCard from '@/components/community/EventCard';
import Card from '@/components/ui/Card';

export const metadata: Metadata = {
  title: 'Companion 与你同行 — Resources for Chinese International Students',
  description: 'Practical arrival guides, community events, and peer connections for Chinese international students in the US. 为来美国的中国留学生提供实用资源和温暖社区。',
};

export default async function HomePage() {
  const locale = await getLocale();
  const t = await getTranslations('home');
  const tConnect = await getTranslations('connect');

  const categories = getCategories().slice(0, 6);
  const upcomingEvents = getUpcomingEvents(3);

  return (
    <div>
      {/* ━━ Hero — dark cinematic section ━━ */}
      <section className="relative section-dark pt-20 pb-16 md:pt-28 md:pb-24 overflow-hidden">
        {/* Ambient light effects */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-gradient-to-b from-primary-500/15 via-amber-400/8 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-[10%] w-64 h-64 bg-primary-500/12 rounded-full blur-3xl animate-orbit" />
        <div className="absolute top-20 left-[5%] w-48 h-48 bg-amber-400/10 rounded-full blur-3xl animate-orbit" style={{ animationDelay: '5s' }} />

        <div className="relative max-w-7xl mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-14 items-center">
            <div className="lg:col-span-3 animate-fade-up">
              <div className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full glass-dark text-sm font-medium text-amber-200/90 mb-6 border border-white/10">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                {locale === 'zh' ? '为中国留学生打造' : 'Built for Chinese International Students'}
              </div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl mb-5 leading-[1.05] font-bold">
                <span className="text-gradient-light">{t('hero.title')}</span>
              </h1>
              <p className="text-xl md:text-2xl text-[#a8a29e] mb-8 leading-relaxed max-w-lg font-medium">
                {t('hero.subtitle')}
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href={`/${locale}/checklist`}
                  className="px-8 py-4 bg-gradient-to-r from-primary-500 to-amber-500 text-[#2a2520] rounded-xl text-lg font-bold shadow-glow-primary hover:shadow-luxury hover:-translate-y-0.5 transition-all duration-300"
                >
                  {t('hero.cta')}
                </Link>
                <Link
                  href={`/${locale}/resources`}
                  className="px-8 py-4 text-white/90 rounded-xl text-lg font-bold glass-dark hover:bg-white/10 hover:-translate-y-0.5 transition-all duration-300 border border-white/15"
                >
                  {t('hero.ctaSecondary')}
                </Link>
              </div>
            </div>

            {/* Hero image */}
            <div className="hidden lg:block lg:col-span-2 animate-fade-up" style={{ animationDelay: '150ms' }}>
              <div className="relative h-[440px] rounded-2xl overflow-hidden shadow-elevated ring-1 ring-white/10 img-hover">
                <Image
                  src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=700&q=80"
                  alt="International students laughing and hanging out together"
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 40vw"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2a2520]/50 via-transparent to-transparent" />
              </div>
            </div>
          </div>
        </div>

        {/* Gold line at bottom */}
        <div className="absolute bottom-0 left-0 right-0 gold-line" />
      </section>

      {/* ━━ Resources ━━ */}
      <section className="relative overflow-hidden">
        <div className="relative max-w-6xl mx-auto px-4 py-12 md:py-16">
          <div className="flex items-end justify-between mb-10">
            <div className="animate-fade-up">
              <h2 className="text-4xl md:text-5xl">{t('resources.title')}</h2>
              <p className="text-xl text-muted mt-3">{t('resources.subtitle')}</p>
            </div>
            <Link
              href={`/${locale}/resources`}
              className="hidden sm:inline-flex text-base text-primary-600 font-bold hover:text-primary-700 items-center gap-1.5 flex-shrink-0 pb-1 hover:gap-2.5 transition-all link-hover"
            >
              {t('resources.viewAll')} &rarr;
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 stagger">
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
              className="text-base text-primary-600 font-bold hover:text-primary-700"
            >
              {t('resources.viewAll')} &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* ━━ Campus banner — cinematic photo strip ━━ */}
      <section className="relative h-56 md:h-72 overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1564981797816-1043664bf78d?w=1400&q=80"
          alt="Beautiful university garden with lush greenery"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[#2a2520]/50" />
        <div className="absolute inset-0 bg-gradient-to-r from-dark-950/60 via-transparent to-dark-950/40" />
        <div className="relative h-full max-w-6xl mx-auto px-4 flex items-center">
          <p className="text-white text-3xl md:text-4xl font-bold drop-shadow-lg animate-fade-up max-w-lg leading-snug">
            {locale === 'zh' ? '你的美国新生活，从这里开始' : 'Your new chapter in America starts here'}
          </p>
        </div>
      </section>

      {/* ━━ Connect — light section for contrast ━━ */}
      <section className="relative overflow-hidden bg-gradient-to-b from-warm-50 to-background">
        <div className="absolute top-0 right-[10%] w-80 h-80 bg-primary-200/10 rounded-full blur-3xl animate-orbit" style={{ animationDelay: '4s' }} />
        <div className="absolute bottom-0 left-[5%] w-64 h-64 bg-amber-200/10 rounded-full blur-3xl" />

        <div className="relative max-w-6xl mx-auto px-4 pt-12 pb-6 md:pt-16 md:pb-8">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-12 items-start">
            <div className="md:col-span-2 animate-fade-up">
              <h2 className="text-4xl md:text-5xl mb-4">{tConnect('title')}</h2>
              <p className="text-xl text-muted leading-relaxed mb-6">{tConnect('subtitle')}</p>
              <div className="hidden md:block rounded-2xl overflow-hidden shadow-elevated img-hover">
                <Image
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&q=80"
                  alt="Students collaborating together"
                  width={600}
                  height={400}
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
            <div className="md:col-span-3 space-y-4 stagger">
              <Link href={`/${locale}/connect`} className="block group">
                <Card hover className="flex items-start gap-5">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary-100 to-amber-100 flex items-center justify-center text-2xl flex-shrink-0 group-hover:scale-110 transition-transform duration-300 shadow-sm" aria-hidden="true">
                    🤝
                  </div>
                  <div>
                    <h3 className="font-bold text-xl mb-1.5">{tConnect('features.findPeers.title')}</h3>
                    <p className="text-lg text-muted leading-relaxed">{tConnect('features.findPeers.description')}</p>
                  </div>
                </Card>
              </Link>
              <Link href={`/${locale}/groups`} className="block group">
                <Card hover className="flex items-start gap-5">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-sage-100 to-sage-200 flex items-center justify-center text-2xl flex-shrink-0 group-hover:scale-110 transition-transform duration-300 shadow-sm" aria-hidden="true">
                    👥
                  </div>
                  <div>
                    <h3 className="font-bold text-xl mb-1.5">{tConnect('features.smallGroups.title')}</h3>
                    <p className="text-lg text-muted leading-relaxed">{tConnect('features.smallGroups.description')}</p>
                  </div>
                </Card>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ━━ Events ━━ */}
      <section className="relative overflow-hidden">
        <div className="section-divider" />
        <div className="relative max-w-6xl mx-auto px-4 pt-8 pb-12 md:pt-10 md:pb-16">
          <div className="flex items-end justify-between mb-10">
            <div className="animate-fade-up">
              <h2 className="text-4xl md:text-5xl mb-3">{t('events.title')}</h2>
              <p className="text-xl text-muted">{t('events.subtitle')}</p>
            </div>
            {upcomingEvents.length > 0 && (
              <Link
                href={`/${locale}/community`}
                className="hidden sm:inline-flex text-base text-primary-600 font-bold hover:text-primary-700 items-center gap-1.5 flex-shrink-0 pb-1 hover:gap-2.5 transition-all link-hover"
              >
                {t('events.viewAll')} &rarr;
              </Link>
            )}
          </div>
          {upcomingEvents.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5 stagger">
                {upcomingEvents.map(event => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
              <div className="sm:hidden mt-8">
                <Link
                  href={`/${locale}/community`}
                  className="text-base text-primary-600 font-bold hover:text-primary-700"
                >
                  {t('events.viewAll')} &rarr;
                </Link>
              </div>
            </>
          ) : (
            <p className="text-lg text-muted">{t('events.noEvents')}</p>
          )}
        </div>
      </section>
    </div>
  );
}
