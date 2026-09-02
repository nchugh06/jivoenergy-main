import { getStorage } from '@/lib/firebaseAdmin';

export const MAX_CV_BYTES = 5 * 1024 * 1024;
export const ALLOWED_CV_EXT = ['.pdf', '.doc', '.docx'];
export const ALLOWED_CV_TYPES = new Set([
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
]);

export function getCvFile(value: FormDataEntryValue | null): File | null {
  if (!value || typeof value === 'string') return null;
  const file = value as File;
  if (!file.name || !file.size) return null;
  return file;
}

export function isAllowedCv(file: File) {
  const name = file.name.toLowerCase();
  const extOk = ALLOWED_CV_EXT.some((ext) => name.endsWith(ext));
  const typeOk = !file.type || ALLOWED_CV_TYPES.has(file.type);
  return extOk && typeOk;
}

export async function uploadCareerCv(file: File) {
  const buffer = Buffer.from(await file.arrayBuffer());
  const filename = `${Date.now()}_${file.name.replace(/\s+/g, '_')}`;
  const path = `resumes/${filename}`;
  const bucket = getStorage().bucket();
  const stored = bucket.file(path);

  await stored.save(buffer, {
    contentType: file.type || 'application/octet-stream',
    metadata: {
      contentType: file.type || 'application/octet-stream',
    },
  });

  await stored.makePublic();

  return {
    cvUrl: `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${encodeURIComponent(path)}?alt=media`,
    cvPath: path,
    cvFileName: file.name,
  };
}

export function storagePathFromCvUrl(url?: string): string | null {
  if (!url) return null;
  try {
    const parsed = new URL(url);
    if (parsed.hostname.includes('firebasestorage.googleapis.com')) {
      const match = parsed.pathname.match(/\/o\/(.+)$/);
      return match ? decodeURIComponent(match[1]) : null;
    }
    if (parsed.hostname === 'storage.googleapis.com') {
      const parts = parsed.pathname.replace(/^\//, '').split('/');
      parts.shift();
      return decodeURIComponent(parts.join('/'));
    }
  } catch {
    return null;
  }
  return null;
}

export function downloadFileName(preferred?: string, path?: string | null) {
  const raw = preferred || path?.split('/').pop() || 'cv.pdf';
  return raw.replace(/[^a-zA-Z0-9._-]/g, '_');
}

export async function deleteCareerCv(cvPath?: string, cvUrl?: string) {
  const path = cvPath || storagePathFromCvUrl(cvUrl);
  if (!path) return;
  const file = getStorage().bucket().file(path);
  const [exists] = await file.exists();
  if (exists) {
    await file.delete();
  }
}
