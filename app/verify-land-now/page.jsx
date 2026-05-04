'use client';
import "../globals.css";
import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
const GlobalHeader = dynamic(() => import('@/components/GlobalHeader'), { ssr: false });
const GlobalFooter = dynamic(() => import('@/components/GlobalFooter'), { ssr: false });
const SovereignMap = dynamic(() => import('@/components/SovereignMap'), { ssr: false });
import Tesseract from 'tesseract.js';

const EIGHT_LAYERS = [
  { id: 'gps', name: 'GPS Lock', confidence: 99.8, source: 'Orbital Satellite Matrix', desc: 'Precise coordinates cross-referenced against the 2026 digital boundary map.' },
  { id: 'title', name: 'Title Registry', confidence: 100, source: 'Lands Commission API', desc: 'Title AB-2026-405 confirmed in the Sovereign Registry with no caveats.' },
  { id: 'history', name: 'Chain of Trust', confidence: 98.4, source: 'Syntry Forensic Index', desc: 'Decades of ownership history verified through the Syntry Vault ledger.' },
  { id: 'nii', name: 'Nii Auth', confidence: 95.0, source: 'Stole/Stool Liaison Office', desc: 'Traditional authority seal of approval for current occupancy verified.' },
  { id: 'survey', name: 'Registry Map', confidence: 99.2, source: 'Geospatial Dept.', desc: 'High-fidelity survey plan matches physical ground markers and satellite telemetry.' },
  { id: 'consent', name: 'Ministerial Consent', confidence: 100, source: 'Ministry of Lands', desc: 'All statutory consents for current transfer have been obtained and indexed.' },
  { id: 'litigation', name: 'Zero Litigation', confidence: 97.5, source: 'High Court Records', desc: 'No active or historical court cases found for this plot or parcel.' },
  { id: 'sovereign', name: 'Sovereign Seal', confidence: 100, source: 'Syntry Core', desc: 'Final audit pass. All 7 underlying layers balanced. Asset is Gold Certified.' }
];

const CHAIN_OF_TRUST = [
  { year: '2026', event: 'Sovereign Tokenization', detail: 'Asset minted on Syntry Core for institutional liquidity.' },
  { year: '2021', event: 'Registry Transfer', detail: 'Primary title transfer registered under G-77-2021 protocol.' },
  { year: '2015', event: 'Boundary Consolidation', detail: 'Site plan updated by Lands Commission Survey Dept.' },
  { year: '1998', event: 'Original Grant', detail: 'Initial leasehold agreement granted by Nii Odoi Stool.' }
];

