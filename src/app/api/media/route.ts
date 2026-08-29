import { NextResponse } from 'next/server';
import { getDb } from '@/lib/firebaseAdmin';
import { MEDIA_COLLECTION, sortMediaItems, toMediaItem } from '@/lib/media';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const featured = searchParams.get('featured') === 'true';

    const snapshot = await getDb().collection(MEDIA_COLLECTION).get();
    let items = snapshot.docs.map((doc) => toMediaItem(doc.id, doc.data() as Record<string, any>));

    items = items.filter((item) => item.published);
    if (featured) {
      items = items.filter((item) => item.featured);
    }

    return NextResponse.json({ items: sortMediaItems(items) });
  } catch (error) {
    console.error('Error fetching media:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
