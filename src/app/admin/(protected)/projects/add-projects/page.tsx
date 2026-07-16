"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { addProject, uploadProjectImage, uploadProjectImages } from '@/lib/projects';
import { Project } from '@/types/project';
import ProjectForm from '@/components/admin/ProjectForm';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function AddProjectPage() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);

  const handleCreate = async (data: Omit<Project, 'id'>, coverImage: File | null, galleryFiles: File[]) => {
    setSubmitting(true);
    try {
      let imageUrl = '';
      if (coverImage) {
        const path = `projects/${Date.now()}_${coverImage.name}`;
        imageUrl = await uploadProjectImage(coverImage, path);
      }

      let galleryUrls: string[] = [];
      if (galleryFiles.length > 0) {
        galleryUrls = await uploadProjectImages(galleryFiles, 'projects/gallery');
      }
      
      await addProject({
        ...data,
        imageUrl,
        galleryUrls
      });
      
      router.push('/admin/projects');
    } catch (error) {
      console.error("Error creating project:", error);
      alert("Failed to create project");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <div className="mb-8">
        <Link 
          href="/admin/projects" 
          className="flex items-center gap-2 text-gray-500 hover:text-[#062516] transition-colors mb-4 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Projects
        </Link>
        <h1 className="section-title-spl text-gray-800">Add New Project</h1>
        <p className="text-gray-500 mt-1">Fill in the details below to create a new energy project</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-1">
          <ProjectForm onSubmit={handleCreate} isLoading={submitting} />
        </div>
      </div>
    </div>
  );
}
