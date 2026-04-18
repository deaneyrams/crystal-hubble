"use client";

import React from 'react';

export default function ShareVerification({ plotId, area = "East Legon Hills" }) {
  const shareData = {
    title: `Syntry Core: Verification for ${plotId}`,
    text: `I've verified the ownership and 70% premium compliance for ${area} (${plotId}) on Syntry. Check the sovereign deed here:`,
    // Deep linking to our newly created Guest Viewer Route
    url: typeof window !== 'undefined' ? `${window.location.origin}/share/${plotId}` : `https://syntry.io/share/${plotId}` 
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.log("Share cancelled or failed", err);
      }
    } else {
      // Fallback: Copy to Clipboard
      navigator.clipboard.writeText(shareData.url);
      alert("Verification Link Copied to Clipboard!");
    }
  };

  return (
    <div className="mt-4 p-4 bg-indigo-900/10 border border-indigo-500/20 rounded-xl">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[10px] text-indigo-400 uppercase font-mono tracking-widest">External Trust Handshake</p>
          <p className="text-xs text-gray-400">Invite partners to view this audit.</p>
        </div>
        <div className="flex flex-col items-end gap-1">
          <button 
            onClick={handleShare}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-bold flex items-center gap-2 transition-all shadow-lg shadow-indigo-500/20"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" y1="2" x2="12" y2="15"/></svg>
            Share Link
          </button>
          <span className="text-[8px] text-gray-500 uppercase tracking-widest">TTL: 24h &bull; ZKP Active</span>
        </div>
      </div>
    </div>
  );
}
