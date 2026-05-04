"use client";
import React, { useState } from 'react';
import GlobalHeader from '@/components/GlobalHeader';
import GlobalFooter from '@/components/GlobalFooter';

const AnalyticsDashboardPage = () => {
  const [timeRange, setTimeRange] = useState('90 Days');

  const kpis = [
    { label: "Total Portfolio Value", value: "GH₵4,872,000", trend: "+12.4%", desc: "vs last quarter" },
    { label: "Monthly Rent Collection", value: "GH₵28,450", trend: "+5.2%", desc: "Oct 2023" },
    { label: "Average APY", value: "14.8%", trend: "Sovereign Cap", desc: "Verified Assets" },
    { label: "Verified Properties", value: "4", trend: "100% Statutory", desc: "No Encumbrances" }
  ];

  const propertyPerformance = [
    { name: "Aburi Hills Plot 4", value: "GH₵3,250,000", rent: "N/A (Holding)", apy: "+18.2%", status: "Mortgage Ready" },
    { name: "Spintex Nodal Center", value: "GH₵850,000", rent: "GH₵4,200/mo", apy: "+12.5%", status: "Income Active" },
    { name: "East Legon Flat 4", value: "GH₵772,000", rent: "GH₵8,500/mo", apy: "+13.1%", status: "Income Active" }
  ];

  return (
    <div className="bg-[#0b100b] min-h-screen text-[#F8F1E3] font-sans">
      <GlobalHeader dark />

      <main className="pt-32 pb-20 px-4 md:px-8 max-w-7xl mx-auto">
        {/* Header Section */}
        <header className="mb-16 flex flex-col md:flex-row justify-between items-start md:items-center gap-8 border-b border-white/5 pb-12">
          <div>
            <div className="inline-flex items-center gap-2 mb-4 bg-[#D4AF37]/10 px-3 py-1 rounded-md border border-[#D4AF37]/20">
              <span className="w-1.5 h-1.5 bg-[#D4AF37] rounded-md animate-pulse"></span>
              <span className="text-[9px] font-medium uppercase tracking-[2px] text-[#D4AF37]">Premium Asset Audit</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-medium tracking-tight text-white mb-2">My Portfolio Performance</h1>
            <p className="text-sm opacity-50 font-medium italic">High-trust financial oversight of your sovereign wealth.</p>
          </div>
          <div className="flex gap-2 bg-white/5 p-1.5 rounded-md border border-white/10 self-stretch md:self-auto">
             {['30 Days', '90 Days', '1 Year', 'All Time'].map(range => (
               <button 
                 key={range}
                 onClick={() => setTimeRange(range)}
                 className={`flex-1 md:flex-none px-4 py-2 rounded-md text-[10px] font-medium uppercase tracking-widest transition-all ${timeRange === range ? 'bg-[#D4AF37] text-[#0F172A]' : 'hover:bg-white/5'}`}
               >
                 {range}
               </button>
             ))}
          </div>
        </header>

        {/* KPI Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {kpis.map((kpi, i) => (
            <div key={i} className="bg-white/5 border border-white/10 p-8 rounded-md shadow-sm hover:border-[#D4AF37]/30 transition-all">
               <p className="text-[10px] font-medium uppercase tracking-[2px] opacity-40 mb-4">{kpi.label}</p>
               <h3 className="text-2xl font-medium text-white mb-1 tracking-tight">{kpi.value}</h3>
               <div className="flex items-center gap-2">
                  <span className={`text-[10px] font-medium ${kpi.trend.startsWith('+') ? 'text-[#1D9E75]' : 'text-[#D4AF37]'}`}>{kpi.trend}</span>
                  <span className="text-[9px] opacity-30 font-medium">{kpi.desc}</span>
               </div>
            </div>
          ))}
        </div>

        {/* Charts Section Placeholder */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
           <div className="lg:col-span-2 bg-white/5 border border-white/10 p-10 rounded-[3rem] h-96 flex flex-col justify-between relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <h4 className="text-sm font-medium uppercase tracking-widest opacity-40 mb-10">Portfolio Value Projection</h4>
              <div className="flex-1 flex items-end gap-2 px-4 opacity-20">
                 {[40, 60, 45, 80, 55, 90, 70, 100].map((h, i) => (
                   <div key={i} style={{ height: `${h}%` }} className="flex-1 bg-[#D4AF37] rounded-t-lg transition-all transform hover:scale-y-110 origin-bottom"></div>
                 ))}
              </div>
              <p className="mt-8 text-[10px] font-medium uppercase tracking-widest text-[#D4AF37]">Aggregated Asset Appreciation Trend</p>
           </div>
           
           <div className="bg-syntry-obsidian border border-[#D4AF37]/20 p-10 rounded-[3rem] flex flex-col justify-between">
              <h4 className="text-sm font-medium uppercase tracking-widest opacity-40 mb-10 text-[#F8F1E3]">Income Distribution</h4>
              <div className="flex-1 flex items-center justify-center relative">
                 <div className="w-32 h-32 rounded-md border-[12px] border-[#D4AF37] border-r-transparent animate-spin-slow"></div>
                 <div className="absolute flex flex-col items-center">
                    <p className="text-xl font-medium text-[#D4AF37]">72%</p>
                    <p className="text-[8px] font-medium uppercase opacity-60">Rent Yield</p>
                 </div>
              </div>
              <div className="space-y-3 mt-8">
                 <div className="flex justify-between text-[10px] font-medium uppercase"><span className="opacity-50">Residential</span> <span>GH₵12,700</span></div>
                 <div className="flex justify-between text-[10px] font-medium uppercase"><span className="opacity-50">Industrial</span> <span>GH₵15,750</span></div>
              </div>
           </div>
        </div>

        {/* Performance Table */}
        <section className="mb-20">
          <h2 className="text-2xl font-medium mb-10">Asset Performance Grid</h2>
          <div className="bg-white/5 border border-white/10 rounded-[2.5rem] overflow-hidden">
             <div className="overflow-x-auto">
               <table className="w-full text-left border-collapse">
                 <thead>
                    <tr className="bg-white/5 text-[10px] font-medium uppercase tracking-widest opacity-40">
                      <th className="px-10 py-6">Asset Location</th>
                      <th className="px-10 py-6">Valuation</th>
                      <th className="px-10 py-6">Rent Yield (Mo)</th>
                      <th className="px-10 py-6">Performance vs Market</th>
                      <th className="px-10 py-6">Mortgage Status</th>
                    </tr>
                 </thead>
                 <tbody className="divide-y divide-white/5">
                   {propertyPerformance.map((p, i) => (
                      <tr key={i} className="hover:bg-white/[0.02] transition-colors group">
                        <td className="px-10 py-8">
                           <p className="text-sm font-medium group-hover:text-[#D4AF37] transition-all">{p.name}</p>
                           <p className="text-[9px] font-medium opacity-30 uppercase tracking-widest">Sovereign Vault ID: SX-8299</p>
                        </td>
                        <td className="px-10 py-8 text-sm font-medium">{p.value}</td>
                        <td className="px-10 py-8">
                           <p className="text-sm font-medium text-[#D4AF37]">{p.apy}</p>
                           <p className="text-[9px] font-medium opacity-40 uppercase">Benchmark: +12.1%</p>
                        </td>
                        <td className="px-10 py-8">
                           <span className="text-[9px] font-medium bg-[#1D9E75]/10 text-[#1D9E75] px-3 py-1.5 rounded-md uppercase tracking-tighter border border-[#1D9E75]/20">
                             {p.status}
                           </span>
                        </td>
                      </tr>
                   ))}
                 </tbody>
               </table>
             </div>
          </div>
        </section>

        {/* Action Bar */}
        <section className="bg-[#D4AF37] text-[#0F172A] p-12 md:p-16 rounded-[4rem] flex flex-col md:flex-row items-center justify-between gap-12 shadow-2xl">
           <div className="max-w-xl text-center md:text-left">
             <h2 className="text-3xl font-medium mb-4 italic">Performance Highlights</h2>
             <p className="font-medium text-sm mb-2">Your portfolio is outperforming the market by 9.4%.</p>
             <p className="opacity-70 text-sm font-medium leading-relaxed">Top performing asset: Aburi Hills Plot 4 (+18.2%). Area for improvement: One property has pending statutory verification.</p>
           </div>
           <div className="flex flex-col gap-4 w-full md:w-auto">
             <button className="bg-syntry-obsidian text-[#F8F1E3] px-12 py-5 rounded-md font-medium text-sm hover:scale-[1.02] transition-all shadow-xl">
               Download Full Audit Report (PDF)
             </button>
             <a href="https://wa.me/233531102292" className="bg-white/20 border border-[#0F172A]/20 text-[#0F172A] px-12 py-5 rounded-md font-medium text-sm text-center hover:bg-white/30 transition-all">
               Priority Advisor Support
             </a>
           </div>
        </section>
      </main>

      <GlobalFooter dark />
    </div>
  );
};

export default AnalyticsDashboardPage;
