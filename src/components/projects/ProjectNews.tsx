'use client';

import React, { useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import newsData from '@/data/news.json';

type NewsItem = {
    id: number;
    title: string;
    description: string;
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

    return (
        <section className="bg-pistachio-green">
            <div className="max-w-7xl mx-auto px-4 py-16">
                <div className="mb-12">
                    <h3 className="section-title-spl text-center text-[#062516]">Project Related News</h3>
                </div>
                <div className="project-news">
                    {items.map((item) => (
                        <article key={item.id} className="project-news__card">
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
                                <h4 className="project-news__title">{item.title}</h4>
                                <p className="project-news__description">{item.description}</p>
                                <Link href="/media" className="project-news__link">
                                    Read more
                                    <span aria-hidden="true">→</span>
                                </Link>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ProjectNews;
