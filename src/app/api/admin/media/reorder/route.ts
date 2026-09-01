import { NextResponse } from 'next/server';
import { getAuth } from '@/lib/firebaseAdmin';
import { MEDIA_COLLECTION } from '@/lib/media';
import { reorderFirestoreDocs } from '@/lib/adminReorder';

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

export async function PUT(req: Request) {
  try {
    const unauthorized = await requireAuth(req);
    if (unauthorized) return unauthorized;

    const body = await req.json();
    const items = Array.isArray(body?.items) ? body.items : [];
    if (!items.length) {
      return NextResponse.json({ error: 'No items to reorder' }, { status: 400 });
    }

    await reorderFirestoreDocs(MEDIA_COLLECTION, items, 'media');
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error reordering media:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
