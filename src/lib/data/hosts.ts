import { VolunteerHost } from '@/types/host';
import hostsData from '@/data/hosts.json';

export function getHosts(): VolunteerHost[] {
  return hostsData as VolunteerHost[];
}

export function getUniqueCities(): string[] {
  return [...new Set(getHosts().map(h => h.city))];
}

export function getUniqueServices(): string[] {
  return [...new Set(getHosts().flatMap(h => h.services))];
}
