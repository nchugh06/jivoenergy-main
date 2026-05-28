"use client"
import Image from "next/image"
import Navbar from "@/components/Navbar"
import About from "@/components/About"
import Projects from "@/components/Projects"
import Impact from "@/components/Impact"
import ContactForm from "@/components/ContactForm"
import Footer from "@/components/Footer"
import Media from "@/components/Media"
import GlobeViz from "@/components/GlobeViz";
import GreenGlobe from "@/components/GreenGlobe";

export default function Home() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
        
      
      <Navbar />
      <main className="flex flex-col items-center w-full">
        <section id="hero-section" className="relative w-full h-[100vh] overflow-hidden bg-black">
          <div className="absolute inset-0 z-0 hidden md:block">
            <GlobeViz />
          </div>
          <div className="absolute inset-0 z-0 block md:hidden bg-[#062516]">
            <GlobeViz />
          </div>

          
        </section>
        <About />
        <Projects />
        <Impact />
        <Media />
        <ContactForm />
      </main>
      <Footer /> 
     
    </div>

  )
}
