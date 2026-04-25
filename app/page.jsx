"use client";
import React from 'react';
import dynamic from 'next/dynamic';
const GlobalHeader = dynamic(() => import('@/components/GlobalHeader'), { ssr: false });
const GlobalFooter = dynamic(() => import('@/components/GlobalFooter'), { ssr: false });

export default function Home() {
  const verifiedStats = [
    { loc: "POKUASE S4", apy: "+12.4%", status: "Verified" },
    { loc: "ABURI HILLS", apy: "+18.2%", status: "Verified" },
    { loc: "LEGON HILLS", apy: "+22.4%", status: "Verified" },
    { loc: "AMASAMAN", apy: "+10.1%", status: "Verified" }
  ];

  return (
    <div className="min-h-screen bg-[#F8F1E3] text-[#003300] font-sans overflow-x-hidden">
      <GlobalHeader />
      
      <main className="pt-32 pb-20">
        {/* HERO SECTION */}
        <section className="px-4 md:px-8 max-w-7xl mx-auto mb-32 text-center lg:text-left grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="animate-in fade-in slide-in-from-left-8 duration-1000">
            <div className="inline-flex items-center gap-2 bg-[#003300]/5 px-4 py-2 rounded-full mb-8 border border-[#003300]/10">
              <span className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full animate-pulse"></span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#003300]/60">Ghana’s Sovereign Real Estate Exchange</span>
            </div>
            <h1 className="text-5xl md:text-8xl font-bold leading-[0.95] mb-8 tracking-tighter italic">
              Own Land with <br />
              <span className="text-[#D4AF37]">Confidence.</span>
            </h1>
            <p className="text-xl md:text-2xl opacity-70 max-w-xl mx-auto lg:mx-0 mb-12 font-medium leading-relaxed">
              Ghana’s modern property exchange. Pass your land through the 8 Layers of Grounded Truth and unlock its true value.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 items-center justify-center lg:justify-start">
               <a href="/verify-land-now" className="w-full sm:w-auto bg-[#D4AF37] text-[#003300] px-16 py-6 rounded-2xl font-bold text-2xl hover:scale-105 transition-all shadow-2xl shadow-[#D4AF37]/30 text-center">
                 Verify Land Now – Free
               </a>
               <a href="/marketplace" className="w-full sm:w-auto bg-[#00BFFF] text-white px-10 py-6 rounded-2xl font-bold text-sm uppercase tracking-widest hover:brightness-110 transition-all text-center">
                 Browse Marketplace
               </a>
            </div>
            <p className="mt-8 text-[11px] font-bold uppercase tracking-widest opacity-40 italic">Call or WhatsApp 0531102292 | info@syntry.co</p>
          </div>
          <div className="hidden lg:block relative group">
             <div className="absolute inset-0 bg-[#D4AF37]/5 blur-[120px] rounded-full transition-all duration-1000 group-hover:bg-[#D4AF37]/10"></div>
             <div className="relative w-full h-[650px] bg-[#003300] border-[16px] border-white rounded-[5rem] shadow-2xl overflow-hidden p-12 flex flex-col justify-between">
                <div>
                   <h3 className="text-white text-3xl font-bold mb-2 italic">Exchange Node v4</h3>
                   <div className="flex gap-4">
                      <span className="bg-[#D4AF37] text-[#003300] px-4 py-1 rounded-full text-[9px] font-black uppercase tracking-widest italic">Sovereign Active</span>
                      <span className="bg-white/10 text-white/40 px-4 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest">Litigation: 0.00%</span>
                   </div>
                </div>
                <div className="space-y-4">
                   {verifiedStats.map((s, i) => (
                     <div key={i} className="bg-white/5 border border-white/10 p-4 rounded-2xl flex justify-between items-center backdrop-blur-sm">
                        <span className="text-white/40 text-[10px] font-bold uppercase">{s.loc}</span>
                        <span className="text-[#D4AF37] text-lg font-bold">{s.apy}</span>
                     </div>
                   ))}
                </div>
             </div>
          </div>
        </section>

        {/* 8 LAYERS PREVIEW */}
        <section className="bg-[#003300] text-[#F8F1E3] py-24 mb-32">
           <div className="max-w-7xl mx-auto px-4 md:px-8 text-center md:text-left grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
              <div>
                 <h2 className="text-4xl font-bold mb-8 italic">Institutional Security. <br /> <span className="text-[#D4AF37]">8 Layers of Truth.</span></h2>
                 <p className="text-lg opacity-60 leading-relaxed max-w-md mb-12">We replace uncertainty with statutory finality. Every coordinate in the exchange is audited across 8 verification layers.</p>
                 <a href="/how-it-works" className="text-[#D4AF37] font-bold uppercase tracking-[4px] text-xs hover:underline decoration-2 border-b-2 border-[#D4AF37] pb-2">Explore Verification Protocol →</a>
              </div>
              <div className="grid grid-cols-2 gap-4">
                 {[1, 2, 3, 4].map((i) => (
                   <div key={i} className="bg-white/5 border border-white/10 p-8 rounded-[3rem] text-center">
                      <p className="text-4xl mb-4 opacity-20">🛡️</p>
                      <p className="text-[10px] font-bold uppercase tracking-widest opacity-40 mb-2">Layer 0{i}</p>
                      <p className="text-sm font-bold">Statutory Audit</p>
                   </div>
                 ))}
              </div>
           </div>
        </section>

        {/* DIASPORA TEASER */}
        <section className="px-4 md:px-8 max-w-7xl mx-auto mb-32 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
           <div className="order-2 md:order-1 relative h-[500px] bg-[#003300] rounded-[4rem] overflow-hidden group shadow-2xl border-[12px] border-white">
              <div className="absolute inset-0 flex items-center justify-center italic text-[#D4AF37] opacity-20 text-[10px]">Global Dashboard Preview</div>
              <div className="absolute bottom-10 left-10 p-8 bg-[#D4AF37] text-[#003300] rounded-3xl shadow-2xl">
                 <p className="text-[10px] font-black uppercase tracking-widest mb-1">Global Access</p>
                 <p className="text-2xl font-bold italic">Manage from anywhere.</p>
              </div>
           </div>
           <div className="order-1 md:order-2">
              <h2 className="text-4xl font-bold mb-8 italic">For the Diaspora. <br />Your Land, <span className="text-[#D4AF37]">Truly Yours.</span></h2>
              <p className="text-lg opacity-60 leading-relaxed mb-12">Manage and monitor your Ghanaian property portfolio from London, New York, or anywhere in the world. Secure international rent payouts directly into your local account.</p>
              <a href="/diaspora" className="bg-[#D4AF37] text-[#003300] px-12 py-5 rounded-2xl font-bold text-sm uppercase tracking-widest hover:scale-105 transition-all inline-block shadow-2xl shadow-[#D4AF37]/20">Explore Diaspora Portal</a>
           </div>
        </section>

        {/* FINAL HOME CTA */}
        <section className="px-4 md:px-8 max-w-5xl mx-auto text-center mb-20">
           <div className="bg-[#003300] text-[#F8F1E3] p-16 md:p-32 rounded-[6rem] shadow-2xl relative overflow-hidden group">
              <div className="absolute inset-0 bg-[#D4AF37]/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <h2 className="text-4xl md:text-7xl font-bold mb-10 italic tracking-tighter leading-none">The Future of <br /> Property in Ghana.</h2>
              <div className="flex flex-col md:flex-row gap-8 items-center justify-center">
                 <a href="/verify-land-now" className="w-full md:w-auto bg-[#D4AF37] text-[#003300] px-16 py-8 rounded-[2.5rem] font-bold text-2xl hover:scale-105 transition-all shadow-2xl">
                    Verify Land Now – Free
                 </a>
                 <a href="https://wa.me/233531102292" className="text-[10px] font-bold uppercase tracking-[4px] border-b-2 border-white/20 pb-2 hover:border-[#D4AF37] transition-all">Chat with Advisor</a>
              </div>
           </div>
        </section>
      </main>

      <GlobalFooter />
    </div>
  );
}
