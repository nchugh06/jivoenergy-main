"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { mediaCards } from "./Media";

const visibleCount = 3;
const slideInterval = 5000;

export default function MediaHome() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const timer = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % mediaCards.length);
    }, slideInterval);
    return () => window.clearInterval(timer);
  }, [paused]);

  const prevSlide = () => setActiveIndex((prev) => (prev - 1 + mediaCards.length) % mediaCards.length);
  const nextSlide = () => setActiveIndex((prev) => (prev + 1) % mediaCards.length);

  const displaySlides = Array.from({ length: visibleCount }).map((_, offset) => {
    const index = (activeIndex + offset - 1 + mediaCards.length) % mediaCards.length;
    return mediaCards[index];
  });

  return (
    <section className="relative overflow-hidden bg-[#f6faf5] py-16">
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <div className="absolute left-0 top-1/2 w-72 h-72 rounded-full bg-[#d6efd7] blur-3xl"></div>
        <div className="absolute right-0 bottom-0 w-96 h-96 rounded-full bg-[#a5d89f] blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          {/* <span className="inline-flex items-center px-4 py-2 rounded-full bg-[#062516] text-white text-sm font-semibold tracking-wide">
            Press & Media
          </span> */}
          <h3 className="section-title text-center text-[#062516]">
            Latest Jivo Energy News
          </h3>
          {/* <p className="mt-4 text-base text-[#43594d] max-w-2xl mx-auto">
            Browse our latest press mentions, interviews and coverage from leading media outlets.
          </p> */}
        </div>

        <div
          className="relative overflow-hidden rounded-3xl bg-white shadow-[0_20px_80px_rgba(6,37,22,0.12)]"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3 p-6 md:p-8">
            {displaySlides.map((card, idx) => {
              const isCenter = idx === 1;
              return (
                <a
                  key={card.id}
                  href={card.link}
                  target="_blank"
                  rel="noreferrer"
                  className={`group block overflow-hidden rounded-3xl border transition-all duration-500 ${
                    isCenter ? "border-[#62a557] bg-[#f4fbf2] shadow-lg" : "border-white bg-white"
                  }`}
                >
                  <div className="relative h-72 overflow-hidden bg-[#e9f4e4]">
                    <Image
                      src={card.image}
                      alt={card.title}
                      fill
                      className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 40vw, 33vw"
                    />
                  </div>
                  <div className="p-6">
                    <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#62a557] mb-4">
                      {card.category}
                    </p>
                    <h3 className={`text-xl font-semibold leading-tight text-[#062516] ${isCenter ? "md:text-2xl" : "md:text-xl"}`}>
                      {card.title}
                    </h3>
                    <p className="mt-4 text-sm leading-6 text-[#455c4f] line-clamp-3">
                      {card.description}
                    </p>
                    <span className="inline-flex items-center mt-6 text-sm font-semibold text-[#062516] transition-colors duration-300 group-hover:text-[#3c7d42]">
                      Read article
                      <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </span>
                  </div>
                </a>
              );
            })}
          </div>

          <div className="absolute inset-x-0 bottom-6 flex items-center justify-center gap-4">
            <button
              type="button"
              onClick={prevSlide}
              aria-label="Previous media item"
              className="flex h-12 w-12 items-center justify-center rounded-full border border-[#d9edd5] bg-white text-[#062516] shadow-sm transition hover:bg-[#eef7ed]"
            >
              ‹
            </button>
            <button
              type="button"
              onClick={nextSlide}
              aria-label="Next media item"
              className="flex h-12 w-12 items-center justify-center rounded-full border border-[#d9edd5] bg-white text-[#062516] shadow-sm transition hover:bg-[#eef7ed]"
            >
              ›
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
