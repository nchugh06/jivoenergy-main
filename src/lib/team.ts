import { TeamMember, TeamSection, TeamWritePayload, TEAM_SECTIONS } from '@/types/team';
import teamSeed from '@/data/team.json';

export const TEAM_COLLECTION = 'team_members';

export const INITIAL_TEAM: TeamWritePayload[] = teamSeed as TeamWritePayload[];

export function isTeamDeleted(item: { deletedAt?: string | null }): boolean {
  return Boolean(item.deletedAt);
}

export function isTeamSection(value: string): value is TeamSection {
  return TEAM_SECTIONS.some((section) => section.id === value);
}

export function sortTeam<T extends { order?: number; createdAt?: string }>(items: T[]): T[] {
  return [...items].sort((a, b) => {
    const orderA = Number(a.order ?? 9999);
    const orderB = Number(b.order ?? 9999);
    if (orderA !== orderB) return orderA - orderB;
    return String(b.createdAt ?? '').localeCompare(String(a.createdAt ?? ''));
  });
}

export function normalizeTeamWrite(
  body: Partial<TeamWritePayload> & { name?: string }
): TeamWritePayload | { error: string } {
  const name = (body.name || '').trim();
  if (!name) return { error: 'Name is required' };

  const section = body.section;
  if (!section || !isTeamSection(section)) {
    return { error: 'Section is required' };
  }

  return {
    name,
    role: (body.role || '').trim(),
    image: (body.image || '').trim(),
    linkedin: (body.linkedin || '').trim(),
    section,
    order: Number.isFinite(Number(body.order)) ? Number(body.order) : 0,
    published: body.published !== false,
  };
}

export function toTeamMember(id: string, data: Record<string, any>): TeamMember {
  const section = isTeamSection(data.section) ? data.section : 'corporate';
  return {
    id,
    name: data.name || '',
    role: data.role || '',
    image: data.image || '',
    linkedin: data.linkedin || '',
    section,
    order: Number(data.order ?? 0),
    published: data.published !== false,
    deletedAt: data.deletedAt || null,
    createdAt: data.createdAt || '',
    updatedAt: data.updatedAt || '',
  };
}
