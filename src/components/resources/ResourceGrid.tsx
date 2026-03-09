import { ResourceCategory } from '@/types/resource';
import ResourceCard from './ResourceCard';

interface ResourceGridProps {
  categories: ResourceCategory[];
}

export default function ResourceGrid({ categories }: ResourceGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {categories.map(cat => (
        <ResourceCard
          key={cat.id}
          categoryId={cat.id}
          icon={cat.icon}
          titleKey={cat.titleKey}
          descriptionKey={cat.descriptionKey}
        />
      ))}
    </div>
  );
}
