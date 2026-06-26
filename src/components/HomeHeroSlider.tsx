"use client";

import React, { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

type Slide = {
  id: string;
  imageSrc: string;
  alt: string;
  captionTitle: string;
  captionSubtitle: string;
};

const AUTO_MS = 4500;

export default function HomeHeroSlider() {
  const slides: Slide[] = useMemo(
    () => [
      {
        id: "s1",
        imageSrc: "/assets/videos/1.mp4",
        alt: "JIVO Energy video background 1",
        captionTitle: "Powering Africa's Energy Transition",
        captionSubtitle:
          "Developing and delivering renewable energy infrastructure that drives sustainable growth across Africa",
      },
      // {
      //   id: "s2",
      //   imageSrc: "/assets/videos/2.mp4",
      //   alt: "JIVO Energy video background 2",
      //   captionTitle: "Powering Africa's Energy Transition",
      //   captionSubtitle:
      //     "Developing and delivering renewable energy infrastructure that drives sustainable growth across Africa",
      // },
      {
        id: "s3",
        imageSrc: "/assets/videos/3.mp4",
        alt: "JIVO Energy video background 3",
        captionTitle: "Powering Africa's Energy Transition",
        captionSubtitle:
          "Developing and delivering renewable energy infrastructure that drives sustainable growth across Africa",
      },
    ],
    []
  );

  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const t = window.setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, AUTO_MS);
    return () => window.clearInterval(t);
  }, [paused, slides.length]);

  return (
    <div
      className="relative w-full h-full bg-black"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="absolute inset-0">
        <AnimatePresence initial={false}>
          <motion.div
            key={slides[index].id}
            initial={{ opacity: 0, y: 16, scale: 1.01 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -16, scale: 0.99 }}
            transition={{ duration: 0.7, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <div className="relative w-full h-full">
                <video
                  src={slides[index].imageSrc}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="absolute inset-0 w-full h-full object-cover"
                />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/10" />

              {/* Caption (above video) */}
              <div className="absolute top-1/2 left-0 right-0 z-10 -translate-y-1/2 px-4">
                <div className="mx-auto max-w-4xl rounded-xl bg-black/30 px-4 py-3 backdrop-blur-sm text-center">
                  <p className="text-white text-2xl sm:text-3xl font-semibold leading-tight">
                    {slides[index].captionTitle}
                  </p>
                  <p className="mt-2 text-white/90 text-sm sm:text-base leading-relaxed">
                    {slides[index].captionSubtitle}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Dots */}
      <div className="absolute bottom-6 left-0 right-0 z-10 flex items-center justify-center gap-2">
        {slides.map((s, i) => (
          <button
            key={s.id}
            type="button"
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => setIndex(i)}
            className={
              "h-2.5 w-6 rounded-full transition-colors border border-white/20 " +
              (i === index
                ? "bg-white/90"
                : "bg-white/10 hover:bg-white/30")
            }
          />
        ))}
      </div>
    </div>
  );
}

