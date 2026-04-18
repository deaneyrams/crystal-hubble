"use client";

import React, { useState } from 'react';
import { generateDeedSchema, lockSovereignAudit } from '@/lib/deed-engine';

export default function StampingPacket({ plot, onPacketMinted }) {
  const [isMinting, setIsMinting] = useState(false);
  const [isLocked, setIsLocked] = useState(false);

  // 2026 GRA Estimated Stamp Duty Rate Component (0.5% assignment)
  const graRate = 0.005;
  const stampDutyEstimate = plot.value * graRate;

  const handleMintPacket = async () => {
    setIsMinting(true);
    
    // Simulate generation and immutable lock
    setTimeout(() => {
      // 1. Lock the Audit on Ledger (Client-side simulation mirroring the backend)
      // Note: In actual app, we'd hit an API that uses lib/deed-engine.js methods.
      // We will mock the response structure here for the demonstration.
      const packetData = generateDeedSchema(plot, { amount: plot.value * 0.7 });
      const mintLock = lockSovereignAudit(plot.id);

      if (mintLock.success || mintLock.error === "Plot is already irrevocably locked on the ledger.") {
        setIsLocked(true);

        // 2. Generate JSON File representing the .syntry wrapper
        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(packetData, null, 2));
        const downloadAnchorNode = document.createElement('a');
        downloadAnchorNode.setAttribute("href", dataStr);
        downloadAnchorNode.setAttribute("download", `deed_${plot.id}_sealed.syntry`);
        document.body.appendChild(downloadAnchorNode);
        downloadAnchorNode.click();
        downloadAnchorNode.remove();

        setIsMinting(false);
        if (onPacketMinted) onPacketMinted(plot.id);
      }
    }, 2000);
  };

  return (
    <div className="mt-6 border border-indigo-500/30 rounded-2xl bg-gradient-to-br from-[#0b132b] to-[#1E3A8A]/20 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-500">
      <div className="bg-indigo-900/40 p-4 border-b border-indigo-500/30 flex items-center justify-between">
        <h3 className="text-white font-bold tracking-widest uppercase text-sm flex items-center gap-2">
          <span className="text-xl">📜</span> Digital Stamping Packet
        </h3>
        {isLocked && <span className="bg-red-500/20 text-red-400 border border-red-500/30 px-2 py-1 rounded text-[10px] uppercase font-black animate-pulse">Immutable Lock</span>}
      </div>
      
      <div className="p-5 space-y-5">
        
        {/* Packet Overview */}
        <div className="bg-black/30 p-4 rounded-xl border border-white/5 space-y-3">
           <div className="flex justify-between items-center">
             <span className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Valuation (USD)</span>
             <span className="text-sm font-mono text-white">${plot.value.toLocaleString()}</span>
           </div>
           
           <div className="flex justify-between items-center border-t border-white/5 pt-2">
             <span className="text-[10px] text-gray-500 uppercase tracking-widest font-bold flex items-center gap-1">
                2026 GRA Stamp Duty <span className="bg-[#00F5D4]/10 text-[#00F5D4] px-1 rounded text-[8px]">0.5% Rate</span>
             </span>
             <span className="text-sm font-bold text-[#00F5D4] italic">${stampDutyEstimate.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
           </div>
        </div>

        {/* Digital Jurat */}
        <div className="bg-indigo-500/5 p-4 rounded-xl border border-indigo-500/20">
           <p className="text-[10px] uppercase tracking-widest text-indigo-400 font-black mb-2 flex justify-between items-center">
             <span>Digital Jurat</span>
             <span className="opacity-50 text-[8px] bg-indigo-500/20 px-1 py-0.5 rounded">Act 1036 Compliant</span>
           </p>
           <p className="text-[9px] text-indigo-200/70 leading-relaxed italic">
             "I hereby attest that the geospatial lock (1090000 N / 381000 E), identity hash, and the 70% statutory premium execution bound to <b>{plot.id.toUpperCase()}</b> have been cryptographically verified against the GELIS registry. This instrument is authorized for electronic conveyancing."
           </p>
        </div>

        {/* Mint Button */}
        <button
          onClick={handleMintPacket}
          disabled={isMinting || isLocked}
          className={`w-full py-4 text-sm font-bold tracking-widest uppercase rounded-xl transition-all duration-300 flex items-center justify-center gap-2
            ${isLocked 
              ? 'bg-red-900/20 border border-red-500/30 text-red-500 cursor-not-allowed shadow-none' 
              : isMinting
              ? 'bg-indigo-800 text-indigo-300 cursor-wait'
              : 'bg-gradient-to-r from-indigo-600 to-[#1e3a8a] hover:from-indigo-500 hover:to-[#00F5D4]/80 text-white shadow-[0_0_20px_rgba(79,70,229,0.5)] border border-indigo-400/50'
            }`}
        >
          {isLocked ? (
             <>
               🔒 Ledger Locked
             </>
          ) : isMinting ? (
             <>
               <span className="animate-spin w-4 h-4 border-2 border-white/20 border-t-white rounded-full"></span>
               Compiling Packet...
             </>
          ) : (
             <>
               <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><path d="M12 18v-6"/><path d="m9 15 3 3 3-3"/></svg>
               Mint Digital Packet
             </>
          )}
        </button>
      </div>
    </div>
  );
}
