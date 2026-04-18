"use client";
import React from 'react';
import GlobalHeader from '../../../components/GlobalHeader';
import GlobalFooter from '../../../components/GlobalFooter';

const PartnerSignupPage = () => {
  return (
    <div className="bg-[#fdfcf9] min-h-screen text-[#003300] font-sans">
      <GlobalHeader />

      <main className="pt-32 pb-20 px-4 md:px-8 max-w-6xl mx-auto">
        {/* Partner Hero */}
        <section className="mb-20 text-center">
          <div className="inline-flex items-center gap-2 bg-[#D4AF37]/10 px-4 py-2 rounded-full mb-6 border border-[#D4AF37]/20">
            <span className="text-lg">🏢</span>
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#D4AF37]">Institutional Onboarding</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">Join as a Developer or Agent</h1>
          <p className="text-xl opacity-60 max-w-2xl mx-auto leading-relaxed font-medium">
            List verified properties, reach pre-approved buyers, and grow your business with the Sovereign Real Estate Exchange.
          </p>
        </section>

        {/* Signup Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
           {/* Form Section */}
           <div className="bg-white border border-[#003300]/5 p-10 md:p-16 rounded-[3rem] shadow-sm">
              <h3 className="text-2xl font-bold mb-10">Create Your Professional Account</h3>
              <div className="space-y-6">
                 <div>
                    <label className="text-[10px] font-bold uppercase tracking-[2px] opacity-40 block mb-3">Full Name / Company Name</label>
                    <input type="text" className="w-full bg-[#003300]/5 border-none p-5 rounded-2xl font-bold text-sm" placeholder="Enter name" />
                 </div>
                 <div className="grid grid-cols-2 gap-6">
                    <div>
                       <label className="text-[10px] font-bold uppercase tracking-[2px] opacity-40 block mb-3">Phone Number</label>
                       <input type="text" className="w-full bg-[#003300]/5 border-none p-5 rounded-2xl font-bold text-sm" placeholder="+233" />
                    </div>
                    <div>
                       <label className="text-[10px] font-bold uppercase tracking-[2px] opacity-40 block mb-3">Business Type</label>
                       <select className="w-full bg-[#003300]/5 border-none p-5 rounded-2xl font-bold text-sm">
                          <option>Developer</option>
                          <option>Agent</option>
                       </select>
                    </div>
                 </div>
                 <div>
                    <label className="text-[10px] font-bold uppercase tracking-[2px] opacity-40 block mb-3">Email Address</label>
                    <input type="email" className="w-full bg-[#003300]/5 border-none p-5 rounded-2xl font-bold text-sm" placeholder="email@company.com" />
                 </div>
                 <button className="w-full bg-[#00BFFF] text-[#003300] py-5 rounded-2xl font-bold text-sm uppercase tracking-widest hover:scale-[1.02] transition-all shadow-xl mt-8">
                    Create Partner Account
                 </button>
                 <p className="text-center text-[9px] font-bold opacity-30 mt-6 uppercase tracking-widest">
                    All accounts undergo manual review and 8 Layers verification.
                 </p>
              </div>
           </div>

           {/* Benefits Section */}
           <div className="flex flex-col justify-center space-y-12">
              {[
                { t: "Pre-Approved Access", d: "Connect directly with buyers who already have Syntry mortgage pre-approval letters.", i: "🏦" },
                { t: "Faster Sales Velocity", d: "Mortgage-ready listings close up to 60% faster than traditional properties.", i: "⚡" },
                { t: "Automated Verification", d: "Use our 8 Layers tools to verify your own inventory before listing.", i: "🛡️" },
                { t: "Institutional Branding", d: "Benefit from the trust associated with the Sovereign Real Estate Exchange.", i: "🏛️" }
              ].map((benefit, i) => (
                <div key={i} className="flex gap-8 group">
                   <div className="w-16 h-16 bg-[#D4AF37]/5 rounded-[1.5rem] flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">{benefit.i}</div>
                   <div>
                      <h4 className="font-bold text-lg mb-2">{benefit.t}</h4>
                      <p className="text-sm opacity-60 leading-relaxed font-medium">{benefit.d}</p>
                   </div>
                </div>
              ))}
           </div>
        </div>

        {/* WhatsApp Liaisons Mini-Section */}
        <section className="bg-[#003300] text-[#F8F1E3] p-12 rounded-[3rem] text-center shadow-2xl relative overflow-hidden">
           <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4AF37]/5 rounded-full blur-3xl -mr-32 -mt-32"></div>
           <h2 className="text-2xl font-bold mb-4 italic">Need Bulk Onboarding?</h2>
           <p className="text-sm opacity-60 mb-8 max-w-md mx-auto">Our statutory liaisons can help you onboard your entire property portfolio in under 48 hours.</p>
           <a href="https://wa.me/233531102292" className="bg-[#25D366] text-white px-10 py-4 rounded-xl font-bold text-xs uppercase tracking-widest hover:scale-105 transition-all inline-block">
              Connect Liaison 0531102292
           </a>
        </section>
      </main>

      <GlobalFooter />
    </div>
  );
};

export default PartnerSignupPage;
