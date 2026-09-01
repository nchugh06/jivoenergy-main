"use client";

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { auth } from '@/lib/firebase';
import { Partner, PartnerWritePayload } from '@/types/partner';
import PartnerForm from '@/components/admin/PartnerForm';

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

async function uploadLogo(file: File): Promise<string> {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('path', `partners/${Date.now()}_${file.name}`);
  const response = await fetch('/api/admin/upload', { method: 'POST', body: formData });
  if (!response.ok) throw new Error('Failed to upload logo');
  const data = await response.json();
  return data.url;
}

export default function EditPartnerPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const [item, setItem] = useState<Partner | null>(null);
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
        const res = await adminFetch(`/api/admin/partners/${id}`);
        if (!res.ok) {
          alert('Partner not found');
          router.push('/admin/partners');
          return;
        }
        const data = await res.json();
        if (data.item?.deletedAt) {
          alert('Restore this partner before editing');
          router.push('/admin/partners');
          return;
        }
        setItem(data.item);
      } catch (error) {
        console.error('Error fetching partner:', error);
        alert('Failed to fetch partner');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id, router]);

  const handleUpdate = async (data: PartnerWritePayload, imageFile: File | null) => {
    setSubmitting(true);
    try {
      let image = data.image;
      if (imageFile) {
        image = await uploadLogo(imageFile);
      }
      const res = await adminFetch(`/api/admin/partners/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ ...data, image }),
      });
      const payload = await res.json();
      if (!res.ok) throw new Error(payload.error || 'Failed to update');
      router.push('/admin/partners');
    } catch (error) {
      console.error('Error updating partner:', error);
      alert(error instanceof Error ? error.message : 'Failed to update partner');
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
          href="/admin/partners"
          className="flex items-center gap-2 text-gray-500 hover:text-[#062516] transition-colors mb-4 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Partners
        </Link>
        <h1 className="section-title-spl text-gray-800">Edit Partner Logo</h1>
        <p className="text-gray-500 mt-1">Update section, order, or publish status</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-1">
          {item && (
            <PartnerForm
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
