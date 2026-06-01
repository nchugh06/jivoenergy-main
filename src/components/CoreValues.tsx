"use client"
import { useState, useEffect } from "react"
import Image from "next/image"
import { CheckCircle2, Sun, Shield, Lightbulb, Users, Zap } from "lucide-react"

interface CoreValue {
  id: string
  title: string
  description: string
}

const valueIcons = {
  quality: <Sun className="w-6 h-6 text-yellow-500" />,
  commitment: <Shield className="w-6 h-6 text-blue-600" />,
  relationships: <Users className="w-6 h-6 text-teal-600" />,
  efficiency: <Zap className="w-6 h-6 text-orange-500" />
}

const valuesList: CoreValue[] = [
  { id: "quality", title: "Quality", description: "We use only Tier 1 materials and maintain uncompromising standards across every project to ensure long-lasting performance, reliability, and safety." },
  { id: "commitment", title: "Commitment", description: "From initial planning to final execution, we are committed to delivering every project on time with precision, reliability, and seamless coordination, ensuring a smooth experience at every step." },
  { id: "relationships", title: "Relationships", description: "We believe strong partnerships are built on transparency, trust, and consistent communication, creating lasting relationships with our clients and stakeholders." },
  { id: "efficiency", title: "Efficiency", description: "Our streamlined processes and innovative approach help us deliver optimized energy solutions with maximum efficiency, cost-effectiveness, and impact." }
]

export default function CoreValues() {
  const [activeValues, setActiveValues] = useState<Set<string>>(new Set())
  const [isHydrated, setIsHydrated] = useState(false)

  useEffect(() => {
    setActiveValues(new Set(valuesList.map((v) => v.id)))
    setIsHydrated(true)
  }, [])

  const toggleValue = (id: string) => {
    setActiveValues((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(id)) {
        newSet.delete(id)
      } else {
        newSet.add(id)
      }
      return newSet
    })
  }
  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Image */}
          <div className="relative h-96 md:h-[500px] rounded-lg overflow-hidden shadow-lg bg-slate-200">
            <Image
              src="/assets/solar-power.jpg"
              alt="Solar energy workers with panels"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent" />
          </div>

          {/* Right: Content */}
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-brand-green mb-12">
              Our core values
            </h2>

            {/* Values List */}
            <div className="space-y-4">
              {valuesList.map((value) => {
                const isActive = isHydrated ? activeValues.has(value.id) : true
                return (
                  <button
                    key={value.id}
                    onClick={() => toggleValue(value.id)}
                    className="w-full flex items-center justify-between p-5 rounded-lg bg-white hover:bg-slate-50 transition-colors border border-slate-200 hover:border-brand-green/30 text-left"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex-shrink-0">
                        {valueIcons[value.id as keyof typeof valueIcons]}
                      </div>
                      <span className="text-lg font-medium text-slate-800">
                        {value.title}
                      </span>
                      <p className="text-sm text-slate-600 mt-1">
                        {value.description}
                      </p>
                    </div>
                    <div className="flex-shrink-0">
                      <CheckCircle2
                        className={`w-6 h-6 transition-all ${
                          isActive
                            ? "text-teal-600 fill-teal-600"
                            : "text-slate-300"
                        }`}
                      />
                    </div>
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}