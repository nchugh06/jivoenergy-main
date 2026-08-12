"use client";

import React from 'react';
import { Project } from '@/types/project';
import Image from 'next/image';
import { MapPin, Battery, Sun, Factory, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

import Link from 'next/link';

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const getIcon = (tech: string) => {
    const t = tech?.toLowerCase() || '';
    if (t.includes('solar')) return <Sun className="w-5 h-5" />;
    if (t.includes('storage') || t.includes('battery') || t.includes('bess')) return <Battery className="w-5 h-5" />;
    return <Zap className="w-5 h-5" />;
  };

  return (
    <Link href={`/projects/${project.id}`}>
      <motion.div
        whileHover={{ y: -5 }}
        className="group bg-white rounded-3xl p-6 shadow-lg border border-gray-100 hover:shadow-xl hover:border-[#062516]/20 transition-all duration-300 cursor-pointer flex flex-col h-full"
      >
        {/* Image / Icon Header */}
        <div className="mb-6 relative h-48 w-full rounded-2xl overflow-hidden bg-gray-100">
          {project.imageUrl ? (
            <Image 
              src={project.imageUrl} 
              alt={project.title} 
              fill 
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="flex items-center justify-center h-full bg-[#062516]/5 text-[#062516]">
              {getIcon(project.technology || '')}
            </div>
          )}
          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-[#062516] shadow-sm">
            {project.status}
          </div>
        </div>

        <div className="flex-grow">
          <div className="flex items-center mb-3 text-sm text-gray-500 font-medium">
            <MapPin className="w-4 h-4 mr-1 text-[#085d36]" />
            {project.country}
          </div>
          
          <h3 className="text-xl font-bold text-[#062516] mb-2 line-clamp-2 leading-tight">
            {project.title}
          </h3>

        
          
          <div className="flex flex-wrap gap-2 mb-4">
            {project.capacity && (
              <span className="text-xs bg-gray-50 text-gray-600 px-2 py-1 rounded-md border border-gray-100">
                {project.capacity}
              </span>
            )}
             {project.technology && (
              <span className="text-xs bg-gray-50 text-gray-600 px-2 py-1 rounded-md border border-gray-100">
                {project.technology}
              </span>
            )}
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-gray-50 flex justify-between items-center text-sm font-semibold text-[#062516] group-hover:text-[#F5FBF5] group-hover:bg-[#062516] -mx-6 -mb-6 p-6 rounded-b-3xl transition-colors">
          <span>View Details</span>
          <Zap className="w-4 h-4" />
        </div>
      </motion.div>
    </Link>
  );
};

export default ProjectCard;
