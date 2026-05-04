'use client';
import React, { useState, useEffect, useRef } from 'react';
import neighborhoodBounds from '@/lib/neighborhood-bounds.json';
import existingPolygons from '@/lib/existing-polygons.json';
import { MapContainer, TileLayer, FeatureGroup, useMap } from 'react-leaflet';
import L from 'leaflet';
import * as turf from '@turf/turf';

import 'leaflet/dist/leaflet.css';
import 'leaflet-draw/dist/leaflet.draw.css';

// Greater Accra Bounding Box
const GREATER_ACCRA_BOUNDS = {
  minLat: 5.45,
  maxLat: 6.10,
  minLng: -0.80,
  maxLng: 0.70
};

// Ghana Measurement Standards
const FULL_PLOT_SQFT = 7000;
const HALF_PLOT_SQFT = 5000;
const ACRE_SQFT = 43560;

const MapResizer = () => {
  const map = useMap();
  useEffect(() => {
    const timer = setTimeout(() => {
      map.invalidateSize();
    }, 500);
    return () => clearTimeout(timer);
  }, [map]);
  return null;
};

const SovereignMap = ({ onAreaCalculated, onLocationVerified, onCentroidValidated, initialPos = [5.6037, -0.1870] }) => {
  const [hasMounted, setHasMounted] = useState(false);
  const [EditControl, setEditControl] = useState(null);
  const [leafletLoaded, setLeafletLoaded] = useState(false);
  
  const safeLat = parseFloat(initialPos[0]) || 5.6037;
  const safeLng = parseFloat(initialPos[1]) || -0.1870;

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setHasMounted(true);
      window.L = L;
      
      const loadDraw = async () => {
        try {
          await import('leaflet-draw');
          const ReactLeafletDraw = await import('react-leaflet-draw');
          setEditControl(() => ReactLeafletDraw.EditControl);
          setLeafletLoaded(true);
        } catch (err) {
          console.error("Syntry Map: Draw Module Handshake Failed:", err);
        }
      };

      loadDraw();
    }
  }, []);

  const [measurementData, setMeasurementData] = useState(null);
  const [centroidNode, setCentroidNode] = useState(null);
  const [error, setError] = useState(null);
  const [activeLayer, setActiveLayer] = useState(null);
  const [encroachments, setEncroachments] = useState([]);
  const [discrepancy, setDiscrepancy] = useState(false);

  if (!hasMounted || typeof window === 'undefined') return null;

  const handleCollisions = (geojsonToTest, calcArea, leafletLayer) => {
    let conflicts = [];
    let isRed = false;

    existingPolygons.features.forEach(neighbor => {
      try {
        const collision = turf.intersect(turf.featureCollection([geojsonToTest, neighbor]));
        if (collision) {
          const overlapArea = turf.area(collision);
          const percentOverlap = (overlapArea / calcArea) * 100;
          if (percentOverlap > 0.5) {
             conflicts.push({
                id: neighbor.properties.id || 'Neighboring Plot',
                areaSqM: overlapArea.toFixed(2),
                percent: percentOverlap.toFixed(2)
             });
             isRed = true;
          }
        }
      } catch (err) {
         console.warn('Syntry Forensic: Intersection check skipped:', err);
      }
    });

    setEncroachments(conflicts);
    if (isRed) {
       if (leafletLayer) leafletLayer.setStyle({ color: '#EF4444', fillColor: '#EF4444', weight: 4 });
       return true;
    } else {
       if (leafletLayer) leafletLayer.setStyle({ color: '#0D9488', fillColor: '#0D9488', weight: 3 });
       return false;
    }
  };

  const calculateGhanaMetrics = (geojson) => {
    const areaSqM = turf.area(geojson);
    const areaSqFt = areaSqM * 10.7639;
    
    const plots = (areaSqFt / FULL_PLOT_SQFT).toFixed(2);
    const acres = (areaSqFt / ACRE_SQFT).toFixed(2);

    // Detect Discrepancy
    let classification = 'Custom Polygon';
    let hasDiscrepancy = false;

    if (areaSqFt > 1000 && areaSqFt < 15000) {
      if (Math.abs(areaSqFt - FULL_PLOT_SQFT) > 1000 && Math.abs(areaSqFt - HALF_PLOT_SQFT) > 1000) {
        hasDiscrepancy = true;
      }
    }

    if (Math.abs(areaSqFt - FULL_PLOT_SQFT) < 500) classification = 'Standard Full Plot (70x100)';
    else if (Math.abs(areaSqFt - HALF_PLOT_SQFT) < 500) classification = 'Standard Half Plot (50x100)';

    setDiscrepancy(hasDiscrepancy);
    return { sqM: areaSqM.toFixed(2), sqFt: areaSqFt.toFixed(2), plots, acres, classification };
  };

  const _onCreate = (e) => {
    const { layerType, layer } = e;
    if (layerType === 'polygon') {
      setActiveLayer(layer);
      const geojson = layer.toGeoJSON();
      const metrics = calculateGhanaMetrics(geojson);
      setMeasurementData(metrics);

      const polyCentroid = turf.centroid(geojson);
      let validNeighborhood = null;
      neighborhoodBounds.features.forEach(feature => {
        if (turf.booleanPointInPolygon(polyCentroid, feature)) {
          validNeighborhood = feature.properties.name;
        }
      });
      setCentroidNode(validNeighborhood);
      
      const hasEncroachment = handleCollisions(geojson, parseFloat(metrics.sqM), layer);
      onAreaCalculated?.(metrics);
      onLocationVerified?.(!hasEncroachment, geojson);
      if (onCentroidValidated) onCentroidValidated(validNeighborhood);
    }
  };

  const _onEdited = (e) => {
    e.layers.eachLayer(layer => {
      const geojson = layer.toGeoJSON();
      const metrics = calculateGhanaMetrics(geojson);
      setMeasurementData(metrics);

      const polyCentroid = turf.centroid(geojson);
      let validNeighborhood = null;
      neighborhoodBounds.features.forEach(feature => {
        if (turf.booleanPointInPolygon(polyCentroid, feature)) {
          validNeighborhood = feature.properties.name;
        }
      });
      setCentroidNode(validNeighborhood);

      const hasEncroachment = handleCollisions(geojson, parseFloat(metrics.sqM), layer);
      onAreaCalculated?.(metrics);
      onLocationVerified?.(!hasEncroachment, geojson);
      if (onCentroidValidated) onCentroidValidated(validNeighborhood);
    });
  };

  return (
    <div className="relative w-full h-full">
      <MapContainer 
        center={[safeLat, safeLng]} 
        zoom={13} 
        className="w-full h-full rounded-md z-10"
        scrollWheelZoom={true}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; Syntry Sovereign GIS'
        />
        <FeatureGroup>
          {leafletLoaded && EditControl && (
            <EditControl
              position="topright"
              onCreated={_onCreate}
              onEdited={_onEdited}
              draw={{
                rectangle: false,
                circle: false,
                circlemarker: false,
                marker: true,
                polyline: false,
                polygon: {
                  allowIntersection: false,
                  drawError: { color: '#e1e1e1', message: '<strong>Polygon overlap forbidden</strong>' },
                  shapeOptions: { color: '#0D9488' }
                }
              }}
            />
          )}
        </FeatureGroup>
        <MapResizer />
      </MapContainer>

      {/* Sovereign Measurement Console */}
      <div className="absolute top-4 left-4 z-[1000] space-y-3 pointer-events-none">
        {measurementData && (
          <div className="bg-[#0F172A]/90 backdrop-blur-xl border border-white/10 p-5 rounded-md shadow-2xl pointer-events-auto w-72 animate-in fade-in slide-in-from-left-4 duration-300">
            <div className="flex items-center justify-between mb-4">
               <p className="text-[10px] font-medium uppercase tracking-[3px] text-syntry-teal-600">Geospatial Audit</p>
               <span className="w-2 h-2 rounded-md bg-syntry-teal-600 animate-pulse"></span>
            </div>
            
            <div className="space-y-4">
               <div className="grid grid-cols-2 gap-4">
                  <div>
                     <p className="text-[8px] uppercase tracking-widest text-white/40 mb-1">Standard Plots</p>
                     <p className="text-xl font-medium text-white">{measurementData.plots}</p>
                  </div>
                  <div className="border-l border-white/5 pl-4">
                     <p className="text-[8px] uppercase tracking-widest text-white/40 mb-1">Acreage</p>
                     <p className="text-xl font-medium text-white">{measurementData.acres}</p>
                  </div>
               </div>

               <div className="h-[1px] bg-white/5 w-full"></div>

               <div className="space-y-2">
                  <div className="flex justify-between items-center">
                     <p className="text-[8px] uppercase tracking-widest text-white/40">Total Area</p>
                     <p className="text-xs font-medium text-white">{measurementData.sqFt} SQFT</p>
                  </div>
                  <p className="text-[9px] font-medium text-syntry-teal-600 bg-syntry-teal-600/10 px-2 py-1 rounded inline-block">
                     {measurementData.classification}
                  </p>
               </div>

               {discrepancy && (
                  <div className="bg-amber-500/10 border border-amber-500/30 p-3 rounded-md">
                     <p className="text-[9px] font-medium uppercase tracking-widest text-amber-500 mb-1 flex items-center gap-2">
                        ⚠️ Measurement Discrepancy
                     </p>
                     <p className="text-[8px] text-amber-500/80 leading-relaxed">
                        The current polygon does not match standard Ghana plot dimensions (70x100 or 50x100).
                     </p>
                  </div>
               )}

               {encroachments.length > 0 && (
                  <div className="bg-red-500/10 border border-red-500/30 p-3 rounded-md animate-pulse">
                     <p className="text-[9px] font-medium uppercase tracking-widest text-red-500 mb-1 flex items-center gap-2">
                        🛑 Overlap Detected
                     </p>
                     {encroachments.map((enc, i) => (
                        <p key={i} className="text-[8px] text-red-500/80">
                           {enc.id}: {enc.percent}% Overlap
                        </p>
                     ))}
                  </div>
               )}
            </div>
          </div>
        )}
        
        {centroidNode && (
          <div className="bg-white/5 backdrop-blur-md border border-white/5 px-4 py-2 rounded-md shadow-lg pointer-events-auto">
             <p className="text-[8px] uppercase tracking-[3px] text-white/30 font-medium">Node Verified</p>
             <p className="text-[10px] text-white font-medium">{centroidNode} Sector Active</p>
          </div>
        )}
      </div>

      {/* Protocol Overlay */}
      <div className="absolute bottom-4 right-4 z-[1000]">
        <div className="bg-[#0F172A]/80 backdrop-blur-md border border-white/5 p-4 rounded-md shadow-xl flex items-center gap-4">
           <div className="space-y-1">
              <p className="text-[8px] uppercase tracking-widest text-white/20">Coordinate System</p>
              <p className="text-[10px] font-medium text-white">WGS84 / Ghana Custom</p>
           </div>
           <div className="h-8 w-[1px] bg-white/5"></div>
           <div className="space-y-1">
              <p className="text-[8px] uppercase tracking-widest text-white/20">Precision</p>
              <p className="text-[10px] font-medium text-syntry-teal-600">± 0.05m (Drone)</p>
           </div>
        </div>
      </div>
    </div>
  );
};

export default SovereignMap;
