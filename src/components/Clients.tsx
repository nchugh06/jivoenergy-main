"use client";
import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";

const AUTO_MS = 3000;

export default function Clients() {
  const clientsList = useMemo(
    () => [
      "client1.jpg",
      "client2.jpg",
      "client3.jpg",
      "client4.jpg",
      "client5.jpg",
      "client6.jpg",
      "client7.jpg",
      "client8.jpg",
      "client9.jpg",
      "client10.jpg",
      "client11.jpg",
      "client12.jpg",
      "client13.jpg",
    ],
    []
  );

  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const t = window.setInterval(() => {
      setIndex((i) => (i + 1) % clientsList.length);
    }, AUTO_MS);
    return () => window.clearInterval(t);
  }, [paused, clientsList.length]);

  const prev = () => setIndex((i) => (i - 1 + clientsList.length) % clientsList.length);
  const next = () => setIndex((i) => (i + 1) % clientsList.length);

  // active logo is centered; show neighbors for a carousel feel
  const visibleCount = 5; // active + 2 neighbors each side
  const half = Math.floor(visibleCount / 2);

  const visible = Array.from({ length: visibleCount }).map((_, offset) => {
    const i = (index + offset - half + clientsList.length) % clientsList.length;
    return { img: clientsList[i], absoluteIndex: i };
  });

  return (
    <section className="bg-[#fefefe] py-16 w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="section-title text-center text-[#062516]">Clients</h2>

        <div className="mt-10" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
          <div className="relative">
            <button
              type="button"
              aria-label="Previous clients"
              onClick={prev}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 h-10 w-10 rounded-full bg-white/80 hover:bg-white border border-[#2d4a2d]/20 shadow-sm text-[#2d4a2d] flex items-center justify-center"
            >
              ‹
            </button>

            <button
              type="button"
              aria-label="Next clients"
              onClick={next}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 h-10 w-10 rounded-full bg-white/80 hover:bg-white border border-[#2d4a2d]/20 shadow-sm text-[#2d4a2d] flex items-center justify-center"
            >
              ›
            </button>

            <div className="flex items-center justify-center gap-6">
              {visible.map(({ img, absoluteIndex }) => {
                const active = absoluteIndex === index;
                const size = active ? "w-44 h-44" : "w-24 h-24 md:w-28 md:h-28";
                const scale = active ? "scale-105" : "scale-95";
                const opacity = active ? "opacity-100" : "opacity-60";

                return (
                  <div
                    key={`${img}-${absoluteIndex}`}
                    className={`${size} ${scale} ${opacity} transition-all duration-500 ease-out relative p-5 bg-white rounded-xl shadow-sm border border-gray-100 flex items-center justify-center`}
                  >
                    <div
                      className={`absolute inset-0 rounded-xl transition-all duration-500 ${
                        active ? "ring-2 ring-[#2d4a2d] ring-offset-2" : "ring-0"
                      }`}
                    />

                    <Image
                      src={`/partners/${img}`}
                      alt={`Client ${absoluteIndex + 1}`}
                      fill
                      className="object-contain p-2 relative"
                      quality={100}
                      sizes="(max-width: 640px) 160px, (max-width: 1024px) 180px, 200px"
                    />
                  </div>
                );
              })}
            </div>

            <div className="mt-8 flex items-center justify-center gap-3">
              {clientsList.map((img, i) => {
                const active = i === index;
                return (
                  <button
                    key={img}
                    type="button"
                    aria-label={`Go to client ${i + 1}`}
                    onClick={() => setIndex(i)}
                    className={`h-2 w-8 rounded-full transition-colors border border-[#2d4a2d]/20 ${
                      active ? "bg-[#2d4a2d]" : "bg-[#2d4a2d]/10 hover:bg-[#2d4a2d]/20"
                    }`}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


