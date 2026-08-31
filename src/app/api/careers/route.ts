import { NextResponse } from 'next/server';
import { getDb } from '@/lib/firebaseAdmin';
import {
    MAX_CV_BYTES,
    getCvFile,
    isAllowedCv,
    uploadCareerCv,
} from '@/lib/careerCv';

function textField(formData: FormData, key: string) {
    const value = formData.get(key);
    return typeof value === 'string' ? value.trim() : '';
}

export async function POST(req: Request) {
    try {
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
        if (!cv) {
            return NextResponse.json({ error: 'Please attach your CV' }, { status: 400 });
        }
        if (!isAllowedCv(cv)) {
            return NextResponse.json({ error: 'CV must be a PDF, DOC, or DOCX file' }, { status: 400 });
        }
        if (cv.size > MAX_CV_BYTES) {
            return NextResponse.json({ error: 'CV must be 5MB or smaller' }, { status: 400 });
        }

        const uploaded = await uploadCareerCv(cv);

        const application = {
            fullName,
            email,
            phone,
            countryCode,
            position,
            description,
            ...uploaded,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };

        await getDb().collection('career_applications').add(application);

        return NextResponse.json({ message: 'Application submitted successfully' }, { status: 200 });
    } catch (error) {
        console.error('Error submitting application:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
