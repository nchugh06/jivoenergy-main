"use client"
import Image from "next/image"
import Navbar from "@/components/Navbar"
import About from "@/components/About"
import Projects from "@/components/Projects"
//import Services from "@/components/services"
import CoreValues from "@/components/CoreValues"
import Impact from "@/components/Impact"
import ContactForm from "@/components/ContactForm"
import Footer from "@/components/Footer"
import Media from "@/components/Media"
import Clients from "@/components/Clients"
// import MapViz from "@/components/MapViz"
import GlobeViz from "@/components/GlobeViz";
import BusinessAreasServices from '@/components/BusinessAreasServices';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="flex flex-col w-full">
        <section id="hero-section" className="relative w-full h-[100vh] overflow-hidden">
          <div className="absolute inset-0 z-0">
            {/* <MapViz /> */}
            <GlobeViz />
          </div>
        </section>
        <About />
        {/* <Projects /> */}
        <CoreValues />
        <BusinessAreasServices />
        {/* <Impact /> */}
        {/* <Media /> */}
        <Clients />
        <ContactForm />
      </main>
      <Footer />
    </div>
  )
}
