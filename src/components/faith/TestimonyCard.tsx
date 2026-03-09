import Link from 'next/link';
import { Testimony } from '@/types/faith';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import { formatDate } from '@/lib/utils/date';
import { useLocale } from 'next-intl';

interface TestimonyCardProps {
  testimony: Testimony;
}

// Displays a preview card for a testimony, linking to the full story
export default function TestimonyCard({ testimony }: TestimonyCardProps) {
  const locale = useLocale();
  const title = locale === 'zh' ? testimony.titleZh : testimony.title;
  const excerpt = locale === 'zh' ? testimony.excerptZh : testimony.excerpt;
  const role = locale === 'zh' ? testimony.authorRoleZh : testimony.authorRole;

  return (
    <Link href={`/${locale}/faith-and-work/testimonies/${testimony.id}`}>
      <Card hover className="h-full flex flex-col">
        <div className="flex items-center gap-2 mb-3 text-xs text-muted">
          <span>{testimony.authorName}</span>
          <span>·</span>
          <span>{testimony.authorCity}</span>
        </div>
        <h3 className="font-semibold text-lg mb-2">{title}</h3>
        <p className="text-sm text-muted mb-2">{role}</p>
        <p className="text-sm text-muted mb-3 flex-1">{excerpt}</p>
        <div className="flex items-center justify-between">
          <div className="flex flex-wrap gap-1.5">
            {testimony.themes.slice(0, 2).map(theme => (
              <Badge key={theme} variant="sage">{theme}</Badge>
            ))}
          </div>
          <span className="text-xs text-muted">{formatDate(testimony.publishedDate, locale)}</span>
        </div>
      </Card>
    </Link>
  );
}
