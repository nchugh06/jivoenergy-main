"use client"
import { useState } from "react"
import { Layers, User, Battery, Wrench, Briefcase, Info } from "lucide-react"
import Link from 'next/link';

interface Service {
  id: string
  title: string
  icon: React.ReactNode
  color: string
}

export default function Services() {
  const [hoveredService, setHoveredService] = useState<string | null>(null)

  const services: Service[] = [
    {
      id: "engineering",
      title: "Solar PV",
      icon: <Layers className="w-12 h-12" />,
      color: "bg-[#C4D600]",
    },
    {
      id: "battery",
      title: "Battery Energy Storage Systems (BESS)",
      icon: <Battery className="w-12 h-12" />,
      color: "bg-[#145f5a]",
    },
    {
      id: "development",
      title: "Transmission & Distribution",
      icon: <User className="w-12 h-12" />,
      color: "bg-[#1a8a8a]",
    },

    {
      id: "operation",
      title: "Hybrid Energy Systems",
      icon: <Wrench className="w-10 h-10" />,
      color: "bg-[#FFA500]",
    },
    {
      id: "consulting",
      title: "Biogas & Biomethane",
      icon: <Briefcase className="w-12 h-12" />,
      color: "bg-[#1BB5C4]",
    },
    {
      id: "management",
      title: "Waste Management & Waste-to-Energy",
      icon: <Briefcase className="w-12 h-12" />,
      color: "bg-[#C4D600]",
    },
  ]

  return (
    <section className="py-16 md:py-24 our-services">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading - Centered */}
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-12 text-center">
          Business Areas
        </h2>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4">
          {services.map((service) => (
            <div
              key={service.id}
              onMouseEnter={() => setHoveredService(service.id)}
              onMouseLeave={() => setHoveredService(null)}
              className={`${service.color} rounded-lg p-6 md:p-8 text-white transition-all duration-300 hover:shadow-lg cursor-pointer relative group`}
            >
              <Link href="/business-areas">
                {/* Icon */}
                <div className="mb-4 flex items-center justify-between">
                  <div className="opacity-90 group-hover:opacity-100 transition-opacity">
                    {service.icon}
                  </div>

                  {/* Info Icon - appears on hover */}
                  <div
                    className={`rounded-full border-2 border-white flex items-center justify-center w-8 h-8 transition-opacity duration-300 ${hoveredService === service.id ? "opacity-100" : "opacity-0"
                      }`}
                  >
                    <Info className="w-4 h-4" />
                  </div>
                </div>

                {/* Service Title */}
                <h3 className="text-lg md:text-xl font-semibold leading-tight whitespace-pre-line">
                  {service.title}
                </h3>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}