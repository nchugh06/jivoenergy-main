'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Linkedin } from 'lucide-react';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface TeamMember {
  name: string;
  role?: string;
  image: string;
  linkedin?: string;
}

const Team = () => {
  const mentor: TeamMember = {
    name: 'Rajesh Chugh',
    role: 'CEO',
    image: '/team/updated/Rajesh.jpg',
    linkedin: 'https://www.linkedin.com/in/rajeshchugh74/'
  };

  const cco: TeamMember = {
    name: 'Jorge Lascas',
    role: 'CCO',
    image: '/team/updated/Jorge.jpg',
    linkedin: 'https://www.linkedin.com/in/jorgemslascas/'
  };

  const projectDevelopment: TeamMember[] = [
    // { name: 'Jorge Lascas', image: '/team/updated/Jorge.jpg', linkedin: 'https://www.linkedin.com/in/jorgemslascas/' },
    { name: 'Beatrice', image: '/team/updated/Beatrice.jpg', linkedin: '' },
    { name: 'Nishank', image: '/team/updated/Nishank.jpg', linkedin: '' },
    { name: 'Naresh', image: '/team/updated/Naresh.jpg', linkedin: '' },
    { name: 'Ivan', image: '/team/updated/Ivan.JPG', linkedin: '' },
    { name: 'Samuel T', image: '/team/updated/SamuelT.jpg', linkedin: '' },
    { name: 'Francis', image: '/team/updated/Francis.jpg', linkedin: '' },
    { name: 'Eric', image: '/team/updated/Eric.jpg', linkedin: '' },



    // { name: 'Patrice Yamintare Kounkorgo', image: '/team/updated/Patrice.jpg', linkedin: 'https://www.linkedin.com/in/yamintare-patrice-kounkorgo-058405179/' },
    // { name: 'Boyd', image: '' },
  ];

  const projectExecution: TeamMember[] = [
    { name: 'Prayas', image: '/team/updated/Prayas.jpg', linkedin: '' },
    { name: 'Manvendra', image: '/team/updated/Manvendra.jpg', linkedin: '' },
    // { name: 'Ankit Srivastava', image: '/team/updated/Ankit.jpg', linkedin: 'https://www.linkedin.com/in/ankit-srivastava14/' },
    { name: 'Tushar', image: '/team/updated/Tushar.jpeg', linkedin: '' },
    { name: 'Vivek', image: '/team/updated/Vivek.jpg', linkedin: '' },
    { name: 'Samuel W', image: '/team/updated/Samuel.jpg', linkedin: '' },
    { name: 'Nitesh', image: '/team/updated/Nitesh.jpg', linkedin: '' },
    { name: 'Shashi', image: '/team/updated/Shashi.jpg', linkedin: '' },
    { name: 'Rohit', image: '/team/updated/Rohit.jpg', linkedin: '' },
    { name: 'Akshay', image: '/team/updated/Akahsy.png', linkedin: '' },
    { name: 'Pauline', image: '/team/updated/Pauline.jpg', linkedin: '' },
    // { name: 'Ashok Kumar', image: '/team/updated/Ashok.jpg', linkedin: 'https://www.linkedin.com/in/ashok-kumar-74a07064/' },    
    { name: 'Nitin', image: '/team/updated/Nitin.jpg', linkedin: '' },
    { name: 'Ravi', image: '/team/updated/Ravi.jpg', linkedin: '' },
    { name: 'Grace', image: '/team/updated/Grace.jpg', linkedin: '' },
    { name: 'Patrice', image: '/team/updated/Patrice-new.jpg', linkedin: '' },
    { name: 'Jaideep', image: '/team/updated/Jaideep.jpg', linkedin: '' },
    { name: 'Arun', image: '/team/updated/Arun.jpg', linkedin: '' },
  ];

  const projectSupport: TeamMember[] = [
  ];

  const projectCorporate: TeamMember[] = [
    { name: 'Ujwal', image: '/team/updated/Ujwal.jpg', linkedin: '' },
    { name: 'Aakanksha', image: '/team/updated/Aakanksha.jpg', linkedin: '' },
    { name: 'Geetika', image: '/team/updated/Geetika.jpg', linkedin: '' },
    { name: 'Abhishek', image: '/team/updated/Abhishek.jpg', linkedin: '' },
    { name: 'Chavvi', image: '/team/updated/Chavvi.jpg', linkedin: '' },
    // { name: 'Harshit', image: '/team/updated/Harshit.jpg', linkedin: '' },
    { name: 'Anuradha', image: '/team/updated/Anuradha.jpg', linkedin: '' },
    { name: 'Monika', image: '/team/updated/Monika.jpg', linkedin: '' },
    { name: 'Gayatri', image: '/team/updated/Gayatri.jpg', linkedin: '' },
    { name: 'Dikshita', image: '/team/updated/Dikshita.jpg', linkedin: '' },
    { name: 'Radhika', image: '/team/updated/Radhika.jpg', linkedin: '' },
    // { name: 'Shivalika Nagpal', image: '/team/updated/Shivalika.jpg', linkedin: 'https://www.linkedin.com/in/shivalikanagpal/' },
    { name: 'Martha', image: '/team/updated/Martha.jpg', linkedin: '' },
    // { name: 'Nidhi', image: '/team/updated/nidhi.jpg' },
    // { name: 'Chavvi Ahuja', image: '/team/updated/Chavvi.jpg', linkedin: 'https://www.linkedin.com/in/chavvi-ahuja-68507b20a/' },
    // { name: 'Harshit', image: '' },
  ];

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

      <div className="text-center mt-2 max-w-[120px]">
        <h3 className={`font-bold text-[#062516] ${size === 'large' ? 'text-base' : 'text-xs md:text-sm'} leading-tight`}>
          {member.name.split(' ')[0]}
        </h3>
      </div>
    </MotionDiv>
  );

  return (
    <div className="min-h-screen bg-white font-sans selection:bg-[#175d33] selection:text-[#062516] overflow-x-hidden">
      <Navbar />

      <div className="container mx-auto px-4 py-8 md:py-12 mt-20">

        {/* Mentor Leader */}
        <motion.div
          className="flex flex-col items-center mt-20 mb-5"
        >
          <div
            className="relative w-28 h-28 md:w-32 md:h-32 overflow-hidden rounded-full shadow-xl cursor-pointer group mb-4"
            onClick={() => mentor.linkedin && window.open(mentor.linkedin, '_blank')}
          >
            {/* border-4 border-[#175d33] */}
            <Image src={mentor.image} alt={mentor.name} fill quality={100} sizes="(max-width: 768px) 112px, 128px" className="object-cover object-top transition-transform group-hover:scale-110" />
            <div className="absolute inset-0 bg-[#062516]/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <Linkedin className="w-10 h-10 text-white" />
            </div>
          </div>
          <div className="text-center">
            <h1 className="text-2xl md:text-3xl font-black text-[#062516]">{mentor.name}</h1>
            <h2 className="text-center">{mentor.role}</h2>
          </div>
        </motion.div>

        {/* CCO */}
        <motion.div
          className="flex flex-col items-center mt-20 mb-5"
        >
          <div
            className="relative w-28 h-28 md:w-32 md:h-32 overflow-hidden rounded-full shadow-xl cursor-pointer group mb-4"
            onClick={() => cco.linkedin && window.open(cco.linkedin, '_blank')}
          >
            {/* border-4 border-[#175d33] */}
            <Image src={cco.image} alt={cco.name} fill quality={100} sizes="(max-width: 768px) 112px, 128px" className="object-cover object-top transition-transform group-hover:scale-110" />
            <div className="absolute inset-0 bg-[#062516]/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <Linkedin className="w-10 h-10 text-white" />
            </div>
          </div>
          <div className="text-center">
            <h1 className="text-2xl md:text-3xl font-black text-[#062516]">{cco.name}</h1>
            <h2 className="text-center">{cco.role}</h2>
          </div>
        </motion.div>


        <div className="space-y-12 max-w-7xl mx-auto">
          {/* Project Execution */}
          <section>
            <h3 className="text-sm md:text-base font-black text-[#062516]/40 uppercase tracking-[0.3em] text-center mb-8 border-b border-gray-100 pb-2">
              Execution
            </h3>
            <MotionDiv
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="flex flex-wrap justify-center gap-0 md:gap-0"
            >
              {projectExecution.map((member, index) => (
                <MemberCard key={index} member={member} size="small" />
              ))}
            </MotionDiv>
          </section>

          {/* Project Development */}
          <section>
            <h3 className="text-sm md:text-base font-black text-[#062516]/40 uppercase tracking-[0.3em] text-center mb-8 border-b border-gray-100 pb-2">Development</h3>
            <MotionDiv
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="flex flex-wrap justify-center gap-0 md:gap-0"
            >
              {projectDevelopment.map((member, index) => (
                <MemberCard key={index} member={member} size="small" />
              ))}
            </MotionDiv>
          </section>

          {/* Project Support */}
          {/* <section className='mb-10'>
            <h3 className="text-sm md:text-base font-black text-[#062516]/40 uppercase tracking-[0.3em] text-center mb-8 border-b border-gray-100 pb-2">Support</h3>
            <MotionDiv
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="flex flex-wrap justify-center gap-0 md:gap-0"
            >
              {projectSupport.map((member, index) => (
                <MemberCard key={index} member={member} size="small" />
              ))}
            </MotionDiv>
          </section> */}

          {/* Project Corporate */}
          <section className='mb-10'>
            <h3 className="text-sm md:text-base font-black text-[#062516]/40 uppercase tracking-[0.3em] text-center mb-8 border-b border-gray-100 pb-2">Corporate</h3>
            <MotionDiv
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="flex flex-wrap justify-center gap-0 md:gap-0"
            >
              {projectCorporate.map((member, index) => (
                <MemberCard key={index} member={member} size="small" />
              ))}
            </MotionDiv>
          </section>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Team;
