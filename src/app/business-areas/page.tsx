"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import solarPV from "../../../public/assets/solar-pv-1.jpg";
import BESS from "../../../public/gallery/MALAWI/1.jpg";
import transmission from "../../../public/assets/business-transmission.jpg";
import hybrid from "../../../public/assets/hybrid-energy.jpg";
import biogas from "../../../public/assets/business-biogas.jpg";
import wasteManagement from "../../../public/assets/business-waste-mgmt.jpg";
import "./BusinessAreas.css";

const sectionIds = [
  "solar-pv",
  "bess",
  "transmission-distribution",
  "hybrid-energy",
  "biogas-biomethane",
  "waste-management",
] as const;

const businessAreas = [
  {
    title: "Solar PV",
    description: (
      <>
        <strong>JIVO Energy</strong> delivers high-performance Solar PV
        solutions engineered for diverse grid conditions, harsh environmental
        climates, and evolving energy demands across Africa. Our expertise
        combines advanced engineering, optimized plant performance, intelligent
        energy integration, and reliable project execution to develop scalable
        renewable energy infrastructure for utilities, industries, institutions,
        and remote applications.
      </>
    ),
    image: solarPV,
    imageSrc: "/assets/solar-pv-1.jpg",
    imageTitle: "Africa’s leading Solar EPC & O&M solutions providers",
    features: [
      "Utility-scale solar PV power plants",
      "Commercial & industrial (C&I) solar solutions",
      "Solar farm development",
      "EPC, testing & commissioning services",
      "Operations & maintenance (O&M) solutions",
      "Rooftop and Distributed Solar Systems",
    ],
  },
  {
    title: "Battery Energy Storage Systems (BESS)",
    description: (
      <>
        <strong>JIVO Energy</strong> delivers advanced Battery Energy Storage
        System (BESS) solutions engineered to enhance grid stability, improve
        energy reliability, and support modern power infrastructure across
        utility, commercial, industrial, and renewable energy applications. Our
        expertise spans scalable standalone storage systems ranging from
        kWh-based backup applications to utility-scale multi-MWh installations
        integrated across LV, MV, and HV networks.
      </>
    ),
    image: BESS,
    imageSrc: "/gallery/MALAWI/1.jpg",
    imageTitle: "Smart Energy Storage for a Reliable Tomorrow",
    features: [
      "Backup power & energy resilience",
      "Peak shaving & load shifting",
      "Frequency regulation & grid stabilization",
      "Voltage support & power quality improvement",
      "Utility-scale storage applications",
      "Renewable curtailment reduction",
      "Black start & spinning reserve support",
      "Industrial & commercial energy optimization",
    ],
  },
  {
    title: "Transmission & Distribution",
    description: (
      <>
        <strong>JIVO Energy</strong> delivers robust power transmission and
        distribution infrastructure engineered for high availability,
        operational resilience, and seamless energy transfer across complex
        electrical networks. Our expertise spans utility interconnections,
        renewable power evacuation systems, intelligent substations, and
        high-capacity transmission corridors supporting industrial, commercial,
        and national grid expansion projects.
      </>
    ),
    image: transmission,
    imageSrc: "/assets/business-transmission.jpg",
    imageTitle: "Efficient Transmission. Reliable Distribution",
    features: [
      "Transmission corridor development & power evacuation systems",
      "AIS/GIS switchyard & digital substation solutions",
      "LV, MV, HV electrical infrastructure",
      "Grid synchronization & renewable interconnection systems",
      "Protection relays, automation & IEC 61850 integration",
      "SCADA, control & communication architecture",
      "Load flow, short circuit & stability studies",
      "Underground cable & overhead line systems",
      "Energy metering & power quality solutions",
      "Testing, energization & system reliability enhancement",
    ],
  },
  {
    title: "Hybrid Energy Systems",
    description: (
      <>
        <strong>JIVO Energy</strong> designs and implements intelligent hybrid energy systems integrating Grid, Solar PV, DG, and BESS technologies to deliver stable, efficient, and optimized power solutions for utilities, industries, telecom infrastructure, institutions, remote communities, and mission-critical applications. Our expertise also includes the design and deployment of off-grid and mini-grid power systems that provide reliable, clean, and sustainable electricity to underserved and remote locations where grid infrastructure is limited or unavailable.
      </>
    ),
    image: hybrid,
    imageSrc: "/assets/hybrid-energy.jpg",
    imageTitle: "Integrated Energy Solutions for Reliable & Sustainable Power",
    features: [
      "Renewable energy optimization",
      "Intelligent hybrid power management",
      "Diesel reduction & fuel optimization",
      "Microgrid & off-grid energy systems",
      "Critical infrastructure power reliability",
      "Industrial & telecom hybrid applications",
      "Remote community electrification",
      "Islanded and grid-connected operation",
      "Load balancing & energy management",
      "Smart automation & remote monitoring",
    ],
  },
  {
    title: "Biogas & Biomethane",
    description: (
      <>
        <strong>JIVO Energy</strong> develops technically advanced biogas and
        biomethane infrastructure solutions engineered to convert agricultural
        residues, industrial effluents, municipal organic waste, and
        biodegradable feedstock into renewable energy, green fuel, and
        sustainable thermal power applications. Our integrated waste-to-energy
        approach combines anaerobic digestion, gas handling, purification, and
        energy recovery technologies to maximize resource utilization, reduce
        greenhouse gas emissions, and support circular economy development.
      </>
    ),
    image: biogas,
    imageSrc: "/assets/business-biogas.jpg",
    imageTitle: "Converting Waste into Clean & Sustainable Energy",
    features: [
      "Biogas plant development & process engineering",
      "Biomethane upgrading & gas purification systems",
      "Anaerobic digestion technology integration",
      "Agricultural & organic waste-to-energy infrastructure",
      "CHP (Combined Heat & Power) systems",
      "Gas compression, storage & distribution systems",
      "Industrial effluent & organic waste processing",
      "Renewable fuel generation & energy recovery",
      "Environmental compliance & emissions reduction solutions",
      "Sustainable waste management & circular economy integration",
    ],
  },
  {
    title: "Waste Management & Waste-to-Energy",
    description: (
      <>
        <strong>JIVO Energy</strong> develops integrated Waste Management and
        Waste-to-Energy (WtE) infrastructure solutions engineered to convert
        municipal, industrial, commercial, and organic waste streams into
        renewable power, recoverable resources, and sustainable energy products.
        Our solutions are designed to minimize landfill dependency, improve
        environmental sustainability, and support development of modern circular
        economy infrastructure through advanced waste processing and energy
        recovery technologies.
      </>
    ),
    image: wasteManagement,
    imageSrc: "/assets/business-waste-mgmt.jpg",
    imageTitle: "Transforming Waste into Sustainable Energy Solutions",
    features: [
      "Municipal Solid Waste (MSW) processing infrastructure",
      "Renewable power generation from waste",
      "Waste-to-energy plant development & engineering",
      "Industrial & urban waste management solutions",
      "Thermal waste conversion technologies",
      "Resource recovery & recycling integration",
      "Waste segregation & treatment systems",
      "Emission control & environmental compliance systems",
      "EPC, commissioning & operational support",
      "Sustainable waste processing & circular economy solutions",
      "Energy recovery & landfill reduction initiatives",
      "",
    ],
  },
];

