"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function DevelopersPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  return (
    <div className="min-h-screen bg-[#0C0C14] text-white selection:bg-[#B8FF3C] selection:text-[#0C0C14] font-sans pb-32">
      {/* Grid Backdrop */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.02]" 
           style={{ backgroundImage: `linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)`, backgroundSize: '120px 120px' }} />

      <header className="relative pt-32 pb-24 px-6 md:px-12 border-b border-white/5 overflow-hidden">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#B8FF3C]/5 blur-[150px] rounded-full pointer-events-none opacity-50" />
        <div className="max-w-7xl mx-auto relative z-10 text-center lg:text-left">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="inline-flex items-center gap-3 mb-8"
          >
            <div className="w-6 h-[1px] bg-[#B8FF3C]" />
            <span className="font-mono text-[0.6rem] tracking-[4px] text-[#B8FF3C] uppercase">Developer Node</span>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-head text-[4rem] md:text-[7rem] leading-none uppercase tracking-[2px] mb-8"
          >
            Elevate Your Project to <br /> <span className="text-[#B8FF3C]">Sovereign Status.</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-white/40 text-xl md:text-2xl font-serif italic max-w-3xl leading-relaxed"
          >
            "Join the exchange. Unlock access to global Diaspora capital by providing the world's highest standard of land verification."
          </motion.p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-24 px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-24 items-start relative z-10">
        
        {/* Institutional Comparison Table */}
        <div className="space-y-12">
          <div className="space-y-4">
            <h2 className="font-head text-3xl uppercase tracking-[2px]">Market Node Listing</h2>
            <p className="text-white/30 text-sm leading-relaxed max-w-md">Institutional benefits of synchronizing your inventory with the SYNTRY Unified Exchange.</p>
          </div>
          
          <div className="border border-white/5 bg-[#0F1420] rounded-2xl overflow-hidden shadow-2xl">
            <table className="w-full text-left font-mono text-[0.65rem] uppercase tracking-widest">
              <thead>
                <tr className="bg-white/5 border-b border-white/5 text-[#B8FF3C]">
                  <th className="px-8 py-6">Feature Node</th>
                  <th className="px-8 py-6">Traditional</th>
                  <th className="px-8 py-6">SYNTRY UNIFIED</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-white/40">
                <tr className="hover:bg-white/5 transition-colors group">
                  <td className="px-8 py-6 text-white group-hover:text-[#B8FF3C]">Verification</td>
                  <td className="px-8 py-6">Paper-Based</td>
                  <td className="px-8 py-6 text-[#B8FF3C] font-bold">Node 08 SYNC</td>
                </tr>
                <tr className="hover:bg-white/5 transition-colors group">
                  <td className="px-8 py-6 text-white group-hover:text-[#B8FF3C]">Capital Velocity</td>
                  <td className="px-8 py-6">Slow Settlement</td>
                  <td className="px-8 py-6 text-[#B8FF3C] font-bold">Insta-Vault Lock</td>
                </tr>
                <tr className="hover:bg-white/5 transition-colors group">
                  <td className="px-8 py-6 text-white group-hover:text-[#B8FF3C]">Market Access</td>
                  <td className="px-8 py-6">Local Lead Gen</td>
                  <td className="px-8 py-6 text-[#B8FF3C] font-bold">Global Diaspora</td>
                </tr>
                <tr className="hover:bg-white/5 transition-colors group">
                  <td className="px-8 py-6 text-white group-hover:text-[#B8FF3C]">Data Shield</td>
                  <td className="px-8 py-6">Manual Search</td>
                  <td className="px-8 py-6 text-[#B8FF3C] font-bold">End-to-End Enc.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Developer Onboarding Form */}
        <div className="bg-[#0F1420] border border-white/10 p-10 md:p-16 rounded-[40px] shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-[#B8FF3C]/5 blur-[80px]" />
          <h3 className="font-head text-3xl uppercase tracking-[2px] mb-12 relative z-10">Initialize <span className="text-[#B8FF3C]">Partner Node</span></h3>
          
          {!isSubmitted ? (
            <form className="space-y-8 relative z-10" onSubmit={(e) => { e.preventDefault(); setIsSubmitted(true); }}>
              <div className="space-y-3">
                <label className="font-mono text-[0.6rem] tracking-[4px] uppercase text-white/20">Entity Name</label>
                <input 
                  type="text" required placeholder="OFFICIAL COMPANY NAME"
                  className="w-full bg-[#0C0C14] border border-white/5 text-white py-5 px-6 outline-none focus:border-[#B8FF3C]/40 font-mono text-xs placeholder:text-white/10 transition-all" 
                />
              </div>
              <div className="space-y-3">
                <label className="font-mono text-[0.6rem] tracking-[4px] uppercase text-white/20">Authorization Email</label>
                <input 
                  type="email" required placeholder="partner@entity.com"
                  className="w-full bg-[#0C0C14] border border-white/5 text-white py-5 px-6 outline-none focus:border-[#B8FF3C]/40 font-mono text-xs placeholder:text-white/10 transition-all"
                />
              </div>
              <div className="space-y-3">
                <label className="font-mono text-[0.6rem] tracking-[4px] uppercase text-white/20">Project Acreage Target</label>
                <input 
                  type="text" required placeholder="E.G. 200 ACRES PRIMARY DEVELOPMENT"
                  className="w-full bg-[#0C0C14] border border-white/5 text-white py-5 px-6 outline-none focus:border-[#B8FF3C]/40 font-mono text-xs placeholder:text-white/10 transition-all"
                />
              </div>
              
              <button className="btn btn-primary w-full py-6 bg-[#B8FF3C] text-black font-head text-sm tracking-[4px] uppercase font-bold hover:bg-white transition-all transform hover:-translate-y-1">
                SUBMIT NODE APPLICATION →
              </button>
            </form>
          ) : (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-20 space-y-6"
            >
              <div className="text-5xl text-[#B8FF3C]">✓</div>
              <h4 className="font-head text-2xl uppercase tracking-[2px]">Application Queued.</h4>
              <p className="text-white/40 text-sm font-mono uppercase tracking-widest leading-loose">
                Initializing Node 08 Review. <br /> Our compliance team will reach out within 24 exchange hours.
              </p>
              <button 
                onClick={() => setIsSubmitted(false)}
                className="font-mono text-[0.6rem] tracking-[2px] text-[#B8FF3C] uppercase hover:underline"
              >
                Reset Application
              </button>
            </motion.div>
          )}
        </div>
      </main>

      <div className="w-full flex justify-center py-32">
        <div className="w-[1px] h-32 bg-gradient-to-b from-[#B8FF3C] to-transparent" />
      </div>
    </div>
  );
}
