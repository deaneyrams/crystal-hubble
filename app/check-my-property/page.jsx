'use client';
import { Suspense, useState, useRef } from 'react';
import GlobalHeader from '../../components/GlobalHeader';
import GlobalFooter from '../../components/GlobalFooter';

export default function CheckMyPropertyPage() {
  const [isVerifying, setIsVerifying] = useState(false);
  const [locationStatus, setLocationStatus] = useState('');
  const [coordinates, setCoordinates] = useState(null);
  
  // Quick Audit Engine States
  const [inputType, setInputType] = useState('title');
  const [inputValue, setInputValue] = useState('');
  const [file, setFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [aiAnalysisComplete, setAiAnalysisComplete] = useState(false);
  const [showResults, setShowResults] = useState(false);
  
  // Chat Widget State
  const [isChatOpen, setIsChatOpen] = useState(false);

  const formRef = useRef(null);

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleAutoDetect = () => {
    if (!navigator.geolocation) {
      setLocationStatus('Geolocation is not supported by your browser.');
      return;
    }
    
    setIsVerifying(true);
    setLocationStatus('Requesting GPS coordinates...');
    
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocationStatus('Location secured. Compiling Sovereign Audit...');
        setCoordinates({
          lat: position.coords.latitude.toFixed(6),
          lng: position.coords.longitude.toFixed(6)
        });
        setTimeout(() => {
           setIsVerifying(false);
           setShowResults(true);
           setTimeout(() => {
             document.getElementById('results-dashboard')?.scrollIntoView({ behavior: 'smooth' });
           }, 100);
        }, 1500);
      },
      (error) => {
        setIsVerifying(false);
        setLocationStatus('Failed to access location: ' + error.message);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  };

  const handleFileUpload = (e) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;
    
    setFile(selectedFile);
    setIsUploading(true);
    setUploadProgress(0);
    setAiAnalysisComplete(false);
    
    let progress = 0;
    const uploadInterval = setInterval(() => {
      progress += 20;
      setUploadProgress(progress);
      if (progress >= 100) {
        clearInterval(uploadInterval);
        setIsUploading(false);
        startAiAnalysis();
      }
    }, 300);
  };

  const startAiAnalysis = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      setAiAnalysisComplete(true);
      setTimeout(() => {
        setShowResults(true);
        setTimeout(() => {
          document.getElementById('results-dashboard')?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }, 1000);
    }, 2500); // Simulated AI compute
  };

  const removeFile = () => {
    setFile(null);
    setAiAnalysisComplete(false);
    setUploadProgress(0);
  };

  const benefits = [
    { title: "Real Market Value", desc: "Instantly unlock the true sovereign liquidity index of your land.", icon: "💎" },
    { title: "Mortgage-Ready Status", desc: "Automatically qualify your asset for institutional bank lending.", icon: "🏦" },
    { title: "Dispute Protection", desc: "Lock out squatters and block native litigation with immutable finality.", icon: "🛡️" },
    { title: "Fast-Track Liquidity", desc: "Sell or lease your verified property 4x faster on our global exchange.", icon: "⚡" }
  ];

  const layers = [
    { n: "01", t: "Cadastral Sync", icon: "📐" },
    { n: "02", t: "Lands Commission", icon: "🏛️" },
    { n: "03", t: "OASL Registry", icon: "🧾" },
    { n: "04", t: "Traditional Authority", icon: "👑" },
    { n: "05", t: "Litigation Scan", icon: "⚖️" },
    { n: "06", t: "Physical Ground Truth", icon: "📍" },
    { n: "07", t: "Market APY Index", icon: "📈" },
    { n: "08", t: "Sovereign Audit Issued", icon: "✅" }
  ];

  return (
    <Suspense fallback={<div className="bg-slate-50 min-h-screen" />}>
      <div className="bg-slate-50 min-h-screen text-slate-900 font-sans flex flex-col overflow-x-hidden">
        <GlobalHeader />

        <main className="flex-grow pt-32 pb-20">
          
          {/* Main Hero & Form Split Section */}
          <section className="px-4 md:px-8 max-w-7xl mx-auto mb-24 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            
            {/* Left side: Hero Messaging */}
            <div>
              <div className="inline-flex items-center gap-2 bg-[#00C853]/10 px-4 py-2 rounded-full mb-8 border border-[#00C853]/20 shadow-sm">
                <span className="w-2 h-2 bg-[#00C853] rounded-full animate-pulse shadow-[0_0_8px_#00C853]"></span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#00C853]">The Verification Gateway</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-[60px] font-black leading-[1.1] mb-6 tracking-tight">
                Check My Property<br />
                <span className="text-[#00C853] text-[34px] md:text-[40px] lg:text-[46px] border-b-[6px] border-[#00C853]/20 pb-0.5">Instant 8-Layer Verification</span>
              </h1>
              <p className="text-lg md:text-xl text-slate-500 font-medium leading-relaxed max-w-xl mb-10">
                Auto-detect your GPS • Get land history • AI document analysis • <span className="font-bold text-slate-900 border-b-2 border-slate-900">Zero Litigation Check</span>
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 items-start pb-8 border-b border-slate-200">
                <div className="flex -space-x-4">
                   <div className="w-12 h-12 rounded-full bg-slate-200 border-2 border-white flex items-center justify-center text-xs font-bold text-slate-500">KM</div>
                   <div className="w-12 h-12 rounded-full bg-[#00C853]/20 border-2 border-white flex items-center justify-center text-xs font-bold text-[#00C853]">AS</div>
                   <div className="w-12 h-12 rounded-full bg-slate-900 border-2 border-white flex items-center justify-center text-xs font-bold text-white">12k+</div>
                </div>
                <div className="text-sm font-medium text-slate-500 mt-1 sm:mt-0 sm:ml-4">
                  Join over <span className="font-bold text-slate-900">12,000+</span> owners and <br/>institutions securing assets today.
                </div>
              </div>
            </div>

            {/* Right side: Quick Audit Engine Form */}
            <div ref={formRef} className="relative w-full max-w-lg mx-auto lg:mx-0">
               {/* Decorative background glows */}
               <div className="absolute top-0 right-0 w-64 h-64 bg-[#00C853]/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
               <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl -ml-20 -mb-20"></div>
               
               <div className="bg-white p-6 md:p-8 rounded-[3rem] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.05)] border border-slate-200 relative z-10 transition-transform duration-500 hover:shadow-[0_40px_70px_-15px_rgba(0,200,83,0.1)]">
                  <h3 className="text-2xl font-black text-slate-900 mb-2 px-2">Quick Audit Engine</h3>
                  <p className="text-[13px] font-medium text-slate-500 mb-6 px-2">Input core data or upload documents to query the 8-Layer Sovereign Protocol.</p>

                  <div className="space-y-5">
                     
                     {/* Input Type Selector */}
                     <div className="flex bg-slate-100 p-1 rounded-2xl border border-slate-200/50">
                        <button onClick={() => setInputType('title')} className={`flex-1 py-3 px-2 text-[11px] uppercase tracking-wider font-bold rounded-xl transition-all ${inputType === 'title' ? 'bg-white text-slate-900 shadow-sm border border-slate-200/50' : 'text-slate-500 hover:text-slate-700'}`}>Title Number</button>
                        <button onClick={() => setInputType('ghanapost')} className={`flex-1 py-3 px-2 text-[11px] uppercase tracking-wider font-bold rounded-xl transition-all ${inputType === 'ghanapost' ? 'bg-white text-slate-900 shadow-sm border border-slate-200/50' : 'text-slate-500 hover:text-slate-700'}`}>GhanaPost GPS</button>
                        <button onClick={() => setInputType('gps')} className={`flex-1 py-3 px-2 text-[11px] uppercase tracking-wider font-bold rounded-xl transition-all ${inputType === 'gps' ? 'bg-white text-slate-900 shadow-sm border border-slate-200/50' : 'text-slate-500 hover:text-slate-700'}`}>Lat / Long</button>
                     </div>

                     {/* Dynamic Input */}
                     <input 
                        type="text" 
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder={inputType === 'title' ? 'e.g. AB-2024-04567' : inputType === 'ghanapost' ? 'e.g. GA-183-8164' : 'e.g. 5.6037, -0.1870'} 
                        className="w-full bg-slate-50 border border-slate-200 text-slate-900 px-6 py-4 rounded-2xl font-bold text-sm focus:outline-none focus:ring-2 focus:ring-[#00C853] focus:border-transparent transition-all placeholder:font-medium placeholder:text-slate-400"
                     />

                     {/* Smart Upload Area */}
                     {!file ? (
                        <div className="border-2 border-dashed border-slate-200 rounded-[2rem] hover:border-[#00C853]/50 transition-all bg-slate-50/50 relative overflow-hidden group">
                           <input type="file" onChange={handleFileUpload} accept=".pdf,.jpg,.png" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
                           <div className="p-8 flex flex-col items-center justify-center text-center">
                              <div className="w-14 h-14 bg-white border border-slate-200 rounded-full flex items-center justify-center text-xl mb-4 group-hover:scale-110 group-hover:border-[#00C853]/30 group-hover:bg-[#00C853]/5 shadow-sm transition-all">📄</div>
                              <p className="text-sm font-bold text-slate-700 mb-1">Drag & drop documents here</p>
                              <p className="text-[11px] text-slate-500 font-medium mb-4">PDF, JPG, PNG up to 10MB (Site Plan, Indenture)</p>
                              <span className="text-[10px] font-bold text-[#00C853] uppercase tracking-widest bg-[#00C853]/10 px-4 py-2 rounded-xl">Browse Files</span>
                           </div>
                        </div>
                     ) : (
                        <div className="border-2 border-slate-200 p-5 rounded-[2rem] bg-white shadow-[0_10px_30px_-15px_rgba(0,0,0,0.05)]">
                           <div className="flex items-center justify-between mb-4">
                              <div className="flex items-center gap-4">
                                 <div className="text-2xl bg-slate-50 w-12 h-12 rounded-xl border border-slate-100 flex items-center justify-center">{file.name.endsWith('.pdf') ? '📑' : '🖼️'}</div>
                                 <div className="max-w-[180px]">
                                    <p className="text-sm font-bold text-slate-900 truncate">{file.name}</p>
                                    <p className="text-[10px] uppercase font-bold tracking-widest text-[#00C853]">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                                 </div>
                              </div>
                              <button onClick={removeFile} className="w-8 h-8 flex items-center justify-center bg-slate-50 hover:bg-red-50 text-slate-400 hover:text-red-500 rounded-full transition-colors border border-slate-200 hover:border-red-200">
                                 <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><path d="M6 18L18 6M6 6l12 12"/></svg>
                              </button>
                           </div>

                           {/* Analysis States */}
                           {isUploading && (
                              <div className="space-y-3 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                                 <div className="flex justify-between text-[11px] uppercase tracking-widest font-bold text-slate-500">
                                    <span>Uploading payload...</span>
                                    <span className="text-[#00C853]">{uploadProgress}%</span>
                                 </div>
                                 <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
                                    <div className="bg-[#00C853] h-1.5 rounded-full transition-all duration-300" style={{ width: `${uploadProgress}%` }}></div>
                                 </div>
                              </div>
                           )}

                           {isAnalyzing && (
                              <div className="bg-[#00C853]/5 border border-[#00C853]/20 rounded-2xl p-5 flex items-center gap-4 animate-pulse">
                                 <div className="relative flex items-center justify-center">
                                    <div className="w-10 h-10 border-[3px] border-[#00C853]/30 border-t-[#00C853] rounded-full animate-spin"></div>
                                 </div>
                                 <div>
                                    <p className="text-[10px] font-bold text-[#00C853] uppercase tracking-[3px] mb-1 flex items-center gap-1.5">
                                       <span className="w-1.5 h-1.5 bg-[#00C853] rounded-full animate-ping"></span> AI Engine Active
                                    </p>
                                    <p className="text-xs font-bold text-slate-700">Analysing Document & Geofencing Boundaries...</p>
                                 </div>
                              </div>
                           )}

                           {aiAnalysisComplete && (
                              <div className="bg-white border border-[#00C853]/30 shadow-[0_10px_20px_-10px_rgba(0,200,83,0.15)] rounded-2xl p-5">
                                 <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-100">
                                    <span className="w-6 h-6 bg-[#00C853]/20 text-[#00C853] rounded-full flex items-center justify-center text-xs font-black">✓</span>
                                    <p className="text-[11px] font-bold text-slate-900 uppercase tracking-widest">Document Parsed</p>
                                 </div>
                                 <ul className="space-y-2.5 text-xs font-medium text-slate-600">
                                    <li className="flex items-start gap-2.5 leading-snug"><span className="text-[#00C853] text-[10px] mt-0.5">●</span> Title appears structurally valid and matches Lands historical format.</li>
                                    <li className="flex items-start gap-2.5 leading-snug"><span className="text-amber-500 text-[10px] mt-0.5">●</span> Minor boundary variance detected against digital master map.</li>
                                    <li className="flex items-start gap-2.5 leading-snug"><span className="text-slate-900 text-[10px] mt-0.5">●</span> <span className="font-bold underline decoration-[#00C853] decoration-2 underline-offset-2">Highly Recommend full 8-Layer run</span> to assert definitive coordinates.</li>
                                 </ul>
                              </div>
                           )}
                        </div>
                     )}

                     {/* The Macro Action */}
                     <button 
                        onClick={() => {
                           setIsVerifying(true);
                           setTimeout(() => {
                              setIsVerifying(false);
                              setShowResults(true);
                              setTimeout(() => {
                                document.getElementById('results-dashboard')?.scrollIntoView({ behavior: 'smooth' });
                              }, 100);
                           }, 2000);
                        }}
                        disabled={isVerifying}
                        className={`w-full py-5 rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl transition-all flex items-center justify-center gap-3 border-2 ${isVerifying ? 'bg-slate-50 border-slate-200 text-slate-400 cursor-not-allowed' : 'bg-[#00C853] border-[#00C853] text-white hover:bg-[#00a846] hover:-translate-y-1 hover:shadow-[0_20px_40px_-15px_rgba(0,200,83,0.4)]'}`}
                     >
                        {isVerifying ? 'Initiating Pipeline...' : 'Run Full 8-Layer Verification'}
                     </button>
                  </div>

                  <div className="mt-6 text-center pt-2">
                     <div className="flex justify-center items-center gap-3">
                        <span className="flex items-center gap-1.5 bg-[#00C853]/10 border border-[#00C853]/20 px-3 py-1.5 rounded-xl text-[9px] font-bold text-[#00C853] uppercase tracking-widest"><span className="w-1.5 h-1.5 bg-[#00C853] rounded-full animate-pulse shadow-[0_0_5px_#00C853]"></span> Bank-Level Encrypted</span>
                     </div>
                  </div>
               </div>
            </div>
          </section>


          {/* Step-by-Step Security Pipeline */}
          <section className="px-4 md:px-8 max-w-7xl mx-auto mb-32 bg-white border border-slate-200 rounded-[3rem] p-10 md:p-16 shadow-sm overflow-hidden relative">
             <div className="absolute top-0 right-0 w-[500px] h-[500px] border border-slate-100 rounded-full -mr-[250px] -mt-[250px]"></div>
             <div className="text-center mb-16 relative z-10">
                <h2 className="text-3xl md:text-4xl font-black mb-4 tracking-tight text-slate-900">The Grounded Truth Pipeline</h2>
                <p className="text-slate-500 font-medium text-lg max-w-2xl mx-auto">See exactly how our algorithms index your land against local statutes before stamping it Sovereign SECURE.</p>
             </div>
             
             <div className="flex overflow-x-auto no-scrollbar pb-10 -mx-10 px-10 relative z-10 hidden-scrollbar">
                <div className="flex gap-4 md:gap-6 mx-auto snap-x">
                   {layers.map((layer, i) => (
                     <div key={i} className="flex flex-col items-center min-w-[140px] snap-center group">
                        <div className={`w-20 h-20 rounded-[2rem] flex items-center justify-center text-3xl shadow-sm border-2 transition-all duration-500 mb-6 bg-slate-50 border-slate-200 group-hover:border-[#00C853] group-hover:scale-110 group-hover:shadow-[0_10px_30px_-10px_rgba(0,200,83,0.3)] ${isVerifying ? 'border-[#00C853] bg-[#00C853]/10 scale-105' : ''}`}>
                           {layer.icon}
                        </div>
                        <div className="text-center">
                           <p className="text-[10px] font-bold text-[#00C853] uppercase tracking-widest mb-2 border border-[#00C853]/20 bg-[#00C853]/5 px-2 py-0.5 rounded inline-block">Layer {layer.n}</p>
                           <p className="text-xs font-bold text-slate-900 uppercase tracking-wider">{layer.t}</p>
                        </div>
                     </div>
                   ))}
                 </div>
             </div>
          </section>


          {/* Value Prop Modules */}
          <section className="px-4 md:px-8 max-w-7xl mx-auto mb-32">
             <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-black tracking-tight text-slate-900 mb-4">Why check your plot status?</h2>
             </div>
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {benefits.map((b, i) => (
                  <div key={i} className="bg-white border border-slate-200 p-8 rounded-[2rem] shadow-sm hover:border-[#00C853]/50 hover:shadow-lg transition-all duration-300 group">
                     <div className="w-14 h-14 bg-slate-50 border border-slate-200 rounded-2xl flex items-center justify-center text-2xl mb-6 group-hover:bg-[#00C853]/10 group-hover:border-[#00C853]/20 transition-colors">
                        {b.icon}
                     </div>
                     <h4 className="text-lg font-bold text-slate-900 mb-3">{b.title}</h4>
                     <p className="text-sm font-medium text-slate-500 leading-relaxed">{b.desc}</p>
                  </div>
                ))}
             </div>
          </section>


          {/* Smart Results Dashboard Triggered by Verification */}
          {showResults && (
             <section id="results-dashboard" className="px-4 md:px-8 max-w-7xl mx-auto mb-32 animate-in fade-in slide-in-from-bottom-10 duration-700">
               <div className="bg-white border border-slate-200 rounded-[3rem] p-8 md:p-12 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.05)] text-slate-900 border-t-8 border-t-[#00C853] relative overflow-hidden">
                 
                 <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-6">
                    <div>
                       <h2 className="text-3xl font-black tracking-tight flex items-center gap-3">
                         <span className="text-4xl">🏛️</span> Verified Sovereign Status
                       </h2>
                       <p className="text-slate-500 font-medium mt-2">Analysis complete. Asset is secured by Syntry 8-Layer Protocol.</p>
                    </div>
                    <div className="flex flex-wrap gap-3">
                       <span className="bg-[#00C853]/10 text-[#00C853] px-4 py-2 rounded-xl font-bold text-[11px] uppercase tracking-widest border border-[#00C853]/20 flex items-center gap-2">
                         <span className="w-1.5 h-1.5 bg-[#00C853] rounded-full animate-pulse shadow-[0_0_5px_currentColor]"></span> Mortgage-Ready
                       </span>
                       <span className="bg-slate-100 text-slate-500 px-4 py-2 rounded-xl font-bold text-[11px] uppercase tracking-widest border border-slate-200">
                         Litigation: 0.00%
                       </span>
                    </div>
                 </div>

                 {/* NEW: Prominent Risk Summary Top Banner */}
                 <div className="bg-[#00C853]/5 border-l-4 border-[#00C853] p-5 md:p-6 rounded-r-2xl mb-10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                       <h3 className="text-[#00C853] font-black text-xl mb-1">Overall Risk Level: VERY LOW</h3>
                       <p className="text-slate-700 font-medium text-sm md:text-base">This asset has passed all 8 Layers with <strong>98.7% average confidence</strong>. No red flags detected.</p>
                    </div>
                    {/* Subtle Trust Elements */}
                    <div className="shrink-0 flex flex-col items-end hidden sm:flex">
                       <p className="text-[9px] uppercase tracking-widest font-bold text-slate-400 mb-1">Secured by Syntry 8-Layer Protocol</p>
                       <p className="text-[9px] uppercase tracking-widest font-bold text-slate-400 flex items-center gap-1.5"><span className="w-1 h-1 bg-[#00C853] rounded-full"></span> Real-time data from Lands Commission</p>
                    </div>
                 </div>

                 <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
                    
                    {/* Left Col: Enhanced Map & Coords */}
                    <div className="lg:col-span-1 space-y-6">
                       {/* Map Block */}
                       <div className="w-full h-56 bg-slate-100 rounded-2xl overflow-hidden relative border border-slate-200 group lg:h-64">
                          <div className="absolute inset-0 opacity-20 transition-transform duration-[10s] group-hover:scale-110" style={{ backgroundImage: 'radial-gradient(#00C853 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
                          <div className="absolute inset-0 bg-blue-500/5 group-hover:bg-blue-500/10 transition-colors"></div>
                          
                          {/* Ping Animation */}
                          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                             <div className="w-8 h-8 bg-[#00C853] rounded-full shadow-[0_0_20px_#00C853] border-4 border-white animate-bounce relative z-10"></div>
                             <div className="w-8 h-8 bg-[#00C853] rounded-full absolute top-0 left-0 animate-ping opacity-75"></div>
                          </div>
                          
                          <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-md px-4 py-2 rounded-xl border border-slate-200 shadow-lg flex items-center gap-2">
                             <span className="w-2 h-2 bg-[#00C853] rounded-full animate-pulse"></span>
                             <span className="text-[11px] font-black uppercase tracking-widest text-[#00C853]">GPS Locked</span>
                          </div>
                       </div>
                       
                       {/* Identity Block */}
                       <div className="bg-gradient-to-br from-slate-50 to-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                          <p className="text-[10px] uppercase font-bold text-slate-400 tracking-widest mb-4 border-b border-slate-200 pb-2 flex items-center gap-2">
                             <span className="text-xl">📍</span> Location Identity
                          </p>
                          <div className="space-y-4">
                             <div>
                                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-1.5">Geospatial Coordinates</p>
                                <p className="text-base font-black text-slate-900 font-mono tracking-tight bg-slate-100 px-3 py-1.5 rounded-lg inline-block border border-slate-200">{coordinates ? `${coordinates.lat}, ${coordinates.lng}` : '5.6037° N, -0.1870° W'}</p>
                             </div>
                             <div>
                                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-1.5">GhanaPost Digital Address</p>
                                <p className="text-sm font-black text-slate-900 bg-slate-100 px-3 py-1.5 rounded-lg inline-block border border-slate-200">GA-183-8164</p>
                             </div>
                          </div>
                       </div>
                    </div>

                    {/* Middle & Right Col: History & Layers */}
                    <div className="lg:col-span-2 space-y-8">
                       
                       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          
                          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 shadow-inner">
                             <p className="text-[10px] uppercase font-bold text-slate-400 tracking-widest mb-4 border-b border-slate-200 pb-2">Recent Transaction History</p>
                             <div className="space-y-4">
                                {/* Transaction 1 */}
                                <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm relative hover:border-[#00C853]/30 hover:shadow-md transition-all">
                                   <div className="absolute top-4 right-4 text-[9px] uppercase font-bold text-slate-400">14 Oct 2021</div>
                                   <p className="text-[10px] uppercase tracking-widest font-black text-[#00C853] mb-1">Transfer to K. Asamoah Ltd</p>
                                   <p className="text-sm font-bold text-slate-900 mb-0.5">K. Asamoah Ltd <span className="text-slate-400 font-medium text-xs">← Previous Owner</span></p>
                                   <p className="text-xs font-bold text-slate-500 mt-1">Value: GH₵1,850,000</p>
                                </div>
                                {/* Transaction 2 */}
                                <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm relative hover:border-[#00C853]/30 transition-all">
                                   <div className="absolute top-4 right-4 text-[9px] uppercase font-bold text-slate-400">03 Mar 2019</div>
                                   <p className="text-[10px] uppercase tracking-widest font-bold text-slate-500 mb-1">Lease Registration</p>
                                   <p className="text-sm font-bold text-slate-900 mb-0.5">Previous Owner</p>
                                   <p className="text-xs font-medium text-slate-400 mt-1">Value: Undisclosed</p>
                                </div>
                                {/* Transaction 3 */}
                                <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm relative hover:border-[#00C853]/30 transition-all">
                                   <div className="absolute top-4 right-4 text-[9px] uppercase font-bold text-slate-400">12 Nov 2015</div>
                                   <p className="text-[10px] uppercase tracking-widest font-bold text-slate-500 mb-1">Initial Registration</p>
                                   <p className="text-sm font-bold text-slate-900 mb-0.5">Original Owner</p>
                                   <p className="text-xs font-medium text-slate-400 mt-1">First Entry</p>
                                </div>
                             </div>
                          </div>
                          
                          {/* Financial Index Prominent */}
                          <div className="bg-slate-900 text-white border-2 border-slate-800 rounded-2xl p-6 relative overflow-hidden flex flex-col shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)] transform hover:-translate-y-1 transition-transform">
                             <div className="absolute inset-0 bg-gradient-to-br from-slate-900 to-black"></div>
                             <div className="absolute top-0 right-0 w-48 h-48 bg-[#00C853]/20 rounded-full blur-[40px] -mr-10 -mt-10 pointer-events-none"></div>
                             
                             <p className="text-[10px] uppercase font-bold text-[#00C853] tracking-[0.2em] mb-4 border-b border-slate-800 pb-2 relative z-10 w-full flex justify-between items-center">
                               Financial Index 
                               <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 bg-[#00C853] rounded-full animate-pulse"></span> Live Sync</span>
                             </p>
                             
                             <div className="relative z-10 mb-auto pt-2">
                                <div>
                                   <p className="text-[11px] text-slate-400 uppercase tracking-widest mb-1.5">Estimated Sovereign Valuation</p>
                                   <p className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#00C853] to-emerald-300">GH₵ 3.2M</p>
                                </div>
                                <div className="mt-8 flex gap-8">
                                   <div>
                                      <p className="text-[10px] text-slate-400 uppercase tracking-widest mb-1">Rental Yield</p>
                                      <p className="text-xl font-bold bg-[#00C853]/10 px-3 py-1.5 rounded-lg border border-[#00C853]/20 inline-block text-[#00C853]">12.4% APY</p>
                                   </div>
                                   <div>
                                      <p className="text-[10px] text-slate-400 uppercase tracking-widest mb-1">Growth (YOY)</p>
                                      <p className="text-xl font-bold text-emerald-400 px-2 py-1.5">+8.2%</p>
                                   </div>
                                </div>
                             </div>
                          </div>
                       </div>

                       <div className="pt-4 border-t border-slate-100">
                          <div className="flex justify-between items-center mb-5">
                             <p className="text-[11px] uppercase font-black text-slate-900 tracking-widest">8-Layer Protocol Status</p>
                             <span className="bg-[#00C853]/10 text-[#00C853] px-3 py-1.5 rounded-lg border border-[#00C853]/20 text-[10px] uppercase font-bold flex items-center gap-2">
                               <span className="w-1.5 h-1.5 bg-[#00C853] rounded-full animate-ping"></span> 100% Cleared
                             </span>
                          </div>
                          
                          {/* 8-Layer Granular Grid Array */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                             {[
                                { name: "GPS Geospatial Lock", icon: "📍", conf: "99.8%", desc: "Physical coordinates perfectly map to recorded digital boundaries.", src: "GPS Orbit API" },
                                { name: "True Cadastral Polygon", icon: "🗺️", conf: "100%", desc: "The land shape exactly matches the official surveyed map.", src: "Survey Dept" },
                                { name: "Digital Name Verification", icon: "👤", conf: "99.1%", desc: "The current documented name matches official identity records.", src: "Lands Commission" },
                                { name: "Spousal & Consent Clearance", icon: "💍", conf: "100%", desc: "No conflicting claims or missing spousal consent detected.", src: "Court Registry" },
                                { name: "Litigation Sweep", icon: "⚖️", conf: "100%", desc: "Zero active or historical disputes involving this asset.", src: "Judicial Track" },
                                { name: "AML & KYC Clearance", icon: "🛡️", conf: "99.5%", desc: "All parties pass anti-money laundering and identity checks.", src: "Fin. Intel. Center" },
                                { name: "Grounded Utility Check", icon: "⚡", conf: "98.0%", desc: "Asset conforms to grid, tax, and infrastructure claims.", src: "ECG/GRA" },
                                { name: "Chief & Stool Lands Registry", icon: "👑", conf: "100%", desc: "Properly authenticated by customary authorities / trustees.", src: "Stool Lands Admin" }
                             ].map((layer, i) => (
                                <div key={i} className="bg-white border border-slate-200 rounded-xl p-5 hover:border-[#00C853]/50 hover:shadow-lg transition-all group flex flex-col justify-between">
                                   <div className="flex justify-between items-start mb-3">
                                      <div className="flex items-center gap-3">
                                         <div className="w-9 h-9 rounded-xl bg-slate-50 flex items-center justify-center text-base border border-slate-100 group-hover:scale-110 group-hover:bg-white group-hover:shadow-sm transition-all">{layer.icon}</div>
                                         <h5 className="font-bold text-slate-900 text-sm truncate max-w-[150px]" title={layer.name}>{layer.name}</h5>
                                      </div>
                                      <div className="flex gap-2 items-center bg-[#00C853]/5 px-2.5 py-1.5 rounded-lg border border-[#00C853]/10">
                                         <span className="text-[10px] font-black text-[#00C853] tracking-widest">{layer.conf}</span>
                                         <div className="w-4 h-4 bg-[#00C853] text-white rounded-full flex items-center justify-center text-[8px] font-bold shadow-[0_2px_5px_rgba(0,200,83,0.4)]">✓</div>
                                      </div>
                                   </div>
                                   <p className="text-[12px] text-slate-500 font-medium mb-4 leading-relaxed">{layer.desc}</p>
                                   <div className="flex justify-between items-center border-t border-slate-100 pt-3 mt-auto">
                                      <p className="text-[9px] uppercase font-bold text-slate-400 tracking-widest">Src: {layer.src}</p>
                                      <p className="text-[9px] uppercase font-bold text-slate-400 tracking-widest flex items-center gap-1.5">
                                         <span className="w-1.5 h-1.5 bg-[#00C853] rounded-full"></span> Live
                                      </p>
                                   </div>
                                </div>
                             ))}
                          </div>
                       </div>
                    </div>
                 </div>

                 {/* Enhanced Action Hooks & Buttons */}
                 <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-10 border-t border-slate-100">
                    <button className="w-full sm:w-auto bg-[#00C853] text-white px-8 py-4 rounded-xl font-bold text-[15px] hover:bg-[#00a846] hover:-translate-y-1 transition-all shadow-[0_15px_30px_-10px_rgba(0,200,83,0.5)] flex items-center justify-center gap-2 border border-[#00C853]">
                       <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                       Download Full Report PDF
                    </button>
                    
                    <button className="w-full sm:w-auto bg-white border-2 border-slate-200 text-slate-800 px-8 py-3.5 rounded-xl font-bold text-[15px] hover:border-[#00C853] hover:text-[#00C853] hover:shadow-md transition-all flex items-center justify-center gap-2 relative group">
                       <span className="absolute inset-0 bg-[#00C853]/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"></span>
                       <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="relative z-10"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                       <span className="relative z-10">Share to WhatsApp</span>
                    </button>
                    
                    <button className="w-full sm:w-auto bg-slate-900 border-2 border-slate-900 text-white px-8 py-3.5 rounded-xl font-black text-[15px] hover:bg-slate-800 hover:-translate-y-1 transition-all flex items-center justify-center gap-2 shadow-lg">
                       <span className="text-xl">🚀</span> List This Property
                    </button>
                 </div>
                 
                 {/* Mobile Trust Elements Baseline */}
                 <div className="mt-8 text-center sm:hidden flex flex-col gap-2 border-t border-slate-100 pt-6">
                    <p className="text-[10px] uppercase tracking-widest font-bold text-slate-400">Secured by Syntry 8-Layer Protocol</p>
                    <p className="text-[10px] uppercase tracking-widest font-bold text-slate-400 flex items-center justify-center gap-1.5"><span className="w-1.5 h-1.5 bg-[#00C853] rounded-full animate-pulse"></span> Real-time Lands Data</p>
                 </div>

               </div>
             </section>
          )}

          {/* Final Closing Section */}
          <section className="bg-white border-t border-slate-200 py-24 relative overflow-hidden">
             {/* Subtle background element */}
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#00C853]/5 rounded-full blur-[100px] pointer-events-none"></div>

             <div className="max-w-4xl mx-auto px-4 md:px-8 text-center relative z-10">
                <div className="w-16 h-16 bg-[#00C853]/10 text-[#00C853] rounded-2xl flex items-center justify-center text-3xl mx-auto mb-6 shadow-sm border border-[#00C853]/20">
                   🚀
                </div>
                <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">Your Next Strategic Move.</h2>
                <p className="text-lg font-medium text-slate-500 mb-10 max-w-2xl mx-auto">
                   Whether you are securing a mortgage, liquidating assets, or protecting generational wealth, Syntry provides the immediate infrastructure to execute.
                </p>
                
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                   <button className="w-full sm:w-auto bg-[#00C853] text-white px-8 py-4 rounded-2xl font-bold text-[15px] hover:bg-[#00a846] transition-all shadow-[0_10px_30px_-10px_rgba(0,200,83,0.4)] hover:shadow-[0_20px_40px_-10px_rgba(0,200,83,0.5)] hover:-translate-y-1 border border-[#00C853]">
                      Get Full Report
                   </button>
                   <button className="w-full sm:w-auto bg-slate-900 text-white px-8 py-4 rounded-2xl font-bold text-[15px] hover:bg-slate-800 transition-all shadow-xl hover:-translate-y-1">
                      Proceed to Marketplace
                   </button>
                </div>
                
                <div className="mt-8 pt-8 border-t border-slate-100 flex justify-center items-center">
                   <p className="text-sm font-bold text-slate-500 flex items-center gap-2">
                      Need institutional assistance? 
                      <a href="https://wa.me/233531102292" className="text-[#00C853] hover:underline flex items-center gap-1.5 focus:outline-none focus:ring-2 focus:ring-[#00C853] rounded">
                         <span className="text-lg">💬</span> Talk to a Verification Expert: 053 110 2292
                      </a>
                   </p>
                </div>
             </div>
          </section>

        </main>

        <GlobalFooter />

        {/* Floating AI Chat Widget */}
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
           {isChatOpen && (
              <div className="bg-white w-[340px] sm:w-[400px] rounded-[2rem] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)] border border-slate-200 mb-6 overflow-hidden animate-in slide-in-from-bottom-5 duration-300 origin-bottom-right">
                 {/* Chat Header */}
                 <div className="bg-slate-900 text-white p-5 flex justify-between items-center relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-[#00C853]/20 blur-2xl rounded-full -mr-10 -mt-10"></div>
                    <div className="flex items-center gap-3 relative z-10">
                       <div className="relative">
                          <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-xl backdrop-blur-sm border border-white/20">🤖</div>
                          <span className="absolute bottom-0 right-0 w-3 h-3 bg-[#00C853] border-2 border-slate-900 rounded-full animate-pulse"></span>
                       </div>
                       <div>
                          <p className="font-bold text-sm tracking-wide">Syntry AI</p>
                          <p className="text-[10px] text-[#00C853] uppercase tracking-widest font-bold">Property Oracle Active</p>
                       </div>
                    </div>
                    <button onClick={() => setIsChatOpen(false)} className="text-slate-400 hover:text-white transition-colors relative z-10 p-1">
                       <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><path d="M18 6L6 18M6 6l12 12"/></svg>
                    </button>
                 </div>
                 
                 {/* Chat Body */}
                 <div className="p-5 h-[300px] overflow-y-auto bg-slate-50 space-y-4">
                    <p className="text-[10px] text-center text-slate-400 font-bold uppercase tracking-widest my-2">Today at {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                    <div className="flex items-start gap-3 w-11/12">
                       <div className="w-8 h-8 rounded-full bg-slate-900 flex-shrink-0 flex items-center justify-center text-sm shadow-sm ring-2 ring-white">🤖</div>
                       <div className="bg-white border border-slate-200 p-4 rounded-2xl rounded-tl-sm shadow-[0_5px_15px_-5px_rgba(0,0,0,0.05)] text-[13px] font-medium text-slate-700 leading-relaxed">
                          Greetings. I have indexed the verification data. I can explain your 8-Layer results, break down the valuation matrix, or detail the exact next steps for immediate mortgage qualification. How can I assist?
                       </div>
                    </div>
                 </div>

                 {/* Chat Input */}
                 <div className="p-4 bg-white border-t border-slate-100">
                    <div className="relative">
                       <input type="text" placeholder="Ask about this property..." className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-4 pr-12 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#00C853] focus:border-transparent transition-all" />
                       <button className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-[#00C853] text-white rounded-lg flex items-center justify-center hover:bg-[#00a846] transition-colors shadow-sm">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
                       </button>
                    </div>
                    <div className="flex gap-2 mt-3 overflow-x-auto no-scrollbar pb-1">
                       <button className="text-[10px] font-bold text-slate-500 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-full whitespace-nowrap hover:bg-slate-100 hover:text-slate-700 transition-colors">Explain Yield APY</button>
                       <button className="text-[10px] font-bold text-slate-500 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-full whitespace-nowrap hover:bg-slate-100 hover:text-slate-700 transition-colors">How to Mortgage?</button>
                    </div>
                 </div>
              </div>
           )}

           {/* Floating Trigger Button */}
           <button 
              onClick={() => setIsChatOpen(!isChatOpen)}
              className="group bg-slate-900 text-white h-[60px] rounded-full pl-5 pr-6 flex items-center justify-center gap-3 shadow-[0_15px_30px_-5px_rgba(0,0,0,0.3)] hover:shadow-[0_20px_40px_-5px_rgba(0,0,0,0.4)] hover:-translate-y-1 transition-all border border-slate-800"
           >
              <div className="relative flex items-center justify-center bg-white/10 w-10 h-10 rounded-full backdrop-blur-sm border border-white/20">
                 <span className="text-xl group-hover:scale-110 transition-transform">🤖</span>
                 {!isChatOpen && <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-[#00C853] rounded-full border border-slate-900 animate-pulse"></span>}
              </div>
              <div className="flex flex-col items-start -space-y-0.5 hidden sm:flex">
                 <span className="text-[10px] uppercase font-bold tracking-widest text-[#00C853]">Ask Syntry AI</span>
                 <span className="font-bold text-sm">About this property</span>
              </div>
           </button>
        </div>

      </div>
    </Suspense>
  );
}
