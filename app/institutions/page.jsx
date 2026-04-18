"use client";
import React from 'react';
import GlobalHeader from '../../components/GlobalHeader';
import GlobalFooter from '../../components/GlobalFooter';

const InstitutionsPage = () => {
  const challenges = [
    { pain: "Opaque manual verification timelines.", solution: "Real-time query access to the 8-Layer Statutory Exchange." },
    { pain: "High risk of fraudulent collateral.", solution: "Guaranteed 'Ground Truth' verification status for all assets." },
    { pain: "Fragmented portfolio management.", solution: "Consolidated enterprise dashboard for bulk auditing." },
    { pain: "Difficult API integration for banking stacks.", solution: "RESTful institutional API with full documentation." }
  ];

  const benefits = [
    { title: "Bulk Verification", desc: "Audit entire land banks in a single statutory session.", icon: "🕋" },
    { title: "Banking API Access", desc: "Real-time mortgage eligibility callbacks.", icon: "🔌" },
    { title: "Portfolio Monitoring", desc: "Live valuation growth of and asset health tracking.", icon: "📈" },
    { title: "Title Finality", desc: "Permanent statutory record protection for major assets.", icon: "📜" },
    { title: "Risk Mitigation", desc: "Eliminate encumbrance and litigation risks at scale.", icon: "🛡️" },
    { title: "Escrow Settlement", desc: "Institutional fund protection for major transfers.", icon: "💰" }
  ];

  const useCases = [
    { t: "Developers", d: "Instantly certify your property inventory for faster sales to pre-approved mortgage buyers.", btn: "View Developer Tools" },
    { t: "Banks & Lenders", d: "Reduce underwriting risk by qualifying collateral against 8 Layers of Grounded Truth.", btn: "Manage Loan Assets" },
    { t: "Investment Funds", d: "Monitor portfolio health and appreciation growth for sovereign-grade assets.", btn: "Portfolio Audit" }
  ];

  return (
    <div className="bg-[#F8F1E3] min-h-screen text-[#003300] font-sans">
      <GlobalHeader />

      <main className="pt-32 pb-20 overflow-hidden">
        {/* Hero Section */}
        <section className="px-4 md:px-8 max-w-7xl mx-auto mb-32 text-center lg:text-left grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-[#003300]/10 px-4 py-2 rounded-full mb-8 border border-[#003300]/20">
              <span className="w-1.5 h-1.5 bg-[#003300] rounded-full animate-pulse"></span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#003300]">Enterprise Sovereign Node</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold leading-[1.1] mb-8 tracking-tight">
              For Institutions — <br />
              <span className="text-[#D4AF37] italic text-6xl md:text-8xl">Sovereign Land</span> <br />
              Solutions at Scale
            </h1>
            <p className="text-xl md:text-2xl opacity-70 max-w-xl mx-auto lg:mx-0 mb-12 font-medium leading-relaxed italic">
              Bulk verification, portfolio management, and API access for banks, developers, and sovereign funds.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 items-center justify-center lg:justify-start">
                <a href="https://wa.me/233531102292?text=Requesting%20Institutional%20Enterprise%20Demo" className="w-full sm:w-auto bg-[#D4AF37] text-[#003300] px-12 py-6 rounded-2xl font-bold text-[11px] uppercase tracking-[3px] hover:scale-[1.02] transition-all shadow-2xl shadow-[#D4AF37]/30 flex items-center justify-center gap-3">
                  Request Enterprise Demo ↗
                </a>
               <button className="w-full sm:w-auto border-2 border-[#003300] text-[#003300] px-10 py-5 rounded-2xl font-bold text-sm hover:bg-[#003300] hover:text-[#F8F1E3] transition-all uppercase tracking-widest">
                 Download Brochure
               </button>
            </div>
          </div>
          <div className="hidden lg:block relative">
             <div className="w-full h-[600px] border-[16px] border-white bg-[#003300] rounded-[5rem] shadow-2xl overflow-hidden p-2 relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/5 to-transparent"></div>
                <div className="p-12 flex flex-col h-full relative z-10">
                   <div className="flex justify-between items-center mb-16">
                      <div className="flex flex-col">
                         <h3 className="text-white text-3xl font-bold mb-1 tracking-tight">Enterprise Hub</h3>
                         <p className="text-[#D4AF37] text-[10px] font-bold uppercase tracking-widest">Sovereign Wealth Management active</p>
                      </div>
                      <button className="bg-[#D4AF37] text-[#003300] px-6 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest shadow-xl shadow-[#D4AF37]/20">See Live Demo</button>
                   </div>
                   <div className="grid grid-cols-2 gap-8 mb-12">
                      <div className="bg-white/5 border border-white/10 p-8 rounded-[2.5rem] backdrop-blur-sm">
                         <p className="text-white/40 text-[8px] font-bold uppercase mb-2">Portfolio Volume</p>
                         <p className="text-white text-3xl font-bold italic">142 Plots</p>
                      </div>
                      <div className="bg-white/5 border border-white/10 p-8 rounded-[2.5rem] backdrop-blur-sm">
                         <p className="text-white/40 text-[8px] font-bold uppercase mb-2">Verified Value</p>
                         <p className="text-[#A8E6CF] text-3xl font-bold italic leading-none">GH₵102.4M</p>
                      </div>
                   </div>
                   <div className="flex-1 bg-white/5 rounded-[3rem] border-2 border-dashed border-white/5 flex items-center justify-center overflow-hidden">
                      <div className="w-full flex px-8 gap-1 opacity-20">
                         {[30, 60, 45, 90, 70, 100, 80, 110, 95, 120].map((h, i) => (
                           <div key={i} style={{ height: `${h}%` }} className="flex-1 bg-[#D4AF37] rounded-t-lg"></div>
                         ))}
                      </div>
                   </div>
                </div>
             </div>
          </div>
        </section>

        {/* Challenges Section */}
        <section className="bg-[#003300] text-[#F8F1E3] py-24 px-4 mb-32 relative overflow-hidden">
           <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[300px] bg-[#D4AF37]/5 rounded-full blur-[120px] -mt-150"></div>
           <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
              <div>
                 <h2 className="text-3xl font-bold mb-12 italic">The Institutional Challenge</h2>
                 <div className="space-y-12">
                    {challenges.map((c, i) => (
                      <div key={i} className="flex gap-8 group">
                         <div className="w-14 h-14 bg-red-500/10 rounded-2xl flex-shrink-0 flex items-center justify-center text-red-500 font-bold border border-red-500/20 group-hover:bg-red-500 group-hover:text-white transition-all text-xl italic">✕</div>
                         <div>
                            <p className="text-xl font-bold mb-2 opacity-30 line-through decoration-[#D4AF37] decoration-2">{c.pain}</p>
                            <p className="text-sm font-bold text-[#A8E6CF] uppercase tracking-widest flex items-center gap-3">
                               <span className="w-8 h-[1px] bg-[#A8E6CF]"></span> {c.solution}
                            </p>
                         </div>
                      </div>
                    ))}
                 </div>
              </div>
              <div className="bg-[#D4AF37] p-16 rounded-[4.5rem] text-[#003300] shadow-2xl relative border-l-[16px] border-l-[#A8E6CF] rotate-1 md:rotate-2">
                 <p className="text-[10px] font-bold uppercase tracking-widest opacity-60 mb-4">Risk Assessment v4.1</p>
                 <h3 className="text-3xl font-bold mb-6 italic leading-tight">"80% of institutional land disputes in Ghana arise from lack of statutory synchronization."</h3>
                 <p className="text-lg font-medium opacity-80 leading-relaxed italic mb-10">Syntry provides the institutional layer of truth required for high-volume banking and development operations.</p>
                 <div className="flex gap-4">
                    <span className="bg-[#003300] text-white px-8 py-3 rounded-full font-bold text-[10px] uppercase tracking-widest shadow-xl shadow-[#003300]/20 italic">Clinical Accuracy</span>
                    <span className="bg-white/30 text-[#003300] px-8 py-3 rounded-full font-bold text-[10px] uppercase tracking-widest">GELIS Integrated</span>
                 </div>
              </div>
           </div>
        </section>

        {/* Benefits Grid */}
        <section className="px-4 md:px-8 max-w-7xl mx-auto mb-32">
           <h2 className="text-3xl font-bold mb-16 text-center italic tracking-tight uppercase">Sovereign Enterprise Features</h2>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {benefits.map((b, i) => (
                <div key={i} className="bg-white border border-[#D4AF37]/10 p-12 rounded-[3.5rem] shadow-sm hover:border-[#D4AF37]/40 transition-all text-center group translate-y-0 hover:-translate-y-2">
                   <div className="text-6xl mb-8 group-hover:scale-110 transition-transform inline-block drop-shadow-sm">{b.icon}</div>
                   <h4 className="text-2xl font-bold mb-4 tracking-tight">{b.title}</h4>
                   <p className="text-xs opacity-60 font-medium leading-relaxed max-w-[240px] mx-auto mb-10">{b.desc}</p>
                   <button className="text-[10px] font-bold uppercase tracking-widest text-[#003300] border-b border-[#003300]/10 pb-1 hover:border-[#D4AF37] transition-all">Details ↗</button>
                </div>
              ))}
           </div>
        </section>

        {/* Use Cases Section */}
        <section className="px-4 md:px-8 max-w-7xl mx-auto mb-40">
           <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {useCases.map((uc, i) => (
                <div key={i} className="bg-white/30 border border-[#003300]/5 p-12 rounded-[4rem] backdrop-blur-md flex flex-col justify-between group hover:bg-[#003300] hover:text-[#F8F1E3] transition-all duration-500">
                   <div>
                      <h4 className="text-3xl font-bold mb-6 italic">{uc.t}</h4>
                      <p className="text-sm font-medium opacity-60 group-hover:opacity-80 leading-relaxed mb-12">{uc.d}</p>
                   </div>
                   <button className="w-full bg-[#003300] text-white py-5 rounded-2xl group-hover:bg-[#D4AF37] group-hover:text-[#003300] font-bold text-xs uppercase tracking-widest transition-all">
                      {uc.btn}
                   </button>
                </div>
              ))}
           </div>
        </section>

        {/* Final CTA Section */}
        <section className="px-4 md:px-8 max-w-7xl mx-auto mb-20 text-center">
           <div className="bg-[#D4AF37] text-[#003300] p-16 md:p-32 rounded-[6rem] shadow-2xl relative overflow-hidden group">
              <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative z-10">
                <h2 className="text-4xl md:text-7xl font-bold mb-10 italic tracking-tighter leading-none">Ready to Transform Your <br /> Land Operations?</h2>
                <p className="text-xl md:text-2xl font-bold mb-16 opacity-80 max-w-3xl mx-auto leading-tight">Standardize your institutional assets against the sovereign index.</p>
                <div className="flex flex-col md:flex-row gap-8 items-center justify-center">
                   <a href="https://wa.me/233531102292?text=Scheduling%20Enterprise%20Demo" className="w-full md:w-auto bg-[#003300] text-[#F8F1E3] px-16 py-8 rounded-[2.5rem] font-bold text-2xl hover:scale-105 transition-all shadow-2xl shadow-[#003300]/30 shadow-2xl">
                      Schedule Enterprise Demo
                   </a>
                   <div className="flex flex-col items-center gap-4">
                      <a href="https://wa.me/233531102292?text=Scheduling%20Enterprise%20Demo" className="bg-[#00BFFF] text-white px-12 py-6 rounded-2xl font-bold text-lg hover:brightness-110 transition-all text-center">
                        Schedule Enterprise Demo
                      </a>
                      <p className="text-[10px] font-bold uppercase tracking-widest opacity-40">Statutory Advisor Hotline: 0531102292</p>
                   </div>
                </div>
              </div>
           </div>
        </section>
      </main>

      <GlobalFooter />
    </div>
  );
};

export default InstitutionsPage;
