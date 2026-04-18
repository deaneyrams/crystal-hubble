"use client";
import { Suspense } from 'react';
import React from 'react';
import GlobalHeader from '../../components/GlobalHeader';
import GlobalFooter from '../../components/GlobalFooter';

const MortgageEnablementPage = () => {
  const problemSolution = [
    { p: "Banks reject properties with legacy title doubts.", s: "Syntry's 8-Layer Statutory Audit removes all lender uncertainty." },
    { p: "Inconsistent valuations delay loan processing.", s: "Real-time, data-driven index accepted by institutional portals." },
    { p: "Lack of pre-approved, bankable land stock.", s: "A curated marketplace of land already verified for mortgage." }
  ];

  const benefits = [
    { title: "Statutory Finality", desc: "Permanent land record locking with 8 Layers.", icon: "📜" },
    { title: "Bank Sync", desc: "Data integration with Ghana's leading lenders.", icon: "🏦" },
    { title: "One-Click Audit", desc: "Download institutional property health reports.", icon: "📈" },
    { title: "Fraud Immunity", desc: "Synthetic verification protects against double-sales.", icon: "🛡️" },
    { title: "Escrow Logic", desc: "Secure statutory node for loan disbursements.", icon: "💰" },
    { title: "Rapid Payouts", desc: "Accelerated funding for verified property owners.", icon: "⚡" }
  ];

  const properties = [
    { name: "Aburi Hills Sector 4", price: "GH₵450,000", status: "Mortgage Ready", apy: "14.2%" },
    { name: "Spintex Heights B", price: "GH₵1.2M", status: "Mortgage Ready", apy: "18.8%" },
    { name: "Pokuase Nodal Plot", price: "GH₵280,000", status: "Mortgage Ready", apy: "12.5%" }
  ];

  return (
    <Suspense fallback={<div className="bg-[#050508] min-h-screen" />}>
      <div className="bg-[#F8F1E3] min-h-screen text-[#003300] font-sans">
        <GlobalHeader />

        <main className="pt-32 pb-20 overflow-hidden">
          {/* Hero Section */}
          <section className="px-4 md:px-8 max-w-7xl mx-auto mb-32 text-center lg:text-left grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="animate-in fade-in slide-in-from-left-8 duration-1000">
              <div className="inline-flex items-center gap-2 bg-[#D4AF37]/10 px-4 py-2 rounded-full mb-8 border border-[#D4AF37]/20">
                <span className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full animate-pulse"></span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#D4AF37]">Syntry Finance Infrastructure</span>
              </div>
              <h1 className="text-5xl md:text-8xl font-bold leading-[1.0] mb-8 tracking-tighter italic">
                Mortgage <br />
                <span className="text-[#D4AF37]">Enablement</span>
              </h1>
              <p className="text-xl md:text-2xl opacity-70 max-w-xl mx-auto lg:mx-0 mb-12 font-medium leading-relaxed">
                Making Property Finance Faster and Safer in Ghana. Syntry provides the verified infrastructure banks and owners need to unlock capital.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 items-center justify-center lg:justify-start">
                 <a href="/check-my-property" className="w-full sm:w-auto bg-[#D4AF37] text-[#003300] px-14 py-6 rounded-2xl font-bold text-xl hover:scale-105 transition-all shadow-2xl shadow-[#D4AF37]/30 text-center">
                   Verify Land Now – Free
                 </a>
                 <a href="/dashboard/pre-approval" className="w-full sm:w-auto bg-[#00BFFF] text-white px-10 py-6 rounded-2xl font-bold text-[10px] tracking-[3px] uppercase hover:brightness-110 transition-all text-center">
                   Check My Buying Power
                 </a>
              </div>
            </div>
            <div className="hidden lg:block relative group">
               <div className="absolute inset-0 bg-[#D4AF37]/5 blur-[120px] rounded-full -mr-40 group-hover:bg-[#D4AF37]/10 transition-all duration-1000"></div>
               <div className="relative w-full h-[650px] bg-[#003300] border-[16px] border-white rounded-[5rem] shadow-2xl overflow-hidden p-10 flex flex-col justify-between">
                  <div>
                     <h3 className="text-white text-3xl font-bold mb-2">Mortgage Readiness Portal</h3>
                     <div className="flex gap-4">
                        <span className="bg-[#A8E6CF] text-[#003300] px-4 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest">Bank Certified</span>
                        <span className="bg-white/10 text-[#D4AF37] px-4 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest">8 Layers Green</span>
                     </div>
                  </div>
                  <div className="space-y-6">
                     <div className="bg-white/5 border border-white/10 p-8 rounded-[3rem] backdrop-blur-md">
                        <p className="text-white/40 text-[10px] font-bold uppercase mb-2 tracking-widest">Approved Collateral Value</p>
                        <p className="text-white text-4xl font-bold italic">GH₵10,850,000</p>
                     </div>
                     <div className="h-40 border-2 border-dashed border-white/5 rounded-[2.5rem] flex items-center justify-center">
                        <div className="w-full px-12 flex items-end gap-1 h-12 opacity-30">
                           {[40, 70, 50, 90, 60, 100].map((h, i) => (
                             <div key={i} style={{ height: `${h}%` }} className="flex-1 bg-white rounded-t"></div>
                           ))}
                        </div>
                     </div>
                  </div>
               </div>
            </div>
          </section>

          {/* Problem/Solution Matrix */}
          <section className="bg-[#003300] text-[#F8F1E3] py-32 px-4 mb-32 relative overflow-hidden">
             <div className="max-w-7xl mx-auto">
                <h2 className="text-3xl font-bold mb-20 text-center italic tracking-widest uppercase">The Finance Challenge Resolved</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                   {problemSolution.map((item, i) => (
                     <div key={i} className="bg-white/5 border border-white/10 p-12 rounded-[4rem] group hover:bg-[#D4AF37] hover:text-[#003300] transition-all duration-500">
                        <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-xs font-bold mb-10 group-hover:bg-[#003300] group-hover:text-white">P.{i+1}</div>
                        <p className="text-xl font-bold mb-6 opacity-40 group-hover:opacity-100 italic leading-tight">{item.p}</p>
                        <p className="text-xs font-bold uppercase tracking-widest text-[#A8E6CF] group-hover:text-[#003300] flex items-center gap-3">
                           <span className="w-6 h-[1px] bg-[#A8E6CF] group-hover:bg-[#003300]"></span> {item.s}
                        </p>
                     </div>
                   ))}
                </div>
             </div>
          </section>

          {/* Benefits Grid */}
          <section className="px-4 md:px-8 max-w-7xl mx-auto mb-32">
             <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {benefits.map((b, i) => (
                  <div key={i} className="bg-white border border-[#D4AF37]/5 p-12 rounded-[3.5rem] text-center shadow-sm hover:border-[#D4AF37]/30 transition-all hover:-translate-y-2">
                     <div className="text-6xl mb-8 filter grayscale hover:grayscale-0 transition-all">{b.icon}</div>
                     <h4 className="text-2xl font-bold mb-3 italic">{b.title}</h4>
                     <p className="text-xs opacity-60 font-medium leading-relaxed max-w-[240px] mx-auto">{b.desc}</p>
                  </div>
                ))}
             </div>
          </section>

          {/* How It Works */}
          <section className="px-4 md:px-8 max-w-5xl mx-auto mb-40 text-center">
             <h2 className="text-4xl font-bold mb-24 italic tracking-tight">The 4-Step Enablement Protocol</h2>
             <div className="grid grid-cols-1 md:grid-cols-4 gap-12 relative">
                <div className="hidden md:block absolute top-10 left-20 right-20 h-0.5 bg-[#D4AF37]/10 z-0"></div>
                {[
                  { s: "01", t: "Sovereign Audit", d: "Pass your property through the 8 Layers of Grounded Truth." },
                  { s: "02", t: "Risk Lock", d: "Secure your coordinates against statutory title disputes." },
                  { s: "03", t: "Bank Push", d: "Your audit health report is shared with Top-Tier partner banks." },
                  { s: "04", t: "Funding", d: "Experience accelerated loan approval and escrow payout." }
                ].map((step, i) => (
                  <div key={i} className="relative z-10 space-y-6">
                     <div className="w-20 h-20 bg-[#003300] text-[#D4AF37] rounded-full mx-auto flex items-center justify-center font-bold text-2xl shadow-2xl transition-all hover:scale-110">{step.s}</div>
                     <h4 className="font-bold text-xl">{step.t}</h4>
                     <p className="text-[11px] opacity-60 font-medium leading-relaxed">{step.d}</p>
                  </div>
                ))}
             </div>
          </section>

          {/* Properties Teaser */}
          <section className="px-4 md:px-8 max-w-7xl mx-auto mb-40">
             <div className="flex justify-between items-end mb-16">
                <h2 className="text-3xl font-bold italic tracking-tight">Mortgage-Ready Assets</h2>
                <a href="/marketplace" className="text-[10px] font-bold uppercase tracking-[4px] border-b-2 border-[#D4AF37] pb-1">Browse All</a>
             </div>
             <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {properties.map((p, i) => (
                  <div key={i} className="bg-white p-8 rounded-[4rem] border border-[#003300]/5 hover:border-[#D4AF37]/40 transition-all group">
                     <div className="w-full h-64 bg-[#003300]/5 rounded-[3rem] mb-8 overflow-hidden relative">
                        <div className="absolute inset-0 flex items-center justify-center opacity-20 italic text-[10px]">Verified Photo Mockup</div>
                        <div className="absolute top-6 left-6 bg-[#A8E6CF] text-[#003300] px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest shadow-xl">Syntry Verified</div>
                     </div>
                     <h4 className="text-2xl font-bold mb-2 group-hover:text-[#D4AF37] transition-all">{p.name}</h4>
                     <div className="flex justify-between items-center">
                        <p className="text-lg font-bold">{p.price}</p>
                        <p className="text-[10px] font-bold text-[#D4AF37] uppercase tracking-widest">APY: {p.apy}</p>
                     </div>
                  </div>
                ))}
             </div>
          </section>

          {/* Final CTA Section */}
          <section className="px-4 md:px-8 max-w-7xl mx-auto mb-20 text-center">
             <div className="bg-[#D4AF37] text-[#003300] p-16 md:p-32 rounded-[6rem] shadow-2xl relative overflow-hidden group border-[16px] border-[#F8F1E3]">
                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative z-10">
                  <h2 className="text-4xl md:text-7xl font-bold mb-10 italic tracking-tighter leading-none">Ready to Get Started?</h2>
                  <p className="text-xl md:text-3xl font-bold mb-16 opacity-80 max-w-3xl mx-auto leading-tight italic">Secure your sovereign credentials and unlock property capital today.</p>
                  <div className="flex flex-col md:flex-row gap-8 items-center justify-center">
                     <a href="/check-my-property" className="w-full md:w-auto bg-[#003300] text-[#F8F1E3] px-16 py-8 rounded-[2.5rem] font-bold text-2xl hover:scale-105 transition-all shadow-2xl text-center">
                        Verify Land Now – Free
                     </a>
                     <div className="flex flex-col items-center gap-4">
                        <a href="https://wa.me/233531102292?text=Institutional%20Enterprise%20Demo%20Request" className="bg-[#00BFFF] text-white px-12 py-6 rounded-2xl font-bold text-lg hover:brightness-110 transition-all">
                          Request Enterprise Demo
                        </a>
                        <p className="text-[10px] font-bold uppercase tracking-widest opacity-40 italic">Advisor Hotline: 0531102292</p>
                     </div>
                  </div>
                </div>
             </div>
          </section>
        </main>

        <GlobalFooter />
      </div>
    </Suspense>
  );
};

export default MortgageEnablementPage;
