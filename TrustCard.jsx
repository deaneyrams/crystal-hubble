import React, { useState, useEffect } from 'react';

const TrustCard = ({ status = 'Cleared' }) => {
  const [view3D, setView3D] = useState(false);
  const [score, setScore] = useState(0);
  const targetScore = 98;
  
  // Animate the Health Score on Mount
  useEffect(() => {
    const timer = setTimeout(() => setScore(targetScore), 500);
    return () => clearTimeout(timer);
  }, [targetScore]);

  const radius = 42;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className={`relative w-full max-w-[420px] backdrop-blur-xl bg-[rgba(11,18,33,0.8)] rounded-3xl p-7 font-['Inter',sans-serif] transition-all duration-700 hover:-translate-y-2 ${status === 'Cleared' ? 'border border-[#00F5D4]/60 shadow-[0_15px_40px_rgba(0,245,212,0.15)] hover:shadow-[0_20px_60px_rgba(0,245,212,0.25)]' : 'border border-gray-700'}`}>
      
      {/* Dynamic Glow Behind Card if Cleared */}
      {status === 'Cleared' && (
        <div className="absolute -inset-1 bg-gradient-to-r from-[#00F5D4]/20 to-[#00F5D4]/0 rounded-3xl blur-xl -z-10 opacity-50"></div>
      )}

      {/* Header Section: Verification Badge */}
      <div className="flex justify-between items-start mb-8">
        <div>
          <h2 className="text-white text-xl font-semibold tracking-tight">Syntry Property</h2>
          <p className="text-[#00F5D4] text-xs font-semibold mt-1.5 tracking-wider uppercase flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00F5D4] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00F5D4]"></span>
            </span>
            Verified 4 hours ago
          </p>
        </div>
        <div className={`px-3.5 py-1.5 rounded-full flex items-center gap-2 text-xs font-bold uppercase tracking-wider ${status === 'Cleared' ? 'bg-[#00F5D4]/10 text-[#00F5D4] shadow-[0_0_15px_rgba(0,245,212,0.15)] border border-[#00F5D4]/30' : 'bg-gray-800 text-gray-400'}`}>
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
          </svg>
          {status}
        </div>
      </div>

      {/* Trust-Signals: Health Score & Metric Grid */}
      <div className="flex gap-7 mb-7 pb-7 border-b border-white/10 items-center">
        
        {/* Syntry Health Score Ring */}
        <div className="relative flex items-center justify-center shrink-0 group">
          <svg className="transform -rotate-90 w-[100px] h-[100px]">
            <circle cx="50" cy="50" r={radius} stroke="rgba(255,255,255,0.05)" strokeWidth="8" fill="none" />
            <circle cx="50" cy="50" r={radius} stroke="#00F5D4" strokeWidth="8" fill="none" 
              strokeDasharray={circumference} 
              strokeDashoffset={strokeDashoffset} 
              className="transition-all duration-[1500ms] ease-out drop-shadow-[0_0_8px_rgba(0,245,212,0.5)]" strokeLinecap="round" />
          </svg>
          <div className="absolute flex flex-col items-center justify-center translate-y-0.5">
            <span className="font-['Space_Grotesk',sans-serif] text-[34px] font-bold text-white leading-none tracking-tighter">{score}</span>
            <span className="text-[9px] text-gray-400 font-semibold uppercase tracking-[0.2em] mt-1 -translate-x-0.5">Score</span>
          </div>
        </div>

        {/* Metric Grid (Topography, Legals, Scan Date) */}
        <div className="flex flex-col justify-center gap-3.5 w-full">
          <div className="flex justify-between items-center bg-white/[0.02] p-2 rounded-lg">
            <span className="text-gray-400 text-xs font-medium">Topography</span>
            <span className="text-white text-sm font-semibold">98% Match</span>
          </div>
          <div className="flex justify-between items-center bg-white/[0.02] p-2 rounded-lg">
            <span className="text-gray-400 text-xs font-medium">Legal Chain</span>
            <span className="text-[#00F5D4] text-sm font-semibold flex items-center gap-1.5">
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
              Verified
            </span>
          </div>
          <div className="flex justify-between items-center bg-white/[0.02] p-2 rounded-lg">
            <span className="text-gray-400 text-xs font-medium">Scan Date</span>
            <span className="text-white text-sm font-semibold">March 2026</span>
          </div>
        </div>
      </div>

      {/* Trust-Signal: Title Chain Audit Timeline */}
      <div className="mb-8 relative">
        <h3 className="text-white text-xs font-semibold uppercase tracking-widest mb-5">Title Chain Audit</h3>
        <div className="flex items-center justify-between relative px-2">
          {/* Connecting Track Line */}
          <div className="absolute left-6 right-6 top-2.5 h-[2px] bg-white/10 z-0"></div>
          {/* Active Track Line */}
          <div className="absolute left-6 right-[10%] top-2.5 h-[2px] bg-gradient-to-r from-[#00F5D4] to-[#00F5D4]/50 z-0 duration-1000 transition-all"></div>
          
          {/* Timeline Nodes */}
          <div className="flex flex-col items-center gap-2.5 z-10">
            <div className="w-5 h-5 rounded-full bg-[#0B1221] border-2 border-[#00F5D4] flex items-center justify-center shadow-[0_0_10px_rgba(0,245,212,0.3)]">
              <div className="w-2 h-2 rounded-full bg-[#00F5D4]"></div>
            </div>
            <span className="text-[10px] text-gray-300 font-medium">Govt Reg.</span>
          </div>
          <div className="flex flex-col items-center gap-2.5 z-10">
            <div className="w-5 h-5 rounded-full bg-[#0B1221] border-2 border-[#00F5D4] flex items-center justify-center shadow-[0_0_10px_rgba(0,245,212,0.3)]">
              <div className="w-2 h-2 rounded-full bg-[#00F5D4]"></div>
            </div>
            <span className="text-[10px] text-gray-300 font-medium">Stamped</span>
          </div>
          <div className="flex flex-col items-center gap-2.5 z-10">
            <div className="w-5 h-5 rounded-full bg-[#00F5D4] shadow-[0_0_15px_rgba(0,245,212,0.6)] flex items-center justify-center text-[#0B1221] border border-white/20">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
            </div>
            <span className="text-[10px] text-[#00F5D4] font-bold">Syntry Verified</span>
          </div>
        </div>
      </div>

      {/* Truth-Signal: Interactive Ground-Truth Toggle */}
      <button 
        onClick={() => setView3D(!view3D)}
        className="w-full relative overflow-hidden group bg-white/[0.03] border border-white/10 rounded-xl py-4 mb-6 hover:bg-white/10 transition-colors duration-300 flex items-center justify-center gap-2"
      >
        {/* Button Hover Glow Sweep */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#00F5D4]/15 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-[1500ms] ease-in-out"></div>
        <svg className={`w-5 h-5 text-[#00F5D4] transition-transform duration-500 ${view3D ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" />
        </svg>
        <span className="text-white text-[13px] font-semibold tracking-wide uppercase">{view3D ? 'Hide LiDAR Overlay' : 'View 3D Ground-Truth'}</span>
      </button>

      {/* 3D Mock Point Cloud / LiDAR Overlay Animation Area */}
      <div className={`overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] ${view3D ? 'h-[160px] opacity-100 mb-6' : 'h-0 opacity-0 mb-0'}`}>
        <div className="w-full h-full bg-[#050810] rounded-xl border border-[#00F5D4]/20 relative flex items-center justify-center overflow-hidden">
            {/* Perspective Grid for 3D Effect */}
            <div className="absolute inset-0" style={{ 
              background: 'linear-gradient(rgba(0,245,212,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(0,245,212,0.15) 1px, transparent 1px)', 
              backgroundSize: '20px 20px', 
              transform: 'rotateX(60deg) scale(2.5) translateY(-20px)', 
              perspective: '1000px',
              transformOrigin: 'top center'
            }}></div>
            
            {/* Animating Scan Line (relies on external keyframes) */}
            <div className="absolute w-full h-[2px] bg-[#00F5D4] shadow-[0_0_20px_2px_#00F5D4] opacity-70 animate-[scan_2_5s_linear_infinite]"></div>
            
            {/* 3D Target Center Reticle */}
            <div className="relative z-10 flex flex-col items-center gap-2">
               <div className="w-10 h-10 rounded-full bg-[#00F5D4]/10 border border-[#00F5D4]/40 flex items-center justify-center mb-1">
                  <svg className="w-5 h-5 text-[#00F5D4]/80 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
                  </svg>
               </div>
               <span className="text-[#00F5D4] font-['Space_Grotesk'] text-[11px] font-bold tracking-[0.3em] bg-[#050810]/80 px-4 py-1.5 rounded-full border border-[#00F5D4]/30 backdrop-blur-sm">RENDERING ELEVATION</span>
            </div>
        </div>
      </div>

      {/* Truth-Signal: Milestone Escrow Badge Footer */}
      <div className="bg-[#050810]/60 rounded-xl p-4.5 border border-[#00F5D4]/10 flex items-center gap-4 hover:border-[#00F5D4]/30 transition-colors duration-300">
        <div className="p-2.5 bg-[#00F5D4]/10 rounded-lg text-[#00F5D4] shadow-[0_0_15px_rgba(0,245,212,0.1)]">
          {/* Locked Vault Icon */}
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        </div>
        <div>
          <h4 className="text-white text-xs font-bold uppercase tracking-wider mb-1">Protected by Syntry-Vault</h4>
          <p className="text-gray-400 text-[12px] leading-relaxed">Funds held securely in escrow until legal handover is verified.</p>
        </div>
      </div>

    </div>
  );
};

export default TrustCard;
