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
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="flex flex-col items-center w-full">
        {/* Hero section with MapViz positioned below navbar */}
        <section id="hero-section" className="relative w-full h-[100vh] overflow-hidden">
          {/* Map fills hero section */}
          <div className="absolute inset-0 z-0">
            <MapViz />
          </div>

          {/* Hero Content - uncomment if needed */}
          {/* <div className="absolute inset-0 z-30 flex flex-col items-center justify-center text-white">
            <div className="relative group mb-8">
              <div className="absolute -inset-1 bg-gradient-to-r from-[#4ADE80] to-[#22C55E] rounded-lg blur opacity-30 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
              <Image
                src="/translogo.png"
                alt="JIVO ENERGY"
                width={400}
                height={200}
                className="relative h-32 w-auto"
                priority
              />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-center mb-6 bg-clip-text text-transparent bg-gradient-to-r from-[#4ADE80] to-[#22C55E]">
              Powering Tomorrow's Energy
            </h1>
            <p className="text-xl md:text-2xl text-center max-w-3xl px-4 text-[#E2E8F0]">
              Leading the transition to sustainable energy solutions across the globe
            </p>
            <div className="mt-12 flex gap-4">
              <button className="px-8 py-3 rounded-lg bg-[#4ADE80] text-[#062516] font-semibold hover:bg-[#22C55E] transition-colors duration-200">
                Our Projects
              </button>
              <button className="px-8 py-3 rounded-lg border-2 border-[#4ADE80] text-[#4ADE80] font-semibold hover:bg-[#4ADE80]/10 transition-colors duration-200">
                Contact Us
              </button>
            </div>
          </div> */}
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
