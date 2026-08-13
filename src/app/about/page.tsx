"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AboutHero from "./components/AboutHero";
import CompanyOverview from "./components/CompanyOverview";
import VisionMission from "./components/VisionMission";
import CoreValues from "./components/CoreValues";
import CeoMessage from "./components/CeoMessage";
import OurPresence from "./components/OurPresence";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white text-gray-800">
      <Navbar />
      <AboutHero />
      <CompanyOverview />
      <VisionMission />
      <CoreValues />
      <CeoMessage />
      <OurPresence />
      <Footer />
    </div>
  );
}
