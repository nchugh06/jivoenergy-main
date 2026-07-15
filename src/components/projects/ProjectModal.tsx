"use client";

import React from 'react';
import { Project } from '@/types/project';
import Image from 'next/image';
import { X, MapPin, Calendar, Database, Zap, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ project, isOpen, onClose }) => {
  if (!isOpen || !project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        />
        
        <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="bg-white rounded-3xl w-full max-w-5xl max-h-[90vh] overflow-y-auto relative z-10 shadow-2xl overflow-hidden flex flex-col md:flex-row"
        >
            <button 
                onClick={onClose}
                className="absolute top-4 right-4 z-20 p-2 bg-white/80 rounded-full hover:bg-white transition-colors"
            >
                <X className="w-6 h-6 text-gray-800" />
            </button>

            {/* Left/Top Image Section */}
            <div className="w-full md:w-2/5 h-64 md:h-auto relative bg-gray-100 min-h-[300px]">
                {project.imageUrl ? (
                    <Image src={project.imageUrl} alt={project.title} fill className="object-cover" />
                ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-[#062516] text-[#FFFA84]">
                        <Zap className="w-16 h-16 opacity-50" />
                    </div>
                )}
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent text-white">
                    <div className="flex items-center gap-2 mb-2">
                        <MapPin className="w-4 h-4 text-[#FFFA84]" />
                        <span className="font-medium">{project.location}, {project.country}</span>
                    </div>
                </div>
            </div>

            {/* Right Content Section */}
            <div className="w-full md:w-3/5 p-8 md:p-12 bg-white overflow-y-auto">
                <div className="mb-10">
                    <h3 className="text-4xl font-bold text-[#062516] mb-2 leading-tight">
                        {project.title} | {project.capacity}
                    </h3>
                    <div className="h-1 w-20 bg-[#FFFA84] rounded-full"></div>
                </div>

                <div className="space-y-8 mb-10">
                    <div>
                        <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Project Name:</h4>
                        <p className="text-xl font-semibold text-[#062516]">{project.title}</p>
                    </div>

                    <div>
                        <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Location:</h4>
                        <p className="text-xl font-semibold text-[#062516]">{project.location}, {project.country}</p>
                    </div>

                    <div>
                        <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Size:</h4>
                        <p className="text-xl font-semibold text-[#062516]">{project.capacity}</p>
                    </div>
                </div>

                <div className="prose prose-green max-w-none text-gray-600 mb-12 leading-relaxed text-lg">
                    <p className="whitespace-pre-line">{project.description}</p>
                </div>

                {/* Image Gallery Section */}
                {project.galleryUrls && project.galleryUrls.length > 0 && (
                    <div className="pt-10 border-t border-gray-100">
                        <h3 className="text-2xl font-bold text-[#062516] mb-6">Project Gallery</h3>
                        <div className="grid grid-cols-2 gap-4">
                            {project.galleryUrls.map((url, index) => (
                                <div key={index} className="relative h-48 rounded-2xl overflow-hidden bg-gray-100">
                                    <Image 
                                        src={url} 
                                        alt={`${project.title} gallery ${index + 1}`} 
                                        fill 
                                        className="object-cover hover:scale-110 transition-transform duration-500" 
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Additional Specs if any */}
                <div className="mt-10 space-y-4">
                    {project.beneficiary && (
                        <div className="flex items-start gap-3 p-4 rounded-xl bg-gray-50 border border-gray-100">
                            <CheckCircle2 className="w-5 h-5 text-[#062516] mt-0.5 flex-shrink-0" />
                            <div>
                                <span className="block text-[10px] text-gray-400 font-bold uppercase tracking-wider">Beneficiary</span>
                                <span className="font-medium text-[#062516]">{project.beneficiary}</span>
                            </div>
                        </div>
                    )}
                     {project.financing && (
                        <div className="flex items-start gap-3 p-4 rounded-xl bg-gray-50 border border-gray-100">
                            <CheckCircle2 className="w-5 h-5 text-[#062516] mt-0.5 flex-shrink-0" />
                            <div>
                                <span className="block text-[10px] text-gray-400 font-bold uppercase tracking-wider">Financing</span>
                                <span className="font-medium text-[#062516]">{project.financing}</span>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ProjectModal;
