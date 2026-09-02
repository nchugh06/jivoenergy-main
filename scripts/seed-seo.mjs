import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import admin from 'firebase-admin';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const envPath = path.join(root, '.env');
const seedPath = path.join(root, 'src/data/seo.json');
const COLLECTION = 'seo_pages';
const SLUG_INDEX = 'seo_slugs';

function loadEnv(file) {
  const env = {};
  if (!fs.existsSync(file)) {
    throw new Error(`Missing ${file}`);
  }
  for (const line of fs.readFileSync(file, 'utf8').split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eq = trimmed.indexOf('=');
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    let value = trimmed.slice(eq + 1).trim();
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }
    env[key] = value.replace(/\\n/g, '\n');
  }
  return env;
}

function normalizePath(value) {
  let pagePath = String(value || '').trim();
  if (!pagePath) return '';
  if (!pagePath.startsWith('/')) pagePath = `/${pagePath}`;
  if (pagePath.length > 1) pagePath = pagePath.replace(/\/+$/, '');
  return pagePath;
}

function slugifySeo(value) {
  return String(value || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/-{2,}/g, '-')
    .replace(/^-+|-+$/g, '');
}

function slugFromPath(pagePath) {
  const normalized = normalizePath(pagePath);
  if (normalized === '/') return 'home';
  return slugifySeo(normalized.replace(/^\//, '').replace(/\//g, '-'));
}

function nameFromPath(pagePath) {
  const normalized = normalizePath(pagePath);
  if (normalized === '/') return 'Home';
  const acronyms = { pv: 'PV', bess: 'BESS', esg: 'ESG' };
  return normalized
    .replace(/^\//, '')
    .split('/')
    .map((segment) =>
      segment
        .split('-')
        .map((word) => acronyms[word] || (word.charAt(0).toUpperCase() + word.slice(1)))
        .join(' ')
    )
    .join(' / ');
}

const env = loadEnv(envPath);
const records = JSON.parse(fs.readFileSync(seedPath, 'utf8'));

if (!Array.isArray(records) || records.length === 0) {
  throw new Error('src/data/seo.json is empty');
}

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: env.FIREBASE_PROJECT_ID,
      clientEmail: env.FIREBASE_CLIENT_EMAIL,
      privateKey: env.FIREBASE_PRIVATE_KEY,
    }),
  });
}

const db = admin.firestore();
const snapshot = await db.collection(COLLECTION).get();
const byPath = new Map();
const bySlug = new Map();
snapshot.docs.forEach((doc) => {
  const data = doc.data();
  const pagePath = normalizePath(data.path);
  const slug = slugifySeo(data.slug || '') || slugFromPath(pagePath);
  if (pagePath) byPath.set(pagePath, doc);
  if (slug) bySlug.set(slug, doc.id);
});

let created = 0;
let updated = 0;
let skipped = 0;
const now = new Date().toISOString();

for (const item of records) {
  const pagePath = normalizePath(item.path);
  const metaTitle = String(item.metaTitle || '').trim();
  const metaDescription = String(item.metaDescription || '').trim();
  if (!pagePath || !metaTitle || !metaDescription) continue;

  const payload = {
    name: String(item.name || '').trim() || nameFromPath(pagePath),
    slug: slugifySeo(item.slug || '') || slugFromPath(pagePath),
    path: pagePath,
    metaTitle,
    metaDescription,
    keywords: '',
    canonicalUrl: '',
    robotsIndex: true,
    robotsFollow: true,
    ogTitle: metaTitle,
    ogDescription: metaDescription,
    ogImage: '',
    ogType: 'website',
    twitterCard: 'summary_large_image',
    twitterTitle: metaTitle,
    twitterDescription: metaDescription,
    twitterImage: '',
    published: true,
  };

  const existing = byPath.get(pagePath);
  const slugOwnerId = bySlug.get(payload.slug);
  if (slugOwnerId && (!existing || existing.id !== slugOwnerId)) {
    console.error(`Skipping ${pagePath}: slug "${payload.slug}" is already used by another record`);
    skipped += 1;
    continue;
  }

  if (existing) {
    const createdAt = existing.data().createdAt || now;
    const previousSlug = slugifySeo(existing.data().slug || '') || slugFromPath(pagePath);
    await existing.ref.set({
      ...payload,
      deletedAt: null,
      createdAt,
      updatedAt: now,
    });
    if (previousSlug && previousSlug !== payload.slug) {
      await db.collection(SLUG_INDEX).doc(previousSlug).delete().catch(() => {});
    }
    await db.collection(SLUG_INDEX).doc(payload.slug).set({ seoId: existing.id, slug: payload.slug });
    bySlug.set(payload.slug, existing.id);
    updated += 1;
  } else {
    const docRef = await db.collection(COLLECTION).add({
      ...payload,
      deletedAt: null,
      createdAt: now,
      updatedAt: now,
    });
    await db.collection(SLUG_INDEX).doc(payload.slug).set({ seoId: docRef.id, slug: payload.slug });
    byPath.set(pagePath, await docRef.get());
    bySlug.set(payload.slug, docRef.id);
    created += 1;
  }
}

console.log(`SEO seed complete. created=${created} updated=${updated} skipped=${skipped} total=${records.length}`);
process.exit(0);
