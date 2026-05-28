"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const businessAreas = [
  { name: "Solar PV", image: "/about/solar_pv.png" },
  { name: "Battery Energy Storage", image: "/about/battery_storage.png" },
  { name: "Transmission & Distribution", image: "/about/transmission_distribution.png" },
  { name: "Hybrid Energy Systems", image: "/about/hybrid_energy.png" },
  { name: "Biogas, Biomethane", image: "/about/biogas_biomethane.png" },
  { name: "Waste Management, Waste to Energy", image: "/about/waste_to_energy.png" },
];

const geographies = [
  {
    region: "East Africa",
    countries: ["Uganda", "Ethiopia", "Kenya"],
  },
  {
    region: "West Africa",
    countries: ["Burkina Faso", "Cape Verde", "Liberia", "Senegal", "Sierra Leone", "São Tome and Principe"],
  },
  {
    region: "Southern Africa",
    countries: ["Malawi", "Zimbabwe", "Zambia"],
  },
];

const otherRegions = ["India", "UAE", "Portugal"];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white text-gray-800 font-sans">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative h-[80vh] w-full overflow-hidden flex items-center justify-center">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover z-0"
        >
          <source src="/about_vid.mp4" type="video/mp4" />
        </video>
        <div className="absolute top-0 left-0 w-full h-full bg-black/40 z-10" />
        <div className="relative z-20 text-center text-white px-4">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-bold tracking-tight mb-4"
          >
            Powering Tomorrow
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl font-light"
          >
            Sustainable Energy Solutions for Africa & Beyond
          </motion.p>
        </div>
      </section>

      {/* Company Overview */}
      <section className="py-20 px-6 md:px-12 max-w-7xl mx-auto">
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="prose prose-lg mx-auto text-gray-600 space-y-6 text-justify"
        >
          <p>
            JIVO Energy has been engaged in renewable energy business in Africa & Asia since 2018 focused on Project Development, EPC, O&M and Investments in Renewable Energy Projects, including provision of technical services related to renewable energy to several clients. In addition, JIVO Energy provides Technical Feasibility, EPC and O&M services related to renewable energy to project developers and investors in Europe.
          </p>
          <p>
            Besides, JIVO Energy is also developing a 25MW Municipal Waste to Energy Project in Kampala, Uganda having completed all technical assessments and now in the process of concluding agreements with the authorities.
          </p>
          <p>
            JIVO Energy currently operates in 15+ countries in Africa across East, West, and Southern Africa, with offices & teams in India, Mauritius, Spain, UAE, Uganda, Kenya, Ethiopia, Senegal, Burkina Faso & Cape Verde. Our journey started in Uganda in 2018 with the construction of the 20MWac Kabulasoke Solar PV plant.
          </p>
          <p>
            JIVO Energy, in a short span of time, has created a value proposition around implementation of solar energy and battery energy storage projects and has immense expertise in all technological aspects related to solar energy and battery energy storage projects of all kinds and capacities.
          </p>
          <p>
            We are a leading provider of integrated renewable energy and sustainable solutions, delivering end-to-end services across solar, battery energy storage, hybrid systems, waste-to-energy projects, and Transmission & Distribution infrastructure. Serving commercial, industrial, utility-scale, and community clients, we combine technical expertise, innovative design, and project execution excellence to deliver reliable, efficient, and environmentally responsible energy solutions.
          </p>
        </motion.div>
      </section>

      {/* Split Layout Section: Business Areas & Geographies */}
      <div className="flex flex-col lg:flex-row w-full">
        {/* Business Areas (Left Column) */}
        <section className="w-full lg:w-1/2 bg-white py-20 px-6 md:px-12">
          <div className="max-w-2xl mx-auto lg:mx-0 lg:ml-auto lg:pr-8">
            <h2 className="text-4xl font-bold text-center lg:text-left mb-12 text-[#085D36]">OUR BUSINESS AREAS</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {businessAreas.map((area, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group relative h-64 rounded-2xl overflow-hidden cursor-pointer shadow-lg"
                >
                  <Image
                    src={area.image}
                    alt={area.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90 transition-opacity duration-300" />
                  <div className="absolute bottom-0 left-0 p-4 w-full">
                    <h3 className="text-lg font-semibold text-white group-hover:text-[#FFFA84] transition-colors leading-tight">
                      {area.name}
                    </h3>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Geographies (Right Column) */}
        <section className="w-full lg:w-1/2 bg-[#062516] text-white py-20 px-6 md:px-12 relative overflow-hidden">
          {/* Decorative Background Elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#085D36] opacity-20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#085D36] opacity-10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
          
          <div className="max-w-2xl mx-auto lg:mx-0 lg:mr-auto lg:pl-8 relative z-10">
            <h2 className="text-4xl font-bold text-center lg:text-left mb-12 flex items-center justify-center lg:justify-start gap-4">
              <span className="w-2 h-12 bg-[#FFFA84] rounded-full hidden lg:block" />
              GEOGRAPHIES
            </h2>
            
            <div className="space-y-8 mb-16">
              {geographies.map((geo, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group"
                >
                  <div className="flex items-start gap-4 p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-[#FFFA84]/30 transition-all duration-300">
                    <div className="mt-1 p-2 bg-[#FFFA84]/10 rounded-lg text-[#FFFA84]">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#FFFA84] transition-colors">
                        {geo.region}
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {geo.countries.map((country, idx) => (
                          <span 
                            key={idx} 
                            className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-white/5 text-gray-300 border border-white/5"
                          >
                            {country}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mb-12">
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">Other Regions</h3>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="flex flex-wrap gap-3"
              >
                {otherRegions.map((region, index) => (
                  <div 
                    key={index}
                    className="px-4 py-2 rounded-lg bg-[#085D36] border border-[#085D36] text-gray-200 text-sm font-medium hover:bg-[#0a4f2e] hover:border-[#FFFA84]/50 transition-colors cursor-default"
                  >
                    {region}
                  </div>
                ))}
              </motion.div>
            </div>

            <div className="text-gray-400 text-sm leading-relaxed border-l-4 border-[#FFFA84] pl-6 italic">
              "As of today, JIVO Energy has constructed (or has under construction) more than 100MWp of Solar PV and more than 60MWh of Battery Energy Storage Systems (BESS), with another 200MWp+ of Solar PV and 50MWh+ of Battery Energy Storage Systems under development across 12 countries in Africa."
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}
