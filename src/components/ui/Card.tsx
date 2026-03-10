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
        'bg-white rounded-lg border border-border p-5 transition-all duration-300 ease-out',
        hover && 'hover:border-primary-300/60 hover:shadow-[0_4px_20px_rgba(0,0,0,0.06)]',
        className
      )}
    >
      {children}
    </div>
  );
}
