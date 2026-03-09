'use client';

import { useState } from 'react';
import { VolunteerHost } from '@/types/host';
import HostCard from './HostCard';
import { useTranslations } from 'next-intl';

interface HostGridProps {
  hosts: VolunteerHost[];
  cities: string[];
  services: string[];
}

export default function HostGrid({ hosts, cities, services }: HostGridProps) {
  const [cityFilter, setCityFilter] = useState('');
  const [serviceFilter, setServiceFilter] = useState('');
  const t = useTranslations('community.hosts');

  const filtered = hosts.filter(host => {
    if (cityFilter && host.city !== cityFilter) return false;
    if (serviceFilter && !host.services.includes(serviceFilter)) return false;
    return true;
  });

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
          value={serviceFilter}
          onChange={e => setServiceFilter(e.target.value)}
          className="px-3 py-2 rounded-lg border border-border bg-white text-sm"
        >
          <option value="">{t('allServices')}</option>
          {services.map(service => (
            <option key={service} value={service}>{t(`services.${service}`)}</option>
          ))}
        </select>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map(host => (
          <HostCard key={host.id} host={host} />
        ))}
      </div>
    </div>
  );
}
