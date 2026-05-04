'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GlobalHeader from '@/components/GlobalHeader';
import GlobalFooter from '@/components/GlobalFooter';

export default function PropertiesPage() {
  const [filter, setFilter] = useState('All');
  const [properties] = useState([
    { id: 'vlt-01', name: 'Amasaman Node', location: 'Amasaman', value: 45000, size: '70x100ft', type: 'Commercial', image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80' },
    { id: 'vlt-08', name: 'Emerald Grove', location: 'Pokuase', value: 85000, size: '80x100ft', type: 'Residential', image: 'https://images.unsplash.com/photo-1523217582562-09d0def993a6?auto=format&fit=crop&w=800&q=80' },
    { id: 'vlt-03', name: 'Agri-Expansion', location: 'Nsawam', value: 35000, size: '100x100ft', type: 'Residential', image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80' },
    { id: 'vlt-04', name: 'Premium Crest', location: 'East Legon Hills', value: 125000, size: '70x100ft', type: 'Residential', image: 'https://images.unsplash.com/photo-1600585154340-be6199f7a092?auto=format&fit=crop&w=800&q=80' },
    { id: 'vlt-05', name: 'Luxury Hillside', location: 'McCarthy Hills', value: 155000, size: '100x120ft', type: 'Residential', image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80' },
  ]);

  const filteredProperties = filter === 'All' ? properties : properties.filter(p => p.type === filter);

  return (
    <div className="min-h-screen bg-[#0D1B2A] text-white selection:bg-[#B8FF3C] selection:text-black">
      <GlobalHeader />
      
      {/* 1. Page Header */}
      <section className="pt-32 pb-16 border-b border-white/5 bg-[#0C0C14]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-12">
            <div>
              <div className="text-[10px] uppercase font-mono tracking-[4px] text-[#B8FF3C] mb-4">Sovereign Asset Exchange</div>
              <h1 className="text-5xl md:text-7xl font-head font-medium tracking-tight tracking-tighter uppercase leading-none">Marketplace <span className="text-white/20">Offerings.</span></h1>
            </div>
            <div className="flex flex-wrap gap-3">
              {['All', 'Residential', 'Commercial', 'Installment Plans'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`px-6 py-3 rounded-md text-[10px] font-mono uppercase tracking-[2px] border transition-all ${
                    filter === cat 
                      ? 'bg-[#B8FF3C] text-black border-[#B8FF3C] font-medium tracking-tight' 
                      : 'border-white/10 text-white/40 hover:border-white/30'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 2. Property Grid */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredProperties.map((plot) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  key={plot.id}
                  className="bg-[#162A3E] rounded-[32px] overflow-hidden border border-white/10 hover:border-[#B8FF3C]/30 transition-all flex flex-col h-full group"
                >
                  <div className="aspect-[4/3] overflow-hidden border-b border-white/5 relative">
                    <img 
                      src={plot.image} 
                      alt={plot.name} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 grayscale opacity-60 group-hover:opacity-100 group-hover:grayscale-0" 
                    />
                    <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-md px-3 py-1.5 rounded-md border border-white/10">
                       <span className="text-[8px] font-mono tracking-[2px] text-[#B8FF3C] uppercase">Active Node</span>
                    </div>
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <div className="mb-6">
                      <div className="text-[10px] uppercase font-mono tracking-[4px] text-white/30 mb-2">{plot.location}</div>
                      <h3 className="text-xl font-head font-medium tracking-tight text-white leading-tight uppercase tracking-tighter">{plot.name}</h3>
                      <p className="text-[10px] font-mono text-gray-500 uppercase mt-1">{plot.size} | {plot.type}</p>
                    </div>
                    
                    <div className="mt-auto space-y-6">
                       <div className="flex justify-between items-end border-t border-white/5 pt-4">
                          <div>
                             <div className="text-[8px] uppercase tracking-widest text-[#B8FF3C] mb-1 font-mono">Vault Entrance</div>
                             <div className="text-2xl font-head font-medium tracking-tight tracking-tighter">GH₵{plot.value.toLocaleString()}</div>
                          </div>
                          <div className="text-right">
                             <div className="text-[8px] uppercase tracking-widest text-white/20 mb-1 font-mono">Status</div>
                             <div className="text-[10px] font-mono text-white/60">Verified</div>
                          </div>
                       </div>
                       <button className="w-full py-4 bg-[#B8FF3C] text-black font-head font-medium tracking-tight text-[10px] uppercase tracking-[4px] rounded-md hover:scale-105 active:scale-95 transition-all shadow-[0_15px_30px_rgba(184,255,60,0.2)]">
                          View Plot Details →
                       </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      <GlobalFooter />
    </div>
  );
}
