import { useTranslations } from 'next-intl';
import { getTestimonies } from '@/lib/data/faith';
import TestimonyCard from '@/components/faith/TestimonyCard';

// Lists all testimonies, sorted by newest first
export default function TestimoniesPage() {
  const t = useTranslations('faith');
  const testimonies = getTestimonies();

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="mb-10">
        <h1 className="text-3xl font-bold mb-2">{t('features.testimonies.title')}</h1>
        <p className="text-muted">{t('features.testimonies.description')}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {testimonies.map(testimony => (
          <TestimonyCard key={testimony.id} testimony={testimony} />
        ))}
      </div>
    </div>
  );
}
