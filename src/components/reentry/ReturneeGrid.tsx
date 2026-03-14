'use client';

import { useMemo } from 'react';
import { ReturneeProfile } from '@/types/returnee';
import ReturneeCard from './ReturneeCard';
import { useTranslations } from 'next-intl';
import { useFilteredList } from '@/hooks/useFilteredList';

interface ReturneeGridProps {
  returnees: ReturneeProfile[];
  cities: string[];
  topics: string[];
}

export default function ReturneeGrid({ returnees, cities, topics }: ReturneeGridProps) {
  const t = useTranslations('reentry.returnees');
  const tTopics = useTranslations('reentry.topics');

  const filters = useMemo(() => [
    { key: 'city', getter: (r: ReturneeProfile) => r.currentCity },
    { key: 'topic', getter: (r: ReturneeProfile) => r.topics },
  ], []);

  const { filtered, filterA: cityFilter, setFilterA: setCityFilter, filterB: topicFilter, setFilterB: setTopicFilter } =
    useFilteredList({ items: returnees, filters });

  return (
    <div>
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
          value={topicFilter}
          onChange={e => setTopicFilter(e.target.value)}
          className="px-3 py-2 rounded-lg border border-border bg-white text-sm"
        >
          <option value="">{t('allTopics')}</option>
          {topics.map(topic => (
            <option key={topic} value={topic}>{tTopics(topic)}</option>
          ))}
        </select>
      </div>

      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map(returnee => (
            <ReturneeCard key={returnee.id} returnee={returnee} />
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
