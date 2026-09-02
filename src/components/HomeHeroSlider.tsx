"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

type Slide = {
  id: string;
  imageSrc: string;
  fallbackSrc?: string;
  alt: string;
  captionTitle: string;
  captionSubtitle: string;
};

const AUTO_MS = 4500;
const FALLBACK_VIDEO = "/assets/videos/aboutus.mp4";

export default function HomeHeroSlider() {
  const slides: Slide[] = useMemo(
    () => [
      {
        id: "s1",
        imageSrc: "/assets/videos/1.mp4",
        fallbackSrc: FALLBACK_VIDEO,
        alt: "JIVO Energy video background 1",
        captionTitle: "Powering Africa's Energy Transition",
        captionSubtitle:
          "Developing and delivering renewable energy infrastructure that drives sustainable growth across Africa",
      },
      {
        id: "s3",
        imageSrc: "/assets/videos/2.mp4",
        fallbackSrc: FALLBACK_VIDEO,
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
  const [activeVideoSrc, setActiveVideoSrc] = useState(slides[0]?.imageSrc ?? FALLBACK_VIDEO);
  const [videoReady, setVideoReady] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (paused) return;
    const t = window.setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, AUTO_MS);
    return () => window.clearInterval(t);
  }, [paused, slides.length]);

  useEffect(() => {
    setActiveVideoSrc(slides[index].imageSrc);
    setVideoReady(false);
  }, [index, slides]);

  const handleVideoError = () => {
    if (activeVideoSrc !== slides[index].fallbackSrc) {
      setActiveVideoSrc(slides[index].fallbackSrc ?? FALLBACK_VIDEO);
    }
  };

  useEffect(() => {
    // Try to play the video programmatically once it becomes ready.
    if (videoReady && videoRef.current) {
      try {
        const p = videoRef.current.play();
        if (p && typeof p.catch === "function") p.catch(() => { });
      } catch (e) {
        // ignore playback errors (browsers may still block autoplay)
      }
    }
  }, [videoReady, activeVideoSrc]);

  return (
    <div
      className="relative w-full h-full"
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
                ref={videoRef}
                key={activeVideoSrc}
                src={activeVideoSrc}
                autoPlay={true}
                muted={true}
                loop={true}
                playsInline={true}
                preload="metadata"
                // poster="/assets/videos/poster.jpg"
                onCanPlay={() => setVideoReady(true)}
                onError={handleVideoError}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${videoReady ? "opacity-100" : "opacity-80"}`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-black/15" />

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="absolute top-1/2 left-0 right-0 z-10 -translate-y-1/2 px-4"
              >
                <div className="mx-auto max-w-4xl px-4 text-center">
                  <motion.h1
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
                    className="text-3xl font-bold leading-tight text-green sm:text-4xl"
                  >
                    {slides[index].captionTitle}
                  </motion.h1>
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.25, ease: "easeOut" }}
                    className="mt-2 text-center text-sm leading-relaxed text-white sm:text-xl" style={{ textAlign: "center" }}
                  >
                    {slides[index].captionSubtitle}
                  </motion.p>
                </div>
              </motion.div>
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

