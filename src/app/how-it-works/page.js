import React from 'react';
import GlobalHeader from '@/components/GlobalHeader';
import GlobalFooter from '@/components/GlobalFooter';

export default function HowItWorks() {
  return (
    <div className="bg-[#050508] text-white min-h-screen">
      <GlobalHeader />
      <main className="pt-40 pb-20 px-6 max-w-7xl mx-auto">
        <h1 className="text-5xl font-bold mb-8 text-center">
          The <span className="text-[#1D9E75]">Syntry</span> Protocol
        </h1>
        <div className="grid md:grid-cols-3 gap-12 mt-16">
          <div className="p-8 border border-[#1D9E75]/20 rounded-3xl bg-white/5">
            <div className="text-[#1D9E75] text-3xl font-bold mb-4">01</div>
            <h3 className="text-xl font-bold mb-2">Tokenize</h3>
            <p className="text-white/60">We convert verified land titles into secure digital assets on the blockchain.</p>
          </div>
          <div className="p-8 border border-white/10 rounded-3xl bg-white/5">
            <div className="text-white text-3xl font-bold mb-4">02</div>
            <h3 className="text-xl font-bold mb-2">Verify</h3>
            <p className="text-white/60">Our AI cross-references government land registries for 100% legal finality.</p>
          </div>
          <div className="p-8 border border-white/10 rounded-3xl bg-white/5">
            <div className="text-white text-3xl font-bold mb-4">03</div>
            <h3 className="text-xl font-bold mb-2">Exchange</h3>
            <p className="text-white/60">Investors and owners trade land equity with instant liquidity and trust.</p>
          </div>
        </div>
      </main>
      <GlobalFooter />
    </div>
  );
}
