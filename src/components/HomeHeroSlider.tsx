"use client";

import React, { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

type Slide = {
  id: string;
  imageSrc: string;
  alt: string;
};

const AUTO_MS = 4500;

export default function HomeHeroSlider() {
  const slides: Slide[] = useMemo(
    () => [
      { id: "s1", imageSrc: "/assets/videos/1.mp4", alt: "JIVO Energy video background 1" },
      { id: "s2", imageSrc: "/assets/videos/2.mp4", alt: "JIVO Energy video background 2" },
      { id: "s3", imageSrc: "/assets/videos/3.mp4", alt: "JIVO Energy video background 3" },
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

