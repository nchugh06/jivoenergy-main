import * as admin from 'firebase-admin';

const formatPrivateKey = (key: string) => {
    return key.replace(/\\n/g, '\n');
}

const initFirebase = () => {
    if (!admin.apps.length) {
        const privateKey = process.env.FIREBASE_PRIVATE_KEY;
        const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
        const projectId = process.env.FIREBASE_PROJECT_ID;

        if (!privateKey || !clientEmail || !projectId) {
            throw new Error("Missing Firebase Admin credentials in environment variables.");
        }

        admin.initializeApp({
            credential: admin.credential.cert({
                projectId,
                clientEmail,
                privateKey: formatPrivateKey(privateKey),
            }),
            storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
        });
    }
    return admin;
};

export const getDb = () => {
    initFirebase();
    return admin.firestore();
};

export const getAuth = () => {
    initFirebase();
    return admin.auth();
};

export const getStorage = () => {
    initFirebase();
    return admin.storage();
};

