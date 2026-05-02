"use client";
import React from 'react';
import GlobalHeader from '@/components/GlobalHeader';
import GlobalFooter from '@/components/GlobalFooter';

const SavedPropertiesPage = () => {
  const savedProperties = [
    {
      id: 1,
      name: "Aburi Hills Nodal Sector 4",
      location: "Aburi Hills",
      size: "2.4 Acres",
      price: "GH₵3,250,000",
      apy: "+18.2%",
      isVerified: true,
      mortgageEligible: true,
      dateSaved: "3 days ago",
      img: "[Aburi Hills Plot]"
    },
    {
      id: 2,
      name: "Residential Plot - East Legon",
      location: "East Legon",
      size: "0.25 Acres",
      price: "GH₵450,000",
      apy: "+12.5%",
      isVerified: true,
      mortgageEligible: true,
      dateSaved: "1 week ago",
      img: "[East Legon Plot]"
    }
  ];

  return (
    <div className="bg-[#fdfcf9] min-h-screen text-[#0F172A] font-sans">
      <GlobalHeader />

      <main className="pt-32 pb-20 px-4 md:px-8 max-w-7xl mx-auto">
        <header className="mb-8 border-b border-[#0F172A]/5 pb-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-4xl font-medium tracking-tight">My Saved Properties <span className="text-[#D4AF37] opacity-40 ml-2 text-2xl">{savedProperties.length} Saved</span></h1>
            <div className="hidden md:flex gap-4">
               <input 
                 type="text" 
                 placeholder="Search shortlist..."
                 className="py-2.5 px-6 rounded-xl border border-[#0F172A]/10 text-xs w-64 bg-white/50 focus:bg-white transition-all outline-none"
               />
            </div>
          </div>
          
          <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
            {['All', 'Mortgage Eligible', 'Verified Only'].map((filter) => (
              <button 
                key={filter}
                className="px-6 py-2 rounded-full text-[10px] font-medium uppercase tracking-widest border border-[#0F172A]/10 hover:border-[#D4AF37] hover:text-[#D4AF37] whitespace-nowrap transition-all"
              >
                {filter}
              </button>
            ))}
          </div>
        </header>

        {/* Summary Bar */}
        <div className="bg-[#0F172A] text-[#F8F1E3] p-8 rounded-[2rem] flex flex-col md:flex-row justify-between items-center gap-6 mb-12 shadow-xl border border-[#D4AF37]/20 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4AF37]/5 rounded-full blur-2xl"></div>
          <div>
            <p className="text-[10px] font-medium uppercase tracking-[2px] opacity-40 mb-1">Total Estimated Portfolio Value</p>
            <h3 className="text-3xl font-medium text-[#D4AF37]">GH₵3,700,000</h3>
          </div>
          <div className="flex gap-4 items-center">
            <div className="text-right hidden md:block">
              <p className="text-[10px] font-medium uppercase opacity-40">Verification Rate</p>
              <p className="text-sm font-medium">100% Statutory Health</p>
            </div>
            <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-xl">💎</div>
          </div>
        </div>

        {/* Property Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {savedProperties.length > 0 ? (
            savedProperties.map((prop) => (
              <div key={prop.id} className="bg-white border border-[#D4AF37]/5 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all relative group">
                <div className="h-56 bg-[#0F172A]/5 flex items-center justify-center text-[10px] opacity-20 italic">
                  {prop.img}
                </div>
                
                {/* Badges */}
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  {prop.isVerified && (
                    <span className="bg-[#D4AF37] text-[#0F172A] text-[9px] font-medium px-3 py-1 rounded-full uppercase tracking-tighter shadow-sm border border-white/20">
                      Verified Sovereign
                    </span>
                  )}
                  {prop.mortgageEligible && (
                    <span className="bg-[#1D9E75] text-white text-[9px] font-medium px-3 py-1 rounded-full uppercase tracking-tighter shadow-sm border border-white/20">
                      Mortgage Eligible
                    </span>
                  )}
                </div>

                <div className="p-8 pb-10">
                  <div className="mb-6">
                    <h3 className="font-medium text-lg mb-1 group-hover:text-[#D4AF37] transition-all">{prop.name}</h3>
                    <p className="text-[10px] opacity-40 font-medium uppercase tracking-widest">{prop.location} • {prop.size}</p>
                  </div>
                  
                  <div className="flex justify-between items-end mb-8">
                    <div>
                      <p className="text-xl font-medium">{prop.price}</p>
                      <p className="text-[9px] font-medium text-[#1D9E75] uppercase tracking-widest">APY: {prop.apy}</p>
                    </div>
                    <p className="text-[9px] opacity-30 font-medium uppercase tracking-tighter flex items-center gap-1">
                      <span>Saved</span> {prop.dateSaved}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 gap-3">
                    <a href={`/marketplace/${prop.id}`} className="bg-[#0F172A] text-white py-4 rounded-xl font-medium text-xs text-center hover:scale-[1.02] transition-all shadow-lg hover:shadow-[#D4AF37]/10">
                      View Details
                    </a>
                    <button className="text-red-500/50 hover:text-red-500 text-[9px] font-medium uppercase tracking-widest py-2 transition-all">
                      Remove from Saved
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full py-40 text-center opacity-40 border-2 border-dashed border-[#0F172A]/5 rounded-[3rem]">
              <p className="text-4xl mb-6">📂</p>
              <h3 className="text-xl font-medium mb-2 italic">Your shortlist is empty.</h3>
              <p className="text-xs mb-10">Start saving properties you're interested in from the Marketplace.</p>
              <a href="/marketplace" className="inline-block bg-[#D4AF37] text-white px-8 py-3 rounded-xl font-medium text-xs uppercase tracking-widest hover:scale-105 transition-all">
                Browse Marketplace
              </a>
            </div>
          )}
        </div>

        {/* CTA Bar */}
        <section className="bg-[#0F172A] text-[#F8F1E3] p-10 rounded-[3rem] text-center shadow-2xl relative overflow-hidden">
           <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4AF37]/5 rounded-full blur-3xl -mr-32 -mt-32"></div>
           <h2 className="text-2xl font-medium mb-4 relative z-10">Ready to take the next step?</h2>
           <p className="text-sm opacity-60 mb-8 relative z-10">All listed properties have gone through 8 Layers of Grounded Truth verification.</p>
           <a href="/marketplace" className="inline-block bg-[#00BFFF] text-[#0F172A] px-10 py-4 rounded-2xl font-medium hover:scale-105 transition-all text-sm relative z-10">
             Explore More Properties
           </a>
        </section>
      </main>

      <GlobalFooter />
    </div>
  );
};

export default SavedPropertiesPage;
