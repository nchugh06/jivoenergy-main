import { NextResponse } from 'next/server';
import { getAuth, getDb } from '@/lib/firebaseAdmin';
import { SEO_COLLECTION, isSeoDeleted, normalizeSeoWrite, slugifySeo, toSeoPage } from '@/lib/seo';
import { SeoSlugTakenError, assertSeoSlugAvailable, claimSeoSlug, isLiveSeoPathTaken } from '@/lib/seoSlug';

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
    const doc = await getDb().collection(SEO_COLLECTION).doc(id).get();
    if (!doc.exists) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }

    return NextResponse.json({
      item: toSeoPage(doc.id, doc.data() as Record<string, any>),
    });
  } catch (error) {
    console.error('Error fetching SEO page:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const unauthorized = await requireAuth(req);
    if (unauthorized) return unauthorized;

    const { id } = await params;
    const docRef = getDb().collection(SEO_COLLECTION).doc(id);
    const existing = await docRef.get();
    if (!existing.exists) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }

    const existingData = existing.data() as Record<string, any>;
    if (isSeoDeleted(existingData)) {
      return NextResponse.json({ error: 'Restore this SEO page before editing' }, { status: 409 });
    }

    const body = await req.json();
    const payload = normalizeSeoWrite(body);
    if ('error' in payload) {
      return NextResponse.json({ error: payload.error }, { status: 400 });
    }

    if (await isLiveSeoPathTaken(payload.path, id)) {
      return NextResponse.json({ error: `SEO already exists for ${payload.path}` }, { status: 409 });
    }

    const previousSlug = slugifySeo(existingData.slug || '') || payload.slug;
    await assertSeoSlugAvailable(payload.slug, id);
    await claimSeoSlug(id, payload.slug, previousSlug);

    const now = new Date().toISOString();
    const createdAt = (existingData.createdAt as string) || now;
    await docRef.set({
      ...payload,
      deletedAt: null,
      createdAt,
      updatedAt: now,
    });

    return NextResponse.json({
      item: { id, ...payload, deletedAt: null, createdAt, updatedAt: now },
    });
  } catch (error) {
    if (error instanceof SeoSlugTakenError) {
      return NextResponse.json({ error: error.message }, { status: 409 });
    }
    console.error('Error updating SEO page:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const unauthorized = await requireAuth(req);
    if (unauthorized) return unauthorized;

    const { id } = await params;
    const docRef = getDb().collection(SEO_COLLECTION).doc(id);
    const existing = await docRef.get();
    if (!existing.exists) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }

    const now = new Date().toISOString();
    await docRef.update({
      deletedAt: now,
      updatedAt: now,
    });

    return NextResponse.json({ success: true, deletedAt: now });
  } catch (error) {
    console.error('Error deleting SEO page:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
