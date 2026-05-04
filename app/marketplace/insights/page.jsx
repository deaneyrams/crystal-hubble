"use client";
import React, { useState } from 'react';
import GlobalHeader from '../../../components/GlobalHeader';
import GlobalFooter from '../../../components/GlobalFooter';

const MarketInsightsPage = () => {
  const [timeRange, setTimeRange] = useState('90 Days');

  const stats = [
    { label: "Accra Growth", value: "+14.8%", desc: "Land Price Index", trend: "up" },
    { label: "Hot Areas", value: "Aburi, Pokuase", desc: "Most Active Volume", trend: "active" },
    { label: "Approval Rate", value: "78%", desc: "Syntry Bridge Mortgages", trend: "up" },
    { label: "Average yield", value: "12.2% APY", desc: "Verified Assets", trend: "up" }
  ];

  const insights = [
    { title: "Aburi Hills values up 22% this quarter", desc: "Why decentralized luxury plots are winning the Accra-exit race." },
    { title: "Digital Lands Reform Impact", desc: "How the new Lands Commission digital system affects verification speed." },
    { title: "Top Yield Areas 2026", desc: "Analytical mapping of rental yield corridors in Greater Accra." }
  ];

  return (
    <div className="bg-[#fdfcf9] min-h-screen text-[#0F172A] font-sans">
      <GlobalHeader />

      <main className="pt-32 pb-20 px-4 md:px-8 max-w-7xl mx-auto">
        {/* Header Section */}
        <header className="mb-12 border-b border-[#0F172A]/5 pb-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div>
            <h1 className="text-4xl font-medium tracking-tight mb-2">Market Insights</h1>
            <p className="opacity-60 text-sm font-medium italic">Data-driven statutory land market analysis.</p>
          </div>
          <div className="flex gap-2 bg-syntry-obsidian/5 p-1 rounded-md w-full md:w-auto overflow-x-auto no-scrollbar">
            {['30 Days', '90 Days', '1 Year', 'All Time'].map(range => (
              <button 
                key={range}
                onClick={() => setTimeRange(range)}
                className={`flex-1 md:flex-none px-6 py-2 rounded-lg text-[10px] font-medium uppercase tracking-widest transition-all whitespace-nowrap ${timeRange === range ? 'bg-syntry-obsidian text-white shadow-lg' : 'opacity-40 hover:opacity-100'}`}
              >
                {range}
              </button>
            ))}
          </div>
        </header>

        {/* KPI Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, i) => (
             <div key={i} className="bg-white border border-[#D4AF37]/10 p-8 rounded-md shadow-sm hover:border-[#D4AF37]/40 transition-all">
                <p className="text-[10px] font-medium uppercase tracking-widest opacity-40 mb-2">{stat.label}</p>
                <h3 className="text-2xl font-medium text-[#0F172A] tracking-tight">{stat.value}</h3>
                <p className="text-[9px] font-medium opacity-60 mt-2">{stat.desc}</p>
             </div>
          ))}
        </div>

        {/* Charts & Trends */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
           <div className="lg:col-span-2 bg-syntry-obsidian text-[#F8F1E3] p-10 rounded-[3rem] shadow-2xl relative overflow-hidden group border border-[#D4AF37]/20">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4AF37]/5 rounded-md blur-3xl -mr-32 -mt-32"></div>
              <h4 className="text-sm font-medium uppercase tracking-widest opacity-40 mb-12">Land Value Trend • Greater Accra</h4>
              <div className="h-48 flex items-end gap-2 opacity-20 px-4">
                 {[30, 45, 40, 65, 55, 80, 75, 100].map((h, i) => (
                   <div key={i} style={{ height: `${h}%` }} className="flex-1 bg-[#D4AF37] rounded-t-lg transition-all group-hover:scale-y-110 origin-bottom"></div>
                 ))}
              </div>
              <p className="mt-8 text-[10px] font-medium uppercase tracking-widest text-[#D4AF37]">Aggregate Appreciation Index</p>
           </div>
           
           <div className="bg-white border border-[#0F172A]/5 p-10 rounded-[3rem] flex flex-col justify-between shadow-sm">
              <h4 className="text-sm font-medium uppercase tracking-widest opacity-40 mb-10">Popular Types</h4>
              <div className="space-y-6">
                 {[
                   { t: "Residential Plots", p: "62%", c: "bg-[#D4AF37]" },
                   { t: "Nodal Centers", p: "22%", c: "bg-syntry-obsidian" },
                   { t: "Industrial Land", p: "16%", c: "bg-[#1D9E75]" }
                 ].map((bar, i) => (
                    <div key={i}>
                       <div className="flex justify-between text-[10px] font-medium uppercase mb-2">
                          <span className="opacity-60">{bar.t}</span>
                          <span>{bar.p}</span>
                       </div>
                       <div className="h-2 w-full bg-syntry-obsidian/5 rounded-md overflow-hidden">
                          <div style={{ width: bar.p }} className={`h-full ${bar.c}`}></div>
                       </div>
                    </div>
                 ))}
              </div>
              <p className="text-[9px] opacity-40 mt-10 font-medium uppercase tracking-widest">Inquiry Volume</p>
           </div>
        </div>

        {/* Personalized Insight Section */}
        <section className="bg-white border border-[#D4AF37]/30 p-10 rounded-[2.5rem] mb-20 shadow-xl border-l-[12px] border-l-[#D4AF37] relative overflow-hidden">
           <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4AF37]/5 rounded-md blur-2xl"></div>
           <p className="text-[10px] font-medium uppercase tracking-widest text-[#D4AF37] mb-2">Personalized Recommendation</p>
           <h3 className="text-xl font-medium italic text-[#0F172A]">Based on your portfolio, your identified assets are performing 8.2% above the general market average.</h3>
           <button className="mt-6 text-[10px] font-medium text-[#00BFFF] uppercase tracking-widest hover:underline">Download Personal Audit ↗</button>
        </section>

        {/* Insights Library */}
        <section className="mb-20">
          <div className="flex justify-between items-end mb-10">
            <h2 className="text-2xl font-medium">Latest Statutory Insights</h2>
            <button className="text-[10px] font-medium uppercase tracking-widest opacity-40 hover:opacity-100">View All Library</button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {insights.map((article, i) => (
               <div key={i} className="bg-white border border-[#0F172A]/5 p-8 rounded-md hover:shadow-xl transition-all group">
                  <div className="w-10 h-10 bg-syntry-obsidian/5 rounded-md flex items-center justify-center mb-6 text-xl">📄</div>
                  <h4 className="font-medium text-lg mb-4 group-hover:text-[#D4AF37] transition-all">{article.title}</h4>
                  <p className="text-xs opacity-60 leading-relaxed font-medium mb-8">{article.desc}</p>
                  <button className="text-[10px] font-medium uppercase tracking-widest text-[#D4AF37] group-hover:underline">Read Article</button>
               </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-[#D4AF37] text-[#0F172A] p-12 md:p-16 rounded-[4rem] flex flex-col md:flex-row items-center justify-between gap-12 shadow-2xl">
           <div className="max-w-xl text-center md:text-left">
             <h2 className="text-3xl font-medium mb-4 italic">Request Institutional Report</h2>
             <p className="font-medium text-sm mb-2">Deep-dive technical data for banks, family offices, and statutory agencies.</p>
           </div>
           <div className="flex flex-col gap-4 w-full md:w-auto">
             <button className="bg-syntry-obsidian text-[#F8F1E3] px-12 py-5 rounded-md font-medium text-sm hover:scale-[1.02] transition-all shadow-xl">
               Subscribe to Weekly Insights
             </button>
             <a href="https://wa.me/233531102292" className="bg-white/20 border border-[#0F172A]/20 text-[#0F172A] px-12 py-5 rounded-md font-medium text-sm text-center hover:bg-white/30 transition-all">
               Connect with Data Liaison
             </a>
           </div>
        </section>
      </main>

      <GlobalFooter />
    </div>
  );
};

export default MarketInsightsPage;
