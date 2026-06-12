"use client"
import Image, { StaticImageData } from 'next/image'
import Link from 'next/link'
import { Info } from "lucide-react"
import solarPV from '../../public/assets/solar-pv-1.jpg'
import BESS from '../../public/gallery/MALAWI/1.jpg'
import transmission from '../../public/assets/business-transmission.jpg'
import hybrid from '../../public/assets/hybrid-energy.jpg'
import biogas from '../../public/assets/business-biogas.jpg'
import wasteManagement from '../../public/assets/business-waste-mgmt.jpg'

interface Service {
  id: string
  title: string
  image: StaticImageData
  href: string
}

interface BusinessAreasServicesProps {
  services?: Service[]
}

const DEFAULT_SERVICES: Service[] = [
  {
    id: "solar-pv",
    title: "Solar PV",
    image: solarPV,
    href: "/business-areas/solar-pv",
  },
  {
    id: "bess",
    title: "Battery Energy Storage Systems (BESS)",
    image: BESS,
    href: "/business-areas/bess",
  },
  {
    id: "transmission",
    title: "Transmission & Distribution",
    image: transmission,
    href: "/business-areas/transmission-distribution",
  },
  {
    id: "hybrid",
    title: "Hybrid Energy Systems",
    image: hybrid,
    href: "/business-areas/hybrid-energy",
  },
  {
    id: "biogas",
    title: "Biogas & Biomethane",
    image: biogas,
    href: "/business-areas/biogas-biomethane",
  },
  {
    id: "waste",
    title: "Waste Management & Waste-to-Energy",
    image: wasteManagement,
    href: "/business-areas/waste-management",
  },
]

export default function BusinessAreasServices({ services = DEFAULT_SERVICES }: BusinessAreasServicesProps) {
  return (
    <section className="py-16 md:py-24 our-services">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading - Centered */}
        <h2 className="section-title text-center text-white mb-16">
          Business Areas
        </h2>

        {/* Services Grid with Images */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <Link href={service.href} key={service.id}>
              <div className="group cursor-pointer h-full">
                {/* Image Container */}
                <div className="relative h-64 rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105 bg-gray-200">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-300"
                  />
                  
                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-black/40 transition-opacity duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <div className="rounded-full border-2 border-white flex items-center justify-center w-12 h-12">
                      <Info className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </div>

                {/* Service Name Below Image */}
                <div className="mt-4 text-center">
                  <h3 className="text-lg md:text-xl font-semibold text-white group-hover:text-[#C4D600] transition-colors duration-300">
                    {service.title}
                  </h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
