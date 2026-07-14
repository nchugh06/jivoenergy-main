'use client';

import React from 'react';
import Image from 'next/image';

const MapImage = () => {
    return (
        <section id="map-section" className="relative w-full overflow-hidden bg-[#d2e4d6]">
            <div className="text-center py-8 pb-8 bg-[#d2e4d6]">
                <h3 className="section-title-spl text-center text-[#062516]">
                    JIVO Energy in Africa
                </h3>
            </div>
            <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
                <div className="relative w-full overflow-hidden rounded-2xl min-h-[420px] sm:min-h-[520px] lg:min-h-[620px]">
                    <Image
                        src="/assets/africa-map.jpg"
                        alt="projects of JIVO ENERGY in Africa"
                        width={1600}
                        height={900}
                        priority
                        quality={100}
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 1200px"
                        className="h-auto w-full object-contain"
                    />
                </div>
            </div>
        </section>
    );
};

export default MapImage;