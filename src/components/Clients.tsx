"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Partner } from "@/types/partner";

export default function Clients() {
  const [clientsList, setClientsList] = useState<Partner[]>([]);

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      try {
        const res = await fetch("/api/partners?section=clients", { cache: "no-store" });
        if (!res.ok) throw new Error("Failed to load clients");
        const data = await res.json();
        if (!cancelled) setClientsList(data.items || []);
      } catch (error) {
        console.error("Error loading clients:", error);
        if (!cancelled) setClientsList([]);
      }
    };
    load();
    return () => {
      cancelled = true;
    };
  }, []);

  if (!clientsList.length) return null;

  const looped = [...clientsList, ...clientsList];

  return (
    <section className="bg-[#fefefe] py-10 md:py-16 w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="section-title section-title-lock text-center text-[#062516]">Our Clients</h2>

        <div className="mt-6 md:mt-10 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]">
          <div className="flex items-center gap-6 w-max animate-marquee">
            {looped.map((client, i) => (
              <div
                key={`${client.id}-${i}`}
                className="relative w-24 h-24 md:w-28 md:h-28 p-5 bg-white rounded-xl shadow-sm border border-gray-100 flex items-center justify-center shrink-0"
              >
                <Image
                  src={client.image}
                  alt={client.name || `Client ${(i % clientsList.length) + 1}`}
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
