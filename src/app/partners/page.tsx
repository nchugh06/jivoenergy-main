'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Image from 'next/image';

const partners = [
  {
    name: "International Renewable Energy Agency (IRENA)",
    description: "An intergovernmental organisation that supports countries in their transition to a sustainable energy future, serving as the principal platform for international cooperation and a centre of excellence for renewable energy knowledge.",
    website: "www.irena.org",
    logo: "https://www.irena.org/-/media/Images/IRENA/Agency/Logo/IRENA_Logo_Colour.png"
  },
  {
    name: "United Nations Global Compact",
    description: "A voluntary multi-stakeholder platform which convenes multinational companies to align against ten principles covering environment, anti-corruption, human rights and labour standards.",
    website: "www.unglobalcompact.org",
    logo: "https://www.unglobalcompact.org/sites/default/files/styles/logo/public/2022-05/UNGC_Logo_2022.png"
  },
  {
    name: "Dii Desert Energy",
    description: "An independent, international network operating from Dubai, accelerating the energy transition in the MENA region towards the supply of green electrons and molecules across regional and global energy value chains.",
    website: "www.dii-desertenergy.org",
    logo: "https://dii-desertenergy.org/wp-content/uploads/2023/03/Dii-Desert-Energy-Logo.png"
  },
  {
    name: "Taskforce on Nature-related Financial Disclosures (TNFD)",
    description: "A global initiative developing and delivering a risk management and disclosure framework for organizations to report and act on evolving nature-related risks.",
    website: "www.tnfd.global",
    logo: "https://tnfd.global/wp-content/uploads/2023/03/TNFD-Logo-Color.png"
  },
  {
    name: "Nature Positive Forum",
    description: "A community of organizations dedicated to preserving and promoting the integrity of the Nature positive goal, ensuring more nature in the world in 2030 than in 2020.",
    website: "www.naturepositive.org",
    logo: "https://naturepositive.org/wp-content/uploads/2023/03/Nature-Positive-Logo.png"
  },
  {
    name: "International Energy Agency (IEA)",
    description: "The IEA works with governments and industry to shape a secure and sustainable energy future for all. It provides analysis, data, policy recommendations, and real-world solutions to help countries provide secure and sustainable energy for all.",
    website: "www.iea.org",
    logo: "https://www.iea.org/assets/images/iea-logo.svg"
  },
  {
    name: "World Economic Forum",
    description: "The World Economic Forum is the International Organization for Public-Private Cooperation. It engages political, business, cultural and other leaders to shape global, regional and industry agendas.",
    website: "www.weforum.org",
    logo: "https://assets.weforum.org/website/logo.svg"
  },
  {
    name: "Global Wind Energy Council",
    description: "GWEC is the international trade association for the wind power industry. It works to promote wind power globally and provides a forum for the wind industry to discuss policy, technology, and market issues.",
    website: "www.gwec.net",
    logo: "https://gwec.net/wp-content/uploads/2020/03/GWEC-logo.png"
  },
  {
    name: "SolarPower Europe",
    description: "SolarPower Europe is the award-winning link between policymakers and the solar PV value chain. It aims to ensure solar becomes Europe's leading energy source by 2030.",
    website: "www.solarpowereurope.org",
    logo: "https://www.solarpowereurope.org/wp-content/uploads/2020/03/SPE-logo.png"
  },
  {
    name: "International Solar Alliance",
    description: "The International Solar Alliance is an alliance of more than 120 signatory countries, most being sunshine countries, which lie either completely or partly between the Tropic of Cancer and the Tropic of Capricorn.",
    website: "www.isolaralliance.org",
    logo: "https://isolaralliance.org/wp-content/uploads/2020/03/ISA-Logo.png"
  }
];

const Partners = () => {
  const [imageErrors, setImageErrors] = useState<{ [key: string]: boolean }>({});

  const handleImageError = (partnerName: string) => {
    setImageErrors(prev => ({ ...prev, [partnerName]: true }));
  };

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
            OUR PARTNERS
          </h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-[#062516] mb-4">
            Strategic Partnerships for a Sustainable Future
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            We collaborate with leading organizations worldwide to drive innovation and accelerate the global transition to sustainable energy solutions.
          </p>
        </div>

        {/* Partners Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {partners.map((partner, index) => (
            <div 
              key={index}
              className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex items-center mb-6">
                <div className="w-24 h-24 relative mr-6 bg-gray-100 rounded-lg flex items-center justify-center">
                  {!imageErrors[partner.name] ? (
                    <Image
                      src={partner.logo}
                      alt={`${partner.name} logo`}
                      fill
                      className="object-contain p-2"
                      onError={() => handleImageError(partner.name)}
                    />
                  ) : (
                    <div className="text-[#062516] font-semibold text-center p-2">
                      {partner.name.split(' ')[0]}
                    </div>
                  )}
                </div>
                <h3 className="text-xl font-bold text-[#062516]">{partner.name}</h3>
              </div>
              <p className="text-gray-600 mb-4">{partner.description}</p>
              <a 
                href={`https://${partner.website}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#062516] hover:text-[#051e12] font-medium inline-flex items-center"
              >
                Visit Website
                <svg 
                  className="w-4 h-4 ml-2" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" 
                  />
                </svg>
              </a>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold text-[#062516] mb-4">
            Interested in Partnering with Us?
          </h3>
          <p className="text-gray-600 mb-8">
            Join us in our mission to create a sustainable energy future.
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

export default Partners;
