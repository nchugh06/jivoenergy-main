import { NextResponse } from 'next/server';

function inspect(name: string, value: string | undefined, opts?: { mask?: boolean }) {
  if (value == null || value === '') {
    return { name, set: false, length: 0, value: null };
  }

  if (opts?.mask) {
    const trimmed = value.trim();
    return {
      name,
      set: true,
      length: value.length,
      startsWith: trimmed.slice(0, 16),
      endsWith: trimmed.slice(-8),
      hasLiteralBackslashN: value.includes('\\n'),
      hasRealNewlines: value.includes('\n'),
      looksLikePem: trimmed.includes('BEGIN PRIVATE KEY') || trimmed.includes('BEGIN RSA PRIVATE KEY'),
    };
  }

  return { name, set: true, length: value.length, value };
}

export async function GET() {
  return NextResponse.json({
    warning: 'Temporary debug route. Delete src/app/api/debug-env/route.ts after checking.',
    nodeEnv: process.env.NODE_ENV ?? null,
    vars: [
      inspect('NEXT_PUBLIC_SITE_ENV', process.env.NEXT_PUBLIC_SITE_ENV),
      inspect('NEXT_PUBLIC_SITE_URL', process.env.NEXT_PUBLIC_SITE_URL),
      inspect('FIREBASE_PROJECT_ID', process.env.FIREBASE_PROJECT_ID),
      inspect('FIREBASE_CLIENT_EMAIL', process.env.FIREBASE_CLIENT_EMAIL),
      inspect('FIREBASE_STORAGE_BUCKET', process.env.FIREBASE_STORAGE_BUCKET),
      inspect('FIREBASE_PRIVATE_KEY', process.env.FIREBASE_PRIVATE_KEY, { mask: true }),
    ],
  });
}
