'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Image from 'next/image';

const Partners = () => {
  const clients = [
    'client1.jpg', 'client2.jpg', 'client3.jpg', 'client4.jpg', 'client5.jpg',
    'client6.jpg', 'client7.jpg', 'client8.jpg', 'client9.jpg', 'client10.jpg',
    'client11.jpg', 'client12.jpg', 'client13.jpg'
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
      <h2 className="section-title text-center text-[#062516] mb-10 border-b pb-4 mx-auto max-w-2xl">
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
      <section className="relative h-[60vh] w-full flex items-center justify-center overflow-hidden">
              <Image
                src="/assets/banners/partners.webp"
                alt="Partners Banner"
                fill
                className="object-cover"
                priority
              />
              {/* <div className="absolute inset-0 bg-gradient-to-br from-[#085D36]/25 to-[#04301C]/25"></div> */}
            </section>

      {/* Main Partnership Content */}
      <div className="max-w-7xl mx-auto px-4 py-5">
        {renderSection('Clients', clients)}
        {renderSection('Financers', financers)}
        {renderSection('Technology Providers', technologyProviders)}
      </div>

      <Footer />
    </div>
  );
};

export default Partners;
