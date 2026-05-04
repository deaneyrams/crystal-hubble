"use client";
import React, { useState } from 'react';
import dynamic from 'next/dynamic';
const GlobalHeader = dynamic(() => import('@/components/GlobalHeader'), { ssr: false });
const GlobalFooter = dynamic(() => import('@/components/GlobalFooter'), { ssr: false });

const MarketplacePage = () => {
  const [mortgageOnly, setMortgageOnly] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [viewMode, setViewMode] = useState('buyer');
  const [isAiOpen, setIsAiOpen] = useState(false);
  const [aiMessages] = useState([
    { role: "ai", content: "Hi! I’m your Syntry AI. Ask me about verified properties, 8 Layers verification, listing your asset, or mortgage pre-approval. 🎉" }
  ]);

  const properties = [
    {
      id: 1,
      title: "4-Bedroom Luxury Villa",
      type: "Residential",
      location: "East Legon",
      price: "2,850,000",
      fractionalPrice: "285,000",
      apy: "14.5%",
      litigation: "0.00%",
      mortgageEligible: true,
      verified: true,
      img: "https://images.unsplash.com/photo-1613490900233-141c5560d75d?auto=format&fit=crop&q=80&w=600"
    },
    {
      id: 2,
      title: "Commercial Retail Node",
      type: "Commercial",
      location: "Cantonments",
      price: "5,400,000",
      fractionalPrice: "540,000",
      apy: "18.2%",
      litigation: "0.00%",
      mortgageEligible: true,
      verified: true,
      img: "https://images.unsplash.com/photo-1600585154340-be6199f7d009?auto=format&fit=crop&q=80&w=600"
    },
    {
      id: 3,
      title: "2-Acre Mixed Use Plot",
      type: "Raw Land",
      location: "Aburi Hills",
      price: "1,200,000",
      fractionalPrice: "250,000",
      apy: "21.0%",
      litigation: "0.00%",
      mortgageEligible: false,
      verified: true,
      img: "https://images.unsplash.com/photo-1500382017468-9049fee74a62?auto=format&fit=crop&q=80&w=600"
    },
    {
      id: 4,
      title: "3-Bedroom Townhouse",
      type: "Residential",
      location: "East Airport",
      price: "1,850,000",
      fractionalPrice: "185,000",
      apy: "12.5%",
      litigation: "0.00%",
      mortgageEligible: true,
      verified: true,
      img: "https://images.unsplash.com/photo-1600566753190-17f0bb2a6c3e?auto=format&fit=crop&q=80&w=600"
    },
    {
      id: 5,
      title: "Student Hostel Block",
      type: "Commercial",
      location: "Kumasi",
      price: "3,200,000",
      fractionalPrice: "320,000",
      apy: "24.5%",
      litigation: "0.00%",
      mortgageEligible: true,
      verified: true,
      img: "https://images.unsplash.com/photo-1555854811-8224bf7feb4e?auto=format&fit=crop&q=80&w=600"
    },
    {
      id: 6,
      title: "Oceanfront Serviced Plot",
      type: "Raw Land",
      location: "Prampram",
      price: "650,000",
      fractionalPrice: "150,000",
      apy: "16.0%",
      litigation: "0.00%",
      mortgageEligible: false,
      verified: true,
      img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=600"
    }
  ];

  const filteredProperties = mortgageOnly 
    ? properties.filter(p => p.mortgageEligible) 
    : properties;

  return (
    <div className="bg-syntry-obsidian min-h-screen text-syntry-slate-300 font-sans selection:bg-syntry-teal-600 selection:text-white">
      <GlobalHeader />

      <main className="pt-32 pb-20 px-4 md:px-8 max-w-7xl mx-auto min-h-[80vh]">
        {/* Dual-View Dashboard Toggle */}
        <div className="flex justify-center mb-16">
           <div className="bg-white/5 p-1 rounded-md border border-white/10 flex items-center w-full max-w-md backdrop-blur-md">
              <button 
                 onClick={() => setViewMode('buyer')}
                 className={`flex-1 py-3 rounded-md text-[10px] font-medium uppercase tracking-widest transition-all ${viewMode === 'buyer' ? 'bg-syntry-teal-600 text-white shadow-lg' : 'text-syntry-slate-300 hover:bg-white/5'}`}
              >
                 Browse Assets
              </button>
              <button 
                 onClick={() => setViewMode('seller')}
                 className={`flex-1 py-3 rounded-md text-[10px] font-medium uppercase tracking-widest transition-all ${viewMode === 'seller' ? 'bg-syntry-teal-600 text-white shadow-lg' : 'text-syntry-slate-300 hover:bg-white/5'}`}
              >
                 My Listings
              </button>
           </div>
        </div>

        {viewMode === 'buyer' ? (
           <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-16">
              <div className="flex flex-col lg:flex-row justify-between items-end gap-8">
                 <div className="max-w-2xl">
                    <h1 className="text-4xl md:text-5xl font-medium text-white mb-4 tracking-tight">Sovereign Marketplace</h1>
                    <p className="text-lg text-syntry-slate-300/80 leading-relaxed">
                       Institutional-grade assets cleared through the <span className="text-syntry-teal-600 font-medium">8-Layer Protocol</span>. Zero litigation, maximum liquidity.
                    </p>
                 </div>
                 <button 
                    onClick={() => setIsModalOpen(true)}
                    className="bg-gradient-to-r from-syntry-teal-600 to-syntry-teal-700 text-white px-8 py-4 rounded-md font-medium text-[10px] uppercase tracking-widest hover:opacity-90 transition-all shadow-xl shadow-syntry-teal-600/20"
                 >
                    List Your Asset
                 </button>
              </div>

              {/* Central Search Console */}
              <div className="bg-white/5 rounded-md p-8 border border-white/10 backdrop-blur-xl shadow-2xl space-y-8">
                 <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-end">
                    <div className="space-y-2">
                       <label className="text-[10px] font-medium uppercase tracking-widest text-syntry-slate-300/40 ml-1">Location</label>
                       <select className="w-full bg-white/5 border border-white/10 rounded-md px-5 py-4 text-sm font-medium text-white focus:border-syntry-teal-600 outline-none appearance-none cursor-pointer">
                          <option className="bg-syntry-obsidian">All Locations</option>
                          <option className="bg-syntry-obsidian">Accra (Airport, Cantonments)</option>
                          <option className="bg-syntry-obsidian">Aburi / Eastern</option>
                       </select>
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-medium uppercase tracking-widest text-syntry-slate-300/40 ml-1">Type</label>
                       <select className="w-full bg-white/5 border border-white/10 rounded-md px-5 py-4 text-sm font-medium text-white focus:border-syntry-teal-600 outline-none appearance-none cursor-pointer">
                          <option className="bg-syntry-obsidian">Any Type</option>
                          <option className="bg-syntry-obsidian">Residential</option>
                          <option className="bg-syntry-obsidian">Commercial</option>
                          <option className="bg-syntry-obsidian">Raw Land</option>
                       </select>
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-medium uppercase tracking-widest text-syntry-slate-300/40 ml-1">Price Range</label>
                       <input type="range" className="w-full h-1.5 bg-white/10 rounded-md appearance-none cursor-pointer accent-syntry-teal-600" />
                    </div>
                    <button className="bg-gradient-to-r from-syntry-teal-600 to-syntry-teal-700 text-white h-[58px] rounded-md font-medium text-[10px] uppercase tracking-widest hover:opacity-90 transition-all shadow-lg">
                       Search Engine
                    </button>
                 </div>
                 <div className="flex flex-wrap items-center gap-4 pt-6 border-t border-white/5">
                    <label className="flex items-center gap-3 bg-white/5 px-4 py-2 rounded-md border border-white/5 cursor-pointer hover:bg-white/10 transition-all">
                       <input type="checkbox" checked={mortgageOnly} onChange={() => setMortgageOnly(!mortgageOnly)} className="w-4 h-4 rounded-md border-white/20 bg-transparent text-syntry-teal-600 focus:ring-0" />
                       <span className="text-[10px] font-medium uppercase tracking-widest">Mortgage Eligible</span>
                    </label>
                 </div>
              </div>

              {/* Property Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProperties.map((prop) => (
                  <div key={prop.id} className="bg-white/5 rounded-md overflow-hidden border border-white/10 hover:border-syntry-teal-600/30 transition-all group flex flex-col h-full">
                    <div className="relative h-64 overflow-hidden">
                       <img src={prop.img} alt={prop.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-70 group-hover:opacity-90" />
                       <div className="absolute top-4 left-4">
                          <span className="bg-syntry-teal-600 text-white text-[9px] font-medium px-3 py-1 rounded-md uppercase tracking-widest shadow-lg">Verified Sovereign</span>
                       </div>
                    </div>
                    <div className="p-8 flex flex-col flex-grow space-y-6">
                       <div className="space-y-1">
                          <p className="text-[9px] font-medium text-syntry-teal-600 uppercase tracking-widest">{prop.location}</p>
                          <h3 className="text-xl font-medium text-white">{prop.title}</h3>
                       </div>
                       <div className="bg-white/5 p-4 rounded-md border border-white/5 space-y-4">
                          <div className="flex justify-between items-end">
                             <div>
                                <p className="text-[8px] font-medium text-syntry-slate-300/40 uppercase tracking-widest">Listing Price</p>
                                <p className="text-2xl font-medium text-white">GH₵{prop.price}</p>
                             </div>
                             <div className="text-right">
                                <p className="text-[8px] font-medium text-syntry-slate-300/40 uppercase tracking-widest">Target Yield</p>
                                <p className="text-lg font-medium text-syntry-teal-600">{prop.apy}</p>
                             </div>
                          </div>
                          <div className="h-[1px] bg-white/5 w-full"></div>
                          <div className="flex justify-between items-center text-[9px] uppercase tracking-widest font-medium">
                             <span className="text-syntry-slate-300/60">Fractional From</span>
                             <span className="text-white">GH₵{prop.fractionalPrice}</span>
                          </div>
                       </div>
                       <div className="grid grid-cols-2 gap-3 pt-4">
                          <a href={`/marketplace/${prop.id}`} className="bg-white/5 border border-white/10 text-white text-center py-4 rounded-md font-medium text-[9px] uppercase tracking-widest hover:bg-white/10 transition-all">Details</a>
                          <button className="bg-gradient-to-r from-syntry-teal-600 to-syntry-teal-700 text-white py-4 rounded-md font-medium text-[9px] uppercase tracking-widest hover:opacity-90 transition-all shadow-lg">Reserve</button>
                       </div>
                    </div>
                  </div>
                ))}
              </div>
           </div>
        ) : (
           <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-12">
              <div className="flex flex-col md:flex-row justify-between items-end gap-6">
                 <div>
                    <h1 className="text-4xl font-medium text-white tracking-tight">Seller Command</h1>
                    <p className="text-syntry-slate-300/60 font-medium">Manage your verified asset portfolio.</p>
                 </div>
                 <button onClick={() => setIsModalOpen(true)} className="bg-syntry-teal-600 text-white px-8 py-4 rounded-md font-medium text-[10px] uppercase tracking-widest shadow-xl shadow-syntry-teal-600/20">+ Add Listing</button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                 {[
                    { label: "Listed Value", value: "GH₵4.05M", sub: "Institutional" },
                    { label: "Active Nodes", value: "2", sub: "Sovereign Sync" },
                    { label: "Yield Disbursed", value: "GH₵125K", sub: "Verified" }
                 ].map((stat, i) => (
                    <div key={i} className="bg-white/5 p-8 rounded-md border border-white/10 relative overflow-hidden group">
                       <div className="absolute right-0 top-0 w-24 h-24 bg-syntry-teal-600/5 rounded-md -mr-12 -mt-12 transition-transform group-hover:scale-110"></div>
                       <p className="text-[9px] font-medium uppercase tracking-widest text-syntry-slate-300/40 mb-2">{stat.label}</p>
                       <p className="text-3xl font-medium text-white">{stat.value}</p>
                       <p className="text-[8px] font-medium uppercase tracking-[3px] text-syntry-teal-600 mt-2">{stat.sub}</p>
                    </div>
                 ))}
              </div>

              <div className="bg-white/5 rounded-md border border-white/10 shadow-2xl overflow-hidden backdrop-blur-md">
                 <div className="overflow-x-auto">
                    <table className="w-full text-left">
                       <thead className="bg-black/40 border-b border-white/5 text-[9px] font-medium uppercase tracking-widest text-syntry-slate-300/40">
                          <tr>
                             <th className="p-8">Asset</th>
                             <th className="p-8 text-center">Status</th>
                             <th className="p-8 text-center">Traffic</th>
                             <th className="p-8 text-right">Revenue</th>
                          </tr>
                       </thead>
                       <tbody className="divide-y divide-white/5">
                          <tr className="hover:bg-white/5 transition-colors">
                             <td className="p-8">
                                <p className="font-medium text-white">4-Bedroom Luxury Villa</p>
                                <p className="text-[9px] text-syntry-teal-600 uppercase tracking-widest mt-1">East Legon • GH₵2.85M</p>
                             </td>
                             <td className="p-8">
                                <div className="flex justify-center">
                                   <span className="bg-syntry-teal-600/10 text-syntry-teal-600 border border-syntry-teal-600/30 px-4 py-2 rounded-md text-[9px] font-medium uppercase tracking-widest flex items-center gap-2 shadow-inner">
                                      <span className="w-1.5 h-1.5 bg-syntry-teal-600 rounded-md animate-pulse"></span> Live on Exchange
                                   </span>
                                </div>
                             </td>
                             <td className="p-8 text-center text-white font-medium">1.2K</td>
                             <td className="p-8 text-right text-white font-medium">GH₵45K</td>
                          </tr>
                       </tbody>
                    </table>
                 </div>
              </div>
           </div>
        )}
      </main>

      {/* Floating AI Assistant */}
      <button 
        onClick={() => setIsAiOpen(!isAiOpen)}
        className="fixed bottom-10 right-10 z-50 bg-syntry-obsidian border border-syntry-teal-600/30 text-syntry-teal-600 p-5 rounded-md shadow-2xl hover:scale-105 transition-all group"
      >
        <span className="text-2xl group-hover:rotate-12 transition-transform inline-block">✨</span>
      </button>

      {isAiOpen && (
         <div className="fixed bottom-28 right-10 z-[100] w-96 h-[500px] bg-syntry-obsidian border border-white/10 rounded-md shadow-3xl flex flex-col animate-in slide-in-from-bottom-4 duration-300">
            <div className="p-6 border-b border-white/10 flex justify-between items-center bg-black/20">
               <h3 className="text-syntry-teal-600 font-medium text-sm uppercase tracking-widest">Syntry Assistant</h3>
               <button onClick={() => setIsAiOpen(false)} className="text-white hover:text-syntry-teal-600 transition-colors">✕</button>
            </div>
            <div className="flex-1 p-6 overflow-y-auto space-y-4">
               {aiMessages.map((msg, i) => (
                  <div key={i} className="bg-white/5 p-4 rounded-md border border-white/5">
                     <p className="text-xs text-syntry-slate-300 leading-relaxed">{msg.content}</p>
                  </div>
               ))}
            </div>
            <div className="p-4 border-t border-white/10 bg-black/20">
               <input type="text" placeholder="Ask anything..." className="w-full bg-white/5 border border-white/10 rounded-md px-4 py-3 text-xs text-white focus:border-syntry-teal-600 outline-none" />
            </div>
         </div>
      )}

      {/* Modal Placeholder */}
      {isModalOpen && (
         <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-syntry-obsidian/90 backdrop-blur-sm animate-in fade-in">
            <div className="bg-syntry-obsidian border border-white/10 w-full max-w-2xl rounded-md p-12 shadow-3xl relative">
               <button onClick={() => setIsModalOpen(false)} className="absolute top-8 right-8 text-white text-2xl hover:text-syntry-teal-600 transition-colors">✕</button>
               <h2 className="text-3xl font-medium text-white mb-6">List Your Asset</h2>
               <p className="text-syntry-slate-300 mb-10 leading-relaxed">Start the Sovereign validation process to access global liquidity. Our nodes will begin the 8-Layer audit immediately upon submission.</p>
               <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-6">
                     <div className="space-y-2">
                        <label className="text-[9px] uppercase tracking-widest text-syntry-slate-300/40">Asset Name</label>
                        <input type="text" className="w-full bg-white/5 border border-white/10 rounded-md px-4 py-4 text-sm text-white focus:border-syntry-teal-600 outline-none" placeholder="e.g. Aburi Plot 4" />
                     </div>
                     <div className="space-y-2">
                        <label className="text-[9px] uppercase tracking-widest text-syntry-slate-300/40">Location</label>
                        <input type="text" className="w-full bg-white/5 border border-white/10 rounded-md px-4 py-4 text-sm text-white focus:border-syntry-teal-600 outline-none" placeholder="e.g. Accra" />
                     </div>
                  </div>
                  <button onClick={() => setIsModalOpen(false)} className="w-full bg-gradient-to-r from-syntry-teal-600 to-syntry-teal-700 text-white py-5 rounded-md font-medium uppercase tracking-widest text-xs shadow-xl">Submit for Audit</button>
               </div>
            </div>
         </div>
      )}

      <GlobalFooter />
    </div>
  );
};

export default MarketplacePage;
