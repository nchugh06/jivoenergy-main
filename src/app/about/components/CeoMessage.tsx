'use client';

import { useEffect, useRef } from 'react';
import './CeoMessage.css';

export default function CeoMessage() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          section.classList.add('is-visible');
          observer.unobserve(section);
        }
      },
      { threshold: 0.25, rootMargin: '0px 0px -40px 0px' }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="ceo-message py-10 md:py-12 bg-[#F5FBF5]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="ceo-message__card grid gap-0 lg:grid-cols-[1.15fr_0.85fr] items-stretch bg-white shadow-xl">
          {/* Portrait — animation origin; frame padding = distance from outer edge */}
          <div className="ceo-message__portrait-frame">
            <div className="ceo-message__portrait relative w-full bg-slate-200">
              <img
                src="/about/Rajesh_Chugh_CEO.png"
                alt="Company leader or executive portrait"
                className="h-full w-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-black/10 via-transparent to-black/10" />
              <div className="ceo-message__glow" aria-hidden="true" />
              <div className="ceo-message__seam" aria-hidden="true" />
            </div>
          </div>

          {/* Message emerges from the portrait */}
          <div className="ceo-message__panel p-8 sm:p-10 lg:p-12 flex flex-col justify-between h-full">
            <span className="ceo-message__quote-mark" aria-hidden="true">
              “
            </span>

            <div className="ceo-message__inner">
              <div className="ceo-message__label inline-flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.18em] text-[#085D36] mb-4">
                <span className="h-0.5 w-10 bg-[#085D36] inline-block" />
                CEO&apos;s Message
              </div>

              <div className="space-y-4">
                <p className="ceo-message__quote text-gray-700 max-w-2xl leading-7 italic">
                  &quot;At JIVO Energy, we believe that access to reliable and sustainable energy is the
                  foundation of economic growth and social progress. Our commitment is to accelerate
                  Africa&apos;s energy transition by delivering innovative, high-quality renewable energy
                  solutions that create lasting value for our partners, communities, and future
                  generations. Together, we are building a cleaner, more sustainable future for
                  Africa.&quot;
                </p>

                <div className="ceo-message__attribution border-l-4 border-transparent pl-6">
                  <p className="mt-5 text-sm text-gray-700 tracking-[0.14em] font-semibold">
                    <b>Rajesh Chugh</b>
                    <br />
                    Chief Executive Officer, JIVO Energy
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
