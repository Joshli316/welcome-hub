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
        'bg-white rounded-xl border border-border p-6 shadow-sm',
        hover && 'hover:shadow-md hover:border-primary-200 transition-all duration-200',
        className
      )}
    >
      {children}
    </div>
  );
}
