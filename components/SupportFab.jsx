"use client";
import React from 'react';

const SupportFab = () => {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) return null;

  return (
    <a 
      href="https://wa.me/233531102292" 
      target="_blank" 
      rel="noreferrer"
      className="fixed bottom-8 right-8 w-16 h-16 bg-[#25D366] text-white rounded-full flex items-center justify-center text-3xl shadow-[0_20px_50px_rgba(37,211,102,0.4)] hover:scale-110 active:scale-95 transition-all z-[3000] border-4 border-white group"
      title="Chat with Syntry Advisor"
    >
      <span className="relative z-10">💬</span>
      <div className="absolute inset-0 bg-[#25D366] rounded-full animate-ping opacity-20 group-hover:opacity-40 transition-opacity"></div>
      
      {/* Tooltip */}
      <div className="absolute right-20 bg-[#003300] text-white px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-xl border border-[#D4AF37]/20">
         Assistance Live: 0531102292
      </div>
    </a>
  );
};

export default SupportFab;
