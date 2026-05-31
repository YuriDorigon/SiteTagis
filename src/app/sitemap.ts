import type { MetadataRoute } from 'next';
import { getDoctors, getSpecialties, getExams, getConvenios } from '@/lib/server/firestoreData';
import { slugify } from '@/lib/utils/slug';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.tagismedicina.com.br';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [doctors, specialties, exams, convenios] = await Promise.all([getDoctors(), getSpecialties(), getExams(), getConvenios()]);

  const doctorUrls: MetadataRoute.Sitemap = doctors.map((d) => ({
    url: `${siteUrl}/corpo-clinico/${slugify(d.name)}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  const examUrls: MetadataRoute.Sitemap = exams.map((e) => ({
    url: `${siteUrl}/exames/${slugify(e.name)}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  const specialtyUrls: MetadataRoute.Sitemap = specialties.map((s) => ({
    url: `${siteUrl}/especialidades/${slugify(s.name)}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  const convenioUrls: MetadataRoute.Sitemap = convenios.map((c) => ({
    url: `${siteUrl}/convenios/${slugify(c.name)}`,
    lastModified: new Date(),
    changeFrequency: 'yearly',
    priority: 0.6,
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
    ...examUrls,
    ...doctorUrls,
    ...convenioUrls,
  ];
}
