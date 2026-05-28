"use client"
import { useState, useEffect, useMemo, useRef, useCallback } from 'react'
import dynamic from 'next/dynamic'
import { scaleSequentialSqrt } from 'd3-scale'
import { interpolateGreens } from 'd3-scale-chromatic'
import type { GlobeMethods } from 'react-globe.gl'

const Globe = dynamic(() => import('react-globe.gl'), {
  ssr: false,
  loading: () => <div className="flex h-full w-full items-center justify-center text-[#085D36]">Loading Globe...</div>
})

// Define regions to include
const INCLUDED_REGIONS = [
  'Africa',
  'Middle East',
  'Asia',
  'Europe',
  'Americas'
]

// Region-specific color scales - purely green theme
const regionColors = {
  'Africa': scaleSequentialSqrt<string>()
    .domain([0, 1])
    .range(['#1b5e20', '#2e7d32', '#388e3c', '#4caf50', '#81c784']),
  'Middle East': scaleSequentialSqrt<string>()
    .domain([0, 1])
    .range(['#004d40', '#00695c', '#00796b', '#00897b', '#26a69a']),
  'Asia': scaleSequentialSqrt<string>()
    .domain([0, 1])
    .range(['#006064', '#00838f', '#0097a7', '#00acc1', '#26c6da']),
  'Europe': scaleSequentialSqrt<string>()
    .domain([0, 1])
    .range(['#01579b', '#0277bd', '#0288d1', '#039be5', '#29b6f6']), // Blue-ish for contrast but still cool
  'Americas': scaleSequentialSqrt<string>()
    .domain([0, 1])
    .range(['#1a237e', '#283593', '#303f9f', '#3949ab', '#5c6bc0'])
}

const GreenGlobe = () => {
  const [countries, setCountries] = useState({ features: [] })
  const [hoverD, setHoverD] = useState<any>(null)
  const [clickedD, setClickedD] = useState<any>(null)
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 })
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const globeRef = useRef<GlobeMethods | undefined>(undefined)
  const [view, setView] = useState({ lat: 20, lng: 0, altitude: 2.5 })
  const [isGlobeReady, setIsGlobeReady] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  // Handle globe ready state
  const handleGlobeReady = useCallback(() => {
    setIsGlobeReady(true)
  }, [])

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.clientWidth,
          height: containerRef.current.clientHeight
        })
      }
    }

    updateDimensions()
    window.addEventListener('resize', updateDimensions)
    return () => window.removeEventListener('resize', updateDimensions)
  }, [])

  useEffect(() => {
    // load data
    fetch('https://raw.githubusercontent.com/vasturiano/react-globe.gl/master/example/datasets/ne_110m_admin_0_countries.geojson')
      .then(res => res.json())
      .then(data => {
        // Filter countries to only include specified regions if needed, currently including all for better full globe view
        // const filteredFeatures = data.features.filter((feature: any) => {
        //   const region = feature.properties.REGION_UN
        //   return INCLUDED_REGIONS.includes(region)
        // })
        setCountries(data)
      })
      .catch(err => {
        console.error('Error loading countries data:', err)
        setCountries({ features: [] })
      })
  }, [])

  // Colors aligned with brand
  // Dark Green: #062516
  // Primary Green: #085D36
  // Accent Yellow: #FFFA84

  const colorScale = scaleSequentialSqrt(interpolateGreens)

  // GDP per capita (avoiding countries with small pop)
  const getVal = (feat: any) => feat.properties.GDP_MD_EST / Math.max(1e5, feat.properties.POP_EST)

  const maxVal = useMemo(
    () => Math.max(...countries.features.map(getVal)),
    [countries]
  )
  colorScale.domain([0, maxVal])

  const handlePolygonHover = (polygon: any, prevPolygon: any) => {
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
        altitude: 1.8
      }, 1000) // Animate over 1 second
    }
  }

  const getPolygonColor = (d: any): string => {
    if (d === hoverD) return '#FFFA84' // Accent Yellow for hover
    if (d === clickedD) return '#FFF176' // Slightly different yellow for clicked
    
    // Use region-specific or general green scale
    const val = getVal(d)
    const region = d.properties.REGION_UN
    
    // Fallback to general green scale or specific region scale
    if (region && regionColors[region as keyof typeof regionColors]) {
       const scale = regionColors[region as keyof typeof regionColors]
       return scale(val / maxVal)
    }
    
    // Default fallback
    return '#085D36'
  }


  const getPolygonAltitude = (d: any): number => {
    if (d === hoverD) return 0.12
    if (d === clickedD) return 0.15
    return 0.06
  }

  useEffect(() => {
    if (isGlobeReady && globeRef.current) {
      // Auto-rotate
      (globeRef.current as any).controls().autoRotate = true;
      (globeRef.current as any).controls().autoRotateSpeed = 0.6;
      
      globeRef.current.pointOfView({ lat: 20, lng: 0, altitude: 2.5 })
    }
  }, [isGlobeReady])


  return (
    <div 
      ref={containerRef}
      className="relative w-full h-full min-h-[500px]" 
      onMouseMove={handleMouseMove}
      style={{
        background: 'transparent' // Let the hero background show through or set a specific gradient if needed
      }}
    >
      <Globe
        ref={globeRef}
        onGlobeReady={handleGlobeReady}
        globeImageUrl={null}
        backgroundColor="rgba(0,0,0,0)"
        lineHoverPrecision={0}
        polygonsData={countries.features.filter((d: any) => d.properties.ISO_A2 !== 'AQ')}
        polygonAltitude={getPolygonAltitude}
        polygonCapColor={getPolygonColor}
        polygonSideColor={() => 'rgba(6, 37, 22, 0.8)'} // Dark Green sides
        polygonStrokeColor={() => '#1a4d2e'} // Lighter green stroke
        polygonLabel={({ properties: d }: any) => 
          `<div style="background: rgba(6, 37, 22, 0.9); color: #fff; padding: 4px 8px; border-radius: 4px;">${d.ADMIN}</div>`
        }
        onPolygonHover={handlePolygonHover}
        onPolygonClick={handlePolygonClick}
        polygonsTransitionDuration={300}
        width={dimensions.width}
        height={dimensions.height}
        enablePointerInteraction={true}
        animateIn={true}
      />
    </div>
  )
}

export default GreenGlobe
