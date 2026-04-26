'use client';
import React, { useState, useEffect } from 'react';
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

const MapResizer = () => {
  const map = useMap();
  useEffect(() => {
    setTimeout(() => {
      map.invalidateSize();
    }, 500);
  }, [map]);
  return null;
};

const SovereignMap = ({ onAreaCalculated, onLocationVerified, initialPos = [5.6037, -0.1870] }) => {
  const [area, setArea] = useState(0);
  const [error, setError] = useState(null);

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
      const geojson = layer.toGeoJSON();
      
      // Calculate Area via Turf
      const calculatedArea = turf.area(geojson); // SQ Meters
      const areaInAcres = (calculatedArea * 0.000247105).toFixed(2);
      
      // Verify Geofence (Accra Guard)
      const coords = geojson.geometry.coordinates[0];
      let outOfBounds = false;
      coords.forEach(coord => {
        if (!checkGeofence(coord[1], coord[0])) outOfBounds = true;
      });

      if (outOfBounds) {
        setError('GEOFENCING ALERT: Location falls outside Greater Accra Syntry Nodes.');
        onLocationVerified(false);
        layer.setStyle({ color: '#ff0000', fillColor: '#ff0000' });
      } else {
        setError(null);
        setArea(areaInAcres);
        onAreaCalculated(areaInAcres);
        onLocationVerified(true);
      }
    }
  };

  const _onEdited = (e) => {
    // Similar logic for edits
    e.layers.eachLayer(layer => {
      const geojson = layer.toGeoJSON();
      const calculatedArea = turf.area(geojson);
      const areaInAcres = (calculatedArea * 0.000247105).toFixed(2);
      setArea(areaInAcres);
      onAreaCalculated(areaInAcres);
    });
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
        {area > 0 && (
          <div className="bg-slate-900 border border-gold-500/50 text-white px-4 py-2 rounded-xl shadow-2xl backdrop-blur-md">
            <p className="text-[10px] font-black uppercase tracking-widest text-[#00C853]">Calculated Footprint</p>
            <p className="text-xl font-black">{area} <span className="text-xs">Acres</span></p>
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
