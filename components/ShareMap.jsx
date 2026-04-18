'use client';

import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

export default function ShareMap({ coordinates }) {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (mapRef.current) return;
    if (!mapContainerRef.current) return;

    const token = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || 'pk.eyJ1Ijoic3ludHJ5LWFkbWluIiwiYSI6ImNsc3R5Mnd6czAxbnIyam1yZjR4eGdzYjIifQ.fake-key';
    mapboxgl.accessToken = token;

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/satellite-v9',
      center: [-0.1149, 5.6814], // Ashifla Coordinate Base
      zoom: 14,
      interactive: false,
      failIfMajorPerformanceCaveat: false
    });

    map.on('load', () => {
      mapRef.current = map;
      setMapLoaded(true);
      
      // Procedurally append Tailwind marker
      const el = document.createElement('div');
      el.className = 'marker-container';
      el.innerHTML = `
        <div class="relative flex items-center justify-center">
            <div class="absolute w-8 h-8 border-2 border-[#00F5D4] rounded-full animate-ping opacity-60" style="border-color: #00F5D4;"></div>
            <div class="w-4 h-4 rounded-full shadow-[0_0_20px_#00F5D4]" style="background-color: #00F5D4; box-shadow: 0 0 20px #00F5D4;"></div>
        </div>
      `;
      new mapboxgl.Marker(el)
        .setLngLat([-0.1149, 5.6814])
        .addTo(map);

      map.resize();
    });

    return () => {
      if (map) {
        map.remove();
        mapRef.current = null;
      }
    };
  }, []);

  return (
    <div className="w-full h-full relative notranslate">
      <div 
        ref={mapContainerRef} 
        className="w-full h-full absolute inset-0 rounded-xl"
        id="share-map-viewport" 
        style={{ width: '100%', height: '100%' }}
      />
      
      {!mapLoaded && (
        <div className="absolute inset-0 z-0 flex flex-col items-center justify-center border border-white/5 opacity-80" style={{ backgroundImage: 'radial-gradient(circle, #00F5D4 1px, transparent 1px)', backgroundSize: '30px 30px' }}>
          <span className="text-[#00F5D4] font-mono text-xs tracking-widest bg-black/60 px-4 py-3 rounded-xl border border-[#00F5D4]/30 backdrop-blur-md animate-pulse shadow-[0_0_15px_rgba(0,245,212,0.2)] text-center">Suspending logic...<br/>Defying the inevitable...</span>
        </div>
      )}

      {/* 49.51 Acre Focus Overlay */}
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black to-transparent h-24 pointer-events-none z-10"></div>
      <div className="absolute bottom-4 left-4 right-4 z-20">
        <div className="bg-black/60 backdrop-blur-md border border-white/10 p-2 rounded text-center">
            <span className="text-[9px] text-[#00F5D4] font-mono uppercase tracking-widest">
              Ashifla-Otatten Boundaries Confirmed
            </span>
        </div>
      </div>
    </div>
  );
}
