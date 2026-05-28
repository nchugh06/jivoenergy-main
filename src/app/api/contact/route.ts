import { NextResponse } from 'next/server';
import { getDb } from '@/lib/firebaseAdmin';

export async function POST(req: Request) {
    try {
        const data = await req.json();

        // Add timestamp
        const submission = {
            ...data,
            createdAt: new Date().toISOString(),
        };

        console.log('Received contact form submission:', submission);

        // Save to Firestore
        await getDb().collection('contacts').add(submission);

        return NextResponse.json({ message: 'Message sent successfully' }, { status: 200 });
    } catch (error) {
        console.error('Error saving contact form submission:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
