export const PARTNER_SECTIONS = [
  { id: 'clients', label: 'Clients' },
  { id: 'financers', label: 'Financers' },
  { id: 'technology-providers', label: 'Technology Providers' },
] as const;

export type PartnerSection = (typeof PARTNER_SECTIONS)[number]['id'];

export interface Partner {
  id: string;
  name: string;
  image: string;
  section: PartnerSection;
  order: number;
  published: boolean;
  deletedAt?: string | null;
  createdAt?: string;
  updatedAt?: string;
}

export type PartnerWritePayload = Omit<Partner, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>;
