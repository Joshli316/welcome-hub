// Format a date string for display
export function formatDate(dateStr: string, locale: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString(locale === 'zh' ? 'zh-CN' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

// Check if an event date is in the future
export function isFutureDate(dateStr: string): boolean {
  return new Date(dateStr) > new Date();
}

// Check if an event is within the next N days
export function isWithinDays(dateStr: string, days: number): boolean {
  const eventDate = new Date(dateStr);
  const now = new Date();
  const future = new Date(now.getTime() + days * 24 * 60 * 60 * 1000);
  return eventDate >= now && eventDate <= future;
}
