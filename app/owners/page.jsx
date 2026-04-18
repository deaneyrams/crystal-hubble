"use client";
import { Suspense } from 'react';
import React from 'react';
import GlobalHeader from '../../components/GlobalHeader';
import GlobalFooter from '../../components/GlobalFooter';

const OwnersPage = () => {
  const realityCheck = [
    { pain: "Title disputes and double-sale risks.", solution: "8 Layers of Grounded Truth lock your title." },
    { pain: "Chasing tenants for rent payments.", solution: "Automated collection via MTN MoMo / Vodafone Cash." },
    { pain: "Uncertain land valuation for bank loans.", solution: "Real-time index tracking based on statutory data." },
    { pain: "Paper inditutes prone to physical loss.", solution: "Immutable digital coordinate vault." }
  ];

  const benefits = [
    { title: "Immutable Record", desc: "8 Layers of statutory verification with full Grounded Truth.", icon: "🛡️" },
    { title: "Auto Rent Collection", desc: "Paid directly to MTN MoMo or Vodafone Cash.", icon: "💰" },
    { title: "Value Tracking", desc: "Real-time updates with local market data.", icon: "📈" },
    { title: "One-Click Tax", desc: "Automated GRA compliance reporting.", icon: "🧾" },
    { title: "Digital Title", desc: "Secure deed you can share with family or banks.", icon: "📜" },
    { title: "Simple Dashboard", desc: "Designed for busy Ghanaian owners.", icon: "📱" }
  ];

  const steps = [
    { s: "01", t: "Submit Pin", d: "Enter your plot GPS coordinates or address." },
    { s: "02", t: "Verification", d: "Syntry runs the 8 Layers of Grounded Truth." },
    { s: "03", t: "Validation", d: "Statutory bodies confirm ownership status." },
    { s: "04", t: "Get Certified", d: "Lock your legacy and start listing." }
  ];

  return (
    <Suspense fallback={<div className="bg-[#050508] min-h-screen" />}>
      <div className="bg-[#F8F1E3] min-h-screen text-[#003300] font-sans">
        <GlobalHeader />

        <main className="pt-32 pb-20">
          {/* Hero Section */}
          <section className="px-4 md:px-8 max-w-7xl mx-auto mb-32 text-center lg:text-left grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-[#D4AF37]/10 px-4 py-2 rounded-full mb-8 border border-[#D4AF37]/20">
                <span className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full animate-pulse"></span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#D4AF37]">The Sovereign Shield</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-bold leading-[1.1] mb-8 tracking-tight">
                For Ghanaian Owners — <br />
                <span className="text-[#D4AF37] italic">Take Full Control</span> <br />
                of Your Land
              </h1>
              <p className="text-xl md:text-2xl opacity-70 max-w-xl mx-auto lg:mx-0 mb-12 font-medium leading-relaxed">
                Secure your family legacy, collect rent automatically, track real-time value, and never worry about title disputes again.
              </p>
              <div className="flex flex-col gap-6 items-center lg:items-start">
                 <a href="/check-my-property" className="w-full lg:w-auto bg-[#D4AF37] text-[#003300] px-16 py-6 rounded-2xl font-bold text-2xl hover:scale-[1.05] transition-all shadow-2xl shadow-[#D4AF37]/30 text-center">
                   Verify Land Now – Free
                 </a>
                 <div className="flex flex-col sm:flex-row items-center gap-6">
                   <a href="https://wa.me/233531102292" className="bg-[#003300] text-[#F8F1E3] px-10 py-4 rounded-xl font-bold text-sm hover:bg-[#004d00] transition-all">
                     Talk to Local Advisor on WhatsApp
                   </a>
                   <p className="text-[10px] font-bold uppercase tracking-widest opacity-40">Call or WhatsApp 0531102292 | info@syntry.co</p>
                 </div>
              </div>
            </div>
            <div className="hidden lg:block relative">
               <div className="w-full h-[600px] bg-white border border-[#D4AF37]/20 rounded-[4rem] shadow-2xl overflow-hidden p-4">
                  <div className="w-full h-full bg-[#003300] rounded-[3.5rem] flex flex-col p-10 overflow-hidden relative">
                     <div className="absolute top-0 right-0 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-3xl -mr-48 -mt-48"></div>
                     <div className="flex justify-between items-center mb-12">
                        <div className="w-12 h-12 bg-[#D4AF37] rounded-full flex items-center justify-center font-bold text-[#003300]">S</div>
                        <div className="text-[10px] font-bold text-[#D4AF37] uppercase tracking-widest">Live Dashboard v2.0</div>
                     </div>
                     <div className="space-y-6">
                        <div className="bg-white/5 border border-white/10 p-6 rounded-3xl">
                           <p className="text-[8px] font-bold opacity-40 uppercase mb-2">Verified Value</p>
                           <h3 className="text-2xl font-bold text-white tracking-widest">GH₵4,250,000</h3>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                           <div className="bg-white/5 border border-white/10 p-6 rounded-3xl text-center">
                              <p className="text-[8px] font-bold opacity-40 uppercase mb-2">Status</p>
                              <p className="text-[10px] font-bold text-[#A8E6CF] uppercase tracking-widest">Syntry Verified</p>
                           </div>
                           <div className="bg-white/5 border border-white/10 p-6 rounded-3xl text-center">
                              <p className="text-[8px] font-bold opacity-40 uppercase mb-2">Rent</p>
                              <p className="text-[10px] font-bold text-[#D4AF37] uppercase tracking-widest">Pending: GH₵8,200</p>
                           </div>
                        </div>
                     </div>
                     <div className="mt-12 flex-1 border-2 border-dashed border-white/5 rounded-[2.5rem]"></div>
                  </div>
               </div>
            </div>
          </section>

          {/* Reality Check Section */}
          <section className="bg-[#003300] text-[#F8F1E3] py-32 px-4 mb-32 relative overflow-hidden">
             <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[300px] bg-[#D4AF37]/5 rounded-full blur-[120px] -mt-150"></div>
             <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
                <div>
                   <h2 className="text-3xl font-bold mb-8 italic">Traditional Uncertainty</h2>
                   <div className="space-y-8">
                      {realityCheck.map((item, i) => (
                        <div key={i} className="flex gap-6 group">
                           <div className="w-12 h-12 bg-red-500/10 rounded-2xl flex-shrink-0 flex items-center justify-center text-red-500 font-bold border border-red-500/20 group-hover:bg-red-500 group-hover:text-white transition-all">✕</div>
                           <div>
                              <p className="text-lg font-bold mb-1 opacity-40 line-through decoration-[#D4AF37] decoration-2">{item.pain}</p>
                              <p className="text-sm font-medium text-[#A8E6CF] uppercase tracking-widest flex items-center gap-2">
                                 <span className="w-4 h-[1px] bg-[#A8E6CF]"></span> {item.solution}
                              </p>
                           </div>
                        </div>
                      ))}
                   </div>
                </div>
                <div className="bg-[#D4AF37] p-16 rounded-[4rem] text-[#003300] shadow-2xl transform md:rotate-2 hover:rotate-0 transition-transform duration-700">
                   <h3 className="text-3xl font-bold mb-4">Sovereign Proof</h3>
                   <p className="text-lg font-bold mb-8 leading-tight">By locking your coordinates into Syntry, you create a permanent barrier against litigation.</p>
                   <div className="space-y-4">
                      <div className="flex justify-between border-b border-[#003300]/10 pb-4 font-bold uppercase tracking-widest text-[10px]"><span>Security Level</span> <span>Ground-Truth High</span></div>
                      <div className="flex justify-between border-b border-[#003300]/10 pb-4 font-bold uppercase tracking-widest text-[10px]"><span>Asset Health</span> <span>100% Verified</span></div>
                   </div>
                </div>
             </div>
          </section>

          {/* Benefits Grid */}
          <section className="px-4 md:px-8 max-w-7xl mx-auto mb-32">
             <h2 className="text-3xl font-bold mb-16 text-center italic">Empowering the Propertied Class</h2>
             <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {benefits.map((b, i) => (
                  <div key={i} className="bg-white border border-[#D4AF37]/10 p-12 rounded-[3rem] shadow-sm hover:border-[#D4AF37]/40 transition-all text-center group">
                     <div className="text-5xl mb-8 group-hover:scale-110 transition-transform inline-block">{b.icon}</div>
                     <h4 className="text-xl font-bold mb-2">{b.title}</h4>
                     <p className="text-sm opacity-60 font-medium leading-relaxed">{b.desc}</p>
                  </div>
                ))}
             </div>
          </section>

          {/* Stories */}
          <section className="px-4 md:px-8 max-w-7xl mx-auto mb-32 border-y border-[#003300]/5 py-24">
             <h2 className="text-3xl font-bold mb-16 text-center italic">Real Stories. Verified Legacies.</h2>
             <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                {[
                  { n: "Kojo M.", p: "East Legon", q: "I used to check my land twice a week just to be sure. Now I check the app once a month just to see my rent hit my MoMo wallet." },
                  { n: "Ama S.", p: "Kumasi", q: "Sharing my digital title with the bank was seamless. Syntry's 8 layers of ground truth solved our family boundary dispute instantly." },
                  { n: "David T.", p: "Spintex", q: "Verified my plot for free and now I track its value growth every month. Finally, total control of my family legacy." }
                ].map((s, i) => (
                  <div key={i} className="flex flex-col text-center">
                     <p className="text-4xl mb-6 text-[#D4AF37]/30 italic font-serif">"</p>
                     <p className="text-lg font-medium italic opacity-80 mb-8 leading-relaxed mb-auto">"{s.q}"</p>
                     <div>
                        <h4 className="font-bold text-[#003300] text-xl">{s.n}</h4>
                        <p className="text-[10px] font-bold uppercase tracking-widest opacity-40">{s.p}</p>
                     </div>
                  </div>
                ))}
             </div>
          </section>

          {/* How It Works */}
          <section className="px-4 md:px-8 max-w-5xl mx-auto mb-40">
             <h2 className="text-3xl font-bold mb-20 text-center italic">How Verification Works</h2>
             <div className="grid grid-cols-1 md:grid-cols-4 gap-12 text-center relative">
                <div className="hidden md:block absolute top-10 left-20 right-20 h-0.5 bg-[#003300]/5 z-0"></div>
                {steps.map((step, i) => (
                  <div key={i} className="relative z-10 space-y-6">
                     <div className="w-16 h-16 bg-[#003300] text-[#D4AF37] rounded-full mx-auto flex items-center justify-center font-bold text-2xl shadow-xl shadow-[#003300]/20">{step.s}</div>
                     <h4 className="font-bold text-xl">{step.t}</h4>
                     <p className="text-xs opacity-60 leading-relaxed font-medium">{step.d}</p>
                  </div>
                ))}
             </div>
          </section>

          <section className="px-4 md:px-8 max-w-7xl mx-auto mb-20 text-center">
             <div className="bg-[#D4AF37] text-[#003300] p-16 md:p-32 rounded-[6rem] shadow-2xl relative overflow-hidden group border-[16px] border-[#F8F1E3] ring-1 ring-[#003300]/10">
                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative z-10 animate-in fade-in slide-in-from-bottom-8 duration-1000">
                  <h2 className="text-4xl md:text-7xl font-bold mb-10 italic tracking-tighter leading-none">Ready to Secure and <br /> Monetize Your Land?</h2>
                  <p className="text-xl md:text-3xl font-bold mb-16 opacity-80 max-w-3xl mx-auto leading-tight italic">Stop the uncertainty. Verify your land for free today.</p>
                  <div className="flex flex-col md:flex-row gap-8 items-center justify-center">
                     <a href="/check-my-property" className="w-full md:w-auto bg-[#003300] text-[#F8F1E3] px-16 py-8 rounded-[2.5rem] font-bold text-2xl hover:scale-105 transition-all shadow-[0_35px_60px_-15px_rgba(0,51,0,0.3)] text-center">
                        Verify Land Now – Free
                     </a>
                     <div className="flex flex-col items-center gap-4">
                        <a href="https://wa.me/233531102292" className="bg-[#00BFFF] text-white px-12 py-6 rounded-2xl font-bold text-lg hover:brightness-110 transition-all text-center">
                          Talk to Local Advisor
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

export default OwnersPage;
