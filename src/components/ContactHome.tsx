"use client";

import Image from "next/image";
import Link from "next/link";

export default function ContactHome() {
  return (
    <section className="w-full bg-[#2d4a2d] py-16">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-10 px-4 sm:px-6 lg:flex-row lg:items-center">
        <div className="max-w-2xl text-center lg:text-left">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[#b7d8af]">
            Get in touch
          </p>
          <h5 className="mt-4 text-2xl font-semibold leading-tight text-white sm:text-2xl lg:text-3xl">
            If you would like to know more about our business or our solutions, please visit the contact section to find the most appropriate team to get in touch with.
          </h5>
          <div className="mt-10 flex justify-center lg:justify-start">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full bg-white px-8 py-3 text-base font-semibold text-[#2d4a2d] shadow-lg transition duration-300 hover:bg-[#f3f8f0]"
            >
              Contact us
            </Link>
          </div>
        </div>

        <div className="relative w-full max-w-sm shrink-0 rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-2xl shadow-black/10 backdrop-blur-sm">
          <div className="relative h-48 w-full">
            <Image
              src="/logo-original.png"
              alt="JIVO Energy logo"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
