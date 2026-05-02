'use client';

import React, { useRef, useState, useEffect } from 'react';
import { jsPDF } from 'jspdf';

export default function CertificateGenerator({ plot, auditResult }) {
  const certificateRef = useRef(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [html2canvasLoader, setHtml2canvasLoader] = useState(null);

  useEffect(() => {
    import('html2canvas').then((module) => {
      setHtml2canvasLoader(() => module.default);
    }).catch(err => console.error("Failed to load html2canvas", err));
  }, []);

  if (!plot || plot.status !== 'verified' || !auditResult || !auditResult.verified) return null;

  const handleDownload = async () => {
    if (!html2canvasLoader) return;
    
    setIsGenerating(true);
    try {
      const element = certificateRef.current;
      element.style.display = 'block';

      const canvas = await html2canvasLoader(element, {
        scale: 3, // Premium quality
        useCORS: true,
        backgroundColor: '#050a18',
        logging: false,
      });

      element.style.display = 'none';

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`Syntry_Sovereign_Deed_${plot.id.toUpperCase()}.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="mt-6 border-t border-white/10 pt-4">
      <button
        onClick={handleDownload}
        disabled={isGenerating}
        className={`w-full py-4 rounded-xl font-medium uppercase tracking-widest text-xs flex items-center justify-center gap-3 transition-all duration-300
          ${isGenerating 
            ? 'bg-[#00F5D4]/10 text-[#00F5D4]/40 cursor-wait' 
            : 'bg-gradient-to-r from-[#00F5D4]/20 via-[#00F5D4]/10 to-[#00F5D4]/20 hover:from-[#00F5D4]/30 hover:to-[#00F5D4]/30 text-[#00F5D4] border border-[#00F5D4]/40 shadow-[0_0_20px_rgba(0,245,212,0.15)] hover:shadow-[0_0_30px_rgba(0,245,212,0.3)] hover:scale-[1.02]'
          }`}
      >
        {isGenerating ? (
          <>
            <span className="animate-spin h-4 w-4 border-2 border-[#00F5D4] border-t-transparent rounded-full" />
            Minting Sovereign Deed...
          </>
        ) : (
          <>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Download Sovereign Deed
          </>
        )}
      </button>

      {/* Hidden Certificate Template */}
      <div style={{ display: 'none' }}>
        <div 
          ref={certificateRef} 
          className="w-[1000px] bg-[#050a18] text-white p-20 font-sans relative overflow-hidden flex flex-col border-[20px] border-double border-[#1E3A8A]"
          style={{ minHeight: '1414px', background: 'radial-gradient(circle at center, #0E1629 0%, #050a18 100%)' }}
        >
          {/* Holographic Border Overlay */}
          <div className="absolute inset-0 pointer-events-none opacity-20"
               style={{ 
                 background: 'linear-gradient(135deg, transparent 40%, #00F5D4 45%, #FFD700 50%, #00F5D4 55%, transparent 60%)',
                 backgroundSize: '200% 200%',
                 animation: 'holographic 5s linear infinite'
               }}
          />

          {/* Syntry Protocol Seal Background */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] opacity-[0.03] pointer-events-none">
             <svg viewBox="0 0 100 100" className="w-full h-full fill-none stroke-white stroke-[0.5]">
               <circle cx="50" cy="50" r="45" />
               <path d="M50 5 L50 95 M5 50 L95 50" />
               <path d="M15 15 L85 85 M85 15 L15 85" />
               <circle cx="50" cy="50" r="30" />
             </svg>
          </div>

          {/* Header Section */}
          <div className="relative z-10 flex justify-between items-start mb-16">
            <div className="text-left">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-[#00F5D4] to-[#1E3A8A] rounded-full flex items-center justify-center p-3 shadow-[0_0_20px_rgba(0,245,212,0.4)]">
                   <svg viewBox="0 0 24 24" className="w-full h-full text-white fill-current">
                     <path d="M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71z" />
                   </svg>
                </div>
                <div>
                  <h1 className="text-4xl font-medium tracking-tight tracking-tighter text-white uppercase italic">Syntry <span className="text-[#00F5D4] not-italic">Protocol</span></h1>
                  <p className="text-[10px] tracking-[0.5em] uppercase text-[#00F5D4]/60 font-medium">Autonomous Land Intelligence Network</p>
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="inline-block px-4 py-2 border-2 border-[#1E3A8A] bg-[#1E3A8A]/20 backdrop-blur-sm rounded-lg">
                <p className="text-[8px] uppercase tracking-widest text-[#00F5D4] font-medium">Verification Index</p>
                <p className="text-lg font-mono font-medium">S-DEED-{plot.id.split('-')[1]?.toUpperCase() || 'MINT'}</p>
              </div>
            </div>
          </div>

          {/* Main Title */}
          <div className="relative z-10 text-center mb-20">
            <h2 className="text-6xl font-extralight tracking-[0.2em] uppercase text-white mb-6">Sovereign <span className="font-medium">Deed</span></h2>
            <div className="h-px w-64 mx-auto bg-gradient-to-r from-transparent via-[#00F5D4] to-transparent mb-6"></div>
            <p className="text-lg text-gray-400 italic font-serif">A Permanent Asset Class Verification under the Syntry Vault Lock system.</p>
          </div>

          {/* Core Content Grid */}
          <div className="relative z-10 grid grid-cols-2 gap-12 mb-20">
            <div className="space-y-8">
              <div className="p-8 border border-white/10 bg-black/40 rounded-2xl backdrop-blur-md">
                <h4 className="text-xs uppercase tracking-widest text-[#00F5D4] mb-6 font-medium flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#00F5D4]"></span> Asset Coordinates
                </h4>
                <div className="space-y-4 font-mono">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-500 uppercase">Plot identifier</span>
                    <span className="text-white font-medium">{plot.id.toUpperCase()}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-500 uppercase">GPS Latitude</span>
                    <span className="text-white">{plot.lat?.toFixed(6) || '37.774900'}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-500 uppercase">GPS Longitude</span>
                    <span className="text-white">{plot.lng?.toFixed(6) || '-122.419400'}</span>
                  </div>
                  <div className="pt-4 border-t border-white/5 flex justify-between items-center text-sm">
                    <span className="text-gray-500 uppercase">Valuation</span>
                    <span className="text-2xl font-light text-[#00F5D4]">${plot.value.toLocaleString()} USD</span>
                  </div>
                </div>
              </div>

              <div className="p-8 border border-white/10 bg-black/40 rounded-2xl backdrop-blur-md">
                <h4 className="text-xs uppercase tracking-widest text-[#00F5D4] mb-6 font-medium flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#00F5D4]"></span> Financial Ledger
                </h4>
                <div className="space-y-4 font-mono text-xs">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500">TRANSACTION ID</span>
                    <span className="text-gray-300">{plot.stripe_payment_id || 'cs_test_B123_TX_SYNTRY_001'}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500">NETWORK STATUS</span>
                    <span className="text-[#00F5D4] font-medium">SETTLED (L2-VAULT)</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500">MINT TIMESTAMP</span>
                    <span className="text-gray-300">
                      {auditResult?.timestamp 
                        ? new Date(auditResult.timestamp).toISOString() 
                        : new Date().toISOString()} 
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Trust Block with Stamps */}
            <div className="relative p-10 border-2 border-[#1E3A8A] bg-[#1E3A8A]/5 rounded-3xl overflow-hidden flex flex-col justify-center">
              <h4 className="text-sm uppercase tracking-[0.3em] font-medium tracking-tight text-white mb-10 text-center border-b border-[#1E3A8A] pb-4">Oracle Trust Verification</h4>
              
              <div className="space-y-10">
                 {[
                   { label: 'Registry Check', code: 'LAND_API_01' },
                   { label: 'Satellite Scan', code: 'SENTINEL_GIS' },
                   { label: 'Title Deed Cross-Ref', code: 'HASH_MATCH' }
                 ].map((check, i) => (
                   <div key={i} className="relative flex justify-between items-center">
                      <div>
                        <p className="text-white font-medium tracking-tight">{check.label}</p>
                        <p className="text-[9px] font-mono text-gray-500 italic mt-1">{check.code}</p>
                      </div>
                      <div className="relative">
                        <div className="text-[10px] text-gray-400 font-mono">200 OK</div>
                        {/* PASSED STAMP */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-4 border-[#00F5D4]/40 text-[#00F5D4]/40 font-medium tracking-tight px-4 py-1 text-2xl uppercase tracking-tighter -rotate-12 pointer-events-none scale-110">
                           PASSED
                        </div>
                      </div>
                   </div>
                 ))}
              </div>

              {/* Verified Hologram Seal */}
              <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-gradient-to-br from-[#00F5D4]/20 to-transparent rounded-full flex items-center justify-center border border-[#00F5D4]/20 rotate-12">
                 <div className="text-[8px] font-medium tracking-tight text-[#00F5D4]/40 text-center uppercase leading-tight">
                   Syntry<br/>Sovereign<br/>Verified
                 </div>
              </div>
            </div>
          </div>

          {/* Footer with QR and Disclaimer */}
          <div className="relative z-10 mt-auto flex items-end justify-between pt-12 border-t border-white/10">
            <div className="max-w-xl text-[10px] text-gray-500 leading-relaxed italic">
              THIS DEED IS A DIGITAL ASSET ISSUED UNDER THE SYNTRY VAULT PROTOCOL. IT REPRESENTS BINDING VERIFICATION OF LAND RIGHTS AS CONFIRMED BY THE DECENTRALIZED ORACLE NETWORK. UNAUTHORIZED DUPLICATION OR MODIFICATION IS SUBJECT TO CRYPTOGRAPHIC CONFLICT RESOLUTION.
            </div>
            
            <div className="flex flex-col items-center gap-2">
              <div className="w-24 h-24 bg-white p-2 rounded-lg shadow-xl shadow-cyan-900/40">
                {/* Mock QR Code Pattern */}
                <div className="w-full h-full bg-black flex flex-wrap opacity-80">
                   {Array.from({length: 49}).map((_, i) => (
                     <div key={i} className={`w-[14.28%] h-[14.28%] ${Math.random() > 0.5 ? 'bg-white' : 'bg-black'}`}></div>
                   ))}
                </div>
              </div>
              <p className="text-[8px] font-mono text-gray-400 uppercase tracking-widest">Verify Authenticity</p>
            </div>
          </div>

          {/* Style for animation */}
          <style>{`
            @keyframes holographic {
              0% { background-position: 100% 100%; }
              100% { background-position: 0% 0%; }
            }
          `}</style>
        </div>
      </div>
    </div>
  );
}
