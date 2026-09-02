import { NextResponse } from 'next/server';
import { getAuth, getDb } from '@/lib/firebaseAdmin';
import {
    MAX_CV_BYTES,
    deleteCareerCv,
    getCvFile,
    isAllowedCv,
    uploadCareerCv,
} from '@/lib/careerCv';

const COLLECTION = 'career_applications';

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

function textField(formData: FormData, key: string) {
    const value = formData.get(key);
    return typeof value === 'string' ? value.trim() : '';
}

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const unauthorized = await requireAuth(req);
        if (unauthorized) return unauthorized;

        const { id } = await params;
        const doc = await getDb().collection(COLLECTION).doc(id).get();
        if (!doc.exists) {
            return NextResponse.json({ error: 'Not found' }, { status: 404 });
        }

        return NextResponse.json({ application: { id: doc.id, ...doc.data() } });
    } catch (error) {
        console.error('Error fetching career application:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const unauthorized = await requireAuth(req);
        if (unauthorized) return unauthorized;

        const { id } = await params;
        const docRef = getDb().collection(COLLECTION).doc(id);
        const existing = await docRef.get();
        if (!existing.exists) {
            return NextResponse.json({ error: 'Not found' }, { status: 404 });
        }

        const formData = await req.formData();
        const fullName = textField(formData, 'fullName');
        const email = textField(formData, 'email');
        const phone = textField(formData, 'phone');
        const countryCode = textField(formData, 'countryCode');
        const position = textField(formData, 'position');
        const description = textField(formData, 'description');
        const cv = getCvFile(formData.get('cv'));

        if (!fullName || !email || !phone || !position || !description) {
            return NextResponse.json({ error: 'Please fill in all required fields' }, { status: 400 });
        }

        const updates: Record<string, string> = {
            fullName,
            email,
            phone,
            countryCode,
            position,
            description,
            updatedAt: new Date().toISOString(),
        };

        if (cv) {
            if (!isAllowedCv(cv)) {
                return NextResponse.json({ error: 'CV must be a PDF, DOC, or DOCX file' }, { status: 400 });
            }
            if (cv.size > MAX_CV_BYTES) {
                return NextResponse.json({ error: 'CV must be 5MB or smaller' }, { status: 400 });
            }
            const uploaded = await uploadCareerCv(cv);
            Object.assign(updates, uploaded);
        }

        await docRef.update(updates);
        const updated = await docRef.get();

        return NextResponse.json({ application: { id: updated.id, ...updated.data() } });
    } catch (error) {
        console.error('Error updating career application:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const unauthorized = await requireAuth(req);
        if (unauthorized) return unauthorized;

        const { id } = await params;
        const docRef = getDb().collection(COLLECTION).doc(id);
        const existing = await docRef.get();
        if (!existing.exists) {
            return NextResponse.json({ error: 'Not found' }, { status: 404 });
        }

        const data = existing.data() || {};
        try {
            await deleteCareerCv(data.cvPath as string | undefined, data.cvUrl as string | undefined);
        } catch (error) {
            console.error('Error deleting career CV file:', error);
        }

        await docRef.delete();
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error deleting career application:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
