'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import dynamic from 'next/dynamic';
const SovereignMap = dynamic(() => import('@/components/SovereignMap'), { 
  ssr: false, 
  loading: () => <div className="h-full w-full bg-[#0a0f1d] animate-pulse rounded-xl" /> 
});
import GraviticDecoupler from '@/components/GraviticDecoupler';

function ShareContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const [loading, setLoading] = useState(true);
  const [validation, setValidation] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!token) {
      setError('Missing security token.');
      setLoading(false);
      return;
    }

    async function verifyToken() {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || '';
        const res = await fetch(`${apiUrl}/api/share/verify`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token })
        });
        const data = await res.json();
        if (data.valid) {
          setValidation(data);
        } else {
          setError(data.error || 'Token verification failed.');
        }
      } catch (err) {
        setError('Connection to Sovereign Node failed.');
      } finally {
        setLoading(false);
      }
    }

    verifyToken();
  }, [token]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050810] flex flex-col items-center justify-center space-y-4">
        <div className="w-12 h-12 border-4 border-[#00F5D4]/20 border-t-[#00F5D4] rounded-full animate-spin"></div>
        <p className="text-[#00F5D4] font-mono text-xs uppercase tracking-widest animate-pulse">Establishing Secure Handshake...</p>
      </div>
    );
  }

  if (error || !validation?.valid) {
    return (
      <div className="min-h-screen bg-[#050810] text-red-500 font-mono flex flex-col items-center justify-center p-8 text-center space-y-6">
         <div className="text-6xl animate-pulse">🔒</div>
         <div>
            <h1 className="text-3xl font-medium uppercase tracking-widest mb-2">Access Denied</h1>
            <p className="text-lg text-red-400">
              {error || "This Sovereign Link has been consumed or is invalid."}
            </p>
         </div>
         <p className="text-sm text-gray-500 max-w-md italic mt-8 border-t border-red-900/50 pt-8">
            Note: This system enforces strict Zero-Knowledge Proof (ZKP) and Time-To-Live (TTL) boundaries. Links self-destruct upon first view to protect sovereign data integrity.
         </p>
      </div>
    );
  }

  const { plotId, exp } = validation.payload;
  const zkpData = {
    id: plotId.toUpperCase(),
    area: "Ashifla-Otatten Site Plan",
    coordinates: "5.6814° N, 0.1149° W",
    compliance: "70% PREMIUM SECURED",
    registryId: "GELIS-2026-X99",
    auditDate: "March 17, 2026",
    expiryDate: new Date(exp).toLocaleString()
  };

  return (
    <div className="min-h-screen bg-[#050810] text-white font-sans flex items-center justify-center p-4">
      <div className="max-w-3xl w-full bg-[#0E1629] border border-white/10 rounded-2xl shadow-2xl overflow-hidden">
        
        {/* Header - Light Version */}
        <div className="p-6 border-b border-white/5 bg-black/20 flex justify-between items-center">
           <div>
             <h1 className="text-xl font-light tracking-wide text-white">
               Syntry <span className="font-medium text-[#00F5D4]">Sovereign Share</span>
             </h1>
             <p className="text-[10px] text-gray-500 uppercase tracking-widest mt-1">External Verification Portal</p>
           </div>
           
           <div className="flex flex-col items-end">
             <div className="flex items-center gap-2 bg-[#00F5D4]/10 border border-[#00F5D4]/30 px-3 py-1.5 rounded-full">
               <div className="w-2 h-2 rounded-full bg-[#00F5D4] animate-pulse shadow-[0_0_10px_#00F5D4]"></div>
               <span className="text-[10px] font-medium tracking-tight uppercase tracking-widest text-[#00F5D4]">Syntry Verified</span>
             </div>
             <p className="text-[8px] text-gray-500 mt-1 uppercase font-mono tracking-tighter text-red-400 font-medium">⚠️ ONE-TIME ACCESS LINK</p>
           </div>
        </div>

        {/* Payload / ZKP Content */}
        <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
           
           {/* Left Col: Details */}
           <div className="space-y-6">
              <div>
                 <p className="text-[10px] uppercase tracking-widest text-gray-500 font-medium mb-1">Target Asset</p>
                 <h2 className="text-2xl font-mono text-white">{zkpData.id}</h2>
                 <p className="text-sm text-indigo-300 mt-1">{zkpData.area}</p>
              </div>

              <div className="space-y-4">
                <div className="bg-[#00F5D4]/5 border border-[#00F5D4]/20 p-4 rounded-xl">
                  <p className="text-[10px] uppercase tracking-widest text-[#00F5D4] font-medium tracking-tight mb-1">70% Reform Status</p>
                  <p className="text-sm font-medium text-white">{zkpData.compliance}</p>
                  <p className="text-[9px] text-gray-400 mt-2 italic border-t border-[#00F5D4]/10 pt-2">
                    Pursuant to the Land Act 2020 and March 2026 Directives.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/5 p-3 rounded-xl border border-white/5">
                    <p className="text-[9px] text-gray-500 uppercase font-medium tracking-tighter mb-1">GPS Anchor</p>
                    <p className="text-[11px] font-mono text-white">{zkpData.coordinates}</p>
                  </div>
                  <div className="bg-white/5 p-3 rounded-xl border border-white/5">
                    <p className="text-[9px] text-gray-500 uppercase font-medium tracking-tighter mb-1">GELIS Registry</p>
                    <p className="text-[11px] font-mono text-white">{zkpData.registryId}</p>
                  </div>
                </div>
              </div>
           </div>

           {/* Right Col: Mini-Map */}
           <div className="h-64 md:h-full bg-black rounded-xl border border-white/10 overflow-hidden relative group">
              <SovereignMap />
           </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-white/5 bg-black/40 text-center flex flex-col items-center shrink-0">
          <GraviticDecoupler />
          <p className="text-[9px] text-gray-600 uppercase tracking-widest mt-6">
            Cryptographically Signed Audit &bull; {zkpData.auditDate}
          </p>
          <p className="text-[8px] text-red-500/80 uppercase tracking-widest mt-1">
            This token self-destructs after this session. Do not refresh.
          </p>
        </div>

      </div>
    </div>
  );
}

export default function GuestViewerPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#050810]" />}>
      <ShareContent />
    </Suspense>
  );
}
