'use client';

import React, { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Image from 'next/image';
import { motion, useReducedMotion, type Variants } from 'framer-motion';
import { Partner, PARTNER_SECTIONS } from '@/types/partner';

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.08,
    },
  },
};

const headingVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: 'easeOut' },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 28, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.45, ease: 'easeOut' },
  },
};

const Partners = () => {
  const reduceMotion = useReducedMotion();
  const [partners, setPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      try {
        const res = await fetch('/api/partners', { cache: 'no-store' });
        if (!res.ok) throw new Error('Failed to load partners');
        const data = await res.json();
        if (!cancelled) setPartners(data.items || []);
      } catch (error) {
        console.error('Error loading partners:', error);
        if (!cancelled) setPartners([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    load();
    return () => {
      cancelled = true;
    };
  }, []);

  const renderSection = (title: string, items: Partner[]) => {
    if (!items.length) return null;
    const isFinancersSection = title === 'Financers';

    return (
    <div className={`mb-16 ${isFinancersSection ? 'bg-[#F5FBF5] py-10 px-4 sm:px-8 -mx-4 sm:mx-0' : ''}`}>
      <motion.div
        initial={reduceMotion ? false : 'hidden'}
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        variants={containerVariants}
      >
        <motion.h3
          variants={headingVariants}
          className="section-title-spl text-center text-[#062516] mb-10"
        >
          {title}
        </motion.h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6 justify-items-center items-center">
          {items.map((partner) => (
            <motion.div
              key={partner.id}
              variants={itemVariants}
              whileHover={reduceMotion ? undefined : { y: -6, scale: 1.03 }}
              transition={{ type: 'spring', stiffness: 320, damping: 22 }}
              className="group w-full h-32 relative p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100 flex items-center justify-center"
            >
              <Image
                src={partner.image}
                alt={partner.name || `${title} Partner`}
                fill
                className="object-contain p-2 transition-transform duration-500 group-hover:scale-105"
                quality={100}
              />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
    );
  };

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <Navbar />
      
      {/* Hero Section */}
      <section className="page-hero">
              <motion.div
                className="absolute inset-0"
                initial={reduceMotion ? false : { scale: 1.08 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
              >
                <Image
                  src="/assets/banners/Partners.jpg"
                  alt="Partners Banner"
                  fill
                  className="object-cover"
                  priority
                />
              </motion.div>
              {/* <div className="absolute inset-0 bg-gradient-to-br from-[#085D36]/25 to-[#04301C]/25"></div> */}
            </section>

      {/* Main Partnership Content */}
      <div className="max-w-7xl mx-auto px-4 py-5">
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-10 h-10 border-4 border-[#062516] border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          PARTNER_SECTIONS.map((section) => (
            <React.Fragment key={section.id}>
              {renderSection(
                section.label,
                partners.filter((partner) => partner.section === section.id)
              )}
            </React.Fragment>
          ))
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Partners;
