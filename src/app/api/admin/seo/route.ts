import { NextResponse } from 'next/server';
import { getAuth, getDb } from '@/lib/firebaseAdmin';
import {
  SEO_COLLECTION,
  isSeoDeleted,
  normalizeSeoWrite,
  slugifySeo,
  sortSeoPages,
  toSeoPage,
} from '@/lib/seo';
import { SeoSlugTakenError, createSeoDocument, isLiveSeoPathTaken } from '@/lib/seoSlug';

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
    const slug = slugifySeo(searchParams.get('slug') || '');
    const excludeId = searchParams.get('excludeId')?.trim() || '';
    const checkUnique = searchParams.get('checkUnique') === 'true';
    const includeDeleted = searchParams.get('includeDeleted') === 'true';

    const snapshot = await getDb().collection(SEO_COLLECTION).get();
    let items = snapshot.docs.map((doc) => toSeoPage(doc.id, doc.data() as Record<string, any>));
    items = items.filter((item) => (includeDeleted ? isSeoDeleted(item) : !isSeoDeleted(item)));

    if (checkUnique && slug) {
      const owner = snapshot.docs
        .map((doc) => toSeoPage(doc.id, doc.data() as Record<string, any>))
        .find((item) => item.slug === slug && item.id !== excludeId);
      return NextResponse.json({
        available: !owner,
        slug,
        conflict: owner ? { id: owner.id, name: owner.name, path: owner.path } : null,
      });
    }

    if (slug) {
      items = items.filter((item) => item.slug === slug);
    }

    if (search) {
      items = items.filter((item) =>
        item.path.toLowerCase().includes(search) ||
        item.name.toLowerCase().includes(search) ||
        item.slug.toLowerCase().includes(search) ||
        item.metaTitle.toLowerCase().includes(search) ||
        item.metaDescription.toLowerCase().includes(search)
      );
    }

    const sorted = sortSeoPages(items);
    if (slug) {
      return NextResponse.json({
        item: sorted[0] || null,
        items: sorted,
        total: sorted.length,
      });
    }

    return NextResponse.json({ items: sorted, total: sorted.length });
  } catch (error) {
    console.error('Error listing SEO pages:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const unauthorized = await requireAuth(req);
    if (unauthorized) return unauthorized;

    const body = await req.json();
    const payload = normalizeSeoWrite(body);
    if ('error' in payload) {
      return NextResponse.json({ error: payload.error }, { status: 400 });
    }

    if (await isLiveSeoPathTaken(payload.path)) {
      return NextResponse.json({ error: `SEO already exists for ${payload.path}` }, { status: 409 });
    }

    const item = await createSeoDocument(payload);
    return NextResponse.json({ item }, { status: 201 });
  } catch (error) {
    if (error instanceof SeoSlugTakenError) {
      return NextResponse.json({ error: error.message }, { status: 409 });
    }
    console.error('Error creating SEO page:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
