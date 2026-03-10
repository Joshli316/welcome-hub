import { CityGuide, CityResource } from '@/types/faith';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import { useLocale, useTranslations } from 'next-intl';
import { localized } from '@/lib/utils/localize';

interface CityGuideCardProps {
  guide: CityGuide;
}

// Badge variant mapping for resource types
const typeVariant: Record<CityResource['type'], 'default' | 'primary' | 'sage' | 'sky'> = {
  community: 'sage',
  church: 'primary',
  professional: 'sky',
  social: 'default',
};

// Displays a city guide with its list of resources
export default function CityGuideCard({ guide }: CityGuideCardProps) {
  const locale = useLocale();
  const t = useTranslations('faith');
  const city = localized(guide, 'city', locale);
  const description = localized(guide, 'description', locale);

  return (
    <Card className="h-full">
      <h3 className="text-xl font-bold mb-2">{city}</h3>
      <p className="text-sm text-muted mb-5">{description}</p>

      <div className="space-y-4">
        {guide.resources.map((resource, i) => {
          const name = localized(resource, 'name', locale);
          const desc = localized(resource, 'description', locale);

          return (
            <div key={i} className="border-t border-border pt-4 first:border-0 first:pt-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-semibold text-sm">{name}</span>
                <Badge variant={typeVariant[resource.type]}>{t(`resourceTypes.${resource.type}`)}</Badge>
              </div>
              <p className="text-sm text-muted mb-1">{desc}</p>
              {resource.contactInfo && (
                <p className="text-xs text-primary-600">{resource.contactInfo}</p>
              )}
            </div>
          );
        })}
      </div>
    </Card>
  );
}
