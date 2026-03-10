/**
 * Consistent page header used across all top-level pages.
 * Keeps heading hierarchy and spacing uniform site-wide.
 */
interface PageHeaderProps {
  title: string;
  subtitle?: string;
}

export default function PageHeader({ title, subtitle }: PageHeaderProps) {
  return (
    <div className="animate-fade-up mb-10">
      <h1 className="text-4xl mb-3">{title}</h1>
      {subtitle && <p className="text-muted text-lg">{subtitle}</p>}
    </div>
  );
}
