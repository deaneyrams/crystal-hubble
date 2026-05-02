'use client';
import "../../globals.css";
import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
const GlobalHeader = dynamic(() => import('@/components/GlobalHeader'), { ssr: false });
const GlobalFooter = dynamic(() => import('@/components/GlobalFooter'), { ssr: false });

const PropertyClient = ({ id }) => {
  const [hasMounted, setHasMounted] = useState(false);
  
  useEffect(() => {
    setHasMounted(true);
  }, []);

  // Mock data for the property based on ID
  const property = {
    id: id || 1,
    title: id === '2' ? "Commercial Retail Node - Cantonments" : "Aburi Hills Nodal Sector 4",
    location: id === '2' ? "Cantonments, Accra" : "Aburi Hills, Eastern Region",
    price: id === '2' ? "5,400,000" : "3,250,000",
    size: "2.4 Acres Residential Plot",
    apy: "+18.2%",
    description: "Premium nodal sector land positioned at the highest elevation. This site offers panoramic views and is designated for high-value development. Fully surveyed and cleared for statutory finality through the Syntry Sovereign Protocol.",
    layers: [
      { name: "Cadastral Survey", status: "Verified", source: "Geospatial Dept" },
      { name: "Title Search", status: "Verified", source: "Lands Commission" },
      { name: "Traditional Authority", status: "Verified", source: "Stool Office" },
      { name: "Lands Commission", status: "Verified", source: "Ministerial Node" },
      { name: "Geological Audit", status: "Verified", source: "Syntry Labs" },
      { name: "Lien & Debt Search", status: "Verified", source: "Forensic Index" },
      { name: "Encroachment Scan", status: "Verified", source: "Orbital Scan" },
      { name: "Statutory Finality", status: "Stamped", source: "Sovereign Seal" }
    ],
    mortgage: {
      isEligible: true,
      preApprovalMatch: "Fits your GH₵1,250,000 pre-approval",
      estMonthly: "8,354"
    }
  };

  if (!hasMounted) return <div className="bg-white min-h-screen" />;

  return (
    <div className="bg-white min-h-screen text-slate-900 font-sans flex flex-col overflow-x-hidden">
      <GlobalHeader />

      <main className="flex-grow pt-32 pb-24 px-4 md:px-8 max-w-7xl mx-auto w-full">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-8 text-[10px] font-medium tracking-tight uppercase tracking-widest text-slate-400">
           <a href="/" className="hover:text-slate-900 transition-colors">Syntry</a>
           <span>/</span>
           <a href="/marketplace" className="hover:text-slate-900 transition-colors">Marketplace</a>
           <span>/</span>
           <span className="text-[#0D9488]">{property.title}</span>
        </div>

        {/* Hero Section */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24">
          <div className="rounded-[3rem] overflow-hidden bg-slate-50 aspect-square md:aspect-video lg:aspect-square flex flex-col items-center justify-center text-center p-12 border-4 border-slate-100 relative group">
            <div className="absolute inset-0 bg-[#0D9488]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            <span className="text-8xl mb-6 grayscale group-hover:grayscale-0 transition-all duration-700">🏙️</span>
            <h3 className="text-xl font-medium tracking-tight text-slate-900 mb-2">Satellite Visual Node</h3>
            <p className="text-xs font-medium text-slate-400 uppercase tracking-widest">Grounded Truth Feed Active</p>
            
            <div className="absolute bottom-10 left-10 right-10 flex justify-between items-center bg-white/90 backdrop-blur p-4 rounded-2xl border border-slate-200">
               <div className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-[#0D9488] rounded-full animate-pulse"></span>
                  <p className="text-[10px] font-medium tracking-tight uppercase tracking-widest text-slate-600">Scan status: Match Found</p>
               </div>
               <p className="text-[10px] font-medium tracking-tight uppercase tracking-widest text-slate-400">Layer 01 Verified</p>
            </div>
          </div>
          
          <div className="flex flex-col justify-center space-y-8">
            <div className="flex flex-wrap gap-3">
              <span className="bg-[#0D9488] text-white text-[10px] font-medium tracking-tight px-4 py-2 rounded-full uppercase tracking-widest shadow-lg shadow-[#0D9488]/20">
                ✓ Sovereign Certified
              </span>
              <span className="bg-slate-900 text-white text-[10px] font-medium tracking-tight px-4 py-2 rounded-full uppercase tracking-widest">
                Mortgage Eligible
              </span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-medium tracking-tight tracking-tighter text-slate-900 leading-tight">{property.title}</h1>
            
            <div className="grid grid-cols-2 gap-8 border-y border-slate-100 py-10">
              <div className="space-y-1">
                <p className="text-[10px] uppercase text-slate-400 font-medium tracking-tight tracking-widest">Outright Price</p>
                <p className="text-4xl font-medium tracking-tight text-slate-900 tracking-tight">GH₵{property.price}</p>
              </div>
              <div className="space-y-1 border-l border-slate-100 pl-8">
                <p className="text-[10px] uppercase text-slate-400 font-medium tracking-tight tracking-widest">Expected APY</p>
                <p className="text-4xl font-medium tracking-tight text-[#0D9488] tracking-tight">{property.apy}</p>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] uppercase text-slate-400 font-medium tracking-tight tracking-widest">Physical Size</p>
                <p className="text-xl font-medium text-slate-700">{property.size}</p>
              </div>
              <div className="space-y-1 border-l border-slate-100 pl-8">
                <p className="text-[10px] uppercase text-slate-400 font-medium tracking-tight tracking-widest">Location Node</p>
                <p className="text-xl font-medium text-slate-700">{property.location}</p>
              </div>
            </div>

            <p className="text-lg text-slate-500 font-medium leading-relaxed">
              {property.description}
            </p>
            
            <div className="flex flex-wrap gap-4 pt-4">
               <button className="bg-slate-900 text-white px-10 py-6 rounded-2xl font-medium tracking-tight text-xs uppercase tracking-widest shadow-2xl hover:-translate-y-1 transition-all">Download Audit Report</button>
               <button className="bg-white border-2 border-slate-200 text-slate-900 px-10 py-6 rounded-2xl font-medium tracking-tight text-xs uppercase tracking-widest hover:border-slate-900 transition-all">Verify Coordinates</button>
            </div>
          </div>
        </section>

        {/* 8 Layers Detailed Panel */}
        <section className="mb-24">
          <div className="flex justify-between items-end mb-12">
             <div className="space-y-2">
                <p className="text-[10px] font-medium tracking-tight text-[#0D9488] uppercase tracking-widest">Statutory Assurance</p>
                <h2 className="text-4xl font-medium tracking-tight tracking-tight text-slate-900">8 Layers of Grounded Truth</h2>
             </div>
             <p className="text-xs font-medium text-slate-400 border-b border-slate-200 pb-2">Full Statutory Protocol v3.1</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {property.layers.map((layer, i) => (
              <div key={i} className="bg-slate-50 border border-slate-100 p-8 rounded-[2.5rem] hover:bg-white hover:shadow-2xl transition-all duration-500 group relative overflow-hidden">
                <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-20 transition-opacity text-4xl">🛡️</div>
                <div className="flex items-center justify-between mb-6">
                  <span className="text-[10px] font-medium tracking-tight text-slate-400 uppercase tracking-widest">Layer 0{i+1}</span>
                  <span className="w-3 h-3 bg-[#0D9488] rounded-full shadow-[0_0_8px_#0D9488]"></span>
                </div>
                <h4 className="font-medium tracking-tight text-slate-900 text-lg mb-2">{layer.name}</h4>
                <p className="text-[10px] font-medium tracking-tight text-[#0D9488] uppercase tracking-widest">{layer.status} • {layer.source}</p>
              </div>
            ))}
          </div>
          
          <div className="mt-12 bg-slate-900 rounded-[3rem] p-10 flex flex-col md:flex-row items-center justify-between gap-8 text-white">
             <div className="flex items-center gap-6">
                <div className="w-16 h-16 bg-[#0D9488] text-white rounded-2xl flex items-center justify-center text-3xl shadow-xl">⚖️</div>
                <div>
                   <p className="text-[10px] font-medium tracking-tight text-[#0D9488] uppercase tracking-widest mb-1">Exchange Status</p>
                   <p className="text-xl font-medium">Stamped with Statutory Finality. 0.00% Risk Index.</p>
                </div>
             </div>
             <button className="bg-white text-slate-900 px-8 py-4 rounded-xl font-medium tracking-tight text-xs uppercase tracking-widest hover:scale-105 transition-all">View Registry Log</button>
          </div>
        </section>

        {/* Acquisition & Financing */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-stretch">
          <div className="lg:col-span-2 bg-[#D4AF37]/5 border-4 border-[#D4AF37]/10 p-12 rounded-[4rem] flex flex-col justify-between relative overflow-hidden group">
            <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-[100px] group-hover:bg-[#D4AF37]/20 transition-all duration-1000"></div>
            
            <div className="space-y-6 relative z-10">
               <div className="inline-flex items-center gap-2 bg-[#D4AF37]/20 px-4 py-2 rounded-full border border-[#D4AF37]/30">
                  <span className="text-[10px] font-medium tracking-tight text-[#D4AF37] uppercase tracking-widest">Enzyme Underwriting</span>
               </div>
               <h2 className="text-5xl font-medium tracking-tight tracking-tighter text-slate-900 leading-none">Unlock Institutional <br /> Financing Instantly</h2>
               <p className="text-xl text-slate-600 font-medium max-w-xl">This asset is pre-verified for institutional debt financing. No manual appraisal required.</p>
            </div>
            
            <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-8 relative z-10">
               <div className="bg-white p-8 rounded-3xl shadow-xl border border-slate-100">
                  <p className="text-[10px] font-medium tracking-tight text-slate-400 uppercase tracking-widest mb-4">Mortgage Estimate</p>
                  <p className="text-4xl font-medium tracking-tight text-slate-900 tracking-tighter">GH₵{property.mortgage.estMonthly}<span className="text-lg text-slate-400 font-medium ml-1">/mo</span></p>
                  <p className="text-[10px] font-medium tracking-tight text-[#0D9488] uppercase tracking-widest mt-4">✓ fits your pre-approval</p>
               </div>
               <div className="flex flex-col gap-4">
                  <a href="/mortgage" className="w-full bg-[#0D9488] text-white py-5 rounded-2xl font-medium tracking-tight text-xs text-center uppercase tracking-widest shadow-xl shadow-[#0D9488]/20 hover:-translate-y-1 transition-all">Start Mortgage App</a>
                  <a href="https://wa.me/233531102292" className="w-full bg-slate-900 text-white py-5 rounded-2xl font-medium tracking-tight text-xs text-center uppercase tracking-widest hover:-translate-y-1 transition-all">Talk to Underwriter</a>
               </div>
            </div>
          </div>

          <div className="bg-white border-2 border-slate-100 p-12 rounded-[4rem] shadow-xl flex flex-col justify-between">
            <div className="space-y-6 text-center lg:text-left">
               <h4 className="font-medium tracking-tight text-3xl text-slate-900 tracking-tight">Express Interest</h4>
               <p className="text-slate-500 font-medium leading-relaxed">
                 Connect directly with the verified owner or a Syntry sovereign advisor to start procurement.
               </p>
            </div>
            
            <div className="space-y-4 mt-12">
               <a 
                 href={`https://wa.me/233531102292?text=I%20am%20interested%20in%20${encodeURIComponent(property.title)}`} 
                 className="w-full bg-[#25D366] text-white py-6 rounded-2xl font-medium tracking-tight text-xs uppercase tracking-widest hover:scale-105 transition-all flex items-center justify-center gap-3 shadow-xl"
               >
                 <span className="text-2xl">💬</span> Express via WhatsApp
               </a>
               <p className="text-[10px] text-center font-medium tracking-tight text-slate-400 uppercase tracking-widest">Syntry Verified Advisor Node active</p>
            </div>
          </div>
        </section>
      </main>

      <GlobalFooter />
    </div>
  );
};

export default PropertyClient;
