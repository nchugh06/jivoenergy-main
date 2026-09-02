import { NextResponse } from 'next/server';
import { getAuth, getDb } from '@/lib/firebaseAdmin';
import { MEDIA_COLLECTION, isMediaDeleted, normalizeMediaWrite, toMediaItem } from '@/lib/media';
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

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const unauthorized = await requireAuth(req);
    if (unauthorized) return unauthorized;

    const { id } = await params;
    const doc = await getDb().collection(MEDIA_COLLECTION).doc(id).get();
    if (!doc.exists) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }

    return NextResponse.json({
      item: toMediaItem(doc.id, doc.data() as Record<string, any>),
    });
  } catch (error) {
    console.error('Error fetching media item:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const unauthorized = await requireAuth(req);
    if (unauthorized) return unauthorized;

    const { id } = await params;
    const docRef = getDb().collection(MEDIA_COLLECTION).doc(id);
    const existing = await docRef.get();
    if (!existing.exists) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }

    const existingData = existing.data() as Record<string, any>;
    if (isMediaDeleted(existingData)) {
      return NextResponse.json({ error: 'Restore this item before editing' }, { status: 409 });
    }

    const body = await req.json();
    const payload = normalizeMediaWrite(body);
    if ('error' in payload) {
      return NextResponse.json({ error: payload.error }, { status: 400 });
    }

    const slugClash = await getDb()
      .collection(MEDIA_COLLECTION)
      .where('slug', '==', payload.slug)
      .limit(5)
      .get();

    if (slugClash.docs.some((doc) => doc.id !== id && !isMediaDeleted(doc.data()))) {
      return NextResponse.json({ error: 'A media item with this slug already exists' }, { status: 409 });
    }

    const now = new Date().toISOString();
    const createdAt = (existingData.createdAt as string) || now;
    await docRef.set({
      ...payload,
      deletedAt: null,
      createdAt,
      updatedAt: now,
    });

    revalidateTag('media', 'max');

    return NextResponse.json({
      item: { id, ...payload, deletedAt: null, createdAt, updatedAt: now },
    });
  } catch (error) {
    console.error('Error updating media item:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const unauthorized = await requireAuth(req);
    if (unauthorized) return unauthorized;

    const { id } = await params;
    const docRef = getDb().collection(MEDIA_COLLECTION).doc(id);
    const existing = await docRef.get();
    if (!existing.exists) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }

    const now = new Date().toISOString();
    await docRef.update({
      deletedAt: now,
      updatedAt: now,
    });
    revalidateTag('media', 'max');

    return NextResponse.json({ success: true, deletedAt: now });
  } catch (error) {
    console.error('Error deleting media item:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
