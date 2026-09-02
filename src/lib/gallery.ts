import { GalleryVideo, GalleryWritePayload } from '@/types/gallery';

export const GALLERY_COLLECTION = 'gallery_videos';
export const YOUTUBE_CHANNEL_URL = 'https://www.youtube.com/@JIVOEnergy';

export const INITIAL_GALLERY_VIDEOS: GalleryWritePayload[] = [
  {
    youtubeId: '3y1EAJ7Nrd4',
    country: 'Malawi',
    title: "JIVO Energy Commissions Malawi’s First Utility-Scale Battery Storage System | Powering Africa",
    thumbnail: '/youtube/youtube1.avif',
    duration: '4:48',
    order: 0,
    published: true,
  },
  {
    youtubeId: 'VX54jJx6Zpw',
    country: '',
    title: 'Introducing JIVO Energy | Solar, BESS & Renewable Energy Solutions Across Africa',
    thumbnail: '/youtube/youtube2.avif',
    duration: '2:41',
    order: 1,
    published: true,
  },
];

export function isGalleryDeleted(item: { deletedAt?: string | null }): boolean {
  return Boolean(item.deletedAt);
}

export function sortGallery<T extends { order?: number; createdAt?: string }>(items: T[]): T[] {
  return [...items].sort((a, b) => {
    const orderA = Number(a.order ?? 9999);
    const orderB = Number(b.order ?? 9999);
    if (orderA !== orderB) return orderA - orderB;
    return String(b.createdAt ?? '').localeCompare(String(a.createdAt ?? ''));
  });
}

export function parseYoutubeId(value: string): string {
  const trimmed = value.trim();
  if (!trimmed) return '';

  const watch = trimmed.match(/[?&]v=([a-zA-Z0-9_-]{11})/);
  if (watch) return watch[1];

  const short = trimmed.match(/youtu\.be\/([a-zA-Z0-9_-]{11})/);
  if (short) return short[1];

  const embed = trimmed.match(/embed\/([a-zA-Z0-9_-]{11})/);
  if (embed) return embed[1];

  const shorts = trimmed.match(/shorts\/([a-zA-Z0-9_-]{11})/);
  if (shorts) return shorts[1];

  if (/^[a-zA-Z0-9_-]{11}$/.test(trimmed)) return trimmed;
  return '';
}

export function youtubeThumbnail(youtubeId: string) {
  return `https://i.ytimg.com/vi/${youtubeId}/hqdefault.jpg`;
}

export function normalizeCountry(value: string) {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
}

export function countriesMatch(a: string, b: string) {
  return normalizeCountry(a) === normalizeCountry(b);
}

export function normalizeGalleryWrite(
  body: Partial<GalleryWritePayload> & { youtubeId?: string; title?: string }
): GalleryWritePayload | { error: string } {
  const title = (body.title || '').trim();
  if (!title) return { error: 'Title is required' };

  const youtubeId = parseYoutubeId(body.youtubeId || '');
  if (!youtubeId) return { error: 'A valid YouTube URL or video ID is required' };

  return {
    youtubeId,
    title,
    country: (body.country || '').trim(),
    thumbnail: (body.thumbnail || '').trim() || youtubeThumbnail(youtubeId),
    duration: (body.duration || '').trim(),
    order: Number.isFinite(Number(body.order)) ? Number(body.order) : 0,
    published: body.published !== false,
  };
}

export function toGalleryVideo(id: string, data: Record<string, any>): GalleryVideo {
  const youtubeId = data.youtubeId || data.videoId || '';
  return {
    id,
    youtubeId,
    title: data.title || '',
    country: data.country || '',
    thumbnail: data.thumbnail || (youtubeId ? youtubeThumbnail(youtubeId) : ''),
    duration: data.duration || '',
    order: Number(data.order ?? 0),
    published: data.published !== false,
    deletedAt: data.deletedAt || null,
    createdAt: data.createdAt || '',
    updatedAt: data.updatedAt || '',
  };
}
