import { cn } from '@/lib/utils/cn';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export default function Card({ children, className, hover = false }: CardProps) {
  return (
    <div
      className={cn(
        'bg-white rounded-2xl border border-border/60 p-5 shadow-card transition-all duration-300 ease-out',
        hover && 'hover:shadow-card-hover hover:-translate-y-1 hover:border-primary-200/50',
        className
      )}
    >
      {children}
    </div>
  );
}
