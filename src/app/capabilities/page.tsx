"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";

export default function Capabilities() {
  const capabilityBlocks = [
    {
      title: "Originate",
      eyebrow: "1",
      intro:
        "Identify and secure high-potential renewable energy opportunities across Africa and emerging markets.",
      points: [
        "Leverage our extensive industry, government, and stakeholder network to source opportunities",
        "Identify strategic locations for utility-scale and commercial renewable energy projects",
        "Conduct resource assessment, site screening, and feasibility studies",
        "Establish strong partnerships with local communities, landowners, and authorities",
      ],
      image: "/capabilities/originate.jpg",
    },
    {
      title: "Develop",
      eyebrow: "2",
      intro:
        "From concept to Ready-to-Build status by delivering all technical, regulatory, environmental, and commercial development milestones.",
      points: [
        "Secure permits, licenses, and regulatory approvals",
        "Manage environmental and social impact assessments",
        "Obtain grid connection and interconnection approvals",
        "Develop projects through to Ready-to-Build status",
      ],
      image: "/capabilities/develop.jpg",
    },
    {
      title: "Finance",
      eyebrow: "3",
      intro:
        "Structure sustainable financing solutions to accelerate project implementation.",
      points: [
        "Engage development finance institutions, lenders, and strategic investors",
        "Structure debt and equity financing solutions",
        "Support Power Purchase Agreements (PPAs) and commercial negotiations",
        "Optimize project economics and risk allocation",
      ],
      image: "/capabilities/finance.jpg",
    },
    {
      title: "Engineering",
      eyebrow: "4",
      intro:
        "Design efficient, reliable, and future-ready energy infrastructure.",
      points: [
        "Detailed engineering and technical design",
        "Technology selection and optimization",
        "Solar PV, BESS, and hybrid system design",
        "Compliance with international technical and safety standards",
      ],
      image: "/capabilities/engineering.jpg",
    },
    {
      title: "Procure",
      eyebrow: "5",
      intro:
        "Deliver quality equipment and services through strategic sourcing.",
      points: [
        "Global supplier and OEM engagement",
        "Competitive procurement and contract management",
        "Quality assurance and supply chain optimization",
        "Cost-effective sourcing of critical project components",
      ],
      image: "/capabilities/procure.jpg",
    },
    {
      title: "Construct",
      eyebrow: "6",
      intro:
        "Execute projects safely, efficiently, and on schedule.",
      points: [
        "EPC management and construction supervision",
        "Health, Safety, Environment & Quality (HSEQ) compliance",
        "Project scheduling and performance management",
        "Testing, commissioning, and commercial operation support",
      ],
      image: "/capabilities/construct.jpg",
    },
    {
      title: "Operate",
      eyebrow: "7",
      intro:
        "Maximize asset performance throughout the project lifecycle.",
      points: [
        "Operations and maintenance management",
        "Performance monitoring and reporting",
        "Preventive and corrective maintenance",
        "Asset optimization and lifecycle management",
      ],
      image: "/capabilities/operate.jpg",
    },
  ];

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      <section className="relative h-[42vh] w-full overflow-hidden">
        <Image
          src="/assets/banners/Capabilities.jpg"
          alt="Capabilities Banner"
          fill
          className="object-cover"
          priority
        />
        {/* <div className="absolute inset-0 bg-gradient-to-r from-[#062516]/85 via-[#062516]/55 to-[#085D36]/35" />
        <div className="relative z-10 flex h-full items-end">
          <div className="container mx-auto px-4 pb-12 md:pb-16">
            <div className="max-w-3xl rounded-[2rem] border border-white/20 bg-white/10 p-6 backdrop-blur-sm md:p-8">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#dff4e6]">
                Jivo Energy capabilities
              </p>
              <h1 className="mt-4 text-3xl font-semibold text-white sm:text-4xl md:text-5xl">
                Tailored energy solutions across the full project lifecycle.
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-7 text-[#f4f8f5] md:text-lg">
                We combine development expertise, engineering depth, project delivery strength, and long-term operations support to create resilient energy assets across complex markets.
              </p>
            </div>
          </div>
        </div> */}
      </section>

      {/* <section className="bg-[#f4f8f5] py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
            <div className="max-w-2xl">
              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-[#085D36]">
                Built for impact
              </p>
              <h2 className="text-3xl font-semibold text-[#062516] sm:text-4xl">
                A disciplined journey from opportunity to long-term performance.
              </h2>
              <p className="mt-5 text-lg leading-8 text-gray-700">
                Our capabilities span strategic development, engineering, financing, execution, and ongoing operations, allowing us to support projects through every phase with consistency and focus.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-[1.5rem] border border-[#dce9df] bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md">
                <p className="text-3xl font-semibold text-[#062516]">20+</p>
                <p className="mt-2 text-sm leading-6 text-gray-700">Markets and implementation environments supported</p>
              </div>
              <div className="rounded-[1.5rem] border border-[#dce9df] bg-[#eaf6ed] p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md">
                <p className="text-3xl font-semibold text-[#062516]">100%</p>
                <p className="mt-2 text-sm leading-6 text-gray-700">Focus on reliable, scalable, future-ready infrastructure</p>
              </div>
            </div>
          </div>
        </div>
      </section> */}

      <section className="bg-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <h3 className="section-title text-center text-[#062516] mb-10">Our Capabilities</h3>
          <div className="mb-10 flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              
              {/* <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#085D36]">
                Our capability journey
              </p> */}
              {/* <h3 className="section-title-spl text-center text-[#062516] mb-10">Capabilities</h3> */}
              {/* <h2 className="mt-2 text-3xl font-semibold text-[#062516] sm:text-4xl">
                A service-style view of how we create value.
              </h2> */}
            </div>
            <div className="h-px w-full max-w-[220px] bg-[#dce9df] lg:block" />
          </div>

          <div className="space-y-6">
  {capabilityBlocks.map((item, index) => (
    <article
      key={item.title}
      className="group grid overflow-hidden rounded-[2rem] border border-[#dce9df] bg-white shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-xl md:grid-cols-2"
    >
      {/* Content */}
      <div
        className={`flex flex-col justify-center p-8 md:p-10 ${
          index % 2 === 0 ? "md:order-1" : "md:order-2"
        }`}
      >
        <p className="text-lg font-semibold uppercase tracking-[0.3em] text-[#ffffff] bg-[#1c4832] px-4 py-2 w-fit rounded-[2rem]">
          {item.eyebrow}
        </p>

        <h3 className="mt-3 text-2xl font-semibold text-[#062516]">
          {item.title}
        </h3>

        <p className="mt-4 text-base leading-7 text-gray-700">
          {item.intro}
        </p>

        <ul className="mt-6 space-y-3 text-sm leading-6 text-gray-700">
          {item.points.map((point) => (
            <li key={point} className="flex items-start gap-2">
              <span className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full bg-[#085D36]" />
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Image */}
      <div
        className={`relative h-[420px] overflow-hidden ${
          index % 2 === 0 ? "md:order-2" : "md:order-1"
        }`}
      >
        <Image
          src={item.image}
          alt={item.title}
          fill
          className="object-cover transition duration-700 group-hover:scale-105"
        />
      </div>
    </article>
  ))}
</div>
        </div>
      </section>

      <section className="bg-[#f4f8f5] py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="rounded-[2rem] border border-[#dce9df] bg-white p-8 shadow-sm transition duration-300 hover:shadow-md md:p-12">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-2xl">
                <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-[#085D36]">
                  Our strength
                </p>
                <h2 className="text-3xl font-semibold text-[#062516]">
                  A multidisciplinary team delivering energy infrastructure with precision and purpose.
                </h2>
              </div>
              <a
                href="/contact"
                className="inline-flex items-center justify-center rounded-full bg-[#085D36] px-6 py-3 text-sm font-semibold text-white transition duration-300 hover:bg-[#062516]"
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