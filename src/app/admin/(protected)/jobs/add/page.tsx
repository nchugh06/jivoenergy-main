"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { auth } from '@/lib/firebase';
import { JobWritePayload } from '@/types/job';
import JobForm from '@/components/admin/JobForm';

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

async function uploadPdf(file: File): Promise<string> {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('path', `jobs/${Date.now()}_${file.name}`);
  const response = await fetch('/api/admin/upload', { method: 'POST', body: formData });
  if (!response.ok) throw new Error('Failed to upload PDF');
  const data = await response.json();
  return data.url;
}

export default function AddJobPage() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);

  const handleCreate = async (data: JobWritePayload, pdfFile: File | null) => {
    setSubmitting(true);
    try {
      let pdfUrl = data.pdfUrl;
      if (pdfFile) {
        pdfUrl = await uploadPdf(pdfFile);
      }
      const res = await adminFetch('/api/admin/jobs', {
        method: 'POST',
        body: JSON.stringify({ ...data, pdfUrl }),
      });
      const payload = await res.json();
      if (!res.ok) throw new Error(payload.error || 'Failed to create');
      router.push('/admin/jobs');
    } catch (error) {
      console.error('Error creating job:', error);
      alert(error instanceof Error ? error.message : 'Failed to create job');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <div className="mb-8">
        <Link
          href="/admin/jobs"
          className="flex items-center gap-2 text-gray-500 hover:text-[#062516] transition-colors mb-4 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Job Openings
        </Link>
        <h1 className="section-title-spl text-gray-800">Add Job Opening</h1>
        <p className="text-gray-500 mt-1">Publish a listing on the careers page</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-1">
          <JobForm onSubmit={handleCreate} isLoading={submitting} submitLabel="Publish job" />
        </div>
      </div>
    </div>
  );
}
