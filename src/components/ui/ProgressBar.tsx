interface ProgressBarProps {
  value: number; // 0-100
  className?: string;
}

export default function ProgressBar({ value, className }: ProgressBarProps) {
  const clamped = Math.min(100, Math.max(0, value));
  return (
    <div className={`w-full bg-warm-100 rounded-full h-3 overflow-hidden ${className ?? ''}`}>
      <div
        className="bg-primary-500 h-full rounded-full transition-all duration-500 ease-out"
        style={{ width: `${clamped}%` }}
        role="progressbar"
        aria-valuenow={clamped}
        aria-valuemin={0}
        aria-valuemax={100}
      />
    </div>
  );
}
