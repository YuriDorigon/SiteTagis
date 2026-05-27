import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: '*', allow: '/', disallow: '/adm' },
    ],
    sitemap: 'https://www.tagismd.com.br/sitemap.xml',
  };
}
