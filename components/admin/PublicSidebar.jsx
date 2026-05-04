import React from 'react';

export default function PublicSidebar() {
  return (
    <div className="p-6 flex-grow overflow-y-auto space-y-6 bg-gradient-to-b from-[#0b132b] to-[#0E1629] animate-in fade-in duration-500">
      {/* High-Precision QR Code Node */}
      <div className="bg-indigo-900/20 border border-indigo-500/30 rounded-md p-6 flex flex-col items-center text-center shadow-[0_0_20px_rgba(79,70,229,0.15)] animate-in fade-in duration-500">
        <h3 className="text-xs font-medium tracking-tight text-indigo-400 uppercase tracking-widest mb-4">Direct Checkout Node</h3>
        <div className="bg-white p-3 rounded-md shadow-[0_0_30px_rgba(79,70,229,0.3)] mb-4 w-48 h-48 relative group cursor-pointer transition-transform hover:scale-105 overflow-hidden">
            <div className="absolute inset-0 bg-black/85 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10 text-center backdrop-blur-sm rounded-md p-2 select-none">
              <span className="text-[10px] font-medium tracking-tight text-[#00F5D4] uppercase tracking-widest mb-1 shadow-sm">Proceed to Payment</span>
              <span className="text-[8px] text-white">Syntry Secure Escrow</span>
            </div>
            {/* Functional QR Representation */}
            <svg width="100%" height="100%" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="100" height="100" fill="white"/>
              <path d="M10 10H40V40H10V10ZM20 20V30H30V20H20ZM60 10H90V40H60V10ZM70 20V30H80V20H70ZM10 60H40V90H10V60ZM20 70V80H30V70H20ZM50 50H60V60H50V50ZM60 60H70V70H60V60ZM70 50H80V60H70V50ZM80 60H90V70H80V60ZM90 70H100V80H90V70ZM50 70H60V80H50V70ZM60 80H70V90H60V80ZM70 70H80V80H70V70ZM80 80H90V90H80V80ZM90 50H100V60H90V50ZM50 90H60V100H50V90ZM50 10H60V20H50V10ZM80 10H90V20H80V10ZM90 30H100V40H90V30ZM10 50H20V60H10V50Z" fill="black"/>
               <circle cx="25" cy="25" r="5" fill="black" />
               <circle cx="75" cy="25" r="5" fill="black" />
               <circle cx="25" cy="75" r="5" fill="black" />
            </svg>
        </div>
        <p className="text-[11px] uppercase tracking-widest font-medium tracking-tight text-gray-300 px-2 leading-relaxed">
            Ready to purchase 1/100 Fragment for <span className="text-[#00F5D4] border-b-2 border-[#00F5D4]/50 shadow-sm">$3,318.92</span>?
        </p>
      </div>

      {/* Growth Projection Chart */}
      <div className="bg-black/50 border border-white/10 rounded-md p-5 shadow-lg relative overflow-hidden animate-in fade-in duration-700">
        <h3 className="text-[10px] uppercase font-medium tracking-tight text-gray-500 tracking-widest mb-4">Market Intel: West Hills Trajectory</h3>
        <div className="relative h-24 flex items-end mb-4">
            <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 100 40">
              <defs>
                <linearGradient id="publicChartGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#4c84ff" stopOpacity="0.4" />
                  <stop offset="50%" stopColor="#a78bfa" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#00F5D4" stopOpacity="1" />
                </linearGradient>
              </defs>
              {/* Sparkline Path ($800 -> $1050 -> $1400) Mapped: 800=40(base), 1050=22.5, 1400=0(top) */}
              <path d="M 0 40 L 50 22.5 L 100 0" fill="none" stroke="url(#publicChartGradient)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="drop-shadow-[0_0_6px_rgba(0,245,212,0.6)]" />
              <circle cx="0" cy="40" r="3" fill="#4c84ff" />
              <circle cx="50" cy="22.5" r="3" fill="#a78bfa" />
              <circle cx="100" cy="0" r="4" fill="#00F5D4" className="animate-pulse shadow-[0_0_10px_#00F5D4]" />
            </svg>
            {/* Labels */}
            <div className="absolute left-0 -bottom-6 text-[8px] font-mono text-gray-500 text-center text-shadow-sm">2024<br/>$800/sqm</div>
            <div className="absolute left-1/2 transform -translate-x-1/2 -bottom-6 text-[8px] font-mono text-gray-400 text-center text-shadow-sm">2026<br/>$1,050/sqm</div>
            <div className="absolute right-0 -top-6 text-[9px] font-medium tracking-tight font-mono text-[#00F5D4] bg-[#00F5D4]/10 border border-[#00F5D4]/30 px-1.5 py-0.5 rounded shadow-[0_0_8px_rgba(0,245,212,0.3)] text-center">Proj 2028<br/>$1,400/sqm</div>
        </div>
      </div>

      {/* Ministerial Node Verification */}
      <div className="bg-emerald-900/20 border border-emerald-500/50 p-4 rounded-md flex items-center justify-center gap-4 animate-in fade-in duration-1000 shadow-[0_0_20px_rgba(16,185,129,0.1)]">
        <span className="text-3xl drop-shadow-[0_0_12px_#10B981] animate-pulse">✅</span>
        <div>
          <h3 className="text-[11px] uppercase font-medium tracking-tight text-emerald-400 tracking-widest border-b border-emerald-500/30 pb-0.5 inline-block">Ministerial Node 08</h3>
          <p className="text-[10px] text-emerald-300/80 font-mono mt-1">Status: SYN-DEED Verified</p>
        </div>
      </div>
    </div>
  );
}
