"use client"
import { useRef } from "react"

const impactData = [
  {
    year: "2020",
    title: "Renewable Energy Revolution",
    description:
      "Launched our first major solar energy project, powering over 10,000 homes with clean, sustainable energy.",
  },
  {
    year: "2021",
    title: "Community Empowerment",
    description: "Established community solar programs, making renewable energy accessible to underserved communities.",
  },
  {
    year: "2022",
    title: "Environmental Impact",
    description:
      "Reduced carbon emissions by 50,000 tons through our renewable energy initiatives and sustainable practices.",
  },
  {
    year: "2023",
    title: "Innovation Hub",
    description: "Created a research and development center focused on next-generation renewable energy solutions.",
  },
  {
    year: "2024",
    title: "Global Reach",
    description:
      "Expanded operations to multiple countries, bringing sustainable energy solutions to international markets.",
  },
]

export default function Impact() {
  const scrollContainerRef = useRef<HTMLDivElement | null>(null)

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current
      const scrollAmount = container.clientWidth * 0.75
      const currentPosition = container.scrollLeft
      const maxScroll = container.scrollWidth - container.clientWidth

      let targetPosition
      if (direction === "left") {
        targetPosition = Math.max(0, currentPosition - scrollAmount)
      } else {
        targetPosition = Math.min(maxScroll, currentPosition + scrollAmount)
      }

      container.scrollTo({
        left: targetPosition,
        behavior: "smooth",
      })
    }
  }

  return (
    <div className="relative py-12 bg-white">
      <div className="w-full max-w-[100vw] overflow-hidden">
        <div className="text-center mb-12 px-4">
          <h2 className="text-4xl font-sans text-[#062516] mb-4">Our Impact</h2>
          <p className="text-sm tracking-widest uppercase text-[#062516]">DRIVING SUSTAINABLE CHANGE</p>
        </div>

        <div className="relative w-full overflow-hidden">
          <button
            onClick={() => scroll("left")}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg text-[#062516] border border-[#062516]/20 transition-all duration-200"
            aria-label="Scroll left"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M10 12L6 8L10 4"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          <div
            ref={scrollContainerRef}
            className="overflow-x-auto scrollbar-hide snap-x snap-mandatory w-full"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
              WebkitOverflowScrolling: "touch",
            }}
          >
            <div className="relative flex gap-8 px-4 min-w-max">
              {/* Timeline line */}
              <div className="absolute left-4 right-4 top-1/2 h-0.5 bg-[#062516]/30 z-0" />

              {impactData.map((item, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center min-w-80 max-w-80 snap-start relative flex-shrink-0"
                >
                  {index % 2 === 0 ? (
                    <>
                      {/* Content above timeline */}
                      <div className="flex flex-col items-center mb-8 w-full pb-8">
                        <h3 className="text-xl font-medium mb-4 text-[#062516] text-center">{item.title}</h3>
                        <p className="text-[#062516] text-center leading-relaxed text-sm">{item.description}</p>
                      </div>

                      {/* Timeline dot */}
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-[#062516] rounded-full z-10 border-4 border-white shadow-lg" />

                      {/* Year below timeline */}
                      <div className="text-3xl font-sans text-[#062516] mt-8 pt-8 text-center font-bold">
                        {item.year}
                      </div>
                    </>
                  ) : (
                    <>
                      {/* Year above timeline */}
                      <div className="text-3xl font-sans text-[#062516] mb-8 pb-8 text-center font-bold">
                        {item.year}
                      </div>

                      {/* Timeline dot */}
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-[#062516] rounded-full z-10 border-4 border-white shadow-lg" />

                      {/* Content below timeline */}
                      <div className="flex flex-col items-center mt-8 w-full pt-8">
                        <h3 className="text-xl font-medium mb-4 text-[#062516] text-center">{item.title}</h3>
                        <p className="text-[#062516] text-center leading-relaxed text-sm">{item.description}</p>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => scroll("right")}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg text-[#062516] border border-[#062516]/20 transition-all duration-200"
            aria-label="Scroll right"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M6 4L10 8L6 12"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Custom scrollbar styles */}
      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  )
}
