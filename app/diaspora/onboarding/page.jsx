"use client";
import React from 'react';
import GlobalFooter from '../../../components/GlobalFooter';

const DiasporaOnboardingSuccessPage = () => {
  const userName = "Kofi"; // Mock user name for success screen

  return (
    <div className="bg-[#F8F1E3] min-h-screen text-[#003300] font-sans">
      <main className="pt-24 pb-20 px-4 md:px-8 max-w-5xl mx-auto flex flex-col items-center">
        {/* Success Hero Section */}
        <header className="text-center mb-16 animate-in fade-in zoom-in duration-1000">
           <div className="w-24 h-24 bg-[#A8E6CF] text-[#003300] rounded-full mx-auto flex items-center justify-center text-5xl mb-10 shadow-2xl shadow-[#A8E6CF]/30 border-4 border-white">
              ✓
           </div>
           <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-4 italic">Welcome to Syntry, {userName}!</h1>
           <p className="text-[#D4AF37] font-bold uppercase tracking-[4px] text-[10px] mb-8">Your Diaspora Account has been successfully created</p>
           <p className="text-lg opacity-60 font-medium max-w-2xl mx-auto leading-relaxed">
             You're now part of a growing community of Ghanaians abroad who are taking full control of their family land legacies.
           </p>
        </header>

        {/* Quick Win Cards */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20 w-full">
           {[
             { t: "Verify Your Ghana Property", d: "Lock your land against disputes with 8 Layers.", b: "Start Verification Now – Free", c: "bg-[#D4AF37]", tc: "text-[#003300]" },
             { t: "Check Your Buying Power", d: "Discover how much you can borrow for land.", b: "Discover My Buying Power", c: "bg-[#00BFFF]", tc: "text-[#003300]" },
             { t: "Explore the Marketplace", d: "Browse verified institutional-grade plots.", b: "Browse Verified Properties", c: "bg-[#003300]", tc: "text-[#F8F1E3]" }
           ].map((card, i) => (
             <div key={i} className="bg-white border border-[#003300]/5 p-8 rounded-[2.5rem] shadow-xl hover:shadow-2xl transition-all group flex flex-col justify-between h-full">
                <div>
                   <h3 className="text-xl font-bold mb-3 italic">{card.t}</h3>
                   <p className="text-xs opacity-60 font-medium mb-10 leading-relaxed">{card.d}</p>
                </div>
                <button className={`w-full ${card.c} ${card.tc} py-4 rounded-2xl font-bold text-[10px] uppercase tracking-widest hover:scale-[1.02] transition-all shadow-lg`}>
                   {card.b}
                </button>
             </div>
           ))}
        </section>

        {/* Progress Indicator */}
        <section className="w-full bg-[#003300] text-[#F8F1E3] p-10 md:p-16 rounded-[4rem] shadow-2xl mb-16 relative overflow-hidden">
           <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4AF37]/5 rounded-full blur-3xl -mr-32 -mt-32"></div>
           <div className="relative z-10">
              <h3 className="text-[10px] font-bold uppercase tracking-[4px] opacity-40 mb-10 text-center">Onboarding Progress</h3>
              <div className="flex flex-col md:flex-row gap-8 items-center justify-between">
                 {[
                   { l: "Account Created", s: "✓", a: true },
                   { l: "Verify Your First Property", s: "50%", a: true },
                   { l: "Get Pre-Approval & Shop", s: "⏳", a: false }
                 ].map((step, i) => (
                   <React.Fragment key={i}>
                      <div className={`flex flex-col items-center gap-4 ${step.a ? 'opacity-100' : 'opacity-30'}`}>
                         <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm ${step.a ? 'bg-[#D4AF37] text-[#003300]' : 'bg-white/10'}`}>
                            {step.s}
                         </div>
                         <p className="text-[10px] font-bold uppercase tracking-widest whitespace-nowrap">{step.l}</p>
                      </div>
                      {i < 2 && <div className="hidden md:block flex-1 h-[2px] bg-white/10 relative"><div className={`absolute left-0 top-0 h-full bg-[#D4AF37] ${i === 0 ? 'w-full' : 'w-0'}`}></div></div>}
                   </React.Fragment>
                 ))}
              </div>
           </div>
        </section>

        {/* Personal Welcome */}
        <section className="text-center mb-20">
           <p className="text-xl font-medium italic opacity-80 leading-relaxed max-w-2xl">
             "As a Diaspora member, you get priority WhatsApp support and access to tools designed specifically for Ghanaians living abroad."
           </p>
        </section>

        {/* Final CTA */}
        <section className="w-full flex flex-col md:flex-row gap-6 items-center justify-center mb-32">
           <button className="w-full md:w-auto bg-[#D4AF37] text-[#003300] px-16 py-6 rounded-2xl font-bold text-xl hover:scale-105 transition-all shadow-2xl">
              Let's Start by Verifying Your Land
           </button>
           <a href="https://wa.me/233531102292" className="flex items-center gap-4 text-[#003300] font-bold text-lg group">
              <span className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">💬</span>
              Chat with a Diaspora Advisor
           </a>
        </section>
      </main>

      <GlobalFooter />
      
      {/* Floating WhatsApp Button */}
      <a 
        href="https://wa.me/233531102292" 
        className="fixed bottom-8 right-8 w-16 h-16 bg-[#25D366] text-white rounded-full flex items-center justify-center text-3xl shadow-2xl hover:scale-110 transition-all z-50 border-4 border-white"
        title="Chat with Advisor"
      >
        💬
      </a>
    </div>
  );
};

export default DiasporaOnboardingSuccessPage;
