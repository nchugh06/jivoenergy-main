import { NextResponse } from 'next/server';
import { getAuth, getDb } from '@/lib/firebaseAdmin';
import { SEO_COLLECTION, isSeoDeleted, toSeoPage } from '@/lib/seo';
import { SeoSlugTakenError, claimSeoSlug } from '@/lib/seoSlug';

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

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const unauthorized = await requireAuth(req);
    if (unauthorized) return unauthorized;

    const { id } = await params;
    const docRef = getDb().collection(SEO_COLLECTION).doc(id);
    const existing = await docRef.get();
    if (!existing.exists) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }

    const data = existing.data() as Record<string, any>;
    if (!isSeoDeleted(data)) {
      return NextResponse.json({ item: toSeoPage(existing.id, data) });
    }

    const restoring = toSeoPage(existing.id, data);
    const snapshot = await getDb().collection(SEO_COLLECTION).get();
    const liveConflict = snapshot.docs
      .map((doc) => toSeoPage(doc.id, doc.data() as Record<string, any>))
      .find((item) => item.id !== id && !isSeoDeleted(item) && (item.path === restoring.path || item.slug === restoring.slug));
    if (liveConflict) {
      return NextResponse.json(
        { error: `A live SEO record already exists for ${liveConflict.path === restoring.path ? restoring.path : `slug "${restoring.slug}"`}` },
        { status: 409 }
      );
    }

    await claimSeoSlug(id, restoring.slug);
    const now = new Date().toISOString();
    await docRef.update({
      deletedAt: null,
      updatedAt: now,
    });

    const restored = await docRef.get();
    return NextResponse.json({
      item: toSeoPage(restored.id, restored.data() as Record<string, any>),
    });
  } catch (error) {
    if (error instanceof SeoSlugTakenError) {
      return NextResponse.json({ error: error.message }, { status: 409 });
    }
    console.error('Error restoring SEO page:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
