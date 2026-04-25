"use client";

import React, { useState, useEffect } from 'react';
import { submitToGelis } from '@/lib/gelis-handshake';
import StatusTracker from '@/components/admin/StatusTracker';

export default function GelisPortalPage() {
  const [latency, setLatency] = useState(12);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [progressStep, setProgressStep] = useState(0); 
  const [submissionResult, setSubmissionResult] = useState(null);

  // Mock Plot Data
  const [mockPlot, setMockPlot] = useState({
    id: 'plot-ashifla-01',
    area: 'Ashifla-Otatten Site Plan',
    value: 331892.40,
    status: 'MINTED - IMMUTABLE',
    deedHash: 'SYN-DEED-2026-8492'
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setLatency(Math.floor(Math.random() * 8) + 10);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const steps = [
    "Awaiting Payload",
    "Legal Audit (Act 1036)",
    "GRA Tax Clearance",
    "Geospatial Anchor Sync",
    "Final Digital Enrollment"
  ];

  const handlePushToRegistry = async () => {
    setIsSubmitting(true);
    setProgressStep(1); 
    
    setTimeout(() => setProgressStep(2), 1500);
    setTimeout(() => setProgressStep(3), 3000);
    setTimeout(() => setProgressStep(4), 5000);

    const result = await submitToGelis(mockPlot.deedHash, mockPlot);

    setTimeout(() => {
      setSubmissionResult(result);
      setMockPlot(prev => ({ ...prev, status: 'IN-REGISTRATION' }));
      setIsSubmitting(false);
    }, 6000); 
  };

  const downloadDSR = () => {
    if (!submissionResult) return;
    
    const dsrContent = {
      title: "DIGITAL SUBMISSION RECEIPT (DSR)",
      plotId: mockPlot.id,
      syntryDeedID: mockPlot.deedHash,
      gelisEnrollmentID: submissionResult.enrollmentId,
      status: mockPlot.status,
      timestamp: submissionResult.timestamp,
      verificationLink: `https://www.syntry.co/share/${mockPlot.deedHash}`
    };

    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(dsrContent, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", `${submissionResult.enrollmentId}_DSR.syntry`);
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  const handleArchiveProperty = () => {
     const vaultPayload = {
       type: "SYNTRY_VAULT_ARCHIVE",
       version: "1.0-Custody",
       plotId: mockPlot.id,
       certificateOfTruth: mockPlot.deedHash,
       gelisEnrollmentID: submissionResult?.enrollmentId,
       history: [
         { action: "Reserved", timestamp: "2026-03-10T10:00:00Z" },
         { action: "70% Premium Paid", timestamp: "2026-03-12T14:30:00Z" },
         { action: "Digitally Minted (SYN-DEED)", timestamp: "2026-03-17T09:15:00Z" },
         { action: "GELIS Enrollment Handshake", timestamp: "2026-03-18T10:05:00Z" },
         { action: "Certificated to Vault", timestamp: new Date().toISOString() }
       ],
       archivedStatus: "PERMANENT_CUSTODY_LOCK"
     };

     const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(vaultPayload, null, 2));
     const downloadAnchorNode = document.createElement('a');
     downloadAnchorNode.setAttribute("href", dataStr);
     downloadAnchorNode.setAttribute("download", `${mockPlot.deedHash}_VAULT_ARCHIVE.syntry-vault`);
     document.body.appendChild(downloadAnchorNode);
     downloadAnchorNode.click();
     downloadAnchorNode.remove();
  };

  const isCustodyState = mockPlot.status === 'CERTIFICATED';

  return (
    <div className="min-h-screen bg-[#050810] text-gray-200 p-8 font-sans flex justify-center">
      <div className="w-full max-w-4xl space-y-8">
        
        {/* Header */}
        <div className={`bg-[#0E1629] border rounded-2xl p-6 flex flex-col md:flex-row justify-between items-center shadow-lg transition-colors duration-1000 ${isCustodyState ? 'border-[#D4AF37]/50 shadow-[0_0_30px_rgba(212,175,55,0.1)]' : 'border-white/10'}`}>
          <div>
            <h1 className="text-2xl font-light text-white tracking-wide">
              {isCustodyState ? 'Syntry Vault' : 'GELIS 2.0 Secure Portal'}
            </h1>
            <p className="text-[10px] text-gray-500 uppercase tracking-widest mt-1 font-mono">
              {isCustodyState ? 'Immutable Asset Custody Node' : 'Authorized Electronic Conveyancing Node'}
            </p>
          </div>
          
          <div className="mt-4 md:mt-0 flex flex-col items-end">
             {isCustodyState ? (
                <div className="flex items-center gap-2 border border-[#D4AF37]/40 px-4 py-2 rounded-lg bg-[#D4AF37]/10">
                   <span className="text-xl">🏆</span>
                   <span className="text-[10px] uppercase tracking-widest text-[#D4AF37] font-bold">
                     Asset Secured
                   </span>
                </div>
             ) : (
                <>
                  <div className="flex items-center gap-3 bg-black/40 border border-[#00F5D4]/20 px-4 py-2 rounded-lg">
                    <span className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00F5D4] opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-[#00F5D4]"></span>
                    </span>
                    <span className="text-[10px] uppercase tracking-widest text-[#00F5D4] font-bold">
                      API Live
                    </span>
                    <span className="text-[10px] text-gray-400 font-mono ml-2 border-l border-white/10 pl-3">
                      {latency}ms
                    </span>
                  </div>
                  <p className="text-[8px] text-gray-600 uppercase mt-1">Lands Commission Network Connected</p>
                </>
             )}
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Left Col: Asset Overview */}
            <div className={`bg-[#0E1629] border rounded-2xl p-6 space-y-6 transition-colors duration-1000 ${isCustodyState ? 'border-[#D4AF37]/30' : 'border-white/10'}`}>
              <h2 className="text-sm border-b border-white/5 pb-2 uppercase tracking-widest font-bold text-gray-400">
                {isCustodyState ? 'Certificate of Truth' : 'Asset Payload'}
              </h2>
              
              <div className="space-y-4">
                {isCustodyState ? (
                   <div className="bg-gradient-to-br from-[#1c1c1c] to-[#0a0a0a] p-6 rounded-xl border border-[#D4AF37]/40 text-center space-y-3 shadow-inner">
                      <p className="text-[10px] text-[#D4AF37] uppercase tracking-widest font-bold">Master Sovereign Hash</p>
                      <p className="font-mono text-2xl text-white tracking-wider">{mockPlot.deedHash}</p>
                      <p className="text-[9px] text-gray-500 italic mt-2">This is the unalterable, cryptographically secured anchor for the asset.</p>
                   </div>
                ) : (
                   <>
                    <div>
                       <p className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">Target Region</p>
                       <p className="font-mono text-lg text-white">{mockPlot.area}</p>
                    </div>
                    <div className="flex justify-between items-end">
                       <div>
                         <p className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">Syntry Deed Hash</p>
                         <p className="font-mono text-indigo-300 text-sm">{mockPlot.deedHash}</p>
                       </div>
                       <div>
                          <span className={`px-2 py-1 rounded text-[9px] uppercase font-black border tracking-widest ${
                             mockPlot.status === 'IN-REGISTRATION' 
                             ? 'bg-blue-900/40 text-blue-400 border-blue-500/50 animate-pulse'
                             : 'bg-green-900/40 text-green-400 border-green-500/50'
                          }`}>
                             {mockPlot.status}
                          </span>
                       </div>
                    </div>
                   </>
                )}
              </div>

              {!submissionResult && mockPlot.status !== 'IN-REGISTRATION' && !isCustodyState && (
                <button
                  onClick={handlePushToRegistry}
                  disabled={isSubmitting}
                  className={`w-full py-4 text-sm font-bold tracking-widest uppercase rounded-xl transition-all duration-300 flex items-center justify-center gap-2
                    ${isSubmitting 
                     ? 'bg-indigo-900/20 text-indigo-500 border border-indigo-500/30 cursor-wait'
                     : 'bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white shadow-[0_0_20px_rgba(79,70,229,0.4)] border border-indigo-400'
                    }`}
                >
                  {isSubmitting ? "Transmitting..." : "Push to Registry"}
                </button>
              )}

              {isCustodyState && (
                 <button
                   onClick={handleArchiveProperty}
                   className="w-full py-4 bg-gradient-to-r from-[#D4AF37] to-[#aa8022] hover:from-[#e5c04b] hover:to-[#cfa030] text-black rounded-xl text-sm font-black tracking-widest uppercase transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(212,175,55,0.3)] border border-[#f0d473]/50 transform hover:scale-[1.02]"
                 >
                   📥 Archive Property (.syntry-vault)
                 </button>
              )}
            </div>

            {/* Right Col: Handshake Terminal or Status Tracker */}
            <div className={`rounded-2xl relative overflow-hidden flex flex-col transition-colors duration-1000 ${
              isCustodyState 
                ? 'bg-[#111] border border-white/5 p-6' 
                : mockPlot.status === 'IN-REGISTRATION'
                ? 'bg-transparent border-none' // StatusTracker handles styling
                : 'bg-black border border-white/5 p-6'
            }`}>
               
               {mockPlot.status === 'MINTED - IMMUTABLE' && (
                  <>
                    <h2 className="text-sm border-b border-white/5 pb-2 uppercase tracking-widest font-bold text-gray-400 mb-4 z-10">
                      Telemetry & Handshake
                    </h2>
                    <div className="absolute inset-0 opacity-20 pointer-events-none text-blue-500 text-[8px] leading-tight select-none z-0">
                      {Array.from({length: 40}).map((_, i) => (
                          <div key={i}>0x{Math.random().toString(16).substr(2, 8)} ... {Date.now() - i * 100}ms OK</div>
                      ))}
                    </div>
                    <div className="z-10 flex-grow flex flex-col justify-center space-y-6">
                      <div className="space-y-2">
                        <div className="flex justify-between items-center text-[10px] uppercase font-bold tracking-widest text-[#00F5D4]">
                          <span>Handshake State</span>
                          <span>{progressStep}/4</span>
                        </div>
                        <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-gradient-to-r from-indigo-500 to-[#00F5D4] transition-all duration-500 ease-out"
                              style={{ width: `${(progressStep/4) * 100}%` }}
                            ></div>
                        </div>
                        <p className="text-xs text-center font-mono text-white tracking-widest mt-4 min-h-[20px] animate-pulse">
                          {steps[progressStep]}
                        </p>
                      </div>
                    </div>
                  </>
               )}

               {mockPlot.status === 'IN-REGISTRATION' && (
                  <StatusTracker onCertificated={() => setMockPlot(prev => ({ ...prev, status: 'CERTIFICATED' }))} />
               )}

               {isCustodyState && (
                  <div className="h-full flex flex-col justify-center items-center text-center space-y-4 animate-in fade-in duration-1000">
                     <div className="w-16 h-16 rounded-full bg-[#D4AF37]/10 flex items-center justify-center border border-[#D4AF37]/30">
                        <span className="text-3xl">🔒</span>
                     </div>
                     <div>
                       <h3 className="text-white font-bold tracking-widest uppercase text-sm">Property Envaulted</h3>
                       <p className="text-[10px] text-gray-500 mt-2 max-w-xs mx-auto">
                         The asset lifecycle is complete. All logs, chats, and immutable audit trails are sealed. This interface is now permanently Read-Only.
                       </p>
                     </div>
                     {submissionResult && (
                       <button 
                         onClick={downloadDSR}
                         className="mt-2 text-[#D4AF37] hover:text-white transition-colors text-[10px] uppercase tracking-widest font-bold underline decoration-[#D4AF37]/50 underline-offset-4"
                       >
                         Download Registry DSR Backup
                       </button>
                     )}
                  </div>
               )}

            </div>

        </div>
      </div>
    </div>
  );
}
