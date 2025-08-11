'use client'
import React from 'react';
import Image from 'next/image';

interface MediaCard {
  id: number;
  title: string;
  description: string;
  image: string;
  category: string;
}

const mediaCards: MediaCard[] = [
  {
    id: 1,
    title: "Renewable Energy News",
    description: "Stay updated with the latest developments in renewable energy technology and sustainable practices.",
    image: "/media-news.jpg",
    category: "News"
  },
  {
    id: 2,
    title: "Success Stories",
    description: "Discover how our innovative solutions have transformed businesses and communities worldwide.",
    image: "/media-success.jpg",
    category: "Case Studies"
  },
  {
    id: 3,
    title: "Industry Insights",
    description: "Expert analysis and deep dives into the future of sustainable energy and green technology.",
    image: "/media-insights.jpg",
    category: "Research"
  }
];

const Media = () => {
  return (
    <section className="w-full py-20 bg-[#062516] relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-96 h-96 bg-green-400 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-green-300 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-green-200 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-block">
            <span className="inline-block px-6 py-3 bg-white/10 backdrop-blur-sm text-white text-sm font-medium rounded-full border border-white/20 mb-6">
              Media & Resources
            </span>
          </div>
          <h2 className="text-5xl font-bold text-white mb-6 leading-tight">
            <span className="block">Stay Informed With Our</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-green-100">
              Latest Updates & Insights
            </span>
          </h2>
          <p className="text-green-100 max-w-3xl mx-auto text-lg leading-relaxed opacity-90">
            Explore our comprehensive collection of industry news, success stories, and expert insights 
            to stay ahead in the renewable energy sector.
          </p>
        </div>
        
        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {mediaCards.map((card) => (
            <div 
              key={card.id}
              className="group bg-white/95 backdrop-blur-sm rounded-2xl overflow-hidden shadow-2xl border border-white/20 hover:bg-white hover:shadow-green-500/20 hover:-translate-y-3 hover:scale-105 transition-all duration-500 relative"
            >
              {/* Category Badge */}
              <div className="absolute top-4 left-4 z-10">
                <span className="px-4 py-2 bg-[#062516] text-white text-xs font-semibold rounded-full shadow-lg">
                  {card.category}
                </span>
              </div>
              
              {/* Image Container */}
              <div className="relative h-56 w-full overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-[#062516]/40 via-transparent to-transparent z-10"></div>
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>
              
              {/* Content */}
              <div className="p-8">
                <h3 className="text-2xl font-bold text-[#062516] mb-4 group-hover:text-green-600 transition-colors duration-300">
                  {card.title}
                </h3>
                <p className="text-gray-700 mb-6 leading-relaxed">
                  {card.description}
                </p>
                
                {/* CTA Button */}
                <button className="inline-flex items-center px-6 py-3 bg-[#062516] text-white font-semibold rounded-xl hover:bg-green-700 hover:shadow-lg hover:shadow-green-500/25 transform hover:scale-105 transition-all duration-300 group/btn">
                  <span>Learn More</span>
                  <svg 
                    className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
        
      </div>
    </section>
  );
};

export default Media; 