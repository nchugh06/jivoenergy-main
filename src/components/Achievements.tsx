"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import "./Achievements.css";

type Slide = {
  title: string;
  image: string;
  caption?: string;
};

const slides: Slide[] = [
  {
    title:
      "Successfully executed Hybrid Solar Power PV & Storage projects with varied technologies.",
    image: "/assets/our-achievement.jpg",
    caption: "Hybrid PV & Storage",
  },
  {
    title:
      "Rapid expansion from single country business in 2018 to presence in 15 countries now.",
    image: "/assets/our-achievement.jpg",
    caption: "15 Countries",
  },
  {
    title: "100M USD+ Projects completed/under construction in Africa",
    image: "/assets/our-achievement.jpg",
    caption: "Africa · Completed & Ongoing",
  },
  {
    title: "400M USD+ Projects under development in Africa",
    image: "/assets/our-achievement.jpg",
    caption: "Africa · Development Pipeline",
  },
  {
    title: "Employment opportunities to 1000+ workmen in Africa on projects.",
    image: "/assets/our-achievement.jpg",
    caption: "Local Employment",
  },
];

/** Keep in sync with the rule-fill animation duration. */
const AUTOPLAY_DELAY_MS = 5000;

const pad = (n: number) => String(n).padStart(2, "0");

const Achievements = () => {
  // Stable plugin instance so Embla doesn't re-init on every render.
  const autoplay = useRef(
    Autoplay({ delay: AUTOPLAY_DELAY_MS, stopOnInteraction: false })
  );

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    autoplay.current,
  ]);
  const [activeIndex, setActiveIndex] = useState(0);

  const total = slides.length;

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setActiveIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  // Restart autoplay timer after manual nav so the fill stays in sync.
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
          {/* Static image — not part of the carousel */}
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

          {/* Counter stays fixed above the slider; only the copy scrolls */}
          <div className="achievements__content">
            <div className="achievements__counter" aria-hidden="true">
              <span className="achievements__counter-current">
                {pad(activeIndex + 1)}
              </span>
              <span className="achievements__counter-rule">
                {/* Remount on slide change so the fill restarts from 0 */}
                <span
                  key={activeIndex}
                  className="achievements__counter-rule-fill"
                  style={{
                    animationDuration: `${AUTOPLAY_DELAY_MS}ms`,
                  }}
                />
              </span>
              <span className="achievements__counter-total">{pad(total)}</span>
            </div>

            <div className="achievements__embla" ref={emblaRef}>
              <div className="achievements__embla-container">
                {slides.map((slide) => (
                  <div className="achievements__embla-slide" key={slide.title}>
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
