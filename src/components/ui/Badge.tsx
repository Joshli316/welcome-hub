import { cn } from '@/lib/utils/cn';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'primary' | 'sage' | 'sky';
  className?: string;
}

const variants = {
  default: 'bg-warm-100 text-warm-700',
  primary: 'bg-primary-100 text-primary-700',
  sage: 'bg-sage-100 text-sage-700',
  sky: 'bg-sky-100 text-sky-700',
};

export default function Badge({ children, variant = 'default', className }: BadgeProps) {
  return (
    <span className={cn('inline-flex items-center px-2 py-0.5 rounded text-xs font-medium uppercase tracking-wide', variants[variant], className)}>
      {children}
    </span>
  );
}
