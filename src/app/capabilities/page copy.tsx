"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";

export default function Capabilities() {
  const galleryImages = [
    "/esg/1766384012371.jpg",
    "/esg/1766384012520.jpg",
    "/esg/1766384012528.jpg",
    "/esg/1766384012546.jpg",
    "/esg/1766384012549.jpg",

    "/esg/IMG_0478.jpg",
  ];

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      <section className="relative h-[40vh] w-full flex items-center justify-center overflow-hidden">
        <Image
          src="/assets/banners/Capabilities.jpg"
          alt="Capabilities Banner"
          fill
          className="object-cover"
          priority
        />
        {/* <div className="absolute inset-0 bg-gradient-to-br from-[#085D36]/25 to-[#04301C]/25"></div>
        <div className="relative z-10 container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            Our Capabilities
          </h1>
           <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Creating lasting value through environmental stewardship, social responsibility, and strong governance.
          </p> 
        </div> */}
      </section>

      <section className="bg-[#f4f8f5] py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div className="max-w-2xl">
              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-[#085D36]">
                Jivo Energy capabilities
              </p>
              <h3 className="text-3xl md:text-5xl font-semibold text-[#062516] leading-tight">
                Built for every stage of the energy lifecycle.
              </h3>
              <p className="mt-5 text-lg leading-8 text-gray-700">
                We combine development expertise, engineering depth, project delivery strength, and long-term operations support to create resilient energy assets across complex markets. From early opportunity origination to ongoing asset performance, our capabilities are designed to move projects from concept to dependable execution.
              </p>
            </div>

            <div className="rounded-[2rem] border border-[#dce9df] bg-white p-8 shadow-sm">
              <div className="flex items-center gap-3">
                <span className="rounded-full bg-[#085D36] px-3 py-1 text-sm font-semibold text-white">
                  End-to-end delivery
                </span>
                <span className="text-sm font-medium text-gray-600">
                  Renewable, power, and sustainability infrastructure
                </span>
              </div>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl bg-[#f2f9f3] p-5">
                  <p className="text-3xl font-semibold text-[#062516]">20+</p>
                  <p className="mt-2 text-sm text-gray-700">Markets and implementation environments supported</p>
                </div>
                <div className="rounded-2xl bg-[#e9f5eb] p-5">
                  <p className="text-3xl font-semibold text-[#062516]">100%</p>
                  <p className="mt-2 text-sm text-gray-700">Focus on reliable, scalable, future-ready infrastructure</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="mb-10 max-w-3xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-[#085D36]">
              Our capability journey
            </p>
            <h3 className="text-3xl md:text-4xl font-semibold text-[#062516]">
              A disciplined approach across the full project lifecycle.
            </h3>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            {[
              {
                id: '01',
                title: 'Originate',
                description:
                  'Identify and secure high-potential renewable energy opportunities across Africa and emerging markets.',
                points: [
                  'Leverage our extensive industry, government, and stakeholder network to source opportunities',
                  'Identify strategic locations for utility-scale and commercial renewable energy projects',
                  'Conduct resource assessment, site screening, and feasibility studies',
                  'Establish strong partnerships with local communities, landowners, and authorities',
                ],
              },
              {
                id: '02',
                title: 'Develop',
                description:
                  'From concept to Ready-to-Build status by delivering all technical, regulatory, environmental, and commercial development milestones.',
                points: [
                  'Secure permits, licenses, and regulatory approvals',
                  'Manage environmental and social impact assessments',
                  'Obtain grid connection and interconnection approvals',
                  'Develop projects through to Ready-to-Build status',
                ],
              },
              {
                id: '03',
                title: 'Finance',
                description:
                  'Structure sustainable financing solutions to accelerate project implementation.',
                points: [
                  'Engage development finance institutions, lenders, and strategic investors',
                  'Structure debt and equity financing solutions',
                  'Support Power Purchase Agreements (PPAs) and commercial negotiations',
                  'Optimize project economics and risk allocation',
                ],
              },
              {
                id: '04',
                title: 'Engineering',
                description:
                  'Design efficient, reliable, and future-ready energy infrastructure.',
                points: [
                  'Detailed engineering and technical design',
                  'Grid integration and infrastructure works',
                  'Testing, commissioning, and handover',
                ],
              },
              {
                id: '05',
                title: 'Operate',
                description:
                  'We continue to support asset performance through maintenance, monitoring, reliability planning, and operational optimization.',
                points: [
                  'Operations and maintenance services',
                  'Performance diagnostics and reporting',
                  'Asset reliability and lifecycle support',
                ],
              },
              {
                id: '06',
                title: 'Integrate',
                description:
                  'We connect generation assets, network infrastructure, and digital systems to create reliable, intelligent energy ecosystems.',
                points: [
                  'Grid integration and power evacuation',
                  'Substation and automation support',
                  'Digital control and operational visibility',
                ],
              },
              {
                id: '07',
                title: 'Sustain',
                description:
                  'We embed sustainability and future-ready thinking into every project, from energy efficiency to low-carbon infrastructure design.',
                points: [
                  'Low-carbon and circular economy planning',
                  'Renewable optimization and resilience',
                  'Environmental and social value creation',
                ],
              },
            ].map((item, index) => (
              <article
                key={item.id}
                className={`rounded-[1.75rem] border border-[#dce9df] p-8 shadow-sm ${index % 2 === 0 ? 'bg-[#f7fbf8]' : 'bg-white'}`}
              >
                <div className="flex items-center gap-4">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#085D36] text-lg font-semibold text-white">
                    {item.id}
                  </span>
                  <h4 className="text-2xl font-semibold text-[#062516]">{item.title}</h4>
                </div>
                <p className="mt-5 text-base leading-7 text-gray-700">{item.description}</p>
                <ul className="mt-5 space-y-2 text-sm text-gray-700">
                  {item.points.map((point) => (
                    <li key={point} className="flex items-start gap-2">
                      <span className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-[#085D36]" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#f4f8f5] py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="rounded-[2rem] border border-[#dce9df] bg-white p-8 shadow-sm md:p-12">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-2xl">
                <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-[#085D36]">
                  Our strength
                </p>
                <h3 className="text-3xl font-semibold text-[#062516]">
                  A multidisciplinary team delivering energy infrastructure with precision and purpose.
                </h3>
              </div>
              <a
                href="/contact"
                className="inline-flex items-center justify-center rounded-full bg-[#085D36] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#062516]"
              >
                Contact us
              </a>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}