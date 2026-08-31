import { MediaItem, MediaWritePayload, NewsJsonItem } from '@/types/media';

export const MEDIA_COLLECTION = 'media';

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

export function sortMediaItems<T extends { order?: number; createdAt?: string }>(items: T[]): T[] {
  return [...items].sort((a, b) => {
    const orderA = Number(a.order ?? 9999);
    const orderB = Number(b.order ?? 9999);
    if (orderA !== orderB) return orderA - orderB;
    return String(b.createdAt ?? '').localeCompare(String(a.createdAt ?? ''));
  });
}

export function mapNewsJsonToMedia(item: NewsJsonItem, index: number): MediaWritePayload {
  return {
    title: item.title,
    description: item.description,
    image: item.image,
    country: item.country || '',
    slug: slugify(item.slug || item.title),
    link: item.link || '',
    open: item.open === 'tab' ? 'tab' : 'iframe',
    featured: item.category === 'New',
    category: item.category || '',
    order: index,
    published: true,
  };
}

export function isMediaDeleted(item: { deletedAt?: string | null }): boolean {
  return Boolean(item.deletedAt);
}

export function normalizeMediaWrite(
  body: Partial<MediaWritePayload> & { title?: string }
): MediaWritePayload | { error: string } {
  const title = (body.title || '').trim();
  if (!title) return { error: 'Title is required' };

  const slug = slugify(body.slug || title);
  if (!slug) return { error: 'A valid slug is required' };

  return {
    title,
    description: (body.description || '').trim(),
    image: (body.image || '').trim(),
    country: (body.country || '').trim(),
    slug,
    link: (body.link || '').trim(),
    open: body.open === 'tab' ? 'tab' : 'iframe',
    featured: Boolean(body.featured),
    category: (body.category || '').trim(),
    order: Number.isFinite(Number(body.order)) ? Number(body.order) : 0,
    published: body.published !== false,
  };
}

export function toMediaItem(id: string, data: Record<string, any>): MediaItem {
  return {
    id,
    title: data.title || '',
    description: data.description || '',
    image: data.image || '',
    country: data.country || '',
    slug: data.slug || '',
    link: data.link || '',
    open: data.open === 'tab' ? 'tab' : 'iframe',
    featured: Boolean(data.featured),
    category: data.category || '',
    order: Number(data.order ?? 0),
    published: data.published !== false,
    deletedAt: data.deletedAt || null,
    createdAt: data.createdAt || '',
    updatedAt: data.updatedAt || '',
  };
}
