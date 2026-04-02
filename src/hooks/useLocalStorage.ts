'use client';

import { useState, useCallback } from 'react';

/**
 * Generic localStorage hook. Handles SSR safety, JSON parsing, and
 * corrupted-data recovery automatically.
 *
 * Accepts both direct values and functional updaters (same API as React's setState):
 *   set(newValue)
 *   set(prev => ({ ...prev, key: newValue }))
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

  const set = useCallback((next: T | ((prev: T) => T)) => {
    // Use React's functional updater to get the latest value without capturing
    // it in the closure — this makes the returned `set` stable across renders.
    setValue(current => {
      const nextValue = typeof next === 'function' ? (next as (prev: T) => T)(current) : next;
      if (nextValue === null || nextValue === undefined) {
        localStorage.removeItem(key);
      } else {
        localStorage.setItem(key, JSON.stringify(nextValue));
      }
      return nextValue;
    });
  }, [key]);

  return [value, set] as const;
}
