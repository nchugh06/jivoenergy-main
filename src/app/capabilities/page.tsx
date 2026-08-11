"use client";

import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const capabilityBlocks = [
  {
    id:1,
    title: "Originate",
    intro:
      "Identify and secure high-potential renewable energy opportunities across Africa and emerging markets.",
    points: [
      "Leverage our extensive industry, government, and stakeholder network to source opportunities",
      "Identify strategic locations for utility-scale and commercial renewable energy projects",
      "Conduct resource assessment, site screening, and feasibility studies",
      "Establish strong partnerships with local communities, landowners, and authorities",
    ],
    image: "/capabilities/originate.jpg",
    sectionId: "originate",
  },
  {
    id:2,
    title: "Develop",
    intro:
      "From concept to Ready-to-Build status by delivering all technical, regulatory, environmental, and commercial development milestones.",
    points: [
      "Secure permits, licenses, and regulatory approvals",
      "Manage environmental and social impact assessments",
      "Obtain grid connection and interconnection approvals",
      "Develop projects through to Ready-to-Build status",
    ],
    image: "/capabilities/develop.jpg",
    sectionId: "develop",
  },
  {
    id:3,
    title: "Finance",
    intro:
      "Structure sustainable financing solutions to accelerate project implementation.",
    points: [
      "Engage development finance institutions, lenders, and strategic investors",
      "Structure debt and equity financing solutions",
      "Support Power Purchase Agreements (PPAs) and commercial negotiations",
      "Optimize project economics and risk allocation",
    ],
    image: "/capabilities/finance.jpg",
    sectionId: "finance",
  },
  {
    id:4,
    title: "Engineering",
    intro:
      "Design efficient, reliable, and future-ready energy infrastructure.",
    points: [
      "Detailed engineering and technical design",
      "Technology selection and optimization",
      "Solar PV, BESS, and hybrid system design",
      "Compliance with international technical and safety standards",
    ],
    image: "/capabilities/engineering.jpg",
    sectionId: "engineering",
  },
  {
    id:5,
    title: "Procure",
    intro:
      "Deliver quality equipment and services through strategic sourcing.",
    points: [
      "Global supplier and OEM engagement",
      "Competitive procurement and contract management",
      "Quality assurance and supply chain optimization",
      "Cost-effective sourcing of critical project components",
    ],
    image: "/capabilities/procure.jpg",
    sectionId: "procure",
  },
  {
    id:6,
    title: "Construct",
    intro:
      "Execute projects safely, efficiently, and on schedule.",
    points: [
      "EPC management and construction supervision",
      "Health, Safety, Environment & Quality (HSEQ) compliance",
      "Project scheduling and performance management",
      "Testing, commissioning, and commercial operation support",
    ],
    image: "/capabilities/construct.jpg",
    sectionId: "construct",
  },
  {
    id:7,
    title: "Operate",
    intro:
      "Maximize asset performance throughout the project lifecycle.",
    points: [
      "Operations and maintenance management",
      "Performance monitoring and reporting",
      "Preventive and corrective maintenance",
      "Asset optimization and lifecycle management",
    ],
    image: "/capabilities/operate.jpg",
    sectionId: "operate",
  },
];

export default function Capabilities() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <section className="relative h-[40vh] w-full flex items-center justify-center overflow-hidden">
        <Image
          src="/assets/banners/Capabilities.jpg"
          alt="Capabilities"
          fill
          className="object-cover"
          priority
        />
      </section>

      {/* Main Content */}
      <div className="py-5">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h3 className="section-title-spl text-center text-[#062516] mb-10">
              Capabilities
            </h3>
            <p>
              <b>JIVO Energy</b> delivers tailored energy solutions across the
              full project lifecycle — from opportunity origination and
              development through financing, engineering, procurement,
              construction, and long-term operations. We combine development
              expertise, engineering depth, project delivery strength, and
              ongoing asset support to create resilient energy infrastructure
              across complex markets.
              <br />
              <br />
              Our multidisciplinary team supports projects through every phase
              with consistency and focus, ensuring technically sound, bankable,
              and future-ready energy assets for utilities, governments,
              industries, and development partners across Africa and emerging
              markets.
            </p>
          </div>
        </div>

        {/* Capability Sections */}
        <div className="space-y-0">
          {capabilityBlocks.map((item, index) => {
            const sectionBg = index % 2 === 0 ? "#f5fbf5" : "#ffffff";

            return (
              <div
                key={item.sectionId}
                id={String(item.id)}
                className="w-full"
                style={{ backgroundColor: sectionBg }}
              >
                <div className="max-w-7xl mx-auto px-4 py-16 lg:py-20">
                  <div
                    className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                      index % 2 === 1 ? "lg:flex-row-reverse" : ""
                    }`}
                  >
                    <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                      <div className="relative h-[400px] rounded-lg overflow-hidden shadow-xl">
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>

                    <div
                      className={`space-y-6 ${
                        index % 2 === 1 ? "lg:order-1" : ""
                      }`}
                    >
                      <p className="min-w-10 w-fit h-10 px-2 flex items-center justify-center text-lg font-semibold text-white bg-[#1c4832] rounded-full">
                        {item.id}
</p>
                      <h3 className="section-title-spl text-[#062516] mb-10">
                        {item.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {item.intro}
                      </p>

                      <ul className="space-y-3 text-sm leading-6 text-gray-700">
                        {item.points.map((point) => (
                          <li key={point} className="flex items-start gap-2">
                            <span className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full bg-[#085D36]" />
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Call to Action */}
        <div className="max-w-7xl mx-auto px-4 mt-24 text-center">
          <h3 className="section-title-spl text-[#062516] mb-6">
            Ready to Transform Your Energy Future?
          </h3>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Contact us today to learn more about our capabilities and how we can
            help you achieve your energy goals.
          </p>
          <a
            href="/contact"
            className="inline-block px-8 py-4 bg-[#062516] text-white rounded-lg font-medium hover:bg-[#051e12] transition-colors duration-300"
          >
            Get in Touch
          </a>
        </div>
      </div>

      <Footer />
    </div>
  );
}
