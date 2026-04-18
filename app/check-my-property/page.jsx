"use client";
import { Suspense } from 'react';
import React, { useState } from 'react';
import GlobalHeader from '../../components/GlobalHeader';
import GlobalFooter from '../../components/GlobalFooter';

const CheckMyPropertyPage = () => {
  const [isVerifying, setIsVerifying] = useState(false);

  const benefits = [
    { title: "Real Market Value", desc: "Know the real market value of your land today.", icon: "💎" },
    { title: "Mortgage-Ready", desc: "Get a 'Mortgage-Ready' status instantly.", icon: "🏦" },
    { title: "Dispute Protection", desc: "Protect against title disputes and litigation.", icon: "🛡️" },
    { title: "Fast-Track Liquidity", desc: "Fast-track sales or loans with verified documents.", icon: "⚡" }
  ];

  const layers = [
    { n: "01", t: "Cadastral", icon: "📐" },
    { n: "02", t: "Lands Comm.", icon: "🏛️" },
    { n: "03", t: "OASL check", icon: "🧾" },
    { n: "04", t: "Traditional", icon: "👑" },
    { n: "05", t: "Litigation", icon: "⚖️" },
    { n: "06", t: "Ground Truth", icon: "📍" },
    { n: "07", t: "APY Index", icon: "📈" },
    { n: "08", t: "Sovereign Audit", icon: "🛡️" }
  ];

  return (
    <Suspense fallback={<div className="bg-[#050508] min-h-screen" />}>
      <div className="bg-[#F8F1E3] min-h-screen text-[#003300] font-sans">
        <GlobalHeader />

        <main className="pt-32 pb-20 overflow-hidden">
          {/* Hero Section */}
          <section className="px-4 md:px-8 max-w-7xl mx-auto mb-24 md:mb-32 text-center lg:text-left grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-[#D4AF37]/10 px-4 py-2 rounded-full mb-8 border border-[#D4AF37]/20">
                <span className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full animate-pulse"></span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#D4AF37]">The Verification Gateway</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-bold leading-[1.1] mb-8 tracking-tight">
                Verify Land <br />
                <span className="text-[#D4AF37] italic">Now – Free</span>
              </h1>
              <p className="text-xl md:text-2xl opacity-70 max-w-xl mx-auto lg:mx-0 mb-10 font-medium leading-relaxed">
                Instant verification with our 8 Layers of Grounded Truth • Discover if your land is <span className="text-[#003300] font-bold underline decoration-[#D4AF37]">Mortgage-Ready</span>
              </p>
              <div className="flex flex-col sm:flex-row gap-6 items-center justify-center lg:justify-start">
                 <button 
                   onClick={() => document.getElementById('verification-form')?.scrollIntoView({ behavior: 'smooth' })}
                   className="w-full sm:w-auto bg-[#D4AF37] text-[#003300] px-12 py-5 rounded-2xl font-bold text-xl hover:scale-[1.02] transition-all shadow-2xl shadow-[#D4AF37]/20"
                 >
                   Start Verification Now – Free
                 </button>
              </div>
              <div className="mt-8 flex flex-col items-center lg:items-start gap-2">
                 <p className="text-[11px] font-bold uppercase tracking-widest opacity-40">Takes less than 60 seconds • Secure & Private • Results sent to WhatsApp</p>
                 <p className="text-[10px] font-medium opacity-60">Call or WhatsApp <span className="font-bold underline">0531102292</span> | info@syntry.co</p>
              </div>
            </div>
            <div className="hidden lg:block relative">
               <div className="w-full h-[500px] border-[12px] border-white bg-[#003300] rounded-[4rem] shadow-2xl overflow-hidden relative group">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/10 to-transparent"></div>
                  <div className="p-12 flex flex-col h-full justify-between relative z-10">
                     <div>
                        <h4 className="text-[#D4AF37] font-bold text-xs uppercase tracking-widest mb-4">Sample Report Analytics</h4>
                        <h3 className="text-white text-3xl font-bold mb-2">Aburi Hills Plot 4B</h3>
                        <p className="text-white/40 text-sm font-medium">Cadastral Sync Verified • 48h Audit Complete</p>
                     </div>
                     <div className="space-y-4">
                        <div className="bg-white/5 border border-white/10 p-6 rounded-3xl flex justify-between items-center">
                           <span className="text-white/40 text-[10px] font-bold uppercase">Valuation</span>
                           <span className="text-[#D4AF37] text-2xl font-bold">GH₵450,000</span>
                        </div>
                        <div className="bg-[#A8E6CF]/10 border border-[#A8E6CF]/20 p-4 rounded-2xl flex items-center gap-3">
                           <span className="w-2 h-2 bg-[#A8E6CF] rounded-full animate-pulse"></span>
                           <span className="text-[#A8E6CF] text-[10px] font-bold uppercase tracking-widest">Mortgage-Ready Certificate Issued</span>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
          </section>

          {/* Why Check Now Section */}
          <section className="px-4 md:px-8 max-w-7xl mx-auto mb-32">
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {benefits.map((b, i) => (
                  <div key={i} className="bg-white border border-[#003300]/5 p-10 rounded-[2.5rem] shadow-sm hover:border-[#D4AF37]/30 transition-all group">
                     <div className="text-4xl mb-6 group-hover:scale-110 transition-transform">{b.icon}</div>
                     <h4 className="text-lg font-bold mb-2">{b.title}</h4>
                     <p className="text-xs opacity-60 font-medium leading-relaxed">{b.desc}</p>
                  </div>
                ))}
             </div>
          </section>

          {/* Verification Form Section */}
          <section id="verification-form" className="px-4 md:px-8 max-w-4xl mx-auto mb-32">
             <div className="bg-white border border-[#D4AF37]/20 p-10 md:p-20 rounded-[4rem] shadow-2xl text-center relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4AF37]/5 rounded-full blur-3xl -mr-32 -mt-32"></div>
                <h2 className="text-3xl font-bold mb-4 italic">Quick Audit Engine</h2>
                <p className="text-sm opacity-60 mb-12 font-medium">Enter your details to query the 8 Layers of Grounded Truth Gateway.</p>
                
                <div className="space-y-8 max-w-md mx-auto">
                   <div className="text-left">
                      <label className="text-[10px] font-bold uppercase tracking-[2px] opacity-40 block mb-3 ml-4">Plot Number or Land Title ID</label>
                      <input 
                        type="text" 
                        placeholder="e.g. AB-2024-04567" 
                        className="w-full bg-[#003300]/5 border-none p-6 rounded-2xl font-bold text-lg placeholder:opacity-20 text-center uppercase tracking-widest focus:ring-2 focus:ring-[#D4AF37]/50"
                      />
                   </div>
                   
                   <div className="p-8 border-2 border-dashed border-[#003300]/10 rounded-[2rem] hover:border-[#D4AF37]/30 transition-all cursor-pointer group">
                      <p className="text-2xl mb-2">📄</p>
                      <p className="text-[10px] font-bold opacity-60 uppercase tracking-widest">Optional: Upload Site Plan or Indenture</p>
                      <p className="text-[9px] opacity-30 mt-1 font-medium italic">Accelerates Ground Truth verification</p>
                   </div>

                   <button 
                     onClick={() => setIsVerifying(true)}
                     className="w-full bg-[#003300] text-[#D4AF37] px-16 py-6 rounded-2xl font-bold text-[10px] uppercase tracking-[3px] hover:scale-[1.02] transition-all shadow-2xl shadow-[#003300]/30"
                   >
                     Run 8-Layer Verification
                   </button>
                </div>
             </div>
          </section>

          {/* What Happens Next Section */}
          <section className="px-4 md:px-8 max-w-7xl mx-auto mb-32 text-center">
             <p className="text-[11px] font-bold uppercase tracking-[4px] opacity-30 mb-8">What Happens Next</p>
             <h2 className="text-2xl font-bold mb-16 italic">We check everything from Cadastral Survey to Statutory Handover</h2>
             <div className="flex overflow-x-auto no-scrollbar pb-8 -mx-4 px-4 md:mx-0 md:px-0">
                <div className="flex gap-4 md:gap-8 mx-auto">
                   {layers.map((layer, i) => (
                     <div key={i} className="flex flex-col items-center gap-4 min-w-[100px]">
                        <div className={`w-14 h-14 rounded-full flex items-center justify-center text-xl shadow-sm border-2 transition-all duration-500 ${isVerifying ? 'bg-[#003300] text-[#D4AF37] border-[#D4AF37]' : 'bg-white border-[#003300]/5'}`}>
                           {layer.icon}
                        </div>
                        <div className="text-center">
                           <p className="text-[9px] font-bold opacity-30 uppercase tracking-tighter mb-1">Layer {layer.n}</p>
                           <p className="text-[10px] font-bold uppercase tracking-tight whitespace-nowrap">{layer.t}</p>
                        </div>
                     </div>
                   ))}
                </div>
             </div>
             <p className="mt-8 text-xs font-bold opacity-40 italic">We check Cadastral Survey, Lands Commission, Traditional Authority, and more...</p>
          </section>

          {/* Expected Results Section */}
          <section className="px-4 md:px-8 max-w-7xl mx-auto mb-32">
             <div className="bg-[#003300] text-[#F8F1E3] p-12 md:p-24 rounded-[5rem] shadow-2xl relative overflow-hidden text-center md:text-left">
                <div className="absolute top-0 right-0 w-1/2 h-full bg-[#D4AF37]/5 rounded-l-full blur-[120px]"></div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center relative z-10">
                   <div>
                      <h2 className="text-3xl font-bold mb-6 italic">Expected Results</h2>
                      <p className="text-lg font-medium opacity-60 mb-12 max-w-md leading-relaxed">Your sovereign audit report provides instant finality on ownership health, valuation growth, and banking eligibility.</p>
                      <div className="flex flex-wrap gap-4">
                         <span className="bg-[#A8E6CF] text-[#003300] px-6 py-2 rounded-full font-bold text-[10px] uppercase tracking-widest shadow-lg shadow-[#A8E6CF]/20">Mortgage-Ready</span>
                         <span className="bg-[#D4AF37] text-[#003300] px-6 py-2 rounded-full font-bold text-[10px] uppercase tracking-widest shadow-lg shadow-[#D4AF37]/20">Legacy Verified</span>
                      </div>
                   </div>
                   <div className="space-y-6">
                      <div className="bg-white/5 border border-white/10 p-8 rounded-[2.5rem] backdrop-blur-sm">
                         <div className="flex justify-between items-center mb-6">
                            <p className="text-[10px] font-bold opacity-40 uppercase tracking-widest">Full Audit Report</p>
                            <span className="text-[8px] font-bold bg-[#D4AF37]/20 text-[#D4AF37] px-2 py-1 rounded">PDF / JSON</span>
                         </div>
                         <p className="text-sm font-medium opacity-80 leading-relaxed mb-6">Statutory ownership validated across all 8 statutory layers. Cadastral coordinates locked. Legacy certificate generated.</p>
                         <p className="text-[10px] font-bold text-[#A8E6CF] uppercase tracking-widest italic font-medium">Shared to Email & WhatsApp instantly.</p>
                      </div>
                   </div>
                </div>
             </div>
          </section>

          {/* Final CTA */}
          <section className="px-4 md:px-8 max-w-4xl mx-auto text-center mb-40">
             <h2 className="text-4xl md:text-5xl font-bold mb-8 italic tracking-tight">Ready to secure your land?</h2>
             <p className="text-xl md:text-2xl font-bold text-[#D4AF37] mb-12">No more uncertainty. Only verified truth.</p>
              <div className="flex flex-col md:flex-row gap-6 items-center justify-center">
                <button 
                  onClick={() => document.getElementById('verification-form')?.scrollIntoView({ behavior: 'smooth' })}
                  className="bg-[#003300] text-[#F8F1E3] px-16 py-8 rounded-[2.5rem] font-bold text-2xl hover:scale-105 transition-all shadow-2xl"
                >
                  Start Verification Now – Free
                </button>
             </div>
             <div className="mt-12 flex flex-col md:flex-row items-center justify-center gap-6">
                <a href="https://wa.me/233531102292" className="flex items-center gap-4 text-[#003300] font-bold text-lg hover:underline decoration-2">
                   <span className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm">💬</span>
                   Need help? Chat with Verification Advisor – 0531102292
                </a>
             </div>
          </section>
        </main>

        <GlobalFooter />
      </div>
    </Suspense>
  );
};

export default CheckMyPropertyPage;
