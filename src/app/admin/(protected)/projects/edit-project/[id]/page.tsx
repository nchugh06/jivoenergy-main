"use client";

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { getProjectById, updateProject, uploadProjectImage, uploadProjectImages } from '@/lib/projects';
import { Project } from '@/types/project';
import ProjectForm from '@/components/admin/ProjectForm';
import { ArrowLeft, Loader2 } from 'lucide-react';
import Link from 'next/link';

export default function EditProjectPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const data = await getProjectById(id, { includeDeleted: true });
        if (data?.deletedAt) {
          alert("Restore this project before editing");
          router.push('/admin/projects');
        } else if (data) {
          setProject(data);
        } else {
          alert("Project not found");
          router.push('/admin/projects');
        }
      } catch (error) {
        console.error("Error fetching project:", error);
        alert("Failed to fetch project details");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProject();
    }
  }, [id, router]);

  const handleUpdate = async (data: Omit<Project, 'id'>, coverImage: File | null, galleryFiles: File[]) => {
    setSubmitting(true);
    try {
      // Use the imageUrl from data (which comes from form state) unless a new cover image is uploaded
      let imageUrl = data.imageUrl || '';
      
      if (coverImage) {
        const path = `projects/${Date.now()}_${coverImage.name}`;
        imageUrl = await uploadProjectImage(coverImage, path);
      }

      // Use galleryUrls from data (which comes from form state) and append new uploads
      let galleryUrls = data.galleryUrls || [];
      if (galleryFiles.length > 0) {
        const newGalleryUrls = await uploadProjectImages(galleryFiles, 'projects/gallery');
        galleryUrls = [...galleryUrls, ...newGalleryUrls];
      }
      
      await updateProject(id, {
        ...data,
        imageUrl,
        galleryUrls
      });
      
      router.push('/admin/projects');
    } catch (error) {
      console.error("Error updating project:", error);
      alert("Failed to update project");
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
          href="/admin/projects" 
          className="flex items-center gap-2 text-gray-500 hover:text-[#062516] transition-colors mb-4 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Projects
        </Link>
        <h1 className="section-title-spl text-gray-800">Edit Project</h1>
        <p className="text-gray-500 mt-1">Update project details</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-1">
          {project && (
            <ProjectForm 
              initialData={project} 
              onSubmit={handleUpdate} 
              isLoading={submitting} 
            />
          )}
        </div>
      </div>
    </div>
  );
}
