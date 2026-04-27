'use client';
import React, { useState, useEffect } from 'react';
import neighborhoodBounds from '@/lib/neighborhood-bounds.json';
import existingPolygons from '@/lib/existing-polygons.json';
import { MapContainer, TileLayer, FeatureGroup, useMap } from 'react-leaflet';
import { EditControl } from 'react-leaflet-draw';
import * as turf from '@turf/turf';
import 'leaflet/dist/leaflet.css';
import 'leaflet-draw/dist/leaflet.draw.css';

// Greater Accra Bounding Box (Enhanced for Syntry Guard)
const GREATER_ACCRA_BOUNDS = {
  minLat: 5.45,
  maxLat: 6.10,
  minLng: -0.80,
  maxLng: 0.70
};

// Mock Simulated Physical Edge Network (Walls, Fences, Roads extracted from Satellite)
const MOCK_PHYSICAL_BOUNDARIES = turf.featureCollection([
   turf.lineString([[ -0.35, 5.65 ], [ -0.25, 5.65 ]]),
   turf.lineString([[ -0.25, 5.65 ], [ -0.25, 5.75 ]]),
   turf.lineString([[ -0.15, 5.60 ], [ -0.10, 5.60 ]]),
   turf.lineString([[ -0.1870, 5.6037 ], [ -0.1860, 5.6040 ]]), // Example boundary near default coordinate
   turf.lineString([[ -0.1860, 5.6040 ], [ -0.1860, 5.6030 ]])
]);

const MapResizer = () => {
  const map = useMap();
  useEffect(() => {
    setTimeout(() => {
      map.invalidateSize();
    }, 500);
  }, [map]);
  return null;
};

