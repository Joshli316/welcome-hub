import type { Metadata } from 'next';
import { useTranslations } from 'next-intl';
import Card from '@/components/ui/Card';

export const metadata: Metadata = {
  title: 'About Us 关于我们',
  description: 'We are neighbors who welcome international students with practical help and genuine community.',
};

export default function AboutPage() {
  const t = useTranslations('about');

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-10">{t('title')}</h1>

      {/* Mission */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">{t('mission.title')}</h2>
        <p className="text-lg text-muted leading-relaxed">{t('mission.text')}</p>
      </section>

      {/* Values */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">{t('values.title')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <div className="text-3xl mb-3" aria-hidden="true">🏡</div>
            <h3 className="font-semibold text-lg mb-2">{t('values.neighbor.title')}</h3>
            <p className="text-sm text-muted">{t('values.neighbor.text')}</p>
          </Card>
          <Card>
            <div className="text-3xl mb-3" aria-hidden="true">🤝</div>
            <h3 className="font-semibold text-lg mb-2">{t('values.practical.title')}</h3>
            <p className="text-sm text-muted">{t('values.practical.text')}</p>
          </Card>
          <Card>
            <div className="text-3xl mb-3" aria-hidden="true">❤️</div>
            <h3 className="font-semibold text-lg mb-2">{t('values.community.title')}</h3>
            <p className="text-sm text-muted">{t('values.community.text')}</p>
          </Card>
        </div>
      </section>

      {/* Team */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">{t('team.title')}</h2>
        <p className="text-muted leading-relaxed">{t('team.text')}</p>
      </section>

      {/* Contact */}
      <section>
        <h2 className="text-2xl font-bold mb-4">{t('contact.title')}</h2>
        <Card>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="text-lg" aria-hidden="true">📧</span>
              <div>
                <span className="text-sm font-medium text-muted">{t('contact.email')}: </span>
                {/* TODO: Replace with real email address */}
                <a href="mailto:welcome@example.com" className="text-primary-600 hover:text-primary-700">
                  welcome@example.com
                </a>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-lg" aria-hidden="true">💬</span>
              <div>
                <span className="text-sm font-medium text-muted">{t('contact.wechat')}: </span>
                {/* TODO: Replace with real WeChat ID */}
                <span>WelcomeHub2026</span>
              </div>
            </div>
          </div>
        </Card>
      </section>
    </div>
  );
}
