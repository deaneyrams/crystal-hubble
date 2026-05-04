'use client';
import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';

// Sovereign Engine Integration (Clean Slate Architecture)
const SovereignMap = dynamic(() => import('@/components/SovereignMap'), { 
  ssr: false, 
  loading: () => <div className="h-full w-full bg-[#0F172A] animate-pulse flex items-center justify-center font-mono text-[10px] text-[#0D9488] uppercase tracking-[0.3em]">Initializing Geospatial Node...</div>
});

const GlobalHeader = dynamic(() => import('@/components/GlobalHeader'), { ssr: false });
const GlobalFooter = dynamic(() => import('@/components/GlobalFooter'), { ssr: false });

const LAYERS_OF_TRUTH = [
  { id: 'gps', name: 'GPS Orbital Lock', source: 'Sentinel-V Satellite', confidence: 99.8, desc: 'Centroid validation against 2026 digital boundary maps.' },
  { id: 'title', name: 'Registry Sync', source: 'Lands Commission API', confidence: 100, desc: 'Live handshake with the GELIS 2.0 electronic registry.' },
  { id: 'litigation', name: 'Forensic Legal Check', source: 'Judiciary Database', confidence: 98.4, desc: 'Scanning for active disputes, caveats, or pending court cases.' },
  { id: 'traditional', name: 'Chief/Stool Auth', source: 'Sovereign Liaison', confidence: 95.0, desc: 'Verified traditional authority sign-off for current tenure.' },
  { id: 'survey', name: 'SMD Barcode Audit', source: 'Survey & Mapping', confidence: 99.2, desc: 'Cross-referencing site plan barcodes with official state records.' },
  { id: 'tax', name: 'GRA Compliance', source: 'Revenue Authority', confidence: 100, desc: 'Tax clearance certificate (TCC) validated for the asset.' },
  { id: 'utilities', name: 'Infrastructure Node', source: 'ECG/GWCL Data', confidence: 96.7, desc: 'Proximity audit to power grids and water nodes.' },
  { id: 'sovereign', name: 'SYNTRY Seal', source: 'Sovereign Core', confidence: 100, desc: 'Final audit pass. All 7 underlying layers balanced. Asset is Gold Certified.' }
];

