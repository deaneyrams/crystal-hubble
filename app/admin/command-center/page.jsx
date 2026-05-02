"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function AdminCommandCenter() {
  const [adminAuth, setAdminAuth] = useState(false);
  const [isScanningAdmin, setIsScanningAdmin] = useState(false);
  const [activeTab, setActiveTab] = useState('inventory'); // inventory, vaults, pioneers, dev_verify, node

  // Trust Score State
  const [trustInputs, setTrustInputs] = useState({ litigation: 100, utilities: 80, fencing: 50 });
  const [droneId, setDroneId] = useState('');
  const trustScore = Math.floor((trustInputs.litigation * 0.5) + (trustInputs.utilities * 0.3) + (trustInputs.fencing * 0.2));

  // Milestone Automation State
  const [statusAction, setStatusAction] = useState('Pending Site Plan');

  const handleHardwareAuth = () => {
    setIsScanningAdmin(true);
    setTimeout(() => {
      setIsScanningAdmin(false);
      setAdminAuth(true);
    }, 2000);
  };

  const handleMilestoneUpdate = () => {
    alert("System Triggered: \n1. User Sovereign Bond Updated to 'Title Verified'\n2. WhatsApp 'Wealth Signal' dispatched\n3. 'Gold Scroll-Lead' pulse sent to dashboard.");
  };

  const handleBulkWhatsApp = () => {
    alert("Bulk WhatsApp dispatched to all 42 pioneers in the Ashifla Node via Twilio.");
  };

  if (!adminAuth) {
    return (
      <div className="min-h-screen bg-[#0D1B2A] text-white flex items-center justify-center font-body p-6 text-center">
        {isScanningAdmin ? (
          <div className="text-center w-full max-w-sm relative z-10 animate-[pulse_3s_ease-in-out_infinite]">
            <div className="w-full aspect-square border-4 border-[#2DD4BF] rounded-full flex flex-col items-center justify-center relative mb-8 overflow-hidden shadow-[0_0_100px_rgba(45,212,191,0.2)] mx-auto">
              <div className="absolute inset-0 bg-[#2DD4BF]/5"></div>
              <div className="w-1/2 h-[2px] bg-[#2DD4BF] shadow-[0_0_15px_#2DD4BF] absolute animate-scan"></div>
              <span className="text-6xl filter drop-shadow-[0_0_20px_rgba(45,212,191,0.8)]">👤</span>
            </div>
            <h3 className="text-2xl font-head font-medium tracking-tight text-white uppercase tracking-widest mb-2">Admin Biometric Required</h3>
            <p className="text-[#2DD4BF] font-mono text-sm uppercase tracking-widest">Hardware Security Key Processing...</p>
          </div>
        ) : (
          <div className="max-w-md w-full bg-[#162A3E]/80 border border-white/10 p-12 rounded-[40px] shadow-[0_50px_100px_rgba(0,0,0,0.5)] text-center relative z-10 backdrop-blur-3xl">
            <div className="w-20 h-20 bg-[#0D1B2A] rounded-2xl mx-auto flex items-center justify-center text-4xl mb-8 shadow-inner border border-white/5 text-[#D4AF37]">
              🛡️
            </div>
            <h2 className="text-3xl font-head font-medium tracking-tight text-white uppercase tracking-tighter mb-2">Command Center</h2>
            <p className="text-[#94A3B8] font-body text-sm mb-10">Restricted Sovereign Exchange Node Protocol.</p>
            <button onClick={handleHardwareAuth} className="w-full py-5 bg-[#D4AF37] text-[#0D1B2A] font-head font-medium tracking-tight uppercase tracking-[0.2em] text-[10px] rounded-full hover:bg-white transition-all shadow-[0_20px_40px_rgba(212,175,55,0.2)]">
              Initiate Hardware / Biometric Handshake
            </button>
          </div>
        )}
        <style dangerouslySetInnerHTML={{ __html: `
          @keyframes scan { 0% { top: -10%; } 100% { top: 110%; } }
          .animate-scan { animation: scan 2s linear infinite; }
        `}} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0D1B2A] text-white font-body">
      <header className="sticky top-0 bg-[#0B141E]/90 backdrop-blur-xl border-b border-white/5 z-50 px-8 py-5 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-[#162A3E] border border-white/10 rounded-xl flex items-center justify-center font-medium tracking-tight text-[#D4AF37]">S</div>
          <div>
            <h1 className="font-head font-medium tracking-tight uppercase tracking-widest text-sm leading-none text-white">Sovereign Admin</h1>
            <span className="text-[#2DD4BF] font-mono text-[9px] uppercase tracking-widest">Node 08 Active</span>
          </div>
        </div>
        <nav className="hidden md:flex bg-[#162A3E]/50 p-1 rounded-full border border-white/5 shadow-inner">
          {['inventory', 'vaults', 'pioneers', 'dev_verify', 'the_node'].map(tab => (
            <button 
              key={tab} 
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2 rounded-full text-[10px] font-medium tracking-tight uppercase tracking-widest transition-all ${activeTab === tab ? 'bg-[#0D1B2A] text-[#D4AF37] shadow-sm border border-white/5' : 'text-[#8CA0B4] hover:text-white'}`}
            >
              {tab.replace('_', ' ').replace('dev verify', 'Verifications')}
            </button>
          ))}
        </nav>
        <button onClick={() => setAdminAuth(false)} className="text-[#94A3B8] hover:text-white text-[10px] uppercase tracking-widest font-medium tracking-tight transition-colors">Terminate Session</button>
      </header>

      <main className="max-w-[1400px] mx-auto p-8 relative">
        <AnimatePresence mode="wait">
          {activeTab === 'inventory' && (
            <motion.div initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} exit={{opacity:0, y:-20}} className="space-y-8">
              <div className="flex justify-between items-end mb-10 border-b border-white/10 pb-6">
                <div>
                  <h2 className="text-3xl font-head font-medium tracking-tight uppercase tracking-tighter">Property Management</h2>
                  <p className="text-[#94A3B8] font-body text-sm mt-1">Deploy, verify, and orchestrate physical assets on the ledger.</p>
                </div>
                <button onClick={handleBulkWhatsApp} className="px-6 py-3 bg-[#10B981]/10 text-[#10B981] border border-[#10B981]/50 rounded-full font-medium tracking-tight text-[10px] uppercase tracking-widest flex items-center gap-2 hover:bg-[#10B981]/20 transition-all">
                  <span>💬</span> Bulk WhatsApp Alert (Ashifla)
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="bg-[#162A3E] border border-white/5 rounded-[32px] p-8 shadow-xl">
                  <h3 className="font-head font-medium tracking-tight uppercase tracking-widest text-[#D4AF37] mb-6 border-b border-white/10 pb-4">Milestone Automation</h3>
                  <div className="space-y-6">
                    <div>
                      <label className="text-[10px] font-medium uppercase tracking-widest text-white block mb-2">Target Asset</label>
                      <select className="w-full bg-[#0D1B2A] border border-white/10 text-white rounded-xl py-3 px-4 outline-none focus:border-[#2DD4BF] text-xs font-mono">
                        <option>SYN-VLT-08-492 (Ashifla)</option>
                        <option>SYN-VLT-08-118 (Otatten)</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-[10px] font-medium uppercase tracking-widest text-white block mb-2">Legal Status Workflow</label>
                      <select value={statusAction} onChange={(e)=>setStatusAction(e.target.value)} className="w-full bg-[#0D1B2A] border border-white/10 text-white rounded-xl py-3 px-4 outline-none focus:border-[#2DD4BF] text-xs font-mono">
                        <option>Pending Site Plan</option>
                        <option>Title Verified</option>
                        <option>Indenture Minted</option>
                      </select>
                    </div>
                    <button onClick={handleMilestoneUpdate} className="w-full py-4 bg-gradient-to-r from-[#2DD4BF] to-[#10B981] text-[#0D1B2A] font-head font-medium tracking-tight uppercase tracking-[0.2em] text-[10px] rounded-xl hover:scale-105 transition-all shadow-xl mt-4">
                      Deploy Status Update
                    </button>
                  </div>
                </div>

                <div className="lg:col-span-2 bg-[#162A3E]/40 border border-white/5 rounded-[32px] p-8 grid grid-cols-1 md:grid-cols-2 gap-8 relative overflow-hidden shadow-xl">
                  <div className="space-y-6 relative z-10">
                    <h3 className="font-head font-medium tracking-tight uppercase tracking-widest text-white border-b border-white/10 pb-4">Asset Attributes</h3>
                    <div className="space-y-4">
                       <div>
                         <label className="text-[10px] font-medium uppercase tracking-widest text-white block mb-1">GPS Coordinates</label>
                         <input type="text" placeholder="5.6037, -0.1870" className="w-full bg-[#0D1B2A] border border-white/10 text-white rounded-lg py-2.5 px-3 outline-none text-xs font-mono" />
                       </div>
                       <div>
                         <label className="text-[10px] font-medium uppercase tracking-widest text-[#2DD4BF] block mb-1">🛰️ 4K Drone Array ID</label>
                         <input type="text" value={droneId} onChange={(e) => setDroneId(e.target.value)} className="w-full bg-[#0D1B2A] border border-[#2DD4BF]/50 text-[#2DD4BF] rounded-lg py-2.5 px-3 outline-none text-xs font-mono" />
                       </div>
                    </div>
                    <div className="space-y-3 pt-4 border-t border-white/10">
                       <label className="text-[10px] font-medium uppercase tracking-widest text-white flex justify-between"><span>Litigation Clear</span> <span className="text-[#D4AF37]">{trustInputs.litigation}%</span></label>
                       <input type="range" min="0" max="100" value={trustInputs.litigation} onChange={(e)=>setTrustInputs({...trustInputs, litigation: e.target.value})} className="w-full accent-[#D4AF37]" />
                       <label className="text-[10px] font-medium uppercase tracking-widest text-white flex justify-between"><span>Utilities Ready</span> <span className="text-[#10B981]">{trustInputs.utilities}%</span></label>
                       <input type="range" min="0" max="100" value={trustInputs.utilities} onChange={(e)=>setTrustInputs({...trustInputs, utilities: e.target.value})} className="w-full accent-[#10B981]" />
                    </div>
                  </div>
                  <div className="flex flex-col items-center justify-center border-l border-white/5">
                     <div className="relative w-40 h-40 flex items-center justify-center">
                        <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
                           <path className="text-[#0D1B2A]" strokeWidth="4" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                           <path className="text-[#2DD4BF]" strokeWidth="4" strokeLinecap="round" strokeDasharray={`${trustScore}, 100`} stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                           <span className="text-3xl font-head font-medium tracking-tight text-white">{trustScore}%</span>
                           <span className="text-[8px] uppercase font-medium tracking-tight text-[#2DD4BF] tracking-widest">Score</span>
                        </div>
                     </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'dev_verify' && (
            <motion.div initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} exit={{opacity:0, y:-20}} className="space-y-8">
               <div className="bg-[#162A3E] border border-white/5 rounded-[32px] p-10 shadow-xl">
                  <div className="flex justify-between items-center mb-10 border-b border-white/10 pb-6">
                     <h3 className="font-head font-medium tracking-tight uppercase tracking-widest text-[#D4AF37]">Developer Verifications</h3>
                     <p className="text-[#94A3B8] text-[10px] font-mono uppercase font-medium tracking-tight tracking-widest">4 Node Requests Pending</p>
                  </div>
                  <div className="space-y-6">
                     {[
                        { company: "Prime Atlantic Devs", project: "Ashifla Sector 09", reg: "GH-88219" },
                        { company: "Gold Coast Estates", project: "Otatten B2", reg: "GH-11022" },
                     ].map((app, i) => (
                        <div key={i} className="bg-[#0D1B2A]/50 p-8 rounded-3xl border border-white/5 grid grid-cols-1 md:grid-cols-4 gap-8 items-center group hover:border-[#2DD4BF]/30 transition-all">
                           <div>
                              <p className="text-[10px] font-medium tracking-tight uppercase text-[#94A3B8] mb-1">Entity</p>
                              <h4 className="text-white font-medium leading-tight">{app.company}</h4>
                              <p className="text-[#94A3B8] text-[9px] font-mono mt-1">{app.reg}</p>
                           </div>
                           <div>
                              <p className="text-[10px] font-medium tracking-tight uppercase text-[#94A3B8] mb-1">Target Project</p>
                              <p className="text-white font-medium">{app.project}</p>
                           </div>
                           <div className="flex gap-2">
                              {['📄', '📏', '🏗️'].map(icon => (
                                 <div key={icon} className="w-10 h-10 bg-[#162A3E] rounded-lg border border-white/10 flex items-center justify-center text-lg hover:border-[#D4AF37] cursor-pointer">{icon}</div>
                              ))}
                           </div>
                           <div className="flex justify-end gap-3 uppercase text-[10px] font-medium tracking-tight tracking-widest">
                              <button className="px-5 py-3 text-red-400 border border-red-500/20 rounded-xl hover:bg-red-500/10">Reject</button>
                              <button onClick={() => alert("Developer Activated. WhatsApp Signal Dispatched.")} className="px-6 py-3 bg-[#10B981] text-[#0D1B2A] rounded-xl shadow-lg">Activate Node</button>
                           </div>
                        </div>
                     ))}
                  </div>
               </div>
            </motion.div>
          )}

          {activeTab === 'vaults' && (
             <motion.div initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} exit={{opacity:0, y:-20}} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                   <div className="bg-[#162A3E] p-10 rounded-[32px] border border-white/10 text-center">
                      <p className="text-[10px] font-medium tracking-tight uppercase tracking-widest text-[#94A3B8] mb-2">Total Secured</p>
                      <h2 className="text-4xl font-head font-medium tracking-tight text-white">GH₵14.2M</h2>
                   </div>
                   <div className="bg-[#162A3E] p-10 rounded-[32px] border border-[#D4AF37]/30 text-center relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-24 h-24 bg-[#D4AF37]/10 blur-[40px]"></div>
                      <p className="text-[10px] font-medium tracking-tight uppercase tracking-widest text-[#94A3B8] mb-2">High-Value Scans</p>
                      <h2 className="text-4xl font-head font-medium tracking-tight text-[#D4AF37]">04</h2>
                   </div>
                   <div className="bg-[#162A3E] p-10 rounded-[32px] border border-[#2DD4BF]/30 text-center">
                      <p className="text-[10px] font-medium tracking-tight uppercase tracking-widest text-[#94A3B8] mb-2">Handshakes</p>
                      <h2 className="text-4xl font-head font-medium tracking-tight text-[#2DD4BF]">1,240</h2>
                   </div>
                </div>
             </motion.div>
          )}

          {activeTab === 'pioneers' && (
             <motion.div initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} exit={{opacity:0, y:-20}} className="bg-[#162A3E] p-10 rounded-[32px] border border-white/5">
                <h3 className="font-head font-medium tracking-tight uppercase tracking-widest mb-10 pb-6 border-b border-white/10">Activity Ledger</h3>
                <div className="space-y-4">
                   {[
                      { status: "SUCCESS", actor: "Node Admin 1", action: "Updated Asset #118 to 'Title Verified'", time: "14:02 UTC" },
                      { status: "BIOMETRIC", actor: "Pioneer #8192", action: "Executed High-Value Transact (₵25k)", time: "09:12 UTC" }
                   ].map((log, i) => (
                      <div key={i} className="flex justify-between items-center bg-[#0D1B2A]/50 p-6 rounded-2xl border border-white/5">
                         <div>
                            <span className={`text-[8px] font-medium tracking-tight uppercase tracking-[0.2em] px-2 py-0.5 rounded border mb-2 inline-block ${log.status === 'SUCCESS' ? 'text-[#10B981] border-[#10B981]/30' : 'text-[#2DD4BF] border-[#2DD4BF]/30'}`}>{log.status}</span>
                            <p className="text-white text-sm font-medium">{log.actor}</p>
                            <p className="text-[#94A3B8] text-xs mt-1">{log.action}</p>
                         </div>
                         <p className="font-mono text-[10px] text-[#94A3B8]">{log.time}</p>
                      </div>
                   ))}
                </div>
             </motion.div>
          )}

          {activeTab === 'the_node' && (
             <motion.div initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} exit={{opacity:0, y:-20}} className="flex flex-col items-center justify-center py-24 text-center">
                <span className="text-7xl mb-8 animate-pulse">📡</span>
                <h2 className="text-3xl font-head font-medium tracking-tight uppercase tracking-tighter mb-4">System-Wide Broadcast</h2>
                <p className="text-[#94A3B8] text-sm max-w-sm mb-10">Push a global handshake to all active Sovereign client connections.</p>
                <button className="px-12 py-5 bg-[#D4AF37] text-[#0D1B2A] font-head font-medium tracking-tight uppercase tracking-widest text-[10px] rounded-full shadow-2xl hover:scale-105 transition-all">Broadcast Handshake</button>
             </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
