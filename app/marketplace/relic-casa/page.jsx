import React from 'react';
import GlobalHeader from '../../../components/GlobalHeader';
import GlobalFooter from '../../../components/GlobalFooter';

const RelicCasaPage = () => {
  const prefabHomes = [
    {
      id: 1,
      title: "The Nodal Core - 1 Bed",
      price: "450,000",
      size: "65 sqm",
      buildTime: "8 Weeks",
      features: ["Verified Land Included", "Solar Ready", "High Yield"],
      img: "[Prefab Home Placeholder]"
    },
    {
      id: 2,
      title: "Sovereign Villa - 3 Bed",
      price: "1,150,000",
      size: "180 sqm",
      buildTime: "12 Weeks",
      features: ["Premium Finishes", "Land Included", "Mortgage Ready"],
      img: "[Prefab Villa Placeholder]"
    }
  ];

  return (
    <div className="bg-[#F8F1E3] min-h-screen text-[#0F172A] font-sans">
      <GlobalHeader />

      <main className="pt-32 pb-20 px-4 md:px-8 max-w-7xl mx-auto">
        {/* Warm Hero */}
        <section className="mb-20 text-center md:text-left">
          <div className="inline-flex items-center gap-2 bg-[#D4AF37]/10 text-[#D4AF37] px-4 py-2 rounded-full mb-6">
            <span className="w-2 h-2 bg-[#D4AF37] rounded-full"></span>
            <span className="text-xs font-medium uppercase tracking-widest">Affordable Housing Solutions</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-medium mb-6 tracking-tight">Relic Casa × Syntry</h1>
          <p className="text-xl opacity-70 max-w-2xl mb-12">
            When standard listings don't match your threshold, explore fast-build, verified Relic Casa prefab homes on Syntry territory.
          </p>
          
          <div className="bg-white border border-[#D4AF37]/30 p-8 rounded-3xl inline-block text-left shadow-lg">
            <p className="text-xs font-medium uppercase opacity-40 mb-2">Based on your Pre-Approval</p>
            <p className="text-2xl font-medium text-[#0F172A]">These homes fit your GH₵1,250,000 budget</p>
          </div>
        </section>

        {/* Homes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
          {prefabHomes.map((home) => (
            <div key={home.id} className="bg-white rounded-3xl overflow-hidden border border-[#D4AF37]/10 group hover:border-[#D4AF37]/50 shadow-sm hover:shadow-xl transition-all">
              <div className="h-72 bg-[#0F172A]/5 flex items-center justify-center text-xs opacity-40">
                {home.img}
              </div>
              <div className="p-10">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="text-2xl font-medium mb-2">{home.title}</h3>
                    <p className="text-[#00BFFF] font-medium text-sm tracking-widest uppercase">{home.size} | {home.buildTime}</p>
                  </div>
                  <span className="bg-[#1D9E75] text-white text-[10px] font-medium px-3 py-1 rounded-full uppercase">
                    Mortgage Ready
                  </span>
                </div>
                
                <p className="text-3xl font-medium text-[#0F172A] mb-8">GH₵{home.price}</p>

                <div className="flex flex-wrap gap-2 mb-10">
                  {home.features.map((f, i) => (
                    <span key={i} className="bg-[#F8F1E3] text-[#0F172A] text-[10px] font-medium px-3 py-1.5 rounded-lg border border-[#D4AF37]/20 uppercase">
                      {f}
                    </span>
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <button className="bg-[#0F172A] text-[#F8F1E3] py-4 rounded-xl font-medium text-xs hover:bg-[#004d00] transition-all">
                    View Floorplan
                  </button>
                  <button className="bg-[#00BFFF] text-[#0F172A] py-4 rounded-xl font-medium text-xs hover:scale-105 transition-all">
                    Connect Mortgage
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Why Feature */}
        <section className="bg-[#0F172A] text-[#F8F1E3] p-12 md:p-20 rounded-[3rem] relative overflow-hidden text-center md:text-left">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-3xl -mr-48 -mt-48"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center relative z-10">
            <div>
              <h2 className="text-3xl md:text-4xl font-medium mb-8">Why Relic Casa + Syntry?</h2>
              <ul className="space-y-6">
                {[
                  { t: "Lower Entry Cost", d: "Luxury living starting from just GH₵450,000." },
                  { t: "Verified Territory", d: "Homes built only on Syntry 8-Layer verified plots." },
                  { t: "Fast possession", d: "Move in within 12 weeks of mortgage funding." }
                ].map((item, i) => (
                  <li key={i} className="flex gap-4">
                    <span className="w-6 h-6 bg-[#D4AF37] text-[#0F172A] rounded-full flex items-center justify-center shrink-0 font-medium text-xs">✓</span>
                    <div>
                      <p className="font-medium text-lg">{item.t}</p>
                      <p className="opacity-60 text-sm">{item.d}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="grid grid-cols-2 gap-4">
               <button className="col-span-2 bg-[#D4AF37] text-[#0F172A] p-6 rounded-2xl font-medium text-xl hover:scale-105 transition-all">
                 Request Prefab Catalog
               </button>
               <a href="https://wa.me/233531102292" className="col-span-2 bg-[#25D366] text-white p-6 rounded-2xl font-medium text-xl hover:scale-105 transition-all flex items-center justify-center gap-4">
                 Chat with Relic Casa Advisor ↗
               </a>
            </div>
          </div>
        </section>
      </main>

      <GlobalFooter />
    </div>
  );
};

export default RelicCasaPage;
