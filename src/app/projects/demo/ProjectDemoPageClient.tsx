'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Project } from '@/types/project';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { MapPin, Zap, Factory, ArrowLeft, Cpu, Globe, Shield } from 'lucide-react';
import Link from 'next/link';

const DUMMY_PROJECT: Project = {
    id: 'demo-project',
    title: 'The Great Rift Solar Oasis',
    location: 'Nakuru County',
    country: 'Kenya',
    region: 'East Africa',
    status: 'Completed',
    capacity: '250 MWp',
    technology: 'Bifacial Solar PV + BESS',
    beneficiary: '1.2 Million Households',
    financing: 'Jointly funded by JIVO Energy and International Green Climate Fund',
    description: `
        <p>The <strong>Great Rift Solar Oasis</strong> stands as a beacon of sustainable innovation in East Africa. Spanning over 500 hectares of arid land in Nakuru County, this flagship project integrates cutting-edge bifacial solar technology with an advanced Battery Energy Storage System (BESS).</p>
        <p>Since its commissioning in 2025, the facility has consistently outperformed energy yield projections, providing stable and clean electricity to various industrial hubs and over 1.2 million households. The project has also created over 800 local jobs during construction and continues to support 50 permanent technical roles.</p>
        <p>Key highlights include:
            <ul>
                <li>Implementation of AI-driven tracking systems for maximum sunlight absorption.</li>
                <li>Zero-water cleaning robotic systems for panel maintenance.</li>
                <li>Community development programs including local health centers and educational facilities.</li>
            </ul>
        </p>
    `,
    imageUrl: '/projects/showcase/solar_hero.png',
    galleryUrls: [
        '/projects/showcase/solar_hero.png',
        '/projects/showcase/solar_gallery_1.png'
    ],
    slug: 'great-rift-solar-oasis'
};

const DemoProjectPage = () => {
    const project = DUMMY_PROJECT;

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
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
                        <Link href="/projects/east-africa" className="inline-flex items-center text-[#FFFA84] mb-6 hover:underline font-medium">
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
                            <h3 className="section-title-spl text-[#062516] mb-8 border-b border-gray-100 pb-4">Project Overview</h3>
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
                            <h3 className="text-4xl font-black text-[#062516] tracking-tight mb-4 text-center">Visual Progress</h3>
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
                            <h3 className="section-title-spl mb-6">Partnership & Financing</h3>
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
            </section>

            <Footer />
        </div>
    );
};

export default DemoProjectPage;
