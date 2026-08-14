'use client';

import React, { useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import newsData from '@/data/news.json';
import 'swiper/css';

const MIN_LOOP_SLIDES = 6;

type NewsItem = {
    id: number;
    title: string;
    image: string;
    country: string;
};

interface ProjectNewsProps {
    country: string;
}

function normalizeCountry(value: string) {
    return value
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
        .replace(/&/g, 'and')
        .replace(/[^a-z0-9]+/g, ' ')
        .trim();
}

function countriesMatch(a: string, b: string) {
    return normalizeCountry(a) === normalizeCountry(b);
}

const ProjectNews = ({ country }: ProjectNewsProps) => {
    const items = useMemo(() => {
        if (!country) return [];
        return (newsData as NewsItem[]).filter((item) =>
            countriesMatch(item.country, country)
        );
    }, [country]);

    if (!items.length) return null;

    const canLoop = items.length > 1;
    const slides =
        canLoop && items.length < MIN_LOOP_SLIDES
            ? Array.from(
                  { length: Math.ceil(MIN_LOOP_SLIDES / items.length) },
                  () => items
              ).flat()
            : items;

    return (
        <section className="bg-pistachio-green">
            <div className="max-w-7xl mx-auto px-4 py-16">
                <div className="mb-12">
                    <h3 className="section-title-spl text-center text-[#062516]">Project Related News</h3>
                </div>
                <div className="project-news">
                    <Swiper
                        modules={[Autoplay]}
                        autoplay={{
                            delay: 3000,
                            disableOnInteraction: false,
                            pauseOnMouseEnter: true,
                        }}
                        loop={canLoop}
                        spaceBetween={24}
                        slidesPerView={1}
                        breakpoints={{
                            640: { slidesPerView: 1, spaceBetween: 16 },
                            768: { slidesPerView: 2, spaceBetween: 20 },
                            1024: { slidesPerView: 3, spaceBetween: 24 },
                        }}
                    >
                        {slides.map((item, index) => (
                            <SwiperSlide key={`${item.id}-${index}`}>
                                <Link href="/media" className="project-news__card">
                                    <div className="project-news__image">
                                        <Image
                                            src={item.image}
                                            alt={item.title}
                                            fill
                                            className="project-news__img"
                                            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                        />
                                    </div>
                                    <div className="project-news__content">
                                        <h4 className="project-news__title">{item.title}</h4>
                                    </div>
                                </Link>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </section>
    );
};

export default ProjectNews;
