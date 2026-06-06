'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { motion, AnimatePresence } from 'framer-motion';
import { Project } from '@/types/project';
import { getProjects } from '@/lib/projects';
import { getProjectSettings, ProjectSettings } from '@/lib/projectSettings';
import ProjectCard from '@/components/projects/ProjectCard';
import { ChevronDown, Filter, X, Zap } from 'lucide-react';
import Link from 'next/link';

interface FilterState {
  countries: string[];
  regions: string[];
  statuses: string[];
  technologies: string[];
  capacities: string[];
}

const FilterDropdown = ({ 
    label, 
    options, 
    selected, 
    onChange 
}: { 
    label: string, 
    options: string[], 
    selected: string[], 
    onChange: (val: string) => void 
}) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="relative">
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl border transition-all text-sm font-medium ${
                    selected.length > 0 
                    ? 'bg-[#062516] text-[#FFFA84] border-[#062516]' 
                    : 'bg-white text-gray-700 border-gray-200 hover:border-gray-300'
                }`}
            >
                {label} {selected.length > 0 && `(${selected.length})`}
                <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            <AnimatePresence>
                {isOpen && (
                    <>
                        <div className="fixed inset-0 z-30" onClick={() => setIsOpen(false)} />
                        <motion.div 
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            className="absolute left-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-gray-100 z-40 max-h-80 overflow-y-auto p-2"
                        >
                            {options.sort().map(opt => (
                                <button
                                    key={opt}
                                    onClick={() => onChange(opt)}
                                    className={`w-full text-left px-4 py-2 rounded-lg text-sm transition-colors flex items-center justify-between ${
                                        selected.includes(opt)
                                        ? 'bg-[#062516]/5 text-[#062516] font-bold'
                                        : 'text-gray-600 hover:bg-gray-50'
                                    }`}
                                >
                                    {opt}
                                    {selected.includes(opt) && (
                                        <div className="w-2 h-2 rounded-full bg-[#062516]" />
                                    )}
                                </button>
                            ))}
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
};

const ProjectsPage = () => {
  const [allProjects, setAllProjects] = useState<Project[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [settings, setSettings] = useState<ProjectSettings | null>(null);
  const [loading, setLoading] = useState(true);

  const [filters, setFilters] = useState<FilterState>({
    countries: [],
    regions: [],
    statuses: [],
    technologies: [],
    capacities: []
  });

  const [availableCapacities, setAvailableCapacities] = useState<string[]>([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [projectsData, settingsData] = await Promise.all([
          getProjects(),
          getProjectSettings()
        ]);
        
        setAllProjects(projectsData);
        setSettings(settingsData);
        
        // Extract unique capacities
        const capacities = Array.from(new Set(projectsData.map(p => p.capacity).filter(Boolean))) as string[];
        setAvailableCapacities(capacities);
        
        setFilteredProjects(projectsData);
      } catch (error) {
        console.error("Failed to load data:", error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  useEffect(() => {
    let result = allProjects;

    if (filters.regions.length > 0) {
      result = result.filter(p => filters.regions.includes(p.region));
    }
    if (filters.countries.length > 0) {
      result = result.filter(p => filters.countries.includes(p.country));
    }
    if (filters.statuses.length > 0) {
      result = result.filter(p => filters.statuses.includes(p.status));
    }
    if (filters.technologies.length > 0) {
      result = result.filter(p => filters.technologies.includes(p.technology || ''));
    }
    if (filters.capacities.length > 0) {
      result = result.filter(p => filters.capacities.includes(p.capacity || ''));
    }

    setFilteredProjects(result);
  }, [filters, allProjects]);

  const toggleFilter = (category: keyof FilterState, value: string) => {
    setFilters(prev => {
      const current = prev[category];
      const updated = current.includes(value)
        ? current.filter(v => v !== value)
        : [...current, value];
      return { ...prev, [category]: updated };
    });
  };

  const clearFilters = () => {
    setFilters({
      countries: [],
      regions: [],
      statuses: [],
      technologies: [],
      capacities: []
    });
  };

  const activeFiltersCount = Object.values(filters).reduce((acc, curr) => acc + curr.length, 0);

  return (
    <div className="min-h-screen bg-gray-50 font-sans selection:bg-[#FFFA84] selection:text-[#062516]">
      <Navbar />
     

      {/* Main Content Area */}
      <main className="container mx-auto px-6 py-24 md:py-32">
        {loading ? (
             <div className="flex flex-col items-center justify-center py-40 gap-4">
                <Loader2 className="w-10 h-10 animate-spin text-[#062516]" />
                <p className="text-black font-bold tracking-widest uppercase text-xs">Loading Projects Library</p>
             </div>
        ) : (
          <div>
            <div className="py-8 px-2 pt-30">
                <div>
                    <h2 className="section-title text-[#062516] mb-2 text-center">Project Portfolio</h2>
                    <h6 className="text-black font-bold uppercase text-[10px] tracking-widest opacity-60 text-center">Showing {allProjects.length} projects across Africa</h6>
                </div>
            </div>

            {allProjects.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 pb-8">
                    {allProjects.map((project) => (
                        <ProjectCard 
                            key={project.id} 
                            project={project} 
                        />
                    ))}
                </div>
            ) : (
                <div className="text-center py-40 bg-white rounded-[40px] border border-dashed border-gray-200">
                    <div className="p-6 rounded-full bg-gray-50 w-fit mx-auto mb-6">
                        <Zap className="w-12 h-12 text-gray-300" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">No projects found</h3>
                </div>
            )}
          </div>
        )}
      </main>


      <Footer />
    </div>
  );
};

// Simple Loader component
const Loader2 = ({ className }: { className?: string }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
);

export default ProjectsPage;
