"use client";
import React, { useState } from 'react';
import GlobalHeader from '@/components/GlobalHeader';
import GlobalFooter from '@/components/GlobalFooter';

const TransactionHistoryPage = () => {
  const [activeTab, setActiveTab] = useState('All');

  const history = [
    {
      id: 1,
      date: "Oct 24, 2023 | 14:20",
      type: "Pre-Approval Letter Generated",
      property: "Generic Portfolio",
      amount: "GH₵1,250,000",
      status: "Completed",
      category: "Mortgage"
    },
    {
      id: 2,
      date: "Oct 22, 2023 | 09:12",
      type: "Interest Expressed",
      property: "Aburi Hills Nodal Sector 4",
      amount: "GH₵3,250,000",
      status: "Completed",
      category: "Property Interest"
    },
    {
      id: 3,
      date: "Oct 15, 2023 | 16:45",
      type: "Escrow Deposit Locked",
      property: "Lot 82 - Relic Casa",
      amount: "GH₵12,000",
      status: "Pending",
      category: "Escrow"
    },
    {
      id: 4,
      date: "Oct 01, 2023 | 10:00",
      type: "Rent Received",
      property: "East Legon Apartment B",
      amount: "GH₵8,500",
      status: "Completed",
      category: "Rent"
    }
  ];

  const filteredHistory = activeTab === 'All' ? history : history.filter(item => item.category === activeTab);

  return (
    <div className="bg-[#fdfcf9] min-h-screen text-[#003300] font-sans">
      <GlobalHeader />

      <main className="pt-32 pb-20 px-4 md:px-8 max-w-6xl mx-auto">
        <header className="mb-12">
          <h1 className="text-4xl font-bold mb-4 tracking-tight">Transaction History</h1>
          <p className="opacity-60 text-sm">Review your sovereign financial interactions and asset movements.</p>
        </header>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
           {[
             { l: "Total Transactions", v: "42", c: "text-[#003300]" },
             { l: "Total Value Processed", v: "GH₵5,872,000", c: "text-[#D4AF37]" },
             { l: "Success Rate", v: "100%", c: "text-[#1D9E75]" }
           ].map((stat, i) => (
             <div key={i} className="bg-white border border-[#D4AF37]/10 p-8 rounded-2xl shadow-sm">
               <p className="text-[10px] font-bold uppercase tracking-widest opacity-40 mb-2">{stat.l}</p>
               <h3 className={`text-2xl font-bold ${stat.c}`}>{stat.v}</h3>
             </div>
           ))}
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-10 pb-6 border-b border-[#003300]/5">
          <div className="flex gap-4 overflow-x-auto no-scrollbar w-full md:w-auto">
            {['All', 'Mortgage', 'Property Interest', 'Escrow', 'Rent'].map((tab) => (
              <button 
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all whitespace-nowrap ${activeTab === tab ? 'bg-[#003300] text-white' : 'bg-white border border-[#003300]/10 opacity-60 hover:opacity-100'}`}
              >
                {tab}
              </button>
            ))}
          </div>
          <div className="relative w-full md:w-64">
            <input 
              type="text" 
              placeholder="Search Ledger..."
              className="w-full py-3 px-6 rounded-xl border border-[#003300]/10 bg-white text-xs"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 opacity-20">🔍</span>
          </div>
        </div>

        {/* Ledger List */}
        <div className="space-y-4">
          {filteredHistory.length > 0 ? (
            filteredHistory.map((tx) => (
              <div key={tx.id} className="bg-white border border-[#D4AF37]/5 p-6 md:p-8 rounded-3xl shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row items-center justify-between gap-6 group">
                <div className="flex items-center gap-6 w-full md:w-auto">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg ${tx.category === 'Rent' ? 'bg-[#1D9E75]/10 text-[#1D9E75]' : 'bg-[#003300]/5 text-[#D4AF37]'}`}>
                    {tx.category === 'Rent' ? '💰' : '📄'}
                  </div>
                  <div>
                    <h4 className="font-bold text-base mb-1 group-hover:text-[#D4AF37] transition-all">{tx.type}</h4>
                    <p className="text-[10px] opacity-40 font-bold uppercase tracking-widest">{tx.date}</p>
                  </div>
                </div>
                
                <div className="text-center md:text-left w-full md:w-48">
                   <p className="text-[10px] opacity-40 font-bold uppercase tracking-widest mb-1">Target Asset</p>
                   <p className="text-xs font-bold leading-none">{tx.property}</p>
                </div>

                <div className="text-center md:text-right w-full md:w-40">
                   <p className="text-xs font-bold mb-1">{tx.amount}</p>
                   <span className={`text-[9px] font-bold uppercase px-3 py-1 rounded-full ${tx.status === 'Completed' ? 'bg-[#1D9E75]/10 text-[#1D9E75]' : 'bg-orange-100 text-orange-600'}`}>
                     {tx.status}
                   </span>
                </div>
              </div>
            ))
          ) : (
            <div className="py-32 text-center">
              <p className="text-4xl opacity-10 mb-6">🏜️</p>
              <h3 className="text-xl font-bold opacity-40 mb-2">No transactions matching this filter.</h3>
              <p className="text-xs opacity-60 mb-8">Start by checking your buying power or expressing interest.</p>
              <a href="/marketplace" className="text-[#00BFFF] font-bold uppercase text-[10px] tracking-[3px] hover:underline">Explore Marketplace</a>
            </div>
          )}
        </div>
      </main>

      <GlobalFooter />
    </div>
  );
};

export default TransactionHistoryPage;
