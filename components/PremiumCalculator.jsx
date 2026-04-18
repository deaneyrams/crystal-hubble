import React, { useState } from 'react';

export default function PremiumCalculator() {
  const [value, setValue] = useState(500000); // Default GHS 500k

  const upfront = value * 0.7;
  const groundRent = value * 0.3;

  return (
    <div className="p-6 bg-[#050810]/80 border border-indigo-500/30 rounded-xl backdrop-blur-md">
      <h3 className="text-indigo-400 font-mono text-sm mb-4 tracking-widest uppercase">
        ⚖️ 2026 Reform Compliance: Form 5 Calculator
      </h3>
      
      <div className="space-y-4">
        <div>
          <label className="text-xs text-gray-400 uppercase">Assessed Market Value (GHS)</label>
          <input 
            type="number" 
            value={value} 
            onChange={(e) => setValue(e.target.value)}
            className="w-full bg-black/50 border border-gray-700 p-2 text-white rounded mt-1 focus:border-[#00F5D4] outline-none transition-colors"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="p-3 bg-[#00F5D4]/10 border border-[#00F5D4]/30 rounded">
            <p className="text-[10px] text-[#00F5D4] uppercase font-bold tracking-wider">70% Upfront Premium</p>
            <p className="text-xl font-bold text-white">₵{upfront.toLocaleString()}</p>
          </div>
          <div className="p-3 bg-indigo-900/20 border border-indigo-500/30 rounded">
            <p className="text-[10px] text-indigo-400 uppercase font-bold tracking-wider">30% Ground Rent Total</p>
            <p className="text-xl font-bold text-white">₵{groundRent.toLocaleString()}</p>
          </div>
        </div>

        <p className="text-[9px] text-gray-500 mt-3 leading-relaxed">
          Data Source: GHA Bulletin (March 13, 2026). Weekend T-beam operations active. 
          Expect diversions via Flowerpot Junction.
        </p>
      </div>
    </div>
  );
}
