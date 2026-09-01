import { NextResponse } from 'next/server';
import { getDb } from '@/lib/firebaseAdmin';
import {
  INITIAL_PARTNERS,
  PARTNERS_COLLECTION,
  isPartnerDeleted,
  isPartnerSection,
  sortPartners,
  toPartner,
} from '@/lib/partners';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const section = searchParams.get('section') || '';

    const snapshot = await getDb().collection(PARTNERS_COLLECTION).get();
    let items = snapshot.docs
      .map((doc) => toPartner(doc.id, doc.data() as Record<string, any>))
      .filter((item) => item.published && !isPartnerDeleted(item));

    if (snapshot.empty) {
      items = INITIAL_PARTNERS.filter((item) => item.published).map((item, index) => ({
        id: `seed-${index}`,
        ...item,
      }));
    }

    if (section) {
      if (!isPartnerSection(section)) {
        return NextResponse.json({ error: 'Invalid section' }, { status: 400 });
      }
      items = items.filter((item) => item.section === section);
    }

    return NextResponse.json({ items: sortPartners(items) });
  } catch (error) {
    console.error('Error fetching partners:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
