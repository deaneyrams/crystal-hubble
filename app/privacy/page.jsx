"use client";
import React from 'react';
import { motion } from 'framer-motion';

export default function PrivacyPolicy() {
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
            <span className="font-mono text-[0.6rem] tracking-[4px] text-[#B8FF3C] uppercase">Data Shield Node</span>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-head text-[4rem] md:text-[6rem] leading-none uppercase tracking-[2px] mb-8"
          >
            Privacy <br /> <span className="text-[#B8FF3C]">Protocol.</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-white/40 text-xl font-serif italic max-w-2xl"
          >
            "How we shield your high-value assets with institutional-grade data security. Your identity remains your signature."
          </motion.p>
        </div>
      </header>

      <main className="max-w-4xl mx-auto py-24 px-6 md:px-12 space-y-24 relative z-10">
        <section className="space-y-8">
          <h2 className="font-head text-3xl uppercase tracking-[2px] text-[#B8FF3C]">01. End-to-End Vault Shield</h2>
          <div className="text-white/60 leading-relaxed font-body space-y-6">
            <p><strong>Secure Custody:</strong> Your personal data and sensitive documents are encrypted at the edge and stored in high-security, distributed nodes. Only those with verified biometric signatures can unlock them.</p>
            <p><strong>Privacy First:</strong> We do not sell your transactional data or property interest to third-party advertisers. Your wealth signals are visible and actionable only by you.</p>
          </div>
        </section>

        <section className="space-y-8 bg-[#0F1420] border border-white/5 p-10 rounded-[32px] shadow-2xl">
          <h2 className="font-head text-3xl uppercase tracking-[2px] text-[#B8FF3C]">02. Metadata Obfuscation</h2>
          <div className="text-white/60 leading-relaxed font-body space-y-6">
            <p><strong>The Cloak:</strong> While land ownership is statutory and publicly recordable, the metadata of your exploration, search history, and portfolio management is obfuscated via current industry encryption standards.</p>
            <p><strong>Node Access Only:</strong> Only verified Land Commission and Ministerial Nodes can access your statutory identity when triggered by a live transaction.</p>
          </div>
        </section>
      </main>

      <div className="w-full flex justify-center py-32">
        <div className="w-[1px] h-32 bg-gradient-to-b from-[#B8FF3C] to-transparent" />
      </div>
    </div>
  );
}
