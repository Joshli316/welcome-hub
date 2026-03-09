'use client';

import { useState, useCallback } from 'react';
import { MyProfile } from '@/types/peer';

const STORAGE_KEY = 'welcome-hub-profile';

function loadProfile(): MyProfile | null {
  if (typeof window === 'undefined') return null;
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch {
      return null;
    }
  }
  return null;
}

function saveProfile(profile: MyProfile | null) {
  if (profile) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
  } else {
    localStorage.removeItem(STORAGE_KEY);
  }
}

export function useProfile() {
  const [profile, setProfile] = useState<MyProfile | null>(loadProfile);

  const updateProfile = useCallback((newProfile: MyProfile) => {
    setProfile(newProfile);
    saveProfile(newProfile);
  }, []);

  const clearProfile = useCallback(() => {
    setProfile(null);
    saveProfile(null);
  }, []);

  return { profile, updateProfile, clearProfile, hasProfile: profile !== null };
}
