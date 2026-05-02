"use client";

import React, { useRef } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export default function SovereignReceipt({ plotId, premiumPaid, riskScore }) {
  const receiptRef = useRef();

  const handleDownload = async () => {
    const element = receiptRef.current;
    const canvas = await html2canvas(element, { scale: 2, backgroundColor: '#050810' });
    const imgData = canvas.toDataURL('image/png');
    
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
    
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save(`Syntry_Deed_${plotId}_2026.pdf`);
  };

  return (
    <div className="mt-8">
      {/* Hidden Template for PDF Generation */}
      <div className="absolute left-[-9999px]">
        <div ref={receiptRef} className="w-[800px] p-20 bg-[#050810] text-white border-[12px] border-indigo-500/20 font-serif">
          <h1 className="text-5xl mb-2 text-indigo-400">SOVEREIGN DEED</h1>
          <p className="text-sm tracking-[0.3em] opacity-50 mb-10 uppercase">Syntry Core Command • Accra, Ghana</p>
          
          <div className="grid grid-cols-2 gap-10 mb-20">
            <div>
              <p className="text-xs uppercase text-gray-500 mb-1">Plot Identifier</p>
              <p className="text-xl font-mono">{plotId}</p>
            </div>
            <div>
              <p className="text-xs uppercase text-gray-500 mb-1">Mint Timestamp</p>
              <p className="text-xl font-mono">{new Date().toLocaleString()}</p>
            </div>
          </div>

          <div className="border-t border-indigo-500/30 pt-10">
            <h2 className="text-2xl mb-4">Verification Audit</h2>
            <ul className="space-y-4 font-mono text-sm">
              <li className="flex justify-between">
                <span>Statutory Premium (70%):</span>
                <span className="text-mint-400">₵{premiumPaid.toLocaleString()} PAID</span>
              </li>
              <li className="flex justify-between">
                <span>Infrastructure Risk Index:</span>
                <span className={riskScore > 50 ? "text-red-400" : "text-yellow-400"}>{riskScore}%</span>
              </li>
              <li className="flex justify-between">
                <span>Legislative Compliance:</span>
                <span>Directive 03-11-2026 (Y. Sulemana)</span>
              </li>
            </ul>
          </div>

          <div className="mt-20 opacity-20 text-[10px] uppercase tracking-widest text-center">
            Immutable Digital Record • Verified via Oracle Audit 8,160
          </div>
        </div>
      </div>

      <button 
        onClick={handleDownload}
        className="w-full py-4 bg-gradient-to-r from-indigo-600 to-mint-600 rounded-xl font-medium uppercase tracking-widest hover:scale-[1.02] transition-transform shadow-lg shadow-indigo-500/20"
      >
        Download Sovereign Receipt
      </button>
    </div>
  );
}
