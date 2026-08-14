import { Project } from '@/types/project';

const RESERVED_SLUGS = new Set([
  'east-africa',
  'west-africa',
  'southern-africa',
  'demo',
]);

export function slugify(value: string): string {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/-{2,}/g, '-')
    .replace(/^-+|-+$/g, '');
}

/** Build a URL slug from project name (title) or detail project name. */
export function projectSlugFromName(title?: string, detailProjectName?: string): string {
  const source = (title || detailProjectName || '').trim();
  const slug = slugify(source);
  if (!slug) return '';
  if (RESERVED_SLUGS.has(slug)) return `${slug}-project`;
  return slug;
}

export function ensureUniqueSlug(
  desired: string,
  existing: Array<Pick<Project, 'id' | 'slug'>>,
  excludeId?: string
): string {
  const taken = new Set(
    existing
      .filter((project) => project.id !== excludeId && project.slug)
      .map((project) => project.slug as string)
  );

  let slug = desired || 'project';
  if (RESERVED_SLUGS.has(slug)) slug = `${slug}-project`;
  if (!taken.has(slug)) return slug;

  let n = 2;
  while (taken.has(`${slug}-${n}`) || RESERVED_SLUGS.has(`${slug}-${n}`)) {
    n += 1;
  }
  return `${slug}-${n}`;
}

export function getProjectHref(project: Pick<Project, 'id' | 'slug'>): string {
  const slug = project.slug?.trim();
  if (slug) return `/projects/${slug}`;
  if (project.id) return `/projects/${project.id}`;
  return '/projects/east-africa';
}
