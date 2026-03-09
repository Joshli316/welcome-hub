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
    <Link href={`/${locale}/resources/${categoryId}`}>
      <Card hover className="h-full flex flex-col">
        <div className="text-3xl mb-3">{icon}</div>
        <h3 className="font-semibold text-lg mb-1">{t(titleKey)}</h3>
        <p className="text-sm text-muted flex-1">{t(descriptionKey)}</p>
      </Card>
    </Link>
  );
}
