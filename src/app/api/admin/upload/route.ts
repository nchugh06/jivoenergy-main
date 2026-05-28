import { NextResponse } from 'next/server';
import { getStorage } from '@/lib/firebaseAdmin';

export async function POST(req: Request) {
    try {
        const formData = await req.formData();
        const file = formData.get('file') as File;
        const path = formData.get('path') as string;

        if (!file || !path) {
            return NextResponse.json({ error: 'File and path are required' }, { status: 400 });
        }

        const buffer = Buffer.from(await file.arrayBuffer());
        const bucket = getStorage().bucket();
        const fileRef = bucket.file(path);

        await fileRef.save(buffer, {
            contentType: file.type,
            metadata: {
                contentType: file.type,
            },
        });

        await fileRef.makePublic();

        // Construct public URL
        // Format: https://storage.googleapis.com/BUCKET_NAME/PATH
        // Or Firebase format: https://firebasestorage.googleapis.com/v0/b/BUCKET_NAME/o/PATH?alt=media
        // let's use the one that getSignedUrl would return, or just the public link
        const publicUrl = `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${encodeURIComponent(path)}?alt=media`;

        return NextResponse.json({ url: publicUrl });

    } catch (error) {
        console.error('Error uploading file:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
