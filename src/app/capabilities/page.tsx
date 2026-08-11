"use client";

import type { CSSProperties } from "react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./Capabilities.css";

const capabilityBlocks = [
  {
    id: 1,
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
    id: 2,
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
    id: 3,
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
    id: 4,
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
    id: 5,
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
    id: 6,
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
    id: 7,
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
    <div className="capabilities-page">
      <Navbar />

      <section className="capabilities-banner">
        <Image
          src="/assets/banners/Capabilities.jpg"
          alt="Capabilities"
          fill
          className="object-cover"
          priority
        />
      </section>

      <div className="py-5">
        <div className="capabilities-intro-wrap">
          <div className="capabilities-intro">
            <h3 className="section-title-spl text-center">Our Capabilities</h3>
         
          </div>
        </div>

        <div className="capabilities-stack">
          {capabilityBlocks.map((item, index) => {
            const isReversed = index % 2 === 0;
            const isTinted = index % 2 === 0;

            return (
              <section
                key={item.sectionId}
                id={item.sectionId}
                className={`capabilities-section${isReversed ? " is-reversed" : ""}${isTinted ? " is-tinted" : ""}`}
                style={
                  {
                    "--stack-index": index + 1,
                  } as CSSProperties
                }
              >
                <div className="capabilities-section-inner">
                  <div className="capabilities-section-grid">
                    <div className="capabilities-media">
                      <div className="capabilities-media-frame">
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 1024px) 100vw, 50vw"
                        />
                      </div>
                    </div>

                    <div className="capabilities-body">
                      <span className="capabilities-step">{item.id}</span>
                      <h3 className="mt-3 text-2xl font-semibold text-[#062516]">{item.title}</h3>
                      <p className="capabilities-intro-text">{item.intro}</p>
                      <ul className="capabilities-points">
                        {item.points.map((point) => (
                          <li key={point}>
                            <span className="dot" aria-hidden />
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </section>
            );
          })}
        </div>
      </div>

      <Footer />
    </div>
  );
}
