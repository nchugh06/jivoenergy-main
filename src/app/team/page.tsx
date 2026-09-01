'use client';

import React, { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Linkedin } from 'lucide-react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { TeamMember, TEAM_SECTIONS } from '@/types/team';

const Team = () => {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      try {
        const res = await fetch('/api/team', { cache: 'no-store' });
        if (!res.ok) throw new Error('Failed to load team');
        const data = await res.json();
        if (!cancelled) setMembers(data.items || []);
      } catch (error) {
        console.error('Error loading team:', error);
        if (!cancelled) setMembers([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    load();
    return () => {
      cancelled = true;
    };
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut" as const
      }
    }
  };

  const MotionDiv = motion.div as any;

  const MemberCard = ({ member, size = "large" }: { member: TeamMember, size?: "large" | "small" }) => (
    <MotionDiv
      variants={itemVariants}
      className="flex flex-col items-center group"
    >
      <div
        className={`relative ${size === 'large' ? 'w-32 h-32 md:w-48 md:h-48' : 'w-20 h-20 md:w-24 md:h-24'} overflow-hidden rounded-full bg-gray-100 shadow-sm transition-all duration-500 border-2 border-white group-hover:border-[#175d33] ${member.linkedin ? 'cursor-pointer' : ''}`}
        onClick={() => member.linkedin && window.open(member.linkedin, '_blank')}
      >
        {member.image ? (
          <Image
            src={member.image}
            alt={member.name}
            fill
            quality={100}
            className="object-cover object-top transition-transform duration-700 group-hover:scale-110"
            sizes={size === "large" ? "(max-width: 768px) 128px, 192px" : "(max-width: 768px) 80px, 96px"}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-[#062516]/5 text-[#062516]/20">
            <span className={`${size === 'large' ? 'text-4xl' : 'text-3xl'} font-bold font-serif`}>{member.name.charAt(0)}</span>
          </div>
        )}

        {member.linkedin && (
          <div className="absolute inset-0 bg-[#062516]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <Linkedin className="w-4 h-4 text-white" />
          </div>
        )}
      </div>

      <div className="text-center mt-2 max-w-[7.5rem] px-1">
        <h3 className={`font-bold text-[#062516] break-words ${size === 'large' ? 'text-base' : 'text-xs md:text-sm'} leading-tight`}>
          {member.name.split(' ')[0]}
        </h3>
      </div>
    </MotionDiv>
  );

  const leadership = members.filter((member) => member.section === 'leadership');
  const groupSections = TEAM_SECTIONS.filter((section) => section.id !== 'leadership');

  return (
    <div className="min-h-screen bg-white font-sans selection:bg-[#175d33] selection:text-[#062516] overflow-x-hidden">
      <Navbar />

      <div className="container mx-auto px-4 py-8 md:py-12 mt-20">
        {loading ? (
          <div className="flex justify-center py-24">
            <div className="w-10 h-10 border-4 border-[#062516] border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <>
            {leadership.map((member) => (
              <motion.div
                key={member.id}
                className="flex flex-col items-center mt-20 mb-5"
              >
                <div
                  className={`relative w-28 h-28 md:w-32 md:h-32 overflow-hidden rounded-full shadow-xl group mb-4 ${member.linkedin ? 'cursor-pointer' : ''}`}
                  onClick={() => member.linkedin && window.open(member.linkedin, '_blank')}
                >
                  {member.image ? (
                    <Image src={member.image} alt={member.name} fill quality={100} sizes="(max-width: 768px) 112px, 128px" className="object-cover object-top transition-transform group-hover:scale-110" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-[#062516]/5 text-[#062516]/20">
                      <span className="text-4xl font-bold font-serif">{member.name.charAt(0)}</span>
                    </div>
                  )}
                  {member.linkedin ? (
                    <div className="absolute inset-0 bg-[#062516]/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Linkedin className="w-10 h-10 text-white" />
                    </div>
                  ) : null}
                </div>
                <div className="text-center">
                  <h1 className="text-2xl md:text-3xl font-black text-[#062516]">{member.name}</h1>
                  {member.role ? <h2 className="text-center">{member.role}</h2> : null}
                </div>
              </motion.div>
            ))}

            <div className="space-y-12 max-w-7xl mx-auto">
              {groupSections.map((section) => {
                const sectionMembers = members.filter((member) => member.section === section.id);
                if (!sectionMembers.length) return null;
                return (
                  <section key={section.id} className={section.id === 'corporate' || section.id === 'support' ? 'mb-10' : undefined}>
                    <h3 className="text-sm md:text-base font-black text-[#062516]/40 uppercase tracking-[0.3em] text-center mb-8 border-b border-gray-100 pb-2">
                      {section.label}
                    </h3>
                    <MotionDiv
                      variants={containerVariants}
                      initial="hidden"
                      animate="visible"
                      className="flex flex-wrap justify-center gap-3 sm:gap-4"
                    >
                      {sectionMembers.map((member) => (
                        <MemberCard key={member.id} member={member} size="small" />
                      ))}
                    </MotionDiv>
                  </section>
                );
              })}
            </div>
          </>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Team;
