"use client";
import React from 'react';
import Image from 'next/image';
import GlobalHeader from '@/components/GlobalHeader';
import GlobalFooter from '@/components/GlobalFooter';
import SentinelWatch from '@/components/SentinelWatch';

const DashboardPage = () => {
  // Mock data for initial build
  const user = { name: "Kwame", totalValue: "4,872,000", monthlyRent: "28,450" };
  const kpis = [
    { label: "Total Portfolio Value", value: "GH₵4,872,000", trend: "+12.4%" },
    { label: "Verified Plots", value: "14", trend: "82% Goal" },
    { label: "Mortgage-Ready", value: "6", trend: "Verified" },
    { label: "Average APY", value: "18.2%", trend: "Sovereign" }
  ];

  const properties = [
    {
      id: 1,
      title: "Aburi Hills Nodal Sector 4",
      price: "1,250,000",
      status: "Verified Sovereign",
      mortgageStatus: "In Progress",
      progress: 65,
      img: "[Lazy-loaded Property Photo]"
    }
  ];

  return (
    <div className="bg-[#001a00] min-h-screen text-[#F8F1E3] font-sans">
      <GlobalHeader />
      
      <main className="pt-32 pb-20 px-4 md:px-8 max-w-7xl mx-auto">
        {/* Welcome Bar */}
        <section className="mb-12">
          <h1 className="text-3xl md:text-4xl font-medium mb-2">Good morning, {user.name}</h1>
          <div className="flex flex-wrap gap-4 text-sm opacity-80 uppercase tracking-widest">
            <span>Total Value: GH₵{user.totalValue}</span>
            <span className="hidden md:inline">|</span>
            <span>Monthly Rent: GH₵{user.monthlyRent}</span>
          </div>
        </section>

        {/* KPI Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {kpis.map((kpi, i) => (
            <div key={i} className="bg-syntry-obsidian border border-[#D4AF37]/20 p-6 rounded-md shadow-lg hover:shadow-[#D4AF37]/10 transition-all">
              <p className="text-xs opacity-60 uppercase mb-2">{kpi.label}</p>
              <h3 className="text-2xl font-medium text-[#D4AF37] mb-1">{kpi.value}</h3>
              <p className="text-xs text-[#00BFFF]">{kpi.trend}</p>
            </div>
          ))}
        </div>

        {/* 6-Step Tracker Teaser */}
        <section className="mb-16 bg-[#F8F1E3]/5 p-8 rounded-md border border-[#D4AF37]/10">
          <h2 className="text-xl font-medium mb-6 flex items-center gap-2">
            <span className="w-2 h-2 bg-[#00BFFF] rounded-md animate-pulse"></span>
            Mortgage Application Progress
          </h2>
          <div className="flex flex-wrap md:flex-nowrap gap-4 justify-between items-start">
            {[1, 2, 3, 4, 5, 6].map((step) => (
              <div key={step} className={`flex-1 min-w-[120px] text-center ${step <= 3 ? 'opacity-100' : 'opacity-40'}`}>
                <div className={`w-10 h-10 mx-auto rounded-md flex items-center justify-center mb-3 border ${step <= 3 ? 'bg-[#D4AF37] border-[#D4AF37] text-[#0F172A]' : 'border-[#F8F1E3]/20'}`}>
                  {step <= 3 ? '✓' : step}
                </div>
                <p className="text-[10px] uppercase tracking-tighter">Step {step}</p>
              </div>
            ))}
          </div>
        </section>

        {/* My Properties */}
        <section>
          <div className="flex justify-between items-end mb-8">
            <h2 className="text-2xl font-medium">My Property Portfolio</h2>
            <button className="text-[#00BFFF] text-sm hover:underline">View All</button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {properties.map((prop) => (
              <div key={prop.id} className="bg-[#002200] rounded-md overflow-hidden border border-[#D4AF37]/10 group hover:border-[#D4AF37]/30 transition-all">
                <div className="h-48 bg-syntry-obsidian flex items-center justify-center text-xs opacity-40">
                  {prop.img}
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h4 className="font-medium text-lg">{prop.title}</h4>
                    <span className="bg-[#D4AF37] text-[#0F172A] text-[10px] px-2 py-1 rounded font-medium uppercase">
                      Verified
                    </span>
                  </div>
                  <p className="text-2xl font-medium text-[#D4AF37] mb-4">GH₵{prop.price}</p>
                  
                  {/* Status Indicator */}
                  <div className="mb-6">
                    <div className="flex justify-between text-[10px] uppercase opacity-60 mb-2">
                      <span>Mortgage Progress</span>
                      <span>{prop.progress}%</span>
                    </div>
                    <div className="h-1 bg-[#F8F1E3]/10 rounded-md overflow-hidden">
                      <div className="h-full bg-[#00BFFF] transition-all" style={{ width: `${prop.progress}%` }}></div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <button className="bg-[#00BFFF] text-[#0F172A] py-2 rounded font-medium text-xs hover:bg-[#0099CC] transition-all">
                      Details
                    </button>
                    <button className="border border-[#F8F1E3]/20 py-2 rounded font-medium text-xs hover:bg-[#F8F1E3]/5 transition-all">
                      Report
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Sentinel Community Network */}
        <section className="mt-12">
           <SentinelWatch />
        </section>

        {/* Quick Actions */}
        <section className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6">
          <button className="p-6 bg-[#D4AF37] text-[#0F172A] rounded-md font-medium hover:scale-[1.02] transition-all text-left">
            <p className="text-xs uppercase mb-1">Action Required</p>
            <h4 className="text-lg">Upload Bank Statements</h4>
          </button>
          <button className="p-6 bg-syntry-obsidian border border-[#00BFFF]/20 rounded-md font-medium hover:scale-[1.02] transition-all text-left">
            <p className="text-xs uppercase mb-1 text-[#00BFFF]">Next Step</p>
            <h4 className="text-lg">View Pre-Approval Letter</h4>
          </button>
          <a href="https://wa.me/233531102292" target="_blank" rel="noreferrer" className="p-6 bg-[#25D366] text-white rounded-md font-medium hover:scale-[1.02] transition-all text-left flex items-center justify-between">
            <div>
              <p className="text-xs uppercase mb-1 opacity-80">Support</p>
              <h4 className="text-lg">Chat with Advisor</h4>
            </div>
            <span className="text-2xl">↗</span>
          </a>
        </section>
      </main>

      <GlobalFooter />
    </div>
  );
};

export default DashboardPage;
