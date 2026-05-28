"use client"
import Image from "next/image"
import Navbar from "@/components/Navbar"
import Media from "@/components/Media"
import Footer from "@/components/Footer"

export default function Home() {
  return (
    <main className="relative min-h-screen w-full overflow-hidden">

        {/* Mobile Image */}
        <div className="block md:hidden relative w-full h-screen">
          <Image
            src="/wur-mobile.jpg"
            alt="JIVO ENERGY"
            fill
            className="object-cover"
            priority
            quality={100}
          />
        </div>
        
        {/* Desktop Image */}
        <div className="hidden md:block relative w-full h-screen">
          <Image
            src="/wur-desktop.jpg"
            alt="JIVO ENERGY"
            fill
            className="object-cover"
            priority
            quality={100}
          />
        </div>

       
    </main>
  )
}
