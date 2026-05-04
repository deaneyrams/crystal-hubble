"use client";
import React from 'react';
import GlobalHeader from '@/components/GlobalHeader';
import GlobalFooter from '@/components/GlobalFooter';

const ReferralProgramPage = () => {
  const rewards = [
    { threshold: "1 Refer", bonus: "GH₵50", perks: "Account Credit" },
    { threshold: "5 Refers", bonus: "GH₵300", perks: "1 Mo. Premium Free" },
    { threshold: "10 Refers", bonus: "GH₵800", perks: "Priority Advisor Support" }
  ];

  const referrals = [
    { name: "John Tetteh", date: "Oct 24", status: "Verified", reward: "GH₵50" },
    { name: "Naa Ayeley", date: "Oct 20", status: "Verified", reward: "GH₵50" },
    { name: "David Mensah", date: "Oct 15", status: "Pending", reward: "TBD" }
  ];

  const referralLink = "https://syntry.co/join?ref=kwame82";

  return (
    <div className="bg-[#fdfcf9] min-h-screen text-[#0F172A] font-sans">
      <GlobalHeader />

      <main className="pt-32 pb-20 px-4 md:px-8 max-w-5xl mx-auto">
        {/* Referral Hero */}
        <section className="mb-16 text-center">
          <div className="inline-flex items-center gap-2 bg-[#D4AF37]/10 px-4 py-2 rounded-md mb-6 border border-[#D4AF37]/20">
            <span className="text-lg">🎁</span>
            <span className="text-[10px] font-medium uppercase tracking-widest text-[#D4AF37]">Syntry Rewards Program</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-medium mb-4 tracking-tight">My Referrals</h1>
          <p className="text-2xl font-medium text-[#D4AF37] mb-8 tracking-tight">GH₵450 earned so far</p>
          <p className="text-lg opacity-60 max-w-2xl mx-auto leading-relaxed font-medium">
            Share Syntry with other land owners and get rewarded as you help them secure their legacy.
          </p>
        </section>

        {/* Reward Tiers */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {rewards.map((r, i) => (
             <div key={i} className="bg-white border border-[#D4AF37]/10 p-10 rounded-[2.5rem] shadow-sm text-center hover:scale-105 transition-all">
                <p className="text-[10px] font-medium uppercase tracking-widest opacity-40 mb-4">{r.threshold}</p>
                <h3 className="text-3xl font-medium text-[#D4AF37] mb-2">{r.bonus}</h3>
                <p className="text-xs font-medium opacity-60">{r.perks}</p>
             </div>
          ))}
        </div>

        {/* Share Section */}
        <section className="bg-syntry-obsidian text-[#F8F1E3] p-12 md:p-16 rounded-[3rem] shadow-2xl mb-16 relative overflow-hidden">
           <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4AF37]/5 rounded-md blur-3xl -mr-32 -mt-32"></div>
           <div className="max-w-xl mx-auto text-center">
             <h2 className="text-2xl font-medium mb-8 italic">Your Unique Referral Link</h2>
             <div className="bg-white/5 border border-white/10 p-6 rounded-md mb-8 flex items-center justify-between gap-4 group">
               <code className="text-sm font-mono text-[#D4AF37] truncate">{referralLink}</code>
               <button className="text-[10px] font-medium uppercase tracking-widest opacity-60 hover:opacity-100 transition-all">Copy</button>
             </div>
             <a 
               href={`https://wa.me/?text=Join%20me%20on%20Syntry.co%20to%20verify%20your%20land%20and%20get%20mortgage%20pre-approval!%20Use%20my%20link:%20${referralLink}`}
               className="bg-[#25D366] text-white py-4 px-10 rounded-md font-medium text-sm block hover:scale-[1.02] transition-all"
             >
               Share on WhatsApp
             </a>
           </div>
        </section>

        {/* How It Works */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-20 text-center px-8 border-b border-[#0F172A]/5 pb-20">
           {[
             { s: "01", t: "Share Link", d: "Send your unique referral link to friends and colleagues." },
             { s: "02", t: "Verification", d: "Friend signs up and completes their first statutory land audit." },
             { s: "03", t: "Get Rewarded", d: "Rewards are credited to your account once verification is successful." }
           ].map((step, i) => (
             <div key={i} className="space-y-4">
                <div className="text-5xl font-medium text-[#D4AF37] opacity-20 tracking-tighter">{step.s}</div>
                <h4 className="font-medium text-lg">{step.t}</h4>
                <p className="text-xs opacity-60 leading-relaxed font-medium">{step.d}</p>
             </div>
           ))}
        </div>

        {/* Referral List */}
        <section className="mb-16">
          <h2 className="text-2xl font-medium mb-10">My Successful Referrals</h2>
          <div className="space-y-4">
            {[
              { name: "John Tetteh", status: "Verified Property", reward: "GH₵150", date: "Oct 24" },
              { name: "Naa Ayeley", status: "Signed Up", reward: "GH₵50", date: "Oct 20" },
              { name: "David Mensah", status: "Mortgage Check", reward: "GH₵250", date: "Oct 15" }
            ].map((ref, i) => (
               <div key={i} className="bg-white border border-[#0F172A]/5 p-8 rounded-md flex items-center justify-between shadow-sm group hover:border-[#D4AF37]/20 transition-all">
                  <div className="flex gap-6 items-center">
                    <div className="w-12 h-12 bg-syntry-obsidian text-[#D4AF37] rounded-md flex items-center justify-center font-medium text-lg">
                      {ref.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-medium text-base group-hover:text-[#D4AF37] transition-all">{ref.name}</p>
                      <p className="text-[10px] font-medium opacity-40 uppercase tracking-[2px]">{ref.status}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-medium text-[#1D9E75] mb-1">{ref.reward}</p>
                    <p className="text-[10px] font-medium opacity-30 uppercase tracking-widest">{ref.date}</p>
                  </div>
               </div>
            ))}
          </div>
        </section>

        {/* Leaderboard Teaser */}
        <section className="bg-white border border-[#D4AF37]/10 p-10 rounded-[2.5rem] mb-20 text-center shadow-sm">
           <p className="text-[10px] font-medium uppercase tracking-widest text-[#D4AF37] mb-4">Community Impact</p>
           <h3 className="text-xl font-medium mb-8 italic">Top referrers this month are winning exclusive land-survey sessions.</h3>
           <div className="flex justify-center -space-x-4">
              {[1,2,3,4].map(i => (
                <div key={i} className="w-12 h-12 rounded-md border-4 border-white bg-syntry-obsidian text-[#D4AF37] flex items-center justify-center font-medium text-xs ring-2 ring-[#D4AF37]/20 uppercase">
                  {String.fromCharCode(64 + i)}
                </div>
              ))}
           </div>
        </section>

        {/* Action CTA */}
        <section className="bg-[#D4AF37] text-[#0F172A] p-12 md:p-16 rounded-[4rem] flex flex-col md:flex-row items-center justify-between gap-12 shadow-2xl">
           <div className="max-w-xl text-center md:text-left">
             <h2 className="text-3xl font-medium mb-4 italic">Invite More Friends Now</h2>
             <p className="font-medium text-sm mb-2 opacity-80">Help your inner circle ground their truth in verified soil.</p>
           </div>
           <div className="flex flex-col gap-4 w-full md:w-auto">
             <a href="https://wa.me/233531102292" className="bg-syntry-obsidian text-[#F8F1E3] px-12 py-5 rounded-md font-medium text-sm text-center hover:scale-[1.02] transition-all shadow-xl">
               Connect with Advisor Liaison
             </a>
             <button className="bg-white/20 border border-[#0F172A]/20 text-[#0F172A] px-12 py-5 rounded-md font-medium text-sm text-center hover:bg-white/30 transition-all">
               View Full Leaderboard
             </button>
           </div>
        </section>
      </main>

      <GlobalFooter />
    </div>
  );
};

export default ReferralProgramPage;
