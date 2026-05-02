"use client";

import React, { useState, useEffect } from 'react';

export default function StatusTracker({ initialStage = 0, onStageComplete, onCertificated }) {
  const [currentStage, setCurrentStage] = useState(initialStage);
  
  const stages = [
    { id: 'submitted', label: 'Submitted (API Handshake)', delay: 2000 },
    { id: 'review', label: 'Registry Review (Lands Comm.)', delay: 4000 },
    { id: 'signature', label: "Director's Signature (Sign-off)", delay: 3500 },
    { id: 'certificated', label: 'Certificated (Final Title)', delay: 2000 }
  ];

  useEffect(() => {
    if (currentStage >= stages.length) return;

    let timer;
    if (currentStage < stages.length - 1) {
      // Advance to the next stage using the required delay
      timer = setTimeout(() => {
        setCurrentStage(prev => prev + 1);
        if (onStageComplete) onStageComplete(currentStage + 1);
      }, stages[currentStage].delay);
    } else if (currentStage === stages.length - 1) {
      // Final stage reached
      timer = setTimeout(() => {
        if (onCertificated) onCertificated();
      }, stages[currentStage].delay);
    }

    return () => clearTimeout(timer);
  }, [currentStage, onStageComplete, onCertificated, stages]);

  return (
    <div className="bg-[#0b132b] border border-blue-500/20 rounded-2xl p-6 shadow-2xl relative overflow-hidden animate-in fade-in zoom-in-95 duration-700">
      
      {/* Background Matrix Effect */}
      <div className="absolute inset-0 opacity-10 pointer-events-none text-blue-500 text-[8px] leading-tight select-none">
        {Array.from({length: 20}).map((_, i) => (
           <div key={i}>0x{Math.random().toString(16).substr(2, 8)} ... {(currentStage + 1) * 100}ms</div>
        ))}
      </div>

      <div className="relative z-10 flex flex-col space-y-6">
        <h3 className="text-white font-medium tracking-widest uppercase text-sm border-b border-white/10 pb-2 flex items-center gap-2">
          <span>📡</span> GELIS Ecosystem Tracker
        </h3>

        <div className="relative border-l-2 border-white/10 ml-3 space-y-8 pb-4">
          {stages.map((stage, index) => {
            const isCompleted = currentStage > index;
            const isCurrent = currentStage === index;
            const isPending = currentStage < index;

            return (
              <div key={stage.id} className="relative pl-6">
                {/* Status Dot */}
                <div className={`absolute -left-[9px] top-1 h-4 w-4 rounded-full border-2 transition-all duration-500
                  ${isCompleted ? 'bg-[#00F5D4] border-[#00F5D4] shadow-[0_0_10px_#00F5D4]' 
                    : isCurrent ? 'bg-indigo-500 border-indigo-400 animate-pulse shadow-[0_0_10px_rgba(79,70,229,0.8)]' 
                    : 'bg-[#050810] border-gray-600'}
                `}></div>

                {/* Content */}
                <div className={`transition-all duration-300 ${isPending ? 'opacity-40' : 'opacity-100'}`}>
                  <h4 className={`text-xs font-medium uppercase tracking-widest ${isCompleted ? 'text-white' : isCurrent ? 'text-indigo-300' : 'text-gray-500'}`}>
                    {stage.label}
                  </h4>
                  {isCurrent && (
                     <p className="text-[9px] text-gray-400 font-mono mt-1 flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-indigo-500 animate-ping"></span> 
                        Polling registry protocol...
                     </p>
                  )}
                  {isCompleted && (
                     <p className="text-[9px] text-[#00F5D4] font-mono mt-1">
                        Timestamp verified: {new Date().toLocaleTimeString()}
                     </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Final State Banner */}
        {currentStage === stages.length - 1 && (
           <div className="p-3 bg-gradient-to-r from-[#00F5D4]/20 to-indigo-900/20 border border-[#00F5D4]/40 rounded-xl mt-4 animate-in slide-in-from-bottom flex justify-between items-center">
              <div>
                <p className="text-[10px] text-[#00F5D4] uppercase font-medium tracking-tight tracking-widest">Digital Title Issued</p>
                <p className="text-[9px] text-gray-300 mt-0.5">Asset successfully transitioned to Custody Protocol.</p>
              </div>
              <span className="text-2xl">🏆</span>
           </div>
        )}
      </div>
    </div>
  );
}
