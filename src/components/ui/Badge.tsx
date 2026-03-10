import { cn } from '@/lib/utils/cn';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'primary' | 'sage' | 'sky';
  className?: string;
}

const variants = {
  default: 'bg-warm-100 text-warm-800 ring-1 ring-warm-200/60',
  primary: 'bg-primary-50 text-primary-700 ring-1 ring-primary-200/60',
  sage: 'bg-sage-50 text-sage-700 ring-1 ring-sage-200/60',
  sky: 'bg-sky-50 text-sky-700 ring-1 ring-sky-200/60',
};

export default function Badge({ children, variant = 'default', className }: BadgeProps) {
  return (
    <span className={cn('inline-flex items-center px-3.5 py-1.5 rounded-full text-sm font-bold tracking-wide', variants[variant], className)}>
      {children}
    </span>
  );
}
