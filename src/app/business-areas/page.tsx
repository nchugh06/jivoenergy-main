'use client';

import React from 'react';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import solarPV from '../../../public/gallery/Uganda/NKONGE/1.jpg';
import BESS from '../../../public/gallery/MALAWI/1.jpg';
const businessAreas = [
  {
    title: "Solar PV",
    description: "JIVO Energy delivers high-performance Solar PV solutions engineered for diverse grid conditions, harsh environmental climates, and evolving energy demands across Africa. Our expertise combines advanced engineering, optimized plant performance, intelligent energy integration, and reliable project execution to develop scalable renewable energy infrastructure for utilities, industries, institutions, and remote applications.",
    image: solarPV,
    imageTitle: "Africa’s leading Solar EPC & O&M solutions providers",  
    features: [
      "Utility-scale solar PV power plants",
      "Commercial & industrial (C&I) solar solutions",
      "Solar farm development",
      "EPC, testing & commissioning services",
      "Operations & maintenance (O&M) solutions",
      "Rooftop and Distributed Solar Systems"
    ]
  },
  {
    title: "Battery Energy Storage Systems (BESS)",
    description: "JIVO Energy delivers advanced Battery Energy Storage System (BESS) solutions engineered to enhance grid stability, improve energy reliability, and support modern power infrastructure across utility, commercial, industrial, and renewable energy applications. Our expertise spans scalable standalone storage systems ranging from kWh-based backup applications to utility-scale multi-MWh installations integrated across LV, MV, and HV networks.",
    image: BESS,
    imageTitle: "Smart Energy Storage for a Reliable Tomorrow",
    features: [
      "Backup power & energy resilience",
      "Peak shaving & load shifting",
      "Frequency regulation & grid stabilization",
      "Voltage support & power quality improvement",
      "Utility-scale storage applications",
      "Renewable curtailment reduction",
      "Black start & spinning reserve support",
      "Industrial & commercial energy optimization"
    ]
  },
  {
    title: "Transmission & Distribution",
    description: "JIVO Energy delivers robust power transmission and distribution infrastructure engineered for high availability, operational resilience, and seamless energy transfer across complex electrical networks. Our expertise spans utility interconnections, renewable power evacuation systems, intelligent substations, and high-capacity transmission corridors supporting industrial, commercial, and national grid expansion projects. From LV distribution systems to MV, HV transmission infrastructure, we provide technically optimized solutions integrating advanced protection schemes, digital substation technologies, automation systems, and grid synchronization capabilities for secure and stable power delivery.",
    image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=2069&auto=format&fit=crop",
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
      "Testing, energization & system reliability enhancement"
    ]
  },
  {
    title: "Hybrid Energy Systems",
    description: "JIVO Energy designs and implements intelligent hybrid energy systems integrating Grid, Solar PV, DG, and BESS technologies to deliver stable, efficient, and optimized power solutions for utilities, industries, telecom infrastructure, institutions, remote communities, and mission-critical applications. Our hybrid energy architectures are engineered to maximize renewable energy utilization, reduce diesel dependency, improve operational efficiency, and ensure uninterrupted power availability across dynamic operating environments.",
    image: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?q=80&w=2069&auto=format&fit=crop",
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
    ]
  },
  {
    title: "Biogas & Biomethane",
    description: "JIVO Energy develops technically advanced biogas and biomethane infrastructure solutions engineered to convert agricultural residues, industrial effluents, municipal organic waste, and biodegradable feedstock into renewable energy, green fuel, and sustainable thermal power applications. Our integrated waste-to-energy approach combines anaerobic digestion, gas handling, purification, and energy recovery technologies to maximize resource utilization, reduce greenhouse gas emissions, and support circular economy development. We deliver scalable and efficient biogas systems for industrial, municipal, agro-processing, and commercial sectors, supporting decentralized clean energy generation, waste management optimization, and low-carbon infrastructure development.",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop",
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
      "Sustainable waste management & circular economy integration"
    ]
  },
  {
    title: "Waste Management & Waste-to-Energy",
    description: "JIVO Energy develops integrated Waste Management and Waste-to-Energy (WtE) infrastructure solutions engineered to convert municipal, industrial, commercial, and organic waste streams into renewable power, recoverable resources, and sustainable energy products. Our solutions are designed to minimize landfill dependency, improve environmental sustainability, and support development of modern circular economy infrastructure through advanced waste processing and energy recovery technologies. We specialize in technically optimized waste treatment systems integrating waste segregation, thermal conversion, resource recovery, emissions control, and renewable energy generation for municipalities, industries, utilities, and urban infrastructure projects. Our flagship municipal solid waste-to-energy initiatives are developed using environmentally compliant technologies aligned with international environmental and operational standards.",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop",
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
      ""
    ]
  }
];

