'use client';
import React, { useState } from 'react';
import GlobalHeader from '../../components/GlobalHeader';
import GlobalFooter from '../../components/GlobalFooter';

export default function PricingPage() {
  const [openFaq, setOpenFaq] = useState(null);

  const faqs = [
    {
      q: "Are there hidden fees for the 8-Layer verification?",
      a: "No. The GH₵ 2,500 Sovereign Audit is a flat, one-time fee per plot. It covers the full Lands Commission query, physical drone survey, traditional authority checks, and final Immutable Title issuance."
    },
    {
      q: "How much does Syntry take from automated rent?",
      a: "Syntry charges a flat 5% processing fee on securely routed rent. We directly deposit the remaining 95% into your designated local or international bank account on exactly the 1st of every month."
    },
    {
      q: "Do I pay extra when I list my verified land on the marketplace?",
      a: "Listing your verified property is completely free. We only take a standard 1.5% escrow settlement fee upon successful closing of a sale to guarantee fund safety for both parties."
    },
    {
      q: "Is there a bulk discount for Diaspora families verifying multiple plots?",
      a: "Yes. For families or estates verifying 3 or more properties simultaneously, we offer a 20% discount on the total audit bundle. Contact Diaspora Support to activate this."
    }
  ];

  return (
    <div className="bg-white min-h-screen text-slate-900 font-sans">
      <GlobalHeader />

      <main className="pt-32 pb-20 overflow-hidden">
        
        {/* Pricing Hero */}
        <section className="px-4 md:px-8 max-w-7xl mx-auto mb-20 text-center">
          <div className="inline-flex items-center gap-2 bg-[#00C853]/10 px-4 py-2 rounded-full mb-8 border border-[#00C853]/20 shadow-sm">
            <span className="w-2 h-2 bg-[#00C853] rounded-full animate-pulse shadow-[0_0_8px_#00C853]"></span>
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#00C853]">Radical Transparency</span>
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-[4rem] font-black leading-[1.1] mb-6 tracking-tight text-slate-900">
            Sovereign Pricing. <br />
            <span className="text-[#00C853]">No Hidden Agendas.</span>
          </h1>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto font-medium leading-relaxed">
            Choose the exact level of protection you need. Transparent fees for the Diaspora, local owners, and enterprise institutions.
          </p>
        </section>

        {/* Retail Pricing Grid */}
        <section className="px-4 md:px-8 max-w-6xl mx-auto mb-32">
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
              
              {/* Free Explorer */}
              <div className="bg-white border border-slate-200 p-10 rounded-[2.5rem] shadow-sm hover:border-[#00C853]/40 transition-colors group">
                 <h3 className="text-xl font-bold text-slate-900 mb-2">Explorer</h3>
                 <p className="text-sm text-slate-500 mb-8 h-10">Basic marketplace access for prospective buyers.</p>
                 <div className="mb-8">
                    <span className="text-4xl font-black text-slate-900">GH₵ 0</span>
                 </div>
                 <ul className="space-y-4 mb-10 text-sm font-medium text-slate-700">
                    <li className="flex items-center gap-3"><span className="text-[#00C853] font-bold">✓</span> Browse verified properties</li>
                    <li className="flex items-center gap-3"><span className="text-[#00C853] font-bold">✓</span> Estimated Valuations</li>
                    <li className="flex items-center gap-3"><span className="text-[#00C853] font-bold">✓</span> Bookmark favourites</li>
                    <li className="flex items-center gap-3 text-slate-400"><span className="text-slate-300">✕</span> Grounded Truth Audit</li>
                 </ul>
                 <a href="/marketplace" className="block w-full border-2 border-slate-200 text-slate-700 text-center py-4 rounded-xl font-bold hover:border-[#00C853] hover:text-[#00C853] transition-colors shadow-sm">Browse Market</a>
              </div>

              {/* Sovereign Audit (Highlighted) */}
              <div className="bg-[#003300] border border-[#004d00] p-12 rounded-[3.5rem] shadow-[0_20px_50px_-15px_rgba(0,51,0,0.5)] hover:shadow-[0_25px_60px_-15px_rgba(0,51,0,0.7)] transition-shadow relative transform md:-translate-y-4 z-10">
                 <div className="absolute top-0 right-0 w-40 h-40 bg-[#D4AF37]/20 rounded-full blur-3xl -mr-10 -mt-10"></div>
                 <div className="absolute top-0 left-1/2 -translate-x-1/2 -mt-4 bg-[#D4AF37] text-black px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg">Most Popular For Diaspora</div>
                 
                 <h3 className="text-2xl font-bold text-white mb-2 relative z-10">Sovereign Audit</h3>
                 <p className="text-sm text-[#D4AF37] mb-8 h-10 relative z-10">Complete 8-Layer land vetting & digital certification.</p>
                 <div className="mb-8 relative z-10">
                    <span className="text-5xl font-black text-white">GH₵ 2,500</span>
                    <span className="text-white/50 font-medium ml-2">/ one-time</span>
                 </div>
                 <ul className="space-y-4 mb-10 text-sm font-medium text-white/80 relative z-10">
                    <li className="flex items-center gap-3"><span className="text-[#D4AF37] font-bold">✓</span> 8-Layer Grounded Truth Vetting</li>
                    <li className="flex items-center gap-3"><span className="text-[#D4AF37] font-bold">✓</span> Physical Drone Flyover</li>
                    <li className="flex items-center gap-3"><span className="text-[#D4AF37] font-bold">✓</span> Lands Commission Clearance</li>
                    <li className="flex items-center gap-3"><span className="text-[#D4AF37] font-bold">✓</span> Immutable Digital Title Card</li>
                 </ul>
                 <a href="/owners" className="block w-full bg-[#D4AF37] text-[#003300] text-center py-4 rounded-xl font-bold hover:brightness-110 transition-colors relative z-10 shadow-[0_10px_20px_-10px_rgba(212,175,55,0.4)]">Verify My Land Now</a>
              </div>

              {/* Escrow Management */}
              <div className="bg-white border border-slate-200 p-10 rounded-[2.5rem] shadow-sm hover:border-[#D4AF37]/40 transition-colors group">
                 <h3 className="text-xl font-bold text-slate-900 mb-2">Automated Escrow</h3>
                 <p className="text-sm text-slate-500 mb-8 h-10">For landlords wanting zero hassle rent collection.</p>
                 <div className="mb-8">
                    <span className="text-4xl font-black text-slate-900">5%</span>
                    <span className="text-slate-500 font-medium ml-2">/ of rent</span>
                 </div>
                 <ul className="space-y-4 mb-10 text-sm font-medium text-slate-700">
                    <li className="flex items-center gap-3"><span className="text-[#00C853] font-bold">✓</span> Automated Bank & MoMo Payouts</li>
                    <li className="flex items-center gap-3"><span className="text-[#00C853] font-bold">✓</span> Tenant Verification Screening</li>
                    <li className="flex items-center gap-3"><span className="text-[#00C853] font-bold">✓</span> Automated Tax Reports</li>
                    <li className="flex items-center gap-3"><span className="text-[#00C853] font-bold">✓</span> Eviction Legal Coverage</li>
                 </ul>
                 <a href="https://wa.me/233531102292" className="block w-full border-2 border-slate-200 text-slate-700 text-center py-4 rounded-xl font-bold hover:border-[#00C853] hover:text-[#00C853] transition-colors shadow-sm">Setup Escrow</a>
              </div>

           </div>
        </section>

        {/* Institutional Traffic Diverter */}
        <section className="px-4 md:px-8 max-w-7xl mx-auto mb-32">
           <div className="bg-slate-900 rounded-[3rem] p-10 md:p-16 flex flex-col md:flex-row items-center justify-between gap-10 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)] relative overflow-hidden">
               <div className="absolute inset-0 bg-gradient-to-br from-[#00C853]/10 to-transparent"></div>
               <div className="relative z-10 max-w-xl text-center md:text-left">
                  <span className="text-[10px] font-black uppercase tracking-widest text-[#00C853] bg-[#00C853]/20 px-3 py-1.5 rounded-lg border border-[#00C853]/30 mb-6 inline-block">B2B Enterprise Hub</span>
                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Are you a Bank, Lender, or Developer?</h2>
                  <p className="text-slate-400 font-medium leading-relaxed">Syntry Enterprise provides custom volume-based pricing for bulk verification, API integration, and sovereign portfolio management.</p>
               </div>
               <div className="relative z-10 w-full md:w-auto">
                  <a href="/institutions" className="block w-full md:w-auto bg-[#00C853] text-white text-center px-10 py-5 rounded-2xl font-bold text-[17px] hover:bg-[#00a846] transition-all shadow-[0_15px_30px_-10px_rgba(0,200,83,0.4)] flex items-center justify-center gap-3">
                     View Enterprise Licensing <span className="text-xl">↗</span>
                  </a>
               </div>
           </div>
        </section>

        {/* Financial FAQ Section */}
        <section className="px-4 md:px-8 max-w-3xl mx-auto mb-32">
           <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Pricing FAQs</h2>
           </div>
           
           <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-slate-50 border border-slate-200 rounded-2xl overflow-hidden transition-all hover:border-slate-300">
                  <button 
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    className="w-full text-left px-8 py-6 flex justify-between items-center focus:outline-none focus:bg-slate-100 transition-colors"
                  >
                    <span className="font-bold text-slate-900 pr-8 text-[15px]">{faq.q}</span>
                    <span className={`text-xl transform transition-transform duration-300 text-slate-400 ${openFaq === index ? 'rotate-180 text-[#00C853]' : ''}`}>↓</span>
                  </button>
                  <div 
                    className={`px-8 text-slate-500 font-medium leading-relaxed overflow-hidden transition-all duration-300 ${openFaq === index ? 'max-h-40 pb-6 border-t border-slate-100 pt-4 opacity-100' : 'max-h-0 opacity-0'}`}
                  >
                    {faq.a}
                  </div>
                </div>
              ))}
           </div>
        </section>

      </main>

      <GlobalFooter />
    </div>
  );
}
