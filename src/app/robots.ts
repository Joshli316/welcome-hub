import type { MetadataRoute } from 'next';

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
    sitemap: 'https://welcome-hub.yellow-longitudinal.workers.dev/sitemap.xml',
  };
}
