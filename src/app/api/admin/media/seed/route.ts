import { NextResponse } from 'next/server';
import { getAuth, getDb } from '@/lib/firebaseAdmin';
import { MEDIA_COLLECTION, mapNewsJsonToMedia } from '@/lib/media';
import { NewsJsonItem } from '@/types/media';
import newsData from '@/data/news.json';
import { revalidateTag } from 'next/cache';

async function requireAuth(req: Request) {
  const authHeader = req.headers.get('Authorization');
  if (!authHeader?.startsWith('Bearer ')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const token = authHeader.split('Bearer ')[1];
  try {
    await getAuth().verifyIdToken(token);
    return null;
  } catch {
    return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
  }
}

export async function POST(req: Request) {
  try {
    const unauthorized = await requireAuth(req);
    if (unauthorized) return unauthorized;

    const source = newsData as NewsJsonItem[];
    const snapshot = await getDb().collection(MEDIA_COLLECTION).get();
    const bySlug = new Map<string, (typeof snapshot.docs)[number]>();
    snapshot.docs.forEach((doc) => {
      const slug = (doc.data().slug as string) || '';
      if (slug) bySlug.set(slug, doc);
    });

    let created = 0;
    let updated = 0;
    const now = new Date().toISOString();

    for (let i = 0; i < source.length; i++) {
      const payload = mapNewsJsonToMedia(source[i], i);
      if (!payload.slug) continue;

      const existing = bySlug.get(payload.slug);
      if (existing) {
        const createdAt = (existing.data().createdAt as string) || now;
        await existing.ref.set({
          ...payload,
          createdAt,
          updatedAt: now,
        });
        updated += 1;
      } else {
        await getDb().collection(MEDIA_COLLECTION).add({
          ...payload,
          createdAt: now,
          updatedAt: now,
        });
        created += 1;
      }
    }

    revalidateTag('media', 'max');

    return NextResponse.json({
      created,
      updated,
      skipped: 0,
      total: source.length,
    });
  } catch (error) {
    console.error('Error seeding media:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
