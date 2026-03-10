import Link from 'next/link';
import Card from '@/components/ui/Card';
import { useLocale, useTranslations } from 'next-intl';

interface ResourceCardProps {
  categoryId: string;
  icon: string;
  titleKey: string;
  descriptionKey: string;
}

export default function ResourceCard({ categoryId, icon, titleKey, descriptionKey }: ResourceCardProps) {
  const locale = useLocale();
  const t = useTranslations('categories');

  return (
    <Link href={`/${locale}/resources/${categoryId}`} className="block animate-fade-up">
      <Card hover className="h-full flex flex-col group">
        <div className="w-9 h-9 rounded-md bg-warm-100 flex items-center justify-center text-lg mb-3 group-hover:bg-warm-200 transition-colors">{icon}</div>
        <h3 className="font-semibold text-[15px] mb-1">{t(titleKey)}</h3>
        <p className="text-[13px] text-muted flex-1 leading-relaxed">{t(descriptionKey)}</p>
      </Card>
    </Link>
  );
}
