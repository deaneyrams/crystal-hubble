"use client";
import React, { useState } from 'react';
import GlobalHeader from '../../../components/GlobalHeader';
import GlobalFooter from '../../../components/GlobalFooter';

const PropertyUploadPage = () => {
  const [step, setStep] = useState(1);

  return (
    <div className="bg-[#F8F1E3] min-h-screen text-[#003300] font-sans">
      <GlobalHeader />

      <main className="pt-32 pb-20 px-4 md:px-8 max-w-4xl mx-auto">
        {/* Progress Header */}
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-bold tracking-tight mb-8">Upload New Property</h1>
          <div className="flex items-center justify-center gap-4 max-w-md mx-auto">
             {[
               { n: 1, l: "Basic Info" },
               { n: 2, l: "Documents" },
               { n: 3, l: "Review" }
             ].map((s) => (
               <React.Fragment key={s.n}>
                 <div className="flex flex-col items-center gap-2">
                   <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs border-2 transition-all ${step >= s.n ? 'bg-[#003300] text-[#D4AF37] border-[#003300]' : 'bg-white border-[#003300]/10 opacity-40'}`}>
                     {s.n}
                   </div>
                   <p className={`text-[9px] font-bold uppercase tracking-widest ${step >= s.n ? 'opacity-100' : 'opacity-30'}`}>{s.l}</p>
                 </div>
                 {s.n < 3 && <div className={`h-[2px] w-12 mb-6 ${step > s.n ? 'bg-[#003300]' : 'bg-[#003300]/10'}`}></div>}
               </React.Fragment>
             ))}
          </div>
        </header>

        {/* Step 1: Basic Info */}
        {step === 1 && (
          <div className="bg-white border border-[#003300]/5 p-8 md:p-12 rounded-[3rem] shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-500">
             <div className="space-y-8">
                <div>
                   <label className="text-[10px] font-bold uppercase tracking-[2px] opacity-40 block mb-3">Property Title</label>
                   <input type="text" placeholder="e.g. Aburi Hills Luxury Plot" className="w-full bg-[#003300]/5 border-none p-5 rounded-2xl font-bold text-sm placeholder:opacity-20" />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                   <div>
                      <label className="text-[10px] font-bold uppercase tracking-[2px] opacity-40 block mb-3">Location</label>
                      <select className="w-full bg-[#003300]/5 border-none p-5 rounded-2xl font-bold text-sm">
                         <option>Select Area...</option>
                         <option>Aburi</option>
                         <option>Pokuase</option>
                         <option>Legon</option>
                         <option>East Legon</option>
                         <option>Spintex</option>
                         <option>Other</option>
                      </select>
                   </div>
                   <div>
                      <label className="text-[10px] font-bold uppercase tracking-[2px] opacity-40 block mb-3">Size (Acres / Plots)</label>
                      <input type="text" placeholder="e.g. 0.5 Acres" className="w-full bg-[#003300]/5 border-none p-5 rounded-2xl font-bold text-sm" />
                   </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                   <div>
                      <label className="text-[10px] font-bold uppercase tracking-[2px] opacity-40 block mb-3">Asking Price (GHS)</label>
                      <input type="number" placeholder="450,000" className="w-full bg-[#003300]/5 border-none p-5 rounded-2xl font-bold text-sm" />
                   </div>
                   <div>
                      <label className="text-[10px] font-bold uppercase tracking-[2px] opacity-40 block mb-3">Property Type</label>
                      <select className="w-full bg-[#003300]/5 border-none p-5 rounded-2xl font-bold text-sm">
                         <option>Residential</option>
                         <option>Mixed-Use</option>
                         <option>Commercial</option>
                         <option>Agricultural</option>
                      </select>
                   </div>
                </div>

                <div>
                   <label className="text-[10px] font-bold uppercase tracking-[2px] opacity-40 block mb-3">Description</label>
                   <textarea placeholder="Describe the statutory and investment highlights of the property..." rows={4} className="w-full bg-[#003300]/5 border-none p-5 rounded-2xl font-bold text-sm placeholder:opacity-20 resize-none"></textarea>
                </div>

                <div>
                   <label className="text-[10px] font-bold uppercase tracking-[2px] opacity-40 block mb-3">Property Photos</label>
                   <div className="border-2 border-dashed border-[#003300]/10 rounded-[2rem] p-12 text-center hover:border-[#D4AF37]/40 transition-all group pointer-cursor">
                      <p className="text-3xl mb-4 group-hover:scale-110 transition-transform">📸</p>
                      <p className="text-xs font-bold opacity-60">Drag and drop high-res photos here</p>
                      <p className="text-[9px] opacity-30 mt-2 font-medium">PNG or JPEG up to 10MB each</p>
                   </div>
                </div>
             </div>
          </div>
        )}

        {/* Step 2: Documents */}
        {step === 2 && (
          <div className="bg-white border border-[#003300]/5 p-8 md:p-12 rounded-[3rem] shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-500">
             <h3 className="text-xl font-bold mb-8 italic text-[#003300]">8 Layers Statutory Documents</h3>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { label: "Land Title / Indenture", icon: "📑" },
                  { label: "Survey Plan", icon: "🗺️" },
                  { label: "Ghana Card of Owner", icon: "🆔" },
                  { label: "Tax Clearance", icon: "🧾" }
                ].map((doc, idx) => (
                  <div key={idx} className="bg-[#003300]/5 p-6 rounded-2xl border border-dashed border-[#003300]/10 flex items-center justify-between group hover:border-[#D4AF37]/40 transition-all cursor-pointer">
                    <div className="flex items-center gap-4">
                      <span className="text-2xl">{doc.icon}</span>
                      <span className="text-[10px] font-bold uppercase tracking-widest opacity-60">{doc.label}</span>
                    </div>
                    <span className="text-xs font-bold text-[#D4AF37]">Upload</span>
                  </div>
                ))}
             </div>
          </div>
        )}

        {/* Step 3: Review */}
        {step === 3 && (
          <div className="bg-white border border-[#D4AF37]/20 p-8 md:p-12 rounded-[3.5rem] shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-500">
             <h3 className="text-2xl font-bold mb-8 italic text-[#003300]">Review & Statutory Submit</h3>
             <div className="space-y-6 mb-10 pb-10 border-b border-[#003300]/5">
                <div className="flex justify-between border-b border-[#003300]/5 pb-4"><span className="text-[10px] font-bold opacity-40 uppercase">Property Title</span> <span className="text-sm font-bold italic underline">Aburi Hills Luxury Plot</span></div>
                <div className="flex justify-between border-b border-[#003300]/5 pb-4"><span className="text-[10px] font-bold opacity-40 uppercase">Price (GHS)</span> <span className="text-sm font-bold italic">450,000</span></div>
                <div className="flex justify-between border-b border-[#003300]/5 pb-4"><span className="text-[10px] font-bold opacity-40 uppercase">Status</span> <span className="text-[10px] font-bold bg-[#A8E6CF]/20 text-[#003300] px-4 py-1 rounded-full uppercase tracking-widest">Ready for 8-Layer Audit</span></div>
             </div>
             
             <label className="flex items-start gap-4 cursor-pointer group">
                <input type="checkbox" className="mt-1 w-4 h-4 rounded border-[#003300]/20 text-[#003300] focus:ring-[#D4AF37]" />
                <span className="text-xs font-medium opacity-60 leading-relaxed group-hover:opacity-100 transition-opacity">
                   I confirm all information is accurate and I understand this asset will undergo 8 Layers of Grounded Truth verification before going live.
                </span>
             </label>
          </div>
        )}

        {/* Action Bar */}
        <div className="mt-12 flex flex-col md:flex-row items-center justify-between gap-6">
           <p className="text-[10px] font-bold opacity-40 italic max-w-xs text-center md:text-left">
             After submission, our team will verify the property using the 8 Layers of Grounded Truth. You will be notified via WhatsApp within 48 hours.
           </p>
           <div className="flex gap-4 w-full md:w-auto">
              {step > 1 && (
                <button 
                  onClick={() => setStep(step - 1)}
                  className="flex-1 md:px-10 py-4 rounded-2xl border border-[#003300]/10 font-bold text-xs uppercase tracking-widest hover:bg-[#003300]/5 transition-all"
                >
                  Back
                </button>
              )}
              <button 
                onClick={() => {
                  if (step < 3) setStep(step + 1);
                  else alert("Property Submitted for 8 Layer Verification. You will be notified via WhatsApp within 48 hours.");
                }}
                className={`flex-1 md:px-10 py-4 rounded-2xl font-bold text-xs uppercase tracking-widest transition-all shadow-xl ${step === 3 ? 'bg-[#D4AF37] text-[#003300] hover:scale-[1.02]' : 'bg-[#003300] text-white hover:bg-[#004d00]'}`}
              >
                {step === 1 ? 'Next: Documents' : step === 2 ? 'Next: Review' : 'Submit for Verification'}
              </button>
           </div>
        </div>

        {/* WhatsApp Support Mini-Box */}
        <section className="mt-20 bg-[#D4AF37]/5 border border-[#D4AF37]/10 p-8 rounded-[2.5rem] flex items-center justify-between gap-8">
           <div className="flex gap-4 items-center">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-xl shadow-sm">🤝</div>
              <div>
                 <p className="text-xs font-bold text-[#003300]">Need help with verification?</p>
                 <p className="text-[10px] opacity-60 font-medium">Chat with our onboarding team for 8 Layers support.</p>
              </div>
           </div>
           <a href="https://wa.me/233531102292" className="bg-[#25D366] text-white px-6 py-3 rounded-xl font-bold text-[10px] uppercase tracking-widest hover:scale-105 transition-all">
              WhatsApp Support
           </a>
        </section>
      </main>

      <GlobalFooter />
    </div>
  );
};

export default PropertyUploadPage;
