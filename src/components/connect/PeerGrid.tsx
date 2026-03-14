'use client';

import { useMemo } from 'react';
import { PeerProfile } from '@/types/peer';
import { calculateMatch } from '@/lib/data/peers';
import PeerCard from './PeerCard';
import { useTranslations } from 'next-intl';
import { useFilteredList } from '@/hooks/useFilteredList';

interface PeerGridProps {
  peers: PeerProfile[];
  myProfile: PeerProfile | null;
  cities: string[];
  universities: string[];
}

export default function PeerGrid({ peers, myProfile, cities, universities }: PeerGridProps) {
  const t = useTranslations('connect.browse');

  // Exclude self from the list before filtering
  const visiblePeers = useMemo(
    () => peers.filter(p => myProfile ? p.id !== myProfile.id : true),
    [peers, myProfile],
  );

  const filters = useMemo(() => [
    { key: 'city', getter: (p: PeerProfile) => p.city },
    { key: 'university', getter: (p: PeerProfile) => p.university },
  ], []);

  const { filtered, filterA: cityFilter, setFilterA: setCityFilter, filterB: universityFilter, setFilterB: setUniversityFilter } =
    useFilteredList({ items: visiblePeers, filters });

  // Calculate match scores and sort by best match
  const peersWithScores = useMemo(() => {
    if (myProfile) {
      return filtered
        .map(p => ({ peer: p, score: calculateMatch(myProfile, p) }))
        .sort((a, b) => b.score - a.score);
    }
    return filtered.map(p => ({ peer: p, score: undefined }));
  }, [filtered, myProfile]);

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
          value={universityFilter}
          onChange={e => setUniversityFilter(e.target.value)}
          className="px-3 py-2 rounded-lg border border-border bg-white text-sm"
        >
          <option value="">{t('allUniversities')}</option>
          {universities.map(uni => (
            <option key={uni} value={uni}>{uni}</option>
          ))}
        </select>
      </div>

      {/* Results */}
      {peersWithScores.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {peersWithScores.map(({ peer, score }) => (
            <PeerCard key={peer.id} peer={peer} matchScore={score} />
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
