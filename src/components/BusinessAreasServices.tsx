"use client"
import Image, { StaticImageData } from 'next/image'
import Link from 'next/link'
import solarPV from '../../public/assets/solar-pv-1.jpg'
import BESS from '../../public/assets/bess.jpg'
import transmission from '../../public/assets/business-transmission.jpg'
import hybrid from '../../public/assets/hybrid-energy.jpg'
import biogas from '../../public/assets/business-biogas.jpg'
import wasteManagement from '../../public/assets/business-waste-mgmt.jpg'

interface Service {
  id: string
  title: string
  description: string
  image: StaticImageData
  href: string
}

interface BusinessAreasServicesProps {
  services?: Service[]
}

const DEFAULT_SERVICES: Service[] = [
  {
    id: 'solar-pv',
    title: 'Solar PV',
    description: 'A renewable energy technology that converts sunlight directly into electricity using photovoltaic panels.',
    image: solarPV,
    href: '/business-areas/solar-pv',
  },
  {
    id: 'bess',
    title: 'Battery Energy Storage Systems (BESS)',
    description: 'A system that stores electrical energy for later use, improving grid stability and energy reliability.',
    image: BESS,
    href: '/business-areas/bess',
  },
  {
    id: 'transmission',
    title: 'Transmission & Distribution',
    description: 'The infrastructure and networks responsible for delivering electricity from generation sources to end users.',
    image: transmission,
    href: '/business-areas/transmission-distribution',
  },
  {
    id: 'hybrid',
    title: 'Hybrid Energy Systems',
    description: 'Integrated energy solutions that combine multiple power sources to ensure efficient and reliable energy supply.',
    image: hybrid,
    href: '/business-areas/hybrid-energy',
  },
  {
    id: 'biogas',
    title: 'Biogas & Biomethane',
    description: 'Renewable fuels produced from organic waste through biological processes, providing sustainable alternatives to fossil fuels.',
    image: biogas,
    href: '/business-areas/biogas-biomethane',
  },
  {
    id: 'waste',
    title: 'Waste Management & Waste-to-Energy',
    description: 'Solutions that process, recycle, and convert waste materials into valuable energy and resources while minimizing environmental impact.',
    image: wasteManagement,
    href: '/business-areas/waste-management',
  },
]

export default function BusinessAreasServices({
  services = DEFAULT_SERVICES,
}: BusinessAreasServicesProps) {
  return (
    <section className="bg-pistachio-green py-12 md:py-16 our-services">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h3 className="section-title text-center text-[#062516]">Our Business Areas</h3>

        <div className="@container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {services.map((service) => (
            <Link
              href={service.href}
              key={service.id}
              className="h-full grid grid-rows-subgrid row-span-3"
              aria-label={service.title}
            >
              <div className="group grid grid-rows-subgrid row-span-3 gap-0 bg-white overflow-hidden rounded-2xl border border-[#dce9dc] shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                {/* Image */}
                <div className="relative h-56 w-full overflow-hidden">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover object-center"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>

                {/* Content */}
                <div className="px-6 py-6 text-left grid grid-rows-subgrid row-span-2 gap-0 items-start justify-items-center">
                  <h3 className="text-center text-lg md:text-xl font-semibold group-hover:text-[#085d36] transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="mt-3 text-sm md:text-base leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

