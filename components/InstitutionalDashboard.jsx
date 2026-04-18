'use client';

import React, { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../lib/supabase';
import SilverSovereignPacket from './SilverSovereignPacket';

// Sovereign Lens 3D Component (Lazy Loaded for Performance)
const SovereignMap = dynamic(() => import('./SovereignMap'), { 
   ssr: false, 
   loading: () => (
      <div className="w-full h-full bg-[#0D1B2A] flex items-center justify-center animate-[pulse_2s_ease-in-out_infinite]">
         <p className="text-[#2DD4BF] font-head font-black tracking-widest uppercase text-xs">Validating Ministerial Node 08...</p>
      </div>
   )
});

export default function InstitutionalDashboard() {
  const [currency, setCurrency] = useState('GHS');
  const exchangeRate = 15.5; 

   const [isLoading, setIsLoading] = useState(false);
   const [mapLoaded, setMapLoaded] = useState(false);
   const [showDroneView, setShowDroneView] = useState(false); // New Drone State

   // Lazy load Mapbox logic
   useEffect(() => {
     const timer = setTimeout(() => {
       setMapLoaded(true);
     }, 1500); // Wait for Hero to settle
     return () => clearTimeout(timer);
   }, []);

  const [isMobile, setIsMobile] = useState(false);
  const [showPropertyDrawer, setShowPropertyDrawer] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(null);
  
  // Real-time Database Verifications for Live Ticker
  useEffect(() => {
    const fetchRecentVerifications = async () => {
      const { data, error } = await supabase
        .from('plots')
        .select('id, location, status')
        .eq('status', 'verified')
        .order('updated_at', { ascending: false })
        .limit(5);

      if (data && data.length > 0) {
        const liveMessages = data.map(plot => `Plot ${plot.id} instantly verified via Node 08 in ${plot.location} [100% Secure]`);
        setTickerMessages(prev => [...liveMessages, ...prev].slice(0, 5));
      }
    };

    fetchRecentVerifications();

    const channel = supabase
      .channel('dash-ticker-live')
      .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'plots', filter: "status=eq.verified" }, (payload) => {
         const newPlot = payload.new;
         setTickerMessages(prev => [`Plot ${newPlot.id} instantly verified via Node 08 in ${newPlot.location} [100% Secure]`, ...prev].slice(0, 5));
      })
      .subscribe();

    return () => supabase.removeChannel(channel);
  }, []);

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 }); // Gamification & Revenue State
  const [reservedPlots, setReservedPlots] = useState([]);
  const [showPortal, setShowPortal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authStep, setAuthStep] = useState('login'); // 'login', '2fa', 'onboarding', 'dashboard'
  const [dashMode, setDashMode] = useState('dark'); // 'light', 'dark'
  const [showToS, setShowToS] = useState(false); // Sovereign Guarantee Intercept
  const [tickerMessages, setTickerMessages] = useState([
     "Node 08 Latency: 4ms - Online",
     "Secondary Market: +2.1% Vol.",
     "Sovereign Deed minted #7743"
  ]);

  // Payment Success Rewards State
  const [showSuccess, setShowSuccess] = useState(false);
  const [successPlot, setSuccessPlot] = useState('');

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('payment') === 'success') {
      setShowSuccess(true);
      setSuccessPlot(urlParams.get('plot') || 'Asset');
      // Clean URL
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);

  
  // WhatsApp 2FA State
  const [waPhone, setWaPhone] = useState('');
  const [isSending2FA, setIsSending2FA] = useState(false);
  const [twoFaCode, setTwoFaCode] = useState(['', '', '', '', '', '']);
  const [verificationScore, setVerificationScore] = useState(0);
  const codeRefs = [useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null)];

  // Syntry Guardian Security State
  const [loginAttempts, setLoginAttempts] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const [isScanning, setIsScanning] = useState(false);

  // High-Value Transaction State
  const [showBiometricScan, setShowBiometricScan] = useState(false);
  const [biometricStatus, setBiometricStatus] = useState('scan'); // 'scan', 'success'
  const [isLockedDown, setIsLockedDown] = useState(false);
  const HIGH_VALUE_THRESHOLD = 20000;

  // Wealth Signal State
  const [showNotifications, setShowNotifications] = useState(false);
  const [activeWealthSignal, setActiveWealthSignal] = useState(false);

  // Demo & FOMO State
  const [isDemoMode, setIsDemoMode] = useState(false);
  const [showFomo, setShowFomo] = useState(false);
  const [fomoMessage, setFomoMessage] = useState("");
  const [tosAccepted, setTosAccepted] = useState(false);

  // FOMO Logic (Investor FOMO effect)
  useEffect(() => {
    if (isLoggedIn && authStep === 'dashboard') {
      const messages = [
        "Investor from Berlin just reserved Plot B-12.",
        "Pioneer from London just upgraded to Silver Rank.",
        "Node 08 recorded a new high-value handshake.",
        "Exchange Volume just surpassed GH₵14M.",
        "Ministerial Node sync completed for Otatten Block A."
      ];
      
      const interval = setInterval(() => {
        if (Math.random() > 0.7) {
          setFomoMessage(messages[Math.floor(Math.random() * messages.length)]);
          setShowFomo(true);
          setTimeout(() => setShowFomo(false), 5000);
        }
      }, 15000);
      
    }
  }, [isLoggedIn, authStep]);

  const handleWaitlistSubmit = (e) => {
    // Lead event for Facebook Pixel
    if (window.fbq) window.fbq('track', 'Lead');
  };

  // Demo Mode Cursor Glow
  useEffect(() => {
    if (isDemoMode) {
      const handleMouseMove = (e) => {
        const glow = document.getElementById('demo-cursor-glow');
        if (glow) { glow.style.left = e.clientX + 'px'; glow.style.top = e.clientY + 'px'; }
      };
      window.addEventListener('mousemove', handleMouseMove);
      return () => window.removeEventListener('mousemove', handleMouseMove);
    }
  }, [isDemoMode]);



  
  // Calculator State
  const [calcMonths, setCalcMonths] = useState(0); // 0 = cash
  
  // Search State
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);

  // Real-time State
  const [properties, setProperties] = useState([]);
  const [vaultBalance, setVaultBalance] = useState(340500); // Default fallback

  const formatMoney = (amountGHS, forceUSD = false) => {
    if (currency === 'USD' || forceUSD) return `$${Math.round(amountGHS / exchangeRate).toLocaleString()}`;
    return `GH₵${Math.round(amountGHS).toLocaleString()}`;
  };

  // 1. Data Fetching & Real-time Persistence
  useEffect(() => {
    const fetchPlots = async () => {
      // In a real environment, we'd fetch from Supabase. 
      // For this mission, we'll sync the UI state with the requested locations.
      const syncLocations = [
        { id: 'vlt-01', name: 'Amasaman Node', location: 'Amasaman', value: 45000, size: '70x100ft', type: 'Residential/Commercial', image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80' },
        { id: 'vlt-08', name: 'Emerald Grove', location: 'Pokuase', value: 85000, size: '80x100ft', type: 'High Precision Plots', image: 'https://images.unsplash.com/photo-1523217582562-09d0def993a6?auto=format&fit=crop&w=800&q=80' },
        { id: 'vlt-03', name: 'Agri-Expansion', location: 'Nsawam', value: 35000, size: '100x100ft', type: 'Agricultural/Residential', image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80' },
        { id: 'vlt-04', name: 'Premium Crest', location: 'East Legon Hills', value: 125000, size: '70x100ft', type: 'Premium Residential', image: 'https://images.unsplash.com/photo-1600585154340-be6199f7a092?auto=format&fit=crop&w=800&q=80' },
        { id: 'vlt-05', name: 'Luxury Hillside', location: 'McCarthy Hills', value: 155000, size: '100x120ft', type: 'Luxury Hillside', image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80' },
      ];

      const mapped = syncLocations.map(p => ({
        ...p,
        priceGHS: p.value,
        maxMonths: 24,
        image: p.image,
        name: p.name,
        plotSize: p.size,
        category: p.type
      }));
      setProperties(mapped);
      
      const totalValue = mapped.reduce((sum, p) => sum + Number(p.value), 0);
      setVaultBalance(totalValue / exchangeRate);
    };

    fetchPlots();
  }, []);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Cmd+K Intercept
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setShowSearch(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Calculator Logic
  const getCalculatedPrice = (baseGHS, months) => {
    let adjustment = 0;
    
    if (months === 0) {
      adjustment = -0.02; // Cash = 2% off
    } else {
      const brackets = [
        { m: 0, a: 0.00 }, // Assume 0 months installment means 0 markup
        { m: 3, a: 0.05 },
        { m: 6, a: 0.10 },
        { m: 12, a: 0.20 },
        { m: 18, a: 0.25 },
        { m: 24, a: 0.30 }
      ];

      let lower = brackets[0];
      let upper = brackets[brackets.length - 1];
      
      for (let i = 0; i < brackets.length - 1; i++) {
        if (months >= brackets[i].m && months <= brackets[i+1].m) {
          lower = brackets[i];
          upper = brackets[i+1];
          break;
        }
      }

      if (lower.m === upper.m) {
         adjustment = lower.a;
      } else {
         const ratio = (months - lower.m) / (upper.m - lower.m);
         adjustment = lower.a + ratio * (upper.a - lower.a);
      }
    }

    const totalGHS = baseGHS * (1 + adjustment);
    const monthlyGHS = months === 0 ? totalGHS : totalGHS / months;

    return { totalGHS, monthlyGHS, adjustment };
  };

  const mapRef = useRef(null);

  const handleSend2FA = async () => {
    if (!waPhone) return;
    setIsSending2FA(true);
    
    try {
      setTimeout(async () => {
         await fetch('/api/whatsapp', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ phone: waPhone })
         });
         setIsSending2FA(false);
         setAuthStep('2fa');
      }, 3000);
    } catch(err) {
      setIsSending2FA(false);
      console.error(err);
    }
  };

  const verify2FACode = () => {
    if (isLocked) return;
    const code = twoFaCode.join('');
    
    // Guardian Bruteforce Protection Simulation (000000 fails)
    if (code === '000000' || code.length === 6 && code === '111111') {
       const newAttempts = loginAttempts + 1;
       setLoginAttempts(newAttempts);
       if (newAttempts >= 3) {
          setIsLocked(true);
          // Simulate automated WhatsApp security alert
          fetch('/api/whatsapp', { method: 'POST', body: JSON.stringify({ phone: waPhone, alert: 'Account locked due to 3 failed 2FA attempts.' }) }).catch(()=>null);
       }
       return; // Fail silently or display error
    }

    if (code.length === 6) {
      setIsScanning(true);
      setTimeout(() => {
         setIsScanning(false);
         setVerificationScore(prev => prev + 20);
         setIsLoggedIn(true);
         setAuthStep('onboarding');
      }, 1500); // 1.5s scanning effect
    }
  };

  const handleHoldPlot = (e, id) => {
    e.stopPropagation();
    setReservedPlots(prev => [...prev, id]);
  };

  const openDrawer = (property) => {
    setSelectedProperty(property);
    setCalcMonths(0);
    setShowPropertyDrawer(true);
  };

  const closeDrawer = () => {
    setShowPropertyDrawer(false);
  };

   const handleCheckout = async () => {
    if (!selectedProperty) return;
    
    // Calculate final price to check threshold
    const { totalGHS } = getCalculatedPrice(selectedProperty.priceGHS, calcMonths);
    if (totalGHS >= HIGH_VALUE_THRESHOLD && !showBiometricScan) {
        setShowBiometricScan(true);
        setBiometricStatus('scan');
        return; // Pause execution here until biometrics map is "verified"
    }

    // Simulation for "Sovereign Dark Rebuild" context
    setIsLoading(true);
    
    try {
      // Simulate API call and success return
      setTimeout(() => {
         setReservedPlots(prev => [...prev, selectedProperty.id]);
         setSuccessPlot(selectedProperty.name);
         setShowPropertyDrawer(false);
         setShowSuccess(true);
         setIsLoading(false);
         setShowBiometricScan(false);

         // Analytics Event
         if (typeof window !== 'undefined' && window.gtag) {
           window.gtag('event', 'reserve_fraction', {
             'event_category': 'Vault',
             'event_label': selectedProperty.name,
             'value': selectedProperty.priceUSD
           });
         }
         
         // Dispatch Welcome Email Trigger
         fetch('/api/send-bond', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
              email: 'investor@syntry.co', // Use actual user email
              assetData: {
                propertyName: selectedProperty.name,
                acquisitionPercent: 10,
                assetId: `SYN-VLT-08-${selectedProperty.id}`,
                bondPdfBase64: 'placeholder' // PDF generation logic can be added later
              }
            })
         }).then(() => console.log("Email Dispatched to Exchange"));
      }, 2000);
    } catch (err) {
      console.error("Checkout Error:", err);
      setIsLoading(false);
    }
  };

  const handleBiometricSuccess = () => {
     setBiometricStatus('success');
     
     // Haptic Feedback (Vibration API if available)
     if (typeof navigator !== 'undefined' && navigator.vibrate) {
        navigator.vibrate([100, 50, 100]);
     }

     // Audio reinforcement (Sovereign Tone)
     try {
       const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3');
       audio.volume = 0.5;
       audio.play();
     } catch (e) {}

     // Redirect manually after 2.5s "Success Visualization"
     setTimeout(() => {
        setReservedPlots(prev => [...prev, selectedProperty.id]);
        setSuccessPlot(selectedProperty.name);
        setShowPropertyDrawer(false);
        setShowBiometricScan(false);
        setBiometricStatus('scan');
        
        // Auto-scroll to command center
        setTimeout(() => {
           document.getElementById('security-command-center')?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
     }, 2500);
  };

  return (
    <div className="min-h-screen bg-[#0D1B2A] text-white font-sans selection:bg-[#2DD4BF] selection:text-[#0D1B2A]">
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=Montserrat:wght@700;800;900&display=swap');
        h1, h2, h3, h4, .font-head { font-family: 'Montserrat', sans-serif; font-weight: 700; letter-spacing: -0.04em; line-height: 1.1; }
        body, p, span, .font-body { font-family: 'Inter', sans-serif; line-height: 1.6; font-size: 16px; }
        
        .ticker-wrap { width: 100%; height: 48px; overflow: hidden; background-color: #162A3E; border-top: 1px solid rgba(45,212,191,0.2); border-bottom: 1px solid rgba(45,212,191,0.2); display: flex; align-items: center; }
        .ticker { display: inline-flex; white-space: nowrap; animation: ticker 40s linear infinite; gap: 32px; align-items: center; }
        .ticker:hover { animation-play-state: paused; text-shadow: 0 0 8px rgba(255,255,255,0.4); }
        @keyframes ticker { 0% { transform: translate3d(0, 0, 0); } 100% { transform: translate3d(-50%, 0, 0); } }
        @keyframes shimmer { 0% { background-position: -200% -200%; } 100% { background-position: 200% 200%; } }
        @keyframes dash { to { stroke-dashoffset: 0; } }
        @keyframes scan { 0% { top: -10%; } 100% { top: 110%; } }

        /* Typography & Overlap Fixes */
        h1 { line-height: 0.9; letter-spacing: -0.05em; }
        @media (max-width: 768px) {
          h1 { font-size: 3.5rem !important; line-height: 1.0; }
          .hero-text { padding-top: 2rem; }
        }
        @media (min-width: 1200px) {
          .hero-h1 { line-height: 0.8 !important; letter-spacing: -0.06em !important; }
        }
      `}} />      {/* Navigation removed - handled by GlobalHeader in RootLayout */}

      {/* 2. Hero Refinement: Deep Navy Dominance */}
      <header className="relative pt-32 pb-0 bg-[#0C0C14] overflow-hidden flex flex-col items-center">
         {/* Technical grid backdrop */}
         <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #FFFFFF 1px, transparent 0)', backgroundSize: '60px 60px' }}></div>
         
         <div className="max-w-[1200px] mx-auto px-6 relative z-10 w-full grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            {/* Left Typography Block */}
            <div className="space-y-10 lg:pr-10 hero-text max-w-4xl">
               <div className="inline-flex items-center gap-4 border border-white/5 bg-white/5 px-6 py-2 rounded-full text-[10px] font-mono uppercase tracking-[4px] text-[#B8FF3C]">
                  Starting in Ghana. Scaling across Africa.
               </div>
               <h1 className="text-6xl md:text-7xl lg:text-[120px] 2xl:text-[140px] font-head leading-[0.85] lg:leading-[0.8] tracking-tight lg:tracking-tighter text-white mb-6 hero-h1">
                  Property <br />
                  <span className="text-[#B8FF3C]">Markets. Unified.</span>
               </h1>
               <p className="text-xl md:text-2xl text-white/40 font-body leading-relaxed max-w-xl italic">
                  SYNTRY is the synchronised entry into every property market. Unified Data, Ministerial Node 08 Verification, and Flexible Repayments with Absa.
               </p>
               <div className="flex flex-col sm:flex-row gap-6 relative z-50">
                 <button onClick={() => window.location.href = '/invest/'} className="w-full sm:w-auto px-10 py-6 bg-[#B8FF3C] text-black font-head font-black tracking-widest text-xs rounded-2xl shadow-[0_20px_40px_rgba(184,255,60,0.3)] hover:scale-105 active:scale-95 transition-all">
                    ACCESS WEB TERMINAL →
                 </button>
                 <button onClick={() => window.scrollTo({top: 800, behavior: 'smooth'})} className="w-full sm:w-auto px-10 py-6 border border-white/20 text-white font-head font-black tracking-widest text-xs rounded-2xl hover:bg-white/5 transition-all">
                    GET EARLY ACCESS
                 </button>
               </div>
            </div>

            {/* Right: 3D Visual (Tilted Ground Truth - Mobile Zoom) */}
            <div className="relative h-64 md:h-[450px] w-full flex items-center justify-center [perspective:1200px] mb-20 lg:mb-0">
               <motion.div 
                  initial={{ rotateY: 0, scale: 0.9 }}
                  animate={{ rotateY: 15, scale: 1 }}
                  whileInView={{ scale: 1.1 }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className="relative w-full max-w-[500px] aspect-[4/3] bg-[#162A3E]/30 backdrop-blur-[20px] rounded-[40px] border border-white/10 shadow-[0_50px_100px_rgba(0,0,0,0.5)] overflow-hidden group"
               >
                  <img src="https://images.unsplash.com/photo-1544627196-8561ecadfa00?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" alt="Ground Truth" loading="lazy" className="w-full h-full object-cover opacity-20 grayscale" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0C0C14] to-transparent opacity-90"></div>
                  
                  {/* Glowing Marker */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                     <div className="w-[1px] h-32 bg-[#B8FF3C] animate-[height_2s_ease-in-out_infinite]"></div>
                  </div>

                  <div className="absolute bottom-6 left-6 space-y-1">
                     <span className="bg-[#B8FF3C] text-[#0C0C14] text-[9px] font-mono uppercase tracking-[4px] px-3 py-1 block w-max mb-3">Sovereign Zoom Active</span>
                     <h3 className="text-white font-head text-4xl tracking-tighter">₵ 87,745</h3>
                     <p className="text-[#B8FF3C] font-mono text-sm">↑ NODE 08 SYNC</p>
                  </div>
               </motion.div>
            </div>
         </div>

         {/* Task 1: Mobile Feature Grid */}
         <div className="max-w-[1200px] mx-auto px-6 w-full pt-20 pb-32 grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: "🛸", title: "360° Drone Verification", desc: "Inspection from every legal angle." },
              { icon: "🏦", title: "Absa Co-Lending Portal", desc: "Senior debt fractionalized at 27.5%." },
              { icon: "🏛️", title: "Ministerial Node 08 Security", desc: "State-level legal finality." }
            ].map((feature, i) => (
              <div key={i} className="bg-[#162A3E]/30 border border-white/5 p-8 rounded-[32px] hover:border-[#B8FF3C]/20 transition-all">
                <div className="text-4xl mb-6">{feature.icon}</div>
                <h4 className="text-xl font-head text-white uppercase tracking-tight mb-2">{feature.title}</h4>
                <p className="text-white/40 text-sm font-body">{feature.desc}</p>
              </div>
            ))}
         </div>

         {/* Task 1: Sticky Bottom CTA (Mobile Exclusive) */}
         <div className="lg:hidden fixed bottom-0 left-0 right-0 p-6 z-[200] pointer-events-none">
            <button 
               onClick={() => window.location.href = '/invest/'}
               className="pointer-events-auto w-full py-6 bg-[#B8FF3C] text-black font-head font-black text-sm uppercase tracking-[4px] rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] active:scale-95 transition-all"
            >
               VERIFY LAND NOW →
            </button>
         </div>

         {/* The "3D Action Box" (Redesign - Dark Pill) */}
         <div className="relative z-30 w-[94%] md:w-[940px] mt-16 md:mt-24 mb-[40px] md:mb-[80px] self-center">
            <div className="bg-[#0B141E] rounded-[32px] md:rounded-full shadow-[0_40px_80px_rgba(0,0,0,0.6)] px-6 py-3 flex flex-col md:flex-row items-center justify-between gap-4 md:gap-0 border border-white/10 dark-pill">
               <div className="relative w-full flex-1">
                  <span className="absolute left-6 top-1/2 -translate-y-1/2 text-lg">📍</span>
                  <select className="w-full bg-transparent border-none py-4 pl-14 pr-4 text-white font-bold outline-none appearance-none cursor-pointer text-sm">
                     <option>Location ▾</option>
                     <option>Ashifla, Accra</option>
                     <option>East Legon</option>
                  </select>
               </div>
               <div className="w-px h-10 bg-white/5 hidden md:block"></div>
               <div className="relative w-full flex-1">
                  <span className="absolute left-6 top-1/2 -translate-y-1/2 text-lg">💰</span>
                  <select className="w-full bg-transparent border-none py-4 pl-14 pr-4 text-white font-bold outline-none appearance-none cursor-pointer text-sm">
                     <option>Budget ▾</option>
                     <option>Under $10k (GH₵150k)</option>
                     <option>$10k - $25k</option>
                  </select>
               </div>
               <div className="w-px h-10 bg-white/5 hidden md:block"></div>
               <div className="relative w-full flex-1">
                  <span className="absolute left-6 top-1/2 -translate-y-1/2 text-lg">🏗️</span>
                  <select className="w-full bg-transparent border-none py-4 pl-14 pr-4 text-white font-bold outline-none appearance-none cursor-pointer text-sm">
                     <option>Type ▾</option>
                     <option>Full Plot</option>
                     <option>Fractional</option>
                     <option>Home Construction</option>
                  </select>
               </div>
               <button onClick={() => window.scrollTo({top: 800, behavior: 'smooth'})} className="w-full md:w-auto px-8 md:px-10 bg-[#D4AF37] text-[#0D1B2A] font-head font-black text-xs uppercase tracking-widest py-4 md:py-6 rounded-[32px] hover:scale-[1.02] active:scale-95 transition-all shadow-[0_0_30px_rgba(212,175,55,0.3)] shrink-0 self-center">
                  Explore Properties →
               </button>
            </div>
         </div>
      </header>

      {/* 2.5 Live Ticker: Real-time Exchange Flux */}
      <div className="relative z-40 border-y border-white/5 bg-[#0C0C14] h-[60px] flex items-center overflow-hidden">
         <div className="ticker flex items-center gap-12 whitespace-nowrap text-[10px] font-mono uppercase tracking-[4px] text-white/30">
               <span className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-[#B8FF3C]"></span>
                  SYSTEM SYNCHRONISED
               </span>
               <span className="text-[#B8FF3C]">MARKET NODE 08 ACTIVE</span>
               <span>ACCRA: +2.1% VOL</span>
               <span>LAGOS: INITIALISING</span>
               <span>NAIROBI: PENDING SYNC</span>
               <span className="w-12"></span>
               {/* Loop */}
               <span className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-[#B8FF3C]"></span>
                  SYSTEM SYNCHRONISED
               </span>
               <span className="text-[#B8FF3C]">MARKET NODE 08 ACTIVE</span>
               <span>ACCRA: +2.1% VOL</span>
               <span>LAGOS: INITIALISING</span>
               <span>NAIROBI: PENDING SYNC</span>
         </div>
      </div>

      {/* 3. The Sovereign Path (How it Works) - Redesigned */}
      <section id="how-it-works" className="bg-[#0D1B2A] py-[80px] md:py-[160px] px-6 border-b border-white/5">
         <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl md:text-6xl font-head font-black text-white text-center mb-24 uppercase tracking-tighter">The Sovereign Path</h2>
            
            {/* Desktop Horizontal Timeline / Mobile Vertical Stepper */}
            <div className="relative flex flex-col md:flex-row items-start justify-between gap-12 md:gap-4">
               {/* Connector Line (Desktop) */}
               <div className="hidden md:block absolute top-[40px] left-[10%] right-[10%] h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
               
                {[
                  { step: "01", title: "Identify", sub: "Scan the 3D map for geo-verified parcels.", icon: "🔍", meta: "Geofencing Active" },
                  { step: "02", title: "Finance", sub: "Bridge your investment with Flexi-Pay.", icon: "🏦", meta: "Absa Node Proxy" },
                  { step: "03", title: "Own", sub: "Receive digital deeds via Node 08.", icon: "📜", meta: "Statutory Finality" }
               ].map((item, idx) => (
                  <motion.div 
                     initial={{ opacity: 0, y: 20 }}
                     whileInView={{ opacity: 1, y: 0 }}
                     transition={{ delay: idx * 0.2 }}
                     key={idx} 
                     className="flex-1 w-full flex flex-col items-center md:items-start text-center md:text-left group relative z-10"
                  >
                     <div className="w-20 h-20 bg-[#162A3E] rounded-[24px] border border-white/10 flex items-center justify-center text-3xl mb-8 group-hover:border-[#B8FF3C]/40 group-hover:bg-[#0D1B2A] transition-all relative">
                        <span className="absolute -top-4 -left-4 bg-[#B8FF3C] text-black text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest shadow-xl">
                          Step {item.step}
                        </span>
                        {item.icon}
                     </div>
                     <h3 className="text-2xl md:text-3xl font-head text-white mb-4 uppercase tracking-tight">{item.title}</h3>
                     <p className="text-[#94A3B8] font-body text-base md:text-lg mb-6 max-w-sm">{item.sub}</p>
                     <div className="font-mono text-[9px] tracking-[4px] uppercase text-[#B8FF3C]/40 group-hover:text-[#B8FF3C] transition-colors">
                        {item.meta}
                     </div>
                  </motion.div>
               ))}
            </div>
         </div>
      </section>

      {/* 4. Education Bridge: Comparison Table */}
      <section className="bg-[#0D1B2A] py-[64px] md:py-[120px] px-6">
         <div className="max-w-5xl mx-auto">
            <h2 className="text-center font-head font-black text-5xl md:text-6xl text-white mb-6 uppercase tracking-tighter">Not a Listing Site.<br /><span className="text-[#2DD4BF]">A Sovereign Exchange.</span></h2>
            <p className="text-center text-[#94A3B8] font-body mb-[64px] md:mb-[80px] text-xl max-w-2xl mx-auto">Traditional real estate is broken. Syntry is engineered for legal finality on a massive scale.</p>
            
            <div className="bg-[#162A3E] rounded-[32px] md:rounded-[40px] overflow-hidden shadow-[0_50px_100px_rgba(0,0,0,0.5)] border border-white/10 p-4 md:p-10">
               {/* Desktop Table Header */}
               <div className="hidden md:block rounded-[24px] overflow-hidden border border-white/5 bg-[#0D1B2A]">
                  <div className="grid grid-cols-[1.2fr_1fr_1.2fr] text-white py-8 px-10 text-[11px] font-black uppercase tracking-[0.25em] border-b border-white/5 bg-[#081018]">
                     <span>Framework Node</span>
                     <span className="text-center">Traditional</span>
                     <span className="text-center text-[#0D1B2A] text-[12px] bg-[#D4AF37] px-6 py-2 rounded-full font-black ml-4">Syntry Advantage</span>
                  </div>
                  
                  {[
                     { f: "Capital Safekeeping", t: "Developer Account", s: "Independent Escrow Vault" },
                     { f: "Legal Verification", t: "Manual / Self-Reported", s: "Automated Node 08 Scan" },
                     { f: "Title Security", t: "Paper Indenture", s: "Immutable Digital Deed" },
                     { f: "Risk Profile", t: "High Litigation Risk", s: "0% Counterparty Risk" }
                  ].map((row, i) => (
                     <div key={i} className="grid grid-cols-[1.2fr_1fr_1.2fr] py-8 px-10 border-b border-white/5 text-base items-center group hover:bg-white/[0.02] transition-colors">
                        <span className="font-bold text-white uppercase tracking-tight text-sm lg:text-base">{row.f}</span>
                        <span className="text-center text-[#94A3B8] italic">{row.t}</span>
                        <span className="text-center text-[#2DD4BF] font-black uppercase tracking-widest text-sm">{row.s}</span>
                     </div>
                  ))}
               </div>

               {/* Mobile Card Layout */}
               <div className="md:hidden space-y-6">
                  {[
                     { f: "Capital Safekeeping", t: "Developer Account", s: "Independent Escrow Vault" },
                     { f: "Legal Verification", t: "Manual / Self-Reported", s: "Automated Node 08 Scan" },
                     { f: "Title Security", t: "Paper Indenture", s: "Immutable Digital Deed" },
                     { f: "Risk Profile", t: "High Litigation Risk", s: "0% Counterparty Risk" }
                  ].map((row, i) => (
                     <div key={i} className="bg-[#0D1B2A] rounded-2xl border border-white/5 p-6 space-y-4">
                        <div className="text-[10px] uppercase font-black tracking-[0.2em] text-white/20 border-b border-white/5 pb-2">
                           Framework Node {i+1}
                        </div>
                        <h4 className="text-white font-head uppercase text-lg tracking-tight leading-none">{row.f}</h4>
                        
                        <div className="grid grid-cols-2 gap-4 pt-2">
                           <div>
                              <div className="text-[8px] uppercase tracking-widest text-white/10 mb-1">Traditional</div>
                              <div className="text-white/40 text-[10px] font-body italic leading-tight">{row.t}</div>
                           </div>
                           <div className="bg-[#D4AF37]/5 border border-[#D4AF37]/10 p-3 rounded-xl">
                              <div className="text-[8px] uppercase tracking-widest text-[#D4AF37] mb-1 font-black">Syntry Advantage</div>
                              <div className="text-[#B8FF3C] text-[10px] font-head uppercase tracking-tight flex items-center gap-1.5">
                                 <span className="text-[#D4AF37]">✓</span> {row.s}
                              </div>
                           </div>
                        </div>
                     </div>
                  ))}
               </div>
            </div>
         </div>
      </section>

      {/* 5. Live Exchange: Institutional Asset Tiles */}
      <section className="bg-[#0D1B2A] py-[64px] md:py-[120px] relative overflow-hidden" id="exchange">
         <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#FFFFFF 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>
         <div className="max-w-[1200px] mx-auto px-6 relative z-10">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
               <div className="space-y-4">
                  <h3 className="text-4xl md:text-5xl font-head font-black text-white uppercase tracking-tighter">Sovereign Asset Exchange</h3>
                  <div className="flex items-center gap-3">
                     <span className="relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10B981] opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-[#10B981]"></span>
                     </span>
                      <span className="text-[11px] font-black uppercase tracking-[0.2em] text-[#10B981]">Ministerial Node 08: Real-time 3D Ground-Truth Active</span>
                  </div>
               </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
               {properties.map(plot => {
                  const isHeld = reservedPlots.includes(plot.id);
                  return (
                  <motion.div 
                     layoutId={`card-${plot.id}`} 
                     key={plot.id} 
                     whileHover={{ 
                        y: -12,
                        transition: { duration: 0.3 }
                     }}
                     className={`bg-[#162A3E] rounded-[40px] overflow-hidden border border-white/10 shadow-[0_30px_60px_rgba(0,0,0,0.4)] transition-all group flex flex-col h-full relative ${isHeld ? 'opacity-50 pointer-events-none' : ''}`}
                  >
                     {/* Asset Photo with Node 08 Seal */}
                     <div className="h-44 relative overflow-hidden shrink-0 border-b border-white/5">
                        <img src={plot.image} alt={plot.name} loading="lazy" className={`w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 opacity-60 group-hover:opacity-80`} />
                        
                        {/* Gold Node Seal */}
                        <div className="absolute top-4 right-4 w-12 h-12 bg-gradient-to-br from-[#D4AF37] to-[#B68C1C] rounded-full border-2 border-white/20 shadow-2xl flex items-center justify-center pointer-events-none transform rotate-12 group-hover:rotate-0 transition-transform z-20">
                           <div className="text-[10px] font-black text-[#0D1B2A] text-center leading-[0.8] uppercase">
                              Node<br />08
                           </div>
                        </div>

                        {/* Pulsing Green Dot (Live Node Connection) */}
                        <div className="absolute top-4 left-4 flex items-center gap-2 bg-[#0D1B2A]/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20 shadow-xl">
                           <span className="relative flex h-2 w-2">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10B981] opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#10B981]"></span>
                           </span>
                           <span className="text-[9px] font-black text-white uppercase tracking-widest">LIVE</span>
                        </div>
                     </div>
                     
                     {/* Data Layer */}
                     <div className="p-6 flex flex-grow flex-col gap-4">
                        <div className="flex justify-between items-start">
                           <div className="space-y-1">
                              <div className="text-[10px] font-black uppercase tracking-[0.2em] text-[#B8FF3C]">{plot.location}</div>
                              <h4 className="text-xl font-head font-black text-white leading-tight uppercase tracking-tighter">{plot.name}</h4>
                              <p className="text-[10px] text-white/40 uppercase font-mono">{plot.plotSize} | {plot.category}</p>
                           </div>
                           
                           {/* Trust Gauge (Dark Variant) */}
                           <div className="relative w-10 h-10 flex items-center justify-center shrink-0">
                              <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
                                 <path className="text-white/5" strokeWidth="3" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                                 <motion.path 
                                    initial={{ strokeDasharray: "0, 100" }} 
                                    animate={{ strokeDasharray: "98, 100" }} 
                                    transition={{ duration: 2, ease: "easeOut" }} 
                                    className="text-[#B8FF3C]" 
                                    strokeWidth="3" 
                                    strokeLinecap="round" 
                                    stroke="currentColor" 
                                    fill="none" 
                                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" 
                                 />
                              </svg>
                              <div className="absolute inset-0 flex items-center justify-center text-[10px] font-black text-[#B8FF3C]">98</div>
                           </div>
                        </div>
                        
                        <div className="mt-auto space-y-4">
                           <div className="flex justify-between items-end border-t border-white/5 pt-4">
                              <div>
                                 <div className="text-[8px] uppercase tracking-widest text-white/30 mb-1">Starting From</div>
                                 <div className="text-2xl font-head font-black text-white tracking-tighter">
                                    {formatMoney(plot.priceGHS)}
                                 </div>
                              </div>
                              <div className="text-right">
                                 <div className="text-[8px] uppercase tracking-widest text-[#B8FF3C] mb-1 font-black">Plan</div>
                                 <div className="text-[10px] text-white/60 font-mono">24M Installments</div>
                              </div>
                           </div>
                           <button onClick={() => openDrawer(plot)} className="w-full py-4 bg-[#B8FF3C] text-black font-head font-black text-[10px] uppercase tracking-[0.2em] rounded-xl hover:scale-[1.02] active:scale-95 transition-all shadow-[0_15px_30px_rgba(184,255,60,0.2)]">
                              View Plot Details →
                           </button>
                        </div>
                     </div>
                  </motion.div>
               )})}
            </div>
         </div>
      </section>

      {/* 6. The Sovereign Guarantee (Institutional Shield) */}
      <section className="py-[64px] md:py-[100px] bg-[#0D1B2A] relative overflow-hidden border-y border-[#D4AF37]/20">
         <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'radial-gradient(#D4AF37 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
         
         <div className="max-w-[1200px] mx-auto px-6 relative z-10">
            <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-8">
               <div className="text-center md:text-left">
                  <h2 className="text-4xl md:text-5xl font-head font-black text-white mb-4 tracking-tighter">The Sovereign Guarantee</h2>
                  <p className="text-[#94A3B8] text-lg max-w-xl">Institutional-grade safety protocols protecting every statutory transaction.</p>
               </div>
               <div className="flex items-center gap-4 bg-[#0D1B2A] px-6 py-3 rounded-full border border-[#D4AF37]/30 shadow-2xl">
                  <span className="relative flex h-3 w-3">
                     <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10B981] opacity-75"></span>
                     <span className="relative inline-flex rounded-full h-3 w-3 bg-[#10B981]"></span>
                  </span>
                  <span className="text-[11px] font-black uppercase tracking-widest text-white">Ministerial Node: <span className="text-[#10B981]">Verified Status [Active]</span></span>
               </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
               {[
                  { title: "Vault Protection", desc: "Your capital enters a ring-fenced escrow vault. Funds are only released to legal entities upon verified physical and legal milestones.", icon: "🏛️" },
                  { title: "Statutory Scale", desc: "Transactions are executed at state-level legal finality. If ground-truth fails, 100% of your principal is returned via automated node consensus.", icon: "⚖️" },
                  { title: "Immutable Intent", desc: "All ownership records are cryptographically bound to your identity, creating a permanent digital chain of custody independent of private registries.", icon: "📜" }
               ].map((item, idx) => (
                  <div key={idx} className="bg-[#0D1B2A] p-12 rounded-[40px] border border-white/5 shadow-2xl group hover:border-[#D4AF37]/30 transition-all">
                     <div className="text-5xl mb-8 group-hover:scale-110 transition-transform">{item.icon}</div>
                     <h3 className="text-2xl font-head font-black mb-4 text-white uppercase tracking-tight">{item.title}</h3>
                     <p className="text-[#94A3B8] leading-relaxed font-body text-base">{item.desc}</p>
                  </div>
               ))}
            </div>
         </div>
      </section>

      {/* 7. Institutional CTA (Vault Entrance) */}
      <section className="py-[64px] md:py-[120px] px-6 text-center bg-[#0D1B2A] relative overflow-hidden border-t border-white/5">
         <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'radial-gradient(#2DD4BF 1px, transparent 1px)', backgroundSize: '64px 64px' }}></div>
         <div className="relative z-10 max-w-4xl mx-auto">
            <h2 className="text-5xl md:text-7xl font-head font-black text-white mb-8 tracking-tighter uppercase">Join the Sovereign Exchange.</h2>
            <p className="text-[#94A3B8] text-xl mb-12 max-w-2xl mx-auto font-body">The secure framework for African real estate wealth. Skip the paper trail; enter the vault.</p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
               <button onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})} className="w-full sm:w-auto px-12 py-6 bg-[#D4AF37] text-[#0D1B2A] font-head font-black uppercase tracking-[0.2em] text-xs rounded-full shadow-[0_20px_40px_rgba(212,175,55,0.2)] hover:scale-105 active:scale-95 transition-all">
                  Browse Active Nodes →
               </button>
               <button className="w-full sm:w-auto px-12 py-6 border-2 border-white/20 text-white font-head font-black uppercase tracking-[0.2em] text-xs rounded-full hover:bg-white hover:text-[#0D1B2A] transition-all">
                  Institutional Login
               </button>
            </div>
         </div>
      </section>

      {/* Mobile-First "Bolt Ride-Request" Slide-Up Drawer map */}
      <AnimatePresence>
         {showPropertyDrawer && selectedProperty && (
            <motion.div 
               initial={{ opacity: 0, y: "100%" }} 
               animate={{ opacity: 1, y: 0 }} 
               exit={{ opacity: 0, y: "100%" }} 
               transition={{ type: "spring", stiffness: 300, damping: 30 }}
               className="fixed inset-0 lg:inset-y-0 lg:right-0 lg:w-[1000px] z-[200] flex flex-col justify-end lg:justify-start"
            >
               {/* Mobile Dismiss Backdrop */}
               <motion.div 
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="fixed inset-0 bg-black/60 backdrop-blur-sm -z-10" 
                  onClick={closeDrawer}
               ></motion.div>
               
               <div className="bg-[#0D1B2A] w-full h-[90vh] lg:h-full rounded-t-[32px] lg:rounded-l-[32px] lg:rounded-tr-none shadow-[0_-20px_50px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col relative">
                  
                  {/* Mobile Drag Handle */}
                  <div className="w-full flex justify-center pt-4 pb-2 lg:hidden" onClick={closeDrawer}>
                     <div className="w-16 h-1.5 bg-gray-700 rounded-full"></div>
                  </div>
                  <button onClick={closeDrawer} className="absolute top-6 right-6 w-10 h-10 bg-[#162A3E] border border-white/10 rounded-full flex items-center justify-center text-white hover:text-[#2DD4BF] z-50 shadow-sm hidden lg:flex">&times;</button>
                  
                  {/* Premium Flight Simulator Map Pane (Top half ride map) */}
                  <div className="w-full h-[35vh] lg:h-[45vh] relative bg-[#0D1B2A] overflow-hidden shrink-0 border-b border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
                     {/* Sovereign Lens 3D Map Component (Lazy) */}
                     {showPropertyDrawer && mapLoaded && (
                        <SovereignMap initialLat={selectedProperty.lat} initialLng={selectedProperty.lng} />
                     )}
                     {!mapLoaded && (
                        <div className="absolute inset-0 flex items-center justify-center bg-[#0D1B2A]">
                           <span className="w-10 h-10 border-2 border-[#D4AF37]/20 border-t-[#D4AF37] rounded-full animate-spin"></span>
                        </div>
                     )}

                     <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)] z-10"></div>
                     
                     <div className="absolute top-6 left-6 z-20 flex flex-col items-start gap-4">
                        <div>
                           <div className="flex items-center gap-2 mb-1">
                              <span className="relative flex h-2 w-2">
                                 <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10B981] opacity-75"></span>
                                 <span className="relative inline-flex rounded-full h-2 w-2 bg-[#10B981]"></span>
                              </span>
                              <span className="text-[10px] font-black text-[#10B981] uppercase tracking-[0.2em] shadow-sm">Ministerial Node 08 Linked</span>
                           </div>
                           <h2 className="text-3xl font-head font-black text-white drop-shadow-md leading-none uppercase">{selectedProperty.name}</h2>
                           <span className="block text-white font-bold bg-[#162A3E]/80 backdrop-blur px-3 py-1.5 rounded-full text-[9px] mt-2 w-max shadow-sm border border-white/5 uppercase tracking-widest">GPS Authenticated ✓</span>
                        </div>
                        
                        {/* 1. The Drone Interface Launch Button */}
                        <button 
                           onClick={(e) => { 
                              e.stopPropagation(); 
                              setShowDroneView(true);
                              if (typeof window !== 'undefined' && window.gtag) {
                                 window.gtag('event', 'launch_drone_view', { 'event_category': 'Engagement', 'event_label': selectedProperty.name });
                              }
                           }}
                           className="flex items-center gap-3 px-6 py-3 bg-[#0D1B2A]/90 backdrop-blur-md border border-[#D4AF37] rounded-full shadow-[0_10px_30px_rgba(212,175,55,0.3)] hover:scale-105 active:scale-95 transition-all group"
                        >
                           <span className="text-[#D4AF37] text-lg group-hover:rotate-12 transition-transform">🛰️</span>
                           <span className="text-white font-black text-[10px] uppercase tracking-widest leading-none mt-0.5">Launch Drone View</span>
                           {/* Pulsing "Rec" Dot */}
                           <div className="flex items-center gap-1.5 bg-black/40 px-2.5 py-1 rounded-full border border-white/10 ml-2">
                              <span className="relative flex h-1.5 w-1.5">
                                 <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
                                 <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-red-500"></span>
                              </span>
                              <span className="text-red-500 text-[8px] font-black tracking-widest uppercase mb-[1px]">REC</span>
                           </div>
                        </button>
                     </div>
                  </div>

                  {/* Payment Calculator ("Ride Fare") */}
                  <div className="w-full bg-[#162A3E] p-6 md:p-10 flex-grow overflow-y-auto custom-scrollbar">
                     <div className="relative">
                        <h3 className="text-2xl font-head font-black text-white mb-1 uppercase tracking-tighter">Escrow Calculator</h3>
                        <p className="text-sm text-[#94A3B8] mb-8 font-body">Configure statutory payment timeline for this node.</p>
 
                     {/* Term Selector */}
                     <div className="mb-8">
                        {/* Added Beneficiary Toggle */}
                        <div className="mb-6 bg-[#0D1B2A] border border-white/5 p-4 rounded-[20px] flex items-center justify-between shadow-2xl">
                           <div>
                              <h4 className="text-white font-bold text-sm">Asset Beneficiary Allocation</h4>
                              <p className="text-[9px] text-[#94A3B8] uppercase tracking-widest font-black mt-1">Multi-Generational Custody Protocol</p>
                           </div>
                           <label className="relative inline-flex items-center cursor-pointer">
                              <input type="checkbox" className="sr-only peer" />
                              <div className="w-11 h-6 bg-white/10 rounded-full peer peer-checked:bg-[#2DD4BF] after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full"></div>
                           </label>
                        </div>
                        <label className="text-[10px] font-bold uppercase tracking-widest text-[#94A3B8] mb-4 block">Installment Timeline</label>
                           <input 
                              type="range" 
                              min="0" 
                              max={selectedProperty.maxMonths} 
                              step="1" 
                              value={calcMonths}
                              onChange={(e) => setCalcMonths(parseInt(e.target.value))}
                              className="w-full accent-[#D4AF37] h-1.5 bg-white/10 rounded-full appearance-none cursor-pointer"
                           />
                        <div className="flex justify-between text-[10px] font-mono text-[#94A3B8] mt-3 font-bold">
                           <span>CASH (2% Off)</span>
                           <span>{selectedProperty.maxMonths / 2} Mo</span>
                           <span>{selectedProperty.maxMonths} Mo (Max)</span>
                        </div>
                     </div>

                     {/* Term Cards */}
                     <div className="flex gap-2 mb-8 overflow-x-auto pb-2 custom-scrollbar">
                        {[0, 3, 6, 12, 18, 24].filter(m => m <= selectedProperty.maxMonths).map(m => (
                           <button 
                             key={m}
                             onClick={() => setCalcMonths(m)}
                             className={`flex-none py-2 px-4 rounded-btn border font-head font-bold text-[10px] transition-all whitespace-nowrap ${calcMonths === m ? 'bg-bg-base text-accent-teal border-[#0D1B2A]' : 'bg-transparent text-text-muted border-gray-200 hover:border-[#14b8a6]'}`}
                           >
                              {m === 0 ? 'Outright Cash' : `${m} Months`}
                           </button>
                        ))}
                     </div>

                     {/* Bolt Math Checkout */}
                     {(() => {
                        const calcState = getCalculatedPrice(selectedProperty.priceGHS, calcMonths);
                        return (
                           <div className="mt-6 bg-bg-surface shadow-[0_10px_30px_rgba(0,0,0,0.06)] rounded-[20px] p-6 border border-gray-100 relative overflow-hidden">
                              <div className="absolute top-0 right-0 w-32 h-32 bg-accent-teal/5 rounded-bl-[100px] pointer-events-none"></div>
                              <div className="flex justify-between items-end mb-6 relative z-10">
                                 <div>
                                    <span className="block text-xs text-text-muted uppercase font-bold tracking-widest mb-1">Total Due</span>
                                    <span className="text-4xl font-black text-text-primary">{formatMoney(calcState.totalGHS, !!selectedProperty.priceUSD)}</span>
                                 </div>
                                 <div className="text-right flex flex-col items-end">
                                    <span className="block text-xs text-text-muted uppercase font-bold tracking-widest mb-1">Discounted Price</span>
                                    <motion.span 
                                       key={calcMonths}
                                       initial={{ scale: 1 }}
                                       animate={{ scale: [1, 1.1, 1] }} 
                                       transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                       className="text-2xl text-text-primary font-bold inline-block origin-right"
                                    >
                                       {calcMonths === 0 ? 'N/A' : formatMoney(calcState.monthlyGHS, !!selectedProperty.priceUSD)}
                                    </motion.span>
                                 </div>
                              </div>
                              
                              <button onClick={() => setShowToS(true)} className="w-full py-5 bg-[#0D1B2A] text-white font-head uppercase tracking-widest rounded-xl hover:bg-black transition-all shadow-[0_15px_30px_rgba(13,27,42,0.2)] active:scale-95 text-xs font-black">
                                 Secure with Escrow 
                              </button>
                           </div>
                        );
                     })()}
                     <p className="text-center text-[10px] text-text-secondary mt-4 font-bold uppercase tracking-widest flex items-center justify-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-[#10B981]"></span>
                        Powered by Syntry Vault Escrow
                     </p>
                     </div>
                  </div>
               </div>
            </motion.div>
         )}
      </AnimatePresence>

      {/* Sovereign Guarantee Terms Modal (Production Sweep) */}
      <AnimatePresence>
         {showToS && (
            <motion.div 
               initial={{ opacity: 0 }} 
               animate={{ opacity: 1 }} 
               exit={{ opacity: 0 }}
               className="fixed inset-0 z-[400] flex items-center justify-center p-6 bg-[#0B141E]/80 backdrop-blur-md"
            >
               <motion.div 
                  initial={{ scale: 0.9, y: 20 }}
                  animate={{ scale: 1, y: 0 }}
                  className="bg-[#0D1B2A] rounded-[48px] p-8 md:p-16 max-w-xl w-full shadow-[0_50px_100px_rgba(0,0,0,0.8)] border border-white/10 relative overflow-hidden"
               >
                  <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#D4AF37] via-[#2DD4BF] to-[#D4AF37]"></div>
                  
                  <div className="text-center mb-10">
                     <span className="text-5xl mx-auto block mb-6">🛡️</span>
                     <h2 className="text-4xl font-head font-black text-white tracking-tighter leading-none mb-4 uppercase">The Sovereign Guarantee</h2>
                     <p className="text-[#94A3B8] font-body text-sm px-4">Before entering the vault, you must accept our foundational security protocols.</p>
                  </div>

                  <div className="space-y-4 mb-10">
                     {[
                        { step: "1. The Vault Lock", desc: "Your capital is held by independent Escrow Nodes, never touched by developers until legal milestones are cryptographically cleared." },
                        { step: "2. 100% Refund Clause", desc: "If the property fails the secondary Ministerial physical audit prior to Indenture generation, 100% of your funds are returned." },
                        { step: "3. Digital Custody", desc: "Your title deeds and site plans are securely vaulted and bound exclusively to your verified Identity (KYC Node)." }
                     ].map((item, idx) => (
                        <div key={idx} className="flex gap-4 items-start bg-[#162A3E] p-5 rounded-[24px] border border-white/5 hover:border-[#D4AF37]/20 transition-all group">
                           <span className="w-6 h-6 rounded-full bg-[#D4AF37] text-[#0D1B2A] flex items-center justify-center text-[10px] font-black shrink-0 mt-0.5">✓</span>
                           <div>
                              <h4 className="text-white font-black text-xs uppercase tracking-widest mb-1">{item.step}</h4>
                              <p className="text-[11px] text-[#94A3B8] font-body leading-relaxed">{item.desc}</p>
                           </div>
                        </div>
                     ))}
                  </div>

                     <div className="bg-[#162A3E]/60 p-6 rounded-[24px] border border-white/10 mb-10">
                        <label className="flex items-center gap-4 cursor-pointer group">
                           <div onClick={() => setTosAccepted(!tosAccepted)} className={`w-14 h-8 rounded-full transition-all relative shrink-0 ${tosAccepted ? 'bg-[#10B981] shadow-[0_0_15px_#10B981]' : 'bg-[#0D1B2A] border border-white/20'}`}>
                              <div className={`absolute top-1 w-6 h-6 rounded-full transition-all bg-white ${tosAccepted ? 'left-7' : 'left-1'}`}></div>
                           </div>
                           <span className="text-white text-xs font-bold font-body leading-relaxed group-hover:text-[#D4AF37] transition-colors">
                              I have reviewed the <a href="/legal/accord" target="_blank" className="text-[#D4AF37] underline">Sovereign Accord</a> and agree to the Vault Security Protocols (Handshake Protocol).
                           </span>
                        </label>
                     </div>

                     <div className="flex flex-col sm:flex-row gap-4">
                        <button onClick={() => setShowToS(false)} className="w-full py-4 text-[#94A3B8] font-black uppercase text-xs tracking-widest hover:text-white transition-colors">Decline Accord</button>
                        <button 
                           disabled={!tosAccepted}
                           onClick={() => { setShowToS(false); handleCheckout(); }} 
                           className={`w-full py-5 font-head font-black uppercase tracking-[0.2em] text-[10px] rounded-[16px] transition-all ${tosAccepted ? 'bg-[#D4AF37] text-[#0D1B2A] shadow-[0_20px_40px_rgba(212,175,55,0.2)] hover:scale-105 active:scale-95' : 'bg-gray-800 text-gray-500 cursor-not-allowed opacity-50'}`}
                        >
                           Commit Signature & Reserve →
                        </button>
                     </div>
                  </motion.div>
               </motion.div>
            )}
         </AnimatePresence>

         {/* Biometric Scan Modal */}
         <AnimatePresence>
            {showBiometricScan && (
               <motion.div 
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="fixed inset-0 z-[500] flex items-center justify-center p-6 bg-[#0D1B2A]/80 backdrop-blur-3xl"
               >
                  <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 pointer-events-none"></div>
                  
                  {biometricStatus === 'scan' ? (
                     <div className="text-center max-w-sm relative z-10 w-full animate-[pulse_3s_ease-in-out_infinite]">
                        <div className="w-full aspect-square border-4 border-[#D4AF37] rounded-full flex flex-col items-center justify-center relative mb-8 overflow-hidden shadow-[0_0_100px_rgba(212,175,55,0.2)] mx-auto">
                           <div className="absolute inset-0 bg-[#D4AF37]/5"></div>
                           <div className="w-1/2 h-[2px] bg-[#D4AF37] shadow-[0_0_15px_#D4AF37] absolute animate-[scan_2s_linear_infinite]"></div>
                           <span className="text-6xl filter drop-shadow-[0_0_20px_rgba(212,175,55,0.8)] opacity-50">👤</span>
                        </div>
                        <h3 className="text-2xl font-head font-black text-white uppercase tracking-widest mb-2">Biometric Scan Required</h3>
                        <p className="text-[#D4AF37] font-mono text-sm uppercase tracking-widest mb-8">High-Value Transaction (GH₵20k+)</p>
                        
                        <div className="space-y-4">
                           <p className="text-[#94A3B8] text-xs font-body max-w-xs mx-auto mb-8">Please align your face within the frame to authorize this transfer. Connecting to local FaceID API.</p>
                           <button onClick={handleBiometricSuccess} className="w-full py-5 bg-[#D4AF37] text-[#0D1B2A] border-none font-head font-black uppercase tracking-[0.2em] text-[10px] rounded-full hover:bg-white transition-colors shadow-[0_15px_30px_rgba(212,175,55,0.3)]">
                              Initiate Hardware Handshake
                           </button>
                           <button onClick={() => setShowBiometricScan(false)} className="text-white/50 hover:text-white text-xs uppercase font-bold tracking-widest mt-4 inline-block">Cancel Transaction</button>
                        </div>
                     </div>
                  ) : (
                     <motion.div 
                        initial={{ scale: 0.8, opacity: 0 }} 
                        animate={{ scale: 1, opacity: 1 }} 
                        className="text-center max-w-sm relative z-10 w-full"
                     >
                        <div className="w-48 h-48 border-4 border-[#2DD4BF] bg-[#162A3E]/80 rounded-full flex flex-col items-center justify-center relative mb-8 shadow-[0_0_150px_rgba(45,212,191,0.4)] mx-auto">
                           <motion.div 
                              initial={{ scale: 0 }} 
                              animate={{ scale: [0, 1.2, 1] }} 
                              transition={{ duration: 0.5, type: 'spring' }} 
                              className="absolute inset-0 bg-[#2DD4BF]/20 rounded-full"
                           ></motion.div>
                           <span className="text-7xl filter drop-shadow-[0_0_20px_rgba(45,212,191,1)] relative z-10">🛡️</span>
                        </div>
                        <motion.h3 
                           initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                           className="text-2xl font-head font-black text-white uppercase tracking-widest mb-2"
                        >
                           Biometric Handshake Complete
                        </motion.h3>
                        <motion.p 
                           initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
                           className="text-[#2DD4BF] font-mono text-sm uppercase tracking-widest mb-8 border-l-2 border-[#2DD4BF] inline-block px-3"
                        >
                           Asset Reserved in Vault
                        </motion.p>
                     </motion.div>
                  )}
               </motion.div>
            )}
         </AnimatePresence>

      {/* Vault Dashboard Gateway */}
      <AnimatePresence>
         {showPortal && (
            <motion.div 
               initial={{ opacity: 0 }} 
               animate={{ opacity: 1 }} 
               exit={{ opacity: 0 }} 
               className={`fixed inset-0 z-[300] overflow-y-auto ${dashMode === 'dark' ? 'bg-[#0B141E]' : 'bg-[#F8F9FA]'}`}
            >
               {/* Top Bar inside Portal */}
               <div className={`sticky top-0 w-full px-6 py-4 flex justify-between items-center z-50 border-b bg-[#0D1B2A]/90 backdrop-blur-xl border-white/5`}>
                  <div className="flex items-center gap-3">
                     <div className="w-8 h-8 flex items-center justify-center bg-[#162A3E] text-white rounded-xl border border-white/10 font-black shadow-md">S</div>
                     <span className={`font-head font-black tracking-widest uppercase text-xs text-white`}>Sovereign Account</span>
                  </div>
                  
                  {isLoggedIn && (
                     <div className="hidden md:flex items-center gap-2 bg-[#162A3E]/80 border border-[#D4AF37]/20 px-4 py-1.5 rounded-full text-[9px] uppercase tracking-widest font-black text-white shadow-sm">
                        🛡️ Security Level: <span className="text-[#2DD4BF]">Sovereign High-Trust</span>
                     </div>
                  )}

                  <div className="flex items-center gap-4 relative">
                     {/* Wealth Signal Notification Bell */}
                     {isLoggedIn && authStep === 'dashboard' && (
                        <div className="relative">
                           <button onClick={() => setShowNotifications(!showNotifications)} className="text-xl text-white/50 hover:text-white transition-colors relative">
                              🔔
                              <span className="absolute top-0 right-0 w-2 h-2 bg-[#D4AF37] rounded-full shadow-[0_0_10px_#D4AF37] z-10"></span>
                           </button>
                           
                           {/* Wealth Signal Dropdown */}
                           <AnimatePresence>
                              {showNotifications && (
                                 <motion.div 
                                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                    className="absolute top-12 right-0 w-80 bg-[#162A3E]/95 backdrop-blur-3xl border border-white/10 rounded-2xl shadow-[0_20px_40px_rgba(0,0,0,0.5)] overflow-hidden z-[500]"
                                 >
                                    <div className="p-4 border-b border-white/10 flex justify-between items-center bg-[#0D1B2A]/50">
                                       <h4 className="text-white font-head font-black uppercase text-xs tracking-widest">Notification Center</h4>
                                       <span className="text-[#94A3B8] text-[9px] uppercase font-black px-2 py-0.5 rounded bg-white/5">2 New</span>
                                    </div>
                                    <div className="max-h-96 overflow-y-auto">
                                       {/* Wealth Alert: Market Appreciation */}
                                       <button onClick={() => setActiveWealthSignal(true)} className="w-full text-left p-4 hover:bg-[#2DD4BF]/5 transition-colors border-b border-white/5 flex gap-4 group">
                                          <span className="w-10 h-10 rounded-full bg-[#2DD4BF]/10 flex items-center justify-center text-lg shrink-0 group-hover:scale-110 transition-transform">📈</span>
                                          <div>
                                             <h5 className="text-white font-bold text-sm leading-tight flex items-center gap-2">Appreciation Alert <span className="w-1.5 h-1.5 rounded-full bg-[#2DD4BF] animate-pulse"></span></h5>
                                             <p className="text-[#94A3B8] text-xs font-body mt-1 border-l-2 border-[#2DD4BF] pl-2">Market value in Ashifla Node 08 increased by 4.2% based on new sovereign sales.</p>
                                             <span className="text-[#D4AF37] text-[9px] font-black uppercase tracking-widest mt-2 block">Trigger Wealth Growth Insight →</span>
                                          </div>
                                       </button>

                                       {/* Legal Milestone Alert */}
                                       <div className="w-full text-left p-4 hover:bg-white/5 transition-colors border-b border-white/5 flex gap-4">
                                          <span className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-lg shrink-0">⚖️</span>
                                          <div>
                                             <h5 className="text-white font-bold text-sm leading-tight">Milestone Reached</h5>
                                             <p className="text-[#94A3B8] text-xs font-body mt-1">Indenture status updated to 70% Mature securely by Node Authorities.</p>
                                             <button className="mt-3 px-4 py-1.5 bg-white/10 hover:bg-white text-white hover:text-black font-black uppercase tracking-widest text-[9px] rounded-full transition-colors border border-white/20">View Certificate</button>
                                          </div>
                                       </div>

                                       {/* Security Log Alert */}
                                       <div className="w-full text-left p-4 hover:bg-white/5 transition-colors flex gap-4 opacity-70">
                                          <span className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-lg shrink-0">🛡️</span>
                                          <div>
                                             <h5 className="text-white font-bold text-sm leading-tight">Security Audit Complete</h5>
                                             <p className="text-[#94A3B8] text-xs font-body mt-1">Biometric handshake log synced securely to Command Center.</p>
                                          </div>
                                       </div>
                                    </div>
                                 </motion.div>
                              )}
                           </AnimatePresence>
                        </div>
                     )}

                     {isLoggedIn && authStep === 'dashboard' && (
                        <button onClick={() => setDashMode(prev => prev === 'light' ? 'dark' : 'light')} className={`px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest bg-[#162A3E] text-white hover:bg-white/10 transition-all shadow-md border border-white/10 hidden`}>
                           {dashMode === 'light' ? 'Pro Mode' : 'Light Mode'}
                        </button>
                     )}
                     <button onClick={() => setShowPortal(false)} className={`text-2xl hover:scale-110 transition-transform text-white/50 hover:text-white`}>&times;</button>
                  </div>
               </div>

               <div className={`${!isLoggedIn ? 'fixed inset-0' : 'max-w-5xl mx-auto px-6 py-12'}`}>
                   {!isLoggedIn && authStep === 'login' ? (
                        /* Syntry Guardian Login Modal */
                        <div className="w-full h-full flex flex-col items-center justify-center p-6 md:p-12 bg-[#0D1B2A] animate-[fadeIn_0.5s_ease-out] relative">
                           {/* Subtle Grid Background */}
                           <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#FFFFFF 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>
                           
                           <div className="text-center w-full max-w-md space-y-10 relative z-10">
                              <div className="space-y-4">
                                 <h2 className="text-4xl md:text-5xl font-head font-black text-white tracking-tighter leading-tight mt-2">Syntry Guardian</h2>
                                 <p className="text-[#94A3B8] font-body text-base px-4">Institutional Authentication Protocol</p>
                              </div>
                              
                              <div className="space-y-4 text-left pt-6 max-w-sm mx-auto">
                                 <button className="w-full py-4 px-6 bg-white border border-white/10 rounded-[16px] flex items-center justify-center gap-3 text-black font-bold shadow-[0_4px_10px_rgba(0,0,0,0.1)] hover:-translate-y-1 transition-transform">
                                    <span className="text-xl"></span> Continue with Apple
                                 </button>
                                 <button className="w-full py-4 px-6 bg-white border border-white/10 rounded-[16px] flex items-center justify-center gap-3 text-black font-bold shadow-[0_4px_10px_rgba(0,0,0,0.1)] hover:-translate-y-1 transition-transform">
                                    <svg className="w-5 h-5" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
                                    Continue with Google
                                 </button>
                                 <div className="flex items-center gap-4 py-4">
                                    <div className="h-px bg-white/10 flex-1"></div>
                                    <span className="text-[10px] uppercase tracking-widest text-[#94A3B8] font-bold">Or</span>
                                    <div className="h-px bg-white/10 flex-1"></div>
                                 </div>
                                 <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-white ml-1">Phone Number or Email</label>
                                    <input type="text" value={waPhone} onChange={(e) => setWaPhone(e.target.value)} placeholder="+233 55 000 0000" className="w-full py-4 px-6 rounded-[16px] bg-[#162A3E] border border-white/10 text-sm font-bold text-white outline-none focus:border-[#2DD4BF] transition-all shadow-inner placeholder-white/20" />
                                 </div>
                                 <button onClick={handleSend2FA} disabled={isSending2FA || !waPhone} className="w-full py-4 mt-2 bg-[#D4AF37] text-[#0D1B2A] font-head font-black text-xs uppercase tracking-[0.2em] rounded-[24px] hover:bg-white active:scale-95 transition-all shadow-md shadow-[0_4px_10px_rgba(212,175,55,0.2)] disabled:opacity-50 flex justify-center items-center duration-300">
                                    {isSending2FA ? (
                                       <span className="w-5 h-5 border-2 border-[#0D1B2A]/20 border-t-[#0D1B2A] rounded-full animate-spin"></span>
                                    ) : (
                                       'Send Secure OTP'
                                    )}
                                 </button>
                              </div>
                           </div>
                        </div>
                   ) : !isLoggedIn && authStep === '2fa' ? (
                        /* Step 1.5: Guardian 2FA Verification */
                        <div className="w-full h-full flex flex-col items-center justify-center p-6 md:p-12 bg-[#0D1B2A] animate-[fadeIn_0.5s_ease-out] relative">
                           <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#FFFFFF 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>
                           
                           {isScanning ? (
                              <div className="text-center w-full max-w-md space-y-8 relative z-10 flex flex-col items-center">
                                 <div className="w-24 h-24 rounded-full border-4 border-[#2DD4BF]/20 border-t-[#2DD4BF] animate-spin mb-4 shadow-[0_0_30px_rgba(45,212,191,0.5)]"></div>
                                 <h2 className="text-3xl font-head font-black text-white tracking-widest uppercase">Scanning...</h2>
                                 <p className="text-[#2DD4BF] font-mono text-sm shadow-[0_0_10px_rgba(45,212,191,0.5)]">Authenticating Sovereign Ledger</p>
                              </div>
                           ) : (
                              <div className="text-center w-full max-w-md space-y-8 relative z-10">
                                 <div className="mx-auto w-20 h-20 bg-gradient-to-br from-[#162A3E] to-[#0D1B2A] rounded-[24px] flex items-center justify-center text-[#2DD4BF] border border-white/10 font-black text-3xl shadow-[0_20px_40px_rgba(45,212,191,0.1)] mb-4 transform hover:scale-105 transition-transform cursor-default">
                                    🛡️
                                 </div>
                                 <div className="space-y-4">
                                    <h2 className="text-3xl md:text-4xl font-head font-black text-white tracking-tighter leading-tight">Verify Protocol</h2>
                                    <p className="text-[#94A3B8] font-body text-sm px-4">6-digit access code sent to <span className="font-bold text-white">{waPhone || 'your device'}</span>.</p>
                                    {isLocked && <p className="text-red-500 text-xs font-bold uppercase mt-2">IP LOCKED. Security Alert Sent.</p>}
                                    {loginAttempts > 0 && !isLocked && <p className="text-[#D4AF37] text-xs font-bold uppercase mt-2">Failed Attempts: {loginAttempts}/3</p>}
                                 </div>
                                 <div className="pt-8">
                                    <div className="flex gap-2 sm:gap-3 justify-center mb-10">
                                       {twoFaCode.map((digit, i) => (
                                          <input 
                                             key={i}
                                             ref={codeRefs[i]}
                                             type="text" 
                                             maxLength="1"
                                             value={digit}
                                             disabled={isLocked}
                                             onChange={(e) => {
                                                const newCode = [...twoFaCode];
                                                newCode[i] = e.target.value;
                                                setTwoFaCode(newCode);
                                                if (e.target.value && i < 5) codeRefs[i+1].current.focus();
                                             }}
                                             onKeyDown={(e) => {
                                                if (e.key === 'Backspace' && !digit && i > 0) {
                                                   codeRefs[i-1].current.focus();
                                                }
                                             }}
                                             className="w-10 h-14 sm:w-12 sm:h-16 text-center text-2xl sm:text-3xl font-head font-black bg-[#162A3E] border border-white/10 rounded-xl focus:border-[#2DD4BF] focus:ring-4 focus:ring-[#2DD4BF]/10 transition-all text-white outline-none shadow-inner disabled:opacity-50" 
                                          />
                                       ))}
                                    </div>
                                    <button onClick={verify2FACode} disabled={isLocked || twoFaCode.join('').length < 6} className="w-full py-5 bg-[#2DD4BF] border border-[#2DD4BF] text-[#0D1B2A] font-head font-black text-xs uppercase tracking-[0.2em] rounded-[24px] hover:bg-white active:scale-95 transition-all shadow-[0_15px_30px_rgba(45,212,191,0.2)] duration-300 disabled:opacity-50 hover:-translate-y-1">
                                       Confirm Identity
                                    </button>
                                    <p className="text-center text-[10px] uppercase font-bold text-[#94A3B8] mt-8 tracking-widest cursor-pointer hover:text-[#2DD4BF] transition-colors inline-block pb-1 border-b border-dashed border-white/20">Resend Code in 0:30</p>
                                 </div>
                              </div>
                           )}
                        </div>
                   ) : authStep === 'onboarding' ? (
                     /* Step 2: Goal Alignment */
                     <div className="w-full h-full flex flex-col items-center justify-center p-6 md:p-12 bg-[#0D1B2A] animate-[fadeIn_0.5s_ease-out]">
                        <div className="max-w-5xl mx-auto text-center space-y-16 py-10">
                           <div className="space-y-4">
                              <h2 className="text-4xl md:text-[52px] font-head font-black text-white tracking-tighter leading-tight uppercase">Sovereign Goal Alignment</h2>
                              <p className="text-[#94A3B8] font-body text-lg max-w-xl mx-auto">Select your primary objective to configure the exchange AI.</p>
                           </div>
                           
                           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                              {[
                                 { id: 'A', title: 'Capital Growth', desc: 'Focus on fractional packets.', icon: '📈' },
                                 { id: 'B', title: 'Home Building', desc: 'Focus on full-plot acquisitions.', icon: '🏗️' },
                                 { id: 'C', title: 'Diaspora Mgmt', desc: 'Focus on secure legal custody.', icon: '🌍' }
                              ].map(goal => (
                                 <motion.button 
                                    key={goal.title}
                                    whileHover={{ y: -10, scale: 1.02 }} 
                                    whileTap={{ scale: 0.98 }} 
                                    onClick={() => { setAuthStep('dashboard'); }} 
                                    className="bg-[#162A3E] p-8 rounded-[32px] text-left border border-white/10 hover:border-[#D4AF37] shadow-[0_20px_40px_rgba(0,0,0,0.5)] hover:shadow-[0_40px_80px_rgba(212,175,55,0.1)] transition-all group relative overflow-hidden flex flex-col items-start h-full"
                                 >
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#D4AF37]/10 to-transparent rounded-bl-full pointer-events-none group-hover:scale-110 transition-transform"></div>
                                    <div className="flex justify-between w-full items-start mb-6">
                                       <span className="text-3xl bg-[#0D1B2A] w-16 h-16 rounded-[20px] flex items-center justify-center group-hover:bg-[#D4AF37]/20 transition-colors drop-shadow-md border border-white/5 group-hover:border-[#D4AF37]/30">{goal.icon}</span>
                                       <span className="w-8 h-8 rounded-full bg-[#D4AF37] text-[#0D1B2A] font-black text-xs flex items-center justify-center shadow-md">{goal.id}</span>
                                    </div>
                                    <h3 className="text-2xl font-head font-black text-white mb-2">{goal.title}</h3>
                                    <p className="text-[#94A3B8] font-body text-sm leading-relaxed">{goal.desc}</p>
                                 </motion.button>
                              ))}
                           </div>
                        </div>
                     </div>
                  ) : (
                     /* Dashboard View (Step 3: Sovereign Reveal) */
                     <motion.div 
                        initial={{ filter: "blur(20px)", scale: 1.05, opacity: 0 }}
                        animate={{ filter: "blur(0px)", scale: 1, opacity: 1 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="space-y-8 pb-32"
                     >
                         {/* Dashboard Main View: Empty Vault vs Live Asset Monitor */}
                         {reservedPlots.length === 0 ? (
                            <div className="bg-[#0D1B2A] rounded-[24px] p-8 md:p-12 relative overflow-hidden shadow-[0_30px_60px_rgba(13,27,42,0.2)] md:border-2 border-[#D4AF37]/50 mt-4 md:mt-0 animate-[pulse_4s_ease-in-out_infinite] group">
                               <div className="absolute top-0 right-0 w-full h-full md:w-96 md:h-96 bg-[#D4AF37]/10 blur-[100px] pointer-events-none rounded-full group-hover:bg-[#D4AF37]/20 transition-all duration-700"></div>
                               <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 text-white">
                                  <div className="text-center md:text-left">
                                     <h3 className="text-2xl md:text-3xl font-head font-black mb-3 flex items-center justify-center md:justify-start gap-3">
                                        <span className="w-3 h-3 bg-[#D4AF37] rounded-full animate-[pulse_1.5s_ease-in-out_infinite] shadow-[0_0_15px_#D4AF37]"></span>
                                        Your Vault is Empty.
                                     </h3>
                                     <p className="text-[#8CA0B4] text-sm md:text-base font-body max-w-xl">Secure your first residential plot or fractional packet to become a Certified Sovereign.</p>
                                  </div>
                                  <button onClick={() => setShowPortal(false)} className="px-8 py-5 bg-[#D4AF37] border-2 border-[#D4AF37] text-[#0D1B2A] font-head font-black uppercase tracking-widest text-xs rounded-[16px] hover:bg-transparent hover:text-[#D4AF37] transition-all shadow-[0_15px_30px_rgba(212,175,55,0.2)] active:scale-95 shrink-0 w-full md:w-auto">
                                     Browse Exchange
                                  </button>
                               </div>
                            </div>
                         ) : (
                            <div className="space-y-8 animate-[slideIn_0.6s_ease-out]">
                               {/* Live Asset Monitor */}
                               <div className="bg-[#0D1B2A] rounded-card border-2 border-[#D4AF37]/30 overflow-hidden relative shadow-[0_50px_100px_rgba(0,0,0,0.4)]">
                                  <div className="grid grid-cols-1 lg:grid-cols-2">
                                     {/* 3D Mini-Map Display */}
                                     <div className="h-64 lg:h-auto relative bg-black/40 border-r border-white/5 overflow-hidden">
                                        <SovereignMap initialLat={selectedProperty?.lat || 5.6037} initialLng={selectedProperty?.lng || -0.1870} zoom={16} />
                                        <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[#0D1B2A] to-transparent z-10"></div>
                                        <div className="absolute bottom-6 left-6 z-20">
                                           <div className="flex items-center gap-2 mb-1">
                                              <span className="relative flex h-2 w-2">
                                                 <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10B981] opacity-75"></span>
                                                 <span className="relative inline-flex rounded-full h-2 w-2 bg-[#10B981]"></span>
                                              </span>
                                              <span className="text-[10px] font-black text-[#10B981] uppercase tracking-widest">Live Node Sync 08</span>
                                           </div>
                                           <h3 className="text-2xl font-head font-black text-white uppercase">{selectedProperty?.name || "Active Asset"}</h3>
                                        </div>
                                     </div>

                                     {/* Maturity Gauge & Data */}
                                     <div className="p-8 md:p-12 space-y-10 bg-gradient-to-br from-[#162A3E] to-[#0D1B2A]">
                                        <div>
                                           <div className="flex justify-between items-end mb-4">
                                              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[#94A3B8]">Vault Maturity Status</label>
                                              <span className="text-sm font-black text-[#D4AF37] uppercase">70% Verified</span>
                                           </div>
                                           <div className="h-3 w-full bg-white/5 rounded-full overflow-hidden border border-white/10 p-[1px]">
                                              <div className="h-full bg-gradient-to-r from-[#2DD4BF] via-[#D4AF37] to-[#D4AF37] rounded-full shadow-[0_0_20px_#D4AF37]" style={{ width: '70%' }}></div>
                                           </div>
                                           <div className="flex justify-between mt-4 text-[9px] font-black uppercase tracking-widest text-[#94A3B8]">
                                              <span>Reservation</span>
                                              <span className="text-white">Site Plan (Pending)</span>
                                              <span>Indenture</span>
                                           </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-8 border-t border-white/5 pt-8">
                                           <div>
                                              <label className="text-[9px] font-black uppercase tracking-widest text-[#94A3B8] block mb-2">Statutory ID</label>
                                              <div className="text-sm font-mono text-white tracking-tighter">SYN-VLT-08-{reservedPlots[0]}</div>
                                           </div>
                                           <div className="text-right">
                                              <label className="text-[9px] font-black uppercase tracking-widest text-[#94A3B8] block mb-2">Next Inspection</label>
                                              <div className="text-sm font-head font-black text-[#D4AF37] uppercase">April 12, 2026</div>
                                           </div>
                                        </div>
                                     </div>
                                  </div>
                               </div>

                               {/* Fractional Inventory: The Silver Packet Deck */}
                               <div className="space-y-10 pt-16">
                                  <div className="flex justify-between items-end border-b border-white/10 pb-6">
                                     <div>
                                        <h4 className="text-white font-head font-black uppercase text-xl md:text-2xl tracking-tighter">Your Sovereign Equity</h4>
                                        <p className="text-[#8CA0B4] text-[10px] md:text-xs uppercase font-black tracking-widest mt-1">Fractional Packet Portfolio • Node 08 Authenticated</p>
                                     </div>
                                     <button className="text-[#2DD4BF] font-head font-black uppercase text-[10px] tracking-widest py-2 px-6 border-2 border-[#2DD4BF]/30 rounded-full hover:bg-[#2DD4BF] hover:text-[#0D1B2A] transition-all shadow-[0_0_15px_rgba(45,212,191,0.2)]">
                                        Trade Secondary →
                                     </button>
                                  </div>

                                  <div className="relative h-[550px] flex items-center justify-center md:justify-start">
                                     {/* Stacked Card Deck Effect */}
                                     {[
                                        { name: "Ashifla Sector 07", stake: 5, price: 1200 },
                                        { name: "Otatten North B2", stake: 2.5, price: 2100 },
                                        { name: "Legon Extension", stake: 10, price: 5500 }
                                     ].map((packet, idx) => (
                                        <motion.div 
                                           key={idx}
                                           initial={{ x: 50 * idx, y: 10 * idx, rotate: 2 * idx }}
                                           whileHover={{ y: -50, x: 50 * idx, rotate: 0, zIndex: 100 }}
                                           className="absolute"
                                           style={{ zIndex: 10 - idx }}
                                        >
                                           <SilverSovereignPacket 
                                              assetName={packet.name} 
                                              stake={packet.stake} 
                                              price={packet.price} 
                                              txHash={`0x${Math.random().toString(16).slice(2, 42)}`} 
                                           />
                                        </motion.div>
                                     ))}
                                     
                                     {/* Wealth Accumulation Hint */}
                                     <div className="absolute right-0 top-1/2 -translate-y-1/2 hidden lg:block text-right pointer-events-none opacity-40">
                                        <p className="text-5xl font-head font-black text-white leading-none">₵8,800</p>
                                        <p className="text-[10px] font-black uppercase tracking-widest text-[#2DD4BF] mt-2">Locked Portfolio Value</p>
                                     </div>
                                  </div>
                               </div>

                               {/* Referral Trigger Card */}
                               <div className="bg-gradient-to-r from-[#D4AF37] to-[#B68C1C] rounded-[32px] p-8 relative overflow-hidden group hover:scale-[1.01] transition-all shadow-[0_30px_60px_rgba(212,175,55,0.2)]">
                                  <div className="absolute right-0 top-0 h-full w-1/3 bg-white/10 skew-x-[-20deg] group-hover:translate-x-10 transition-transform"></div>
                                  <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-6">
                                     <div className="text-center md:text-left">
                                        <h4 className="text-[#0D1B2A] text-2xl font-head font-black tracking-tighter uppercase mb-2">Invite a Fellow Pioneer</h4>
                                        <p className="text-[#0D1B2A]/70 text-sm font-bold uppercase tracking-widest">Share the vault access and earn GH₵2,000 on their next acquisition.</p>
                                     </div>
                                     <button 
                                        onClick={() => {
                                           navigator.clipboard.writeText(`SYN-REF-08-${reservedPlots[0]}`);
                                           alert("Sovereign Referral Node Copied to Clipboard!");
                                        }}
                                        className="px-8 py-4 bg-[#0D1B2A] text-white font-head font-black uppercase tracking-[0.2em] text-[10px] rounded-full shadow-2xl hover:scale-105 active:scale-95 transition-all"
                                     >
                                        Copy Referral Node →
                                     </button>
                                  </div>
                               </div>

                               {/* Asset Successor Status (Dark Variant) */}
                               <div className="bg-[#162A3E] border border-white/10 p-8 rounded-card flex flex-col md:flex-row gap-8 items-center shadow-xl">
                                  <div className="text-4xl bg-[#0D1B2A] w-16 h-16 rounded-full flex items-center justify-center border border-white/5">📝</div>
                                  <div className="flex-1 text-center md:text-left">
                                     <h4 className="text-white font-head font-black uppercase text-sm tracking-widest mb-1">Successor Allocation Required</h4>
                                     <p className="text-xs text-[#94A3B8]">Legalize your legacy by assigning a statutory beneficiary to this asset.</p>
                                  </div>
                                  <div className="flex gap-4 w-full md:w-auto">
                                     <input type="text" placeholder="Successor Name" className="bg-[#0D1B2A] border border-white/10 text-white text-xs px-6 py-4 rounded-full outline-none focus:border-[#D4AF37] w-full md:w-64" />
                                     <button className="bg-white/10 hover:bg-white/20 text-white px-6 py-4 rounded-full text-[10px] font-black uppercase tracking-widest transition-all">Save</button>
                                  </div>
                               </div>
                            </div>
                         )}

                        {/* KYC Alert */}
                        <div className={`px-6 py-4 rounded-card flex flex-col md:flex-row items-center justify-between border shadow-sm ${dashMode === 'dark' ? 'bg-bg-base border-accent-teal/20 text-text-primary' : 'bg-bg-base border-transparent text-text-primary'}`}>
                           <div className="flex items-center gap-4 mb-4 md:mb-0">
                              <span className="bg-accent-gold text-text-primary w-8 h-8 rounded-full flex items-center justify-center font-bold">!</span>
                              <span className="font-body text-sm font-bold tracking-wide">Verify your identity to unlock Secondary Market Trading.</span>
                           </div>
                           <button className="px-5 py-3 w-full md:w-auto bg-bg-surface/10 hover:bg-bg-surface/20 rounded-btn text-xs font-bold uppercase tracking-widest transition-colors">Start KYC</button>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                           {/* Left Column (Equity + Installments) */}
                           <div className="lg:col-span-2 space-y-8">
                              {/* Equity Card */}
                              <div className={`p-8 rounded-card card-glow border relative overflow-hidden ${dashMode === 'dark' ? 'bg-bg-surface border-border-subtle ' : 'bg-bg-base border-white shadow-[15px_15px_30px_rgba(13,27,42,0.05),-15px_-15px_30px_rgba(255,255,255,1)]'}`}>
                                 <div className="flex justify-between items-start mb-8">
                                    <div>
                                       <p className="text-[10px] uppercase tracking-widest font-bold text-text-muted mb-2">Total Wealth Equity</p>
                                       <h2 className={`text-4xl md:text-5xl font-head font-black ${dashMode === 'dark' ? 'text-text-primary' : 'text-text-primary'}`}>GH₵254,000</h2>
                                       <p className="text-sm font-mono text-accent-teal mt-2">~$16,387 USD</p>
                                    </div>
                                    <div className="bg-accent-teal/10 px-3 py-1.5 rounded-full border border-[#10B981]/30 flex items-center gap-2">
                                       <span className="w-1.5 h-1.5 bg-accent-teal rounded-full animate-pulse shadow-[0_0_5px_#10B981]"></span>
                                       <span className="text-accent-teal text-[10px] uppercase font-bold tracking-widest">+2.4% (24H)</span>
                                    </div>
                                 </div>
                                 {/* 24-Hour Pulse Graph */}
                                 <div className="w-full h-32 relative mt-4">
                                    <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 100 40">
                                       <defs>
                                          <linearGradient id="equityPulse" x1="0%" y1="0%" x2="0%" y2="100%">
                                             <stop offset="0%" stopColor="#2DD4BF" stopOpacity="0.4" />
                                             <stop offset="100%" stopColor="#2DD4BF" stopOpacity="0" />
                                          </linearGradient>
                                       </defs>
                                       {activeWealthSignal ? (
                                          <>
                                             <path d="M 0 35 L 20 30 L 40 32 L 50 25 L 60 20 L 75 12 L 85 8 L 100 2 L 100 40 L 0 40 Z" fill="url(#equityPulse)" />
                                             <path d="M 0 35 L 20 30 L 40 32 L 50 25 L 60 20 L 75 12 L 85 8 L 100 2" fill="none" stroke="#2DD4BF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="animate-[dash_2s_ease-out_forwards]" strokeDasharray="200" strokeDashoffset="0" />
                                             <circle cx="100" cy="2" r="4" fill="#2DD4BF" className="animate-pulse shadow-[0_0_20px_#2DD4BF]" />
                                          </>
                                       ) : (
                                          <>
                                             <path d="M 0 35 L 20 30 L 40 32 L 60 20 L 80 15 L 100 5 L 100 40 L 0 40 Z" fill="url(#equityPulse)" />
                                             <path d="M 0 35 L 20 30 L 40 32 L 60 20 L 80 15 L 100 5" fill="none" stroke="#2DD4BF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                                             <circle cx="100" cy="5" r="3" fill="#2DD4BF" className="animate-pulse shadow-[0_0_15px_#2DD4BF]" />
                                          </>
                                       )}
                                    </svg>
                                 </div>
                              </div>

                              {/* Installment Center */}
                              <div className={`p-8 rounded-card card-glow border flex flex-col md:flex-row justify-between items-center gap-6 ${dashMode === 'dark' ? 'bg-bg-surface border-border-subtle ' : 'bg-bg-base border-white shadow-[15px_15px_30px_rgba(13,27,42,0.05),-15px_-15px_30px_rgba(255,255,255,1)]'}`}>
                                 <div className="flex-1 w-full">
                                    <p className="text-[10px] uppercase tracking-widest font-bold text-text-muted mb-2">Installment Progress (Otatten B3)</p>
                                    <h3 className={`text-2xl font-black mb-4 ${dashMode === 'dark' ? 'text-text-primary' : 'text-text-primary'}`}>45% Paid Off</h3>
                                    <div className="h-3 w-full bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden shadow-inner">
                                       <div className="h-full bg-gradient-to-r from-[#2DD4BF] to-[#D4AF37] shadow-[0_0_10px_#D4AF37]" style={{ width: '45%' }}></div>
                                    </div>
                                 </div>
                                 <button className="w-full md:w-auto py-4 px-8 bg-gradient-to-br from-[#0D1B2A] to-[#1a365d] border border-accent-gold text-text-primary font-heavy uppercase tracking-widest rounded-[20px] transition-all active:scale-95 shadow-[0_10px_20px_rgba(212,175,55,0.25)] text-xs font-black shrink-0 hover:bg-accent-gold hover:text-text-primary">
                                    Boost Payment
                                 </button>
                              </div>
                           </div>

                           {/* Right Column (Deeds + Scout Hub) */}
                           <div className="space-y-8">
                              {/* Active Deeds Stack */}
                              <div className={`p-8 rounded-card card-glow border relative ${dashMode === 'dark' ? 'bg-bg-surface border-border-subtle ' : 'bg-bg-base border-white shadow-[15px_15px_30px_rgba(13,27,42,0.05),-15px_-15px_30px_rgba(255,255,255,1)]'}`}>
                                 <p className="text-[10px] uppercase tracking-widest font-bold text-text-muted mb-6">Active Site Plans</p>
                                 
                                 <div className="relative h-48 cursor-pointer group hover:-translate-y-2 transition-transform">
                                    <div className="absolute top-4 left-4 w-full h-full bg-gray-300 dark:bg-gray-700 rounded-[20px] rotate-6 opacity-40"></div>
                                    <div className="absolute top-2 left-2 w-full h-full bg-gray-200 dark:bg-gray-600 rounded-[20px] rotate-3 opacity-70"></div>
                                    <div className="absolute top-0 left-0 w-full h-full rounded-[20px] overflow-hidden shadow-xl border-4 border-white dark:border-border-subtle">
                                       <img src="https://images.unsplash.com/photo-1524813686514-a57563d77965?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Map" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                                       <div className="absolute inset-0 bg-blue-900/30 mix-blend-multiply"></div>
                                       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-bg-surface/80 backdrop-blur-xl border-b border-border-subtle px-3 py-1.5 rounded-full text-[10px] font-bold text-text-primary uppercase shadow-lg border border-white">Expand Map</div>
                                    </div>
                                 </div>
                              </div>

                              {/* Referral Hub Container */}
                              <div className={`p-8 rounded-card card-glow border text-center ${dashMode === 'dark' ? 'bg-gradient-to-br from-[#152336] to-[#0A1119] border-border-subtle shadow-[10px_10px_30px_rgba(0,0,0,0.4)]' : 'bg-gradient-to-br from-[#FDFDFD] to-[#F8F9FA] border-white shadow-[15px_15px_30px_rgba(13,27,42,0.05),-15px_-15px_30px_rgba(255,255,255,1)]'}`}>
                                 <div className="w-12 h-12 rounded-full bg-accent-gold/10 flex items-center justify-center mx-auto mb-4 border border-accent-gold/30">
                                    <span className="text-xl">🤝</span>
                                 </div>
                                 <h3 className={`text-xl font-black mb-1 ${dashMode === 'dark' ? 'text-text-primary' : 'text-text-primary'}`}>Scout Hub</h3>
                                 <p className="font-mono text-accent-teal text-xs border-l-2 border-accent-teal pl-3 capitalize mb-6">Silver Rank #41</p>
                                 
                                 <div className={`p-3 rounded-btn mb-6 font-mono text-[11px] truncate select-all ${dashMode === 'dark' ? 'bg-black/40 text-gray-300 border border-border-subtle' : 'bg-gray-100 text-gray-600 border border-gray-200 shadow-inner'}`}>
                                    syntry.co/ref/SILVER_41_RX
                                 </div>
                                 
                                 <div className="text-left space-y-3">
                                    <p className="text-[8px] uppercase tracking-widest font-bold text-text-secondary border-b border-gray-200 dark:border-border-subtle pb-2">Leaderboard</p>
                                    <div className="flex justify-between items-center text-xs">
                                       <span className={`font-bold ${dashMode === 'dark' ? 'text-text-primary' : 'text-text-primary'}`}>1. Kwame M. <span className="text-accent-gold">👑</span></span>
                                       <span className="text-text-muted font-mono">14 Sales</span>
                                    </div>
                                    <div className="flex justify-between items-center text-xs">
                                       <span className={`font-bold ${dashMode === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>2. Sarah T.</span>
                                       <span className="text-text-muted font-mono">11 Sales</span>
                                    </div>
                                 </div>
                              </div>
                           </div>
                        </div>

                        {/* Security Command Center */}
                        <div id="security-command-center" className={`rounded-card border-2 border-[#D4AF37]/30 overflow-hidden relative shadow-[0_50px_100px_rgba(0,0,0,0.4)] mt-12 p-8 md:p-12 transition-all ${isLockedDown ? 'bg-red-950/20 border-red-500/50 grayscale' : 'bg-[#0D1B2A]'}`}>
                           {isLockedDown && <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/diagmonds-light.png')] opacity-10 pointer-events-none"></div>}
                           
                           <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6 relative z-10">
                              <div>
                                 <h3 className="text-3xl font-head font-black text-white uppercase tracking-tighter">Security Command Center</h3>
                                 <p className="text-[#8CA0B4] text-sm font-body mt-1">Manage active sessions, biometric safeguards, and unified vault defense.</p>
                              </div>
                              <button 
                                 onClick={() => { setIsLockedDown(!isLockedDown); if(!isLockedDown) alert("Emergency Protocol Active. All outbound transactions suspended pending Video KYC."); }} 
                                 className={`px-8 py-5 font-head font-black uppercase tracking-widest text-[10px] rounded-[16px] transition-all flex items-center gap-3 active:scale-95 shadow-[inset_0_0_20px_rgba(255,0,0,0.2)] ${isLockedDown ? 'bg-red-500/10 text-red-500 border border-red-500' : 'bg-[#D4AF37]/10 hover:bg-[#D4AF37]/20 border border-[#D4AF37] text-[#D4AF37]'}`}
                              >
                                 <span className={`w-2.5 h-2.5 rounded-full ${isLockedDown ? 'bg-red-500 shadow-[0_0_15px_red]' : 'bg-red-500 shadow-[0_0_10px_red] animate-pulse'}`}></span>
                                 {isLockedDown ? 'Unlock Vault' : 'Emergency Vault Lock'}
                              </button>
                           </div>
                           
                           <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 relative z-10 w-full overflow-hidden">
                              {/* Left Column: Security Status */}
                              <div className="flex flex-col items-center justify-center p-8 bg-[#162A3E]/50 rounded-[32px] border border-white/5 relative shadow-inner">
                                 <div className="text-center space-y-2 mb-8 relative z-10 w-full">
                                    <h4 className="text-white font-black text-sm uppercase tracking-widest border-b border-white/10 pb-4">Defense Protocols</h4>
                                 </div>
                                 <div className="relative w-48 h-48 flex items-center justify-center mb-10">
                                    <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
                                       <path className="text-white/5" strokeWidth="3" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                                       <path className={`${isLockedDown ? 'text-red-500' : 'text-[#2DD4BF]'}`} strokeWidth="3" strokeLinecap="round" strokeDasharray="100, 100" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                                    </svg>
                                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                                       <span className={`text-3xl font-head font-black ${isLockedDown ? 'text-red-500' : 'text-[#2DD4BF]'}`}>{isLockedDown ? 'LOCKED' : '100%'}</span>
                                       <span className="text-[9px] uppercase font-black text-[#94A3B8] tracking-widest mt-1">{isLockedDown ? 'Manual Ovrd.' : 'Protected'}</span>
                                    </div>
                                 </div>
                                 
                                 <div className="w-full space-y-4">
                                    <div className="flex items-center justify-between bg-[#0D1B2A] px-6 py-4 rounded-2xl border border-white/10 shadow-md">
                                       <div className="flex items-center gap-3">
                                          <span className="text-[#D4AF37] text-lg">🛡️</span>
                                          <div className="flex flex-col">
                                             <span className="text-white text-xs font-bold font-body">Biometric Scan Mandatory</span>
                                             <span className="text-[#94A3B8] text-[9px] uppercase font-black tracking-widest">Transfers &gt; GH₵20,000</span>
                                          </div>
                                       </div>
                                       <div className="w-12 h-6 bg-[#2DD4BF] rounded-full relative shadow-[0_0_15px_rgba(45,212,191,0.3)] cursor-not-allowed">
                                          <div className="w-5 h-5 bg-[#0D1B2A] rounded-full absolute right-0.5 top-0.5 shadow-sm border border-[#2DD4BF]/50"></div>
                                       </div>
                                    </div>
                                    <p className="text-[#8CA0B4] text-center text-[10px] uppercase font-bold tracking-widest mt-4 opacity-70 border-t border-white/5 pt-4">Rule strictly enforced globally</p>
                                 </div>
                              </div>

                              {/* Right Column: Live Access Log */}
                              <div className="space-y-4 max-w-full">
                                 <h4 className="text-white font-black text-sm uppercase tracking-widest border-b border-white/10 pb-4 mb-6">Live Access Log</h4>
                                 {[
                                    { event: "Login Success", loc: "Accra, GH", dev: "iPhone 15 Pro", time: "2 mins ago" },
                                    { event: "Security Profile Update", loc: "Accra, GH", dev: "Mac OS", time: "4 hrs ago" },
                                    { event: "Vault Ledger Sync", loc: "System Node 08", dev: "Automated", time: "12 hrs ago" },
                                    { event: "Withdrawal Override", loc: "London, UK", dev: "API Proxy", time: "24 hrs ago", failed: true }
                                 ].map((log, i) => (
                                    <div key={i} className={`flex justify-between items-center bg-[#162A3E]/40 p-5 lg:p-6 rounded-2xl border ${log.failed ? 'border-red-500/30' : 'border-white/5'} hover:bg-[#162A3E]/80 transition-colors gap-4`}>
                                       <div className="space-y-1.5 flex-1 w-0">
                                          <div className="flex items-center gap-3 truncate">
                                             {log.failed ? (
                                                <span className="w-2.5 h-2.5 shrink-0 rounded-full bg-red-500 shadow-[0_0_8px_#EF4444]"></span>
                                             ) : (
                                                <span className="w-2.5 h-2.5 shrink-0 rounded-full bg-[#2DD4BF] shadow-[0_0_8px_#2DD4BF] animate-pulse"></span>
                                             )}
                                             <span className="text-white font-bold text-sm drop-shadow-md truncate">{log.event}</span>
                                          </div>
                                          <div className="text-[#94A3B8] text-[11px] font-mono ml-5 md:ml-6 truncate opacity-80">
                                             {log.loc} • {log.dev}
                                          </div>
                                       </div>
                                       <div className="text-right shrink-0">
                                          <span className="text-[#8CA0B4] text-[9px] uppercase font-black tracking-widest block mb-2">{log.time}</span>
                                          {log.failed ? (
                                             <span className="text-red-500 text-[9px] font-black uppercase tracking-widest px-2.5 py-1 bg-red-500/10 rounded border border-red-500/20">Blocked</span>
                                          ) : (
                                             <span className="text-[#2DD4BF] text-[9px] font-black uppercase tracking-widest px-2.5 py-1 bg-[#2DD4BF]/10 rounded border border-[#2DD4BF]/20">Secure</span>
                                          )}
                                       </div>
                                    </div>
                                 ))}
                              </div>
                           </div>
                        </div>
                        {/* Syntry Advisor Sub Hub added gracefully in dashboard or via absolute positioning later */}
                     </motion.div>
                  )}
               </div>
               
               {/* Syntry Advisor Floating Support Bubble */}
               <motion.div 
                  initial={{ y: 50, opacity: 0 }} 
                  animate={{ y: 0, opacity: 1 }} 
                  transition={{ delay: 1, duration: 0.6 }} 
                  className="fixed bottom-6 right-6 z-[400] flex flex-col items-end gap-3 pointer-events-none"
               >
                  <div className="bg-white px-5 py-4 rounded-tl-[24px] rounded-tr-[24px] rounded-bl-[24px] shadow-[0_20px_40px_rgba(13,27,42,0.15)] border-2 border-[#E2E8F0] pointer-events-auto cursor-pointer hover:shadow-[0_25px_50px_rgba(13,27,42,0.2)] transition-shadow">
                     <p className="text-[#0D1B2A] font-body text-xs font-bold leading-snug">Hello! I'm your Syntry Advisor. 👋<br/><span className="text-gray-500 font-normal">Need help with your first verification?</span></p>
                  </div>
                  <button className="w-14 h-14 bg-[#0D1B2A] rounded-full text-white flex items-center justify-center text-xl shadow-[0_15px_30px_rgba(13,27,42,0.3)] hover:scale-105 transition-transform pointer-events-auto border-2 border-[#D4AF37]">
                     💬
                  </button>
               </motion.div>
            </motion.div>
         )}
      </AnimatePresence>

      {/* 4K Drone View Modal */}
      <AnimatePresence>
         {showDroneView && (
            <motion.div 
               initial={{ opacity: 0 }} 
               animate={{ opacity: 1 }} 
               exit={{ opacity: 0 }}
               className="fixed inset-0 z-[2000] flex flex-col items-center justify-center bg-black/95 backdrop-blur-3xl"
            >
               {/* Drone Modal Header */}
               <div className="absolute top-6 left-6 right-6 flex justify-between items-center z-50">
                  <div className="flex items-center gap-4 bg-[#0D1B2A]/80 backdrop-blur-md px-6 py-3 rounded-full border border-white/10">
                     <span className="text-[#D4AF37] text-xl">🛰️</span>
                     <div>
                        <span className="text-white font-black text-xs uppercase tracking-widest block">{selectedProperty?.name} — 4K Orbit</span>
                        <div className="flex items-center gap-2 mt-0.5">
                           <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse"></span>
                           <span className="text-[#94A3B8] text-[9px] font-mono tracking-widest">LIVE GROUND TRUTH STREAM</span>
                        </div>
                     </div>
                  </div>
                  <button onClick={() => setShowDroneView(false)} className="w-12 h-12 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-white hover:text-black transition-colors text-2xl font-light">×</button>
               </div>
               
               {/* 4K Video Player Container */}
               <div className="w-full max-w-7xl aspect-video bg-[#0D1B2A] rounded-[24px] overflow-hidden shadow-[0_0_100px_rgba(212,175,55,0.15)] border border-white/10 relative">
                  {/* Note: In production, load via MUX/AWS CDN. Using a reliable 4k sample for demonstration. */}
                  <video 
                     autoPlay 
                     loop 
                     controls 
                     playsInline
                     className="w-full h-full object-cover"
                     src="https://a0.muscache.com/v/9b/37/9b37807c-93bf-51b6-ba09-ab9910d65ff7/9b37807c93bf51b6ba09ab9910d65ff7_4000k_1.mp4" 
                  />
                  
                  {/* Telemetry Overlay */}
                  <div className="absolute bottom-6 left-6 flex gap-4 pointer-events-none">
                     <div className="bg-black/60 backdrop-blur-md px-4 py-2 rounded-lg border border-white/10 font-mono text-[10px] text-[#2DD4BF]">
                        ALT: 120M <br/> SPD: 14M/S
                     </div>
                     <div className="bg-black/60 backdrop-blur-md px-4 py-2 rounded-lg border border-white/10 font-mono text-[10px] text-[#D4AF37]">
                        NODE 08 SYNC <br/> GPS: ACTIVE
                     </div>
                     <div className="bg-black/60 backdrop-blur-md flex items-center justify-center w-12 h-12 rounded-lg border border-white/10 font-head font-black text-white text-[10px]">
                        4K
                     </div>
                  </div>
               </div>
            </motion.div>
         )}
      </AnimatePresence>

      {/* Sovereign Asset Bond (The Transaction Success Modal) */}
      <AnimatePresence>
         {showSuccess && (
            <motion.div 
               initial={{ opacity: 0 }} 
               animate={{ opacity: 1 }} 
               exit={{ opacity: 0 }}
               className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-[#0D1B2A]/95 backdrop-blur-2xl"
            >
               {/* Digital Gold Rain (Canvas Alternative) */}
               <div className="absolute inset-0 pointer-events-none overflow-hidden">
                  {[...Array(30)].map((_, i) => (
                     <motion.div 
                        key={i}
                        initial={{ y: -50, x: Math.random() * 100 + '%', opacity: 1 }}
                        animate={{ y: '110vh', rotate: 720 }}
                        transition={{ duration: 2.5 + Math.random() * 2, repeat: 0, ease: "linear" }}
                        className="absolute w-1 h-8 bg-gradient-to-b from-[#D4AF37] to-transparent opacity-40"
                     />
                  ))}
               </div>

               <motion.div 
                  initial={{ scale: 0.8, y: 100, rotateX: 15 }}
                  animate={{ scale: 1, y: 0, rotateX: 0 }}
                  transition={{ type: "spring", stiffness: 200, damping: 25 }}
                  className="relative group p-[1px] rounded-[48px] overflow-hidden"
                  onMouseMove={(e) => {
                     const current = e.currentTarget;
                     const rect = current.getBoundingClientRect();
                     const x = e.clientX - rect.left;
                     const y = e.clientY - rect.top;
                     current.style.setProperty('--mouse-x', `${x}px`);
                     current.style.setProperty('--mouse-y', `${y}px`);
                  }}
               >
                  {/* Gold Foil Border Simulation */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37] via-[#F3D573] to-[#B68C1C] rounded-[48px]"></div>
                  
                  {/* Main Bond Card */}
                  <div className="relative bg-[#162A3E]/90 backdrop-blur-3xl rounded-[47px] p-12 md:p-16 max-w-2xl w-full border border-white/10 overflow-hidden shadow-[0_50px_100px_rgba(0,0,0,0.8)]">
                     
                     {/* Holographic Shimmer Layer */}
                     <div className="absolute inset-0 opacity-10 pointer-events-none mix-blend-overlay" style={{ background: 'radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), rgba(255,255,255,1), transparent 40%)' }}></div>
                     
                     {/* Watermark Logo */}
                     <div className="absolute -bottom-20 -left-20 text-[200px] font-black text-white/[0.03] rotate-12 select-none">SYNTRY</div>

                     {/* 3D Gold Key Transformation */}
                     <div className="mb-12 flex justify-center">
                        <motion.div 
                           initial={{ rotateY: 0 }}
                           animate={{ rotateY: [0, 360, 720, 1080] }}
                           transition={{ duration: 2, ease: "easeInOut" }}
                           className="w-24 h-24 bg-gradient-to-br from-[#D4AF37] to-[#B68C1C] rounded-full flex items-center justify-center text-5xl shadow-[0_0_50px_rgba(212,175,55,0.6)] border-4 border-white/20"
                        >
                           🗝️
                        </motion.div>
                     </div>

                     <div className="text-center space-y-2 mb-12">
                        <h4 className="text-[#D4AF37] font-black uppercase text-xs tracking-[0.3em]">Sovereign Asset Receipt — Official</h4>
                        <h2 className="text-4xl md:text-5xl font-head font-black text-white tracking-tighter leading-none">Vault Allocation Captured</h2>
                     </div>

                     <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-16 text-left border-y border-white/5 py-10 relative">
                        <div className="space-y-6">
                           <div>
                              <label className="text-[10px] font-black uppercase tracking-widest text-[#94A3B8]">Asset Name</label>
                              <div className="text-xl font-head font-black text-white uppercase">{selectedProperty?.name || "Otatten B3"}</div>
                           </div>
                           <div>
                              <label className="text-[10px] font-black uppercase tracking-widest text-[#94A3B8]">Acquisition Status</label>
                              <div className="text-xl font-head font-black text-white uppercase">10% Statutory Fraction</div>
                           </div>
                        </div>
                        <div className="space-y-6 md:text-right">
                           <div>
                              <label className="text-[10px] font-black uppercase tracking-widest text-[#94A3B8]">GPS Authenticated Nodes</label>
                              <div className="text-sm font-mono text-white opacity-80 filter brightness-110" style={{ textShadow: '0 0.5px 0.5px rgba(255,255,255,0.2)' }}>
                                 {selectedProperty?.lat.toFixed(6)}, {selectedProperty?.lng.toFixed(6)}
                              </div>
                           </div>
                           <div className="flex justify-end pt-2">
                              {/* Ministerial Node 08 Stamp */}
                              <div className="w-20 h-20 rounded-full border-4 border-[#10B981]/50 flex items-center justify-center text-[#10B981] font-black text-[9px] text-center rotate-[-15deg] uppercase leading-tight bg-[#10B981]/5 shadow-[0_0_20px_rgba(16,185,129,0.1)]">
                                 Ministerial<br />Node 08<br />Verified
                              </div>
                           </div>
                        </div>
                     </div>

                     {/* Action Buttons */}
                     <div className="flex flex-col md:flex-row gap-4 relative z-10">
                        <button onClick={() => { setShowSuccess(false); setAuthStep('dashboard'); setShowPortal(true); }} className="flex-1 py-5 bg-[#162A3E] text-white font-head font-black uppercase tracking-[0.2em] text-[10px] rounded-[24px] shadow-[0_20px_40px_rgba(0,0,0,0.5)] border border-white/10 hover:border-[#D4AF37]/50 transition-all group">
                           <span className="group-hover:text-[#D4AF37] transition-colors">📂 View In My Vault</span>
                        </button>
                        <button className="flex-1 py-5 bg-[#D4AF37] text-[#0D1B2A] font-head font-black uppercase tracking-[0.2em] text-[10px] rounded-[24px] shadow-[0_25px_50px_rgba(212,175,55,0.2)] hover:scale-105 active:scale-95 transition-transform">
                           📥 Download Bond
                        </button>
                        <button className="w-14 h-14 bg-[#162A3E]/80 backdrop-blur-md rounded-[24px] border border-white/20 flex items-center justify-center text-xl hover:bg-[#D4AF37] transition-all shrink-0">
                           <span className="text-white drop-shadow-md">🔗</span>
                        </button>
                     </div>

                  </div>
               </motion.div>
            </motion.div>
         )}
      </AnimatePresence>

      {/* Translucent Mobile Fixed Bar */}
      <nav className="md:hidden fixed bottom-6 left-6 right-6 h-20 bg-[#0D1B2A]/80 backdrop-blur-xl border border-white/10 z-[100] rounded-full shadow-[0_30px_60px_rgba(0,0,0,0.5)] flex items-center justify-around px-4">
         <a href="/protocol" className="flex flex-col items-center gap-1 text-[#94A3B8]">
            <span className="text-xl">🛠️</span>
            <span className="text-[8px] font-black uppercase tracking-widest">Protocol</span>
         </a>
         <a href="/equity" className="flex flex-col items-center gap-1 text-[#94A3B8]">
            <span className="text-xl">💎</span>
            <span className="text-[8px] font-black uppercase tracking-widest">Fraction</span>
         </a>
         <button onClick={() => setShowPortal(true)} className="flex flex-col items-center gap-1 text-white scale-110">
            <span className="text-2xl">🏦</span>
            <span className="text-[8px] font-black uppercase tracking-widest">Vault</span>
         </button>
         <a href="/partner" className="flex flex-col items-center gap-1 text-[#94A3B8]">
            <span className="text-xl">🏗️</span>
            <span className="text-[8px] font-black uppercase tracking-widest">Devs</span>
         </a>
         <a href="/vision" className="flex flex-col items-center gap-1 text-[#94A3B8]">
            <span className="text-xl">🤵</span>
            <span className="text-[8px] font-black uppercase tracking-widest">Vision</span>
         </a>
      </nav>

      {/* JOIN THE WAITLIST SECTION */}
      <section className="relative overflow-hidden bg-[#B8FF3C] py-24 md:py-32 px-6">
         <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
            <span className="font-head text-[28vw] text-black/[0.04] leading-none">SYNTRY</span>
         </div>
         
         <div className="max-w-[1200px] mx-auto relative z-10 text-center space-y-12">
            <div className="space-y-4">
               <p className="font-mono text-[0.65rem] uppercase tracking-[8px] text-black">JOIN THE WAITLIST</p>
               <h2 className="text-[6rem] md:text-[9rem] font-head leading-[0.85] text-black">BE FIRST IN.</h2>
               <p className="text-2xl md:text-3xl text-black/80 max-w-2xl mx-auto italic">Get early access before public launch.</p>
            </div>

            <form 
               action="https://formspree.io/f/mqakevve" 
               method="POST" 
               onSubmit={handleWaitlistSubmit}
               className="max-w-xl mx-auto flex flex-col md:flex-row gap-4"
            >
               <input 
                  type="email" 
                  name="email"
                  required
                  placeholder="ENTER YOUR EMAIL" 
                  className="flex-1 bg-transparent border-b-2 border-black py-4 px-2 text-black font-mono placeholder:text-black/40 outline-none"
               />
               <button type="submit" className="btn bg-black text-[#B8FF3C] font-mono text-[10px] tracking-[4px] hover:bg-black/80">
                  GET EARLY ACCESS
               </button>
            </form>
            <p className="font-mono text-[10px] text-black/50 uppercase tracking-widest">No spam. Early access only.</p>
         </div>
      </section>

      {/* Footer removed - handled by GlobalFooter in RootLayout */}

      {/* FOMO Activity Notification */}
      <AnimatePresence>
         {showFomo && (
            <motion.div 
               initial={{ x: 300, opacity: 0 }} 
               animate={{ x: 0, opacity: 1 }} 
               exit={{ x: 300, opacity: 0 }}
               className="fixed bottom-32 right-6 z-[1000] bg-[#162A3E]/90 backdrop-blur-xl border-l-4 border-[#D4AF37] px-6 py-4 rounded-xl shadow-2xl flex items-center gap-4 transition-all hover:scale-105 cursor-pointer max-w-sm"
            >
               <span className="text-xl">🔔</span>
               <div>
                  <h4 className="text-white text-[10px] font-black uppercase tracking-widest mb-1">Live Activity</h4>
                  <p className="text-[#94A3B8] text-xs font-body font-bold">{fomoMessage}</p>
               </div>
            </motion.div>
         )}
      </AnimatePresence>

      {/* Demo Mode Cursor Glow Overlay */}
      {isDemoMode && (
         <div id="demo-cursor-glow" className="fixed w-32 h-32 rounded-full bg-[#2DD4BF]/20 blur-[60px] pointer-events-none -translate-x-1/2 -translate-y-1/2 z-[9999] mix-blend-screen transition-opacity duration-300"></div>
      )}

      {/* Hidden Demo Mode Trigger (Ctrl + Shift + D) */}
      <DemoModeHandler isDemoMode={isDemoMode} setIsDemoMode={setIsDemoMode} />

    </div>
  );
}

// Sub-component to handle keyboard events cleanly
function DemoModeHandler({ isDemoMode, setIsDemoMode }) {
  React.useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'D') {
        setIsDemoMode(prev => !prev);
        alert(!isDemoMode ? "Presentation Mode Active: Cyber Teal Cursor Glow & 300ms Transitions Enabled." : "Closing Presentation Mode.");
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isDemoMode, setIsDemoMode]);
  return null;
}
