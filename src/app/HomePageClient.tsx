"use client"
import Image from "next/image"
import Navbar from "@/components/Navbar"
import About from "@/components/About"
import Statistics from "@/components/Statistics"
import Projects from "@/components/Projects"
//import Services from "@/components/services"
import CoreValues from "@/components/CoreValues"
import Impact from "@/components/Impact"
import ContactForm from "@/components/ContactHome"
import Footer from "@/components/Footer"
import Media from "@/components/MediaHome"
import Clients from "@/components/Clients"
import Achievements from "@/components/Achievements"
//import MapViz from "@/components/MapViz";
import Map from "@/components/MapImage";
import HomeHeroSlider from "@/components/HomeHeroSlider";
import BusinessAreasServices from "@/components/BusinessAreasServices";
import AfricaPresenceMap from "@/components/AfricaPresenceMap";
import ProjectReviews from "@/components/ProjectReviews";



export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="flex flex-col w-full">
        <section id="hero-section" className="page-hero page-hero--home relative w-full overflow-hidden md:h-[85vh]">
          <div className="absolute inset-0 z-0">
            <HomeHeroSlider />
          </div>
        </section>
        <About />
        <Statistics />
        {/* <Projects /> */}
        {/* <CoreValues /> */}
        <BusinessAreasServices />
        <Clients />
        <ProjectReviews variant="home" />
        {/* <Impact /> */}
        {/* <Media /> */}
        <Achievements />
        <Media />
        {/* <section id="hero-section" className="relative w-full h-[100vh] overflow-hidden">
          <div className="absolute inset-0 z-0">
            <MapViz />
          </div>
        </section>       */}
        {/* <Map /> */}
        <AfricaPresenceMap />
        <ContactForm />
      </main>
      <Footer />
    </div>
  )
}