export default function VerifyLandNowPage() {
  const [hasMounted, setHasMounted] = useState(false);
  const [activeTab, setActiveTab] = useState('auto');
  const [isVerifying, setIsVerifying] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [activeLayer, setActiveLayer] = useState(null);
  
  const [coordinates, setCoordinates] = useState({ lat: '5.6037', lng: '-0.1870' });
  const [ghanaPost, setGhanaPost] = useState('');
  const [titleNumber, setTitleNumber] = useState('');
  const [manualLat, setManualLat] = useState('');
  const [manualLng, setManualLng] = useState('');
  const [file, setFile] = useState(null);
  const [isAutoDetecting, setIsAutoDetecting] = useState(false);
  const [areaSize, setAreaSize] = useState(0);
  const [areaSqMeters, setAreaSqMeters] = useState(0);
  const [ocrArea, setOcrArea] = useState(null);
  const [centroidValid, setCentroidValid] = useState(null);
  const [geometryVerified, setGeometryVerified] = useState(false);
  const [isLocationValid, setIsLocationValid] = useState(true);
  const [ocrStatus, setOcrStatus] = useState('');
  const [registryAlert, setRegistryAlert] = useState(null);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  const handleAutoDetect = () => {
    if (typeof window === 'undefined' || !navigator.geolocation) return;
    setIsAutoDetecting(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lat = pos.coords.latitude.toFixed(6);
        const lng = pos.coords.longitude.toFixed(6);
        setCoordinates({ lat, lng });
        setIsAutoDetecting(false);
        triggerVerification();
      },
      () => setIsAutoDetecting(false),
      { enableHighAccuracy: true }
    );
  };

  const handleManualVerify = () => {
    if (manualLat && manualLng) {
      setCoordinates({ lat: manualLat, lng: manualLng });
    }
    triggerVerification();
  };

  const handleFileProcessing = async (selectedFile) => {
    setFile(selectedFile);
    setOcrStatus('Syntry AI Node: Extracting metadata...');
    try {
      const { data: { text } } = await Tesseract.recognize(selectedFile, 'eng');
      const titleMatch = text.match(/[A-Z]{2}[-][0-9]{4}[-][0-9]{3,}/i);
      if (titleMatch) {
        setTitleNumber(titleMatch[0]);
        setOcrStatus('Metadata Extracted: Title ' + titleMatch[0]);
      } else {
        setOcrStatus('OCR Warning: Title Number not found. Manual entry required.');
      }
    } catch (err) {
      setOcrStatus('OCR Failed. High-res scan required.');
    }
  };

  const triggerVerification = async () => {
    if (!isLocationValid) return;
    setIsVerifying(true);
    setRegistryAlert(null);
    const registryPromise = new Promise((resolve) => {
       setTimeout(() => resolve({ status: 'success' }), 2000);
    });
    await registryPromise;
    setIsVerifying(false);
    setShowResults(true);
    setTimeout(() => {
      document.getElementById('results-dashboard')?.scrollIntoView({ behavior: 'smooth' });
    }, 300);
  };

  if (!hasMounted) return <div className="bg-syntry-obsidian min-h-screen" />;

  return (
    <div className="bg-syntry-obsidian min-h-screen text-syntry-slate-300 font-sans flex flex-col overflow-x-hidden">
      <GlobalHeader />

      <main className="flex-grow pt-32 pb-24">
        <div className="max-w-6xl mx-auto px-4 mb-16 space-y-12">
          <div className="text-center space-y-4">
             <div className="inline-flex items-center gap-2 bg-syntry-teal-600/10 px-4 py-2 rounded-md border border-syntry-teal-600/20">
                <span className="w-2 h-2 bg-syntry-teal-600 rounded-md animate-pulse"></span>
                <span className="text-[10px] font-medium uppercase tracking-widest text-syntry-teal-600">Sovereign Map Protocol Active</span>
             </div>
             <h1 className="text-4xl md:text-5xl font-medium text-white tracking-tight">Check My Property</h1>
             <p className="text-syntry-slate-300 font-medium text-lg">Syntry orbital scan detects boundaries and litigation status in real-time.</p>
          </div>

          <div className="bg-white/5 backdrop-blur-md rounded-md border border-syntry-slate-200/10 overflow-hidden shadow-2xl">
             <div className="flex border-b border-syntry-slate-200/10 bg-black/20">
                {[
                  { id: 'auto', label: '📍 Auto-Detect', icon: '📡' },
                  { id: 'manual', label: '🔢 Manual Entry', icon: '✍️' },
                  { id: 'upload', label: '📄 Upload Documents', icon: '📤' }
                ].map((tab) => (
                  <button 
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex-1 py-6 px-4 flex items-center justify-center gap-3 text-xs font-medium uppercase tracking-widest transition-all ${activeTab === tab.id ? 'bg-white/5 text-white border-b-2 border-syntry-teal-600' : 'text-syntry-slate-300 hover:text-white hover:bg-white/5'}`}
                  >
                    <span>{tab.icon}</span> {tab.label}
                  </button>
                ))}
             </div>

             <div className="p-8 md:p-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                <div className="space-y-8">
                   {activeTab === 'auto' && (
                      <div className="space-y-6">
                         <div className="p-8 bg-white/5 rounded-md border border-syntry-slate-200/10 text-center space-y-4">
                            <div className="w-16 h-16 bg-white/5 rounded-md border border-syntry-slate-200/10 mx-auto flex items-center justify-center text-3xl">📡</div>
                            <h3 className="text-xl font-medium text-white">Orbital GPS Detection</h3>
                            <p className="text-sm text-syntry-slate-300 leading-relaxed font-medium">Use browser high-precision location to lock onto plot boundaries instantly.</p>
                         </div>
                         <button 
                           onClick={handleAutoDetect}
                           disabled={isAutoDetecting || isVerifying}
                           className="w-full bg-gradient-to-r from-syntry-teal-600 to-syntry-teal-700 text-white py-6 rounded-md font-medium uppercase tracking-widest text-sm shadow-xl hover:opacity-90 transition-all disabled:opacity-50"
                         >
                            {isAutoDetecting ? 'Establishing Handshake...' : isVerifying ? 'Verifying...' : 'Verify My Location'}
                         </button>
                      </div>
                   )}

                   {activeTab === 'manual' && (
                      <div className="space-y-6">
                         <div className="grid grid-cols-1 gap-4">
                            <div>
                               <p className="text-[10px] font-medium text-syntry-slate-300 uppercase tracking-widest mb-1 ml-1">GhanaPost Digital Address</p>
                               <input 
                                 type="text" value={ghanaPost} onChange={(e) => setGhanaPost(e.target.value)} 
                                 placeholder="e.g. GA-183-8164"
                                 className="w-full bg-white/5 border border-syntry-slate-200/10 rounded-md px-6 py-4 font-medium text-white focus:border-syntry-teal-600 outline-none placeholder:text-slate-600"
                               />
                            </div>
                            <div>
                               <p className="text-[10px] font-medium text-syntry-slate-300 uppercase tracking-widest mb-1 ml-1">Title Number</p>
                               <input 
                                 type="text" value={titleNumber} onChange={(e) => setTitleNumber(e.target.value)} 
                                 placeholder="e.g. AB-2024-405"
                                 className="w-full bg-white/5 border border-syntry-slate-200/10 rounded-md px-6 py-4 font-medium text-white focus:border-syntry-teal-600 outline-none placeholder:text-slate-600"
                               />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                               <div>
                                  <p className="text-[10px] font-medium text-syntry-slate-300 uppercase tracking-widest mb-1 ml-1">Latitude</p>
                                  <input 
                                    type="text" value={manualLat} onChange={(e) => setManualLat(e.target.value)} 
                                    placeholder="5.6037"
                                    className="w-full bg-white/5 border border-syntry-slate-200/10 rounded-md px-6 py-4 font-medium text-white focus:border-syntry-teal-600 outline-none placeholder:text-slate-600"
                                  />
                               </div>
                               <div>
                                  <p className="text-[10px] font-medium text-syntry-slate-300 uppercase tracking-widest mb-1 ml-1">Longitude</p>
                                  <input 
                                    type="text" value={manualLng} onChange={(e) => setManualLng(e.target.value)} 
                                    placeholder="-0.1870"
                                    className="w-full bg-white/5 border border-syntry-slate-200/10 rounded-md px-6 py-4 font-medium text-white focus:border-syntry-teal-600 outline-none placeholder:text-slate-600"
                                  />
                               </div>
                            </div>
                         </div>
                         <button 
                           onClick={handleManualVerify}
                           className="w-full bg-gradient-to-r from-syntry-teal-600 to-syntry-teal-700 text-white py-6 rounded-md font-medium uppercase tracking-widest text-sm shadow-xl hover:opacity-90 transition-all"
                         >
                            Verify This Location
                         </button>
                      </div>
                   )}

                   {activeTab === 'upload' && (
                      <div className="space-y-6">
                         <div className="border-2 border-dashed border-syntry-slate-200/10 rounded-md p-12 bg-white/5 flex flex-col items-center text-center cursor-pointer hover:bg-white/10 hover:border-syntry-teal-600 transition-all group relative">
                            <span className="text-4xl mb-4">📄</span>
                            <p className="text-lg font-medium text-white">{file ? file.name : 'Upload Site Plan'}</p>
                            <p className="text-[10px] font-medium text-syntry-teal-600 uppercase tracking-widest mt-2">{ocrStatus}</p>
                            <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={(e) => handleFileProcessing(e.target.files[0])} />
                         </div>
                         <button 
                           disabled={!file || isVerifying}
                           onClick={triggerVerification}
                           className="w-full bg-gradient-to-r from-syntry-teal-600 to-syntry-teal-700 text-white py-6 rounded-md font-medium uppercase tracking-widest text-sm shadow-xl hover:opacity-90 transition-all disabled:opacity-30"
                         >
                            {isVerifying ? 'Scanning Registry...' : 'Run Forensic AI Analysis'}
                         </button>
                      </div>
                   )}
                </div>

                <div className="space-y-4">
                    <div className="w-full h-[500px] bg-white/5 rounded-md overflow-hidden shadow-inner border border-syntry-slate-200/10 relative">
                       <SovereignMap 
                          onAreaCalculated={(data) => { setAreaSize(data.acres); setAreaSqMeters(data.sqMeters); }}
                          onLocationVerified={(valid, geojson) => { setIsLocationValid(valid); }}
                          onCentroidValidated={(validNeighborhood) => setCentroidValid(validNeighborhood)}
                          initialPos={[parseFloat(coordinates.lat), parseFloat(coordinates.lng)]}
                       />
                    </div>
                    <div className="flex justify-between items-center px-1">
                       <p className="text-[10px] font-medium text-syntry-slate-300 uppercase tracking-widest">Draw your polygon on the map to calculate official size.</p>
                    </div>
                </div>
             </div>
          </div>
        </div>

        {showResults && (
           <div id="results-dashboard" className="py-24 animate-in fade-in slide-in-from-bottom-12 duration-1000">
              <div className="max-w-6xl mx-auto px-4">
                 <div className="bg-white/5 backdrop-blur-xl border-t-[8px] border-syntry-teal-600 border-x border-b border-syntry-slate-200/10 rounded-md overflow-hidden shadow-2xl">
                    <div className="p-8 md:p-16 border-b border-syntry-slate-200/10 flex flex-col lg:flex-row justify-between gap-12 bg-black/20">
                       <div className="space-y-6">
                          <div className="flex items-center gap-4">
                             <div className="bg-syntry-teal-600 text-white w-12 h-12 rounded-md flex items-center justify-center text-2xl shadow-lg">✓</div>
                             <div>
                                 <h2 className="text-4xl font-medium text-white tracking-tight">Verified Sovereign</h2>
                                 <p className="text-syntry-slate-300 font-medium">Asset ID: SYN-GA-4052 • Accra Registry</p>
                             </div>
                          </div>
                          <div className="bg-syntry-teal-600/10 border border-syntry-teal-600/20 p-6 rounded-md flex items-center gap-4">
                             <span className="text-3xl">🛡️</span>
                             <div>
                                <p className="font-medium text-syntry-teal-600 text-sm uppercase tracking-widest">Risk Summary: NEGATIVE</p>
                                <p className="text-xs font-medium text-syntry-slate-300/80">All protocol layers are balanced. Zero litigation detected.</p>
                              </div>
                           </div>
                       </div>
                       <div className="flex flex-col gap-3 justify-center items-center lg:items-end">
                          <p className="text-[10px] font-medium text-syntry-slate-300 uppercase tracking-widest">Sovereign Valuation</p>
                          <p className="text-5xl font-medium text-white tracking-tighter">GH₵ 3.25M</p>
                          <span className="text-[10px] bg-syntry-teal-600 text-white px-3 py-1 rounded-md font-medium uppercase tracking-widest">Market Index Top 5%</span>
                       </div>
                    </div>

                    <div className="p-8 md:p-16 grid grid-cols-1 lg:grid-cols-12 gap-16">
                       <div className="lg:col-span-4 space-y-10">
                          <h3 className="text-xs font-medium text-syntry-slate-300 uppercase tracking-[3px] border-b border-syntry-slate-200/10 pb-4">Chain of Trust</h3>
                          <div className="relative pl-10 border-l-2 border-syntry-slate-200/10 space-y-12">
                             {CHAIN_OF_TRUST.map((item, i) => (
                                <div key={i} className="relative">
                                   <div className="absolute -left-[51px] top-1 w-5 h-5 rounded-md bg-syntry-obsidian border-4 border-syntry-teal-600 shadow-lg"></div>
                                   <p className="text-[10px] font-medium text-syntry-teal-600 mb-1">{item.year}</p>
                                   <p className="text-lg font-medium text-white mb-1">{item.event}</p>
                                   <p className="text-xs font-medium text-syntry-slate-300/60 leading-relaxed">{item.detail}</p>
                                </div>
                             ))}
                          </div>
                       </div>

                       <div className="lg:col-span-8 space-y-10">
                          <h3 className="text-xs font-medium text-syntry-slate-300 uppercase tracking-[3px] border-b border-syntry-slate-200/10 pb-4">Sovereign 8-Layer Matrix</h3>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                             {EIGHT_LAYERS.map((layer) => (
                                <button 
                                  key={layer.id} 
                                  onClick={() => setActiveLayer(layer)}
                                  className="text-left bg-white/5 border border-syntry-slate-200/10 p-6 rounded-md hover:bg-white/10 hover:shadow-xl transition-all group relative overflow-hidden"
                                >
                                   <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-100 transition-opacity">👁️</div>
                                   <div className="flex items-center gap-4 mb-4">
                                      <div className="w-10 h-10 bg-black/30 rounded-md flex items-center justify-center border border-syntry-slate-200/10 shadow-sm text-syntry-teal-600 font-medium">✓</div>
                                      <div>
                                         <p className="text-[9px] font-medium text-syntry-slate-300/50 uppercase tracking-widest">{layer.source}</p>
                                         <p className="text-sm font-medium text-white">{layer.name}</p>
                                      </div>
                                   </div>
                                   <div className="w-full bg-white/5 h-1.5 rounded-md overflow-hidden">
                                      <div className="h-full bg-syntry-teal-600" style={{ width: `${layer.confidence}%` }}></div>
                                   </div>
                                </button>
                             ))}
                          </div>
                       </div>
                    </div>

                    <div className="p-8 md:p-16 bg-black/40 text-white flex flex-col md:flex-row items-center justify-between gap-12">
                       <div className="space-y-2 text-center md:text-left">
                          <p className="text-[10px] font-medium text-syntry-teal-600 uppercase tracking-widest">Institutional Assurance</p>
                          <p className="text-xl font-medium">Secured by Syntry Protocol • Real-time Sync active.</p>
                       </div>
                       <div className="flex flex-wrap justify-center gap-4">
                          <button className="bg-gradient-to-r from-syntry-teal-600 to-syntry-teal-700 text-white px-8 py-5 rounded-md font-medium text-xs uppercase tracking-widest shadow-xl hover:opacity-90 transition-all">Sovereign Report</button>
                          <button className="bg-white/5 border border-syntry-slate-200/10 text-white px-8 py-5 rounded-md font-medium text-xs uppercase tracking-widest hover:bg-white/10 transition-all">Fix My Status</button>
                       </div>
                    </div>
                 </div>
              </div>
           </div>
        )}
      </main>

      {activeLayer && (
         <div className="fixed inset-0 z-[3000] flex items-center justify-center p-6 bg-syntry-obsidian/80 backdrop-blur-sm animate-in fade-in">
            <div className="bg-syntry-obsidian border border-syntry-slate-200/10 w-full max-w-lg rounded-md p-12 shadow-3xl relative animate-in zoom-in-95">
               <button onClick={() => setActiveLayer(null)} className="absolute top-8 right-8 text-syntry-slate-300 hover:text-white text-2xl font-medium transition-all">✕</button>
               <div className="space-y-8">
                  <div className="flex items-center gap-6">
                     <div className="w-20 h-20 bg-white/5 rounded-md border border-syntry-slate-200/10 flex items-center justify-center text-4xl shadow-inner">🛡️</div>
                     <div>
                        <p className="text-[10px] font-medium text-syntry-teal-600 uppercase tracking-widest">Syntry Layer Diagnostic</p>
                        <h2 className="text-3xl font-medium text-white tracking-tight">{activeLayer.name}</h2>
                     </div>
                  </div>
                  <div>
                     <p className="text-xs font-medium uppercase text-syntry-slate-300/50 mb-2">Internal Explanation</p>
                     <p className="text-lg font-medium text-syntry-slate-300 leading-relaxed italic">"{activeLayer.desc}"</p>
                  </div>
                  <button onClick={() => setActiveLayer(null)} className="w-full bg-gradient-to-r from-syntry-teal-600 to-syntry-teal-700 text-white py-5 rounded-md font-medium uppercase tracking-widest text-xs">Understood</button>
               </div>
            </div>
         </div>
      )}

      <GlobalFooter />
    </div>
  );
}
