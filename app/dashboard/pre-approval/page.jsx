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
    <div className="bg-slate-50 min-h-screen text-slate-900 font-sans">
      <GlobalHeader />

      <main className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Ceremonial Hero Section */}
        <section className="bg-white rounded-[3rem] p-10 md:p-16 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.05)] border border-slate-200 relative overflow-hidden mb-16 text-center isolate">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#0D9488]/5 rounded-full blur-[80px] pointer-events-none -mr-40 -mt-40 -z-10"></div>
            
            <div className="absolute -top-10 -left-10 -rotate-12 opacity-[0.03] pointer-events-none -z-10">
                <div className="border-[16px] border-[#0D9488] text-[#0D9488] text-[140px] font-medium tracking-tight uppercase inline-block p-8 leading-none tracking-tighter">PRE-APPROVED</div>
            </div>

            <div className="inline-flex items-center gap-2.5 bg-[#0D9488]/10 border border-[#0D9488]/20 text-slate-900 px-6 py-2.5 rounded-full text-[11px] font-medium uppercase tracking-widest mb-10 shadow-sm">
                <span className="w-2.5 h-2.5 bg-[#0D9488] rounded-full shadow-[0_0_8px_#0D9488] animate-pulse"></span> 8-Layer Verified • Pre-Approved
            </div>

            <h1 className="text-5xl md:text-7xl font-medium tracking-tight text-slate-900 mb-6 tracking-tight leading-tight">
               Congratulations, Kwame Anokye! <span className="inline-block animate-bounce text-6xl">🎉</span>
            </h1>
            
            <h2 className="text-xl md:text-2xl text-[#0D9488] font-medium tracking-tight mb-10 uppercase tracking-[0.15em] border-b-2 border-slate-100 pb-6 inline-block">
               You are Pre-Approved for a Mortgage Facility
            </h2>
            
            <p className="text-lg md:text-2xl text-slate-500 max-w-4xl mx-auto font-medium leading-relaxed">
               Following your comprehensive 8-Layer verification audit, Syntry Mortgage Enablement Division has pre-approved you for <span className="font-medium tracking-tight text-slate-900 bg-slate-100 border border-slate-200 px-4 py-1.5 rounded-xl shadow-sm md:text-3xl border-b-4 border-b-[#0D9488]/30 whitespace-nowrap inline-block ml-1">GH₵ 1,250,000</span>.
            </p>
        </section>

        {/* Interactive Dashboard Widgets */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
           {/* Facility Summary Cards */}
           <div className="lg:col-span-2 space-y-6">
              <h3 className="text-2xl font-medium tracking-tight text-slate-900 tracking-tight flex items-center gap-3">
                 <span className="w-8 h-8 rounded-lg bg-[#0D9488]/10 text-[#0D9488] flex items-center justify-center border border-[#0D9488]/20 text-lg shadow-sm">📑</span>
                 Facility Summary
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                 {/* Approved Amount */}
                 <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm flex items-center justify-between group hover:border-[#0D9488]/50 hover:shadow-[0_10px_30px_-15px_rgba(0,0,0,0.05)] transition-all duration-300">
                    <div>
                        <p className="text-[11px] font-medium uppercase tracking-widest text-slate-400 mb-2">Approved Amount</p>
                        <p className="text-4xl font-medium tracking-tight text-[#0D9488] tracking-tighter">GH₵1,250,000</p>
                    </div>
                    <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-3xl group-hover:scale-110 group-hover:bg-[#0D9488]/5 transition-all duration-300 shrink-0 border border-slate-100 shadow-sm">💰</div>
                 </div>

                 {/* Estimated Rate & Tenure Array */}
                 <div className="grid grid-rows-2 gap-5">
                    <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex items-center justify-between group hover:border-[#0D9488]/50 hover:shadow-md transition-all duration-300">
                       <div>
                           <p className="text-[10px] font-medium uppercase tracking-widest text-slate-400 mb-1">Estimated Rate</p>
                           <p className="text-2xl font-medium tracking-tight text-slate-900">14.5% Fixed</p>
                       </div>
                       <div className="w-12 h-12 bg-slate-50 rounded-[1rem] flex items-center justify-center text-2xl group-hover:scale-110 group-hover:bg-[#0D9488]/5 border border-slate-100 transition-all shrink-0">📈</div>
                    </div>
                    
                    <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex items-center justify-between group hover:border-[#0D9488]/50 hover:shadow-md transition-all duration-300">
                       <div>
                           <p className="text-[10px] font-medium uppercase tracking-widest text-slate-400 mb-1">Tenure</p>
                           <p className="text-2xl font-medium tracking-tight text-slate-900">20 Years</p>
                       </div>
                       <div className="w-12 h-12 bg-slate-50 rounded-[1rem] flex items-center justify-center text-2xl group-hover:scale-110 group-hover:bg-[#0D9488]/5 border border-slate-100 transition-all shrink-0">⏳</div>
                    </div>
                 </div>

                 {/* Validity */}
                 <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex items-center justify-between group hover:border-[#0D9488]/50 hover:shadow-md transition-all duration-300">
                    <div>
                        <p className="text-[10px] font-medium uppercase tracking-widest text-slate-400 mb-1">Validity Period</p>
                        <p className="text-2xl font-medium tracking-tight text-slate-900">90 Days</p>
                    </div>
                    <div className="w-12 h-12 bg-slate-50 rounded-[1rem] flex items-center justify-center text-2xl group-hover:scale-110 group-hover:bg-[#0D9488]/5 border border-slate-100 transition-all shrink-0">📅</div>
                 </div>

                 {/* DTI */}
                 <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex items-center justify-between group hover:border-[#0D9488]/50 hover:shadow-md transition-all duration-300">
                    <div>
                        <p className="text-[10px] font-medium uppercase tracking-widest text-slate-400 mb-1">Debt-to-Income (DTI)</p>
                        <p className="text-2xl font-medium tracking-tight text-slate-900 border-b-2 border-[#0D9488] inline-block">32%</p>
                    </div>
                    <div className="w-12 h-12 bg-slate-50 rounded-[1rem] flex items-center justify-center text-xl font-medium tracking-tight group-hover:scale-110 group-hover:text-[#0D9488] border border-slate-100 transition-all shrink-0 text-slate-400">⚖️</div>
                 </div>

              </div>
           </div>

           {/* 8-Layer Verification Audit Sidebar */}
           <div className="lg:col-span-1 bg-slate-900 rounded-[3rem] p-8 md:p-10 text-white shadow-2xl relative overflow-hidden flex flex-col group transition-all mt-14 lg:mt-0 lg:ml-4">
              <div className="absolute top-0 right-0 w-48 h-48 bg-[#0D9488]/10 rounded-full blur-3xl pointer-events-none -mr-10 -mt-10"></div>
              
              <h3 className="text-xl font-medium tracking-tight mb-6 tracking-tight relative z-10 flex flex-col">
                 <span className="text-[10px] uppercase font-medium text-[#0D9488] tracking-widest mb-2 bg-[#0D9488]/10 px-3 py-1.5 inline-block rounded-full w-max border border-[#0D9488]/30 shadow-[0_0_15px_rgba(0,200,83,0.2)]">Sovereign Protocol</span>
                 Your 8-Layer Verification Audit
              </h3>
              
              <ul className="space-y-4 relative z-10 flex-grow">
                 {[
                   "Cadastral Sync",
                   "Lands Commission",
                   "OASL Registry",
                   "Traditional Authority",
                   "Litigation Scan",
                   "Physical Ground Truth",
                   "Market APY Index",
                   "Sovereign Audit Issued"
                 ].map((layer, idx) => (
                    <li key={idx} className="flex items-center justify-between border-b border-slate-800 pb-3 group-hover:border-slate-700 transition-colors">
                       <span className="text-sm font-medium text-slate-300"><span className="text-slate-500 mr-2 text-xs">0{idx + 1}.</span> {layer}</span>
                       <span className="bg-[#0D9488]/20 text-[#0D9488] text-[9px] font-medium uppercase px-2.5 py-1 rounded-md border border-[#0D9488]/30 tracking-widest flex items-center gap-1.5 shadow-sm"><span className="w-1.5 h-1.5 bg-[#0D9488] rounded-full"></span> PASSED</span>
                    </li>
                 ))}
              </ul>

              <div className="mt-8 pt-6 border-t border-slate-800 relative z-10 flex items-start gap-4">
                 <div className="mt-1 w-6 h-6 bg-[#0D9488]/20 rounded flex items-center justify-center shrink-0 border border-[#0D9488]/30 text-[#0D9488] text-xs font-medium tracking-tight">✓</div>
                 <p className="text-[11px] text-slate-400 font-medium leading-relaxed uppercase tracking-widest">
                    This serves as your Financial Passport for the <span className="text-white border-b border-[#0D9488]">Syntry Sovereign Exchange</span>.
                 </p>
              </div>
           </div>
        </div>

        {/* PDF-Style Letter Container */}
        <div className="bg-white p-8 md:p-20 rounded-3xl shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] border border-slate-200 max-w-3xl mx-auto relative overflow-hidden mb-16">
          {/* Embossed Seal Placeholder */}
          <div className="absolute top-12 right-12 w-24 h-24 border-4 border-slate-100 bg-slate-50 rounded-full flex items-center justify-center rotate-12 opacity-50 shadow-inner">
            <div className="text-center">
              <p className="text-[8px] font-medium tracking-tight text-slate-400 uppercase leading-none">Syntry</p>
              <p className="text-[10px] font-medium tracking-tight text-[#0D9488] uppercase leading-none mt-1">Verified</p>
              <div className="w-8 h-0.5 bg-slate-300 mx-auto mt-1"></div>
              <p className="text-[6px] font-medium text-slate-400 mt-1 uppercase">Sovereign 2026</p>
            </div>
          </div>

          {/* Letter Header */}
          <div className="flex justify-between items-start mb-20 border-b-2 border-slate-800 pb-8">
            <div>
              <div className="flex items-center gap-0 mb-2">
                <span className="font-medium tracking-tight text-3xl tracking-tighter uppercase text-[#0D9488]">SYN</span>
                <span className="font-medium tracking-tight text-3xl tracking-tighter uppercase text-slate-900">TRY</span>
              </div>
              <p className="text-[10px] font-medium uppercase tracking-widest text-slate-500">Mortgage Enablement Division</p>
            </div>
            <div className="text-right">
              <h1 className="text-xl font-medium tracking-tight uppercase tracking-tight text-slate-900">Pre-Approval Letter</h1>
              <p className="text-[11px] text-slate-500 font-medium font-mono mt-1">ID: SYN-MTG-882-CASA</p>
            </div>
          </div>

          {/* Letter Content */}
          <div className="space-y-8 text-[15px] text-slate-700 leading-loose mb-20 font-medium">
            <div className="space-y-1 text-sm bg-slate-50 p-6 rounded-2xl border border-slate-200 inline-block w-full sm:w-auto mt-4">
              <p className="flex justify-between gap-10"><span className="text-slate-500 uppercase tracking-widest text-[10px] font-medium">Date</span> <span className="font-medium text-slate-900">{new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric'})}</span></p>
              <p className="flex justify-between gap-10 border-t border-slate-200 pt-1 mt-1"><span className="text-slate-500 uppercase tracking-widest text-[10px] font-medium">Attn</span> <span className="font-medium text-slate-900">Kwame Anokye</span></p>
              <p className="flex justify-between gap-10 border-t border-slate-200 pt-1 mt-1"><span className="text-slate-500 uppercase tracking-widest text-[10px] font-medium">Region</span> <span className="font-medium text-slate-900">Greater Accra, GH</span></p>
            </div>

            <p className="font-medium text-slate-900">Dear Mr. Anokye,</p>

            <p>
              We are pleased to inform you that following a comprehensive 8-Layer verification audit of your credentials and financial history, you have been <strong className="text-slate-900 bg-[#0D9488]/10 px-1 rounded">Pre-Approved</strong> for a mortgage facility through the Syntry Sovereign Exchange.
            </p>

            <div className="bg-slate-50 p-8 rounded-2xl border border-slate-200 border-l-4 border-l-[#0D9488] space-y-4 shadow-sm">
              <h3 className="text-[10px] font-medium uppercase tracking-widest text-slate-400 mb-4 border-b border-slate-200 pb-2">Facility Summary Outline</h3>
              <div className="grid grid-cols-2 gap-y-6">
                <div>
                  <p className="text-[10px] uppercase font-medium text-slate-400">Approved Amount</p>
                  <p className="text-xl font-medium tracking-tight text-[#0D9488]">GH₵1,250,000</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase font-medium text-slate-400">Estimated Rate</p>
                  <p className="text-lg font-medium tracking-tight text-slate-900">14.5% Fixed</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase font-medium text-slate-400">Tenure</p>
                  <p className="text-lg font-medium tracking-tight text-slate-900">20 Years</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase font-medium text-slate-400">Validity Period</p>
                  <p className="text-lg font-medium tracking-tight text-slate-900">90 Days</p>
                </div>
              </div>
            </div>

            <p>
              This pre-approval is verified based on your <strong className="text-slate-900">Debt-to-Income (DTI) Ratio of 32%</strong> and a universally verified employment record within the sovereign data layer. This status serves as a localized <strong className="text-slate-900 bg-slate-100 border border-slate-200 px-1 rounded">Financial Passport</strong> for immediate physical property reservation within our verified institutional marketplace.
            </p>

            <div className="pt-12 border-t border-slate-100">
              <p className="italic text-slate-400 text-sm font-medium">Digitally Authenticated by,</p>
              <div className="mt-4 flex items-center gap-4">
                <div className="text-2xl font-medium tracking-tight text-slate-900 tracking-tight">Syntry Mortgage Team</div>
                <div className="text-[9px] bg-[#0D9488] text-white px-2 py-1 rounded-md font-medium uppercase tracking-widest shadow-sm">Signed</div>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-200 pt-8 text-[10px] text-slate-400 flex flex-col md:flex-row justify-between items-center uppercase font-medium tracking-widest gap-2">
            <p className="text-center md:text-left">© 2026 Syntry.co <span className="hidden md:inline mx-1">•</span><br className="md:hidden"/> Built for Ghana <span className="hidden md:inline mx-1">•</span><br className="md:hidden"/> Statutory Finality Registry</p>
            <p>053 110 2292 | info@syntry.co</p>
          </div>
        </div>

        {/* What Happens Next Section */}
        {/* What Happens Next Section */}
        <section className="mt-32 border-t border-slate-200 pt-20">
           <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-medium tracking-tight mb-6 text-slate-900 tracking-tight">What Happens Next?</h2>
              <p className="text-lg text-slate-500 max-w-2xl mx-auto font-medium leading-relaxed">Your pre-approval acts as a Sovereign Passport. Follow these three steps to physically secure your asset.</p>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
              <div className="bg-white p-10 rounded-[3rem] shadow-[0_15px_40px_-15px_rgba(0,0,0,0.05)] border border-slate-200 flex flex-col items-center text-center group hover:-translate-y-2 transition-all duration-300">
                 <div className="w-20 h-20 bg-slate-50 border border-slate-100 rounded-full flex items-center justify-center text-3xl font-medium tracking-tight mb-8 text-[#0D9488] shadow-sm tracking-tighter">1</div>
                 <h4 className="font-medium tracking-tight text-slate-900 mb-3 text-xl">Browse Properties</h4>
                 <p className="text-[15px] font-medium text-slate-500 leading-relaxed">Browse mortgage-ready properties strictly curated in the verified marketplace.</p>
              </div>
              <div className="bg-white p-10 rounded-[3rem] shadow-[0_15px_40px_-15px_rgba(0,0,0,0.05)] border border-slate-200 flex flex-col items-center text-center group hover:-translate-y-2 transition-all duration-300">
                 <div className="w-20 h-20 bg-slate-50 border border-slate-100 rounded-full flex items-center justify-center text-3xl font-medium tracking-tight mb-8 text-[#0D9488] shadow-sm tracking-tighter">2</div>
                 <h4 className="font-medium tracking-tight text-slate-900 mb-3 text-xl">Instant Reservation</h4>
                 <p className="text-[15px] font-medium text-slate-500 leading-relaxed">Reserve your chosen asset instantly using your active pre-approval passport.</p>
              </div>
              <div className="bg-slate-900 p-10 rounded-[3rem] shadow-2xl border border-slate-800 flex flex-col items-center text-center text-white relative overflow-hidden group hover:-translate-y-2 transition-all duration-300 isolate">
                 <div className="absolute top-0 right-0 w-32 h-32 bg-[#0D9488]/20 blur-3xl pointer-events-none -z-10"></div>
                 <div className="w-20 h-20 bg-[#0D9488] text-white rounded-full flex items-center justify-center text-3xl font-medium tracking-tight mb-8 shadow-[0_0_20px_rgba(0,200,83,0.5)] tracking-tighter relative z-10 border-4 border-slate-800">3</div>
                 <h4 className="font-medium tracking-tight text-white mb-3 text-xl relative z-10">Final Disbursement</h4>
                 <p className="text-[15px] font-medium text-slate-400 leading-relaxed relative z-10">Automated final banking approval and direct institutional liquidity disbursement.</p>
              </div>
           </div>

           {/* Action Buttons */}
           <div className="flex flex-col md:flex-row gap-5 justify-center mb-32 border-b border-slate-200 pb-20">
              <a href="/marketplace" className="w-full md:w-auto bg-[#0D9488] text-white px-10 py-5 rounded-2xl font-medium text-lg hover:bg-[#0F766E] hover:-translate-y-1 transition-all text-center flex items-center justify-center shadow-[0_15px_30px_-10px_rgba(0,200,83,0.5)] border border-[#0D9488]">
                 Browse Mortgage-Ready Properties
              </a>
              <button className="w-full md:w-auto bg-white border-2 border-slate-200 text-slate-700 px-10 py-5 rounded-2xl font-medium text-sm hover:bg-slate-50 hover:border-slate-300 transition-all text-center flex items-center justify-center shadow-sm">
                 <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                 Download Pre-Approval PDF
              </button>
              <button className="w-full md:w-auto bg-slate-900 border-2 border-slate-900 text-white px-10 py-5 rounded-2xl font-medium text-sm hover:bg-slate-800 transition-all text-center flex items-center justify-center shadow-[0_10px_20px_-10px_rgba(0,0,0,0.5)]">
                 Share with Partner Bank
              </button>
           </div>

           {/* Mini Lead Capture Form */}
           <div className="bg-white max-w-2xl mx-auto rounded-[3rem] p-10 md:p-16 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.05)] border border-slate-200 mb-16 relative overflow-hidden text-center isolate">
              <div className="absolute -top-32 -left-32 w-64 h-64 bg-[#0D9488]/10 rounded-full blur-3xl pointer-events-none -z-10"></div>
              
              <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-8 shadow-sm border border-slate-100">🤔</div>
              <h3 className="text-3xl font-medium tracking-tight mb-10 text-slate-900 tracking-tight">Need help choosing a property?</h3>
              
              {formSubmitted ? (
                 <div className="bg-[#0D9488]/10 border border-[#0D9488]/30 text-slate-900 p-8 rounded-2xl text-center relative z-10 shadow-sm">
                    <p className="font-medium tracking-tight text-xl mb-2 flex items-center justify-center gap-2">Message Sent! <span className="text-[#0D9488] text-2xl">✓</span></p>
                    <p className="text-sm text-slate-600 font-medium">Our exact-match concierges will WhatsApp you shortly.</p>
                 </div>
              ) : (
                 <form onSubmit={handleFormSubmit} className="space-y-5 max-w-md mx-auto relative z-10">
                    <input type="text" required placeholder="Your full name" className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-5 font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0D9488] focus:border-transparent transition-all placeholder-slate-400" />
                    <input type="tel" required placeholder="Your WhatsApp number" className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-5 font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0D9488] focus:border-transparent transition-all placeholder-slate-400" />
                    <button type="submit" className="w-full bg-slate-900 text-white px-6 py-5 rounded-2xl font-medium tracking-tight tracking-widest text-[13px] uppercase hover:bg-slate-800 hover:-translate-y-1 transition-all shadow-[0_10px_20px_-10px_rgba(0,0,0,0.5)] mt-2 border border-slate-800">
                       Request Sovereign Guidance
                    </button>
                 </form>
              )}
           </div>

           {/* Verified Footer Note */}
           <div className="text-center text-[10px] font-medium uppercase tracking-widest pb-10 text-slate-400 flex items-center justify-center gap-2">
              Digitally Authenticated by Syntry Mortgage Team <span className="w-1 h-1 bg-slate-300 rounded-full mx-1"></span> © 2026 Syntry.co
           </div>
        </section>
      </main>

      {/* Floating WhatsApp Button */}
      <a 
        href="https://wa.me/233531102292" 
        className="fixed bottom-6 right-6 z-[3000] bg-[#25D366] text-white py-3.5 px-6 rounded-full shadow-[0_15px_30px_-5px_rgba(37,211,102,0.4)] hover:scale-105 hover:shadow-[0_20px_40px_-5px_rgba(37,211,102,0.5)] transition-all flex items-center gap-3 border border-[#25D366]"
        title="Talk to Mortgage Team - 053 110 2292"
      >
        <div className="relative">
           <span className="text-2xl pt-1 inline-block">💬</span>
           <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full border border-white animate-pulse"></span>
        </div>
        <span className="text-[12px] font-medium uppercase tracking-widest hidden md:inline ml-1">Talk to Mortgage Team - 053 110 2292</span>
      </a>

      {/* Global Footer kept for consistent app navigation layout */}
      <GlobalFooter />
    </div>
  );
};

export default PreApprovalPage;
