"use client";
import React, { useState } from 'react';
import GlobalHeader from '@/components/GlobalHeader';
import GlobalFooter from '@/components/GlobalFooter';

const HelpSupportPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [openFaq, setOpenFaq] = useState(null);

  const categories = [
    { title: "Property Verification", icon: "🏢", desc: "8-Layer Grounded Truth audits." },
    { title: "Mortgage Enablement", icon: "🏛️", desc: "Pre-Approval & bank synchronization." },
    { title: "Document Vault", icon: "🔒", desc: "Secure uploads & data protection." },
    { title: "Buying Power", icon: "📈", desc: "Prequalification & financial metrics." },
    { title: "Marketplace", icon: "🌍", desc: "Expressing interest & negotiation." },
    { title: "Technical Issues", icon: "⚙️", desc: "Account access & portal help." }
  ];

  const faqs = [
    { 
      q: "How long does verification take?", 
      a: "Our standard 8-Layer verification process typically takes 5-10 business days, depending on the availability of cadastral and statutory records." 
    },
    { 
      q: "What documents do I need for mortgage pre-approval?", 
      a: "At a minimum, you'll need a valid Ghana Card, 3 months of payslips, and a verified employment record within the Document Vault." 
    },
    { 
      q: "Is my data secure?", 
      a: "Yes. All documents uploaded to the Syntry Vault are encrypted in transit and at rest, meeting sovereign data protection standards." 
    },
    { 
      q: "How do I contact a mortgage advisor?", 
      a: "You can connect with an advisor directly via the WhatsApp link on this page or from your Dashboard's tracker." 
    }
  ];

  return (
    <div className="bg-[#F8F1E3] min-h-screen text-[#003300] font-sans">
      <GlobalHeader />

      <main className="pt-32 pb-20 px-4 md:px-8 max-w-7xl mx-auto">
        {/* Hero */}
        <section className="text-center mb-20">
          <h1 className="text-4xl md:text-6xl font-bold mb-8 tracking-tight">How Can We Help You?</h1>
          <div className="max-w-xl mx-auto relative">
            <input 
              type="text" 
              placeholder="Search for answers..."
              className="w-full py-5 px-8 rounded-2xl border border-[#D4AF37]/30 bg-white shadow-xl focus:ring-2 focus:ring-[#D4AF37] outline-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <span className="absolute right-6 top-1/2 -translate-y-1/2 opacity-20">🔍</span>
          </div>
        </section>

        {/* Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {categories.map((cat, i) => (
            <div key={i} className="bg-white border border-[#D4AF37]/10 p-8 rounded-3xl hover:border-[#D4AF37]/40 hover:shadow-lg transition-all cursor-pointer">
              <div className="text-3xl mb-4">{cat.icon}</div>
              <h3 className="text-lg font-bold mb-2">{cat.title}</h3>
              <p className="text-xs opacity-60 font-medium leading-relaxed">{cat.desc}</p>
            </div>
          ))}
        </div>

        {/* FAQs */}
        <section className="mb-20">
          <h2 className="text-2xl font-bold mb-10">Popular Questions</h2>
          <div className="max-w-3xl space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-white border border-[#003300]/5 rounded-2xl overflow-hidden shadow-sm">
                <button 
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full p-6 text-left flex justify-between items-center transition-colors hover:bg-[#003300]/5"
                >
                  <span className="font-bold text-sm">{faq.q}</span>
                  <span className={`transition-transform ${openFaq === i ? 'rotate-180' : ''}`}>▼</span>
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-6 text-xs leading-relaxed opacity-70 font-medium">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Contact Options */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20 items-stretch">
          <div className="bg-[#003300] text-[#F8F1E3] p-10 rounded-[2.5rem] shadow-xl border border-[#D4AF37]/20 flex flex-col justify-between">
            <div>
              <h3 className="text-2xl font-bold mb-4">Direct Support</h3>
              <p className="text-sm opacity-60 mb-8">Speak with an advisor on the ground for immediate assistance.</p>
            </div>
            <a href="https://wa.me/233531102292" className="bg-[#25D366] text-white py-5 px-8 rounded-2xl font-bold text-center hover:scale-105 transition-all text-sm">
              Chat on WhatsApp ↗
            </a>
          </div>

          <div className="bg-white border border-[#D4AF37]/20 p-10 rounded-[2.5rem] shadow-sm flex flex-col justify-center text-center">
            <p className="text-[10px] font-bold uppercase tracking-widest text-[#D4AF37] mb-2">Email Us</p>
            <h4 className="text-xl font-bold mb-8">info@syntry.co</h4>
            <div className="w-12 h-0.5 bg-[#D4AF37] mx-auto opacity-20"></div>
          </div>

          <div className="bg-white border border-[#D4AF37]/20 p-10 rounded-[2.5rem] shadow-sm flex flex-col justify-center text-center">
            <p className="text-[10px] font-bold uppercase tracking-widest text-[#D4AF37] mb-2">Call Us</p>
            <h4 className="text-xl font-bold mb-8">0531102292</h4>
            <div className="w-12 h-0.5 bg-[#D4AF37] mx-auto opacity-20"></div>
          </div>
        </section>

        {/* Self-Service */}
        <section className="bg-white/50 border border-[#D4AF37]/20 p-12 rounded-[3rem] text-center">
          <h2 className="text-2xl font-bold mb-10 text-[#003300]">Self-Service Tools</h2>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="/dashboard/requests" className="bg-[#003300] text-[#F8F1E3] px-8 py-4 rounded-xl font-bold text-xs hover:bg-[#004d00] transition-all">
              Track My Request
            </a>
            <a href="/dashboard/pre-approval" className="bg-[#D4AF37] text-[#003300] px-8 py-4 rounded-xl font-bold text-xs hover:scale-105 transition-all">
              Download Pre-Approval
            </a>
            <button className="border border-[#003300]/20 text-[#003300] px-8 py-4 rounded-xl font-bold text-xs hover:bg-[#003300]/5 transition-all">
              Reset Password
            </button>
          </div>
        </section>
      </main>

      <GlobalFooter />
    </div>
  );
};

export default HelpSupportPage;
