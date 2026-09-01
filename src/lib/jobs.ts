import { JobOpening, JobWritePayload } from '@/types/job';

export const JOBS_COLLECTION = 'job_openings';

export const INITIAL_JOBS: JobWritePayload[] = [
  {
    title: 'Technical Manager - Electrical',
    experience: '5 to 10 years',
    location: 'Africa (travel required)',
    pdfUrl: '/careers/Technical Manager JD for Careers Page.pdf',
    order: 0,
    published: true,
  },
  {
    title: 'Logistics Manager',
    experience: '4 to 7 years',
    location: 'Gurgaon, India (travel required)',
    pdfUrl: '/careers/Logistics Manager JD for Careers Page.pdf',
    order: 1,
    published: false,
  },
  {
    title: 'HSES Manager',
    experience: '5 to 7 years',
    location: 'Gurgaon, India (travel required)',
    pdfUrl: '/careers/HSES Manager JD for Careers Page.pdf',
    order: 2,
    published: false,
  },
];

export function isJobDeleted(item: { deletedAt?: string | null }): boolean {
  return Boolean(item.deletedAt);
}

export function sortJobs<T extends { order?: number; createdAt?: string }>(items: T[]): T[] {
  return [...items].sort((a, b) => {
    const orderA = Number(a.order ?? 9999);
    const orderB = Number(b.order ?? 9999);
    if (orderA !== orderB) return orderA - orderB;
    return String(b.createdAt ?? '').localeCompare(String(a.createdAt ?? ''));
  });
}

export function normalizeJobWrite(
  body: Partial<JobWritePayload> & { title?: string }
): JobWritePayload | { error: string } {
  const title = (body.title || '').trim();
  if (!title) return { error: 'Title is required' };

  return {
    title,
    experience: (body.experience || '').trim(),
    location: (body.location || '').trim(),
    pdfUrl: (body.pdfUrl || '').trim(),
    order: Number.isFinite(Number(body.order)) ? Number(body.order) : 0,
    published: body.published !== false,
  };
}

export function toJobOpening(id: string, data: Record<string, any>): JobOpening {
  return {
    id,
    title: data.title || '',
    experience: data.experience || '',
    location: data.location || '',
    pdfUrl: data.pdfUrl || '',
    order: Number(data.order ?? 0),
    published: data.published !== false,
    deletedAt: data.deletedAt || null,
    createdAt: data.createdAt || '',
    updatedAt: data.updatedAt || '',
  };
}
