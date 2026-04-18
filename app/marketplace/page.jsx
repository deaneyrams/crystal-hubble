"use client";
import React, { useState } from 'react';
import GlobalHeader from '../../components/GlobalHeader';
import GlobalFooter from '../../components/GlobalFooter';

const MarketplacePage = () => {
  const [mortgageOnly, setMortgageOnly] = useState(false);

  const properties = [
    {
      id: 1,
      title: "Aburi Hills Nodal Sector 4",
      location: "Aburi Hills",
      price: "1,350,000",
      apy: "18.2%",
      size: "2.4 Acres",
      mortgageEligible: true,
      verified: true,
      img: "[Lazy-loaded Property Photo]"
    },
    {
      id: 2,
      title: "East Legon Residential Plot",
      location: "East Legon",
      price: "2,850,000",
      apy: "15.5%",
      size: "0.5 Acres",
      mortgageEligible: true,
      verified: true,
      img: "[Lazy-loaded Property Photo]"
    },
    {
      id: 3,
      title: "Pokuase Mixed-Use Land",
      location: "Pokuase",
      price: "850,000",
      apy: "12.8%",
      size: "1.2 Acres",
      mortgageEligible: false,
      verified: true,
      img: "[Lazy-loaded Property Photo]"
    }
  ];

  const filteredProperties = mortgageOnly 
    ? properties.filter(p => p.mortgageEligible) 
    : properties;

  return (
    <div className="bg-[#F8F1E3] min-h-screen text-[#003300] font-sans">
      <GlobalHeader />

      <main className="pt-32 pb-20 px-4 md:px-8 max-w-7xl mx-auto">
        {/* Hero */}
        <section className="mb-12 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">Discover Verified Properties</h1>
          <p className="text-lg opacity-70 max-w-2xl mb-8">
            Every listing on the Sovereign Exchange is audited across 8 layers of grounded truth for statutory finality.
          </p>
        </section>

        {/* Filter Bar */}
        <section className="bg-white border border-[#D4AF37]/20 p-4 rounded-xl shadow-sm mb-12 flex flex-wrap items-center justify-between gap-6">
          <div className="flex flex-wrap gap-4 items-center">
            <select className="bg-transparent border-none text-sm font-bold focus:ring-0 cursor-pointer">
              <option>All Locations</option>
              <option>Aburi Hills</option>
              <option>East Legon</option>
              <option>Pokuase</option>
            </select>
            <div className="h-4 w-[1px] bg-[#003300]/10 hidden md:block"></div>
            <select className="bg-transparent border-none text-sm font-bold focus:ring-0 cursor-pointer">
              <option>Price Range</option>
              <option>Under GH₵1M</option>
              <option>GH₵1M - GH₵5M</option>
            </select>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-bold uppercase tracking-widest opacity-60">Mortgage Eligible</span>
            <button 
              onClick={() => setMortgageOnly(!mortgageOnly)}
              className={`w-12 h-6 rounded-full transition-all relative ${mortgageOnly ? 'bg-[#00BFFF]' : 'bg-[#003300]/10'}`}
            >
              <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${mortgageOnly ? 'left-7' : 'left-1'}`}></div>
            </button>
          </div>
        </section>

        {/* Property Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {filteredProperties.map((prop) => (
            <div key={prop.id} className="bg-white rounded-2xl overflow-hidden border border-[#D4AF37]/10 group hover:border-[#D4AF37]/40 hover:shadow-xl transition-all relative">
              <div className="h-64 bg-[#003300]/5 flex items-center justify-center text-xs opacity-40">
                {prop.img}
              </div>
              
              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {prop.verified && (
                  <span className="bg-[#D4AF37] text-[#003300] text-[9px] font-bold px-2 py-1 rounded shadow-sm uppercase tracking-tighter">
                    Verified Sovereign
                  </span>
                )}
                {prop.mortgageEligible && (
                  <span className="bg-[#00BFFF] text-white text-[9px] font-bold px-2 py-1 rounded shadow-sm uppercase tracking-tighter">
                    Mortgage Eligible
                  </span>
                )}
              </div>

              <div className="p-6">
                <p className="text-[10px] font-bold text-[#D4AF37] uppercase tracking-widest mb-1">{prop.location}</p>
                <h3 className="text-xl font-bold mb-4 group-hover:text-[#D4AF37] transition-colors">{prop.title}</h3>
                
                <div className="flex justify-between items-end mb-6">
                  <div>
                    <p className="text-xs opacity-60">Listing Price</p>
                    <p className="text-2xl font-bold text-[#003300]">GH₵{prop.price}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs opacity-60">Proj. APY</p>
                    <p className="text-sm font-bold text-[#00BFFF]">{prop.apy}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <a href={`/marketplace/${prop.id}`} className="bg-[#003300] text-[#F8F1E3] text-center py-4 rounded-xl font-bold text-[10px] uppercase tracking-widest hover:scale-[1.02] transition-all">
                    View Details
                  </a>
                  <button className="border-2 border-[#003300]/10 py-4 rounded-xl font-bold text-[10px] uppercase tracking-widest hover:bg-[#003300]/5 transition-all text-[#003300]">
                    Express Interest
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
      </main>

      <GlobalFooter />
    </div>
  );
};

export default MarketplacePage;
