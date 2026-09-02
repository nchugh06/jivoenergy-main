"use client";

import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import { motion, type Variants } from "framer-motion";
import PhotoSwipeLightbox from "photoswipe/lightbox";
import "photoswipe/style.css";
import "./esg.css";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.08,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 28, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.45, ease: "easeOut" },
  },
};

const galleryItemVariants: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.45, ease: "easeOut" },
  },
};

const metrics = [
  { title: "Resource", subtitle: "Efficiency" },
  { title: "Emissions", subtitle: "Reduction" },
  { title: "Waste", subtitle: "Management" },
  { title: "Community", subtitle: "Engagement" },
];

const galleryImages = [
  { src: "/esg/1766384012371.jpg", width: 1280, height: 720 },
  { src: "/esg/1766384012520.jpg", width: 960, height: 1280 },
  { src: "/esg/1766384012528.jpg", width: 960, height: 1280 },
  { src: "/esg/1766384012546.jpg", width: 963, height: 1280 },
  { src: "/esg/1766384012549.jpg", width: 960, height: 1280 },
  { src: "/esg/IMG_0478.jpg", width: 3520, height: 1980 },
  { src: "/esg/1766384013654.jpg", width: 1280, height: 960 },
];

export default function SustainabilityPage() {
  useEffect(() => {
    const lightbox = new PhotoSwipeLightbox({
      gallery: "#esg-gallery",
      children: "a",
      pswpModule: () => import("photoswipe"),
      padding: { top: 24, bottom: 40, left: 16, right: 16 },
      initialZoomLevel: "fit",
    });

    lightbox.init();
    return () => lightbox.destroy();
  }, []);

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      <section className="page-hero">
              <Image
                src="/assets/banners/ESG.jpg"
                alt="ESG Banner"
                fill
                className="object-cover"
                priority
              />
              {/* <div className="absolute inset-0 bg-gradient-to-br from-[#085D36]/25 to-[#04301C]/25"></div> */}
              
            </section>

      {/* Introduction Section */}
      <section className="py-5 md:py-5">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="section-title-spl section-title-lock text-center text-[#062516] mb-10">
              Our Commitment
            </h1>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
            >
              <p className="text-lg text-gray-700 mb-6">
                At <b>JIVO Energy</b>, we believe that meaningful growth goes hand in hand with giving back to society. Environmental stewardship, social responsibility, and strong governance are embedded in how we operate and make decisions.
              </p>
              <p className="text-lg text-gray-700">
                These principles guide the development and delivery of our renewable energy solutions, ensuring we create lasting value for our communities, partners, and stakeholders worldwide while contributing to a brighter future for all.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* QHSE Section */}
      <section className="py-16 bg-[#F5FBF5]">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <motion.div
              className="w-full md:w-1/2"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
            >
              <div className="relative h-[400px] w-full rounded-2xl overflow-hidden shadow-xl">
                 <Image
                    src="/esg/QHSE.jpg"
                    alt="QHSE"
                    fill
                    className="object-cover"
                 />
              </div>
            </motion.div>
            <motion.div
              className="w-full md:w-1/2"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
            >
              <h2 className="section-title section-title-lock text-[#062516]">QHSE</h2>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Quality, Health, Safety, and Environment</h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                Quality, Health, Safety, and Environment (QHSE) are fundamental to JIVO’s project execution and operational culture. We are committed to delivering high-quality renewable energy projects while ensuring safe working conditions, environmental protection, and full compliance with applicable standards and regulations.
              </p>
              <p className="text-gray-600 leading-relaxed">
                We consistently apply robust quality standards, prioritize safe working environments, and protect the environment.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Social Responsibility Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row-reverse items-center gap-12">
            <motion.div
              className="w-full md:w-1/2"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
            >
              <div className="relative h-[400px] w-full rounded-2xl overflow-hidden shadow-xl">
                 <Image
                    src="/esg/Social.jpg"
                    alt="CSR Activity"
                    fill
                    className="object-cover"
                 />
              </div>
            </motion.div>
            <motion.div
              className="w-full md:w-1/2"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
            >
              <h2 className="section-title section-title-lock text-[#062516] mb-6">Social Responsibility</h2>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Empowering Communities</h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                Our responsibility extends beyond business. We believe in empowering communities, supporting education, and contributing to social well-being.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Through our CSR initiatives, we aim to create a positive, lasting impact by partnering with volunteering organizations/NGOs that are making a real difference on the ground.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Sustainability Section */}
      <section className="py-16 bg-[#F5FBF5]">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <motion.div
              className="w-full md:w-1/2"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
            >
               <div className="relative h-[400px] w-full rounded-2xl overflow-hidden shadow-xl">
                 <Image
                    src="/esg/Sustainability.jpg"
                    alt="Sustainability"
                    fill
                    className="object-cover"
                 />
              </div>
            </motion.div>
            <motion.div
              className="w-full md:w-1/2"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
            >
              <h2 className="section-title section-title-lock text-[#062516] mb-6">Sustainability Focus</h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                Sustainability is integrated into JIVO Energy’s procurement and project delivery approach. Our procurement practices balance economic efficiency with environmental responsibility and social value, ensuring responsible decision-making across the entire project lifecycle.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Initiative Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="section-title section-title-lock text-center text-[#062516] mb-6">Our First Voluntary CSR Initiative</h2>
            <motion.p
              className="text-lg text-gray-700 leading-relaxed"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
            >
              As part of our commitment to social responsibility, JIVO Energy conducted its first voluntary CSR activity in collaboration with Dream Girl Foundation, an organization dedicated to supporting children from less fortunate backgrounds. This initiative was a meaningful step towards encouraging learning, nourishment, and hope among young students.
            </motion.p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 items-center">
             <motion.div
                className="bg-[#F5FBF5] p-8 rounded-xl shadow-md border-l-4 border-[#085D36]"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
             >
                <p className="text-gray-600 italic text-lg">
                  "The smiles, enthusiasm, and gratitude we witnessed reaffirmed our belief that even small actions can create meaningful change. This initiative strengthened our resolve to continue supporting community-driven causes and to build a culture of empathy and responsibility within JIVO Energy."
                </p>
             </motion.div>
             <motion.div
                className="relative h-[300px] rounded-xl overflow-hidden shadow-md"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
             >
                <Image
                   src="/esg/1766384013654.jpg"
                   alt="Dream Girl Foundation Initiative"
                   fill
                   className="object-cover"
                />
             </motion.div>
          </div>
        </div>
      </section>

      {/* Quality Assurance Section */}
      <section className="py-16 bg-[#F5FBF5]">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="section-title-spl section-title-lock text-[#062516] mb-8">Quality Assurance</h2>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
            >
              <p className="text-lg text-gray-700 leading-relaxed mb-8">
                At JIVO, Quality Assurance is embedded across every stage of our project lifecycle — from design and procurement to construction, commissioning, and operations. We apply structured quality control systems, rigorous inspections, and compliance checks to ensure all works, materials, and services meet defined technical specifications, industry standards, and regulatory requirements.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Through continuous monitoring, documentation, and corrective action processes, we ensure consistent project performance, reliability, and long-term value for our clients and stakeholders.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Environmental Social Metrics Section */}
      <section className="py-16 bg-[#ffffff]">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
            >
              <h2 className="section-title-spl section-title-lock text-[#062516] mb-6">Environmental Social Metrics</h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                At JIVO, we track and manage environmental and social performance through defined metrics that support responsible project delivery and continuous improvement. Our approach includes monitoring resource efficiency, emissions reduction, waste management, health and safety performance, and community engagement outcomes across our operations.
              </p>
              <p className="text-gray-600 leading-relaxed">
                These metrics inform decision-making, ensure compliance with applicable standards, and reinforce transparency and accountability in how we manage environmental and social impacts throughout the project lifecycle.
              </p>
            </motion.div>
            <motion.div
              className="grid grid-cols-2 gap-4"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={staggerContainer}
            >
              {metrics.map((metric) => (
                <motion.div
                  key={metric.title}
                  variants={cardVariants}
                  whileHover={{ y: -6, scale: 1.03 }}
                  transition={{ type: "spring", stiffness: 320, damping: 22 }}
                  className="bg-white p-6 rounded-xl text-center shadow-sm hover:shadow-lg transition-shadow border border-gray-100"
                >
                  <div className="text-[#085D36] font-bold text-xl mb-2">{metric.title}</div>
                  <div className="text-sm text-gray-500">{metric.subtitle}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Photo Gallery Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="section-title-spl section-title-lock text-[#062516] text-center mb-12">Gallery</h2>
          <motion.div
            id="esg-gallery"
            className="esg-gallery"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={staggerContainer}
          >
            {galleryImages.map((image, index) => (
              <motion.div
                key={image.src}
                variants={galleryItemVariants}
                className="esg-gallery-item"
              >
                <a
                  href={image.src}
                  data-pswp-width={image.width}
                  data-pswp-height={image.height}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`Open gallery image ${index + 1}`}
                >
                  <Image
                    src={image.src}
                    alt={`Sustainability Gallery Image ${index + 1}`}
                    width={image.width}
                    height={image.height}
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="esg-gallery-image"
                  />
                </a>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
