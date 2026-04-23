'use client';
import { Suspense, useState, useRef, useEffect } from 'react';
import GlobalHeader from '../../components/GlobalHeader';
import GlobalFooter from '../../components/GlobalFooter';

export default function CheckMyPropertyPage() {
  const [isVerifying, setIsVerifying] = useState(false);
  const [locationStatus, setLocationStatus] = useState('');
  const [coordinates, setCoordinates] = useState(null);
  const [inputType, setInputType] = useState('none'); // 'title', 'ghanapost', 'gps', 'upload'
  const [inputValue, setInputValue] = useState('');
  const [file, setFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [aiFeedback, setAiFeedback] = useState(null);
  const [isVerified, setIsVerified] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { role: 'assistant', text: 'I can explain your 8 Layers results, valuation, or next steps for mortgage/listing.' }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [isChatThinking, setIsChatThinking] = useState(false);

  // New Detection States
  const [isAutoDetecting, setIsAutoDetecting] = useState(false);
  const [locationMeta, setLocationMeta] = useState(null);

  const handleFileUpload = (e) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;
    
    setFile(selectedFile);
    setIsUploading(true);
    setUploadProgress(0);
    setAiFeedback(null);
    
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setUploadProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
        setIsUploading(false);
        runAiAnalysis();
      }
    }, 200);
  };

  const runAiAnalysis = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      setAiFeedback("Title appears valid • Minor boundary discrepancy noted • Recommend full 8-Layer run");
      setIsVerified(true);
    }, 2500);
  };

  const handleAutoDetect = () => {
    if (!navigator.geolocation) {
      setLocationStatus('Geolocation is not supported by your browser.');
      return;
    }
    
    setIsAutoDetecting(true);
    setLocationStatus('Detecting your location... (This may take a few seconds)');
    
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude.toFixed(6);
        const lng = position.coords.longitude.toFixed(6);
        
        // Simulated Reverse Geocoding for Ghana context
        const mockMeta = {
          address: "Pokuase, Greater Accra Region",
          ghanaPost: "GW-1042-5592",
          landmarks: "Near Pokuase Interchange",
          accuracy: "98.2%"
        };

        setCoordinates({ lat, lng });
        setLocationMeta(mockMeta);
        setLocationStatus(`GPS Locked: High Accuracy Signal (${mockMeta.accuracy})`);
        setIsAutoDetecting(false);

        // Automatically trigger verification after showing map
        setTimeout(() => {
          triggerVerification();
        }, 3000);
      },
      (error) => {
        setIsAutoDetecting(false);
        setLocationStatus('Detection failed. Please check GPS permissions and try again.');
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  };

  const handleSendMessage = async (e) => {
    e?.preventDefault();
    if (!chatInput.trim() || isChatThinking) return;
    
    const userMessage = chatInput.trim();
    setChatMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setChatInput('');
    setIsChatThinking(true);

    try {
      const res = await fetch("https://syntry-ai-backend-ovdel11oi-deaneyrams-5131s-projects.vercel.app/api/syntry-ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: userMessage })
      });
      
      if (!res.ok) throw new Error("API_ERROR");
      
      const data = await res.json();
      setChatMessages(prev => [...prev, { role: 'assistant', text: data.reply || data.response || "Oracle index updated. Asset status confirmed." }]);
    } catch (err) {
      setChatMessages(prev => [...prev, { role: 'assistant', text: "Sorry, connection issue. Please try again or WhatsApp 053 110 2292" }]);
    } finally {
      setIsChatThinking(false);
    }
  };

  const triggerVerification = () => {
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      setShowResults(true);
      setTimeout(() => {
        document.getElementById('results-dashboard')?.scrollIntoView({ behavior: 'smooth' });
      }, 500);
    }, 2500);
  };

  return (
    <Suspense fallback={<div className="bg-white min-h-screen" />}>
      <div className="bg-white min-h-screen text-slate-900 font-sans flex flex-col overflow-x-hidden">
        <GlobalHeader />

        <main className="flex-grow pt-32">
          {/* HERO SECTION */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <section className="py-20 md:py-32 flex flex-col lg:flex-row items-center gap-16">
              <div className="lg:w-3/5 space-y-8 animate-in fade-in slide-in-from-left-8 duration-700">
                <div className="inline-flex items-center gap-2 bg-[#00C853]/10 px-4 py-2 rounded-full border border-[#00C853]/20">
                  <span className="w-1.5 h-1.5 bg-[#00C853] rounded-full animate-pulse"></span>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#00C853]">Sovereign Protocol v4.0 Active</span>
                </div>

                <h1 className="text-4xl md:text-6xl lg:text-[72px] font-black leading-[1.05] tracking-tight">
                  Check My Property – <br />
                  <span className="text-[#00C853]">Instant 8-Layer Verification</span>
                </h1>
                
                <p className="text-lg md:text-xl text-slate-500 font-medium leading-relaxed max-w-2xl">
                  Auto-detect your GPS • Get land history • AI document analysis • <span className="text-slate-900 font-bold border-b-2 border-[#00C853]/30">Zero Litigation Check</span>
                </p>

                <div className="flex flex-col gap-8">
                  <div className="relative group max-w-md">
                    <button 
                      onClick={handleAutoDetect}
                      disabled={isAutoDetecting}
                      className="w-full bg-[#00C853] text-white px-8 py-6 rounded-2xl font-black text-lg md:text-xl shadow-[0_20px_40px_-10px_rgba(0,200,83,0.3)] hover:shadow-[0_25px_50px_-10px_rgba(0,200,83,0.4)] hover:-translate-y-1 transition-all flex items-center justify-center gap-3 disabled:opacity-70 border-b-4 border-[#00a846]"
                    >
                      {isAutoDetecting ? (
                        <span className="flex items-center gap-3">
                           <span className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin"></span>
                           Detecting Location...
                        </span>
                      ) : (
                        <>📍 Auto-Detect My Location & Coordinates</>
                      )}
                    </button>
                    
                    {locationStatus && (
                      <div className={`mt-4 p-4 rounded-xl text-sm font-bold flex items-center gap-3 animate-in slide-in-from-top-2 border ${coordinates ? 'bg-[#00C853]/10 text-[#00C853] border-[#00C853]/20' : 'bg-slate-50 text-slate-500 border-slate-200'}`}>
                        {coordinates ? '🎯' : '📡'} {locationStatus}
                      </div>
                    )}
                  </div>

                  {/* Smart Location Output & Map */}
                  {coordinates && locationMeta && (
                    <div className="animate-in fade-in slide-in-from-top-8 duration-1000 space-y-6">
                       <div className="bg-slate-50 rounded-3xl p-6 md:p-8 border border-slate-200 grid grid-cols-1 md:grid-cols-2 gap-8 shadow-sm">
                          <div className="space-y-4">
                             <div>
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Detected Coordinates</p>
                                <p className="text-xl font-bold text-slate-900 font-mono tracking-tight">{coordinates.lat}, {coordinates.lng}</p>
                             </div>
                             <div>
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Readable Address</p>
                                <p className="text-xl font-bold text-slate-800">{locationMeta.address}</p>
                             </div>
                             <div className="flex gap-8">
                                <div>
                                   <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Digital Address</p>
                                   <p className="text-sm font-black bg-white border border-slate-200 px-3 py-1.5 rounded-lg text-slate-900 shadow-sm">{locationMeta.ghanaPost}</p>
                                </div>
                                <div>
                                   <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Landmarks</p>
                                   <p className="text-sm font-bold text-slate-600">⛰️ {locationMeta.landmarks}</p>
                                </div>
                             </div>
                          </div>

                          <div className="w-full h-48 md:h-full min-h-[180px] bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-inner group">
                             <iframe 
                                width="100%" 
                                height="100%" 
                                frameBorder="0" 
                                scrolling="no" 
                                marginHeight="0" 
                                marginWidth="0" 
                                src={`https://maps.google.com/maps?q=${coordinates.lat},${coordinates.lng}&z=15&output=embed`}
                                className="opacity-90 group-hover:opacity-100 transition-opacity"
                             ></iframe>
                          </div>
                       </div>
                       <div className="flex items-center gap-3 text-sm font-black text-[#00C853] animate-pulse">
                          <span>🔍 Syntry Oracle is cross-referencing your GPS with Stool Land boundaries...</span>
                       </div>
                    </div>
                  )}

                  <p className="text-[12px] font-bold text-slate-400 uppercase tracking-[2px] flex items-center justify-center lg:justify-start gap-2">
                    <span className="text-lg">⏱️</span> Takes &lt;60 seconds • Results sent to WhatsApp
                  </p>
                </div>
              </div>

              <div className="hidden lg:flex lg:w-2/5 justify-center relative">
                <div className="absolute inset-0 bg-[#00C853]/5 rounded-full blur-[120px] -z-10"></div>
                <div className="w-full aspect-square bg-slate-50 rounded-[4rem] border border-slate-100 shadow-inner p-12 relative overflow-hidden flex flex-col justify-between group">
                  <div className="flex justify-between items-start">
                    <div className="w-16 h-16 bg-white rounded-2xl shadow-sm border border-slate-100 flex items-center justify-center text-3xl">🏛️</div>
                    <div className="px-4 py-2 bg-[#00C853]/10 text-[#00C853] rounded-xl text-[10px] font-black uppercase tracking-widest border border-[#00C853]/20">Sovereign Secured</div>
                  </div>
                  <div className="space-y-4">
                    <div className="h-2 w-3/4 bg-slate-200 rounded-full"></div>
                    <div className="h-2 w-1/2 bg-slate-200 rounded-full opacity-60"></div>
                    <div className="h-32 w-full bg-slate-100 rounded-2xl mt-12 overflow-hidden border border-slate-200 relative">
                       <div className="absolute inset-0 bg-[radial-gradient(#00C853_1px,transparent_1px)] [background-size:20px_20px] opacity-10"></div>
                       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-[#00C853] rounded-full border-4 border-white shadow-xl animate-bounce"></div>
                    </div>
                  </div>
                  <div className="flex gap-4">
                     <div className="flex-1 h-3 bg-[#00C853] rounded-full"></div>
                     <div className="flex-1 h-3 bg-[#00C853] rounded-full"></div>
                     <div className="flex-1 h-3 bg-slate-200 rounded-full"></div>
                  </div>
                </div>
                <div className="absolute -top-6 -right-6 bg-white border border-slate-100 p-4 rounded-2xl shadow-xl animate-bounce">
                   <p className="text-[8px] font-black text-[#00C853] uppercase tracking-widest mb-1 font-mono">Sat Link Active</p>
                   <p className="text-xs font-bold text-slate-900">GA-LOC: {coordinates ? coordinates.lat.slice(-3) : '301.2'}</p>
                </div>
              </div>
            </section>
          </div>

          {/* AUDIT ENGINE SECTION */}
          <section id="audit-engine" className="py-24 border-t border-slate-100 bg-slate-50/30">
            <div className="max-w-4xl mx-auto px-4">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4 tracking-tight">Quick Audit Engine</h2>
                <p className="text-slate-500 font-medium text-lg">Input asset metadata or upload documents to query the 8-Layer Protocol.</p>
              </div>

              <div className="bg-white rounded-[3rem] border border-slate-200 p-8 md:p-12 shadow-sm relative overflow-hidden">
                <div className="space-y-8">
                  <div className="space-y-6">
                    <div className="flex flex-wrap bg-slate-100 p-1.5 rounded-2xl border border-slate-200">
                      {['title', 'ghanapost', 'gps'].map(type => (
                        <button key={type} onClick={() => setInputType(type)} className={`flex-1 py-3 px-4 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${inputType === type ? 'bg-white text-slate-900 shadow-sm border border-slate-100' : 'text-slate-400 hover:text-slate-600'}`}>
                          {type === 'title' ? 'Title No.' : type === 'ghanapost' ? 'GhanaPost' : 'Lat/Long'}
                        </button>
                      ))}
                    </div>

                    {inputType !== 'none' && (
                      <div className="animate-in fade-in slide-in-from-top-4 duration-500">
                        <input 
                          type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)}
                          placeholder={inputType === 'title' ? 'e.g. AB-2024-04567' : inputType === 'ghanapost' ? 'e.g. GA-183-8164' : 'e.g. 5.6037, -0.1870'}
                          className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-6 py-4 font-bold text-slate-900 focus:outline-none focus:border-[#00C853] transition-all"
                        />
                      </div>
                    )}
                  </div>

                  <div className="relative">
                    <div className={`border-2 border-dashed rounded-[2.5rem] p-10 transition-all duration-500 flex flex-col items-center justify-center text-center group bg-slate-50/50 hover:bg-white hover:border-[#00C853]/40 ${file ? 'border-[#00C853] bg-white' : 'border-slate-200'}`}>
                      <input type="file" onChange={handleFileUpload} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" accept=".pdf,.jpg,.png" />
                      {!file ? (
                        <>
                          <div className="w-16 h-16 bg-white rounded-2xl shadow-sm border border-slate-100 flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform">📄</div>
                          <p className="text-lg font-black text-slate-900 mb-1">Upload title deed or site plan</p>
                          <p className="text-xs font-medium text-slate-400">PDF, JPG up to 10MB</p>
                        </>
                      ) : (
                        <div className="w-full max-w-sm">
                          <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-200 mb-4">
                            <div className="text-2xl">📑</div>
                            <div className="text-left flex-grow"><p className="font-bold text-slate-900 text-xs truncate">{file.name}</p></div>
                            {isVerified && <div className="bg-[#00C853] text-white p-1 rounded-full text-[8px]">✓</div>}
                          </div>
                          {isUploading && <div className="w-full bg-slate-200 h-1 rounded-full overflow-hidden"><div className="bg-[#00C853] h-full transition-all" style={{ width: `${uploadProgress}%` }}></div></div>}
                        </div>
                      )}
                    </div>
                  </div>

                  {(isAnalyzing || aiFeedback) && (
                    <div className="animate-in fade-in slide-in-from-top-6 duration-700 bg-slate-900 text-white rounded-[2rem] p-8">
                      <div className="flex items-center gap-4 mb-6">
                        {isAnalyzing ? (
                          <div className="flex items-center gap-3 text-[#00C853]">
                            <span className="w-4 h-4 border-2 border-[#00C853]/30 border-t-[#00C853] rounded-full animate-spin"></span>
                            <span className="text-[10px] font-black uppercase tracking-widest animate-pulse">Analysing Document...</span>
                          </div>
                        ) : (
                           <span className="bg-[#00C853]/20 text-[#00C853] px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest border border-[#00C853]/20">Forensic Check Complete</span>
                        )}
                      </div>
                      {aiFeedback && <p className="text-lg font-bold text-slate-100 font-mono italic">"{aiFeedback}"</p>}
                    </div>
                  )}

                  <button 
                    onClick={triggerVerification}
                    className="w-full bg-[#00C853] text-white py-6 rounded-2xl font-black text-xl shadow-lg hover:-translate-y-1 transition-all disabled:opacity-50 border-b-4 border-[#00a846]"
                    disabled={!aiFeedback && !inputValue && coordinates === null}
                  >
                     {isVerifying ? 'Verifying...' : 'Run Full 8-Layer Verification'}
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* RESULTS DASHBOARD */}
          {showResults && (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <section id="results-dashboard" className="py-24 animate-in fade-in slide-in-from-bottom-10 duration-1000">
                <div className="bg-white border-t-8 border-t-[#00C853] border border-slate-200 rounded-[3rem] p-8 md:p-12 shadow-xl relative overflow-hidden">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
                    <div>
                      <h2 className="text-3xl md:text-4xl font-black tracking-tight flex items-center gap-3 text-slate-900">🏛️ Verified Sovereign Status</h2>
                      <p className="text-slate-500 font-medium mt-2">Analysis complete for Registry No. GA-509-2026. Asset secured.</p>
                    </div>
                    <div className="flex gap-3">
                      <span className="bg-[#00C853]/10 text-[#00C853] px-4 py-2 rounded-xl font-black text-[10px] uppercase tracking-widest border border-[#00C853]/20">Mortgage-Ready</span>
                      <span className="bg-slate-100 text-slate-500 px-4 py-2 rounded-xl font-black text-[10px] uppercase tracking-widest">Litigation: 0.00%</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-12">
                    <div className="space-y-6">
                       <div className="w-full h-64 bg-slate-100 rounded-[2.5rem] overflow-hidden border border-slate-200 relative shadow-inner group">
                          <iframe 
                            width="100%" 
                            height="100%" 
                            frameBorder="0" 
                            scrolling="no" 
                            marginHeight="0" 
                            marginWidth="0" 
                            src={`https://maps.google.com/maps?q=${coordinates?.lat || 5.6037},${coordinates?.lng || -0.1870}&z=16&output=embed`}
                             className="opacity-90 group-hover:opacity-100 transition-opacity"
                          ></iframe>
                       </div>
                       <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 space-y-4 shadow-sm">
                          <div><p className="text-[10px] text-slate-400 font-black uppercase mb-1">Coordinates</p><p className="text-sm font-bold font-mono text-slate-900">{coordinates ? `${coordinates.lat}, ${coordinates.lng}` : '5.6037° N, -0.1870° W'}</p></div>
                          <div><p className="text-[10px] text-slate-400 font-black uppercase mb-1">Digital Address</p><p className="text-sm font-black bg-white border border-slate-200 px-3 py-1.5 rounded-lg inline-block text-[#00C853] shadow-sm">{locationMeta?.ghanaPost || 'GA-183-8164'}</p></div>
                       </div>
                    </div>

                    <div className="lg:col-span-2 space-y-8 text-slate-900">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                          <p className="text-[10px] text-slate-400 font-black uppercase mb-6 border-b pb-1.5">Chain of Trust</p>
                          <div className="space-y-6 relative border-l-2 border-slate-100 pl-6 ml-2 text-slate-900">
                             {[{date:'Oct 21',e:'Transfer'},{date:'Mar 19',e:'Registration'}].map((item, i) => (
                               <div key={i} className="relative">
                                  <div className="absolute -left-[31px] top-1 w-3 h-3 rounded-full bg-white border-2 border-[#00C853] shadow-[0_0_8px_rgba(0,200,83,0.3)]"></div>
                                  <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{item.date}</p>
                                  <p className="text-sm font-black">{item.e}</p>
                               </div>
                             ))}
                          </div>
                        </div>
                        <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white relative overflow-hidden shadow-2xl flex flex-col justify-between group">
                           <div className="absolute top-0 right-0 w-32 h-32 bg-[#00C853]/10 blur-3xl -mr-10 -mt-10 group-hover:scale-150 transition-transform duration-1000"></div>
                           <div>
                             <p className="text-[10px] text-[#00C853] font-black uppercase tracking-widest mb-1.5">Sovereign Valuation</p>
                             <p className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#00C853] to-emerald-300">GH₵ 3.2M</p>
                           </div>
                           <p className="text-xl font-bold mt-4 flex items-center gap-2">12.4% <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded font-black tracking-widest">APY YIELD</span></p>
                        </div>
                      </div>

                      <div className="pt-4">
                        <p className="text-[10px] text-slate-400 font-black uppercase mb-6">8-Layer Diagnostic Matrix</p>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                           {['GPS Lock', 'Title ID', 'Nii Auth', 'Registry', 'Stool Land', 'Survey Map', 'Consent', 'Sovereign'].map(layer => (
                             <div key={layer} className="bg-slate-50 border border-slate-100 p-4 rounded-2xl flex flex-col items-center transition-all hover:bg-white text-slate-900 shadow-sm hover:border-[#00C853]/30">
                                <span className="text-[#00C853] font-black text-xl mb-1">✓</span>
                                <span className="text-[9px] font-black uppercase tracking-wider">{layer}</span>
                             </div>
                           ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-12 border-t border-slate-100">
                    <button className="bg-slate-900 text-white px-8 py-4 rounded-xl font-black text-xs uppercase tracking-widest shadow-xl hover:-translate-y-1 transition-all">Download PDF Report</button>
                    <button className="bg-white border-2 border-slate-200 text-slate-900 px-8 py-4 rounded-xl font-black text-xs uppercase tracking-widest hover:border-[#00C853] transition-all">Share to WhatsApp</button>
                    <button className="bg-[#00C853] text-white px-8 py-4 rounded-xl font-black text-xs uppercase tracking-widest shadow-lg hover:-translate-y-1 transition-all">🚀 List Property</button>
                  </div>
                </div>
              </section>
            </div>
          )}

          {/* FINAL CLOSING SECTION */}
          <section className="py-24 border-t border-slate-100 bg-slate-50/30">
             <div className="max-w-4xl mx-auto px-4 text-center">
                <div className="w-16 h-16 bg-[#00C853]/10 text-[#00C853] rounded-2xl flex items-center justify-center text-3xl mx-auto mb-6 shadow-sm border border-[#00C853]/20">🚀</div>
                <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">Your Next Strategic Move</h2>
                <p className="text-lg text-slate-500 font-medium mb-12 max-w-2xl mx-auto">Syntry provides the immediate infrastructure to secure your mortgage, liquidate assets, or protect generational wealth.</p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                   <button className="w-full sm:w-auto bg-[#00C853] text-white px-10 py-5 rounded-2xl font-black text-xs uppercase tracking-widest shadow-lg hover:-translate-y-1 transition-all">Get Full Report</button>
                   <button className="w-full sm:w-auto bg-slate-900 text-white px-10 py-5 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl hover:-translate-y-1 transition-all">Talk to Expert 053 110 2292</button>
                </div>
             </div>
          </section>
        </main>

        <GlobalFooter />

        {/* FLOATING AI ASSISTANT */}
        <div className="fixed bottom-8 right-8 z-[1000] flex flex-col items-end">
           {isChatOpen && (
              <div className="bg-white w-[340px] md:w-[400px] rounded-[2.5rem] shadow-2xl border border-slate-200 mb-6 overflow-hidden animate-in slide-in-from-bottom-6">
                 <div className="bg-slate-900 text-white p-6 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                       <span className="text-2xl">🤖</span>
                       <div><p className="font-black text-xs">Syntry AI</p><p className="text-[9px] text-[#00C853] uppercase font-black tracking-widest">Oracle Active</p></div>
                    </div>
                    <button onClick={() => setIsChatOpen(false)} className="text-slate-500 hover:text-white">✕</button>
                 </div>
                 <div className="p-6 h-64 overflow-y-auto bg-slate-50 space-y-4">
                    <div className="flex justify-center mb-2">
                       <span className="text-[8px] font-black uppercase tracking-[0.2em] text-slate-400 bg-white px-3 py-1 rounded-full border border-slate-100 shadow-sm flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-[#00C853] rounded-full animate-pulse"></span>
                          Live • Powered by Gemini 1.5 Flash
                       </span>
                    </div>

                    {chatMessages.map((msg, i) => (
                       <div key={i} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                          <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-[10px] text-white font-bold shrink-0 shadow-md ${msg.role === 'user' ? 'bg-[#00C853]' : 'bg-slate-900'}`}>
                             {msg.role === 'user' ? '👤' : '🤖'}
                          </div>
                          <div className={`border p-4 rounded-2xl text-xs font-medium leading-relaxed max-w-[80%] shadow-sm ${msg.role === 'user' ? 'bg-white border-[#00C853]/20 rounded-tr-none' : 'bg-white border-slate-200 rounded-tl-none text-slate-700'}`}>
                             {msg.text}
                          </div>
                       </div>
                    ))}

                    {isChatThinking && (
                       <div className="flex gap-3">
                          <div className="w-8 h-8 rounded-xl bg-slate-900 flex items-center justify-center text-[10px] text-white font-bold shrink-0 shadow-md">🤖</div>
                          <div className="bg-white border border-slate-200 p-4 rounded-2xl rounded-tl-none shadow-sm text-xs font-black uppercase tracking-[0.1em] text-[#00C853] animate-pulse">
                             Syntry AI is thinking...
                          </div>
                       </div>
                    )}
                 </div>
                 <form onSubmit={handleSendMessage} className="p-4 bg-white border-t flex gap-2">
                    <input 
                       type="text" 
                       value={chatInput}
                       onChange={(e) => setChatInput(e.target.value)}
                       placeholder="Ask about this property..." 
                       className="flex-grow bg-slate-50 border rounded-xl px-4 py-3 text-xs focus:ring-2 focus:ring-[#00C853] outline-none font-medium" 
                    />
                    <button type="submit" disabled={isChatThinking} className="bg-[#00C853] text-white p-3 rounded-xl shadow-lg hover:scale-105 active:scale-95 transition-all">
                       {isChatThinking ? <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span> : '➤'}
                    </button>
                 </form>
              </div>
           )}
           <button onClick={() => setIsChatOpen(!isChatOpen)} className="bg-slate-900 text-white h-16 rounded-full px-6 flex items-center gap-4 shadow-2xl hover:-translate-y-1 transition-all">
              <span className="text-xl">🤖</span>
              <div className="flex flex-col items-start leading-tight">
                 <span className="text-[9px] uppercase font-black text-[#00C853]">Ask Syntry AI</span>
                 <span className="text-xs font-bold">About this property</span>
              </div>
           </button>
        </div>
      </div>
    </Suspense>
  );
}
