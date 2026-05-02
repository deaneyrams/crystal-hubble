'use client';

import React, { useState, useEffect, useMemo, useRef, Suspense } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import CertificateGenerator from '@/components/CertificateGenerator';
import MintingPanel from '@/components/admin/MintingPanel';
import LiquidityPanel from '@/components/admin/LiquidityPanel';
import OracleView from '@/components/admin/OracleView';
import PublicSidebar from '@/components/admin/PublicSidebar';
import { generateSovereignToken } from '@/lib/sovereign-crypto';

// [MISSION: MAP THE BIG PUSH] Infrastructure Data
const infrastructureGeoJSON = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      properties: { type: 'motorway', name: 'Accra-Tema Motorway (27.7km Expansion)' },
      geometry: {
        type: 'LineString',
        coordinates: [
          [-0.1878, 5.5942], // Tetteh Quarshie
          [-0.1500, 5.6100],
          [-0.1000, 5.6300],
          [-0.0500, 5.6500],
          [0.0022, 5.6728]   // Tema Interchange
        ]
      }
    },
    {
      type: 'Feature',
      properties: { type: 'hub', name: 'Tetteh Quarshie Interchange Hub' },
      geometry: { type: 'Point', coordinates: [-0.1878, 5.5942] }
    },
    {
      type: 'Feature',
      properties: { type: 'hub', name: 'Tema-Mpakadan Rail Terminal' },
      geometry: { type: 'Point', coordinates: [0.0022, 5.6728] }
    }
  ]
};

// Helper: Haversine distance in km
const getDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Radius of the earth in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
};

const calculateAppreciation = (plot) => {
  // Check against Motorway points and Hubs
  const infraPoints = [
    { lat: 5.5942, lng: -0.1878 }, // Tetteh
    { lat: 5.6728, lng: 0.0022 },  // Tema
    { lat: 5.6100, lng: -0.1500 }, // Mid Points
    { lat: 5.6500, lng: -0.0500 }
  ];
  
  let minDist = Infinity;
  infraPoints.forEach(p => {
    const d = getDistance(plot.lat, plot.lng, p.lat, p.lng);
    if (d < minDist) minDist = d;
  });

  if (minDist < 2) return { category: 'High Growth', factor: '15-20% Annually', color: '#00F5D4', note: 'Within 2km of Infrastructure Catalyst' };
  if (minDist < 5) return { category: 'Strategic', factor: '8-12% Annually', color: '#4c84ff', note: 'Strategic Growth Corridor Zone' };
  return { category: 'Stable', factor: '4-6% Annually', color: '#gray-400', note: 'Consistent Regional Appreciation' };
};

// Mock data generator for 500 plots
const generateMockPlots = (count) => {
  const plots = [];
  const baseLng = -0.1878; // Start near Accra
  const baseLat = 5.6042;
  
  for (let i = 0; i < count; i++) {
    const lat = baseLat + (Math.random() - 0.5) * 0.15;
    const lng = baseLng + (Math.random()) * 0.25; // Trend towards Tema
    
    // Transparency Audit Logic
    const transparencyRoll = Math.random();
    let transparencyStatus = 'verified_clean';
    if (transparencyRoll > 0.7 && transparencyRoll <= 0.9) transparencyStatus = 'case_by_case';
    else if (transparencyRoll > 0.9) transparencyStatus = 'revoked_suspect';

    // Anti-Corruption Rule: Hide Revoked/Suspect
    if (transparencyStatus === 'revoked_suspect') continue;

    plots.push({
      id: `plot-${i}`,
      lng,
      lat,
      // 60% verified, 40% pending
      status: Math.random() > 0.4 ? 'verified' : 'pending',
      value: Math.floor(Math.random() * 500000) + 100000,
      transparencyStatus,
      auditDate: 'Feb 2026'
    });
  }
  return plots;
};

