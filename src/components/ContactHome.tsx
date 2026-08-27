"use client";

import Image from "next/image";
import Link from "next/link";

export default function ContactHome() {
  return (
    <section className="w-full bg-[#2d4a2d] py-16">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-10 px-4 sm:px-6 lg:flex-row lg:items-center">
        <div className="max-w-2xl text-center lg:text-left">
          {/* <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[#b7d8af]">
            Get in touch
          </p> */}
          <h5 className="mt-4 text-2xl font-semibold leading-tight text-white sm:text-2xl lg:text-3xl">
            Get in touch with our experts to discuss your next renewable energy project.
          </h5>
          <div className="mt-10 flex justify-center lg:justify-start">
            <Link
              href="/contact"
              className="inline-flex min-h-11 items-center justify-center bg-[#85c54a] px-6 py-3 text-base font-bold text-[#1c4832] shadow-lg transition duration-300 hover:bg-[#f3f8f0]"
            >
              Contact us
            </Link>
          </div>
        </div>

        <div className="relative w-full max-w-sm shrink-0">
          <div className="relative h-48 w-full">
            <Image
              src="/logo-white.png"
              alt="JIVO Energy" fill             
              className="object-contain"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
