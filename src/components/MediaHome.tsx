"use client";
import React from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { mediaCards } from "./MediaLinksForHome";

export default function MediaHome() {
  const [emblaRef] = useEmblaCarousel(
    {
      loop: true,
      align: "start",
      slidesToScroll: 1,
      breakpoints: {
        "(min-width: 768px)": { slidesToScroll: 1 },
      },
    },
    [
      Autoplay({
        delay: 4500,
        stopOnInteraction: false,
        playOnInit: true,
      }),
    ]
  );

  return (
    <section className="relative overflow-hidden bg-[#f6faf5] py-16">
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <div className="absolute left-0 top-1/2 w-72 h-72 rounded-full bg-[#d6efd7] blur-3xl"></div>
        <div className="absolute right-0 bottom-0 w-96 h-96 rounded-full bg-[#a5d89f] blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h3 className="section-title text-center text-[#062516]">
            Latest JIVO Energy News
          </h3>
        </div>

        <div className="embla overflow-hidden rounded-3xl bg-white shadow-[0_20px_80px_rgba(6,37,22,0.12)]" ref={emblaRef}>
          <div className="embla__container flex gap-6 p-6 md:p-8">
            {mediaCards.map((card) => (
              <div
                key={card.id}
                className="embla__slide min-w-0 shrink-0 basis-full md:basis-[calc(50%-0.75rem)] xl:basis-[calc(33.333%-1rem)]"
              >
                <a
                  href={card.link}
                  target="_blank"
                  rel="noreferrer"
                  className="group block h-full overflow-hidden rounded-3xl border border-white bg-white shadow-sm"
                >
                  <div className="relative h-72 overflow-hidden bg-[#e9f4e4]">
                    <Image
                      src={card.image}
                      alt={card.title}
                      fill
                      className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                  <div className="p-6">
                    <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#62a557] mb-4">
                      {card.category}
                    </p>
                    <h3 className="text-xl font-semibold leading-tight text-[#062516] md:text-2xl">
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
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
