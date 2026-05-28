import { NextResponse } from 'next/server';
import { getDb, getAuth } from '@/lib/firebaseAdmin';

export async function GET(req: Request) {
    try {
        const authHeader = req.headers.get('Authorization');
        if (!authHeader?.startsWith('Bearer ')) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const token = authHeader.split('Bearer ')[1];
        try {
            await getAuth().verifyIdToken(token);
        } catch (e) {
            return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
        }

        const { searchParams } = new URL(req.url);
        const limit = parseInt(searchParams.get('limit') || '50');
        const lastCreatedAt = searchParams.get('lastCreatedAt');
        const search = searchParams.get('search');

        let query = getDb().collection('career_applications').orderBy('createdAt', 'desc');

        if (lastCreatedAt) {
            query = query.startAfter(lastCreatedAt);
        }

        query = query.limit(limit);

        const snapshot = await query.get();

        let applications = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));

        // In-Memory Search (Simple)
        if (search) {
            const lowerSearch = search.toLowerCase();
            applications = applications.filter((app: any) =>
                (app.fullName && app.fullName.toLowerCase().includes(lowerSearch)) ||
                (app.email && app.email.toLowerCase().includes(lowerSearch)) ||
                (app.position && app.position.toLowerCase().includes(lowerSearch))
            );
        }

        // Total Count
        const countSnapshot = await getDb().collection('career_applications').count().get();
        const total = countSnapshot.data().count;

        return NextResponse.json({
            applications,
            total,
            lastVisible: applications.length > 0 ? (applications[applications.length - 1] as any).createdAt : null,
        });

    } catch (error) {
        console.error('Error fetching careers:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
