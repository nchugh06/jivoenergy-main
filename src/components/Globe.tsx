"use client"
import React, { useEffect, useRef, useState } from 'react';
import Globe, { GlobeMethods } from 'react-globe.gl';
import { countryData } from '@/data/countryData';

interface Label {
  lat: number;
  lng: number;
  // text: string;
  color?: string;
  size?: number;
  altitude?: number;
  label?: string;
  image?: string;
  energyData?: {
    renewablePercentage: number;
    totalEnergyProduction: string;
    mainEnergySource: string;
    energyConsumption: string;
  };
}

interface GlobeProps {
  labelsData?: Label[];
  onLabelClick?: (label: object, event: MouseEvent, coords: { lat: number; lng: number; altitude: number }) => void;
  onLabelRightClick?: (label: object, event: MouseEvent, coords: { lat: number; lng: number; altitude: number }) => void;
  onLabelHover?: (label: object | null, prevLabel: object | null) => void;
  hexPolygonsData?: any[];
  hexPolygonLabel?: string | ((d: any) => string);
  hexPolygonGeoJsonGeometry?: string | ((d: any) => any);
  hexPolygonColor?: string | ((d: any) => string);
  hexPolygonAltitude?: number | string | ((d: any) => number);
  hexPolygonResolution?: number | string | ((d: any) => number);
  hexPolygonMargin?: number | string | ((d: any) => number);
  hexPolygonUseDots?: boolean | string | ((d: any) => boolean);
  hexPolygonCurvatureResolution?: number | string | ((d: any) => number);
  hexPolygonDotResolution?: number | string | ((d: any) => number);
  hexPolygonsTransitionDuration?: number;
  onHexPolygonClick?: (polygon: any, event: MouseEvent, coords: { lat: number; lng: number; altitude: number }) => void;
  onHexPolygonRightClick?: (polygon: any, event: MouseEvent, coords: { lat: number; lng: number; altitude: number }) => void;
  onHexPolygonHover?: (polygon: any | null, prevPolygon: any | null) => void;
}

