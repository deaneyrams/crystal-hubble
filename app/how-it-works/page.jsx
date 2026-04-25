'use client';
import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
const GlobalHeader = dynamic(() => import('../../components/GlobalHeader'), { ssr: false });
const GlobalFooter = dynamic(() => import('../../components/GlobalFooter'), { ssr: false });
import SupportFab from '../../components/SupportFab';

export default function ProtocolPage() {
  const cursorRef = useRef(null);
  const ringRef = useRef(null);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  useEffect(() => {
    const moveCursor = (e) => {
      if (cursorRef.current && ringRef.current) {
        cursorRef.current.style.left = `${e.clientX}px`;
        cursorRef.current.style.top = `${e.clientY}px`;
        ringRef.current.style.left = `${e.clientX}px`;
        ringRef.current.style.top = `${e.clientY}px`;
      }
    };
    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, []);

  const steps = [
    {
      title: "GPS Lock",
      desc: "High-precision satellite geofencing binds your asset to exact physical coordinates.",
      benefit: "Absolute certainty of location and boundaries.",
      icon: "🛰️"
    },
    {
      title: "Title Verification",
      desc: "Full legal ownership and deed authentication.",
      benefit: "Guarantees authentic statutory ownership.",
      icon: "📜"
    },
    {
      title: "Litigation Screening",
      desc: "Comprehensive court and dispute database check (0.00% active litigation).",
      benefit: "Eliminates the risk of historical land disputes.",
      icon: "⚖️"
    },
    {
      title: "Ministerial Node 08 Audit",
      desc: "Direct synchronization with Lands Commission records.",
      benefit: "Statutory finality recognized by the state.",
      icon: "🏛️"
    },
    {
      title: "Boundary & Survey Confirmation",
      desc: "Professional survey and physical verification.",
      benefit: "Prevents neighbor encroachment and overlap.",
      icon: "📐"
    },
    {
      title: "Valuation & Market Readiness",
      desc: "Real-time independent valuation and liquidity scoring.",
      benefit: "Immediate access to mortgage enablement.",
      icon: "💎"
    },
    {
      title: "Tax & Compliance Clearance",
      desc: "Ghana Revenue Authority tax-ready certification.",
      benefit: "Seamless and immediate asset transferability.",
      icon: "✅"
    },
    {
      title: "Exchange Node Activation",
      desc: "Sovereign ledger activation for instant trading and fractional ownership.",
      benefit: "Unlocks global liquidity and trading capability.",
      icon: "🌐"
    }
  ];

  return (
    <div className="min-h-screen bg-[#F8F1E3] text-[#003300] selection:bg-[#D4AF37] selection:text-[#003300] font-sans pb-32 overflow-x-hidden relative">
      <GlobalHeader />
      {/* Custom Cursor */}
       <div ref={cursorRef} className="hidden md:block fixed w-2.5 h-2.5 bg-[#D4AF37] rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 transition-transform duration-150 ease-out" />
      <div ref={ringRef} className="hidden md:block fixed w-9 h-9 border border-[#D4AF37]/40 rounded-full pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 transition-all duration-75 linear" />

      {/* Hero Section */}
      <section className="relative pt-40 pb-20 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto w-full relative z-10 text-center">
          <div 
            className="inline-flex items-center gap-4 bg-[#D4AF37]/10 border border-[#D4AF37]/20 px-6 py-2 rounded-full text-[10px] font-bold text-[#D4AF37] uppercase tracking-[4px] mb-8 shadow-sm"
          >
            Institutional Protocol v3.1
          </div>
          
          <h1 className="font-head text-[4rem] md:text-[6rem] lg:text-[8rem] leading-[0.88] tracking-tighter uppercase mb-6 italic">
            The Sovereign <br /> <span className="text-[#D4AF37]">Standards.</span>
          </h1>
          <p className="text-xl md:text-2xl opacity-80 max-w-2xl mx-auto font-medium leading-relaxed mb-12">
            We replace uncertainty with statutory finality. Explore the 8 verification layers that secure every coordinate in the exchange.
          </p>
        </div>
      </section>

      {/* 8 Layers Grid Layout */}
      <section className="max-w-7xl mx-auto px-6 relative mt-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, i) => (
            <div 
              key={i}
              className="bg-white border border-[#003300]/10 rounded-[2.5rem] p-8 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all group overflow-hidden relative flex flex-col h-full"
            >
              <div className="absolute -right-6 -top-6 text-9xl opacity-5 font-black italic">{i + 1}</div>
              
              <div className="w-16 h-16 bg-[#003300]/5 text-4xl flex items-center justify-center rounded-2xl mb-8 group-hover:scale-110 transition-transform">
                {step.icon}
              </div>
              
              <div className="self-start inline-block bg-[#003300] text-[#D4AF37] px-3 py-1 rounded-md text-[10px] font-bold uppercase tracking-widest mb-4 shadow-sm">
                Layer 0{i + 1}
              </div>
              
              <h3 className="text-xl font-bold text-[#003300] mb-4 tracking-tight leading-tight group-hover:text-[#D4AF37] transition-colors">{step.title}</h3>
              
              <p className="text-[#003300]/70 font-medium leading-relaxed mb-8 flex-grow">{step.desc}</p>
              
              <div className="mt-auto pt-6 border-t border-[#003300]/10">
                <p className="text-[11px] font-bold uppercase tracking-widest text-[#D4AF37] mb-1">Investor Benefit</p>
                <p className="text-sm font-semibold text-[#003300] leading-snug">{step.benefit}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Real Success Stories */}
      <section className="max-w-7xl mx-auto px-6 mt-40 relative">
         <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-bold mb-6 text-[#003300] italic tracking-tight">Real Success Stories</h2>
            <p className="text-xl md:text-2xl opacity-80 max-w-2xl mx-auto font-medium text-[#003300]">Real Ghanaians & Diaspora investors who now own with confidence.</p>
         </div>

         <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Case Study 1 */}
            <div className="bg-white rounded-[2.5rem] p-10 shadow-xl border border-[#003300]/10 flex flex-col group hover:-translate-y-2 transition-transform duration-300">
               <div className="flex items-center gap-4 mb-8">
                  <div className="w-16 h-16 bg-[#003300]/5 rounded-full overflow-hidden flex items-center justify-center text-3xl shrink-0 group-hover:bg-[#1D9E75]/10 transition-colors">👩🏾‍💼</div>
                  <div>
                     <h4 className="font-bold text-xl text-[#003300]">Akosua Mensah</h4>
                     <p className="text-xs font-bold uppercase tracking-widest text-[#D4AF37]">Accra, Ghana</p>
                  </div>
               </div>
               <div className="inline-flex max-w-max items-center gap-2 bg-[#A8E6CF]/30 text-[#003300] px-3 py-1.5 rounded-md text-[9px] font-black uppercase tracking-widest mb-6">
                  <span className="w-2 h-2 bg-[#1D9E75] rounded-full"></span> 8 Layers Verified
               </div>
               <p className="text-[#003300]/80 leading-relaxed mb-6 flex-grow font-medium">Used the 8 Layers to turn a disputed East Legon plot into bank-approved collateral. Received mortgage approval instantly.</p>
               <blockquote className="text-xl font-bold italic text-[#003300] mb-8 border-l-4 border-[#1D9E75] pl-4">“Zero litigation risk — bank approved same day.”</blockquote>
               
               <div className="grid grid-cols-3 gap-2 border-t border-[#003300]/10 pt-6">
                  <div className="text-center">
                     <p className="text-[10px] uppercase font-bold text-[#D4AF37] mb-1">Time</p>
                     <p className="font-bold text-[#1D9E75]">14 Days</p>
                  </div>
                  <div className="text-center border-x border-[#003300]/5">
                     <p className="text-[10px] uppercase font-bold text-[#D4AF37] mb-1">Approved</p>
                     <p className="font-bold text-[#1D9E75]">GH₵1.8M</p>
                  </div>
                  <div className="text-center">
                     <p className="text-[10px] uppercase font-bold text-[#D4AF37] mb-1">Risk</p>
                     <p className="font-bold text-[#1D9E75]">0.00%</p>
                  </div>
               </div>
            </div>

            {/* Case Study 2 */}
            <div className="bg-[#003300] rounded-[2.5rem] p-10 shadow-2xl border border-[#D4AF37]/20 flex flex-col group hover:-translate-y-2 transition-transform duration-300 relative overflow-hidden">
               <div className="absolute top-0 right-0 w-40 h-40 bg-[#D4AF37]/5 rounded-full blur-2xl pointer-events-none"></div>
               <div className="flex items-center gap-4 mb-8 relative z-10">
                  <div className="w-16 h-16 bg-white/10 rounded-full overflow-hidden flex items-center justify-center text-3xl shrink-0 group-hover:bg-[#1D9E75]/20 transition-colors">👨🏾‍💻</div>
                  <div>
                     <h4 className="font-bold text-xl text-white">Kofi Osei</h4>
                     <p className="text-xs font-bold uppercase tracking-widest text-[#D4AF37]">London, UK</p>
                  </div>
               </div>
               <div className="inline-flex max-w-max items-center gap-2 bg-[#D4AF37]/20 text-[#D4AF37] px-3 py-1.5 rounded-md text-[9px] font-black uppercase tracking-widest mb-6 relative z-10">
                  <span className="w-2 h-2 bg-[#D4AF37] rounded-full animate-pulse"></span> Fractional Owner
               </div>
               <p className="text-white/80 leading-relaxed mb-6 flex-grow font-medium relative z-10">Bought a fractional share in a Spintex rental property remotely. First automated rent payment hit his account weeks later.</p>
               <blockquote className="text-xl font-bold italic text-white mb-8 border-l-4 border-[#D4AF37] pl-4 relative z-10">“I finally own Ghana property with total confidence from the UK.”</blockquote>
               
               <div className="grid grid-cols-3 gap-2 border-t border-white/10 pt-6 relative z-10">
                  <div className="text-center">
                     <p className="text-[10px] uppercase font-bold text-white/50 mb-1">Rent</p>
                     <p className="font-bold text-[#A8E6CF]">GH₵4.2k</p>
                  </div>
                  <div className="text-center border-x border-white/10">
                     <p className="text-[10px] uppercase font-bold text-white/50 mb-1">Yield</p>
                     <p className="font-bold text-[#A8E6CF]">3.8% APY</p>
                  </div>
                  <div className="text-center">
                     <p className="text-[10px] uppercase font-bold text-white/50 mb-1">System</p>
                     <p className="font-bold text-[#A8E6CF]">Automated</p>
                  </div>
               </div>
            </div>

            {/* Case Study 3 */}
            <div className="bg-white rounded-[2.5rem] p-10 shadow-xl border border-[#003300]/10 flex flex-col group hover:-translate-y-2 transition-transform duration-300">
               <div className="flex items-center gap-4 mb-8">
                  <div className="w-16 h-16 bg-[#003300]/5 rounded-full overflow-hidden flex items-center justify-center text-3xl shrink-0 group-hover:bg-[#1D9E75]/10 transition-colors">👷🏾‍♂️</div>
                  <div>
                     <h4 className="font-bold text-xl text-[#003300]">Daniel Quartey</h4>
                     <p className="text-xs font-bold uppercase tracking-widest text-[#D4AF37]">Kumasi Developer</p>
                  </div>
               </div>
               <div className="inline-flex max-w-max items-center gap-2 bg-[#A8E6CF]/30 text-[#003300] px-3 py-1.5 rounded-md text-[9px] font-black uppercase tracking-widest mb-6">
                  <span className="w-2 h-2 bg-[#1D9E75] rounded-full"></span> Exchange Node
               </div>
               <p className="text-[#003300]/80 leading-relaxed mb-6 flex-grow font-medium">Listed a 2-acre commercial plot on the Sovereign Registry. Sold 40% fractional shares directly to global investors.</p>
               <blockquote className="text-xl font-bold italic text-[#003300] mb-8 border-l-4 border-[#1D9E75] pl-4">“Sold faster than any traditional broker — all buyers trusted the 8 Layers.”</blockquote>
               
               <div className="grid grid-cols-3 gap-2 border-t border-[#003300]/10 pt-6">
                  <div className="text-center">
                     <p className="text-[10px] uppercase font-bold text-[#D4AF37] mb-1">Time</p>
                     <p className="font-bold text-[#1D9E75]">9 Days</p>
                  </div>
                  <div className="text-center border-x border-[#003300]/5">
                     <p className="text-[10px] uppercase font-bold text-[#D4AF37] mb-1">Raised</p>
                     <p className="font-bold text-[#1D9E75]">GH₵2.4M</p>
                  </div>
                  <div className="text-center">
                     <p className="text-[10px] uppercase font-bold text-[#D4AF37] mb-1">Disputes</p>
                     <p className="font-bold text-[#1D9E75]">Zero</p>
                  </div>
               </div>
            </div>
         </div>

         <div className="text-center mt-20 flex flex-col sm:flex-row justify-center gap-6">
            <a href="https://wa.me/233531102292?text=I%20have%20a%20success%20story%20to%20share" className="bg-[#D4AF37] text-[#003300] px-10 py-5 rounded-2xl font-bold text-sm uppercase tracking-widest hover:scale-105 transition-all text-center w-full sm:w-auto shadow-xl">
               Share Your Own Syntry Story
            </a>
            <a href="/marketplace" className="bg-white border border-[#003300]/10 text-[#003300] px-10 py-5 rounded-2xl font-bold text-sm uppercase tracking-widest hover:bg-[#003300] hover:text-[#F8F1E3] transition-all text-center w-full sm:w-auto shadow-sm">
               Browse All Verified Properties
            </a>
         </div>
      </section>

      {/* Closing CTA & Lead Capture */}
      <section className="max-w-4xl mx-auto px-6 mt-32 relative text-center">
        <h2 className="text-3xl md:text-5xl font-bold mb-6 text-[#003300] italic tracking-tight">Ready to own property with total confidence?</h2>
        <p className="text-lg text-[#003300]/70 mb-12 max-w-2xl mx-auto">Verify your property's statutory status against the 8 Layers of Grounded Truth and unlock institutional capital.</p>

        <div className="bg-white rounded-[3rem] p-10 md:p-16 shadow-2xl border border-[#003300]/10 text-left relative overflow-hidden mb-16 max-w-2xl mx-auto">
           <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4AF37]/5 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none"></div>
           
           <h3 className="text-2xl font-bold mb-8 text-[#003300] italic">Get Your Free 8-Layer Property Verification</h3>
           
           {formSubmitted ? (
             <div className="bg-[#1D9E75]/10 border border-[#1D9E75]/30 text-[#003300] p-8 rounded-3xl text-center">
                <div className="w-16 h-16 bg-[#1D9E75] text-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg text-3xl">✓</div>
                <h4 className="text-xl font-bold mb-2">Request Received</h4>
                <p className="text-sm opacity-80">Our protocol team will review your asset details and contact you within 24 hours.</p>
             </div>
           ) : (
             <form onSubmit={handleFormSubmit} className="space-y-6 relative z-10 text-[#003300]">
                <div className="space-y-2">
                   <label className="text-xs font-bold uppercase tracking-widest text-[#003300]/60 pl-4">Full Name</label>
                   <input type="text" required className="w-full bg-[#F8F1E3]/50 border border-[#003300]/10 rounded-2xl px-6 py-4 font-medium focus:outline-none focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 transition-all placeholder:text-[#003300]/30" placeholder="e.g. Kwame Mensah" />
                </div>
                
                <div className="space-y-2">
                   <label className="text-xs font-bold uppercase tracking-widest text-[#003300]/60 pl-4">WhatsApp / Phone Number</label>
                   <input type="tel" required className="w-full bg-[#F8F1E3]/50 border border-[#003300]/10 rounded-2xl px-6 py-4 font-medium focus:outline-none focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 transition-all placeholder:text-[#003300]/30" placeholder="e.g. +233 53 110 2292" />
                </div>
                
                <div className="space-y-2">
                   <label className="text-xs font-bold uppercase tracking-widest text-[#003300]/60 pl-4">Property Location or Title Number</label>
                   <input type="text" required className="w-full bg-[#F8F1E3]/50 border border-[#003300]/10 rounded-2xl px-6 py-4 font-medium focus:outline-none focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 transition-all placeholder:text-[#003300]/30" placeholder="e.g. East Legon Ext. Plot 42" />
                </div>
                
                <button type="submit" className="w-full bg-[#1D9E75] text-white px-8 py-5 rounded-2xl font-bold text-lg hover:scale-[1.02] hover:shadow-xl hover:shadow-[#1D9E75]/20 transition-all mt-4 flex items-center justify-center gap-3">
                   <span>Submit for Free Verification Report</span>
                </button>
                
                <p className="text-center text-[10px] uppercase tracking-widest text-[#003300]/40 font-bold mt-4 flex items-center justify-center gap-2">
                  <span className="text-sm">🔒</span> Your data is secure and used only for your report
                </p>
             </form>
           )}
        </div>

        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <a href="/check-my-property" className="bg-[#003300] text-[#F8F1E3] px-10 py-5 rounded-2xl font-bold text-sm uppercase tracking-widest hover:scale-105 transition-all text-center w-full sm:w-auto shadow-xl hover:shadow-[#003300]/30">
              Start Verification Now
            </a>
            <a href="https://wa.me/233531102292" className="bg-white border border-[#003300]/10 text-[#003300] px-10 py-5 rounded-2xl font-bold text-sm uppercase tracking-widest hover:bg-[#D4AF37] hover:text-[#003300] transition-all text-center w-full sm:w-auto shadow-sm flex items-center justify-center gap-3">
              <span className="text-lg">💬</span>
              Talk to Mortgage Team
            </a>
        </div>
      </section>

      {/* Floating WhatsApp Button */}
      <a 
        href="https://wa.me/233531102292" 
        className="fixed bottom-10 right-10 z-[3000] bg-[#25D366] text-white p-5 rounded-full shadow-[0_20px_50px_rgba(37,211,102,0.4)] hover:scale-110 transition-all animate-bounce"
        title="Chat with Protocol Team"
      >
        <div className="flex items-center gap-3">
          <span className="text-3xl">💬</span>
          <span className="text-xs font-bold uppercase tracking-widest hidden md:block">053 110 2292</span>
        </div>
      </a>

      <style jsx global>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
      `}</style>
      <GlobalFooter />
    </div>
  );
}