export default function AdminControlTower() {
  const [plots, setPlots] = useState([]);
  const [isEmergencyLocked, setIsEmergencyLocked] = useState(false);
  const [selectedPlot, setSelectedPlot] = useState(null);
  const [showOracleView, setShowOracleView] = useState(false);
  const [showInfrastructure, setShowInfrastructure] = useState(true);
  const [pulseSize, setPulseSize] = useState(1);
  const [animatedTvl, setAnimatedTvl] = useState(0);
  const [showFractionalModal, setShowFractionalModal] = useState(false);
  const [fractionalToken, setFractionalToken] = useState(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [isDecomposing, setIsDecomposing] = useState(false);
  const [isPublicView, setIsPublicView] = useState(true); // Default to Public Investor Mode
  const mapRef = useRef(null);

  // Omni-Search State
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResult, setSearchResult] = useState(null);
  
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setShowSearch(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleSearchExecute = () => {
     let match = null;
     const q = searchQuery.toLowerCase();
     
     // Detect GPS Match: (Lat, Lng)
     const gpsMatch = searchQuery.match(/([\d\.]+)\s*,\s*(-?[\d\.]+)/);
     
     if (gpsMatch) {
         const lat = parseFloat(gpsMatch[1]);
         const lng = parseFloat(gpsMatch[2]);
         // Find closest plot within 5km
         match = plots.find(p => getDistance(p.lat, p.lng, lat, lng) < 5);
     } else if (q.includes('gh-')) {
         // Fake Plus Code lookup
         match = plots.find(p => p.id === 'SYN-DEED-2026-ASH-001'); // default to ashifla
     } else {
         // Project Name
         match = plots.find(p => p.area.toLowerCase().includes(q) || p.id.toLowerCase().includes(q));
     }

     if (match) {
         setSearchResult(match);
         // Fly-To
         if (mapRef.current) {
             const map = mapRef.current;
             // Curved Flight Path
             map.flyTo([match.lat, match.lng], 16, { duration: 3, animate: true, easeLinearity: 0.1 });
             
             // Auto-draw GeoJSON Boundary
             if (map.searchBoundary) {
                 map.removeLayer(map.searchBoundary);
             }
             
             // Pseudo-polygon boundary around the point representing exact acreage
             const latOff = 0.002;
             const lngOff = 0.002;
             const boundaryGeoJSON = {
               type: "Feature",
               geometry: {
                 type: "Polygon",
                 coordinates: [[
                   [match.lng - lngOff, match.lat - latOff],
                   [match.lng + lngOff, match.lat - latOff],
                   [match.lng + lngOff, match.lat + latOff],
                   [match.lng - lngOff, match.lat + latOff],
                   [match.lng - lngOff, match.lat - latOff]
                 ]]
               }
             };
             
             map.searchBoundary = L.geoJSON(boundaryGeoJSON, {
                  style: { color: '#00F5D4', weight: 4, opacity: 0.8, fillOpacity: 0.2, dashArray: '5, 10' }
             }).addTo(map);

             setSelectedPlot(match);
         }
     } else {
         setSearchResult("NOT_FOUND");
     }
  };

  // Sales Pulse Engine (50-Sale Stress Test)
  const [soldUnits, setSoldUnits] = useState(0);
  const [latestFomo, setLatestFomo] = useState("Initializing Global Liquidity Node...");

  const locations = useMemo(() => [
     { flag: "🇬🇭", loc: "Accra" },
     { flag: "🇦🇪", loc: "Dubai" },
     { flag: "🇺🇸", loc: "NYC" },
     { flag: "🇬🇧", loc: "London" },
     { flag: "🇨🇦", loc: "Toronto" },
     { flag: "🇩🇪", loc: "Berlin" }
  ], []);

  useEffect(() => {
     if (!isPublicView) return;
     const interval = setInterval(() => {
         setSoldUnits(prev => {
             if (prev >= 100) {
                 setLatestFomo("🔒 Liquidity Pool Closed (100/100 Packets Sold)");
                 return 100;
             }
             const randBuy = Math.floor(Math.random() * 3) + 1; // 1 to 3 units
             const nextVal = Math.min(100, prev + randBuy);
             
             // Pick random location
             const rLoc = locations[Math.floor(Math.random() * locations.length)];
             const valEscrowed = (nextVal * 3318.92).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2});
             
             setLatestFomo(`${rLoc.flag} Investor (${rLoc.loc}) secured ${randBuy} units. | 💰 Escrowed: $${valEscrowed} / $331,892.40`);
             
             return nextVal;
         });
     }, 4000);
     return () => clearInterval(interval);
  }, [isPublicView, locations]);
  const mapContainerRef = useRef(null);

  // Share Modal State
  const [shareLink, setShareLink] = useState(null);

  // Audit State
  const [isAuditing, setIsAuditing] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [auditProgress, setAuditProgress] = useState(0);
  const [auditStream, setAuditStream] = useState({
      started: false,
      lidar: { status: 'pending', result: null },
      deed: { status: 'pending', result: null },
      consensus: { status: 'pending', result: null },
      finished: false,
      verified: false
  });

  // Phase 15: Mapbox Native Vanilla Bypass initialization -> Swapped to Leaflet
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (mapRef.current) return; // Prevent double initialization
    if (!mapContainerRef.current) return;

    const map = L.map(mapContainerRef.current, {
      center: [5.6814, -0.1149],
      zoom: 14,
      zoomControl: false
    });

    L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
      attribution: 'Esri &mdash; Esri, i-cubed, USDA, USGS, AEX, GeoEye, IGN, UPR-EGP'
    }).addTo(map);

    L.control.zoom({ position: 'topright' }).addTo(map);

    console.log("MAP FULLY LOADED");
    mapRef.current = map;
    setMapLoaded(true);

    // React 18 Strict Mode mounts twice. If we don't destroy, the VM buffer fills.
    return () => {
       if (map) {
         map.remove();
         mapRef.current = null;
       }
    };
  }, []);

  // Handle Infrastructure Layers natively
  useEffect(() => {
     if (!mapLoaded || !mapRef.current || typeof window === 'undefined') return;
     const map = mapRef.current;
     
     if (showInfrastructure) {
        if (!map.infraLayer) {
           map.infraLayer = L.geoJSON(infrastructureGeoJSON, {
              style: function (feature) {
                 if (feature.properties.type === 'motorway') {
                    return { color: '#a78bfa', weight: 4 };
                 }
                 return {};
              },
              pointToLayer: function (feature, latlng) {
                 if (feature.properties.type === 'hub') {
                    return L.circleMarker(latlng, {
                       radius: 8,
                       fillColor: '#00F5D4',
                       color: 'rgba(255,255,255,0.2)',
                       weight: 4,
                       fillOpacity: 1
                    });
                 }
              }
           }).addTo(map);
        }
     } else {
        if (map.infraLayer) {
           map.removeLayer(map.infraLayer);
           map.infraLayer = null;
        }
     }
  }, [mapLoaded, showInfrastructure]);

  // Handle markers natively
  useEffect(() => {
     if (!mapLoaded || !mapRef.current || typeof window === 'undefined') return;
     const map = mapRef.current;
     
     // Remove old markers if tracking them
     if (map.plotMarkers) {
       map.plotMarkers.forEach(marker => marker.remove());
     }
     map.plotMarkers = [];

     plots.forEach(plot => {
        const customIcon = L.divIcon({
          className: `leaflet-marker-icon plot-marker w-3 h-3 rounded-full shadow-lg border-2 border-[#0b132b] cursor-pointer transition-all duration-700 
                  ${selectedPlot?.id === plot.id ? 'scale-[2.5] z-10 border-white shadow-[0_0_20px_rgba(255,255,255,0.5)]' : 'hover:scale-150'}
                  ${isAuditing && selectedPlot?.id === plot.id ? 'animate-pulse scale-[3] shadow-[0_0_30px_rgba(255,215,0,1)]' : ''}
                  ${plot.status === 'pending' ? 'bg-[#1E3A8A] shadow-[0_0_15px_rgba(30,58,138,0.9)]' : plot.status === 'reserved' || plot.status === 'escrowed' ? 'bg-[#FFD700] shadow-[0_0_15px_rgba(255,215,0,0.9)]' : 'bg-[#00F5D4] shadow-[0_0_15px_rgba(0,245,212,0.9)]'}`,
          html: '', 
          iconSize: [12, 12],
          iconAnchor: [6, 6]
        });

        const marker = L.marker([plot.lat, plot.lng], { icon: customIcon, title: `Value: $${plot.value.toLocaleString()} | Status: ${plot.status}` }).addTo(map);
        map.plotMarkers.push(marker);

        marker.on('click', () => {
           setSelectedPlot(plot);
           setIsAuditing(false);
           setIsSyncing(false);
           setAuditProgress(0);
           setAuditStream({
              started: false,
              lidar: { status: 'pending', result: null },
              deed: { status: 'pending', result: null },
              consensus: { status: 'pending', result: null },
              finished: false,
              verified: false
           });
        });
     });
  }, [mapLoaded, plots, selectedPlot, isAuditing]);

  // Native ResizeObserver to prevent Mapbox zero-height collapse
  useEffect(() => {
     const viewport = document.getElementById('map-viewport');
     if (!viewport || !mapRef.current) return;

     const observer = new ResizeObserver(() => {
        mapRef.current?.invalidateSize();
     });
     
     observer.observe(viewport);
     return () => observer.disconnect();
  }, [mapLoaded]);
  
  // Data Trace for Demo
  console.log("Syntry Data Loaded:", plots);

  // Animation for motorway pulse
  useEffect(() => {
    if (!showInfrastructure) return;
    let pulse = 1;
    let growing = true;
    const interval = setInterval(() => {
      pulse = growing ? pulse + 0.5 : pulse - 0.5;
      if (pulse >= 10) growing = false;
      if (pulse <= 1) growing = true;
      setPulseSize(pulse);
    }, 100);
    return () => clearInterval(interval);
  }, [showInfrastructure]);

  useEffect(() => {
    // Emulate DB Fetch for Active Asset Management (Phase 8) & Pipeline Scaling
    const initialPlots = [{
      id: "SYN-DEED-2026-ASH-001",
      area: "Ashifla-Otatten Site Plan",
      lng: -0.1149,
      lat: 5.6814,
      status: 'verified', // Starts verified to demo Phase 8 readiness
      value: 331892.40,
      transparencyStatus: 'verified_clean',
      auditDate: 'March 18, 2026',
      deedHash: null
    },
    {
      id: "SYN-PEND-EASTLEGON",
      area: "East Legon Hills Signature Plot",
      lng: -0.1500,
      lat: 5.6600,
      status: 'Pre-Verification',
      value: 1250000.00,
      transparencyStatus: 'gathering_data',
      auditDate: 'Pre-Verification (Gathering Data)',
      deedHash: null
    },
    {
      id: "SYN-PEND-PRAMPRAM",
      area: "Prampram Beachfront Estate",
      lng: 0.1050,
      lat: 5.7100,
      status: 'Pre-Verification',
      value: 480500.00,
      transparencyStatus: 'gathering_data',
      auditDate: 'Pre-Verification (Gathering Data)',
      deedHash: null
    },
    {
      id: "SYN-PEND-SHAI",
      area: "Shai Hills Commercial Logistics Hub",
      lng: 0.0500,
      lat: 5.8600,
      status: 'Pre-Verification',
      value: 950000.00,
      transparencyStatus: 'gathering_data',
      auditDate: 'Pre-Verification (Gathering Data)',
      deedHash: null
    }];

    // Check for simulated Stripe webhook success in URL parameters
    const params = new URLSearchParams(window.location.search);
    if (params.get('payment') === 'success') {
       const paidPlotId = params.get('plot') || params.get('plotId');
       if (paidPlotId) {
           const plotIndex = initialPlots.findIndex(p => p.id === paidPlotId);
           if (plotIndex !== -1) {
               initialPlots[plotIndex].status = 'escrowed';
               setSelectedPlot(initialPlots[plotIndex]);
           } else {
               const newPlot = { id: paidPlotId, lng: -122.4194, lat: 37.7749, status: 'escrowed', value: 100000 };
               initialPlots.push(newPlot);
               setSelectedPlot(newPlot);
           }
       }
       
       import('canvas-confetti').then((confetti) => {
          confetti.default({
             particleCount: 200, spread: 90, origin: { y: 0.6 },
             colors: ['#FFD700', '#00F5D4', '#ffffff'] // Gold and Mint confettis
          });
       });
       // Clear URL state without reloading
       window.history.replaceState({}, '', '/admin/control-tower');
    }

    setPlots(initialPlots);
  }, []);

  // TVL Animation Effect
  useEffect(() => {
    if (plots.length > 0 && plots[0].value > 0) {
      let start = 0;
      const target = plots.reduce((acc, plot) => acc + plot.value, 0) / 1000000;
      const duration = 2000;
      const interval = 50;
      const step = (target / (duration / interval));
      
      const timer = setInterval(() => {
        start += step;
        if (start >= target) {
          setAnimatedTvl(target);
          clearInterval(timer);
        } else {
          setAnimatedTvl(start);
        }
      }, interval);
      
      return () => clearInterval(timer);
    }
  }, [plots]);

  // Calculate TVL stats
  const stats = useMemo(() => {
    let totalValueLocked = 0;
    let verifiedValue = 0;
    let pendingValue = 0;
    let reservedValue = 0;
    let escrowedValue = 0;
    let verifiedCount = 0;
    let pendingCount = 0;
    let reservedCount = 0;
    let escrowedCount = 0;
    let cleanAuditCount = 0;
    let reviewAuditCount = 0;

    plots.forEach(plot => {
      totalValueLocked += plot.value;
      if (plot.status === 'verified' || plot.status === 'MINTED - IMMUTABLE' || plot.status === 'FRACTIONALIZED') {
        
        // Execute the Financial Reconciliation Logic directly into Admin Escrow bucket
        if (plot.status === 'FRACTIONALIZED') {
           const cashFlowToEscrow = plot.value * (soldUnits / 100);
           verifiedValue += (plot.value - cashFlowToEscrow);
           escrowedValue += cashFlowToEscrow;
           escrowedCount++;
        } else {
           verifiedValue += plot.value;
           verifiedCount++;
        }

      } else if (plot.status === 'reserved') {
        reservedValue += plot.value;
        reservedCount++;
      } else if (plot.status === 'escrowed') {
        escrowedValue += plot.value;
        escrowedCount++;
      } else {
        pendingValue += plot.value;
        pendingCount++;
      }

      if (plot.transparencyStatus === 'verified_clean') cleanAuditCount++;
      else if (plot.transparencyStatus === 'case_by_case') reviewAuditCount++;
    });

    return { totalValueLocked, verifiedValue, pendingValue, reservedValue, escrowedValue, verifiedCount, pendingCount, reservedCount, escrowedCount, cleanAuditCount, reviewAuditCount };
  }, [plots, soldUnits]);

  const resetAuditState = () => {
      setAuditStream({
          started: false,
          lidar: { status: 'pending', result: null },
          deed: { status: 'pending', result: null },
          consensus: { status: 'pending', result: null },
          finished: false,
          verified: false
      });
      setIsAuditing(false);
      setAuditProgress(0);
  };

  const handleInitiateEscrow = async () => {
    if (!selectedPlot || isEmergencyLocked) return;
    try {
      // Create Stripe Checkout Session
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || ''}/api/checkout`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plotId: selectedPlot.id, amount: Math.floor(selectedPlot.value * 0.7) })
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url; // Redirect to Stripe
      }
    } catch (err) {
      console.error(err);
    }
  };

  const triggerGelisSync = async (file) => {
    setIsSyncing(true);
    
    // Simulated Agentic AI Processing
    // 1. OCR Scan of coordinates (1090000/381000)
    // 2. Cross-reference with 8,160 Audit list
    // 3. Verify 70% Premium Payment status
    
    setTimeout(() => {
      setIsSyncing(false);
      // This updates your "Target Locked" state logic for the demo
      setPlots(prev => prev.map(p => p.id === selectedPlot.id ? { 
        ...p, 
        area: "Ashifla-Otatten Site Plan",
        transparencyStatus: 'case_by_case',
        auditDate: 'March 14, 2026'
      } : p));
      
      setSelectedPlot(prev => ({
        ...prev,
        area: "Ashifla-Otatten Site Plan",
        transparencyStatus: 'case_by_case',
        auditDate: 'March 14, 2026',
        compliance: "70% PREMIUM REQUIRED", 
        risk: "HIGH - Construction Zone nearby"
      }));
    }, 3000);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "application/pdf") {
      setUploadedFile(file);
      
      // 1. Trigger the immediate "Processing" UI
      setIsSyncing(true);
      
      // 2. Start the Agentic Handshake immediately
      console.log("Syntry Agent: Ingesting Ashifla-Otatten Site Plan...");
      triggerGelisSync(file);
    }
  };

  const handleRunAudit = async () => {
    if (!selectedPlot || isEmergencyLocked) return;
    
    resetAuditState();
    setIsAuditing(true);
    setAuditStream(prev => ({ ...prev, started: true }));

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || ''}/api/oracle-audit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ plotId: selectedPlot.id })
      });
      
      if (!response.body) throw new Error("ReadableStream not yet supported in this browser.");

      const reader = response.body.getReader();
      const decoder = new TextDecoder("utf-8");

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const msgs = decoder.decode(value).split('\n\n');
        
        for (const msg of msgs) {
            if (!msg.trim().startsWith('data: ')) continue;
            const dataStr = msg.replace('data: ', '');
            
            try {
                const data = JSON.parse(dataStr);
                
                // Process the stream
                if (data.status === 'running' && data.check) {
                    setAuditStream(prev => ({ ...prev, [data.check]: { ...prev[data.check], status: 'running' } }));
                    // Simulated progress increments
                    setAuditProgress(prev => Math.min(prev + 30, 90));
                } 
                else if (data.status === 'completed' && data.check) {
                    setAuditStream(prev => ({ 
                        ...prev, 
                        [data.check]: { status: 'completed', result: data.result } 
                    }));
                } 
                else if (data.status === 'failed') {
                    // Update whichever ones failed
                    if (data.results?.lidar && !data.results.lidar.passed) {
                         setAuditStream(prev => ({ ...prev, lidar: { status: 'failed', result: data.results.lidar } }));
                    } else if (data.results?.deed && !data.results.deed.passed) {
                         setAuditStream(prev => ({ ...prev, deed: { status: 'failed', result: data.results.deed } }));
                    }
                    setAuditStream(prev => ({ ...prev, finished: true, verified: false }));
                    setIsAuditing(false);
                    setAuditProgress(0);
                    return; // exit early
                }
                else if (data.status === 'finished') {
                    setAuditProgress(100);
                    setAuditStream(prev => ({ ...prev, finished: true, verified: data.verified }));
                    setIsAuditing(false);
                    
                    if (data.verified) {
                        // Plot morph "Magic Moment"
                        setTimeout(() => {
                           setPlots(prevPlots => prevPlots.map(p => 
                             p.id === selectedPlot.id ? { ...p, status: 'verified' } : p
                           ));
                           setSelectedPlot(prev => ({...prev, status: 'verified'}));
                        }, 500); 
                    }
                }
            } catch (e) {
                console.error("Error parsing SSE:", e, dataStr);
            }
        }
      }

    } catch (error) {
      console.error("Audit failed:", error);
      setIsAuditing(false);
      setAuditProgress(0);
    }
  };

  // Helper renderer for stream items
  const renderAuditStep = (stepName, label, stepData) => {
      const isRunning = stepData.status === 'running';
      const isCompleted = stepData.status === 'completed';
      const isFailed = stepData.status === 'failed';
      const isPending = stepData.status === 'pending';
      const passed = stepData.result?.passed;

      return (
         <div className={`p-3 rounded-lg border transition-all duration-300 ${
             isRunning ? 'border-indigo-500/50 bg-indigo-500/10' :
             isCompleted && passed ? 'border-[#00F5D4]/30 bg-[#00F5D4]/10' :
             (isCompleted && !passed) || isFailed ? 'border-red-500/30 bg-red-500/10' :
             'border-white/5 bg-black/20 opacity-50'
         }`}>
             <div className="flex justify-between items-center text-sm font-medium">
                 <span className={`${isRunning ? 'text-indigo-300' : isCompleted || isFailed ? 'text-white' : 'text-gray-500'}`}>
                     {label}
                 </span>
                 <div className="flex items-center gap-2">
                     {isRunning && <span className="animate-spin h-3 w-3 border-[1.5px] border-indigo-400 border-t-transparent rounded-full" />}
                     {(isCompleted || isFailed) && (
                         <span className={`text-xs font-medium ${passed ? 'text-[#00F5D4]' : 'text-red-400'}`}>
                             {passed ? 'PASS' : 'FAIL'}
                         </span>
                     )}
                 </div>
             </div>
             {(isCompleted || isFailed) && stepData.result?.message && (
                 <div className="mt-1 text-[10px] text-gray-400 italic">
                     {stepData.result.message}
                 </div>
             )}
         </div>
      );
  };

  return (
    <div className="flex h-screen w-full bg-[#0b132b] text-white font-sans overflow-hidden">
      {/* Main Map Area */}
      <div className="flex-grow relative bg-[#0E1629]">
        <div 
          id="map-viewport" 
          ref={mapContainerRef} 
          className="map-wrapper notranslate" 
          style={{ width: '100%', height: '500px', display: 'block', position: 'relative' }}
          onClick={() => {
              setSelectedPlot(null);
              setIsAuditing(false);
              setIsSyncing(false);
              setAuditProgress(0);
              setAuditStream({
                 started: false,
                 lidar: { status: 'pending', result: null },
                 deed: { status: 'pending', result: null },
                 consensus: { status: 'pending', result: null },
                 finished: false,
                 verified: false
              });
          }}
        >
          {!mapLoaded && (
            <div className="absolute inset-0 z-0 flex flex-col items-center justify-center border border-white/5 opacity-80" style={{ backgroundImage: 'radial-gradient(circle, #00F5D4 1px, transparent 1px)', backgroundSize: '30px 30px' }}>
              <span className="text-[#00F5D4] font-mono text-sm tracking-widest bg-black/60 px-4 py-2 rounded-xl border border-[#00F5D4]/30 backdrop-blur-md animate-pulse shadow-[0_0_15px_rgba(0,245,212,0.2)]">INITIALIZING NATIVE WEBGL...</span>
            </div>
          )}
        </div>

        {/* Omni-Search Command Bar */}
        {showSearch && (
           <div className="absolute top-20 left-1/2 transform -translate-x-1/2 z-[100] w-[500px] animate-in fade-in zoom-in-95 duration-200">
               <div className="bg-[#0b132b]/95 backdrop-blur-md border border-indigo-500/50 rounded-xl shadow-[0_0_30px_rgba(79,70,229,0.3)] overflow-hidden">
                   <div className="flex items-center p-4 border-b border-indigo-500/30">
                       <span className="text-indigo-400 mr-3 animate-pulse">🔍</span>
                       <input 
                         autoFocus
                         type="text" 
                         value={searchQuery}
                         onChange={(e) => setSearchQuery(e.target.value)}
                         onKeyDown={(e) => { 
                            if (e.key === 'Enter') handleSearchExecute(); 
                            if (e.key === 'Escape') setShowSearch(false);
                         }}
                         placeholder="Enter GPS, PlusCode (GH-123), or Name..."
                         className="bg-transparent border-none text-white w-full focus:outline-none placeholder-indigo-700/50 font-mono text-[11px] uppercase tracking-widest"
                       />
                       <span className="text-[10px] text-gray-500 uppercase font-mono bg-black/50 px-2 py-1 rounded border border-white/10">ESC</span>
                   </div>
                   {searchResult === "NOT_FOUND" && (
                      <div className="p-3 text-center text-[10px] font-mono text-red-400 uppercase tracking-widest bg-red-900/10">No geospatial anchors match this query.</div>
                   )}
                   {searchResult && searchResult !== "NOT_FOUND" && (
                      <div className="p-3 bg-emerald-900/20 text-emerald-400 text-[10px] uppercase font-mono tracking-widest border-t border-emerald-500/30 flex justify-between items-center animate-in fade-in">
                          <span>{searchResult.area}</span>
                          <span className="bg-emerald-500/20 px-2 rounded border border-emerald-500/30">Target Locked</span>
                      </div>
                   )}
               </div>
           </div>
        )}

        {/* Social Proof FOMO Ticker */}
        {isPublicView && (
           <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-[45] bg-[#0b132b]/95 backdrop-blur-md border border-indigo-500/50 px-6 py-3 rounded-full shadow-[0_10px_30px_rgba(79,70,229,0.3)] flex items-center justify-center gap-3 w-[700px] overflow-hidden animate-in slide-in-from-bottom-8">
              <span className="w-2 h-2 rounded-full bg-[#00F5D4] shadow-[0_0_10px_#00F5D4] flex-shrink-0 animate-ping"></span>
              <p className="text-[11px] text-[#00F5D4] font-mono tracking-widest uppercase text-center" key={soldUnits}>
                 {latestFomo}
              </p>
           </div>
        )}

        {/* Public View Top-Right Map Badge */}
        {isPublicView && (
           <div className="absolute top-4 right-4 z-[45] bg-emerald-900/80 backdrop-blur-md border border-emerald-500/50 px-4 py-2 rounded-xl shadow-[0_0_20px_rgba(16,185,129,0.3)] flex items-center gap-2 animate-in slide-in-from-right-4 duration-500">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#10B981]"></span>
              <span className="text-[10px] text-emerald-300 uppercase font-medium tracking-tight tracking-widest">Certified by Node 08</span>
           </div>
        )}

        {/* Deed Decomposition Animation Overlay */}
        {isDecomposing && (
          <div className="absolute inset-0 z-[100] bg-black/90 flex flex-col items-center justify-center animate-in fade-in duration-500 backdrop-blur-md">
            <div className="relative w-full max-w-2xl h-64 flex flex-wrap content-center justify-center gap-2 perspective-1000 p-8">
               {Array.from({length: 100}).map((_, i) => (
                 <div key={i} className="w-8 h-8 rounded bg-gradient-to-br from-[#FFD700] to-yellow-600 shadow-[0_0_15px_rgba(255,215,0,0.8)] border border-white/50 animate-bounce" style={{ animationDelay: `${i * 15}ms`, transform: `rotate(${Math.random() * 45}deg)` }} />
               ))}
               <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
                  <h1 className="text-4xl font-medium tracking-tight text-white uppercase tracking-widest drop-shadow-[0_0_20px_#FFD700] bg-black/40 px-6 py-2 rounded-xl backdrop-blur-sm border border-white/10">Deed Decomposition...</h1>
               </div>
            </div>
            <p className="mt-8 text-[#00F5D4] font-mono animate-pulse text-lg tracking-widest uppercase">Converting SYN-DEED to Liquid Fragments</p>
          </div>
        )}

        {/* AI Oracle Overlay */}
        {selectedPlot && showOracleView && (
           <div className="absolute top-4 right-[360px] w-[800px] z-30 animate-in fade-in slide-in-from-right-8 duration-500">
              <Suspense fallback={<div className="bg-[#0a0514] border border-indigo-500/30 rounded-2xl p-6 text-indigo-400 text-center animate-pulse">Loading Sovereign Data...</div>}>
                <OracleView plotData={selectedPlot} />
              </Suspense>
           </div>
        )}

        {/* Selected Plot Drawer Overlay */}
        {selectedPlot && (
          <div className="absolute top-4 right-4 w-80 bg-[#0E1629]/95 backdrop-blur-md border border-white/10 rounded-2xl shadow-2xl p-6 z-20 animate-in fade-in slide-in-from-right-8 duration-300">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-2">
                 <h3 className="text-lg font-medium text-white tracking-wide uppercase">Oracle Detail</h3>
                 <button 
                   onClick={() => setShowOracleView(!showOracleView)} 
                   className="text-[10px] bg-indigo-900/50 hover:bg-indigo-500/30 text-indigo-400 border border-indigo-500/50 px-2 py-1 rounded uppercase tracking-widest font-medium tracking-tight transition-colors"
                 >
                   {showOracleView ? 'Close AI Oracle' : 'Launch AI'}
                 </button>
              </div>
              <button onClick={() => { setSelectedPlot(null); resetAuditState(); setUploadedFile(null); setShowOracleView(false); }} className="text-gray-400 hover:text-white">&times;</button>
            </div>
            
            {isSyncing && (
              <div className="absolute inset-0 bg-indigo-950/80 backdrop-blur-sm flex flex-col items-center justify-center z-50 rounded-2xl border border-white/10 animate-in fade-in duration-300">
                <div className="w-16 h-16 border-4 border-t-[#00F5D4] border-indigo-500/20 rounded-full animate-spin"></div>
                <p className="mt-4 text-xs font-mono text-[#00F5D4] animate-pulse uppercase tracking-widest text-center px-4">
                  GELIS HANDSHAKE IN PROGRESS...
                </p>
                <div className="text-[10px] text-gray-400 mt-2 text-center px-6 leading-relaxed">
                   AI OCR Engine scanning coordinates (1090000/381000)...<br/>
                   Cross-referencing Ashifla-Otatten Site Plan
                </div>
              </div>
            )}
            
            <div className="space-y-4 max-h-[75vh] overflow-y-auto pr-2 custom-scrollbar">
              <div className="bg-black/30 p-4 rounded-xl border border-white/5 relative">
                
                {/* Proximity Overlay Label */}
                <span className="absolute -top-3 left-4 bg-[#00F5D4]/10 text-[#00F5D4] border border-[#00F5D4]/30 px-2 py-0.5 rounded text-[8px] uppercase font-medium tracking-tight tracking-widest shadow-[0_0_8px_rgba(0,245,212,0.3)] backdrop-blur-sm">
                   5 mins to West Hills Mall
                </span>

                <div className="flex justify-between items-center mb-2 mt-2">
                  <span className="text-xs text-gray-500 uppercase tracking-wider font-medium">Asset Locator</span>
                  <span className="text-sm font-mono text-[#00F5D4] font-medium tracking-tight">{selectedPlot.id.split('-').pop().toUpperCase()}</span>
                </div>
                
                {/* Investor Trust Bar & Price */}
                <div className="flex justify-between items-end mt-4 mb-2 pb-4 border-b border-white/10">
                  <div className="flex flex-col">
                     <span className="text-[10px] text-gray-500 uppercase tracking-widest mb-1 font-medium">Current Valuation</span>
                     <span className="text-2xl font-light text-white tracking-tight">${selectedPlot.value.toLocaleString()}</span>
                  </div>
                  <div className="bg-emerald-900/20 border border-emerald-500/50 px-2 py-1 rounded flex items-center gap-1.5 shadow-[0_0_15px_rgba(16,185,129,0.1)]">
                     <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                     <span className="text-[8px] uppercase tracking-widest font-medium tracking-tight text-emerald-300">Node 08 Verified</span>
                  </div>
                </div>

                {/* Exchange Checkout Breakdown */}
                <div className="space-y-2 mt-4">
                   <div className="flex justify-between items-center text-[10px]">
                      <span className="text-gray-400 uppercase tracking-widest">1% Fractional Packet</span>
                      <span className="text-gray-200 font-mono font-medium">${Math.round(selectedPlot.value * 0.01).toLocaleString()}</span>
                   </div>
                   <div className="flex justify-between items-center text-[10px]">
                      <span className="text-gray-400 uppercase tracking-widest">+ 2.5% Exchange Fee</span>
                      <span className="text-gray-200 font-mono font-medium">${Math.round((selectedPlot.value * 0.01) * 0.025).toLocaleString()}</span>
                   </div>
                   <div className="flex justify-between items-center text-xs mt-2 pt-2 border-t border-white/5">
                      <span className="text-indigo-400 uppercase tracking-widest font-medium">Total Reserve Deposit</span>
                      <span className="text-[#FFD700] font-mono font-medium tracking-tight shadow-sm">${Math.round((selectedPlot.value * 0.01) * 1.025).toLocaleString()}</span>
                   </div>
                </div>

                <div className="mt-5 relative">
                  {/* Scarcity Engine Countdown */}
                  <div className="absolute -top-6 right-0 text-[8px] text-red-400 uppercase tracking-widest font-medium tracking-tight flex items-center gap-1 animate-pulse">
                     <span>⏱️</span> Early Bird Closes in 14:59
                  </div>
                  <button 
                    onClick={handleInitiateEscrow}
                    className="w-full bg-gradient-to-r from-yellow-600 to-[#FFD700] hover:from-yellow-500 hover:to-[#ffd700] text-black font-medium tracking-tight py-3 px-4 rounded-xl text-xs uppercase tracking-widest transition-all shadow-[0_0_20px_rgba(255,215,0,0.3)] hover:shadow-[0_0_30px_rgba(255,215,0,0.5)] hover:scale-[1.02] flex justify-center items-center gap-2 border border-yellow-400/50"
                  >
                    Reserve Packet - ${Math.round((selectedPlot.value * 0.01) * 1.025).toLocaleString()}
                  </button>
                </div>
                {/* [MISSION: 2026 REFORM COMPLIANCE] Badge and Ministerial ID */}
                {(selectedPlot.status === 'escrowed' || selectedPlot.status === 'verified') && (
                  <div className="mt-4 pt-4 border-t border-white/5">
                    <div className="bg-[#FFD700]/10 border border-[#FFD700]/30 rounded-lg p-3 mb-3">
                      <div className="flex items-center justify-between">
                        <div className="flex flex-col">
                          <span className="text-[#FFD700] font-medium tracking-tight text-[10px] tracking-[0.1em] uppercase">🛡️ REFORM COMPLIANT</span>
                          <span className="text-[8px] text-gray-400">Premium: 70% Secured in Escrow</span>
                        </div>
                        
                        {!selectedPlot.ministerialId && (
                           <button 
                             onClick={() => {
                                 setPlots(prev => prev.map(p => p.id === selectedPlot.id ? { ...p, ministerialId: 'SCANNING' } : p));
                                 setSelectedPlot(prev => ({ ...prev, ministerialId: 'SCANNING' }));
                                 setTimeout(() => {
                                   setPlots(prev => prev.map(p => p.id === selectedPlot.id ? { ...p, ministerialId: 'VERIFIED' } : p));
                                   setSelectedPlot(prev => ({ ...prev, ministerialId: 'VERIFIED' }));
                                 }, 3000);
                             }}
                             className="text-[9px] bg-indigo-600 hover:bg-indigo-500 text-white px-3 py-1.5 rounded-full font-medium uppercase tracking-widest transition-colors shadow-[0_0_10px_rgba(79,70,229,0.4)]"
                           >
                             Run Audit
                           </button>
                        )}
                        
                        {selectedPlot.ministerialId === 'SCANNING' && (
                           <span className="text-[10px] text-[#00F5D4] font-medium tracking-tight uppercase tracking-widest animate-pulse drop-shadow-[0_0_5px_#00F5D4]">
                             Scanning...
                           </span>
                        )}
                        {selectedPlot.ministerialId === 'VERIFIED' && (
                           <span className="text-[10px] text-gray-500 font-medium uppercase tracking-widest line-through">
                             Awaiting...
                           </span>
                        )}
                      </div>
                      
                      {selectedPlot.ministerialId === 'VERIFIED' && (
                         <div className="mt-4 p-2 bg-emerald-900/40 border border-emerald-500/60 rounded-lg flex flex-col items-center justify-center shadow-[0_0_20px_rgba(16,185,129,0.4)] animate-in fade-in zoom-in-95 duration-500 text-center">
                            <span className="text-emerald-400 font-medium tracking-tight text-[11px] uppercase tracking-wider flex items-center gap-2 mb-1">
                               <span className="animate-pulse drop-shadow-[0_0_12px_#10B981] text-lg">✅</span> 
                               VERIFIED: Ministerial Node 08
                            </span>
                            <span className="text-[9px] text-emerald-300 mb-2 uppercase tracking-widest font-medium tracking-tight">
                               (Lands Commission ELIS-2.0)
                            </span>
                            <span className="text-[9px] text-gray-500 font-mono tracking-tighter bg-black/60 px-3 py-1.5 rounded w-full border border-white/5 opacity-80 backdrop-blur-sm">
                               TX-HASH: 0xGH2026...ASH-001
                            </span>
                         </div>
                      )}
                    </div>
                    
                    {selectedPlot.status === 'escrowed' && (
                      <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-widest text-gray-500 font-medium">Ministerial Oversight ID</label>
                        <input 
                          type="text" 
                          placeholder="MLNR-2026-XXXX"
                          value={selectedPlot.ministerialId || ''}
                          onChange={(e) => {
                             const val = e.target.value;
                             setPlots(prev => prev.map(p => p.id === selectedPlot.id ? { ...p, ministerialId: val } : p));
                             setSelectedPlot(prev => ({ ...prev, ministerialId: val }));
                          }}
                          className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-sm text-[#00F5D4] focus:outline-none focus:border-[#00F5D4]/50 transition-colors"
                        />
                      </div>
                    )}
                  </div>
                )}

                {/* [MISSION: TRANSPARENCY DASHBOARD] Anti-Corruption Filter */}
                {selectedPlot.transparencyStatus && (
                  <div className="mt-4 pt-4 border-t border-white/5 space-y-3">
                    <div className="flex justify-between items-center bg-white/5 p-3 rounded-xl border border-white/10">
                      <span className="text-[10px] uppercase tracking-widest text-gray-500 font-medium">Anti-Corruption Audit</span>
                      <div className="relative group cursor-help">
                        <span className={`text-[9px] px-2 py-1 rounded-full font-medium tracking-tight uppercase tracking-tighter shadow-sm inline-block
                          ${selectedPlot.transparencyStatus === 'verified_clean' 
                            ? 'bg-[#00F5D4]/20 text-[#00F5D4] border border-[#00F5D4]/30' 
                            : 'bg-yellow-500/20 text-yellow-500 border border-yellow-500/30'}`}>
                          {selectedPlot.transparencyStatus === 'verified_clean' ? 'Verified Clean' : 'Case-by-Case Review'}
                        </span>
                        {/* Hover Tooltip */}
                        {selectedPlot.transparencyStatus !== 'verified_clean' && (
                          <div className="absolute right-0 top-6 w-48 bg-[#0a0514] text-yellow-400 text-[10px] p-3 rounded-lg border border-yellow-500/30 shadow-[0_0_20px_rgba(234,179,8,0.2)] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 pointer-events-none">
                            Audit Log: Transaction 882-X. No conflicting Title found in 2024 Gazette. Cleared for Fractionalization.
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="bg-indigo-500/5 p-3 rounded-lg border border-indigo-500/10 italic">
                      <p className="text-[10px] text-indigo-300 leading-relaxed">
                        "This plot was audited in {selectedPlot.auditDate || 'Feb 2026'}. Allocation confirmed compliant with Land Act 2020."
                      </p>
                    </div>
                  </div>
                )}

                {/* [MISSION: GELIS SYNC FINDINGS] Real-Time Sync Data */}
                {selectedPlot.area === "Ashifla-Otatten Site Plan" && (
                  <div className="mt-4 pt-4 border-t border-white/5 space-y-2 animate-in slide-in-from-top-2 duration-500">
                    <div className="flex justify-between items-center mb-1">
                      <p className="text-[10px] uppercase tracking-widest text-[#00F5D4] font-medium tracking-tight">GELIS Sync Findings</p>
                      <span className="text-[8px] bg-[#00F5D4]/10 text-[#00F5D4] px-1.5 py-0.5 rounded font-mono">SITE-PLAN v1.2</span>
                    </div>
                    <div className="grid grid-cols-1 gap-2">
                       <div className="bg-[#00F5D4]/5 border border-[#00F5D4]/20 p-2 rounded-lg">
                          <p className="text-[8px] text-gray-500 uppercase font-medium">Compliance Status</p>
                          <p className="text-[10px] text-white font-mono">{selectedPlot.compliance || 'VERIFIED'}</p>
                       </div>
                       <div className="bg-red-500/5 border border-red-500/20 p-2 rounded-lg">
                          <p className="text-[8px] text-gray-500 uppercase font-medium">Operational Risk Indicator</p>
                          <p className="text-[10px] text-red-400 font-medium">{selectedPlot.risk || 'NORMAL'}</p>
                       </div>
                    </div>
                  </div>
                )}

                {/* [MISSION: MAP THE BIG PUSH] Appreciation Factor */}
                <div className="mt-4 pt-4 border-t border-white/5">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-[10px] text-gray-500 uppercase tracking-widest font-medium">Appreciation Factor</span>
                    <span className="text-[10px] font-medium tracking-tight uppercase" style={{ color: calculateAppreciation(selectedPlot).color }}>
                      {calculateAppreciation(selectedPlot).category}
                    </span>
                  </div>
                  <div className="text-xl font-light text-white italic">
                    {calculateAppreciation(selectedPlot).factor}
                  </div>
                  <p className="text-[9px] text-gray-400 mt-1">{calculateAppreciation(selectedPlot).note}</p>
                </div>

                {/* [MISSION: SOVEREIGN SHARE] External Trust link */}
                <div className="mt-4 pt-4 border-t border-white/5">
                   <button 
                     onClick={async () => {
                       const token = await generateSovereignToken(selectedPlot.id);
                       const url = typeof window !== 'undefined' ? `${window.location.origin}/share/${token}` : `http://localhost:3001/share/${token}`;
                       setShareLink(url);
                     }}
                     className="w-full px-4 py-3 bg-indigo-600/20 hover:bg-indigo-600/40 border border-indigo-500/50 text-indigo-300 rounded-lg text-xs font-medium flex items-center justify-center gap-2 transition-all shadow-lg shadow-indigo-500/10"
                   >
                     <span className="text-lg">🔗</span> Generate Sovereign Share
                   </button>

                   {shareLink && (
                      <div className="mt-3 p-3 bg-red-900/20 border border-red-500/30 rounded-xl space-y-2 animate-in fade-in zoom-in-95">
                         <p className="text-[10px] text-red-400 font-medium uppercase tracking-widest leading-relaxed flex items-center gap-2">
                            <span className="animate-pulse">⚠️</span> SOVEREIGN SECURITY
                         </p>
                         <p className="text-[9px] text-gray-400 italic">
                            This is a One-Time Access Link. It will expire immediately after the recipient closes the tab.
                         </p>
                         <div className="flex items-center gap-2">
                            <input 
                              type="text" 
                              readOnly 
                              value={shareLink} 
                              className="w-full bg-black/40 border border-red-500/30 rounded-lg px-2 py-1.5 text-[10px] text-red-300 font-mono focus:outline-none"
                            />
                            <button 
                              onClick={() => {
                                 navigator.clipboard.writeText(shareLink);
                                 alert("One-Time Link Copied!");
                              }}
                              className="px-2 py-1.5 bg-red-600 hover:bg-red-500 text-white rounded text-[10px] uppercase font-medium"
                            >
                              Copy
                            </button>
                         </div>
                      </div>
                   )}
                </div>
              </div>

              {selectedPlot.status === 'pending' && (
                <div className="space-y-2">
                  <button
                    onClick={handleInitiateEscrow}
                    disabled={isEmergencyLocked}
                    className={`w-full py-3 rounded-lg font-medium uppercase tracking-wide text-sm flex items-center justify-center gap-2 transition-all 
                    ${isEmergencyLocked ? 'bg-gray-800 text-gray-600 cursor-not-allowed'
                      : 'bg-gradient-to-r from-yellow-600 to-yellow-500 hover:from-yellow-500 hover:to-yellow-400 text-white shadow-[0_0_15px_rgba(234,179,8,0.5)] border border-yellow-400/50'}`}
                  >
                    Pay 70% Statutory Premium - ${(selectedPlot.value * 0.7).toLocaleString()}
                  </button>
                  <p className="text-[10px] text-gray-500 text-center italic">
                    Remaining ${(selectedPlot.value * 0.3).toLocaleString()} spread over 99-year lease.
                  </p>
                </div>
              )}

              {/* [MISSION: INITIATE ORACLE VERIFICATION] Scanning Progress */}
              {isAuditing && (
                <div className="mt-4 space-y-2 animate-in fade-in duration-300">
                  <div className="flex justify-between items-center text-[10px] uppercase tracking-widest text-gray-400 font-medium">
                    <span>Scanning...</span>
                    <span>{Math.round(auditProgress)}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
                    <div 
                      className="h-full bg-gradient-to-r from-[#FFD700] to-[#00F5D4] transition-all duration-1000 ease-out"
                      style={{ width: `${auditProgress}%` }}
                    />
                  </div>
                </div>
              )}

              {(selectedPlot.status === 'reserved' || selectedPlot.status === 'escrowed') && !auditStream.started && (
                <button
                  onClick={handleRunAudit}
                  disabled={isEmergencyLocked}
                  className={`w-full py-3 rounded-lg font-medium uppercase tracking-wide text-sm flex items-center justify-center gap-2 transition-all 
                  ${isEmergencyLocked ? 'bg-gray-800 text-gray-600 cursor-not-allowed'
                    : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-[0_0_15px_rgba(79,70,229,0.5)] border border-indigo-400/50'}`}
                >
                  Run Oracle Audit
                </button>
              )}

              {selectedPlot.status === 'escrowed' && auditStream.verified && (
                 <button
                   onClick={() => {
                      // Final Minting Step
                      setPlots(prev => prev.map(p => p.id === selectedPlot.id ? { ...p, status: 'verified' } : p));
                      setSelectedPlot(prev => ({ ...prev, status: 'verified' }));
                   }}
                   disabled={isEmergencyLocked || !selectedPlot.ministerialId}
                   className={`w-full py-3 rounded-lg font-medium uppercase tracking-wide text-sm flex items-center justify-center gap-2 transition-all 
                   ${isEmergencyLocked || !selectedPlot.ministerialId ? 'bg-gray-800 text-gray-600 cursor-not-allowed'
                     : 'bg-gradient-to-r from-[#00F5D4] to-indigo-500 hover:from-[#05ffd4] hover:to-indigo-400 text-white shadow-[0_0_20px_rgba(0,245,212,0.4)] border border-[#00F5D4]/50'}`}
                 >
                   Mint Compliance Vault
                 </button>
              )}

              {(selectedPlot.status === 'verified' || selectedPlot.status === 'MINTED - IMMUTABLE') && (
                 <Suspense fallback={<div className="text-white text-sm p-6 border border-white/10 rounded-2xl mt-6 text-center uppercase tracking-widest font-medium tracking-tight flex items-center justify-center gap-3">
                   <div className="w-4 h-4 rounded-full border-2 border-t-[#00F5D4] border-white/20 animate-spin"></div> Loading Sovereign Data...</div>}>
                   <MintingPanel 
                     plot={selectedPlot} 
                     sovereignLink={shareLink}
                     onMintSuccess={(hash) => {
                        setPlots(prev => prev.map(p => p.id === selectedPlot.id ? { ...p, status: 'MINTED - IMMUTABLE', deedHash: hash } : p));
                        setSelectedPlot(prev => ({ ...prev, status: 'MINTED - IMMUTABLE', deedHash: hash }));
                     }} 
                   />
                 </Suspense>
              )}

              {selectedPlot.status === 'MINTED - IMMUTABLE' && (
                 <div className="mt-6 animate-in slide-in-from-bottom duration-500">
                    <LiquidityPanel 
                      plotData={selectedPlot} 
                      onDecompose={(fragments) => {
                         setIsDecomposing(true);
                         setTimeout(() => {
                            setIsDecomposing(false);
                            setPlots(prev => prev.map(p => p.id === selectedPlot.id ? { ...p, status: 'FRACTIONALIZED' } : p));
                            setSelectedPlot(prev => ({ ...prev, status: 'FRACTIONALIZED' }));
                         }, 4000);
                      }}
                    />
                 </div>
              )}
              
              {selectedPlot.status === 'FRACTIONALIZED' && (
                 <div className="mt-6 animate-in slide-in-from-bottom duration-500">
                    <LiquidityPanel plotData={selectedPlot} isFractionalized={true} />
                 </div>
              )}

               {/* [MISSION: GELIS SITE PLAN SYNC] Drop Zone */}
               {!uploadedFile && !isSyncing && selectedPlot.status !== 'MINTED - IMMUTABLE' && (
                 <div className="mt-4 p-4 border-2 border-dashed border-white/10 rounded-xl bg-white/5 hover:bg-white/10 transition-colors group relative cursor-pointer">
                    <input 
                      type="file" 
                      accept=".pdf"
                      onChange={handleFileUpload}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    />
                    <div className="text-center">
                      <div className="text-2xl mb-2 opacity-40 group-hover:opacity-100 transition-opacity">📄</div>
                      <p className="text-[10px] text-gray-400 uppercase tracking-widest font-medium">Sync GELIS Site Plan</p>
                      <p className="text-[8px] text-gray-500 mt-1 italic">Drop Ashifla-Otatten PDF here</p>
                    </div>
                 </div>
               )}

               {uploadedFile && (
                 <div className="mt-4 p-3 bg-indigo-500/10 border border-indigo-500/30 rounded-xl flex items-center justify-between animate-in zoom-in-95">
                    <div className="flex items-center gap-3">
                      <span className="text-lg">📄</span>
                      <div className="overflow-hidden">
                        <p className="text-[10px] text-white font-medium truncate w-40">{uploadedFile.name}</p>
                        <p className="text-[8px] text-indigo-400 uppercase font-medium">Synced with GELIS</p>
                      </div>
                    </div>
                    <button onClick={() => setUploadedFile(null)} className="text-gray-500 hover:text-red-400 transition-colors">
                      &times;
                    </button>
                 </div>
               )}

              {/* Streaming Audit Status */}
              {auditStream.started && (
                <div className="mt-4 space-y-2 animate-in fade-in zoom-in-95 duration-300">
                   <h4 className="text-[10px] uppercase tracking-wider text-gray-500 font-semibold mb-2">Authentication Sequence</h4>
                   
                   {renderAuditStep('lidar', '1. Check LiDAR Overlap', auditStream.lidar)}
                   {renderAuditStep('deed', '2. Verify Government Deed', auditStream.deed)}
                   {renderAuditStep('consensus', '3. Gather Consensus', auditStream.consensus)}

                   {auditStream.finished && (
                       <div className="mt-4 pt-3 border-t border-white/10 flex justify-center animate-in fade-in zoom-in duration-500">
                           {auditStream.verified ? (
                               <div className="text-center">
                                   <div className="text-2xl mb-1">✅</div>
                                   <div className="text-[#00F5D4] font-medium text-sm tracking-wider uppercase">Vault Minted</div>
                               </div>
                           ) : (
                               <div className="text-center">
                                   <div className="text-2xl mb-1">❌</div>
                                   <div className="text-red-400 font-medium text-sm tracking-wider uppercase">Audit Failed</div>
                               </div>
                           )}
                       </div>
                   )}
                   
                   {/* Investor Certificate Export moved to sidebar */}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Floating Emergency Overlays */}
        {isEmergencyLocked && (
          <div className="absolute inset-0 bg-red-900/30 pointer-events-none flex items-center justify-center backdrop-blur-[2px] z-10 transition-all duration-500">
            <div className="bg-[#0b132b]/90 border border-red-500 px-8 py-4 rounded-xl shadow-[0_0_30px_rgba(239,68,68,0.6)]">
              <h2 className="text-red-500 text-2xl font-medium uppercase tracking-wider flex items-center gap-3">
                <span className="animate-pulse">⚠️</span> Vault Transitions Paused
              </h2>
            </div>
          </div>
        )}
        
        {/* Fractional Sale Modal */}
        {showFractionalModal && selectedPlot && (
          <div className="absolute inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50">
             <div className="bg-[#0b132b] border border-indigo-500/30 p-8 rounded-2xl w-[500px] shadow-2xl relative animate-in zoom-in-95">
                <button onClick={() => { setShowFractionalModal(false); setFractionalToken(null); }} className="absolute top-4 right-4 text-gray-500 hover:text-white">&times;</button>
                <h2 className="text-xl font-medium text-white uppercase tracking-widest mb-2 flex items-center gap-2">
                   <span className="text-indigo-400">⚡</span> Sovereign Liquidity Exit
                </h2>
                <p className="text-xs text-gray-400 mb-6">Offering public micro-investor liquidity slice against the SYN-DEED hash.</p>
                
                <div className="bg-white/5 border border-indigo-500/20 rounded-xl p-4 mb-6 space-y-3">
                   <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-500 uppercase tracking-wider text-[10px] font-medium">Total Asset Value</span>
                      <span className="text-gray-300 font-mono">${selectedPlot.value.toLocaleString()}</span>
                   </div>
                   <div className="flex justify-between items-center text-sm pt-3 border-t border-white/5">
                      <span className="text-indigo-400 uppercase tracking-wider text-[10px] font-medium">10% Retail Offering</span>
                      <span className="text-[#00F5D4] font-mono text-xl shadow-sm drop-shadow-[0_0_5px_rgba(0,245,212,0.8)]">${(selectedPlot.value * 0.1).toLocaleString()}</span>
                   </div>
                </div>

                {!fractionalToken ? (
                   <button 
                     onClick={async (e) => {
                       const btn = e.currentTarget;
                       btn.innerText = "Minting 10% Slice...";
                       btn.classList.add("animate-pulse", "opacity-50");
                       const token = await generateSovereignToken(selectedPlot.id + "-10PERCENT");
                       setTimeout(() => setFractionalToken(token), 1500);
                     }}
                     className="w-full bg-[#00F5D4] hover:bg-[#00f5d4]/80 text-black py-3 rounded-xl font-medium tracking-tight uppercase tracking-widest transition-all shadow-[0_0_20px_rgba(0,245,212,0.4)]"
                   >
                     Mint Participation Rights
                   </button>
                ) : (
                   <div className="space-y-3">
                      <div className="bg-emerald-900/20 border border-emerald-500/30 p-3 rounded-xl flex items-center gap-3 animate-in slide-in-from-bottom-2">
                         <span className="text-emerald-400 text-xl">✅</span>
                         <div>
                            <p className="text-[10px] uppercase text-emerald-400/80 font-medium tracking-widest">Public Listing Active</p>
                            <p className="text-xs text-white break-all mt-1">{typeof window !== 'undefined' ? `${window.location.origin}/share/${fractionalToken}` : `http://localhost:3001/share/${fractionalToken}`}</p>
                         </div>
                      </div>
                   </div>
                )}
             </div>
          </div>
        )}
      </div>

      {/* Control Tower Sidebar */}
      <div className="w-96 bg-[#0E1629] border-l border-white/10 flex flex-col z-20 shadow-[-10px_0_30px_rgba(0,0,0,0.5)]">
        {/* Sidebar Header - Overridden for Investor Flow if PublicView */}
        <div className="p-6 border-b border-white/10 relative overflow-hidden">
          {isPublicView ? (
             <div className="animate-in fade-in slide-in-from-top-4 duration-500">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-400 via-[#00F5D4] to-indigo-500"></div>
                <h1 className="text-2xl font-light tracking-wide text-white flex items-center gap-2">
                  Exchange <span className="font-medium text-[#00F5D4]">Live</span>
                  <span className="w-2.5 h-2.5 rounded-full bg-[#00F5D4] animate-ping ml-1"></span>
                </h1>
                
                {/* Live Sales Ticker Hero */}
                <div className="mt-4 bg-black/40 border border-[#00F5D4]/20 rounded-xl p-4 shadow-[0_0_20px_rgba(0,245,212,0.05)] text-center relative">
                   <span className="text-[9px] uppercase tracking-widest text-[#00F5D4] font-medium tracking-tight absolute top-2 right-2 border border-[#00F5D4]/30 bg-[#00F5D4]/10 px-1.5 py-0.5 rounded">High Demand</span>
                   <p className="text-[10px] text-gray-500 uppercase tracking-widest font-medium mb-1">Ashifla-Otatten Pipeline</p>
                   <div className="text-3xl font-light tabular-nums tracking-tight text-white mb-2">
                      <span className="font-medium">{100 - soldUnits}</span><span className="text-lg text-gray-500">/100</span>
                   </div>
                   <p className="text-[10px] uppercase font-mono tracking-widest text-indigo-400">Packets Remaining</p>
                   
                   {/* Mini Progress Bar */}
                   <div className="w-full h-1.5 bg-gray-900 rounded-full mt-3 overflow-hidden border border-white/5">
                       <div 
                         className="h-full bg-gradient-to-r from-indigo-500 to-[#00F5D4] transition-all duration-1000" 
                         style={{ width: `${soldUnits}%` }}
                       />
                   </div>
                </div>
             </div>
          ) : (
             <>
                <h1 className="text-2xl font-light tracking-wide text-white">
                  Syntry <span className="font-medium text-[#00F5D4]">Control Tower</span>
                </h1>
                <p className="text-sm text-gray-400 mt-2">Real-time Global Protocol State</p>
             </>
          )}

          <div className={`mt-4 flex flex-col gap-3 ${isPublicView ? 'hidden' : ''}`}>
            {/* Infrastructure Toggle */}
            <div className="flex items-center justify-between bg-white/5 p-3 rounded-xl border border-white/10">
              <div className="flex items-center gap-3">
                 <div className={`w-2 h-2 rounded-full ${showInfrastructure ? 'bg-[#7c3aed] animate-pulse shadow-[0_0_8px_rgba(124,58,237,0.8)]' : 'bg-gray-600'}`}></div>
                 <span className="text-[10px] uppercase tracking-widest font-medium text-gray-300">Infrastructure Catalyst</span>
              </div>
              <button 
                onClick={() => setShowInfrastructure(!showInfrastructure)}
                className={`w-10 h-5 rounded-full relative transition-colors duration-300 ${showInfrastructure ? 'bg-[#7c3aed]' : 'bg-gray-700'}`}
              >
                <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all duration-300 ${showInfrastructure ? 'left-6' : 'left-1'}`}></div>
              </button>
            </div>
            
            {/* Public Prospectus Toggle */}
            <div className="flex items-center justify-between bg-emerald-900/10 p-3 rounded-xl border border-[#00F5D4]/30 shadow-[0_0_15px_rgba(0,245,212,0.05)]">
              <div className="flex items-center gap-3">
                 <div className={`w-2 h-2 rounded-full ${isPublicView ? 'bg-[#00F5D4] animate-pulse shadow-[0_0_10px_rgba(0,245,212,0.8)]' : 'bg-gray-600'}`}></div>
                 <span className={`text-[10px] uppercase tracking-widest font-medium tracking-tight transition-colors ${isPublicView ? 'text-[#00F5D4]' : 'text-gray-400'}`}>Public Gateway</span>
              </div>
              <button 
                onClick={() => setIsPublicView(!isPublicView)}
                className={`w-10 h-5 rounded-full relative transition-colors duration-300 outline-none ${isPublicView ? 'bg-[#00F5D4]' : 'bg-gray-700'}`}
              >
                <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all duration-300 ${isPublicView ? 'left-6' : 'left-1'}`}></div>
              </button>
            </div>
          </div>
        </div>

        {/* Conditional Sidebar Logic */}
        {!isPublicView && (
           <div className="flex flex-col flex-grow overflow-hidden animate-in fade-in duration-300">
             {/* TVL Metrics */}
             <div className="p-6 flex-grow overflow-y-auto space-y-6">
          <div className="space-y-3">
            <h3 className="text-xs uppercase tracking-widest text-gray-500 font-semibold">Total Value Locked</h3>
            <div className="relative">
               {/* Ambient TVL Glow */}
               <div className="absolute -inset-1 bg-gradient-to-r from-[#00F5D4]/20 via-[#1E3A8A]/20 to-[#00F5D4]/20 blur-xl opacity-70 animate-pulse"></div>
               <div className="relative text-5xl font-light text-white tracking-tight text-shadow-[0_0_15px_rgba(0,245,212,0.3)] tabular-nums">
                 ${animatedTvl.toFixed(2)}<span className="text-xl text-[#00F5D4] ml-1 opacity-80">M</span>
               </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-10">
            <div className="bg-white/5 p-4 rounded-xl border border-[#00F5D4]/20 shadow-[0_0_15px_rgba(0,245,212,0.05)]">
              <h4 className="text-[10px] uppercase tracking-wider text-[#00F5D4] font-medium mb-1">Mint (Verified)</h4>
              <div className="text-xl font-semibold">${(stats.verifiedValue / 1000000).toFixed(2)}M</div>
              <div className="text-xs text-gray-400 mt-1">{stats.verifiedCount} vaults active</div>
            </div>
            
            <div className="bg-white/5 p-4 rounded-xl border border-[#FFD700]/30">
              <h4 className="text-[10px] uppercase tracking-wider text-[#FFD700] font-medium mb-1">Gold (Escrowed)</h4>
              <div className="text-xl font-semibold">${((stats.reservedValue + stats.escrowedValue) / 1000000).toFixed(2)}M</div>
              <div className="text-xs text-gray-400 mt-1">{stats.reservedCount + stats.escrowedCount} vaults locked</div>
            </div>
          </div>

          <div className="pt-8 space-y-4">
            <h3 className="text-xs uppercase tracking-widest text-indigo-400 font-semibold flex items-center gap-2">
               <span className="w-2 h-2 rounded-full bg-indigo-400"></span>
               Regional Growth Index
            </h3>
            <div className="bg-gradient-to-br from-indigo-900/20 to-black/40 border border-indigo-500/20 rounded-xl p-4 cursor-crosshair group relative">
               <div className="flex justify-between items-end mb-4">
                 <div>
                   <p className="text-[10px] text-gray-500 uppercase tracking-widest font-medium">West Hills Alpha</p>
                   <p className="text-[9px] text-indigo-300 mt-1">$1,050/sqm Average</p>
                 </div>
                 <div className="text-right">
                   <p className="text-lg font-mono text-[#00F5D4] group-hover:animate-pulse shadow-sm">+$151k</p>
                   <div className="flex items-center justify-end gap-2 mt-1">
                     <p className="text-[9px] text-[#00F5D4] uppercase font-medium">+84% Yld</p>
                     <p className="text-[8px] bg-emerald-500/20 text-emerald-400 px-1.5 py-0.5 rounded font-medium uppercase tracking-wider flex items-center gap-1 animate-pulse border border-emerald-500/40">
                        <span className="w-1 h-1 bg-emerald-400 rounded-full"></span> 
                        +1.2% MoM
                     </p>
                   </div>
                 </div>
               </div>

               {/* Simulated Sparkline SVG */}
               <div className="h-12 w-full mt-2 relative flex items-end">
                  <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 100 40">
                     {/* Define Gradient */}
                     <defs>
                       <linearGradient id="sparkGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                         <stop offset="0%" stopColor="#4f46e5" stopOpacity="0.4" />
                         <stop offset="100%" stopColor="#00F5D4" stopOpacity="1" />
                       </linearGradient>
                     </defs>
                     {/* Data Line */}
                     <path 
                       d="M 0 35 Q 20 32, 40 25 T 70 15 T 100 5" 
                       fill="none" 
                       stroke="url(#sparkGradient)" 
                       strokeWidth="3" 
                       strokeLinecap="round" 
                       className="drop-shadow-[0_0_5px_rgba(0,245,212,0.8)]"
                     />
                     {/* Data Points */}
                     <circle cx="0" cy="35" r="2" fill="#4f46e5" />
                     <circle cx="100" cy="5" r="3" fill="#00F5D4" className="animate-ping" />
                  </svg>
                  
                  {/* Tooltips built in via absolute positioning over the SVG */}
                  <div className="absolute left-0 bottom-[-16px] text-[8px] font-mono text-gray-500">$180k</div>
                  <div className="absolute right-0 top-[-10px] text-[8px] font-mono text-[#00F5D4] bg-[#00F5D4]/10 px-1 rounded">$331.8k</div>
               </div>
            </div>
          </div>

          <div className="pt-8 space-y-4">
            <h3 className="text-xs uppercase tracking-widest text-[#00F5D4] font-semibold flex items-center gap-2">
               <span className="w-2 h-2 rounded-full bg-[#00F5D4]"></span>
               2017–2024 Transparency Disclosure
            </h3>
            <div className="bg-black/40 border border-white/10 rounded-xl p-4 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-400">Verified Clean</span>
                <span className="text-xs font-medium text-[#00F5D4] bg-[#00F5D4]/10 px-2 py-0.5 rounded-full border border-[#00F5D4]/20">
                  {stats.cleanAuditCount} Plots
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-400">Case-by-Case Review</span>
                <span className="text-xs font-medium text-yellow-500 bg-yellow-500/10 px-2 py-0.5 rounded-full border border-yellow-500/20">
                  {stats.reviewAuditCount} Plots
                </span>
              </div>
              <div className="pt-2 border-t border-white/5">
                <p className="text-[9px] text-gray-500 italic leading-relaxed">
                  * 10% of plots (Suspect/Revoked) have been automatically purged from the Syntry marketplace.
                </p>
              </div>
            </div>
          </div>

          <div className="pt-8 space-y-4">
            <h3 className="text-xs uppercase tracking-widest text-gray-500 font-semibold">System Diagnostics</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-400">Oracle Network</span>
                <span className="text-[#00F5D4] flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#00F5D4] animate-pulse shadow-[0_0_8px_rgba(0,245,212,0.8)]"></span> Online
                </span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-400">Database Sync</span>
                <span className="text-[#00F5D4] flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#00F5D4] animate-pulse shadow-[0_0_8px_rgba(0,245,212,0.8)]"></span> 99.9% Uptime
                </span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-400">Active Plots</span>
                <span className="text-white font-medium">{plots.length}</span>
              </div>
            </div>
          </div>

          {/* [MISSION: GENERATE THE SOVEREIGN DEED] Sidebar Integration */}
          {selectedPlot?.status === 'verified' && (
            <div className="p-6 border-t border-white/10 bg-indigo-500/5 animate-in slide-in-from-bottom-4 duration-500">
               <h3 className="text-[10px] uppercase tracking-widest text-[#00F5D4] font-medium tracking-tight mb-4">Verification Deed</h3>
               <CertificateGenerator plot={selectedPlot} auditResult={auditStream} />
               <p className="text-[10px] text-gray-500 mt-3 italic text-center text-shadow-sm">
                 Sovereign Deed-Digital is cryptographically signed and ready for custodial transfer.
               </p>
            </div>
          )}
          
          {/* Sovereign Payout Treasury Management */}
          {stats.escrowedValue > 0 && (
             <div className="p-6 border-t border-white/10 bg-gradient-to-b from-indigo-900/20 to-black/40 animate-in fade-in duration-500">
                <div className="flex justify-between items-center mb-4">
                   <h3 className="text-[10px] uppercase tracking-widest text-[#FFD700] font-medium tracking-tight flex items-center gap-2">
                       <span className="w-2 h-2 rounded-full bg-[#FFD700] animate-pulse shadow-[0_0_8px_#FFD700]"></span> Treasury Payout
                   </h3>
                   <span className="text-[8px] bg-white/10 px-2 py-0.5 rounded text-gray-300 font-mono uppercase tracking-widest border border-white/5">0.5% Protocol Fee</span>
                </div>
                <div className="space-y-4">
                   <div className="flex justify-between items-end border-b border-indigo-500/20 pb-4 mb-2">
                       <div className="flex flex-col">
                           <span className="text-[9px] uppercase tracking-widest text-gray-500 font-medium">Cleared Liquid Escrow</span>
                           <span className="text-xl font-mono text-white mt-1.5 drop-shadow-[0_0_8px_rgba(255,215,0,0.5)]">${stats.escrowedValue.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
                       </div>
                   </div>
                   <button 
                     onClick={(e) => {
                        const btn = e.currentTarget;
                        btn.innerHTML = `<span class="animate-spin inline-block w-4 h-4 border-[3px] border-black border-t-transparent rounded-full mr-2"></span> Initiating ZK-Proof Payout...`;
                        btn.classList.add("opacity-80", "cursor-wait");
                        setTimeout(() => {
                           btn.innerHTML = `✅ Escrow Settled to Founder Balance`;
                           btn.classList.remove("hover:scale-[1.02]", "cursor-wait", "bg-gradient-to-r", "from-yellow-600", "to-[#FFD700]", "border-yellow-400/50");
                           btn.classList.add("bg-emerald-500", "text-black", "border-none", "cursor-not-allowed");
                           btn.disabled = true;
                        }, 2500);
                     }}
                     className="w-full py-4 text-[11px] font-medium tracking-tight tracking-widest uppercase rounded-xl transition-all shadow-[0_0_20px_rgba(255,215,0,0.2)] bg-gradient-to-r from-yellow-600 to-[#FFD700] hover:scale-[1.02] border border-yellow-400/50 text-black flex justify-center items-center"
                   >
                      Withdraw to Bank/Wallet
                   </button>
                   <p className="text-[9px] text-gray-500 italic text-center font-mono leading-relaxed px-2">
                     Reconciles global Escrow state via ZK-Rollup architecture.
                   </p>
                </div>
             </div>
          )}
        </div>

        {/* Emergency Controls */}
        <div className="p-6 border-t border-white/10 bg-black/20">
          <div className="mb-4">
            <h3 className="text-xs uppercase tracking-widest text-gray-500 font-semibold">Protocol Security</h3>
          </div>
          <button
            onClick={() => {
               setIsEmergencyLocked(!isEmergencyLocked);
               if (!isEmergencyLocked) {
                 setSelectedPlot(null); // Close oracle detail if opening emergency lock
                 resetAuditState();
               }
            }}
            className={`w-full py-4 rounded-lg font-medium uppercase tracking-wider transition-all duration-300 ${
              isEmergencyLocked 
                ? 'bg-red-500/10 text-red-500 border border-red-500/50 hover:bg-red-500/20 shadow-[0_0_15px_rgba(239,68,68,0.3)]' 
                : 'bg-gradient-to-r from-red-600 to-red-800 text-white hover:shadow-[0_0_20px_rgba(220,38,38,0.8)] hover:scale-[1.02]'
            }`}
          >
            {isEmergencyLocked ? 'Lift Emergency Lock' : 'Emergency Lock'}
          </button>
          <p className="text-[10px] text-gray-500 mt-3 text-center">
            {isEmergencyLocked 
              ? 'Status: Vault transfers are currently halted system-wide. Oracles cannot finalize escrows.' 
              : 'Warning: This action will immediately halt all pending vault transitions across the global network.'}
          </p>
        </div>
        </div>
        )}
        
        {isPublicView && <PublicSidebar />}
      </div>
      
      {/* Mobile Sticky Footer "Buy Button" wrapper for viewport tight spots */}
      {isPublicView && selectedPlot && (
         <div className="fixed bottom-0 left-0 w-full md:hidden z-[110] bg-[#0E1629]/95 backdrop-blur-xl border-t border-indigo-500/30 p-4 shadow-[0_-10px_30px_rgba(0,0,0,0.5)] animate-in slide-in-from-bottom-full duration-300">
             <div className="flex justify-between items-center mb-3">
                 <div className="flex flex-col">
                    <span className="text-[9px] uppercase tracking-widest text-gray-400 font-medium">Node 08 Verified</span>
                    <span className="text-white font-mono font-medium">${Math.round((selectedPlot.value * 0.01) * 1.025).toLocaleString()}</span>
                 </div>
                 <div className="text-[10px] text-red-400 font-medium tracking-tight animate-pulse">
                    ⏱️ 14:59
                 </div>
             </div>
             <button 
               onClick={handleInitiateEscrow}
               className="w-full bg-gradient-to-r from-yellow-600 to-[#FFD700] text-black font-medium tracking-tight py-3.5 rounded-xl uppercase tracking-widest shadow-[0_0_20px_rgba(255,215,0,0.3)] flex justify-center items-center"
             >
               Reserve Instantly
             </button>
         </div>
      )}
    </div>
  );
}
