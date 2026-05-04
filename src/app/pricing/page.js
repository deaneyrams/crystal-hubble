import React from 'react';
export default function Pricing() {
  return (
    <div className="bg-[#050508] text-white min-h-screen pt-40 px-6 text-center">
      <h1 className="text-5xl font-bold mb-6">Transparent Verification Pricing</h1>
      <div className="max-w-md mx-auto bg-white/[0.02] border border-white/10 p-10 rounded-md">
        <h3 className="text-2xl font-bold mb-4">Premium Membership</h3>
        <p className="text-4xl font-bold text-[#D4AF37] mb-6">GHS 280<span className="text-sm text-white/40">/month</span></p>
        <ul className="text-left space-y-4 mb-8 text-white/60">
          <li>✅ Priority Node 8 Verification</li>
          <li>✅ Real-Time Valuation Tracking</li>
          <li>✅ Automated Rent Collection</li>
        </ul>
        <button className="w-full bg-[#D4AF37] text-black py-4 rounded-md font-bold">Start Free Trial</button>
      </div>
    </div>
  );
}
