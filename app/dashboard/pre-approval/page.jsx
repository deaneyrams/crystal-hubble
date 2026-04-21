'use client';
import React, { useState } from 'react';
import GlobalHeader from '@/components/GlobalHeader';
import GlobalFooter from '@/components/GlobalFooter';

const PreApprovalPage = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const handleFormSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  return (
    <div className="bg-[#F8F1E3] min-h-screen text-[#003300] font-sans">
      <GlobalHeader />

      <main className="pt-32 pb-20 px-4 md:px-8 max-w-5xl mx-auto">
        {/* Ceremonial Hero Section */}
        <section className="bg-white rounded-[2.5rem] p-10 md:p-14 shadow-2xl border border-[#003300]/10 relative overflow-hidden mb-16 text-center isolate">
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#1D9E75]/5 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none -z-10"></div>
            
            <div className="absolute -top-4 -left-8 -rotate-12 opacity-5 pointer-events-none -z-10">
                <div className="border-[12px] border-[#1D9E75] text-[#1D9E75] text-[120px] font-black uppercase inline-block p-6 leading-none tracking-tighter">PRE-APPROVED</div>
            </div>

            <div className="inline-flex items-center gap-2 bg-[#1D9E75]/10 border border-[#1D9E75]/30 text-[#003300] px-5 py-2 rounded-full text-xs font-bold uppercase tracking-widest mb-8">
                <span className="w-2.5 h-2.5 bg-[#1D9E75] rounded-full shadow-[0_0_10px_rgba(29,158,117,1)] animate-pulse"></span> 8-Layer Verified • Pre-Approved
            </div>

            <h1 className="text-4xl md:text-6xl font-bold text-[#003300] mb-4 tracking-tight leading-tight">Congratulations, Kwame Anokye! <span className="inline-block animate-bounce">🎉</span></h1>
            
            <h2 className="text-lg md:text-xl text-[#D4AF37] font-bold mb-8 uppercase tracking-[0.2em]">You are Pre-Approved for a Mortgage Facility</h2>
            
            <p className="text-lg md:text-xl text-[#003300]/80 max-w-3xl mx-auto font-medium leading-relaxed">
               Following your comprehensive 8-Layer verification audit, Syntry Mortgage Enablement Division has pre-approved you for <span className="font-bold text-[#1D9E75] bg-[#1D9E75]/10 px-2 py-0.5 rounded-lg">GH₵1,250,000</span>.
            </p>
        </section>

        {/* Interactive Dashboard Widgets */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
           {/* Facility Summary Cards */}
           <div className="lg:col-span-2 space-y-8">
              <h3 className="text-2xl font-bold text-[#003300] italic">Facility Summary</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 
                 <div className="bg-white p-6 rounded-[2rem] border border-[#003300]/10 shadow-lg flex items-center justify-between group hover:border-[#1D9E75] transition-colors duration-300">
                    <div>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-[#003300]/50 mb-1">Approved Amount</p>
                        <p className="text-3xl font-bold text-[#1D9E75] tracking-tight">GH₵1,250,000</p>
                    </div>
                    <div className="w-12 h-12 bg-[#1D9E75]/10 rounded-full flex items-center justify-center text-xl group-hover:scale-110 transition-transform duration-300 shrink-0">💰</div>
                 </div>

                 <div className="bg-white p-6 rounded-[2rem] border border-[#003300]/10 shadow-lg flex items-center justify-between group hover:border-[#D4AF37] transition-colors duration-300">
                    <div>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-[#003300]/50 mb-1">Estimated Rate</p>
                        <p className="text-2xl font-bold text-[#D4AF37]">14.5% Fixed</p>
                    </div>
                    <div className="w-12 h-12 bg-[#D4AF37]/10 rounded-full flex items-center justify-center text-xl group-hover:scale-110 transition-transform duration-300 shrink-0">📈</div>
                 </div>

                 <div className="bg-white p-6 rounded-[2rem] border border-[#003300]/10 shadow-lg flex items-center justify-between group hover:border-[#003300] transition-colors duration-300">
                    <div>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-[#003300]/50 mb-1">Tenure</p>
                        <p className="text-2xl font-bold text-[#003300]">20 Years</p>
                    </div>
                    <div className="w-12 h-12 bg-[#003300]/5 rounded-full flex items-center justify-center text-xl group-hover:scale-110 transition-transform duration-300 shrink-0">⏳</div>
                 </div>

                 <div className="bg-white p-6 rounded-[2rem] border border-[#003300]/10 shadow-lg flex items-center justify-between group hover:border-[#1D9E75] transition-colors duration-300">
                    <div>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-[#003300]/50 mb-1">Validity & DTI</p>
                        <p className="text-lg font-bold text-[#003300]">90 Days <span className="opacity-40 font-normal mx-1">|</span> 32% DTI</p>
                    </div>
                    <div className="w-12 h-12 bg-[#1D9E75]/10 rounded-full flex items-center justify-center text-xl group-hover:scale-110 transition-transform duration-300 shrink-0">✅</div>
                 </div>

              </div>
           </div>

           {/* 8-Layer Verification Audit Sidebar */}
           <div className="lg:col-span-1 bg-[#003300] rounded-[2.5rem] p-8 text-white shadow-2xl border border-[#D4AF37]/20 relative overflow-hidden flex flex-col hover:-translate-y-1 transition-transform duration-300">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4AF37]/10 rounded-full blur-2xl pointer-events-none"></div>
              <h3 className="text-xl font-bold mb-6 italic relative z-10 text-[#D4AF37]">Your 8-Layer Verification Audit</h3>
              
              <ul className="space-y-4 relative z-10 flex-grow">
                 {[
                   "GPS Lock",
                   "Title Verification",
                   "Litigation Screening",
                   "Ministerial Node 08",
                   "Boundary & Survey",
                   "Valuation & Market",
                   "Tax & Compliance",
                   "Exchange Node"
                 ].map((layer, idx) => (
                    <li key={idx} className="flex items-center justify-between border-b border-white/5 pb-3">
                       <span className="text-sm font-medium opacity-90">{idx + 1}. {layer}</span>
                       <span className="bg-[#1D9E75]/20 text-[#1D9E75] text-[9px] font-bold uppercase px-2 py-1 rounded border border-[#1D9E75]/30 tracking-widest flex items-center gap-1 shadow-[0_0_8px_rgba(29,158,117,0.2)]"><span className="text-xs">✓</span> PASSED</span>
                    </li>
                 ))}
              </ul>

              <div className="mt-6 pt-4 border-t border-white/10 relative z-10">
                 <p className="text-[10px] text-[#A8E6CF] leading-relaxed font-medium">This serves as your Financial Passport for the Syntry Sovereign Exchange.</p>
              </div>
           </div>
        </div>

        {/* PDF-Style Letter Container */}
        <div className="bg-white p-8 md:p-20 rounded-sm shadow-2xl border border-[#003300]/5 max-w-3xl mx-auto relative overflow-hidden">
          {/* Gold Embossed Seal Placeholder */}
          <div className="absolute top-12 right-12 w-24 h-24 border-4 border-[#D4AF37]/30 rounded-full flex items-center justify-center rotate-12 opacity-50">
            <div className="text-center">
              <p className="text-[8px] font-bold text-[#D4AF37] uppercase leading-none">Syntry</p>
              <p className="text-[10px] font-bold text-[#D4AF37] uppercase leading-none mt-1">Verified</p>
              <div className="w-8 h-0.5 bg-[#D4AF37] mx-auto mt-1"></div>
              <p className="text-[6px] font-bold text-[#D4AF37] opacity-60 mt-1 uppercase">Sovereign 2026</p>
            </div>
          </div>

          {/* Letter Header */}
          <div className="flex justify-between items-start mb-20 border-b-2 border-[#003300] pb-8">
            <div>
              <div className="flex items-center gap-0 mb-2">
                <span className="font-head text-3xl tracking-tighter uppercase text-[#1D9E75]">SYN</span>
                <span className="font-head text-3xl tracking-tighter uppercase text-[#003300]">TRY</span>
              </div>
              <p className="text-[10px] font-bold uppercase tracking-widest opacity-60">Mortgage Enablement Division</p>
            </div>
            <div className="text-right">
              <h1 className="text-2xl font-bold uppercase tracking-tight text-[#003300]">Pre-Approval Letter</h1>
              <p className="text-xs opacity-60">ID: SYN-MTG-882-CASA</p>
            </div>
          </div>

          {/* Letter Content */}
          <div className="space-y-8 text-sm leading-relaxed mb-20">
            <div className="space-y-1">
              <p className="font-bold">Date: October 24, 2023</p>
              <p className="font-bold">Attn: Kwame Anokye</p>
              <p>Accra, Greater Accra Region, Ghana</p>
            </div>

            <p>Dear Mr. Anokye,</p>

            <p>
              We are pleased to inform you that following a comprehensive 8-Layer verification audit of your credentials and financial history, you have been **Pre-Approved** for a mortgage facility through the Syntry Sovereign Exchange.
            </p>

            <div className="bg-[#003300]/5 p-8 rounded-xl border-l-4 border-[#D4AF37] space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-widest opacity-60 mb-2">Facility Summary</h3>
              <div className="grid grid-cols-2 gap-y-4">
                <div>
                  <p className="text-[10px] uppercase font-bold opacity-40">Approved Amount</p>
                  <p className="text-xl font-bold text-[#D4AF37]">GH₵1,250,000</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase font-bold opacity-40">Estimated Rate</p>
                  <p className="text-lg font-bold">14.5% Fixed</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase font-bold opacity-40">Tenure</p>
                  <p className="text-lg font-bold">20 Years</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase font-bold opacity-40">Validity Period</p>
                  <p className="text-lg font-bold">90 Days</p>
                </div>
              </div>
            </div>

            <p>
              This pre-approval is verified based on your **Debt-to-Income (DTI) Ratio of 32%** and a verified employment record within the sovereign data layer. This status serves as a "Financial Passport" for immediate property reservation within our verified marketplace.
            </p>

            <div className="pt-12">
              <p className="italic opacity-60">Digitally Authenticated by,</p>
              <div className="mt-4 flex items-center gap-4">
                <div className="text-xl font-serif text-[#003300] italic underline decoration-[#D4AF37]">Syntry Mortgage Team</div>
                <div className="text-[8px] bg-[#1D9E75] text-white px-2 py-1 rounded font-bold uppercase tracking-widest">Signed</div>
              </div>
            </div>
          </div>

          <div className="border-t border-[#003300]/10 pt-8 text-[8px] opacity-40 flex justify-between uppercase font-bold">
            <p>© 2026 Syntry.co • Built for Ghana • Statutory Finality Registry</p>
            <p>Contact: 0531102292 | info@syntry.co</p>
          </div>
        </div>

        {/* What Happens Next Section */}
        <section className="mt-20 border-t border-[#003300]/10 pt-16">
           <div className="text-center mb-12">
              <h2 className="text-3xl md:text-5xl font-bold mb-4 text-[#003300] italic">What Happens Next?</h2>
              <p className="text-lg text-[#003300]/70 max-w-2xl mx-auto">Your pre-approval acts as a Sovereign Passport. Follow these three steps to secure your asset.</p>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              <div className="bg-white p-8 rounded-3xl shadow-lg border border-[#003300]/5 flex flex-col items-center text-center">
                 <div className="w-16 h-16 bg-[#1D9E75]/10 text-[#1D9E75] rounded-full flex items-center justify-center text-2xl font-black mb-6">1</div>
                 <h4 className="font-bold text-[#003300] mb-2 text-lg">Browse Properties</h4>
                 <p className="text-sm opacity-70">Browse mortgage-ready properties in the verified marketplace.</p>
              </div>
              <div className="bg-white p-8 rounded-3xl shadow-lg border border-[#003300]/5 flex flex-col items-center text-center">
                 <div className="w-16 h-16 bg-[#1D9E75]/10 text-[#1D9E75] rounded-full flex items-center justify-center text-2xl font-black mb-6">2</div>
                 <h4 className="font-bold text-[#003300] mb-2 text-lg">Instant Reservation</h4>
                 <p className="text-sm opacity-70">Reserve your chosen asset instantly using your pre-approval status.</p>
              </div>
              <div className="bg-[#003300] p-8 rounded-3xl shadow-lg border border-[#D4AF37]/20 flex flex-col items-center text-center text-white relative overflow-hidden">
                 <div className="w-16 h-16 bg-[#D4AF37]/20 text-[#D4AF37] rounded-full flex items-center justify-center text-2xl font-black mb-6 relative z-10">3</div>
                 <h4 className="font-bold text-[#D4AF37] mb-2 text-lg relative z-10">Final Disbursement</h4>
                 <p className="text-sm opacity-80 relative z-10">Final bank approval & direct liquidity disbursement.</p>
              </div>
           </div>

           {/* Action Buttons */}
           <div className="flex flex-col md:flex-row gap-4 justify-center mb-24">
              <a href="/marketplace" className="bg-[#1D9E75] text-white px-10 py-5 rounded-2xl font-bold text-lg hover:scale-105 transition-all text-center flex items-center justify-center shadow-xl shadow-[#1D9E75]/20">
                 Browse Mortgage-Ready Properties
              </a>
              <button className="bg-white border border-[#003300]/20 text-[#003300] px-10 py-5 rounded-2xl font-bold text-sm hover:bg-[#F8F1E3] transition-all text-center flex items-center justify-center shadow-sm">
                 Download Pre-Approval PDF
              </button>
              <button className="bg-[#003300] text-[#F8F1E3] px-10 py-5 rounded-2xl font-bold text-sm hover:bg-[#D4AF37] hover:text-[#003300] transition-colors text-center flex items-center justify-center shadow-lg">
                 Share with Partner Bank
              </button>
           </div>

           {/* Mini Lead Capture Form */}
           <div className="bg-white max-w-2xl mx-auto rounded-[2.5rem] p-10 md:p-14 shadow-2xl border border-[#003300]/10 mb-16 relative overflow-hidden text-center">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4AF37]/5 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none"></div>
              <h3 className="text-2xl font-bold mb-8 text-[#003300] italic">Need help choosing a property?</h3>
              
              {formSubmitted ? (
                 <div className="bg-[#1D9E75]/10 border border-[#1D9E75]/30 text-[#003300] p-6 rounded-2xl text-center relative z-10">
                    <p className="font-bold text-lg">Message Sent!</p>
                    <p className="text-sm opacity-80 mt-1">Our exact-match concierges will WhatsApp you shortly.</p>
                 </div>
              ) : (
                 <form onSubmit={handleFormSubmit} className="space-y-4 max-w-sm mx-auto relative z-10">
                    <input type="text" required placeholder="Your full name" className="w-full bg-[#F8F1E3]/50 border border-[#003300]/10 rounded-xl px-5 py-4 font-medium focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/50" />
                    <input type="tel" required placeholder="Your WhatsApp number" className="w-full bg-[#F8F1E3]/50 border border-[#003300]/10 rounded-xl px-5 py-4 font-medium focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/50" />
                    <button type="submit" className="w-full bg-[#003300] text-[#F8F1E3] px-6 py-4 rounded-xl font-bold hover:bg-[#D4AF37] hover:text-[#003300] transition-colors mt-2 uppercase tracking-widest text-sm">Request Guidance</button>
                 </form>
              )}
           </div>

           {/* Verified Footer Note */}
           <div className="text-center opacity-40 text-xs font-bold uppercase tracking-widest pb-8">
              Digitally Authenticated by Syntry Mortgage Team • © 2026 Syntry.co
           </div>
        </section>
      </main>

      {/* Floating WhatsApp Button */}
      <a 
        href="https://wa.me/233531102292" 
        className="fixed bottom-10 right-10 z-[3000] bg-[#25D366] text-white py-3 px-5 rounded-full shadow-[0_20px_50px_rgba(37,211,102,0.4)] hover:scale-110 transition-all animate-bounce flex items-center gap-3"
        title="Talk to Mortgage Team - 053 110 2292"
      >
        <span className="text-2xl">💬</span>
        <span className="text-xs font-bold uppercase tracking-widest hidden md:inline">Talk to Mortgage Team - 053 110 2292</span>
      </a>

      {/* Global Footer kept for consistent app navigation layout */}
      <GlobalFooter />
    </div>
  );
};

export default PreApprovalPage;
