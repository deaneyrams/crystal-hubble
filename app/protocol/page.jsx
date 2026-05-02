'use client';
import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import GlobalHeader from '../../components/GlobalHeader';
import GlobalFooter from '../../components/GlobalFooter';
import SupportFab from '../../components/SupportFab';

export default function ProtocolPage() {
  const cursorRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    const moveCursor = (e) => {
      if (cursorRef.current && ringRef.current) {
        cursorRef.current.style.left = `${e.clientX}px`;
        cursorRef.current.style.top = `${e.clientY}px`;
        ringRef.current.style.left = `${e.clientX}px`;
        ringRef.current.style.top = `${e.clientY}px`;
      }
    };
    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, []);

  const steps = [
    {
      title: "GPS Lock",
      desc: "High-precision satellite geofencing ensures your investment is bound to the exact physical coordinates of the land.",
      icon: "🛰️",
      node: "Ground-Truth Node"
    },
    {
      title: "Node 08 Audit",
      desc: "The Ministerial Node 08 synchronizes your deed with the Lands Commission, eliminating historical litigation risk.",
      icon: "🏛️",
      node: "Ministerial Node 08"
    },
    {
      title: "Flexi-Pay Activation",
      desc: "Unlock your fractional equity through our flexible repayment engine, backed by Absa's senior debt infrastructure.",
      icon: "🎚️",
      node: "Asymmetric Ledger"
    }
  ];

  return (
    <div className="min-h-screen bg-[#0F172A] text-white selection:bg-[#1D9E75] selection:text-[#0F172A] font-sans pb-32 overflow-x-hidden relative">
      <GlobalHeader />
      {/* Custom Cursor */}
       <div ref={cursorRef} className="fixed w-2.5 h-2.5 bg-[#1D9E75] rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 transition-transform duration-150 ease-out" />
      <div ref={ringRef} className="fixed w-9 h-9 border border-[#1D9E75]/40 rounded-full pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 transition-all duration-75 linear" />

      {/* Hero Section */}
      <section className="relative pt-40 pb-20 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto w-full relative z-10 text-center">
          <div 
            className="inline-flex items-center gap-4 bg-[#1D9E75]/5 border border-[#1D9E75]/20 px-6 py-2 rounded-full text-[10px] font-mono text-[#1D9E75] uppercase tracking-[4px] mb-8"
          >
            Institutional Protocol v3.1
          </div>
          
          <h1 className="font-head text-[4rem] md:text-[8rem] leading-[0.88] tracking-tighter uppercase mb-12">
            The Sovereign <br /> <span className="text-[#1D9E75]">Standards.</span>
          </h1>
        </div>
      </section>

      {/* Vertical Timeline Layout (Mobile-First Story) */}
      <section className="max-w-4xl mx-auto px-6 relative">
        {/* Timeline Path */}
        <div className="absolute left-[30px] md:left-1/2 top-0 bottom-0 w-[1px] bg-white/5" />
        
        <div className="space-y-32">
          {steps.map((step, i) => (
            <div 
              key={i}
              className={`relative flex flex-col ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-12 group`}
            >
              {/* Timeline Center Point */}
              <div className="absolute left-[30px] md:left-1/2 -translate-x-1/2 w-4 h-4 bg-black border-2 border-[#1D9E75] rounded-full z-10 group-hover:scale-150 transition-transform">
                 <div className="absolute inset-0 bg-[#1D9E75] rounded-full animate-ping opacity-20" />
              </div>

              {/* Content Card */}
              <div className="flex-1 w-full pl-[70px] md:pl-0">
                <div className="glass-panel p-8 md:p-12 rounded-[40px] border border-white/10 hover:border-[#1D9E75]/30 transition-all shadow-2xl">
                  <div className="text-5xl mb-8">{step.icon}</div>
                  <div className="font-mono text-[10px] text-[#1D9E75] uppercase tracking-[4px] mb-4">{step.node}</div>
                  <h3 className="text-3xl font-head text-white uppercase mb-4 tracking-tight">Step 0{i+1}: {step.title}</h3>
                  <p className="text-white/40 leading-relaxed font-sans text-lg">{step.desc}</p>
                </div>
              </div>
              
              {/* Spacing for odd/even layout on desktop */}
              <div className="hidden md:block flex-1" />
            </div>
          ))}
        </div>
      </section>

      <style jsx global>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
      `}</style>
      <SupportFab />
      <GlobalFooter />
    </div>
  );
}
