'use client';

import { useState, useCallback } from 'react';

/**
 * Generic localStorage hook. Handles SSR safety, JSON parsing, and
 * corrupted-data recovery automatically.
 *
 * Usage:
 *   const [value, setValue] = useLocalStorage<MyType>('key', defaultValue);
 */
export function useLocalStorage<T>(key: string, fallback: T) {
  const [value, setValue] = useState<T>(() => {
    // SSR guard — localStorage doesn't exist on the server
    if (typeof window === 'undefined') return fallback;
    const saved = localStorage.getItem(key);
    if (saved) {
      try {
        return JSON.parse(saved) as T;
      } catch {
        // Corrupted data — reset to fallback rather than crash
        return fallback;
      }
    }
    return fallback;
  });

  const set = useCallback((next: T) => {
    setValue(next);
    if (next === null || next === undefined) {
      localStorage.removeItem(key);
    } else {
      localStorage.setItem(key, JSON.stringify(next));
    }
  }, [key]);

  return [value, set] as const;
}
