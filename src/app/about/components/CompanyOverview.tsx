"use client";

import { motion } from "framer-motion";

export default function CompanyOverview() {
  return (
    <section className="py-5 px-6 max-w-7xl mx-auto">{/* md:px-12 */}
      <h3 className="section-title text-center text-[#062516] mb-10">About JIVO Energy</h3>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="prose prose-lg mx-auto text-gray-600 space-y-6 text-justify"
      >
        <p>
          <b>JIVO Energy</b> is a renewable energy and infrastructure company focused on delivering sustainable, reliable, and future-ready energy solutions across Africa and emerging markets. Since 2018, we have been actively engaged in project development, engineering, procurement and construction (EPC), operations & maintenance, battery energy storage systems (BESS), and energy infrastructure development.
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
  );
}
