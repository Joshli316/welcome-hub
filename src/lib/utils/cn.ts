// Simple class name merge utility (no external deps needed for Phase 1)
export function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(' ');
}
