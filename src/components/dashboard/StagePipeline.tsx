'use client';

import { useLocale } from 'next-intl';
import { StudentStage, stageLabels } from '@/types/dashboard';

interface StagePipelineProps {
  byStage: Record<StudentStage, number>;
  total: number;
}

// Visual pipeline showing contact counts per student journey stage
export default function StagePipeline({ byStage, total }: StagePipelineProps) {
  const locale = useLocale();
  const lang = locale === 'zh' ? 'zh' : 'en';

  const stages: StudentStage[] = [
    'pre-arrival', 'arrival', 'adjustment', 'community', 'reentry', 'returned',
  ];

  const colors: Record<StudentStage, string> = {
    'pre-arrival': 'bg-warm-200',
    'arrival': 'bg-sky-200',
    'adjustment': 'bg-primary-200',
    'community': 'bg-sage-200',
    'reentry': 'bg-primary-300',
    'returned': 'bg-warm-300',
  };

  return (
    <div className="space-y-3">
      {/* Bar chart */}
      <div className="flex h-8 rounded-lg overflow-hidden">
        {stages.map(stage => {
          const count = byStage[stage] || 0;
          if (count === 0 || total === 0) return null;
          const pct = (count / total) * 100;
          return (
            <div
              key={stage}
              className={`${colors[stage]} flex items-center justify-center text-xs font-medium`}
              style={{ width: `${pct}%` }}
              title={`${stageLabels[stage][lang]}: ${count}`}
            >
              {pct >= 10 ? count : ''}
            </div>
          );
        })}
        {total === 0 && (
          <div className="bg-warm-100 w-full flex items-center justify-center text-xs text-muted">
            —
          </div>
        )}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-3 text-xs">
        {stages.map(stage => (
          <div key={stage} className="flex items-center gap-1.5">
            <span className={`w-2.5 h-2.5 rounded-full ${colors[stage]}`} />
            <span className="text-muted">{stageLabels[stage][lang]}</span>
            <span className="font-medium">{byStage[stage] || 0}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
