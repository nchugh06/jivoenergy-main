'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Image from 'next/image';

const Partners = () => {
  const clients = [
    'client1.png', 'client2.jpg', 'client3.png', 'client4.png', 'client5.png',
    'client6.png', 'client7.jpg', 'client8.png', 'client9.jpg', 'client10.png',
    'client11.png', 'client12.png', 'client13.png'
  ];

  const financers = [
    'finance1.jpg', 'finance2.png', 'finance3.png', 'finance4.png', 'finance5.png',
    'finance6.png', 'finance7.png'
  ];

  const technologyProviders = [
    'tp1.png', 'tp2.jpg', 'tp3.png', 'tp4.jpg', 'tp5.png', 'tp6.jpg', 'tp7.png',
    'tp8.jpg', 'tp9.png', 'tp10.png', 'tp11.jpg', 'tp12.png', 'tp13.png',
    'tp14.png', 'tp15.png', 'tp16.png', 'tp17.png', 'tp18.png'
  ];

  const renderSection = (title: string, images: string[]) => (
    <div className="mb-16">
      <h2 className="text-3xl font-bold text-[#062516] text-center mb-10 border-b pb-4 mx-auto max-w-2xl">
        {title}
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 justify-items-center items-center">
        {images.map((img, index) => (
          <div 
            key={index} 
            className="w-full h-32 relative p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100 flex items-center justify-center"
          >
            <Image
              src={`/partners/${img}`}
              alt={`${title} Partner ${index + 1}`}
              fill
              className="object-contain p-2"
              quality={100}
            />
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <div className="relative w-full h-[50vh] bg-[#062516] overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-60"
        >
          <source src="/partner_vid.mp4" type="video/mp4" />
        </video>
        <div className="relative z-10 h-full flex flex-col items-center justify-center">
          <h1 className="text-6xl md:text-7xl font-bold text-white text-center px-4 tracking-wider">
            OUR PARTNERS
          </h1>
          <p className="text-gray-200 mt-4 text-xl max-w-2xl text-center px-4">
            Collaborating for a sustainable future
          </p>
        </div>
      </div>

      {/* Main Partnership Content */}
      <div className="max-w-7xl mx-auto px-4 py-20">
        {renderSection('Clients', clients)}
        {renderSection('Financers', financers)}
        {renderSection('Technology Providers', technologyProviders)}
      </div>

      <Footer />
    </div>
  );
};

export default Partners;
