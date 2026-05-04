"use client";
import React, { useState } from 'react';
import GlobalHeader from '@/components/GlobalHeader';
import GlobalFooter from '@/components/GlobalFooter';

const MyTransactionsPage = () => {
  const [activeTab, setActiveTab] = useState('All');

  const transactions = [
    {
      id: 1,
      date: "Oct 24, 2023 | 14:20",
      type: "Pre-Approval Generated",
      property: "Generic Portfolio",
      amount: "GH₵1,250,000",
      status: "Completed",
      category: "Mortgage"
    },
    {
      id: 2,
      date: "Oct 22, 2023 | 09:12",
      type: "Rent Received",
      property: "East Legon Flat 4",
      amount: "GH₵4,200",
      status: "Completed",
      category: "Rent"
    },
    {
      id: 3,
      date: "Oct 15, 2023 | 16:45",
      type: "Interest Expressed",
      property: "Aburi Hills Nodal Sector 4",
      amount: "GH₵3,250,000",
      status: "Pending",
      category: "Verification"
    },
    {
      id: 4,
      date: "Oct 01, 2023 | 10:00",
      type: "Escrow Deposit",
      property: "Lot 82 - Syntry Estates",
      amount: "GH₵12,000",
      status: "Completed",
      category: "Escrow"
    }
  ];

  const filteredTransactions = activeTab === 'All' ? transactions : transactions.filter(t => t.category === activeTab);

  return (
    <div className="bg-[#fdfcf9] min-h-screen text-[#0F172A] font-sans">
      <GlobalHeader />

      <main className="pt-32 pb-20 px-4 md:px-8 max-w-7xl mx-auto">
        <header className="mb-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div>
            <h1 className="text-4xl font-medium mb-2 tracking-tight">My Transactions</h1>
            <p className="opacity-60 text-sm">Review your sovereign financial interactions and asset movements.</p>
          </div>
          <div className="flex gap-3 w-full md:w-auto">
             <button className="flex-1 md:flex-none border border-[#0F172A]/10 px-6 py-3 rounded-md font-medium text-[10px] uppercase tracking-widest hover:bg-syntry-obsidian/5 transition-all">
               Export CSV
             </button>
             <div className="flex-1 md:w-64 relative">
               <input 
                 type="text" 
                 placeholder="Search ledger..."
                 className="w-full py-3 px-10 rounded-md border border-[#0F172A]/10 text-xs"
               />
               <span className="absolute left-4 top-1/2 -translate-y-1/2 opacity-20">🔍</span>
             </div>
          </div>
        </header>

        {/* Stats Summary */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {[
            { l: "Total Transactions", v: "42", c: "text-[#0F172A]" },
            { l: "Total Value processed", v: "GH₵5,872,000", c: "text-[#D4AF37]" },
            { l: "Successful Verifications", v: "18", c: "text-[#1D9E75]" },
            { l: "Pending Items", v: "3", c: "text-orange-500" }
          ].map((stat, i) => (
             <div key={i} className="bg-white border border-[#D4AF37]/10 p-6 rounded-md shadow-sm">
                <p className="text-[10px] font-medium uppercase tracking-widest opacity-40 mb-1">{stat.l}</p>
                <p className={`text-sm md:text-lg font-medium ${stat.c}`}>{stat.v}</p>
             </div>
          ))}
        </div>

        {/* Filters */}
        <div className="flex gap-3 overflow-x-auto no-scrollbar mb-10 pb-2 border-b border-[#0F172A]/5">
          {['All', 'Mortgage', 'Rent', 'Escrow', 'Verification'].map((tab) => (
             <button 
               key={tab}
               onClick={() => setActiveTab(tab)}
               className={`px-6 py-2 rounded-md text-[10px] font-medium uppercase tracking-widest transition-all whitespace-nowrap ${activeTab === tab ? 'bg-syntry-obsidian text-white shadow-lg' : 'bg-white border border-[#0F172A]/10 opacity-60 hover:opacity-100'}`}
             >
               {tab}
             </button>
          ))}
        </div>

        {/* Transaction List */}
        <div className="space-y-4">
          {filteredTransactions.length > 0 ? (
            filteredTransactions.map((tx) => (
              <div key={tx.id} className="bg-white border border-[#D4AF37]/5 p-6 md:p-8 rounded-md shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row items-center justify-between gap-6 group">
                <div className="flex items-center gap-6 w-full md:w-1/2">
                   <div className={`w-12 h-12 rounded-md flex items-center justify-center font-medium text-lg ${tx.category === 'Rent' ? 'bg-[#1D9E75]/10 text-[#1D9E75]' : 'bg-syntry-obsidian/5 text-[#D4AF37]'}`}>
                     {tx.category === 'Rent' ? '💰' : '📄'}
                   </div>
                   <div>
                     <h4 className="font-medium text-base mb-1 group-hover:text-[#D4AF37] transition-all">{tx.type}</h4>
                     <p className="text-[10px] opacity-40 font-medium uppercase tracking-widest">{tx.date}</p>
                   </div>
                </div>

                <div className="text-center md:text-left w-full md:w-48">
                   <p className="text-[10px] opacity-40 font-medium uppercase tracking-widest mb-1">Target Asset</p>
                   <p className="text-xs font-medium leading-none">{tx.property}</p>
                </div>

                <div className="text-center md:text-right w-full md:w-40">
                   <p className="text-xs font-medium mb-2">{tx.amount}</p>
                   <span className={`text-[9px] font-medium uppercase px-3 py-1 rounded-md ${tx.status === 'Completed' ? 'bg-[#1D9E75]/10 text-[#1D9E75]' : tx.status === 'Failed' ? 'bg-red-50 text-red-500' : 'bg-orange-50 text-orange-500'}`}>
                     {tx.status}
                   </span>
                </div>
              </div>
            ))
          ) : (
            <div className="py-32 text-center opacity-40">
              <p className="text-4xl mb-6">🏜️</p>
              <h3 className="text-xl font-medium italic mb-2">No transactions matching this filter.</h3>
              <p className="text-xs">Complete your first property check or express interest to see it here.</p>
            </div>
          )}
        </div>
      </main>

      <GlobalFooter />
    </div>
  );
};

export default MyTransactionsPage;
