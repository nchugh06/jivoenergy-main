"use client";

import React, { useMemo } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import AutoScroll from "embla-carousel-auto-scroll";

export default function Clients() {
  const clientsList = useMemo(
    () => [
      "client1.jpg",
      "client2.jpg",
      "client3.jpg",
      "client4.jpg",
      "client5.jpg",
      "client6.jpg",
      "client7.jpg",
      "client8.jpg",
      "client9.jpg",
      "client10.jpg",
      "client11.jpg",
      "client12.jpg",
      "client13.jpg",
    ],
    []
  );

  const [emblaRef] = useEmblaCarousel(
    {
      loop: true,
      align: "center",
      slidesToScroll: 1,
      dragFree: false,
    },
    [
      AutoScroll({
        speed: 1.1,
        stopOnInteraction: false,
        playOnInit: true,
      }),
    ]
  );

  return (
    <section className="bg-[#fefefe] py-16 w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h3 className="section-title text-center text-[#062516]">Our Clients</h3>

        <div className="mt-10">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex items-center gap-6">
              {clientsList.map((img, absoluteIndex) => (
                <div
                  key={img}
                  className="relative w-24 h-24 md:w-28 md:h-28 p-5 bg-white rounded-xl shadow-sm border border-gray-100 flex items-center justify-center shrink-0"
                >
                  <Image
                    src={`/partners/${img}`}
                    alt={`Client ${absoluteIndex + 1}`}
                    fill
                    className="object-contain p-2 relative"
                    quality={100}
                    sizes="(max-width: 640px) 160px, (max-width: 1024px) 180px, 200px"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


