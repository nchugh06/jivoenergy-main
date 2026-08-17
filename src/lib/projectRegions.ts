import { Project } from '@/types/project';

/** Region sections — ids match navbar / URL paths under /projects */
export const PROJECT_REGIONS = [
  {
    id: 'east-africa',
    label: 'East Africa',
    image: '/our-presence/Map_of_East_Africa_Countries.png',
    banner: '/banner/East.jpg',
    bannerMobile: '/banner/mobile/East.jpg',
  },
  {
    id: 'west-africa',
    label: 'West Africa',
    image: '/our-presence/Western-Africa-map.png',
    banner: '/banner/West.jpg',
    bannerMobile: '/banner/mobile/West.jpg',
  },
  {
    id: 'southern-africa',
    label: 'Southern Africa',
    image: '/our-presence/Southern_Africa_last.png',
    banner: '/banner/South.jpg',
    bannerMobile: '/banner/mobile/South.jpg',
  },
] as const;

export type ProjectRegionId = (typeof PROJECT_REGIONS)[number]['id'];

export function normalizeText(value?: string) {
  return (value || '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
}

function normalizeRegion(value?: string) {
  return normalizeText(value);
}

/** Sort by Firestore `order` (lower first). Missing order goes last; then by title. */
export function sortByFirestoreOrder(projects: Project[]): Project[] {
  return [...projects].sort((a, b) => {
    const ao = Number(a.order ?? 9999);
    const bo = Number(b.order ?? 9999);
    if (ao !== bo) return ao - bo;
    return (a.title || '').localeCompare(b.title || '');
  });
}

/** Match Firestore `project.region` to a section (label or id style). */
export function projectMatchesRegion(
  project: Project,
  region: { id: string; label: string }
) {
  const pr = normalizeRegion(project.region);
  if (!pr) return false;
  const label = normalizeRegion(region.label);
  const idAsWords = normalizeRegion(region.id.replace(/-/g, ' '));
  return pr === label || pr === idAsWords || pr.includes(label) || label.includes(pr);
}

export function resolveRegionId(param: string | null | undefined): ProjectRegionId | null {
  if (!param) return null;
  const found = PROJECT_REGIONS.find(
    (r) =>
      r.id === param ||
      normalizeRegion(r.label) === normalizeRegion(param)
  );
  return found ? found.id : null;
}

export function getRegionById(id: string | null | undefined) {
  if (!id) return null;
  return PROJECT_REGIONS.find((r) => r.id === id) ?? null;
}

/** Map a project.region string to its portfolio path, if known. */
export function getRegionPathForProject(project: Project): string {
  const match = PROJECT_REGIONS.find((region) => projectMatchesRegion(project, region));
  return match ? `/projects/${match.id}` : '/projects/east-africa';
}

export function filterProjectsByRegion(
  projects: Project[],
  regionId: ProjectRegionId
): Project[] {
  const region = getRegionById(regionId);
  if (!region) return [];
  return sortByFirestoreOrder(
    projects.filter((p) => projectMatchesRegion(p, region))
  );
}
