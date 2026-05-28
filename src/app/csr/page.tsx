"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";

export default function CSRPage() {
  const galleryImages = [
    "/gallery/kenya1.jpeg",
    "/gallery/liberia1.jpeg",
    "/gallery/sao1.jpg",
    "/gallery/achacape1.jpeg",
    "/gallery/maiocape1.jpeg",
    "/gallery/malawi2.JPG",
  ];

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-[60vh] w-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/bgjve.png"
            alt="CSR Background"
            fill
            className="object-cover brightness-50"
            priority
          />
        </div>
        <div className="relative z-10 container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            Giving Back to the Community
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            At JIVO Energy, we believe in creating impact beyond energy solutions, by supporting communities and contributing to a brighter future for all.
          </p>
        </div>
      </section>

      {/* Commitment Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="w-full md:w-1/2">
              <div className="relative h-[400px] w-full rounded-2xl overflow-hidden shadow-xl">
                 <Image
                    src="/gallery/liberia3.jpg" // Using a representative image
                    alt="CSR Activity"
                    fill
                    className="object-cover"
                 />
              </div>
            </div>
            <div className="w-full md:w-1/2">
              <h2 className="text-3xl font-bold text-[#085D36] mb-6">Our Commitment to Social Responsibility</h2>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">What CSR Means to Us</h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                At JIVO Energy, Corporate Social Responsibility (CSR) is an integral part of who we are. We believe that meaningful growth goes hand in hand with giving back to society. Our responsibility extends beyond business. We believe in empowering communities, supporting education, and contributing to social well-being.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Through our CSR initiatives, we aim to create a positive, lasting impact by partnering with volunteering organizations/NGOs that are making a real difference on the ground.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* First Initiative Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold text-[#085D36] mb-6">Our First Voluntary CSR Initiative</h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              As part of our commitment to social responsibility, JIVO Energy conducted its first voluntary CSR activity in collaboration with Dream Girl Foundation, an organization dedicated to supporting children from less fortunate backgrounds. This initiative was a meaningful step towards encouraging learning, nourishment, and hope among young students.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 items-center">
             <div className="bg-white p-8 rounded-xl shadow-md">
                <p className="text-gray-600 italic text-lg">
                  "The smiles, enthusiasm, and gratitude we witnessed reaffirmed our belief that even small actions can create meaningful change. This initiative strengthened our resolve to continue supporting community-driven causes and to build a culture of empathy and responsibility within JIVO Energy."
                </p>
             </div>
             <div className="relative h-[300px] rounded-xl overflow-hidden shadow-md">
                <Image
                   src="/gallery/kenya1.jpeg" // Placeholder for specific initiative image
                   alt="Dream Girl Foundation Initiative"
                   fill
                   className="object-cover"
                />
             </div>
          </div>
        </div>
      </section>

      {/* Photo Gallery Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-[#085D36] text-center mb-12">Gallery</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {galleryImages.map((src, index) => (
              <div key={index} className="relative h-64 rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 group">
                <Image
                  src={src}
                  alt={`CSR Gallery Image ${index + 1}`}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
