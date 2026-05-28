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
        // Simple pagination: use a timestamp offset if provided, or just allow 'page' logic if we fetch all 
        // (not efficient for large data, but for 50 records per page and "search db", simpler query logic is needed first).
        // Better: Receive a 'lastCreatedAt' for cursor pagination.
        const lastCreatedAt = searchParams.get('lastCreatedAt');
        const interest = searchParams.get('interest');
        const fromDate = searchParams.get('from');
        const toDate = searchParams.get('to');
        const search = searchParams.get('search');
        const direction = searchParams.get('direction') || 'next'; // 'next' or 'prev'

        let query = getDb().collection('contacts').orderBy('createdAt', 'desc');

        // FILTERS
        if (interest) {
            query = query.where('interest', '==', interest);
        }
        if (fromDate) {
            query = query.where('createdAt', '>=', new Date(fromDate).toISOString());
        }
        if (toDate) {
            // End of the day usually
            const end = new Date(toDate);
            end.setHours(23, 59, 59, 999);
            query = query.where('createdAt', '<=', end.toISOString());
        }

        // Search is tricky in Firestore without Algolia/ElasticSearch.
        // We can do client-side filtering on the returned page, OR
        // if search is present, we try to match exact email or name if possible.
        // For now, if search is present, we might have to fetch more docs and filter in memory, 
        // effectively "scanning" recent docs. This is a common compromise for simple admin panels.
        // Or we just rely on filters. 
        // For this strict requirement "search the db", I will just filter by simple prefix if strictly requested 
        // but that requires removing orderBy('createdAt') which breaks the timeline view.
        // Compromise: Filter in memory for the fetched batch if search is provided.

        // Total Count
        const countSnapshot = await getDb().collection('contacts').count().get();
        const total = countSnapshot.data().count;

        if (lastCreatedAt && direction === 'next') {
            // We need a doc snapshot or cursor. Using string cursor is easier.
            // However, we can't easily recreate a snapshot from just a string in admin sdk without fetching it.
            // We will use startAfter with the value.
            // Note: startAfter requires the fields in the orderBy.
            query = query.startAfter(lastCreatedAt);
        }

        // Limit
        query = query.limit(limit);

        const snapshot = await query.get();

        let leads = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));

        // In-Memory Search (Simple)
        if (search) {
            const lowerSearch = search.toLowerCase();
            leads = leads.filter((lead: any) =>
                (lead.fullName && lead.fullName.toLowerCase().includes(lowerSearch)) ||
                (lead.email && lead.email.toLowerCase().includes(lowerSearch)) ||
                (lead.phone && lead.phone.includes(search)) ||
                (lead.company && lead.company.toLowerCase().includes(lowerSearch))
            );
        }

        return NextResponse.json({
            leads,
            total,
            lastVisible: leads.length > 0 ? (leads[leads.length - 1] as any).createdAt : null,
            firstVisible: leads.length > 0 ? (leads[0] as any).createdAt : null, // useful for prev page if implemented fully
        });

    } catch (error) {
        console.error('Error fetching leads:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
