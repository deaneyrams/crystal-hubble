'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import GlobalHeader from '@/components/GlobalHeader';
import GlobalFooter from '@/components/GlobalFooter';

export default function PartnerDashboard() {
  const [activeTab, setActiveTab] = useState('listings');
  
  const stats = [
    { label: 'Total Views', value: '4.2k', change: '+12%' },
    { label: 'Leads Generated', value: '18', change: '+5' },
    { label: 'Verified Assets', value: '3', change: 'Live' },
    { label: 'Pending Audit', value: '1', change: 'Audit in progress', color: 'text-amber-500' }
  ];

  const myListings = [
    { id: 'vlt-08', name: 'Emerald Grove Plot B4', location: 'Pokuase', status: 'live', views: 840 },
    { id: 'vlt-09', name: 'Amasaman Commercial Block', location: 'Amasaman', status: 'pending', views: 0 },
  ];

  return (
    <div className="min-h-screen bg-[#0D1B2A] text-white selection:bg-[#B8FF3C] selection:text-black">
      <GlobalHeader />
      
      <header className="pt-32 pb-12 px-6 border-b border-white/5 bg-[#0C0C14]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-end gap-8">
          <div>
            <div className="text-[10px] uppercase font-mono tracking-[4px] text-[#B8FF3C] mb-4">Institutional Partner Portal</div>
            <h1 className="text-4xl md:text-6xl font-head font-black tracking-tighter uppercase leading-none">Partner <span className="text-white/20">Dashboard.</span></h1>
          </div>
          <div className="flex gap-4">
             <a href="/partner/onboarding" className="px-8 py-3 bg-[#B8FF3C] text-black font-head font-black uppercase tracking-widest text-[10px] rounded-xl shadow-xl hover:scale-105 active:scale-95 transition-all">
                + New Listing
             </a>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-12 px-6">
        {/* Performance Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((s, i) => (
            <div key={i} className="bg-[#162A3E]/50 border border-white/5 p-8 rounded-3xl">
              <p className="text-[10px] uppercase font-mono tracking-[2px] text-white/30 mb-2">{s.label}</p>
              <h2 className={`text-4xl font-head font-black tracking-tighter ${s.color || 'text-white'}`}>{s.value}</h2>
              <p className="text-[9px] font-mono text-white/20 uppercase mt-1 tracking-widest">{s.change}</p>
            </div>
          ))}
        </div>

        {/* Listings Terminal */}
        <div className="bg-[#162A3E]/30 rounded-[40px] border border-white/5 overflow-hidden">
          <div className="flex border-b border-white/5">
            {['listings', 'leads', 'analytics'].map(tab => (
              <button 
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-10 py-6 text-[10px] font-head font-black uppercase tracking-[4px] transition-all ${
                  activeTab === tab ? 'bg-white/5 text-[#B8FF3C] border-b-2 border-[#B8FF3C]' : 'text-white/30 hover:text-white'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
          
          <div className="p-8">
            <div className="space-y-4">
              {myListings.map((listing) => (
                <div key={listing.id} className="bg-black/20 border border-white/5 rounded-2xl p-6 flex flex-col md:flex-row justify-between items-center gap-6 hover:border-white/20 transition-all group">
                  <div className="flex items-center gap-6 w-full md:w-auto">
                    <div className="w-16 h-16 bg-[#162A3E] rounded-xl border border-white/10 flex items-center justify-center text-2xl group-hover:bg-[#B8FF3C]/10 group-hover:border-[#B8FF3C]/30 transition-all">🏗️</div>
                    <div>
                       <h4 className="text-xl font-head font-black uppercase tracking-tight">{listing.name}</h4>
                       <p className="text-[10px] font-mono text-gray-500 uppercase">{listing.location} | ID: {listing.id}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-12 w-full md:w-auto justify-between">
                     <div className="text-center">
                        <p className="text-[8px] font-mono uppercase text-gray-500 mb-1">Views</p>
                        <p className="font-head font-black text-white">{listing.views}</p>
                     </div>
                     <div className="text-center">
                        <p className="text-[8px] font-mono uppercase text-gray-500 mb-1">Status</p>
                        <div className={`px-4 py-1.5 rounded-full text-[9px] font-mono uppercase font-black border ${
                          listing.status === 'live' 
                            ? 'bg-green-500/10 border-green-500/30 text-green-500' 
                            : 'bg-amber-500/10 border-amber-500/30 text-amber-500 animate-pulse'
                        }`}>
                          {listing.status === 'live' ? 'Live on Exchange' : 'Oracle Audit'}
                        </div>
                     </div>
                     <button className="p-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all">
                        <span className="text-xs">⚙️</span>
                     </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <GlobalFooter />
    </div>
  );
}
