'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GlobalHeader from '@/components/GlobalHeader';
import GlobalFooter from '@/components/GlobalFooter';

export default function PartnerOnboarding() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    identity: '',
    businessReg: null,
    propertyName: '',
    location: '',
    price: '',
    plotSize: '',
    propertyType: 'Residential',
    photos: []
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const totalSteps = 3;
  const progress = (step / totalSteps) * 100;

  const handleListingSubmit = async () => {
    setIsSubmitting(true);
    // Simulate API logic: tagged as status: "pending_verification"
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 2000);
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-[#0D1B2A] text-white flex flex-col items-center justify-center p-6 text-center">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
          className="bg-[#162A3E] p-12 md:p-20 rounded-[48px] border border-[#B8FF3C]/30 shadow-2xl max-w-2xl w-full"
        >
          <div className="w-20 h-20 bg-[#B8FF3C]/10 rounded-full flex items-center justify-center text-4xl mx-auto mb-8 border border-[#B8FF3C]/30">🛡️</div>
          <h2 className="text-4xl font-head font-medium tracking-tight uppercase tracking-tighter mb-4">Oracle Audit Initialized</h2>
          <p className="text-gray-400 mb-8 font-body">Your property is currently tagged as <span className="text-[#B8FF3C] font-mono">pending_verification</span>. Our legal nodes are auditing your title deeds. You will be notified once it goes <span className="text-[#B8FF3C] font-mono">live</span>.</p>
          <a href="/partner/dashboard" className="px-10 py-4 bg-[#B8FF3C] text-black font-head font-medium tracking-tight uppercase tracking-widest text-xs rounded-xl shadow-xl hover:scale-105 transition-all">
             Go to Partner Dashboard
          </a>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0D1B2A] text-white selection:bg-[#B8FF3C] selection:text-black">
      <GlobalHeader />
      
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-white/5 z-[1001]">
        <motion.div className="h-full bg-[#B8FF3C]" animate={{ width: `${progress}%` }} />
      </div>

      <header className="pt-40 pb-16 px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-head font-medium tracking-tight tracking-tighter uppercase mb-4 leading-none">
            List on <span className="text-[#B8FF3C]">Syntry.</span>
          </h1>
          <p className="text-gray-400 font-body text-lg">Institutional-grade verification for your property assets.</p>
        </div>
      </header>

      <main className="max-w-2xl mx-auto pb-32 px-6">
        <div className="bg-[#162A3E]/50 border border-white/10 p-8 md:p-12 rounded-[40px] backdrop-blur-xl">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div key="s1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-8">
                <div className="space-y-2">
                  <span className="text-[10px] font-mono tracking-[4px] text-[#B8FF3C] uppercase">Step 01</span>
                  <h2 className="text-3xl font-head font-medium tracking-tight tracking-tight uppercase">Identity Verification</h2>
                </div>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-mono uppercase tracking-widest text-white/40">Ghana Card / Passport ID</label>
                    <input type="text" placeholder="GHA-XXXXXXXXX-X" className="w-full bg-black/40 border border-white/10 rounded-xl py-4 px-6 text-white focus:border-[#B8FF3C] outline-none font-mono" />
                  </div>
                  <div className="border-2 border-dashed border-white/10 rounded-2xl p-10 text-center hover:border-[#B8FF3C]/30 transition-all cursor-pointer">
                    <p className="text-xs text-gray-500 uppercase tracking-widest font-medium tracking-tight">Upload Business Registration / ID Copy</p>
                  </div>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div key="s2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-8">
                <div className="space-y-2">
                  <span className="text-[10px] font-mono tracking-[4px] text-[#B8FF3C] uppercase">Step 02</span>
                  <h2 className="text-3xl font-head font-medium tracking-tight tracking-tight uppercase">Property Asset Data</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-mono uppercase tracking-widest text-white/40">Property Name</label>
                    <input type="text" placeholder="Emerald Grove" className="w-full bg-black/40 border border-white/10 rounded-xl py-4 px-6 text-white focus:border-[#B8FF3C] outline-none font-mono" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-mono uppercase tracking-widest text-white/40">Location</label>
                    <input type="text" placeholder="Pokuase, Accra" className="w-full bg-black/40 border border-white/10 rounded-xl py-4 px-6 text-white focus:border-[#B8FF3C] outline-none font-mono" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-mono uppercase tracking-widest text-white/40">Price (GHS)</label>
                    <input type="number" placeholder="85000" className="w-full bg-black/40 border border-white/10 rounded-xl py-4 px-6 text-white focus:border-[#B8FF3C] outline-none font-mono" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-mono uppercase tracking-widest text-white/40">Plot Size</label>
                    <input type="text" placeholder="70x100ft" className="w-full bg-black/40 border border-white/10 rounded-xl py-4 px-6 text-white focus:border-[#B8FF3C] outline-none font-mono" />
                  </div>
                </div>
                <div className="border-2 border-dashed border-white/10 rounded-2xl p-10 text-center hover:border-[#B8FF3C]/30 transition-all cursor-pointer">
                  <p className="text-xs text-gray-500 uppercase tracking-widest font-medium tracking-tight">Drag & Drop Property Photos</p>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div key="s3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-8">
                <div className="space-y-2">
                  <span className="text-[10px] font-mono tracking-[4px] text-[#B8FF3C] uppercase">Step 03</span>
                  <h2 className="text-3xl font-head font-medium tracking-tight tracking-tight uppercase">Oracle Audit Fee</h2>
                </div>
                <div className="bg-black/40 border border-white/10 p-8 rounded-2xl space-y-4">
                  <div className="flex justify-between items-center pb-4 border-b border-white/5">
                    <span className="text-gray-400">Title Audit & Verification</span>
                    <span className="font-mono text-[#B8FF3C]">GH₵500.00</span>
                  </div>
                  <p className="text-[10px] text-white/20 uppercase tracking-[2px] leading-relaxed">This one-time fee covers the physical site inspection and the legal Ministerial Node 08 title search.</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <button className="py-4 border border-white/10 rounded-xl text-[10px] font-mono uppercase tracking-[2px] hover:bg-white/5">Stripe</button>
                  <button className="py-4 border border-[#B8FF3C]/30 rounded-xl text-[10px] font-mono uppercase tracking-[2px] bg-[#B8FF3C]/10 text-[#B8FF3C]">Paystack</button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="mt-12 flex justify-between">
            <button 
              onClick={() => setStep(s => Math.max(1, s - 1))}
              className={`text-[10px] font-mono uppercase tracking-[2px] text-white/30 hover:text-white ${step === 1 ? 'invisible' : ''}`}
            >
              ← Back
            </button>
            <button 
              onClick={step === 3 ? handleListingSubmit : () => setStep(s => Math.min(3, s + 1))}
              disabled={isSubmitting}
              className="px-10 py-4 bg-[#B8FF3C] text-black font-head font-medium tracking-tight uppercase tracking-[4px] text-[10px] rounded-xl hover:scale-105 active:scale-95 transition-all flex items-center justify-center min-w-[150px]"
            >
              {isSubmitting ? (
                <span className="w-4 h-4 border-2 border-black/20 border-t-black rounded-full animate-spin"></span>
              ) : (
                step === 3 ? "Submit Listing" : "Continue →"
              )}
            </button>
          </div>
        </div>
      </main>
      
      <GlobalFooter />
    </div>
  );
}
