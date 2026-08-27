"use client";

import Image from "next/image";
import { backIn, motion } from "framer-motion";
import "./OurPresence.css";

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
    background_image:"/our-presence/Western-Africa-map.png"

  
  },
  {
    region: "West Africa",
    countries: ["Burkina Faso", "Cape Verde", "Liberia", "Senegal", "Sierra Leone", "São Tome and Principe"],
          background_image:"/our-presence/Map_of_East_Africa_Countries.png"

  },
  {
    region: "Southern Africa",
    countries: ["Malawi", "Zimbabwe", "Zambia", "South Africa"],
        background_image:"/our-presence/Southern_Africa_last.png"

  },
];

const otherRegions = ["India", "UAE", "Portugal"];

export default function OurPresence() {
  return (
    <div className="flex flex-col lg:flex-row w-full">
      {/* Business Areas (Left Column) */}
      {/* <section className="w-full lg:w-1/2 bg-white py-5 px-6 md:px-12">
        <div className="max-w-2xl mx-auto lg:mx-0 lg:ml-auto lg:pr-8">
          <h3 className="text-4xl font-bold text-center lg:text-left mb-12 text-[#085D36]">OUR BUSINESS AREAS</h3>
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
      <section className="w-full bg-[#ffffff] py-5 px-6 md:px-12 relative overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#085D36] opacity-20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#085D36] opacity-10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

        <div className="max-w-4xl mx-auto relative z-10">
          <h3 className="section-title-spl text-center text-[#062516] mb-10">
        Our Presence 
          </h3>

          <div className="space-y-8 mb-16">
            {geographies.map((geo, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                
              >
                <div className="our-presence__box flex items-start gap-4 p-6 pr-28 sm:pr-40 rounded-2xl relative overflow-hidden">
                  {/* <div className="mt-1 p-2 bg-white/10 rounded-lg text-[#ffffff]">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div> */}
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-3">
                      {geo.region}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {geo.countries.map((country, idx) => (
                        <span
                          key={idx}
                          className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-white/10 text-white border border-white/15"
                        >
                          {country}
                        </span>
                      ))}
                    </div>
                  </div>
                    <Image
                      src={geo.background_image}
                      alt={`${geo.region} map`}
                      width={300}
                      height={140}
                      className="region-map"
                    />
                
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
                  className="tag px-4 py-2 rounded-lg text-gray-200 text-sm font-medium cursor-default"
                >
                  {region}
                </div>
              ))}
            </motion.div>
          </div>

          {/* <div className="text-gray-400 text-sm leading-relaxed border-l-4 border-[#FFFA84] pl-6 italic">
            Today, JIVO Energy has developed, constructed, or is currently delivering over 100 MWp of Solar PV and 60 MWh of Battery Energy Storage Systems (BESS), with a growing pipeline of renewable energy and infrastructure projects across Africa. Our commitment to engineering excellence, innovation, and sustainability continues to drive impactful energy solutions for communities, industries, and utilities.
          </div> */}
        </div>
      </section>
    </div>
  );
}
