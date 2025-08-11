"use client"
import { useEffect, useRef, useState } from "react"
import Script from "next/script"

declare global {
  interface Window {
    am5: any
    am5map: any
    am5geodata_worldLow: any
    am5geodata_usaLow: any
    am5themes_Animated: any
  }
}

// Country-specific data
const countryData = {
  // Africa
  ET: { 
    name: "Ethiopia", 
    projects: 12, 
    capacity: "850 MW", 
    status: "Active Development",
    flag: "https://flagcdn.com/w160/et.png",
    projectImage: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=300&h=200&fit=crop"
  },
  KE: { 
    name: "Kenya", 
    projects: 8, 
    capacity: "620 MW", 
    status: "Operational",
    flag: "https://flagcdn.com/w160/ke.png",
    projectImage: "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=300&h=200&fit=crop"
  },
  TZ: { 
    name: "Tanzania", 
    projects: 6, 
    capacity: "450 MW", 
    status: "Planning Phase",
    flag: "https://flagcdn.com/w160/tz.png",
    projectImage: "https://images.unsplash.com/photo-1566312087-9b02b5c62c77?w=300&h=200&fit=crop"
  },
  UG: { 
    name: "Uganda", 
    projects: 4, 
    capacity: "320 MW", 
    status: "Construction",
    flag: "https://flagcdn.com/w160/ug.png",
    projectImage: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=300&h=200&fit=crop"
  },
  BF: { 
    name: "Burkina Faso", 
    projects: 3, 
    capacity: "180 MW", 
    status: "Early Development",
    flag: "https://flagcdn.com/w160/bf.png",
    projectImage: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=300&h=200&fit=crop"
  },
  CV: { 
    name: "Cape Verde", 
    projects: 2, 
    capacity: "95 MW", 
    status: "Operational",
    flag: "https://flagcdn.com/w160/cv.png",
    projectImage: "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=300&h=200&fit=crop"
  },
  LR: { 
    name: "Liberia", 
    projects: 1, 
    capacity: "45 MW", 
    status: "Planning",
    flag: "https://flagcdn.com/w160/lr.png",
    projectImage: "https://images.unsplash.com/photo-1566312087-9b02b5c62c77?w=300&h=200&fit=crop"
  },
  ST: { 
    name: "São Tomé & Príncipe", 
    projects: 1, 
    capacity: "25 MW", 
    status: "Feasibility",
    flag: "https://flagcdn.com/w160/st.png",
    projectImage: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=300&h=200&fit=crop"
  },
  SN: { 
    name: "Senegal", 
    projects: 5, 
    capacity: "380 MW", 
    status: "Active Development",
    flag: "https://flagcdn.com/w160/sn.png",
    projectImage: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=300&h=200&fit=crop"
  },
  SL: { 
    name: "Sierra Leone", 
    projects: 2, 
    capacity: "120 MW", 
    status: "Construction",
    flag: "https://flagcdn.com/w160/sl.png",
    projectImage: "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=300&h=200&fit=crop"
  },
  MW: { 
    name: "Malawi", 
    projects: 3, 
    capacity: "200 MW", 
    status: "Planning Phase",
    flag: "https://flagcdn.com/w160/mw.png",
    projectImage: "https://images.unsplash.com/photo-1566312087-9b02b5c62c77?w=300&h=200&fit=crop"
  },
  ZA: { 
    name: "South Africa", 
    projects: 15, 
    capacity: "1200 MW", 
    status: "Operational",
    flag: "https://flagcdn.com/w160/za.png",
    projectImage: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=300&h=200&fit=crop"
  },
  ZW: { 
    name: "Zimbabwe", 
    projects: 4, 
    capacity: "280 MW", 
    status: "Development",
    flag: "https://flagcdn.com/w160/zw.png",
    projectImage: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=300&h=200&fit=crop"
  },
  LY: { 
    name: "Libya", 
    projects: 6, 
    capacity: "500 MW", 
    status: "Planning",
    flag: "https://flagcdn.com/w160/ly.png",
    projectImage: "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=300&h=200&fit=crop"
  },
  TN: { 
    name: "Tunisia", 
    projects: 7, 
    capacity: "420 MW", 
    status: "Construction",
    flag: "https://flagcdn.com/w160/tn.png",
    projectImage: "https://images.unsplash.com/photo-1566312087-9b02b5c62c77?w=300&h=200&fit=crop"
  },
  // Asia & Middle East
  AE: { 
    name: "UAE", 
    projects: 10, 
    capacity: "750 MW", 
    status: "Operational",
    flag: "https://flagcdn.com/w160/ae.png",
    projectImage: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=300&h=200&fit=crop"
  },
  IN: { 
    name: "India", 
    projects: 25, 
    capacity: "2100 MW", 
    status: "Multi-Phase Development",
    flag: "https://flagcdn.com/w160/in.png",
    projectImage: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=300&h=200&fit=crop"
  },
}

