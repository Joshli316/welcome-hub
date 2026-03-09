import { PeerProfile } from '@/types/peer';
import peersData from '@/data/peers.json';

export function getPeers(): PeerProfile[] {
  return peersData as PeerProfile[];
}

export function getPeerById(id: string): PeerProfile | undefined {
  return getPeers().find(p => p.id === id);
}

export function getPeersByCity(city: string): PeerProfile[] {
  return getPeers().filter(p => p.city === city);
}

export function getPeersByUniversity(university: string): PeerProfile[] {
  return getPeers().filter(p => p.university === university);
}

export function getUniquePeerCities(): string[] {
  return [...new Set(getPeers().map(p => p.city))];
}

export function getUniquePeerUniversities(): string[] {
  return [...new Set(getPeers().map(p => p.university))];
}

// Calculate a compatibility score (0-100) between two profiles
export function calculateMatch(profileA: PeerProfile, profileB: PeerProfile): number {
  let score = 0;
  let maxScore = 0;

  // Same city (+25)
  maxScore += 25;
  if (profileA.city === profileB.city) score += 25;

  // Same university (+20)
  maxScore += 20;
  if (profileA.university === profileB.university) score += 20;

  // Shared interests (up to +35, scaled by overlap)
  maxScore += 35;
  const sharedInterests = profileA.interests.filter(i => profileB.interests.includes(i));
  const totalInterests = new Set([...profileA.interests, ...profileB.interests]).size;
  if (totalInterests > 0) {
    score += Math.round((sharedInterests.length / totalInterests) * 35);
  }

  // Same degree level (+10)
  maxScore += 10;
  if (profileA.degreeLevel === profileB.degreeLevel) score += 10;

  // Same arrival semester (+10)
  maxScore += 10;
  if (profileA.arrivalSemester === profileB.arrivalSemester) score += 10;

  return Math.round((score / maxScore) * 100);
}
