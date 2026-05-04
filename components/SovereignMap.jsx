'use client';
import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import 'leaflet/dist/leaflet.css';
import 'leaflet-draw/dist/leaflet.draw.css';
import * as turf from '@turf/turf';

// Dynamic Loaders for Leaflet to ensure Zero Server-Side trace
const MapContainer = dynamic(() => import('react-leaflet').then(mod => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then(mod => mod.TileLayer), { ssr: false });
const FeatureGroup = dynamic(() => import('react-leaflet').then(mod => mod.FeatureGroup), { ssr: false });

// Constants for Ghana Standard Plot Logic
const FULL_PLOT_SQFT = 7000; // 70x100 ft
const HALF_PLOT_SQFT = 5000; // 50x100 ft
const ACRE_SQFT = FULL_PLOT_SQFT * 4; // Ghana Customary Standard: 4 Plots = 1 Acre

const SovereignMap = ({ onAreaCalculated, initialPos = [5.6037, -0.1870] }) => {
  const [hasMounted, setHasMounted] = useState(false);
  const [L, setL] = useState(null);
  const [EditControl, setEditControl] = useState(null);
  const [metrics, setMetrics] = useState(null);
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    setHasMounted(true);
    const initLeaflet = async () => {
      const Leaflet = await import('leaflet');
      setL(Leaflet.default || Leaflet);
      
      try {
        await import('leaflet-draw');
        const ReactLeafletDraw = await import('react-leaflet-draw');
        const component = ReactLeafletDraw.EditControl || ReactLeafletDraw.default?.EditControl;
        if (component) setEditControl(() => component);
      } catch (err) {
        console.error("SYNTRY Engine: Draw Handshake Failure:", err);
      }
    };
    initLeaflet();
  }, []);

  const calculateSovereignMetrics = (geojson) => {
    const areaSqM = turf.area(geojson);
    const areaSqFt = areaSqM * 10.76391; // High precision conversion
    
    // Ghana Standard Calculation
    const fullPlots = (areaSqFt / FULL_PLOT_SQFT).toFixed(2);
    const halfPlots = (areaSqFt / HALF_PLOT_SQFT).toFixed(2);
    const acres = (areaSqFt / ACRE_SQFT).toFixed(3);

    let classification = 'Custom Polygon';
    let isDiscrepancy = false;

    // Discrepancy Detection Logic
    if (areaSqFt > 1000) {
      const diffFull = Math.abs(areaSqFt - FULL_PLOT_SQFT);
      const diffHalf = Math.abs(areaSqFt - HALF_PLOT_SQFT);
      
      if (diffFull < 500) classification = 'Standard Full Plot (70x100)';
      else if (diffHalf < 300) classification = 'Standard Half Plot (50x100)';
      else if (areaSqFt > 25000) classification = 'Acreage / Multi-Plot Parcel';
      else isDiscrepancy = true;
    }

    const data = {
      sqM: areaSqM.toFixed(2),
      sqFt: areaSqFt.toFixed(2),
      fullPlots,
      halfPlots,
      acres,
      classification,
      isDiscrepancy
    };

    setMetrics(data);
    if (onAreaCalculated) onAreaCalculated(data);
    
    if (isDiscrepancy) {
      setAlert({ type: 'warning', message: 'Non-Standard Plot detected. Potential boundary encroachment.' });
    } else {
      setAlert(null);
    }

    return data;
  };

  const _onCreated = (e) => {
    const { layer } = e;
    const geojson = layer.toGeoJSON();
    const data = calculateSovereignMetrics(geojson);
    
    if (data.isDiscrepancy) {
      layer.setStyle({ color: '#EF4444', fillColor: '#EF4444', weight: 4 });
    } else {
      layer.setStyle({ color: '#0D9488', fillColor: '#0D9488', weight: 3 });
    }
  };

  if (!hasMounted || !L || !EditControl) {
    return (
      <div className="h-full w-full bg-[#0F172A] flex items-center justify-center animate-pulse">
        <p className="text-[#0D9488] font-mono text-[10px] uppercase tracking-[0.3em]">Calibrating Sovereign Map Matrix...</p>
      </div>
    );
  }

  return (
    <div className="h-full w-full relative">
      <MapContainer 
        center={initialPos} 
        zoom={17} 
        style={{ height: '100%', width: '100%', background: '#0F172A' }}
        zoomControl={false}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://carto.com/">CARTO</a>'
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
                drawError: { color: '#EF4444', message: '<strong>Boundary Violation</strong>' },
                shapeOptions: { color: '#0D9488' }
              }
            }}
          />
        </FeatureGroup>
      </MapContainer>

      {/* Geospatial Telemetry Overlay */}
      {metrics && (
        <div className="absolute bottom-8 left-8 right-8 z-[1000] bg-[#0F172A]/80 backdrop-blur-xl border border-white/10 p-6 rounded-md shadow-2xl animate-in slide-in-from-bottom-4 duration-500">
          <div className="flex justify-between items-start mb-6">
            <div>
              <p className="text-[10px] font-medium text-[#0D9488] uppercase tracking-[0.2em] mb-1">Syntry Geospatial Audit</p>
              <h3 className="text-xl font-medium text-white tracking-tight">{metrics.classification}</h3>
            </div>
            {metrics.isDiscrepancy && (
              <div className="bg-red-500/10 border border-red-500/30 px-3 py-1.5 rounded-md flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-red-500 rounded-md animate-pulse"></span>
                <span className="text-[9px] font-medium text-red-400 uppercase tracking-widest">Discrepancy Found</span>
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { label: 'Area (Sq Ft)', value: `${Number(metrics.sqFt).toLocaleString()} ft²` },
              { label: 'Full Plots', value: metrics.fullPlots },
              { label: 'Half Plots', value: metrics.halfPlots },
              { label: 'Total Acreage', value: `${metrics.acres} Ac` }
            ].map((stat, i) => (
              <div key={i} className="bg-white/5 p-4 rounded-md border border-white/5 group hover:border-[#0D9488]/30 transition-all">
                <p className="text-[9px] font-medium text-white/40 uppercase tracking-widest mb-1">{stat.label}</p>
                <p className="text-lg font-medium text-white">{stat.value}</p>
              </div>
            ))}
          </div>
          
          {alert && (
            <div className="mt-4 p-3 bg-red-500/5 border border-red-500/10 rounded text-[10px] text-red-400/80 italic font-mono">
              [SYSTEM_ALERT]: {alert.message}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SovereignMap;
