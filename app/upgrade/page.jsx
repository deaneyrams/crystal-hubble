'use client';
import React, { useState } from 'react';
import GlobalHeader from '@/components/GlobalHeader';
import GlobalFooter from '@/components/GlobalFooter';
import { motion } from 'framer-motion';

export default function UpgradePage() {
  const [method, setMethod] = useState('paystack'); // paystack, momo, stripe

  return (
    <div className="bg-[#F8F1E3] min-h-screen text-[#003300] font-sans">
      <GlobalHeader />

      <main className="pt-40 pb-20 px-6 max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-[#D4AF37]/10 px-4 py-2 rounded-full mb-6 border border-[#D4AF37]/20"
          >
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#D4AF37]">Secure Institutional Node Upgrade</span>
          </motion.div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4 italic">Confirm Your <span className="text-[#D4AF37]">Upgrade.</span></h1>
          <p className="text-lg opacity-60 font-medium">Unlock 8-Layer Statutory Verifications and Automated Rent Routing.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          {/* Order Summary */}
          <div className="bg-white p-8 md:p-12 rounded-[3rem] shadow-2xl border border-[#003300]/5">
            <h3 className="text-xl font-bold mb-8 uppercase tracking-widest opacity-40">Order Summary</h3>
            
            <div className="space-y-6 mb-10">
              <div className="flex justify-between items-center bg-[#F8F1E3]/50 p-6 rounded-2xl border border-[#003300]/5">
                <div>
                  <h4 className="font-bold text-lg">Syntry Premium Plan</h4>
                  <p className="text-[10px] font-bold uppercase text-[#D4AF37] tracking-widest">Annual Subscription</p>
                </div>
                <p className="font-bold text-xl">GH₵ 2,800</p>
              </div>
              
              <div className="space-y-4 px-4">
                 <div className="flex justify-between text-sm font-medium opacity-60 uppercase tracking-wider">
                   <span>8-Layer Verification Fee</span>
                   <span className="text-[#1D9E75]">Included</span>
                 </div>
                 <div className="flex justify-between text-sm font-medium opacity-60 uppercase tracking-wider">
                   <span>Sovereign Storage Node</span>
                   <span className="text-[#1D9E75]">Included</span>
                 </div>
                 <div className="flex justify-between text-sm font-medium opacity-60 uppercase tracking-wider">
                   <span>Platform Subtotal</span>
                   <span>GH₵ 2,800.00</span>
                 </div>
              </div>
            </div>

            <div className="pt-8 border-t border-[#003300]/10">
               <div className="flex justify-between items-center mb-10">
                  <span className="text-xl font-bold italic">Total Due Today</span>
                  <span className="text-3xl font-black text-[#003300]">GH₵ 2,800.00</span>
               </div>
               
               <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#003300]/30 text-center">
                 Your node will activate immediately upon confirmation
               </p>
            </div>
          </div>

          {/* Payment Method Selector */}
          <div className="space-y-8">
            <h3 className="text-xl font-bold mb-2 uppercase tracking-widest opacity-40">Settlement Method</h3>
            
            <div className="grid grid-cols-1 gap-4">
              <button 
                onClick={() => setMethod('paystack')}
                className={`flex items-center gap-6 p-6 rounded-[2rem] border-2 transition-all ${method === 'paystack' ? 'border-[#D4AF37] bg-white shadow-xl' : 'border-white bg-white/50 hover:border-[#D4AF37]/30'}`}
              >
                <div className="w-12 h-12 bg-[#00BBCC] rounded-xl flex items-center justify-center text-white text-2xl">P</div>
                <div className="text-left">
                  <h4 className="font-bold text-lg leading-tight text-[#003300]">Paystack Checkout</h4>
                  <p className="text-[10px] font-bold opacity-50 uppercase tracking-widest uppercase">Cards, MoMo, Bank</p>
                </div>
              </button>

              <button 
                onClick={() => setMethod('momo')}
                className={`flex items-center gap-6 p-6 rounded-[2rem] border-2 transition-all ${method === 'momo' ? 'border-[#D4AF37] bg-white shadow-xl' : 'border-white bg-white/50 hover:border-[#D4AF37]/30'}`}
              >
                <div className="w-12 h-12 bg-[#FFCC00] rounded-xl flex items-center justify-center text-[#003300] text-3xl font-black">M</div>
                <div className="text-left">
                  <h4 className="font-bold text-lg leading-tight text-[#003300]">Direct MoMo Push</h4>
                  <p className="text-[10px] font-bold opacity-50 uppercase tracking-widest uppercase">MTN / Vodafone / Telecel</p>
                </div>
              </button>

              <button 
                onClick={() => setMethod('stripe')}
                className={`flex items-center gap-6 p-6 rounded-[2rem] border-2 transition-all ${method === 'stripe' ? 'border-[#D4AF37] bg-white shadow-xl' : 'border-white bg-white/50 hover:border-[#D4AF37]/30'}`}
              >
                <div className="w-12 h-12 bg-[#635BFF] rounded-xl flex items-center justify-center text-white text-3xl font-black">S</div>
                <div className="text-left">
                  <h4 className="font-bold text-lg leading-tight text-[#003300]">Stripe International</h4>
                  <p className="text-[10px] font-bold opacity-50 uppercase tracking-widest uppercase">Global Currency Settlement</p>
                </div>
              </button>
            </div>

            <button 
              className="w-full bg-[#003300] text-[#D4AF37] py-6 rounded-[2rem] font-bold text-xl hover:scale-105 transition-all shadow-2xl flex items-center justify-center gap-4 group"
              onClick={() => alert(`Redirecting to ${method.toUpperCase()} secure node...`)}
            >
              <span>Initialize Secure Settlement</span>
              <span className="text-2xl group-hover:translate-x-2 transition-transform">→</span>
            </button>
            
            <p className="text-center text-[10px] font-black uppercase tracking-[0.2em] text-[#003300]/40 flex items-center justify-center gap-2">
              <span className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full"></span>
              Secured by Sovereign Escrow Nodes
              <span className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full"></span>
            </p>
          </div>
        </div>
      </main>

      <GlobalFooter />
    </div>
  );
}
