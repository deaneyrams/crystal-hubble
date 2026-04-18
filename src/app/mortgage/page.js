import React from 'react';

export default function MortgagePage() {
  return (
    <div className="bg-[#050508] text-white min-h-screen pt-40 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-5xl font-bold mb-6">Sovereign Mortgage Solutions</h1>
        <p className="text-white/60 text-xl mb-12">
          Unlock land equity with Ghana's first transparent, blockchain-verified mortgage exchange.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
          <div className="p-8 bg-white/5 border border-[#1D9E75]/30 rounded-3xl">
            <h3 className="text-[#1D9E75] font-bold text-xl mb-2">Diaspora Financing</h3>
            <p className="text-sm text-white/40">Secure Ghanaian property using foreign income with legal finality.</p>
          </div>
          <div className="p-8 bg-white/5 border border-white/10 rounded-3xl">
            <h3 className="text-white font-bold text-xl mb-2">Equity Release</h3>
            <p className="text-sm text-white/40">Convert your verified land title into liquid capital instantly.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
