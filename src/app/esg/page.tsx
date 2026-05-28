"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";

export default function SustainabilityPage() {
  const galleryImages = [
    "/esg/1766384012371.jpg",
    "/esg/1766384012520.jpg",
    "/esg/1766384012528.jpg",
    "/esg/1766384012546.jpg",
    "/esg/1766384012549.jpg",

    "/esg/IMG_0478.jpg",
  ];

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      <section className="relative h-[60vh] w-full flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#085D36] to-[#04301C]">
        <div className="relative z-10 container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            Sustainability & Impact
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Creating lasting value through environmental stewardship, social responsibility, and strong governance.
          </p>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-[#085D36] mb-8">
              Our Commitment
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              At JIVO Energy, we believe that meaningful growth goes hand in hand with giving back to society. Environmental stewardship, social responsibility, and strong governance are embedded in how we operate and make decisions.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              These principles guide the development and delivery of our renewable energy solutions, ensuring we create lasting value for our communities, partners, and stakeholders worldwide while contributing to a brighter future for all.
            </p>
          </div>
        </div>
      </section>

      {/* QHSE Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="w-full md:w-1/2">
              <div className="relative h-[400px] w-full rounded-2xl overflow-hidden shadow-xl">
                 <Image
                    src="/QHSE.png"
                    alt="QHSE"
                    fill
                    className="object-cover"
                 />
              </div>
            </div>
            <div className="w-full md:w-1/2">
              <h3 className="text-3xl font-bold text-[#085D36] mb-6">QHSE</h3>
              <h4 className="text-xl font-semibold text-gray-800 mb-4">Quality, Health, Safety, and Environment</h4>
              <p className="text-gray-600 leading-relaxed mb-6">
                Quality, Health, Safety, and Environment (QHSE) are fundamental to JIVO’s project execution and operational culture. We are committed to delivering high-quality renewable energy projects while ensuring safe working conditions, environmental protection, and full compliance with applicable standards and regulations.
              </p>
              <p className="text-gray-600 leading-relaxed">
                We consistently apply robust quality standards, prioritize safe working environments, and protect the environment.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Social Responsibility Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row-reverse items-center gap-12">
            <div className="w-full md:w-1/2">
              <div className="relative h-[400px] w-full rounded-2xl overflow-hidden shadow-xl">
                 <Image
                    src="/Social.png"
                    alt="CSR Activity"
                    fill
                    className="object-cover"
                 />
              </div>
            </div>
            <div className="w-full md:w-1/2">
              <h2 className="text-3xl font-bold text-[#085D36] mb-6">Social Responsibility</h2>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Empowering Communities</h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                Our responsibility extends beyond business. We believe in empowering communities, supporting education, and contributing to social well-being.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Through our CSR initiatives, we aim to create a positive, lasting impact by partnering with volunteering organizations/NGOs that are making a real difference on the ground.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Sustainability Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="w-full md:w-1/2">
               <div className="relative h-[400px] w-full rounded-2xl overflow-hidden shadow-xl">
                 <Image
                    src="/Sustainblity.png"
                    alt="Sustainability"
                    fill
                    className="object-cover"
                 />
              </div>
            </div>
            <div className="w-full md:w-1/2">
              <h3 className="text-3xl font-bold text-[#085D36] mb-6">Sustainability Focus</h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                Sustainability is integrated into JIVO Energy’s procurement and project delivery approach. Our procurement practices balance economic efficiency with environmental responsibility and social value, ensuring responsible decision-making across the entire project lifecycle.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Initiative Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold text-[#085D36] mb-6">Our First Voluntary CSR Initiative</h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              As part of our commitment to social responsibility, JIVO Energy conducted its first voluntary CSR activity in collaboration with Dream Girl Foundation, an organization dedicated to supporting children from less fortunate backgrounds. This initiative was a meaningful step towards encouraging learning, nourishment, and hope among young students.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 items-center">
             <div className="bg-gray-50 p-8 rounded-xl shadow-md border-l-4 border-[#085D36]">
                <p className="text-gray-600 italic text-lg">
                  "The smiles, enthusiasm, and gratitude we witnessed reaffirmed our belief that even small actions can create meaningful change. This initiative strengthened our resolve to continue supporting community-driven causes and to build a culture of empathy and responsibility within JIVO Energy."
                </p>
             </div>
             <div className="relative h-[300px] rounded-xl overflow-hidden shadow-md">
                <Image
                   src="/esg/1766384013654.jpg"
                   alt="Dream Girl Foundation Initiative"
                   fill
                   className="object-cover"
                />
             </div>
          </div>
        </div>
      </section>

      {/* Quality Assurance Section */}
      <section className="py-16 bg-[#085D36] text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-3xl font-bold mb-8">Quality Assurance</h3>
            <p className="text-lg opacity-90 leading-relaxed mb-8">
              At JIVO, Quality Assurance is embedded across every stage of our project lifecycle—from design and procurement to construction, commissioning, and operations. We apply structured quality control systems, rigorous inspections, and compliance checks to ensure all works, materials, and services meet defined technical specifications, industry standards, and regulatory requirements.
            </p>
            <p className="text-lg opacity-90 leading-relaxed">
              Through continuous monitoring, documentation, and corrective action processes, we ensure consistent project performance, reliability, and long-term value for our clients and stakeholders.
            </p>
          </div>
        </div>
      </section>

      {/* Environmental Social Metrics Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl font-bold text-[#085D36] mb-6">Environmental Social Metrics</h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                At JIVO, we track and manage environmental and social performance through defined metrics that support responsible project delivery and continuous improvement. Our approach includes monitoring resource efficiency, emissions reduction, waste management, health and safety performance, and community engagement outcomes across our operations.
              </p>
              <p className="text-gray-600 leading-relaxed">
                These metrics inform decision-making, ensure compliance with applicable standards, and reinforce transparency and accountability in how we manage environmental and social impacts throughout the project lifecycle.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-6 rounded-xl text-center shadow-sm hover:shadow-lg transition-shadow border border-gray-100">
                <div className="text-[#085D36] font-bold text-xl mb-2">Resource</div>
                <div className="text-sm text-gray-500">Efficiency</div>
              </div>
              <div className="bg-white p-6 rounded-xl text-center shadow-sm hover:shadow-lg transition-shadow border border-gray-100">
                <div className="text-[#085D36] font-bold text-xl mb-2">Emissions</div>
                <div className="text-sm text-gray-500">Reduction</div>
              </div>
              <div className="bg-white p-6 rounded-xl text-center shadow-sm hover:shadow-lg transition-shadow border border-gray-100">
                <div className="text-[#085D36] font-bold text-xl mb-2">Waste</div>
                <div className="text-sm text-gray-500">Management</div>
              </div>
              <div className="bg-white p-6 rounded-xl text-center shadow-sm hover:shadow-lg transition-shadow border border-gray-100">
                <div className="text-[#085D36] font-bold text-xl mb-2">Community</div>
                <div className="text-sm text-gray-500">Engagement</div>
              </div>
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
                  alt={`Sustainability Gallery Image ${index + 1}`}
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
