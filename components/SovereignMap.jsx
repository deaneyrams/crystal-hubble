'use client';

import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { motion, AnimatePresence } from 'framer-motion';

// Use the public token injected via .env.local
mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || 'pk.eyJ1IjoiZGVtbyIsImEiOiJjbTFrYXNoZ2YwMDBnMmpxMHN4ZzV5In0.';

export default function SovereignMap({ initialLat = 5.6814, initialLng = -0.1149 }) {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [activeLayer, setActiveLayer] = useState('Satellite');
  const [distanceKm, setDistanceKm] = useState(null);
  const [showConversion, setShowConversion] = useState(false);
  const [isMapActive, setIsMapActive] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  // Haversine formula for distance calculation
  const calcDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  };

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const dist = calcDistance(position.coords.latitude, position.coords.longitude, initialLat, initialLng);
          setDistanceKm(dist.toFixed(1));
        },
        () => console.warn("Geolocation denied or unavailable")
      );
    }
    return () => window.removeEventListener('resize', checkMobile);
  }, [initialLat, initialLng]);

  useEffect(() => {
    if (map.current) return; // initialize map only once
    if (!mapContainer.current) return;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/satellite-streets-v12',
      center: [initialLng, initialLat],
      zoom: 16,
      pitch: 45,
      bearing: -17.6,
      dragRotate: true,
      touchZoomRotate: true,
      scrollZoom: true,
      interactive: true
    });

    map.current.on('style.load', () => {
      // 1. 3D Terrain & Fog Atmospherics
      map.current.addSource('mapbox-dem', {
        'type': 'raster-dem',
        'url': 'mapbox://mapbox.mapbox-terrain-dem-v1',
        'tileSize': 512,
        'maxzoom': 14
      });
      map.current.setTerrain({ 'source': 'mapbox-dem', 'exaggeration': 1.5 });

      map.current.setFog({
        'range': [-1, 2],
        'color': '#0D1B2A',
        'high-color': '#060D14',
        'space-color': '#000000',
        'star-intensity': 0.15
      });

      // 2. The Interactive Plot Extrusion
      const polygonCoords = [
        [initialLng - 0.002, initialLat - 0.002],
        [initialLng + 0.002, initialLat - 0.002],
        [initialLng + 0.002, initialLat + 0.002],
        [initialLng - 0.002, initialLat + 0.002],
        [initialLng - 0.002, initialLat - 0.002] // Close the polygon
      ];

      // Reduce 3D detail on mobile if necessary (handled by terrain exaggeration or simplified geometry)
      if (window.innerWidth < 768) {
         map.current.setTerrain({ 'source': 'mapbox-dem', 'exaggeration': 1.1 });
      }

      map.current.addSource('syntry-plot', {
        'type': 'geojson',
        'data': {
          'type': 'Feature',
          'geometry': {
            'type': 'Polygon',
            'coordinates': [polygonCoords]
          }
        }
      });

      // Pure Navy Extrusion Layer
      map.current.addLayer({
        'id': 'plot-extrusion',
        'type': 'fill-extrusion',
        'source': 'syntry-plot',
        'paint': {
          'fill-extrusion-color': '#0D1B2A',
          'fill-extrusion-height': 25,
          'fill-extrusion-base': 0,
          'fill-extrusion-opacity': 0.4
        }
      });

      // Cyber Teal Glowing Border Overlay
      map.current.addLayer({
        'id': 'plot-border',
        'type': 'line',
        'source': 'syntry-plot',
        'paint': {
          'line-color': '#2DD4BF',
          'line-width': 3,
          'line-opacity': 0.8
        }
      });
    });

    // 5. Conversion Trigger via Zoom Level
    map.current.on('zoom', () => {
       const currentZoom = map.current.getZoom();
       if (currentZoom > 17.5) {
          setShowConversion(true);
       } else {
          setShowConversion(false);
       }
    });

    return () => map.current?.remove();
  }, [initialLng, initialLat]);

  const activateMap = () => {
    setIsMapActive(true);
    if (map.current) {
      map.current.scrollZoom.enable();
      map.current.dragPan.enable();
      // Force interaction update
      mapContainer.current.style.pointerEvents = 'auto';
    }
  };

  return (
    <div className="relative w-full h-[600px] md:h-[80vh] rounded-[24px] overflow-hidden shadow-[0_20px_40px_rgba(13,27,42,0.15)] group">
      {/* Container for Mapbox */}
      <div 
        ref={mapContainer} 
        className={`absolute inset-0 w-full h-full bg-[#0D1B2A] transition-all duration-700 pointer-events-auto grayscale-0 opacity-100`} 
      />

      {/* Return Home Button (Top-Left) */}
      <button 
        onClick={() => window.location.href = '/'}
        className="absolute top-6 left-6 z-20 bg-black/60 backdrop-blur-md border border-white/10 text-white px-5 py-2.5 rounded-full font-head text-[10px] tracking-[2px] uppercase shadow-xl hover:bg-white hover:text-black transition-all flex items-center gap-2"
      >
        ← Return Home
      </button>
      
      {/* Tap to Interact Overlay (Mobile) */}
      {isMobile && !isMapActive && (
        <div className="absolute inset-0 z-[30] bg-black/40 backdrop-blur-sm flex flex-col items-center justify-center p-10 text-center cursor-pointer" onClick={activateMap}>
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-[#B8FF3C] text-[#0C0C14] px-8 py-4 rounded-full font-head text-xl tracking-[2px] uppercase shadow-[0_0_30px_rgba(184,255,60,0.4)]"
          >
            Tap to Explore Terrain
          </motion.div>
          <p className="mt-6 font-mono text-[10px] tracking-[2px] text-white/60 uppercase">Node 08 Multi-Sig Active</p>
        </div>
      )}
      
      {/* Cyber Teal CSS Ring Pulse matching Mapbox coordinates visually */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
         <div className="w-1/3 h-1/3 rounded-full border-4 border-[#2DD4BF]/0 animate-[pulse_3s_ease-out_infinite] shadow-[inset_0_0_50px_rgba(45,212,191,0.2)]"></div>
      </div>

      {/* Distance HUD Overlay */}
      {distanceKm && (
        <div className="absolute top-6 left-6 z-10 bg-[#0D1B2A]/60 backdrop-blur-md border border-white/10 text-white px-4 py-2 rounded-full font-mono text-[9px] shadow-lg tracking-[2px]">
          🛰️ DIST: {distanceKm} KM <span className="ml-2 px-1.5 py-0.5 bg-[#2DD4BF] text-[#0D1B2A] font-bold rounded">LIVE</span>
        </div>
      )}

      {/* The Layer Toggle (Glassmorphism) */}
      <div className="absolute top-6 right-6 z-10 bg-[#0D1B2A]/40 backdrop-blur-xl border border-white/10 rounded-[16px] p-2 flex gap-2 shadow-[0_15px_30px_rgba(0,0,0,0.4)]">
        {['Satellite', 'Legal', 'Future'].map((layer) => (
          <button 
            key={layer}
            onClick={() => setActiveLayer(layer)}
            className={`px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all ${activeLayer === layer ? 'bg-white text-[#0D1B2A] shadow-md' : 'text-white hover:bg-white/10'}`}
          >
            {layer === 'Satellite' ? '🛰️ SAT' : layer === 'Legal' ? '⚖️ NODE' : '🏗️ PLAN'}
          </button>
        ))}
      </div>

      {/* Mobile Hint HUD */}
      {!isMobile && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 bg-black/60 backdrop-blur-md text-white px-6 py-3 rounded-full font-bold text-[10px] uppercase tracking-widest pointer-events-none shadow-lg opacity-60 group-hover:opacity-0 transition-opacity">
          ⤢ Drag to Orbit
        </div>
      )}

      {/* Gold Conversion Trigger (Zoom Condition) */}
      <AnimatePresence>
        {showConversion && (
          <motion.div 
            initial={{ y: 50, opacity: 0, scale: 0.9 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 50, opacity: 0, scale: 0.9 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 w-[94%] md:w-[400px]"
          >
            <div className="bg-[#B8FF3C] p-[1px] rounded-[12px] shadow-[0_30px_60px_rgba(0,0,0,0.5)]">
               <div className="bg-[#0C0C14] rounded-[11px] p-6 flex flex-col items-center text-center gap-6 border border-white/5">
                 <div>
                    <h4 className="text-[#B8FF3C] font-head font-black tracking-[1px] text-xl leading-none uppercase">Verified.</h4>
                    <p className="text-white/40 font-mono text-[10px] mt-3 uppercase tracking-[2px]">Node 08 evaluates this parcel at a <strong>98% Security Score</strong>.</p>
                 </div>
                 <button className="w-full px-8 py-4 bg-[#B8FF3C] text-black rounded-lg font-head text-lg uppercase tracking-[2px] transition-transform active:scale-95 shadow-[0_0_20px_rgba(184,255,60,0.2)]">
                   Initialize Bond
                 </button>
               </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