export default function MapViz() {
  const chartRef = useRef<HTMLDivElement>(null)
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null)
  const [popupPosition, setPopupPosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    if (!chartRef.current || !window.am5) return

    // Use am5.ready to ensure everything is loaded properly
    window.am5.ready(function() {
      if (!chartRef.current) return

      // Create root element
      const root = window.am5.Root.new(chartRef.current)

      // Set themes with subtle animations
      root.setThemes([window.am5themes_Animated.new(root)])

      // Create the map chart with clean, professional styling
      const chart = root.container.children.push(
        window.am5map.MapChart.new(root, {
          panX: "translateX",
          panY: "translateY",
          projection: window.am5map.geoMercator(),
          maxPanOut: 0.15,
          maxZoomLevel: 5,
          minZoomLevel: 1.2,
          centerLongitude: 30,
          centerLatitude: 10,
          zoomLevel: 2.4, // Reduced zoom to fit labels better
          wheelX: "none",
          wheelY: "none",
          pinchZoom: true,
          zoomStep: 1.3,
          wheelSensitivity: 0.6,
          background: window.am5.Rectangle.new(root, {
            fill: window.am5.color("#d2e4d6"), // soft green for oceans
            fillOpacity: 1
          })
        }),
      )

      // Set home position and zoom level
      chart.set("homeZoomLevel", 2.4) // Reduced zoom to fit labels better
      chart.set("homeGeoPoint", { longitude: 30, latitude: 10 })

      // Subtle CTRL+scroll zoom functionality
      chart.events.on("wheel", function(ev: any) {
        if (ev.originalEvent.ctrlKey) {
          ev.originalEvent.preventDefault();
          chart.set("wheelY", "zoom");
        } else {
          chart.set("wheelY", "none");
        }
      });

      // Clean keyboard navigation
      chart.events.on("keydown", function(ev: any) {
        switch(ev.originalEvent.key) {
          case "Home":
            ev.originalEvent.preventDefault();
            chart.goHome();
            break;
          case "=":
          case "+":
            ev.originalEvent.preventDefault();
            chart.zoomIn();
            break;
          case "-":
            ev.originalEvent.preventDefault();
            chart.zoomOut();
            break;
        }
      });

      // Target regions - specific countries only
      const targetRegions = [
        // Africa
        "ET", "KE", "TZ", "UG", "BF", "CV", "LR", "ST", "SN", "SL", "MW", "ZA", "ZW", "LY", "TN",
        // Asia & Middle East
        "AE", "IN",
      ]

      // Professional color palette - subtle and clean
      const primaryColor = "#2563eb"
      const primaryColorLight = "#3b82f6"
      const primaryColorDark = "#1d4ed8"
      const accentColor = "#059669"
      
      // Subtle color variations for target countries
      const countryColors = {
        ET: "#2563eb", KE: "#3b82f6", TZ: "#1d4ed8", UG: "#1e40af", BF: "#1e3a8a",
        CV: "#059669", LR: "#047857", ST: "#065f46", SN: "#064e3b", SL: "#022c22",
        MW: "#2563eb", ZA: "#3b82f6", ZW: "#1d4ed8", LY: "#1e40af", TN: "#1e3a8a",
        AE: "#059669", IN: "#047857"
      }

      // Create polygon series for all countries with clean styling
      const polygonSeries = chart.series.push(
        window.am5map.MapPolygonSeries.new(root, {
          geoJSON: window.am5geodata_worldLow,
          exclude: ["AQ"], // Exclude Antarctica
        }),
      )

      // Create point series for location markers
      const pointSeries = chart.series.push(
        window.am5map.MapPointSeries.new(root, {})
      )

      // Clean country name labels
      // Removed label bullets to avoid clutter; country names are now shown via tooltips.

      // Wait for polygon series to be ready
      polygonSeries.events.on("datavalidated", function() {
        // Create clean location markers for target countries
        targetRegions.forEach((countryId) => {
          const dataItem = polygonSeries.getDataItemById(countryId)
          if (dataItem) {
            const polygon = dataItem.get("mapPolygon")
            if (polygon) {
              const centroid = polygon.visualCentroid()
              const data = countryData[countryId as keyof typeof countryData]
              
              const pointData = {
                geometry: {
                  type: "Point",
                  coordinates: [centroid.longitude, centroid.latitude]
                },
                countryId: countryId,
                name: data?.name || countryId
              }
              
              pointSeries.data.push(pointData)
            }
          }
        })
      })

      // Add clean, spacious labels that only show at zoom level 3+
      pointSeries.bullets.push(function(root: any, series: any, dataItem: any) {
        const data = dataItem.dataContext as any
        
        // List of countries that should have white text
        const whiteTextCountries = [
          "IN", "AE", "LY", "ET", "UG", "KE", "TZ", "MW", "ZW", "ZA", "BF", "SN", "LR", "SL"
        ]
        
        // Determine text color based on country
        const textColor = whiteTextCountries.includes(data.countryId) ? "#ffffff" : "#000000"
        
        const label = window.am5.Label.new(root, {
          text: data.name,
          centerX: window.am5.p50,
          centerY: window.am5.p50,
          fill: window.am5.color(textColor), // Dynamic text color based on country
          fontSize: "9px", // Smaller font size
          fontWeight: "600",
          fontFamily: "Poppins, system-ui, sans-serif",
          textAlign: "center",
          visible: true // Always visible like in the reference image
        })

        return window.am5.Bullet.new(root, {
          locationX: 0.5,
          locationY: 0.5,
          sprite: label
        })
      })

      // Remove circle markers - only show country names

      // Clean polygon styling
      polygonSeries.mapPolygons.template.setAll({
        interactive: true,
        fill: window.am5.color("#e8f1df"), // soft green for unmarked countries
        stroke: window.am5.color("#b7c6bc"), // subtle border
        strokeWidth: 1.5,
        strokeOpacity: 1
      })

      // Professional tooltip design
      polygonSeries.mapPolygons.template.set("tooltipHTML", `
        <div style="
          background: rgba(255, 255, 255, 0.98); 
          backdrop-filter: blur(12px);
          padding: 16px; 
          border-radius: 8px; 
          box-shadow: 0 10px 25px rgba(0,0,0,0.1);
          min-width: 240px;
          max-width: 300px;
          font-family: 'Inter', system-ui, sans-serif;
          border: 1px solid rgba(229, 231, 235, 0.8);
          font-size: 14px;
        ">
          <div style="font-size: 16px; font-weight: 600; color: #111827; margin-bottom: 8px;">
            {name}
          </div>
          <div style="color: #6b7280; line-height: 1.5;">
            <div style="margin-bottom: 4px;">
              <span style="font-weight: 500;">Projects:</span> 
              <span style="color: #2563eb; font-weight: 600;">{projects}</span>
            </div>
            <div style="margin-bottom: 4px;">
              <span style="font-weight: 500;">Capacity:</span> 
              <span style="color: #059669; font-weight: 600;">{capacity}</span>
            </div>
            <div style="margin-bottom: 4px;">
              <span style="font-weight: 500;">Status:</span> 
              <span style="color: #dc2626; font-weight: 600;">{status}</span>
            </div>
          </div>
        </div>
      `)

      // Add click event to polygons
      polygonSeries.mapPolygons.template.events.on("click", function(ev: any) {
        const dataItem = ev.target.dataItem
        if (dataItem) {
          const dataContext = dataItem.dataContext as any
          if (dataContext && targetRegions.includes(dataContext.id)) {
            const polygon = dataItem.get("mapPolygon")
            const centroid = polygon.visualCentroid()
            const point = chart.convert({
              longitude: centroid.longitude,
              latitude: centroid.latitude
            })
            
            polygonSeries.zoomToDataItem(dataItem, 1.2, true);
            
            setSelectedCountry(dataContext.id)
            setPopupPosition({
              x: point.x,
              y: point.y
            })
          }
        }
      })

      // Process data to add colors and country data
      polygonSeries.data.processor = window.am5.DataProcessor.new(root, {
        reusable: true
      })

      // Set up clean data styling
      polygonSeries.events.on("datavalidated", function() {
        chart.goHome();
        
        polygonSeries.mapPolygons.each(function(polygon: any) {
          const dataItem = polygon.dataItem
          const dataContext = dataItem?.dataContext as any
          if (dataContext) {
            const id = dataContext.id
            if (targetRegions.includes(id)) {
              const data = countryData[id as keyof typeof countryData]
              // Subtle, professional green for target countries
              polygon.set("fill", window.am5.color("#1e5c3a")) // muted green
              polygon.set("fillOpacity", 1)
              polygon.set("stroke", window.am5.color("#e5e7eb"))
              polygon.set("strokeWidth", 2)
              polygon.set("strokeOpacity", 1)
              
              // Add country data to the dataItem for tooltip
              if (data) {
                dataItem.set("projects", data.projects)
                dataItem.set("capacity", data.capacity)
                dataItem.set("status", data.status)
                dataItem.set("name", data.name)
              }
            } else {
              // Clean styling for non-target countries
              polygon.set("tooltipHTML", `
                <div style="
                  background: rgba(55, 65, 81, 0.95); 
                  backdrop-filter: blur(12px);
                  padding: 12px; 
                  border-radius: 6px; 
                  box-shadow: 0 8px 20px rgba(0,0,0,0.15);
                  font-family: 'Inter', system-ui, sans-serif;
                  font-size: 13px;
                  color: #ffffff;
                  border: 1px solid rgba(255,255,255,0.1);
                ">
                  {name}
                </div>
              `)
            }
          }
        })
      })

      // Clean hover and active states
      polygonSeries.mapPolygons.template.onPrivate("fill", function(this: any) {
        const dataItem = this.dataItem
        if (dataItem) {
          const dataContext = dataItem.dataContext as any
          if (dataContext && targetRegions.includes(dataContext.id)) {
            const countryColor = countryColors[dataContext.id as keyof typeof countryColors] || primaryColor
            // Subtle hover states for target countries
            this.states.create("hover", {
              fill: window.am5.color(countryColor),
              fillOpacity: 0.9,
              stroke: window.am5.color("#ffffff"),
              strokeWidth: 1.5
            })
            this.states.create("active", {
              fill: window.am5.color(countryColor),
              fillOpacity: 1,
              scale: 0.98
            })
          } else {
            // Subtle hover for non-target countries
            this.states.create("hover", {
              fill: window.am5.color("#f3f4f6"),
              stroke: window.am5.color("#d1d5db"),
              strokeWidth: 0.8
            })
            this.states.create("active", {
              fill: window.am5.color("#e5e7eb")
            })
          }
        }
      })

      // Clean zoom control
      const zoomControl = chart.set("zoomControl", window.am5map.ZoomControl.new(root, {
        paddingTop: 16,
        paddingRight: 16,
        x: window.am5.p100,
        centerX: window.am5.p100,
        y: window.am5.p100,
        centerY: window.am5.p100
      }))
      
      zoomControl.homeButton.set("visible", true)

      // Clean button styling
      const buttonStyle = {
        fill: window.am5.color("#ffffff"),
        cornerRadiusTL: 6,
        cornerRadiusTR: 6,
        cornerRadiusBL: 6,
        cornerRadiusBR: 6,
        stroke: window.am5.color("#e5e7eb"),
        strokeWidth: 1
      }

      if (zoomControl.plusButton) {
        zoomControl.plusButton.set("background", window.am5.RoundedRectangle.new(root, buttonStyle))
      }
      if (zoomControl.minusButton) {
        zoomControl.minusButton.set("background", window.am5.RoundedRectangle.new(root, buttonStyle))
      }
      if (zoomControl.homeButton) {
        zoomControl.homeButton.set("background", window.am5.RoundedRectangle.new(root, buttonStyle))
      }

      // Subtle hover effects for zoom control
      const buttons = [zoomControl.plusButton, zoomControl.minusButton, zoomControl.homeButton].filter(Boolean)
      buttons.forEach((button: any) => {
        if (button) {
          button.states.create("hover", {
            fill: window.am5.color("#f9fafb"),
            stroke: window.am5.color("#d1d5db")
          })
          button.states.create("active", {
            fill: window.am5.color("#f3f4f6"),
            scale: 0.95
          })
        }
      })

      // Function to zoom to all target countries
      const zoomToAllTargetCountries = () => {
        const zoomDataItems = targetRegions
          .map(id => polygonSeries.getDataItemById(id))
          .filter(item => item !== undefined)
        
        if (zoomDataItems.length > 0) {
          polygonSeries.zoomToDataItems(zoomDataItems, 1.2, true);
        }
      }

      // Add a clean button to zoom to all target countries
      const allCountriesButton = zoomControl.children.push(window.am5.Button.new(root, {
        icon: window.am5.Graphics.new(root, {
          svgPath: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z",
          fill: window.am5.color("#6b7280")
        }),
        background: window.am5.RoundedRectangle.new(root, buttonStyle),
        tooltipText: "View all target countries",
        x: window.am5.p100,
        centerX: window.am5.p100,
        y: window.am5.p100,
        centerY: window.am5.p100,
        dy: -100
      }))

      allCountriesButton.states.create("hover", {
        fill: window.am5.color("#f9fafb"),
        stroke: window.am5.color("#d1d5db")
      })

      allCountriesButton.events.on("click", function() {
        zoomToAllTargetCountries();
      })

      // Clean background click handler
      chart.chartContainer.get("background").events.on("click", function(ev: any) {
        ev.event.stopPropagation();
        chart.goHome();
      })

      // Subtle entrance animation
      chart.appear(1000, 100)

      // Cleanup function
      return () => {
        root.dispose()
      }
    })
  }, [])

  // Handle click outside popup
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      const popupContainer = document.querySelector('.popup-container');
      const mapBackground = document.querySelector('.am5-background');
      
      if (selectedCountry && 
          popupContainer && 
          !popupContainer.contains(target) &&
          !mapBackground?.contains(target)) {
        setSelectedCountry(null);
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [selectedCountry])

  const handleScriptLoad = () => {
    // Force re-render when scripts are loaded
    if (chartRef.current && window.am5) {
      // Trigger useEffect by updating a dependency or state if needed
    }
  }

  const getCountryInfo = (countryId: string) => {
    return countryData[countryId as keyof typeof countryData] || {
      name: countryId,
      projects: 0,
      capacity: "N/A",
      status: "No active projects",
      flag: "https://flagcdn.com/w160/xx.png",
      projectImage: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=300&h=200&fit=crop"
    }
  }

  return (
    <>
      <Script src="https://cdn.amcharts.com/lib/5/index.js" strategy="beforeInteractive" onLoad={handleScriptLoad} />
      <Script src="https://cdn.amcharts.com/lib/5/map.js" strategy="beforeInteractive" />
      <Script src="https://cdn.amcharts.com/lib/5/geodata/worldLow.js" strategy="beforeInteractive" />
      <Script src="https://cdn.amcharts.com/lib/5/themes/Animated.js" strategy="beforeInteractive" />
      
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
        
        .map-container {
          background: #ffffff;
          position: relative;
          overflow: hidden;
        }
        
        .popup-container {
          font-family: 'Inter', system-ui, sans-serif;
          backdrop-filter: blur(16px);
          background: rgba(255, 255, 255, 0.98);
          border: 1px solid rgba(229, 231, 235, 0.8);
          box-shadow: 
            0 20px 40px rgba(0, 0, 0, 0.1),
            0 0 0 1px rgba(255, 255, 255, 0.1);
          animation: popupSlideIn 0.2s ease-out;
          transform-origin: center center;
        }
        
        @keyframes popupSlideIn {
          from {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
          }
        }
      `}</style>
      
      <div className="flex justify-center items-start w-full h-full relative overflow-hidden">
        <div 
          ref={chartRef} 
          className="w-full h-full map-container"
          style={{
            overflowX: 'hidden',
            overflowY: 'hidden',
            pointerEvents: 'auto',
            position: 'relative',
            zIndex: 1,
          }}
          onClick={(e) => {
            e.stopPropagation();
          }}
          onWheel={(e) => {
            e.preventDefault()
            const scrollEvent = new WheelEvent('wheel', {
              deltaY: e.deltaY,
              bubbles: true
            })
            e.currentTarget.parentElement?.dispatchEvent(scrollEvent)
          }}
        />
        {selectedCountry && (
          <div 
            className="popup-container absolute rounded-lg p-0 overflow-hidden"
            style={{
              left: `${popupPosition.x + 20}px`,
              top: `${popupPosition.y - 100}px`,
              minWidth: '360px',
              maxWidth: '400px',
              transform: 'translate(-50%, -50%)',
              zIndex: 1000
            }}
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            {(() => {
              const info = getCountryInfo(selectedCountry)
              return (
                <div className="relative">
                  {/* Header with flag and title */}
                  <div className="flex justify-between items-start p-4 pb-3">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <img 
                          src={info.flag} 
                          alt={`${info.name} flag`}
                          className="w-8 h-6 object-cover rounded border border-gray-200"
                          onError={(e) => {
                            (e.target as HTMLImageElement).style.display = 'none'
                          }}
                        />
                        <div className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-green-500 rounded-full border border-white"></div>
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900">{info.name}</h3>
                    </div>
                    <button 
                      className="text-gray-400 hover:text-gray-600 text-lg font-light w-6 h-6 flex items-center justify-center rounded hover:bg-gray-100 transition-colors duration-200"
                      onClick={() => setSelectedCountry(null)}
                    >
                      ×
                    </button>
                  </div>

                  {/* Project Image */}
                  <div className="px-4 mb-4">
                    <div className="relative overflow-hidden rounded-lg">
                      <img 
                        src={info.projectImage} 
                        alt={`${info.name} renewable energy project`}
                        className="w-full h-28 object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = 'none'
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
                      <div className="absolute bottom-2 left-2">
                        <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-white/90 text-gray-700">
                          Renewable Energy
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Project Details */}
                  <div className="px-4 space-y-3">
                    <div className="grid grid-cols-1 gap-3">
                      <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg border border-blue-100">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                            <span className="text-white font-semibold text-sm">{info.projects}</span>
                          </div>
                          <span className="font-medium text-gray-700">Active Projects</span>
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg border border-green-100">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                            <span className="text-white font-semibold text-xs">⚡</span>
                          </div>
                          <div>
                            <span className="font-medium text-gray-700">Total Capacity</span>
                            <div className="text-green-600 font-semibold">{info.capacity}</div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg border border-orange-100">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
                            <span className="text-white font-semibold text-xs">📊</span>
                          </div>
                          <div>
                            <span className="font-medium text-gray-700">Status</span>
                            <div className="text-orange-600 font-semibold text-sm">{info.status}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <div className="p-4 pt-3">
                    <div className="bg-gray-50 rounded-lg p-3 border border-gray-100">
                      <p className="text-sm text-gray-600 leading-relaxed">
                        Comprehensive renewable energy development initiative focused on sustainable power generation, 
                        modern grid infrastructure, and community empowerment through clean energy access.
                      </p>
                    </div>
                  </div>
                </div>
              )
            })()}
          </div>
        )}
      </div>
    </>
  )
}
