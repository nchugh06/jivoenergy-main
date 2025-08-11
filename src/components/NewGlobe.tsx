"use client"
import { useState, useEffect, useMemo, useRef, useCallback } from 'react'
import dynamic from 'next/dynamic'
import { scaleSequentialSqrt } from 'd3-scale'
import { interpolateYlOrRd } from 'd3-scale-chromatic'
import type { GlobeMethods } from 'react-globe.gl'

const Globe = dynamic(() => import('react-globe.gl'), {
  ssr: false,
  loading: () => <div>Loading...</div>
})

// Define regions to include
const INCLUDED_REGIONS = [
  'Africa',
  'Middle East',
  'Asia'
]

// Region-specific color scales
const regionColors = {
  'Africa': scaleSequentialSqrt<string>()
    .domain([0, 1])
    .range(['#1a237e', '#0d47a1', '#01579b', '#0277bd', '#039be5']), // Deep blues
  'Middle East': scaleSequentialSqrt<string>()
    .domain([0, 1])
    .range(['#006064', '#00838f', '#0097a7', '#00acc1', '#00bcd4']), // Cyan blues
  'Asia': scaleSequentialSqrt<string>()
    .domain([0, 1])
    .range(['#004d40', '#00695c', '#00796b', '#00897b', '#009688']) // Teal blues
}

