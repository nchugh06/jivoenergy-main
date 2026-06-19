"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";

export default function Capabilities() {
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

      <section className="relative h-[60vh] w-full flex items-center justify-center overflow-hidden">
        <Image
          src="/assets/banners/capabilities.webp"
          alt="Capabilities Banner"
          fill
          className="object-cover"
          priority
        />
        {/* <div className="absolute inset-0 bg-gradient-to-br from-[#085D36]/25 to-[#04301C]/25"></div>
        <div className="relative z-10 container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            Our Capabilities
          </h1>
           <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Creating lasting value through environmental stewardship, social responsibility, and strong governance.
          </p> 
        </div> */}
      </section>

      {/* Introduction Section */}
      <section className="py-5">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            {/* <h2 className="text-3xl md:text-4xl font-bold text-[#085D36] mb-8">
              Our Capabilities
            </h2> */}
            <p className="text-gray-700 leading-relaxed mb-6">
              JIVO Energy delivers integrated energy and infrastructure solutions across the renewable energy, power, and sustainability sectors, supporting utilities, governments, industries, commercial enterprises, and development organizations across emerging markets. With expertise spanning project development, engineering, EPC execution, digital energy integration, and long-term operational support, we develop reliable, scalable, and future-ready infrastructure tailored to complex operating environments.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Our multidisciplinary capabilities enable successful execution of utility-scale, industrial, commercial, rural electrification, and hybrid energy projects across grid-connected, weak-grid, and off-grid applications. By combining technical excellence, advanced power system engineering, and sustainable infrastructure development, JIVO Energy supports energy transition and modernization initiatives across Africa and other developing regions.
            </p>            
          </div>
        </div>
      </section>

{/* Initiative Section */}
      <section>
        <div className="container mx-auto px-4">
          
          <div className="grid md:grid-cols-2 gap-8 items-center">
             <div className="bg-gray-50 p-8 rounded-xl shadow-md border-l-4 border-[#085D36]">
                <h2 className="section-title text-[#085D36] mb-6">Core Capabilities</h2>
                <p className="text-gray-600 italic text-lg">
                  <ul className="list-disc list-inside space-y-2">
                    <li>Utility-scale renewable energy infrastructure</li>
                    <li>Solar PV & hybrid power systems</li>
                    <li>Battery Energy Storage Systems (BESS)</li>
                    <li>Grid integration & power evacuation systems</li>
                    <li>LV, MV, HV & EHV infrastructure</li>
                    <li>SCADA, EMS & digital energy integration</li>
                    <li>Power system studies & grid compliance</li>
                    <li>Waste-to-energy & biogas infrastructure</li>
                    <li>EPC execution & project management</li>
                    <li>Technical consulting & engineering services</li>
                    <li>Operations & maintenance support</li>
                  </ul>
                </p>
             </div>
             <div className="bg-green-50 p-8 rounded-xl shadow-md border-l-4 border-[#085D36]">
                <h2 className="text-3xl font-bold text-[#085D36] mb-6">Our Approach</h2>
                <p className="text-gray-600 italic text-lg">
                  At JIVO Energy, we combine engineering expertise, technical innovation, operational excellence, and sustainable development principles to deliver impactful energy infrastructure solutions across diverse markets and operating environments. Our approach focuses on technical reliability, execution efficiency, environmental responsibility, and long-term value creation while supporting energy security, grid modernization, and sustainable economic growth.<br></br><br></br><br></br>
              By integrating advanced engineering practices, intelligent energy systems, and scalable infrastructure solutions, we deliver resilient and future-ready projects tailored to evolving energy demands and local market requirements.
                </p>
             </div>
          </div>
        </div>
      </section>

      {/* QHSE Section */}
      <section className="py-16 bg-gray-50">        
        <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-[#085D36] mb-8 text-center">
              What We Do
            </h2>
          <div className="flex flex-col md:flex-row items-center gap-12">            
            
            <div className="w-full">
              <h3 className="text-3xl font-bold text-[#085D36] mb-6">Project Development</h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                JIVO Energy identifies, evaluates, and develops technically and commercially viable energy infrastructure opportunities from concept development through financial close and project implementation. Our development capabilities include resource assessment, technical feasibility studies, environmental and social evaluations, permitting support, stakeholder engagement, land assessment, project structuring, and bankability support for utility-scale and decentralized energy projects.
              </p>
              <h4 className="text-xl font-semibold text-gray-800 mb-4">Key Capabilities</h4>
              <p className="text-gray-600 leading-relaxed">
                <ul className="list-disc list-inside space-y-2">
                  <li>Feasibility studies & technical due diligence</li>
                  <li>Site assessment & resource analysis</li>
                  <li>Project structuring & development support</li>
                  <li>Regulatory coordination & permitting</li>
                  <li>Environmental & social assessments</li>
                  <li>Financial modelling & bankability support</li>
                </ul>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Social Responsibility Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row-reverse items-center gap-12">
            
            <div className="w-full">
              <h2 className="text-3xl font-bold text-[#085D36] mb-6">Engineering & Technical Expertise</h2>              
              <p className="text-gray-600 leading-relaxed mb-6">
                Our engineering capabilities cover power system engineering, infrastructure planning, technology integration, system optimization, and customized energy solutions designed to meet specific operational, environmental, and grid requirements. We provide technically optimized designs focused on reliability, efficiency, scalability, and long-term operational performance.
              </p>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Key Capabilities</h3>
              <p className="text-gray-600 leading-relaxed">
                <ul className="list-disc list-inside space-y-2">
                  <li>Electrical, civil & power system engineering</li>
                  <li>Detailed engineering & design optimization</li>
                  <li>Load flow, short circuit & stability studies</li>
                  <li>Protection coordination & relay engineering</li>
                  <li>Earthing & lightning protection design</li>
                  <li>SCADA, EMS, PMS & automation systems</li>
                  <li>Grid compliance & interconnection studies</li>
                  <li>Renewable energy integration engineering</li>
                </ul>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Sustainability Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-12">            
            <div className="w-full">
            <h2 className="text-3xl font-bold text-[#085D36] mb-6">EPC & Project Execution</h2> 
              <p className="text-gray-600 leading-relaxed mb-6">
                JIVO Energy delivers comprehensive Engineering, Procurement, and Construction (EPC) solutions for renewable energy, power, and infrastructure projects with strong focus on quality, safety, technical compliance, execution efficiency, and timely delivery. Our EPC capabilities cover procurement, construction management, installation, testing, commissioning, and energization across complex utility and industrial infrastructure projects.
              </p>
              <h3 className="text-3xl font-bold text-[#085D36] mb-6">Key Capabilities</h3>
              <p className="text-gray-600 leading-relaxed">
                <ul className="list-disc list-inside space-y-2">
                  <li>End-to-end EPC project delivery</li>
                  <li>Procurement & supply chain management</li>
                  <li>Construction supervision & QA/QC</li>
                  <li>Utility-scale installation & integration</li>
                  <li>Testing, commissioning & energization</li>
                  <li>HSE management & compliance</li>
                  <li>Project scheduling & execution control</li>
                </ul>
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row-reverse items-center gap-12">            
            <div className="w-full">
              <h2 className="text-3xl font-bold text-[#085D36] mb-6">Energy Infrastructure Integration</h2>              
              <p className="text-gray-600 leading-relaxed mb-6">
                We specialize in integrating renewable energy systems with utility infrastructure, transmission networks, substations, and industrial power systems to improve grid stability, power quality, operational efficiency, and long-term energy reliability. Our expertise includes grid modernization, power evacuation systems, intelligent substations, and advanced digital integration technologies.
              </p>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Key Capabilities</h3>
              <p className="text-gray-600 leading-relaxed">
                <ul className="list-disc list-inside space-y-2">
                  <li>Grid integration & synchronization</li>
                  <li>Transmission & distribution infrastructure</li>
                  <li>AIS/GIS substations & switchyards</li>
                  <li>Renewable power evacuation systems</li>
                  <li>IEC 61850 & digital substation integration</li>
                  <li>Metering, protection & automation systems</li>
                  <li>SCADA & communication architecture</li>
                </ul>
              </p>
            </div>
          </div>
        </div>
      </section>
      
<section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-12">            
            <div className="w-full">
            <h2 className="text-3xl font-bold text-[#085D36] mb-6">Sustainable & Future-Ready Solutions</h2> 
              <p className="text-gray-600 leading-relaxed mb-6">
                JIVO Energy develops sustainable infrastructure solutions supporting clean energy transition, resource optimization, carbon reduction, and circular economy initiatives. Our approach combines renewable energy technologies, intelligent infrastructure, and environmentally responsible engineering practices to deliver resilient and future-ready energy ecosystems.
              </p>
              <h3 className="text-3xl font-bold text-[#085D36] mb-6">Key Capabilities</h3>
              <p className="text-gray-600 leading-relaxed">
                <ul className="list-disc list-inside space-y-2">
                  <li>Battery Energy Storage Systems (BESS)</li>
                  <li>Hybrid energy & microgrid systems</li>
                  <li>Waste-to-energy infrastructure</li>
                  <li>Biogas & biomethane solutions</li>
                  <li>Renewable energy optimization</li>
                  <li>Sustainable infrastructure development</li>
                  <li>Low-carbon & circular economy solutions</li>
                </ul>
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row-reverse items-center gap-12">            
            <div className="w-full">
              <h2 className="text-3xl font-bold text-[#085D36] mb-6">Operations & Maintenance</h2>              
              <p className="text-gray-600 leading-relaxed mb-6">
                We provide comprehensive operations and maintenance services focused on maximizing asset performance, operational availability, energy yield, equipment reliability, and lifecycle value. Our O&M services combine preventive maintenance, condition monitoring, diagnostics, and digital performance analytics to support long-term operational excellence.
              </p>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Key Capabilities</h3>
              <p className="text-gray-600 leading-relaxed">
                <ul className="list-disc list-inside space-y-2">
                  <li>Preventive & corrective maintenance</li>
                  <li>Performance monitoring & diagnostics</li>
<li>SCADA-enabled remote operations</li>
<li>Asset management & reporting</li>
<li>Reliability & efficiency optimization</li>
<li>Spare parts & technical support</li>
<li>Long-term operational services</li>
                </ul>
              </p>
            </div>
          </div>
        </div>
      </section>

      

      <Footer />
    </main>
  );
}