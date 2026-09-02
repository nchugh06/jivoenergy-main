"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { auth } from '@/lib/firebase';
import { TeamWritePayload } from '@/types/team';
import TeamForm from '@/components/admin/TeamForm';

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

async function uploadPhoto(file: File): Promise<string> {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('path', `team/${Date.now()}_${file.name}`);
  const response = await fetch('/api/admin/upload', { method: 'POST', body: formData });
  if (!response.ok) throw new Error('Failed to upload photo');
  const data = await response.json();
  return data.url;
}

export default function AddTeamPage() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);

  const handleCreate = async (data: TeamWritePayload, imageFile: File | null) => {
    setSubmitting(true);
    try {
      let image = data.image;
      if (imageFile) {
        image = await uploadPhoto(imageFile);
      }
      const res = await adminFetch('/api/admin/team', {
        method: 'POST',
        body: JSON.stringify({ ...data, image }),
      });
      const payload = await res.json();
      if (!res.ok) throw new Error(payload.error || 'Failed to create');
      router.push('/admin/team');
    } catch (error) {
      console.error('Error creating team member:', error);
      alert(error instanceof Error ? error.message : 'Failed to create team member');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <div className="mb-8">
        <Link
          href="/admin/team"
          className="flex items-center gap-2 text-gray-500 hover:text-[#062516] transition-colors mb-4 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Team
        </Link>
        <h1 className="section-title-spl text-gray-800">Add Team Member</h1>
        <p className="text-gray-500 mt-1">Publish someone on the team page</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-1">
          <TeamForm onSubmit={handleCreate} isLoading={submitting} submitLabel="Publish member" />
        </div>
      </div>
    </div>
  );
}
