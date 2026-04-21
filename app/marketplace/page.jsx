"use client";
import React, { useState } from 'react';
import GlobalHeader from '../../components/GlobalHeader';
import GlobalFooter from '../../components/GlobalFooter';

const MarketplacePage = () => {
  const [mortgageOnly, setMortgageOnly] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [viewMode, setViewMode] = useState('buyer'); // 'buyer' or 'seller'
  const [isAiOpen, setIsAiOpen] = useState(false);
  const [aiMessages, setAiMessages] = useState([
    { role: "ai", content: "Hi! I’m your Syntry AI. Ask me about verified properties, 8 Layers verification, listing your asset, mortgage pre-approval, or anything else! 🎉" }
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
      imgPattern: "bg-gradient-to-br from-[#003300]/20 to-[#D4AF37]/20"
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
      imgPattern: "bg-gradient-to-tr from-[#1D9E75]/30 to-[#003300]/10"
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
      imgPattern: "bg-gradient-to-bl from-[#D4AF37]/30 to-[#003300]/10"
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
      imgPattern: "bg-gradient-to-b from-[#1D9E75]/20 to-[#D4AF37]/10"
    },
    {
      id: 5,
      title: "Student Hostel Block",
      type: "Commercial",
      location: "Kumasi (KNUST Area)",
      price: "3,200,000",
      fractionalPrice: "320,000",
      apy: "24.5%",
      litigation: "0.00%",
      mortgageEligible: true,
      verified: true,
      imgPattern: "bg-gradient-to-t from-[#003300]/30 to-[#1D9E75]/20"
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
      imgPattern: "bg-gradient-to-br from-[#D4AF37]/40 to-[#003300]/20"
    }
  ];

  const filteredProperties = mortgageOnly 
    ? properties.filter(p => p.mortgageEligible) 
    : properties;

  return (
    <div className="bg-[#F8F1E3] min-h-screen text-[#003300] font-sans">
      <GlobalHeader />

      <main className="pt-32 pb-20 px-4 md:px-8 max-w-7xl mx-auto min-h-[80vh]">
        {/* Dual-View Dashboard Toggle */}
        <div className="flex justify-center mb-12 relative z-30">
           <div className="bg-white p-1.5 rounded-[2rem] shadow-xl border border-[#003300]/10 flex items-center w-full max-w-md">
              <button 
                 onClick={() => setViewMode('buyer')}
                 className={`flex-1 py-3 rounded-[1.5rem] text-xs font-bold uppercase tracking-widest transition-all ${viewMode === 'buyer' ? 'bg-[#003300] text-[#D4AF37] shadow-md' : 'text-[#003300]/50 hover:bg-[#003300]/5'}`}
              >
                 Browse Properties
              </button>
              <button 
                 onClick={() => setViewMode('seller')}
                 className={`flex-1 py-3 rounded-[1.5rem] text-xs font-bold uppercase tracking-widest transition-all ${viewMode === 'seller' ? 'bg-[#D4AF37] text-[#003300] shadow-md' : 'text-[#003300]/50 hover:bg-[#003300]/5'}`}
              >
                 My Listings
              </button>
           </div>
        </div>

        {viewMode === 'buyer' ? (
           <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              {/* Redesigned Hero & Search Engine */}
        <section className="relative mb-16 pt-10">
           <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
              <div className="max-w-3xl">
                 <h1 className="text-4xl md:text-6xl font-bold text-[#003300] mb-4 tracking-tight">Syntry Marketplace – Verified Properties with Confidence</h1>
                 <p className="text-lg md:text-xl font-bold text-[#D4AF37] uppercase tracking-widest flex flex-wrap items-center gap-3 leading-relaxed">
                    8 Layers of Grounded Truth <span className="text-sm opacity-40 mx-1">•</span> Zero Litigation <span className="text-sm opacity-40 mx-1">•</span> Fractional Ownership Available
                 </p>
              </div>
              <button 
                 onClick={() => setIsModalOpen(true)}
                 className="bg-[#1D9E75] text-white px-8 py-5 rounded-2xl font-bold text-sm uppercase tracking-widest hover:scale-105 transition-all whitespace-nowrap shadow-xl shadow-[#1D9E75]/20"
              >
                 List Your Property
              </button>
           </div>

           {/* Central Search Console */}
           <div className="bg-white rounded-[2.5rem] p-6 lg:p-10 shadow-2xl border border-[#003300]/10 relative z-20">
              
              {/* Type Tabs */}
              <div className="flex items-center gap-2 mb-8 border-b border-[#003300]/5 pb-4 overflow-x-auto no-scrollbar">
                 <button className="bg-[#003300] text-white px-8 py-3 rounded-full text-xs font-bold uppercase tracking-widest shrink-0">For Sale</button>
                 <button className="text-[#003300]/50 hover:bg-[#003300]/5 px-8 py-3 rounded-full text-xs font-bold uppercase tracking-widest transition-colors shrink-0">For Rent</button>
                 <button className="text-[#003300]/50 hover:bg-[#003300]/5 px-8 py-3 rounded-full text-xs font-bold uppercase tracking-widest transition-colors shrink-0 flex items-center gap-3">
                    Fractional <span className="bg-[#D4AF37]/20 text-[#D4AF37] px-2 py-0.5 rounded text-[9px] animate-pulse">HOT</span>
                 </button>
              </div>

              {/* Primary Search Fields */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-end">
                 <div className="md:col-span-1 border border-[#003300]/10 rounded-2xl px-5 py-4 relative bg-[#F8F1E3]/30 hover:border-[#D4AF37] transition-colors">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-[#003300]/50 block mb-2">Location</label>
                    <select className="w-full bg-transparent border-none text-base font-bold text-[#003300] focus:ring-0 cursor-pointer appearance-none outline-none">
                       <option>All Locations</option>
                       <option>Accra (Cantonments, East Legon)</option>
                       <option>Kumasi</option>
                       <option>Aburi / Eastern Region</option>
                    </select>
                 </div>
                 
                 <div className="md:col-span-1 border border-[#003300]/10 rounded-2xl px-5 py-4 relative bg-[#F8F1E3]/30 hover:border-[#D4AF37] transition-colors">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-[#003300]/50 block mb-2">Property Type</label>
                    <select className="w-full bg-transparent border-none text-base font-bold text-[#003300] focus:ring-0 cursor-pointer appearance-none outline-none">
                       <option>Residential (All)</option>
                       <option>Commercial</option>
                       <option>Raw Land</option>
                       <option>Fractional Nodes</option>
                    </select>
                 </div>

                 <div className="md:col-span-1 border border-[#003300]/10 rounded-2xl px-5 py-4 relative bg-[#F8F1E3]/30 flex flex-col justify-center hover:border-[#D4AF37] transition-colors">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-[#003300]/50 block mb-2 flex justify-between">
                       <span>Price Range</span>
                       <span className="text-[#D4AF37]">Up to GH₵10M</span>
                    </label>
                    <input type="range" min="0" max="10000000" defaultValue="5000000" className="w-full h-1.5 bg-[#D4AF37]/30 rounded-lg appearance-none cursor-pointer accent-[#D4AF37]" />
                 </div>

                 <button className="md:col-span-1 bg-[#003300] text-[#D4AF37] h-[72px] rounded-2xl font-bold text-sm uppercase tracking-widest hover:bg-[#D4AF37] hover:text-[#003300] transition-colors flex items-center justify-center gap-2 shadow-xl shadow-[#003300]/10">
                    <span>Search Engine</span>
                 </button>
              </div>

              {/* Advanced Filter Chips */}
              <div className="mt-8 pt-6 border-t border-[#003300]/5 flex flex-wrap items-center gap-3">
                 <span className="text-[10px] font-bold uppercase tracking-widest text-[#003300]/40 mr-2 hidden sm:block">Advanced:</span>
                 
                 <label className="inline-flex cursor-pointer items-center gap-2 bg-[#F8F1E3] hover:bg-[#1D9E75]/10 border border-[#003300]/5 px-4 py-3 rounded-xl transition-colors">
                    <input type="checkbox" className="w-4 h-4 text-[#1D9E75] border-[#003300]/20 rounded bg-white focus:ring-[#1D9E75]" defaultChecked />
                    <span className="text-xs font-bold text-[#003300] uppercase tracking-wide">8 Layers Passed</span>
                 </label>
                 
                 <label className="inline-flex cursor-pointer items-center gap-2 bg-[#F8F1E3] hover:bg-[#003300]/5 border border-[#003300]/5 px-4 py-3 rounded-xl transition-colors">
                    <input type="checkbox" checked={mortgageOnly} onChange={() => setMortgageOnly(!mortgageOnly)} className="w-4 h-4 text-[#D4AF37] border-[#003300]/20 rounded bg-white focus:ring-[#D4AF37]" />
                    <span className="text-xs font-bold text-[#003300] uppercase tracking-wide">Mortgage Eligible</span>
                 </label>

                 <select className="text-xs font-bold text-[#003300] uppercase tracking-wide bg-[#F8F1E3] hover:bg-[#003300]/5 border border-[#003300]/5 px-5 py-3 rounded-xl outline-none cursor-pointer transition-colors appearance-none">
                    <option>Beds & Baths</option>
                    <option>3+ Bedrooms</option>
                    <option>4+ Bedrooms</option>
                 </select>

                 <select className="text-xs font-bold text-[#003300] uppercase tracking-wide bg-[#F8F1E3] hover:bg-[#003300]/5 border border-[#003300]/5 px-5 py-3 rounded-xl outline-none cursor-pointer transition-colors appearance-none decoration-transparent">
                    <option>Target Yield (APY)</option>
                    <option>&gt; 12% APY</option>
                    <option>&gt; 18% APY</option>
                 </select>
              </div>
           </div>
        </section>

        {/* Property Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {filteredProperties.map((prop) => (
            <div key={prop.id} className="bg-white rounded-[2rem] overflow-hidden border border-[#003300]/10 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 relative group flex flex-col h-full">
              {/* Image Area */}
              <div className={`h-64 ${prop.imgPattern} relative overflow-hidden flex items-center justify-center bg-gray-100`}>
                 <div className="absolute inset-0 bg-[#003300]/10 group-hover:bg-transparent transition-colors duration-500"></div>
                 <span className="text-5xl opacity-20 transform group-hover:scale-110 transition-transform duration-500">📸</span>
                 
                 {/* Top Badges */}
                 <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
                    <span className="bg-[#1D9E75] text-white text-[10px] font-bold px-3 py-1.5 rounded-lg shadow-md uppercase tracking-widest flex items-center gap-1">
                      <span className="text-[14px] leading-none">✓</span> Fully Verified
                    </span>
                 </div>
                 
                 <div className="absolute top-4 right-4 z-10">
                    <span className="bg-white/90 backdrop-blur-sm text-[#003300] text-[10px] font-bold px-3 py-1.5 rounded-lg shadow-md uppercase tracking-widest">
                      {prop.type}
                    </span>
                 </div>
              </div>
              
              <div className="p-6 md:p-8 flex flex-col flex-grow">
                 {/* Title & Location */}
                 <p className="text-[10px] font-bold text-[#D4AF37] uppercase tracking-widest mb-2 flex items-center gap-1.5">
                    <span className="text-sm">📍</span> {prop.location}
                 </p>
                 <h3 className="text-xl md:text-2xl font-bold text-[#003300] mb-6 leading-tight group-hover:text-[#1D9E75] transition-colors">{prop.title}</h3>
                 
                 {/* Price Section */}
                 <div className="mb-6 bg-[#F8F1E3]/50 rounded-2xl p-5 border border-[#003300]/5 hover:border-[#D4AF37]/30 transition-colors">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-[#003300]/50 mb-1">Outright Price</p>
                    <p className="text-3xl font-bold text-[#003300] mb-3 leading-none tracking-tight">GH₵{prop.price}</p>
                    <div className="h-[1px] w-full bg-[#003300]/10 my-3"></div>
                    <p className="text-[10px] font-bold text-[#D4AF37] tracking-widest flex items-center justify-between uppercase">
                       <span>Fractional From:</span>
                       <span className="bg-[#D4AF37]/10 px-2.5 py-1 rounded-md text-[#D4AF37] shadow-sm">GH₵{prop.fractionalPrice}</span>
                    </p>
                 </div>

                 {/* Metrics */}
                 <div className="grid grid-cols-2 gap-4 mb-8">
                    <div>
                       <p className="text-[10px] font-bold uppercase tracking-widest text-[#003300]/50 mb-1.5">Expected APY</p>
                       <p className="font-bold text-[#1D9E75] text-lg">{prop.apy}</p>
                    </div>
                    <div className="border-l border-[#003300]/10 pl-5">
                       <p className="text-[10px] font-bold uppercase tracking-widest text-[#003300]/50 mb-1.5">Litigation</p>
                       <p className="font-bold text-[#003300] text-lg flex items-center gap-1.5">
                         <span className="text-[#1D9E75] text-xs">●</span> {prop.litigation}
                       </p>
                    </div>
                 </div>

                 {/* Actions */}
                 <div className="grid grid-cols-2 gap-3 mt-auto pt-6 border-t border-[#003300]/5">
                    <a href={`/marketplace/${prop.id}`} className="bg-white border border-[#003300]/20 text-[#003300] text-center py-4 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-[#003300] hover:text-white transition-all shadow-sm">
                       View Details
                    </a>
                    <button className="bg-[#1D9E75] text-white py-4 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-[#157a5a] transition-colors shadow-lg shadow-[#1D9E75]/20">
                       Reserve Now
                    </button>
                 </div>
              </div>
            </div>
          ))}
        </div>

        {/* Tailored Bridge */}
        <section className="bg-[#003300] text-[#F8F1E3] p-12 md:p-20 rounded-[4rem] text-center relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-[100px] -mr-48 -mt-48"></div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 relative z-10 italic">Already have Pre-Approval?</h2>
          <p className="opacity-70 mb-10 max-w-xl mx-auto relative z-10 text-lg font-medium leading-relaxed">
            Switch to your tailored marketplace to see only the properties that fit your verified budget.
          </p>
          <a href="/dashboard" className="bg-[#D4AF37] text-[#003300] px-12 py-5 rounded-2xl font-bold text-[10px] uppercase tracking-[3px] hover:scale-105 transition-all inline-block relative z-10 shadow-xl shadow-[#D4AF37]/20">
            View My Tailored Properties
          </a>
        </section>
        </div>
        ) : (
           <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              {/* Seller Dashboard UI */}
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                 <div>
                    <h1 className="text-4xl md:text-5xl font-bold text-[#003300] mb-2 tracking-tight">Seller Dashboard</h1>
                    <p className="text-[#003300]/60 font-medium tracking-wide">Manage your properties, track yields, and monitor Verification status.</p>
                 </div>
                 <button 
                    onClick={() => setIsModalOpen(true)}
                    className="bg-[#1D9E75] text-white px-8 py-4 rounded-xl font-bold text-sm uppercase tracking-widest hover:scale-105 transition-all shadow-xl shadow-[#1D9E75]/20 flex items-center gap-2 max-w-max"
                 >
                    <span>+ List New Property</span>
                 </button>
              </div>

              {/* Stats Row */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                 <div className="bg-white p-6 md:p-8 rounded-[2rem] border border-[#003300]/10 shadow-sm relative overflow-hidden group hover:border-[#D4AF37]/50 transition-colors">
                    <div className="absolute right-0 top-0 w-32 h-32 bg-[#D4AF37]/10 rounded-bl-[100px] -mr-10 -mt-10 group-hover:scale-110 transition-transform duration-500"></div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-[#003300]/50 mb-2 relative z-10">Total Listed Value</p>
                    <p className="text-3xl md:text-4xl font-bold text-[#003300] relative z-10">GH₵4,050,000</p>
                 </div>
                 <div className="bg-white p-6 md:p-8 rounded-[2rem] border border-[#003300]/10 shadow-sm relative overflow-hidden group hover:border-[#1D9E75]/30 transition-colors">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-[#003300]/50 mb-2 relative z-10">Active Listings</p>
                    <p className="text-3xl md:text-4xl font-bold text-[#003300] relative z-10">2 <span className="text-sm text-[#1D9E75] font-medium tracking-wide ml-2 bg-[#1D9E75]/10 px-2 py-0.5 rounded-md">in Sovereign DB</span></p>
                 </div>
                 <div className="bg-[#003300] text-white p-6 md:p-8 rounded-[2rem] border border-[#D4AF37]/20 shadow-2xl relative overflow-hidden">
                    <div className="absolute right-0 bottom-0 w-48 h-48 bg-[#D4AF37]/5 rounded-tl-[100px] -mr-10 -mb-10 pointer-events-none"></div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-[#D4AF37] mb-2 relative z-10">Total Revenue Generated</p>
                    <p className="text-3xl md:text-4xl font-bold text-[#F8F1E3] relative z-10">GH₵125,400</p>
                 </div>
              </div>

              {/* Listings Table Management */}
              <div className="bg-white rounded-[2rem] border border-[#003300]/10 shadow-xl overflow-hidden relative z-10">
                 <div className="overflow-x-auto w-full no-scrollbar">
                    <table className="w-full text-left min-w-[800px]">
                       <thead className="bg-[#F8F1E3]/50 border-b border-[#003300]/5 text-[10px] font-bold uppercase tracking-widest text-[#003300]/50">
                          <tr>
                             <th className="p-6 md:p-8 whitespace-nowrap">Property Name</th>
                             <th className="p-6 md:p-8 whitespace-nowrap text-center">Protocol Status</th>
                             <th className="p-6 md:p-8 text-center whitespace-nowrap">Platform Views</th>
                             <th className="p-6 md:p-8 text-center whitespace-nowrap">Fractional Sold</th>
                             <th className="p-6 md:p-8 text-right whitespace-nowrap">Rents Dist.</th>
                             <th className="p-6 md:p-8 text-center whitespace-nowrap">Actions</th>
                          </tr>
                       </thead>
                       <tbody className="divide-y divide-[#003300]/5">
                          {/* Row 1 - Live */}
                          <tr className="hover:bg-[#F8F1E3]/30 transition-colors">
                             <td className="p-6 md:p-8">
                                <p className="font-bold text-[#003300] text-sm md:text-base">4-Bedroom Luxury Villa</p>
                                <p className="text-[10px] font-bold text-[#D4AF37] uppercase tracking-widest mt-1">East Legon • GH₵2.85M</p>
                             </td>
                             <td className="p-6 md:p-8 flex justify-center">
                                <span className="bg-[#1D9E75]/10 text-[#1D9E75] border border-[#1D9E75]/30 px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center gap-2 items-center justify-center w-max shadow-sm">
                                   <div className="w-2 h-2 rounded-full bg-[#1D9E75] animate-pulse shadow-[0_0_8px_#1D9E75]"></div> 
                                   Live on Exchange
                                </span>
                             </td>
                             <td className="p-6 md:p-8 text-center font-bold text-[#003300] text-lg">1,240</td>
                             <td className="p-6 md:p-8">
                                <div className="flex items-center gap-3">
                                   <div className="flex-1 max-w-[100px] h-2.5 bg-[#003300]/10 rounded-full overflow-hidden shadow-inner mx-auto">
                                      <div className="h-full bg-[#D4AF37]" style={{ width: '45%' }}></div>
                                   </div>
                                   <span className="text-xs font-bold text-[#003300]">45%</span>
                                </div>
                             </td>
                             <td className="p-6 md:p-8 text-right font-bold text-[#1D9E75] text-lg">GH₵45,000</td>
                             <td className="p-6 md:p-8 text-center">
                                <button className="text-[10px] font-bold uppercase tracking-widest text-[#003300] bg-white border border-[#003300]/20 px-5 py-2.5 rounded-xl hover:bg-[#003300] hover:text-white transition-all shadow-sm">Edit</button>
                             </td>
                          </tr>

                          {/* Row 2 - Pending */}
                          <tr className="hover:bg-[#F8F1E3]/30 transition-colors bg-gray-50/50">
                             <td className="p-6 md:p-8">
                                <p className="font-bold text-[#003300] text-sm md:text-base">2-Acre Mixed Use Plot</p>
                                <p className="text-[10px] font-bold text-[#D4AF37] uppercase tracking-widest mt-1">Aburi Hills • GH₵1.2M</p>
                             </td>
                             <td className="p-6 md:p-8 flex justify-center">
                                <span className="bg-[#D4AF37]/10 text-[#003300] border border-[#D4AF37]/30 px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center gap-2 items-center justify-center w-max shadow-sm">
                                   <div className="w-2 h-2 rounded-full bg-[#D4AF37]"></div> 
                                   Layer 4 Audit
                                </span>
                             </td>
                             <td className="p-6 md:p-8 text-center font-bold text-[#003300]/40 text-lg">--</td>
                             <td className="p-6 md:p-8 text-center">
                                <span className="text-[10px] font-bold uppercase tracking-widest text-[#003300]/40">Pending Protocol</span>
                             </td>
                             <td className="p-6 md:p-8 text-right font-bold text-[#003300]/40 text-lg">--</td>
                             <td className="p-6 md:p-8 text-center">
                                <button className="text-[10px] font-bold uppercase tracking-widest text-[#003300]/40 bg-[#003300]/5 border border-transparent px-5 py-2.5 rounded-xl cursor-not-allowed">Reviewing</button>
                             </td>
                          </tr>

                          {/* Row 3 - Sold */}
                          <tr className="hover:bg-[#F8F1E3]/30 transition-colors opacity-70">
                             <td className="p-6 md:p-8">
                                <p className="font-bold text-[#003300] text-sm md:text-base line-through">Commercial Retail Node</p>
                                <p className="text-[10px] font-bold text-[#003300]/50 uppercase tracking-widest mt-1">Cantonments • GH₵5.4M</p>
                             </td>
                             <td className="p-6 md:p-8 flex justify-center">
                                <span className="bg-[#003300]/10 text-[#003300]/70 border border-[#003300]/20 px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center gap-2 items-center justify-center w-max shadow-sm">
                                   <div className="w-2 h-2 rounded-full bg-[#003300]/50"></div> 
                                   Disbursed
                                </span>
                             </td>
                             <td className="p-6 md:p-8 text-center font-bold text-[#003300] text-lg">5,620</td>
                             <td className="p-6 md:p-8">
                                <div className="flex items-center gap-3">
                                   <div className="flex-1 max-w-[100px] h-2.5 bg-[#1D9E75]/20 rounded-full overflow-hidden shadow-inner mx-auto">
                                      <div className="h-full bg-[#1D9E75]" style={{ width: '100%' }}></div>
                                   </div>
                                   <span className="text-xs font-bold text-[#1D9E75]">100%</span>
                                </div>
                             </td>
                             <td className="p-6 md:p-8 text-right font-bold text-[#003300] text-lg">GH₵80,400</td>
                             <td className="p-6 md:p-8 text-center">
                                <button className="text-[10px] font-bold uppercase tracking-widest text-[#1D9E75] bg-[#1D9E75]/10 border border-[#1D9E75]/20 px-5 py-2.5 rounded-xl hover:bg-[#1D9E75] hover:text-white transition-all shadow-sm">Settle Funds</button>
                             </td>
                          </tr>
                       </tbody>
                    </table>
                 </div>
              </div>
           </div>
        )}
      </main>

      <GlobalFooter />

      {/* Floating WhatsApp Button */}
      <a 
        href="https://wa.me/233531102292" 
        className="fixed bottom-10 right-10 z-[3000] bg-[#25D366] text-white p-5 rounded-full shadow-[0_20px_50px_rgba(37,211,102,0.4)] hover:scale-110 transition-all animate-bounce"
        title="Contact Syntry Support"
      >
        <div className="flex items-center gap-3">
          <span className="text-3xl">💬</span>
          <span className="text-xs font-bold uppercase tracking-widest hidden md:block">053 110 2292</span>
        </div>
      </a>

      {/* Floating AI Button Toggle */}
      <button 
        onClick={() => setIsAiOpen(true)}
        className={`fixed bottom-[110px] right-10 z-[3000] bg-[#003300] text-[#D4AF37] p-4 md:p-5 rounded-full shadow-[0_20px_50px_rgba(0,51,0,0.4)] hover:scale-110 transition-all ${isAiOpen ? 'hidden' : 'flex'} items-center gap-3 border border-[#D4AF37]/30 group`}
        title="Ask Syntry AI"
      >
        <span className="text-3xl group-hover:rotate-12 transition-transform">✨</span>
        <span className="text-xs font-bold uppercase tracking-widest hidden md:block">Ask Syntry AI</span>
      </button>

      {/* AI Chat Modal */}
      {isAiOpen && (
         <div className="fixed bottom-10 right-4 md:right-10 z-[4000] w-[calc(100vw-32px)] md:w-[400px] bg-white rounded-3xl shadow-2xl border border-[#003300]/10 overflow-hidden flex flex-col h-[600px] max-h-[85vh] animate-in slide-in-from-bottom-10 fade-in duration-300">
            {/* Header */}
            <div className="bg-[#003300] p-5 md:p-6 flex justify-between items-center relative overflow-hidden shrink-0 border-b border-[#D4AF37]/30">
               <div className="absolute right-0 top-0 w-32 h-32 bg-[#D4AF37]/10 rounded-full blur-2xl -mr-16 -mt-16 pointer-events-none"></div>
               <div>
                  <h3 className="text-[#D4AF37] font-bold flex items-center gap-2 relative z-10 text-lg">
                     <span className="text-2xl">✨</span> Syntry AI Assistant
                  </h3>
                  <p className="text-[#F8F1E3]/70 text-[10px] uppercase tracking-widest font-bold mt-1.5 relative z-10 leading-tight">
                     How can I help you find or list property today?
                  </p>
               </div>
               <button 
                 onClick={() => setIsAiOpen(false)} 
                 className="text-white hover:text-[#D4AF37] transition-colors relative z-10 p-2 text-xl font-black bg-white/5 rounded-full w-10 h-10 flex items-center justify-center hover:bg-white/10"
               >
                 ✕
               </button>
            </div>

            {/* Chat Flow */}
            <div className="flex-1 p-5 md:p-6 overflow-y-auto bg-[#F8F1E3]/40 space-y-5 no-scrollbar">
               {aiMessages.map((msg, idx) => (
                  <div key={idx} className={`flex ${msg.role === 'ai' ? 'justify-start' : 'justify-end'}`}>
                     <div className={`max-w-[85%] p-4 rounded-2xl text-sm font-medium leading-relaxed shadow-sm ${msg.role === 'ai' ? 'bg-white border border-[#003300]/10 text-[#003300] rounded-tl-sm' : 'bg-[#1D9E75] text-white rounded-tr-sm'}`}>
                        {msg.content}
                     </div>
                  </div>
               ))}
               
               {/* Quick Replies Engine */}
               <div className="flex flex-col gap-2.5 pt-4">
                  <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#003300]/40 text-center mb-1 flex items-center justify-center gap-2">
                     <span className="w-4 h-[1px] bg-[#003300]/20"></span>
                     Suggested Prompts
                     <span className="w-4 h-[1px] bg-[#003300]/20"></span>
                  </span>
                  {[
                    "Show me East Legon plots",
                    "Help me list my property",
                    "What is the 8 Layers?",
                    "Check mortgage readiness"
                  ].map((prompt, i) => (
                     <button key={i} className="bg-white border border-[#003300]/10 text-[#003300] text-xs font-bold py-3 px-5 rounded-xl hover:border-[#D4AF37] hover:text-[#003300] hover:bg-[#D4AF37]/5 transition-all text-left shadow-sm flex items-center justify-between group">
                        {prompt}
                        <span className="text-[#D4AF37] opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                     </button>
                  ))}
               </div>
            </div>

            {/* Input Terminal */}
            <div className="p-4 md:p-5 bg-white border-t border-[#003300]/10 shrink-0 relative z-10">
               <form 
                  className="relative flex items-center" 
                  onSubmit={(e) => { 
                     e.preventDefault(); 
                     // TODO: Connect to Synapse AI Gateway
                     // const res = await fetch('/api/ai/chat', { method: 'POST', body: JSON.stringify({ message }) });
                     alert("Syntry AI Node Connected. Processing intent..."); 
                  }}
               >
                  <input 
                     type="text" 
                     placeholder="Type your message..." 
                     className="w-full bg-[#F8F1E3]/50 border border-[#003300]/10 rounded-2xl pl-5 pr-14 py-4 text-sm font-medium focus:outline-none focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/30 transition-shadow" 
                  />
                  <button 
                     type="submit" 
                     className="absolute right-3 w-10 h-10 bg-[#1D9E75] text-white rounded-xl flex items-center justify-center hover:bg-[#157a5a] transition-colors shadow-md shadow-[#1D9E75]/20 font-black text-lg"
                  >
                     ↑
                  </button>
               </form>
               <div className="text-center mt-3">
                  <span className="text-[8px] font-bold uppercase tracking-widest text-[#003300]/30 shadow-sm">Secured by Sovereign Protocol</span>
               </div>
            </div>
         </div>
      )}

      {/* Listing Modal Overlay */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[4000] bg-[#003300]/80 backdrop-blur-sm flex items-center justify-center p-4 py-8 overflow-y-auto w-full">
           <div className="bg-[#F8F1E3] w-full max-w-4xl rounded-[2.5rem] shadow-2xl relative overflow-hidden my-auto border border-[#D4AF37]/20 flex flex-col max-h-full">
              {/* Modal Header */}
              <div className="bg-[#003300] p-8 md:p-10 text-white relative shrink-0 border-b border-[#D4AF37]/30">
                 <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4AF37]/10 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none"></div>
                 <button 
                    onClick={() => setIsModalOpen(false)}
                    className="absolute top-8 right-8 w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-xl hover:bg-[#1D9E75] hover:rotate-90 transition-all z-10 font-bold"
                 >
                    ✕
                 </button>
                 <h2 className="text-3xl md:text-5xl font-bold mb-3 italic tracking-tight relative z-10 text-[#D4AF37]">List Your Property</h2>
                 <p className="text-[#F8F1E3]/80 text-lg md:text-xl font-medium tracking-tight relative z-10 max-w-xl flex items-center gap-2"><span className="text-2xl">🏛️</span> Start the Sovereign validation process to access premium global liquidity.</p>
              </div>

              {/* Modal Body / Form */}
              <div className="p-8 md:p-10 overflow-y-auto no-scrollbar">
                 <form className="space-y-8" onSubmit={(e) => { e.preventDefault(); alert('Form submitted to Protocol Node'); setIsModalOpen(false);}}>
                    
                    {/* Section 1 */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                       <div className="space-y-2">
                          <label className="text-[10px] font-bold uppercase tracking-widest text-[#003300]/60 pl-2">Property Type</label>
                          <select className="w-full bg-white border border-[#003300]/10 rounded-2xl px-6 py-4 font-bold text-[#003300] focus:outline-none focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 appearance-none shadow-sm cursor-pointer hover:border-[#D4AF37]/40 transition-colors">
                             <option>Land / Plot</option>
                             <option>House / Villa</option>
                             <option>Apartment / Condo</option>
                             <option>Commercial</option>
                          </select>
                       </div>
                       <div className="space-y-2">
                          <label className="text-[10px] font-bold uppercase tracking-widest text-[#003300]/60 pl-2">Size (Acres / SQM)</label>
                          <input type="text" required placeholder="e.g. 0.25 Acres" className="w-full bg-white border border-[#003300]/10 rounded-2xl px-6 py-4 font-medium text-[#003300] focus:outline-none focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 shadow-sm hover:border-[#D4AF37]/40 transition-colors" />
                       </div>
                    </div>

                    {/* Section 2 */}
                    <div className="space-y-2">
                       <label className="text-[10px] font-bold uppercase tracking-widest text-[#003300]/60 pl-2 flex justify-between">
                         <span>Location Details</span>
                         <span className="text-[#1D9E75] hover:underline cursor-pointer">Drop a pin on map</span>
                       </label>
                       <input type="text" required placeholder="e.g. East Legon Ext. Plot 42, Accra" className="w-full bg-white border border-[#003300]/10 rounded-2xl px-6 py-4 font-medium text-[#003300] focus:outline-none focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 shadow-sm hover:border-[#D4AF37]/40 transition-colors mb-3" />
                       
                       <div className="w-full h-32 bg-[#F8F1E3]/50 rounded-xl border border-[#003300]/10 flex flex-col items-center justify-center text-[#003300]/40 overflow-hidden relative group cursor-pointer hover:bg-[#003300]/5 transition-colors shadow-inner">
                          <span className="text-4xl mb-2 group-hover:scale-110 transition-transform">🗺️</span>
                          <span className="text-[10px] font-bold uppercase tracking-widest shadow-sm">Google Maps Embed Placeholder</span>
                       </div>
                    </div>

                    {/* Section 3 */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                       <div className="space-y-2">
                          <label className="text-[10px] font-bold uppercase tracking-widest text-[#003300]/60 pl-2">Title Number / GPS Coordinates</label>
                          <input type="text" required placeholder="e.g. GA-123-4567" className="w-full bg-white border border-[#003300]/10 rounded-2xl px-6 py-4 font-medium text-[#003300] focus:outline-none focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 shadow-sm hover:border-[#D4AF37]/40 transition-colors" />
                       </div>
                    </div>

                    {/* Section 4 */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 rounded-[1.5rem] border border-[#003300]/10 shadow-sm hover:border-[#D4AF37]/20 transition-colors">
                       <div className="space-y-2">
                          <label className="text-[10px] font-bold uppercase tracking-widest text-[#003300]/60 pl-2">Asking Price (Outright)</label>
                          <div className="relative">
                             <span className="absolute left-6 top-4 font-bold text-[#003300]/50">GH₵</span>
                             <input type="text" required placeholder="0.00" className="w-full bg-[#F8F1E3]/50 border-none rounded-2xl pl-16 pr-6 py-4 font-bold text-[#003300] text-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/30" />
                          </div>
                       </div>
                       <div className="space-y-2">
                          <label className="text-[10px] font-bold uppercase tracking-widest text-[#003300]/60 pl-2 flex items-center justify-between">
                            <span>Fractional Offer (Optional)</span>
                            <span className="bg-[#D4AF37]/20 text-[#D4AF37] px-2 py-0.5 rounded text-[8px] animate-pulse shadow-sm">BOOST EXPOSURE</span>
                          </label>
                          <div className="relative">
                             <span className="absolute left-6 top-4 font-bold text-[#003300]/50">GH₵</span>
                             <input type="text" placeholder="0.00" className="w-full bg-[#F8F1E3]/50 border-none rounded-2xl pl-16 pr-6 py-4 font-bold text-[#003300] text-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/30" />
                          </div>
                       </div>
                    </div>

                    {/* Section 5 */}
                    <div className="space-y-2">
                       <label className="text-[10px] font-bold uppercase tracking-widest text-[#003300]/60 pl-2">Description & Documents</label>
                       <textarea rows="4" placeholder="Briefly describe the property, current condition, and existing infrastructure..." className="w-full bg-white border border-[#003300]/10 rounded-2xl px-6 py-4 font-medium text-[#003300] focus:outline-none focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 shadow-sm hover:border-[#D4AF37]/40 transition-colors mb-3"></textarea>
                       
                       <div className="w-full bg-white/50 border-2 border-dashed border-[#003300]/20 rounded-2xl p-8 flex flex-col items-center justify-center text-center hover:bg-[#003300]/5 hover:border-[#D4AF37] transition-all cursor-pointer">
                          <span className="text-4xl mb-3">📁</span>
                          <p className="text-sm font-bold text-[#003300] mb-1">Upload Photos & Documents</p>
                          <p className="text-[10px] uppercase font-bold text-[#003300]/50 tracking-widest">Site plans, Indentures, High-Res Images</p>
                       </div>
                    </div>

                    {/* Confirmation Checkbox */}
                    <div className="bg-[#1D9E75]/5 border border-[#1D9E75]/30 p-6 md:p-8 rounded-[1.5rem] mt-8 hover:bg-[#1D9E75]/10 transition-colors shadow-sm">
                       <label className="flex items-start gap-4 cursor-pointer group">
                          <div className="mt-1 flex-shrink-0">
                            <input type="checkbox" required className="w-6 h-6 text-[#1D9E75] border-[#003300]/20 rounded focus:ring-[#1D9E75] bg-white cursor-pointer shadow-sm group-hover:border-[#1D9E75] transition-colors" />
                          </div>
                          <div className="space-y-1.5">
                             <p className="font-bold text-[#003300] text-base md:text-lg leading-tight">I confirm this property has clear title and is free of active litigation.</p>
                             <p className="text-[10px] font-bold uppercase tracking-widest text-[#003300]/60 leading-relaxed">I understand this asset will undergo the <a href="/how-it-works" target="_blank" className="text-[#D4AF37] hover:underline whitespace-nowrap bg-[#D4AF37]/10 px-1 rounded mx-0.5">8-Layer verification process ↗</a>.</p>
                          </div>
                       </label>
                    </div>

                    {/* Submit Actions */}
                    <div className="pt-6 pb-2 relative">
                       <button type="submit" className="w-full bg-[#1D9E75] text-white px-8 py-5 md:py-6 rounded-2xl font-bold text-lg md:text-xl uppercase tracking-widest hover:bg-[#157a5a] transition-all flex items-center justify-center gap-3 shadow-xl shadow-[#1D9E75]/30 hover:shadow-2xl hover:shadow-[#1D9E75]/40 hover:-translate-y-1">
                          <span>Submit for 8-Layer Verification</span>
                          <span className="text-2xl shadow-sm">🛡️</span>
                       </button>
                       <p className="text-center mt-6 text-[10px] font-bold uppercase tracking-[0.2em] text-[#003300]/40 flex items-center justify-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-[#003300]/20"></span>
                          Staff & Developers – Use same form for bulk listings
                          <span className="w-2 h-2 rounded-full bg-[#003300]/20"></span>
                       </p>
                    </div>
                 </form>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default MarketplacePage;
