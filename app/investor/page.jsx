import React from 'react';

export default function InvestorDashboard() {
  const currentPrice = 3318.92;
  // Year 1, Year 2, Year 3 math
  const cagr = 1.12; 
  const y1 = currentPrice * cagr;
  const y2 = y1 * cagr;
  const y3 = y2 * cagr;
  
  const investors = Array.from({length: 50}).map((_, i) => ({
     id: `VASP-10${Math.floor(Math.random()*1000)}`,
     location: i % 3 === 0 ? "🇺🇸 New York" : i % 2 === 0 ? "🇬🇧 London" : "🇬🇭 Accra",
     holdings: 1, // 1% fraction
     buyPrice: currentPrice,
     currentValue: currentPrice, // In Month 1
     date: new Date(Date.now() - Math.floor(Math.random() * 10000000)).toLocaleDateString()
  }));

  return (
    <div className="min-h-screen bg-[#040812] text-white p-8 font-sans">
       <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-500">
          
          <header className="flex justify-between items-end border-b border-white/10 pb-6">
             <div>
                <h1 className="text-3xl font-light tracking-wide flex items-center gap-3">
                   Syntry <span className="font-medium tracking-tight text-[#00F5D4]">Member Portal</span>
                </h1>
                <p className="text-gray-400 mt-2 tracking-widest text-sm uppercase font-mono">Ashifla-Otatten Micro-REIT Dashboard</p>
             </div>
             <div className="text-right">
                <div className="flex items-center justify-end gap-2 mb-1">
                   <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_8px_#10B981]"></span>
                   <span className="text-[10px] text-emerald-400 uppercase font-medium tracking-tight tracking-widest">Global Escrow Active</span>
                </div>
                <p className="text-[10px] text-gray-500 uppercase tracking-widest font-mono">March 2026 Distribution Node</p>
             </div>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
             {/* Global Stats */}
             <div className="bg-[#0b132b] p-6 rounded-2xl border border-indigo-500/20 shadow-[0_0_20px_rgba(79,70,229,0.05)] col-span-2">
                <h2 className="text-[10px] uppercase font-medium tracking-tight text-indigo-400 tracking-widest mb-6">Yield Projection Matrix (12% CAGR)</h2>
                
                <div className="flex items-end justify-between px-4 pb-4">
                   <div className="text-center">
                      <p className="text-[10px] text-gray-500 uppercase font-medium tracking-widest mb-2">2026 (Entry)</p>
                      <div className="w-16 h-16 bg-white/5 border-b-2 border-indigo-500/30 rounded-t-sm flex items-end justify-center pb-2 transition-all duration-500 hover:h-20 hover:bg-indigo-500/10">
                         <span className="text-xs font-mono text-gray-300 font-medium">${currentPrice.toLocaleString('en-US', {minimumFractionDigits: 0, maximumFractionDigits:0})}</span>
                      </div>
                   </div>
                   
                   <div className="text-center">
                      <p className="text-[10px] text-gray-500 uppercase font-medium tracking-widest mb-2">2027 (Year 1)</p>
                      <div className="w-16 h-24 bg-white/5 border-b-2 border-indigo-400/50 rounded-t-sm flex items-end justify-center pb-2 transition-all duration-500 hover:h-28 hover:bg-indigo-400/10">
                         <span className="text-xs font-mono text-indigo-300 font-medium">${y1.toLocaleString('en-US', {minimumFractionDigits: 0, maximumFractionDigits:0})}</span>
                      </div>
                   </div>

                   <div className="text-center">
                      <p className="text-[10px] text-gray-500 uppercase font-medium tracking-widest mb-2">2028 (Year 2)</p>
                      <div className="w-16 h-32 bg-white/5 border-b-2 border-indigo-300/70 rounded-t-sm flex items-end justify-center pb-2 transition-all duration-500 hover:h-36 hover:bg-indigo-300/10">
                         <span className="text-xs font-mono text-indigo-200 font-medium">${y2.toLocaleString('en-US', {minimumFractionDigits: 0, maximumFractionDigits:0})}</span>
                      </div>
                   </div>

                   <div className="text-center">
                      <p className="text-[10px] text-[#00F5D4] uppercase font-medium tracking-tight tracking-widest mb-2">2029 (Target)</p>
                      <div className="w-16 h-44 bg-gradient-to-t from-indigo-900/40 to-[#00F5D4]/10 border-b-4 border-[#00F5D4] rounded-t-sm flex items-end justify-center pb-3 transition-all duration-500 hover:h-48 shadow-[0_0_15px_rgba(0,245,212,0.1)] hover:shadow-[0_0_25px_rgba(0,245,212,0.3)]">
                         <span className="text-sm font-mono text-[#00F5D4] font-medium tracking-tight drop-shadow-md">${y3.toLocaleString('en-US', {minimumFractionDigits: 0, maximumFractionDigits:0})}</span>
                      </div>
                   </div>
                </div>
                
                <p className="text-[9px] uppercase tracking-widest text-gray-500 mt-4 px-4 font-mono text-center">
                   West Hills Corridor trajectory indexed off infrastructure catalyst (Accra-Tema Expressway).
                </p>
             </div>

             <div className="bg-[#0b132b] p-6 rounded-2xl border border-white/5 flex flex-col justify-between">
                <div>
                   <h3 className="text-[10px] uppercase font-medium tracking-tight text-gray-400 tracking-widest mb-4">Total Packets Sold</h3>
                   <div className="text-5xl font-light text-white tabular-nums tracking-tight">
                     50<span className="text-xl text-gray-500 ml-1">/100</span>
                   </div>
                </div>
                <div className="space-y-4">
                   <div className="flex justify-between items-center border-b border-white/5 pb-2">
                      <span className="text-[10px] uppercase tracking-widest text-gray-500">Asset Valuation</span>
                      <span className="text-sm font-mono tracking-widest text-[#00F5D4]">$331,892.40</span>
                   </div>
                   <div className="flex justify-between items-center border-b border-white/5 pb-2">
                      <span className="text-[10px] uppercase tracking-widest text-gray-500">Total Escrow Vault</span>
                      <span className="text-sm font-mono tracking-widest text-yellow-500">$165,946.20</span>
                   </div>
                </div>
             </div>
          </div>

          {/* Holdings Ledger */}
          <div className="bg-[#0b132b] rounded-2xl border border-white/5 overflow-hidden">
             <div className="p-6 border-b border-white/5 flex justify-between items-center bg-black/20">
                <h2 className="text-[10px] uppercase font-medium tracking-tight text-gray-400 tracking-widest">Public Dividend Ledger (Partial Sync)</h2>
                <span className="text-[9px] uppercase font-medium text-indigo-400 border border-indigo-500/30 bg-indigo-900/20 px-2 py-1 rounded">50 Node Accounts Online</span>
             </div>
             <div className="overflow-x-auto">
                <table className="w-full text-left">
                   <thead>
                      <tr className="border-b border-white/5 text-[9px] uppercase tracking-widest text-gray-500 font-medium bg-black/40">
                         <th className="p-4 pl-6">VASP Hash</th>
                         <th className="p-4">Region Node</th>
                         <th className="p-4">Entry Date</th>
                         <th className="p-4 text-right">Fraction Size</th>
                         <th className="p-4 text-right pr-6">Cost Basis</th>
                      </tr>
                   </thead>
                   <tbody>
                      {investors.slice(0,10).map((inv, idx) => (
                         <tr key={idx} className="border-b border-white/5 hover:bg-white/5 transition-colors group cursor-crosshair">
                            <td className="p-4 pl-6 font-mono text-xs text-gray-300 group-hover:text-[#00F5D4] transition-colors">{inv.id}</td>
                            <td className="p-4 text-[11px] uppercase tracking-wider text-gray-400">{inv.location}</td>
                            <td className="p-4 font-mono text-[10px] text-gray-500">{inv.date}</td>
                            <td className="p-4 text-right font-mono text-xs text-indigo-300">{inv.holdings}%</td>
                            <td className="p-4 text-right pr-6 font-mono text-xs text-white">${inv.buyPrice.toLocaleString('en-US', {minimumFractionDigits:2})}</td>
                         </tr>
                      ))}
                      <tr>
                         <td colSpan="5" className="p-4 text-center">
                            <span className="text-[10px] uppercase tracking-widest text-gray-600 font-medium animate-pulse">And 40 anonymous node holders...</span>
                         </td>
                      </tr>
                   </tbody>
                </table>
             </div>
          </div>
          
       </div>
    </div>
  );
}