const SovereignMap = ({ onAreaCalculated, onLocationVerified, onCentroidValidated, initialPos = [5.6037, -0.1870] }) => {
  const [hasMounted, setHasMounted] = useState(false);
  
  useEffect(() => {
    setHasMounted(true);
  }, []);

  const [areaInAcres, setAreaInAcres] = useState(0);
  const [areaInSqMeters, setAreaInSqMeters] = useState(0);
  const [centroidNode, setCentroidNode] = useState(null);
  const [error, setError] = useState(null);
  const [activeLayer, setActiveLayer] = useState(null);
  const [isSnapped, setIsSnapped] = useState(false);
  const [encroachments, setEncroachments] = useState([]);
  const [isFilingWhistleblower, setIsFilingWhistleblower] = useState(false);
  const [whistleblowerSuccess, setWhistleblowerSuccess] = useState(null);

  if (!hasMounted || typeof window === 'undefined') return null;

  const fileWhistleblowerReport = async () => {
     if (!activeLayer || encroachments.length === 0) return;
     setIsFilingWhistleblower(true);
     try {
       const userCoords = activeLayer.toGeoJSON().geometry.coordinates[0];
       const res = await fetch('/api/whistleblower', {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify({ encroachments, userCoordinates: userCoords })
       });
       const result = await res.json();
       if (result.success) {
          setWhistleblowerSuccess(result);
       }
     } catch (err) {
       console.error(err);
     }
     setIsFilingWhistleblower(false);
  };

  const handleCollisions = (geojsonToTest, calcArea, leafletLayer) => {
    let conflicts = [];
    let isRed = false;

    existingPolygons.features.forEach(neighbor => {
      try {
        const intersection = turf.intersect(turf.featureCollection([geojsonToTest, neighbor]));
        if (intersection) {
          const overlapArea = turf.area(intersection);
          const percentOverlap = (overlapArea / calcArea) * 100;
          if (percentOverlap > 0.5) {
             conflicts.push({
               id: neighbor.properties.id,
               areaSqM: overlapArea.toFixed(2),
               percent: percentOverlap.toFixed(2)
             });
             isRed = true;
          }
        }
      } catch (err) {
         console.warn('Intersection check error:', err);
      }
    });

    setEncroachments(conflicts);
    if (isRed) {
       if (leafletLayer) leafletLayer.setStyle({ color: '#FF0000', fillColor: '#FF0000', weight: 4 });
       return true;
    } else {
       if (!isSnapped && leafletLayer) leafletLayer.setStyle({ color: '#3388ff', fillColor: '#3388ff', weight: 3 });
       return false;
    }
  };

  const checkGeofence = (lat, lng) => {
    const isInside = 
      lat >= GREATER_ACCRA_BOUNDS.minLat && 
      lat <= GREATER_ACCRA_BOUNDS.maxLat && 
      lng >= GREATER_ACCRA_BOUNDS.minLng && 
      lng <= GREATER_ACCRA_BOUNDS.maxLng;
    return isInside;
  };

  const _onCreate = (e) => {
    const { layerType, layer } = e;
    if (layerType === 'polygon') {
      setActiveLayer(layer);
      setIsSnapped(false);
      const geojson = layer.toGeoJSON();
      
      // Calculate Area via Turf
      const calculatedArea = turf.area(geojson); // SQ Meters
      const aSqM = calculatedArea.toFixed(2);
      const aAcres = (calculatedArea * 0.000247105).toFixed(2);
      
      // Verify Centroid Node against Neighborhoods
      const centroid = turf.centroid(geojson);
      let validNeighborhood = null;
      neighborhoodBounds.features.forEach(feature => {
        if (turf.booleanPointInPolygon(centroid, feature)) {
          validNeighborhood = feature.properties.name;
        }
      });
      setCentroidNode(validNeighborhood);
      
      // Verify Geofence (Accra Guard)
      const coords = geojson.geometry.coordinates[0];
      let outOfBounds = false;
      coords.forEach(coord => {
        if (!checkGeofence(coord[1], coord[0])) outOfBounds = true;
      });

      if (outOfBounds) {
        setError('GEOFENCING ALERT: Location falls outside Greater Accra Syntry Nodes.');
        onLocationVerified(false, null);
        layer.setStyle({ color: '#ff0000', fillColor: '#ff0000' });
      } else {
        const hasEncroachment = handleCollisions(geojson, calculatedArea, layer);
        setError(null);
        setAreaInAcres(aAcres);
        setAreaInSqMeters(aSqM);
        onAreaCalculated({ acres: aAcres, sqMeters: aSqM });
        onLocationVerified(!hasEncroachment, geojson);
        if (onCentroidValidated) onCentroidValidated(validNeighborhood);
      }
    }
  };

  const _onEdited = (e) => {
    // Similar logic for edits
    e.layers.eachLayer(layer => {
      const geojson = layer.toGeoJSON();
      const calculatedArea = turf.area(geojson);
      const aSqM = calculatedArea.toFixed(2);
      const aAcres = (calculatedArea * 0.000247105).toFixed(2);

      const centroid = turf.centroid(geojson);
      let validNeighborhood = null;
      neighborhoodBounds.features.forEach(feature => {
        if (turf.booleanPointInPolygon(centroid, feature)) {
          validNeighborhood = feature.properties.name;
        }
      });
      setCentroidNode(validNeighborhood);

        const hasEncroachment = handleCollisions(geojson, calculatedArea, layer);
        setAreaInAcres(aAcres);
        setAreaInSqMeters(aSqM);
        onAreaCalculated({ acres: aAcres, sqMeters: aSqM });
        onLocationVerified(!hasEncroachment, geojson);
        if (onCentroidValidated) onCentroidValidated(validNeighborhood);
    });
  };

  const applyAutoSnap = () => {
     if (!activeLayer) return;
     const geojson = activeLayer.toGeoJSON();
     const oldCoords = geojson.geometry.coordinates[0];
     
     // Pull vertices to geometric edges
     const snappedCoords = oldCoords.map(coord => {
        const pt = turf.point(coord);
        let nearestPt = null;
        let minDist = Infinity;
        
        MOCK_PHYSICAL_BOUNDARIES.features.forEach(line => {
           const snapped = turf.nearestPointOnLine(line, pt);
           // We are doing a 2km distance threshold for snapping validation testing
           if (snapped.properties.dist < minDist && snapped.properties.dist < 2) {
              minDist = snapped.properties.dist;
              nearestPt = snapped;
           }
        });
        
        return nearestPt ? nearestPt.geometry.coordinates : coord;
     });
     
     // Push modifications via leafet standard
     geojson.geometry.coordinates = [snappedCoords];
     const latlngs = snappedCoords.map(c => [c[1], c[0]]);
     activeLayer.setLatLngs(latlngs);
     activeLayer.setStyle({ color: '#D4AF37', fillColor: '#D4AF37', weight: 3 }); // Relic Gold snap styling
     setIsSnapped(true);

     // Refresh calculations for Truth Guard
     const calculatedArea = turf.area(geojson);
     const aSqM = calculatedArea.toFixed(2);
     const aAcres = (calculatedArea * 0.000247105).toFixed(2);
     
     const hasEncroachment = handleCollisions(geojson, calculatedArea, activeLayer);
     if (hasEncroachment) {
        // Red style already applied by handleCollisions overriding gold
        setIsSnapped(false); // Consider snap invalid if it hits an encroachment
     }

     setAreaInAcres(aAcres);
     setAreaInSqMeters(aSqM);
     onAreaCalculated({ acres: aAcres, sqMeters: aSqM });
     onLocationVerified(!hasEncroachment, geojson);
  };

  return (
    <div className="relative w-full h-full">
      <MapContainer 
        center={initialPos} 
        zoom={13} 
        className="w-full h-full rounded-2xl z-10"
        scrollWheelZoom={true}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        />
        <FeatureGroup>
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
            }}
          />
        </FeatureGroup>
        <MapResizer />
      </MapContainer>

      {/* Overlays */}
      <div className="absolute top-4 left-12 z-[1000] space-y-2">
        {areaInSqMeters > 0 && (
          <div className="bg-slate-900 border border-gold-500/50 text-white px-4 py-3 rounded-xl shadow-2xl backdrop-blur-md">
            <p className="text-[10px] font-black uppercase tracking-widest text-[#00C853] mb-1">Calculated Footprint</p>
            <div className="flex gap-4">
               <p className="text-xl font-black">{areaInSqMeters} <span className="text-[10px] font-bold text-slate-400">SQM</span></p>
               <div className="w-[1px] bg-slate-700"></div>
               <p className="text-xl font-black">{areaInAcres} <span className="text-[10px] font-bold text-slate-400">ACRES</span></p>
            </div>
            {centroidNode && (
               <p className="text-[9px] font-bold text-slate-400 mt-2 bg-slate-800 px-2 py-1 rounded inline-block shadow-sm">Node: {centroidNode}</p>
            )}
            
            {!isSnapped && encroachments.length === 0 && (
               <button onClick={applyAutoSnap} className="block mt-4 w-full bg-[#D4AF37] text-slate-900 text-[10px] font-black uppercase tracking-widest py-1.5 rounded-lg shadow-xl hover:scale-[1.02] transition-transform">
                  Auto-Snap to Boundaries ⚡
               </button>
            )}
            {isSnapped && encroachments.length === 0 && (
               <span className="block mt-4 text-[#D4AF37] text-[10px] font-black uppercase tracking-widest flex items-center gap-1">
                  ✓ Snapped to Grid
               </span>
            )}
            
            {encroachments.length > 0 && (
               <div className="mt-4 bg-red-600/20 border border-red-500/50 rounded-lg p-2 animate-pulse">
                  <p className="text-[10px] font-black uppercase tracking-widest text-[#FF0000] mb-1">CRITICAL: ENCROACHMENT DETECTED</p>
                  {encroachments.map((enc, idx) => (
                     <div key={idx} className="text-xs text-white">
                        <span className="font-bold opacity-80">{enc.id}:</span> <span className="text-[#FF0000] font-bold">{enc.areaSqM} SQM ({enc.percent}%)</span>
                     </div>
                  ))}
                  
                   {!whistleblowerSuccess && (
                     <button 
                        onClick={fileWhistleblowerReport} 
                        disabled={isFilingWhistleblower}
                        className="mt-3 w-full bg-[#FF0000] text-white text-[9px] font-black uppercase tracking-widest py-2 rounded-lg shadow-xl hover:scale-[1.02] transition-transform disabled:opacity-50"
                     >
                        {isFilingWhistleblower ? 'Generating Cryptographic Report...' : 'File Whistleblower Act 720 Report'}
                     </button>
                   )}
                   {whistleblowerSuccess && (
                     <div className="mt-3 bg-slate-900 border border-slate-700 p-2 rounded-lg text-[9px]">
                        <p className="text-[#00C853] font-bold">✓ Report Filed Securely</p>
                        <p className="text-slate-400 mt-1">Hash: <span className="text-white">{whistleblowerSuccess.disputeHash.substring(0, 16)}...</span></p>
                        {whistleblowerSuccess.emailPreviewUrl && (
                           <a href={whistleblowerSuccess.emailPreviewUrl} target="_blank" className="text-[#D4AF37] underline mt-1 block">View Official Compliance Email</a>
                        )}
                     </div>
                   )}
               </div>
            )}
          </div>
        )}
        {error && (
          <div className="bg-red-600 text-white px-4 py-2 rounded-xl shadow-2xl animate-bounce">
            <p className="text-[10px] font-black uppercase tracking-widest">Protocol Guard</p>
            <p className="text-xs font-bold">{error}</p>
          </div>
        )}
      </div>

      <div className="absolute bottom-4 left-4 z-[1000]">
        <div className="bg-white/90 backdrop-blur-md border border-slate-200 p-3 rounded-xl shadow-lg">
          <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Syntry Geospatial Node</p>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#00C853]"></div>
            <p className="text-[10px] font-bold text-slate-900">Greater Accra Region Active</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SovereignMap;
