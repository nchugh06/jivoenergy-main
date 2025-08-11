'use client'
import React, { useState, useEffect } from 'react';
import Image from 'next/image';

interface Technology {
  id: number;
  subtitle: string;
  title: string;
  description: string;
  image: string;
}

const technologies: Technology[] = [
  {
    id: 1,
    subtitle: "Our Technologies",
    title: "Storage, a guarantee of success for renewables",
    description: "Advanced energy storage solutions ensure reliable power delivery and grid stability, making renewable energy.",
    image: "/logo.png"
  },
  {
    id: 2,
    subtitle: "Our Technologies",
    title: "Solar Innovation for Maximum Efficiency",
    description: "More than 250 MW with access and connection and more than 1,500 MW in the permit application process.",
    image: "/logo.png"
  },
  {
    id: 3,
    subtitle: "Our Technologies",
    title: "Smart Grid Integration for Solar Innovation",
    description: "Intelligent grid management systems that seamlessly integrate renewable energy sources with existing infrastructure.",
    image: "/logo.png"
  }
];

const Projects = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        nextSlide();
      } else if (e.key === 'ArrowLeft') {
        prevSlide();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % technologies.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + technologies.length) % technologies.length);
  };

  return (
    <section className="technology" id="services" style={{ width: '100%' }}>
      <div className="technology__container" style={{ width: '100%' }}>
        {/* Swiper Container */}
        <div className="swiper technology-swiper">
          <div className="swiper-wrapper">
            {technologies.map((tech, index) => (
              <div 
                key={tech.id}
                className={`swiper-slide ${index === currentSlide ? 'active' : ''}`}
                style={{
                  display: index === currentSlide ? 'block' : 'none',
                  opacity: index === currentSlide ? 1 : 0,
                  transform: index === currentSlide ? 'translateX(0)' : 'translateX(20px)',
                  transition: 'all 0.6s ease-in-out'
                }}
              >
                <div className="technology__content">
                  <div className="technology__image">
                    <Image 
                      src={tech.image} 
                      alt="Energy storage facility"
                      className="technology__img"
                      width={600}
                      height={400}
                      style={{ objectFit: 'cover', width: '100%' }}
                    />
                  </div>
                  <div className="technology__text">
                    <p className="technology__subtitle">{tech.subtitle}</p>
                    <h3 className="technology__slide-title">{tech.title}</h3>
                    <p className="technology__slide-description">
                      {tech.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Swiper Navigation */}
        <div className="technology__navigation">
          <button 
            className="swiper-button-prev technology__nav-btn"
            onClick={prevSlide}
          >
            <svg width="8" height="13" viewBox="0 0 8 13" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd"
                d="M0.929 7.071L6.586 12.728L8 11.314L3.05 6.364L8 1.414L6.586 0L0.929 5.657C0.741529 5.84453 0.636214 6.09884 0.636214 6.364C0.636214 6.62916 0.741529 6.88347 0.929 7.071Z"
                fill="#103319" />
            </svg>
          </button>
          <button 
            className="swiper-button-next technology__nav-btn"
            onClick={nextSlide}
          >
            <svg width="8" height="13" viewBox="0 0 8 13" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd"
                d="M7.071 7.071L1.414 12.728L0 11.314L4.95 6.364L0 1.414L1.414 0L7.071 5.657C7.25847 5.84453 7.36379 6.09884 7.36379 6.364C7.36379 6.62916 7.25847 6.88347 7.071 7.071Z"
                fill="#103319" />
            </svg>
          </button>
        </div>
      </div>

      <style jsx>{`
        .technology {
          padding: 120px 0;
          background: radial-gradient(ellipse at center bottom, #425831 0%, #274711 40%, #19361e 70%, #0f2419 100%);
          color: #ffffff;
          width: 100%;
        }

        .technology__container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 5%;
          width: 100%;
        }

        .swiper {
          margin-left: auto;
          margin-right: auto;
          position: relative;
          overflow: hidden;
          list-style: none;
          padding: 0;
          z-index: 1;
          display: block;
          width: 100%;
        }

        .technology-swiper {
          overflow: visible;
          width: 100%;
        }

        .swiper-wrapper {
          position: relative;
          width: 100%;
          height: 100%;
          z-index: 1;
          display: flex;
          transition-property: transform;
          box-sizing: content-box;
        }

        .swiper-slide {
          flex-shrink: 0;
          width: 100%;
          height: 100%;
          position: relative;
          transition-property: transform, opacity;
          transition-duration: 0.6s;
          transition-timing-function: ease-in-out;
        }

        .swiper-slide.active {
          opacity: 1;
          transform: translateX(0);
        }

        .swiper-slide:not(.active) {
          opacity: 0;
          transform: translateX(20px);
        }

        .technology__content {
          display: flex;
          align-items: center;
          gap: 4rem;
        }

        .technology__image {
          flex: 1;
        }

        .technology__img {
          width: 100% !important;
          height: auto;
          border-radius: 12px;
        }

        .technology__text {
          flex: 1;
          padding: 2rem;
        }

        .technology__subtitle {
          color: #a0a0a0;
          font-size: 0.875rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 1rem;
        }

        .technology__slide-title {
          font-size: 2.5rem;
          font-weight: 700;
          line-height: 1.2;
          margin-bottom: 1.5rem;
          color: #ffffff;
        }

        .technology__slide-description {
          font-size: 1.125rem;
          line-height: 1.6;
          color: #d1d5db;
        }

        .technology__navigation {
          display: flex;
          justify-content: center;
          gap: 1rem;
          margin-top: 3rem;
        }

        .technology__nav-btn {
          width: 48px;
          height: 48px;
          border: none;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .technology__nav-btn:hover {
          background: rgba(255, 255, 255, 0.2);
          transform: scale(1.05);
        }

        .technology__nav-btn svg {
          transition: transform 0.3s ease;
        }

        .technology__nav-btn:hover svg {
          transform: scale(1.1);
        }

        @media (max-width: 768px) {
          .technology__content {
            flex-direction: column;
            gap: 2rem;
          }

          .technology__slide-title {
            font-size: 2rem;
          }

          .technology__text {
            padding: 1rem;
          }
        }
      `}</style>
    </section>
  );
};

export default Projects; 