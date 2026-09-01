import { NextResponse } from 'next/server';
import { getDb } from '@/lib/firebaseAdmin';
import {
  INITIAL_TEAM,
  TEAM_COLLECTION,
  isTeamDeleted,
  isTeamSection,
  sortTeam,
  toTeamMember,
} from '@/lib/team';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const section = searchParams.get('section') || '';

    const snapshot = await getDb().collection(TEAM_COLLECTION).get();
    let items = snapshot.docs
      .map((doc) => toTeamMember(doc.id, doc.data() as Record<string, any>))
      .filter((item) => item.published && !isTeamDeleted(item));

    if (snapshot.empty) {
      items = INITIAL_TEAM.filter((item) => item.published).map((item, index) => ({
        id: `seed-${index}`,
        ...item,
      }));
    }

    if (section) {
      if (!isTeamSection(section)) {
        return NextResponse.json({ error: 'Invalid section' }, { status: 400 });
      }
      items = items.filter((item) => item.section === section);
    }

    return NextResponse.json({ items: sortTeam(items) });
  } catch (error) {
    console.error('Error fetching team:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
