
import { NextResponse } from 'next/server';
import { getDb, getAuth } from '@/lib/firebaseAdmin';

// GET: Fetch history for a lead
export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
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

        const { id } = await params;

        const snapshot = await getDb().collection('contacts')
            .doc(id)
            .collection('history')
            .orderBy('timestamp', 'desc')
            .get();

        const history = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));

        return NextResponse.json({ history });
    } catch (error) {
        console.error('Error fetching history:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

// POST: Add a new remark
export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
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

        const { id } = await params;
        const body = await req.json();
        const { remark, createdBy } = body;

        if (!remark) {
            return NextResponse.json({ error: 'Remark is required' }, { status: 400 });
        }

        const newRemark = {
            remark,
            timestamp: new Date().toISOString(),
            createdBy: createdBy || 'Admin', // In a real app, verify admin ID
        };

        await getDb().collection('contacts').doc(id).collection('history').add(newRemark);

        // Optionally update the main doc with the latest remark for easier viewing
        // await db.collection('contacts').doc(id).update({ latestRemark: remark });

        return NextResponse.json({ message: 'Remark saved', remark: newRemark }, { status: 200 });
    } catch (error) {
        console.error('Error saving remark:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