export default function GlobeComponent({
  labelsData = countryData,
  onLabelClick,
  onLabelRightClick,
  onLabelHover,
  hexPolygonsData = [],
  hexPolygonLabel = 'name',
  hexPolygonGeoJsonGeometry = 'geometry',
  hexPolygonColor = () => '#ffffaa',
  hexPolygonAltitude = 0.001,
  hexPolygonResolution = 3,
  hexPolygonMargin = 0.2,
  hexPolygonUseDots = false,
  hexPolygonCurvatureResolution = 5,
  hexPolygonDotResolution = 12,
  hexPolygonsTransitionDuration = 0,
  onHexPolygonClick,
  onHexPolygonRightClick,
  onHexPolygonHover,
}: GlobeProps) {
  const globeRef = useRef<GlobeMethods>(undefined);
  const [hoveredCountry, setHoveredCountry] = useState<Label | null>(null);

  useEffect(() => {
    if (globeRef.current) {
      // Auto-rotate
      (globeRef.current as any).controls().autoRotate = true;
      (globeRef.current as any).controls().autoRotateSpeed = -0.5;
      
      // Set initial camera position to focus on Africa
      (globeRef.current as any).pointOfView({
        lat: 0,  // Center latitude
        lng: 20,  // Center longitude (focusing on Africa)
        altitude: 2  // Fixed zoom level
      });

      // Disable zoom and pan for fixed view
      (globeRef.current as any).controls().enableZoom = false;
      (globeRef.current as any).controls().enablePan = false;

      // Remove rotation constraints for free movement
      (globeRef.current as any).controls().minPolarAngle = 0;
      (globeRef.current as any).controls().maxPolarAngle = Math.PI;
      (globeRef.current as any).controls().minAzimuthAngle = -Infinity;
      (globeRef.current as any).controls().maxAzimuthAngle = Infinity;

      // Cleanup event listener
      return () => {
        // Remove the scroll prevention code since we want normal page scrolling
      };
    }
  }, []);

  const handleLabelHover = (label: object | null, prevLabel: object | null) => {
    setHoveredCountry(label as Label | null);
    if (onLabelHover) {
      onLabelHover(label, prevLabel);
    }
  };

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }} className="globe-container">
      <Globe
        ref={globeRef}
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
        bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
        backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
        labelsData={labelsData}
        labelLat="lat"
        labelLng="lng"
        labelText="text"
        labelColor="color"
        labelSize="size"
        labelAltitude="altitude"
        labelLabel="label"
        labelResolution={3}
        labelIncludeDot={true}
        labelDotRadius={0.1}
        labelDotOrientation={() => 'bottom'}
        labelsTransitionDuration={1000}
        onLabelClick={onLabelClick}
        onLabelRightClick={onLabelRightClick}
        onLabelHover={handleLabelHover}
        hexPolygonsData={hexPolygonsData}
        hexPolygonLabel={hexPolygonLabel}
        hexPolygonGeoJsonGeometry={hexPolygonGeoJsonGeometry}
        hexPolygonColor={hexPolygonColor}
        hexPolygonAltitude={hexPolygonAltitude}
        hexPolygonResolution={hexPolygonResolution}
        hexPolygonMargin={hexPolygonMargin}
        hexPolygonUseDots={hexPolygonUseDots}
        hexPolygonCurvatureResolution={hexPolygonCurvatureResolution}
        hexPolygonDotResolution={hexPolygonDotResolution}
        hexPolygonsTransitionDuration={hexPolygonsTransitionDuration}
        onHexPolygonClick={onHexPolygonClick}
        onHexPolygonRightClick={onHexPolygonRightClick}
        onHexPolygonHover={onHexPolygonHover}
        htmlElementsData={labelsData}
        htmlLat="lat"
        htmlLng="lng"
        htmlElement={(d: object) => {
          const label = d as Label;
          const el = document.createElement('div');
          el.innerHTML = `<img src="${label.image || '/logo.png'}" alt="${''}" style="width: 40px; height: 30px; border: 2px solid #062516; object-fit: cover;" />`;
          el.style.cursor = 'pointer';
          el.addEventListener('mouseenter', () => handleLabelHover(label, null));
          el.addEventListener('mouseleave', () => handleLabelHover(null, label));
          return el;
        }}
      />
      {hoveredCountry && (
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            color: '#062516',
            padding: '20px',
            borderRadius: '12px',
            maxWidth: '320px',
            zIndex: 1000,
            backdropFilter: 'blur(10px)',
            boxShadow: '0 8px 32px rgba(10, 92, 53, 0.15)',
            border: '1px solid rgba(10, 92, 53, 0.1)',
            animation: 'fadeIn 0.3s ease-out',
            fontFamily: 'inherit',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
            <img
              src={hoveredCountry.image || '/logo.png'}
              // alt={hoveredCountry}
              style={{
                width: '60px',
                height: '45px',
                marginRight: '12px',
                border: '2px solid #062516',
                objectFit: 'cover'
              }}
            />
            <h3 style={{ 
              margin: '0',
              fontSize: '1.5rem',
              fontWeight: '600',
              color: '#062516',
            }}>
              {/* {hoveredCountry} */}
            </h3>
          </div>
          {hoveredCountry.energyData && (
            <div style={{
              display: 'grid',
              gap: '12px',
            }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '8px',
                backgroundColor: 'rgba(10, 92, 53, 0.05)',
                borderRadius: '8px',
              }}>
                <span style={{ color: '#062516' }}>Renewable Energy</span>
                <span style={{ fontWeight: '500', color: '#062516' }}>{hoveredCountry.energyData.renewablePercentage}%</span>
              </div>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '8px',
                backgroundColor: 'rgba(10, 92, 53, 0.05)',
                borderRadius: '8px',
              }}>
                <span style={{ color: '#062516' }}>Total Production</span>
                <span style={{ fontWeight: '500', color: '#062516' }}>{hoveredCountry.energyData.totalEnergyProduction}</span>
              </div>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '8px',
                backgroundColor: 'rgba(10, 92, 53, 0.05)',
                borderRadius: '8px',
              }}>
                <span style={{ color: '#062516' }}>Main Source</span>
                <span style={{ fontWeight: '500', color: '#062516' }}>{hoveredCountry.energyData.mainEnergySource}</span>
              </div>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '8px',
                backgroundColor: 'rgba(10, 92, 53, 0.05)',
                borderRadius: '8px',
              }}>
                <span style={{ color: '#062516' }}>Consumption</span>
                <span style={{ fontWeight: '500', color: '#062516' }}>{hoveredCountry.energyData.energyConsumption}</span>
              </div>
            </div>
          )}
        </div>
      )}
      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translate(-50%, -48%);
          }
          to {
            opacity: 1;
            transform: translate(-50%, -50%);
          }
        }
      `}</style>
    </div>
  );
} 