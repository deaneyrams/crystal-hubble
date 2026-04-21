"use client";
import { Suspense, useState } from 'react';
import React from 'react';
import GlobalHeader from '../../components/GlobalHeader';
import GlobalFooter from '../../components/GlobalFooter';

const MortgageEnablementPage = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  
  // Calculator State
  const [loanAmount, setLoanAmount] = useState(500000);
  const [interestRate, setInterestRate] = useState(18);
  const [loanTenure, setLoanTenure] = useState(10);

  // Real-time calculations
  const monthlyInterestRate = (interestRate / 100) / 12;
  const numberOfPayments = loanTenure * 12;
  const monthlyPayment = (loanAmount * monthlyInterestRate) / (1 - Math.pow(1 + monthlyInterestRate, -numberOfPayments));
  const totalRepayment = monthlyPayment * numberOfPayments;
  const totalInterest = totalRepayment - loanAmount;

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  const problemSolution = [
    { p: "Banks reject properties with legacy title doubts.", s: "Syntry's 8-Layer Statutory Audit removes all lender uncertainty." },
    { p: "Inconsistent valuations delay loan processing.", s: "Real-time, data-driven index accepted by institutional portals." },
    { p: "Lack of pre-approved, bankable land stock.", s: "A curated marketplace of land already verified for mortgage." }
  ];

  const benefits = [
    { title: "Statutory Finality", desc: "Permanent land record locking with 8 Layers.", icon: "📜" },
    { title: "Bank Sync", desc: "Data integration with Ghana's leading lenders.", icon: "🏦" },
    { title: "One-Click Audit", desc: "Download institutional property health reports.", icon: "📈" },
    { title: "Fraud Immunity", desc: "Synthetic verification protects against double-sales.", icon: "🛡️" },
    { title: "Escrow Logic", desc: "Secure statutory node for loan disbursements.", icon: "💰" },
    { title: "Rapid Payouts", desc: "Accelerated funding for verified property owners.", icon: "⚡" }
  ];

  const properties = [
    { name: "Aburi Hills Sector 4", price: "GH₵450,000", status: "Mortgage Ready", apy: "14.2%" },
    { name: "Spintex Heights B", price: "GH₵1.2M", status: "Mortgage Ready", apy: "18.8%" },
    { name: "Pokuase Nodal Plot", price: "GH₵280,000", status: "Mortgage Ready", apy: "12.5%" }
  ];

  return (
    <Suspense fallback={<div className="bg-[#050508] min-h-screen" />}>
      <div className="bg-[#F8F1E3] min-h-screen text-[#003300] font-sans">
        <GlobalHeader />

        <main className="pt-32 pb-20 overflow-hidden">
          {/* Hero Section */}
          <section className="px-4 md:px-8 max-w-7xl mx-auto mb-32 text-center lg:text-left grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="animate-in fade-in slide-in-from-left-8 duration-1000">
              <div className="inline-flex items-center gap-2 bg-[#D4AF37]/10 px-4 py-2 rounded-full mb-8 border border-[#D4AF37]/20">
                <span className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full animate-pulse"></span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#D4AF37]">8 Layers of Grounded Truth Security</span>
              </div>
              <h1 className="text-5xl md:text-8xl font-bold leading-[0.95] mb-8 tracking-tighter italic">
                Turn Your Land Into <br />
                <span className="text-[#D4AF37]">Bankable Wealth.</span>
              </h1>
              <p className="text-xl md:text-2xl opacity-80 max-w-xl mx-auto lg:mx-0 mb-12 font-medium leading-relaxed">
                Ghana’s only mortgage infrastructure that eliminates title risk. We bridge the trust gap between property owners and top-tier lenders.
              </p>
              
              <div className="flex flex-col gap-6 items-center lg:items-start">
                  {/* Primary Big Button */}
                  <a href="/check-my-property" className="w-full lg:w-max bg-[#D4AF37] text-[#003300] px-16 py-8 rounded-[2.5rem] font-bold text-2xl hover:scale-105 transition-all shadow-[0_30px_60px_-15px_rgba(212,175,55,0.3)] text-center group">
                    Make My Property Mortgage-Ready – Free
                    <span className="block text-[10px] uppercase tracking-widest opacity-60 mt-1 font-black">Instantly verify 8 layers of truth</span>
                  </a>

                  <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
                    {/* Secondary Button */}
                    <a href="/dashboard/pre-approval" className="bg-[#00BFFF] text-white px-10 py-6 rounded-2xl font-bold text-sm uppercase tracking-widest hover:brightness-110 transition-all text-center shadow-xl shadow-[#00BFFF]/20">
                      Get Pre-Approved Collateral Report
                    </a>
                    
                    {/* Third Button / WhatsApp Inline */}
                    <a href="https://wa.me/233531102292?text=I%20want%20to%20make%20my%20property%20mortgage%20ready" className="bg-white border border-[#003300]/10 text-[#003300] px-10 py-6 rounded-2xl font-bold text-sm uppercase tracking-widest hover:bg-[#003300] hover:text-white transition-all text-center flex items-center justify-center gap-3">
                      <span className="text-xl">💬</span>
                      Talk to Mortgage Team
                    </a>
                  </div>
              </div>
              
              <p className="mt-8 text-[11px] font-bold uppercase tracking-widest opacity-40 italic">Syntry Advisor Hotline: 053 110 2292 | info@syntry.co</p>
            </div>

            <div className="hidden lg:block relative group">
               <div className="absolute inset-0 bg-[#D4AF37]/5 blur-[120px] rounded-full -mr-40 group-hover:bg-[#D4AF37]/10 transition-all duration-1000"></div>
               <div className="relative w-full h-[650px] bg-[#003300] border-[16px] border-white rounded-[5rem] shadow-2xl overflow-hidden p-10 flex flex-col justify-between">
                  <div>
                     <h3 className="text-white text-3xl font-bold mb-2">Institutional Collateral Portal</h3>
                     <div className="flex gap-4">
                        <span className="bg-[#A8E6CF] text-[#003300] px-4 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest">Lender Certified</span>
                        <span className="bg-white/10 text-[#D4AF37] px-4 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest">8 Layers Green</span>
                     </div>
                  </div>
                  <div className="space-y-6">
                     <div className="bg-white/5 border border-white/10 p-8 rounded-[3rem] backdrop-blur-md">
                        <p className="text-white/40 text-[10px] font-bold uppercase mb-2 tracking-widest">Bank-Accepted Index Value</p>
                        <p className="text-white text-4xl font-bold italic">GH₵10,850,000</p>
                     </div>
                     <div className="h-40 border-2 border-dashed border-white/5 rounded-[2.5rem] flex items-center justify-center relative overflow-hidden group">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-[10px] font-bold uppercase tracking-[4px] text-white/20">Syntry Audit Node 4.0</span>
                        </div>
                        <div className="w-full px-12 flex items-end gap-1 h-12 opacity-30 group-hover:opacity-60 transition-opacity">
                           {[40, 70, 50, 90, 60, 100].map((h, i) => (
                             <div key={i} style={{ height: `${h}%` }} className="flex-1 bg-[#D4AF37] rounded-t"></div>
                           ))}
                        </div>
                     </div>
                  </div>
               </div>
            </div>
          </section>

          {/* Lead Capture Form */}
          <section className="px-4 md:px-8 max-w-3xl mx-auto mb-32">
            <div className="bg-white rounded-[3rem] p-10 md:p-16 shadow-2xl border border-[#003300]/10 relative overflow-hidden">
               <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4AF37]/5 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none"></div>
               
               <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#003300] italic tracking-tight text-center">Get Your Free 8-Layer Mortgage Readiness Check</h2>
               <p className="text-center text-[#003300]/60 font-medium mb-10 max-w-lg mx-auto">Discover if your property qualifies for institutional financing in under 2 minutes.</p>
               
               {formSubmitted ? (
                 <div className="bg-[#A8E6CF]/20 border border-[#A8E6CF] text-[#003300] p-8 rounded-3xl text-center animate-in fade-in zoom-in duration-500">
                    <div className="w-20 h-20 bg-[#A8E6CF] rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl">
                      <span className="text-4xl">✓</span>
                    </div>
                    <h3 className="text-2xl font-bold mb-2">Thank you!</h3>
                    <p className="text-lg font-medium opacity-80">Our team will contact you within 24 hours with your free report.</p>
                 </div>
               ) : (
                 <form onSubmit={handleFormSubmit} className="space-y-6 relative z-10 text-[#003300]">
                    <div className="space-y-2">
                       <label className="text-xs font-bold uppercase tracking-widest text-[#003300]/60 pl-4">Full Name</label>
                       <input type="text" required className="w-full bg-[#F8F1E3]/50 border border-[#003300]/10 rounded-2xl px-6 py-4 text-[#003300] font-medium focus:outline-none focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 transition-all placeholder:text-[#003300]/30" placeholder="e.g. Kwame Mensah" />
                    </div>
                    
                    <div className="space-y-2">
                       <label className="text-xs font-bold uppercase tracking-widest text-[#003300]/60 pl-4">WhatsApp / Phone Number</label>
                       <input type="tel" required className="w-full bg-[#F8F1E3]/50 border border-[#003300]/10 rounded-2xl px-6 py-4 text-[#003300] font-medium focus:outline-none focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 transition-all placeholder:text-[#003300]/30" placeholder="e.g. +233 53 110 2292" />
                    </div>
                    
                    <div className="space-y-2">
                       <label className="text-xs font-bold uppercase tracking-widest text-[#003300]/60 pl-4">Property Location or Title Number</label>
                       <input type="text" required className="w-full bg-[#F8F1E3]/50 border border-[#003300]/10 rounded-2xl px-6 py-4 text-[#003300] font-medium focus:outline-none focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 transition-all placeholder:text-[#003300]/30" placeholder="e.g. Aburi Hills Plot 42" />
                    </div>
                    
                    <div className="space-y-2">
                       <label className="text-xs font-bold uppercase tracking-widest text-[#003300]/60 pl-4 flex items-center justify-between">
                         Current Estimated Value (GH₵) <span className="opacity-50 lowercase tracking-normal font-normal">Optional</span>
                       </label>
                       <input type="text" className="w-full bg-[#F8F1E3]/50 border border-[#003300]/10 rounded-2xl px-6 py-4 text-[#003300] font-medium focus:outline-none focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 transition-all placeholder:text-[#003300]/30" placeholder="e.g. 500,000" />
                    </div>
                    
                    <button type="submit" className="w-full bg-[#1D9E75] text-white px-8 py-5 rounded-2xl font-bold text-lg hover:scale-[1.02] hover:shadow-xl hover:shadow-[#1D9E75]/20 transition-all mt-4 border border-[#1D9E75] flex items-center justify-center gap-3">
                       <span>Submit for Free Mortgage Readiness Report</span>
                       <span className="text-xl">→</span>
                    </button>
                    
                    <p className="text-center text-[10px] uppercase tracking-widest text-[#003300]/40 font-bold mt-6 pt-6 border-t border-[#003300]/5 flex items-center justify-center gap-2">
                      <span className="text-xl">🔒</span> Your data is secure and will only be used to prepare your report
                    </p>
                 </form>
               )}
            </div>
          </section>

          {/* Mortgage Affordability Calculator */}
          <section className="px-4 md:px-8 max-w-5xl mx-auto mb-32">
             <div className="bg-[#003300] text-white p-10 md:p-16 rounded-[3rem] shadow-2xl relative overflow-hidden border border-[#D4AF37]/20">
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#1D9E75]/10 rounded-full blur-3xl pointer-events-none"></div>
                <h2 className="text-3xl md:text-5xl font-bold mb-12 italic tracking-tight text-center">How Much Can I Borrow?</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 relative z-10 items-center">
                   {/* Inputs */}
                   <div className="space-y-10">
                      <div>
                         <div className="flex justify-between items-center mb-4">
                            <label className="text-xs font-bold uppercase tracking-widest opacity-80">Desired Loan (GH₵)</label>
                            <span className="text-xl font-bold text-[#D4AF37]">{loanAmount.toLocaleString()}</span>
                         </div>
                         <input 
                           type="range" 
                           min="50000" 
                           max="10000000" 
                           step="50000"
                           value={loanAmount} 
                           onChange={(e) => setLoanAmount(Number(e.target.value))}
                           className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#1D9E75]"
                         />
                         <div className="flex justify-between text-[10px] opacity-40 mt-2 font-mono">
                            <span>50K</span>
                            <span>10M</span>
                         </div>
                      </div>

                      <div>
                         <div className="flex justify-between items-center mb-4">
                            <label className="text-xs font-bold uppercase tracking-widest opacity-80">Interest Rate (%)</label>
                            <span className="text-xl font-bold text-[#D4AF37]">{interestRate}%</span>
                         </div>
                         <input 
                           type="range" 
                           min="12" 
                           max="24" 
                           step="0.1"
                           value={interestRate} 
                           onChange={(e) => setInterestRate(Number(e.target.value))}
                           className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#1D9E75]"
                         />
                         <div className="flex justify-between text-[10px] opacity-40 mt-2 font-mono">
                            <span>12%</span>
                            <span>24%</span>
                         </div>
                      </div>

                      <div>
                         <div className="flex justify-between items-center mb-4">
                            <label className="text-xs font-bold uppercase tracking-widest opacity-80">Loan Tenure (Years)</label>
                            <span className="text-xl font-bold text-[#D4AF37]">{loanTenure} Years</span>
                         </div>
                         <input 
                           type="range" 
                           min="5" 
                           max="20" 
                           step="1"
                           value={loanTenure} 
                           onChange={(e) => setLoanTenure(Number(e.target.value))}
                           className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#1D9E75]"
                         />
                         <div className="flex justify-between text-[10px] opacity-40 mt-2 font-mono">
                            <span>5 Yrs</span>
                            <span>20 Yrs</span>
                         </div>
                      </div>
                   </div>

                   {/* Outputs */}
                   <div className="bg-white/5 border border-white/10 rounded-3xl p-8 flex flex-col justify-center">
                      <div className="mb-8">
                         <p className="text-[10px] font-bold uppercase tracking-widest opacity-60 mb-2">Estimated Monthly Payment</p>
                         <h3 className="text-4xl md:text-5xl font-bold text-[#1D9E75]">
                            GH₵{monthlyPayment.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                         </h3>
                      </div>
                      
                      <div className="space-y-4 border-t border-white/10 pt-6">
                         <div className="flex justify-between items-center">
                            <p className="text-xs opacity-60 uppercase tracking-widest">Total Repayment</p>
                            <p className="font-bold">GH₵{totalRepayment.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
                         </div>
                         <div className="flex justify-between items-center">
                            <p className="text-xs opacity-60 uppercase tracking-widest">Total Interest</p>
                            <p className="font-bold">GH₵{totalInterest.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
                         </div>
                      </div>
                      
                      <div className="mt-8 pt-6 border-t border-white/10 text-center">
                         <a href="/check-my-property" className="w-full inline-block bg-[#1D9E75] text-[#003300] py-4 rounded-xl font-bold hover:brightness-110 transition-all text-sm uppercase tracking-widest">
                            Check Readiness Now
                         </a>
                      </div>
                   </div>
                </div>
                
                <p className="text-center text-[10px] uppercase tracking-widest opacity-40 mt-12 italic border-t border-white/10 pt-6">
                   * Based on average bank rates in Ghana – final rates depend on bank approval
                </p>
             </div>
          </section>

          {/* Floating WhatsApp Button */}
          <a 
            href="https://wa.me/233531102292" 
            className="fixed bottom-10 right-10 z-[3000] bg-[#25D366] text-white p-6 rounded-full shadow-[0_20px_50px_rgba(37,211,102,0.4)] hover:scale-110 transition-all animate-bounce"
            title="Chat with Mortgage Team"
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">💬</span>
              <span className="text-xs font-bold uppercase tracking-widest hidden md:block">053 110 2292</span>
            </div>
          </a>

          {/* Problem/Solution Matrix */}
          <section className="bg-[#003300] text-[#F8F1E3] py-32 px-4 mb-32 relative overflow-hidden">
             <div className="max-w-7xl mx-auto">
                <h2 className="text-3xl font-bold mb-20 text-center italic tracking-widest uppercase">The Finance Challenge Resolved</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                   {problemSolution.map((item, i) => (
                     <div key={i} className="bg-white/5 border border-white/10 p-12 rounded-[4rem] group hover:bg-[#D4AF37] hover:text-[#003300] transition-all duration-500">
                        <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-xs font-bold mb-10 group-hover:bg-[#003300] group-hover:text-white">P.{i+1}</div>
                        <p className="text-xl font-bold mb-6 opacity-40 group-hover:opacity-100 italic leading-tight">{item.p}</p>
                        <p className="text-xs font-bold uppercase tracking-widest text-[#A8E6CF] group-hover:text-[#003300] flex items-center gap-3">
                           <span className="w-6 h-[1px] bg-[#A8E6CF] group-hover:bg-[#003300]"></span> {item.s}
                        </p>
                     </div>
                   ))}
                </div>
             </div>
          </section>

          {/* Benefits Grid */}
          <section className="px-4 md:px-8 max-w-7xl mx-auto mb-32">
             <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {benefits.map((b, i) => (
                  <div key={i} className="bg-white border border-[#D4AF37]/5 p-12 rounded-[3.5rem] text-center shadow-sm hover:border-[#D4AF37]/30 transition-all hover:-translate-y-2">
                     <div className="text-6xl mb-8 filter grayscale hover:grayscale-0 transition-all">{b.icon}</div>
                     <h4 className="text-2xl font-bold mb-3 italic">{b.title}</h4>
                     <p className="text-xs opacity-60 font-medium leading-relaxed max-w-[240px] mx-auto">{b.desc}</p>
                  </div>
                ))}
             </div>
          </section>

          {/* How It Works */}
          <section className="px-4 md:px-8 max-w-5xl mx-auto mb-40 text-center">
             <h2 className="text-4xl font-bold mb-24 italic tracking-tight">The 4-Step Enablement Protocol</h2>
             <div className="grid grid-cols-1 md:grid-cols-4 gap-12 relative">
                <div className="hidden md:block absolute top-10 left-20 right-20 h-0.5 bg-[#D4AF37]/10 z-0"></div>
                {[
                  { s: "01", t: "Sovereign Audit", d: "Pass your property through the 8 Layers of Grounded Truth." },
                  { s: "02", t: "Risk Lock", d: "Secure your coordinates against statutory title disputes." },
                  { s: "03", t: "Bank Push", d: "Your audit health report is shared with Top-Tier partner banks." },
                  { s: "04", t: "Funding", d: "Experience accelerated loan approval and escrow payout." }
                ].map((step, i) => (
                  <div key={i} className="relative z-10 space-y-6">
                     <div className="w-20 h-20 bg-[#003300] text-[#D4AF37] rounded-full mx-auto flex items-center justify-center font-bold text-2xl shadow-2xl transition-all hover:scale-110">{step.s}</div>
                     <h4 className="font-bold text-xl">{step.t}</h4>
                     <p className="text-[11px] opacity-60 font-medium leading-relaxed">{step.d}</p>
                  </div>
                ))}
             </div>
          </section>

          {/* Properties Teaser */}
          <section className="px-4 md:px-8 max-w-7xl mx-auto mb-40">
             <div className="flex justify-between items-end mb-16">
                <h2 className="text-3xl font-bold italic tracking-tight">Mortgage-Ready Assets</h2>
                <a href="/marketplace" className="text-[10px] font-bold uppercase tracking-[4px] border-b-2 border-[#D4AF37] pb-1">Browse All</a>
             </div>
             <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {properties.map((p, i) => (
                  <div key={i} className="bg-white p-8 rounded-[4rem] border border-[#003300]/5 hover:border-[#D4AF37]/40 transition-all group">
                     <div className="w-full h-64 bg-[#003300]/5 rounded-[3rem] mb-8 overflow-hidden relative">
                        <div className="absolute inset-0 flex items-center justify-center opacity-20 italic text-[10px]">Verified Photo Mockup</div>
                        <div className="absolute top-6 left-6 bg-[#A8E6CF] text-[#003300] px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest shadow-xl">Syntry Verified</div>
                     </div>
                     <h4 className="text-2xl font-bold mb-2 group-hover:text-[#D4AF37] transition-all">{p.name}</h4>
                     <div className="flex justify-between items-center">
                        <p className="text-lg font-bold">{p.price}</p>
                        <p className="text-[10px] font-bold text-[#D4AF37] uppercase tracking-widest">APY: {p.apy}</p>
                     </div>
                  </div>
                ))}
             </div>
          </section>

          {/* Final CTA Section */}
          <section className="px-4 md:px-8 max-w-7xl mx-auto mb-20 text-center">
             <div className="bg-[#D4AF37] text-[#003300] p-16 md:p-32 rounded-[6rem] shadow-2xl relative overflow-hidden group border-[16px] border-[#F8F1E3]">
                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative z-10">
                  <h2 className="text-4xl md:text-7xl font-bold mb-10 italic tracking-tighter leading-none">Ready to Get Started?</h2>
                  <p className="text-xl md:text-3xl font-bold mb-16 opacity-80 max-w-3xl mx-auto leading-tight italic">Secure your sovereign credentials and unlock property capital today.</p>
                  <div className="flex flex-col md:flex-row gap-8 items-center justify-center">
                     <a href="/check-my-property" className="w-full md:w-auto bg-[#003300] text-[#F8F1E3] px-16 py-8 rounded-[2.5rem] font-bold text-2xl hover:scale-105 transition-all shadow-2xl text-center">
                        Verify Land Now – Free
                     </a>
                     <div className="flex flex-col items-center gap-4">
                        <a href="https://wa.me/233531102292?text=Institutional%20Enterprise%20Demo%20Request" className="bg-[#00BFFF] text-white px-12 py-6 rounded-2xl font-bold text-lg hover:brightness-110 transition-all">
                          Request Enterprise Demo
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

export default MortgageEnablementPage;
