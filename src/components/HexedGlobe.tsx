"use client"
import { useEffect, useRef, useState, useCallback } from "react"
import Globe, { type GlobeMethods } from "react-globe.gl"

interface CountryProperties {
  ADMIN: string
  ISO_A2: string
  ISO_A3: string
  POP_EST: number
  [key: string]: any
}

interface CountryFeature {
  type: string
  geometry: {
    type: string
    coordinates: number[][][]
  }
  properties: CountryProperties
}

interface CountryData extends CountryFeature {
  __hover?: boolean
  __color?: string
  __showHexagon?: boolean
}

interface HexedGlobeProps {
  countryGeoJsonUrl?: string
  hexPolygonResolution?: number
  hexPolygonColor?: string | ((d: CountryData) => string)
  onCountryClick?: (country: CountryData, coords: { lat: number; lng: number; altitude: number }) => void
  onCountryHover?: (country: CountryData | null, prevCountry: CountryData | null) => void
}

// Default GeoJSON URL - Natural Earth dataset
const DEFAULT_GEOJSON_URL =
  "https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_110m_admin_0_countries.geojson"

// Define regions to show hexagons for
const TARGET_REGIONS = {
  AFRICA: {
    lat: { min: -35, max: 37 },
    lng: { min: -18, max: 55 },
  },
  ASIA: {
    lat: { min: 5, max: 60 }, // Extended south to include Southeast Asia
    lng: { min: 50, max: 150 }, // Adjusted to include all of China
  },
  MIDDLE_EAST: {
    lat: { min: 12, max: 40 },
    lng: { min: 25, max: 65 }, // Extended to ensure complete coverage
  },
}

// Check if coordinates are within target regions
const isInTargetRegion = (lat: number, lng: number): boolean => {
  // Normalize longitude to handle cases where it crosses the 180/-180 boundary
  const normalizedLng = ((lng + 180) % 360) - 180

  return (
    // Africa
    (lat >= TARGET_REGIONS.AFRICA.lat.min &&
      lat <= TARGET_REGIONS.AFRICA.lat.max &&
      normalizedLng >= TARGET_REGIONS.AFRICA.lng.min &&
      normalizedLng <= TARGET_REGIONS.AFRICA.lng.max) ||
    // Asia
    (lat >= TARGET_REGIONS.ASIA.lat.min &&
      lat <= TARGET_REGIONS.ASIA.lat.max &&
      normalizedLng >= TARGET_REGIONS.ASIA.lng.min &&
      normalizedLng <= TARGET_REGIONS.ASIA.lng.max) ||
    // Middle East
    (lat >= TARGET_REGIONS.MIDDLE_EAST.lat.min &&
      lat <= TARGET_REGIONS.MIDDLE_EAST.lat.max &&
      normalizedLng >= TARGET_REGIONS.MIDDLE_EAST.lng.min &&
      normalizedLng <= TARGET_REGIONS.MIDDLE_EAST.lng.max)
  )
}

// Generate a stable color based on a string
const getStableColor = (str: string): string => {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash)
  }
  const hue = Math.abs(hash % 360)
  return `hsl(${hue}, 70%, 60%)`
}

