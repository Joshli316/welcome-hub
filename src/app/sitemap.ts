import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/config/site';

const BASE_URL = SITE_URL;

// Generates sitemap.xml for search engine indexing
export default function sitemap(): MetadataRoute.Sitemap {
  const locales = ['zh', 'en'];

  // All public routes (exclude dashboard — it's behind auth)
  const routes = [
    '',
    '/resources',
    '/checklist',
    '/connect',
    '/connect/browse',
    '/groups',
    '/community',
    '/reentry',
    '/reentry/checklist',
    '/reentry/resources',
    '/reentry/returnees',
    '/reentry/stories',
    '/faith-and-work',
    '/faith-and-work/articles',
    '/faith-and-work/testimonies',
    '/faith-and-work/discussions',
    '/faith-and-work/city-guide',
    '/about',
  ];

  const entries: MetadataRoute.Sitemap = [];

  for (const route of routes) {
    for (const locale of locales) {
      entries.push({
        url: `${BASE_URL}/${locale}${route}`,
        lastModified: new Date(),
        changeFrequency: route === '' ? 'weekly' : 'monthly',
        priority: route === '' ? 1.0 : 0.8,
        alternates: {
          languages: {
            zh: `${BASE_URL}/zh${route}`,
            en: `${BASE_URL}/en${route}`,
          },
        },
      });
    }
  }

  return entries;
}
