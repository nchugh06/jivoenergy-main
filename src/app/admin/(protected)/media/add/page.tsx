"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { auth } from '@/lib/firebase';
import { MediaWritePayload } from '@/types/media';
import MediaForm from '@/components/admin/MediaForm';

async function adminFetch(url: string, init?: RequestInit) {
  if (!auth.currentUser) throw new Error('Not signed in');
  const token = await auth.currentUser.getIdToken();
  const headers = new Headers(init?.headers);
  headers.set('Authorization', `Bearer ${token}`);
  if (init?.body && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }
  return fetch(url, { ...init, headers });
}

async function uploadCover(file: File): Promise<string> {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('path', `media/${Date.now()}_${file.name}`);
  const response = await fetch('/api/admin/upload', { method: 'POST', body: formData });
  if (!response.ok) throw new Error('Failed to upload image');
  const data = await response.json();
  return data.url;
}

export default function AddMediaPage() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);

  const handleCreate = async (data: MediaWritePayload, imageFile: File | null) => {
    setSubmitting(true);
    try {
      let image = data.image;
      if (imageFile) {
        image = await uploadCover(imageFile);
      }
      const res = await adminFetch('/api/admin/media', {
        method: 'POST',
        body: JSON.stringify({ ...data, image }),
      });
      const payload = await res.json();
      if (!res.ok) throw new Error(payload.error || 'Failed to create');
      router.push('/admin/media');
    } catch (error) {
      console.error('Error creating media:', error);
      alert(error instanceof Error ? error.message : 'Failed to create media item');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <div className="mb-8">
        <Link
          href="/admin/media"
          className="flex items-center gap-2 text-gray-500 hover:text-[#062516] transition-colors mb-4 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Media
        </Link>
        <h1 className="section-title-spl text-gray-800">Add Media Item</h1>
        <p className="text-gray-500 mt-1">Create a newsroom item for the media page</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-1">
          <MediaForm onSubmit={handleCreate} isLoading={submitting} submitLabel="Create item" />
        </div>
      </div>
    </div>
  );
}
