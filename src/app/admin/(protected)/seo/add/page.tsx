"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { auth } from '@/lib/firebase';
import { SeoWritePayload } from '@/types/seo';
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

export default function AddSeoPage() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);

  const handleCreate = async (
    data: SeoWritePayload,
    files: { ogImageFile: File | null; twitterImageFile: File | null }
  ) => {
    setSubmitting(true);
    try {
      let ogImage = data.ogImage;
      let twitterImage = data.twitterImage;
      if (files.ogImageFile) ogImage = await uploadImage(files.ogImageFile, 'og');
      if (files.twitterImageFile) twitterImage = await uploadImage(files.twitterImageFile, 'twitter');
      const res = await adminFetch('/api/admin/seo', {
        method: 'POST',
        body: JSON.stringify({ ...data, ogImage, twitterImage }),
      });
      const payload = await res.json();
      if (!res.ok) throw new Error(payload.error || 'Failed to create');
      router.push('/admin/seo');
    } catch (error) {
      console.error('Error creating SEO page:', error);
      alert(error instanceof Error ? error.message : 'Failed to create SEO page');
    } finally {
      setSubmitting(false);
    }
  };

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
        <h1 className="section-title-spl text-gray-800">Add page SEO</h1>
        <p className="text-gray-500 mt-1">Meta tags, Open Graph and Twitter fields for one URL</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-1">
          <SeoForm onSubmit={handleCreate} isLoading={submitting} submitLabel="Save SEO" />
        </div>
      </div>
    </div>
  );
}
