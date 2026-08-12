'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
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

  const renderRichText = (content?: string | null) => {
    if (!content) return null;

    return content
      .split('\n\n')
      .filter(Boolean)
      .map((paragraph, idx) => (
        <p key={idx} dangerouslySetInnerHTML={{ __html: paragraph.replace(/\n/g, '<br />') }} />
      ));
  };

  const displayTitle = area.title?.trim() || slug
    .split('-')
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

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
          alt={displayTitle}
          fill
          className="object-cover"
          priority
        />
        {/* <div className="absolute inset-0 bg-gradient-to-br from-[#085D36]/50 to-[#04301C]/0"></div>
        <div className="relative z-10 container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            {area.title}
          </h1>
        </div> */}
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
        <div className="grid grid-cols-1 gap-6 items-start mb-6 bg">
          <div className="mb-0">
            <h3 className="section-title-spl text-center text-[#062516]">{displayTitle}</h3>
          </div>
          {/* Description Section */}
          <div className="space-y-6">
            <div className="text-gray-600 leading-relaxed space-y-4">
              {renderRichText(area.fullDescription)}
            </div>
          </div>
        </div>

        {/* Technical Description Section */}
        {area.bessStandaloneDescription && (
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-[#062516] mb-4 text-center">Standalone BESS Systems</h3>
            <div className="space-y-6">
              <div className="text-gray-600 leading-relaxed space-y-4">
                {renderRichText(area.bessStandaloneDescription)}
              </div>
            </div>
          </div>
        )}

        {/* Features Section */}
        <section className="py-5 px-6 md:px-12 bg-gradient-to-br from-[#085D36]/5 to-[#04301C]/5">
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-[#062516] mb-8 text-center">Key Capabilities</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {area.features.map((feature, featureIndex) => (
                <div
                  key={featureIndex}
                  className="flex items-start space-x-4 bg-[#062516] p-6 rounded-lg hover:shadow-md transition-shadow duration-300"
                >
                  <div className="w-3 h-3 bg-[#062516] rounded-full mt-2 flex-shrink-0" />
                  <span className="text-white text-center">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Technical Description Section */}
        {area.technicalDescription && (
          <div className="grid grid-cols-1 gap-12 items-start mb-16">
            <div className="space-y-6">
              <div className="text-gray-600 leading-relaxed space-y-4">
                {renderRichText(area.technicalDescription)}
              </div>
            </div>
          </div>
        )}

        {/* Technical details Section */}
        {area.technicalDetails.length > 0 && (
          // <hr className="my-12 border-gray-300"></hr>
          <section className="py-5 px-6 md:px-12 bg-gradient-to-br from-[#085D36]/5 to-[#04301C]/5">
            <div className="mb-16">
              <h3 className="text-2xl font-bold text-[#062516] mb-8 text-center">Technical Expertise</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {area.technicalDetails.map((td, tIndex) => (
                  <div
                    key={tIndex}
                    className="flex items-start space-x-4 bg-[#fefefe] border border-[#062516] p-6 rounded-lg hover:shadow-md transition-shadow duration-300"
                  >
                    {/* <div className="w-3 h-3 bg-[#062516] rounded-full mt-2 flex-shrink-0" /> */}
                    <span className="text-[#062516] text-center">{td}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Projects Section — image + subtitle carousel */}
        {!loading && projects.length > 0 && (
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-[#062516] mb-0 text-center py-10">
              Our {displayTitle} Landmark Projects
            </h3>

            <div className="relative px-2">
              <Swiper
                modules={[Autoplay]}
                autoplay={{
                  delay: 4500,
                  disableOnInteraction: false,
                  pauseOnMouseEnter: true,
                }}
                loop={projects.length > 3}
                spaceBetween={24}
                slidesPerView={1}
                breakpoints={{
                  640: { slidesPerView: 1, spaceBetween: 16 },
                  768: { slidesPerView: 2, spaceBetween: 20 },
                  1024: { slidesPerView: 3, spaceBetween: 24 },
                }}
              >
                {projects.map((project) => (
                  <SwiperSlide key={project.id}>
                    <Link
                      href={project.id ? `/projects/${project.id}` : '/projects'}
                      className="group block h-full"
                    >
                      <div className="overflow-hidden rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-lg transition-shadow duration-300">
                        <div className="relative h-56 w-full bg-gray-100">
                          {project.imageUrl ? (
                            <Image
                              src={project.imageUrl}
                              alt={project.sub_title || project.title}
                              fill
                              className="object-cover transition-transform duration-500 group-hover:scale-105"
                              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            />
                          ) : (
                            <div className="absolute inset-0 flex items-center justify-center bg-[#062516]/5 text-[#062516]/40 text-sm font-medium">
                              No image
                            </div>
                          )}
                        </div>
                        {project.sub_title && (
                          <div className="px-5 py-4">
                            <p className="text-center text-[#062516] font-semibold text-base leading-snug line-clamp-2">
                              {project.sub_title}
                            </p>
                          </div>
                        )}
                      </div>
                    </Link>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        )}

        {/* Call to Action */}
        {/* <div className="bg-[#062516]/5 rounded-lg p-12 text-center">
          <h3 className="text-2xl font-bold text-[#062516] mb-4">
            Interested in Our {displayTitle} Solutions?
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
        </div> */}
      </div>

      <Footer />
    </div >
  );
}
