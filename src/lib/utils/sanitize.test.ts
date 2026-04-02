import { describe, it, expect } from 'vitest';
import { safeMailto, isValidEmail, safeExternalUrl } from './sanitize';

describe('safeMailto', () => {
  it('returns a mailto: href for a valid email', () => {
    const result = safeMailto('user@example.com');
    expect(result).toBe('mailto:user%40example.com');
  });

  it('returns null for an email with a newline (header injection)', () => {
    expect(safeMailto('user@example.com\nCc:attacker@evil.com')).toBeNull();
  });

  it('returns null for an email with URL-encoded newline', () => {
    expect(safeMailto('user@example.com%0ACc:attacker@evil.com')).toBeNull();
  });

  it('returns null for an empty string', () => {
    expect(safeMailto('')).toBeNull();
  });

  it('trims whitespace before validating', () => {
    expect(safeMailto('  user@example.com  ')).toBe('mailto:user%40example.com');
  });

  it('accepts emails with subdomains and dots', () => {
    expect(safeMailto('first.last@mail.university.edu')).not.toBeNull();
  });

  it('returns null for a plain string with no @', () => {
    expect(safeMailto('notanemail')).toBeNull();
  });
});

describe('isValidEmail', () => {
  it('returns true for a valid email', () => {
    expect(isValidEmail('user@example.com')).toBe(true);
  });

  it('returns false for an email with newline', () => {
    expect(isValidEmail('user@example.com\nBcc:x@y.com')).toBe(false);
  });

  it('returns false for missing TLD', () => {
    expect(isValidEmail('user@example')).toBe(false);
  });

  it('returns false for empty string', () => {
    expect(isValidEmail('')).toBe(false);
  });
});

describe('safeExternalUrl', () => {
  it('allows https URLs', () => {
    expect(safeExternalUrl('https://example.com')).toBe('https://example.com');
  });

  it('allows http URLs', () => {
    expect(safeExternalUrl('http://example.com/path')).toBe('http://example.com/path');
  });

  it('blocks javascript: URLs', () => {
    expect(safeExternalUrl('javascript:alert(1)')).toBeNull();
  });

  it('blocks data: URLs', () => {
    expect(safeExternalUrl('data:text/html,<script>alert(1)</script>')).toBeNull();
  });

  it('blocks bare paths', () => {
    expect(safeExternalUrl('/internal/path')).toBeNull();
  });

  it('trims whitespace before checking', () => {
    expect(safeExternalUrl('  https://example.com  ')).toBe('https://example.com');
  });

  it('is case-insensitive for the scheme', () => {
    expect(safeExternalUrl('HTTPS://example.com')).toBe('HTTPS://example.com');
  });
});
