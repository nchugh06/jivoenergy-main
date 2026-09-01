import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import admin from 'firebase-admin';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const envPath = path.join(root, '.env');
const seedPath = path.join(root, 'src/data/team.json');
const COLLECTION = 'team_members';

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

function memberKey(item) {
  return `${(item.section || '').trim().toLowerCase()}::${(item.name || '').trim().toLowerCase()}`;
}

const env = loadEnv(envPath);
const members = JSON.parse(fs.readFileSync(seedPath, 'utf8'));

if (!Array.isArray(members) || members.length === 0) {
  throw new Error('src/data/team.json is empty');
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
const byKey = new Map();
snapshot.docs.forEach((doc) => {
  const data = doc.data();
  if (data.deletedAt) return;
  byKey.set(memberKey(data), doc);
});

let created = 0;
let updated = 0;
const now = new Date().toISOString();

for (const item of members) {
  const payload = {
    name: (item.name || '').trim(),
    role: (item.role || '').trim(),
    image: (item.image || '').trim(),
    linkedin: (item.linkedin || '').trim(),
    section: item.section,
    order: Number(item.order ?? 0),
    published: item.published !== false,
  };
  if (!payload.name || !payload.section) continue;

  const existing = byKey.get(memberKey(payload));
  if (existing) {
    const createdAt = existing.data().createdAt || now;
    await existing.ref.set({
      ...payload,
      deletedAt: null,
      createdAt,
      updatedAt: now,
    });
    updated += 1;
  } else {
    await db.collection(COLLECTION).add({
      ...payload,
      deletedAt: null,
      createdAt: now,
      updatedAt: now,
    });
    created += 1;
  }
}

console.log(`Team seed complete. created=${created} updated=${updated} total=${members.length}`);
process.exit(0);
