'use client';
import { Suspense, useState, useRef } from 'react';
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

  const formRef = useRef(null);

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
    if (!navigator.geolocation) {
      setLocationStatus('Geolocation is not supported by your browser.');
      return;
    }
    
    setIsVerifying(true);
    setLocationStatus('Requesting access to orbital satellites...');
    
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude.toFixed(6);
        const lng = position.coords.longitude.toFixed(6);
        setCoordinates({ lat, lng });
        setLocationStatus(`GPS Locked: ${lat}, ${lng}. Indexing 8-Layer data...`);
        setIsVerifying(false);
        
        // Potential logic to show results or move to next step
      },
      (error) => {
        setIsVerifying(false);
        switch(error.code) {
          case error.PERMISSION_DENIED:
            setLocationStatus('Location access denied. Please enable GPS permissions.');
            break;
          case error.POSITION_UNAVAILABLE:
            setLocationStatus('Location information is unavailable.');
            break;
          case error.TIMEOUT:
            setLocationStatus('Location request timed out.');
            break;
          default:
            setLocationStatus('An unknown error occurred during detection.');
            break;
        }
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  };

  return (
    <Suspense fallback={<div className="bg-white min-h-screen" />}>
      <div className="bg-white min-h-screen text-slate-900 font-sans flex flex-col overflow-x-hidden">
        <GlobalHeader />

        <main className="flex-grow pt-32 pb-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* HERO SECTION: CLEAN LIGHT THEME */}
            <section className="py-20 md:py-32 text-center lg:text-left flex flex-col lg:flex-row items-center gap-16">
              <div className="lg:w-3/5 space-y-8 animate-in fade-in slide-in-from-left-8 duration-700">
                
                <div className="inline-flex items-center gap-2 bg-[#00C853]/10 px-4 py-2 rounded-full border border-[#00C853]/20">
                  <span className="w-1.5 h-1.5 bg-[#00C853] rounded-full animate-pulse shadow-[0_0_8px_#00C853]"></span>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#00C853]">Protocol v4.0 Active</span>
                </div>

                <h1 className="text-4xl md:text-6xl lg:text-[72px] font-black leading-[1.05] tracking-tight text-slate-900">
                  Check My Property – <br />
                  <span className="text-[#00C853]">Instant 8-Layer Verification</span>
                </h1>
                
                <p className="text-lg md:text-xl text-slate-500 font-medium leading-relaxed max-w-2xl">
                  Auto-detect your GPS • Get land history • AI document analysis • <span className="text-slate-900 font-bold border-b-2 border-[#00C853]/30">Zero Litigation Check</span>
                </p>

                <div className="flex flex-col gap-6">
                  {/* Primary Action */}
                  <div className="relative group max-w-md">
                    <button 
                      onClick={handleAutoDetect}
                      disabled={isVerifying}
                      className="w-full bg-[#00C853] text-white px-8 py-6 rounded-2xl font-black text-lg md:text-xl shadow-[0_20px_40px_-10px_rgba(0,200,83,0.3)] hover:shadow-[0_25px_50px_-10px_rgba(0,200,83,0.4)] hover:-translate-y-1 transition-all flex items-center justify-center gap-3 disabled:opacity-70 border-b-4 border-[#00a846]"
                    >
                      {isVerifying ? (
                        <span className="flex items-center gap-2">
                           <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                           Detecting...
                        </span>
                      ) : (
                        <>📍 Auto-Detect My Location & Coordinates</>
                      )}
                    </button>
                    
                    {locationStatus && (
                      <div className={`mt-4 p-4 rounded-xl text-sm font-bold flex items-center gap-3 animate-in slide-in-from-top-2 ${coordinates ? 'bg-[#00C853]/10 text-[#00C853] border border-[#00C853]/20' : 'bg-slate-50 text-slate-500 border border-slate-200'}`}>
                        {coordinates ? '✅' : '📡'} {locationStatus}
                      </div>
                    )}
                  </div>

                  {/* Secondary Actions */}
            <section id="audit-engine" className="py-24 border-t border-slate-100">
              <div className="max-w-4xl mx-auto">
                <div className="text-center mb-16">
                  <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4 tracking-tight">Quick Audit Engine</h2>
                  <p className="text-slate-500 font-medium text-lg">Query the 8-Layer Sovereign Protocol with your existing asset data.</p>
                </div>

                <div className="bg-white rounded-[3rem] border border-slate-200 p-8 md:p-12 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.05)] relative overflow-hidden">
                  
                  {/* Multi-modal Inputs */}
                  <div className="grid grid-cols-1 gap-8 mb-10">
                    <div className="space-y-6">
                      <div className="flex bg-slate-50 p-1.5 rounded-2xl border border-slate-200">
                        <button onClick={() => setInputType('title')} className={`flex-1 py-3 px-4 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${inputType === 'title' ? 'bg-white text-slate-900 shadow-sm border border-slate-100' : 'text-slate-400 hover:text-slate-600'}`}>Title Number</button>
                        <button onClick={() => setInputType('ghanapost')} className={`flex-1 py-3 px-4 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${inputType === 'ghanapost' ? 'bg-white text-slate-900 shadow-sm border border-slate-100' : 'text-slate-400 hover:text-slate-600'}`}>GhanaPost GPS</button>
                        <button onClick={() => setInputType('gps')} className={`flex-1 py-3 px-4 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${inputType === 'gps' ? 'bg-white text-slate-900 shadow-sm border border-slate-100' : 'text-slate-400 hover:text-slate-600'}`}>Lat / Long</button>
                      </div>

                      {inputType !== 'none' && inputType !== 'upload' && (
                        <div className="animate-in fade-in slide-in-from-top-4 duration-500">
                          <input 
                            type="text" 
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            placeholder={inputType === 'title' ? 'e.g. AB-2024-04567' : inputType === 'ghanapost' ? 'e.g. GA-183-8164' : 'e.g. 5.6037, -0.1870'}
                            className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-6 py-4 font-bold text-slate-900 placeholder:text-slate-300 focus:outline-none focus:border-[#00C853] transition-all"
                          />
                        </div>
                      )}
                    </div>

                    {/* Drag-and-drop Document Upload */}
                    <div className="relative">
                      <div className={`border-2 border-dashed rounded-[2.5rem] p-12 transition-all duration-500 flex flex-col items-center justify-center text-center group bg-slate-50/50 hover:bg-white hover:border-[#00C853]/40 ${file ? 'border-[#00C853] bg-white' : 'border-slate-200'}`}>
                        <input 
                          type="file" 
                          onChange={handleFileUpload}
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" 
                          accept=".pdf,.jpg,.png"
                        />
                        
                        {!file ? (
                          <>
                            <div className="w-20 h-20 bg-white rounded-3xl shadow-sm border border-slate-100 flex items-center justify-center text-4xl mb-6 group-hover:scale-110 transition-transform">📄</div>
                            <p className="text-xl font-black text-slate-900 mb-2">Drag & drop asset documents</p>
                            <p className="text-sm font-medium text-slate-400">PDF, JPG, PNG of Title Deed, Site Plan, or Indenture</p>
                          </>
                        ) : (
                          <div className="w-full max-w-sm animate-in zoom-in-95 duration-500">
                            <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-200 mb-4">
                              <div className="text-3xl">📑</div>
                              <div className="text-left flex-grow">
                                <p className="font-bold text-slate-900 text-sm truncate">{file.name}</p>
                                <p className="text-[10px] font-black text-[#00C853] uppercase tracking-widest">{(file.size/1024/1024).toFixed(2)} MB • Ready</p>
                              </div>
                              {isVerified && <div className="bg-[#00C853] text-white p-1 rounded-full text-[8px]">✓</div>}
                            </div>
                            
                            {isUploading && (
                              <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                                <div className="bg-[#00C853] h-full transition-all duration-300" style={{ width: `${uploadProgress}%` }}></div>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* AI Feedback Box */}
                    {(isAnalyzing || aiFeedback) && (
                      <div className="animate-in fade-in slide-in-from-top-6 duration-700 bg-slate-900 text-white rounded-[2rem] p-8 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-[#00C853]/10 blur-3xl -mr-10 -mt-10"></div>
                        
                        <div className="flex items-center gap-4 mb-6">
                          {isAnalyzing ? (
                            <div className="flex items-center gap-3 text-[#00C853]">
                              <span className="w-5 h-5 border-2 border-[#00C853]/30 border-t-[#00C853] rounded-full animate-spin"></span>
                              <span className="text-xs font-black uppercase tracking-[0.2em] animate-pulse">AI Analysing Document...</span>
                            </div>
                          ) : (
                            <div className="flex items-center gap-3">
                              <span className="bg-[#00C853]/20 text-[#00C853] px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest border border-[#00C853]/20">Forensic Analysis Complete</span>
                              <div className="flex -space-x-1">
                                {[1,2,3].map(i => <div key={i} className="w-5 h-5 rounded-full bg-[#00C853] border-2 border-slate-900 flex items-center justify-center text-[8px]">✓</div>)}
                              </div>
                            </div>
                          )}
                        </div>

                        {aiFeedback && (
                          <div className="space-y-4">
                            <p className="text-xl font-bold text-slate-100 font-mono leading-relaxed">{aiFeedback}</p>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t border-white/5">
                               {['Structure', 'Coordinates', 'Seal', 'History'].map(item => (
                                  <div key={item} className="flex flex-col gap-1">
                                     <span className="text-[8px] uppercase tracking-widest font-black text-slate-500">{item}</span>
                                     <span className="text-[10px] font-bold text-[#00C853] flex items-center gap-1"><span className="w-1 h-1 bg-[#00C853] rounded-full"></span> PASS</span>
                                  </div>
                               ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Final Action */}
                    <div className="pt-4">
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
                        className="w-full bg-[#00C853] text-white py-6 rounded-2xl font-black text-xl shadow-[0_20px_40px_-10px_rgba(0,200,83,0.3)] hover:-translate-y-1 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 border-b-4 border-[#00a846]"
                        disabled={!aiFeedback && !inputValue && coordinates === null}
                      >
                         {isVerifying ? 'Verifying...' : 'Run Full 8-Layer Verification'}
                      </button>
                      <p className="text-center text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-6">
                        Statutory audit powered by Syntry Oracle Protocol
                      </p>
                    </div>
                  </div>

                </div>
              </div>
            </section>

                  <p className="text-[12px] font-bold text-slate-400 uppercase tracking-[2px] flex items-center gap-2">
                    <span className="text-lg">⏱️</span> Takes &lt;60 seconds • Results sent to WhatsApp & Email
                  </p>
                </div>
              </div>

              {/* Decorative Visual side */}
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

                {/* Satellite Tags */}
                <div className="absolute -top-6 -right-6 bg-white border border-slate-100 p-4 rounded-2xl shadow-xl animate-bounce duration-[3000ms]">
                   <p className="text-[8px] font-black text-[#00C853] uppercase tracking-widest mb-1 font-mono">Sat Link Active</p>
                   <p className="text-xs font-bold text-slate-900">GA-LOC: 301.2</p>
                </div>
              </div>
            </section>

            {/* RESULTS DASHBOARD: Smart Results Area */}
            {showResults && (
              <section id="results-dashboard" className="py-24 animate-in fade-in slide-in-from-bottom-10 duration-1000">
                <div className="bg-white border-t-8 border-t-[#00C853] border border-slate-200 rounded-[3rem] p-8 md:p-12 shadow-[0_40px_80px_-15px_rgba(0,0,0,0.08)] relative overflow-hidden text-slate-900">
                  
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
                    <div>
                      <h2 className="text-3xl md:text-4xl font-black tracking-tight flex items-center gap-3">
                        <span className="text-4xl">🏛️</span> Verified Sovereign Status
                      </h2>
                      <p className="text-slate-500 font-medium mt-2">Analysis complete for Registry No. GA-509-2026. Asset secured.</p>
                    </div>
                    <div className="flex flex-wrap gap-3">
                      <span className="bg-[#00C853]/10 text-[#00C853] px-5 py-2.5 rounded-2xl font-black text-xs uppercase tracking-widest border border-[#00C853]/20 flex items-center gap-2">
                        <span className="w-2 h-2 bg-[#00C853] rounded-full animate-pulse shadow-[0_0_8px_currentColor]"></span> Mortgage-Ready
                      </span>
                      <span className="bg-slate-100 text-slate-500 px-5 py-2.5 rounded-2xl font-black text-xs uppercase tracking-widest border border-slate-200">
                        Litigation: 0.00%
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-12">
                    
                    {/* Map & Coordinates */}
                    <div className="space-y-6">
                       <div className="w-full h-64 bg-slate-100 rounded-[2.5rem] overflow-hidden border border-slate-200 relative group shadow-inner">
                          <div className="absolute inset-0 bg-[#00C853]/5 opacity-20 pointer-events-none"></div>
                          
                          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                            <div className="w-10 h-10 bg-[#00C853] rounded-full shadow-[0_0_30px_#00C853] border-4 border-white animate-bounce relative z-10"></div>
                            <div className="w-10 h-10 bg-[#00C853] rounded-full absolute top-0 left-0 animate-ping opacity-75"></div>
                          </div>
                          
                          <div className="absolute bottom-6 left-6 bg-white/95 backdrop-blur px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest text-[#00C853] border border-[#00C853]/20 shadow-lg">
                             Geospatial Lock Confirmed
                          </div>
                       </div>

                       <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 space-y-4">
                          <div>
                            <p className="text-[10px] text-slate-400 font-black uppercase tracking-[2px] mb-1">Coordinates</p>
                            <p className="text-base font-bold text-slate-900 font-mono tracking-tight">{coordinates ? `${coordinates.lat}, ${coordinates.lng}` : '5.6037° N, -0.1870° W'}</p>
                          </div>
                          <div>
                            <p className="text-[10px] text-slate-400 font-black uppercase tracking-[2px] mb-1">Digital Address</p>
                            <p className="text-base font-bold text-slate-900 bg-white border border-slate-200 inline-block px-3 py-1 rounded-lg shadow-sm">GA-183-8164</p>
                          </div>
                       </div>
                    </div>

                    {/* Property History & Valuation */}
                    <div className="lg:col-span-2 space-y-8">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        
                        <div className="p-1">
                          <p className="text-[10px] text-slate-400 font-black uppercase tracking-[2px] mb-6 border-b border-slate-100 pb-2">Chain of Trust</p>
                          <div className="space-y-6 relative border-l-2 border-slate-100 pl-6 ml-2">
                             {[
                               { date: 'Oct 2021', event: 'Transfer of Title', party: 'K. Asamoah Ltd', active: true },
                               { date: 'Mar 2019', event: 'Lease Registration', party: 'Registry Entry', active: false },
                               { date: 'Nov 2015', event: 'Initial Registration', party: 'Original Owner', active: false }
                             ].map((item, i) => (
                               <div key={i} className="relative">
                                  <div className={`absolute -left-[31px] top-1 w-3.5 h-3.5 rounded-full border-2 bg-white transition-colors ${item.active ? 'border-[#00C853] shadow-[0_0_10px_#00C853]' : 'border-slate-300'}`}></div>
                                  <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">{item.date}</p>
                                  <p className="text-sm font-black text-slate-900">{item.event}</p>
                                  <p className="text-xs font-medium text-slate-500">{item.party}</p>
                               </div>
                             ))}
                          </div>
                        </div>

                        <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white relative overflow-hidden flex flex-col justify-between shadow-2xl">
                           <div className="absolute top-0 right-0 w-32 h-32 bg-[#00C853]/20 blur-3xl -mr-10 -mt-10"></div>
                           <div>
                             <p className="text-[10px] text-[#00C853] font-black uppercase tracking-[3px] mb-2 flex items-center gap-2">
                               <span className="w-1.5 h-1.5 bg-[#00C853] rounded-full animate-pulse"></span> Sovereign Valuation
                             </p>
                             <p className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#00C853] to-emerald-300">GH₵ 3.2M</p>
                           </div>
                           <div className="mt-8 flex gap-6">
                              <div>
                                <p className="text-[9px] text-slate-500 font-bold uppercase mb-1">Rental Yield</p>
                                <p className="text-xl font-bold">12.4% <span className="text-[10px] text-[#00C853]">APY</span></p>
                              </div>
                              <div>
                                <p className="text-[9px] text-slate-500 font-bold uppercase mb-1">Status</p>
                                <p className="text-xl font-bold flex items-center gap-2">
                                   <span className="w-2 h-2 bg-[#00C853] rounded-full"></span> Tier-1
                                </p>
                              </div>
                           </div>
                        </div>

                      </div>

                      {/* 8-Layer Grid Status */}
                      <div className="pt-4">
                        <p className="text-[10px] text-slate-400 font-black uppercase tracking-[2px] mb-6">8-Layer Statutory Audit</p>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                           {[
                              'GPS Lock', 'Title ID', 'Nii Auth', 'Registry', 
                              'Stool Land', 'Survey Map', 'Consent', 'Sovereign'
                           ].map(layer => (
                             <div key={layer} className="bg-white border border-slate-100 p-4 rounded-2xl flex flex-col items-center justify-center text-center shadow-sm hover:border-[#00C853]/30 transition-colors group text-slate-900">
                                <span className="w-8 h-8 bg-[#00C853]/10 text-[#00C853] rounded-full flex items-center justify-center text-[10px] font-black mb-3 group-hover:scale-110 transition-transform">✓</span>
                                <span className="text-[10px] font-black uppercase tracking-wider">{layer}</span>
                             </div>
                           ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Actions Section */}
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-12 border-t border-slate-100">
                    <button className="w-full sm:w-auto bg-slate-900 text-white px-8 py-5 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-slate-800 transition-all flex items-center justify-center gap-3 shadow-xl">
                       <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                       Download Full Report PDF
                    </button>
                    <button className="w-full sm:w-auto bg-white border-2 border-slate-200 text-slate-900 px-8 py-5 rounded-2xl font-black text-sm uppercase tracking-widest hover:border-[#00C853] hover:text-[#00C853] transition-all flex items-center justify-center gap-3">
                       <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                       Share to WhatsApp
                    </button>
                    <button className="w-full sm:w-auto bg-[#00C853] text-white px-10 py-5 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-[#00a846] transition-all shadow-[0_15px_30px_-5px_rgba(0,200,83,0.3)]">
                       🚀 List This Property
                    </button>
                  </div>

                </div>
              </section>
            )}

          </div>
        </main>

        <GlobalFooter />
      </div>
    </Suspense>
  );
}
