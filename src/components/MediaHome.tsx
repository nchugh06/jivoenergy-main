"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "./MediaHome.css";
import { fetchFeaturedMedia } from "./MediaLinksForHome";
import { MediaItem } from "@/types/media";

export default function MediaHome() {
  const [mediaCards, setMediaCards] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    fetchFeaturedMedia()
      .then((items) => {
        if (!cancelled) setMediaCards(items);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section className="media-home-section">
      <div className="media-home-glow-left"></div>
      <div className="media-home-glow-right"></div>

      <div className="media-home-shell">
        <div className="media-home-title">
          <h2 className="section-title section-title-lock">Latest JIVO Energy News</h2>
        </div>

          {loading ? (
            <div className="flex justify-center py-16">
              <div className="w-10 h-10 border-4 border-white/40 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : mediaCards.length === 0 ? (
            <p className="text-center text-white/70 py-16">No featured news yet.</p>
          ) : (
          <Swiper
            modules={[Navigation, Autoplay]}
            navigation={{
              prevEl: ".media-home-prev",
              nextEl: ".media-home-next",
            }}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            loop={mediaCards.length > 1}
            spaceBetween={24}
            slidesPerView={3}
            breakpoints={{
              320: {
                slidesPerView: 1,
                spaceBetween: 16,
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 24,
              },
            }}
            className="media-home-swiper"
          >
            {mediaCards.map((card) => (
              <SwiperSlide key={card.id} className="swiper-slide">
                <a
                  href={card.link || undefined}
                  target="_blank"
                  rel="noreferrer"
                  className="media-home-card"
                >
                  <div className="media-home-card-image">
                    <Image
                      src={card.image}
                      alt={card.title}
                      fill
                      className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 40vw, 33vw"
                    />
                  </div>
                  <div className="media-home-card-content">
                    <p className="media-home-card-category">
                      {card.category}
                    </p>
                    <h3 className="media-home-card-title min-h-[50px]">
                      {card.title}
                    </h3>
                    <p className="media-home-card-description">
                      {card.description}
                    </p>
                    <span className="media-home-card-link">
                      Read article
                      <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </span>
                  </div>
                </a>
              </SwiperSlide>
            ))}
          </Swiper>
          )}

          <div className="media-home-nav">
            <button
              type="button"
              className="media-home-prev"
              aria-label="Previous media item"
            >
              ‹
            </button>
            <button
              type="button"
              className="media-home-next"
              aria-label="Next media item"
            >
              ›
            </button>
          </div>
        </div>
    </section>
  );
}