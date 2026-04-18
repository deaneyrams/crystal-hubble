"use client";
import { Suspense } from 'react';
import React from 'react';
import GlobalHeader from '../../components/GlobalHeader';
import GlobalFooter from '../../components/GlobalFooter';

const DiasporaPage = () => {
  const challenges = [
    { pain: "Distance makes land monitoring impossible.", solution: "24/7 Global Live Valuation & Audit Dashboard." },
    { pain: "Title insecurity and 'encroachment' fear.", solution: "8 Layers of Grounded Truth protect your coordinates." },
    { pain: "Manual rent chasing across continents.", solution: "Automated collection settled to your account." },
    { pain: "Family disputes and lack of transparency.", solution: "Secure Digital Sovereign Title shared with family." }
  ];

  const benefits = [
    { title: "Global Dashboard", desc: "Real-time valuation from anywhere.", icon: "📈" },
    { title: "Direct Payouts", desc: "Automated rent to your chosen account.", icon: "💰" },
    { title: "Tax Ready", desc: "One-click reports for Ghana & Abroad.", icon: "🧾" },
    { title: "Sovereign Title", desc: "Secure digital deed for banks/family.", icon: "📜" },
    { title: "Timezone Alerts", desc: "WhatsApp monitoring in your local time.", icon: "📱" },
    { title: "Full Protection", desc: "8 Layers of statutory verification.", icon: "🛡️" }
  ];

  const testimonials = [
    { name: "Kofi B.", loc: "London, UK", quote: "Being abroad, I always worried about my land in Aburi. Syntry gives me total visibility. The 8-layer verification solved a 2-year boundary dispute in days.", photo: "👨🏾‍💼" },
    { name: "Ama T.", loc: "Brooklyn, NY", quote: "My rent hits my account every month without a single phone call. Finally, a system that works for Ghanaians living far from home.", photo: "👩🏾‍💼" },
    { name: "David M.", loc: "Toronto, CA", quote: "Sharing my digital title with my UK bank was seamless. Syntry is the trust bridge the Diaspora has been waiting for.", photo: "👨🏾‍💻" }
  ];

  return (
    <div className="bg-[#F8F1E3] min-h-screen text-[#003300] font-sans">
      <GlobalHeader />

      <main className="pt-32 pb-20 overflow-hidden">
        {/* Hero Section */}
        <section className="px-4 md:px-8 max-w-7xl mx-auto mb-32 text-center lg:text-left grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-[#D4AF37]/10 px-4 py-2 rounded-full mb-8 border border-[#D4AF37]/20">
              <span className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full animate-pulse"></span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#D4AF37]">Diaspora Sovereign Hub</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold leading-[1.1] mb-8 tracking-tight">
              For Diaspora Ghanaians — <br />
              <span className="text-[#D4AF37] italic">Your Land, Truly Yours</span> <br />
              Again
            </h1>
            <p className="text-xl md:text-2xl opacity-70 max-w-xl mx-auto lg:mx-0 mb-12 font-medium leading-relaxed italic">
              Manage, monitor, earn from, and protect your family land in Ghana from anywhere in the world.
            </p>
            <div className="flex flex-col gap-6 items-center lg:items-start">
               <a href="/diaspora/signup" className="w-full lg:w-auto bg-[#D4AF37] text-[#003300] px-16 py-6 rounded-2xl font-bold text-2xl hover:scale-[1.02] transition-all shadow-2xl shadow-[#D4AF37]/30 flex items-center justify-center gap-4 text-center">
                 Register as Diaspora Now – Free
               </a>
               <div className="flex flex-col sm:flex-row items-center gap-6">
                 <a href="/check-my-property" className="bg-[#003300] text-[#F8F1E3] px-10 py-4 rounded-xl font-bold text-sm hover:bg-[#004d00] transition-all text-center">
                   Verify My Ghana Property – Free
                 </a>
                 <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest opacity-40">
                   <span>Call/WA: 0531102292</span>
                   <div className="w-[1px] h-3 bg-[#003300]/10" />
                   <span>info@syntry.co</span>
                 </div>
               </div>
            </div>
          </div>
          <div className="hidden lg:block relative">
             <div className="w-full h-[600px] border-[12px] border-white bg-white rounded-[4rem] shadow-2xl overflow-hidden p-4">
                <div className="w-full h-full bg-[#003300] rounded-[3.5rem] flex flex-col p-10 overflow-hidden relative">
                   <div className="absolute top-0 right-0 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-3xl -mr-48 -mt-48"></div>
                   <div className="flex justify-between items-center mb-12">
                      <div className="text-[10px] font-bold text-[#D4AF37] uppercase tracking-widest">Global Node: Active</div>
                      <div className="flex gap-2">
                         <div className="w-3 h-3 bg-[#A8E6CF] rounded-full animate-pulse"></div>
                         <div className="w-3 h-3 bg-[#D4AF37] rounded-full"></div>
                      </div>
                   </div>
                   <div className="space-y-6">
                      <div className="bg-white/5 border border-white/10 p-6 rounded-3xl">
                         <p className="text-[8px] font-bold opacity-40 uppercase mb-2">Live Valuation (Ghana Indexed)</p>
                         <h3 className="text-3xl font-bold text-white tracking-widest italic">GH₵8,450,000</h3>
                      </div>
                      <div className="space-y-3">
                         <p className="text-[9px] font-bold text-[#D4AF37] uppercase tracking-widest">Recent Inflows</p>
                         <div className="bg-white/5 border border-white/10 px-6 py-4 rounded-2xl flex justify-between items-center text-[10px] font-bold">
                            <span className="opacity-40 uppercase">Rent: Aburi Eco Lodge</span>
                            <span className="text-[#A8E6CF]">+GH₵4,200</span>
                         </div>
                      </div>
                   </div>
                   <div className="mt-auto h-32 bg-white/5 rounded-[2rem] border-2 border-dashed border-white/10 flex items-center justify-center text-white/20 font-bold uppercase tracking-widest text-xs italic">
                     Statutory Monitoring Map
                   </div>
                </div>
             </div>
          </div>
        </section>

        {/* Challenge Section */}
        <section className="bg-[#003300] text-[#F8F1E3] py-32 px-4 mb-32 relative overflow-hidden">
           <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[300px] bg-[#D4AF37]/5 rounded-full blur-[120px] -mt-150"></div>
           <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
              <div>
                 <h2 className="text-3xl font-bold mb-10 italic">The Diaspora Challenge</h2>
                 <div className="space-y-10">
                    {challenges.map((c, i) => (
                      <div key={i} className="flex gap-8 group">
                         <div className="w-14 h-14 bg-red-500/10 rounded-2xl flex-shrink-0 flex items-center justify-center text-red-500 font-bold border border-red-500/20 group-hover:bg-red-500 group-hover:text-white transition-all text-xl">✕</div>
                         <div>
                            <p className="text-xl font-bold mb-2 opacity-30 line-through decoration-[#D4AF37] decoration-2">{c.pain}</p>
                            <p className="text-sm font-bold text-[#A8E6CF] uppercase tracking-widest flex items-center gap-3">
                               <span className="w-6 h-[1px] bg-[#A8E6CF]"></span> {c.solution}
                            </p>
                         </div>
                      </div>
                    ))}
                 </div>
              </div>
              <div className="bg-[#D4AF37] p-16 rounded-[4rem] text-[#003300] shadow-2xl relative border-l-[12px] border-l-[#A8E6CF]">
                 <p className="text-[10px] font-bold uppercase tracking-widest opacity-60 mb-4">Sovereign Proof</p>
                 <h3 className="text-3xl font-bold mb-6 italic leading-tight">"Governance by coordinates means distance is no longer a risk factor."</h3>
                 <p className="text-lg font-medium opacity-80 leading-relaxed italic mb-10">Lock your land into our 8-Layer Statutory Exchange and monitor your wealth from your phone, 24/7.</p>
                 <div className="flex gap-4">
                    <span className="bg-[#003300] text-white px-6 py-2 rounded-full font-bold text-[9px] uppercase tracking-widest shadow-xl shadow-[#003300]/20">Statutory Sync</span>
                    <span className="bg-white/20 text-[#003300] px-6 py-2 rounded-full font-bold text-[9px] uppercase tracking-widest">Global Hub</span>
                 </div>
              </div>
           </div>
        </section>

        {/* Benefits Grid */}
        <section className="px-4 md:px-8 max-w-7xl mx-auto mb-32">
           <h2 className="text-4xl font-bold mb-20 text-center italic tracking-tight">Empowering Diaspora Ownership</h2>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {benefits.map((b, i) => (
                <div key={i} className="bg-white border border-[#D4AF37]/10 p-12 rounded-[3.5rem] shadow-sm hover:border-[#D4AF37]/40 transition-all text-center group translate-y-0 hover:-translate-y-2">
                   <div className="text-6xl mb-8 group-hover:scale-110 transition-transform inline-block drop-shadow-sm">{b.icon}</div>
                   <h4 className="text-2xl font-bold mb-3">{b.title}</h4>
                   <p className="text-xs opacity-60 font-medium leading-relaxed max-w-[240px] mx-auto">{b.desc}</p>
                   <div className="mt-8 pt-8 border-t border-[#003300]/5 flex justify-center">
                      <div className="w-6 h-6 bg-[#A8E6CF]/20 rounded-full flex items-center justify-center text-[#A8E6CF] text-xs font-bold">✓</div>
                   </div>
                </div>
              ))}
           </div>
        </section>

        {/* Diaspora Stories */}
        <section className="px-4 md:px-8 max-w-7xl mx-auto mb-40">
           <h2 className="text-3xl font-bold mb-20 text-center italic">Voices from the Global Hub</h2>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {testimonials.map((t, i) => (
                <div key={i} className="flex flex-col text-center bg-white/30 p-10 rounded-[3rem] border border-[#003300]/5 backdrop-blur-sm">
                   <div className="w-20 h-20 bg-[#003300] text-[#D4AF37] rounded-full mx-auto flex items-center justify-center text-4xl mb-8 shadow-xl shadow-[#003300]/10">{t.photo}</div>
                   <p className="text-lg font-medium italic opacity-80 mb-10 leading-relaxed mb-auto">"{t.quote}"</p>
                   <div>
                      <h4 className="font-black text-[#003300] text-xl tracking-tight">{t.name}</h4>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-[#D4AF37] bg-[#D4AF37]/10 px-3 py-1 rounded-full inline-block mt-2">{t.loc}</p>
                   </div>
                </div>
              ))}
           </div>
        </section>

        {/* How It Works */}
        <section className="px-4 md:px-8 max-w-5xl mx-auto mb-40 text-center">
           <h2 className="text-4xl font-bold mb-24 italic">Global Control in 4 Steps</h2>
           <div className="grid grid-cols-1 md:grid-cols-4 gap-12 text-center relative">
              <div className="hidden md:block absolute top-10 left-20 right-20 h-0.5 bg-[#D4AF37]/20 z-0"></div>
              {[
                { s: "01", t: "Register Hub", d: "Join as a Diaspora member from anywhere." },
                { s: "02", t: "Verify Plot", d: "Syntry runs the statutory 8-Layer audit." },
                { s: "03", t: "Set Payouts", d: "Link your international or MoMo account." },
                { s: "04", t: "Control Node", d: "Monitor, earn, and protect land 24/7." }
              ].map((step, i) => (
                <div key={i} className="relative z-10 space-y-6 group">
                   <div className="w-20 h-20 bg-[#003300] text-[#D4AF37] rounded-full mx-auto flex items-center justify-center font-bold text-3xl shadow-2xl shadow-[#003300]/30 transition-all group-hover:scale-110">{step.s}</div>
                   <h4 className="font-bold text-xl leading-tight">{step.t}</h4>
                   <p className="text-[11px] opacity-60 leading-relaxed font-medium">{step.d}</p>
                </div>
              ))}
           </div>
        </section>

        {/* Final CTA Section */}
        <section className="px-4 md:px-8 max-w-7xl mx-auto mb-20">
           <div className="bg-[#D4AF37] text-[#003300] p-16 md:p-32 rounded-[6rem] text-center shadow-2xl relative overflow-hidden group border-[16px] border-[#F8F1E3] ring-1 ring-[#003300]/10">
              <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative z-10 animate-in fade-in slide-in-from-bottom-8 duration-1000">
                <h2 className="text-4xl md:text-7xl font-bold mb-10 italic tracking-tighter leading-none">Ready to Reclaim Control <br /> of Your Ghanaian Land?</h2>
                <p className="text-xl md:text-3xl font-bold mb-16 opacity-80 max-w-3xl mx-auto leading-tight italic">Stop the uncertainty. Secure your sovereign coordinates today.</p>
                <div className="flex flex-col md:flex-row gap-8 items-center justify-center">
                   <a href="/diaspora/signup" className="w-full md:w-auto bg-[#003300] text-[#F8F1E3] px-16 py-8 rounded-[2.5rem] font-bold text-2xl hover:scale-105 transition-all shadow-[0_35px_60px_-15px_rgba(0,51,0,0.3)] text-center">
                      Register as Diaspora Now – Free
                   </a>
                   <div className="flex flex-col items-center gap-4">
                      <a href="/check-my-property" className="bg-[#00BFFF] text-white px-12 py-6 rounded-2xl font-bold text-lg hover:brightness-110 transition-all text-center">
                        Start FREE Verification
                      </a>
                      <p className="text-[10px] font-bold uppercase tracking-widest opacity-40">Statutory Protection Guaranteed</p>
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

export default DiasporaPage;
