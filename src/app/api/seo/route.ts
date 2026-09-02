import { NextResponse } from 'next/server';
import { getDb } from '@/lib/firebaseAdmin';
import { SEO_COLLECTION, isSeoDeleted, slugifySeo, sortSeoPages, toSeoPage } from '@/lib/seo';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const slug = slugifySeo(searchParams.get('slug') || '');
    if (!slug) {
      return NextResponse.json({ error: 'slug is required' }, { status: 400 });
    }

    const snapshot = await getDb().collection(SEO_COLLECTION).get();
    const items = sortSeoPages(
      snapshot.docs
        .map((doc) => toSeoPage(doc.id, doc.data() as Record<string, any>))
        .filter((item) => item.published && !isSeoDeleted(item) && item.slug === slug)
    );

    if (!items.length) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }

    return NextResponse.json({ item: items[0] });
  } catch (error) {
    console.error('Error fetching SEO by slug:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
