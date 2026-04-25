'use client';
import React, { useState } from 'react';
import GlobalHeader from '../../components/GlobalHeader';
import GlobalFooter from '../../components/GlobalFooter';

export default function PricingPage() {
  const [openFaq, setOpenFaq] = useState(null);
  const [isYearly, setIsYearly] = useState(true);

  const faqs = [
    {
      q: "What is included in Free vs Premium?",
      a: "The Free Explorer tier allows you to browse verified properties, bookmark favourites, and view estimated market valuations. Premium unlocks unlimited 8-Layer property verifications, automated rent/bank routing, and Priority Support."
    },
    {
      q: "Can I cancel my Premium subscription anytime?",
      a: "Yes. Syntry is designed without lock-in contracts for retail users. You can downgrade to the Free tier at the end of your billing cycle with zero penalty."
    },
    {
      q: "How does Enterprise pricing work?",
      a: "Enterprise licensing is custom-quoted based on your API volume and land bank size. It includes bulk algorithmic verification, dedicated account managers, and white-labeling options. Contact sales for a bespoke volume structure."
    },
    {
      q: "Are there any hidden setup fees?",
      a: "No. What you see is what you pay. There are zero hidden onboarding or setup fees for Retail and Premium packages. Enterprise custom integrations may include a one-time deployment cost discussed upfront."
    },
    {
      q: "What payment methods do you accept?",
      a: "We accept MTN Mobile Money, Vodafone Cash, Telecel Cash, and all major international Credit/Debit cards (Visa/Mastercard) via our secure Stripe and Paystack escrow gateways."
    },
    {
      q: "Is there a long-term contract?",
      a: "No. Premium and Escrow tools operate strictly on month-to-month or discounted annual billing. Only our Sovereign Node Enterprise partners sign structured Service Level Agreements (SLAs)."
    },
    {
      q: "How much does Syntry take from automated rent?",
      a: "If you utilize our Automated Escrow system, Syntry charges a flat 5% infrastructure processing fee. We directly deposit the remaining 95% into your designated local or international bank account."
    },
    {
      q: "Is my property data secure?",
      a: "Absolutely. All documents, titles, and banking records within the 8-Layer Grounded Truth system are cryptographically hashed and stored in secure AWS sovereign environments. We comply fully with Ghana Data Protection standards."
    },
    {
      q: "Do I pay extra when I sell my verified land?",
      a: "Listing your verified property is completely free. We only deduct a standard 1.5% escrow settlement fee upon successful digital closing of a sale to guarantee fund transit safety."
    }
  ];

  return (
    <div className="bg-white min-h-screen text-slate-900 font-sans">
      <GlobalHeader />

      <main className="pt-32 pb-20 overflow-hidden">
        
        {/* Pricing Hero */}
        <section className="px-4 md:px-8 max-w-7xl mx-auto mb-16 text-center">
          <div className="inline-flex items-center gap-2 bg-[#00C853]/10 px-4 py-2 rounded-full mb-8 border border-[#00C853]/20 shadow-sm">
            <span className="w-2 h-2 bg-[#00C853] rounded-full animate-pulse shadow-[0_0_8px_#00C853]"></span>
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#00C853]">Transparent Sovereign Index</span>
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-[4rem] font-black leading-[1.1] mb-6 tracking-tight text-slate-900">
            Simple, Transparent Pricing for<br className="hidden md:block" />
            <span className="text-[#00C853]">Confident Property Ownership</span>
          </h1>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto font-medium leading-relaxed mb-6">
            Start free. Scale with confidence. Enterprise solutions for institutions.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4 text-xs font-bold text-slate-400 uppercase tracking-widest mb-12">
            <span>✓ No hidden fees</span>
            <span className="hidden sm:block text-slate-300">•</span>
            <span>✓ Cancel anytime</span>
            <span className="hidden sm:block text-slate-300">•</span>
            <span>✓ Ghana’s most trusted verification layer</span>
          </div>

          {/* Pricing Toggle */}
          <div className="flex items-center justify-center gap-4">
             <span className={`text-sm font-bold transition-colors ${!isYearly ? 'text-slate-900' : 'text-slate-400'}`}>Monthly</span>
             <button 
               onClick={() => setIsYearly(!isYearly)} 
               className="w-16 h-8 bg-[#00C853] rounded-full p-1 relative transition-colors duration-300 shadow-inner"
             >
                <div className={`w-6 h-6 bg-white rounded-full shadow-sm transform transition-transform duration-300 ${isYearly ? 'translate-x-8' : 'translate-x-0'}`}></div>
             </button>
             <span className={`text-sm font-bold flex items-center gap-2 transition-colors ${isYearly ? 'text-slate-900' : 'text-slate-400'}`}>
               Yearly 
               <span className="bg-[#00C853]/10 text-[#00C853] text-[10px] px-2.5 py-1 rounded-md border border-[#00C853]/20 tracking-widest leading-none shadow-sm">SAVE 20%</span>
             </span>
          </div>
        </section>

        {/* Pricing Tiers Grid */}
        <section className="px-4 md:px-8 max-w-6xl mx-auto mb-20">
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
              
              {/* Free Tier */}
              <div className="bg-white border border-slate-200 p-10 rounded-[2.5rem] shadow-sm hover:border-[#00C853]/40 transition-colors flex flex-col h-full">
                 <h3 className="text-2xl font-bold text-slate-900 mb-2">Free</h3>
                 <p className="text-sm font-medium text-slate-500 mb-6 h-10">Best for: Individual owners just starting</p>
                 <div className="mb-8 border-b border-slate-100 pb-8">
                    <span className="text-5xl font-black text-slate-900">GH₵ 0</span>
                    <span className="text-slate-500 font-medium ml-2">/ month</span>
                 </div>
                 <ul className="space-y-4 mb-10 text-[15px] font-medium text-slate-700 flex-grow">
                    <li className="flex items-start gap-3"><span className="text-[#00C853] font-bold mt-0.5">✓</span> <span>Basic search</span></li>
                    <li className="flex items-start gap-3"><span className="text-[#00C853] font-bold mt-0.5">✓</span> <span>1 property verification</span></li>
                    <li className="flex items-start gap-3"><span className="text-[#00C853] font-bold mt-0.5">✓</span> <span>Limited marketplace access</span></li>
                 </ul>
                 <a href="/login?tab=signup" className="block w-full border-2 border-slate-200 text-slate-700 text-center py-4 rounded-xl font-bold text-lg hover:border-[#00C853] hover:text-[#00C853] transition-colors shadow-sm">Get Started Free</a>
              </div>

              {/* Premium Tier (Highlighted) */}
              <div className="bg-white border-2 border-[#00C853] p-10 rounded-[2.5rem] shadow-[0_20px_50px_-15px_rgba(0,200,83,0.15)] relative transform md:-translate-y-4 flex flex-col h-full z-10">
                 <div className="absolute top-0 left-1/2 -translate-x-1/2 -mt-4 bg-[#00C853] text-white px-5 py-1.5 rounded-full text-[11px] font-black uppercase tracking-widest shadow-lg">Most Popular</div>
                 
                 <h3 className="text-2xl font-bold text-slate-900 mb-2">Premium</h3>
                 <p className="text-sm font-medium text-slate-500 mb-6 h-10">Best for: Active owners & small investors</p>
                 <div className="mb-8 border-b border-slate-100 pb-8">
                    <span className="text-5xl font-black text-[#00C853]">GH₵ {isYearly ? '2,800' : '280'}</span>
                    <span className="text-slate-500 font-medium ml-2">/ {isYearly ? 'year' : 'month'}</span>
                 </div>
                 <ul className="space-y-4 mb-10 text-[15px] font-medium text-slate-700 flex-grow">
                    <li className="flex items-start gap-3"><span className="text-[#00C853] font-bold mt-0.5">✓</span> <span>Unlimited verifications</span></li>
                    <li className="flex items-start gap-3"><span className="text-[#00C853] font-bold mt-0.5">✓</span> <span>Full 8 Layers dashboard</span></li>
                    <li className="flex items-start gap-3"><span className="text-[#00C853] font-bold mt-0.5">✓</span> <span>Automated rent tracking</span></li>
                    <li className="flex items-start gap-3"><span className="text-[#00C853] font-bold mt-0.5">✓</span> <span>Real-time valuations</span></li>
                    <li className="flex items-start gap-3"><span className="text-[#00C853] font-bold mt-0.5">✓</span> <span>Priority support</span></li>
                    <li className="flex items-start gap-3"><span className="text-[#00C853] font-bold mt-0.5">✓</span> <span>Marketplace listing</span></li>
                 </ul>
                 <a href="/upgrade" className="block w-full bg-[#00C853] text-white text-center py-4 rounded-xl font-bold text-lg hover:bg-[#00a846] transition-colors relative shadow-[0_10px_20px_-10px_rgba(0,200,83,0.4)]">Upgrade to Premium</a>
              </div>

              {/* Enterprise Tier */}
              <div className="bg-slate-50 border border-slate-200 p-10 rounded-[2.5rem] shadow-sm hover:border-[#00C853]/40 transition-colors flex flex-col h-full">
                 <h3 className="text-2xl font-bold text-slate-900 mb-2">Enterprise</h3>
                 <p className="text-sm font-medium text-slate-500 mb-6 h-10">Best for: Banks, developers, funds, institutions</p>
                 <div className="mb-8 border-b border-slate-200 pb-8">
                    <span className="text-4xl font-black text-slate-900">Custom Pricing</span>
                 </div>
                 <ul className="space-y-4 mb-10 text-[15px] font-medium text-slate-700 flex-grow">
                    <li className="flex items-start gap-3"><span className="text-[#00C853] font-bold mt-0.5">✓</span> <span>Bulk verification API</span></li>
                    <li className="flex items-start gap-3"><span className="text-[#00C853] font-bold mt-0.5">✓</span> <span>White-label option</span></li>
                    <li className="flex items-start gap-3"><span className="text-[#00C853] font-bold mt-0.5">✓</span> <span>Dedicated account manager</span></li>
                    <li className="flex items-start gap-3"><span className="text-[#00C853] font-bold mt-0.5">✓</span> <span>SLA guarantees</span></li>
                    <li className="flex items-start gap-3"><span className="text-[#00C853] font-bold mt-0.5">✓</span> <span>Custom integrations</span></li>
                    <li className="flex items-start gap-3"><span className="text-[#00C853] font-bold mt-0.5">✓</span> <span>Portfolio management</span></li>
                 </ul>
                 <a href="/institutions" className="block w-full bg-slate-900 text-white text-center py-4 rounded-xl font-bold text-lg hover:bg-slate-800 transition-colors shadow-md">Contact Sales</a>
              </div>

           </div>
        </section>

        {/* Detailed Comparison Table */}
        <section className="px-4 md:px-8 max-w-6xl mx-auto mb-32">
           <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Compare All Features</h2>
           </div>
           
           <div className="bg-white border border-slate-200 rounded-[2rem] shadow-sm overflow-hidden overflow-x-auto">
              <table className="w-full text-left border-collapse">
                 <thead>
                    <tr className="bg-slate-50 border-b border-slate-200">
                       <th className="p-6 font-bold text-slate-900 w-1/3">Features</th>
                       <th className="p-6 font-bold text-slate-900 text-center w-2/9">Free</th>
                       <th className="p-6 font-bold text-[#00C853] text-center w-2/9">Premium</th>
                       <th className="p-6 font-bold text-slate-900 text-center w-2/9">Enterprise</th>
                    </tr>
                 </thead>
                 <tbody className="text-sm font-medium text-slate-600 divide-y divide-slate-100">
                    <tr className="hover:bg-slate-50 transition-colors">
                       <td className="p-6">Basic Property Search</td>
                       <td className="p-6 text-center text-[#00C853] font-bold">✓</td>
                       <td className="p-6 text-center text-[#00C853] font-bold">✓</td>
                       <td className="p-6 text-center text-[#00C853] font-bold">✓</td>
                    </tr>
                    <tr className="hover:bg-slate-50 transition-colors">
                       <td className="p-6">Property Verifications</td>
                       <td className="p-6 text-center text-slate-500">1 Property</td>
                       <td className="p-6 text-center text-slate-900 font-bold">Unlimited</td>
                       <td className="p-6 text-center text-slate-900 font-bold">Bulk API</td>
                    </tr>
                    <tr className="hover:bg-slate-50 transition-colors">
                       <td className="p-6">Marketplace Access</td>
                       <td className="p-6 text-center text-slate-500">Limited</td>
                       <td className="p-6 text-center text-[#00C853] font-bold">✓</td>
                       <td className="p-6 text-center text-[#00C853] font-bold">✓</td>
                    </tr>
                    <tr className="hover:bg-slate-50 transition-colors">
                       <td className="p-6">8 Layers Status Dashboard</td>
                       <td className="p-6 text-center text-slate-300">-</td>
                       <td className="p-6 text-center text-[#00C853] font-bold">✓</td>
                       <td className="p-6 text-center text-[#00C853] font-bold">✓</td>
                    </tr>
                    <tr className="hover:bg-slate-50 transition-colors">
                       <td className="p-6">Automated Rent Tracking</td>
                       <td className="p-6 text-center text-slate-300">-</td>
                       <td className="p-6 text-center text-[#00C853] font-bold">✓</td>
                       <td className="p-6 text-center text-[#00C853] font-bold">✓</td>
                    </tr>
                    <tr className="hover:bg-slate-50 transition-colors">
                       <td className="p-6">Real-Time Valuations</td>
                       <td className="p-6 text-center text-slate-300">-</td>
                       <td className="p-6 text-center text-[#00C853] font-bold">✓</td>
                       <td className="p-6 text-center text-[#00C853] font-bold">✓</td>
                    </tr>
                    <tr className="hover:bg-slate-50 transition-colors">
                       <td className="p-6">API & Custom Integrations</td>
                       <td className="p-6 text-center text-slate-300">-</td>
                       <td className="p-6 text-center text-slate-300">-</td>
                       <td className="p-6 text-center text-[#00C853] font-bold">✓</td>
                    </tr>
                    <tr className="hover:bg-slate-50 transition-colors">
                       <td className="p-6">White-Label Options</td>
                       <td className="p-6 text-center text-slate-300">-</td>
                       <td className="p-6 text-center text-slate-300">-</td>
                       <td className="p-6 text-center text-[#00C853] font-bold">✓</td>
                    </tr>
                    <tr className="hover:bg-slate-50 transition-colors">
                       <td className="p-6">Support SLA Guarantee</td>
                       <td className="p-6 text-center text-slate-500">Community</td>
                       <td className="p-6 text-center text-slate-900 font-bold">Priority</td>
                       <td className="p-6 text-center text-[#00C853] font-bold">Dedicated Manager</td>
                    </tr>
                 </tbody>
              </table>
           </div>
        </section>

        {/* Value & Trust Bar Section */}
        <section className="px-4 md:px-8 max-w-7xl mx-auto mb-32 border-y border-slate-200 py-24 bg-slate-50/50 rounded-bl-[4rem] rounded-tr-[4rem]">
           <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold text-slate-900 tracking-tight mb-4">Why Syntry is Worth Every Cedi</h2>
              <p className="text-lg text-slate-500 font-medium">Paying for grounded certainty saves you millions in litigation and lost rent.</p>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20 max-w-6xl mx-auto">
              <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 hover:border-[#00C853]/30 transition-colors">
                 <div className="w-12 h-12 bg-[#00C853]/10 text-[#00C853] rounded-2xl flex items-center justify-center text-2xl mb-6">🛡️</div>
                 <h4 className="font-bold text-slate-900 mb-2">Save 10x on Disputes</h4>
                 <p className="text-sm text-slate-500 font-medium">Traditional litigation costs average GH₵35k. The 8-layer audit prevents claims before they happen.</p>
              </div>
              <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 hover:border-[#00C853]/30 transition-colors">
                 <div className="w-12 h-12 bg-[#00C853]/10 text-[#00C853] rounded-2xl flex items-center justify-center text-2xl mb-6">💰</div>
                 <h4 className="font-bold text-slate-900 mb-2">Maximize Monthly Rent</h4>
                 <p className="text-sm text-slate-500 font-medium">Automated MoMo collections increase tenant payment consistency by over 80% across our portfolio.</p>
              </div>
              <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 hover:border-[#00C853]/30 transition-colors">
                 <div className="w-12 h-12 bg-[#00C853]/10 text-[#00C853] rounded-2xl flex items-center justify-center text-2xl mb-6">⚡</div>
                 <h4 className="font-bold text-slate-900 mb-2">Instant Mortgage APY</h4>
                 <p className="text-sm text-slate-500 font-medium">Buyers get fast-tracked by institutions. Syntry verified assets sell 3x faster than market average.</p>
              </div>
              <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 hover:border-[#00C853]/30 transition-colors">
                 <div className="w-12 h-12 bg-[#00C853]/10 text-[#00C853] rounded-2xl flex items-center justify-center text-2xl mb-6">🌍</div>
                 <h4 className="font-bold text-slate-900 mb-2">Zero Travel Costs</h4>
                 <p className="text-sm text-slate-500 font-medium">Diaspora owners save thousands on flights trying to physically monitor their real estate assets.</p>
              </div>
           </div>

           {/* Testimonials */}
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20 max-w-5xl mx-auto">
              <div className="bg-white border-l-[6px] border-[#00C853] p-10 rounded-2xl shadow-[0_10px_30px_-15px_rgba(0,0,0,0.05)] border-y border-r border-slate-100">
                 <p className="text-slate-600 font-medium italic mb-8 leading-relaxed text-lg">"Upgrading to Syntry Premium was the best GH₵280 I spend every month. It automated my rent collection from 4 properties in Osu straight into my bank."</p>
                 <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center font-bold text-slate-600 text-lg">KM</div>
                    <div>
                       <p className="font-bold text-slate-900">Kwame Mensah</p>
                       <p className="text-sm text-slate-500">Retail Landlord, Accra</p>
                    </div>
                 </div>
              </div>
              <div className="bg-slate-900 border-l-[6px] border-slate-700 p-10 rounded-2xl shadow-[0_15px_30px_-15px_rgba(0,0,0,0.15)] relative overflow-hidden">
                 <div className="absolute top-0 right-0 w-32 h-32 bg-[#00C853]/10 rounded-bl-full -mr-10 -mt-10"></div>
                 <p className="text-slate-300 font-medium italic mb-8 leading-relaxed text-lg relative z-10">"The Custom Enterprise API allowed us to compress our collateral audit timeline from 2 weeks to 4 seconds. The ROI on this software is staggering."</p>
                 <div className="flex items-center gap-4 relative z-10">
                    <div className="w-12 h-12 bg-[#00C853]/20 rounded-full flex items-center justify-center font-bold text-[#00C853] text-lg">SB</div>
                    <div>
                       <p className="font-bold text-white">Stanbic Asset Management</p>
                       <p className="text-sm text-slate-400">Institutional Partner</p>
                    </div>
                 </div>
              </div>
           </div>

           {/* Metrics Bar */}
           <div className="bg-white border border-slate-200 rounded-2xl md:rounded-full py-8 md:py-6 px-6 md:px-10 flex flex-col md:flex-row flex-wrap justify-center items-center gap-6 md:gap-12 shadow-sm max-w-5xl mx-auto">
              <div className="flex items-center gap-3">
                 <div className="w-6 h-6 bg-[#00C853]/10 rounded-full flex items-center justify-center text-[10px] text-[#00C853] font-bold">✓</div>
                 <span className="font-bold text-slate-900 text-sm uppercase tracking-wider">Used by 200+ owners</span>
              </div>
               <div className="hidden md:block w-px h-6 bg-slate-200"></div>
              <div className="flex items-center gap-3">
                 <div className="w-6 h-6 bg-[#00C853]/10 rounded-full flex items-center justify-center text-[10px] text-[#00C853] font-bold">✓</div>
                 <span className="font-bold text-slate-900 text-sm uppercase tracking-wider">12 Institutions</span>
              </div>
              <div className="hidden md:block w-px h-6 bg-slate-200"></div>
              <div className="flex items-center gap-3">
                 <div className="w-6 h-6 bg-[#00C853]/10 rounded-full flex items-center justify-center text-[10px] text-[#00C853] font-bold">✓</div>
                 <span className="font-bold text-slate-900 text-sm uppercase tracking-wider">GH₵102M+ Verified Assets</span>
              </div>
              <div className="hidden md:block w-px h-6 bg-slate-200"></div>
              <div className="flex items-center gap-3">
                 <div className="w-6 h-6 bg-[#00C853]/10 rounded-full flex items-center justify-center text-[10px] text-[#00C853] font-bold">✓</div>
                 <span className="font-bold text-slate-900 text-sm uppercase tracking-wider">0.00% Litigation</span>
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
                <div key={index} className="bg-white border border-slate-200 rounded-2xl overflow-hidden transition-all hover:border-[#00C853]/40 shadow-sm">
                  <button 
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    className="w-full text-left px-8 py-6 flex justify-between items-center focus:outline-none focus:bg-slate-50 transition-colors"
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

        {/* Final Closing Action */}
        <section className="px-4 md:px-8 max-w-5xl mx-auto mb-10 text-center mt-20">
           <div className="bg-[#00C853] text-white p-12 md:p-20 rounded-[3rem] shadow-[0_30px_60px_-15px_rgba(0,200,83,0.3)] relative overflow-hidden group hover:shadow-[0_40px_70px_-15px_rgba(0,200,83,0.4)] transition-shadow duration-500">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-20 -mt-20 group-hover:scale-150 transition-transform duration-700"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full blur-3xl -ml-20 -mb-20"></div>
              
              <div className="relative z-10 w-full">
                 <span className="inline-flex items-center gap-2 bg-white/20 text-white font-bold text-[11px] uppercase tracking-widest px-4 py-2 rounded-lg mb-8 border border-white/30 shadow-sm backdrop-blur-sm mx-auto">
                    <span className="text-sm">🔒</span> 30-Day Risk-Free Guarantee
                 </span>
                 <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 tracking-tight leading-tight max-w-3xl mx-auto">Ready for Confident Property Ownership?</h2>
                 <p className="text-lg md:text-xl font-medium mb-12 opacity-90 max-w-2xl mx-auto leading-relaxed">
                    Join hundreds of local owners, diaspora investors, and institutions securing their legacies on the Syntry protocol.
                 </p>
                 
                 <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-2xl mx-auto">
                    <a href="/login?tab=signup" className="w-full sm:w-auto bg-white text-[#00C853] px-10 py-5 rounded-2xl font-bold text-[17px] hover:bg-slate-50 transition-all shadow-xl hover:-translate-y-1 block md:inline-block">
                       Start Free Today
                    </a>
                    <a href="https://wa.me/233531102292" className="w-full sm:w-auto bg-black/20 backdrop-blur-md border border-white/20 text-white px-8 py-5 rounded-2xl font-bold text-[17px] hover:bg-black/30 transition-all hover:-translate-y-1 flex items-center justify-center gap-3">
                       Talk to Sales <span className="opacity-50">|</span> 053 110 2292
                    </a>
                 </div>
                 
                 <p className="mt-10 text-sm font-medium opacity-80 flex items-center justify-center gap-2">
                    <span className="w-1.5 h-1.5 bg-white rounded-full"></span> Trusted by 200+ Ghanaian owners and major institutional funds.
                 </p>
              </div>
           </div>
        </section>

      </main>

      <GlobalFooter />
    </div>
  );
}
