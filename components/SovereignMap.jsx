'use client';
import React, { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import 'leaflet/dist/leaflet.css';
import 'leaflet-draw/dist/leaflet.draw.css';
import * as turf from '@turf/turf';

// Ghana Standard Constants (2026 Sovereign Slate)
const FULL_PLOT_SQFT = 7000;  // 70x100
const HALF_PLOT_SQFT = 5000;  // 50x100
const ACRE_SQFT = 43560;

// Dynamic imports with zero SSR trace
const MapContainer = dynamic(() => import('react-leaflet').then(mod => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then(mod => mod.TileLayer), { ssr: false });
const FeatureGroup = dynamic(() => import('react-leaflet').then(mod => mod.FeatureGroup), { ssr: false });
const GeoJSON = dynamic(() => import('react-leaflet').then(mod => mod.GeoJSON), { ssr: false });

const SovereignMap = ({ onAreaCalculated, onLocationVerified, onCentroidValidated, initialPos = [5.6037, -0.1870] }) => {
  const [hasMounted, setHasMounted] = useState(false);
  const [L, setL] = useState(null);
  const [EditControl, setEditControl] = useState(null);
  const [measurementData, setMeasurementData] = useState(null);
  const [isRed, setIsRed] = useState(false);
  const [discrepancy, setDiscrepancy] = useState(false);

  useEffect(() => {
    setHasMounted(true);
    const loadLeaflet = async () => {
      const Leaflet = await import('leaflet');
      setL(Leaflet.default || Leaflet);
      
      try {
        await import('leaflet-draw');
        const ReactLeafletDraw = await import('react-leaflet-draw');
        // Interop fix: handle both default and named exports
        const component = ReactLeafletDraw.EditControl || ReactLeafletDraw.default?.EditControl;
        if (component) setEditControl(() => component);
      } catch (err) {
        console.error("Syntry Map: Draw Handshake Error:", err);
      }
    };
    loadLeaflet();
  }, []);

  const calculateGhanaMetrics = (geojson) => {
    const areaSqM = turf.area(geojson);
    const areaSqFt = areaSqM * 10.7639;
    
    const plots = (areaSqFt / FULL_PLOT_SQFT).toFixed(2);
    const acres = (areaSqFt / ACRE_SQFT).toFixed(3);

    // Detect Discrepancy (Ghana Standard Protocol)
    let classification = 'Custom Polygon';
    let hasDiscrepancy = false;

    // If it's roughly plot-sized but doesn't match the standard within 15% tolerance
    if (areaSqFt > 3000 && areaSqFt < 12000) {
      const diffFull = Math.abs(areaSqFt - FULL_PLOT_SQFT);
      const diffHalf = Math.abs(areaSqFt - HALF_PLOT_SQFT);
      
      if (diffFull < 500) classification = 'Standard Full Plot (70x100)';
      else if (diffHalf < 500) classification = 'Standard Half Plot (50x100)';
      else hasDiscrepancy = true;
    }

    setDiscrepancy(hasDiscrepancy);
    return { 
      sqM: areaSqM.toFixed(2), 
      sqFt: areaSqFt.toFixed(2), 
      plots, 
      acres, 
      classification,
      hasDiscrepancy 
    };
  };

  const _onCreated = (e) => {
    const { layer } = e;
    const geojson = layer.toGeoJSON();
    const metrics = calculateGhanaMetrics(geojson);
    setMeasurementData(metrics);

    if (onAreaCalculated) {
      onAreaCalculated(metrics);
    }
    
    // Visual feedback for discrepancy
    if (metrics.hasDiscrepancy) {
      layer.setStyle({ color: '#EF4444', fillColor: '#EF4444', weight: 4 });
      setIsRed(true);
    } else {
      layer.setStyle({ color: '#0D9488', fillColor: '#0D9488', weight: 3 });
      setIsRed(false);
    }
  };

  if (!hasMounted || !L || !EditControl) {
    return (
      <div className="w-full h-full bg-syntry-obsidian flex items-center justify-center animate-pulse">
        <p className="text-syntry-teal-600 font-mono text-[10px] uppercase tracking-widest">Establishing Geospatial Handshake...</p>
      </div>
    );
  }

  return (
    <div className="w-full h-full relative">
      <MapContainer 
        center={initialPos} 
        zoom={16} 
        style={{ height: '100%', width: '100%', background: '#0F172A' }}
        zoomControl={false}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        />
        
        <FeatureGroup>
          <EditControl
            position="topright"
            onCreated={_onCreated}
            draw={{
              rectangle: false,
              circle: false,
              circlemarker: false,
              marker: false,
              polyline: false,
              polygon: {
                allowIntersection: false,
                drawError: { color: '#EF4444', message: '<strong>Overlap Forbidden</strong>' },
                shapeOptions: { color: '#0D9488' }
              }
            }}
          />
        </FeatureGroup>
      </MapContainer>

      {/* Overlay UI */}
      {measurementData && (
        <div className="absolute bottom-6 left-6 right-6 z-[1000] bg-syntry-obsidian/90 backdrop-blur-xl border border-white/10 p-6 rounded-md shadow-2xl animate-in slide-in-from-bottom-4">
          <div className="flex justify-between items-start mb-4">
             <div>
                <p className="text-[9px] font-medium text-syntry-teal-600 uppercase tracking-widest mb-1">Syntry Geospatial Node</p>
                <h3 className="text-white font-medium text-sm">{measurementData.classification}</h3>
             </div>
             {discrepancy && (
                <div className="bg-red-500/20 text-red-400 border border-red-500/30 px-3 py-1 rounded-md text-[9px] font-medium uppercase tracking-widest flex items-center gap-2">
                   <span className="w-1.5 h-1.5 bg-red-500 rounded-md animate-pulse"></span>
                   Measurement Discrepancy
                </div>
             )}
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
             <div className="bg-white/5 p-3 rounded-md border border-white/5">
                <p className="text-[8px] text-syntry-slate-300/40 uppercase tracking-widest">Square Footage</p>
                <p className="text-white font-medium">{measurementData.sqFt} ft²</p>
             </div>
             <div className="bg-white/5 p-3 rounded-md border border-white/5">
                <p className="text-[8px] text-syntry-slate-300/40 uppercase tracking-widest">Plots (70x100)</p>
                <p className="text-white font-medium">{measurementData.plots}</p>
             </div>
             <div className="bg-white/5 p-3 rounded-md border border-white/5">
                <p className="text-[8px] text-syntry-slate-300/40 uppercase tracking-widest">Total Acreage</p>
                <p className="text-white font-medium">{measurementData.acres} Ac</p>
             </div>
             <div className="bg-white/5 p-3 rounded-md border border-white/5">
                <p className="text-[8px] text-syntry-slate-300/40 uppercase tracking-widest">Registry Sync</p>
                <p className="text-syntry-teal-600 font-medium tracking-tight">ACTIVE</p>
             </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SovereignMap;
