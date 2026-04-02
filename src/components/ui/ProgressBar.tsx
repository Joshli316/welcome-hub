interface ProgressBarProps {
  value: number; // 0-100
  label?: string;
  className?: string;
}

export default function ProgressBar({ value, label, className }: ProgressBarProps) {
  const clamped = Math.min(100, Math.max(0, value));
  return (
    <div
      className={`w-full bg-border/40 rounded-full h-3.5 overflow-hidden ${className ?? ''}`}
      role="progressbar"
      aria-valuenow={clamped}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={label ?? 'Progress'}
    >
      <div
        className="bg-gradient-to-r from-primary-500 via-rose-400 to-amber-400 h-full rounded-full transition-all duration-700 ease-out shadow-[0_1px_6px_rgba(212,118,58,0.4)]"
        style={{ width: `${clamped}%` }}
      />
    </div>
  );
}
