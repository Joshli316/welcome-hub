import { describe, it, expect } from 'vitest';
import { calculateMatch } from './peers';
import type { PeerProfile } from '@/types/peer';

function makeProfile(overrides: Partial<PeerProfile> = {}): PeerProfile {
  return {
    id: 'test-1',
    name: 'Test User',
    city: 'Los Angeles',
    university: 'USC',
    degreeLevel: 'masters',
    major: 'Computer Science',
    interests: ['hiking', 'cooking'],
    languages: ['zh', 'en'],
    arrivalSemester: 'Fall 2025',
    bio: '',
    contactMethod: 'wechat',
    contactValue: 'test',
    createdAt: '2025-01-01T00:00:00Z',
    ...overrides,
  };
}

describe('calculateMatch', () => {
  it('returns 100 when profiles are identical', () => {
    const a = makeProfile();
    expect(calculateMatch(a, a)).toBe(100);
  });

  it('returns 0 when profiles share nothing', () => {
    const a = makeProfile({ city: 'LA', university: 'USC', degreeLevel: 'masters', interests: ['hiking'], arrivalSemester: 'Fall 2025' });
    const b = makeProfile({ city: 'NYC', university: 'NYU', degreeLevel: 'phd', interests: ['chess'], arrivalSemester: 'Spring 2026' });
    expect(calculateMatch(a, b)).toBe(0);
  });

  it('deducts city points when cities differ', () => {
    const base = makeProfile({ city: 'LA', university: 'USC', degreeLevel: 'masters', interests: [], arrivalSemester: 'Fall 2025' });
    const differentCity = makeProfile({ city: 'NYC', university: 'USC', degreeLevel: 'masters', interests: [], arrivalSemester: 'Fall 2025' });
    // city(0) + university(20) + interests(0, union=0) + degree(10) + semester(10) = 40
    expect(calculateMatch(base, differentCity)).toBe(40);
  });

  it('gives full interest score when interests are identical', () => {
    const a = makeProfile({ interests: ['hiking', 'cooking', 'gaming'] });
    const b = makeProfile({ interests: ['hiking', 'cooking', 'gaming'] });
    expect(calculateMatch(a, b)).toBe(100);
  });

  it('handles profiles with no interests — skips interest score', () => {
    const a = makeProfile({ interests: [] });
    const b = makeProfile({ interests: [] });
    // city(25) + university(20) + interests(0, union=0) + degree(10) + semester(10) = 65
    expect(calculateMatch(a, b)).toBe(65);
  });

  it('handles undefined interests without throwing', () => {
    // Guard: profiles from JSON may have a missing interests field
    const a = makeProfile({ interests: undefined as unknown as string[] });
    const b = makeProfile({ interests: ['hiking'] });
    expect(() => calculateMatch(a, b)).not.toThrow();
  });

  it('partial interest overlap gives proportional score', () => {
    const a = makeProfile({ city: 'A', university: 'A', degreeLevel: 'phd', arrivalSemester: 'X', interests: ['hiking', 'cooking'] });
    const b = makeProfile({ city: 'B', university: 'B', degreeLevel: 'masters', arrivalSemester: 'Y', interests: ['hiking', 'chess'] });
    // Only 'hiking' shared — Jaccard = 1/3, score += round(1/3 * 35) = 12
    expect(calculateMatch(a, b)).toBe(12);
  });

  it('returns a value between 0 and 100', () => {
    const a = makeProfile({ interests: ['a', 'b'] });
    const b = makeProfile({ interests: ['b', 'c'] });
    const score = calculateMatch(a, b);
    expect(score).toBeGreaterThanOrEqual(0);
    expect(score).toBeLessThanOrEqual(100);
  });
});