const NewGlobe = () => {
  const [countries, setCountries] = useState({ features: [] })
  const [hoverD, setHoverD] = useState<any>(null)
  const [clickedD, setClickedD] = useState<any>(null)
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 })
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 })
  const globeRef = useRef<GlobeMethods | undefined>(undefined)
  const [view, setView] = useState({ lat: 30, lng: 45, altitude: 2 })
  const [isGlobeReady, setIsGlobeReady] = useState(false)

  // Add a ref to track if the globe is ready
  const isGlobeReadyRef = useRef(false)

  // Handle globe ready state
  const handleGlobeReady = useCallback(() => {
    isGlobeReadyRef.current = true
    setIsGlobeReady(true)
  }, [])

  useEffect(() => {
    // Set initial dimensions
    setDimensions({
      width: window.innerWidth,
      height: window.innerHeight
    })

    // Update dimensions on window resize
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      })
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    // load data
    fetch('https://raw.githubusercontent.com/vasturiano/react-globe.gl/master/example/datasets/ne_110m_admin_0_countries.geojson')
      .then(res => res.json())
      .then(data => {
        // Filter countries to only include specified regions
        const filteredFeatures = data.features.filter((feature: any) => {
          const region = feature.properties.REGION_UN
          return INCLUDED_REGIONS.includes(region)
        })
        setCountries({ ...data, features: filteredFeatures })
      })
      .catch(err => {
        console.error('Error loading countries data:', err)
        setCountries({ features: [] })
      })
  }, [])

  const colorScale = scaleSequentialSqrt(interpolateYlOrRd)

  // GDP per capita (avoiding countries with small pop)
  const getVal = (feat: any) => feat.properties.GDP_MD_EST / Math.max(1e5, feat.properties.POP_EST)

  const maxVal = useMemo(
    () => Math.max(...countries.features.map(getVal)),
    [countries]
  )
  colorScale.domain([0, maxVal])

  const handlePolygonHover = (polygon: any, prevPolygon: any) => {
    console.log('Hover event:', { polygon, prevPolygon })
    setHoverD(polygon)
  }

  const handleMouseMove = (event: React.MouseEvent) => {
    if (hoverD) {
      setTooltipPosition({
        x: event.clientX,
        y: event.clientY
      })
    }
  }

  const handlePolygonClick = (polygon: any, event: any, coords: { lat: number, lng: number, altitude: number }) => {
    setClickedD(polygon)
    // Center the globe on the clicked country
    if (globeRef.current) {
      globeRef.current.pointOfView({
        lat: coords.lat,
        lng: coords.lng,
        altitude: 1.5
      }, 1000) // Animate over 1 second
    }
  }

  const getPolygonColor = (d: any): string => {
    if (d === hoverD) return '#00b0ff' // Bright electric blue for hover
    if (d === clickedD) return '#ff4081' // Pink for clicked
    const val = getVal(d)
    const region = d.properties.REGION_UN
    const colorScale = regionColors[region as keyof typeof regionColors] || regionColors['Africa']
    return colorScale(val / maxVal)
  }

  const getPolygonSideColor = (d: any): string => {
    const region = d.properties.REGION_UN
    switch (region) {
      case 'Africa':
        return 'rgba(2, 119, 189, 0.15)' // Matching Africa's blue
      case 'Middle East':
        return 'rgba(0, 172, 193, 0.15)' // Matching Middle East's cyan
      case 'Asia':
        return 'rgba(0, 137, 123, 0.15)' // Matching Asia's teal
      default:
        return 'rgba(0, 100, 255, 0.15)'
    }
  }

  const getPolygonAltitude = (d: any): number => {
    if (d === hoverD) return 0.12
    if (d === clickedD) return 0.15
    return 0.06
  }

  useEffect(() => {
    if (isGlobeReady && globeRef.current) {
      globeRef.current.pointOfView({ lat: 30, lng: 45, altitude: 2 })
    }
  }, [isGlobeReady])

  const handleZoom = (newView: any) => {
    if (globeRef.current) {
      const coords = globeRef.current.getCoords(newView.lat, newView.lng, newView.altitude)
      if (coords) {
        const geoCoords = globeRef.current.toGeoCoords(coords)
        setView(geoCoords)
      }
    }
  }

  return (
    <div 
      className="relative w-full h-full" 
      onMouseMove={handleMouseMove}
      style={{
        background: 'linear-gradient(180deg, rgb(255, 255, 255) 0%, rgb(5, 94, 49) 50%, rgb(1, 58, 29) 100%)'
      }}
    >
      <Globe
        ref={globeRef}
        onGlobeReady={handleGlobeReady}
        globeImageUrl="//cdn.jsdelivr.net/npm/three-globe/example/img/earth-night.jpg"
        backgroundColor="rgba(255, 255, 255, 0)"
        lineHoverPrecision={0}
        polygonsData={countries.features.filter((d: any) => d.properties.ISO_A2 !== 'AQ')}
        polygonAltitude={getPolygonAltitude}
        polygonCapColor={getPolygonColor}
        polygonSideColor={getPolygonSideColor}
        polygonStrokeColor={() => 'rgba(255, 255, 255, 0.75)'}
        polygonLabel={({ properties: d }: any) => 
          `${d.ADMIN} (${d.ISO_A2}):\nGDP: ${d.GDP_MD_EST} M$\nPopulation: ${d.POP_EST}`
        }
        onPolygonHover={handlePolygonHover}
        onPolygonClick={handlePolygonClick}
        onZoom={handleZoom}
        polygonsTransitionDuration={300}
        width={dimensions.width}
        height={dimensions.height}
        enablePointerInteraction={true}
        animateIn={false}
        rendererConfig={{ antialias: true, alpha: true, preserveDrawingBuffer: true }}
        pointerEventsFilter={(obj: any) => obj.type === 'Mesh'}
      />
      {hoverD && (
        <div
          className="fixed z-[100] bg-black/80 text-white p-4 rounded-lg shadow-lg pointer-events-none"
          style={{
            left: tooltipPosition.x + 10,
            top: tooltipPosition.y + 10,
            transform: 'translate(-50%, -50%)',
            minWidth: '250px'
          }}
        >
          <h3 className="text-lg font-bold mb-2">{hoverD.properties.ADMIN}</h3>
          <div className="space-y-1">
            <p className="text-sm">
              <span className="font-semibold">Region:</span> {hoverD.properties.REGION_UN}
            </p>
            <p className="text-sm">
              <span className="font-semibold">Country Code:</span> {hoverD.properties.ISO_A2}
            </p>
            <p className="text-sm">
              <span className="font-semibold">GDP:</span> ${(hoverD.properties.GDP_MD_EST * 1000000).toLocaleString()}
            </p>
            <p className="text-sm">
              <span className="font-semibold">GDP per Capita:</span> ${(hoverD.properties.GDP_MD_EST * 1000000 / hoverD.properties.POP_EST).toLocaleString(undefined, {maximumFractionDigits: 2})}
            </p>
            <p className="text-sm">
              <span className="font-semibold">Population:</span> {hoverD.properties.POP_EST.toLocaleString()}
            </p>
          </div>
        </div>
      )}
      {clickedD && (
        <div className="fixed bottom-4 left-4 z-[100] bg-black/80 text-white p-4 rounded-lg shadow-lg">
          <h3 className="text-xl font-bold mb-2">{clickedD.properties.ADMIN}</h3>
          <div className="space-y-2">
            <p className="text-sm">
              <span className="font-semibold">Region:</span> {clickedD.properties.REGION_UN}
            </p>
            <p className="text-sm">
              <span className="font-semibold">Country Code:</span> {clickedD.properties.ISO_A2}
            </p>
            <p className="text-sm">
              <span className="font-semibold">GDP:</span> ${(clickedD.properties.GDP_MD_EST * 1000000).toLocaleString()}
            </p>
            <p className="text-sm">
              <span className="font-semibold">GDP per Capita:</span> ${(clickedD.properties.GDP_MD_EST * 1000000 / clickedD.properties.POP_EST).toLocaleString(undefined, {maximumFractionDigits: 2})}
            </p>
            <p className="text-sm">
              <span className="font-semibold">Population:</span> {clickedD.properties.POP_EST.toLocaleString()}
            </p>
            <button 
              onClick={() => setClickedD(null)}
              className="mt-2 px-3 py-1 bg-white/20 hover:bg-white/30 rounded text-sm transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default NewGlobe 