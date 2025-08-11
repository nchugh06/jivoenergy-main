'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const capabilities = [
  {
    id: '01',
    title: 'ORIGINATE',
    description: 'Leverage the vast industry and government network of our principals and team to source potential opportunities',
    points: [
      'Identify optimum locations for siting of renewable energy projects through our in-house teams',
      'Seek partnerships with other developers to share risks and rewards'
    ]
  },
  {
    id: '02',
    title: 'DEVELOP',
    description: 'Achieve a high "conversion rate" through the development cycle by:',
    points: [
      'Prioritising projects with greatest impact',
      'Enhancing in-house capabilities',
      'Accelerating the timetable to financial close',
      'Nurturing relationships with local stakeholders and partners'
    ]
  },
  {
    id: '03',
    title: 'FINANCE',
    description: 'Capitalise on the availability of development financing from leading international lending institutions',
    points: [
      'Leverage our capital market relations to bring additional debt and equity funding',
      'Maintain good relationships with DFIs, ECAs, and other multi-lateral and bi-lateral institutions'
    ]
  },
  {
    id: '04',
    title: 'BUILD',
    description: 'Leverage in-house construction & project management capabilities for sustainable design & engineering of assets',
    points: [
      'Utilise the latest industry-standard tools & techniques for EPC / OEM',
      'Capitalise on the strong technical- commercial insight of our team'
    ]
  },
  {
    id: '05',
    title: 'OPERATE',
    description: 'Capitalise on in-house O&M capabilities across technologies',
    points: [
      'Consider technical tie-ups with OEMs',
      'Building a strong asset management team to ensure optimisation of operations and portfolio management'
    ]
  }
];

const Capabilities = () => {
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
            OUR CAPABILITIES
          </h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="space-y-16">
          {capabilities.map((capability, index) => (
            <div 
              key={capability.id}
              className={`flex flex-col lg:flex-row gap-8 items-start ${
                index % 2 === 1 ? 'lg:flex-row-reverse' : ''
              }`}
            >
              {/* Number and Title Section */}
              <div className="lg:w-1/3">
                <div className="sticky top-24">
                  <div className="text-[#062516] text-6xl font-bold mb-4">
                    {capability.id}
                  </div>
                  <h2 className="text-3xl font-bold text-[#062516] mb-4">
                    {capability.title}
                  </h2>
                  <p className="text-gray-600 text-lg">
                    {capability.description}
                  </p>
                </div>
              </div>

              {/* Points Section */}
              <div className="lg:w-2/3">
                <div className="bg-white rounded-lg shadow-lg p-8">
                  <ul className="space-y-4">
                    {capability.points.map((point, pointIndex) => (
                      <li key={pointIndex} className="flex items-start">
                        <div className="flex-shrink-0 w-2 h-2 bg-[#062516] rounded-full mt-2 mr-3"></div>
                        <p className="text-gray-700">{point}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Capabilities;
