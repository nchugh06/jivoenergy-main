"use client"
import Image from "next/image"
import Navbar from "@/components/Navbar"
import About from "@/components/About"
import Projects from "@/components/Projects"
import Impact from "@/components/Impact"
import ContactForm from "@/components/ContactForm"
import Footer from "@/components/Footer"
import Media from "@/components/Media"
import MapViz from "@/components/MapViz"

export default function Home() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
      <div className="relative w-64 h-32 mb-8">
        <Image
          src="/logo1.png"
          alt="JIVO ENERGY"
          fill
          className="object-contain"
          priority
        />
      </div>

      {/* <h1 className="text-3xl md:text-5xl font-bold text-[#085D36] text-center">
        Site is under construction
      </h1> */}

      <Navbar />
      <main className="flex flex-col items-center w-full">
        <section id="hero-section" className="relative w-full h-[100vh] overflow-hidden">
          <div className="absolute inset-0 z-0">
            <MapViz />
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
