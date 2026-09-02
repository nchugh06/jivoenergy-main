import { unstable_cache } from 'next/cache';
import { getDb } from '@/lib/firebaseAdmin';
import { SeoPage } from '@/types/seo';
import { SEO_COLLECTION, isSeoDeleted, slugifySeo, sortSeoPages, toSeoPage } from '@/lib/seo';

async function lookupPublishedSeoBySlug(normalized: string): Promise<SeoPage | null> {
  const snapshot = await getDb().collection(SEO_COLLECTION).where('slug', '==', normalized).get();
  const items = sortSeoPages(
    snapshot.docs
      .map((doc) => toSeoPage(doc.id, doc.data() as Record<string, any>))
      .filter((item) => item.published && !isSeoDeleted(item) && item.slug === normalized)
  );

  if (items.length) return items[0];

  const all = await getDb().collection(SEO_COLLECTION).get();
  const fallback = sortSeoPages(
    all.docs
      .map((doc) => toSeoPage(doc.id, doc.data() as Record<string, any>))
      .filter((item) => item.published && !isSeoDeleted(item) && item.slug === normalized)
  );

  return fallback[0] || null;
}

/** Same slug filter as GET /api/seo?slug= */
export async function getPublishedSeoBySlug(slug: string): Promise<SeoPage | null> {
  const normalized = slugifySeo(slug);
  if (!normalized) return null;

  return unstable_cache(
    () => lookupPublishedSeoBySlug(normalized),
    ['seo-by-slug', normalized],
    { tags: ['seo', `seo:${normalized}`], revalidate: 3600 }
  )();
}
