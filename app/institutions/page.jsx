"use client";
import React, { useState } from 'react';
import GlobalHeader from '../../components/GlobalHeader';
import GlobalFooter from '../../components/GlobalFooter';

const InstitutionsPage = () => {
  const [selectedDoc, setSelectedDoc] = useState(0);
  const [query, setQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [aiResponseText, setAiResponseText] = useState("");
  const [queryError, setQueryError] = useState("");

  const handleQuerySubmit = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    
    setIsSearching(true);
    setShowResults(false);
    setSelectedAsset(null);
    setAiResponseText("");
    setQueryError("");

    try {
      const res = await fetch("https://YOUR-LAMBDA-URL.lambda-url.eu-west-1.on.aws/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query })
      });
      if (!res.ok) throw new Error("Connection failed");
      const data = await res.json();
      setAiResponseText(data.reply || data.response || data.message || "Query executed effectively. No text data parsed from payload.");
    } catch (err) {
      console.error(err);
      setQueryError("We could not establish a secure handshake to the Live Oracle right now.");
    } finally {
      setIsSearching(false);
      setShowResults(true);
    }
  };

  const pendingDocs = [
    { id: "SYN-DOC-8842", loc: "East Legon, Plot 42", gps: "5.6322° N, 0.1601° W", type: "Site Plan", time: "10 mins ago", status: "Ready for Review", aiMatch: "98.7%", feedback: "Title appears valid", alert: "Minor boundary discrepancy (3.2m).", rec: "Approve for Mortgage" },
    { id: "SYN-DOC-8843", loc: "Pokuase Expansion", gps: "5.6980° N, 0.2885° W", type: "Title Deed", time: "24 mins ago", status: "AI Analysing", aiMatch: "Scanning...", feedback: "Cross-referencing statutory index...", alert: "Pending spatial search...", rec: "Awaiting final analysis." },
    { id: "SYN-DOC-8844", loc: "Aburi Hills Estate", gps: "5.8450° N, 0.1764° W", type: "Indenture", time: "1 hour ago", status: "Ready for Review", aiMatch: "100.0%", feedback: "Perfect Cadastral match", alert: "No discrepancies found.", rec: "Instantly Approve" },
    { id: "SYN-DOC-8845", loc: "Cantonments", gps: "5.5900° N, 0.1700° W", type: "Land Certificate", time: "3 hours ago", status: "Ready for Review", aiMatch: "74.2%", feedback: "Title exists but names misaligned", alert: "Major proxy validation failure.", rec: "Reject & Notify Owner" }
  ];

  const llmResults = [
    { id: "AST-8291", loc: "East Legon Hills, Plot 14", score: 100, layers: "8/8 Passed", val: "GH₵1,850,000", apq: "18.2%", mortgage: true, frac: false, lastVer: "Live" },
    { id: "AST-8292", loc: "Spintex Commercial Hub", score: 95, layers: "7/8 Passed", val: "GH₵4,200,000", apq: "15.4%", mortgage: true, frac: true, lastVer: "Live" },
    { id: "AST-8293", loc: "Pokuase Expansion Zone", score: 100, layers: "8/8 Passed", val: "GH₵950,000", apq: "22.1%", mortgage: true, frac: false, lastVer: "Live" }
  ];

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
              <div className="bg-white border border-slate-200 p-8 rounded-3xl shadow-sm hover:border-[#00C853]/50 hover:shadow-[0_15px_30px_-10px_rgba(0,0,0,0.05)] transition-all group relative overflow-hidden">
                 <div className="absolute top-0 right-0 w-24 h-24 bg-[#00C853]/5 rounded-bl-full blur-xl group-hover:scale-150 transition-transform"></div>
                 <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 relative z-10">Total Verified Value</p>
                 <p className="text-3xl font-black text-[#00C853] tracking-tighter relative z-10 flex items-center gap-2">GH₵248.7M <span className="text-sm bg-[#00C853]/10 text-[#00C853] px-2 py-0.5 rounded-md font-bold">↑</span></p>
              </div>

              <div className="bg-white border border-slate-200 p-8 rounded-3xl shadow-sm hover:border-[#00C853]/50 hover:shadow-[0_15px_30px_-10px_rgba(0,0,0,0.05)] transition-all group relative overflow-hidden">
                 <div className="absolute top-0 right-0 w-24 h-24 bg-[#00C853]/5 rounded-bl-full blur-xl group-hover:scale-150 transition-transform"></div>
                 <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 relative z-10">Green-Lit Properties</p>
                 <p className="text-3xl font-black text-slate-900 tracking-tighter relative z-10">1,847</p>
              </div>

              <div className="bg-white border border-slate-200 p-8 rounded-3xl shadow-sm hover:border-[#00C853]/50 hover:shadow-[0_15px_30px_-10px_rgba(0,0,0,0.05)] transition-all group relative overflow-hidden">
                 <div className="absolute top-0 right-0 w-24 h-24 bg-[#00C853]/5 rounded-bl-full blur-xl group-hover:scale-150 transition-transform"></div>
                 <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 relative z-10">Active Institutions</p>
                 <p className="text-3xl font-black text-slate-900 tracking-tighter relative z-10">18</p>
              </div>

              <div className="bg-slate-900 border border-slate-800 p-8 rounded-3xl shadow-[0_10px_30px_-10px_rgba(0,200,83,0.3)] flex items-center justify-between group relative overflow-hidden">
                 <div className="absolute top-0 right-0 w-32 h-32 bg-[#00C853]/20 rounded-bl-full blur-3xl -mr-10 -mt-10"></div>
                 <div className="relative z-10">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Overall Trust Score</p>
                    <p className="text-3xl font-black text-white tracking-tighter">98.4%</p>
                 </div>
                 {/* Fake Circular Progress */}
                 <div className="w-16 h-16 rounded-full border-4 border-slate-700 border-t-[#00C853] border-r-[#00C853] border-b-[#00C853] flex items-center justify-center relative z-10 shadow-[0_0_15px_rgba(0,200,83,0.2)]">
                    <span className="text-[10px] font-black text-[#00C853]">A+</span>
                 </div>
              </div>
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
                    <span className="w-2 h-2 bg-[#00C853] rounded-full animate-pulse shadow-[0_0_5px_#00C853]"></span> Real-time updates from Check My Property tool
                 </p>
              </div>
              <div className="flex flex-wrap gap-2 text-[11px] font-bold">
                 <button className="bg-slate-900 border-2 border-slate-900 text-white px-4 py-2 rounded-full hover:bg-slate-800 transition-colors shadow-sm">All Properties</button>
                 <button className="bg-white border-2 border-slate-200 text-slate-600 px-4 py-2 rounded-full hover:border-[#00C853] hover:text-[#00C853] transition-colors shadow-sm">Mortgage Eligible</button>
                 <button className="bg-white border-2 border-slate-200 text-slate-600 px-4 py-2 rounded-full hover:border-[#00C853] hover:text-[#00C853] transition-colors shadow-sm">Fractional</button>
                 <button className="bg-white border-2 border-slate-200 text-slate-600 px-4 py-2 rounded-full hover:border-[#00C853] hover:text-[#00C853] transition-colors shadow-sm">Pokuase</button>
                 <button className="bg-white border-2 border-slate-200 text-slate-600 px-4 py-2 rounded-full hover:border-[#00C853] hover:text-[#00C853] transition-colors shadow-sm">Achimota</button>
              </div>
           </div>

           <div className="w-full bg-slate-100 rounded-[3rem] border border-slate-200 h-[600px] relative overflow-hidden isolate shadow-inner group">
              {/* Synthetic Map Background (Accra styling) */}
              <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#94a3b8 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
              <div className="absolute inset-0 bg-blue-500/5 backdrop-blur-[2px]"></div>

              {/* Highway / Topology simulations */}
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

              {/* Cluster: East Legon */}
              <div className="absolute top-[30%] left-[60%] group/pin cursor-pointer">
                 <div className="w-24 h-24 bg-[#00C853]/20 rounded-full animate-ping absolute -inset-8 pointer-events-none"></div>
                 <div className="relative z-10 w-8 h-8 bg-[#00C853] border-4 border-white rounded-full shadow-[0_5px_15px_rgba(0,200,83,0.5)]"></div>
                 {/* Hover Tooltip */}
                 <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 w-64 bg-slate-900 border border-slate-800 text-white p-4 rounded-xl shadow-2xl opacity-0 group-hover/pin:opacity-100 transition-opacity pointer-events-none">
                    <p className="text-[10px] uppercase font-bold text-[#00C853] tracking-widest mb-1 border-b border-slate-800 pb-1">East Legon Zone</p>
                    <p className="font-black text-xl mb-3">284 Properties</p>
                    <div className="flex justify-between text-xs">
                       <span className="text-slate-400">Yield: <strong className="text-white">12.4% APY</strong></span>
                       <span className="text-slate-400">Ready: <strong className="text-[#00C853]">94%</strong></span>
                    </div>
                 </div>
                 <div className="absolute top-10 left-10 w-4 h-4 bg-[#86efac] border-2 border-white rounded-full shadow-sm"></div>
                 <div className="absolute -top-12 left-14 w-5 h-5 bg-[#00C853] border-2 border-white rounded-full shadow-sm"></div>
                 <div className="absolute top-16 -left-8 w-3 h-3 bg-[#fde047] border border-white rounded-full shadow-sm"></div>
              </div>

              {/* Cluster: Pokuase */}
              <div className="absolute top-[60%] left-[25%] group/pin cursor-pointer">
                 <div className="w-20 h-20 bg-[#86efac]/20 rounded-full animate-pulse absolute -inset-6 pointer-events-none"></div>
                 <div className="relative z-10 w-6 h-6 bg-[#86efac] border-2 border-white rounded-full shadow-[0_5px_15px_rgba(134,239,172,0.8)]"></div>
                 <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-56 bg-slate-900 text-white p-4 rounded-xl shadow-2xl opacity-0 group-hover/pin:opacity-100 transition-opacity pointer-events-none z-30">
                    <p className="text-[10px] uppercase font-bold text-[#86efac] tracking-widest mb-1 border-b border-slate-800 pb-1">Pokuase Expansion</p>
                    <p className="font-black text-xl mb-3">142 Properties</p>
                    <div className="flex justify-between text-xs">
                       <span className="text-slate-400">Yield: <strong className="text-white">14.1% APY</strong></span>
                       <span className="text-slate-400">Ready: <strong className="text-[#00C853]">82%</strong></span>
                    </div>
                 </div>
                 <div className="absolute top-8 left-8 w-3 h-3 bg-[#00C853] border border-white rounded-full shadow-sm"></div>
                 <div className="absolute top-2 -left-6 w-4 h-4 bg-[#fde047] border border-white rounded-full shadow-sm"></div>
              </div>
              
              {/* Cluster: Aburi Hills */}
              <div className="absolute top-[15%] left-[80%] group/pin cursor-pointer">
                 <div className="relative z-10 w-7 h-7 bg-[#00C853] border-2 border-white rounded-full shadow-[0_5px_15px_rgba(0,200,83,0.5)]"></div>
                 <div className="absolute bottom-full -left-12 mb-3 w-56 bg-slate-900 text-white p-4 rounded-xl shadow-2xl opacity-0 group-hover/pin:opacity-100 transition-opacity pointer-events-none z-30">
                    <p className="text-[10px] uppercase font-bold text-[#00C853] tracking-widest mb-1 border-b border-slate-800 pb-1">Aburi Hills</p>
                    <p className="font-black text-xl mb-3">68 Properties</p>
                    <div className="flex justify-between text-xs">
                       <span className="text-slate-400">Yield: <strong className="text-white">16.8% APY</strong></span>
                       <span className="text-slate-400">Ready: <strong className="text-[#00C853]">100%</strong></span>
                    </div>
                 </div>
                 <div className="absolute -top-6 -left-8 w-4 h-4 bg-[#00C853] border border-white rounded-full shadow-sm"></div>
              </div>

           </div>
        </section>

        {/* Document Lifecycle & AI Verification Hub */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-32">
           <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-6 border-b border-slate-200 pb-6">
              <div>
                 <h2 className="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-3">
                    Document Lifecycle <span className="text-slate-300">|</span> <span className="text-[#00C853]">AI Verification Hub</span>
                 </h2>
                 <p className="text-sm font-medium text-slate-500 mt-2">
                    Review and counter-sign user submissions from the Check My Property tool.
                 </p>
              </div>
              <div className="flex flex-wrap gap-2 text-[11px] font-bold">
                 <button className="bg-slate-900 border-2 border-slate-900 text-white px-4 py-2 rounded-full hover:bg-slate-800 transition-colors shadow-sm">All Pending</button>
                 <button className="bg-white border-2 border-slate-200 text-slate-600 px-4 py-2 rounded-full hover:border-[#00C853] hover:text-[#00C853] transition-colors shadow-sm">Today</button>
                 <button className="bg-white border-2 border-slate-200 text-slate-600 px-4 py-2 rounded-full hover:border-[#00C853] hover:text-[#00C853] transition-colors shadow-sm">Mortgage-Ready</button>
                 <button className="bg-white border-2 border-slate-200 text-slate-600 px-4 py-2 rounded-full hover:border-[#00C853] hover:text-[#00C853] transition-colors shadow-sm text-[#D4AF37] border-[#D4AF37]/30 bg-[#D4AF37]/5">High Value Priority</button>
              </div>
           </div>

           <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Left Column: User Submissions */}
              <div className="lg:col-span-5 flex flex-col h-[750px] bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
                 <div className="bg-slate-50 border-b border-slate-200 px-6 py-5 flex justify-between items-center z-10 shrink-0">
                    <h3 className="font-black text-slate-900 flex items-center gap-2"><span className="text-[#00C853] text-xl">📥</span> User Submissions</h3>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Live Feed</span>
                 </div>
                 
                 <div className="overflow-y-auto flex-grow p-4 space-y-3">
                    {pendingDocs.map((doc, idx) => (
                       <div 
                          key={idx} 
                          onClick={() => setSelectedDoc(idx)}
                          className={`p-4 rounded-2xl cursor-pointer transition-all border ${selectedDoc === idx ? 'bg-[#00C853]/5 border-[#00C853] shadow-md ring-1 ring-[#00C853]/20' : 'bg-white border-slate-200 hover:border-[#00C853]/40 hover:shadow-sm'}`}
                       >
                          <div className="flex justify-between items-start mb-3">
                             <div>
                                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 bg-slate-100 px-2 py-1 rounded-md">{doc.id}</span>
                             </div>
                             {doc.status === 'Ready for Review' ? (
                                <span className="flex items-center gap-1.5 text-[10px] font-bold uppercase text-[#00C853] bg-[#00C853]/10 px-2.5 py-1 rounded-md border border-[#00C853]/20">
                                   <span className="w-1.5 h-1.5 bg-[#00C853] rounded-full"></span> {doc.status}
                                </span>
                             ) : (
                                <span className="flex items-center gap-1.5 text-[10px] font-bold uppercase text-[#f59e0b] bg-[#f59e0b]/10 px-2.5 py-1 rounded-md border border-[#f59e0b]/20 animate-pulse">
                                   <span className="w-1.5 h-1.5 bg-[#f59e0b] rounded-full"></span> {doc.status}
                                </span>
                             )}
                          </div>
                          
                          <h4 className="font-black text-slate-900 text-lg leading-tight mb-1">{doc.loc}</h4>
                          <p className="text-[11px] font-mono text-slate-500 mb-4">{doc.gps}</p>
                          
                          <div className="flex justify-between items-center text-xs border-t border-slate-100 pt-3">
                             <div className="flex items-center gap-1.5 text-slate-600 font-medium">
                                <span className="text-slate-400">📄</span> {doc.type}
                             </div>
                             <span className="text-slate-400 font-bold">{doc.time}</span>
                          </div>
                       </div>
                    ))}
                 </div>
              </div>

              {/* Right Column: AI Review Overlay */}
              <div className="lg:col-span-7 h-[750px] bg-slate-900 rounded-[2.5rem] border border-slate-800 shadow-2xl overflow-hidden flex flex-col relative isolate">
                 {/* Background FX */}
                 <div className="absolute top-0 right-0 w-64 h-64 bg-[#00C853]/10 blur-[100px] -z-10"></div>
                 
                 <div className="bg-slate-900/80 backdrop-blur-md border-b border-slate-800 px-8 py-6 flex justify-between items-center shrink-0 z-10">
                    <h3 className="font-black text-white flex items-center gap-2"><span className="text-[#00C853] text-xl">🤖</span> AI-Assisted Document Verification</h3>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#00C853] border border-[#00C853]/30 bg-[#00C853]/10 px-2 py-1 rounded animate-pulse">Engine Active</span>
                 </div>

                 <div className="flex-grow p-6 flex flex-col gap-6 overflow-y-auto">
                    {/* Side-by-Side Images */}
                    <div className="grid grid-cols-2 gap-4 h-[300px] shrink-0">
                       <div className="bg-slate-800 rounded-2xl border border-slate-700 p-3 h-full flex flex-col relative overflow-hidden group">
                          <p className="text-[10px] font-black tracking-widest uppercase text-slate-400 mb-2 shrink-0 relative z-10 flex items-center justify-between">User Upload <span className="text-white bg-slate-700 px-1.5 rounded">🔍</span></p>
                          <div className="flex-grow bg-slate-200 rounded-xl w-full h-full relative overflow-hidden flex items-center justify-center border-4 border-slate-700 group-hover:scale-[1.02] transition-transform">
                             <div className="absolute inset-0 opacity-10 bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,#000_10px,#000_20px)]"></div>
                             <div className="text-6xl opacity-20 relative z-10 font-serif rotate-[-10deg]">DOCUMENT</div>
                          </div>
                       </div>
                       
                       <div className="bg-slate-800 rounded-2xl border border-[#00C853]/20 p-3 h-full flex flex-col relative overflow-hidden group">
                          <div className="absolute top-0 right-0 w-full h-1 bg-[#00C853] opacity-50 z-20"></div>
                          <p className="text-[10px] font-black tracking-widest uppercase text-[#00C853] mb-2 shrink-0 relative z-10 flex items-center justify-between">Grounded Truth Record <span className="text-white bg-[#00C853] px-1.5 rounded">✓</span></p>
                          <div className="flex-grow bg-[#00C853]/10 rounded-xl w-full h-full relative overflow-hidden flex items-center justify-center border-4 border-[#00C853]/30 group-hover:scale-[1.02] transition-transform">
                             <div className="w-full h-full inset-0 absolute" style={{ backgroundImage: 'radial-gradient(#00C853 1px, transparent 1px)', backgroundSize: '10px 10px', opacity: 0.1 }}></div>
                             <div className="text-6xl opacity-30 text-[#00C853] relative z-10 font-serif rotate-[-10deg]">VERIFIED</div>
                          </div>
                          {/* Synthetic scanning laser */}
                          <div className="absolute top-0 left-0 w-full h-0.5 bg-[#00C853] shadow-[0_0_15px_#00C853] z-20 animate-[scan_3s_ease-in-out_infinite] opacity-50"></div>
                       </div>
                    </div>

                    {/* AI Highlight Panel */}
                    <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 shrink-0 relative isolate overflow-hidden">
                       <div className="absolute right-0 bottom-0 text-[100px] leading-none opacity-5 font-black -mr-4 -mb-4 pointer-events-none z-0">AI</div>
                       <h4 className="text-[11px] font-black uppercase tracking-widest text-slate-400 mb-4 border-b border-slate-700 pb-2 relative z-10">Oracle Analytics Engine</h4>
                       
                       <div className="grid grid-cols-2 gap-x-6 gap-y-4 mb-5 relative z-10">
                          <div>
                             <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold mb-1">Optical Match</p>
                             <p className="text-2xl font-black text-white">{pendingDocs[selectedDoc].aiMatch}</p>
                          </div>
                          <div>
                             <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold mb-1">AI Feedback</p>
                             <p className="text-sm font-bold text-[#00C853]">{pendingDocs[selectedDoc].feedback}</p>
                          </div>
                          <div>
                             <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold mb-1">Detected Anomalies</p>
                             <p className="text-sm font-bold text-yellow-400">{pendingDocs[selectedDoc].alert}</p>
                          </div>
                          <div>
                             <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold mb-1">System Recommendation</p>
                             <p className="text-sm font-black text-white inline-block bg-white/10 px-2 py-1 rounded">{pendingDocs[selectedDoc].rec}</p>
                          </div>
                       </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="mt-auto grid grid-cols-2 gap-3 shrink-0 relative z-10">
                       <button className="col-span-2 bg-[#00C853] text-white py-4 rounded-xl font-bold hover:bg-[#00a846] transition-colors shadow-[0_10px_20px_-10px_rgba(0,200,83,0.5)] border border-[#00C853] flex items-center justify-center gap-2">
                          <span className="text-xl">✍️</span> Counter-Sign & Approve
                       </button>
                       <button className="bg-slate-800 text-white border border-slate-700 py-3.5 rounded-xl font-bold text-sm hover:bg-slate-700 transition-colors">
                          Run Full 8 Layers
                       </button>
                       <button className="bg-slate-800 text-white border border-slate-700 py-3.5 rounded-xl font-bold text-sm hover:bg-slate-700 transition-colors">
                          Request Documents
                       </button>
                       <button className="col-span-2 bg-transparent text-red-500 border border-red-500/30 py-3 rounded-xl font-bold text-sm hover:bg-red-500/10 transition-colors">
                          Reject & Notify Owner
                       </button>
                    </div>
                 </div>
              </div>
           </div>
        </section>

        {/* Institutional LLM Query Console */}
        <section className="bg-slate-50 border-y border-slate-200 py-24 mb-32 relative overflow-hidden">
           <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#00C853]/5 rounded-full blur-[120px] -mr-[400px] -mt-[400px] pointer-events-none"></div>
           
           <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <div className="text-center mb-10">
                 <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight flex justify-center items-center gap-4 mb-4">
                    <span className="text-4xl">✨</span> Ask Anything About Verified Assets
                 </h2>
                 <p className="text-lg text-slate-500 font-medium max-w-2xl mx-auto">
                    Use natural language to instantly filter the Grounded Truth layer for precise institutional portfolio building.
                 </p>
              </div>

              {/* Search Bar */}
              <form onSubmit={handleQuerySubmit} className="relative mb-6">
                 <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none text-2xl text-slate-400">
                    🔍
                 </div>
                 <input 
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="E.g. List all mortgage-ready commercial plots in Spintex under GH₵5M"
                    className="w-full bg-white border-2 border-slate-200 rounded-[2rem] py-6 pl-16 pr-32 text-lg text-slate-900 font-medium focus:outline-none focus:border-[#00C853] focus:ring-4 focus:ring-[#00C853]/10 shadow-[0_15px_40px_-15px_rgba(0,0,0,0.05)] transition-all"
                 />
                 <button 
                    type="submit" 
                    disabled={isSearching}
                    className="absolute inset-y-2 right-2 bg-slate-900 text-white px-8 rounded-[1.5rem] font-bold hover:bg-slate-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm tracking-widest uppercase flex items-center justify-center min-w-[120px]"
                 >
                    {isSearching ? <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span> : "Query API"}
                 </button>
              </form>

              {/* Quick Chips */}
              <div className="flex flex-wrap justify-center gap-3 mb-6">
                 {[
                    "Show all 100% Green-Lit properties in Pokuase",
                    "Mortgage-ready assets in Achimota with APY > 15%",
                    "Properties with GPS match > 98% and no litigation",
                    "Fractional opportunities in East Legon under GH₵2M",
                    "High-value portfolio for pension funds"
                 ].map((chip, idx) => (
                    <button 
                       key={idx} 
                       type="button"
                       onClick={() => setQuery(chip)}
                       className="bg-white border border-slate-200 text-slate-600 px-4 py-2 rounded-xl text-xs font-bold hover:border-[#00C853] hover:text-[#00C853] transition-colors shadow-sm"
                    >
                       {chip}
                    </button>
                 ))}
              </div>
              <p className="text-center text-[10px] font-bold text-slate-400 tracking-widest uppercase">
                 Powered by Syntry Grok AI • Connected live to 8 Layers Verification Engine
              </p>
           </div>

           {/* Results Area */}
           {showResults && (
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 relative z-10 transition-all duration-500 ease-out">
                 <div className="bg-white border border-slate-200 rounded-3xl shadow-[0_20px_50px_-20px_rgba(0,0,0,0.1)] overflow-hidden flex flex-col">
                    
                    <div className="bg-slate-900 px-8 py-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                       <h3 className="font-bold text-white flex items-center gap-3">
                          <span className="w-2 h-2 bg-[#00C853] rounded-full animate-pulse shadow-[0_0_8px_#00C853]"></span> Institutional Query API
                       </h3>
                       <span className="text-[10px] font-bold uppercase tracking-widest text-[#00C853] bg-[#00C853]/10 border border-[#00C853]/20 px-3 py-1.5 rounded flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-[#00C853] rounded-full animate-ping"></span> Live • Powered by Grok AI via AWS
                       </span>
                    </div>

                    <div className="p-8 md:p-10">
                       {queryError ? (
                          <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-2xl">
                             <h4 className="text-red-800 font-bold text-lg mb-2 flex items-center gap-2">
                                <span className="text-xl">⚠️</span> Network Bridge Error
                             </h4>
                             <p className="text-red-700 font-medium mb-4">{queryError}</p>
                             <p className="text-sm text-red-600 mb-6">Your institutional Node IP might be facing latency or firewall blocks accessing the AI runtime. Connect with our dedicated integration team to secure your whitelist.</p>
                             <a href="https://wa.me/233531102292" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-slate-900 text-white font-bold px-6 py-3 rounded-xl text-sm hover:bg-slate-800 transition-colors shadow-sm">
                                💬 Message Integration Support
                             </a>
                          </div>
                       ) : (
                          <div className="prose prose-slate max-w-none prose-p:leading-relaxed prose-p:text-slate-700 prose-headings:text-slate-900 text-[16px] md:text-lg">
                             <div className="whitespace-pre-wrap font-medium">{aiResponseText}</div>
                          </div>
                       )}
                    </div>

                 </div>
              </div>
           )}
        </section>

        {/* Portfolio Management & Reports */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-32">
           <div className="mb-10">
              <h2 className="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-3">
                 Portfolio Management <span className="text-slate-300">|</span> <span className="text-[#00C853]">Enterprise Reports</span>
              </h2>
              <p className="text-sm font-medium text-slate-500 mt-2">
                 Global overview of your secured sovereign assets and live compliance intelligence.
              </p>
           </div>
           
           <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
              {/* Left Column: Institutional Portfolio */}
              <div className="lg:col-span-8 flex flex-col gap-6">
                 {/* Summary Cards */}
                 <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm">
                       <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 flex justify-between items-center">Total Value <span className="text-[#00C853]">↑ 2.4%</span></p>
                       <p className="text-xl font-black text-slate-900">GH₵42.8M</p>
                    </div>
                    <div className="bg-[#00C853]/5 border border-[#00C853]/20 p-5 rounded-2xl shadow-sm">
                       <p className="text-[9px] font-bold text-[#00C853]/80 uppercase tracking-widest mb-1.5">Mortgage-Ready</p>
                       <p className="text-xl font-black text-[#00C853]">24 Assets</p>
                    </div>
                    <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl shadow-sm">
                       <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Avg Trust Score</p>
                       <p className="text-xl font-black text-white">99.2%</p>
                    </div>
                    <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm">
                       <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Expected Yield</p>
                       <p className="text-xl font-black text-slate-900">18.4% APY</p>
                    </div>
                 </div>

                 {/* Portfolio Table */}
                 <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden flex-grow flex flex-col">
                    <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 flex justify-between items-center shrink-0">
                       <h3 className="font-bold text-slate-900 text-sm">Monitored Portfolio Assets</h3>
                       <button className="text-[10px] font-bold uppercase tracking-widest text-slate-500 hover:text-[#00C853] transition-colors">View All →</button>
                    </div>
                    <div className="overflow-x-auto flex-grow">
                       <table className="w-full text-left text-sm text-slate-600 min-w-[700px]">
                          <thead className="bg-white text-[10px] uppercase font-black tracking-widest text-slate-400 border-b border-slate-100">
                             <tr>
                                <th className="px-6 py-4">Property</th>
                                <th className="px-6 py-4 text-center">Score</th>
                                <th className="px-6 py-4">Status & Value</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                             </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100 font-medium">
                             <tr className="hover:bg-slate-50 transition-colors group">
                                <td className="px-6 py-5">
                                   <div className="text-slate-900 font-bold mb-0.5">Airport Residential Plot</div>
                                   <div className="text-[10px] uppercase tracking-widest text-slate-400">AST-9901</div>
                                </td>
                                <td className="px-6 py-5 text-center">
                                   <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-[#00C853]/10 text-[#00C853] font-black font-sm border border-[#00C853]/20">100</span>
                                </td>
                                <td className="px-6 py-5">
                                   <div className="text-slate-900 font-black mb-0.5">GH₵8.2M</div>
                                   <div className="text-[#00C853] text-[10px] font-bold">8/8 Layers Passed</div>
                                </td>
                                <td className="px-6 py-5 text-right">
                                   <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                      <button className="bg-slate-100 text-slate-600 px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-slate-200 transition-colors">Rep</button>
                                      <button className="bg-[#00C853] text-white px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-[#00a846] transition-colors shadow-sm">Mortgage</button>
                                   </div>
                                </td>
                             </tr>
                             <tr className="hover:bg-slate-50 transition-colors group">
                                <td className="px-6 py-5">
                                   <div className="text-slate-900 font-bold mb-0.5">Trade Fair Expansion</div>
                                   <div className="text-[10px] uppercase tracking-widest text-slate-400">AST-9902</div>
                                </td>
                                <td className="px-6 py-5 text-center">
                                   <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-slate-100 text-slate-900 font-black font-sm border border-slate-200">96</span>
                                </td>
                                <td className="px-6 py-5">
                                   <div className="text-slate-900 font-black mb-0.5">GH₵14.5M</div>
                                   <div className="text-slate-500 text-[10px] font-bold">7/8 Layers Passed</div>
                                </td>
                                <td className="px-6 py-5 text-right">
                                   <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                      <button className="bg-slate-100 text-slate-600 px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-slate-200 transition-colors">Rep</button>
                                      <button className="bg-[#00C853] text-white px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-[#00a846] transition-colors shadow-sm">Mortgage</button>
                                   </div>
                                </td>
                             </tr>
                             <tr className="hover:bg-slate-50 transition-colors group">
                                <td className="px-6 py-5">
                                   <div className="text-slate-900 font-bold mb-0.5">Oyarifa Commercial</div>
                                   <div className="text-[10px] uppercase tracking-widest text-slate-400">AST-9903</div>
                                </td>
                                <td className="px-6 py-5 text-center">
                                   <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-[#00C853]/10 text-[#00C853] font-black font-sm border border-[#00C853]/20">100</span>
                                </td>
                                <td className="px-6 py-5">
                                   <div className="text-slate-900 font-black mb-0.5">GH₵3.1M</div>
                                   <div className="text-[#00C853] text-[10px] font-bold">8/8 Layers Passed</div>
                                </td>
                                <td className="px-6 py-5 text-right">
                                   <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                      <button className="bg-slate-100 text-slate-600 px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-slate-200 transition-colors">Rep</button>
                                      <button className="bg-[#00C853] text-white px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-[#00a846] transition-colors shadow-sm">Mortgage</button>
                                   </div>
                                </td>
                             </tr>
                          </tbody>
                       </table>
                    </div>
                 </div>
              </div>

              {/* Right Column: Activity & Reports */}
              <div className="lg:col-span-4 flex flex-col gap-6">
                 {/* Activity Feed */}
                 <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6 relative overflow-hidden flex flex-col h-[260px]">
                    <div className="flex justify-between items-center mb-6 relative z-10 shrink-0">
                       <h3 className="font-bold text-slate-900 text-sm">Live System Feed</h3>
                       <span className="w-2 h-2 bg-[#00C853] rounded-full animate-ping"></span>
                    </div>
                    <div className="space-y-5 overflow-y-auto relative z-10 pr-2">
                       <div className="flex gap-3">
                          <span className="text-lg">🤖</span>
                          <div>
                             <p className="text-sm font-bold text-slate-800 leading-tight">East Legon asset fully verified</p>
                             <p className="text-[10px] text-slate-400 mt-1 uppercase tracking-widest font-bold">14 mins ago</p>
                          </div>
                       </div>
                       <div className="flex gap-3">
                          <span className="text-lg">📈</span>
                          <div>
                             <p className="text-sm font-bold text-slate-800 leading-tight">3 new mortgage portfolios unlocked</p>
                             <p className="text-[10px] text-[#00C853] mt-1 uppercase tracking-widest font-bold opacity-80">Achimota Zone</p>
                          </div>
                       </div>
                       <div className="flex gap-3">
                          <span className="text-lg">⚠️</span>
                          <div>
                             <p className="text-sm font-bold text-slate-800 leading-tight">Cadastral mismatch flagged</p>
                             <p className="text-[10px] text-yellow-500 mt-1 uppercase tracking-widest font-bold opacity-80">Cantonments · ID: AST-482</p>
                          </div>
                       </div>
                    </div>
                    <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-white to-transparent pointer-events-none z-10"></div>
                 </div>

                 {/* Export & Reporting Widgets */}
                 <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-xl p-6 flex-grow flex flex-col relative overflow-hidden group">
                    <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#00C853]/20 rounded-full blur-2xl group-hover:scale-125 transition-transform duration-700"></div>
                    <h3 className="font-black text-white text-lg mb-6 relative z-10">Analytics & Export</h3>
                    
                    <div className="space-y-3 relative z-10 w-full mb-auto">
                       <button className="w-full bg-slate-800 text-left text-white px-4 py-3 rounded-xl text-sm font-bold border border-slate-700 hover:border-[#00C853]/50 hover:bg-slate-800/80 transition-all flex items-center justify-between group/btn">
                          <span>Download Verification Report</span>
                          <span className="text-slate-500 group-hover/btn:text-[#00C853]">PDF ↓</span>
                       </button>
                       <button className="w-full bg-slate-800 text-left text-white px-4 py-3 rounded-xl text-sm font-bold border border-slate-700 hover:border-[#00C853]/50 hover:bg-slate-800/80 transition-all flex items-center justify-between group/btn">
                          <span>Export Live Portfolio</span>
                          <span className="text-slate-500 group-hover/btn:text-[#00C853]">CSV ↓</span>
                       </button>
                       <button className="w-full bg-slate-800 text-left text-white px-4 py-3 rounded-xl text-sm font-bold border border-slate-700 hover:border-[#00C853]/50 hover:bg-slate-800/80 transition-all flex items-center justify-between group/btn">
                          <span>Risk Committee Overview</span>
                          <span className="text-slate-500 group-hover/btn:text-[#00C853]">SHARE ↗</span>
                       </button>
                    </div>
                 </div>
              </div>
           </div>
        </section>

        {/* Closing CTA Pipeline */}
        <section className="bg-slate-50 border-t border-slate-200 pt-24 pb-32 overflow-hidden relative">
           <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#00C853 2px, transparent 2px)', backgroundSize: '40px 40px' }}></div>
           
           <div className="max-w-4xl mx-auto px-4 text-center relative z-10 flex flex-col items-center">
              <div className="w-20 h-20 bg-white rounded-3xl shadow-[0_15px_30px_-5px_rgba(0,0,0,0.1)] flex items-center justify-center font-black text-3xl text-[#00C853] mb-8 border border-slate-100 inline-flex">
                 S
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.1] mb-6">
                 Ready to Integrate <span className="text-[#00C853]">Syntry</span> Into Your Institution?
              </h1>
              <p className="text-lg md:text-xl text-slate-500 font-medium mb-12 max-w-2xl mx-auto leading-relaxed">
                 Secure your portfolio with 8 Layers of Grounded Truth. Deploy the API today and eliminate litigation risk forever.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto justify-center mb-8">
                 <a href="mailto:enterprise@syntry.co?subject=Enterprise Demo Request" className="bg-[#00C853] text-white px-8 py-5 rounded-xl font-black text-[15px] md:text-lg hover:bg-[#00a846] hover:-translate-y-1 transition-all shadow-[0_20px_40px_-10px_rgba(0,200,83,0.4)] border border-[#00C853] flex items-center justify-center">
                    Request Live Enterprise Demo
                 </a>
                 <a href="/brochure-syntry-institutional.pdf" target="_blank" rel="noopener noreferrer" className="bg-white text-slate-700 px-8 py-5 rounded-xl font-bold text-[15px] md:text-lg hover:border-[#00C853] hover:text-[#00C853] border-2 border-slate-200 transition-all shadow-sm flex items-center justify-center">
                    Download Institutional Brochure
                 </a>
              </div>

              <a href="https://wa.me/233531102292" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 bg-white border border-slate-200 px-5 py-3 rounded-full shadow-sm mb-12 group cursor-pointer hover:border-[#00C853]/40 transition-colors">
                 <span className="text-xl group-hover:scale-110 transition-transform">💬</span>
                 <span className="text-sm font-bold text-slate-600">Speak to Institutional Sales Team – <strong className="text-slate-900 group-hover:text-[#00C853] transition-colors">WhatsApp 053 110 2292</strong></span>
              </a>

              <div className="flex flex-wrap justify-center items-center gap-4 md:gap-8 text-[11px] font-bold tracking-widest uppercase text-slate-400">
                 <span className="flex items-center gap-2"><span className="w-2 h-2 bg-slate-300 rounded-full"></span> Secured by AWS</span>
                 <span className="flex items-center gap-2"><span className="w-2 h-2 bg-[#00C853] rounded-full"></span> Powered by 8 Layers of Grounded Truth</span>
                 <span className="flex items-center gap-2"><span className="w-2 h-2 bg-[#D4AF37] rounded-full"></span> Zero Litigation Guarantee</span>
              </div>
           </div>
        </section>
      </main>

      {/* Institutional Privacy & Security Footer */}
      <footer className="bg-slate-900 border-t border-slate-800 py-8 px-4 text-center">
         <p className="text-[11px] font-bold tracking-widest uppercase text-slate-500">
            © 2026 Syntry.co • Secured by AWS • Verified Security Layer Active • For Institutional Use Only
         </p>
      </footer>
      
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
