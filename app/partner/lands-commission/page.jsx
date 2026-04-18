"use client";
import React from 'react';
import GlobalHeader from '../../../components/GlobalHeader';
import GlobalFooter from '../../../components/GlobalFooter';

const LandsCommissionPage = () => {
  const benefits = [
    { title: "Direct Search", desc: "Real-time query access to the official Lands Commission database.", icon: "🔍" },
    { title: "Statutory Alerts", desc: "Automated checks for encumbrances, caveats, or conflicting claims.", icon: "⚠️" },
    { title: "Rapid Title Audit", desc: "Verify title authenticity and validity in under 48 hours.", icon: "📜" },
    { title: "Legally Grounded", desc: "Generates official audit trails for bank-underwriting requirements.", icon: "⚖️" }
  ];

  return (
    <div className="bg-[#fdfcf9] min-h-screen text-[#003300] font-sans">
      <GlobalHeader />

      <main className="pt-32 pb-20 px-4 md:px-8 max-w-7xl mx-auto">
        {/* Hero */}
        <section className="mb-20 text-center md:text-left">
          <div className="inline-flex items-center gap-2 bg-[#D4AF37]/10 px-4 py-2 rounded-full mb-6 border border-[#D4AF37]/20">
            <span className="w-2 h-2 bg-[#D4AF37] rounded-full"></span>
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#D4AF37]">Official Statutory Gateway</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">Official Lands Commission Integration</h1>
          <p className="text-xl md:text-2xl opacity-70 max-w-2xl mb-12 font-medium">
            Real-time access to statutory land records and accelerated verification through our secure institutional bridge.
          </p>
        </section>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {benefits.map((b, i) => (
             <div key={i} className="bg-white border border-[#003300]/5 p-8 rounded-3xl shadow-sm hover:border-[#D4AF37]/30 transition-all group">
                <div className="text-3xl mb-4 group-hover:scale-110 transition-transform">{b.icon}</div>
                <h3 className="font-bold text-lg mb-2">{b.title}</h3>
                <p className="text-xs opacity-60 leading-relaxed font-medium">{b.desc}</p>
             </div>
          ))}
        </div>

        {/* How It Works Flow */}
        <section className="mb-20 bg-[#003300] text-[#F8F1E3] p-12 md:p-20 rounded-[3rem] shadow-2xl relative overflow-hidden">
           <div className="absolute top-0 right-0 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-3xl -mr-48 -mt-48"></div>
           <h2 className="text-3xl font-bold mb-12 text-center relative z-10 italic">How It Works</h2>
           <div className="grid grid-cols-1 md:grid-cols-4 gap-12 relative z-10">
              {[
                { s: "01", t: "Submit Details", d: "User provides plot numbers or cadastral plans." },
                { s: "02", t: "API Query", d: "Syntry real-time sync with Lands Commission API." },
                { s: "03", t: "Cross-Check", d: "Validated against 8 Layers of Grounded Truth." },
                { s: "04", t: "Verified Report", d: "Statutory finality report issued in 48 hours." }
              ].map((step, i) => (
                <div key={i} className="space-y-4">
                  <div className="text-5xl font-bold text-[#D4AF37] opacity-20 tracking-tighter">{step.s}</div>
                  <h4 className="font-bold text-xl">{step.t}</h4>
                  <p className="text-sm opacity-60 leading-relaxed">{step.d}</p>
                </div>
              ))}
           </div>
        </section>

        {/* Status Dashboard */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
           <div className="md:col-span-2 bg-white border border-[#D4AF37]/20 p-10 rounded-3xl shadow-sm">
              <div className="flex justify-between items-center mb-10">
                <h2 className="text-2xl font-bold">Integration Status</h2>
                <div className="flex items-center gap-2">
                   <span className="w-2 h-2 bg-[#1D9E75] rounded-full animate-pulse"></span>
                   <span className="text-[10px] font-bold uppercase tracking-widest text-[#1D9E75]">Connected • Live</span>
                </div>
              </div>
              <div className="space-y-6">
                 <div className="flex justify-between border-b pb-4 border-[#003300]/5">
                    <p className="text-sm font-medium">Recent Queries (24h)</p>
                    <p className="font-bold">1,240</p>
                 </div>
                 <div className="flex justify-between">
                    <p className="text-sm font-medium">Average Latency</p>
                    <p className="font-bold">120ms</p>
                 </div>
              </div>
           </div>

           <div className="bg-[#D4AF37] text-[#003300] p-10 rounded-3xl flex flex-col justify-center text-center shadow-lg">
              <p className="text-[10px] font-bold uppercase tracking-widest opacity-60 mb-2">Efficiency Gain</p>
              <h3 className="text-2xl font-bold mb-4 italic">Saving 90% in Verification Time</h3>
              <p className="text-sm font-bold bg-[#003300] text-white py-2 rounded-lg">45 Days → 48 Hours</p>
           </div>
        </section>

        {/* Institutions Section */}
        <section className="bg-white border border-[#003300]/10 p-10 md:p-16 rounded-[2.5rem] shadow-sm flex flex-col md:flex-row items-center justify-between gap-12">
           <div className="max-w-xl">
             <h2 className="text-2xl font-bold mb-4">Request Institutional Access</h2>
             <p className="text-sm opacity-70 leading-relaxed font-medium">
               For banks, insurers, and development agencies requiring bulk verification or real-time API callbacks for statutory land records.
             </p>
           </div>
           <div className="flex flex-col gap-4 w-full md:w-auto">
             <button className="bg-[#003300] text-[#F8F1E3] px-10 py-4 rounded-2xl font-bold text-sm hover:bg-[#004d00] transition-all whitespace-nowrap">
               Developer Setup ↗
             </button>
             <a href="https://wa.me/233531102292" className="bg-[#25D366] text-white px-10 py-4 rounded-2xl font-bold text-sm hover:scale-105 transition-all text-center">
               Connect Liaison
             </a>
           </div>
        </section>
      </main>

      <GlobalFooter />
    </div>
  );
};

export default LandsCommissionPage;
