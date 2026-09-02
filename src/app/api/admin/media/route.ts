import { NextResponse } from 'next/server';
import { getAuth, getDb } from '@/lib/firebaseAdmin';
import { MEDIA_COLLECTION, isMediaDeleted, normalizeMediaWrite, sortMediaItems, toMediaItem } from '@/lib/media';
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

export async function GET(req: Request) {
  try {
    const unauthorized = await requireAuth(req);
    if (unauthorized) return unauthorized;

    const { searchParams } = new URL(req.url);
    const search = searchParams.get('search')?.trim().toLowerCase() || '';
    const includeDeleted = searchParams.get('includeDeleted') === 'true';

    const snapshot = await getDb().collection(MEDIA_COLLECTION).get();
    let items = snapshot.docs.map((doc) => toMediaItem(doc.id, doc.data() as Record<string, any>));
    items = items.filter((item) => includeDeleted ? isMediaDeleted(item) : !isMediaDeleted(item));

    if (search) {
      items = items.filter((item) =>
        item.title.toLowerCase().includes(search) ||
        item.country.toLowerCase().includes(search) ||
        item.slug.toLowerCase().includes(search) ||
        item.category.toLowerCase().includes(search)
      );
    }

    return NextResponse.json({ items: sortMediaItems(items), total: items.length });
  } catch (error) {
    console.error('Error listing media:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const unauthorized = await requireAuth(req);
    if (unauthorized) return unauthorized;

    const body = await req.json();
    const payload = normalizeMediaWrite(body);
    if ('error' in payload) {
      return NextResponse.json({ error: payload.error }, { status: 400 });
    }

    const existing = await getDb()
      .collection(MEDIA_COLLECTION)
      .where('slug', '==', payload.slug)
      .limit(5)
      .get();

    if (existing.docs.some((doc) => !isMediaDeleted(doc.data()))) {
      return NextResponse.json({ error: 'A media item with this slug already exists' }, { status: 409 });
    }

    const now = new Date().toISOString();
    const docRef = await getDb().collection(MEDIA_COLLECTION).add({
      ...payload,
      deletedAt: null,
      createdAt: now,
      updatedAt: now,
    });

    revalidateTag('media', 'max');

    return NextResponse.json({
      item: { id: docRef.id, ...payload, createdAt: now, updatedAt: now },
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating media:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
