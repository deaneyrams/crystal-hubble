"use client";
import React, { useState } from 'react';
import GlobalHeader from '@/components/GlobalHeader';
import GlobalFooter from '@/components/GlobalFooter';

const RentCollectionPage = () => {
  const rentHistory = [
    { id: 1, property: "East Legon Flat 4", tenant: "A*** K***", amount: "GH₵4,200", date: "Oct 24, 2023", status: "Paid" },
    { id: 2, property: "Spintex Nodal Center", tenant: "M*** O***", amount: "GH₵8,500", date: "Oct 20, 2023", status: "Paid" },
    { id: 3, property: "Legon Hills Villa", tenant: "S*** A***", amount: "GH₵12,000", date: "Oct 15, 2023", status: "Pending" },
    { id: 4, property: "Aburi Eco Lodge", tenant: "K*** B***", amount: "GH₵3,500", date: "Oct 10, 2023", status: "Overdue" }
  ];

  const kpis = [
    { label: "Active Properties", value: "4", icon: "🏠" },
    { label: "Collection Rate", value: "92%", icon: "📈" },
    { label: "Next Expected", value: "GH₵15,750", icon: "🗓️" },
    { label: "Avg Rent/Prop", value: "GH₵7,112", icon: "📊" }
  ];

  return (
    <div className="bg-[#fdfcf9] min-h-screen text-[#0F172A] font-sans">
      <GlobalHeader />

      <main className="pt-32 pb-20 px-4 md:px-8 max-w-7xl mx-auto">
        <header className="mb-12 border-b border-[#0F172A]/5 pb-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div>
            <h1 className="text-4xl font-medium tracking-tight mb-2">Rent Collection Dashboard</h1>
            <p className="text-2xl font-medium text-[#D4AF37]">GH₵28,450 <span className="text-sm opacity-40 font-medium">collected this month</span></p>
          </div>
          <button className="bg-[#0F172A] text-white px-8 py-4 rounded-2xl font-medium text-xs uppercase tracking-widest hover:scale-[1.02] transition-all shadow-xl">
             Add New Rental Property
          </button>
        </header>

        {/* KPI Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {kpis.map((kpi, i) => (
             <div key={i} className="bg-white border border-[#D4AF37]/10 p-8 rounded-3xl shadow-sm hover:border-[#D4AF37]/40 transition-all flex flex-col justify-between">
                <div className="text-2xl mb-4">{kpi.icon}</div>
                <div>
                  <p className="text-[10px] font-medium uppercase tracking-widest opacity-40 mb-1">{kpi.label}</p>
                  <h3 className="text-xl font-medium text-[#0F172A]">{kpi.value}</h3>
                </div>
             </div>
          ))}
        </div>

        {/* Collection Status */}
        <section className="bg-white border border-[#0F172A]/5 p-8 rounded-[2.5rem] mb-12 flex flex-col md:flex-row items-center justify-between gap-8 shadow-sm">
           <div className="flex gap-6 items-center">
              <div className="text-3xl">📱</div>
              <div>
                 <p className="text-sm font-medium">Automated Collection Active</p>
                 <p className="text-xs opacity-60 font-medium italic">Rent is auto-collected via MTN MoMo and Vodafone Cash gateways.</p>
              </div>
           </div>
           <div className="flex items-center gap-4 bg-[#0F172A]/5 px-6 py-3 rounded-2xl">
              <span className="text-[10px] font-medium uppercase tracking-widest opacity-40">Auto-Reminders</span>
              <div className="w-12 h-6 bg-[#1D9E75] rounded-full p-1 cursor-pointer">
                 <div className="w-4 h-4 bg-white rounded-full ml-auto shadow-sm"></div>
              </div>
           </div>
        </section>

        {/* Rent History */}
        <section className="mb-20">
          <h2 className="text-2xl font-medium mb-10">Rent History</h2>
          <div className="space-y-4">
             {rentHistory.map((item) => (
                <div key={item.id} className="bg-white border border-[#0F172A]/5 p-8 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-8 shadow-sm group hover:border-[#D4AF37]/20 transition-all">
                   <div className="flex gap-6 items-center w-full md:w-1/3">
                      <div className="w-12 h-12 bg-[#0F172A]/5 rounded-full flex items-center justify-center text-xl">🏠</div>
                      <div>
                         <p className="font-medium text-base group-hover:text-[#D4AF37] transition-all">{item.property}</p>
                         <p className="text-[10px] font-medium opacity-40 uppercase tracking-[2px]">Tenant: {item.tenant}</p>
                      </div>
                   </div>
                   <div className="text-center md:text-left">
                      <p className="text-lg font-medium text-[#0F172A] mb-1">{item.amount}</p>
                      <p className="text-[10px] font-medium opacity-30 uppercase tracking-widest">{item.date}</p>
                   </div>
                   <div className="flex items-center gap-6 w-full md:w-auto justify-between md:justify-end">
                      <span className={`text-[9px] font-medium uppercase px-4 py-1.5 rounded-full border ${
                        item.status === 'Paid' ? 'bg-[#1D9E75]/10 text-[#1D9E75] border-[#1D9E75]/20' : 
                        item.status === 'Overdue' ? 'bg-red-50 text-red-500 border-red-100' : 
                        'bg-orange-50 text-orange-500 border-orange-100'
                      }`}>
                        {item.status}
                      </span>
                      {item.status !== 'Paid' && (
                        <a href="https://wa.me/233531102292" className="text-[10px] font-medium text-[#00BFFF] uppercase tracking-widest hover:underline">
                          Contact via WhatsApp
                        </a>
                      )}
                   </div>
                </div>
             ))}
          </div>
        </section>

        {/* Overdue Section Teaser */}
        <section className="bg-red-50/50 border border-red-100 p-10 rounded-[3rem] text-center">
           <p className="text-[10px] font-medium uppercase tracking-widest text-red-400 mb-2">Statutory Alert</p>
           <h3 className="text-xl font-medium text-[#0F172A]">1 Overdue Payment Detected</h3>
           <p className="text-sm opacity-60 mb-8 max-w-md mx-auto">Manual follow-up recommended for Aburi Eco Lodge. Direct MoMo recovery trigger available.</p>
           <button className="bg-red-500 text-white px-10 py-4 rounded-xl font-medium text-xs uppercase tracking-widest hover:bg-red-600 transition-all shadow-lg">
              Trigger Recovery Flow
           </button>
        </section>
      </main>

      <GlobalFooter />
    </div>
  );
};

export default RentCollectionPage;
