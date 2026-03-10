/**
 * Input sanitization utilities.
 *
 * These guard against injection attacks in user-provided data
 * that gets used in href attributes (mailto:, external URLs).
 */

// Basic email format check — rejects injection attempts like
// "user@example.com%0ACc:attacker@evil.com" or newlines in mailto: links.
const EMAIL_RE = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

/** Returns a safe mailto: href, or null if the email looks suspicious. */
export function safeMailto(email: string): string | null {
  const trimmed = email.trim();
  if (!EMAIL_RE.test(trimmed)) return null;
  return `mailto:${encodeURIComponent(trimmed)}`;
}

/** Returns true if the email passes basic format validation. */
export function isValidEmail(email: string): boolean {
  return EMAIL_RE.test(email.trim());
}

// Only allow http(s) URLs for external links — blocks javascript:, data:, etc.
const SAFE_URL_RE = /^https?:\/\//i;

/** Returns the URL if it uses http(s), otherwise null. */
export function safeExternalUrl(url: string): string | null {
  const trimmed = url.trim();
  if (!SAFE_URL_RE.test(trimmed)) return null;
  return trimmed;
}
