import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Departure Checklist 离境清单',
  description: 'Step-by-step departure preparation from 6 months out to your final week before returning to China. 从提前半年到最后一周的回国准备清单。',
};

export default function ReentryChecklistLayout({ children }: { children: React.ReactNode }) {
  return children;
}
