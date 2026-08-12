'use client';

import React, { useState, useEffect, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Image from 'next/image';
import Footer from '@/components/Footer';
import { Project } from '@/types/project';
import { getProjects } from '@/lib/projects';
import ProjectCard from '@/components/projects/ProjectCard';
import { Zap } from 'lucide-react';

/** Region sections — ids match navbar / URL (`?region=` or `#id`) */
export const PROJECT_REGIONS = [
  { id: 'east-africa', label: 'East Africa' },
  { id: 'west-africa', label: 'West Africa' },
  { id: 'southern-africa', label: 'Southern Africa' },
] as const;

export type ProjectRegionId = (typeof PROJECT_REGIONS)[number]['id'];

function normalizeText(value?: string) {
  return (value || '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
}

function normalizeRegion(value?: string) {
  return normalizeText(value);
}

/** Sort by Firestore `order` (lower first). Missing order goes last; then by title. */
function sortByFirestoreOrder(projects: Project[]): Project[] {
  return [...projects].sort((a, b) => {
    const ao = Number(a.order ?? 9999);
    const bo = Number(b.order ?? 9999);
    if (ao !== bo) return ao - bo;
    return (a.title || '').localeCompare(b.title || '');
  });
}

/** Match Firestore `project.region` to a section (label or id style). */
function projectMatchesRegion(project: Project, region: { id: string; label: string }) {
  const pr = normalizeRegion(project.region);
  if (!pr) return false;
  const label = normalizeRegion(region.label);
  const idAsWords = normalizeRegion(region.id.replace(/-/g, ' '));
  return pr === label || pr === idAsWords || pr.includes(label) || label.includes(pr);
}

function resolveRegionIdFromParam(param: string | null): ProjectRegionId | null {
  if (!param) return null;
  const found = PROJECT_REGIONS.find(
    (r) =>
      r.id === param ||
      normalizeRegion(r.label) === normalizeRegion(param)
  );
  return found ? found.id : null;
}

const ProjectsPage = () => {
  const searchParams = useSearchParams();
  const regionParam = searchParams.get('region');
  const focusRegionId = resolveRegionIdFromParam(regionParam);

  const [allProjects, setAllProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const projectsData = await getProjects();
        setAllProjects(projectsData);
      } catch (error) {
        console.error('Failed to load data:', error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  // Scroll to region section when URL has ?region=east-africa or #east-africa
  useEffect(() => {
    if (loading) return;

    const scrollToId =
      focusRegionId ||
      (typeof window !== 'undefined' ? window.location.hash.replace('#', '') : '');

    if (!scrollToId) return;

    const el = document.getElementById(scrollToId);
    if (el) {
      // Offset for fixed navbar
      const top = el.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  }, [loading, focusRegionId]);

  const projectsByRegion = useMemo(() => {
    return PROJECT_REGIONS.map((region) => {
      const inRegion = allProjects.filter((p) => projectMatchesRegion(p, region));
      return {
        ...region,
        projects: sortByFirestoreOrder(inRegion),
      };
    });
  }, [allProjects]);

  const unassignedProjects = useMemo(() => {
    return sortByFirestoreOrder(
      allProjects.filter(
        (p) => !PROJECT_REGIONS.some((region) => projectMatchesRegion(p, region))
      )
    );
  }, [allProjects]);

  const sectionsToShow = focusRegionId
    ? projectsByRegion.filter((s) => s.id === focusRegionId)
    : projectsByRegion;

  const unassignedSectionIndex = sectionsToShow.length;

  return (
    <div className="min-h-screen bg-white font-sans selection:bg-[#FFFA84] selection:text-[#062516]">
      <Navbar />

      <section className="relative h-[40vh] w-full flex items-center justify-center overflow-hidden">
        <Image
          src="/assets/banners/Projects.jpg"
          alt="Projects Banner"
          fill
          className="object-cover"
          priority
        />
      </section>

      <main className="py-5 bg-pistachio-green">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-40 gap-4">
            <Loader2 className="w-10 h-10 animate-spin text-[#062516]" />
            <p className="text-black font-bold tracking-widest uppercase text-xs">
              Loading Projects Library
            </p>
          </div>
        ) : (
          <>
            <div className="container mx-auto px-6 pt-16 pb-8 md:pt-24">
              <h3 className="section-title text-center text-[#062516] mb-10">
                Project Portfolio
              </h3>
            </div>

            {allProjects.length === 0 ? (
              <div className="container mx-auto px-6 pb-24">
                <div className="text-center py-40 bg-white rounded-[40px] border border-dashed border-gray-200">
                  <div className="p-6 rounded-full bg-gray-50 w-fit mx-auto mb-6">
                    <Zap className="w-12 h-12 text-gray-300" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">No projects found</h3>
                </div>
              </div>
            ) : (
              <>
                {sectionsToShow.map((section, index) => {
                  const isPistachio = index % 2 === 0;
                  return (
                    <section
                      key={section.id}
                      id={section.id}
                      className={`scroll-mt-28 py-16 md:py-20 ${
                        isPistachio ? 'bg-pistachio-green' : 'bg-white'
                      }`}
                    >
                      <div className="container mx-auto px-6">
                        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-8 border-b border-gray-200 pb-4">
                          <h3 className="text-xl font-bold text-[#062516] mb-0 line-clamp-2 leading-tight">
                            {section.label}
                          </h3>
                        </div>

                        {section.projects.length > 0 ? (
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                            {section.projects.map((project) => (
                              <ProjectCard key={project.id} project={project} />
                            ))}
                          </div>
                        ) : (
                          <p className="text-gray-500 text-sm py-8">
                            No projects in this region yet.
                          </p>
                        )}
                      </div>
                    </section>
                  );
                })}

                {/* Projects whose region does not match the three sections */}
                {!focusRegionId && unassignedProjects.length > 0 && (
                  <section
                    id="other-regions"
                    className={`scroll-mt-28 py-16 md:py-20 ${
                      unassignedSectionIndex % 2 === 0
                        ? 'bg-pistachio-green'
                        : 'bg-white'
                    }`}
                  >
                    <div className="container mx-auto px-6">
                      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-8 border-b border-gray-200 pb-4">
                        <h3 className="section-title-spl text-[#062516] mb-0">
                          Other regions
                        </h3>
                        <span className="text-xs font-bold uppercase tracking-widest text-gray-500">
                          {unassignedProjects.length}{' '}
                          {unassignedProjects.length === 1 ? 'project' : 'projects'}
                        </span>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {unassignedProjects.map((project) => (
                          <ProjectCard key={project.id} project={project} />
                        ))}
                      </div>
                    </div>
                  </section>
                )}
              </>
            )}
          </>
        )}
      </main>

      <Footer />
    </div>
  );
};

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

export default function ProjectsPageWithSuspense() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <Loader2 className="w-10 h-10 animate-spin text-[#062516]" />
        </div>
      }
    >
      <ProjectsPage />
    </Suspense>
  );
}
