'use client';

import React from 'react';
import { motion } from 'framer-motion';
import GlobalHeader from '@/components/GlobalHeader';
import GlobalFooter from '@/components/GlobalFooter';

const MortgagePage = () => {
  return (
    <div className="bg-[#050508] text-white min-h-screen font-sans selection:bg-[#B8FF3C] selection:text-black">
      <GlobalHeader />
      
      {/* 1. Hero Section: Strategic Promise */}
      <section className="relative pt-48 pb-24 lg:pt-56 lg:pb-32 overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #FFFFFF 1px, transparent 0)', backgroundSize: '100px 100px' }}></div>
        
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <motion.span 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-block px-6 py-2 bg-black/40 backdrop-blur-2xl border border-[#B8FF3C]/20 rounded-full text-[10px] font-mono tracking-[4px] text-[#B8FF3C] uppercase mb-8"
          >
            Syntry Open-Lending Protocol
          </motion.span>
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-8xl font-head font-black tracking-tight leading-[0.85] uppercase mb-10"
          >
            Own Your Home. <br/>
            <span className="text-white/40 italic">Your Bank. Our Security.</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-2xl text-white/40 max-w-2xl mx-auto mb-16 font-mono uppercase tracking-widest leading-relaxed"
          >
            We've removed the risk from property ownership. Your preferred bank can now lend with total confidence, because Syntry guarantees the asset identity.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row justify-center gap-6"
          >
            <button className="px-12 py-6 bg-[#B8FF3C] text-black font-head font-black uppercase tracking-[4px] text-xs rounded-xl hover:scale-105 active:scale-95 transition-all shadow-[0_20px_40px_rgba(184,255,60,0.2)]">
              Check My Eligibility
            </button>
            <button className="px-12 py-6 border border-white/10 text-white font-head font-black uppercase tracking-[4px] text-xs rounded-xl hover:bg-white/5 transition-all">
              Partner with Us (For Banks)
            </button>
          </motion.div>
        </div>
      </section>

      {/* 2. The Three Pillars: Institutional Reliability */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {[
            { 
              icon: "🤝", 
              title: "Total Portability", 
              desc: "Already have an account with ABSA, GCB, or Stanbic? Syntry connects directly to them. You choose the bank; we provide the architectural safety." 
            },
            { 
              icon: "🛡️", 
              title: "Vault Security", 
              desc: "Capital remains in a protected digital vault. It is only released to the asset provider upon cryptographic proof that the deed is registered in your name." 
            },
            { 
              icon: "⚡", 
              title: "Instant Verification", 
              desc: "No more multi-month title search. Our Digital Witnesses scan statutory archives in milliseconds, accelerating your mortgage approval node." 
            }
          ].map((pillar, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-[#111118] border border-white/5 p-12 rounded-[40px] hover:border-[#B8FF3C]/20 transition-all group"
            >
              <div className="text-4xl mb-8 group-hover:scale-110 transition-transform">{pillar.icon}</div>
              <h3 className="text-2xl font-head font-black text-white mb-4 uppercase tracking-widest">{pillar.title}</h3>
              <p className="text-sm text-white/30 leading-relaxed font-body group-hover:text-white/60 transition-colors">
                {pillar.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 3. Investor Focus: Scarcity Intelligence */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto bg-[#111118] border border-white/5 rounded-[60px] p-12 lg:p-24 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#B8FF3C]/5 blur-[200px] rounded-full pointer-events-none" />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center relative z-10">
            <div>
              <h2 className="text-4xl md:text-6xl font-head font-black uppercase mb-10 tracking-tight leading-[0.9]">
                Why Institutional <br/> Capital loves <br/> <span className="text-[#B8FF3C]">Syntry.</span>
              </h2>
              <ul className="space-y-10">
                {[
                  { num: "01", title: "Eliminated Litigation", desc: "We only issue bonds for land with a 100% clean history. Zero historical court cases, audited via Node 08." },
                  { num: "02", title: "Global Liquidity", desc: "Your home is a 'Sovereign Asset Bond'. It is a liquid security that can be leveraged or fractionalized globally." },
                  { num: "03", title: "Drone-Scan Transparency", desc: "Access 24/7 LiDAR and GIS asset monitoring from your dashboard. Absolute ground-truth visibility." }
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-6 group">
                    <span className="text-xl font-head font-black text-[#B8FF3C] opacity-40 group-hover:opacity-100 transition-opacity mt-1">{item.num}</span>
                    <div>
                      <h4 className="text-lg font-head font-black text-white uppercase tracking-widest mb-1">{item.title}</h4>
                      <p className="text-sm text-white/30 leading-relaxed group-hover:text-white/60 transition-colors">{item.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="relative">
               <motion.div 
                 whileHover={{ scale: 1.02 }}
                 className="relative border border-white/10 p-10 lg:p-16 rounded-[48px] bg-black/40 backdrop-blur-3xl shadow-2xl overflow-hidden group"
               >
                  <div className="scanline-container absolute inset-0 opacity-10" />
                  
                  <div className="flex justify-between items-center mb-8">
                    <span className="text-[10px] text-white/30 uppercase tracking-[4px] font-mono">Asset Pulse</span>
                    <div className="verified-badge">VERIFIED 100%</div>
                  </div>
                  
                  <div className="space-y-12">
                     <div className="space-y-4">
                        <div className="flex justify-between items-end">
                           <div className="text-[10px] font-mono uppercase text-white/20 tracking-[4px]">Location Node</div>
                           <div className="text-2xl font-head font-black uppercase tracking-widest">Pokuase Hills</div>
                        </div>
                        <div className="h-1 bg-white/5 w-full rounded-full overflow-hidden">
                           <motion.div 
                             initial={{ width: 0 }}
                             whileInView={{ width: '100%' }}
                             transition={{ duration: 1.5, ease: "easeOut" }}
                             className="h-full bg-[#B8FF3C] shadow-[0_0_10px_#B8FF3C]" 
                           />
                        </div>
                     </div>

                     <div className="grid grid-cols-2 gap-12 border-t border-white/5 pt-10">
                        <div>
                           <div className="text-[8px] font-mono text-white/20 uppercase tracking-[4px] mb-2">Annual Growth</div>
                           <div className="text-3xl font-head font-black text-[#B8FF3C]">+18.4%</div>
                        </div>
                        <div>
                           <div className="text-[8px] font-mono text-white/20 uppercase tracking-[4px] mb-2">Asset Type</div>
                           <div className="text-[11px] font-mono uppercase text-white/60">Residential Bond</div>
                        </div>
                     </div>
                  </div>
               </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Strategic CTA */}
      <section className="py-40 px-6 text-center border-t border-white/5 bg-black relative">
        <h2 className="text-4xl md:text-6xl font-head font-black uppercase mb-12 tracking-tight">Ready to build your <br/> <span className="text-[#B8FF3C]">Sovereign Legacy?</span></h2>
        <button className="px-16 py-7 bg-white text-black font-head font-black tracking-[4px] uppercase text-sm rounded-xl shadow-2xl shadow-white/5 hover:bg-[#B8FF3C] transition-all hover:scale-105 active:scale-95">
          Join the Protocol node
        </button>
      </section>

      <GlobalFooter />
      
      <style jsx global>{`
        .scanline-container {
          position: relative;
          overflow: hidden;
        }

        .scanline-container::after {
          content: "";
          position: absolute;
          top: -100%;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            to bottom,
            transparent 0%,
            rgba(184, 255, 60, 0.05) 50%,
            transparent 100%
          );
          animation: scan 4s linear infinite;
          pointer-events: none;
        }

        @keyframes scan {
          from { top: -100%; }
          to { top: 100%; }
        }

        .verified-badge {
          background: rgba(184, 255, 60, 0.1);
          border: 1px solid rgba(184, 255, 60, 0.3);
          color: #B8FF3C;
          font-family: inherit;
          font-size: 8px;
          text-transform: uppercase;
          padding: 6px 12px;
          letter-spacing: 2px;
          font-weight: 900;
        }
      `}</style>
    </div>
  );
};

export default MortgagePage;
