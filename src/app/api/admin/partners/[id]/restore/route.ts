import { NextResponse } from 'next/server';
import { getAuth, getDb } from '@/lib/firebaseAdmin';
import { PARTNERS_COLLECTION, isPartnerDeleted, toPartner } from '@/lib/partners';
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

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const unauthorized = await requireAuth(req);
    if (unauthorized) return unauthorized;

    const { id } = await params;
    const docRef = getDb().collection(PARTNERS_COLLECTION).doc(id);
    const existing = await docRef.get();
    if (!existing.exists) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }

    const data = existing.data() as Record<string, any>;
    if (!isPartnerDeleted(data)) {
      return NextResponse.json({ item: toPartner(existing.id, data) });
    }

    const now = new Date().toISOString();
    await docRef.update({
      deletedAt: null,
      updatedAt: now,
    });
    revalidateTag('partners', 'max');

    const restored = await docRef.get();
    return NextResponse.json({
      item: toPartner(restored.id, restored.data() as Record<string, any>),
    });
  } catch (error) {
    console.error('Error restoring partner:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
