'use client';

import React from 'react';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const certifications = [
  {
    title: "ISO 9001:2015",
    description: "Quality Management System certification ensuring consistent quality standards across all operations.",
    image: "/certificates/iso9001.png",
    year: "2023"
  },
  {
    title: "ISO 14001:2015",
    description: "Environmental Management System certification demonstrating our commitment to environmental sustainability.",
    image: "/certificates/iso14001.png",
    year: "2023"
  },
  {
    title: "OHSAS 18001:2007",
    description: "Occupational Health and Safety Management System ensuring workplace safety standards.",
    image: "/certificates/ohsas18001.png",
    year: "2023"
  },
  {
    title: "IEC 61439",
    description: "International standard for low-voltage switchgear and controlgear assemblies.",
    image: "/certificates/iec61439.png",
    year: "2023"
  },
  {
    title: "UL Certification",
    description: "Safety certification for electrical equipment and components.",
    image: "/certificates/ul.png",
    year: "2023"
  },
  {
    title: "CE Marking",
    description: "European conformity marking for products sold in the European Economic Area.",
    image: "/certificates/ce.png",
    year: "2023"
  }
];

const Certificate = () => {
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
            CERTIFICATIONS
          </h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Introduction Section */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-[#062516] mb-4">
            Our Commitment to Excellence
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            At Jivo Energy, we maintain the highest standards of quality, safety, and environmental responsibility. 
            Our certifications demonstrate our commitment to excellence and our dedication to delivering reliable 
            energy solutions that meet international standards.
          </p>
        </div>

        {/* Certifications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {certifications.map((cert, index) => (
            <div 
              key={index}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative h-48 bg-gray-100">
                <Image
                  src={cert.image}
                  alt={cert.title}
                  fill
                  className="object-contain p-4"
                />
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-bold text-[#062516]">{cert.title}</h3>
                  <span className="text-sm font-semibold text-gray-500">{cert.year}</span>
                </div>
                <p className="text-gray-600">{cert.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Information Section */}
        <div className="mt-16 bg-[#062516]/5 rounded-lg p-8">
          <h3 className="text-2xl font-bold text-[#062516] mb-4">
            Quality Assurance
          </h3>
          <p className="text-gray-600 mb-6">
            Our commitment to quality extends beyond certifications. We continuously monitor and improve our 
            processes to ensure we deliver the highest quality products and services to our clients. Our 
            quality management system is regularly audited and updated to maintain compliance with 
            international standards.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow">
              <h4 className="font-bold text-[#062516] mb-2">Regular Audits</h4>
              <p className="text-gray-600">Continuous monitoring and improvement of our processes</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h4 className="font-bold text-[#062516] mb-2">Training Programs</h4>
              <p className="text-gray-600">Comprehensive training for all employees on quality standards</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h4 className="font-bold text-[#062516] mb-2">Documentation</h4>
              <p className="text-gray-600">Detailed documentation of all processes and procedures</p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Certificate;