const BusinessAreas = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <section className="relative h-[60vh] w-full flex items-center justify-center overflow-hidden">
                    <Image
                      src="/assets/business-areas-banner.jpg"
                      alt="Business Areas"
                      fill
                      className="object-cover"
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-[#085D36]/25 to-[#04301C]/25"></div>
                    <div className="relative z-10 container mx-auto px-4 text-center">
                      <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
                        Business Areas
                      </h1>
                      {/* <p className="text-xl text-white/90 max-w-2xl mx-auto">
                        Creating lasting value through environmental stewardship, social responsibility, and strong governance.
                      </p> */}
                    </div>
                  </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-16">
          {/* <h2 className="text-4xl font-bold text-[#062516] mb-4">Our Expertise</h2> */}
          <p className="text-gray-600 max-w-3xl mx-auto">
            JIVO Energy delivers integrated renewable energy and sustainable infrastructure solutions across Africa, combining advanced engineering, project development, EPC execution, energy storage technologies, and long-term operational support. With expertise spanning utility-scale Solar PV, Battery Energy Storage Systems (BESS), hybrid energy systems, transmission & distribution infrastructure, and waste-to-energy solutions, we develop reliable, efficient, and future-ready energy ecosystems tailored for emerging markets.<br></br><br></br>
Our multidisciplinary team specializes in complete project lifecycle execution — from feasibility studies, detailed engineering, grid integration, procurement, construction, commissioning, SCADA integration, and operations & maintenance — ensuring technically optimized and bankable energy solutions for utilities, governments, industries, commercial clients, and development agencies.

          </p>
        </div>

        {/* Business Areas Grid */}
        <div className="space-y-24">
          {businessAreas.map((area, index) => {
            const sectionIds = [
              'solar-pv',
              'bess',
              'transmission-distribution',
              'hybrid-energy',
              'biogas-biomethane',
              'waste-management'
            ];
            
            return (
            <div 
              key={index}
              id={sectionIds[index]}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                index % 2 === 1 ? 'lg:flex-row-reverse' : ''
              }`}
            >
              {/* Image Section */}
              <div>
                <div className="relative h-[400px] rounded-lg overflow-hidden shadow-xl">
                  <Image
                    src={area.image}
                    alt={area.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="text-center text-gray-700 font-medium mt-2">{area.imageTitle}</h3>
              </div>

              {/* Content Section */}
              <div className="space-y-6">
                <h3 className="text-3xl font-bold text-[#062516]">{area.title}</h3>
                <p className="text-gray-600 leading-relaxed">{area.description}</p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {area.features.map((feature, featureIndex) => (
                    <div 
                      key={featureIndex}
                      className="flex items-center space-x-3 bg-[#062516]/5 p-4 rounded-lg"
                    >
                      <div className="w-2 h-2 bg-[#062516] rounded-full" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>

                <a 
                  href={`/business-areas/${sectionIds[index]}`}
                  className="inline-block mt-6 px-6 py-3 bg-[#062516] text-white rounded-lg font-medium hover:bg-[#051e12] transition-colors duration-300"
                >
                  Read More
                </a>
              </div>
            </div>
            );
          })}
        </div>

        {/* Call to Action */}
        <div className="mt-24 text-center">
          <h2 className="text-3xl font-bold text-[#062516] mb-6">
            Ready to Transform Your Energy Future?
          </h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Contact us today to learn more about our services and how we can help you 
            achieve your energy goals.
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
};

export default BusinessAreas;
