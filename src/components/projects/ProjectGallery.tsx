'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import PhotoSwipeLightbox from 'photoswipe/lightbox';
import 'photoswipe/style.css';

type GalleryItem = {
    url: string;
    width: number;
    height: number;
};

const DEFAULT_SIZE = { width: 1600, height: 1200 };

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
            gallery: '#project-visual-progress',
            children: 'a',
            pswpModule: () => import('photoswipe'),
            padding: { top: 24, bottom: 40, left: 16, right: 16 },
        });

        lightbox.init();

        return () => {
            lightbox.destroy();
        };
    }, [items]);

    return (
        <div
            id="project-visual-progress"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
            {items.map((item, index) => (
                <motion.div
                    key={`${item.url}-${index}`}
                    whileHover={{ scale: 1.02, rotate: index % 2 === 0 ? 1 : -1 }}
                    className="relative h-72 rounded-3xl overflow-hidden shadow-lg border-4 border-white"
                >
                    <a
                        href={item.url}
                        data-pswp-width={item.width}
                        data-pswp-height={item.height}
                        data-cropped="true"
                        target="_blank"
                        rel="noreferrer"
                        className="absolute inset-0 cursor-zoom-in"
                    >
                        <Image
                            src={item.url}
                            alt={`${title} Gallery ${index + 1}`}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                    </a>
                </motion.div>
            ))}
        </div>
    );
};

export default ProjectGallery;
