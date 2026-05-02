"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function SecuritySettings() {
  const [userId] = useState('demo-user-123'); // Simulation
  const [email] = useState('investor@syntry.co');
  
  const [step, setStep] = useState('overview'); // overview, setup, verifying, success
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [totpToken, setTotpToken] = useState('');
  const [isEnabling, setIsEnabling] = useState(false);
  const [error, setError] = useState('');

  const initiateSetup = async () => {
    setStep('setup');
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || ''}/api/security/totp/setup`, {
      method: 'POST',
      body: JSON.stringify({ userId, email })
    });
    const data = await response.json();
    setQrCodeUrl(data.qrCodeUrl);
  };

  const handleVerify = async () => {
    setIsEnabling(true);
    setError('');
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || ''}/api/security/totp/verify`, {
      method: 'POST',
      body: JSON.stringify({ userId, token: totpToken })
    });
    const data = await response.json();
    
    if (data.success) {
      setStep('success');
    } else {
      setError('Invalid code. Re-scan or check your app.');
    }
    setIsEnabling(false);
  };

  return (
    <div className="min-h-screen bg-[#0C0C14] pt-32 pb-20 px-6">
      <div className="max-w-xl mx-auto bg-[#0F1420] border border-white/5 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
        
        {/* Glow */}
        <div className="absolute -top-32 -right-32 w-64 h-64 bg-[#B8FF3C]/5 rounded-full blur-[100px]" />
        
        <header className="relative z-10 mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-6 h-[1px] bg-[#B8FF3C]" />
            <span className="font-mono text-[10px] tracking-[4px] text-[#B8FF3C] uppercase">Institutional Security</span>
          </div>
          <h1 className="font-head text-4xl uppercase tracking-[2px] text-white">Security Command</h1>
        </header>

        <AnimatePresence mode="wait">
          {step === 'overview' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} key="overview">
              <div className="flex items-center gap-6 p-6 bg-white/[0.02] border border-white/5 rounded-2xl mb-12">
                <div className="w-12 h-12 bg-[#B8FF3C]/10 text-[#B8FF3C] rounded-full flex items-center justify-center p-3">
                   <svg fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"/></svg>
                </div>
                <div>
                   <h3 className="font-mono font-medium text-xs uppercase tracking-widest text-white mb-1">Hybrid 2FA Verification</h3>
                   <p className="text-white/40 text-[10px] leading-relaxed">Authenticator app prioritized for transactions &gt; 5,000 GHS.</p>
                </div>
              </div>
              <button 
                onClick={initiateSetup}
                className="w-full bg-[#B8FF3C] text-[#0C0C14] font-mono text-[11px] font-medium tracking-[2px] py-5 rounded-xl hover:bg-white transition-all uppercase"
              >
                Setup Google Authenticator
              </button>
            </motion.div>
          )}

          {step === 'setup' && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} key="setup" className="text-center">
              <p className="text-white/40 text-[11px] font-mono uppercase tracking-[2px] mb-8">Scan with Google Authenticator</p>
              <div className="bg-white p-4 rounded-2xl inline-block mb-10 shadow-xl border-4 border-[#B8FF3C]">
                {qrCodeUrl ? <img src={qrCodeUrl} alt="QR Code" className="w-48 h-48" /> : (
                  <div className="w-48 h-48 bg-[#0C0C14] animate-pulse rounded-lg" />
                )}
              </div>
              <div className="space-y-4">
                <input 
                  type="text" 
                  value={totpToken}
                  onChange={(e) => setTotpToken(e.target.value)}
                  placeholder="Enter 6-digit Code"
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-6 text-center text-2xl font-mono tracking-[12px] focus:outline-none focus:border-[#B8FF3C]/50 transition-colors"
                  maxLength={6}
                />
                {error && <p className="text-red-400 text-[10px] uppercase font-mono mt-2">{error}</p>}
                <button 
                  onClick={handleVerify}
                  disabled={isEnabling || totpToken.length < 6}
                  className="w-full bg-white/10 text-white font-mono text-[11px] font-medium tracking-[2px] py-5 rounded-xl hover:bg-[#B8FF3C] hover:text-black transition-all disabled:opacity-30 uppercase mt-4"
                >
                  {isEnabling ? 'Verifying Node...' : 'Verify and Enable'}
                </button>
              </div>
            </motion.div>
          )}

          {step === 'success' && (
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} key="success" className="text-center py-10">
              <div className="w-20 h-20 bg-[#B8FF3C]/10 text-[#B8FF3C] rounded-full flex items-center justify-center mx-auto mb-8 shadow-[0_0_50px_rgba(184,255,60,0.1)]">
                 <svg fill="currentColor" viewBox="0 0 24 24" className="w-10 h-10"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/></svg>
              </div>
              <h2 className="text-2xl font-head text-[#B8FF3C] mb-4">Sovereign 2FA Active</h2>
              <p className="text-white/40 text-[11px] font-mono leading-relaxed max-w-sm mx-auto uppercase tracking-[1px]">Your high-value transactions are now secured by your biometric device node.</p>
              <button 
                onClick={() => setStep('overview')}
                className="mt-12 text-[#B8FF3C] font-mono text-[10px] font-medium tracking-[4px] uppercase hover:underline"
              >
                Return to Dashboard
              </button>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
