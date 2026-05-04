import React from 'react';

export default function AboutPage() {
  return (
    <div className="bg-[#050508] text-white min-h-screen pt-32 pb-20 px-6">
      <div className="max-w-4xl mx-auto text-center mb-24">
        <h2 className="text-[#b8ff3c] font-mono text-xs tracking-widest uppercase mb-4">The Syntry Sovereign</h2>
        <h1 className="text-5xl md:text-7xl font-bold mb-8">BUILDING THE GROUND TRUTH.</h1>
        <p className="text-xl text-white/40 leading-relaxed">
          Syntry was founded to solve one problem: <strong>Uncertainty.</strong> 
          We are replacing "Hope" with "Protocol" so every Ghanaian can own land safely.
        </p>
      </div>

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center bg-white/[0.02] p-12 rounded-3xl border border-white/5">
        <div className="space-y-6">
          <h3 className="text-3xl font-bold italic font-serif">"Wealth begins with a secure deed."</h3>
          <p className="text-white/60 leading-relaxed text-lg">
            I saw families lose everything to land litigation. I saw banks refuse to lend to 
            honest people. I built the <strong>Syntry Ecosystem</strong> to fix the foundation of our economy. 
            Through Syntry, we are issuing the world's first <strong>Sovereign Asset Bonds</strong> backed by drone-verified land.
          </p>
          <div>
            <p className="text-xl font-bold">Eyram Abusah</p>
            <p className="text-[#b8ff3c] font-mono text-xs uppercase tracking-tighter">Founder & CEO, Syntry Sovereign</p>
          </div>
        </div>
        <div className="bg-neutral-900 aspect-square rounded-2xl border border-white/10 flex items-center justify-center text-white/10 text-sm italic">
          [Founder Portrait: Eyram Abusah]
        </div>
      </div>
    </div>
  );
}
