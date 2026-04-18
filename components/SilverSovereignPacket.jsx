"use client";
import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

export default function UnifiedPacket({ assetName, stake, txHash, price }) {
  const [isFlipped, setIsFlipped] = useState(false);
  
  // Gyroscope / Mouse Tilt Effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { innerWidth, innerHeight } = window;
      const xPercent = (e.clientX / innerWidth) - 0.5;
      const yPercent = (e.clientY / innerHeight) - 0.5;
      x.set(xPercent);
      y.set(yPercent);
    };

    const handleDeviceMotion = (e) => {
      if (e.accelerationIncludingGravity) {
        const { x: accX, y: accY } = e.accelerationIncludingGravity;
        x.set(accX / 10);
        y.set(accY / 10);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    if (window.DeviceMotionEvent) {
      window.addEventListener('devicemotion', handleDeviceMotion);
    }
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('devicemotion', handleDeviceMotion);
    };
  }, [x, y]);

  return (
    <motion.div 
      style={{ rotateX: isFlipped ? 0 : rotateX, rotateY: isFlipped ? 180 : rotateY }}
      className="relative w-[90%] md:w-full max-w-[320px] aspect-[2/3] cursor-pointer [perspective:1000px] group mx-auto"
      onClick={() => setIsFlipped(!isFlipped)}
      transition={{ duration: 0.7 }}
    >
      <motion.div 
        className="relative w-full h-full transition-all duration-700 [transform-style:preserve-3d]"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
      >
        {/* FRONT SIDE - Platinum/Silver Branding */}
        <div className="absolute inset-0 w-full h-full [backface-visibility:hidden] rounded-[10px] overflow-hidden border border-[#B8FF3C]/30 shadow-[0_30px_60px_rgba(0,0,0,0.4)]">
           {/* Brushed Silver Background */}
           <div className="absolute inset-0 bg-neutral-100 bg-gradient-to-br from-neutral-50 via-neutral-200 to-neutral-300">
             <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent -translate-x-full animate-[chrome_5s_infinite] skew-x-12" />
           </div>
           
           {/* Pulsing Accent Frame */}
           <div className="absolute inset-4 border border-[#B8FF3C]/10 rounded-[4px] animate-pulse" />

           <div className="relative z-10 p-8 md:p-10 flex flex-col h-full text-[#0C0C14]">
              <div className="flex justify-between items-start mb-8 md:mb-10">
                 <div className="font-head text-[0.7rem] md:text-[0.8rem] tracking-[4px] uppercase font-bold text-black">Unified Packet</div>
                 <div className="border border-black/10 px-2 py-0.5 md:px-3 md:py-1 font-mono text-[6px] md:text-[7px] uppercase tracking-widest font-bold">SYNC_V2</div>
              </div>

              <div className="flex-1 space-y-8 md:space-y-10">
                 <div className="space-y-1">
                    <p className="font-mono text-[0.5rem] md:text-[0.55rem] font-bold uppercase tracking-[4px] opacity-40">Asset Node</p>
                    <h3 className="font-head text-2xl md:text-3xl uppercase tracking-[1px] leading-none text-black">{assetName || "Sector 07"}</h3>
                 </div>

                 <div className="bg-black/5 p-4 md:p-6 border border-black/5">
                    <p className="font-mono text-[0.5rem] md:text-[0.55rem] font-bold uppercase tracking-[4px] opacity-40 mb-2 md:mb-3">Equity Stake</p>
                    <div className="flex items-end gap-2 md:gap-3 mb-3 md:mb-4">
                       <span className="font-head text-4xl md:text-5xl leading-none text-black">{stake || "5"}%</span>
                       <span className="font-mono text-[7px] md:text-[8px] font-bold pb-1 text-[#B8FF3C] mix-blend-difference">ACQUIRED</span>
                    </div>
                    <div className="w-full h-[2px] bg-black/10 overflow-hidden">
                       <div className="h-full bg-black/40" style={{ width: `${stake || 5}%` }} />
                    </div>
                 </div>

                 <div className="space-y-3 md:space-y-4 pt-4 border-t border-black/5">
                    <div className="flex justify-between items-center opacity-60 text-black">
                       <span className="font-mono text-[0.5rem] md:text-[0.55rem] font-bold uppercase tracking-[3px]">Tier</span>
                       <span className="font-mono text-[0.5rem] md:text-[0.55rem] font-bold uppercase">FRACTIONAL_08</span>
                    </div>
                    <div className="flex justify-between items-center text-black">
                       <span className="font-mono text-[0.5rem] md:text-[0.55rem] font-bold uppercase tracking-[3px] opacity-60">Book Value</span>
                       <span className="font-head text-base md:text-lg">₵{price?.toLocaleString() || "1,200"}</span>
                    </div>
                 </div>
              </div>

              <div className="mt-8 flex justify-between items-center">
                 {/* Node 08 Compliance Stamp */}
                 <div className="w-12 h-12 md:w-14 md:h-14 rounded-full border border-black/20 flex flex-col items-center justify-center text-[#0C0C14] font-mono text-[5px] md:text-[6px] text-center rotate-[-15deg] uppercase leading-tight font-bold group-hover:rotate-0 transition-transform">
                    NODE 08<br/>SYNC
                 </div>
                 <div className="text-right space-y-1">
                    <p className="font-mono text-[5px] md:text-[6px] font-bold opacity-30">P_ID: {Math.floor(Math.random()*100000)}</p>
                    <p className="font-mono text-[5px] md:text-[6px] font-bold opacity-30">DATE: 2026-03-31</p>
                 </div>
              </div>
           </div>
        </div>

        {/* BACK SIDE - Obsidian Dashboard */}
        <div className="absolute inset-0 w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)] rounded-[10px] overflow-hidden bg-[#0C0C14] border border-[#B8FF3C]/40 p-8 md:p-10 flex flex-col">
           <div className="flex-1 space-y-8 md:space-y-12">
              <div>
                 <h4 className="text-[#B8FF3C] font-mono text-[0.6rem] tracking-[4px] uppercase mb-6 md:mb-8">Vault Security Log</h4>
                 <div className="space-y-3 md:space-y-4">
                    {[
                       { event: "Unified Handshake", status: "SUCCESS" },
                       { event: "Node 08 Multi-Sig", status: "VERIFIED" },
                       { event: "Escrow Finalization", status: "LOCKED" }
                    ].map((log, i) => (
                       <div key={i} className="flex justify-between items-center border-b border-white/5 pb-2 md:pb-3">
                          <span className="text-white/40 font-mono text-[8px] md:text-[10px] uppercase font-bold">{log.event}</span>
                          <span className="text-[#B8FF3C] font-mono text-[7px] md:text-[8px] font-bold italic">{log.status}</span>
                       </div>
                    ))}
                 </div>
              </div>

              <div className="space-y-3 md:space-y-4">
                 <h4 className="text-[#B8FF3C] font-mono text-[0.6rem] tracking-[4px] uppercase">Ledger Address</h4>
                 <div className="p-3 md:p-4 bg-white/5 border border-white/5 font-mono text-[8px] md:text-[9px] text-white/40 leading-relaxed font-bold break-all">
                    {txHash || "0X7D5E8A2B1C4F9A03E6D8B5C2A1F0E9D8C7B6A5A4"}
                 </div>
              </div>
           </div>

           <div className="mt-auto pt-6 md:pt-8 border-t border-white/5 text-center space-y-1 md:space-y-2">
              <p className="font-mono text-[0.55rem] md:text-[0.6rem] tracking-[4px] uppercase text-white/60">Institutional Bond</p>
              <p className="font-mono text-[5px] md:text-[6px] tracking-[2px] uppercase text-white/20">Immutable Exchange Record</p>
           </div>
        </div>
      </motion.div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes chrome {
          0% { transform: translateX(-150%) skewX(-20deg); }
          50% { transform: translateX(150%) skewX(-20deg); }
          100% { transform: translateX(150%) skewX(-20deg); }
        }
      `}} />
    </motion.div>
  );
}
