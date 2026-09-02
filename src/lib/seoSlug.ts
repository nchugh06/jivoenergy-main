import { getDb } from '@/lib/firebaseAdmin';
import type { SeoWritePayload } from '@/types/seo';
import { SEO_COLLECTION, SEO_SLUG_INDEX, isSeoDeleted, toSeoPage } from '@/lib/seo';

export class SeoSlugTakenError extends Error {
  constructor(public slug: string) {
    super(`Slug "${slug}" is already in use. Choose a different slug.`);
    this.name = 'SeoSlugTakenError';
  }
}

export async function findSeoBySlug(slug: string, excludeId?: string) {
  const snapshot = await getDb().collection(SEO_COLLECTION).get();
  return snapshot.docs
    .map((doc) => toSeoPage(doc.id, doc.data() as Record<string, any>))
    .find((item) => item.slug === slug && item.id !== excludeId);
}

export async function assertSeoSlugAvailable(slug: string, excludeId?: string) {
  const owner = await findSeoBySlug(slug, excludeId);
  if (owner) throw new SeoSlugTakenError(slug);
}

export async function claimSeoSlug(seoId: string, slug: string, previousSlug?: string | null) {
  const db = getDb();
  const slugRef = db.collection(SEO_SLUG_INDEX).doc(slug);

  await db.runTransaction(async (tx) => {
    const owned = await tx.get(slugRef);
    if (owned.exists) {
      const ownerId = String(owned.data()?.seoId || '');
      if (ownerId && ownerId !== seoId) {
        throw new SeoSlugTakenError(slug);
      }
    }

    if (previousSlug && previousSlug !== slug) {
      const prevRef = db.collection(SEO_SLUG_INDEX).doc(previousSlug);
      const prev = await tx.get(prevRef);
      if (prev.exists && String(prev.data()?.seoId || '') === seoId) {
        tx.delete(prevRef);
      }
    }

    tx.set(slugRef, { seoId, slug });
  });
}

export async function isLiveSeoPathTaken(path: string, excludeId?: string) {
  const snapshot = await getDb().collection(SEO_COLLECTION).get();
  return snapshot.docs
    .map((doc) => toSeoPage(doc.id, doc.data() as Record<string, any>))
    .some((item) => item.path === path && item.id !== excludeId && !isSeoDeleted(item));
}

export async function createSeoDocument(payload: SeoWritePayload) {
  await assertSeoSlugAvailable(payload.slug);

  const db = getDb();
  const docRef = db.collection(SEO_COLLECTION).doc();
  const now = new Date().toISOString();
  await claimSeoSlug(docRef.id, payload.slug);
  await docRef.set({
    ...payload,
    deletedAt: null,
    createdAt: now,
    updatedAt: now,
  });

  return { id: docRef.id, ...payload, deletedAt: null, createdAt: now, updatedAt: now };
}
