"use client";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "./MediaHome.css";
import { mediaCards } from "./MediaLinksForHome";

export default function MediaHome() {

  return (
    <section className="media-home-section">
      <div className="media-home-glow-left"></div>
      <div className="media-home-glow-right"></div>

      <div className="media-home-shell">
        <div className="media-home-title">
          <h3 className="section-title">Latest JIVO Energy News</h3>
        </div>

          <Swiper
            modules={[Navigation, Autoplay]}
            navigation={{
              prevEl: ".media-home-prev",
              nextEl: ".media-home-next",
            }}
            // autoplay={{
            //   delay: 5000,
            //   disableOnInteraction: false,
            // }}
            loop={true}
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
                  href={card.link}
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
                    <h3 className="media-home-card-title min-h-[80px]">
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