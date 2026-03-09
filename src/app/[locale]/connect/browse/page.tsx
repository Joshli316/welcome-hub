'use client';

import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { useProfile } from '@/hooks/useProfile';
import { getPeers, getUniquePeerCities, getUniquePeerUniversities } from '@/lib/data/peers';
import PeerGrid from '@/components/connect/PeerGrid';

export default function BrowsePeersPage() {
  const locale = useLocale();
  const t = useTranslations('connect.browse');
  const { profile } = useProfile();

  const peers = getPeers();
  const cities = getUniquePeerCities();
  const universities = getUniquePeerUniversities();

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">{t('title')}</h1>
        <p className="text-muted">{t('subtitle')}</p>
      </div>

      {/* Prompt to create profile if they haven't */}
      {!profile && (
        <div className="mb-6 p-4 rounded-xl bg-primary-50 border border-primary-200 flex items-center justify-between flex-wrap gap-3">
          <p className="text-sm text-primary-800">{t('profilePrompt')}</p>
          <Link
            href={`/${locale}/connect/profile`}
            className="text-sm font-medium text-primary-600 hover:text-primary-700"
          >
            {t('createProfile')} →
          </Link>
        </div>
      )}

      <PeerGrid
        peers={peers}
        myProfile={profile}
        cities={cities}
        universities={universities}
      />
    </div>
  );
}
