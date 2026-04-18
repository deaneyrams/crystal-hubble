"use client";
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function TrustCard({ transaction, isCleared, isReserved }) {
  const [view3D, setView3D] = useState(false);
  const [displayScore, setDisplayScore] = useState(0);
  
  const healthScore = isCleared ? 98 : isReserved ? 50 : 0;
  
  let status = 'Pending';
  if (isReserved || transaction?.status === 'escrowed') status = transaction?.status === 'escrowed' ? 'Gold (Escrowed)' : 'Reserved';
  if (isCleared) status = 'Cleared for Transfer';

  let escrowStatus = 'Locked';
  if (isReserved || transaction?.status === 'escrowed') escrowStatus = transaction?.status === 'escrowed' ? 'Escrowed (70% Paid)' : 'Awaiting Audit';
  if (isCleared) escrowStatus = 'Funds Ready';

  const escrowMsg = isCleared 
    ? 'Escrow conditions met. Ready for legal handover.' 
    : (isReserved || transaction?.status === 'escrowed')
    ? '2026 Reform Compliant: 70% Premium Secured. Awaiting Ministerial Oversight ID.' 
    : 'Protected indefinitely by Syntry-Vault.';

  useEffect(() => {
    let startTimestamp = null;
    let animationFrameId;

    const animateScore = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / 1000, 1); 
      
      setDisplayScore(Math.floor(progress * healthScore));
      
      if (progress < 1) animationFrameId = requestAnimationFrame(animateScore);
      else setDisplayScore(healthScore);
    };

    animationFrameId = requestAnimationFrame(animateScore);
    return () => cancelAnimationFrame(animationFrameId);
  }, [healthScore]);

  useEffect(() => {
     if (isReserved && !isCleared) {
         import('canvas-confetti').then((confetti) => {
             confetti.default({
                particleCount: 100, spread: 60, origin: { y: 0.6 },
                colors: ['#B8FF3C', '#FFFFFF']
             });
         });
     }
  }, [isReserved, isCleared]);

  const radius = 42;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (displayScore / 100) * circumference;

  const currentGlowColor = isCleared ? '#B8FF3C' : isReserved ? '#D4AF37' : '#FFFFFF30';

  return (
    <div className={`relative w-full max-w-[420px] bg-[#0C0C14] border border-white/5 rounded-2xl p-8 transition-all duration-700 mx-auto group
      ${isCleared ? 'border-[#B8FF3C]/30 shadow-[0_20px_40px_rgba(184,255,60,0.05)]' 
        : isReserved ? 'border-[#D4AF37]/30 shadow-[0_20px_40px_rgba(212,175,55,0.05)]' 
        : ''}`}>
      
      {/* Brand Header */}
      <div className="flex justify-between items-start mb-10">
        <div className="space-y-1">
          <h2 className="text-white font-head text-2xl tracking-[1px] uppercase">Sovereign Asset</h2>
          <div className="flex items-center gap-2">
            <span className={`w-1.5 h-1.5 rounded-full ${isCleared ? 'bg-[#B8FF3C] animate-pulse shadow-[0_0_8px_#B8FF3C]' : 'bg-white/20'}`} />
            <p className="font-mono text-[8px] tracking-[3px] text-white/40 uppercase">
              Node 08 {isCleared ? 'Synchronized' : 'Monitoring'}
            </p>
          </div>
        </div>
        <div className={`px-4 py-1.5 rounded-full border font-mono text-[8px] font-bold uppercase tracking-[3px] transition-all 
            ${isCleared ? 'bg-[#B8FF3C]/10 text-[#B8FF3C] border-[#B8FF3C]/20' 
            : isReserved ? 'bg-[#D4AF37]/10 text-[#D4AF37] border-[#D4AF37]/20' 
            : 'bg-white/5 text-white/20 border-white/5'}`}>
          {status}
        </div>
      </div>

      {/* Trust Meter Zone */}
      <div className="flex flex-col md:flex-row gap-8 mb-10 items-center justify-between">
        <div className="relative flex items-center justify-center shrink-0">
          <svg className="transform -rotate-90 w-[120px] h-[120px]">
            <circle cx="60" cy="60" r="50" stroke="rgba(255,255,255,0.03)" strokeWidth="6" fill="none" />
            <circle cx="60" cy="60" r="50" stroke={currentGlowColor} strokeWidth="6" fill="none" 
              strokeDasharray={314.159} 
              strokeDashoffset={314.159 - (displayScore / 100) * 314.159} 
              className="transition-all duration-100 ease-linear drop-shadow-[0_0_12px_currentColor]" strokeLinecap="round" />
          </svg>
          <div className="absolute flex flex-col items-center justify-center">
            <span className="font-head text-[42px] text-white leading-none tracking-tight">{displayScore}%</span>
            <span className="font-mono text-[7px] text-white/20 uppercase tracking-[4px] mt-1">Trust</span>
          </div>
        </div>

        <div className="flex-1 w-full space-y-3">
          {[
            { label: 'Ground-Truth Match', val: transaction?.lidar_hash ? 'VERIFIED' : 'PENDING' },
            { label: 'Statutory Chain', val: transaction?.deed_check_passed ? 'VERIFIED' : 'PENDING' },
            { label: 'Map Node Sync', val: transaction?.gps_boundary_verified ? 'ACTIVE' : 'PENDING' }
          ].map((item, i) => (
            <div key={i} className="flex justify-between items-center bg-white/[0.02] p-4 rounded-lg border border-white/5">
              <span className="font-mono text-[7px] text-white/40 uppercase tracking-[2px]">{item.label}</span>
              <span className={`font-mono text-[8px] font-bold tracking-[1px] ${item.val === 'PENDING' ? 'text-white/20' : 'text-[#B8FF3C]'}`}>{item.val}</span>
            </div>
          ))}
        </div>
      </div>

      {/* LiDAR Interaction */}
      <button 
        onClick={() => setView3D(!view3D)}
        className="w-full bg-white/5 border border-white/5 rounded-lg py-5 px-6 group hover:bg-[#B8FF3C]/5 hover:border-[#B8FF3C]/20 transition-all flex items-center justify-between"
      >
        <span className="font-mono text-[9px] text-white/40 group-hover:text-white uppercase tracking-[4px] transition-colors">
          {view3D ? 'Deactivate LiDAR' : 'Initialize 3D Verification'}
        </span>
        <span className="text-white/20 group-hover:text-[#B8FF3C]">→</span>
      </button>

      {/* 3D Visualizer Simulation */}
      <AnimatePresence>
        {view3D && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 160, opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden mt-6"
          >
            <div className="w-full h-full bg-[#050810] rounded-lg border border-[#B8FF3C]/20 relative overflow-hidden flex items-center justify-center">
                <div className="absolute inset-0" style={{ 
                  background: 'linear-gradient(rgba(184,255,60,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(184,255,60,0.1) 1px, transparent 1px)', 
                  backgroundSize: '24px 24px', 
                  transform: 'rotateX(60deg) scale(2.5) translateY(-30px)', perspective: '1200px', transformOrigin: 'top center'
                }}></div>
                <div className="absolute w-full h-[1px] bg-[#B8FF3C] shadow-[0_0_15px_#B8FF3C] opacity-50 animate-scan"></div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Vault Status Information */}
      <div className={`mt-8 p-5 rounded-lg border transition-all duration-500 flex gap-5 items-center 
          ${isCleared ? 'bg-[#B8FF3C]/5 border-[#B8FF3C]/20' 
          : isReserved ? 'bg-[#D4AF37]/5 border-[#D4AF37]/20' 
          : 'bg-white/5 border-white/5'}`}>
        <div className={`p-4 rounded-lg transition-colors duration-500 
            ${isCleared ? 'bg-[#B8FF3C]/10 text-[#B8FF3C]' 
            : isReserved ? 'bg-[#D4AF37]/10 text-[#D4AF37]' 
            : 'bg-white/10 text-white/20'}`}>
          <svg className="w-6 h-6 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        </div>
        <div className="space-y-1">
          <h4 className={`font-mono text-[9px] font-bold uppercase tracking-[3px] ${isCleared ? 'text-[#B8FF3C]' : isReserved ? 'text-[#D4AF37]' : 'text-white/40'}`}>
            Vault {escrowStatus}
          </h4>
          <p className="text-white/40 text-[10px] leading-relaxed font-body">{escrowMsg}</p>
        </div>
      </div>
    </div>
  );
}
