"use client";

import React, { useCallback, useRef } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import "./Achievements.css";

type Slide = {
  id:number;
  title: string;
  image: string;
  caption?: string;
};

const slides: Slide[] = [
  {
    id:1,
    title:
      "Successfully executed Hybrid Solar Power PV & Storage projects with varied technologies.",
    image: "/assets/our-achievement.jpg",
    caption: "Hybrid PV & Storage",
  },
  {
    id:2,
    title:
      "Rapid expansion from single country business in 2018 to presence in 15 countries now.",
    image: "/assets/our-achievement.jpg",
    caption: "15 Countries",
  },
  {
    id:3,
    title: "100M USD+ Projects completed/under construction in Africa",
    image: "/assets/our-achievement.jpg",
    caption: "Africa · Completed & Ongoing",
  },
  {
    id:4,
    title: "400M USD+ Projects under development in Africa",
    image: "/assets/our-achievement.jpg",
    caption: "Africa · Development Pipeline",
  },
  {
    id:5,
    title: "Employment opportunities to 1000+ workmen in Africa on projects.",
    image: "/assets/our-achievement.jpg",
    caption: "Local Employment",
  },
];

const AUTOPLAY_DELAY_MS = 5000;

const Achievements = () => {
  // Stable plugin instance so Embla doesn't re-init on every render.
  const autoplay = useRef(
    Autoplay({ delay: AUTOPLAY_DELAY_MS, stopOnInteraction: false })
  );

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    autoplay.current,
  ]);

  const resetAutoplay = useCallback(() => {
    const plugin = emblaApi?.plugins()?.autoplay;
    if (!plugin) return;
    plugin.reset();
  }, [emblaApi]);

  const scrollPrev = useCallback(() => {
    emblaApi?.scrollPrev();
    resetAutoplay();
  }, [emblaApi, resetAutoplay]);

  const scrollNext = useCallback(() => {
    emblaApi?.scrollNext();
    resetAutoplay();
  }, [emblaApi, resetAutoplay]);

  return (
    <section className="achievements">
      <div className="achievements__container">
        <h3 className="section-title text-center text-[#062516]">
          What Sets Us Apart
        </h3>

        <div className="achievements__grid">
          <div className="achievements__media">
            <div className="achievements__image">
              <Image
                src="/assets/our-achievement.jpg"
                alt="Our Achievements"
                width={900}
                height={600}
                className="w-full h-full object-cover rounded-2xl"
                priority
              />
            </div>
          </div>

          <div className="achievements__content">
            <div className="achievements__embla" ref={emblaRef}>
              <div className="achievements__embla-container">
                {slides.map((slide, index) => (
                  <div
                    className={`achievements__embla-slide ${
                      index % 2 === 0
                        ? "achievements__embla-slide--pistachio"
                        : "achievements__embla-slide--white"
                    }`}
                    key={slide.id}
                  >
                    <div className="achievements__copy">
                      <p className="text-lg sm:text-2xl text-[#062516] text-bold">
                        {slide.title}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="achievements__nav">
              <button
                type="button"
                className="achievements__nav-btn"
                aria-label="Previous achievement"
                onClick={scrollPrev}
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M15 6l-6 6 6 6"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              <button
                type="button"
                className="achievements__nav-btn"
                aria-label="Next achievement"
                onClick={scrollNext}
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9 6l6 6-6 6"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Achievements;
