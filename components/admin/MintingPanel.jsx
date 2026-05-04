"use client";

import React, { useState } from 'react';
import { calculateStampDuty, calculateVATAndLevies, generateSovereignHash } from '@/lib/stamping-engine';

export default function MintingPanel({ plot, onMintSuccess, sovereignLink }) {
  const [signature, setSignature] = useState('');
  const [isMinting, setIsMinting] = useState(false);
  const [mintedHash, setMintedHash] = useState(plot.deedHash || null);

  const stampDuty = calculateStampDuty(plot.value);
  const vatData = calculateVATAndLevies(plot.value);

  const handleMint = () => {
    if (!signature) {
      alert("Legal Practitioner Signature required to mint.");
      return;
    }
    setIsMinting(true);

    setTimeout(() => {
      const hash = generateSovereignHash();
      setMintedHash(hash);
      setIsMinting(false);
      
      if (onMintSuccess) {
        onMintSuccess(hash);
      }
    }, 1500);
  };

  const handleDownloadPacket = () => {
    const packetData = {
      syntryDeedID: mintedHash,
      lockedGeospatial: "1090000 N / 381000 E",
      acreage: "49.51 Acres",
      financials: {
        valuation: plot.value,
        stampDuty,
        totalVatAmount: vatData.totalVatAmount,
      },
      practitionerSignature: signature || "[Sealed Internally]",
      timestamp: new Date().toISOString(),
      sovereignOneTimeLink: sovereignLink || "No link generated prior to minting."
    };

    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(packetData, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", `${mintedHash}_LEGAL_PACKET.syntry`);
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  return (
    <div className="mt-6 border border-[#D4AF37]/40 rounded-md bg-gradient-to-br from-[#1c1c1c] to-[#2d2d2d] shadow-2xl overflow-hidden text-[#e0e0e0] animate-in slide-in-from-bottom-5">
      {/* Header */}
      <div className="bg-[#111] p-4 border-b border-[#D4AF37]/30 flex items-center justify-between">
        <h3 className="text-[#D4AF37] font-medium tracking-widest uppercase text-sm flex items-center gap-2">
           ⚖️ Digital Deed Engine
        </h3>
        {!mintedHash ? (
          <span className="bg-[#D4AF37]/20 text-[#D4AF37] border border-[#D4AF37]/50 px-2 py-1 rounded text-[10px] uppercase font-medium tracking-tight animate-pulse">
            Ready-to-Stamp
          </span>
        ) : (
          <span className="bg-syntry-teal-600/40 text-syntry-teal-600 border border-green-500/50 px-2 py-1 rounded text-[10px] uppercase font-medium tracking-tight">
            Immutable Seal
          </span>
        )}
      </div>

      <div className="p-5 space-y-5">
        
        {/* Locked Data */}
        <div className="bg-black/50 p-4 rounded-md border border-white/5 space-y-3">
           <h4 className="text-[10px] uppercase tracking-widest text-[#D4AF37] font-medium">Locked Asset Data</h4>
           <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="block text-[9px] text-gray-500 uppercase tracking-widest">Coordinates</span>
                <span className="font-mono text-sm text-white">1090000 N / 381000 E</span>
              </div>
              <div>
                <span className="block text-[9px] text-gray-500 uppercase tracking-widest">Acreage</span>
                <span className="font-mono text-sm text-white">49.51 Acres</span>
              </div>
           </div>
        </div>

        {/* Taxes and Duties */}
        <div className="bg-black/30 p-4 rounded-md border border-white/5 space-y-2 text-sm">
           <div className="flex justify-between items-center text-gray-300">
             <span className="text-[10px] uppercase tracking-wider font-medium text-gray-500">Valuation</span>
             <span className="font-mono">${plot.value.toLocaleString()}</span>
           </div>
           <div className="flex justify-between items-center text-gray-300">
             <span className="text-[10px] uppercase tracking-wider font-medium text-gray-500">GRA Stamp Duty <span className="text-[#D4AF37] border border-[#D4AF37] rounded px-1 ml-1 text-[8px] bg-[#D4AF37]/10">1%</span></span>
             <span className="font-mono text-[#D4AF37]">${stampDuty.toLocaleString()}</span>
           </div>
           <div className="flex justify-between items-center text-gray-300 border-b border-white/10 pb-2 pt-1 mt-1">
             <span className="text-[10px] uppercase tracking-wider font-medium text-gray-500 flex flex-col">
               Unified VAT <span className="text-gray-400 border border-gray-400 rounded px-1 w-max text-[8px] bg-gray-400/10 mt-1">20% Tier</span>
             </span>
             <span className="font-mono text-gray-400">${vatData.totalVatAmount.toLocaleString()}</span>
           </div>
           <div className="flex justify-between items-center text-white font-medium tracking-tight tracking-wide pt-2">
             <span className="text-[10px] uppercase">Authorized Transfer</span>
             <span className="font-mono">${(plot.value + stampDuty + vatData.totalVatAmount).toLocaleString()}</span>
           </div>
        </div>

        {!mintedHash ? (
          <>
            {/* Signature Input */}
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest text-gray-400 font-medium">Legal Practitioner Digital Seal</label>
              <input 
                type="text" 
                placeholder="Type signature code (e.g., JD-10992)..."
                value={signature}
                onChange={(e) => setSignature(e.target.value)}
                className="w-full bg-black/60 border border-[#D4AF37]/20 rounded-lg px-3 py-3 text-sm text-[#D4AF37] focus:outline-none focus:border-[#D4AF37] transition-colors font-mono"
              />
            </div>

            {/* Mint Button */}
            <button
              onClick={handleMint}
              disabled={isMinting || !signature}
              className={`w-full py-4 text-sm font-medium tracking-tight tracking-widest uppercase rounded-md transition-all duration-300 flex items-center justify-center gap-2
                ${isMinting 
                  ? 'bg-[#333] text-gray-500 cursor-wait shadow-inner'
                  : !signature 
                  ? 'bg-[#1a1a1a] text-gray-600 border border-white/5 opacity-50 cursor-not-allowed'
                  : 'bg-gradient-to-r from-[#D4AF37] to-[#aa8022] hover:from-[#e5c04b] hover:to-[#cfa030] text-black shadow-[0_0_20px_rgba(212,175,55,0.4)] border border-[#f0d473]/50 transform hover:scale-[1.02]'
                }`}
            >
              {isMinting ? "Executing Ledger Lock..." : "Mint Digital Deed"}
            </button>
          </>
        ) : (
          <div className="space-y-4 animate-in fade-in zoom-in duration-500">
            <div className="bg-syntry-teal-600/10 border border-green-500/30 p-4 rounded-md text-center space-y-2">
               <p className="text-[10px] uppercase text-syntry-teal-600 font-medium tracking-widest">Immutable Deed Hash</p>
               <p className="font-mono text-lg text-white font-medium">{mintedHash}</p>
            </div>
            
            <button
              onClick={handleDownloadPacket}
              className="w-full py-4 bg-transparent border border-[#D4AF37] hover:bg-[#D4AF37]/10 text-[#D4AF37] rounded-md text-xs font-medium tracking-widest uppercase transition-all flex items-center justify-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>
              Download Legal Packet
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
