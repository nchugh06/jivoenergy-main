import { NextResponse } from 'next/server';
import { getDb } from '@/lib/firebaseAdmin';
import { INITIAL_JOBS, JOBS_COLLECTION, isJobDeleted, sortJobs, toJobOpening } from '@/lib/jobs';

export async function GET() {
  try {
    const snapshot = await getDb().collection(JOBS_COLLECTION).get();
    let items = snapshot.docs
      .map((doc) => toJobOpening(doc.id, doc.data() as Record<string, any>))
      .filter((job) => job.published && !isJobDeleted(job));

    if (snapshot.empty) {
      items = INITIAL_JOBS.filter((job) => job.published).map((job, index) => ({
        id: `seed-${index}`,
        ...job,
      }));
    }

    return NextResponse.json({ items: sortJobs(items) });
  } catch (error) {
    console.error('Error fetching job openings:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
