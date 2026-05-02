"use client";
import { Suspense } from 'react';
import React from 'react';
import dynamic from 'next/dynamic';
const GlobalHeader = dynamic(() => import('@/components/GlobalHeader'), { ssr: false });
const GlobalFooter = dynamic(() => import('@/components/GlobalFooter'), { ssr: false });

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
    <Suspense fallback={<div className="bg-[#0F172A] min-h-screen" />}>
      <div className="bg-[#F8F1E3] min-h-screen text-[#0F172A] font-sans">
        <GlobalHeader />

        <main className="pt-32 pb-20">
          {/* Re-engineered Owners Hero */}
          <section className="px-4 md:px-8 max-w-7xl mx-auto mb-32 pt-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left Hero Content Layout */}
            <div className="text-center lg:text-left z-10 relative">
              <div className="inline-flex items-center gap-3 bg-[#1D9E75]/10 px-5 py-2.5 rounded-full mb-8 border border-[#1D9E75]/20 shadow-sm backdrop-blur-sm">
                <span className="w-2.5 h-2.5 bg-[#1D9E75] rounded-full animate-pulse shadow-[0_0_8px_#1D9E75]"></span>
                <span className="text-[10px] sm:text-xs font-medium uppercase tracking-[0.2em] text-[#1D9E75]">The Sovereign Shield</span>
              </div>
              
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-medium leading-[1.1] mb-6 tracking-tight text-[#0F172A]">
                Take Full Control <br className="hidden md:block"/>
                <span className="text-[#D4AF37] italic">of Your Land</span> — <br className="hidden lg:block"/>
                The Syntry Owner Experience
              </h1>
              
              <h2 className="text-sm md:text-base font-medium text-[#1D9E75] uppercase tracking-widest flex flex-col md:flex-row flex-wrap items-center justify-center lg:justify-start gap-2 md:gap-3 leading-relaxed mb-6">
                <span>8 Layers of Grounded Truth</span> <span className="hidden md:block text-[#0F172A]/20">•</span>
                <span>Automated Rent</span> <span className="hidden md:block text-[#0F172A]/20">•</span>
                <span>Real-Time Value Tracking</span> <span className="hidden md:block text-[#0F172A]/20">•</span>
                <span>Zero Disputes</span>
              </h2>
              
              <p className="text-lg md:text-xl opacity-80 max-w-xl mx-auto lg:mx-0 mb-10 font-medium leading-relaxed">
                Secure your family legacy, get paid automatically, and list or sell your property with total confidence. Replace physical filing cabinets with a global node.
              </p>
              
              <div className="flex flex-col xl:flex-row items-center justify-center lg:justify-start gap-4 mb-10 w-full max-w-xl mx-auto lg:mx-0">
                 <a href="/check-my-property" className="w-full bg-[#1D9E75] text-white px-8 py-5 rounded-2xl font-medium text-lg hover:bg-[#157a5a] transition-all shadow-xl shadow-[#1D9E75]/30 flex items-center justify-center gap-3">
                   <span className="text-xl">🛡️</span> Verify My Property Now – Free
                 </a>
                 <a href="/marketplace" className="w-full bg-white border border-[#0F172A]/20 text-[#0F172A] px-8 py-5 rounded-2xl font-medium text-lg hover:border-[#1D9E75] hover:text-[#1D9E75] hover:bg-[#1D9E75]/5 transition-all shadow-sm flex items-center justify-center gap-2">
                   <span className="text-xl">📈</span> List My Property on the Marketplace
                 </a>
              </div>

              {/* Social Proof Trust Bar */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 p-5 bg-white rounded-2xl border border-[#0F172A]/10 max-w-fit mx-auto lg:mx-0 shadow-sm">
                <div className="flex -space-x-3">
                  <div className="w-10 h-10 rounded-full bg-[#0F172A] border-2 border-white flex items-center justify-center text-lg shadow-sm shadow-[#0F172A]/20">🇬🇭</div>
                  <div className="w-10 h-10 rounded-full bg-[#1D9E75] border-2 border-white flex items-center justify-center text-lg shadow-sm shadow-[#1D9E75]/20">🇬🇭</div>
                  <div className="w-10 h-10 rounded-full bg-[#D4AF37] border-2 border-white flex items-center justify-center text-lg shadow-sm shadow-[#D4AF37]/20">🇬🇭</div>
                </div>
                <p className="text-[10px] font-medium uppercase tracking-[0.15em] text-[#0F172A]/60 leading-relaxed text-center sm:text-left">
                  Trusted by <span className="text-[#0F172A]">200+ Ghanaian Owners</span> <br/>
                  <span className="text-[#1D9E75]">GH₵12.4M+</span> in Protected Assets
                </p>
              </div>
            </div>

            {/* Right Visual Console */}
            <div className="hidden lg:block relative z-0">
               <div className="w-full h-[600px] bg-white border-[12px] border-white rounded-[4rem] shadow-[0_40px_80px_-20px_rgba(0,51,0,0.15)] overflow-hidden p-4 relative group">
                  <div className="absolute inset-0 bg-gradient-to-tr from-[#1D9E75]/5 to-transparent z-10 pointer-events-none rounded-[3.5rem]"></div>
                  <div className="w-full h-full bg-[#0F172A] rounded-[3.5rem] flex flex-col p-10 overflow-hidden relative transition-transform duration-700">
                     <div className="absolute top-0 right-0 w-96 h-96 bg-[#1D9E75]/10 rounded-full blur-[80px] -mr-48 -mt-48 group-hover:bg-[#1D9E75]/20 transition-colors duration-1000"></div>
                     <div className="flex justify-between items-center mb-12 relative z-20">
                        <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center font-medium tracking-tight text-2xl text-white border border-white/20 shadow-lg">S</div>
                        <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 shadow-sm">
                           <div className="w-2.5 h-2.5 bg-[#1D9E75] rounded-full animate-pulse shadow-[0_0_8px_#1D9E75]"></div>
                           <div className="text-[10px] font-medium text-white uppercase tracking-[0.2em]">Live Dashboard</div>
                        </div>
                     </div>
                     <div className="space-y-6 relative z-20">
                        <div className="bg-white/5 border border-white/10 p-8 rounded-[2.5rem] backdrop-blur-sm relative overflow-hidden group-hover:border-[#1D9E75]/30 transition-colors shadow-xl">
                           <div className="absolute top-0 right-0 w-32 h-32 bg-[#1D9E75]/10 rounded-bl-[100px] -mr-10 -mt-10"></div>
                           <p className="text-[9px] font-medium text-[#F8F1E3]/50 uppercase tracking-[0.2em] mb-2 flex items-center gap-2">Verified Value (GH₵) <span className="w-2 h-2 rounded-full bg-[#1D9E75]"></span></p>
                           <h3 className="text-4xl font-medium text-white tracking-tight italic">GH₵4,250,000</h3>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                           <div className="bg-[#1D9E75]/10 border border-[#1D9E75]/20 p-6 rounded-[1.5rem] text-center backdrop-blur-sm shadow-sm">
                              <p className="text-[8px] font-medium opacity-70 text-white uppercase tracking-widest mb-2">Protocol Status</p>
                              <p className="text-[11px] font-medium tracking-tight text-[#1D9E75] uppercase tracking-widest flex flex-col items-center gap-1">
                                <span className="text-lg">🛡️</span> Verified
                              </p>
                           </div>
                           <div className="bg-[#D4AF37]/10 border border-[#D4AF37]/20 p-6 rounded-[1.5rem] text-center backdrop-blur-sm shadow-sm">
                              <p className="text-[8px] font-medium opacity-70 text-white uppercase tracking-widest mb-2">Rent Engine</p>
                              <p className="text-[11px] font-medium tracking-tight text-[#D4AF37] uppercase tracking-widest flex flex-col items-center gap-1">
                                <span className="text-lg">💰</span> Ready
                              </p>
                           </div>
                        </div>
                     </div>
                     <div className="mt-12 flex-1 border-2 border-dashed border-white/10 rounded-[2rem] bg-[#000]/20 flex items-center justify-center relative z-20 group-hover:border-[#1D9E75]/30 transition-colors">
                        <p className="text-[10px] font-medium text-white/30 uppercase tracking-[0.2em] italic text-center px-4 leading-relaxed">Yield Collection Node <br/><span className="text-[#1D9E75] not-italic shadow-[0_0_10px_rgba(29,158,117,1)] py-0.5 px-2 bg-[#1D9E75]/20 rounded mt-2 inline-block">Awaiting Funds</span></p>
                     </div>
                  </div>
               </div>
            </div>
          </section>

          {/* Live Dashboard Preview & Benefits Matrix */}
          <section className="bg-[#0F172A] relative overflow-hidden py-32 px-4 md:px-8 mb-32 z-10 w-full">
             <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#D4AF37]/10 rounded-full blur-[120px] -mr-[400px] -mt-[400px] pointer-events-none"></div>
             <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#1D9E75]/10 rounded-full blur-[100px] -ml-[300px] -mb-[300px] pointer-events-none"></div>
             
             <div className="max-w-7xl mx-auto relative z-20">
                <div className="text-center mb-20">
                   <div className="inline-flex items-center gap-2 bg-[#D4AF37]/10 px-4 py-2 rounded-full mb-6 border border-[#D4AF37]/20">
                     <span className="text-[10px] sm:text-xs font-medium uppercase tracking-[0.2em] text-[#D4AF37]">Syntry Node Hub</span>
                   </div>
                   <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium mb-6 italic text-[#F8F1E3] tracking-tight">Your Asset. Your Rules.</h2>
                   <p className="text-lg md:text-xl text-[#A8E6CF] max-w-2xl mx-auto font-medium opacity-90 leading-relaxed">
                      Lock your land into our 8-Layer Statutory Protocol and control your wealth directly from your phone, 24/7.
                   </p>
                </div>

                {/* Dashboard Mockup Centerpiece */}
                <div className="max-w-4xl mx-auto bg-white/5 border border-white/10 rounded-[3rem] p-4 md:p-8 backdrop-blur-md mb-24 shadow-2xl relative group hover:border-white/20 transition-all duration-500">
                   <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 pointer-events-none rounded-[3rem]"></div>
                   <div className="bg-[#001500] border border-white/5 rounded-[2.5rem] p-8 md:p-12 overflow-hidden relative shadow-inner">
                      <div className="absolute top-0 right-0 w-64 h-64 bg-[#1D9E75]/10 rounded-full blur-[60px] -mr-20 -mt-20 group-hover:bg-[#1D9E75]/20 transition-all duration-700"></div>
                      
                      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12 relative z-10 border-b border-white/5 pb-8">
                         <div>
                            <p className="text-[10px] font-medium text-[#A8E6CF]/60 uppercase tracking-[0.2em] mb-2">Live Valuation (GH₵)</p>
                            <h3 className="text-4xl md:text-6xl font-medium text-white tracking-tight italic">4,250,000</h3>
                         </div>
                         <div className="flex gap-4">
                            <span className="bg-[#1D9E75]/10 border border-[#1D9E75]/30 text-[#1D9E75] px-5 py-2.5 rounded-full text-xs font-medium flex items-center gap-3 backdrop-blur-md">
                               <span className="w-2 h-2 bg-[#1D9E75] rounded-full animate-pulse shadow-[0_0_10px_#1D9E75]"></span>
                               Syntry Verified
                            </span>
                         </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 relative z-10">
                         <div className="bg-[#1D9E75]/10 border border-[#1D9E75]/20 p-6 rounded-2xl hover:bg-[#1D9E75]/15 transition-colors">
                            <p className="text-[10px] font-medium text-white/50 uppercase tracking-[0.2em] mb-3">Automated Rent Stream</p>
                            <div className="flex justify-between items-end">
                               <p className="text-3xl font-medium text-white tracking-tight">GH₵8,200</p>
                               <p className="text-[10px] font-medium tracking-tight text-white bg-[#1D9E75] px-3 py-1.5 rounded uppercase tracking-widest shadow-[0_0_10px_rgba(29,158,117,1)]">Paid Today</p>
                            </div>
                         </div>
                         <div className="bg-[#D4AF37]/10 border border-[#D4AF37]/20 p-6 rounded-2xl hover:bg-[#D4AF37]/15 transition-colors">
                            <p className="text-[10px] font-medium text-white/50 uppercase tracking-[0.2em] mb-3">8-Layer Audit Status</p>
                            <div className="flex justify-between items-end">
                               <p className="text-3xl font-medium text-white tracking-tight">100%</p>
                               <p className="text-[10px] font-medium tracking-tight text-[#0F172A] bg-[#D4AF37] px-3 py-1.5 rounded uppercase tracking-widest shadow-[0_0_10px_rgba(212,175,55,1)]">Secured</p>
                            </div>
                         </div>
                      </div>
                   </div>
                </div>

                {/* Unified Benefits Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-20">
                   {[
                      { title: "Immutable Digital Title", icon: "📜", desc: "Absolute certainty. Your digital deed is locked on our network, impossible to forge or double-sell." },
                      { title: "Auto Rent Collection", icon: "💸", desc: "No more chasing tenants. Yields automatically settle directly to your MTN MoMo or Vodafone Cash account." },
                      { title: "Real-Time Valuation Tracking", icon: "📈", desc: "Watch your property value grow over time, indexed rigorously against local market data." },
                      { title: "One-Click GRA Tax Reports", icon: "📊", desc: "Generate instant, fully-compliant financial statements to handle tax season effortlessly." },
                      { title: "Instant Marketplace Listing", icon: "🛒", desc: "Ready to sell? Push your verified property to thousands of global buyers with one tap." },
                      { title: "Family & Bank Sharing Portal", icon: "🔗", desc: "Share your sovereign proof with local banks for instant borrowing, or with family members abroad." }
                   ].map((item, i) => (
                      <div key={i} className="bg-white/5 border border-white/10 p-8 md:p-12 rounded-[3.5rem] hover:bg-[#1D9E75]/10 hover:border-[#1D9E75]/30 transition-all duration-500 group backdrop-blur-sm flex flex-col h-full shadow-2xl shadow-black/20">
                         <div className="w-16 h-16 bg-[#F8F1E3] text-[#0F172A] rounded-[1.5rem] flex items-center justify-center text-3xl mb-8 group-hover:scale-110 group-hover:rotate-3 transition-transform shadow-lg shadow-[#0F172A]/50">{item.icon}</div>
                         <h3 className="text-xl md:text-2xl font-medium text-[#F8F1E3] mb-4 leading-tight">{item.title}</h3>
                         <p className="text-sm text-[#A8E6CF] opacity-70 leading-relaxed mb-auto">{item.desc}</p>
                         <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between">
                            <span className="text-[10px] font-medium uppercase tracking-widest text-[#D4AF37]">Syntry Verified</span>
                            <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#1D9E75]/20 text-[#1D9E75] text-sm font-medium shadow-[0_0_10px_rgba(29,158,117,0.3)]">✓</span>
                         </div>
                      </div>
                   ))}
                </div>
             </div>
          </section>

          {/* Stories Upgrade */}
          <section className="px-4 md:px-8 max-w-7xl mx-auto mb-32 border-y border-[#0F172A]/5 py-24 relative">
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[800px] h-[300px] bg-[#D4AF37]/5 rounded-full blur-[100px] pointer-events-none z-0"></div>
             
             <h2 className="text-4xl md:text-5xl font-medium mb-20 text-center italic tracking-tight text-[#0F172A] relative z-10">Real Owners. Real Results.</h2>
             <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative z-10">
                {[
                  { n: "Kojo M.", p: "East Legon", q: "I used to check my land twice a week just to be sure. Now I check the app once a month just to see my rent hit my MoMo wallet.", i: "👨🏾‍💼" },
                  { n: "Ama S.", p: "Kumasi", q: "Sharing my digital title with the bank was seamless. Syntry's 8 layers of ground truth solved our family boundary dispute instantly.", i: "👩🏾‍💼" },
                  { n: "David T.", p: "Spintex", q: "Verified my plot for free and now I track its value growth every month. Finally, total control of my family legacy.", i: "👨🏾‍💻" }
                ].map((s, i) => (
                  <div key={i} className="flex flex-col text-center bg-white p-10 md:p-12 rounded-[3.5rem] border border-[#0F172A]/10 shadow-[0_30px_60px_-15px_rgba(0,51,0,0.05)] hover:-translate-y-3 transition-transform duration-500 relative flex-grow h-full">
                     <div className="absolute top-10 left-10 text-8xl opacity-5 font-serif leading-none text-[#0F172A]">"</div>
                     <div className="w-20 h-20 bg-[#0F172A] text-[#D4AF37] rounded-[2rem] mx-auto flex items-center justify-center text-4xl mb-8 shadow-xl shadow-[#0F172A]/20 border-[4px] border-[#F8F1E3] relative z-10">{s.i}</div>
                     <p className="text-xl md:text-2xl font-medium italic opacity-90 mb-12 leading-relaxed text-[#0F172A] flex-grow relative z-10">"{s.q}"</p>
                     <div className="pt-8 border-t border-[#0F172A]/10 mt-auto">
                        <h4 className="font-medium tracking-tight text-[#0F172A] text-3xl tracking-tight mb-3">{s.n}</h4>
                        <span className="inline-flex items-center gap-2 bg-[#F8F1E3] px-4 py-2 rounded-full border border-[#0F172A]/5 text-[10px] font-medium uppercase tracking-widest text-[#1D9E75]">
                           <span className="w-1.5 h-1.5 bg-[#1D9E75] rounded-full"></span> 📍 {s.p}
                        </span>
                     </div>
                  </div>
                ))}
             </div>
          </section>

          {/* Re-engineered How It Works / Verification Flow */}
          <section className="px-4 md:px-8 max-w-7xl mx-auto mb-40">
             <div className="text-center mb-20 max-w-3xl mx-auto">
                <h2 className="text-4xl md:text-5xl font-medium mb-6 italic tracking-tight text-[#0F172A]">How Verification Works</h2>
                <p className="text-lg md:text-xl opacity-70 font-medium leading-relaxed">A simple, transparent process designed to take the guesswork out of property ownership. We handle the bureaucracy, you get the security.</p>
             </div>
             
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
                {[
                  { s: "01", t: "Submit Details", d: "Share your GPS coordinates or Title Number—no physical papers needed yet.", b: "100% Digital Intake", i: "📍" },
                  { s: "02", t: "8-Layer Audit", d: "Our team runs the rigorous Grounded Truth protocol against local registries.", b: "Zero Effort Required", i: "🔍" },
                  { s: "03", t: "Statutory Approval", d: "We secure direct validation and certification from the Lands Commission.", b: "Legally Binding", i: "🏛️" },
                  { s: "04", t: "Go Live & Earn", d: "Your property hitting the global Marketplace, ready to generate instant yield.", b: "Global Reach", i: "🚀" }
                ].map((step, i) => (
                  <div key={i} className="bg-white p-8 md:p-10 rounded-[2.5rem] border border-[#0F172A]/10 shadow-[0_20px_40px_-20px_rgba(0,51,0,0.05)] hover:-translate-y-2 transition-transform duration-500 group relative flex flex-col h-full overflow-hidden">
                     <div className="absolute top-0 left-0 w-full h-1.5 bg-[#D4AF37] transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500 z-10"></div>
                     <div className="text-7xl text-[#0F172A]/5 font-medium tracking-tight absolute -top-4 -right-4 pointer-events-none group-hover:text-[#1D9E75]/10 transition-colors duration-500">{step.s}</div>
                     
                     <div className="w-14 h-14 bg-[#F8F1E3] text-[#0F172A] rounded-2xl flex items-center justify-center text-2xl mb-6 shadow-sm group-hover:bg-[#1D9E75] group-hover:text-white transition-colors duration-300 relative z-10">{step.i}</div>
                     
                     <h4 className="font-medium text-xl md:text-2xl mb-3 tracking-tight leading-tight text-[#0F172A] relative z-10">{step.t}</h4>
                     <p className="text-sm opacity-70 leading-relaxed font-medium mb-auto text-[#0F172A] relative z-10">{step.d}</p>
                     
                     <div className="mt-8 pt-5 border-t border-[#0F172A]/10 relative z-10">
                        <span className="text-[10px] font-medium uppercase tracking-widest text-[#1D9E75]">{step.b}</span>
                     </div>
                  </div>
                ))}
             </div>
             
             <div className="text-center">
                <a href="/check-my-property" className="inline-flex items-center justify-center gap-3 bg-[#0F172A] text-[#D4AF37] px-10 py-5 rounded-[2rem] font-medium text-lg hover:bg-[#002200] hover:scale-105 transition-all shadow-xl group">
                   Start Verification Process <span className="group-hover:translate-x-1 transition-transform">→</span>
                </a>
             </div>
          </section>

          {/* Final Lead Capture Engine */}
          <section className="px-4 md:px-8 max-w-5xl mx-auto mb-32">
             <div className="bg-[#D4AF37] text-[#0F172A] p-8 md:p-16 rounded-[4rem] text-center shadow-[0_40px_80px_-20px_rgba(0,51,0,0.2)] relative overflow-hidden border-[8px] md:border-[16px] border-[#F8F1E3]">
                <div className="absolute inset-0 bg-white/10 opacity-50 pointer-events-none"></div>
                
                <div className="relative z-10 max-w-3xl mx-auto mb-10 pt-4">
                   <h2 className="text-4xl md:text-6xl font-medium mb-6 italic tracking-tight leading-none text-[#0F172A]">Ready to Secure and <br className="hidden md:block"/> Monetize Your Land?</h2>
                   <p className="text-xl md:text-2xl opacity-80 font-medium italic">Stop the uncertainty. Verify your land for free today.</p>
                   
                   <div className="bg-[#F8F1E3] p-8 md:p-12 rounded-[3.5rem] shadow-2xl text-left border-[8px] border-white mt-12 relative">
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-1 bg-[#1D9E75] rounded-b-full"></div>
                      <div className="text-center mb-8 pt-2">
                         <div className="inline-flex items-center gap-2 bg-[#1D9E75]/10 px-4 py-2 rounded-full mb-4">
                           <span className="w-2 h-2 bg-[#1D9E75] rounded-full animate-pulse shadow-[0_0_8px_#1D9E75]"></span>
                           <span className="text-[10px] font-medium uppercase tracking-widest text-[#1D9E75]">Priority Audit Line</span>
                         </div>
                         <h3 className="text-3xl font-medium tracking-tight text-[#0F172A] tracking-tight">Get Started in 60 Seconds</h3>
                      </div>
                      
                      <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); alert('Submission sent securely to Syntry.'); }}>
                         <div>
                            <label className="block text-[10px] font-medium uppercase tracking-widest text-[#0F172A]/70 mb-2 pl-3">Full Name</label>
                            <input type="text" required placeholder="Kwame Osei" className="w-full bg-white border border-[#0F172A]/10 rounded-2xl px-6 py-5 focus:outline-none focus:border-[#1D9E75] focus:ring-2 focus:ring-[#1D9E75]/30 transition-all font-medium text-sm shadow-sm" />
                         </div>
                         <div>
                            <label className="block text-[10px] font-medium uppercase tracking-widest text-[#0F172A]/70 mb-2 pl-3">WhatsApp / Phone Number</label>
                            <input type="tel" required placeholder="055 123 4567" className="w-full bg-white border border-[#0F172A]/10 rounded-2xl px-6 py-5 focus:outline-none focus:border-[#1D9E75] focus:ring-2 focus:ring-[#1D9E75]/30 transition-all font-medium text-sm shadow-sm" />
                         </div>
                         <div>
                            <label className="block text-[10px] font-medium uppercase tracking-widest text-[#0F172A]/70 mb-2 pl-3">Property Location or Title Number</label>
                            <input type="text" placeholder="e.g. East Legon or Title #GA-1234" className="w-full bg-white border border-[#0F172A]/10 rounded-2xl px-6 py-5 focus:outline-none focus:border-[#1D9E75] focus:ring-2 focus:ring-[#1D9E75]/30 transition-all font-medium text-sm shadow-sm" />
                         </div>
                         
                         <button type="submit" className="w-full bg-[#1D9E75] text-white px-8 py-7 rounded-[2rem] font-medium tracking-tight text-[16px] md:text-xl hover:bg-[#157a5a] transition-all shadow-[0_20px_40px_-10px_rgba(29,158,117,0.4)] mt-8 flex gap-2 items-center justify-center group leading-tight text-center">
                            Verify My Property Free <br className="md:hidden" /> <span className="hidden md:inline">+</span> Get Marketplace Listing Ready
                            <span className="group-hover:translate-x-1 transition-transform ml-2">→</span>
                         </button>
                      </form>
                   </div>
                </div>

                {/* Final Exit CTAs */}
                <div className="pt-8 flex flex-col sm:flex-row gap-4 justify-center items-center relative z-10 w-full max-w-2xl mx-auto mt-6">
                   <a href="/marketplace" className="w-full sm:w-auto bg-[#0F172A] text-white px-10 py-5 rounded-[1.5rem] font-medium text-sm hover:scale-105 transition-all shadow-xl text-center">
                      List Property Now
                   </a>
                   <span className="text-[#0F172A]/40 font-medium italic hidden sm:block">or</span>
                   <a href="https://wa.me/233531102292" className="w-full sm:w-auto bg-transparent border-2 border-[#0F172A] text-[#0F172A] px-10 py-5 rounded-[1.5rem] font-medium text-sm hover:bg-[#0F172A] hover:text-[#D4AF37] transition-all text-center">
                      Talk to Owner Support – 053 110 2292
                   </a>
                </div>
             </div>
          </section>
        </main>

        <GlobalFooter />
        
        {/* Floating Local Support Widget */}
        <a 
          href="https://wa.me/233531102292" 
          className="fixed bottom-10 right-10 z-[3000] bg-[#25D366] text-white p-4 md:p-5 rounded-full shadow-[0_20px_50px_rgba(37,211,102,0.4)] hover:scale-110 transition-all group flex items-center gap-3 border border-white/20 hover:animate-pulse"
          title="Contact Syntry Owners Support"
        >
          <span className="text-3xl group-hover:rotate-12 transition-transform">💬</span>
          <span className="text-xs font-medium uppercase tracking-widest hidden md:flex items-center gap-2">
            <span>053 110 2292</span>
            <span className="w-1.5 h-1.5 bg-white rounded-full animate-ping ml-1"></span>
          </span>
        </a>
      </div>
    </Suspense>
  );
};

export default OwnersPage;
