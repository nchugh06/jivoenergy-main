'use client';

import React, { useMemo } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import newsData from '@/data/news.json';

type NewsItem = {
    id: number;
    title: string;
    description: string;
    image: string;
    country: string;
    slug?: string;
    link?: string;
    open?: 'tab' | 'iframe';
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

function mediaOpenHref(item: NewsItem) {
    return `/media?open=${encodeURIComponent(item.slug || String(item.id))}`;
}

const ProjectNews = ({ country }: ProjectNewsProps) => {
    const router = useRouter();
    const items = useMemo(() => {
        if (!country) return [];
        return (newsData as NewsItem[]).filter((item) =>
            countriesMatch(item.country, country)
        );
    }, [country]);

    const openNews = (item: NewsItem) => {
        if (!item.link) return;
        if (item.open === 'tab') {
            window.open(item.link, '_blank', 'noopener,noreferrer');
            return;
        }
        router.push(mediaOpenHref(item));
    };

    if (!items.length) return null;

    return (
        <section className="bg-pistachio-green">
            <div className="max-w-7xl mx-auto px-4 py-16">
                <div className="mb-12">
                    <h2 className="section-title-spl section-title-lock text-center text-[#062516]">Project Related News</h2>
                </div>
                <div className="project-news">
                    {items.map((item) => (
                        <article
                            key={item.id}
                            className={`project-news__card${item.link ? ' project-news__card--clickable' : ''}`}
                            onClick={() => openNews(item)}
                        >
                            <div className="project-news__image">
                                <Image
                                    src={item.image}
                                    alt={item.title}
                                    fill
                                    className="project-news__img"
                                    sizes="(max-width: 767px) 100vw, 40vw"
                                />
                            </div>
                            <div className="project-news__content">
                                <h3 className="project-news__title">{item.title}</h3>
                                <p className="project-news__description">{item.description}</p>
                                {item.link && (
                                    <button
                                        type="button"
                                        className="project-news__link"
                                        onClick={(event) => {
                                            event.stopPropagation();
                                            openNews(item);
                                        }}
                                    >
                                        Read more
                                        <span aria-hidden="true">→</span>
                                    </button>
                                )}
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ProjectNews;
