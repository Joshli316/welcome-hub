'use client';

import { useCallback } from 'react';
import { MyProfile } from '@/types/peer';
import { useLocalStorage } from './useLocalStorage';

export function useProfile() {
  const [profile, setProfile] = useLocalStorage<MyProfile | null>('welcome-hub:profile', null);

  const updateProfile = useCallback((newProfile: MyProfile) => {
    setProfile(newProfile);
  }, [setProfile]);

  const clearProfile = useCallback(() => {
    setProfile(null);
  }, [setProfile]);

  return { profile, updateProfile, clearProfile, hasProfile: profile !== null };
}
