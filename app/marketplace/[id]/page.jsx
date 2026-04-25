import React from 'react';
import GlobalHeader from '../../../components/GlobalHeader';
import GlobalFooter from '../../../components/GlobalFooter';

const PropertyDetailPage = ({ params }) => {
  // Mock data for ID: 1
  const property = {
    id: 1,
    title: "Aburi Hills Nodal Sector 4",
    location: "Aburi Hills, Eastern Region",
    price: "3,250,000",
    size: "2.4 Acres Residential Plot",
    apy: "+18.2%",
    description: "Premium nodal sector land positioned at the highest elevation of Aburi Hills. This site offers panoramic views of the Greater Accra skyline and is designated for high-value residential development. Fully surveyed and cleared for statutory finality.",
    layers: [
      { name: "Cadastral Survey", status: "Verified" },
      { name: "Title Search", status: "Verified" },
      { name: "Traditional Authority", status: "Verified" },
      { name: "Lands Commission", status: "Verified" },
      { name: "Geological Audit", status: "Verified" },
      { name: "Lien & Debt Search", status: "Verified" },
      { name: "Encroachment Scan", status: "Verified" },
      { name: "Statutory Finality", status: "Stamped" }
    ],
    mortgage: {
      isEligible: true,
      preApprovalMatch: "Fits your GH₵1,250,000 pre-approval",
      estMonthly: "8,354"
    }
  };

  return (
    <div className="bg-[#F8F1E3] min-h-screen text-[#003300] font-sans">
      <GlobalHeader />

      <main className="pt-32 pb-20 px-4 md:px-8 max-w-7xl mx-auto">
        {/* Hero Section */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          <div className="rounded-3xl overflow-hidden bg-[#003300]/5 aspect-video flex items-center justify-center text-xs opacity-40 border border-[#D4AF37]/10">
            [Optimized WebP Hero Background]
          </div>
          
          <div className="flex flex-col justify-center">
            <div className="flex gap-2 mb-6">
              <span className="bg-[#D4AF37] text-[#003300] text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">
                Verified Sovereign
              </span>
              <span className="bg-[#00BFFF] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">
                Mortgage Eligible
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">{property.title}</h1>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8 border-y border-[#003300]/10 py-8">
              <div>
                <p className="text-[10px] uppercase opacity-60 mb-1 font-bold">Price</p>
                <p className="text-lg font-bold">GH₵{property.price}</p>
              </div>
              <div>
                <p className="text-[10px] uppercase opacity-60 mb-1 font-bold">Size</p>
                <p className="text-lg font-bold">2.4 Acres</p>
              </div>
              <div>
                <p className="text-[10px] uppercase opacity-60 mb-1 font-bold">APY</p>
                <p className="text-lg font-bold text-[#00BFFF]">{property.apy}</p>
              </div>
              <div>
                <p className="text-[10px] uppercase opacity-60 mb-1 font-bold">Location</p>
                <p className="text-lg font-bold">Aburi</p>
              </div>
            </div>

            <p className="text-lg opacity-80 leading-relaxed mb-8">
              {property.description}
            </p>
          </div>
        </section>

        {/* 8 Layers Panel */}
        <section className="mb-20">
          <h2 className="text-2xl font-bold mb-8">8 Layers of Grounded Truth</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {property.layers.map((layer, i) => (
              <div key={i} className="bg-white border border-[#D4AF37]/20 p-6 rounded-2xl flex flex-col justify-center shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-bold text-[#D4AF37] uppercase tracking-tighter">Layer 0{i+1}</span>
                  <span className="w-2 h-2 bg-[#1D9E75] rounded-full"></span>
                </div>
                <h4 className="font-bold text-sm mb-1">{layer.name}</h4>
                <p className="text-[10px] font-bold text-[#1D9E75] uppercase">{layer.status}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 bg-[#D4AF37]/5 border border-[#D4AF37] p-6 rounded-2xl text-center">
            <span className="text-[#D4AF37] font-bold uppercase tracking-widest text-xs">Stamped with Statutory Finality</span>
          </div>
        </section>

        {/* Mortgage & Acquisition */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          <div className="md:col-span-2 bg-[#003300] text-[#F8F1E3] p-10 rounded-3xl shadow-xl border border-[#D4AF37]/20 relative overflow-hidden">
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-[#D4AF37]/10 rounded-full blur-2xl -mb-16 -mr-16"></div>
            <h2 className="text-3xl font-bold mb-4">Ready for Mortgage?</h2>
            <div className="flex items-center gap-3 mb-8">
              <span className="w-3 h-3 bg-[#1D9E75] rounded-full animate-pulse"></span>
              <p className="text-lg font-bold text-[#1D9E75]">{property.mortgage.preApprovalMatch}</p>
            </div>
            
            <div className="mb-10">
              <p className="opacity-60 text-xs uppercase mb-2 tracking-widest">Est. Monthly Repayment</p>
              <h3 className="text-4xl font-bold text-[#D4AF37]">GH₵{property.mortgage.estMonthly} <span className="text-lg opacity-40">/ month</span></h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <a href="/mortgage" className="bg-[#00BFFF] text-[#003300] py-4 rounded-xl font-bold hover:scale-105 transition-all text-sm text-center">
                Apply Mortgage on This Property
              </a>
              <a href="https://wa.me/233531102292?text=I%20want%20to%20download%20the%20valuation%20report%20for%20property%20ID%3A%201" className="border border-[#F8F1E3]/20 py-4 rounded-xl font-bold hover:bg-[#F8F1E3]/5 transition-all text-sm text-center">
                Download Valuation Report
              </a>
            </div>
          </div>

          <div className="bg-white border border-[#D4AF37]/20 p-8 rounded-3xl shadow-lg h-full">
            <h4 className="font-bold text-xl mb-6">Express Interest</h4>
            <p className="text-sm opacity-70 mb-8">
              Connect directly with the verified owner or a Syntry advisor to start the acquisition process.
            </p>
            <a 
              href="https://wa.me/233531102292" 
              className="bg-[#25D366] text-white w-full py-4 rounded-xl font-bold hover:scale-105 transition-all flex items-center justify-center gap-3 text-sm mb-4"
            >
              Express via WhatsApp
            </a>
            <p className="text-[10px] text-center opacity-40 uppercase font-bold">Response time: ~15 mins</p>
          </div>
        </section>
      </main>

      {/* Sticky Mobile Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#003300] p-4 flex gap-3 md:hidden z-50 border-t border-[#D4AF37]/20 shadow-2xl">
        <a 
          href="https://wa.me/233531102292" 
          className="flex-1 bg-[#D4AF37] text-[#003300] py-3 rounded-lg font-bold text-center text-xs"
        >
          Express Interest
        </a>
        <button className="flex-1 bg-[#00BFFF] text-[#003300] py-3 rounded-lg font-bold text-xs">
          Apply Mortgage
        </button>
      </div>

      <GlobalFooter />
    </div>
  );
};

export default PropertyDetailPage;
