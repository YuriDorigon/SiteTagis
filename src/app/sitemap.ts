import type { MetadataRoute } from 'next';
import { getDoctors, getSpecialties } from '@/lib/server/firestoreData';
import { slugify } from '@/lib/utils/slug';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.tagismd.com.br';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [doctors, specialties] = await Promise.all([getDoctors(), getSpecialties()]);

  const doctorUrls: MetadataRoute.Sitemap = doctors.map((d) => ({
    url: `${siteUrl}/corpo-clinico/${slugify(d.name)}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  const specialtyUrls: MetadataRoute.Sitemap = specialties.map((s) => ({
    url: `${siteUrl}/especialidades/${slugify(s.name)}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  return [
    { url: siteUrl, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: `${siteUrl}/especialidades`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${siteUrl}/exames`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${siteUrl}/convenios`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${siteUrl}/corpo-clinico`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${siteUrl}/contato`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.7 },
    { url: `${siteUrl}/trabalhe-conosco`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.5 },
    ...specialtyUrls,
    ...doctorUrls,
  ];
}
