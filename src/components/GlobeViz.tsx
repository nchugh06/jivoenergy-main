"use client"
import { useEffect, useState, useRef, useMemo } from "react"
import dynamic from "next/dynamic"
import { Plus, Minus, RotateCw, RotateCcw, ExternalLink } from "lucide-react"
import { getProjects } from "@/lib/projects"
import { Project } from "@/types/project"
import { countries as countryList } from "@/lib/countries"
import Link from "next/link"

// Dynamically import Globe to avoid SSR issues with WebGL
const Globe = dynamic(() => import("react-globe.gl"), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-full w-full text-white/50 animate-pulse">
      Loading 3D Globe...
    </div>
  )
})

// Target IDs - will be populated dynamically
// Colors

export default function GlobeViz() {
  const globeEl = useRef<any>(null)
  const [countries, setCountries] = useState({ features: [] })
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null)
  const [popupPosition, setPopupPosition] = useState<{ x: number, y: number } | null>(null)
  const [countryData, setCountryData] = useState<Record<string, any>>({})
  const [loading, setLoading] = useState(true)

  const targetRegions = useMemo(() => Object.keys(countryData), [countryData])

  useEffect(() => {
    // load geojson
    fetch('https://raw.githubusercontent.com/vasturiano/react-globe.gl/master/example/datasets/ne_110m_admin_0_countries.geojson')
      .then(res => res.json())
      .then(setCountries)

    // Load projects and transform
    const loadProjects = async () => {
        const projects = await getProjects()
        
        // Country Name to Code Mapping
        const nameToCode: Record<string, string> = {}
        countryList.forEach(c => {
            nameToCode[c.name.toLowerCase()] = c.code
        })
        // Manual overrides for common mismatches
        nameToCode['uae'] = 'AE'
        nameToCode['united arab emirates'] = 'AE'
        nameToCode['usa'] = 'US'
        nameToCode['united states'] = 'US'
        nameToCode['uk'] = 'GB'
        nameToCode['united kingdom'] = 'GB'
        nameToCode['sao tome and principe'] = 'ST'
        nameToCode['são tomé & príncipe'] = 'ST'

        const grouped = projects.reduce((acc: Record<string, any>, p: Project) => {
            const countryName = p.country || ""
            const code = nameToCode[countryName.toLowerCase()] || countryName.toUpperCase()
            
            if (!acc[code]) {
                acc[code] = {
                    name: countryName,
                    projects: 0,
                    projectList: [], // Store project identifiers
                    capacity: p.capacity || "N/A",
                    status: p.status || "N/A",
                    flag: `https://flagcdn.com/w160/${code.toLowerCase()}.png`,
                    projectImage: p.imageUrl || "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=300&h=200&fit=crop",
                    capacityValue: 0, // For potential sorting/aggregation
                }
            }
            
            acc[code].projects += 1
            if (p.id) {
                acc[code].projectList.push({ id: p.id, title: p.title })
            }
            // Simple heuristic: if multiple projects, maybe just say "Multiple Projects" or keep status from the latest/first
            if (acc[code].projects > 1) {
                acc[code].status = "Multi-Phase Development"
            }
            
            return acc
        }, {})

        setCountryData(grouped)
        setLoading(false)
    }

    loadProjects()
  }, [])

  const handlePolygonClick = (polygon: any, event: MouseEvent) => {
    if (!polygon) return
    
    // Check if it's a target country (compare ISO_A2)
    const countryCode = polygon.properties.ISO_A2
    if (!targetRegions.includes(countryCode)) {
        // Can optionally close popup if clicking outside
        setSelectedCountry(null)
        setPopupPosition(null)
        return
    }

    // It's a target country
    setSelectedCountry(countryCode)
    
    // Stop rotation when looking at details
    if (globeEl.current) {
      globeEl.current.controls().autoRotate = false
    }
    
    // Set popup position (simplified for now, ideally projected to screen coords)
    setPopupPosition({ x: window.innerWidth / 2, y: window.innerHeight / 2 })
  }

  const getCountryInfo = (countryId: string | null) => {
    if (!countryId) return null
    return countryData[countryId as keyof typeof countryData] || null
  }

  // Controls State
  const [isAutoRotating, setIsAutoRotating] = useState(false)

  // Control Handlers
  const handleZoomIn = () => {
    if (globeEl.current) {
      const currentAlt = globeEl.current.pointOfView().altitude
      const newAlt = Math.max(0.1, currentAlt - 0.5) // Limit zoom in
      globeEl.current.pointOfView({ altitude: newAlt }, 400)
    }
  }

  const handleZoomOut = () => {
    if (globeEl.current) {
      const currentAlt = globeEl.current.pointOfView().altitude
      const newAlt = Math.min(4.0, currentAlt + 0.5) // Limit zoom out
      globeEl.current.pointOfView({ altitude: newAlt }, 400)
    }
  }

  const toggleAutoRotate = () => {
    if (globeEl.current) {
      const newState = !isAutoRotating
      setIsAutoRotating(newState)
      globeEl.current.controls().autoRotate = newState
      globeEl.current.controls().autoRotateSpeed = 0.5 // Adjust speed as needed
    }
  }

  // Effect to project popup position if we want it to follow the globe?
  // Doing it simple: "modal" style popup in center or fixed position is often better for mobile/usability 
  // than chasing a moving 3D object.
  // The MapViz used a fixed position relative to the map container.

  return (
    <div className="relative w-full h-full bg-black overflow-hidden" style={{ touchAction: 'pan-y' }}>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
        
        .popup-container {
          font-family: 'Inter', system-ui, sans-serif;
          backdrop-filter: blur(20px);
          background: rgba(10, 10, 10, 0.85); /* Dark background */
          border: 1px solid rgba(255, 255, 255, 0.1);
          padding: 0;
          border-radius: 12px;
          box-shadow: 
            0 20px 40px rgba(0, 0, 0, 0.6),
            0 0 0 1px rgba(255, 255, 255, 0.05);
          animation: popupSlideIn 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        @keyframes popupSlideIn {
          from { opacity: 0; transform: translate(-50%, -50%) scale(0.95); }
          to { opacity: 1; transform: translate(-50%, -50%) scale(1); }
        }
      `}</style>

      <Globe
        ref={globeEl}
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
        backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
        hexPolygonsData={countries.features}
        hexPolygonResolution={3}
        hexPolygonMargin={0.2}
        hexPolygonColor={(d: any) => {
            const code = d.properties.ISO_A2
            if (targetRegions.includes(code)) {
                return '#059669' // Green for countries with projects
            }
            return '#2d3748' // Default land color
        }}
        hexPolygonLabel={({ properties: d }: any) => `
            <div style="background: rgba(0,0,0,0.8); color: white; padding: 4px 8px; border-radius: 4px;">
                ${d.ADMIN} (${d.ISO_A2})
            </div>
        `}
        onHexPolygonClick={handlePolygonClick}
        width={typeof window !== 'undefined' ? window.innerWidth : 800} 
        onGlobeReady={() => {
          if (globeEl.current) {
            // Disable auto-rotation for all initially
            globeEl.current.controls().autoRotate = false
            globeEl.current.controls().enableZoom = false
            
            // Adjust view based on screen width
            const isMobile = window.innerWidth < 768
            const altitude = isMobile ? 2.5 : 1.8
            
            globeEl.current.pointOfView({ lat: 0, lng: 20, altitude })

            if (isMobile) {
                // Wait for the view to set, then disable controls to allow native scroll
                setTimeout(() => {
                    if (globeEl.current) {
                        globeEl.current.controls().enabled = false;
                    }
                }, 100);
            }
          }
        }}
        height={typeof window !== 'undefined' ? window.innerHeight : 600}
      />

      {/* Globe Controls */}
      <div className="absolute top-24 right-4 flex flex-col gap-2 z-10">
        <button
          onClick={handleZoomIn}
          className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white p-2 rounded-full border border-white/10 transition-colors"
          title="Zoom In"
        >
          <Plus size={20} />
        </button>
        <button
          onClick={handleZoomOut}
          className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white p-2 rounded-full border border-white/10 transition-colors"
          title="Zoom Out"
        >
          <Minus size={20} />
        </button>
        <button
          onClick={toggleAutoRotate}
          className={`bg-white/10 hover:bg-white/20 backdrop-blur-md text-white p-2 rounded-full border border-white/10 transition-colors ${isAutoRotating ? 'text-green-400 border-green-500/50' : ''}`}
          title={isAutoRotating ? "Stop Rotation" : "Auto Rotate"}
        >
            {isAutoRotating ? <RotateCcw size={20} /> : <RotateCw size={20} />}
        </button>
      </div>

      {/* Popup Overlay */}
      {selectedCountry && (
        <div 
            className="popup-container absolute"
            style={{
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                zIndex: 9999, // High z-index to ensure it's above everything
                width: '90%', // Responsive width for mobile
                maxWidth: '400px' // Max width for desktop
            }}
        >
             {(() => {
              const info = getCountryInfo(selectedCountry)
              if (!info) return null
              return (
                <div className="relative">
                  <div className="flex justify-between items-start p-4 pb-3 border-b border-white/10">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <img 
                          src={info.flag} 
                          alt={`${info.name} flag`}
                          className="w-8 h-6 object-cover rounded border border-white/20"
                        />
                         <div className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-green-500 rounded-full border border-black"></div>
                      </div>
                      <h3 className="text-lg font-semibold text-white">{info.name}</h3>
                    </div>
                    {/* Increased touch target for mobile */}
                    <button 
                      className="text-gray-400 hover:text-white text-lg font-light w-12 h-12 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors duration-200 -mr-3 -mt-3"
                      onPointerUp={(e) => {
                          e.stopPropagation(); 
                          e.preventDefault();
                          setSelectedCountry(null)
                      }}
                    >
                      ×
                    </button>
                  </div>

                  <div className="px-4 py-4 max-h-[60vh] overflow-y-auto"> {/* Scrollable content if nice */}
                    <div className="relative overflow-hidden rounded-lg border border-white/10 mb-4 group">
                      <img 
                        src={info.projectImage} 
                        alt={`${info.name} renewable energy project`}
                        className="w-full h-28 sm:h-32 object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                       <div className="absolute bottom-3 left-3">
                        <span className="inline-flex items-center px-2 py-1 rounded text-[10px] sm:text-xs font-medium bg-green-500/20 text-green-300 border border-green-500/30 backdrop-blur-sm">
                          Renewable Energy
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-2 sm:gap-3">
                      <div className="flex justify-between items-center p-2.5 sm:p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center border border-blue-500/30">
                            <span className="text-blue-300 font-semibold text-sm">{info.projects}</span>
                          </div>
                          <span className="font-medium text-gray-300 text-sm">Active Projects</span>
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center p-2.5 sm:p-3 bg-emerald-500/10 rounded-lg border border-emerald-500/20">
                         <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-emerald-500/20 rounded-lg flex items-center justify-center border border-emerald-500/30">
                            <span className="text-emerald-300 font-semibold text-xs">⚡</span>
                          </div>
                          <div>
                            <span className="font-medium text-gray-300 block text-[10px] sm:text-xs mb-0.5">Total Capacity</span>
                            <div className="text-emerald-300 font-semibold text-sm">{info.capacity}</div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center p-2.5 sm:p-3 bg-orange-500/10 rounded-lg border border-orange-500/20">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-orange-500/20 rounded-lg flex items-center justify-center border border-orange-500/30">
                            <span className="text-orange-300 font-semibold text-xs">📊</span>
                          </div>
                          <div>
                            <span className="font-medium text-gray-300 block text-[10px] sm:text-xs mb-0.5">Status</span>
                            <div className="text-orange-300 font-semibold text-sm">{info.status}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 pt-0">
                    <div className="bg-white/5 rounded-lg p-3 border border-white/10 mb-3">
                      <p className="text-xs sm:text-sm text-gray-400 leading-relaxed text-justify">
                        Comprehensive renewable energy development initiative focused on sustainable power generation, 
                        modern grid infrastructure, and community empowerment through clean energy access.
                      </p>
                    </div>

                    <div className="space-y-2 max-h-32 overflow-y-auto pr-1 custom-scrollbar">
                      <p className="text-[10px] uppercase tracking-widest text-gray-500 font-bold mb-2">Projects in {info.name}</p>
                      {info.projectList?.map((p: any) => (
                        <Link 
                          key={p.id} 
                          href={`/projects/${p.id}`}
                          className="flex items-center justify-between p-2.5 bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/20 rounded-lg transition-all group"
                        >
                          <span className="text-xs text-gray-300 group-hover:text-white font-medium truncate pr-4">{p.title}</span>
                          <ExternalLink size={12} className="text-gray-500 group-hover:text-green-400 flex-shrink-0" />
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              )
            })()}
        </div>
      )}
    </div>
  )
}
