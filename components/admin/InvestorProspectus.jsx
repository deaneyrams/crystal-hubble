"use client";

import React, { useState, useEffect } from 'react';

export default function InvestorProspectus({ plotData, onClose }) {
  const [downloading, setDownloading] = useState(false);
  const packetPrice = 3318.92; // 1%
  const valuation = plotData?.value || 331892.40;
  
  const handleDownload = () => {
    setDownloading(true);
    setTimeout(() => {
      // Simulate PDF download
      const content = `
        SYNTRY INVESTOR PROSPECTUS
        ==========================
        Asset: SYN-DEED-2026-ASH-001 (Ashifla-Otatten Site Plan)
        Map Coordinates: [${plotData?.lat}, ${plotData?.lng}]
        Valuation: $${valuation.toLocaleString('en-US', {minimumFractionDigits: 2})}
        Fraction Available: 1% ($${packetPrice})
        Legal Hash (Lands Commission Node 08): TX-HASH: 0xGH2026...ASH-001
        
        FORECAST:
        West Hills Corridor is operating at $1,050/sqm average.
        Projected Yield Target: 12% annual appreciation (2026-2028).
        STATUS: OPEN FOR MICRO-INVESTMENT.
      `;
      const blob = new Blob([content], { type: 'text/plain' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `Prospectus_${plotData?.id}.txt`;
      a.click();
      window.URL.revokeObjectURL(url);
      setDownloading(false);
    }, 4500); // Wait 4.5 seconds for the high-end animation
  };

  return (
    <div className="fixed inset-0 z-[200] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
       <div className="bg-[#0b132b] border border-[#00F5D4]/30 w-[800px] max-w-full rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-300">
         {/* Header */}
         <div className="bg-[#0E1629] p-6 border-b border-white/10 flex justify-between items-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-[#00F5D4] shadow-[0_0_15px_#00F5D4]"></div>
            <div>
               <h2 className="text-2xl font-medium tracking-tight text-white uppercase tracking-widest">Syntry Micro-REIT</h2>
               <p className="text-sm text-gray-400 font-mono tracking-tight mt-1">Asset: {plotData?.id || 'SYN-DEED-2026-ASH-001'}</p>
            </div>
            <button onClick={onClose} className="text-gray-500 hover:text-white transition-colors text-2xl leading-none">&times;</button>
         </div>

         {/* Content */}
         <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
               <div className="bg-emerald-900/20 border border-emerald-500/50 p-4 rounded-xl flex items-center gap-3">
                  <span className="text-2xl drop-shadow-[0_0_10px_#10B981]">✅</span>
                  <div>
                    <h3 className="text-xs uppercase font-medium tracking-tight text-emerald-400 tracking-widest">Ministerial Node 08 Verification</h3>
                    <p className="text-[10px] text-emerald-300/80 font-mono mt-1">Lands Commission ELIS-2.0 Secured</p>
                  </div>
               </div>

               <div>
                 <h3 className="text-xs uppercase font-medium text-gray-400 tracking-widest mb-3">Growth Forecast (5-Year Trajectory)</h3>
                 <div className="bg-black/50 border border-indigo-500/20 rounded-xl p-4 relative h-40 flex items-end">
                    <div className="absolute top-4 left-4">
                       <p className="text-[10px] text-gray-500 uppercase tracking-widest font-medium">West Hills Corridor</p>
                       <p className="text-sm font-mono text-indigo-300">$1,050/sqm Average</p>
                       <p className="text-[9px] text-[#00F5D4] uppercase font-medium mt-1">+12% Annual Yield</p>
                    </div>
                    {/* Simulated SVG Graph */}
                    <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 100 40">
                      <defs>
                        <linearGradient id="chartGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#4f46e5" stopOpacity="0.3" />
                          <stop offset="100%" stopColor="#00F5D4" stopOpacity="1" />
                        </linearGradient>
                      </defs>
                      <path d="M 0 35 Q 20 30, 40 20 T 70 10 T 100 0" fill="none" stroke="url(#chartGradient)" strokeWidth="3" className="drop-shadow-[0_0_8px_rgba(0,245,212,0.8)]" />
                      <path d="M 0 35 Q 20 30, 40 20 T 70 10 T 100 0 L 100 40 L 0 40 Z" fill="url(#chartGradient)" opacity="0.1" />
                    </svg>
                 </div>
               </div>
               
               <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex justify-between items-center">
                  <div>
                    <p className="text-[9px] uppercase tracking-widest text-gray-500 font-medium mb-1">Total Asset Value</p>
                    <p className="text-lg font-mono text-white">${valuation.toLocaleString('en-US', {minimumFractionDigits: 2})}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[9px] uppercase tracking-widest text-gray-500 font-medium mb-1">Total Supply</p>
                    <p className="text-lg font-mono text-indigo-300">100 Packets</p>
                  </div>
               </div>
            </div>

            <div className="space-y-6 flex flex-col justify-between">
               <div className="bg-indigo-900/20 border border-indigo-500/30 rounded-xl p-6 flex flex-col items-center text-center">
                  <h3 className="text-sm font-medium tracking-tight text-indigo-400 uppercase tracking-widest mb-2">High-Precision QR Gateway</h3>
                  <div className="bg-white p-3 rounded-xl shadow-[0_0_30px_rgba(79,70,229,0.3)] mb-4 w-32 h-32 relative">
                     {/* Functional QR Representation */}
                     <svg width="100%" height="100%" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect width="100" height="100" fill="white"/>
                      <path d="M10 10H40V40H10V10ZM20 20V30H30V20H20ZM60 10H90V40H60V10ZM70 20V30H80V20H70ZM10 60H40V90H10V60ZM20 70V80H30V70H20ZM50 50H60V60H50V50ZM60 60H70V70H60V60ZM70 50H80V60H70V50ZM80 60H90V70H80V60ZM90 70H100V80H90V70ZM50 70H60V80H50V70ZM60 80H70V90H60V80ZM70 70H80V80H70V70ZM80 80H90V90H80V80ZM90 50H100V60H90V50ZM50 90H60V100H50V90ZM50 10H60V20H50V10ZM80 10H90V20H80V10ZM90 30H100V40H90V30ZM10 50H20V60H10V50Z" fill="black"/>
                     </svg>
                  </div>
                  <p className="text-xs uppercase tracking-widest font-medium tracking-tight text-[#00F5D4] bg-[#00F5D4]/10 border border-[#00F5D4]/30 px-4 py-2 rounded-full w-full">
                     Scan to Purchase 1% Fragment
                  </p>
                  <p className="font-mono text-gray-300 mt-3 text-lg">${packetPrice.toLocaleString('en-US', {minimumFractionDigits: 2})}</p>
               </div>

               <button 
                 onClick={handleDownload}
                 disabled={downloading}
                 className={`w-full py-4 text-xs font-medium tracking-tight tracking-widest uppercase rounded-xl transition-all shadow-[0_0_15px_rgba(255,255,255,0.1)] flex justify-center items-center gap-2 border break-words
                 ${downloading ? 'bg-gray-800 text-gray-400 border-gray-600 cursor-wait' : 'bg-white/10 hover:bg-white/20 text-white border-white/20'}`}
               >
                 {downloading ? "Generating PDF..." : "📥 DOWNLOAD INVESTOR PROSPECTUS"}
               </button>
            </div>
         </div>
         
         {/* Internal Async PDF Mock View */}
         {downloading && (
             <div className="absolute inset-0 z-50 bg-[#0E1629] animate-in fade-in zoom-in-95 duration-300 flex flex-col items-center justify-center p-8">
                 <div className="bg-white w-full max-w-2xl h-full rounded shadow-2xl relative overflow-hidden flex flex-col isolate">
                     <div className="h-40 relative bg-black">
                         {/* Mock Satellite Background */}
                         <div className="absolute inset-0 opacity-80" style={{ backgroundImage: 'radial-gradient(circle at 50% 50%, #1e3a8a, #000)', backgroundSize: 'cover' }}></div>
                         <div className="absolute inset-0 bg-[url('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/14/8162/8155')] opacity-60 bg-cover bg-center mix-blend-overlay"></div>
                         <div className="absolute bottom-4 left-4 flex gap-3 items-end">
                            <span className="text-4xl drop-shadow-[0_0_10px_#10B981]">✅</span>
                            <div>
                               <h1 className="text-white font-medium tracking-tight text-xl uppercase tracking-widest drop-shadow-md">Ashifla-Otatten Site Plan</h1>
                               <p className="text-[#00F5D4] font-mono text-[10px] uppercase tracking-widest bg-black/80 px-2 py-1 mt-1 rounded border border-[#00F5D4]/30 inline-block">Ministerial Node 08 Verified</p>
                            </div>
                         </div>
                     </div>
                     <div className="p-8 flex-grow flex flex-col bg-[#f8fafc]">
                         <div className="flex justify-between border-b-2 border-gray-200 pb-4 mb-6">
                            <div>
                                <p className="text-[10px] uppercase font-medium text-gray-400 tracking-widest">Asset Hash</p>
                                <p className="text-sm font-mono text-gray-800 font-medium">SYN-DEED-2026-ASH-001</p>
                            </div>
                            <div className="text-right">
                                <p className="text-[10px] uppercase font-medium text-gray-400 tracking-widest">1% Premium Packet</p>
                                <p className="text-lg font-mono text-indigo-600 font-medium tracking-tight">$3,318.92</p>
                            </div>
                         </div>

                         <div className="flex-grow space-y-6 text-gray-800">
                             <div>
                                 <h4 className="text-[10px] uppercase font-medium tracking-tight text-gray-800 tracking-widest mb-3 border-l-2 border-indigo-500 pl-2">Investment Thesis</h4>
                                 <p className="text-xs text-gray-600 leading-relaxed font-serif">
                                    This prospectus certifies an immutable 1% participation right in the Ashifla-Otatten master deed. Backed seamlessly by Lands Commission ELIS-2.0 via Smart Contract escrow, this asset is entirely shielded from dispute latency and double-spending fraud. 
                                 </p>
                             </div>

                             <div>
                                 <h4 className="text-[10px] uppercase font-medium tracking-tight text-gray-800 tracking-widest mb-3 border-l-2 border-[#00F5D4] pl-2">Yield Projection (12% CAGR)</h4>
                                 <div className="h-28 w-full bg-white border border-gray-200 rounded-xl relative shadow-sm overflow-hidden flex items-end pb-2 px-2">
                                    <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 100 40">
                                      <defs>
                                        <linearGradient id="pdfChartGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                          <stop offset="0%" stopColor="#4c84ff" stopOpacity="0.4" />
                                          <stop offset="100%" stopColor="#4f46e5" stopOpacity="0.8" />
                                        </linearGradient>
                                      </defs>
                                      <path d="M 0 35 Q 20 30, 40 20 T 70 10 T 100 0" fill="none" stroke="url(#pdfChartGradient)" strokeWidth="3" />
                                    </svg>
                                 </div>
                             </div>
                         </div>
                         
                         <div className="mt-8 pt-4 border-t-2 border-gray-200 flex justify-between items-center text-[9px] text-gray-400 uppercase tracking-widest font-mono">
                             <span>Powered by Syntry Escrow Engine</span>
                             <span>{new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                         </div>
                     </div>
                 </div>
                 
                 <div className="absolute inset-0 bg-white/20 backdrop-blur-[2px] z-[60] flex items-center justify-center animate-in fade-in duration-500 delay-500">
                     <div className="bg-indigo-900 border border-indigo-500 px-6 py-4 rounded-xl shadow-2xl flex items-center gap-4">
                        <div className="w-6 h-6 border-2 border-t-[#00F5D4] border-indigo-500 rounded-full animate-spin"></div>
                        <span className="text-[#00F5D4] font-mono text-sm tracking-widest uppercase font-medium text-shadow-sm">Compiling Native PDF Core...</span>
                     </div>
                 </div>
             </div>
         )}
       </div>
    </div>
  );
}
