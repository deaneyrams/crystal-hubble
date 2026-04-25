"use client";
import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
const GlobalHeader = dynamic(() => import('@/components/GlobalHeader'), { ssr: false });
const GlobalFooter = dynamic(() => import('@/components/GlobalFooter'), { ssr: false });
import "../globals.css";

const InstitutionsPage = () => {
  const [selectedDoc, setSelectedDoc] = useState(0);
  const [query, setQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [aiResponseText, setAiResponseText] = useState("");
  const [queryError, setQueryError] = useState("");
  const [activeFilter, setActiveFilter] = useState("All Properties");

  // Mock search logic
  const handleQuerySubmit = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    
    setIsSearching(true);
    setShowResults(false);
    setAiResponseText("");
    setQueryError("");

    // Institutional Oracle Simulation
    setTimeout(() => {
      setIsSearching(false);
      setShowResults(true);
      if (query.toLowerCase().includes("mortgage") || query.toLowerCase().includes("green-lit")) {
        setAiResponseText(`SYNTRY ORACLE ANALYSIS: [CONFIDENTIAL INSTITUTIONAL DATA]
        
Query Parameters: ${query}
Results found: 4,821 validated assets match your criteria.

Layer 1-3 (Statutory/Cadastral): 100% verified.
Layer 4-6 (Forensic/Nii-Auth): 98.4% verified.
Layer 7-8 (Financial/Enzyme): 100% liquidity ready.

RECOMMENDATION: These assets are approved for institutional-grade debt financing and mortgage underwriting via the Syntry-Escrow pipeline.`);
      } else {
        setAiResponseText(`Live query received. Searching 8-Layer Statutory Exchange... 
        
Analysis complete. The requested property set has been cross-referenced against the Lands Commission Digital Boundary Index. All ${Math.floor(Math.random() * 500) + 10} titles within the search radius are currently Green-Lit for sovereign exchange.

STATUS: ELIGIBLE FOR MORTGAGE UNDERWRITING.`);
      }
    }, 1500);
  };

  const pendingDocs = [
    { id: "SYN-DOC-8842", loc: "East Legon, Plot 42", gps: "5.6322° N, 0.1601° W", type: "Site Plan", time: "10 mins ago", status: "Ready for Review", aiMatch: "98.7%", feedback: "Title appears valid", alert: "Minor boundary discrepancy (3.2m).", rec: "Approve for Mortgage" },
    { id: "SYN-DOC-8843", loc: "Pokuase Expansion", gps: "5.6980° N, 0.2885° W", type: "Title Deed", time: "24 mins ago", status: "AI Analysing", aiMatch: "Scanning...", feedback: "Cross-referencing statutory index...", alert: "Pending spatial search...", rec: "Awaiting final analysis." },
    { id: "SYN-DOC-8844", loc: "Aburi Hills Estate", gps: "5.8450° N, 0.1764° W", type: "Indenture", time: "1 hour ago", status: "Ready for Review", aiMatch: "100.0%", feedback: "Perfect Cadastral match", alert: "No discrepancies found.", rec: "Instantly Approve" },
    { id: "SYN-DOC-8845", loc: "Cantonments", gps: "5.5900° N, 0.1700° W", type: "Land Certificate", time: "3 hours ago", status: "Ready for Review", aiMatch: "74.2%", feedback: "Title exists but names misaligned", alert: "Major proxy validation failure.", rec: "Reject & Notify Owner" }
  ];

  return (
    <div className="bg-white min-h-screen text-slate-900 font-sans">
      <GlobalHeader />

      <main className="pt-32 pb-20 overflow-hidden">
        {/* Advanced Dashboard Hero & KPI Row */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 md:mt-10 mb-16">
           <div className="mb-10">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight tracking-tight text-slate-900 mb-4 flex items-center gap-4">
                 Syntry Global Institutional Dashboard <span className="hidden md:flex items-center justify-center w-8 h-8 bg-slate-900 text-white rounded-lg text-sm drop-shadow-sm ml-2">🌍</span>
              </h1>
              <h2 className="text-lg md:text-xl text-slate-500 font-medium">
                 Live <span className="font-bold text-slate-800">8-Layer Verification Intelligence</span> for Banks & Institutions
              </h2>
           </div>

           {/* 4 Big Metric Cards */}
           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { label: "Total Verified Value", val: "GH₵248.7M", trend: "↑", color: "text-[#00C853]" },
                { label: "Green-Lit Properties", val: "1,847", trend: "", color: "text-slate-900" },
                { label: "Active Institutions", val: "24", trend: "↑", color: "text-slate-900" },
                { label: "Overall Trust Score", val: "99.4%", trend: "A+", color: "text-white", dark: true }
              ].map((m, i) => (
                <div key={i} className={`${m.dark ? 'bg-slate-900 border-slate-800 shadow-[0_10px_30px_-10px_rgba(0,200,83,0.3)]' : 'bg-white border-slate-200 shadow-sm'} border p-8 rounded-3xl group relative overflow-hidden transition-all hover:-translate-y-1`}>
                   <div className="absolute top-0 right-0 w-24 h-24 bg-[#00C853]/5 rounded-bl-full blur-xl group-hover:scale-150 transition-transform"></div>
                   <p className={`text-[10px] font-bold uppercase tracking-widest mb-2 relative z-10 ${m.dark ? 'text-slate-400' : 'text-slate-400'}`}>{m.label}</p>
                   <p className={`text-3xl font-black tracking-tighter relative z-10 flex items-center gap-2 ${m.color}`}>
                    {m.val} {m.trend && <span className={`text-sm ${m.dark ? 'bg-[#00C853]/20 border border-[#00C853]/30 px-2 py-0.5 rounded-md font-bold text-[#00C853]' : 'bg-[#00C853]/10 px-2 py-0.5 rounded-md font-bold'}`}>{m.trend}</span>}
                   </p>
                </div>
              ))}
           </div>
        </div>

        {/* Verification Heatmap Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-32">
           <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-6 border-b border-slate-200 pb-6">
              <div>
                 <h2 className="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-3">
                    Verification Heatmap <span className="text-[#00C853]">Greater Accra</span>
                 </h2>
                 <p className="text-sm font-bold text-slate-500 mt-2 flex items-center gap-2">
                    <span className="w-2 h-2 bg-[#00C853] rounded-full animate-pulse shadow-[0_0_5px_#00C853]"></span> Real-time updates from Sovereign Exchange
                 </p>
              </div>
              <div className="flex flex-wrap gap-2 text-[11px] font-bold">
                 {["All Properties", "Mortgage Eligible", "Fractional", "Pokuase", "Achimota"].map(f => (
                   <button 
                    key={f}
                    onClick={() => setActiveFilter(f)}
                    className={`px-4 py-2 rounded-full transition-all shadow-sm ${activeFilter === f ? 'bg-slate-900 border-2 border-slate-900 text-white' : 'bg-white border-2 border-slate-200 text-slate-600 hover:border-[#00C853] hover:text-[#00C853]'}`}
                   >
                    {f}
                   </button>
                 ))}
              </div>
           </div>

           <div className="w-full bg-slate-100 rounded-[3rem] border border-slate-200 h-[600px] relative overflow-hidden isolate shadow-inner group">
              <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#94a3b8 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
              <div className="absolute inset-0 bg-blue-500/5 backdrop-blur-[2px]"></div>

              <svg className="absolute inset-0 w-full h-full stroke-slate-300 opacity-50" fill="none" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round">
                 <path d="M-100 600 Q 300 400 600 500 T 1300 100" />
                 <path d="M 400 800 Q 500 500 800 200 T 1500 50" strokeWidth="3" />
              </svg>

              <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-md border border-slate-200 p-4 rounded-2xl shadow-lg z-20">
                 <p className="text-[10px] font-black uppercase text-slate-500 mb-3 tracking-widest">Confidence Index</p>
                 <div className="space-y-3">
                    <div className="flex items-center gap-3"><span className="w-4 h-4 bg-[#00C853] border-2 border-white rounded-full shadow-sm"></span> <span className="text-xs font-bold text-slate-700">Fully Verified (100%)</span></div>
                    <div className="flex items-center gap-3"><span className="w-4 h-4 bg-[#86efac] border-2 border-white rounded-full shadow-sm"></span> <span className="text-xs font-bold text-slate-700">High Confidence (80-99%)</span></div>
                    <div className="flex items-center gap-3"><span className="w-4 h-4 bg-[#fde047] border-2 border-white rounded-full shadow-sm"></span> <span className="text-xs font-bold text-slate-700">Pending Scan</span></div>
                 </div>
              </div>

              {/* Pins */}
              <div className="absolute top-[30%] left-[60%] group/pin cursor-pointer">
                 <div className="w-24 h-24 bg-[#00C853]/20 rounded-full animate-ping absolute -inset-8"></div>
                 <div className="relative z-10 w-8 h-8 bg-[#00C853] border-4 border-white rounded-full shadow-[0_5px_15px_rgba(0,200,83,0.5)]"></div>
              </div>
              <div className="absolute top-[60%] left-[25%] group/pin cursor-pointer">
                 <div className="relative z-10 w-6 h-6 bg-[#86efac] border-2 border-white rounded-full shadow-[0_5px_15px_rgba(134,239,172,0.8)]"></div>
              </div>
              <div className="absolute top-[15%] left-[80%] group/pin cursor-pointer">
                 <div className="relative z-10 w-7 h-7 bg-[#00C853] border-2 border-white rounded-full shadow-[0_5px_15px_rgba(0,200,83,0.5)]"></div>
              </div>
           </div>
        </section>

        {/* AI Hub */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-32">
           <h2 className="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-3 mb-8 border-b border-slate-200 pb-6">
              Document Lifecycle <span className="text-slate-300">|</span> <span className="text-[#00C853]">AI Institutional Hub</span>
           </h2>
           <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-5 h-[750px] bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
                 <div className="bg-slate-50 border-b border-slate-200 px-6 py-5 flex justify-between items-center z-10">
                    <h3 className="font-black text-slate-900 flex items-center gap-2">📥 Submissions</h3>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Live Feed</span>
                 </div>
                 <div className="overflow-y-auto flex-grow p-4 space-y-3">
                    {pendingDocs.map((doc, idx) => (
                       <div key={idx} onClick={() => setSelectedDoc(idx)} className={`p-4 rounded-2xl cursor-pointer transition-all border ${selectedDoc === idx ? 'bg-[#00C853]/5 border-[#00C853] shadow-md' : 'bg-white border-slate-200 hover:border-[#00C853]'}`}>
                          <div className="flex justify-between items-center mb-2">
                             <span className="text-[10px] font-black text-slate-400 bg-slate-100 px-2 py-1 rounded">{doc.id}</span>
                             <span className="text-[10px] font-bold uppercase text-[#00C853] bg-[#00C853]/10 px-2 py-1 rounded">{doc.status}</span>
                          </div>
                          <h4 className="font-black text-slate-900">{doc.loc}</h4>
                          <p className="text-[10px] text-slate-400 mt-2">{doc.time}</p>
                       </div>
                    ))}
                 </div>
              </div>

              <div className="lg:col-span-7 h-[750px] bg-slate-900 rounded-[2.5rem] border border-slate-800 shadow-2xl flex flex-col relative">
                 <div className="bg-slate-900/80 backdrop-blur-md border-b border-slate-800 px-8 py-6 flex justify-between items-center rounded-t-[2.5rem]">
                    <h3 className="font-black text-white flex items-center gap-2">🤖 AI Verification Console</h3>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-[#00C853] rounded-full animate-pulse shadow-[0_0_8px_#00C853]"></span>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-[#00C853]">Grounded truth</span>
                    </div>
                 </div>
                 <div className="flex-grow p-6 flex flex-col gap-6 overflow-y-auto">
                    <div className="grid grid-cols-2 gap-4 h-[300px] shrink-0">
                       <div className="bg-slate-800 rounded-2xl border border-slate-700 p-4 flex flex-col items-center justify-center text-slate-500 font-bold">
                          USER UPLOAD
                       </div>
                       <div className="bg-[#00C853]/5 rounded-2xl border border-[#00C853]/20 p-4 flex flex-col items-center justify-center text-[#00C853] font-bold relative overflow-hidden">
                          <div className="absolute bottom-0 left-0 w-full h-1 bg-[#00C853] animate-pulse"></div>
                          GROUNDED TRUTH
                       </div>
                    </div>
                    <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6">
                       <div className="grid grid-cols-2 gap-x-6 gap-y-4">
                          <div>
                             <p className="text-[10px] text-slate-500 uppercase font-bold mb-1">Optical Match</p>
                             <p className="text-2xl font-black text-white">{pendingDocs[selectedDoc].aiMatch}</p>
                          </div>
                          <div>
                             <p className="text-[10px] text-slate-500 uppercase font-bold mb-1">AI Recommendation</p>
                             <p className="text-sm font-bold text-[#00C853]">{pendingDocs[selectedDoc].rec}</p>
                          </div>
                       </div>
                    </div>
                    <div className="mt-auto flex flex-col gap-3">
                       <button onClick={() => alert("Verification Approved via Syntry Oracle.")} className="w-full bg-[#00C853] text-white py-4 rounded-xl font-bold hover:bg-[#00a846] transition-all shadow-lg"> Counter-Sign & Approve Verification </button>
                       <div className="grid grid-cols-2 gap-3">
                         <button onClick={() => alert("Porting to Lands Commission API...")} className="bg-slate-800 text-white border border-slate-700 py-3 rounded-xl font-bold text-xs hover:bg-slate-700 transition-colors">Cross-Check Statutory</button>
                         <button onClick={() => alert("Security Audit sequence initiated.")} className="bg-slate-800 text-white border border-slate-700 py-3 rounded-xl font-bold text-xs hover:bg-slate-700 transition-colors">Security Audit</button>
                       </div>
                    </div>
                 </div>
              </div>
           </div>
        </section>

        {/* AI Query */}
        <section className="bg-slate-50 border-y border-slate-200 py-24 mb-32">
           <div className="max-w-4xl mx-auto px-4 text-center">
              <h2 className="text-4xl font-black text-slate-900 mb-4 italic">Query the Sovereign Oracle.</h2>
              <p className="text-lg text-slate-500 font-medium mb-10">Instant institutional asset verification using natural language.</p>
              <form onSubmit={handleQuerySubmit} className="relative mb-8">
                 <input 
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="E.g. List all mortgage-ready plots in Cantonments over GH₵5M"
                    className="w-full bg-white border-2 border-slate-200 rounded-3xl py-6 px-8 text-lg font-medium focus:outline-none focus:border-[#00C853] shadow-xl"
                 />
                 <button type="submit" disabled={isSearching} className="absolute right-3 top-3 bottom-3 bg-slate-900 text-white px-8 rounded-2xl font-bold hover:bg-slate-800 transition-colors disabled:opacity-50">
                    {isSearching ? "ANALYSING..." : "QUERY"}
                 </button>
              </form>
              {showResults && (
                <div className="bg-white border-2 border-[#00C853]/30 p-8 rounded-3xl text-left shadow-2xl animate-in zoom-in-95 duration-300">
                  <div className="whitespace-pre-wrap font-medium leading-relaxed text-slate-700">{aiResponseText}</div>
                </div>
              )}
           </div>
        </section>

        {/* CTAs */}
        <section className="max-w-4xl mx-auto px-4 text-center pb-32">
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-8 italic">Ready to eliminate litigation risk?</h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a href="/login?type=institution" className="bg-[#00C853] text-white px-10 py-5 rounded-2xl font-black text-lg hover:-translate-y-1 transition-all shadow-2xl shadow-[#00C853]/20">Request Enterprise Access</a>
            <a href="https://wa.me/233531102292" className="bg-slate-900 text-white px-10 py-5 rounded-2xl font-black text-lg hover:-translate-y-1 transition-all shadow-2xl">Speak to Advisor</a>
          </div>
        </section>
      </main>

      <GlobalFooter />
    </div>
  );
};

export default InstitutionsPage;
