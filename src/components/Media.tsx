'use client'
import React from 'react';
import Image from 'next/image';

interface MediaCard {
  id: number;
  title: string;
  description: string;
  image: string;
  category: string;
  link?: string;
  open?: 'tab' | 'iframe';
}

export const mediaCards: MediaCard[] = [
   {
    id: 0,
    title: "JIVO Energy hails Malawi BESS project teams",
    description: "Renewable energy company JIVO Energy has outlined its role following the recent commissioning of Malawi's first grid-scale battery energy storage system (BESS).",
    image: "/media_assets/Two-businessmen-BESS-power-plant-Malawi.webp",
    category: "News",
    link: "https://africanreview.com/energy/jivo-energy-hails-malawi-bess-project-teams"
  },
  {
    id: 1,
    title: "JIVO Energy powers up 20-MW grid-forming battery in Malawi",
    description: "Utility-scale solar and storage installer Jivo Energy said on Tuesday it has launched commercial operations of a 20-MW/40-MWh battery in Malawi.",
    image: "/media_assets/grid_forming.webp",
    category: "News",
    link: "https://renewablesnow.com/news/jivo-energy-powers-up-20-mw-grid-forming-battery-in-malawi-1299191/",
    open: "tab"
  },
  {
    id: 2,
    title: "Malawi commissions first grid-scale BESS project",
    description: "Malawi commissioned its first grid-forming utility-scale Battery Energy Storage System (BESS) at the Kanengo Substation in Lilongwe on 24th July.",
    image: "/media_assets/africa-business-community.jpg",
    category: "News",
    link: "https://africabusinesscommunities.com/sustainable-energy/jivo-energy-commissions-malawis-first-grid-scale-bess-project/"
  },
  {
    id: 3,
    title: "JIVO Energy constrói Central Solar de Santo Amaro em São Tomé",
    description: "JIVO Energy has built the Santo Amaro solar power plant in Sao Tome, contributing to the country's grid stability and renewable energy goals.",
    image: "/media_assets/sao_tome_1.png",
    category: "News",
    link: "https://www.telanon.info/sociedade/2025/12/27/51256/jivo-energy-constroi-central-solar-de-santo-amaro-em-sao-tome/"
  },
  {
    id: 4,
    title: "JIVO Energy has built the Santo Amaro solar power plant in Sao Tome",
    description: "Successful completion of the 1.2 MWp grid-connected solar PV plant in São Tomé and Príncipe by JIVO Energy.",
    image: "/media_assets/sao_tome_2.png",
    category: "News",
    link: "https://www.africanpowerplatform.org/news/press-releases-2/external/4551-jivo-energy-has-built-the-santo-amaro-solar-power-plant-in-sao-tome.html"
  },
  {
    id: 5,
    title: "JIVO Energy contributes to green energy transition in Liberia",
    description: "JIVO Energy's significant contribution to the green energy transition in Liberia through solar and BESS systems.",
    image: "/media_assets/liberia_health.png",
    category: "News",
    link: "https://www.africanpowerplatform.org/news/press-releases-2/external/4552-jivo-energy-contributes-to-green-energy-transition-in-liberia.html"
  },
  {
    id: 6,
    title: "JIVO Energy commissions solar & BESS systems in Liberia",
    description: "Official commissioning of solar and battery energy storage systems in Liberia by JIVO Energy.",
    image: "/media_assets/liberia_health.png",
    category: "News",
    link: "https://theelectricityhub.com/jivo-energy-commissions-solar-bess-systems-in-liberia/"
  },
  {
    id: 7,
    title: "JIVO Energy solarizes irrigation water pumps in Northern Senegal",
    description: "JIVO Energy supports rice farming in Northern Senegal by solarizing irrigation water pumps, enhancing agricultural productivity.",
    image: "/media_assets/senegal_1.png",
    category: "",
    link: "https://africa-energy-portal.org/news/jivo-energy-solarizes-irrigation-water-pumps-support-rice-farming-northern-senegal"
  },
  {
    id: 8,
    title: "Sierra Leone solar subsidy unique 2024 plan unveiled",
    description: "UNEP PV Knowhow features Sierra Leone's solar subsidy plan and JIVO Energy's involvement in renewable energy projects.",
    image: "/media_assets/senegal_social.png",
    category: "",
    link: "https://www.pvknowhow.com/news/sierra-leone-solar-subsidy-unique-2024-plan-unveiled/"
  },
  {
    id: 9,
    title: "JIVO Energy's first hybrid off-grid mini-grid in Moyamba",
    description: "Salone Messengers reports on JIVO Energy's commissioning of the first hybrid off-grid mini-grid in Moyamba Town, Sierra Leone.",
    image: "/media_assets/senegal_social.png",
    category: "",
    link: "https://salonemessengers.com/jivo-energy-first-hybrid-off-grid-mini-grid-moyamba/"
  },
  {
    id: 10,
    title: "JIVO Energy adds 1.2 MWp solar capacity in Sao Tome",
    description: "Solar Quarter highlights JIVO Energy's contribution to reducing load-shedding in Sao Tome with new solar capacity.",
    image: "/media_assets/sao_tome_3.png",
    category: "",
    link: "https://solarquarter.com/2026/01/16/jivo-energy-adds-1-2-mwp-solar-capacity-to-reduce-load-shedding-in-sao-tome/"
  },
  {
    id: 11,
    title: "JIVO Energy Powers 39 Off-Grid Health Facilities in Liberia with Solar + BESS - SolarQuarter",
    description: "JIVO Energy provides reliable solar + BESS power to 39 off-grid health facilities in Liberia.",
    image: "/media_assets/liberia_health.png",
    category: "",
    link: "https://solarquarter.com/2026/01/21/jivo-energy-powers-39-off-grid-health-facilities-with-solar-bess-solarquarter/"
  },
  {
    id: 12,
    title: "JIVO Energy solarizes irrigation water pumps in Northern Senegal",
    description: "Another feature on JIVO Energy's solar irrigation project in Northern Senegal by Solar Quarter.",
    image: "/media_assets/senegal_2.png",
    category: "",
    link: "https://solarquarter.com/2026/01/28/jivo-energy-solarizes-irrigation-water-pumps-to-support-rice-farming-in-northern-senegal/"
  },
  {
    id: 13,
    title: "JIVO Energy completes solar PV installations for irrigation in Senegal",
    description: "Solar Quarter reports on the completion of solar PV installations for irrigation projects by JIVO Energy.",
    image: "/media_assets/senegal_3.png",
    category: "",
    link: "https://solarquarter.com/2026/01/28/jivo-energy-completes-solar-pv-installations-for-irrigation-projects-in-northern-senegal/"
  },
  {
    id: 14,
    title: "JIVO Energy commissions Sierra Leone's first hybrid off-grid power system",
    description: "Feature on JIVO Energy's Moyamba project in Sierra Leone by Solar Quarter.",
    image: "/media_assets/senegal_social.png",
    category: "",
    link: "https://solarquarter.com/2026/02/02/jivo-energy-commissions-sierra-leones-first-hybrid-off-grid-power-system-in-moyamba/"
  },
  {
    id: 15,
    title: "JIVO Energy commissions Sierra Leone's first hybrid mini-grid in Moyamba",
    description: "Detailed report on the Moyamba hybrid mini-grid commissioning in Sierra Leone.",
    image: "/media_assets/senegal_social.png",
    category: "",
    link: "https://solarquarter.com/2026/02/03/jivo-energy-commissions-sierra-leones-first-hybrid-off-grid-mini-grid-in-moyamba-town/"
  },
  {
    id: 16,
    title: "JIVO Energy powers 39 health facilities in Liberia",
    description: "Now Solar features JIVO Energy's healthcare electrification project in Liberia.",
    image: "/media_assets/liberia_health.png",
    category: "",
    link: "https://now.solar/2026/01/21/jivo-energy-powers-39-off-grid-health-facilities-in-liberia-with-solar-bess-solarquarter/"
  },
  {
    id: 17,
    title: "JIVO Energy completes solar installations in Senegal",
    description: "Now Solar coverage of JIVO Energy's irrigation projects in Senegal.",
    image: "/media_assets/senegal_4.png",
    category: "",
    link: "https://now.solar/2026/01/28/jivo-energy-completes-solar-pv-installations-for-irrigation-projects-in-northern-senegal-solarquarter/"
  },
  {
    id: 18,
    title: "JIVO Energy commissions hybrid off-grid system in Moyamba",
    description: "Now Solar reports on the Moyamba power system commissioning in Sierra Leone.",
    image: "/media_assets/senegal_social.png",
    category: "",
    link: "https://now.solar/2026/02/02/jivo-energy-commissions-sierra-leones-first-hybrid-off-grid-power-system-in-moyamba-solarquarter/"
  }
];

