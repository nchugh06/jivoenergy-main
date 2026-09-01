import { Partner, PartnerSection, PartnerWritePayload, PARTNER_SECTIONS } from '@/types/partner';

export const PARTNERS_COLLECTION = 'partners';

const CLIENT_FILES = [
  'client1.jpg', 'client2.jpg', 'client3.jpg', 'client4.jpg', 'client5.jpg',
  'client6.jpg', 'client7.jpg', 'client8.jpg', 'client9.jpg', 'client10.jpg',
  'client11.jpg', 'client12.jpg', 'client13.jpg',
];

const FINANCER_FILES = [
  'finance1.jpg', 'finance2.png', 'finance3.png', 'finance4.png', 'finance5.png',
  'finance6.png', 'finance7.png',
];

const TECHNOLOGY_FILES = [
  'tp1.png', 'tp2.jpg', 'tp3.png', 'tp4.jpg', 'tp5.png', 'tp6.jpg', 'tp7.png',
  'tp8.jpg', 'tp9.png', 'tp10.png', 'tp11.jpg', 'tp12.png', 'tp13.png',
  'tp14.png', 'tp15.png', 'tp16.png', 'tp17.png', 'tp18.png',
];

function seedName(filename: string, section: PartnerSection, index: number) {
  const label = PARTNER_SECTIONS.find((item) => item.id === section)?.label || 'Partner';
  return `${label} ${index + 1}`;
}

function seedItems(files: string[], section: PartnerSection): PartnerWritePayload[] {
  return files.map((file, index) => ({
    name: seedName(file, section, index),
    image: `/partners/${file}`,
    section,
    order: index,
    published: true,
  }));
}

export const INITIAL_PARTNERS: PartnerWritePayload[] = [
  ...seedItems(CLIENT_FILES, 'clients'),
  ...seedItems(FINANCER_FILES, 'financers'),
  ...seedItems(TECHNOLOGY_FILES, 'technology-providers'),
];

export function isPartnerDeleted(item: { deletedAt?: string | null }): boolean {
  return Boolean(item.deletedAt);
}

export function isPartnerSection(value: string): value is PartnerSection {
  return PARTNER_SECTIONS.some((section) => section.id === value);
}

export function sortPartners<T extends { order?: number; createdAt?: string }>(items: T[]): T[] {
  return [...items].sort((a, b) => {
    const orderA = Number(a.order ?? 9999);
    const orderB = Number(b.order ?? 9999);
    if (orderA !== orderB) return orderA - orderB;
    return String(b.createdAt ?? '').localeCompare(String(a.createdAt ?? ''));
  });
}

export function normalizePartnerWrite(
  body: Partial<PartnerWritePayload> & { name?: string }
): PartnerWritePayload | { error: string } {
  const image = (body.image || '').trim();
  if (!image) return { error: 'Image is required' };

  const section = body.section;
  if (!section || !isPartnerSection(section)) {
    return { error: 'Section is required' };
  }

  return {
    name: (body.name || '').trim() || 'Partner',
    image,
    section,
    order: Number.isFinite(Number(body.order)) ? Number(body.order) : 0,
    published: body.published !== false,
  };
}

export function toPartner(id: string, data: Record<string, any>): Partner {
  const section = isPartnerSection(data.section) ? data.section : 'clients';
  return {
    id,
    name: data.name || '',
    image: data.image || '',
    section,
    order: Number(data.order ?? 0),
    published: data.published !== false,
    deletedAt: data.deletedAt || null,
    createdAt: data.createdAt || '',
    updatedAt: data.updatedAt || '',
  };
}


