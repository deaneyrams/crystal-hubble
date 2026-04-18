"use client";
import React from 'react';
import GlobalHeader from '../../../components/GlobalHeader';
import GlobalFooter from '../../../components/GlobalFooter';

const ApiDocsPage = () => {
  const endpoints = [
    { method: "GET", path: "/properties/verified", desc: "Retrieve a list of all 8-Layer verified properties." },
    { method: "POST", path: "/buyer/pre-approval", desc: "Submit buyer data for sovereign p準qualification." },
    { method: "GET", path: "/properties/{id}/8-layers", desc: "Get detailed validation status across all 8 technical layers." },
    { method: "POST", path: "/escrow/create", desc: "Initialize a secure GHS/USD reservation on Syntry territory." },
    { method: "GET", path: "/mortgage/eligibility", desc: "Calculate buyer eligibility based on sovereign DTI metrics." }
  ];

  const codeExample = `
// Example: Requesting 8-Layer Status
const response = await fetch('https://api.syntry.co/v1/properties/82/8-layers', {
  method: 'GET',
  headers: {
    'Authorization': 'Bearer YOUR_INSTITUTIONAL_KEY',
    'Content-Type': 'application/json'
  }
});

const data = await response.json();
console.log(data.status); // Output: "Verified Sovereign"
  `;

  return (
    <div className="bg-[#0a0a0a] min-h-screen text-[#F8F1E3] font-sans">
      <GlobalHeader dark />

      <main className="pt-32 pb-20 px-4 md:px-8 max-w-7xl mx-auto">
        {/* Dark Mode Header */}
        <section className="mb-16 border-b border-white/10 pb-16">
          <div className="flex items-center gap-2 mb-4">
            <span className="bg-[#D4AF37]/20 text-[#D4AF37] px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">Institutional SDK</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight text-white">API Documentation</h1>
          <p className="text-xl opacity-60 max-w-2xl leading-relaxed">
            Access verified land data, mortgage status, and 8-Layer validation matrix through our secure sovereign API.
          </p>
        </section>

        {/* Auth & Setup */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
          <div className="bg-white/5 border border-white/10 p-10 rounded-3xl">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
              <span className="text-[#D4AF37]">🔑</span> Authentication
            </h3>
            <p className="text-sm opacity-60 mb-8 leading-relaxed">
              Syntry uses API Keys and OAuth2 for secure institutional access. Partner banks can request keys through their portal dashboard.
            </p>
            <div className="bg-black/50 p-4 rounded-lg font-mono text-xs border border-white/10 mb-6">
              Authorization: Bearer YOUR_API_KEY
            </div>
            <button className="text-[#00BFFF] text-xs font-bold uppercase tracking-widest hover:underline">Manage Keys in Portal ↗</button>
          </div>
          
          <div className="bg-white/5 border border-white/10 p-10 rounded-3xl">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
              <span className="text-[#1D9E75]">⚡</span> Quick Setup
            </h3>
            <p className="text-sm opacity-60 mb-8 leading-relaxed">
              Integrate the Syntry 8-Layer validation matrix directly into your bank's internal underwriting platform.
            </p>
            <button className="bg-[#D4AF37] text-[#003300] px-8 py-3 rounded-xl font-bold text-xs hover:scale-105 transition-all">
              Download Postman Collection
            </button>
          </div>
        </section>

        {/* Endpoints */}
        <section className="mb-20">
          <h2 className="text-2xl font-bold mb-10">Main Endpoints</h2>
          <div className="space-y-4">
            {endpoints.map((ep, i) => (
              <div key={i} className="bg-white/5 border border-white/10 p-6 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6 hover:bg-white/[0.08] transition-all group">
                <div className="flex items-center gap-6 w-full md:w-1/2">
                   <span className={`px-4 py-1.5 rounded-lg font-bold text-[10px] tracking-widest ${ep.method === 'GET' ? 'bg-[#1D9E75]/20 text-[#1D9E75]' : 'bg-[#D4AF37]/20 text-[#D4AF37]'}`}>
                     {ep.method}
                   </span>
                   <code className="text-sm font-mono text-white/80">{ep.path}</code>
                </div>
                <p className="text-xs opacity-60 w-full md:w-1/2 md:text-right">{ep.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Code Snippet */}
        <section className="mb-20">
          <h2 className="text-2xl font-bold mb-10">Integration Example</h2>
          <div className="bg-[#121212] border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
            <div className="bg-white/5 px-6 py-3 border-b border-white/10 flex justify-between items-center">
              <span className="text-[10px] font-bold uppercase opacity-40">request.js</span>
              <span className="text-[10px] font-bold text-[#D4AF37] uppercase tracking-widest">JavaScript SDK</span>
            </div>
            <pre className="p-8 text-xs font-mono text-[#D4AF37]/80 leading-relaxed overflow-x-auto">
              {codeExample}
            </pre>
          </div>
        </section>

        {/* Rate Limits & Pricing */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center border-t border-white/10 pt-20">
           <div>
             <h2 className="text-2xl font-bold mb-6">Rate Limits & Support</h2>
             <ul className="space-y-4 mb-10">
               {[
                 "Standard: 1,000 requests/day",
                 "Institutional: Unlimited for verified banks",
                 "99.9% Uptime Guarantee",
                 "Dedicated Technical Liaison"
               ].map((item, i) => (
                 <li key={i} className="flex gap-3 text-sm opacity-60">
                   <span className="text-[#D4AF37]">▶</span> {item}
                 </li>
               ))}
             </ul>
           </div>
           <div className="bg-[#D4AF37] text-[#003300] p-12 rounded-[3rem] text-center md:text-left flex flex-col justify-between h-full shadow-2xl">
              <div>
                <h3 className="text-3xl font-bold mb-4 italic">Technical Support</h3>
                <p className="font-medium opacity-80 mb-8">Need help with your institutional integration or custom API schemas?</p>
              </div>
              <a href="https://wa.me/233531102292" className="bg-[#003300] text-[#F8F1E3] py-5 px-8 rounded-2xl font-bold text-center hover:scale-105 transition-all text-sm">
                Chat with Technical Team ↗
              </a>
           </div>
        </section>
      </main>

      <GlobalFooter dark />
    </div>
  );
};

export default ApiDocsPage;