interface MediaProps {
  limit?: number;
}

const Media = ({ limit }: MediaProps) => {
  const [activeLink, setActiveLink] = React.useState<string | null>(null);
  const sortedCards = [...mediaCards];

  const displayedCards = limit ? sortedCards.slice(0, limit) : sortedCards;

  return (
    <section className="w-full py-15 bg-[#f6faf5] relative overflow-hidden">
      <h3 className="section-title-spl text-center text-[#062516] mb-10">JIVO Energy Newsroom</h3>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-96 h-96 bg-green-400 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-green-300 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-green-200 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Header Section */}
        <div className="text-center mb-16">
          {/* <div className="inline-block">
            <span className="inline-block px-6 py-3 bg-white/10 backdrop-blur-sm text-white text-sm font-medium rounded-full border border-white/20 mb-6">
              Media & Resources
            </span>
          </div> */}
          {/* <h3 className="text-5xl font-bold text-white mb-6 leading-tight">
            <span className="block">Stay Informed With Our</span>
            <span className="block">
              Latest Updates & Insights
            </span>
          </h3>
          <p className="text-white max-w-3xl mx-auto text-lg leading-relaxed opacity-90">
            Explore our comprehensive collection of industry news, success stories, and expert insights 
            to stay ahead in the renewable energy sector.
          </p> */}
        </div>
        
        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {displayedCards.map((card) => (
            <button 
              key={card.id}
              onClick={() => {
                if (!card.link) return;
                if (card.open === 'tab') {
                  window.open(card.link, '_blank', 'noopener,noreferrer');
                  return;
                }
                setActiveLink(card.link);
              }}
              className="group bg-white/95 backdrop-blur-sm rounded-2xl overflow-hidden shadow-2xl border border-white/20 hover:bg-white hover:shadow-green-500/20 hover:-translate-y-3 hover:scale-105 transition-all duration-500 relative block text-left"
            >
              {/* Category Badge */}
              <div className="absolute top-4 left-4 z-10">
                {card.category &&(
                  <span className="px-4 py-2 bg-[#062516] text-white text-xs font-semibold rounded-full shadow-lg">
                  {card.category}
                </span>
                )
                }
                
              </div>
              
              {/* Image Container */}
              <div className="relative w-full h-56 overflow-hidden bg-gray-200">
                <div className="absolute inset-0 bg-gradient-to-t from-[#062516]/40 via-transparent to-transparent z-10"></div>
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  priority={false}
                  className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
              
              {/* Content */}
              <div className="p-8 h-96 flex flex-col">
                <h3 className="text-2xl font-bold text-[#062516] mb-4 group-hover:text-green-600 transition-colors duration-300 line-clamp-2">
                  {card.title}
                </h3>
                <p className="text-gray-700 mb-6 leading-relaxed flex-1 overflow-hidden">
                  {card.description}
                </p>
                
                {/* CTA Button */}
                <div className="inline-flex items-center px-6 py-3 bg-[#062516] text-white font-semibold rounded-xl hover:bg-green-700 hover:shadow-lg hover:shadow-green-500/25 transform hover:scale-105 transition-all duration-300 group/btn">
                  <span>Learn More</span>
                  <svg 
                    className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Iframe Modal */}
      {activeLink && (
        <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4 md:p-8 pt-24 md:pt-32">
          <div 
            className="absolute inset-0 bg-black/80 backdrop-blur-md transition-opacity duration-300"
            onClick={() => setActiveLink(null)}
          ></div>
          
          <div className="relative w-full h-full max-w-6xl bg-white rounded-3xl overflow-hidden shadow-2xl flex flex-col animate-in fade-in zoom-in duration-300">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 bg-[#062516] border-b border-white/10">
              <h3 className="text-white font-medium truncate pr-4">
                {mediaCards.find(c => c.link === activeLink)?.title}
              </h3>
              <button 
                onClick={() => setActiveLink(null)}
                className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-all duration-200"
                aria-label="Close modal"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Iframe Container */}
            <div className="flex-1 w-full relative bg-gray-50">
              <div className="absolute inset-0 flex items-center justify-center -z-10">
                <div className="w-8 h-8 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
              </div>
              <iframe 
                src={activeLink}
                className="w-full h-full border-none shadow-inner"
                title="External Content"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-between items-center text-sm text-gray-500">
              <p>Content hosted by external site</p>
              <a 
                href={activeLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-600 font-semibold hover:text-green-700 flex items-center gap-1 transition-colors"
              >
                Open in new tab
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Media;
