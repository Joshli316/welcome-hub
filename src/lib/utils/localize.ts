/**
 * Pick the locale-appropriate field from a bilingual data object.
 *
 * Convention: English field is `title`, Chinese is `titleZh`.
 * Falls back to the English field if the Chinese variant is missing.
 *
 * Usage:
 *   localized(event, 'title', locale)    // → event.titleZh or event.title
 *   localized(event, 'description', locale)
 */
// Uses a generic with indexed access to accept any object type (Event, Host, etc.)
// while keeping type safety. The runtime checks inside handle the dynamic field lookup.
export function localized<T extends object>(data: T, field: string, locale: string): string {
  const obj = data as Record<string, unknown>;
  if (locale === 'zh') {
    const zhValue = obj[`${field}Zh`];
    if (typeof zhValue === 'string' && zhValue) return zhValue;
  }
  const value = obj[field];
  return typeof value === 'string' ? value : '';
}
