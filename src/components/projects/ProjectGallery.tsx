'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import type { Swiper as SwiperInstance } from 'swiper';
import PhotoSwipeLightbox from 'photoswipe/lightbox';
import 'swiper/css';
import 'photoswipe/style.css';

type GalleryItem = {
    url: string;
    width: number;
    height: number;
};

const DEFAULT_SIZE = { width: 1600, height: 1200 };
const MIN_LOOP_SLIDES = 6;

const loadImageSize = (url: string): Promise<GalleryItem> =>
    new Promise((resolve) => {
        const img = new window.Image();
        img.onload = () =>
            resolve({
                url,
                width: img.naturalWidth || DEFAULT_SIZE.width,
                height: img.naturalHeight || DEFAULT_SIZE.height,
            });
        img.onerror = () => resolve({ url, ...DEFAULT_SIZE });
        img.src = url;
    });

interface ProjectGalleryProps {
    urls: string[];
    title: string;
}

const ProjectGallery = ({ urls, title }: ProjectGalleryProps) => {
    const [items, setItems] = useState<GalleryItem[]>(
        urls.map((url) => ({ url, ...DEFAULT_SIZE }))
    );
    const lightboxRef = useRef<PhotoSwipeLightbox | null>(null);
    const swiperRef = useRef<SwiperInstance | null>(null);

    useEffect(() => {
        let cancelled = false;

        Promise.all(urls.map(loadImageSize)).then((loaded) => {
            if (!cancelled) setItems(loaded);
        });

        return () => {
            cancelled = true;
        };
    }, [urls]);

    useEffect(() => {
        const lightbox = new PhotoSwipeLightbox({
            pswpModule: () => import('photoswipe'),
            dataSource: items.map((item, index) => ({
                src: item.url,
                width: item.width,
                height: item.height,
                alt: `${title} Gallery ${index + 1}`,
            })),
            padding: { top: 24, bottom: 40, left: 16, right: 16 },
        });

        lightbox.on('close', () => {
            swiperRef.current?.autoplay?.start();
        });

        lightbox.init();
        lightboxRef.current = lightbox;

        return () => {
            lightbox.destroy();
            lightboxRef.current = null;
        };
    }, [items, title]);

    const canLoop = items.length > 1;
    const slides =
        canLoop && items.length < MIN_LOOP_SLIDES
            ? Array.from(
                  { length: Math.ceil(MIN_LOOP_SLIDES / items.length) },
                  () => items
              ).flat()
            : items;

    const openLightbox = (index: number) => {
        if (!items.length) return;
        swiperRef.current?.autoplay?.stop();
        lightboxRef.current?.loadAndOpen(index % items.length);
    };

    return (
        <div className="relative px-2">
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
                onSwiper={(swiper) => {
                    swiperRef.current = swiper;
                }}
            >
                {slides.map((item, index) => (
                    <SwiperSlide key={`${item.url}-${index}`}>
                        <div className="relative h-72 rounded-3xl overflow-hidden shadow-lg border-4 border-white">
                            <a
                                href={item.url}
                                target="_blank"
                                rel="noreferrer"
                                className="absolute inset-0 cursor-zoom-in"
                                onClick={(e) => {
                                    e.preventDefault();
                                    openLightbox(index);
                                }}
                            >
                                <Image
                                    src={item.url}
                                    alt={`${title} Gallery ${(index % items.length) + 1}`}
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                />
                            </a>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default ProjectGallery;
