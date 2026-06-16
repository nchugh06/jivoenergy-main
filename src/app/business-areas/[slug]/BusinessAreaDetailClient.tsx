'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProjectCard from '@/components/projects/ProjectCard';
import { Project } from '@/types/project';
import { getProjectsByBusinessArea } from '@/lib/projects';

interface BusinessAreaData {
  title: string;
  fullDescription: string;
  image: any;
  imageTitle: string;
  features: string[];
  bessStandaloneHeader?: string | null;
  bessStandaloneDescription?: string | null;
  technicalDescription?: string | null;
  technicalDetails: string[];
}

interface BusinessAreaDetailClientProps {
  slug: string;
  area: BusinessAreaData;
}

export default function BusinessAreaDetailClient({ slug, area }: BusinessAreaDetailClientProps) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const projectsData = await getProjectsByBusinessArea(slug);
        setProjects(projectsData);
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [slug]);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-[60vh] w-full flex items-center justify-center overflow-hidden">
        <Image
          src={typeof area.image === 'string' ? area.image : area.image}
          alt={area.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#085D36]/50 to-[#04301C]/0"></div>
        <div className="relative z-10 container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            {area.title}
          </h1>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Back Button */}
        <div className="mb-8">
          <Link
            href="/business-areas"
            className="text-[#062516] font-medium hover:text-[#051e12] transition-colors duration-300 flex items-center gap-2"
          >
            ← Back to Business Areas
          </Link>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 gap-12 items-start mb-16">
          {/* Description Section */}
          <div className="space-y-6">
            <div className="text-gray-600 leading-relaxed space-y-4">
              {area.fullDescription.split('\n\n').map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>
          </div>
        </div>

        {/* Technical Description Section */}
        {area.bessStandaloneDescription && (
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-[#062516] mb-4">Standalone BESS Systems</h3>
            <div className="space-y-6">
              <div className="text-gray-600 leading-relaxed space-y-4">
                {area.bessStandaloneDescription.split('\n\n').map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Features Section */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-[#062516] mb-8">Key Capabilities</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {area.features.map((feature, featureIndex) => (
              <div
                key={featureIndex}
                className="flex items-start space-x-4 bg-[#062516]/5 p-6 rounded-lg hover:shadow-md transition-shadow duration-300"
              >
                <div className="w-3 h-3 bg-[#062516] rounded-full mt-2 flex-shrink-0" />
                <span className="text-gray-700">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Technical Description Section */}
        {area.technicalDescription && (
          <div className="grid grid-cols-1 gap-12 items-start mb-16">
            <div className="space-y-6">
              <div className="text-gray-600 leading-relaxed space-y-4">
                {area.technicalDescription.split('\n\n').map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Technical details Section */}
        {area.technicalDetails && (
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-[#062516] mb-8">Technical Expertise</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {area.technicalDetails.map((td, tIndex) => (
                <div
                  key={tIndex}
                  className="flex items-start space-x-4 bg-[#062516]/5 p-6 rounded-lg hover:shadow-md transition-shadow duration-300"
                >
                  <div className="w-3 h-3 bg-[#062516] rounded-full mt-2 flex-shrink-0" />
                  <span className="text-gray-700">{td}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Projects Section */}
        {!loading && projects.length > 0 && (
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-[#062516] mb-8">Our {area.title} Projects</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </div>
        )}

        {/* Call to Action */}
        <div className="bg-[#062516]/5 rounded-lg p-12 text-center">
          <h3 className="text-2xl font-bold text-[#062516] mb-4">
            Interested in Our {area.title} Solutions?
          </h3>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Contact our team to discuss how we can help you with your energy needs and project requirements.
          </p>
          <a
            href="/contact"
            className="inline-block px-8 py-4 bg-[#062516] text-white rounded-lg font-medium hover:bg-[#051e12] transition-colors duration-300"
          >
            Contact Us
          </a>
        </div>
      </div>

      <Footer />
    </div>
  );
}
