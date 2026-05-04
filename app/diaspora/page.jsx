"use client";
import { Suspense } from 'react';
import React from 'react';
import dynamic from 'next/dynamic';
const GlobalHeader = dynamic(() => import('@/components/GlobalHeader'), { ssr: false });
const GlobalFooter = dynamic(() => import('@/components/GlobalFooter'), { ssr: false });

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
    <div className="bg-[#F8F1E3] min-h-screen text-[#0F172A] font-sans">
      <GlobalHeader />

      <main className="pt-32 pb-20 overflow-hidden">
        {/* Re-engineered Diaspora Hero */}
        <section className="px-4 md:px-8 max-w-7xl mx-auto mb-32 pt-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Hero Content Layout */}
          <div className="text-center lg:text-left z-10 relative">
            <div className="inline-flex items-center gap-3 bg-[#1D9E75]/10 px-5 py-2.5 rounded-md mb-8 border border-[#1D9E75]/20 shadow-sm backdrop-blur-sm">
              <span className="w-2.5 h-2.5 bg-[#1D9E75] rounded-md animate-pulse shadow-[0_0_8px_#1D9E75]"></span>
              <span className="text-[10px] sm:text-xs font-medium uppercase tracking-[0.2em] text-[#1D9E75]">Diaspora Sovereign Hub</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-medium leading-[1.1] mb-6 tracking-tight text-[#0F172A]">
              Your Ghanaian Land, <br className="hidden md:block"/>
              <span className="text-[#D4AF37] italic">Truly Yours Again</span> — <br className="hidden lg:block"/>
              From Anywhere in the World
            </h1>
            
            <h2 className="text-sm md:text-base font-medium text-[#1D9E75] uppercase tracking-widest flex flex-col md:flex-row flex-wrap items-center justify-center lg:justify-start gap-2 md:gap-3 leading-relaxed mb-6">
              <span>8 Layers of Grounded Truth</span> <span className="hidden md:block text-[#0F172A]/20">•</span>
              <span>24/7 Remote Control</span> <span className="hidden md:block text-[#0F172A]/20">•</span>
              <span>Automated Rent to Foreign Accounts</span>
            </h2>
            
            <p className="text-lg md:text-xl opacity-80 max-w-xl mx-auto lg:mx-0 mb-10 font-medium leading-relaxed">
              Syntry completely removes the anxiety of distance. We handle the manual work, resolve boundary disputes proactively, and automate your rent collection—giving you absolute control over your assets back home without needing to fly back.
            </p>
            
            <div className="flex flex-col xl:flex-row items-center justify-center lg:justify-start gap-4 mb-10 w-full max-w-xl mx-auto lg:mx-0">
               <a href="/diaspora/signup" className="w-full bg-[#1D9E75] text-white px-8 py-5 rounded-md font-medium text-lg hover:bg-[#157a5a] transition-all shadow-xl shadow-[#1D9E75]/30 flex items-center justify-center gap-3">
                 <span className="text-xl">🌍</span> Register as Diaspora Now – Free
               </a>
               <a href="/check-my-property" className="w-full bg-white border border-[#0F172A]/20 text-[#0F172A] px-8 py-5 rounded-md font-medium text-lg hover:border-[#1D9E75] hover:text-[#1D9E75] hover:bg-[#1D9E75]/5 transition-all shadow-sm flex items-center justify-center gap-2">
                 <span className="text-xl">🛡️</span> Verify My Family Property Free Today
               </a>
            </div>

            {/* Social Proof Trust Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 p-5 bg-white rounded-md border border-[#0F172A]/10 max-w-fit mx-auto lg:mx-0 shadow-sm">
              <div className="flex -space-x-3">
                <div className="w-10 h-10 rounded-md bg-syntry-obsidian border-2 border-white flex items-center justify-center text-xs shadow-sm shadow-[#0F172A]/20">🇬🇧</div>
                <div className="w-10 h-10 rounded-md bg-[#1D9E75] border-2 border-white flex items-center justify-center text-xs shadow-sm shadow-[#1D9E75]/20">🇺🇸</div>
                <div className="w-10 h-10 rounded-md bg-[#D4AF37] border-2 border-white flex items-center justify-center text-xs shadow-sm shadow-[#D4AF37]/20">🇨🇦</div>
              </div>
              <p className="text-[10px] font-medium uppercase tracking-[0.15em] text-[#0F172A]/60 leading-relaxed text-center sm:text-left">
                Trusted by 400+ Diaspora Ghanaians in <br/>
                <span className="text-[#0F172A]">UK • USA • Canada • Germany</span>
              </p>
            </div>
          </div>

          {/* Right Visual Console */}
          <div className="hidden lg:block relative z-0">
             <div className="w-full h-[600px] border-[12px] border-white bg-white rounded-[4rem] shadow-2xl overflow-hidden p-4 relative group">
                <div className="absolute inset-0 bg-gradient-to-tr from-[#1D9E75]/5 to-transparent z-10 pointer-events-none rounded-[3.5rem]"></div>
                <div className="w-full h-full bg-syntry-obsidian rounded-[3.5rem] flex flex-col p-10 overflow-hidden relative transition-transform duration-700">
                   <div className="absolute top-0 right-0 w-96 h-96 bg-[#D4AF37]/10 rounded-md blur-[80px] -mr-48 -mt-48 group-hover:bg-[#1D9E75]/20 transition-colors duration-1000"></div>
                   
                   <div className="flex justify-between items-center mb-12 relative z-20">
                      <div className="text-[10px] font-medium text-[#D4AF37] uppercase tracking-[0.2em] bg-[#D4AF37]/10 px-3 py-1.5 rounded-md border border-[#D4AF37]/20">Global Node: Active</div>
                      <div className="flex gap-2">
                         <div className="w-3 h-3 bg-[#1D9E75] rounded-md animate-pulse shadow-[0_0_10px_#1D9E75]"></div>
                         <div className="w-3 h-3 bg-[#D4AF37] rounded-md"></div>
                      </div>
                   </div>
                   
                   <div className="space-y-6 relative z-20">
                      <div className="bg-white/5 border border-white/10 p-8 rounded-[2rem] backdrop-blur-sm relative overflow-hidden group-hover:border-[#D4AF37]/30 transition-colors">
                         <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4AF37]/5 rounded-bl-[100px] -mr-10 -mt-10"></div>
                         <p className="text-[9px] font-medium text-[#F8F1E3]/50 uppercase tracking-[0.2em] mb-2 flex items-center gap-2">Live Valuation (Ghana Indexed) <span className="w-2 h-2 rounded-md bg-[#1D9E75]"></span></p>
                         <h3 className="text-4xl font-medium text-white tracking-tight italic">GH₵8,450,000</h3>
                      </div>
                      <div className="space-y-3 pl-2 border-l-2 border-[#1D9E75]/30">
                         <p className="text-[9px] font-medium text-[#1D9E75] uppercase tracking-widest pl-2">Recent Automated Inflows</p>
                         <div className="bg-[#1D9E75]/10 border border-[#1D9E75]/20 px-6 py-5 rounded-md flex justify-between items-center text-[10px] font-medium backdrop-blur-sm ml-2">
                            <span className="text-[#F8F1E3]/70 uppercase tracking-wider flex items-center gap-3">
                              <span className="text-base leading-none bg-[#1D9E75]/20 p-1.5 rounded-lg text-[#1D9E75]">🏠</span> 
                              Rent: Aburi Eco Lodge
                            </span>
                            <span className="text-[#1D9E75] text-sm">+GH₵4,200</span>
                         </div>
                      </div>
                   </div>
                   
                   <div className="mt-auto relative z-20 h-40 bg-[#000]/20 rounded-[2.5rem] border border-white/5 flex items-center justify-center overflow-hidden">
                      {/* Simulating Map Grid */}
                      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white to-transparent" style={{ backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.4) 1px, transparent 1px)', backgroundSize: '16px 16px' }}></div>
                      <div className="text-center">
                        <div className="w-12 h-12 bg-[#1D9E75]/20 rounded-md animate-ping absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
                        <div className="w-4 h-4 bg-[#1D9E75] rounded-md mx-auto mb-2 relative z-10 shadow-[0_0_15px_#1D9E75] border-2 border-white"></div>
                        <span className="text-white/40 font-medium uppercase tracking-widest text-[10px] italic relative z-10 bg-syntry-obsidian/80 px-4 py-1.5 rounded-md">Secure GPS Lock Active</span>
                      </div>
                   </div>
                </div>
             </div>
          </div>
        </section>

        {/* Unified Diaspora Benefits Grid */}
        <section className="bg-syntry-obsidian relative overflow-hidden py-32 px-4 md:px-8 mb-32 z-10">
           <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#D4AF37]/10 rounded-md blur-[120px] -mr-[400px] -mt-[400px] pointer-events-none"></div>
           <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#1D9E75]/10 rounded-md blur-[100px] -ml-[300px] -mb-[300px] pointer-events-none"></div>
           
           <div className="max-w-7xl mx-auto relative z-20">
              <div className="text-center mb-20">
                 <div className="inline-flex items-center gap-2 bg-[#D4AF37]/10 px-4 py-2 rounded-md mb-6 border border-[#D4AF37]/20">
                   <span className="text-[10px] sm:text-xs font-medium uppercase tracking-[0.2em] text-[#D4AF37]">The Syntry Standard</span>
                 </div>
                 <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium mb-6 italic text-[#F8F1E3] tracking-tight">Empowering Diaspora Ownership</h2>
                 <p className="text-lg md:text-xl text-[#A8E6CF] max-w-2xl mx-auto font-medium opacity-90 leading-relaxed">
                    Replacing the guesswork, family disputes, and physical distance with absolute sovereign control over your assets.
                 </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                 {[
                    { title: "24/7 Global Live Valuation Dashboard", icon: "🌐", desc: "Monitor your Ghana property's true value in real-time, indexed against live market data." },
                    { title: "8 Layers of Grounded Truth (zero litigation)", icon: "🛡️", desc: "Absolute certainty. We clear all boundary, legal, and title risks before the asset hits your portal." },
                    { title: "Automated Rent Paid Directly to Your Account", icon: "💸", desc: "No more chasing family or tenants. Verified yields settle directly to your foreign or local accounts." },
                    { title: "Secure Digital Sovereign Title", icon: "📜", desc: "Your unalterable digital deed—easily shareable with international banks for borrowing, or with family." },
                    { title: "Timezone Alerts via WhatsApp", icon: "📱", desc: "Stay perfectly informed with push notifications tailored dynamically to your specific global timezone." },
                    { title: "Tax-Ready Reports for Ghana & Abroad", icon: "📊", desc: "Generate instant, compliant financial statements suitable for the GRA or your local foreign tax authority." }
                 ].map((item, i) => (
                    <div key={i} className="bg-white/5 border border-white/10 p-8 md:p-12 rounded-[3.5rem] hover:bg-[#1D9E75]/10 hover:border-[#1D9E75]/30 transition-all duration-500 group backdrop-blur-sm flex flex-col h-full shadow-2xl shadow-black/20">
                       <div className="w-16 h-16 bg-[#F8F1E3] text-[#0F172A] rounded-[1.5rem] flex items-center justify-center text-3xl mb-8 group-hover:scale-110 group-hover:rotate-3 transition-transform shadow-lg shadow-[#0F172A]/50">{item.icon}</div>
                       <h3 className="text-xl md:text-2xl font-medium text-[#F8F1E3] mb-4 leading-tight">{item.title}</h3>
                       <p className="text-sm text-[#A8E6CF] opacity-70 leading-relaxed mb-auto">{item.desc}</p>
                       <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between">
                          <span className="text-[10px] font-medium uppercase tracking-widest text-[#D4AF37]">Syntry Verified</span>
                          <span className="inline-flex items-center justify-center w-8 h-8 rounded-md bg-[#1D9E75]/20 text-[#1D9E75] text-sm font-medium shadow-[0_0_10px_rgba(29,158,117,0.3)]">✓</span>
                       </div>
                    </div>
                 ))}
              </div>
           </div>
        </section>

        {/* Upgraded Diaspora Trust & Stories */}
        <section className="px-4 md:px-8 max-w-7xl mx-auto mb-40 relative">
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[1000px] h-[400px] bg-[#D4AF37]/5 rounded-md blur-[100px] pointer-events-none z-0"></div>
           
           <div className="text-center mb-20 relative z-10">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium mb-6 italic tracking-tight text-[#0F172A]">Real Diaspora Stories</h2>
              <p className="text-lg md:text-xl font-medium text-[#D4AF37] uppercase tracking-widest bg-[#D4AF37]/10 inline-block px-6 py-2 rounded-md border border-[#D4AF37]/20">
                 From London, New York & Toronto
              </p>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12 mb-24 relative z-10">
              {[
                { name: "Kofi B.", loc: "London, UK", flag: "🇬🇧", quote: "Being abroad, I always worried about my land in Aburi. Syntry gives me total visibility. The 8-layer verification solved a 2-year boundary dispute in days.", photo: "👨🏾‍💼" },
                { name: "Ama T.", loc: "Brooklyn, NY", flag: "🇺🇸", quote: "My rent hits my account every month without a single phone call. Finally, a system that works for Ghanaians living far from home.", photo: "👩🏾‍💼" },
                { name: "David M.", loc: "Toronto, CA", flag: "🇨🇦", quote: "Sharing my digital title with my UK bank was seamless. Syntry is the trust bridge the Diaspora has been waiting for.", photo: "👨🏾‍💻" }
              ].map((t, i) => (
                <div key={i} className="flex flex-col text-center bg-white p-10 md:p-12 rounded-[3.5rem] border border-[#0F172A]/10 shadow-[0_30px_60px_-15px_rgba(0,51,0,0.05)] hover:-translate-y-3 transition-transform duration-500 relative flex-grow h-full">
                   <div className="absolute top-10 left-10 text-8xl opacity-5 font-serif leading-none text-[#0F172A]">"</div>
                   <div className="w-24 h-24 bg-syntry-obsidian text-[#D4AF37] rounded-[2.5rem] mx-auto flex items-center justify-center text-5xl mb-10 shadow-xl shadow-[#0F172A]/20 border-[6px] border-[#F8F1E3] relative z-10">{t.photo}</div>
                   <p className="text-xl md:text-2xl font-medium italic opacity-90 mb-12 leading-relaxed text-[#0F172A] flex-grow relative z-10">"{t.quote}"</p>
                   <div className="pt-8 border-t border-[#0F172A]/10 bg-[#F8F1E3]/50 -mx-10 md:-mx-12 -mb-10 md:-mb-12 p-8 md:p-10 rounded-b-[3.5rem] mt-auto">
                      <h4 className="font-medium tracking-tight text-[#0F172A] text-3xl tracking-tight mb-3">{t.name}</h4>
                      <p className="text-xs font-medium uppercase tracking-widest text-[#1D9E75] flex items-center justify-center gap-3">
                         <span className="text-xl bg-white w-10 h-10 rounded-[1rem] shadow-sm flex items-center justify-center border border-[#0F172A]/5">{t.flag}</span>
                         {t.loc}
                      </p>
                   </div>
                </div>
              ))}
           </div>

           {/* Metrics & Trust Bar Element */}
           <div className="relative z-10 max-w-5xl mx-auto transform translate-y-4">
              <div className="bg-syntry-obsidian text-white p-2 border-[12px] border-white rounded-[4rem] shadow-2xl flex flex-col lg:flex-row items-stretch divide-y lg:divide-y-0 lg:divide-x divide-white/10 relative overflow-hidden group">
                 <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                 
                 <div className="flex-1 p-8 md:p-12 text-center lg:text-left flex flex-col justify-center relative z-10">
                    <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#D4AF37] mb-4 flex items-center justify-center lg:justify-start gap-2">
                       <span className="text-lg">🛡️</span> Total Asset Value
                    </p>
                    <p className="text-2xl md:text-3xl lg:text-4xl font-medium tracking-tight leading-tight">
                       GH₵8.45M+ in Diaspora-Owned<br className="hidden xl:block"/> Assets Already Protected
                    </p>
                 </div>
                 
                 <div className="flex-1 p-8 md:p-12 lg:text-right flex flex-col justify-center bg-white/5 rounded-[3rem] lg:rounded-l-none relative z-10">
                    <div className="flex gap-2 items-center justify-center lg:justify-end mb-4">
                       <span className="w-2.5 h-2.5 bg-[#1D9E75] rounded-md animate-pulse shadow-[0_0_10px_#1D9E75]"></span>
                       <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#1D9E75]">Live Protocol Network</p>
                    </div>
                    <p className="text-lg md:text-2xl font-medium opacity-90 italic text-center lg:text-right">
                       Recent Rent Distributed: <br className="hidden sm:block"/>
                       <strong className="text-[#A8E6CF] text-2xl md:text-3xl font-medium not-italic">GH₵4,200</strong> to Aburi Owner in UK
                    </p>
                 </div>
              </div>

              {/* Conversion Funnel CTA */}
              <div className="text-center mt-16 md:mt-20">
                 <a href="/diaspora/signup" className="inline-flex items-center justify-center gap-4 bg-[#D4AF37] text-[#0F172A] px-10 md:px-16 py-6 md:py-8 rounded-[3rem] font-medium tracking-tight text-xl md:text-3xl hover:scale-[1.02] transition-all shadow-[0_30px_60px_-15px_rgba(212,175,55,0.5)] group tracking-tight">
                    Join 400+ Diaspora Members Who Now Own with Confidence 
                    <span className="text-4xl group-hover:translate-x-2 transition-transform">→</span>
                 </a>
              </div>
           </div>
        </section>

        {/* Redesigned 4 Steps Matrix */}
        <section className="px-4 md:px-8 max-w-7xl mx-auto mb-40 relative">
           <h2 className="text-4xl md:text-5xl font-medium mb-16 text-center italic tracking-tight text-[#0F172A]">Global Control in 4 Clean Steps</h2>
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { s: "01", t: "Register Hub", d: "Join as a Diaspora member securely from anywhere.", icon: "🌍" },
                { s: "02", t: "Verify Plot", d: "Syntry runs the strict statutory 8-Layer physical audit.", icon: "🛡️" },
                { s: "03", t: "Set Payouts", d: "Link your international or local MoMo account globally.", icon: "💳" },
                { s: "04", t: "Control Node", d: "Monitor, earn yields, and protect your land 24/7.", icon: "📱" }
              ].map((step, i) => (
                <div key={i} className="bg-white p-10 rounded-[2.5rem] border border-[#0F172A]/10 shadow-[0_20px_40px_-20px_rgba(0,51,0,0.05)] hover:-translate-y-2 transition-transform duration-500 group relative overflow-hidden text-center flex flex-col h-full h-full">
                   <div className="absolute top-0 left-0 w-full h-1.5 bg-[#1D9E75] transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500 z-10"></div>
                   <div className="text-8xl text-[#0F172A]/5 font-medium tracking-tight absolute -top-6 -right-6 pointer-events-none group-hover:text-[#D4AF37]/10 transition-colors duration-500 z-0">{step.s}</div>
                   <div className="w-16 h-16 bg-[#F8F1E3] text-[#0F172A] rounded-md mx-auto flex items-center justify-center text-3xl mb-8 group-hover:bg-[#1D9E75] group-hover:text-white transition-colors duration-500 shadow-sm relative z-10">{step.icon}</div>
                   <h4 className="font-medium tracking-tight text-2xl mb-4 tracking-tight leading-tight text-[#0F172A] relative z-10">{step.t}</h4>
                   <p className="text-sm opacity-70 leading-relaxed font-medium mb-auto text-[#0F172A] relative z-10">{step.d}</p>
                </div>
              ))}
           </div>
        </section>

        {/* Lead Capture and Final Conversion Engine */}
        <section className="px-4 md:px-8 max-w-5xl mx-auto mb-32">
           <div className="bg-white p-8 md:p-16 rounded-[3.5rem] md:rounded-[4rem] text-center shadow-[0_40px_80px_-20px_rgba(0,51,0,0.1)] relative overflow-hidden border-[8px] md:border-[16px] border-[#F8F1E3]">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-32 bg-gradient-to-b from-[#D4AF37]/10 to-transparent pointer-events-none"></div>
              
              {/* Form Area */}
              <div className="relative z-10 max-w-2xl mx-auto mb-16 pt-4">
                 <div className="inline-flex items-center gap-2 bg-[#1D9E75]/10 px-4 py-2 rounded-md mb-6 border border-[#1D9E75]/20">
                   <span className="w-2 h-2 bg-[#1D9E75] rounded-md animate-pulse shadow-[0_0_8px_#1D9E75]"></span>
                   <span className="text-[10px] font-medium uppercase tracking-widest text-[#1D9E75]">Global Verification Node</span>
                 </div>
                 
                 <h2 className="text-3xl md:text-5xl font-medium mb-6 italic tracking-tight text-[#0F172A]">Start Your Free Diaspora <br className="hidden md:block"/> Verification Today</h2>
                 <p className="text-lg opacity-70 mb-12 font-medium">Drop your details below. Our global team will map your coordinates and audit the title immediately.</p>
                 
                 <form className="space-y-6 text-left" onSubmit={(e) => { e.preventDefault(); alert('Lead Sent to Syntry Command Center.'); }}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                       <div>
                          <label className="block text-[10px] font-medium uppercase tracking-widest text-[#0F172A]/70 mb-2 pl-3">Full Name</label>
                          <input type="text" required placeholder="Kwame Osei" className="w-full bg-[#F8F1E3]/50 border border-[#0F172A]/10 rounded-md px-6 py-5 focus:outline-none focus:border-[#1D9E75] focus:ring-2 focus:ring-[#1D9E75]/30 transition-all font-medium text-sm" />
                       </div>
                       <div>
                          <label className="block text-[10px] font-medium uppercase tracking-widest text-[#0F172A]/70 mb-2 pl-3">WhatsApp / Phone (Intl)</label>
                          <input type="tel" required placeholder="+44 7700 900077" className="w-full bg-[#F8F1E3]/50 border border-[#0F172A]/10 rounded-md px-6 py-5 focus:outline-none focus:border-[#1D9E75] focus:ring-2 focus:ring-[#1D9E75]/30 transition-all font-medium text-sm" />
                       </div>
                    </div>
                    <div>
                       <label className="block text-[10px] font-medium uppercase tracking-widest text-[#0F172A]/70 mb-2 pl-3">Property Location / Title Number</label>
                       <input type="text" placeholder="e.g. Plot 42, Aburi or Title #GA-1234" className="w-full bg-[#F8F1E3]/50 border border-[#0F172A]/10 rounded-md px-6 py-5 focus:outline-none focus:border-[#1D9E75] focus:ring-2 focus:ring-[#1D9E75]/30 transition-all font-medium text-sm" />
                    </div>
                    <div>
                       <label className="block text-[10px] font-medium uppercase tracking-widest text-[#0F172A]/70 mb-2 pl-3">Email Address (Optional)</label>
                       <input type="email" placeholder="kwame@example.com" className="w-full bg-[#F8F1E3]/50 border border-[#0F172A]/10 rounded-md px-6 py-5 focus:outline-none focus:border-[#1D9E75] focus:ring-2 focus:ring-[#1D9E75]/30 transition-all font-medium text-sm" />
                    </div>
                    
                    <button type="submit" className="w-full bg-[#1D9E75] text-white px-8 py-6 rounded-md font-medium tracking-tight text-xl hover:bg-[#157a5a] transition-all shadow-[0_20px_40px_-10px_rgba(29,158,117,0.4)] mt-8 flex items-center justify-center gap-3 group">
                       Submit for Free 8-Layer Verification Report 
                       <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </button>
                    <p className="text-center text-[10px] font-medium uppercase tracking-widest text-[#0F172A]/40 mt-5 flex items-center justify-center gap-2">
                       <span className="w-1.5 h-1.5 bg-[#1D9E75] rounded-md inline-block"></span> Secure encrypted transmission
                    </p>
                 </form>
              </div>

              {/* Final Split CTAs */}
              <div className="pt-10 md:pt-12 border-t border-[#0F172A]/5 flex flex-col sm:flex-row gap-4 md:gap-6 items-center justify-center relative z-10 w-full max-w-xl mx-auto">
                 <a href="/marketplace" className="w-full sm:w-auto bg-syntry-obsidian text-[#D4AF37] px-8 py-4.5 rounded-md font-medium text-sm hover:bg-[#002200] transition-all shadow-lg flex items-center justify-center gap-2 whitespace-nowrap">
                   Browse Verified Properties Now
                 </a>
                 <span className="text-[#0F172A]/30 font-medium italic hidden sm:block">or</span>
                 <a href="https://wa.me/233531102292" className="w-full sm:w-auto bg-transparent border border-[#0F172A]/20 text-[#0F172A] px-8 py-4 rounded-md font-medium text-sm hover:border-[#1D9E75] hover:text-[#1D9E75] hover:bg-[#1D9E75]/5 transition-all flex items-center justify-center gap-2 whitespace-nowrap">
                   Talk to Diaspora Support Team
                 </a>
              </div>
           </div>
        </section>
      </main>

      <GlobalFooter />
      
      {/* Floating Global Support Widget */}
      <a 
        href="https://wa.me/233531102292" 
        className="fixed bottom-10 right-10 z-[3000] bg-[#25D366] text-white p-4 md:p-5 rounded-md shadow-[0_20px_50px_rgba(37,211,102,0.4)] hover:scale-110 transition-all group flex items-center gap-3 border border-white/20 hover:animate-pulse"
        title="Contact Syntry Global Support"
      >
        <span className="text-3xl group-hover:rotate-12 transition-transform">💬</span>
        <span className="text-xs font-medium uppercase tracking-widest hidden md:flex items-center gap-2">
          <span>053 110 2292</span>
          <span className="w-1.5 h-1.5 bg-white rounded-md animate-ping ml-1"></span>
        </span>
      </a>
    </div>
  );
};

export default DiasporaPage;
