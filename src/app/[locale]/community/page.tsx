import type { Metadata } from 'next';
import { useTranslations } from 'next-intl';
import { getEvents } from '@/lib/data/events';
import { getHosts, getUniqueCities, getUniqueServices } from '@/lib/data/hosts';
import EventList from '@/components/community/EventList';
import HostGrid from '@/components/community/HostGrid';
import WeChatGroupCard from '@/components/community/WeChatGroupCard';
import Card from '@/components/ui/Card';
import PageHeader from '@/components/ui/PageHeader';

export const metadata: Metadata = {
  title: 'Community 社区连接',
  description: 'Upcoming events, volunteer hosts, and WeChat groups for Chinese international students. Meet neighbors who care.',
};

export default function CommunityPage() {
  const t = useTranslations('community');
  const events = getEvents();
  const hosts = getHosts();
  const cities = getUniqueCities();
  const services = getUniqueServices();

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <PageHeader title={t('title')} subtitle={t('subtitle')} />

      {/* Events */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-6">{t('events.title')}</h2>
        <EventList events={events} />
      </section>

      {/* Volunteer Hosts */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-2">{t('hosts.title')}</h2>
        <p className="text-muted mb-6">{t('hosts.subtitle')}</p>
        <HostGrid hosts={hosts} cities={cities} services={services} />
      </section>

      {/* WeChat Groups */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-2">{t('wechat.title')}</h2>
        <p className="text-muted mb-6">{t('wechat.subtitle')}</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <WeChatGroupCard
            name="Springfield 留学生群"
            description="Springfield 地区中国留学生交流群"
          />
          <WeChatGroupCard
            name="Riverside 新生群"
            description="Riverside 地区新生互助群"
          />
          <WeChatGroupCard
            name="全美新生交流群"
            description="不限地区，欢迎所有新生加入"
          />
        </div>
      </section>

      {/* Ask a Question */}
      <section>
        <Card className="text-center py-10 bg-warm-50">
          <h2 className="text-2xl font-bold mb-2">{t('askQuestion.title')}</h2>
          <p className="text-muted mb-6">{t('askQuestion.subtitle')}</p>
          <a
            href="https://forms.gle/example" // TODO: Replace with real Google Form URL
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-6 py-3 bg-primary-500 text-white rounded-xl font-semibold hover:bg-primary-600 transition-colors"
          >
            {t('askQuestion.button')}
          </a>
        </Card>
      </section>
    </div>
  );
}