const BusinessAreas = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);
  const swatchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 1024px)");
    let cleanupDesktop: (() => void) | undefined;

    const bindDesktop = () => {
      const sections = sectionRefs.current.filter(
        (el): el is HTMLElement => el != null
      );
      if (sections.length === 0) return;

      const ratios = new Array(sections.length).fill(0);

      const focusY = () => {
        const swatch = swatchRef.current;
        if (!swatch) return window.innerHeight / 2;
        const rect = swatch.getBoundingClientRect();
        return rect.top + rect.height / 2;
      };

      const syncActive = () => {
        const y = focusY();
        let next = 0;
        let bestDist = Number.POSITIVE_INFINITY;

        for (const el of sections) {
          const index = Number(el.dataset.baIndex ?? 0);
          const rect = el.getBoundingClientRect();
          const dist =
            y >= rect.top && y <= rect.bottom
              ? 0
              : y < rect.top
                ? rect.top - y
                : y - rect.bottom;

          if (
            dist < bestDist ||
            (dist === bestDist && ratios[index] > ratios[next])
          ) {
            bestDist = dist;
            next = index;
          }
        }

        setActiveIndex((prev) => (prev === next ? prev : next));
      };

      const observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            const index = Number(
              (entry.target as HTMLElement).dataset.baIndex ?? 0
            );
            ratios[index] = entry.intersectionRatio;
          }
          syncActive();
        },
        { threshold: Array.from({ length: 21 }, (_, i) => i / 20) }
      );

      sections.forEach((el) => observer.observe(el));
      syncActive();

      let frame = 0;
      const onScrollOrResize = () => {
        if (frame) return;
        frame = window.requestAnimationFrame(() => {
          frame = 0;
          syncActive();
        });
      };

      window.addEventListener("scroll", onScrollOrResize, { passive: true });
      window.addEventListener("resize", onScrollOrResize);

      cleanupDesktop = () => {
        observer.disconnect();
        window.removeEventListener("scroll", onScrollOrResize);
        window.removeEventListener("resize", onScrollOrResize);
        if (frame) window.cancelAnimationFrame(frame);
      };
    };

    const onBreakpoint = () => {
      cleanupDesktop?.();
      cleanupDesktop = undefined;
      if (desktop.matches) bindDesktop();
    };

    onBreakpoint();
    desktop.addEventListener("change", onBreakpoint);

    return () => {
      desktop.removeEventListener("change", onBreakpoint);
      cleanupDesktop?.();
    };
  }, []);

  return (
    <div className="ba-page min-h-screen bg-white">
      <Navbar />

      <section className="ba-banner relative h-[40vh] w-full flex items-center justify-center overflow-hidden">
        <Image
          src="/assets/banners/BusinessAreas.jpg"
          alt="Business Areas"
          fill
          className="object-cover"
          priority
        />
      </section>

      <div className="">
        <div className="ba-intro-wrap max-w-7xl mx-auto px-4">
          <div className="ba-intro mb-16">
            <h3 className="section-title-spl text-center text-[#062516] mb-10">
              Business Areas
            </h3>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className=" text-gray-600 space-y-6 text-justify"
            >
              <p>
                <b>JIVO Energy</b> delivers integrated renewable energy and
                sustainable infrastructure solutions across Africa, combining
                advanced engineering, project development, EPC execution, energy
                storage technologies, and long-term operational support. With
                expertise spanning utility-scale Solar PV, Battery Energy Storage
                Systems (BESS), hybrid energy systems, transmission &amp;
                distribution infrastructure, and waste-to-energy solutions, we
                develop reliable, efficient, and future-ready energy ecosystems
                tailored for emerging markets.
              </p>
              <p>
                Our multidisciplinary team specializes in complete project
                lifecycle execution, from feasibility studies, detailed
                engineering, grid integration, procurement, construction,
                commissioning, SCADA integration, and operations &amp;
                maintenance, ensuring technically optimized and bankable energy
                solutions for utilities, governments, industries, commercial
                clients, and development agencies.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Sticky image + sections; image swaps via IntersectionObserver */}
        <div className="ba-scroll-container">
          <div className="ba-swatch-col">
            <div className="ba-swatch" ref={swatchRef} aria-hidden="true">
              {businessAreas.map((area, index) => (
                <div
                  key={sectionIds[index]}
                  className={`ba-swatch-layer${index === activeIndex ? " is-active" : ""}`}
                >
                  <Image
                    src={area.image}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 90vw, 600px"
                    priority={index === 0}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="ba-scroll-sections">
            {businessAreas.map((area, index) => (
              <section
                key={sectionIds[index]}
                id={sectionIds[index]}
                data-ba-index={index}
                ref={(el) => {
                  sectionRefs.current[index] = el;
                }}
                className="ba-scroll-section"
              >
                <div className="ba-section-photo">
                  <Image
                    src={area.image}
                    alt={area.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1023px) 100vw, 600px"
                  />
                </div>
                <h3 className="section-title-spl text-[#062516] mb-10">
                  {area.title}
                </h3>
                <h3 className="ba-scroll-section-kicker text-left text-gray-700 font-medium mt-2">
                  {area.imageTitle}
                </h3>
                <p className="ba-scroll-section-desc text-gray-600 leading-relaxed">
                  {area.description}
                </p>
                <a
                  href={`/business-areas/${sectionIds[index]}`}
                  className="ba-scroll-section-cta inline-block mt-6 px-6 py-3 bg-[#062516] text-white rounded-lg font-medium hover:bg-[#051e12] transition-colors duration-300"
                >
                  Read More
                </a>
              </section>
            ))}
          </div>
        </div>

        <div className="ba-cta max-w-7xl mx-auto px-4 mt-24 text-center">
          <h3 className="section-title-spl text-[#062516] mb-6">
            Ready to Transform Your Energy Future?
          </h3>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Contact us today to learn more about our services and how we can help
            you achieve your energy goals.
          </p>
          <a
            href="/contact"
            className="ba-cta-btn inline-block px-8 py-4 bg-[#062516] text-white rounded-lg font-medium hover:bg-[#051e12] transition-colors duration-300"
          >
            Get in Touch
          </a>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default BusinessAreas;
