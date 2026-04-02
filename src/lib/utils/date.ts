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
