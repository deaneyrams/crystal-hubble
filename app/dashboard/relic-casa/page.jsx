"use client";
import React from 'react';
import GlobalHeader from '@/components/GlobalHeader';
import GlobalFooter from '@/components/GlobalFooter';

const RelicCasaDashboard = () => {
  const activeProjects = [
    {
      id: 1,
      name: "The Nodal Core (Lot 82)",
      location: "Aburi Hills",
      status: "Construction",
      progress: 65,
      eta: "4 Weeks",
      img: "[Prefab Construction Photo]"
    }
  ];

  const availableHomes = [
    {
      id: 101,
      title: "Sovereign Villa - 3 Bed",
      price: "1,150,000",
      size: "180 sqm",
      buildTime: "12 Weeks",
      fitsBudget: true,
      img: "[Prefab Villa Placeholder]"
    }
  ];

  return (
    <div className="bg-[#fdfcf9] min-h-screen text-[#003300] font-sans">
      <GlobalHeader />
      
      <main className="pt-32 pb-20 px-4 md:px-8 max-w-7xl mx-auto">
        {/* Warm Header */}
        <section className="mb-12">
          <div className="flex items-center gap-2 mb-4">
            <span className="bg-[#D4AF37]/20 text-[#D4AF37] px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">
              Relic Casa Authorized
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">Welcome to Relic Casa</h1>
          <p className="text-lg opacity-70">Affordable, Fast Homes Backed by Syntry 8-Layer Verification.</p>
        </section>

        {/* My Projects */}
        <section className="mb-20">
          <h2 className="text-2xl font-bold mb-8">My Relic Casa Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {activeProjects.map((proj) => (
              <div key={proj.id} className="bg-white border border-[#D4AF37]/10 p-8 rounded-3xl shadow-sm hover:shadow-xl transition-all">
                <div className="h-40 bg-[#003300]/5 rounded-2xl mb-6 flex items-center justify-center text-[10px] opacity-30 italic">
                  {proj.img}
                </div>
                <h3 className="text-xl font-bold mb-2">{proj.name}</h3>
                <p className="text-xs opacity-60 mb-6 font-medium">{proj.location} • ETA: {proj.eta}</p>
                
                <div className="mb-6">
                  <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest opacity-40 mb-2">
                    <span>{proj.status} Phase</span>
                    <span>{proj.progress}%</span>
                  </div>
                  <div className="h-1.5 bg-[#003300]/5 rounded-full overflow-hidden">
                    <div className="h-full bg-[#1D9E75] transition-all" style={{ width: `${proj.progress}%` }}></div>
                  </div>
                </div>
                
                <button className="w-full bg-[#003300] text-[#F8F1E3] py-3 rounded-xl font-bold text-xs hover:bg-[#004d00] transition-all">
                  View Development Reports
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Budget Matcher Teaser */}
        <section className="mb-20 bg-[#D4AF37]/5 border border-[#D4AF37]/20 p-10 rounded-[3rem] text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h2 className="text-3xl font-bold mb-2">Budget Matcher Tool</h2>
            <p className="opacity-70 font-medium">Based on your GH₵1,250,000 approval, here are homes you can afford right now.</p>
          </div>
          <button className="bg-[#00BFFF] text-[#003300] px-10 py-4 rounded-2xl font-bold hover:scale-105 transition-all text-sm whitespace-nowrap">
            Explore My Matches
          </button>
        </section>

        {/* Available Homes */}
        <section>
          <div className="flex justify-between items-end mb-10">
            <h2 className="text-2xl font-bold">Featured Fast-Build Homes</h2>
            <button className="text-[#00BFFF] text-sm font-bold uppercase tracking-widest hover:underline">Browse All</button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {availableHomes.map((home) => (
              <div key={home.id} className="bg-white border border-[#003300]/5 rounded-3xl overflow-hidden group hover:shadow-2xl transition-all relative">
                <div className="h-64 bg-[#003300]/5 flex items-center justify-center text-xs opacity-30">
                  {home.img}
                </div>
                {home.fitsBudget && (
                  <span className="absolute top-4 left-4 bg-[#1D9E75] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase shadow-lg">
                    Fits Your Budget
                  </span>
                )}
                <div className="p-8">
                  <h3 className="text-xl font-bold mb-2 group-hover:text-[#D4AF37] transition-all">{home.title}</h3>
                  <div className="flex gap-3 mb-6">
                    <span className="text-[10px] font-bold opacity-40 uppercase tracking-widest">{home.size}</span>
                    <span className="text-[10px] font-bold text-[#D4AF37] uppercase tracking-widest">Build: {home.buildTime}</span>
                  </div>
                  <p className="text-2xl font-bold text-[#003300] mb-8">GH₵{home.price}</p>
                  <a href="https://wa.me/233531102292" target="_blank" rel="noreferrer" className="bg-[#25D366] text-white w-full py-4 rounded-xl font-bold flex items-center justify-center gap-3 text-sm hover:scale-105 transition-all">
                    Talk to Advisor
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Why Choose Relic Casa */}
        <section className="mt-24 py-20 border-t border-[#003300]/10 grid grid-cols-1 md:grid-cols-4 gap-8">
           {[
             { t: "Fast-Build", d: "Move in within 12 weeks of funding." },
             { t: "Verified Land", d: "Grounded truth on every plot." },
             { t: "Mortgage Ready", d: "Instantly linked to your pre-approval." },
             { t: "Sovereign Yield", d: "High appreciation in nodal sectors." }
           ].map((feat, i) => (
             <div key={i} className="space-y-3">
               <div className="w-10 h-10 bg-[#D4AF37]/10 text-[#D4AF37] rounded-lg flex items-center justify-center font-bold">✓</div>
               <h4 className="font-bold">{feat.t}</h4>
               <p className="text-xs opacity-60 leading-relaxed font-medium">{feat.d}</p>
             </div>
           ))}
        </section>
      </main>

      <GlobalFooter />
    </div>
  );
};

export default RelicCasaDashboard;
