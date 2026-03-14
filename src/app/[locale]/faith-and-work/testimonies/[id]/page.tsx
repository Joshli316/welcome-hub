import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getLocale, getTranslations } from 'next-intl/server';
import { getTestimonyById } from '@/lib/data/faith';
import Badge from '@/components/ui/Badge';
import { formatDate } from '@/lib/utils/date';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const locale = await getLocale();
  const testimony = getTestimonyById(id);
  if (!testimony) return {};
  return {
    title: locale === 'zh' ? testimony.titleZh : testimony.title,
  };
}

// Detail page for a single testimony — renders full story with paragraphs
export default async function TestimonyDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const locale = await getLocale();
  const t = await getTranslations('faith');

  const testimony = getTestimonyById(id);
  if (!testimony) notFound();

  const title = locale === 'zh' ? testimony.titleZh : testimony.title;
  const content = locale === 'zh' ? testimony.contentZh : testimony.content;
  const role = locale === 'zh' ? testimony.authorRoleZh : testimony.authorRole;

  // Split content into paragraphs
  const paragraphs = content.split('\n\n').filter(Boolean);

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      {/* Breadcrumb */}
      <div className="mb-6 text-sm text-muted">
        <Link href={`/${locale}/faith-and-work`} className="hover:text-foreground">
          {t('title')}
        </Link>
        <span className="mx-2">→</span>
        <Link href={`/${locale}/faith-and-work/testimonies`} className="hover:text-foreground">
          {t('features.testimonies.title')}
        </Link>
      </div>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">{title}</h1>
        <div className="flex items-center gap-3 text-sm text-muted mb-4">
          <span>{testimony.authorName}</span>
          <span>·</span>
          <span>{testimony.authorCity}</span>
          <span>·</span>
          <span>{role}</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex flex-wrap gap-1.5">
            {testimony.themes.map(theme => (
              <Badge key={theme} variant="sage">{theme}</Badge>
            ))}
          </div>
          <span className="text-xs text-muted">{formatDate(testimony.publishedDate, locale)}</span>
        </div>
      </div>

      {/* Content */}
      <div className="space-y-4">
        {paragraphs.map((paragraph, i) => (
          <p key={i} className="text-foreground leading-relaxed">{paragraph}</p>
        ))}
      </div>

      {/* Back */}
      <div className="mt-12 pt-8 border-t border-border">
        <Link href={`/${locale}/faith-and-work/testimonies`} className="text-primary-600 font-medium hover:text-primary-700">
          ← {t('backToTestimonies')}
        </Link>
      </div>
    </div>
  );
}
