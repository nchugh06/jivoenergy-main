'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Project } from '@/types/project';
import { getProjectById } from '@/lib/projects';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { MapPin, Zap, Battery, Sun, Factory, ArrowLeft, Cpu, Globe, Shield } from 'lucide-react';
import Link from 'next/link';

const ProjectDetailPage = () => {
    const { id } = useParams();
    const [project, setProject] = useState<Project | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProject = async () => {
            if (id) {
                const data = await getProjectById(id as string);
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
                <div className="flex items-center justify-center h-[70vh]">
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
                    <Link href="/projects" className="bg-[#062516] text-[#FFFA84] px-8 py-3 rounded-full font-bold">
                        Back to Projects
                    </Link>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
            <Navbar />

            {/* Hero Section */}
            <section className="relative h-[80vh] flex items-center justify-center overflow-hidden bg-[#062516]">
                {project.imageUrl && (
                    <motion.div 
                        initial={{ scale: 1.1 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 10, ease: "linear" }}
                        className="absolute inset-0"
                    >
                        <Image 
                            src={project.imageUrl} 
                            alt={project.title} 
                            fill 
                            className="object-cover opacity-60"
                            priority
                        />
                    </motion.div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#062516] via-[#062516]/60 to-transparent" />
                
                <div className="container relative z-10 px-4 py-8 mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="max-w-4xl"
                    >
                        <Link href="/projects" className="inline-flex items-center text-[#FFFA84] mb-6 hover:underline font-medium">
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Back to Portfolio
                        </Link>
                        <div className="flex items-center gap-3 mb-4">
                            <span className="bg-[#FFFA84] text-[#062516] px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                                {project.status}
                            </span>
                            <span className="text-white/80 flex items-center text-sm font-medium">
                                <MapPin className="w-4 h-4 mr-1" />
                                {project.location}, {project.country}
                            </span>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight tracking-tight">
                            {project.title}
                        </h1>
                        <p className="text-xl text-white/90 max-w-2xl leading-relaxed font-light">
                            Leading the transition to sustainable energy through innovative infrastructure and community-focused solutions.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Overview & Quick Stats */}
            <section className="py-8 px-4">
                <div className="container mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Main Description */}
                        <div className="lg:col-span-2 bg-white rounded-[40px] p-8 md:p-12 shadow-sm border border-gray-100 italic md:not-italic">
                            <h2 className="text-3xl font-bold text-[#062516] mb-8 border-b border-gray-100 pb-4">Project Overview</h2>
                            <div 
                                className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-4"
                                dangerouslySetInnerHTML={{ __html: project.description }}
                            />
                        </div>

                        {/* Technical Specifications Sticky Sidebar */}
                        <div className="space-y-8">
                            <div className="bg-[#062516] text-white rounded-[40px] p-8 shadow-xl sticky top-32">
                                <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
                                    <Cpu className="text-[#FFFA84]" />
                                    Technical Specs
                                </h3>
                                
                                <div className="space-y-6">
                                    <div className="flex items-start gap-4 p-4 bg-white/5 rounded-2xl border border-white/10">
                                        <div className="p-3 bg-white/10 rounded-xl">
                                            <Zap className="w-6 h-6 text-[#FFFA84]" />
                                        </div>
                                        <div>
                                            <p className="text-white/60 text-xs font-bold uppercase tracking-widest mb-1">Capacity</p>
                                            <p className="text-xl font-bold">{project.capacity || 'N/A'}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4 p-4 bg-white/5 rounded-2xl border border-white/10">
                                        <div className="p-3 bg-white/10 rounded-xl">
                                            <Factory className="w-6 h-6 text-[#FFFA84]" />
                                        </div>
                                        <div>
                                            <p className="text-white/60 text-xs font-bold uppercase tracking-widest mb-1">Technology</p>
                                            <p className="text-lg font-bold">{project.technology || 'Infrastructure'}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4 p-4 bg-white/5 rounded-2xl border border-white/10">
                                        <div className="p-3 bg-white/10 rounded-xl">
                                            <Globe className="w-6 h-6 text-[#FFFA84]" />
                                        </div>
                                        <div>
                                            <p className="text-white/60 text-xs font-bold uppercase tracking-widest mb-1">Region</p>
                                            <p className="text-lg font-bold">{project.region}</p>
                                        </div>
                                    </div>

                                    {project.beneficiary && (
                                        <div className="flex items-start gap-4 p-4 bg-white/5 rounded-2xl border border-white/10">
                                            <div className="p-3 bg-white/10 rounded-xl">
                                                <Shield className="w-6 h-6 text-[#FFFA84]" />
                                            </div>
                                            <div>
                                                <p className="text-white/60 text-xs font-bold uppercase tracking-widest mb-1">Beneficiary</p>
                                                <p className="text-lg font-bold">{project.beneficiary}</p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Image Gallery */}
            {project.galleryUrls && project.galleryUrls.length > 0 && (
                <section className="py-8 px-4 bg-white border-y border-gray-100">
                    <div className="container mx-auto">
                        <div className="mb-12">
                            <h2 className="text-4xl font-black text-[#062516] tracking-tight mb-4 text-center">Visual Progress</h2>
                            <div className="h-1.5 w-24 bg-[#FFFA84] mx-auto rounded-full" />
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {project.galleryUrls.map((url: string, index: number) => (
                                <motion.div 
                                    key={index}
                                    whileHover={{ scale: 1.02, rotate: index % 2 === 0 ? 1 : -1 }}
                                    className="relative h-72 rounded-3xl overflow-hidden shadow-lg border-4 border-white"
                                >
                                    <Image 
                                        src={url} 
                                        alt={`${project.title} Gallery ${index + 1}`} 
                                        fill 
                                        className="object-cover"
                                    />
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Impact Section Placeholder */}
            {project.financing && (
                <section className="py-8 px-4">
                    <div className="container mx-auto">
                        <div className="bg-gradient-to-r from-[#062516] to-[#085D36] rounded-[40px] p-12 text-center text-white">
                            <h3 className="text-3xl font-bold mb-6">Partnership & Financing</h3>
                            <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed italic">
                                "{project.financing}"
                            </p>
                        </div>
                    </div>
                </section>
            )}

            {/* CTA Section */}
            <section className="py-8 px-4 mb-8">
                <div className="container mx-auto">
                    <div className="bg-[#FFFA84] rounded-[40px] p-12 flex flex-col md:flex-row items-center justify-between gap-8">
                        <div>
                            <h2 className="text-4xl font-black text-[#062516] mb-4">Invest in Africa's Future?</h2>
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
            </section>

            <Footer />
        </div>
    );
};

export default ProjectDetailPage;
