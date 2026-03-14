import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/config/site';

// Tells search engines which pages to crawl and where the sitemap lives
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/dashboard/', '/api/'],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
