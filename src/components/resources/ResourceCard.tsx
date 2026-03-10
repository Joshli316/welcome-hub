import Link from 'next/link';
import Card from '@/components/ui/Card';
import { useLocale, useTranslations } from 'next-intl';

interface ResourceCardProps {
  categoryId: string;
  icon: string;
  titleKey: string;
  descriptionKey: string;
}

// Per-category color theming for visual variety
const categoryColors: Record<string, { bg: string; text: string }> = {
  banking:        { bg: 'from-primary-100 to-primary-200', text: 'text-primary-600' },
  housing:        { bg: 'from-amber-100 to-amber-200',    text: 'text-amber-600' },
  phone:          { bg: 'from-sky-100 to-sky-200',         text: 'text-sky-600' },
  airport:        { bg: 'from-rose-100 to-rose-200',       text: 'text-rose-600' },
  campus:         { bg: 'from-violet-100 to-violet-200',   text: 'text-violet-600' },
  transportation: { bg: 'from-sage-100 to-sage-200',       text: 'text-sage-600' },
  food:           { bg: 'from-amber-100 to-primary-200',   text: 'text-amber-600' },
  health:         { bg: 'from-rose-100 to-rose-200',       text: 'text-rose-600' },
  academics:      { bg: 'from-sky-100 to-violet-200',      text: 'text-sky-600' },
  'daily-life':   { bg: 'from-sage-100 to-sage-200',       text: 'text-sage-600' },
  legal:          { bg: 'from-violet-100 to-sky-200',      text: 'text-violet-600' },
};

const defaultColor = { bg: 'from-warm-100 to-warm-200', text: 'text-primary-600' };

export default function ResourceCard({ categoryId, icon, titleKey, descriptionKey }: ResourceCardProps) {
  const locale = useLocale();
  const t = useTranslations('categories');
  const color = categoryColors[categoryId] ?? defaultColor;

  return (
    <Link href={`/${locale}/resources/${categoryId}`} className="block animate-fade-up">
      <Card hover className="h-full flex flex-col group">
        <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${color.bg} flex items-center justify-center text-3xl mb-3 group-hover:scale-110 transition-transform duration-300 shadow-sm`}>{icon}</div>
        <h3 className="font-bold text-xl mb-1">{t(titleKey)}</h3>
        <p className="text-base text-muted flex-1 leading-relaxed">{t(descriptionKey)}</p>
        <div className={`mt-3 ${color.text} font-bold text-base opacity-0 group-hover:opacity-100 transition-opacity duration-300`}>
          {locale === 'zh' ? '查看指南' : 'View guides'} &rarr;
        </div>
      </Card>
    </Link>
  );
}
