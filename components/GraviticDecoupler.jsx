'use client';

import React, { useState } from 'react';
import { applyAntigravityField } from '@/lib/antigravity';

export default function GraviticDecoupler() {
  const [bypassState, setBypassState] = useState('IDLE'); // IDLE, LOADING, SUCCESS, ERROR
  const [statusMessage, setStatusMessage] = useState('');

  const handleDecoupling = () => {
    setBypassState('LOADING');
    setStatusMessage('Suspending logic... Defying the inevitable...');

    setTimeout(() => {
      // Simulate a 5% chance of mass-displacement error for lore immersion
      if (Math.random() > 0.95) {
        setBypassState('ERROR');
        setStatusMessage('[ERR] Mass-Displacement detected. Recalibrating Void-Stabilizers.');
      } else {
        // Execute the math protocol
        const thrustMetrics = applyAntigravityField(331892, 0.01);
        console.log(`[ANTIGRAVITY CORE] Thrust applied: ${thrustMetrics.magnitude}N. Status: ${thrustMetrics.status}`);
        
        setBypassState('SUCCESS');
        setStatusMessage('[OK] Local G-Force neutralized. Spatial anchors locked.');
      }
    }, 2500); 
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-3 w-full mt-4">
       {bypassState === 'IDLE' && (
         <button 
           onClick={handleDecoupling}
           className="bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-medium uppercase tracking-widest px-6 py-2 rounded-md shadow-[0_0_15px_rgba(79,70,229,0.4)] transition-all hover:scale-105 border border-indigo-400/50"
         >
           Initiate Gravitic Decoupling
         </button>
       )}

       {bypassState === 'LOADING' && (
          <div className="text-center">
            <div className="w-5 h-5 border-2 border-indigo-400 border-t-transparent rounded-md animate-spin mx-auto mb-2"></div>
            <p className="text-[10px] uppercase font-mono tracking-widest text-indigo-400 animate-pulse">{statusMessage}</p>
          </div>
       )}

       {bypassState === 'SUCCESS' && (
          <div className="bg-[#00F5D4]/10 border border-[#00F5D4]/30 px-4 py-2 rounded-lg flex items-center gap-2">
            <div className="w-2 h-2 rounded-md bg-[#00F5D4] shadow-[0_0_10px_#00F5D4] animate-pulse"></div>
            <p className="text-[9px] uppercase font-mono tracking-widest text-[#00F5D4]">{statusMessage}</p>
          </div>
       )}

       {bypassState === 'ERROR' && (
          <div className="bg-red-500/10 border border-red-500/30 px-4 py-2 rounded-lg flex items-center gap-2">
            <div className="w-2 h-2 rounded-md bg-red-500 shadow-[0_0_10px_#ef4444] animate-ping"></div>
            <p className="text-[9px] uppercase font-mono tracking-widest text-red-500">{statusMessage}</p>
            <button onClick={() => setBypassState('IDLE')} className="ml-2 text-white bg-red-600 hover:bg-red-500 px-2 py-0.5 rounded text-[8px] uppercase">Retry</button>
          </div>
       )}
    </div>
  );
}
