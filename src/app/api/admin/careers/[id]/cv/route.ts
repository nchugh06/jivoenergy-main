import { NextResponse } from 'next/server';
import { getAuth, getDb, getStorage } from '@/lib/firebaseAdmin';
import { downloadFileName, storagePathFromCvUrl } from '@/lib/careerCv';

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

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const unauthorized = await requireAuth(req);
        if (unauthorized) return unauthorized;

        const { id } = await params;
        const doc = await getDb().collection('career_applications').doc(id).get();
        if (!doc.exists) {
            return NextResponse.json({ error: 'Not found' }, { status: 404 });
        }

        const data = doc.data() || {};
        const path = (data.cvPath as string) || storagePathFromCvUrl(data.cvUrl as string);
        if (!path) {
            return NextResponse.json({ error: 'No CV on file' }, { status: 404 });
        }

        const file = getStorage().bucket().file(path);
        const [exists] = await file.exists();
        if (!exists) {
            return NextResponse.json({ error: 'CV file not found' }, { status: 404 });
        }

        const [buffer] = await file.download();
        const [metadata] = await file.getMetadata();
        const filename = downloadFileName(data.cvFileName as string | undefined, path);
        const contentType = metadata.contentType || 'application/octet-stream';

        return new NextResponse(new Uint8Array(buffer), {
            headers: {
                'Content-Type': contentType,
                'Content-Disposition': `attachment; filename="${filename}"`,
                'Cache-Control': 'no-store',
            },
        });
    } catch (error) {
        console.error('Error downloading career CV:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
