import { NextResponse } from 'next/server';
import { slugifySeo } from '@/lib/seo';
import { getPublishedSeoBySlug } from '@/lib/getSeoBySlug';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const slug = slugifySeo(searchParams.get('slug') || '');
    if (!slug) {
      return NextResponse.json({ error: 'slug is required' }, { status: 400 });
    }

    const item = await getPublishedSeoBySlug(slug);
    if (!item) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }

    return NextResponse.json({ item });
  } catch (error) {
    console.error('Error fetching SEO by slug:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
