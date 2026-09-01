export const TEAM_SECTIONS = [
  { id: 'leadership', label: 'Leadership' },
  { id: 'execution', label: 'Execution' },
  { id: 'development', label: 'Development' },
  { id: 'corporate', label: 'Corporate' },
  { id: 'support', label: 'Support' },
] as const;

export type TeamSection = (typeof TEAM_SECTIONS)[number]['id'];

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
  linkedin: string;
  section: TeamSection;
  order: number;
  published: boolean;
  deletedAt?: string | null;
  createdAt?: string;
  updatedAt?: string;
}

export type TeamWritePayload = Omit<TeamMember, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>;
