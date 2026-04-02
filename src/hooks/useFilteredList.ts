'use client';

import { useState, useMemo, useCallback } from 'react';

interface FilterConfig<T> {
  items: T[];
  filters: {
    key: string;
    getter: (item: T) => string | string[];
  }[];
}

/**
 * Shared hook for multi-dropdown filter logic used across grid components.
 * Each filter matches against a string field or checks inclusion in an array field.
 * Supports any number of filters via filterValues array.
 */
export function useFilteredList<T>({ items, filters }: FilterConfig<T>) {
  const [filterValues, setFilterValues] = useState<string[]>(() =>
    filters.map(() => '')
  );

  const setFilter = useCallback((index: number, value: string) => {
    setFilterValues(prev => {
      const next = [...prev];
      next[index] = value;
      return next;
    });
  }, []);

  const filtered = useMemo(() => {
    return items.filter(item =>
      filters.every((f, i) => {
        const value = filterValues[i];
        if (!value) return true;
        const field = f.getter(item);
        return Array.isArray(field) ? field.includes(value) : field === value;
      })
    );
  }, [items, filters, filterValues]);

  return { filtered, filterValues, setFilter };
}
