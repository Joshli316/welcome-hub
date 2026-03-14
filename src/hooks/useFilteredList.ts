'use client';

import { useState, useMemo } from 'react';

interface FilterConfig<T> {
  items: T[];
  filters: {
    key: string;
    getter: (item: T) => string | string[];
  }[];
}

/**
 * Shared hook for two-dropdown filter logic used across grid components.
 * Each filter matches against a string field or checks inclusion in an array field.
 */
export function useFilteredList<T>({ items, filters }: FilterConfig<T>) {
  // Create state for each filter — always exactly 2 filters
  const [filterA, setFilterA] = useState('');
  const [filterB, setFilterB] = useState('');

  const filtered = useMemo(() => {
    return items.filter(item => {
      const [a, b] = filters;
      if (filterA) {
        const val = a.getter(item);
        const match = Array.isArray(val) ? val.includes(filterA) : val === filterA;
        if (!match) return false;
      }
      if (filterB) {
        const val = b.getter(item);
        const match = Array.isArray(val) ? val.includes(filterB) : val === filterB;
        if (!match) return false;
      }
      return true;
    });
  }, [items, filters, filterA, filterB]);

  return {
    filtered,
    filterA,
    setFilterA,
    filterB,
    setFilterB,
  };
}
