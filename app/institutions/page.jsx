"use client";
import React from 'react';
import GlobalHeader from '../../components/GlobalHeader';
import GlobalFooter from '../../components/GlobalFooter';

const InstitutionsPage = () => {
  const challenges = [
    { pain: "Opaque manual verification timelines.", solution: "Real-time query access to the 8-Layer Statutory Exchange." },
    { pain: "High risk of fraudulent collateral.", solution: "Guaranteed 'Ground Truth' verification status for all assets." },
    { pain: "Fragmented portfolio management.", solution: "Consolidated enterprise dashboard for bulk auditing." },
    { pain: "Difficult API integration for banking stacks.", solution: "RESTful institutional API with full documentation." }
  ];

  const benefits = [
    { title: "Bulk Verification", desc: "Audit entire land banks in a single statutory session.", icon: "🕋" },
    { title: "Banking API Access", desc: "Real-time mortgage eligibility callbacks.", icon: "🔌" },
    { title: "Portfolio Monitoring", desc: "Live valuation growth of and asset health tracking.", icon: "📈" },
    { title: "Title Finality", desc: "Permanent statutory record protection for major assets.", icon: "📜" },
    { title: "Risk Mitigation", desc: "Eliminate encumbrance and litigation risks at scale.", icon: "🛡️" },
    { title: "Escrow Settlement", desc: "Institutional fund protection for major transfers.", icon: "💰" }
  ];

  const useCases = [
    { t: "Developers", d: "Instantly certify your property inventory for faster sales to pre-approved mortgage buyers.", btn: "View Developer Tools" },
    { t: "Banks & Lenders", d: "Reduce underwriting risk by qualifying collateral against 8 Layers of Grounded Truth.", btn: "Manage Loan Assets" },
    { t: "Investment Funds", d: "Monitor portfolio health and appreciation growth for sovereign-grade assets.", btn: "Portfolio Audit" }
  ];

  return (
    <div className="bg-white min-h-screen text-slate-900 font-sans">
      <GlobalHeader />

      <main className="pt-32 pb-20 overflow-hidden">
        {/* Re-engineered Institutional Hero */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 md:pt-10 mb-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Hero Content */}
            <div className="text-center lg:text-left z-10 relative">
              <div className="inline-flex items-center gap-2 bg-[#00C853]/10 px-4 py-2 rounded-full mb-8 border border-[#00C853]/20 shadow-sm">
                <span className="w-2 h-2 bg-[#00C853] rounded-full animate-pulse shadow-[0_0_8px_#00C853]"></span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#00C853]">Enterprise B2B Protocol</span>
              </div>
              
              <h1 className="text-4xl md:text-6xl lg:text-[4rem] font-black leading-[1.1] mb-6 tracking-tight text-slate-900 relative">
                Sovereign Land <br className="hidden lg:block"/> Solutions at Scale <br className="hidden lg:block"/> <span className="text-[#00C853]">for Institutions</span>
              </h1>
              
              <h2 className="text-xs md:text-sm font-bold text-slate-500 uppercase tracking-widest flex flex-col md:flex-row flex-wrap items-center justify-center lg:justify-start gap-2 md:gap-3 leading-relaxed mb-8">
                <span className="text-slate-800">8 Layers of Grounded Truth</span> <span className="hidden md:block text-slate-300">•</span>
                <span className="text-slate-800">Real-Time API</span> <span className="hidden md:block text-slate-300">•</span>
                <span className="text-slate-800">Bulk Verification</span> <span className="hidden md:block text-slate-300">•</span>
                <span className="text-[#00C853]">Zero Litigation Risk</span>
              </h2>
              
              <p className="text-lg text-slate-600 max-w-xl mx-auto lg:mx-0 mb-10 font-medium leading-relaxed">
                Syntry provides the institutional layer of truth required for high-volume banking, development operations, and sovereign wealth management.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                 <a href="https://wa.me/233531102292?text=Requesting%20Enterprise%20Demo" className="w-full sm:w-auto bg-[#00C853] text-white px-8 py-5 rounded-xl font-bold text-[15px] md:text-lg hover:bg-[#00a846] transition-all shadow-[0_20px_40px_-10px_rgba(0,200,83,0.4)] flex items-center justify-center gap-3">
                   Request Enterprise Demo <span className="text-xl">↗</span>
                 </a>
                 <a href="/download" className="w-full sm:w-auto bg-white border-2 border-slate-200 text-slate-700 px-8 py-5 rounded-xl font-bold text-[15px] md:text-lg hover:border-[#00C853] hover:text-[#00C853] transition-all shadow-sm flex items-center justify-center gap-2">
                   Download Institutional Brochure
                 </a>
              </div>
            </div>

            {/* Right Stats / Enterprise Hub */}
            <div className="relative mt-10 lg:mt-0">
               <div className="w-full bg-white border border-slate-200 rounded-[2rem] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.08)] overflow-hidden transition-all hover:shadow-[0_50px_100px_-20px_rgba(0,0,0,0.12)]">
                  <div className="border-b border-slate-100 bg-slate-50 px-8 py-6 flex justify-between items-center">
                     <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-white rounded-xl shadow-sm border border-slate-100 flex items-center justify-center font-black text-xl text-[#00C853]">S</div>
                        <div>
                           <h3 className="text-slate-900 font-bold text-lg leading-none mb-1">Enterprise Hub</h3>
                           <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest flex items-center gap-2">
                             <span className="w-1.5 h-1.5 bg-[#00C853] rounded-full"></span> Live Protocol Active
                           </p>
                        </div>
                     </div>
                     <button className="hidden sm:block bg-white text-slate-700 border border-slate-200 px-5 py-2 rounded-lg text-xs font-bold hover:bg-slate-50 transition-colors shadow-sm">View Live Reports</button>
                  </div>
                  
                  <div className="p-6 md:p-8">
                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
                        {/* Stat Group 1 */}
                        <div className="bg-slate-50 border border-slate-100 p-6 rounded-2xl hover:border-[#00C853]/30 transition-colors">
                           <div className="flex justify-between items-start mb-4">
                              <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">Portfolio Volume</p>
                              <span className="text-lg opacity-80">🕋</span>
                           </div>
                           <p className="text-3xl font-black text-slate-900 tracking-tight">142<span className="text-slate-400 font-bold text-xl ml-1">+</span></p>
                           <p className="text-xs font-medium text-slate-500 mt-1">Verified Plots</p>
                        </div>
                        
                        {/* Stat Group 2 */}
                        <div className="bg-[#00C853]/5 border border-[#00C853]/20 p-6 rounded-2xl relative overflow-hidden group">
                           <div className="absolute top-0 right-0 w-24 h-24 bg-[#00C853]/10 rounded-full blur-xl -mr-10 -mt-10 group-hover:scale-150 transition-transform duration-700"></div>
                           <div className="flex justify-between items-start mb-4 relative z-10">
                              <p className="text-[#00C853] text-[10px] font-bold uppercase tracking-widest">Verified Value</p>
                              <span className="text-lg opacity-80">📈</span>
                           </div>
                           <p className="text-3xl font-black text-[#00C853] tracking-tight relative z-10">GH₵102.4M</p>
                           <p className="text-xs font-medium text-[#00C853]/80 mt-1 relative z-10">Sovereign Protected</p>
                        </div>
                        
                        {/* Stat Group 3 */}
                        <div className="bg-slate-50 border border-slate-100 p-6 rounded-2xl hover:border-[#00C853]/30 transition-colors">
                           <div className="flex justify-between items-start mb-4">
                              <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">Active Institutions</p>
                              <span className="text-lg opacity-80">🏦</span>
                           </div>
                           <p className="text-3xl font-black text-slate-900 tracking-tight">12</p>
                           <p className="text-xs font-medium text-slate-500 mt-1">Onboarded Partners</p>
                        </div>
                        
                        {/* Stat Group 4 */}
                        <div className="bg-slate-50 border border-slate-100 p-6 rounded-2xl hover:border-[#00C853]/30 transition-colors">
                           <div className="flex justify-between items-start mb-4">
                              <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">Litigation Rate</p>
                              <span className="text-lg opacity-80">🛡️</span>
                           </div>
                           <p className="text-3xl font-black text-slate-900 tracking-tight">0.00%</p>
                           <p className="text-xs font-medium text-slate-500 mt-1">Zero Encumbrances</p>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
          </div>
        </div>

        {/* Unified Challenge & Features Grid */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-40">
           <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
              
              {/* Left Column: The Institutional Challenge */}
              <div className="lg:col-span-4 flex flex-col">
                 <div className="lg:sticky lg:top-40">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight text-slate-900 leading-tight">The Institutional Challenge</h2>
                    <p className="text-slate-500 font-medium mb-12 leading-relaxed">Modern banking and development require absolute statutory certainty. Traditional methods fail to scale.</p>
                    
                    <div className="space-y-8">
                       {[
                         { title: "Opaque Timelines", desc: "Manual verification takes weeks, bottlenecking mortgage deployment." },
                         { title: "Fraudulent Collateral", desc: "No real-time API connection to the Lands Commission leads to bad loans." },
                         { title: "Fragmented Management", desc: "Asset managers lack a single digital source of truth for valuations." },
                         { title: "No Banking API", desc: "Modern Fintech stacks cannot interface directly with paper registries." }
                       ].map((c, i) => (
                         <div key={i} className="flex gap-5 group">
                            <div className="w-10 h-10 bg-red-50 text-red-500 rounded-[10px] flex items-center justify-center font-black flex-shrink-0 group-hover:bg-red-500 group-hover:text-white transition-colors border border-red-100 shadow-sm">✕</div>
                            <div>
                               <h4 className="font-bold text-slate-800 mb-1.5 text-lg leading-none group-hover:text-red-600 transition-colors">{c.title}</h4>
                               <p className="text-sm text-slate-500 leading-relaxed font-medium">{c.desc}</p>
                            </div>
                         </div>
                       ))}
                    </div>

                    <div className="mt-12 bg-white border border-slate-200 p-8 rounded-[2rem] border-l-[6px] border-l-[#00C853] shadow-sm">
                       <div className="inline-flex items-center gap-2 bg-[#00C853]/10 px-3 py-1.5 rounded-full mb-4">
                         <span className="text-[9px] font-bold uppercase tracking-widest text-[#00C853]">Syntry Benchmark Data</span>
                       </div>
                       <p className="text-lg font-bold text-slate-900 leading-relaxed italic">"80% of institutional land disputes in Ghana arise from the lack of statutory synchronization."</p>
                    </div>
                 </div>
              </div>

              {/* Right Column: Sovereign Enterprise Features & ROI */}
              <div className="lg:col-span-8">
                 <h2 className="text-3xl text-slate-900 font-bold mb-10 tracking-tight hidden lg:block">Sovereign Enterprise Features</h2>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[
                      { icon: "🕋", t: "Bulk 8-Layer Verification", d: "Audit entire land banks in one seamless API session against the Grounded Truth protocol.", roi: "Reduce audit time by 87%", active: true },
                      { icon: "🔌", t: "RESTful Institutional API", d: "Deploy real-time mortgage eligibility callbacks directly into your banking app.", roi: "Zero API Latency" },
                      { icon: "📈", t: "Enterprise Dashboard", d: "Consolidated portfolio monitoring and live valuation tracking across jurisdictions.", roi: "+10% Valuation Accuracy" },
                      { icon: "📜", t: "Permanent Title Finality", d: "Permanent statutory record protection against any future overriding claims.", roi: "Zero Litigation Risk" },
                      { icon: "💰", t: "Escrow & Settlement", d: "High-volume institutional fund protection for fast, secure sovereign asset transfers.", roi: "100% Capital Safety" },
                      { icon: "🛡️", t: "White-Label SLA", d: "Dedicated enterprise support channels with customized on-premise integrations.", roi: "24/7 Priority Resolution", badge: "Enterprise" }
                    ].map((f, i) => (
                      <div key={i} className={`bg-white border ${f.active ? 'border-[#00C853] shadow-[0_20px_40px_-15px_rgba(0,200,83,0.15)] ring-1 ring-[#00C853]/20' : 'border-slate-200 shadow-sm'} p-8 rounded-[2.5rem] hover:-translate-y-2 hover:shadow-[0_30px_60px_-15px_rgba(0,200,83,0.15)] hover:border-[#00C853]/50 transition-all duration-400 group relative overflow-hidden flex flex-col h-full`}>
                         <div className="absolute top-0 right-0 w-40 h-40 bg-slate-50 rounded-bl-full blur-3xl -mr-10 -mt-10 group-hover:bg-[#00C853]/10 transition-colors duration-500"></div>
                         
                         {f.badge && (
                            <span className="absolute top-6 right-8 text-[9px] font-black uppercase tracking-widest text-slate-400 bg-slate-100 px-3 py-1.5 rounded-full z-10">{f.badge}</span>
                         )}

                         <div className="w-14 h-14 bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-center text-3xl mb-8 relative z-10 group-hover:scale-110 transition-transform shadow-sm drop-shadow-sm">{f.icon}</div>
                         
                         <h3 className="text-xl font-bold text-slate-900 mb-3 leading-tight relative z-10">{f.t}</h3>
                         <p className="text-sm text-slate-500 leading-relaxed font-medium mb-auto relative z-10">{f.d}</p>
                         
                         <div className="mt-8 pt-6 border-t border-slate-100 relative z-10 flex items-center justify-between">
                            <span className="inline-flex items-center gap-2 text-[10px] font-bold text-[#00a846] uppercase tracking-widest bg-[#00C853]/10 px-3 py-1.5 rounded-lg border border-[#00C853]/20">
                               <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd"></path></svg>
                               {f.roi}
                            </span>
                         </div>
                      </div>
                    ))}
                 </div>
              </div>

           </div>
        </section>

        {/* Stakeholders Section */}
        <section className="bg-slate-50 py-24 px-4 border-y border-slate-200 mb-32">
           <div className="max-w-7xl mx-auto">
              <div className="text-center mb-16">
                 <h2 className="text-3xl md:text-5xl font-bold text-slate-900 tracking-tight mb-4">Built for Ghana’s Leading Institutions</h2>
                 <p className="text-lg text-slate-500 font-medium">Configure the Syntry protocol to protect your specific asset class.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                 <div className="bg-white p-10 rounded-[2.5rem] border border-slate-200 shadow-sm hover:border-[#00C853]/40 hover:shadow-lg transition-all group">
                    <div className="w-14 h-14 bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-center text-3xl mb-8 group-hover:scale-110 transition-transform shadow-sm drop-shadow-sm">🏦</div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-4 tracking-tight">Banks & Lenders</h3>
                    <p className="text-slate-500 leading-relaxed font-medium mb-auto">Qualify collateral instantly with 8 Layers of Grounded Truth before approving mortgages.</p>
                 </div>
                 <div className="bg-white p-10 rounded-[2.5rem] border border-[#00C853]/30 shadow-[0_15px_30px_-10px_rgba(0,200,83,0.1)] hover:border-[#00C853]/60 hover:shadow-[0_25px_50px_-12px_rgba(0,200,83,0.2)] transition-all group relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-[#00C853]/10 rounded-bl-[100px] -mr-10 -mt-10"></div>
                    <div className="w-14 h-14 bg-[#00C853]/10 border border-[#00C853]/20 rounded-2xl flex items-center justify-center text-3xl mb-8 group-hover:scale-110 transition-transform shadow-sm relative z-10 drop-shadow-sm">🏗️</div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-4 tracking-tight relative z-10">Real Estate Developers</h3>
                    <p className="text-slate-500 leading-relaxed font-medium mb-auto relative z-10">Certify entire inventory for faster mortgage sales and eliminate buyer hesitation instantly.</p>
                 </div>
                 <div className="bg-white p-10 rounded-[2.5rem] border border-slate-200 shadow-sm hover:border-[#00C853]/40 hover:shadow-lg transition-all group">
                    <div className="w-14 h-14 bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-center text-3xl mb-8 group-hover:scale-110 transition-transform shadow-sm drop-shadow-sm">🛡️</div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-4 tracking-tight">Investment & Pension</h3>
                    <p className="text-slate-500 leading-relaxed font-medium mb-auto">Acquire sovereign-grade assets combined with live valuation tracking across entire funds.</p>
                 </div>
              </div>
           </div>
        </section>

        {/* Case Studies Section */}
        <section className="px-4 md:px-8 max-w-7xl mx-auto mb-40">
           <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
              <div>
                 <h2 className="text-3xl md:text-5xl font-bold text-slate-900 tracking-tight mb-4">Trusted by Market Leaders</h2>
                 <p className="text-lg text-slate-500 font-medium">Real results from institutional deployments across Ghana.</p>
              </div>
              <button className="bg-slate-900 text-white px-8 py-4 rounded-xl font-bold text-sm tracking-widest hover:bg-slate-800 transition-colors shadow-lg">READ FULL CASE STUDIES →</button>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Case Study 1 */}
              <div className="bg-white border border-slate-200 p-8 rounded-[2rem] shadow-sm hover:-translate-y-2 transition-transform duration-300 group">
                 <div className="mb-6">
                    <span className="text-[10px] font-black uppercase tracking-widest text-[#00a846] bg-[#00C853]/10 px-3 py-1.5 rounded-lg border border-[#00C853]/20">Banking Sector</span>
                 </div>
                 <h4 className="text-2xl font-black text-slate-900 mb-3 leading-tight group-hover:text-[#00C853] transition-colors">Major Ghanaian Bank</h4>
                 <div className="flex items-center gap-4 pt-6 border-t border-slate-100 mt-6 md:mt-10">
                    <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center text-xl shadow-inner border border-slate-200 flex-shrink-0">📉</div>
                    <p className="text-sm font-bold text-slate-500 leading-tight">Reduced collateral risk by <span className="text-slate-900 font-black text-lg block sm:inline">92%</span></p>
                 </div>
              </div>

              {/* Case Study 2 */}
              <div className="bg-slate-900 border border-slate-800 p-8 rounded-[2rem] shadow-xl hover:-translate-y-2 transition-transform duration-300 group relative overflow-hidden">
                 <div className="absolute inset-0 bg-gradient-to-br from-[#00C853]/10 to-transparent"></div>
                 <div className="mb-6 relative z-10">
                    <span className="text-[10px] font-black uppercase tracking-widest text-[#00C853] bg-[#00C853]/20 px-3 py-1.5 rounded-lg border border-[#00C853]/30 shadow-[0_0_15px_rgba(0,200,83,0.2)]">Real Estate</span>
                 </div>
                 <h4 className="text-2xl font-black text-white mb-3 leading-tight group-hover:text-[#00C853] transition-colors relative z-10">Large Developer</h4>
                 <div className="flex items-center gap-4 pt-6 border-t border-slate-700 mt-6 md:mt-10 relative z-10">
                    <div className="w-12 h-12 bg-slate-800 rounded-xl flex items-center justify-center text-xl shadow-inner border border-slate-600 flex-shrink-0">⚡</div>
                    <p className="text-sm font-bold text-slate-300 leading-tight">Listed <span className="text-[#00C853] font-black text-lg block sm:inline">GH₵47M</span> portfolio in 9 days</p>
                 </div>
              </div>

              {/* Case Study 3 */}
              <div className="bg-white border border-slate-200 p-8 rounded-[2rem] shadow-sm hover:-translate-y-2 transition-transform duration-300 group">
                 <div className="mb-6">
                    <span className="text-[10px] font-black uppercase tracking-widest text-[#00a846] bg-[#00C853]/10 px-3 py-1.5 rounded-lg border border-[#00C853]/20">Institutional Fund</span>
                 </div>
                 <h4 className="text-2xl font-black text-slate-900 mb-3 leading-tight group-hover:text-[#00C853] transition-colors">Pension Fund</h4>
                 <div className="flex items-center gap-4 pt-6 border-t border-slate-100 mt-6 md:mt-10">
                    <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center text-xl shadow-inner border border-slate-200 flex-shrink-0">🛡️</div>
                    <p className="text-sm font-bold text-slate-500 leading-tight">Secured <span className="text-slate-900 font-black text-lg block sm:inline">GH₵28M</span> in verified assets</p>
                 </div>
              </div>
           </div>
        </section>

        {/* Enterprise Pricing Tiers */}
        <section className="px-4 md:px-8 max-w-7xl mx-auto mb-20">
           <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold text-slate-900 tracking-tight mb-4">Enterprise Licensing</h2>
              <p className="text-lg text-slate-500 font-medium max-w-2xl mx-auto">Transparent, volume-based pricing designed to scale with your institutional deployment.</p>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center max-w-6xl mx-auto">
              
              {/* Starter Tier */}
              <div className="bg-white border border-slate-200 p-10 rounded-[2.5rem] shadow-sm hover:border-[#00C853]/40 transition-colors group">
                 <h3 className="text-xl font-bold text-slate-900 mb-2">Starter Node</h3>
                 <p className="text-sm text-slate-500 mb-8 h-10">Perfect for mid-sized real estate developers.</p>
                 <div className="mb-8">
                    <span className="text-4xl font-black text-slate-900">Custom</span>
                    <span className="text-slate-500 font-medium ml-2">/ month</span>
                 </div>
                 <ul className="space-y-4 mb-10 text-sm font-medium text-slate-700">
                    <li className="flex items-center gap-3"><span className="text-[#00C853] font-bold">✓</span> Bulk 8-Layer Verification</li>
                    <li className="flex items-center gap-3"><span className="text-[#00C853] font-bold">✓</span> Enterprise Dashboard Access</li>
                    <li className="flex items-center gap-3"><span className="text-[#00C853] font-bold">✓</span> Multi-user Roles (Up to 5)</li>
                    <li className="flex items-center gap-3 text-slate-400"><span className="text-slate-300">✕</span> Direct API Access</li>
                 </ul>
              </div>

              {/* Professional Tier (Highlighted) */}
              <div className="bg-slate-900 border border-slate-800 p-12 rounded-[3.5rem] shadow-[0_20px_50px_-15px_rgba(0,200,83,0.2)] hover:shadow-[0_25px_60px_-15px_rgba(0,200,83,0.3)] transition-shadow relative transform md:-translate-y-4 z-10">
                 <div className="absolute top-0 right-0 w-40 h-40 bg-[#00C853]/20 rounded-full blur-3xl -mr-10 -mt-10"></div>
                 <div className="absolute top-0 left-1/2 -translate-x-1/2 -mt-4 bg-[#00C853] text-white px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-lg">Most Popular</div>
                 
                 <h3 className="text-2xl font-bold text-white mb-2 relative z-10">Professional Node</h3>
                 <p className="text-sm text-slate-400 mb-8 h-10 relative z-10">Engineered for commercial banks and lenders.</p>
                 <div className="mb-8 relative z-10">
                    <span className="text-5xl font-black text-white">Custom</span>
                    <span className="text-slate-400 font-medium ml-2">/ volume</span>
                 </div>
                 <ul className="space-y-4 mb-10 text-sm font-medium text-slate-300 relative z-10">
                    <li className="flex items-center gap-3"><span className="text-[#00C853] font-bold">✓</span> Everything in Starter</li>
                    <li className="flex items-center gap-3"><span className="text-[#00C853] font-bold">✓</span> Full RESTful API Access</li>
                    <li className="flex items-center gap-3"><span className="text-[#00C853] font-bold">✓</span> Real-time Mortgage Callbacks</li>
                    <li className="flex items-center gap-3"><span className="text-[#00C853] font-bold">✓</span> Automated Escrow Routing</li>
                 </ul>
                 <a href="#demo" className="block w-full bg-[#00C853] text-white text-center py-4 rounded-xl font-bold hover:bg-[#00a846] transition-colors relative z-10 shadow-[0_10px_20px_-10px_rgba(0,200,83,0.5)]">Talk to Sales</a>
              </div>

              {/* Enterprise Tier */}
              <div className="bg-white border border-slate-200 p-10 rounded-[2.5rem] shadow-sm hover:border-[#00C853]/40 transition-colors group">
                 <h3 className="text-xl font-bold text-slate-900 mb-2">Sovereign Node</h3>
                 <p className="text-sm text-slate-500 mb-8 h-10">For pension funds & sovereign wealth.</p>
                 <div className="mb-8">
                    <span className="text-4xl font-black text-slate-900">Custom</span>
                    <span className="text-slate-500 font-medium ml-2">/ annual</span>
                 </div>
                 <ul className="space-y-4 mb-10 text-sm font-medium text-slate-700">
                    <li className="flex items-center gap-3"><span className="text-[#00C853] font-bold">✓</span> Everything in Professional</li>
                    <li className="flex items-center gap-3"><span className="text-[#00C853] font-bold">✓</span> White-label integration</li>
                    <li className="flex items-center gap-3"><span className="text-[#00C853] font-bold">✓</span> Dedicated Account Manager</li>
                    <li className="flex items-center gap-3"><span className="text-[#00C853] font-bold">✓</span> 99.99% Uptime SLA</li>
                 </ul>
              </div>

           </div>
        </section>

        {/* Lead Capture Form Section */}
        <section id="demo" className="px-4 md:px-8 max-w-6xl mx-auto mb-32">
           <div className="bg-white border border-slate-200 rounded-[3rem] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.05)] overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-5">
                 
                 {/* Left Form Area */}
                 <div className="lg:col-span-3 p-10 lg:p-16">
                    <div className="mb-10">
                       <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight mb-4">Request Your Custom Enterprise Demo</h2>
                       <p className="text-slate-500 font-medium">Secure your institutional pipeline today. Our integration engineers typically respond within 2 hours.</p>
                    </div>
                    
                    <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); alert("Form submitted to Syntry B2B queue."); }}>
                       <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                          <div className="space-y-2">
                             <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Institution Name <span className="text-red-500">*</span></label>
                             <input type="text" required className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 font-medium focus:outline-none focus:border-[#00C853] focus:ring-1 focus:ring-[#00C853] transition-all" placeholder="e.g. Absa Bank" />
                          </div>
                          <div className="space-y-2">
                             <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Contact Person <span className="text-red-500">*</span></label>
                             <input type="text" required className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 font-medium focus:outline-none focus:border-[#00C853] focus:ring-1 focus:ring-[#00C853] transition-all" placeholder="Full Name" />
                          </div>
                       </div>
                       
                       <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                          <div className="space-y-2">
                             <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Corporate Email <span className="text-red-500">*</span></label>
                             <input type="email" required className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 font-medium focus:outline-none focus:border-[#00C853] focus:ring-1 focus:ring-[#00C853] transition-all" placeholder="name@company.com" />
                          </div>
                          <div className="space-y-2">
                             <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">WhatsApp / Phone <span className="text-red-500">*</span></label>
                             <input type="tel" required className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 font-medium focus:outline-none focus:border-[#00C853] focus:ring-1 focus:ring-[#00C853] transition-all" placeholder="+233 5X XXX XXXX" />
                          </div>
                       </div>

                       <div className="space-y-2">
                          <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Institution Type <span className="text-red-500">*</span></label>
                          <select required className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 font-medium focus:outline-none focus:border-[#00C853] focus:ring-1 focus:ring-[#00C853] transition-all appearance-none cursor-pointer">
                             <option value="" disabled selected>Select category...</option>
                             <option value="bank">Commercial Bank / Lender</option>
                             <option value="developer">Real Estate Developer</option>
                             <option value="fund">Investment / Pension Fund</option>
                             <option value="government">Government / Municipal</option>
                             <option value="other">Other Institutional Body</option>
                          </select>
                       </div>

                       <div className="space-y-2">
                          <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Project Requirements <span className="text-slate-400 font-normal lowercase">(optional)</span></label>
                          <textarea rows="4" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 font-medium focus:outline-none focus:border-[#00C853] focus:ring-1 focus:ring-[#00C853] transition-all resize-none" placeholder="Briefly describe your portfolio volume or specific API goals..."></textarea>
                       </div>

                       <button type="submit" className="w-full bg-[#00C853] text-white py-5 rounded-xl font-bold text-[17px] hover:bg-[#00a846] transition-all shadow-[0_15px_30px_-10px_rgba(0,200,83,0.4)] flex justify-center items-center gap-3 group mt-8">
                          Schedule Demo & Get Pricing
                          <span className="group-hover:translate-x-2 transition-transform">→</span>
                       </button>
                    </form>
                 </div>

                 {/* Right CTA / Secondary Actions */}
                 <div className="lg:col-span-2 bg-slate-50 border-l border-slate-100 p-10 lg:p-14 flex flex-col justify-center">
                    <div className="mb-12">
                       <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center text-[#00C853] border border-slate-100 mb-6 font-black text-2xl relative">
                          S
                          <span className="absolute top-0 right-0 w-3 h-3 bg-[#00C853] border-2 border-white rounded-full -mt-1 -mr-1 animate-pulse"></span>
                       </div>
                       <h3 className="text-2xl font-bold text-slate-900 tracking-tight leading-tight mb-4">Enterprise Implementation Hub</h3>
                       <p className="text-[15px] font-medium text-slate-500 leading-relaxed">Direct engineering support available to help seamlessly integrate the 8-Layer Statutory Exchange into your existing banking stack.</p>
                    </div>

                    <div className="space-y-5 mt-auto">
                       <a href="/download/brochure" className="block w-full bg-white border border-slate-200 text-slate-700 text-center px-6 py-4 rounded-xl font-bold text-[13px] uppercase tracking-widest hover:border-[#00C853] hover:text-[#00C853] transition-all shadow-sm">
                          Download Full Brochure
                       </a>
                       <a href="https://wa.me/233531102292" className="block w-full bg-slate-900 text-white text-center px-6 py-4 rounded-xl font-bold text-[13px] uppercase tracking-widest hover:bg-slate-800 transition-colors shadow-md flex justify-center items-center gap-2">
                          <span>Institutional Sales</span>
                          <span className="text-slate-500 mx-1">|</span>
                          <span className="text-[#00C853]">053 110 2292</span>
                       </a>
                    </div>
                 </div>

              </div>
           </div>
        </section>
      </main>

      <GlobalFooter />
      
      {/* Floating Enterprise Support Widget */}
      <a 
        href="https://wa.me/233531102292" 
        className="fixed bottom-10 right-10 z-[3000] bg-[#00C853] text-white p-4 md:p-5 rounded-full shadow-[0_20px_50px_rgba(0,200,83,0.4)] hover:scale-110 transition-all group flex items-center gap-3 border border-white/40 hover:animate-pulse"
        title="Contact Enterprise Support"
      >
        <span className="text-3xl group-hover:rotate-12 transition-transform">💬</span>
        <span className="text-xs font-bold uppercase tracking-widest hidden md:flex items-center gap-2">
          <span>053 110 2292</span>
          <span className="w-1.5 h-1.5 bg-white rounded-full animate-ping ml-1"></span>
        </span>
      </a>
    </div>
  );
};

export default InstitutionsPage;
