"use client";

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { auth } from '@/lib/firebase';
import { SeoPage, SeoWritePayload } from '@/types/seo';
import SeoForm from '@/components/admin/SeoForm';

async function adminFetch(url: string, init?: RequestInit) {
  if (!auth.currentUser) throw new Error('Not signed in');
  const token = await auth.currentUser.getIdToken();
  const headers = new Headers(init?.headers);
  headers.set('Authorization', `Bearer ${token}`);
  if (init?.body && typeof init.body === 'string' && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }
  return fetch(url, { ...init, headers });
}

async function uploadImage(file: File, folder: string): Promise<string> {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('path', `seo/${folder}/${Date.now()}_${file.name}`);
  const response = await fetch('/api/admin/upload', { method: 'POST', body: formData });
  if (!response.ok) throw new Error('Failed to upload image');
  const data = await response.json();
  return data.url;
}

export default function EditSeoPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const [item, setItem] = useState<SeoPage | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        let attempts = 0;
        while (!auth.currentUser && attempts < 8) {
          await new Promise((r) => setTimeout(r, 200));
          attempts += 1;
        }
        if (!auth.currentUser || !id) return;
        const res = await adminFetch(`/api/admin/seo/${id}`);
        if (!res.ok) {
          alert('SEO record not found');
          router.push('/admin/seo');
          return;
        }
        const data = await res.json();
        if (data.item?.deletedAt) {
          alert('Restore this SEO record before editing');
          router.push('/admin/seo');
          return;
        }
        setItem(data.item);
      } catch (error) {
        console.error('Error fetching SEO page:', error);
        alert('Failed to fetch SEO page');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id, router]);

  const handleUpdate = async (
    data: SeoWritePayload,
    files: { ogImageFile: File | null; twitterImageFile: File | null }
  ) => {
    setSubmitting(true);
    try {
      let ogImage = data.ogImage;
      let twitterImage = data.twitterImage;
      if (files.ogImageFile) ogImage = await uploadImage(files.ogImageFile, 'og');
      if (files.twitterImageFile) twitterImage = await uploadImage(files.twitterImageFile, 'twitter');
      const res = await adminFetch(`/api/admin/seo/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ ...data, ogImage, twitterImage }),
      });
      const payload = await res.json();
      if (!res.ok) throw new Error(payload.error || 'Failed to update');
      router.push('/admin/seo');
    } catch (error) {
      console.error('Error updating SEO page:', error);
      alert(error instanceof Error ? error.message : 'Failed to update SEO page');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-[#062516]" />
      </div>
    );
  }

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <div className="mb-8">
        <Link
          href="/admin/seo"
          className="flex items-center gap-2 text-gray-500 hover:text-[#062516] transition-colors mb-4 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to SEO
        </Link>
        <h1 className="section-title-spl text-gray-800">Edit page SEO</h1>
        <p className="text-gray-500 mt-1">{item?.path || 'Update meta tags for this URL'}</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-1">
          {item && (
            <SeoForm
              initialData={item}
              onSubmit={handleUpdate}
              isLoading={submitting}
              submitLabel="Save changes"
            />
          )}
        </div>
      </div>
    </div>
  );
}
