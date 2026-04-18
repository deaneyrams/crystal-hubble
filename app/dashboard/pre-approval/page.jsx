import React from 'react';
import GlobalHeader from '@/components/GlobalHeader';
import GlobalFooter from '@/components/GlobalFooter';

const PreApprovalPage = () => {
  return (
    <div className="bg-[#F8F1E3] min-h-screen text-[#003300] font-sans">
      <GlobalHeader />

      <main className="pt-32 pb-20 px-4 md:px-8 max-w-4xl mx-auto">
        {/* PDF-Style Letter Container */}
        <div className="bg-white p-8 md:p-20 rounded-sm shadow-2xl border border-[#003300]/5 max-w-3xl mx-auto relative overflow-hidden">
          {/* Gold Embossed Seal Placeholder */}
          <div className="absolute top-12 right-12 w-24 h-24 border-4 border-[#D4AF37]/30 rounded-full flex items-center justify-center rotate-12 opacity-50">
            <div className="text-center">
              <p className="text-[8px] font-bold text-[#D4AF37] uppercase leading-none">Syntry</p>
              <p className="text-[10px] font-bold text-[#D4AF37] uppercase leading-none mt-1">Verified</p>
              <div className="w-8 h-0.5 bg-[#D4AF37] mx-auto mt-1"></div>
              <p className="text-[6px] font-bold text-[#D4AF37] opacity-60 mt-1 uppercase">Sovereign 2026</p>
            </div>
          </div>

          {/* Letter Header */}
          <div className="flex justify-between items-start mb-20 border-b-2 border-[#003300] pb-8">
            <div>
              <div className="flex items-center gap-0 mb-2">
                <span className="font-head text-3xl tracking-tighter uppercase text-[#1D9E75]">SYN</span>
                <span className="font-head text-3xl tracking-tighter uppercase text-[#003300]">TRY</span>
              </div>
              <p className="text-[10px] font-bold uppercase tracking-widest opacity-60">Mortgage Enablement Division</p>
            </div>
            <div className="text-right">
              <h1 className="text-2xl font-bold uppercase tracking-tight text-[#003300]">Pre-Approval Letter</h1>
              <p className="text-xs opacity-60">ID: SYN-MTG-882-CASA</p>
            </div>
          </div>

          {/* Letter Content */}
          <div className="space-y-8 text-sm leading-relaxed mb-20">
            <div className="space-y-1">
              <p className="font-bold">Date: October 24, 2023</p>
              <p className="font-bold">Attn: Kwame Anokye</p>
              <p>Accra, Greater Accra Region, Ghana</p>
            </div>

            <p>Dear Mr. Anokye,</p>

            <p>
              We are pleased to inform you that following a comprehensive 8-Layer verification audit of your credentials and financial history, you have been **Pre-Approved** for a mortgage facility through the Syntry Sovereign Exchange.
            </p>

            <div className="bg-[#003300]/5 p-8 rounded-xl border-l-4 border-[#D4AF37] space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-widest opacity-60 mb-2">Facility Summary</h3>
              <div className="grid grid-cols-2 gap-y-4">
                <div>
                  <p className="text-[10px] uppercase font-bold opacity-40">Approved Amount</p>
                  <p className="text-xl font-bold text-[#D4AF37]">GH₵1,250,000</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase font-bold opacity-40">Estimated Rate</p>
                  <p className="text-lg font-bold">14.5% Fixed</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase font-bold opacity-40">Tenure</p>
                  <p className="text-lg font-bold">20 Years</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase font-bold opacity-40">Validity Period</p>
                  <p className="text-lg font-bold">90 Days</p>
                </div>
              </div>
            </div>

            <p>
              This pre-approval is verified based on your **Debt-to-Income (DTI) Ratio of 32%** and a verified employment record within the sovereign data layer. This status serves as a "Financial Passport" for immediate property reservation within our verified marketplace.
            </p>

            <div className="pt-12">
              <p className="italic opacity-60">Digitally Authenticated by,</p>
              <div className="mt-4 flex items-center gap-4">
                <div className="text-xl font-serif text-[#003300] italic underline decoration-[#D4AF37]">Syntry Mortgage Team</div>
                <div className="text-[8px] bg-[#1D9E75] text-white px-2 py-1 rounded font-bold uppercase tracking-widest">Signed</div>
              </div>
            </div>
          </div>

          <div className="border-t border-[#003300]/10 pt-8 text-[8px] opacity-40 flex justify-between uppercase font-bold">
            <p>© 2026 Syntry.co • Built for Ghana • Statutory Finality Registry</p>
            <p>Contact: 0531102292 | info@syntry.co</p>
          </div>
        </div>

        {/* Outer Actions */}
        <div className="mt-12 flex flex-col md:flex-row gap-4 justify-center">
          <button className="bg-[#D4AF37] text-[#003300] px-10 py-4 rounded-xl font-bold text-sm hover:scale-105 transition-all">
            Download PDF
          </button>
          <button className="bg-[#003300] text-[#F8F1E3] px-10 py-4 rounded-xl font-bold text-sm hover:bg-[#004d00] transition-all">
            Share with Partner Bank
          </button>
          <a href="/marketplace" className="border border-[#003300]/20 px-10 py-4 rounded-xl font-bold text-sm hover:bg-[#003300]/5 transition-all text-center">
            Continue to Marketplace
          </a>
        </div>
      </main>

      <GlobalFooter />
    </div>
  );
};

export default PreApprovalPage;
