import { SmallGroup } from '@/types/group';
import groupsData from '@/data/groups.json';

export function getGroups(): SmallGroup[] {
  return groupsData as SmallGroup[];
}

export function getGroupById(id: string): SmallGroup | undefined {
  return getGroups().find(g => g.id === id);
}

export function getOpenGroups(): SmallGroup[] {
  return getGroups().filter(g => g.isOpen);
}

export function getGroupsByType(type: SmallGroup['type']): SmallGroup[] {
  return getGroups().filter(g => g.type === type);
}

export function getGroupsByCity(city: string): SmallGroup[] {
  return getGroups().filter(g => g.city === city);
}

export function getUniqueGroupCities(): string[] {
  return [...new Set(getGroups().map(g => g.city))];
}

export function getUniqueGroupTypes(): SmallGroup['type'][] {
  return [...new Set(getGroups().map(g => g.type))] as SmallGroup['type'][];
}
