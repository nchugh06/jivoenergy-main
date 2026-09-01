import { NextResponse } from 'next/server';
import { getAuth, getDb } from '@/lib/firebaseAdmin';
import { INITIAL_JOBS, JOBS_COLLECTION } from '@/lib/jobs';
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

export async function POST(req: Request) {
  try {
    const unauthorized = await requireAuth(req);
    if (unauthorized) return unauthorized;

    const snapshot = await getDb().collection(JOBS_COLLECTION).get();
    const byTitle = new Map<string, (typeof snapshot.docs)[number]>();
    snapshot.docs.forEach((doc) => {
      const data = doc.data();
      if (data.deletedAt) return;
      const title = ((data.title as string) || '').trim().toLowerCase();
      if (title) byTitle.set(title, doc);
    });

    let created = 0;
    let updated = 0;
    const now = new Date().toISOString();

    for (const payload of INITIAL_JOBS) {
      const key = payload.title.trim().toLowerCase();
      const existing = byTitle.get(key);
      if (existing) {
        const createdAt = (existing.data().createdAt as string) || now;
        await existing.ref.set({
          ...payload,
          deletedAt: null,
          createdAt,
          updatedAt: now,
        });
        updated += 1;
      } else {
        await getDb().collection(JOBS_COLLECTION).add({
          ...payload,
          deletedAt: null,
          createdAt: now,
          updatedAt: now,
        });
        created += 1;
      }
    }

    revalidateTag('jobs', 'max');

    return NextResponse.json({
      created,
      updated,
      total: INITIAL_JOBS.length,
    });
  } catch (error) {
    console.error('Error seeding jobs:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
