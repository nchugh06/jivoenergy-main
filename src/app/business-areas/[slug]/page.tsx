import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BusinessAreaDetailClient from './BusinessAreaDetailClient';
import solarPV from '../../../../public/assets/business-areas/solar-pv.jpg';
import BESS from '../../../../public/assets/business-areas/bess.jpg';
import transmission from '../../../../public/assets/business-areas/transmission.jpg';
import hybridenergy from '../../../../public/assets/business-areas/hybrid-energy.jpg';
import biogas from '../../../../public/assets/business-areas/biogas.jpg';
import wastemanagement from '../../../../public/assets/business-areas/waste-management.jpg';
import { storage } from '@/lib/firebase';

const businessAreasData: {
  [key: string]: {
    title: string;
    //description: string;
    fullDescription: string;
    image: any;
    imageTitle: string;
    features: string[];
    bessStandaloneHeader?: string | null;
    bessStandaloneDescription?: string | null;
    technicalDescription?: string | null;
    technicalDetails: string[];
  };
} = {
  'solar-pv': {
    title: "Solar PV",
    //description: "",
    fullDescription: "JIVO Energy delivers high-performance Solar PV solutions engineered for diverse grid conditions, harsh environmental climates, and evolving energy demands across Africa. Our expertise combines advanced engineering, optimized plant performance, intelligent energy integration, and reliable project execution to develop scalable renewable energy infrastructure for utilities, industries, institutions, and remote applications.",
    image: solarPV,
    imageTitle: "Africa's leading Solar EPC & O&M solutions providers",
    features: [
      "Utility-scale solar PV power plants",
      "Commercial & industrial (C&I) solar solutions",
      "Solar farm development",
      "EPC, testing & commissioning services",
      "Operations & maintenance (O&M) solutions",
      "Performance monitoring & optimization",
      "Grid integration & interconnection",
      "Energy yield forecasting & analysis"
    ],
    technicalDescription: "",
    technicalDetails: []
  },
  'bess': {
    title: "Battery Energy Storage Systems (BESS)",
    //description: "JIVO Energy delivers advanced Battery Energy Storage System (BESS) solutions engineered to enhance grid stability, improve energy reliability, and support modern power infrastructure.",
    fullDescription: "JIVO Energy delivers advanced Battery Energy Storage System (BESS) solutions engineered to enhance grid stability, improve energy reliability, and support modern power infrastructure across utility, commercial, industrial, and renewable energy applications. Our expertise spans scalable standalone storage systems ranging from kWh-based backup applications to utility-scale multi-MWh installations integrated across LV, MV, and HV networks.\n\nWe provide comprehensive BESS solutions including energy storage systems design, battery selection, inverter integration, thermal management, safety systems, and grid integration. Our storage systems are engineered for multiple applications including frequency regulation, peak shaving, load shifting, voltage support, renewable energy smoothing, and backup power for critical infrastructure.\n\nOur integrated approach ensures optimal system performance, safety compliance, and operational efficiency. With advanced energy management systems and real-time monitoring, we deliver storage solutions that enhance grid reliability while reducing operational costs and supporting the transition to renewable energy-based power systems.",
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
      "Industrial & commercial energy optimization",
      "Advanced battery management systems",
      "Thermal & safety management integration"
    ],
    bessStandaloneHeader: "Standalone BESS Systems",
    bessStandaloneDescription: "Our standalone BESS solutions are designed to function as independent energy assets supporting grid stabilization, energy optimization, and critical power continuity applications.",
    technicalDescription: "",
    technicalDetails: [
      "Systems ranging from kW to utility-scale MW applications",
      "Energy storage ranging from kWh to multi-MWh installations",
      "LV, MV & HV integrated systems",
      "SCADA, EMS & PMS integration",
      "Grid-connected and islanded operation capability",
      "Advanced monitoring, automation & control systems",
    ]
  },
  'transmission-distribution': {
    title: "Transmission & Distribution",
    //description: "JIVO Energy delivers robust power transmission and distribution infrastructure engineered for high availability, operational resilience, and seamless energy transfer across complex electrical networks.",
    fullDescription: "JIVO Energy delivers robust power transmission and distribution infrastructure engineered for high availability, operational resilience, and seamless energy transfer across complex electrical networks. Our expertise spans utility interconnections, renewable power evacuation systems, intelligent substations, and high-capacity transmission corridors supporting industrial, commercial, and national grid expansion projects.\n\nFrom LV distribution systems to MV, HV transmission infrastructure, we provide technically optimized solutions integrating advanced protection schemes, digital substation technologies, automation systems, and grid synchronization capabilities. Our comprehensive services include load flow studies, short circuit analysis, stability assessments, and detailed engineering to ensure secure and stable power delivery across all voltage levels.\n\nWe specialize in integrating renewable energy sources into existing grids, designing resilient distribution networks, and implementing modern substations with SCADA integration and remote monitoring capabilities. Our infrastructure solutions support utilities in achieving higher operational efficiency, improved grid stability, and reliable power supply to end users.",
    image: transmission,
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
    ],
    technicalDescription: "",
    technicalDetails: []
  },
  'hybrid-energy': {
    title: "Hybrid Energy Systems",
    //description: "JIVO Energy designs and implements intelligent hybrid energy systems integrating Grid, Solar PV, DG, and BESS technologies to deliver stable, efficient, and optimized power solutions.",
    fullDescription: "JIVO Energy designs and implements intelligent hybrid energy systems integrating Grid, Solar PV, DG, and BESS technologies to deliver stable, efficient, and optimized power solutions for utilities, industries, telecom infrastructure, institutions, remote communities, and mission-critical applications. Our hybrid energy architectures are engineered to maximize renewable energy utilization, reduce diesel dependency, improve operational efficiency, and ensure uninterrupted power availability across dynamic operating environments.\n\nOur hybrid systems intelligently manage multiple energy sources using advanced control algorithms and energy management software to optimize power supply based on real-time demand, resource availability, and operational requirements. Whether for grid-connected or off-grid applications, our solutions provide superior reliability, cost efficiency, and environmental performance.\n\nWe deliver complete hybrid energy solutions from design and engineering through implementation, SCADA integration, operator training, and long-term support. Our systems have successfully powered telecom networks, data centers, industrial facilities, healthcare institutions, and remote communities across Africa with proven reliability and performance.",
    image: hybridenergy,
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
      "Smart automation & remote monitoring"
    ],
    technicalDescription: "",
    technicalDetails: [
      "Hybrid power plant design & engineering",
      "Solar PV & BESS integrated systems",
      "EMS, PMS & SCADA integration",
      "Synchronization & load sharing systems",
      "Utility, industrial & remote infrastructure applications",
      "Sustainable and resilient energy infrastructure",
    ]
  },

  'biogas-biomethane': {
    title: "Biogas & Biomethane",
    //description: "JIVO Energy develops technically advanced biogas and biomethane infrastructure solutions engineered to convert agricultural residues, industrial effluents, municipal organic waste, and biodegradable feedstock into renewable energy.",
    fullDescription: "JIVO Energy develops technically advanced biogas and biomethane infrastructure solutions engineered to convert agricultural residues, industrial effluents, municipal organic waste, and biodegradable feedstock into renewable energy, green fuel, and sustainable thermal power applications. Our integrated waste-to-energy approach combines anaerobic digestion, gas handling, purification, and energy recovery technologies to maximize resource utilization, reduce greenhouse gas emissions, and support circular economy development.\n\nWe deliver scalable and efficient biogas systems for industrial, municipal, agro-processing, and commercial sectors, supporting decentralized clean energy generation, waste management optimization, and low-carbon infrastructure development. Our expertise includes biogas plant design and construction, biomethane upgrading systems, gas handling infrastructure, and energy recovery technologies.\n\nOur solutions provide multiple benefits including renewable energy generation, waste management, emission reduction, and revenue generation through carbon credits. We work with industries, municipalities, and agricultural cooperatives to develop customized biogas and biomethane systems tailored to their specific feedstock availability and energy requirements.",
    image: biogas,
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
    ],
    technicalDescription: "",
    technicalDetails: []
  },
  'waste-management': {
    title: "Waste Management & Waste-to-Energy",
    //description: "JIVO Energy develops integrated Waste Management and Waste-to-Energy (WtE) infrastructure solutions engineered to convert municipal, industrial, commercial, and organic waste streams into renewable power.",
    fullDescription: "JIVO Energy develops integrated Waste Management and Waste-to-Energy (WtE) infrastructure solutions engineered to convert municipal, industrial, commercial, and organic waste streams into renewable power, recoverable resources, and sustainable energy products. Our solutions are designed to minimize landfill dependency, improve environmental sustainability, and support development of modern circular economy infrastructure through advanced waste processing and energy recovery technologies.\n\nWe specialize in technically optimized waste treatment systems integrating waste segregation, thermal conversion, resource recovery, emissions control, and renewable energy generation for municipalities, industries, utilities, and urban infrastructure projects. Our flagship municipal solid waste-to-energy initiatives are developed using environmentally compliant technologies aligned with international environmental and operational standards.\n\nOur waste-to-energy solutions deliver multiple benefits including renewable power generation, waste reduction, environmental protection, and economic returns. We provide comprehensive services from feasibility studies and detailed engineering through construction, commissioning, and operational support for sustainable waste management infrastructure.",
    image: wastemanagement,
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
      "Environmentally Compliant Waste Treatment Technologies"
    ],
    technicalDescription: "",
    technicalDetails: []
  }
};

export default async function BusinessAreaDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const area = businessAreasData[slug];

  if (!area) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 py-16 text-center">
          <h1 className="text-4xl font-bold text-[#062516] mb-4">Business Area Not Found</h1>
          <p className="text-gray-600 mb-8">The business area you're looking for doesn't exist.</p>
          <Link
            href="/business-areas"
            className="inline-block px-8 py-4 bg-[#062516] text-white rounded-lg font-medium hover:bg-[#051e12] transition-colors duration-300"
          >
            Back to Business Areas
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <BusinessAreaDetailClient slug={slug} area={area} />
  );
}
