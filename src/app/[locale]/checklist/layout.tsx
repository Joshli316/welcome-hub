import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Arrival Checklist 到达清单',
  description: 'Interactive step-by-step checklist for your first days in the US — from visa prep to settling in.',
};

export default function ChecklistLayout({ children }: { children: React.ReactNode }) {
  return children;
}
