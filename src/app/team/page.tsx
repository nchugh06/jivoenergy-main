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
    role: 'The Mentor Leader',
    image: '/team/Rajesh.jpg',
    linkedin: 'https://www.linkedin.com/in/rajeshchugh74/'
  };

  const projectDevelopment: TeamMember[] = [
    { name: 'Jorge Lascas', image: '/team/Jorge.jpg', linkedin: 'https://www.linkedin.com/in/jorgemslascas/' },
    { name: 'Ivan', image: '/team/Ivan.JPG', linkedin: 'https://www.linkedin.com/in/ivan-muyomba-a61796143?utm_source=share_via&utm_content=profile&utm_medium=member_android' },
    { name: 'Beatrice Kithinji', image: '/team/Beatrice.jpg', linkedin: 'https://www.linkedin.com/in/beatrice-kithinji-mba-30aa448a/' },
    { name: 'Nishank Madaan', image: '/team/Nishank.jpg', linkedin: 'https://www.linkedin.com/in/nishank-madaan-658177146/' },
    { name: 'Naresh Kumar Singh Ghorla', image: '/team/Naresh.jpg', linkedin: 'https://www.linkedin.com/in/naresh-ghorla-805222150/' },
    // { name: 'Patrice Yamintare Kounkorgo', image: '/team/Patrice.jpg', linkedin: 'https://www.linkedin.com/in/yamintare-patrice-kounkorgo-058405179/' },
    // { name: 'Boyd', image: '' },
  ];

  const projectExecution: TeamMember[] = [
    { name: 'Prayas Gupta', image: '/team/Prayas.jpg', linkedin: 'https://www.linkedin.com/in/preyas-gupta/' },
    // { name: 'Ankit Srivastava', image: '/team/Ankit.jpg', linkedin: 'https://www.linkedin.com/in/ankit-srivastava14/' },
    { name: 'Rohit Shivaji Nalavade', image: '/team/Rohit.jpg', linkedin: 'https://www.linkedin.com/in/rohit-nalavade-8a6780395/' },
    { name: 'Nitesh Kumar', image: '/team/Nitesh.jpg', linkedin: 'https://www.linkedin.com/in/nitesh-jangra-a9567a278/' },
    { name: 'Tushar Saurabh', image: '/team/Tushar.jpeg', linkedin: 'https://www.linkedin.com/in/tushar-saurabh-02b5277b/' },
    { name: 'Shashi Kumar', image: '/team/Shashi.jpg', linkedin: 'https://www.linkedin.com/in/shashi-kumar-87449b148/' },
    { name: 'Vivek Gupta', image: '/team/Vivek.jpg', linkedin: 'https://www.linkedin.com/in/vivek-vikram-56470a127/' },
    { name: 'Pauline Wambui Wachira', image: '/team/Pauline.jpg', linkedin: 'https://www.linkedin.com/in/pauline-wachira-9597a777/?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app' },
    { name: 'Ashok Kumar', image: '/team/Ashok.jpg', linkedin: 'https://www.linkedin.com/in/ashok-kumar-74a07064/' },
    { name: 'Akshay Sharma', image: '/team/Akahsy.png', linkedin: 'https://www.linkedin.com/in/akshay-sharma-12b8b79a/?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app' },
    { name: 'Nitin Kumar', image: '/team/Nitin.jpg', linkedin: 'https://www.linkedin.com/in/nitin-kumar-195675157/' },
    { name: 'Samuel Walusimbi', image: '/team/Samuel.jpg', linkedin: 'https://www.linkedin.com/in/samuel-walusimbi-k/' },
    // { name: 'Alfred', image: '/team/Alfred.jpg' },
  ];

  const projectSupport: TeamMember[] = [
    { name: 'Manvendra Singh Hada', image: '/team/Manvendra.jpg', linkedin: 'https://www.linkedin.com/in/hadamanvendrasingh/' },
    { name: 'Narendra', image: '/team/Narendra.jpg', linkedin: 'https://www.linkedin.com/in/narendra-mishra-b6a64561/' },
    { name: 'Ravi Kumar', image: '/team/Ravi.jpg', linkedin: 'https://www.linkedin.com/in/ravi-kumar-yadav-36812a308/' },
    { name: 'Jaideep', image: '/team/Jaideep.jpg', linkedin: 'https://www.linkedin.com/in/jaideep-dhillon-a0440b398/' },
    { name: 'Eric', image: '/team/Eric.jpg', linkedin: 'https://www.linkedin.com/in/eric-masai-a8b79b84/' },
    { name: 'Arun Kumar', image: '/team/Arun.jpg', linkedin: 'https://www.linkedin.com/in/arun-sharma-b5504918b/' },
  ];

  const projectCorporate: TeamMember[] = [
    { name: 'Ujwal Arora', image: '/team/Ujwal.jpg', linkedin: 'https://www.linkedin.com/in/ca-ujwal-arora-6481108b/' },
    { name: 'Aakanksha', image: '/team/Aakanksha.jpg', linkedin: 'https://www.linkedin.com/in/aakankshachugh/' },
    { name: 'Geetika Sondhi', image: '/team/Geetika.jpg', linkedin: 'https://www.linkedin.com/in/geetika-sondhi-82274520/' },
    { name: 'Abhishek Batra', image: '/team/Abhishek.jpg', linkedin: 'https://www.linkedin.com/in/caabhishekbatra/' },
    { name: 'Chavvi Ahuja', image: '/team/Chavvi.jpg', linkedin: 'https://www.linkedin.com/in/chavvi-ahuja-68507b20a/' },
    { name: 'Gayatri Mudgil', image: '/team/Gayatri.jpg', linkedin: 'https://www.linkedin.com/in/gayatri-m-92122918b/' },
    { name: 'Dikshita', image: '/team/Dikshita.jpg', linkedin: 'https://www.linkedin.com/in/dikshita-y-7aa3b7110/' },
    { name: 'Anuradha Nehra', image: '/team/Anuradha.jpg', linkedin: 'https://www.linkedin.com/in/graphologistanuradha/' },
    // { name: 'Shivalika Nagpal', image: '/team/Shivalika.jpg', linkedin: 'https://www.linkedin.com/in/shivalikanagpal/' },
    { name: 'Ainemigisha Martha Tukahirwa Flavia', image: '/team/Martha.jpg', linkedin: 'https://www.linkedin.com/in/martha-ainemigisha-a6a2b4238/' },
    // { name: 'Nidhi', image: '/team/nidhi.jpg' },
    // { name: 'Chavvi Ahuja', image: '/team/Chavvi.jpg', linkedin: 'https://www.linkedin.com/in/chavvi-ahuja-68507b20a/' },
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
            className="object-cover object-top transition-transform duration-700 group-hover:scale-110"
            sizes="100px"
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
            <Image src={mentor.image} alt={mentor.name} fill className="object-cover object-top transition-transform group-hover:scale-110" />
            <div className="absolute inset-0 bg-[#062516]/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <Linkedin className="w-10 h-10 text-white" />
            </div>
          </div>
          <div className="text-center">
            <h1 className="text-2xl md:text-3xl font-black text-[#062516]">{mentor.name}</h1>
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
          <section className='mb-10'>
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
          </section>

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
