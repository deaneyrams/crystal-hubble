import React from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
const GlobalHeader = dynamic(() => import('@/components/GlobalHeader'), { ssr: false });
const GlobalFooter = dynamic(() => import('@/components/GlobalFooter'), { ssr: false });

export default function SyntryHomepage() {
  return (
    <div className="min-h-screen bg-syntry-obsidian text-syntry-slate-300 font-sans selection:bg-syntry-teal-600 selection:text-white">
      <GlobalHeader />
      
      {/* 2. Powerful Hero Section */}
      <section className="relative pt-40 pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-10"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-syntry-obsidian/80 to-syntry-obsidian"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-7xl font-medium tracking-tight text-white mb-6 leading-tight">
            Own Ghanaian Property <br className="hidden md:block" />
            <span className="text-syntry-teal-600">With Total Confidence.</span>
          </h1>
          <p className="mt-4 text-xl md:text-2xl text-syntry-slate-300 max-w-3xl mx-auto font-medium mb-10">
            8 Layers of Grounded Truth • Zero Litigation • Automated Rent & Fractional Ownership
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/marketplace" className="bg-gradient-to-r from-syntry-teal-600 to-syntry-teal-700 text-white px-8 py-4 rounded-md font-medium uppercase tracking-widest text-sm shadow-xl hover:opacity-90 transition-all">
              Browse Verified Properties
            </Link>
            <Link href="/verify-land-now" className="bg-white/5 border border-syntry-slate-200/10 text-white px-8 py-4 rounded-md font-medium uppercase tracking-widest text-sm transition-all hover:bg-white/10">
              Check My Property Free
            </Link>
          </div>
          
          <div className="mt-16 pt-8 border-t border-white/5 flex flex-wrap justify-center items-center gap-8 text-[10px] font-medium uppercase tracking-widest text-syntry-slate-300/50">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 bg-syntry-teal-600 rounded-md"></span>
              0.00% Litigation
            </span>
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 bg-syntry-teal-600 rounded-md"></span>
              Trusted by Diaspora & Local Investors
            </span>
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 bg-syntry-teal-600 rounded-md"></span>
              Secured by Syntry Protocol
            </span>
          </div>
        </div>
      </section>

      {/* 3. 8 Layers of Grounded Truth */}
      <section className="py-24 bg-black/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-medium tracking-tight text-white mb-4">The Syntry Standard: 8 Layers of Truth</h2>
            <p className="text-lg text-syntry-slate-300">We don't just list properties. Every asset undergoes military-grade vetting to guarantee absolute ownership.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Geospatial Boundary Audit", desc: "Drone and satellite verification of exact coordinates and physical borders." },
              { title: "Lands Commission Sync", desc: "Direct API integration with the state registry to confirm root title." },
              { title: "Litigation & Dispute Check", desc: "Court records and local municipal scans to ensure zero pending cases." },
              { title: "Chief/Stool Affirmation", desc: "Cryptographic sign-offs from traditional authorities where applicable." },
              { title: "Structural Integrity Scan", desc: "Engineering reports for built properties to guarantee structural safety." },
              { title: "Biometric Vendor KYC", desc: "Facial and ID verification of the seller to eliminate impersonation." },
              { title: "Financial Encumbrance", desc: "Checking mortgages, liens, or unpaid property taxes before listing." },
              { title: "Blockchain Immutable Record", desc: "Final verification state is hashed to Syntry Core for tamper-proof proof." }
            ].map((layer, i) => (
              <div key={i} className="bg-white/5 p-6 rounded-md border border-white/10 shadow-sm hover:border-syntry-teal-600/50 transition-all group">
                <div className="w-10 h-10 bg-syntry-teal-600/10 text-syntry-teal-600 rounded-md flex items-center justify-center font-medium text-xl mb-4">
                  {i + 1}
                </div>
                <h3 className="text-lg font-medium text-white mb-2">{layer.title}</h3>
                <p className="text-sm text-syntry-slate-300/70 leading-relaxed">{layer.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Additional mature sections - Why Syntry */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <div className="lg:w-1/2">
              <h2 className="text-3xl md:text-4xl font-medium tracking-tight text-white mb-6">Why High-Net-Worth Individuals Choose Syntry</h2>
              <p className="text-lg text-syntry-slate-300 mb-8">We eliminated the anxiety, the middlemen, and the fraud. Welcome to institutional-grade property acquisition.</p>
              
              <div className="space-y-6">
                {[
                  { title: "Bank-Grade Escrow Engine", desc: "Funds are locked in secure escrow and only released upon official title transfer." },
                  { title: "100% Diaspora Friendly", desc: "Buy, manage, and earn rental yields entirely remotely from anywhere in the world." },
                  { title: "Automated Yield Generation", desc: "Purchase fractional ownership and receive rental payouts directly to your wallet." }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-syntry-teal-600/10 rounded-md flex items-center justify-center text-syntry-teal-600 border border-syntry-teal-600/20">
                      <span className="text-xl">🛡️</span>
                    </div>
                    <div>
                      <h4 className="text-xl font-medium text-white">{item.title}</h4>
                      <p className="text-syntry-slate-300/70 mt-1">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="lg:w-1/2">
              <div className="relative rounded-md overflow-hidden shadow-2xl border border-white/10">
                <img src="https://images.unsplash.com/photo-1613490900233-141c5560d75d?auto=format&fit=crop&q=80&w=800" alt="Modern African Real Estate" className="w-full h-[500px] object-cover opacity-80" />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-syntry-obsidian to-transparent p-8 pt-32">
                  <div className="bg-syntry-teal-600 text-white text-[10px] font-medium px-3 py-1 rounded-md inline-block mb-3 uppercase tracking-widest">Fully Verified</div>
                  <h3 className="text-white text-2xl font-medium">Cantonments Luxury Villas</h3>
                  <p className="text-syntry-slate-300 mt-1 font-medium tracking-tight uppercase text-xs">Generating 12% Annual Yield</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Featured Verified Properties */}
      <section className="py-24 bg-black/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-medium tracking-tight text-white">Featured Verified Assets</h2>
              <p className="text-syntry-slate-300 mt-2">Premium properties cleared by the Syntry Protocol.</p>
            </div>
            <Link href="/marketplace" className="hidden sm:inline-flex items-center gap-2 text-syntry-teal-600 font-medium hover:opacity-80">
              View All Assets &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { img: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=600", title: "Airport Residential Estate", price: "$450,000", type: "Full Ownership", yield: "8.5%" },
              { img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=600", title: "East Legon Commercial Plot", price: "$220,000", type: "Land Asset", yield: "N/A" },
              { img: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80&w=600", title: "Osu Premium Apartments", price: "$1,200 / share", type: "Fractional", yield: "11.2%" }
            ].map((prop, i) => (
              <div key={i} className="bg-white/5 rounded-md overflow-hidden shadow-sm border border-white/10 hover:border-syntry-teal-600/50 transition-all group">
                <div className="relative h-64 overflow-hidden">
                  <img src={prop.img} alt={prop.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80" />
                  <div className="absolute top-4 left-4 bg-syntry-obsidian/90 backdrop-blur text-white text-[10px] font-medium px-3 py-1.5 rounded-md flex items-center gap-2 border border-white/10 shadow-sm uppercase tracking-widest">
                    <span className="w-2 h-2 bg-syntry-teal-600 rounded-md"></span>
                    Syntry Verified
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-medium text-white">{prop.title}</h3>
                  </div>
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-2xl font-medium tracking-tight text-syntry-teal-600">{prop.price}</span>
                    <span className="text-[10px] font-medium text-white/40 bg-white/5 border border-white/10 px-2 py-1 rounded-md uppercase tracking-widest">{prop.type}</span>
                  </div>
                  <div className="flex justify-between items-center border-t border-white/5 pt-4">
                    <div className="text-xs text-syntry-slate-300/60 uppercase tracking-widest">Expected Yield: <strong className="text-white">{prop.yield}</strong></div>
                    <button className="text-white font-medium hover:text-syntry-teal-600 text-sm">View Asset &rarr;</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-syntry-teal-600 to-syntry-teal-700 opacity-10"></div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-medium tracking-tight text-white mb-6">Ready to Build Your African Portfolio?</h2>
          <p className="text-xl text-syntry-slate-300 mb-10">Join thousands of smart investors using the Syntry Protocol to securely acquire and manage premium Ghanaian real estate.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/register" className="bg-gradient-to-r from-syntry-teal-600 to-syntry-teal-700 text-white px-8 py-4 rounded-md font-medium uppercase tracking-widest text-sm shadow-xl hover:opacity-90 transition-all">
              Create Free Account
            </Link>
            <Link href="/owners" className="bg-white/5 border border-white/10 text-white px-8 py-4 rounded-md font-medium uppercase tracking-widest text-sm transition-all hover:bg-white/10">
              I'm a Property Owner
            </Link>
          </div>
        </div>
      </section>

      <GlobalFooter />
    </div>
  );
}
