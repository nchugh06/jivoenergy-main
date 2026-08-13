'use client';

import React, { useEffect, useMemo, useRef } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import type { Swiper as SwiperInstance } from 'swiper';
import PhotoSwipeLightbox from 'photoswipe/lightbox';
import 'swiper/css';
import 'photoswipe/style.css';
import './ProjectGallery.css';

const ZOOM_WIDTH = 640;
const ZOOM_HEIGHT = 360;
const MIN_LOOP_SLIDES = 6;

interface ProjectGalleryProps {
    urls: string[];
    title: string;
}

const ProjectGallery = ({ urls, title }: ProjectGalleryProps) => {
    const items = useMemo(
        () => urls.filter((url) => typeof url === 'string' && url.trim().length > 0),
        [urls]
    );
    const lightboxRef = useRef<PhotoSwipeLightbox | null>(null);
    const swiperRef = useRef<SwiperInstance | null>(null);

    useEffect(() => {
        const lightbox = new PhotoSwipeLightbox({
            pswpModule: () => import('photoswipe'),
            dataSource: items.map((url, index) => ({
                src: url,
                width: ZOOM_WIDTH,
                height: ZOOM_HEIGHT,
                alt: `${title} Gallery ${index + 1}`,
            })),
            padding: { top: 24, bottom: 40, left: 16, right: 16 },
            initialZoomLevel: 'fit',
            secondaryZoomLevel: 1,
            maxZoomLevel: 1,
        });

        lightbox.on('contentActivate', ({ content }) => {
            const img = content.element?.querySelector('img');
            if (img) {
                img.style.objectFit = 'cover';
            }
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

    if (!items.length) return null;

    return (
        <div className="project-gallery">
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
                {slides.map((url, index) => (
                    <SwiperSlide key={`${url}-${index}`}>
                        <button
                            type="button"
                            className="project-gallery__item"
                            onClick={() => openLightbox(index)}
                            aria-label={`Open ${title} gallery image ${(index % items.length) + 1}`}
                        >
                            <Image
                                src={url}
                                alt={`${title} Gallery ${(index % items.length) + 1}`}
                                fill
                                className="project-gallery__image"
                                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            />
                        </button>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default ProjectGallery;
