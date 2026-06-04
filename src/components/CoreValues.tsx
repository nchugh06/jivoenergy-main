"use client"
import Image from "next/image"
import { CheckCircle2 } from "lucide-react"

interface CoreValue {
  id: string
  title: string
  description: string
}

const valuesList: CoreValue[] = [
  { id: "sustainability", title: "Quality", description: "We use only Tier 1 materials and maintain uncompromising standards across every project to ensure long-lasting performance, reliability, and safety." },
  { id: "integrity", title: "Commitment", description: "From initial planning to final execution, we are committed to delivering every project on time with precision, reliability, and seamless coordination, ensuring a smooth experience at every step." },
  { id: "innovation", title: "Relationships", description: "We believe strong partnerships are built on transparency, trust, and consistent communication, creating lasting relationships with our clients and stakeholders." },
  { id: "collaboration", title: "Efficiency", description: "Our streamlined processes and innovative approach help us deliver optimized energy solutions with maximum efficiency, cost-effectiveness, and impact." },
  // { id: "empowerment", title: "Empowerment", description: "Enabling communities and businesses to take control of their energy futures." }
]

export default function CoreValues() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Left: Image */}
          <div className="relative h-96 md:h-[500px] rounded-lg overflow-hidden shadow-xl bg-slate-200">
            <Image
              src="/assets/core-values.jpg"
              alt="Solar energy workers with panels"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/10 to-transparent" />
          </div>

          {/* Right: Content */}
          <div className="lg:bg-slate-50 lg:p-8 lg:rounded-lg">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-8">
              Our core values
            </h2>

            {/* Values List */}
            <div className="space-y-4">
              {valuesList.map((value) => (
                <div
                  key={value.id}
                  className="flex items-start gap-4 pb-4 border-b border-slate-200 last:border-b-0"
                >
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-slate-800 mb-1">
                      {value.title}
                    </h3>
                    <p className="text-sm text-slate-600">
                      {value.description}
                    </p>
                  </div>
                  <div className="flex-shrink-0 mt-1">
                    <CheckCircle2
                      className="w-6 h-6 text-teal-600 fill-teal-600"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}