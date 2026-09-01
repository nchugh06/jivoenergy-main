import { getDb } from '@/lib/firebaseAdmin';
import { revalidateTag } from 'next/cache';

export async function reorderFirestoreDocs(
  collectionName: string,
  items: Array<{ id?: string; order?: number }>,
  tag: string
) {
  const db = getDb();
  const batch = db.batch();
  const now = new Date().toISOString();
  let count = 0;

  for (const item of items) {
    if (!item?.id) continue;
    const order = Number(item.order);
    if (!Number.isFinite(order)) continue;
    batch.update(db.collection(collectionName).doc(item.id), {
      order,
      updatedAt: now,
    });
    count += 1;
  }

  if (!count) {
    throw new Error('No items to reorder');
  }

  await batch.commit();
  revalidateTag(tag, 'max');
}
