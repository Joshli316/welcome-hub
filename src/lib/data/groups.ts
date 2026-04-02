import { SmallGroup } from '@/types/group';
import groupsData from '@/data/groups.json';

export function getGroups(): SmallGroup[] {
  return groupsData as SmallGroup[];
}

export function getGroupById(id: string): SmallGroup | undefined {
  return getGroups().find(g => g.id === id);
}

export function getUniqueGroupCities(): string[] {
  return [...new Set(getGroups().map(g => g.city))];
}

export function getUniqueGroupTypes(): SmallGroup['type'][] {
  return [...new Set(getGroups().map(g => g.type))] as SmallGroup['type'][];
}
