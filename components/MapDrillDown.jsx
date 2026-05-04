"use client";

import React, { useState } from 'react';

const REGIONS = {
  "Greater Accra": ["Accra", "Tema", "East Legon Hills", "Madina"],
  "Ashanti": ["Kumasi", "Obuasi", "Ejisu"],
  "Western": ["Takoradi", "Tarkwa"]
};

export default function MapDrillDown() {
  const [view, setView] = useState({ region: null, city: null, coord: null });
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationResult, setVerificationResult] = useState(null);

  const handleVerify = () => {
    setIsVerifying(true);
    setVerificationResult(null);
    
    // Simulated Agentic AI call to Lands Commission API (GELIS/ELIS)
    // 2026 Logic: SMD Handshake + PVLMD Check + GELIS Sync
    setTimeout(() => {
      setIsVerifying(false);
      setVerificationResult({
        coordinate: view.coord || "5.6814° N, 0.1149° W",
        smd_barcode: "LCS-2026-X9902", // Survey & Mapping Division
        premium_status: "70% PAID (Statutory Compliance)",
        last_audit: "March 13, 2026",
        registry_status: "ACTIVE - Form 5 Validated",
        current_owner: "Verified Private Entity"
      });
    }, 2500);
  };

  return (
    <div className="p-6 bg-[#050810]/80 border border-indigo-500/20 rounded-md backdrop-blur-md">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-indigo-400 font-mono text-xs tracking-tighter uppercase flex items-center gap-2">
          <span className="w-2 h-2 rounded-md bg-indigo-500 animate-pulse"></span>
          📍 Geospatial Precision Engine
        </h2>
        <span className="text-[9px] bg-indigo-500/10 text-indigo-400 px-2 py-0.5 rounded border border-indigo-500/20">
          ANTIGRAVITY DRILL-DOWN V3
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {/* Step 1: Region */}
        <select 
          onChange={(e) => setView({...view, region: e.target.value})}
          className="bg-black/50 border border-white/10 p-3 text-white rounded-lg outline-none focus:border-[#00F5D4]/40 transition-colors text-sm"
        >
          <option>Select Region...</option>
          {Object.keys(REGIONS).map(r => <option key={r} value={r}>{r}</option>)}
        </select>

        {/* Step 2: City */}
        <select 
          disabled={!view.region}
          onChange={(e) => setView({...view, city: e.target.value})}
          className="bg-black/50 border border-white/10 p-3 text-white rounded-lg outline-none disabled:opacity-30 focus:border-[#00F5D4]/40 transition-colors text-sm"
        >
          <option>Select City/Town...</option>
          {view.region && REGIONS[view.region].map(c => <option key={c} value={c}>{c}</option>)}
        </select>

        {/* Step 3: Coordinate Input */}
        <input 
          placeholder="Enter GPS (e.g. 5.6814, -0.1149)"
          className="bg-black/50 border border-white/10 p-3 text-white rounded-lg outline-none focus:border-[#00F5D4]/40 transition-colors text-sm"
          onChange={(e) => setView({...view, coord: e.target.value})}
        />
      </div>

      {/* The Map "Viewport" */}
      <div className="w-full h-64 bg-slate-900 rounded-md relative overflow-hidden border border-white/5 shadow-inner">
        {/* Pinpoint 5m x 5m Grid Overlay */}
        <div className="absolute inset-0 opacity-[0.15] z-0"
             style={{ 
               backgroundImage: `linear-gradient(to right, #4f46e5 1px, transparent 1px), linear-gradient(to bottom, #4f46e5 1px, transparent 1px)`,
               backgroundSize: '20px 20px'
             }}>
        </div>
        
        <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
        
        {/* Radar Line Animation */}
        <div className="absolute top-0 left-0 w-full h-[2px] bg-indigo-500/40 shadow-[0_0_15px_#4f46e5] animate-scan z-10"></div>
        
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="text-gray-600 font-mono text-[10px] tracking-widest uppercase">
            {view.city ? `PREVIEWING ${view.city.toUpperCase()} 5M GRID...` : "AWAITING SPATIAL INPUT"}
          </p>
        </div>
        
        {view.coord && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
            <div className="w-20 h-20 border-2 border-dashed border-[#00F5D4]/30 rounded-lg animate-pulse"></div>
            <div className="w-4 h-4 bg-[#00F5D4] rounded-md absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow-[0_0_15px_#00F5D4]"></div>
            <div className="absolute top-12 left-1/2 -translate-x-1/2 whitespace-nowrap bg-black/80 border border-white/10 px-2 py-1 rounded text-[8px] text-[#00F5D4] font-mono shadow-xl backdrop-blur-sm">
              TARGET LOCKED: {view.coord}
            </div>
          </div>
        )}
      </div>

      {verificationResult && (
        <div className="mt-4 p-5 bg-[#00F5D4]/5 border border-[#00F5D4]/20 rounded-md animate-in fade-in slide-in-from-top-2 duration-500 shadow-lg">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-[#00F5D4] text-[10px] font-medium tracking-tight uppercase tracking-widest mb-1">GELIS Real-Time Sync Result</p>
              <p className="text-white text-xs font-semibold">Coordinate Security Verification Successful</p>
            </div>
            <div className="bg-[#00F5D4]/20 p-1.5 rounded-md">
              <svg className="w-4 h-4 text-[#00F5D4]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
          
          <div className="max-h-[160px] overflow-y-auto pr-2 custom-scrollbar scroll-smooth">
            <div className="grid grid-cols-2 gap-y-4 gap-x-6">
              <div>
                <p className="text-[8px] text-gray-500 uppercase font-medium tracking-tighter">SMD Barcode</p>
                <p className="text-[10px] text-white font-mono">{verificationResult.smd_barcode}</p>
              </div>
              <div>
                <p className="text-[8px] text-gray-500 uppercase font-medium tracking-tighter">Premium Status</p>
                <p className="text-[10px] text-[#00F5D4] font-medium">{verificationResult.premium_status}</p>
              </div>
              <div>
                <p className="text-[8px] text-gray-500 uppercase font-medium tracking-tighter">Current Owner</p>
                <p className="text-[10px] text-white font-medium">{verificationResult.current_owner}</p>
              </div>
              <div>
                <p className="text-[8px] text-gray-500 uppercase font-medium tracking-tighter">Registry Status</p>
                <p className="text-[10px] text-indigo-400 font-medium">{verificationResult.registry_status}</p>
              </div>
              {/* Future-proofing for long audit trails */}
              <div className="col-span-2 pt-2">
                <p className="text-[8px] text-gray-500 uppercase font-medium tracking-tighter mb-1">Audit Trail Reference</p>
                <p className="text-[9px] text-gray-400 line-clamp-2 italic">Official verification logged under ELIS-SYN-2026-X. Encrypted handshake verified via GELIS Protocol Layer 2.</p>
              </div>
            </div>
          </div>
          
          <div className="mt-4 pt-3 border-t border-[#00F5D4]/10 flex justify-between items-center text-[8px] text-gray-500">
             <span>LAST SYSTEM AUDIT: {verificationResult.last_audit}</span>
             <span className="text-[#00F5D4]/60">GPS PRECISION: 5.0m</span>
          </div>
        </div>
      )}

      <button 
        onClick={handleVerify}
        disabled={!view.coord || isVerifying}
        className={`w-full mt-4 py-4 rounded-md font-medium uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-3
          ${!view.coord || isVerifying 
            ? 'bg-gray-800 text-gray-500 cursor-not-allowed border border-gray-700' 
            : 'bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white shadow-lg shadow-indigo-500/20 border border-indigo-400/30 active:scale-95'}`}
      >
        {isVerifying ? (
          <>
            <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-md" />
            Agentic AI Verifying with GELIS...
          </>
        ) : "Perform Agentic Verification"}
      </button>

      <div className="mt-4 flex justify-between items-center text-[9px] text-gray-500 font-mono uppercase tracking-widest opacity-60">
        <span>PVLMD Audit Compliant</span>
        <span>Barcode verified via SMD</span>
      </div>
    </div>
  );
}
