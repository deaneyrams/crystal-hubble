'use client';
import React, { useState } from 'react';

// Simulated database feed for the existing user (representing "My Neighborhood Watch")
const MOCK_FEED = [
  {
    eventId: "EVT-8XJ9A2",
    plotId: "SYN-ADJ-001",
    zone: "Amasaman Focus Node",
    timestamp: new Date(Date.now() - 3600000).toISOString(),
    distanceMeters: 14.5,
    flagCount: 1, // Another user already flagged it
    encroachmentData: {
      id: "NEW-VERIFY-T58",
      areaSqM: "75.4",
      percent: "2.1"
    }
  },
  {
    eventId: "EVT-M3N12Z",
    plotId: "SYN-ADJ-001", // Assuming the current logged-in user owns SYN-ADJ-001
    zone: "Amasaman Focus Node",
    timestamp: new Date(Date.now() - 86400000).toISOString(),
    distanceMeters: 42.1,
    flagCount: 0,
    encroachmentData: {
      id: "NEW-VERIFY-T12",
      areaSqM: "12.0",
      percent: "0.2"
    }
  }
];

export default function SentinelWatch() {
  const [feed, setFeed] = useState(MOCK_FEED);
  const [disputeModal, setDisputeModal] = useState(null);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [escalationResult, setEscalationResult] = useState(null);

  const openDispute = (event) => {
    setDisputeModal(event);
    setEscalationResult(null);
    setComment("");
  };

  const submitFlag = async () => {
    setLoading(true);
    
    // Increment the flag count locally
    const newFlagCount = disputeModal.flagCount + 1;
    
    if (newFlagCount >= 2) {
       // ESCALATION PROTOCOL ACTIVATED
       try {
         const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || ''}/api/whistleblower`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
               encroachments: [disputeModal.encroachmentData],
               userCoordinates: [[0,0]] // Privacy Guard: We do not send the reporter's personal data or exact home location, just boundary context
            })
         });
         const data = await res.json();
         if (data.success) {
            setEscalationResult(data);
         }
       } catch (err) {
         console.error(err);
       }
    } else {
       // Just update feed state for visualization without Whistleblower
       setFeed(feed.map(item => item.eventId === disputeModal.eventId ? { ...item, flagCount: newFlagCount } : item));
       setDisputeModal(null);
    }
    setLoading(false);
  };

  return (
    <div className="bg-white rounded-[3rem] shadow-xl border border-slate-100 overflow-hidden font-sans my-12">
      <div className="bg-slate-900 p-8 border-b-4 border-[#D4AF37] flex justify-between items-center">
         <div>
            <h3 className="text-2xl font-medium tracking-tight text-white flex items-center gap-3">
               <span className="text-3xl">👁️</span> Sentinel Watch
            </h3>
            <p className="text-slate-400 font-medium mt-1 max-w-xl text-sm">Community-Driven Verification Network. Real-time telemetry for boundaries within 50 meters of your Sovereign Plot.</p>
         </div>
         <div className="bg-white/10 px-4 py-2 rounded-md border border-white/20">
            <span className="block text-[10px] font-medium tracking-tight uppercase tracking-widest text-syntry-teal-600">Live Monitors</span>
            <span className="text-white font-medium">2 Active Threads</span>
         </div>
      </div>

      <div className="p-8 space-y-6">
        {feed.map((event) => (
           <div key={event.eventId} className="bg-slate-50 border border-slate-200 rounded-md p-6 flex flex-col md:flex-row justify-between gap-6 hover:shadow-lg transition-all group">
              <div className="flex gap-4">
                 <div className="w-16 h-16 bg-slate-200 rounded-md flex items-center justify-center text-2xl group-hover:bg-[#FF0000]/10 transition-colors">
                    📍
                 </div>
                 <div>
                    <span className="text-[10px] bg-slate-900 text-white px-3 py-1 rounded-md font-medium tracking-tight uppercase tracking-widest">{event.distanceMeters}m Away</span>
                    <h4 className="text-lg font-medium tracking-tight text-slate-900 mt-3">Shape Verification Event</h4>
                    <p className="text-slate-500 font-medium text-xs mt-1">An anonymous user submitted a plot mapping bordering <span className="text-slate-800">{event.zone}</span>.</p>
                    <p className="text-[#D4AF37] font-medium tracking-tight text-xs uppercase tracking-widest mt-2">{new Date(event.timestamp).toLocaleString()}</p>
                 </div>
              </div>
              <div className="flex flex-col items-end justify-between min-w-[200px]">
                 <span className="text-xs font-medium text-slate-500 bg-white border border-slate-200 px-3 py-1 rounded-md shadow-sm mb-4">
                    Flags: <span className={event.flagCount >= 1 ? "text-[#FF0000]" : "text-slate-900"}>{event.flagCount} / 2</span>
                 </span>
                 <button 
                    onClick={() => openDispute(event)}
                    className="w-full md:w-auto bg-white border-2 border-slate-900 text-slate-900 px-6 py-3 rounded-md font-medium tracking-tight text-xs uppercase tracking-widest hover:bg-slate-900 hover:text-white transition-colors"
                 >
                    Inspect Boundary
                 </button>
              </div>
           </div>
        ))}
      </div>

      {disputeModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[2000] flex items-center justify-center p-4">
           <div className="bg-white rounded-[3rem] w-full max-w-2xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300">
              <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                 <h2 className="text-xl font-medium tracking-tight text-slate-900">Anonymous Dispute Portal</h2>
                 <button onClick={() => setDisputeModal(null)} className="w-10 h-10 bg-slate-200 rounded-md font-medium tracking-tight text-slate-600 hover:bg-slate-300">✕</button>
              </div>
              <div className="p-8 space-y-6">
                 {escalationResult ? (
                    <div className="bg-syntry-teal-600/10 border border-[#0D9488]/30 p-8 rounded-md text-center space-y-4">
                       <span className="text-6xl block">⚖️</span>
                       <h3 className="text-2xl font-medium tracking-tight text-syntry-teal-600">Consensus Reached. Whistleblower Escalated.</h3>
                       <p className="text-slate-600 font-medium text-sm">2+ Neighbors have flagged this boundary. A forensic PDF report has been generated and hashed to Solana Devnet.</p>
                       <div className="bg-white p-4 rounded-md border border-slate-200 inline-block text-left shadow-inner">
                          <p className="text-[10px] font-medium tracking-tight uppercase tracking-widest text-slate-400">Secure Hash</p>
                          <p className="font-mono text-xs text-slate-900">{escalationResult.disputeHash}</p>
                       </div>
                       <button onClick={() => setDisputeModal(null)} className="w-full mt-4 bg-slate-900 text-white font-medium tracking-tight py-4 rounded-md shadow-xl">Close Terminal</button>
                    </div>
                 ) : (
                    <>
                       <div className="bg-red-50 border-2 border-red-200 p-6 rounded-md flex gap-4">
                          <span className="text-3xl">⚠️</span>
                          <div>
                             <p className="font-medium tracking-tight text-[#FF0000] uppercase text-xs tracking-widest">Notice to Monitor</p>
                             <p className="text-xs font-medium text-slate-700 mt-1">This verification intersects exactly <strong>{disputeModal.encroachmentData.areaSqM} SQM</strong> of projected space. You are submitting an immutable dispute against Asset <strong>{disputeModal.encroachmentData.id}</strong>.</p>
                          </div>
                       </div>
                       
                       <div className="space-y-4">
                          <label className="text-xs font-medium tracking-tight uppercase tracking-widest text-slate-500">Attach Community Evidence</label>
                          <div className="border-4 border-dashed border-slate-200 rounded-md p-8 text-center cursor-pointer hover:border-[#D4AF37]/50 hover:bg-[#D4AF37]/5 transition-all">
                             <span className="text-3xl">📸</span>
                             <p className="text-sm font-medium text-slate-900 mt-2">Upload Geotagged Photo</p>
                          </div>
                          
                          <textarea 
                             placeholder="Provide optional anonymous context for the compliance officer..."
                             className="w-full bg-slate-50 border-2 border-slate-200 rounded-md p-4 font-medium text-slate-900 text-sm focus:border-slate-900 outline-none"
                             rows="3"
                             value={comment}
                             onChange={(e) => setComment(e.target.value)}
                          />
                       </div>

                       <div className="flex gap-4 pt-4">
                          <button onClick={() => setDisputeModal(null)} className="flex-1 font-medium tracking-tight text-slate-500 hover:bg-slate-100 rounded-md transition-colors">Cancel</button>
                          <button 
                             onClick={submitFlag}
                             disabled={loading}
                             className="flex-[2] bg-[#FF0000] text-white py-4 rounded-md font-medium tracking-tight shadow-xl hover:bg-red-700 transition-colors disabled:opacity-50"
                          >
                             {loading ? 'Committing Flag...' : `Assert Flag (${disputeModal.flagCount} / 2)`}
                          </button>
                       </div>
                    </>
                 )}
              </div>
           </div>
        </div>
      )}
    </div>
  );
}
