import React from 'react';
import GlobalHeader from '../../../components/GlobalHeader';
import GlobalFooter from '../../../components/GlobalFooter';

const ConfirmationPage = () => {
  return (
    <div className="bg-[#F8F1E3] min-h-screen text-[#0F172A] font-sans">
      <GlobalHeader />

      <main className="pt-40 pb-20 px-4 md:px-8 max-w-4xl mx-auto text-center">
        {/* Success Icon */}
        <div className="mb-8 relative inline-block">
          <div className="w-24 h-24 bg-[#1D9E75]/10 rounded-md flex items-center justify-center animate-pulse">
            <span className="text-5xl text-[#1D9E75]">✓</span>
          </div>
          <div className="absolute top-0 right-0 w-6 h-6 bg-[#D4AF37] border-4 border-[#F8F1E3] rounded-md"></div>
        </div>

        <h1 className="text-4xl md:text-5xl font-medium mb-6 tracking-tight">Interest Successfully Expressed!</h1>
        <p className="text-lg opacity-70 mb-12 max-w-2xl mx-auto">
          Your interest has been sent to the verified owner. A Syntry advisor will contact you shortly to facilitate the statutory review and mortgage pre-approval steps.
        </p>

        {/* Property Summary */}
        <div className="bg-white border border-[#D4AF37]/20 p-6 rounded-md shadow-sm mb-12 flex flex-col md:flex-row items-center gap-6 text-left max-w-2xl mx-auto">
          <div className="w-24 h-20 bg-syntry-obsidian/5 rounded-md flex items-center justify-center text-[8px] opacity-40 italic">
            [Property Photo]
          </div>
          <div className="flex-1">
            <h3 className="font-medium text-lg mb-1">Aburi Hills Nodal Sector 4</h3>
            <p className="text-sm opacity-60 mb-2">2.4 Acres | Eastern Region</p>
            <span className="bg-[#D4AF37] text-[#0F172A] text-[10px] font-medium px-2 py-1 rounded uppercase tracking-tighter">
              Mortgage Eligible
            </span>
          </div>
          <div className="text-right">
            <p className="text-2xl font-medium text-[#0F172A]">GH₵3.25M</p>
          </div>
        </div>

        {/* What Happens Next */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 text-left">
          <div className="space-y-3">
            <div className="w-8 h-8 bg-syntry-obsidian text-[#F8F1E3] rounded-md flex items-center justify-center font-medium text-sm">1</div>
            <h4 className="font-medium text-sm uppercase tracking-widest">Advisor Review</h4>
            <p className="text-xs opacity-60 leading-relaxed font-medium">Kwame will review your Verified Buyer Profile and documentation within 24 hours.</p>
          </div>
          <div className="space-y-3">
            <div className="w-8 h-8 bg-syntry-obsidian text-[#F8F1E3] rounded-md flex items-center justify-center font-medium text-sm">2</div>
            <h4 className="font-medium text-sm uppercase tracking-widest">Seller Synchronization</h4>
            <p className="text-xs opacity-60 leading-relaxed font-medium">We facilitate direct communication with the verified seller for initial negotiation.</p>
          </div>
          <div className="space-y-3">
            <div className="w-8 h-8 bg-syntry-obsidian text-[#F8F1E3] rounded-md flex items-center justify-center font-medium text-sm">3</div>
            <h4 className="font-medium text-sm uppercase tracking-widest">Mortgage Handover</h4>
            <p className="text-xs opacity-60 leading-relaxed font-medium">Final statutory reports are prepared for institutional bank underwriting.</p>
          </div>
        </div>

        {/* CTAs */}
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <a href="/dashboard/requests" className="bg-syntry-obsidian text-[#F8F1E3] px-10 py-4 rounded-md font-medium text-sm hover:bg-[#004d00] transition-all">
            Track My Requests
          </a>
          <a href="/marketplace" className="border border-[#0F172A]/20 px-10 py-4 rounded-md font-medium text-sm hover:bg-syntry-obsidian/5 transition-all">
            Browse More Properties
          </a>
          <a href="https://wa.me/233531102292" target="_blank" rel="noreferrer" className="bg-[#25D366] text-white px-10 py-4 rounded-md font-medium text-sm hover:scale-105 transition-all flex items-center justify-center gap-2">
            Chat with Advisor
          </a>
        </div>
      </main>

      <GlobalFooter />
    </div>
  );
};

export default ConfirmationPage;
