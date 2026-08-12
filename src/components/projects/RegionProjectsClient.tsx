'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProjectCard from '@/components/projects/ProjectCard';
import { Project } from '@/types/project';
import { getProjects } from '@/lib/projects';
import {
  ProjectRegionId,
  filterProjectsByRegion,
  getRegionById,
} from '@/lib/projectRegions';
import { Zap } from 'lucide-react';

interface RegionProjectsClientProps {
  regionId: ProjectRegionId;
}

const Loader2 = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    />
  </svg>
);

export default function RegionProjectsClient({ regionId }: RegionProjectsClientProps) {
  const region = getRegionById(regionId);
  const [allProjects, setAllProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const projectsData = await getProjects();
        setAllProjects(projectsData);
      } catch (error) {
        console.error('Failed to load projects:', error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const projects = useMemo(
    () => filterProjectsByRegion(allProjects, regionId),
    [allProjects, regionId]
  );

  if (!region) {
    return null;
  }

  return (
    <div className="min-h-screen bg-white font-sans selection:bg-[#FFFA84] selection:text-[#062516]">
      <Navbar />

      <section className="relative h-[40vh] w-full flex items-center justify-center overflow-hidden">
        <Image
          src="/assets/banners/Projects.jpg"
          alt={`${region.label} Projects`}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-[#062516]/45" />
      
      </section>

      <main className="py-5">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-40 gap-4">
            <Loader2 className="w-10 h-10 animate-spin text-[#062516]" />
            <p className="text-black font-bold tracking-widest uppercase text-xs">
              Loading Projects
            </p>
          </div>
        ) : (
          <section className="">
            <div className="container mx-auto px-6">
              <h3 className="section-title-spl text-center text-[#062516] mb-10">
                Project Portfolio in {region.label}
              </h3>

              {projects.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                  {projects.map((project) => (
                    <ProjectCard key={project.id} project={project} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-24 bg-white rounded-[40px] border border-dashed border-gray-200">
                  <div className="p-6 rounded-full bg-gray-50 w-fit mx-auto mb-6">
                    <Zap className="w-12 h-12 text-gray-300" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">
                    No projects in this region yet
                  </h3>
                  <p className="text-gray-500">
                    Check back soon for new projects in this region.
                  </p>
                </div>
              )}
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}
