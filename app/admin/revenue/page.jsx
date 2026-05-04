'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CEODashboard() {
  const [show2FAModal, setShow2FAModal] = useState(false);
  const [selectedPayout, setSelectedPayout] = useState(null);
  const [twoFaToken, setTwoFaToken] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationError, setVerificationError] = useState('');

  const handleVerifyPayout = async () => {
    setIsVerifying(true);
    setVerificationError('');
    
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || ''}/api/security/transaction/verify`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: 'demo-user-123',
          token: twoFaToken,
          amount: selectedPayout.amount
        })
      });
      
      const data = await response.json();
      
      if (data.success) {
        alert('Funds Released to Sovereign Vault Node Successfully.');
        setShow2FAModal(false);
        setTwoFaToken('');
      } else {
        setVerificationError(data.error || 'Identity Verification Failed.');
      }
    } catch (err) {
      setVerificationError('Sync error with Security Node.');
    } finally {
      setIsVerifying(false);
    }
  };
  return (
    <div className="min-h-screen bg-[#0a0514] text-white font-sans p-6 lg:p-10">
      <header className="mb-10 animate-in slide-in-from-top-4 duration-500 flex justify-between items-end">
         <div>
             <h1 className="text-3xl font-light tracking-wide text-white flex items-center gap-3">
               CEO <span className="font-medium text-[#f59e0b]">Revenue Engine</span>
             </h1>
             <p className="text-[10px] text-gray-500 uppercase tracking-widest mt-2 font-mono">Real-time Enterprise Aggregation • Syntry 3.0</p>
         </div>
         <div className="text-right">
             <div className="text-3xl font-medium tracking-tight text-[#14b8a6] tabular-nums">$14,250 <span className="text-sm font-light text-gray-400">MRR</span></div>
             <p className="text-[9px] uppercase tracking-widest text-[#14b8a6] mt-1 bg-[#14b8a6]/10 px-2 py-0.5 rounded border border-[#14b8a6]/30 inline-block">+18% MoM Growth</p>
         </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
         {/* Total Transaction Fees */}
         <div className="bg-black/40 border border-white/5 rounded-2xl p-6 relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-1 h-full bg-[#14b8a6] group-hover:w-full transition-all duration-500 opacity-10"></div>
            <h3 className="text-[10px] uppercase tracking-widest text-gray-400 font-medium mb-4">Total Transaction Fees (Daily)</h3>
            <div className="flex items-end gap-3 mb-2">
               <span className="text-3xl font-light text-white">$4,850</span>
               <span className="text-[10px] text-emerald-400 font-medium tracking-tight tracking-widest mb-1 mb-1.5 flex items-center gap-1">
                 <span className="text-lg leading-none">↑</span> 12%
               </span>
            </div>
            <p className="text-[9px] font-mono text-gray-500 uppercase">Monthly: $142,300 • Escrow Release (1.5%)</p>
         </div>

         {/* Premium Verification Conv */}
         <div className="bg-black/40 border border-white/5 rounded-2xl p-6 relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-1 h-full bg-[#f59e0b] group-hover:w-full transition-all duration-500 opacity-10"></div>
            <h3 className="text-[10px] uppercase tracking-widest text-gray-400 font-medium mb-4">Premium Verification Upsell</h3>
            <div className="flex items-end gap-3 mb-2">
               <span className="text-3xl font-light text-[#f59e0b]">42.8%</span>
               <span className="text-[10px] text-emerald-400 font-medium tracking-tight tracking-widest mb-1.5 flex items-center gap-1">
                 <span className="text-lg leading-none">↑</span> 5.2%
               </span>
            </div>
            <p className="text-[9px] font-mono text-gray-500 uppercase">Conversion: 428/1,000 Users (+500 GHS)</p>
         </div>

         {/* Total Active Subscriptions */}
         <div className="bg-black/40 border border-white/5 rounded-2xl p-6 relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-1 h-full bg-indigo-500 group-hover:w-full transition-all duration-500 opacity-10"></div>
            <h3 className="text-[10px] uppercase tracking-widest text-gray-400 font-medium mb-4">Active Subscriptions (Pro Tier)</h3>
            <div className="flex items-end gap-3 mb-2">
               <span className="text-3xl font-medium text-white">750</span>
               <span className="text-[10px] text-gray-400 font-medium tracking-tight tracking-widest mb-1.5">Accounts</span>
            </div>
            <p className="text-[9px] font-mono text-indigo-400 uppercase">@ $19/mo • MRR: $14,250</p>
         </div>

         {/* Vault Velocity */}
         <div className="bg-black/40 border border-white/5 rounded-2xl p-6 relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-1 h-full bg-red-500 group-hover:w-full transition-all duration-500 opacity-10"></div>
            <h3 className="text-[10px] uppercase tracking-widest text-gray-400 font-medium mb-4">Vault Velocity</h3>
            <div className="flex items-end gap-3 mb-2">
               <span className="text-3xl font-light text-white">4.2</span>
               <span className="text-[10px] text-gray-400 font-medium tracking-tight tracking-widest mb-1.5">Days</span>
            </div>
            <p className="text-[9px] font-mono text-gray-500 uppercase">Average Escrow Release Turnover</p>
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
         {/* Live Revenue Ledger */}
         <div className="lg:col-span-2 bg-black/30 border border-white/10 rounded-2xl p-6 relative overflow-hidden">
            <div className="flex justify-between items-center mb-6">
               <h3 className="text-xs uppercase tracking-widest text-white font-medium tracking-tight">Fractional Network Ledger</h3>
               <span className="text-[8px] uppercase tracking-widest text-[#14b8a6] border border-[#14b8a6]/40 px-2 py-0.5 rounded bg-[#14b8a6]/10 animate-pulse">Live</span>
            </div>

            <table className="w-full text-left border-collapse">
               <thead>
                  <tr className="border-b border-white/10 text-[9px] uppercase tracking-widest text-gray-500">
                     <th className="pb-3 font-medium">Asset Packet ID</th>
                     <th className="pb-3 font-medium">Type</th>
                     <th className="pb-3 font-medium">Total Volume (GHS)</th>
                     <th className="pb-3 font-medium">Facilitation Fee</th>
                     <th className="pb-3 font-medium text-right">Captured</th>
                  </tr>
               </thead>
               <tbody className="text-xs font-mono">
                  <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                     <td className="py-3 text-[#14b8a6]">SYN-ASH-P1 (10%)</td>
                     <td className="py-3 text-gray-400">Installment</td>
                     <td className="py-3 text-white">514,432</td>
                     <td className="py-3 text-gray-400">1.5% Esc + 3% Issu + 0.5% Admin</td>
                     <td className="py-3 text-[#f59e0b] text-right font-medium tracking-tight flex items-center justify-end gap-3">
                        + 25,721 GHS
                        <button 
                          onClick={() => {
                            setSelectedPayout({ id: 'SYN-ASH-P1', amount: 25721 });
                            setShow2FAModal(true);
                          }}
                          className="px-3 py-1 bg-[#14b8a6] text-black text-[9px] font-medium uppercase rounded hover:bg-[#B8FF3C] transition-all"
                        >
                          Release
                        </button>
                      </td>
                  </tr>
                  <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                     <td className="py-3 text-[#14b8a6]">SYN-ASH-P2 (10%)</td>
                     <td className="py-3 text-gray-400">Outright Cash</td>
                     <td className="py-3 text-white">504,143 <span className="text-gray-500 text-[9px]">(-2%)</span></td>
                     <td className="py-3 text-gray-400">1.5% Esc + 3% Issu</td>
                     <td className="py-3 text-[#f59e0b] text-right font-medium tracking-tight flex items-center justify-end gap-3">
                        + 22,686 GHS
                        <button 
                          onClick={() => {
                            setSelectedPayout({ id: 'SYN-ASH-P2', amount: 22686 });
                            setShow2FAModal(true);
                          }}
                          className="px-3 py-1 bg-[#14b8a6] text-black text-[9px] font-medium uppercase rounded hover:bg-[#B8FF3C] transition-all"
                        >
                          Release
                        </button>
                      </td>
                  </tr>
                  <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                     <td className="py-3 text-[#14b8a6]">SYN-PK-P1 (100%)</td>
                     <td className="py-3 text-gray-400">Installment</td>
                     <td className="py-3 text-white">4,200,000</td>
                     <td className="py-3 text-gray-400">1.5% Esc + Legal Up ($500)</td>
                     <td className="py-3 text-[#f59e0b] text-right font-medium tracking-tight flex items-center justify-end gap-3">
                        + 63,500 GHS
                        <button 
                          onClick={() => {
                            setSelectedPayout({ id: 'SYN-PK-P1', amount: 63500 });
                            setShow2FAModal(true);
                          }}
                          className="px-3 py-1 bg-[#14b8a6] text-black text-[9px] font-medium uppercase rounded hover:bg-[#B8FF3C] transition-all"
                        >
                          Release
                        </button>
                      </td>
                  </tr>
               </tbody>
            </table>
         </div>

         {/* Predictive Run Rate */}
         <div className="bg-gradient-to-br from-[#064e3b]/40 to-[#022c22] border border-[#14b8a6]/20 rounded-2xl p-6 relative overflow-hidden">
            <h3 className="text-[10px] uppercase tracking-widest text-[#14b8a6] font-medium mb-6">Annualized Run Rate (ARR)</h3>
            <div className="relative h-48 flex items-end mb-4">
              <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 100 40">
                <defs>
                  <linearGradient id="arrGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#14b8a6" stopOpacity="1" />
                  </linearGradient>
                </defs>
                <path d="M 0 35 L 30 25 L 60 15 L 100 5" fill="none" stroke="url(#arrGradient)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="drop-shadow-[0_0_8px_rgba(20,184,166,0.6)]" />
                <circle cx="0" cy="35" r="2" fill="#f59e0b" />
                <circle cx="30" cy="25" r="2" fill="#14b8a6" />
                <circle cx="60" cy="15" r="2" fill="#14b8a6" />
                <circle cx="100" cy="5" r="3" fill="#14b8a6" className="animate-pulse shadow-[0_0_10px_#14b8a6]" />
              </svg>
            </div>
            
            <div className="mt-8 border-t border-white/10 pt-4 flex justify-between items-end">
               <div>
                  <p className="text-[8px] text-gray-400 uppercase tracking-widest mb-1">Projected EOFY Base</p>
                  <p className="text-2xl font-medium tracking-tight text-white">$4.2M</p>
               </div>
               <div className="text-right">
                  <p className="text-[8px] text-[#f59e0b] uppercase tracking-widest mb-1 font-medium">Volume Target Cap</p>
                  <p className="text-sm font-mono text-gray-400">30% Total Syntry Gross</p>
               </div>
            </div>
         </div>
      </div>

      {/* Task 3 & 4: 2FA Transaction Guard Modal */}
      {show2FAModal && (
        <div className="fixed inset-0 z-[2000] flex items-center justify-center bg-black/80 backdrop-blur-md p-6">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-full max-w-md bg-[#0F1420] border border-white/10 p-10 rounded-3xl shadow-[0_0_100px_rgba(0,0,0,0.5)]"
          >
            <div className="text-center mb-8">
              <div className="inline-block p-4 bg-[#B8FF3C]/10 rounded-full mb-6">
                <svg className="w-8 h-8 text-[#B8FF3C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 00-2 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h2 className="text-2xl font-head tracking-[2px] uppercase mb-2">High-Value Auth</h2>
              <p className="text-white/40 text-[10px] font-mono leading-relaxed uppercase tracking-[1px]">
                Escrow Release of GH₵{selectedPayout?.amount?.toLocaleString()} requires verification.
              </p>
            </div>

            <div className="space-y-6">
              <input 
                type="text" 
                maxLength={6}
                value={twoFaToken}
                onChange={(e) => setTwoFaToken(e.target.value)}
                placeholder="0 0 0 0 0 0"
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-6 text-center text-3xl font-mono tracking-[12px] focus:outline-none focus:border-[#B8FF3C]/50 transition-all"
              />
              
              {verificationError && (
                <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500 text-[9px] font-mono text-center uppercase">
                  {verificationError}
                </div>
              )}

              <button 
                onClick={handleVerifyPayout}
                disabled={isVerifying || twoFaToken.length < 6}
                className="w-full bg-[#B8FF3C] text-black font-mono text-[11px] font-medium tracking-[3px] py-5 rounded-2xl hover:bg-white transition-all uppercase disabled:opacity-30"
              >
                {isVerifying ? 'Validating Node...' : 'Confirm Release'}
              </button>
              
              <button 
                onClick={() => {
                  setShow2FAModal(false);
                  setTwoFaToken('');
                  setVerificationError('');
                }}
                className="w-full text-white/30 text-[9px] font-mono uppercase tracking-[2px] hover:text-white transition-colors"
              >
                Cancel Transaction
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
