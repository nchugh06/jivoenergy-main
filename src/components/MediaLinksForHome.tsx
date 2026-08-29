import { MediaItem } from '@/types/media';

export type MediaCard = Pick<
  MediaItem,
  'id' | 'title' | 'description' | 'image' | 'category' | 'link' | 'open' | 'slug'
>;

export async function fetchPublicMedia(featured = false): Promise<MediaItem[]> {
  const url = featured ? '/api/media?featured=true' : '/api/media';
  const res = await fetch(url, { cache: 'no-store' });
  if (!res.ok) return [];
  const data = await res.json();
  return data.items || [];
}

export async function fetchFeaturedMedia(): Promise<MediaItem[]> {
  return fetchPublicMedia(true);
}
