import {
  SeoOgType,
  SeoPage,
  SeoTwitterCard,
  SeoWritePayload,
  SEO_OG_TYPES,
  SEO_TWITTER_CARDS,
} from '@/types/seo';

export const SEO_COLLECTION = 'seo_pages';
export const SEO_SLUG_INDEX = 'seo_slugs';

export function normalizePath(value: string): string {
  let path = (value || '').trim();
  if (!path) return '';
  if (!path.startsWith('/')) path = `/${path}`;
  if (path.length > 1) path = path.replace(/\/+$/, '');
  return path;
}

export function slugifySeo(value: string): string {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/-{2,}/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function slugFromPath(path: string): string {
  const normalized = normalizePath(path);
  if (normalized === '/') return 'home';
  return slugifySeo(normalized.replace(/^\//, '').replace(/\//g, '-'));
}

export function nameFromPath(path: string): string {
  const normalized = normalizePath(path);
  if (normalized === '/') return 'Home';
  const acronyms: Record<string, string> = { pv: 'PV', bess: 'BESS', esg: 'ESG' };
  return normalized
    .replace(/^\//, '')
    .split('/')
    .map((segment) =>
      segment
        .split('-')
        .map((word) => acronyms[word] || (word.charAt(0).toUpperCase() + word.slice(1)))
        .join(' ')
    )
    .join(' / ');
}

export function isSeoDeleted(item: { deletedAt?: string | null }): boolean {
  return Boolean(item.deletedAt);
}

export function isSeoOgType(value: unknown): value is SeoOgType {
  return SEO_OG_TYPES.includes(value as SeoOgType);
}

export function isSeoTwitterCard(value: unknown): value is SeoTwitterCard {
  return SEO_TWITTER_CARDS.includes(value as SeoTwitterCard);
}

export function sortSeoPages<T extends { path?: string; createdAt?: string }>(items: T[]): T[] {
  return [...items].sort((a, b) => {
    const pathA = String(a.path ?? '');
    const pathB = String(b.path ?? '');
    if (pathA === '/') return -1;
    if (pathB === '/') return 1;
    return pathA.localeCompare(pathB) || String(b.createdAt ?? '').localeCompare(String(a.createdAt ?? ''));
  });
}

export function normalizeSeoWrite(
  body: Partial<SeoWritePayload> & { path?: string; metaTitle?: string }
): SeoWritePayload | { error: string } {
  const path = normalizePath(body.path || '');
  if (!path) return { error: 'Page URL is required' };

  const name = (body.name || '').trim() || nameFromPath(path);
  if (!name) return { error: 'Page name is required' };

  const slug = slugifySeo(body.slug || '') || slugFromPath(path);
  if (!slug) return { error: 'Slug is required' };

  const metaTitle = (body.metaTitle || '').trim();
  if (!metaTitle) return { error: 'Meta title is required' };

  const metaDescription = (body.metaDescription || '').trim();
  if (!metaDescription) return { error: 'Meta description is required' };

  const ogTitle = (body.ogTitle || '').trim() || metaTitle;
  const ogDescription = (body.ogDescription || '').trim() || metaDescription;
  const ogImage = (body.ogImage || '').trim();
  const twitterTitle = (body.twitterTitle || '').trim() || ogTitle;
  const twitterDescription = (body.twitterDescription || '').trim() || ogDescription;
  const twitterImage = (body.twitterImage || '').trim() || ogImage;

  return {
    name,
    slug,
    path,
    metaTitle,
    metaDescription,
    keywords: (body.keywords || '').trim(),
    canonicalUrl: (body.canonicalUrl || '').trim(),
    robotsIndex: body.robotsIndex !== false,
    robotsFollow: body.robotsFollow !== false,
    ogTitle,
    ogDescription,
    ogImage,
    ogType: isSeoOgType(body.ogType) ? body.ogType : 'website',
    twitterCard: isSeoTwitterCard(body.twitterCard) ? body.twitterCard : 'summary_large_image',
    twitterTitle,
    twitterDescription,
    twitterImage,
    published: body.published !== false,
  };
}

export function toSeoPage(id: string, data: Record<string, any>): SeoPage {
  const path = normalizePath(data.path || '');
  return {
    id,
    name: data.name || nameFromPath(path),
    slug: slugifySeo(data.slug || '') || slugFromPath(path),
    path,
    metaTitle: data.metaTitle || '',
    metaDescription: data.metaDescription || '',
    keywords: data.keywords || '',
    canonicalUrl: data.canonicalUrl || '',
    robotsIndex: data.robotsIndex !== false,
    robotsFollow: data.robotsFollow !== false,
    ogTitle: data.ogTitle || data.metaTitle || '',
    ogDescription: data.ogDescription || data.metaDescription || '',
    ogImage: data.ogImage || '',
    ogType: isSeoOgType(data.ogType) ? data.ogType : 'website',
    twitterCard: isSeoTwitterCard(data.twitterCard) ? data.twitterCard : 'summary_large_image',
    twitterTitle: data.twitterTitle || data.ogTitle || data.metaTitle || '',
    twitterDescription: data.twitterDescription || data.ogDescription || data.metaDescription || '',
    twitterImage: data.twitterImage || data.ogImage || '',
    published: data.published !== false,
    deletedAt: data.deletedAt || null,
    createdAt: data.createdAt || '',
    updatedAt: data.updatedAt || '',
  };
}

export function seedRecordToWrite(item: {
  path: string;
  name?: string;
  slug?: string;
  metaTitle: string;
  metaDescription: string;
}): SeoWritePayload {
  const payload = normalizeSeoWrite({
    path: item.path,
    name: item.name,
    slug: item.slug,
    metaTitle: item.metaTitle,
    metaDescription: item.metaDescription,
    ogTitle: item.metaTitle,
    ogDescription: item.metaDescription,
    twitterTitle: item.metaTitle,
    twitterDescription: item.metaDescription,
    ogType: 'website',
    twitterCard: 'summary_large_image',
    robotsIndex: true,
    robotsFollow: true,
    published: true,
  });
  if ('error' in payload) {
    throw new Error(`${item.path}: ${payload.error}`);
  }
  return payload;
}
