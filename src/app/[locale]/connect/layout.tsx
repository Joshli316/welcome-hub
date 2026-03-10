import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Find Peers 找同伴',
  description: 'Create your profile and find fellow Chinese international students who share your city, school, and interests.',
};

export default function ConnectLayout({ children }: { children: React.ReactNode }) {
  return children;
}
