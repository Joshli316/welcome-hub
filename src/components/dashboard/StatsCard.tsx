import Card from '@/components/ui/Card';

interface StatsCardProps {
  label: string;
  value: number | string;
  icon: string;
  subtitle?: string;
}

// Single stat display card for the dashboard overview
export default function StatsCard({ label, value, icon, subtitle }: StatsCardProps) {
  return (
    <Card>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-muted mb-1">{label}</p>
          <p className="text-2xl font-bold">{value}</p>
          {subtitle && <p className="text-xs text-muted mt-1">{subtitle}</p>}
        </div>
        <span className="text-2xl">{icon}</span>
      </div>
    </Card>
  );
}
