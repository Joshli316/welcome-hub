'use client';

import { useState } from 'react';
import { SmallGroup } from '@/types/group';
import GroupCard from './GroupCard';
import { useTranslations } from 'next-intl';

interface GroupGridProps {
  groups: SmallGroup[];
  cities: string[];
  types: SmallGroup['type'][];
}

export default function GroupGrid({ groups, cities, types }: GroupGridProps) {
  const [cityFilter, setCityFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const t = useTranslations('groups');
  const tTypes = useTranslations('groups.types');

  const filtered = groups
    .filter(g => !cityFilter || g.city === cityFilter)
    .filter(g => !typeFilter || g.type === typeFilter);

  return (
    <div>
      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-6">
        <select
          value={cityFilter}
          onChange={e => setCityFilter(e.target.value)}
          className="px-3 py-2 rounded-lg border border-border bg-white text-sm"
        >
          <option value="">{t('allCities')}</option>
          {cities.map(city => (
            <option key={city} value={city}>{city}</option>
          ))}
        </select>
        <select
          value={typeFilter}
          onChange={e => setTypeFilter(e.target.value)}
          className="px-3 py-2 rounded-lg border border-border bg-white text-sm"
        >
          <option value="">{t('allTypes')}</option>
          {types.map(type => (
            <option key={type} value={type}>{tTypes(type)}</option>
          ))}
        </select>
      </div>

      {/* Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map(group => (
            <GroupCard key={group.id} group={group} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 text-muted">
          {t('noResults')}
        </div>
      )}
    </div>
  );
}
