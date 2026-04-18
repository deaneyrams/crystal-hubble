'use client';
import React, { useState, useEffect } from 'react';
import QRCode from 'react-qr-code';

export default function DownloadApp() {
  const [isMobile, setIsMobile] = useState(false);
  const downloadUrl = "https://www.syntry.co/downloads/syntry-latest.apk";

  useEffect(() => {
    setIsMobile(/iPhone|iPad|iPod|Android/i.test(navigator.userAgent));
  }, []);

  return (
    <div className="w-full bg-[#162A3E] border border-white/10 rounded-[40px] p-8 md:p-12 shadow-2xl relative overflow-hidden group">
      <div className="relative z-10 flex flex-col md:flex-row items-center gap-12">
        
        {/* Visual Content */}
        <div className="flex-1 space-y-6 text-center md:text-left">
          <div className="inline-flex items-center gap-3 bg-[#B8FF3C]/10 border border-[#B8FF3C]/20 px-4 py-1.5 rounded-full text-[10px] font-mono text-[#B8FF3C] uppercase tracking-widest">
            Syntry Mobile Node v1.0
          </div>
          <h3 className="text-4xl md:text-5xl font-head text-white uppercase tracking-tighter">
            Carry the <span className="text-[#B8FF3C]">Sovereign Node</span> in your pocket.
          </h3>
          <p className="text-white/40 font-body text-lg max-w-md">
            High-precision GPS geofencing, 360° drone verification, and instant Flexi-Pay repayments on the go.
          </p>
          
          {isMobile ? (
            <a 
              href={downloadUrl}
              className="inline-block w-full md:w-auto px-12 py-6 bg-[#B8FF3C] text-black font-head font-black text-sm uppercase tracking-[4px] rounded-2xl shadow-[0_20px_40px_#B8FF3C33] hover:scale-105 active:scale-95 transition-all text-center"
            >
              INSTALL SYNTRY APP (Direct APK)
            </a>
          ) : (
            <div className="flex items-center gap-6 text-white/20 font-mono text-[10px] tracking-widest bg-white/5 py-4 px-6 rounded-xl border border-white/5">
               <span className="w-2 h-2 bg-white/20 rounded-full animate-pulse" />
               SCAN QR NODE TO INSTALL ON MOBILE
            </div>
          )}
        </div>

        {/* QR Section (Desktop Only) */}
        {!isMobile && (
          <div className="bg-white p-6 rounded-[32px] shadow-2xl group-hover:rotate-3 transition-transform duration-500">
            <QRCode 
              value={downloadUrl} 
              size={200}
              fgColor="#0D1B2A"
              level="H"
            />
          </div>
        )}
      </div>

      {/* Decorative Grid */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'linear-gradient(#B8FF3C 1px, transparent 1px), linear-gradient(90deg, #B8FF3C 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
    </div>
  );
}