export default function VerifyLandNowReconstruction() {
  const [hasMounted, setHasMounted] = useState(false);
  const [activeTab, setActiveTab] = useState('map');
  const [isVerifying, setIsVerifying] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [selectedLayer, setSelectedLayer] = useState(null);
  const [measurementData, setMeasurementData] = useState(null);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  const handleStartAudit = async () => {
    setIsVerifying(true);
    // Simulated deep-logic forensic audit
    await new Promise(resolve => setTimeout(resolve, 3500));
    setIsVerifying(false);
    setShowResults(true);
    setTimeout(() => {
      document.getElementById('sovereign-audit-results')?.scrollIntoView({ behavior: 'smooth' });
    }, 300);
  };

  if (!hasMounted) return <div className="min-h-screen bg-[#0F172A]" />;

  return (
    <div className="min-h-screen bg-[#0F172A] text-[#E2E8F0] font-sans selection:bg-[#0D9488]/30 selection:text-white">
      <GlobalHeader />

      <main className="pt-32 pb-24 px-6 md:px-12 max-w-[1600px] mx-auto space-y-20">
        
        {/* Hero & Directive */}
        <div className="max-w-4xl space-y-6">
          <div className="inline-flex items-center gap-3 bg-[#0D9488]/10 border border-[#0D9488]/20 px-4 py-2 rounded-md">
            <span className="w-2 h-2 bg-[#0D9488] rounded-md animate-pulse"></span>
            <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-[#0D9488]">Protocol Phase 5: Sovereign Verification</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-medium tracking-tight text-white leading-[1.1]">
            Mathematically Irrefutable <br className="hidden md:block" />
            <span className="text-white/40">Land Verification.</span>
          </h1>
          <p className="text-xl text-[#94A3B8] max-w-2xl font-light leading-relaxed">
            Eliminate land fraud with institutional-grade forensics. Cross-reference satellite telemetry, state registries, and legal records in a single handshake.
          </p>
        </div>

        {/* The Core Engine Interface */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Controls & Data Panel */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <div className="bg-white/5 border border-white/10 rounded-md p-8 backdrop-blur-xl shadow-2xl flex-grow space-y-10">
               <div className="space-y-4">
                  <h3 className="text-xs font-medium uppercase tracking-[0.3em] text-white/50">Verification Mode</h3>
                  <div className="flex gap-2 p-1 bg-black/20 rounded-md border border-white/5">
                     {['map', 'upload', 'manual'].map(t => (
                        <button 
                          key={t}
                          onClick={() => setActiveTab(t)}
                          className={`flex-1 py-3 rounded-md text-[10px] font-medium uppercase tracking-widest transition-all ${activeTab === t ? 'bg-[#0D9488] text-white shadow-lg' : 'text-white/40 hover:text-white hover:bg-white/5'}`}
                        >
                           {t}
                        </button>
                     ))}
                  </div>
               </div>

               <AnimatePresence mode="wait">
                  {activeTab === 'map' && (
                     <motion.div initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} exit={{opacity:0, y:-10}} className="space-y-6">
                        <div className="p-6 bg-white/5 rounded-md border border-white/10 text-center space-y-4 group hover:border-[#0D9488]/30 transition-all">
                           <span className="text-4xl group-hover:scale-110 transition-transform inline-block">📡</span>
                           <h4 className="text-white font-medium">Geospatial Draw</h4>
                           <p className="text-[11px] text-[#94A3B8] leading-relaxed">Draw your exact boundary on the map. Our nodes will calculate dimensions and identify the root title automatically.</p>
                        </div>
                        <button 
                           onClick={handleStartAudit}
                           disabled={isVerifying}
                           className="w-full py-6 bg-gradient-to-r from-[#0D9488] to-[#0D9488]/80 text-white rounded-md font-medium uppercase tracking-[0.2em] text-xs shadow-xl shadow-[#0D9488]/20 hover:opacity-90 active:scale-[0.98] transition-all disabled:opacity-50"
                        >
                           {isVerifying ? 'Running Forensic Audit...' : 'Execute Sovereign Search'}
                        </button>
                     </motion.div>
                  )}
                  {activeTab === 'upload' && (
                    <motion.div initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} exit={{opacity:0, y:-10}} className="space-y-6 text-center py-10">
                       <div className="w-20 h-20 bg-white/5 border border-dashed border-white/20 rounded-md mx-auto flex items-center justify-center text-3xl hover:border-[#0D9488] cursor-pointer transition-all">📤</div>
                       <p className="text-[11px] text-[#94A3B8]">Upload Site Plan or Indenture for OCR Analysis.</p>
                    </motion.div>
                  )}
               </AnimatePresence>
            </div>
            
            <div className="bg-[#0D9488]/5 border border-[#0D9488]/10 p-6 rounded-md">
               <p className="text-[10px] text-[#0D9488] uppercase tracking-widest font-medium mb-2">Legal Compliance</p>
               <p className="text-[11px] text-[#94A3B8] leading-relaxed italic">"All verifications are compliant with the Ghana Land Act 1036 and cross-referenced with the GELIS Registry."</p>
            </div>
          </div>

          {/* The Sovereign Map Engine */}
          <div className="lg:col-span-8 bg-white/5 rounded-md border border-white/10 overflow-hidden shadow-3xl min-h-[600px] relative">
            <SovereignMap onAreaCalculated={setMeasurementData} />
          </div>
        </div>

        {/* Results Logic */}
        <AnimatePresence>
          {showResults && (
            <motion.div 
              id="sovereign-audit-results"
              initial={{opacity:0, y:40}} 
              animate={{opacity:1, y:0}} 
              className="space-y-12 pt-20 border-t border-white/5"
            >
              <div className="flex flex-col lg:flex-row justify-between items-end gap-8">
                <div>
                  <h2 className="text-4xl font-medium tracking-tight text-white mb-4">Forensic Audit Results</h2>
                  <p className="text-[#94A3B8] max-w-xl">Asset verified against 8 layers of digital and physical truth.</p>
                </div>
                <div className="bg-white/5 border border-white/10 p-4 rounded-md flex items-center gap-6 backdrop-blur-md">
                   <div className="text-center px-4 border-r border-white/10">
                      <p className="text-[9px] uppercase tracking-widest text-[#94A3B8] mb-1">Syntry Score</p>
                      <p className="text-3xl font-medium text-[#0D9488]">99.8%</p>
                   </div>
                   <div className="text-center px-4">
                      <p className="text-[9px] uppercase tracking-widest text-[#94A3B8] mb-1">Registry Status</p>
                      <p className="text-xl font-medium text-white">VALIDATED</p>
                   </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {LAYERS_OF_TRUTH.map((layer) => (
                  <button 
                    key={layer.id}
                    onClick={() => setSelectedLayer(layer)}
                    className="bg-white/5 border border-white/10 p-8 rounded-md hover:border-[#0D9488]/40 transition-all text-left group relative overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-100 transition-opacity">🔬</div>
                    <p className="text-[9px] font-medium text-[#0D9488] uppercase tracking-widest mb-1">{layer.source}</p>
                    <h4 className="text-lg font-medium text-white mb-4 leading-tight">{layer.name}</h4>
                    <div className="w-full bg-white/5 h-1 rounded-md overflow-hidden">
                       <div className="h-full bg-[#0D9488]" style={{ width: `${layer.confidence}%` }}></div>
                    </div>
                  </button>
                ))}
              </div>

              <div className="bg-white/5 border border-white/10 rounded-md p-12 flex flex-col md:flex-row items-center justify-between gap-12 bg-gradient-to-r from-transparent to-[#0D9488]/5">
                 <div className="space-y-4 max-w-xl">
                    <h3 className="text-2xl font-medium text-white">Official Verification Certificate</h3>
                    <p className="text-sm text-[#94A3B8] leading-relaxed">Download the cryptographically signed Syntry Forensic Report. This document is admissible as preliminary evidence for institutional due diligence.</p>
                 </div>
                 <button className="px-12 py-5 bg-white text-[#0F172A] rounded-md font-medium uppercase tracking-[0.2em] text-[10px] shadow-2xl hover:scale-105 transition-all">Download .SYNTRY Report</button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </main>

      {/* Forensic Modal */}
      <AnimatePresence>
        {selectedLayer && (
          <div className="fixed inset-0 z-[3000] flex items-center justify-center p-6 bg-[#0F172A]/90 backdrop-blur-md animate-in fade-in">
             <motion.div 
               initial={{scale:0.9, opacity:0}}
               animate={{scale:1, opacity:1}}
               exit={{scale:0.9, opacity:0}}
               className="bg-[#0F172A] border border-white/10 max-w-lg w-full rounded-md p-12 shadow-3xl relative"
             >
                <button onClick={() => setSelectedLayer(null)} className="absolute top-8 right-8 text-white/40 hover:text-white transition-colors">✕</button>
                <div className="space-y-8 text-center">
                   <div className="w-20 h-20 bg-[#0D9488]/10 rounded-md border border-[#0D9488]/30 mx-auto flex items-center justify-center text-3xl">🛡️</div>
                   <div>
                      <p className="text-[10px] font-medium text-[#0D9488] uppercase tracking-[0.3em] mb-1">{selectedLayer.source}</p>
                      <h2 className="text-3xl font-medium text-white tracking-tight">{selectedLayer.name}</h2>
                   </div>
                   <p className="text-[#94A3B8] leading-relaxed italic">"{selectedLayer.desc}"</p>
                   <button onClick={() => setSelectedLayer(null)} className="w-full py-4 bg-white/5 border border-white/10 rounded-md text-[10px] font-medium uppercase tracking-widest hover:bg-white/10 transition-all">Close Diagnostic</button>
                </div>
             </motion.div>
          </div>
        )}
      </AnimatePresence>

      <GlobalFooter />
    </div>
  );
}
