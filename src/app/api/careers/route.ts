import { NextResponse } from 'next/server';
import { getDb, getStorage } from '@/lib/firebaseAdmin';

export async function POST(req: Request) {
    try {
        const formData = await req.formData();

        const fullName = formData.get('fullName') as string;
        const email = formData.get('email') as string;
        const phone = formData.get('phone') as string;
        const countryCode = formData.get('countryCode') as string;
        const position = formData.get('position') as string;
        const description = formData.get('description') as string;
        const cv = formData.get('cv') as File | null;

        let cvUrl = '';

        if (cv) {
            const buffer = Buffer.from(await cv.arrayBuffer());
            const filename = `${Date.now()}_${cv.name.replace(/\s+/g, '_')}`;
            const bucket = getStorage().bucket();
            const file = bucket.file(`resumes/${filename}`);

            await file.save(buffer, {
                metadata: {
                    contentType: cv.type,
                },
            });

            await file.makePublic();
            cvUrl = file.publicUrl();
        }

        const application = {
            fullName,
            email,
            phone,
            countryCode,
            position,
            description,
            cvUrl,
            createdAt: new Date().toISOString(),
        };

        console.log('Received career application:', application);

        await getDb().collection('career_applications').add(application);

        return NextResponse.json({ message: 'Application submitted successfully' }, { status: 200 });
    } catch (error) {
        console.error('Error submitting application:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
