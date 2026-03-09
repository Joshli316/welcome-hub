'use client';

import { useRouter } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { useProfile } from '@/hooks/useProfile';
import { MyProfile } from '@/types/peer';
import ProfileForm from '@/components/connect/ProfileForm';
import Card from '@/components/ui/Card';

export default function ProfilePage() {
  const locale = useLocale();
  const router = useRouter();
  const t = useTranslations('connect.profile');
  const { profile, updateProfile, clearProfile, hasProfile } = useProfile();

  function handleSubmit(newProfile: MyProfile) {
    updateProfile(newProfile);
    router.push(`/${locale}/connect/browse`);
  }

  function handleDelete() {
    if (window.confirm(t('deleteConfirm'))) {
      clearProfile();
      router.push(`/${locale}/connect`);
    }
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">
          {hasProfile ? t('editTitle') : t('createTitle')}
        </h1>
        <p className="text-muted">{t('formSubtitle')}</p>
      </div>

      <Card>
        <ProfileForm initialProfile={profile} onSubmit={handleSubmit} />
      </Card>

      {hasProfile && (
        <div className="text-center mt-6">
          <button
            onClick={handleDelete}
            className="text-sm text-muted hover:text-red-500 transition-colors"
          >
            {t('deleteProfile')}
          </button>
        </div>
      )}
    </div>
  );
}
