'use client';

import React from 'react';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const businessAreas = [
  {
    title: "Solar Energy",
    description: "Leading the transition to clean energy through innovative solar solutions. We develop, construct, and operate utility-scale solar power plants across emerging markets.",
    image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=2072&auto=format&fit=crop",
    features: [
      "Utility-scale solar projects",
      "Commercial & industrial solutions",
      "Solar farm development",
      "Operations & maintenance"
    ]
  },
  {
    title: "Wind Power",
    description: "Harnessing the power of wind to generate clean, renewable energy. Our wind energy projects contribute to sustainable development and energy independence.",
    image: "https://images.unsplash.com/photo-1541872703-74c5e44368f9?q=80&w=2070&auto=format&fit=crop",
    features: [
      "Onshore wind farms",
      "Wind resource assessment",
      "Project development",
      "Technical consulting"
    ]
  },
  {
    title: "Smart Grid Technology",
    description: "Modernizing power infrastructure with cutting-edge smart grid solutions. We implement advanced technologies to enhance grid efficiency and reliability.",
    image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=2069&auto=format&fit=crop",
    features: [
      "Grid modernization",
      "Energy management systems",
      "Distribution automation",
      "Smart metering solutions"
    ]
  },
  {
    title: "Energy Storage",
    description: "Pioneering energy storage solutions to ensure grid stability and renewable energy integration. Our storage systems optimize energy usage and reduce costs.",
    image: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?q=80&w=2069&auto=format&fit=crop",
    features: [
      "Battery storage systems",
      "Grid-scale storage",
      "Energy arbitrage",
      "Backup power solutions"
    ]
  },
  {
    title: "Energy Consulting",
    description: "Providing expert guidance on energy transition and sustainable development. Our consulting services help organizations achieve their energy goals.",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop",
    features: [
      "Energy strategy",
      "Technical due diligence",
      "Project feasibility studies",
      "Regulatory compliance"
    ]
  }
];

const BusinessAreas = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <div className="relative w-full h-[65vh] bg-[#062516] overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-90"
        >
          <source src="/power.mp4" type="video/mp4" />
        </video>
        <div className="relative z-10 h-full flex items-center justify-center">
          <h1 className="text-7xl font-bold text-white text-center px-4">
            BUSINESS AREAS
          </h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-[#062516] mb-4">Our Expertise</h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            We are a leading energy company specializing in renewable energy solutions, 
            smart grid technology, and energy consulting services across emerging markets.
          </p>
        </div>

        {/* Business Areas Grid */}
        <div className="space-y-24">
          {businessAreas.map((area, index) => (
            <div 
              key={index}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                index % 2 === 1 ? 'lg:flex-row-reverse' : ''
              }`}
            >
              {/* Image Section */}
              <div className="relative h-[400px] rounded-lg overflow-hidden shadow-xl">
                <Image
                  src={area.image}
                  alt={area.title}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Content Section */}
              <div className="space-y-6">
                <h3 className="text-3xl font-bold text-[#062516]">{area.title}</h3>
                <p className="text-gray-600 leading-relaxed">{area.description}</p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {area.features.map((feature, featureIndex) => (
                    <div 
                      key={featureIndex}
                      className="flex items-center space-x-3 bg-[#062516]/5 p-4 rounded-lg"
                    >
                      <div className="w-2 h-2 bg-[#062516] rounded-full" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-24 text-center">
          <h2 className="text-3xl font-bold text-[#062516] mb-6">
            Ready to Transform Your Energy Future?
          </h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Contact us today to learn more about our services and how we can help you 
            achieve your energy goals.
          </p>
          <a
            href="/contact"
            className="inline-block px-8 py-4 bg-[#062516] text-white rounded-lg font-medium hover:bg-[#051e12] transition-colors duration-300"
          >
            Get in Touch
          </a>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default BusinessAreas;
