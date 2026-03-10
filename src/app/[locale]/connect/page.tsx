'use client';

import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { useProfile } from '@/hooks/useProfile';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';

export default function ConnectPage() {
  const locale = useLocale();
  const t = useTranslations('connect');
  const { profile, hasProfile } = useProfile();

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="mb-10">
        <h1 className="text-3xl font-bold mb-2">{t('title')}</h1>
        <p className="text-muted">{t('subtitle')}</p>
      </div>

      {/* Profile status */}
      {hasProfile ? (
        <Card className="mb-8 bg-sage-50 border-sage-200">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-sage-200 text-sage-700 flex items-center justify-center text-xl font-bold">
                {profile!.name.charAt(0)}
              </div>
              <div>
                <p className="font-semibold">{profile!.name}</p>
                <p className="text-sm text-muted">{profile!.university} · {profile!.city}</p>
              </div>
            </div>
            <Link
              href={`/${locale}/connect/profile`}
              className="text-sm text-primary-600 hover:text-primary-700 font-medium"
            >
              {t('editProfile')} →
            </Link>
          </div>
        </Card>
      ) : (
        <Card className="mb-8 bg-primary-50 border-primary-200 text-center py-8">
          <h2 className="text-xl font-bold mb-2">{t('noProfile.title')}</h2>
          <p className="text-muted mb-4">{t('noProfile.subtitle')}</p>
          <Link
            href={`/${locale}/connect/profile`}
            className="inline-block px-6 py-3 bg-primary-500 text-white rounded-xl font-semibold hover:bg-primary-600 transition-colors"
          >
            {t('noProfile.cta')}
          </Link>
        </Card>
      )}

      {/* Feature cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Link href={`/${locale}/connect/browse`}>
          <Card hover className="h-full">
            <div className="text-3xl mb-3" aria-hidden="true">🤝</div>
            <h3 className="font-semibold text-lg mb-2">{t('features.findPeers.title')}</h3>
            <p className="text-sm text-muted">{t('features.findPeers.description')}</p>
            {hasProfile && (
              <Badge variant="sage" className="mt-3">{t('features.findPeers.matchEnabled')}</Badge>
            )}
          </Card>
        </Link>

        <Link href={`/${locale}/groups`}>
          <Card hover className="h-full">
            <div className="text-3xl mb-3" aria-hidden="true">👥</div>
            <h3 className="font-semibold text-lg mb-2">{t('features.smallGroups.title')}</h3>
            <p className="text-sm text-muted">{t('features.smallGroups.description')}</p>
          </Card>
        </Link>
      </div>
    </div>
  );
}
