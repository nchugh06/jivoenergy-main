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
    countries: ["Uganda", "Ethiopia", "Kenya", "Rwanda", "Tanzania"],
  },
  {
    region: "West Africa",
    countries: ["Burkina Faso", "Cape Verde", "Liberia", "Senegal", "Sierra Leone", "São Tome and Principe"],
  },
  {
    region: "Southern Africa",
    countries: ["Malawi", "Zimbabwe", "Zambia", "South Africa"],
  },
];

const otherRegions = ["India", "UAE", "Portugal"];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white text-gray-800 font-sans">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative h-[60vh] w-full flex items-center justify-center overflow-hidden">
              <Image
                src="/assets/about-banner.jpg"
                alt="About Banner"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-br from-[#085D36]/25 to-[#04301C]/25"></div>
              <div className="relative z-10 container mx-auto px-4 text-center">
                <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
                  About Us
                </h1>
                {/* <p className="text-xl text-white/90 max-w-2xl mx-auto">
                  Creating lasting value through environmental stewardship, social responsibility, and strong governance.
                </p> */}
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
            JIVO Energy is a renewable energy and infrastructure company focused on delivering sustainable, reliable, and future-ready energy solutions across Africa and emerging markets. Since 2018, we have been actively engaged in project development, engineering, procurement and construction (EPC), operations & maintenance, battery energy storage systems (BESS), and energy infrastructure development.
          </p>
          <p>
            With expertise spanning utility-scale renewable energy, hybrid power systems, transmission and distribution infrastructure, waste-to-energy solutions, and digital energy integration, we support governments, utilities, industries, commercial enterprises, and development organizations in achieving their energy and sustainability objectives.
          </p>
          <p>
            Over the years, JIVO Energy has established a strong presence across multiple countries in Africa, successfully delivering and developing solar PV, battery storage, and energy infrastructure projects. Our integrated approach combines technical excellence, innovative engineering, quality execution, and long-term operational support to create resilient and impactful energy solutions.
          </p>
          <p>
            Driven by a commitment to sustainability, safety, and innovation, we partner with clients and stakeholders to accelerate energy transition, strengthen infrastructure, and contribute to long-term economic and environmental development.
          </p>
          {/* <p>
            We are a leading provider of integrated renewable energy and sustainable solutions, delivering end-to-end services across solar, battery energy storage, hybrid systems, waste-to-energy projects, and Transmission & Distribution infrastructure. Serving commercial, industrial, utility-scale, and community clients, we combine technical expertise, innovative design, and project execution excellence to deliver reliable, efficient, and environmentally responsible energy solutions.
          </p> */}
        </motion.div>
      </section>

      {/* Vision and Mission Section */}
      <section className="py-20 px-6 md:px-12 bg-gradient-to-br from-[#085D36]/5 to-[#04301C]/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Vision */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-2xl shadow-lg border-l-4 border-[#085D36]"
            >
              <h3 className="section-title text-[#085D36] mb-6">Our Vision</h3>
              <p className="text-gray-600 leading-relaxed text-lg">
                To lead the transition toward a cleaner, smarter, and more sustainable world by driving sustainable infrastructure and clean energy transformation. We strive to deliver innovative, reliable, and high-impact solutions that empower communities, industries, and utilities while creating a greener, more resilient future for generations to come.
              </p>
            </motion.div>

            {/* Mission */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-2xl shadow-lg border-l-4 border-[#FFFA84]"
            >
              <h3 className="section-title text-[#085D36] mb-6">Our Mission</h3>
              <p className="text-gray-600 leading-relaxed text-lg">
                Our mission is to deliver sustainable energy and infrastructure solutions that create long-term value for our clients, communities, and stakeholders. Through excellence in project development, engineering, EPC execution, operations and maintenance, and environmental responsibility, we support renewable energy adoption, infrastructure modernization, and climate goals while maintaining the highest standards of safety, integrity, quality, and customer satisfaction.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Split Layout Section: Business Areas & Geographies */}
      <div className="flex flex-col lg:flex-row w-full">
        {/* Business Areas (Left Column) */}
        {/* <section className="w-full lg:w-1/2 bg-white py-20 px-6 md:px-12">
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
        </section> */}

        {/* Geographies (Right Column) */}
        <section className="w-full bg-[#062516] text-white py-20 px-6 md:px-12 relative overflow-hidden">
          {/* Decorative Background Elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#085D36] opacity-20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#085D36] opacity-10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
          
          <div className="max-w-4xl mx-auto relative z-10">
            <h2 className="section-title text-center lg:text-left text-white mb-12 flex items-center justify-center lg:justify-start gap-4">
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
              Today, JIVO Energy has developed, constructed, or is currently delivering over 100 MWp of Solar PV and 60 MWh of Battery Energy Storage Systems (BESS), with a growing pipeline of renewable energy and infrastructure projects across Africa. Our commitment to engineering excellence, innovation, and sustainability continues to drive impactful energy solutions for communities, industries, and utilities.
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}
