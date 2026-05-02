"use client";
import React, { useState } from 'react';
import GlobalHeader from '@/components/GlobalHeader';
import GlobalFooter from '@/components/GlobalFooter';
import "../globals.css";

const SupportPage = () => {
  const [openFaq, setOpenFaq] = useState(null);

  const faqs = [
    { q: "How do I start a property verification?", a: "Go to the 'Check My Property' page, enter your GPS coordinates or title number, and our system will begin the 8-layer audit process." },
    { q: "How long does verification take?", a: "Initial AI scanning takes minutes. Full statutory verification typically takes 7-14 days depending on the district." },
    { q: "Is Syntry a government agency?", a: "No, Syntry is a private sovereign protocol that synchronizes directly with statutory bodies like the Lands Commission to provide a single source of truth." },
    { q: "Can I use Syntry for mortgage applications?", a: "Yes. Syntry verified assets are recognized by several major local and international banks as primary collateral." }
  ];

  return (
    <div className="bg-[#F8F1E3] min-h-screen text-[#0F172A] font-sans">
      <GlobalHeader />
      <main className="pt-40 pb-20 px-6 max-w-4xl mx-auto">
        <h1 className="text-5xl font-medium tracking-tight italic mb-10 tracking-tight">Support Center</h1>
        
        <div className="space-y-6">
          {faqs.map((faq, i) => (
            <div key={i} className="bg-white border-2 border-[#0F172A]/5 rounded-[2rem] overflow-hidden shadow-sm">
              <button 
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full text-left p-8 flex justify-between items-center"
              >
                <span className="font-medium text-lg">{faq.q}</span>
                <span className={`text-xl transition-transform ${openFaq === i ? 'rotate-180' : ''}`}>↓</span>
              </button>
              {openFaq === i && (
                <div className="px-8 pb-8 pt-2 opacity-80 font-medium leading-relaxed">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-20 bg-[#0F172A] text-[#D4AF37] p-12 rounded-[3rem] text-center shadow-2xl">
          <h2 className="text-3xl font-medium mb-6">Need immediate help?</h2>
          <p className="text-lg opacity-80 mb-8 font-medium">Our agents are active 24/7 on WhatsApp.</p>
          <a href="https://wa.me/233531102292" className="bg-[#D4AF37] text-[#0F172A] px-10 py-5 rounded-2xl font-medium tracking-tight text-lg hover:scale-105 transition-all inline-block shadow-xl">
            WhatsApp Support: 053 110 2292
          </a>
        </div>
      </main>
      <GlobalFooter />
    </div>
  );
};

export default SupportPage;
