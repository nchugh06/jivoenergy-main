import type { MetadataRoute } from 'next';
import { getProjects } from '@/lib/projects';
import { getProjectHref } from '@/lib/projectSlug';
import { isProduction, SITE_URL } from '@/lib/site';

export const revalidate = 3600;

const BUSINESS_AREA_SLUGS = [
  'solar-pv',
  'bess',
  'transmission-distribution',
  'hybrid-energy',
  'biogas-biomethane',
  'waste-management',
] as const;

const STATIC_ROUTES: Array<{
  path: string;
  changeFrequency: NonNullable<MetadataRoute.Sitemap[number]['changeFrequency']>;
  priority: number;
}> = [
  { path: '', changeFrequency: 'weekly', priority: 1 },
  { path: '/about', changeFrequency: 'monthly', priority: 0.9 },
  { path: '/business-areas', changeFrequency: 'monthly', priority: 0.9 },
  { path: '/capabilities', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/projects/east-africa', changeFrequency: 'weekly', priority: 0.8 },
  { path: '/projects/west-africa', changeFrequency: 'weekly', priority: 0.8 },
  { path: '/projects/southern-africa', changeFrequency: 'weekly', priority: 0.8 },
  { path: '/partners', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/certificate', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/esg', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/team', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/media', changeFrequency: 'weekly', priority: 0.7 },
  { path: '/careers', changeFrequency: 'weekly', priority: 0.7 },
  { path: '/contact', changeFrequency: 'yearly', priority: 0.8 },
  // { path: '/gallery', changeFrequency: 'monthly', priority: 0.5 },
  // { path: '/gallery/achada-cape-verde', changeFrequency: 'monthly', priority: 0.4 },
  // { path: '/gallery/kenya', changeFrequency: 'monthly', priority: 0.4 },
  // { path: '/gallery/liberia', changeFrequency: 'monthly', priority: 0.4 },
  // { path: '/gallery/maio-cape-verde', changeFrequency: 'monthly', priority: 0.4 },
  // { path: '/gallery/malawi', changeFrequency: 'monthly', priority: 0.4 },
  // { path: '/gallery/sao-tome-principe', changeFrequency: 'monthly', priority: 0.4 },
  // { path: '/csr', changeFrequency: 'monthly', priority: 0.5 },
  // { path: '/sustainability', changeFrequency: 'monthly', priority: 0.5 },
  { path: '/privacy-policy', changeFrequency: 'yearly', priority: 0.3 },
  { path: '/terms-of-service', changeFrequency: 'yearly', priority: 0.3 },
];

function toDate(value: unknown): Date | undefined {
  if (!value) return undefined;
  if (value instanceof Date && !Number.isNaN(value.getTime())) return value;
  if (
    typeof value === 'object' &&
    value !== null &&
    'toDate' in value &&
    typeof (value as { toDate: () => Date }).toDate === 'function'
  ) {
    const date = (value as { toDate: () => Date }).toDate();
    if (date instanceof Date && !Number.isNaN(date.getTime())) return date;
  }
  return undefined;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  if (!isProduction) {
    return [];
  }

  const lastModified = new Date();

  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((route) => ({
    url: `${SITE_URL}${route.path}`,
    lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  const businessAreaEntries: MetadataRoute.Sitemap = BUSINESS_AREA_SLUGS.map((slug) => ({
    url: `${SITE_URL}/business-areas/${slug}`,
    lastModified,
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  let projectEntries: MetadataRoute.Sitemap = [];
  try {
    const projects = await getProjects();
    const seen = new Set<string>();

    projectEntries = projects.flatMap((project) => {
      if (!project.slug?.trim() && !project.id) return [];

      const href = getProjectHref(project);
      if (seen.has(href)) return [];
      seen.add(href);

      return [
        {
          url: `${SITE_URL}${href}`,
          lastModified: toDate(project.updatedAt) ?? toDate(project.createdAt) ?? lastModified,
          changeFrequency: 'monthly' as const,
          priority: 0.7,
        },
      ];
    });
  } catch (error) {
    console.error('Failed to load projects for sitemap:', error);
  }

  return [...staticEntries, ...businessAreaEntries, ...projectEntries];
}
