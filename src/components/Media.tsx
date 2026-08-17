'use client'
import React, { Suspense } from 'react';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import newsData from '@/data/news.json';

export interface MediaCard {
  id: number;
  title: string;
  description: string;
  image: string;
  category: string;
  slug?: string;
  link?: string;
  open?: 'tab' | 'iframe';
}

export const mediaCards: MediaCard[] = newsData as MediaCard[];

interface MediaProps {
  limit?: number;
}

function findCardByOpenParam(value: string | null) {
  if (!value) return undefined;
  return mediaCards.find(
    (card) => card.slug === value || String(card.id) === value
  );
}

function mediaOpenHref(card: MediaCard) {
  return `/media?open=${encodeURIComponent(card.slug || String(card.id))}`;
}

function MediaQueryOpener({
  onOpenIframe,
}: {
  onOpenIframe: (link: string | null) => void;
}) {
  const searchParams = useSearchParams();
  const openParam = searchParams.get('open');

  React.useEffect(() => {
    if (!openParam) {
      onOpenIframe(null);
      return;
    }
    const card = findCardByOpenParam(openParam);
    if (!card?.link) return;
    if (card.open === 'tab') {
      window.open(card.link, '_blank', 'noopener,noreferrer');
      return;
    }
    onOpenIframe(card.link);
  }, [openParam, onOpenIframe]);

  return null;
}

const Media = ({ limit }: MediaProps) => {
  const router = useRouter();
  const [activeLink, setActiveLink] = React.useState<string | null>(null);
  const sortedCards = [...mediaCards];

  const closeModal = () => {
    setActiveLink(null);
    router.replace('/media', { scroll: false });
  };

  const openCard = (card: MediaCard) => {
    if (!card.link) return;
    if (card.open === 'tab') {
      window.open(card.link, '_blank', 'noopener,noreferrer');
      return;
    }
    setActiveLink(card.link);
    router.replace(mediaOpenHref(card), { scroll: false });
  };

  const displayedCards = limit ? sortedCards.slice(0, limit) : sortedCards;

  return (
    <section className="w-full py-15 bg-[#f6faf5] relative overflow-hidden">
      <Suspense fallback={null}>
        <MediaQueryOpener onOpenIframe={setActiveLink} />
      </Suspense>
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
              onClick={() => openCard(card)}
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
            onClick={closeModal}
          ></div>
          
          <div className="relative w-full h-full max-w-6xl bg-white rounded-3xl overflow-hidden shadow-2xl flex flex-col animate-in fade-in zoom-in duration-300">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 bg-[#062516] border-b border-white/10">
              <h3 className="text-white font-medium truncate pr-4">
                {mediaCards.find(c => c.link === activeLink)?.title}
              </h3>
              <button 
                onClick={closeModal}
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
