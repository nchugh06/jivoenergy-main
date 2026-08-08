"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function VisionMission() {
  return (
    <section className="py-16 px-6 md:px-12 bg-[#F5FBF5]">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="grid gap-8 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid gap-6 lg:grid-cols-[1fr_0.95fr] items-start rounded-[32px] bg-white p-6 md:p-8 shadow-lg border border-slate-200"
          >
            <div className="space-y-5">
              <span className="inline-flex rounded-full bg-[#E8F7E8] px-4 py-2 text-sm font-semibold text-[#0F5A1F]">
                Our Vision
              </span>
              <p className="text-[#062516]" style={{ textAlign: "left" }}>
                To lead the transition toward a cleaner, smarter, and more sustainable world by driving sustainable infrastructure and clean energy transformation. We strive to deliver innovative, reliable, and high-impact solutions that empower communities, industries, and utilities while creating a greener, more resilient future for generations to come.
              </p>
              {/* <p className="text-gray-600" style={{ textAlign: "left" }}>
                We focus on creating sustainable, resilient environments through thoughtful design, technology, and stakeholder collaboration. Our vision is rooted in responsible growth that balances economic value with social and environmental well-being.
              </p> */}
            </div>
            <div className="overflow-hidden rounded-[28px] bg-slate-100 shadow-inner">
              <Image
                src="/about/Vision.jpg"
                alt="Natural landscape reflecting vision"
                width={560}
                height={360}
                className="h-full w-full object-cover"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid gap-6 lg:grid-cols-[1fr_0.95fr] items-start rounded-[32px] bg-white p-6 md:p-8 shadow-lg border border-slate-200"
          >
            <div className="space-y-5 text-left">
              <span className="inline-flex rounded-full bg-[#E8F7E8] px-4 py-2 text-sm font-semibold text-[#0F5A1F]">
                Our Mission
              </span>
              <p className="text-[#062516]" style={{ textAlign: "left" }}>
                Our mission is to deliver sustainable energy and infrastructure solutions that create long-term value for our clients, communities, and stakeholders. Through excellence in project development, engineering, EPC execution, operations and maintenance, and environmental responsibility, we support renewable energy adoption, infrastructure modernization, and climate goals while maintaining the highest standards of safety, integrity, quality, and customer satisfaction.
              </p>
              {/* <p className="text-gray-600" style={{ textAlign: "left" }}>
                We are committed to delivering practical, high-quality solutions that protect the environment while enhancing the comfort and efficiency of every space we serve.
              </p> */}
            </div>
            <div className="overflow-hidden rounded-[28px] bg-slate-100 shadow-inner">
              <Image
                src="/about/Mission.jpg"
                alt="Clean natural environment reflecting mission"
                width={560}
                height={360}
                className="h-full w-full object-cover"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
