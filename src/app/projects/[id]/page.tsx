'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Project } from '@/types/project';
import { getProjectBySlugOrId } from '@/lib/projects';
import { getRegionPathForProject } from '@/lib/projectRegions';
import Image from 'next/image';
import Link from 'next/link';
import ProjectGallery from '@/components/projects/ProjectGallery';
import ProjectNews from '@/components/projects/ProjectNews';
import ProjectReviews from '@/components/ProjectReviews';
import './project-detail.css';

const STATUS_LABEL: Record<string, string> = {
  'Operation & Maintenance': 'Operations & Maintenance',
  'EPC Completed — O&M Ongoing': 'EPC Completed - Operations & Maintenance Ongoing',
  'EPC Completed Q & M Ongoing': 'EPC Completed - Operations & Maintenance Ongoing',
  'EPC Completed - Operation & Maintenance Ongoing': 'EPC Completed - Operations & Maintenance Ongoing',
};

const ProjectDetailPage = () => {
  const { id } = useParams();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProject = async () => {
      if (id) {
        const data = await getProjectBySlugOrId(id as string);
        setProject(data);
        setLoading(false);
      }
    };
    fetchProject();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="flex items-center justify-center min-h-[50dvh]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#062516]"></div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="container mx-auto px-4 py-32 text-center">
          <h1 className="text-4xl font-bold mb-4">Project Not Found</h1>
          <p className="text-gray-600 mb-8">The project you are looking for does not exist or has been moved.</p>
          <Link href="/projects/east-africa" className="bg-[#062516] text-[#FFFA84] px-8 py-3 rounded-full font-bold">
            Back to Projects
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />

      <section className="project-banner">
        {project.imageUrl && (
          <Image
            src={project.imageUrl}
            alt={project.title}
            fill
            className="object-cover"
            priority
          />
        )}
      </section>

      <div className="max-w-7xl mx-auto px-4 py-16 w-full min-w-0">
        <div className="mb-8">
          <Link
            href={getRegionPathForProject(project)}
            className="text-[#062516] font-medium hover:text-[#051e12] transition-colors duration-300 flex items-center gap-2"
          >
            ← Back to Projects
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-6 items-start mb-6">
          <div className="mb-0">
            <h3 className="section-title-spl text-center text-[#062516] px-1">
              {project.detailProjectName?.trim() || project.title}
            </h3>
          </div>
          <div className="project-mesh-block">
            <div className="project-mesh">
              <div className="project-mesh__cell project-mesh__overview italic md:not-italic">
                <h3 className="section-title-spl">Project Overview</h3>
                <div
                  className="prose max-w-none md:prose-lg text-gray-700 leading-relaxed space-y-4"
                  dangerouslySetInnerHTML={{ __html: project.description }}
                />
              </div>

              <div className="project-mesh__sidebar">
                <div className="project-mesh__cell project-mesh__spec project-mesh__region">
                  <p className="project-mesh__label">Country</p>
                  <p className="project-mesh__value">{project?.country}</p>
                </div>

                <div className="project-mesh__cell project-mesh__spec project-mesh__status">
                  <p className="project-mesh__label">Status</p>
                  <p className="project-mesh__value">{STATUS_LABEL[project?.status] || project.status}</p>
                </div>
              </div>

              <div className="project-mesh__cell project-mesh__spec project-mesh__technology">
                <p className="project-mesh__label">Technology</p>
                <p className="project-mesh__value">{project.detailPageTechnology?.trim()}</p>
              </div>

              <div className="project-mesh__cell project-mesh__spec project-mesh__client">
                <p className="project-mesh__label">Client</p>
                <p className="project-mesh__value">{project?.client}</p>
              </div>

              <div className="project-mesh__cell project-mesh__spec project-mesh__capacity">
                <p className="project-mesh__label">Capacity</p>
                <p className="project-mesh__value">{project?.capacity?.trim() || '—'}</p>
              </div>

              <div className="project-mesh__cell project-mesh__spec project-mesh__year">
                <p className="project-mesh__label">Year of Completion</p>
                <p className="project-mesh__value">
                  {project?.completionYear || '—'}
                  {project.planned ? ' *' : ''}
                </p>
              </div>
            </div>
            {project.planned && (
              <p className="project-planned-note">
                * Planned
              </p>
            )}
          </div>
        </div>
        {project.galleryUrls && project.galleryUrls.length > 0 && (
          <div className="mt-16">
            <div className="mb-12">
              <h3 className="section-title-spl text-center text-[#062516]">Visual Progress</h3>
            </div>
            <ProjectGallery urls={project.galleryUrls} title={project.title} />
          </div>
        )}

      </div>

      <ProjectReviews country={project.country} />
      <ProjectNews country={project.country} />

      {/* Impact Section Placeholder */}
      {/* {project.financing && (
                <section className="py-8 px-4">
                    <div className="container mx-auto">
                        <div className="bg-gradient-to-r from-[#062516] to-[#085D36] rounded-[40px] p-12 text-center text-white">
                            <h3 className="section-title-spl mb-6">Partnership & Financing</h3>
                            <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed italic">
                                "{project.financing}"
                            </p>
                        </div>
                    </div>
                </section>
            )} */}

      {/* CTA Section */}
      {/* <section className="py-8 px-4 mb-8">
                <div className="container mx-auto">
                    <div className="bg-[#FFFA84] rounded-[40px] p-12 flex flex-col md:flex-row items-center justify-between gap-8">
                        <div>
                            <h3 className="text-4xl font-black text-[#062516] mb-4">Invest in Africa's Future?</h3>
                            <p className="text-[#062516]/70 text-lg font-medium">Join us in developing sustainable power solutions across the continent.</p>
                        </div>
                        <Link 
                            href="/contact" 
                            className="bg-[#062516] text-[#FFFA84] px-10 py-5 rounded-full font-black text-lg hover:scale-105 transition-transform shadow-xl"
                        >
                            Get in Touch
                        </Link>
                    </div>
                </div>
            </section> */}

      <Footer />
    </div>
  );
};

export default ProjectDetailPage;
