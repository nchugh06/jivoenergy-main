"use client"
import { useState, useEffect } from "react"
import Image from "next/image"
import { CheckCircle2, Sun, Shield, Lightbulb, Users, Zap } from "lucide-react"

interface CoreValue {
  id: string
  title: string
}

const valueIcons = {
  sustainability: <Sun className="w-6 h-6 text-yellow-500" />,
  integrity: <Shield className="w-6 h-6 text-blue-600" />,
  innovation: <Lightbulb className="w-6 h-6 text-yellow-400" />,
  collaboration: <Users className="w-6 h-6 text-teal-600" />,
  empowerment: <Zap className="w-6 h-6 text-yellow-500" />,
}

const valuesList: CoreValue[] = [
  { id: "sustainability", title: "Sustainability" },
  { id: "integrity", title: "Integrity" },
  { id: "innovation", title: "Innovation" },
  { id: "collaboration", title: "Collaboration" },
  { id: "empowerment", title: "Empowerment" },
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