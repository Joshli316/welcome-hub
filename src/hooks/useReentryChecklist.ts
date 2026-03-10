'use client';

import { useCallback } from 'react';
import { ChecklistState } from '@/types/checklist';
import { useLocalStorage } from './useLocalStorage';

export function useReentryChecklist() {
  const [state, setState] = useLocalStorage<ChecklistState>('welcome-hub:reentry-checklist', {});

  const toggle = useCallback((itemId: string) => {
    setState({ ...state, [itemId]: !state[itemId] });
  }, [state, setState]);

  const isChecked = useCallback((itemId: string): boolean => {
    return !!state[itemId];
  }, [state]);

  const completedCount = Object.values(state).filter(Boolean).length;

  const resetAll = useCallback(() => {
    setState({});
  }, [setState]);

  return { isChecked, toggle, completedCount, resetAll };
}
