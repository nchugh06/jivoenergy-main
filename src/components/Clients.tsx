"use client";

import React, { useMemo } from "react";
import Image from "next/image";

export default function Clients() {
  const clientsList = useMemo(
    () => [
      "client1.webp", "client2.webp", "client3.webp", "client4.webp",
      "client5.webp", "client6.webp", "client7.webp", "client8.webp",
      "client9.webp", "client10.webp", "client11.webp", "client12.webp",
      "client13.webp",
    ],
    []
  );

  // duplicate so the loop is seamless
  const looped = [...clientsList, ...clientsList];

  return (
    <section className="bg-[#fefefe] py-16 w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h3 className="section-title text-center text-[#062516]">Our Clients</h3>

        <div className="mt-10 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]">
          <div className="flex items-center gap-6 w-max animate-marquee">
            {looped.map((img, i) => (
              <div
                key={`${img}-${i}`}
                className="relative w-24 h-24 md:w-28 md:h-28 p-5 bg-white rounded-xl shadow-sm border border-gray-100 flex items-center justify-center shrink-0"
              >
                <Image
                  src={`/partners/${img}`}
                  alt={`Client ${(i % clientsList.length) + 1}`}
                  fill
                  className="object-contain p-2"
                  quality={80}
                  sizes="112px"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}