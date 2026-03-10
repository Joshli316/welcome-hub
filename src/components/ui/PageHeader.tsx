/**
 * Consistent page header used across all top-level pages.
 * Keeps heading hierarchy and spacing uniform site-wide.
 */
interface PageHeaderProps {
  title: string;
  subtitle?: string;
  large?: boolean;
}

export default function PageHeader({ title, subtitle, large = false }: PageHeaderProps) {
  return (
    <div className={large ? 'mb-12' : 'mb-8'}>
      <h1 className={`${large ? 'text-3xl md:text-4xl' : 'text-2xl md:text-3xl'} mb-2`}>{title}</h1>
      {subtitle && <p className={`text-muted ${large ? 'text-lg' : ''}`}>{subtitle}</p>}
    </div>
  );
}
