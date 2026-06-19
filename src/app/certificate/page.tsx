'use client';

import dynamic from 'next/dynamic';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const PdfThumbnail = dynamic(() => import('@/components/PdfThumbnail'), { ssr: false });

const certifications = [
  {
    title: "ISO 9001:2015 Quality Management System",
    file: "ISO 9001 JIVO ENERGY PRIVATE LIMITED.pdf"
  },
  {
    title: "ISO 14001:2015 Environmental Management System",
    file: "ISO 14001 JIVO ENERGY PRIVATE LIMITED.pdf"
  },
  {
    title: "ISO 14064-1:2018 The Greenhouse Gases Part 1",
    file: "ISO 14064 JIVO ENERGY PRIVATE LIMITED.pdf"
  },
  {
    title: "ISO/IEC 27001:2022 Information Security Management System",
    file: "ISO 27001 JIVO ENERGY PRIVATE LIMITED.pdf"
  },
  {
    title: "ISO 20400:2017 Sustainable Procurement",
    file: "ISO 20400 JIVO ENERGY PRIVATE LIMITED.pdf"
  },
  {
    title: "ISO 31000:2018 Risk Management",
    file: "ISO 31000 JIVO ENERGY PRIVATE LIMITED.pdf"
  },
  {
    title: "ISO 37001:2016 Anti-Bribery Management System",
    file: "ISO 37001 JIVO ENERGY PRIVATE LIMITED.pdf"
  },
  {
    title: "ISO 45001:2018 Occupational Health & Safety Management System",
    file: "ISO 45001 JIVO ENERGY PRIVATE LIMITED.pdf"
  }
];

const Certificate = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative h-[60vh] w-full flex items-center justify-center overflow-hidden">
              <Image src="/assets/banners/Certifications.webp" alt="Certifications Banner"
                fill
                className="object-cover"
                priority
              />
              {/* <div className="absolute inset-0 bg-gradient-to-br from-[#085D36]/25 to-[#04301C]/25"></div>               */}
            </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-5">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {certifications.map((cert, index) => (
            <a 
              key={index}
              href={`/certifications/${cert.file}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col items-center text-center group cursor-pointer overflow-hidden"
            >
              <div className="w-full bg-gray-50 h-48 md:h-64 overflow-hidden flex items-start justify-center transition-colors group-hover:bg-white relative">
                <div className="scale-110 origin-top pt-4">
                  <PdfThumbnail file={`/certifications/${cert.file}`} width={300} />
                </div>
                <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-gray-50 group-hover:from-white to-transparent z-20" />
              </div>

              <div className="p-4 flex flex-col items-center flex-grow w-full border-t border-gray-50">
                <h3 className="text-sm font-bold text-[#062516] line-clamp-2 min-h-[40px]">
                  {cert.title}
                </h3>
              </div>
            </a>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Certificate;
