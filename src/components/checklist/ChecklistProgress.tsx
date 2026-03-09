import ProgressBar from '@/components/ui/ProgressBar';
import { useTranslations } from 'next-intl';

interface ChecklistProgressProps {
  completed: number;
  total: number;
}

export default function ChecklistProgress({ completed, total }: ChecklistProgressProps) {
  const t = useTranslations('checklist');
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-2">
        <p className="text-sm font-medium text-muted">
          {t('progress', { completed, total })}
        </p>
        <span className="text-sm font-bold text-primary-600">{percentage}%</span>
      </div>
      <ProgressBar value={percentage} />
    </div>
  );
}
