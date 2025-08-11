'use client';

import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';

interface CountryCard {
  title: string;
  subtitle: string;
  description: string;
  image: string;
  path: string;
  imageCount: number;
}

const countryCards: CountryCard[] = [
  {
    title: "São Tomé and Príncipe",
    subtitle: "Gulf of Guinea",
    description: "Discover our sustainable energy projects in this beautiful island nation, where we're helping to power communities with renewable solutions.",
    image: '/gallery/sao1.jpg',
    path: '/gallery/sao-tome-principe',
    imageCount: 5
  },
  {
    title: "Malawi",
    subtitle: "Southeastern Africa",
    description: "Explore our impact in the Warm Heart of Africa, where we're bringing clean energy solutions to rural communities and urban centers.",
    image: '/gallery/malawi1.DNG',
    path: '/gallery/malawi',
    imageCount: 5
  },
  {
    title: "Liberia",
    subtitle: "West Africa",
    description: "Witness our commitment to rebuilding and empowering communities through sustainable energy infrastructure and development projects.",
    image: '/gallery/liberia1.jpeg',
    path: '/gallery/liberia',
    imageCount: 5
  },
  {
    title: "Kenya",
    subtitle: "East Africa",
    description: "Experience our innovative energy solutions in Kenya, where we're driving the transition to renewable energy across diverse landscapes.",
    image: '/gallery/kenya1.jpeg',
    path: '/gallery/kenya',
    imageCount: 5
  },
  {
    title: "Maio, Cape Verde",
    subtitle: "Atlantic Ocean",
    description: "Discover our sustainable initiatives on this pristine island, where we're harnessing natural resources for clean energy generation.",
    image: '/gallery/maiocape1.jpeg',
    path: '/gallery/maio-cape-verde',
    imageCount: 5
  },
  {
    title: "Achada, Cape Verde",
    subtitle: "Santiago Island",
    description: "Explore our energy projects in this vibrant community, where we're creating lasting positive impact through sustainable development.",
    image: '/gallery/achacape1.jpeg',
    path: '/gallery/achada-cape-verde',
    imageCount: 5
  }
];

export default function GalleryPage() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
        {/* Hero Section */}
        <div className="relative w-full h-[65vh] bg-[#062516] overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-[#062516] to-[#051e12] opacity-90"></div>
          <div className="relative z-10 h-full flex items-center justify-center">
            <div className="text-center">
              <motion.h1 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-6xl md:text-7xl font-bold text-white mb-6"
              >
                Our Global Impact
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-xl md:text-2xl text-gray-200 max-w-4xl mx-auto px-4"
              >
                Explore our journey through these captivating moments from around the world
              </motion.p>
            </div>
          </div>
        </div>

        {/* Countries Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {countryCards.map((country, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                whileHover={{ y: -8 }}
                className="group"
              >
                <Link href={country.path}>
                  <div className="bg-white rounded-2xl shadow-xl overflow-hidden cursor-pointer transition-all duration-300 group-hover:shadow-2xl">
                    {/* Image Container */}
                    <div className="relative h-64 overflow-hidden">
                      <Image
                        src={country.image}
                        alt={country.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      
                      {/* Image Count Badge */}
                      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 text-sm font-medium text-[#062516]">
                        {country.imageCount} photos
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <div className="mb-2">
                        <h3 className="text-xl font-bold text-[#062516] group-hover:text-[#051e12] transition-colors duration-300">
                          {country.title}
                        </h3>
                        <p className="text-sm text-[#062516]/70 font-medium">
                          {country.subtitle}
                        </p>
                      </div>
                      <p className="text-gray-600 text-sm leading-relaxed mb-4">
                        {country.description}
                      </p>
                      
                      {/* View Gallery Button */}
                      <div className="flex items-center justify-between">
                        <span className="text-[#062516] font-medium text-sm group-hover:text-[#051e12] transition-colors duration-300">
                          View Gallery
                        </span>
                        <div className="w-8 h-8 bg-[#062516] rounded-full flex items-center justify-center group-hover:bg-[#051e12] transition-colors duration-300">
                          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>

          {/* Call to Action */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-center mt-16"
          >
            <div className="bg-white rounded-2xl shadow-xl p-8 max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold text-[#062516] mb-4">
                Ready to Explore More?
              </h3>
              <p className="text-gray-600 mb-6">
                Discover how we're making a difference across the globe through sustainable energy solutions.
              </p>
              <Link href="/contact">
                <button className="bg-[#062516] text-white px-8 py-3 rounded-lg font-medium hover:bg-[#051e12] transition-colors duration-300">
                  Get in Touch
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
      <Footer />
    </>
  );
}
