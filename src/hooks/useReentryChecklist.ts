'use client';

import { useState, useCallback } from 'react';
import { ChecklistState } from '@/types/checklist';

const STORAGE_KEY = 'welcome-hub-reentry-checklist';

function loadFromStorage(): ChecklistState {
  if (typeof window === 'undefined') return {};
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch {
      return {};
    }
  }
  return {};
}

function saveToStorage(state: ChecklistState) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export function useReentryChecklist() {
  const [state, setState] = useState<ChecklistState>(loadFromStorage);

  const toggle = useCallback((itemId: string) => {
    setState(prev => {
      const next = { ...prev, [itemId]: !prev[itemId] };
      saveToStorage(next);
      return next;
    });
  }, []);

  const isChecked = useCallback((itemId: string): boolean => {
    return !!state[itemId];
  }, [state]);

  const completedCount = Object.values(state).filter(Boolean).length;

  const resetAll = useCallback(() => {
    setState({});
    saveToStorage({});
  }, []);

  return { isChecked, toggle, completedCount, resetAll };
}
