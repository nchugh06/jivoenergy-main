import { NextResponse } from 'next/server';
import { getDb } from '@/lib/firebaseAdmin';
import {
  GALLERY_COLLECTION,
  INITIAL_GALLERY_VIDEOS,
  countriesMatch,
  isGalleryDeleted,
  sortGallery,
  toGalleryVideo,
} from '@/lib/gallery';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const country = searchParams.get('country')?.trim() || '';

    const snapshot = await getDb().collection(GALLERY_COLLECTION).get();
    let items = snapshot.docs
      .map((doc) => toGalleryVideo(doc.id, doc.data() as Record<string, any>))
      .filter((item) => item.published && !isGalleryDeleted(item));

    if (snapshot.empty) {
      items = INITIAL_GALLERY_VIDEOS.filter((item) => item.published).map((item, index) => ({
        id: `seed-${index}`,
        ...item,
      }));
    }

    if (country) {
      items = items.filter((item) => item.country && countriesMatch(item.country, country));
    }

    return NextResponse.json({ items: sortGallery(items) });
  } catch (error) {
    console.error('Error fetching gallery videos:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
