import React from 'react';
import Link from 'next/link';

export default function SyntryHomepage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans selection:bg-[#0D9488] selection:text-white">
      {/* 1. Top Navigation Bar */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center">
              <Link href="/" className="text-2xl font-medium tracking-tight tracking-tighter text-slate-900 flex items-center gap-2">
                <div className="w-8 h-8 rounded bg-[#0D9488] flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
                </div>
                Syntry
              </Link>
            </div>
            <div className="hidden md:flex space-x-8">
              <Link href="/marketplace" className="text-sm font-semibold text-slate-600 hover:text-[#0D9488] transition-colors">Marketplace</Link>
              <Link href="/how-it-works" className="text-sm font-semibold text-slate-600 hover:text-[#0D9488] transition-colors">How It Works</Link>
              <Link href="/owners" className="text-sm font-semibold text-slate-600 hover:text-[#0D9488] transition-colors">For Owners</Link>
              <Link href="/diaspora" className="text-sm font-semibold text-slate-600 hover:text-[#0D9488] transition-colors">For Diaspora</Link>
              <Link href="/institutions" className="text-sm font-semibold text-slate-600 hover:text-[#0D9488] transition-colors">Institutions</Link>
              <Link href="/pricing" className="text-sm font-semibold text-slate-600 hover:text-[#0D9488] transition-colors">Pricing</Link>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/login" className="hidden md:inline-flex text-sm font-medium text-slate-700 hover:text-slate-900">Login</Link>
              <Link href="/register" className="bg-[#0D9488] hover:bg-[#00A040] text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-transform hover:scale-105 shadow-lg shadow-green-500/20">
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* 2. Powerful Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden bg-white">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-5"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-white/80 to-white"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-7xl font-medium tracking-tight tracking-tight text-slate-900 mb-6 leading-tight">
            Own Ghanaian Property <br className="hidden md:block" />
            <span className="text-[#0D9488]">With Total Confidence.</span>
          </h1>
          <p className="mt-4 text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto font-medium mb-10">
            8 Layers of Grounded Truth • Zero Litigation • Automated Rent & Fractional Ownership
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/marketplace" className="bg-[#0D9488] hover:bg-[#00A040] text-white px-8 py-4 rounded-xl text-lg font-medium transition-all shadow-xl shadow-green-500/30 hover:-translate-y-1">
              Browse Verified Properties
            </Link>
            <Link href="/verify-land-now" className="bg-white border-2 border-slate-200 hover:border-slate-300 text-slate-800 px-8 py-4 rounded-xl text-lg font-medium transition-all shadow-sm hover:-translate-y-1">
              Check My Property Free
            </Link>
          </div>
          
          <div className="mt-16 pt-8 border-t border-slate-100 flex flex-wrap justify-center items-center gap-8 text-sm font-medium text-slate-500">
            <span className="flex items-center gap-2">
              <svg className="w-5 h-5 text-[#0D9488]" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
              0.00% Litigation
            </span>
            <span className="flex items-center gap-2">
              <svg className="w-5 h-5 text-[#0D9488]" fill="currentColor" viewBox="0 0 20 20"><path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" /></svg>
              Trusted by Diaspora & Local Investors
            </span>
            <span className="flex items-center gap-2">
              <svg className="w-5 h-5 text-[#0D9488]" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" /></svg>
              Secured by AWS & Blockchain
            </span>
          </div>
        </div>
      </section>

      {/* 3. 8 Layers of Grounded Truth */}
      <section className="py-24 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-medium tracking-tight text-slate-900 mb-4">The Syntry Standard: 8 Layers of Truth</h2>
            <p className="text-lg text-slate-600">We don't just list properties. Every asset undergoes military-grade vetting to guarantee absolute ownership and zero encumbrances.</p>
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
              { title: "Blockchain Immutable Record", desc: "Final verification state is hashed to Solana for permanent, tamper-proof proof." }
            ].map((layer, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-16 h-16 bg-[#0D9488]/5 rounded-bl-full -z-0 group-hover:scale-150 transition-transform"></div>
                <div className="w-10 h-10 bg-[#0D9488]/10 text-[#0D9488] rounded-lg flex items-center justify-center font-medium tracking-tight text-xl mb-4 relative z-10">
                  {i + 1}
                </div>
                <h3 className="text-lg font-medium text-slate-900 mb-2 relative z-10">{layer.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed relative z-10">{layer.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Additional mature sections - Why Syntry */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <div className="lg:w-1/2">
              <h2 className="text-3xl md:text-4xl font-medium tracking-tight text-slate-900 mb-6">Why High-Net-Worth Individuals Choose Syntry</h2>
              <p className="text-lg text-slate-600 mb-8">We eliminated the anxiety, the middlemen, and the fraud from the Ghanaian real estate market. Welcome to institutional-grade property acquisition.</p>
              
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-[#0D9488]/10 rounded-xl flex items-center justify-center text-[#0D9488]">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                  </div>
                  <div>
                    <h4 className="text-xl font-medium text-slate-900">Bank-Grade Escrow Engine</h4>
                    <p className="text-slate-600 mt-1">Your funds are locked in secure escrow and only released when the title officially transfers to your name.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-[#0D9488]/10 rounded-xl flex items-center justify-center text-[#0D9488]">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  </div>
                  <div>
                    <h4 className="text-xl font-medium text-slate-900">100% Diaspora Friendly</h4>
                    <p className="text-slate-600 mt-1">Buy, manage, and earn rental yields entirely remotely from the US, UK, or anywhere in the world.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-[#0D9488]/10 rounded-xl flex items-center justify-center text-[#0D9488]">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
                  </div>
                  <div>
                    <h4 className="text-xl font-medium text-slate-900">Automated Yield Generation</h4>
                    <p className="text-slate-600 mt-1">Purchase fractional ownership in premium developments and receive rental payouts directly to your wallet.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:w-1/2">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img src="https://images.unsplash.com/photo-1613490900233-141c5560d75d?auto=format&fit=crop&q=80&w=800" alt="Modern African Real Estate" className="w-full h-[500px] object-cover" />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-slate-900/90 to-transparent p-8 pt-32">
                  <div className="bg-[#0D9488] text-white text-xs font-medium px-3 py-1 rounded-full inline-block mb-3 uppercase tracking-wider">Fully Verified</div>
                  <h3 className="text-white text-2xl font-medium">Cantonments Luxury Villas</h3>
                  <p className="text-slate-200 mt-1">Generating 12% Annual Yield</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Featured Verified Properties */}
      <section className="py-24 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-medium tracking-tight text-slate-900">Featured Verified Assets</h2>
              <p className="text-slate-600 mt-2">Premium properties cleared by the Syntry Protocol.</p>
            </div>
            <Link href="/marketplace" className="hidden sm:inline-flex items-center gap-2 text-[#0D9488] font-medium hover:text-[#00A040]">
              View All Assets <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { img: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=600", title: "Airport Residential Estate", price: "$450,000", type: "Full Ownership", yield: "8.5%" },
              { img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=600", title: "East Legon Commercial Plot", price: "$220,000", type: "Land Asset", yield: "N/A" },
              { img: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80&w=600", title: "Osu Premium Apartments", price: "$1,200 / share", type: "Fractional", yield: "11.2%" }
            ].map((prop, i) => (
              <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-xl transition-all group">
                <div className="relative h-64 overflow-hidden">
                  <img src={prop.img} alt={prop.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur text-slate-900 text-xs font-medium px-3 py-1.5 rounded-lg flex items-center gap-1 shadow-sm">
                    <svg className="w-4 h-4 text-[#0D9488]" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                    Syntry Verified
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-medium text-slate-900">{prop.title}</h3>
                  </div>
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-2xl font-medium tracking-tight text-[#0D9488]">{prop.price}</span>
                    <span className="text-sm font-semibold text-slate-500 bg-slate-100 px-2 py-1 rounded">{prop.type}</span>
                  </div>
                  <div className="flex justify-between items-center border-t border-slate-100 pt-4">
                    <div className="text-sm text-slate-600">Expected Yield: <strong className="text-slate-900">{prop.yield}</strong></div>
                    <button className="text-slate-900 font-medium hover:text-[#0D9488] text-sm">View Asset &rarr;</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Testimonials */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-medium tracking-tight text-slate-900 mb-16">Trusted by the Global Diaspora</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { text: "Syntry gave me the confidence to finally invest back home from London. The escrow system and the 8 Layers of Truth are game changers. I bought my first plot without a single flight.", author: "Kwame A.", role: "Diaspora Investor, UK" },
              { text: "As a developer, getting our properties Syntry-verified means we sell 3x faster. Buyers trust the protocol. It is exactly what the African real estate market needed.", author: "Sarah M.", role: "Property Developer, Accra" },
              { text: "The fractional ownership model allowed me to buy into premium real estate in Cantonments for just $5,000. My rental yields arrive directly in my account.", author: "David T.", role: "Tech Professional, USA" }
            ].map((test, i) => (
              <div key={i} className="p-8 bg-[#F8FAFC] rounded-2xl text-left border border-slate-100">
                <div className="flex text-[#0D9488] mb-4">
                  {[...Array(5)].map((_, j) => (
                    <svg key={j} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                  ))}
                </div>
                <p className="text-slate-700 font-medium mb-6 leading-relaxed">"{test.text}"</p>
                <div>
                  <h4 className="font-medium text-slate-900">{test.author}</h4>
                  <p className="text-xs text-slate-500">{test.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Final CTA */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-slate-900"></div>
        <div className="absolute inset-0 bg-[#0D9488]/10"></div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-medium tracking-tight text-white mb-6">Ready to Build Your African Portfolio?</h2>
          <p className="text-xl text-slate-300 mb-10">Join thousands of smart investors using the Syntry Protocol to securely acquire and manage premium Ghanaian real estate.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/register" className="bg-[#0D9488] hover:bg-[#00A040] text-white px-8 py-4 rounded-xl text-lg font-medium transition-all shadow-xl hover:-translate-y-1">
              Create Free Account
            </Link>
            <Link href="/owners" className="bg-white/10 hover:bg-white/20 text-white border border-white/30 px-8 py-4 rounded-xl text-lg font-medium transition-all">
              I'm a Property Owner
            </Link>
          </div>
        </div>
      </section>

      {/* 8. Footer */}
      <footer className="bg-slate-950 text-slate-400 py-12 border-t border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="text-2xl font-medium tracking-tight tracking-tighter text-white flex items-center gap-2 mb-4">
                <div className="w-6 h-6 rounded bg-[#0D9488] flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
                </div>
                Syntry
              </div>
              <p className="text-sm">The Sovereign Real Estate Protocol for Africa. Ensuring trust, liquidity, and security.</p>
            </div>
            <div>
              <h4 className="text-white font-medium mb-4">Platform</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/marketplace" className="hover:text-[#0D9488]">Marketplace</Link></li>
                <li><Link href="/how-it-works" className="hover:text-[#0D9488]">How It Works</Link></li>
                <li><Link href="/pricing" className="hover:text-[#0D9488]">Pricing</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-medium mb-4">Solutions</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/diaspora" className="hover:text-[#0D9488]">For Diaspora</Link></li>
                <li><Link href="/owners" className="hover:text-[#0D9488]">For Owners</Link></li>
                <li><Link href="/institutions" className="hover:text-[#0D9488]">For Institutions</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-medium mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/privacy" className="hover:text-[#0D9488]">Privacy Policy</Link></li>
                <li><Link href="/terms" className="hover:text-[#0D9488]">Terms of Service</Link></li>
                <li><Link href="/security" className="hover:text-[#0D9488]">Security Protocol</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm">
            <p>&copy; {new Date().getFullYear()} Syntry Protocol. All rights reserved.</p>
            <div className="flex gap-4 mt-4 md:mt-0">
              <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-[#0D9488]"></div> System Operational</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
