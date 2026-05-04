"use client";

import React, { useState } from 'react';
import InvestorProspectus from '@/components/admin/InvestorProspectus';

export default function LiquidityPanel({ plotData, onDecompose, isFractionalized }) {
  const [fragments, setFragments] = useState(100); // 1 to 500
  const [showProspectus, setShowProspectus] = useState(false);
  const valuation = plotData?.value || 331892.40;
  
  const pricePerUnit = valuation / fragments;

  return (
    <div className="w-full bg-[#0b132b] border border-indigo-500/30 rounded-md shadow-xl shadow-indigo-900/20 p-6 text-gray-200 font-sans">
       <div className="flex justify-between items-center mb-4 border-b border-indigo-500/20 pb-4">
         <h2 className="text-[#FFD700] font-medium tracking-tight tracking-widest uppercase text-sm flex items-center gap-2">
            <span className="text-lg">⚛️</span> Fractionalization Lab
         </h2>
       </div>

       {!isFractionalized ? (
         <div className="space-y-6">
           <div className="bg-black/40 p-4 rounded-md border border-white/5 space-y-4">
             <label className="flex flex-col text-[10px] text-gray-400 uppercase tracking-widest font-medium mb-1">
                <span className="flex justify-between w-full mb-3">
                    Select Fragments (1-500)
                    <span className="text-[#00F5D4] font-mono text-sm">{fragments} Fragments</span>
                </span>
                <input 
                   type="range" 
                   min="1" max="500" 
                   value={fragments}
                   onChange={(e) => setFragments(Number(e.target.value))}
                   className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-[#FFD700] hover:accent-[#e5c04b] transition-all"
                />
             </label>
             
             <div className="flex flex-col justify-center mt-4 p-3 bg-indigo-900/10 rounded-lg border border-indigo-500/20">
                <div className="text-[10px] uppercase text-gray-500 tracking-widest font-medium mb-2">Real-Time Calculus</div>
                <div className="flex items-center justify-between text-xs font-mono text-gray-300">
                   <span>${valuation.toLocaleString('en-US', {minimumFractionDigits: 2})}</span>
                   <span className="text-indigo-500">/</span>
                   <span className="text-white">{fragments}</span>
                   <span className="text-indigo-500">=</span>
                   <span className="text-[#00F5D4] text-sm">${pricePerUnit.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
                </div>
                <div className="text-right mt-1">
                   <span className="text-[9px] uppercase tracking-widest text-[#00F5D4] font-medium">Price per Unit</span>
                </div>
             </div>
           </div>

           <button
             onClick={() => onDecompose(fragments)}
             className="w-full py-4 text-xs font-medium tracking-tight tracking-widest uppercase rounded-md transition-all shadow-[0_0_20px_rgba(255,215,0,0.3)] bg-gradient-to-r from-yellow-600 to-[#FFD700] hover:scale-[1.02] border border-yellow-400/50 text-black flex justify-center items-center gap-2"
           >
             🚀 MINT LIQUIDITY PACKETS
           </button>
         </div>
       ) : (
         <div className="space-y-4 animate-in fade-in zoom-in-95 duration-500">
            <div className="bg-indigo-900/30 border border-indigo-500/50 p-4 rounded-md text-center shadow-[0_0_15px_rgba(79,70,229,0.2)]">
              <span className="text-indigo-400 text-[11px] uppercase font-medium tracking-tight tracking-widest flex items-center justify-center gap-2">
                 <span className="w-2 h-2 rounded-md bg-indigo-400 animate-pulse"></span>
                 STATUS: OPEN FOR MICRO-INVESTMENT
              </span>
            </div>

            <div className="bg-black/50 border border-[#00F5D4]/30 p-4 rounded-md flex flex-col gap-4 mt-2">
               <div className="flex flex-col flex-grow items-center text-center">
                  <span className="text-[9px] uppercase tracking-widest text-gray-500 font-medium mb-2">Public Marketplace Link</span>
                  <button onClick={() => setShowProspectus(true)} className="text-sm font-mono text-[#00F5D4] hover:text-white transition-colors underline decoration-[#00F5D4]/50 underline-offset-4 cursor-pointer mb-4 break-all block px-4 py-2 bg-white/5 rounded-lg border border-white/10 w-full text-center">
                    syntry.io/invest/{plotData.id.toLowerCase().split('-').pop() || 'ashifla-001'}
                  </button>
                  
                  <button onClick={() => setShowProspectus(true)} className="w-full py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-lg text-[10px] uppercase font-medium tracking-widest transition-colors flex items-center justify-center gap-2 border border-white/10 hover:border-[#00F5D4]/50 hover:text-[#00F5D4]">
                     <span className="text-sm">↗️</span> Share to Marketplace
                  </button>
               </div>
            </div>
         </div>
       )}

       {showProspectus && (
          <InvestorProspectus plotData={plotData} onClose={() => setShowProspectus(false)} />
       )}
    </div>
  );
}
