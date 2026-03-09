import { cn } from '@/lib/utils/cn';

interface MatchScoreProps {
  score: number; // 0-100
  size?: 'sm' | 'md';
}

export default function MatchScore({ score, size = 'md' }: MatchScoreProps) {
  const color = score >= 70 ? 'text-sage-600 bg-sage-100' : score >= 40 ? 'text-primary-600 bg-primary-100' : 'text-muted bg-warm-100';
  const dims = size === 'sm' ? 'w-10 h-10 text-xs' : 'w-14 h-14 text-sm';

  return (
    <div className={cn('rounded-full flex items-center justify-center font-bold', color, dims)}>
      {score}%
    </div>
  );
}
