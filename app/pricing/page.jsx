'use client';
import React from 'react';
import { motion } from 'framer-motion';

export default function PricingPage() {
  const tiers = [
    {
      name: "FREE",
      price: "0",
      features: ["Basic Property Search", "Statutory Checklist", "Mobile App Access"],
      cta: "Get Started",
      highlight: false
    },
    {
      name: "PREMIUM",
      price: "280",
      features: ["Full 8-Layer Audit", "MoMo Rent Automated", "Tax-Ready Reports", "Priority Support"],
      cta: "Verify My Land",
      highlight: true
    },
    {
      name: "ENTERPRISE",
      price: "Custom",
      features: ["Bulk Verification", "API Access", "Institutional Dashboard", "Dedicated Node"],
      cta: "Contact Sales",
      highlight: false
    }
  ];

  return (
    <div className="min-h-screen bg-[#050508] text-white pt-48 pb-20 px-6">
      <div className="max-w-7xl mx-auto text-center">
        <h1 className="text-5xl md:text-7xl font-bold mb-6">Institutional <span className="text-[#1D9E75]">Pricing.</span></h1>
        <p className="text-white/40 text-xl max-w-2xl mx-auto mb-20">Transparent verification fees for local owners and the Diaspora.</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          {tiers.map((tier, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`glass-panel p-10 rounded-[40px] flex flex-col items-center ${tier.highlight ? 'border-[#1D9E75]/40 scale-105 bg-[#1D9E75]/5' : ''}`}
            >
              <div className="text-[10px] font-mono tracking-[4px] text-[#1D9E75] mb-4 uppercase">{tier.name}</div>
              <div className="text-6xl font-bold mb-8">
                {tier.price !== "Custom" && <span className="text-2xl align-top">GHS</span>}
                {tier.price}
                {tier.price !== "Custom" && <span className="text-lg text-white/20">/mo</span>}
              </div>
              <ul className="space-y-4 mb-12 text-left w-full">
                {tier.features.map((f, j) => (
                  <li key={j} className="flex items-center gap-3 text-white/60 text-sm">
                    <span className="text-[#1D9E75]">✓</span> {f}
                  </li>
                ))}
              </ul>
              <button className={`w-full py-4 rounded-xl font-bold uppercase tracking-widest text-sm transition-all ${tier.highlight ? 'bg-[#1D9E75] text-black hover:brightness-110' : 'border border-white/10 hover:bg-white/5'}`}>
                {tier.cta}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