export default function HexedGlobe({
  countryGeoJsonUrl = DEFAULT_GEOJSON_URL,
  hexPolygonResolution = 2,
  hexPolygonColor,
  onCountryClick,
  onCountryHover,
}: HexedGlobeProps) {
  const globeRef = useRef<GlobeMethods>(undefined)
  const [countries, setCountries] = useState<CountryData[]>([])
  const [hoveredCountry, setHoveredCountry] = useState<CountryData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const [isInitialized, setIsInitialized] = useState(false)
  const prevHoveredRef = useRef<CountryData | null>(null)

  // Fetch GeoJSON data with memoization
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true)
        const response = await fetch(countryGeoJsonUrl)
        const data = await response.json()

        // Transform the GeoJSON features into the format needed by the Globe
        const countryHexData = data.features.map((feat: CountryFeature) => {
          // Calculate the center point of the country
          const coordinates = feat.geometry.coordinates[0]
          const center = coordinates.reduce(
            (acc: { lat: number; lng: number }, coord: number[]) => ({
              lat: acc.lat + coord[1],
              lng: acc.lng + coord[0],
            }),
            { lat: 0, lng: 0 },
          )
          const count = coordinates.length
          const centerLat = center.lat / count
          const centerLng = center.lng / count

          // Special case for China to ensure it's included
          const isChina = feat.properties.ISO_A3 === "CHN"
          const showHexagon = isChina || isInTargetRegion(centerLat, centerLng)

          return {
            ...feat,
            __hover: false,
            __showHexagon: showHexagon,
            __color: showHexagon
              ? hexPolygonColor
                ? typeof hexPolygonColor === "function"
                  ? hexPolygonColor(feat as CountryData)
                  : hexPolygonColor
                : getStableColor(feat.properties.ISO_A3 || feat.properties.ADMIN)
              : "transparent",
          }
        })

        setCountries(countryHexData)
      } catch (error) {
        console.error("Error loading country data:", error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchData()
  }, [countryGeoJsonUrl, hexPolygonColor])

  // Initialize globe settings with performance optimizations
  useEffect(() => {
    if (globeRef.current && !isInitialized) {
      const globe = globeRef.current as any

      // Optimize controls
      globe.controls().autoRotate = true
      globe.controls().autoRotateSpeed = 0.3
      globe.controls().enableDamping = true
      globe.controls().dampingFactor = 0.05

      // Set initial camera position
      globe.pointOfView({
        lat: 0,
        lng: 0,
        altitude: 1.0  // Reduced from 1.2 to make globe appear larger
      })

      // Enable zoom and pan with limits
      globe.controls().enableZoom = true
      globe.controls().minDistance = 0.8  // Reduced from 0.92
      globe.controls().maxDistance = 2.0  // Reduced from 2.46
      globe.controls().enablePan = true

      // Optimize rendering
      globe.renderer().setPixelRatio(Math.min(window.devicePixelRatio, 2))
      globe.renderer().setSize(window.innerWidth, window.innerHeight)

      setIsInitialized(true)
    }
  }, [isInitialized])

  // Handle country hover with optimized debounce and memoization
  const handleCountryHover = useCallback(
    (country: CountryData | null, prevCountry: CountryData | null) => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current)
      }

      // Skip if the same country is being hovered
      if (country === prevHoveredRef.current) {
        return
      }

      hoverTimeoutRef.current = setTimeout(() => {
        // Update the hover state directly in the data
        if (prevHoveredRef.current) {
          prevHoveredRef.current.__hover = false
        }
        if (country) {
          country.__hover = true
        }
        prevHoveredRef.current = country

        // Only update state if the country has changed
        if (country !== hoveredCountry) {
          setHoveredCountry(country)
          if (onCountryHover) {
            onCountryHover(country, prevCountry)
          }
        }
      }, 100)
    },
    [onCountryHover, hoveredCountry],
  )

  // Handle country click with memoization
  const handleCountryClick = useCallback(
    (country: CountryData, event: MouseEvent, coords: { lat: number; lng: number; altitude: number }) => {
      if (onCountryClick) {
        onCountryClick(country, coords)
      }
    },
    [onCountryClick],
  )

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current)
      }
    }
  }, [])

  if (isLoading) {
    return (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#f5f5f5",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              width: "40px",
              height: "40px",
              border: "4px solid #f3f3f3",
              borderTop: "4px solid #3498db",
              borderRadius: "50%",
              animation: "spin 1s linear infinite",
              margin: "0 auto 10px",
            }}
          />
          <p>Loading world data...</p>
        </div>
        <style jsx>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    )
  }

  return (
    <div style={{ 
      width: "100%", 
      height: "100%", 
      position: "relative",
      transform: "scale(1.7)",
      transformOrigin: "center center"
    }}>
      <Globe
        ref={globeRef}
        globeImageUrl="//cdn.jsdelivr.net/npm/three-globe/example/img/earth-dark.jpg"
        hexPolygonsData={countries}
        hexPolygonGeoJsonGeometry={(d: any) => d.geometry}
        hexPolygonLabel={(d: any) =>
          d.__showHexagon
            ? `
          <div>
            <div><b>${d.properties.ADMIN} (${d.properties.ISO_A2})</b></div>
            <div>Population: <i>${d.properties.POP_EST?.toLocaleString()}</i></div>
          </div>
        `
            : ""
        }
        hexPolygonColor={(d: any) => (d.__hover ? "#ff9900" : d.__color)}
        hexPolygonAltitude={(d: any) => (d.__hover ? 0.02 : 0.001)}
        hexPolygonResolution={hexPolygonResolution}
        hexPolygonMargin={0.3}
        hexPolygonUseDots={false}
        hexPolygonCurvatureResolution={3}
        hexPolygonsTransitionDuration={100}
        onHexPolygonClick={(polygon: any, event: MouseEvent, coords: { lat: number; lng: number; altitude: number }) =>
          polygon.__showHexagon ? handleCountryClick(polygon as CountryData, event, coords) : null
        }
        onHexPolygonHover={(polygon: any | null, prevPolygon: any | null) =>
          polygon?.__showHexagon
            ? handleCountryHover(polygon as CountryData | null, prevPolygon as CountryData | null)
            : null
        }
        rendererConfig={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
      />
      {hoveredCountry && hoveredCountry.__showHexagon && (
        <div
          style={{
            position: "absolute",
            top: "10px",
            left: "10px",
            backgroundColor: "rgba(255, 255, 255, 0.95)",
            padding: "15px",
            borderRadius: "8px",
            boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
            zIndex: 1000,
            transition: "all 0.2s ease-in-out",
            opacity: 1,
            backdropFilter: "blur(8px)",
            border: "1px solid rgba(255,255,255,0.2)",
            maxWidth: "300px",
          }}
        >
          <h3
            style={{
              margin: 0,
              fontSize: "1.2rem",
              fontWeight: "600",
              color: "#333",
              marginBottom: "8px",
            }}
          >
            {hoveredCountry.properties.ADMIN}
          </h3>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "4px",
              fontSize: "0.9rem",
              color: "#666",
            }}
          >
            <p style={{ margin: 0 }}>
              <strong>ISO:</strong> {hoveredCountry.properties.ISO_A2}
            </p>
            <p style={{ margin: 0 }}>
              <strong>Population:</strong> {hoveredCountry.properties.POP_EST?.toLocaleString()}
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
