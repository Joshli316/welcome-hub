'use client';

import { useCallback } from 'react';
import { ChecklistState } from '@/types/checklist';
import { useLocalStorage } from './useLocalStorage';

export function useChecklist(storageKey = 'welcome-hub:checklist') {
  const [state, setState] = useLocalStorage<ChecklistState>(storageKey, {});

  const toggle = useCallback((itemId: string) => {
    setState(prev => ({ ...prev, [itemId]: !prev[itemId] }));
  }, [setState]);

  const isChecked = useCallback((itemId: string): boolean => {
    return !!state[itemId];
  }, [state]);

  const completedCount = Object.values(state).filter(Boolean).length;

  const resetAll = useCallback(() => {
    setState({});
  }, [setState]);

  return { isChecked, toggle, completedCount, resetAll };
}
