"use client";
import React from 'react';
import { motion } from 'framer-motion';

export default function SovereignAccord() {
  return (
    <div className="min-h-screen bg-[#0C0C14] text-white selection:bg-[#B8FF3C] selection:text-[#0C0C14] font-sans pb-32">
      <div className="fixed inset-0 pointer-events-none opacity-[0.02]" 
           style={{ backgroundImage: `linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)`, backgroundSize: '100px 100px' }} />

      <header className="relative pt-32 pb-24 px-6 md:px-12 border-b border-white/5 overflow-hidden">
        <div className="max-w-4xl mx-auto relative z-10">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3 mb-8"
          >
            <div className="w-6 h-[1px] bg-[#B8FF3C]" />
            <span className="font-mono text-[0.6rem] tracking-[4px] text-[#B8FF3C] uppercase">Legal Node</span>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-head text-[4rem] md:text-[6rem] leading-none uppercase tracking-[2px] mb-8"
          >
            The Sovereign <br /> <span className="text-[#B8FF3C]">Accord.</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-white/40 text-xl font-serif italic max-w-2xl"
          >
            "Plain English terms for an institutional-grade land exchange. We replace legalese with mathematical certainty."
          </motion.p>
        </div>
      </header>

      <main className="max-w-4xl mx-auto py-24 px-6 md:px-12 space-y-24 relative z-10">
        <section className="space-y-8">
          <h2 className="font-head text-3xl uppercase tracking-[2px] text-[#B8FF3C]">01. The Vault Protocol</h2>
          <div className="text-white/60 leading-relaxed font-body space-y-6">
            <p><strong>Independent Escrow:</strong> Your funds are never held directly by developers. All capital enters the SYNTRY Unified Vault, managed by independent legal nodes.</p>
            <p><strong>Milestone Release:</strong> Capital is only disbursed to asset providers upon cryptographic proof of statutory registration milestones (e.g., Lands Commission barcoding).</p>
          </div>
        </section>

        <section id="refund-protocol" className="space-y-8 p-10 bg-[#0F1420] border border-[#B8FF3C]/20 rounded-[32px] shadow-2xl">
          <h2 className="font-head text-3xl uppercase tracking-[2px] text-[#B8FF3C]">02. The Refund Guarantee</h2>
          <div className="text-white/60 leading-relaxed font-body space-y-6">
            <p><strong>Sovereign Safety Net:</strong> If a property fails the physical ground-truth audit or the statutory title verification before the Indenture is generated, SYNTRY guarantees a <strong>100% refund</strong> of all deposited capital within 7 exchange days.</p>
            <p><strong>Automatic Reversion:</strong> In the event of a failed compliance check, the Vault Protocol automatically initiates the reversion of funds to the source account.</p>
          </div>
        </section>

        <section className="space-y-8">
          <h2 className="font-head text-3xl uppercase tracking-[2px] text-[#B8FF3C]">03. Digital Custody</h2>
          <div className="text-white/60 leading-relaxed font-body space-y-6">
            <p><strong>The Asset Bond:</strong> Every acquisition is paired with a Sovereign Asset Bond—a digital twin of your physical title, immutable and stored within the Exchange Ledger.</p>
            <p><strong>Verification Rights:</strong> You maintain 24/7 access to the LiDAR scan data and drone-view assets for any property held within your vault.</p>
          </div>
        </section>
      </main>

      <div className="w-full flex justify-center py-32">
        <div className="w-[1px] h-32 bg-gradient-to-b from-[#B8FF3C] to-transparent" />
      </div>
    </div>
  );
}
