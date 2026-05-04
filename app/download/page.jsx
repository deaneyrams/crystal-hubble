'use client';
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import dynamic from 'next/dynamic';
const SovereignMap = dynamic(() => import('@/components/SovereignMap'), { ssr: false });

export default function DownloadPage() {
  const [terminalLogs, setTerminalLogs] = useState([
    { id: 1, text: '> INITIALIZING SYNTY SOVEREIGN OS...', type: 'info' },
    { id: 2, text: '> HANDSHAKING WITH NODE 08 (MINISTERIAL DATA)...', type: 'info' },
    { id: 3, text: '> STATUS: ENCRYPTED HANDSHAKE SUCCESSFUL.', type: 'success' },
  ]);
  const [systemStatus, setSystemStatus] = useState('SYNCING');
  const [geofenceStatus, setGeofenceStatus] = useState('IDLE');
  const [identifiedPlot, setIdentifiedPlot] = useState(null);
  const [isiOSBetaOpen, setIsiOSBetaOpen] = useState(false);
  const logEndRef = useRef(null);

  const addLog = (text, type = 'info') => {
    setTerminalLogs(prev => [...prev, { id: Date.now(), text: `> ${text}`, type }]);
  };

  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [terminalLogs]);

  // Geofencing & Identification Logic
  useEffect(() => {
    if ("geolocation" in navigator) {
      setGeofenceStatus('SCANNING');
      addLog('GEOLOCATION NODE ACTIVE. SCANNING FOR PARCEL OVERLAP...', 'info');

      const watchId = navigator.geolocation.watchPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        
        try {
          const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || ''}/api/land/identify`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ lat: latitude, lng: longitude })
          });
          const data = await res.json();

          if (data.identified) {
            setGeofenceStatus('LOCKED');
            setIdentifiedPlot(data);
            addLog(`GEOFENCE LOCK: ${data.plot_name.toUpperCase()} DETECTED.`, 'success');
            addLog(`STATUS: ${data.status.toUpperCase()} | BALANCE: GH₵${data.remaining_balance.toLocaleString()}`, 'info');
            
            // Alert for Pokuase (Emerald Grove) simulator
            if (data.plot_id.includes('VLT-08')) {
              alert("WELCOME TO EMERALD GROVE, POKUASE.\nYou are physically within a Verified Syntry Node.");
            }
          } else {
            setGeofenceStatus('ACTIVE');
            addLog(`POSITION: ${latitude.toFixed(4)}, ${longitude.toFixed(4)} - NO SYNTRY PLOTS DETECTED.`, 'info');
          }
        } catch (e) {
          addLog('SYNC ERROR WITH LAND NODE 08.', 'error');
        }
      }, (err) => {
        setGeofenceStatus('ERROR');
        addLog(`GEOLOCATION DENIED: ${err.message}`, 'error');
      }, { enableHighAccuracy: true });

      return () => navigator.geolocation.clearWatch(watchId);
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#060D14] pt-24 pb-20 px-4 md:px-10 font-mono text-[#00FF41]">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left: Terminal Console */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div className="bg-black/60 backdrop-blur-xl border border-[#00FF41]/20 rounded-md p-6 h-[500px] flex flex-col shadow-[0_0_50px_rgba(0,255,65,0.05)]">
            <div className="flex items-center justify-between mb-6 border-b border-[#00FF41]/10 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-[#00FF41] rounded-md animate-pulse shadow-[0_0_8px_#00FF41]" />
                <span className="text-[10px] tracking-[4px] uppercase">Sovereign Terminal v2.4</span>
              </div>
              <div className="text-[10px] opacity-40">UTC: {new Date().toISOString().split('T')[1].split('.')[0]}</div>
            </div>

            <div className="flex-1 overflow-y-auto space-y-3 custom-scrollbar pr-2 mb-4">
              {terminalLogs.map(log => (
                <div key={log.id} className={`text-[11px] leading-relaxed break-words ${
                  log.type === 'success' ? 'text-[#00FF41]' : 
                  log.type === 'error' ? 'text-[#FF4141]' : 
                  'text-[#00FF41]/60'
                }`}>
                  {log.text}
                </div>
              ))}
              <div ref={logEndRef} />
            </div>

            <div className="grid grid-cols-2 gap-4 border-t border-[#00FF41]/10 pt-4">
              <div className="bg-[#00FF41]/5 p-3 rounded-lg border border-[#00FF41]/10">
                <div className="text-[8px] opacity-40 uppercase mb-1">GEOFENCE STATUS</div>
                <div className={`text-[10px] font-medium ${geofenceStatus === 'LOCKED' ? 'text-[#B8FF3C]' : 'text-inherit'}`}>
                  {geofenceStatus}
                </div>
              </div>
              <div className="bg-[#00FF41]/5 p-3 rounded-lg border border-[#00FF41]/10">
                <div className="text-[8px] opacity-40 uppercase mb-1">SYS NODE 08</div>
                <div className="text-[10px] font-medium text-[#B8FF3C]">CONNECTED</div>
              </div>
            </div>
          </div>

          {/* App Download UI */}
          <div className="bg-black/60 backdrop-blur-xl border border-white/5 rounded-md p-8 space-y-8">
            <h3 className="text-white font-head uppercase tracking-[4px] text-sm">Deployment Channels</h3>
            
            <div className="space-y-4">
              {/* Android */}
              <a 
                href="/downloads/syntry-latest.apk" 
                download
                className="flex items-center justify-between p-4 bg-[#B8FF3C] text-black rounded-md hover:scale-[1.02] active:scale-95 transition-all group"
              >
                <div className="flex items-center gap-4">
                  <span className="text-xl">🤖</span>
                  <div className="text-left">
                    <div className="text-[10px] font-medium tracking-tight uppercase tracking-widest leading-none mb-1">Android Native</div>
                    <div className="text-[8px] opacity-60 uppercase font-mono">v1.2.4 (Latest Stable)</div>
                  </div>
                </div>
                <span className="group-hover:translate-x-1 transition-transform">↓</span>
              </a>

              {/* iOS */}
              <button 
                onClick={() => setIsiOSBetaOpen(true)}
                className="w-full flex items-center justify-between p-4 bg-white/5 border border-white/10 text-white rounded-md hover:bg-white/10 transition-all"
              >
                <div className="flex items-center gap-4">
                  <span className="text-xl">🍎</span>
                  <div className="text-left">
                    <div className="text-[10px] font-medium tracking-tight uppercase tracking-widest leading-none mb-1">Apple TestFlight</div>
                    <div className="text-[8px] opacity-40 uppercase font-mono">Request Beta Access</div>
                  </div>
                </div>
                <span className="text-white/20">→</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right: High-Precision Map Overlay */}
        <div className="lg:col-span-7 h-[600px] lg:h-[850px] relative">
          <SovereignMap initialLat={5.6814} initialLng={-0.1149} />
          
          <div className="absolute top-6 right-6 z-20 pointer-events-none">
            <div className="bg-black/80 backdrop-blur-xl border border-[#00FF41]/20 p-4 rounded-md space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 bg-[#B8FF3C] rounded-md" />
                <span className="text-[8px] text-[#B8FF3C] uppercase tracking-[4px]">Precision Map Overlay Active</span>
              </div>
              <div className="text-[10px] text-white/40 uppercase leading-relaxed">
                Source: Node 08 Statutory Sync<br/>
                Resolution: 0.12m/px<br/>
                Datum: WGS 84
              </div>
            </div>
          </div>

          <div className="absolute bottom-6 left-6 right-6 z-20">
            <AnimatePresence>
              {identifiedPlot && (
                <motion.div 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 20, opacity: 0 }}
                  className="bg-[#B8FF3C] p-[1px] rounded-md shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
                >
                  <div className="bg-[#0C0C14] rounded-[11px] p-6 flex items-center justify-between">
                    <div>
                      <div className="text-[9px] text-[#B8FF3C] uppercase tracking-[4px] mb-2 font-medium tracking-tight">Identified Parcel Node</div>
                      <h4 className="text-white font-head uppercase text-xl leading-none">{identifiedPlot.plot_name}</h4>
                      <div className="mt-4 flex items-center gap-4">
                        <div className="bg-[#00FF41]/10 px-2 py-1 rounded text-[8px] text-[#00FF41] uppercase">{identifiedPlot.status}</div>
                        <div className="text-[10px] text-white/40 uppercase font-mono">BAL: GH₵{identifiedPlot.remaining_balance.toLocaleString()}</div>
                      </div>
                    </div>
                    <button 
                      onClick={() => window.location.href = '/invest/'}
                      className="px-6 py-4 bg-[#B8FF3C] text-black font-head font-medium tracking-tight text-xs uppercase tracking-widest rounded-lg hover:scale-105 transition-transform"
                    >
                      Audit Details
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* iOS Beta Modal */}
      <AnimatePresence>
        {isiOSBetaOpen && (
          <div className="fixed inset-0 z-[2000] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsiOSBetaOpen(false)}
              className="absolute inset-0 bg-black/90 backdrop-blur-md"
            />
            <motion.div 
              initial={{ scale: 0.9, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 20, opacity: 0 }}
              className="relative bg-[#060D14] border border-white/10 p-10 rounded-[32px] w-full max-w-lg shadow-[0_50px_100px_rgba(0,0,0,0.8)]"
            >
              <h2 className="text-3xl font-head text-[#B8FF3C] mb-4 uppercase">Request iOS Beta</h2>
              <p className="text-white/40 text-sm font-body mb-8">iOS TestFlight invites are limited to active Syntry Bond holders and institutional partners. Please enter your email to join the queue.</p>
              
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-[4px] text-white/20">Authorized Email</label>
                  <input type="email" placeholder="investor@example.com" className="w-full bg-white/5 border border-white/10 rounded-md px-4 py-4 text-white outline-none focus:border-[#B8FF3C] transition-all" />
                </div>
                <button className="w-full py-5 bg-[#B8FF3C] text-black font-head font-medium tracking-tight tracking-widest uppercase text-xs rounded-md shadow-[0_20px_40px_rgba(184,255,60,0.2)]">
                  Submit Request
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: rgba(0,255,65,0.02); }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(0,255,65,0.2); border-radius: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(0,255,65,0.4); }
      `}</style>
    </div>
  );
}
