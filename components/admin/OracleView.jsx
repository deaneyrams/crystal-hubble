"use client";

import React, { useState, useEffect } from 'react';
import { getAppreciationForecast, getOracleRiskAnalysis, getOracleRecommendation } from '@/lib/oracle-logic';

export default function OracleView({ plotData, coordinates = "1090000 N / 381000 E" }) {
  const [forecast, setForecast] = useState(null);
  const [risk, setRisk] = useState(null);
  const [recommendation, setRecommendation] = useState("");
  const [isComputing, setIsComputing] = useState(true);

  if (!plotData) return <div className="p-6 text-center text-indigo-400 text-sm tracking-widest font-medium uppercase border border-indigo-500/30 rounded-md bg-[#0a0514] animate-pulse shadow-xl">Initialising Asset Oracle...</div>;

  useEffect(() => {
    setIsComputing(true);
    // Simulate complex AI processing time
    const timer = setTimeout(() => {
       const f = getAppreciationForecast(plotData?.value || 331892.40, coordinates);
       
       // Calculate dynamic overlap based on transparency audit
       const overlapPercent = plotData?.transparencyStatus === 'verified_clean' ? 0 : 25;
       const r = getOracleRiskAnalysis(overlapPercent);
       
       const rec = getOracleRecommendation(plotData?.status || 'IN-REGISTRATION');
       
       setForecast(f);
       setRisk(r);
       setRecommendation(rec);
       setIsComputing(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, [plotData, coordinates]);

  return (
    <div className="w-full bg-[#0a0514] border border-indigo-500/30 rounded-md shadow-2xl p-6 text-gray-200 animate-in fade-in zoom-in-95 duration-700 font-sans relative overflow-hidden">
      
      {/* Background Oracle Grid */}
      <div className="absolute inset-0 opacity-10 pointer-events-none text-indigo-500 text-[8px] leading-tight select-none">
        {Array.from({length: 40}).map((_, i) => (
           <div key={i}>0x{Math.random().toString(16).substr(2, 8)} :: ORACLE_NODE // {Date.now() - i * 50}</div>
        ))}
      </div>

      <div className="relative z-10 space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center border-b border-indigo-500/20 pb-4">
           <div>
              <h2 className="text-indigo-400 font-medium tracking-tight tracking-widest uppercase text-lg flex items-center gap-2">
                 <span className="animate-pulse">👁️‍🗨️</span> Sovereign AI Oracle
              </h2>
              <p className="text-[10px] text-indigo-300 font-mono mt-1 opacity-70">
                 Predictive Alpha & Risk Diagnostics Module
              </p>
           </div>
           <div className="flex items-center gap-2">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-md bg-indigo-400 opacity-75"></span>
                <span className="relative inline-flex rounded-md h-3 w-3 bg-indigo-500"></span>
              </span>
              <span className="text-[10px] uppercase font-medium text-indigo-400 tracking-widest">Model Online</span>
           </div>
        </div>

        {isComputing ? (
           <div className="py-12 flex flex-col items-center justify-center space-y-4">
              <div className="w-12 h-12 border-4 border-indigo-500/20 border-t-indigo-500 rounded-md animate-spin"></div>
              <p className="text-xs uppercase tracking-widest text-indigo-400 font-medium animate-pulse">Running Monte Carlo Simulations...</p>
           </div>
        ) : (
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Left Column: Projections */}
              <div className="space-y-6">
                 
                 {/* 36-Month Projection Box */}
                 <div className="bg-[#110922] p-5 rounded-md border border-indigo-500/30 shadow-inner">
                    <h3 className="text-[10px] uppercase tracking-widest text-indigo-400 font-medium mb-4">36-Month Value Projection</h3>
                    
                    <div className="flex justify-between items-end mb-2">
                       <div>
                         <p className="text-[9px] text-gray-500 uppercase">Current (2026)</p>
                         <p className="font-mono text-sm text-white">${forecast.baseValuation.toLocaleString()}</p>
                       </div>
                       <div className="text-right">
                         <p className="text-[9px] text-indigo-400 uppercase font-medium">Predicted (2029)</p>
                         <p className="font-mono text-xl text-[#00F5D4]">${forecast.targetValuation.toLocaleString()}</p>
                       </div>
                    </div>

                    {/* Chart Visualization */}
                    <div className="h-24 w-full border-b border-l border-indigo-500/30 relative mt-6 flex items-end">
                       {forecast.chartData.map((data, index) => {
                          if (index % 4 !== 0) return null; // Show fewer bars for spacing
                          const heightPct = (data.value / forecast.targetValuation) * 100;
                          return (
                             <div 
                               key={index} 
                               className="flex-1 bg-gradient-to-t from-indigo-900/50 to-indigo-500/80 mx-[2px] rounded-t-sm group relative"
                               style={{ height: `${heightPct}%` }}
                             >
                               <div className="opacity-0 group-hover:opacity-100 absolute -top-6 left-1/2 transform -translate-x-1/2 bg-black text-[#00F5D4] text-[8px] font-mono px-1 py-0.5 rounded pointer-events-none transition-opacity z-20">
                                  ${data.value.toLocaleString()}
                               </div>
                             </div>
                          );
                       })}
                    </div>
                    
                    <div className="mt-4 flex justify-between text-[9px] text-indigo-300 font-mono">
                       <span>{forecast.annualGrowthRate.toFixed(1)}% Annual compounding</span>
                       {forecast.infrastructureBonusApplied && <span className="text-[#00F5D4]">&quot;West Hills Bonus&quot; (+2%) Active</span>}
                    </div>
                 </div>

                 {/* Risk Meter */}
                 <div className="bg-[#110922] p-5 rounded-md border border-indigo-500/30">
                    <h3 className="text-[10px] uppercase tracking-widest text-indigo-400 font-medium mb-2">Automated Risk Score</h3>
                    <div className="flex justify-between items-center mb-3">
                       <span className={`text-xs font-medium tracking-tight tracking-widest px-2 py-1 rounded border ${
                          risk.level === 'LOW-RISK' ? 'bg-syntry-teal-600/40 text-syntry-teal-600 border-green-500/50' : 
                          risk.level === 'MODERATE-RISK' ? 'bg-yellow-900/40 text-yellow-400 border-yellow-500/50' : 
                          'bg-red-900/40 text-red-400 border-red-500/50'
                       }`}>
                          {risk.level}
                       </span>
                    </div>
                    <p className={`text-xs ${risk.level === 'LOW-RISK' ? 'text-syntry-teal-600' : 'text-gray-300'}`}>
                       {risk.message}
                    </p>
                 </div>

              </div>

              {/* Right Column: AI Insights */}
              <div className="space-y-6 flex flex-col justify-between">
                 
                 {/* AI Commentary Box */}
                 <div className="flex-grow bg-[#0c051a] p-5 rounded-md border border-indigo-400/40 shadow-[0_0_15px_rgba(79,70,229,0.15)] relative">
                    <div className="absolute -top-3 -right-3 text-3xl opacity-20">🧠</div>
                    <h3 className="text-[10px] uppercase tracking-widest text-indigo-300 font-medium mb-4">AI Commentary</h3>
                    <div className="space-y-4">
                       <p className="text-sm text-gray-200 leading-relaxed font-light">
                          <span className="text-indigo-400 font-medium">Syntry Oracle:</span> Ashifla-Otatten is positioned in a High-Growth corridor. 
                          Estimated 2029 valuation: <span className="font-mono text-[#00F5D4]">~${forecast.targetValuation.toLocaleString()}</span> based on local infrastructure delivery timelines.
                       </p>
                       {forecast.infrastructureBonusApplied && (
                          <p className="text-xs text-gray-400 italic border-l-2 border-indigo-500/30 pl-3">
                            The imminent completion of the West Hills road expansion network is heavily weighting this polygon's algorithmic appreciation score.
                          </p>
                       )}
                    </div>
                 </div>

                 {/* Next Best Move Recommender */}
                 <div className="bg-gradient-to-r from-indigo-900/50 to-[#0e071c] p-5 rounded-md border border-[#00F5D4]/30 animate-pulse-slow">
                    <h3 className="text-[10px] uppercase tracking-widest text-[#00F5D4] font-medium mb-2 flex items-center gap-2">
                       <span>🎯</span> Next Best Move
                    </h3>
                    <p className="text-sm text-indigo-200">
                       {recommendation}
                    </p>
                 </div>
              </div>
              
           </div>
        )}
      </div>
    </div>
  );
}
