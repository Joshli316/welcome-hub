import { PeerProfile } from '@/types/peer';
import peersData from '@/data/peers.json';

export function getPeers(): PeerProfile[] {
  return peersData as PeerProfile[];
}

export function getUniquePeerCities(): string[] {
  return [...new Set(getPeers().map(p => p.city))];
}

export function getUniquePeerUniversities(): string[] {
  return [...new Set(getPeers().map(p => p.university))];
}

/**
 * Calculate a compatibility score (0–100) between two peer profiles.
 *
 * Scoring weights reflect what matters most for newly-arrived students:
 *   - Interests (35): Jaccard similarity — shared / total unique interests
 *   - City (25):      Being in the same city is the biggest practical factor
 *   - University (20): Same campus means they'll cross paths
 *   - Degree (10):    Similar academic context
 *   - Semester (10):  Arriving at the same time means shared experience
 *
 * Each category contributes proportionally to a 100-point total.
 */
export function calculateMatch(profileA: PeerProfile, profileB: PeerProfile): number {
  let score = 0;
  const maxScore = 100; // 25 + 20 + 35 + 10 + 10

  if (profileA.city === profileB.city) score += 25;
  if (profileA.university === profileB.university) score += 20;

  // Jaccard similarity for interests: |A ∩ B| / |A ∪ B|
  const interestsA = Array.isArray(profileA.interests) ? profileA.interests : [];
  const interestsB = Array.isArray(profileB.interests) ? profileB.interests : [];
  const shared = interestsA.filter(i => interestsB.includes(i));
  const union = new Set([...interestsA, ...interestsB]).size;
  if (union > 0) {
    score += Math.round((shared.length / union) * 35);
  }

  if (profileA.degreeLevel === profileB.degreeLevel) score += 10;
  if (profileA.arrivalSemester === profileB.arrivalSemester) score += 10;

  return Math.round((score / maxScore) * 100);
}
