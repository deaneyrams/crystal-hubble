import dynamic from 'next/dynamic';
const SovereignMap = dynamic(() => import('@/components/SovereignMap'), { ssr: false, loading: () => <div className="h-full w-full bg-[#0a0f1d] animate-pulse" /> });
import { verifyAndConsumeToken } from '@/lib/sovereign-crypto';
import GraviticDecoupler from '@/components/GraviticDecoupler';

export default async function GuestViewerPage({ params }) {
  const { token } = params;
  
  // Decrypt and validate token Server-Side (Zero-Login security check)
  const validation = await verifyAndConsumeToken(token);

  if (!validation.valid) {
    return (
      <div className="min-h-screen bg-[#050810] text-red-500 font-mono flex flex-col items-center justify-center p-8 text-center space-y-6">
         <div className="text-6xl animate-pulse">🔒</div>
         <div>
            <h1 className="text-3xl font-bold uppercase tracking-widest mb-2">Access Denied</h1>
            <p className="text-lg text-red-400">
              {validation.error || "This Sovereign Link has been consumed or is invalid."}
            </p>
         </div>
         <p className="text-sm text-gray-500 max-w-md italic mt-8 border-t border-red-900/50 pt-8">
            Note: This system enforces strict Zero-Knowledge Proof (ZKP) and Time-To-Live (TTL) boundaries. Links self-destruct upon first view to protect sovereign data integrity.
         </p>
      </div>
    );
  }

  const { plotId, exp } = validation.payload;
  // Mock Data retrieval based on plotId for the external viewer
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
               Syntry <span className="font-bold text-[#00F5D4]">Sovereign Share</span>
             </h1>
             <p className="text-[10px] text-gray-500 uppercase tracking-widest mt-1">External Verification Portal</p>
           </div>
           
           <div className="flex flex-col items-end">
             <div className="flex items-center gap-2 bg-[#00F5D4]/10 border border-[#00F5D4]/30 px-3 py-1.5 rounded-full">
               <div className="w-2 h-2 rounded-full bg-[#00F5D4] animate-pulse shadow-[0_0_10px_#00F5D4]"></div>
               <span className="text-[10px] font-black uppercase tracking-widest text-[#00F5D4]">Syntry Verified</span>
             </div>
             <p className="text-[8px] text-gray-500 mt-1 uppercase font-mono tracking-tighter text-red-400 font-bold">⚠️ ONE-TIME ACCESS LINK</p>
           </div>
        </div>

        {/* Payload / ZKP Content */}
        <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
           
           {/* Left Col: Details */}
           <div className="space-y-6">
              <div>
                 <p className="text-[10px] uppercase tracking-widest text-gray-500 font-bold mb-1">Target Asset</p>
                 <h2 className="text-2xl font-mono text-white">{zkpData.id}</h2>
                 <p className="text-sm text-indigo-300 mt-1">{zkpData.area}</p>
              </div>

              <div className="space-y-4">
                <div className="bg-[#00F5D4]/5 border border-[#00F5D4]/20 p-4 rounded-xl">
                  <p className="text-[10px] uppercase tracking-widest text-[#00F5D4] font-black mb-1">70% Reform Status</p>
                  <p className="text-sm font-bold text-white">{zkpData.compliance}</p>
                  <p className="text-[9px] text-gray-400 mt-2 italic border-t border-[#00F5D4]/10 pt-2">
                    Pursuant to the Land Act 2020 and March 2026 Directives.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/5 p-3 rounded-xl border border-white/5">
                    <p className="text-[9px] text-gray-500 uppercase font-bold tracking-tighter mb-1">GPS Anchor</p>
                    <p className="text-[11px] font-mono text-white">{zkpData.coordinates}</p>
                  </div>
                  <div className="bg-white/5 p-3 rounded-xl border border-white/5">
                    <p className="text-[9px] text-gray-500 uppercase font-bold tracking-tighter mb-1">GELIS Registry</p>
                    <p className="text-[11px] font-mono text-white">{zkpData.registryId}</p>
                  </div>
                </div>
                
                <p className="text-[10px] text-gray-500 italic mt-4 border-l-2 border-indigo-500/30 pl-3">
                  This is a Zero-Knowledge Proof (ZKP) representation. Sensitive administrative datums (revenue, owner keys) have been omitted.
                </p>
              </div>
           </div>

           {/* Right Col: Mini-Map */}
           <div className="h-64 md:h-full bg-black rounded-xl border border-white/10 overflow-hidden relative group">
              <SovereignMap />
           </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-white/5 bg-black/40 text-center flex flex-col items-center">
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
