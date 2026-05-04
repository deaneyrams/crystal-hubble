'use client';

import React from 'react';
import { motion } from 'framer-motion';
import GlobalHeader from '@/components/GlobalHeader';
import GlobalFooter from '@/components/GlobalFooter';

export default function AboutPage() {
  return (
    <div className="bg-syntry-obsidian text-white min-h-screen selection:bg-[#B8FF3C] selection:text-black">
      <GlobalHeader />
      
      {/* 1. Hero Section: The Radical Transparency */}
      <section className="pt-48 pb-20 px-6 max-w-7xl mx-auto text-center border-b border-white/5">
        <motion.h2 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-[#b8ff3c] font-mono text-xs tracking-[0.4em] uppercase mb-8"
        >
          The Syntry Sovereign Vision
        </motion.h2>
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-6xl md:text-[120px] font-head font-medium tracking-tight tracking-tighter leading-[0.8] uppercase mb-12"
        >
          WE BUILD THE <br/>
          <span className="text-white/20 italic">GROUND TRUTH.</span>
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-xl md:text-2xl text-white/40 max-w-3xl mx-auto leading-relaxed font-body uppercase tracking-widest italic"
        >
          Ending Land Litigation. Forever. <br/>
          Syntry isn't just a marketplace. It is the first <strong>Ministerial-Grade Asset Node</strong> designed to protect the wealth of every Ghanaian.
        </motion.p>
      </section>

      {/* 2. THE PROBLEM NARRATIVE (The "Why") */}
      <section className="py-32 px-6 max-w-5xl mx-auto text-center">
         <div className="space-y-12">
            <h3 className="text-4xl font-head font-medium tracking-tight uppercase tracking-tight">The Failure of Trust</h3>
            <div className="text-white/50 text-lg md:text-xl leading-relaxed space-y-8 font-body">
               <p>For too long, owning land in Ghana felt like a gamble. We saw families lose their lifetime savings and investors lose their confidence due to opaque documentation and double mapping.</p>
               <p>Syntry was born to end the chaos. We didn't just build a platform; we built a <strong>Protocol for Truth</strong>. We replace legal uncertainty with mathematical and statutory precision.</p>
            </div>
         </div>
      </section>

      {/* 3. FOUNDER SECTION: THE PULSE */}
      <section className="py-32 border-y border-white/5 bg-white/[0.01] relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#B8FF3C]/5 blur-[200px] rounded-md pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-20 items-center relative z-10">
           <motion.div 
             initial={{ opacity: 0, x: -20 }}
             whileInView={{ opacity: 1, x: 0 }}
             className="aspect-[4/5] bg-[#111118] rounded-[48px] overflow-hidden grayscale hover:grayscale-0 transition-all duration-1000 border border-white/5 shadow-2xl relative group"
           >
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
              {/* Image: Eyram Abusah would go here. Using a high-fidelity placeholder style */}
              <div className="absolute inset-0 flex flex-col items-center justify-center border-2 border-dashed border-white/5 rounded-[48px]">
                 <span className="text-[10px] font-mono text-white/10 uppercase tracking-[10px]">Founder Profile</span>
              </div>
              <div className="absolute bottom-10 left-10">
                 <div className="text-[9px] font-mono text-[#B8FF3C] uppercase tracking-[4px] mb-2 font-medium tracking-tight">Authorized Signature</div>
                 <div className="text-3xl font-serif italic text-white/80 tracking-widest px-4 py-2 border-l-2 border-[#B8FF3C]">Eyram Abusah</div>
              </div>
           </motion.div>
           
           <div className="space-y-10">
              <motion.h3 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="text-4xl lg:text-5xl font-head font-medium tracking-tight tracking-tight leading-[1.1]"
              >
                "WE ARE BUILDING A NATION WHERE A <span className="text-[#B8FF3C]">DEED</span> IS AS GOOD AS <span className="text-[#B8FF3C]">GOLD.</span>"
              </motion.h3>
              
              <div className="text-white/40 text-lg leading-relaxed space-y-6 font-body">
                <p>I founded the Syntry Sovereign because I saw a broken system. Families were being cheated, and banks were afraid to lend. We decided to use LiDAR drones, blockchain logic, and statutory law to create a <strong>Sovereign Exchange</strong>.</p>
                <p>Property is the foundation of wealth. If the foundation is in doubt, the wealth is a shadow. We are turning shadows into Sovereign Assets.</p>
              </div>
              
              <div>
                <p className="font-head text-3xl font-medium tracking-tight text-white uppercase tracking-widest">Eyram Abusah</p>
                <p className="text-[#b8ff3c] font-mono text-[10px] uppercase tracking-[5px] font-medium tracking-tight">Founder & CEO, Syntry / Syntry Sovereign</p>
              </div>
           </div>
        </div>
      </section>

      {/* 4. THE NODES OF EXECUTION (Ecosystem) */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto text-center mb-20">
           <h2 className="text-5xl font-head font-medium tracking-tight uppercase tracking-tight mb-4">The Execution <span className="text-[#B8FF3C]">Nodes</span></h2>
           <p className="text-white/20 font-mono text-[10px] uppercase tracking-[8px]">The Full-Stack Nation Architecture</p>
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { 
              node: "Syntry Estates (The Builders)", 
              icon: "🏗️", 
              desc: "The architecture node. Turning verified land into modern living spaces with sustainable, high-fidelity design." 
            },
            { 
              node: "Syntry Edge (The Intelligence)", 
              icon: "🛰️", 
              desc: "Building the software, 3D maps, and LiDAR drone protocols that make every asset visible from anywhere in the world." 
            },
            { 
              node: "Syntry Smart (The Security)", 
              icon: "🛡️", 
              desc: "Connecting the land to the internet. 24/7 autonomous monitoring and biometric coordinate locking." 
            }
          ].map((node, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-[#111118] border border-white/5 p-12 rounded-[48px] hover:border-[#B8FF3C]/20 transition-all group"
            >
              <div className="text-4xl mb-8 group-hover:scale-110 transition-transform">{node.icon}</div>
              <h3 className="text-2xl font-head font-medium tracking-tight text-white mb-4 uppercase tracking-widest">{node.node}</h3>
              <p className="text-sm text-white/30 leading-relaxed font-body group-hover:text-white/60 transition-colors">
                {node.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 5. INVESTOR DATA GRID: RADICAL TRANSPARENCY */}
      <section className="py-40 px-6 bg-[#0A0A10] border-y border-white/5 relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10 text-center">
           <h2 className="text-5xl font-head font-medium tracking-tight uppercase tracking-tight mb-20">Transparency <span className="text-[#B8FF3C]">Report.</span></h2>
           
           <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-32">
              {[
                { label: "Litigation Rate", value: "0.00%", change: "Post-Sync Audit" },
                { label: "Verification Speed", value: "< 48 HRS", change: "Lands Commission Handshake" },
                { label: "Diaspora Retention", value: "98%", change: "Capital Security Score" }
              ].map((stat, i) => (
                <div key={i} className="space-y-4">
                   <div className="text-[10px] font-mono text-white/20 uppercase tracking-[6px]">{stat.label}</div>
                   <div className="text-7xl font-head font-medium tracking-tight text-[#B8FF3C] glow-text-lime">{stat.value}</div>
                   <div className="text-[9px] font-mono text-white/40 uppercase tracking-[2px]">{stat.change}</div>
                </div>
              ))}
           </div>

           <div className="pt-20 border-t border-white/5 overflow-hidden">
              <div className="text-[10px] font-mono text-white/10 uppercase tracking-[10px] mb-12">Institutional Landing Nodes</div>
              <div className="flex flex-wrap justify-center gap-16 md:gap-32 opacity-40 grayscale hover:grayscale-0 transition-all duration-700">
                 {['ABSA', 'GCB', 'STANBIC', 'ECOBANK'].map(bank => (
                   <div key={bank} className="text-3xl font-head font-medium tracking-tight tracking-[4px] text-white/50">{bank}</div>
                 ))}
              </div>
           </div>
        </div>
      </section>

      {/* 6. THE INSTITUTIONAL BRIDGE */}
      <section className="py-40 px-6 text-center border-b border-white/5">
         <div className="max-w-4xl mx-auto space-y-12">
            <h2 className="text-4xl md:text-6xl font-head font-medium tracking-tight uppercase tracking-tight leading-[0.9]">
               Syntry is <span className="text-[#B8FF3C]">Open-Lending</span> <br/> Infrastructure.
            </h2>
            <p className="text-xl text-white/40 font-body leading-relaxed max-w-2xl mx-auto">
               We provide the <strong>Digital Deed</strong> that allows your bank to say 'Yes' to your mortgage in minutes, not months. We remove the risk so you can build your legacy.
            </p>
            <div className="pt-8 w-[1px] h-32 bg-gradient-to-b from-[#B8FF3C] to-transparent mx-auto" />
         </div>
      </section>

      <GlobalFooter />
      
      <style jsx global>{`
        .glow-text-lime {
          text-shadow: 0 0 15px rgba(184, 255, 60, 0.4);
        }
      `}</style>
    </div>
  );
}
