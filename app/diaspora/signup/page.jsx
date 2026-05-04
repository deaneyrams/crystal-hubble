"use client";
import React from 'react';
import GlobalHeader from '../../../components/GlobalHeader';
import GlobalFooter from '../../../components/GlobalFooter';

const DiasporaSignupPage = () => {
  return (
    <div className="bg-[#F8F1E3] min-h-screen text-[#0F172A] font-sans">
      <GlobalHeader />

      <main className="pt-32 pb-20 px-4 md:px-8 max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 items-start">
        {/* Left Side: Form */}
        <div className="w-full lg:w-3/5">
          <header className="mb-12">
            <h1 className="text-4xl md:text-5xl font-medium tracking-tight mb-4">Register as Diaspora Owner</h1>
            <p className="text-lg opacity-60 font-medium">Join the growing community of Ghanaians abroad securing and managing their family land with confidence.</p>
            <p className="text-[10px] font-medium uppercase tracking-widest text-[#D4AF37] mt-8">Free registration • Takes less than 2 minutes • Secure and private</p>
          </header>

          <div className="bg-white border border-[#D4AF37]/10 p-8 md:p-12 rounded-[3.5rem] shadow-xl shadow-[#D4AF37]/5 relative overflow-hidden group">
             <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4AF37]/5 rounded-md blur-2xl"></div>
             
             <div className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                   <div>
                      <label className="text-[10px] font-medium uppercase tracking-[2px] opacity-40 block mb-3 ml-2">Full Name</label>
                      <input type="text" placeholder="Kofi Kojo Mensah" className="w-full bg-syntry-obsidian/5 border-none p-5 rounded-md font-medium text-sm focus:ring-2 focus:ring-[#D4AF37]/20" />
                   </div>
                   <div>
                      <label className="text-[10px] font-medium uppercase tracking-[2px] opacity-40 block mb-3 ml-2">Email Address</label>
                      <input type="email" placeholder="kofi@example.com" className="w-full bg-syntry-obsidian/5 border-none p-5 rounded-md font-medium text-sm" />
                   </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                   <div>
                      <label className="text-[10px] font-medium uppercase tracking-[2px] opacity-40 block mb-3 ml-2">Phone Number</label>
                      <div className="flex gap-2">
                         <select className="w-24 bg-syntry-obsidian/5 border-none p-5 rounded-md font-medium text-[10px] appearance-none">
                            <option>+44 UK</option>
                            <option>+1 US</option>
                            <option>+1 CA</option>
                            <option>+233 GH</option>
                         </select>
                         <input type="text" placeholder="7712345678" className="flex-1 bg-syntry-obsidian/5 border-none p-5 rounded-md font-medium text-sm" />
                      </div>
                   </div>
                   <div>
                      <label className="text-[10px] font-medium uppercase tracking-[2px] opacity-40 block mb-3 ml-2">Country of Residence</label>
                      <select className="w-full bg-syntry-obsidian/5 border-none p-5 rounded-md font-medium text-sm">
                         <option>United Kingdom</option>
                         <option>United States</option>
                         <option>Canada</option>
                         <option>Germany</option>
                         <option>Netherlands</option>
                         <option>Italy</option>
                      </select>
                   </div>
                </div>

                <div>
                   <label className="text-[10px] font-medium uppercase tracking-[2px] opacity-40 block mb-3 ml-2">Ghanaian Connection</label>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {["I own family land", "I own investment property", "Planning to buy land", "Managing relatives land"].map((opt) => (
                        <label key={opt} className="flex items-center gap-4 bg-syntry-obsidian/5 p-5 rounded-md cursor-pointer hover:bg-[#D4AF37]/10 transition-all border border-transparent hover:border-[#D4AF37]/20">
                           <input type="radio" name="connection" className="w-4 h-4 border-[#0F172A]/20 text-[#0F172A] focus:ring-[#D4AF37]" />
                           <span className="text-xs font-medium leading-none">{opt}</span>
                        </label>
                      ))}
                   </div>
                </div>

                <div>
                   <label className="text-[10px] font-medium uppercase tracking-[2px] opacity-40 block mb-3 ml-2">Create Password</label>
                   <input type="password" placeholder="••••••••" className="w-full bg-syntry-obsidian/5 border-none p-5 rounded-md font-medium text-sm" />
                </div>

                <div className="flex items-start gap-4">
                   <input type="checkbox" className="mt-1 w-4 h-4 rounded border-[#0F172A]/20 text-[#0F172A] focus:ring-[#D4AF37]" />
                   <p className="text-[10px] font-medium opacity-60 leading-relaxed italic">
                      I agree to Syntry’s <span className="underline cursor-pointer">Terms of Service</span> and <span className="underline cursor-pointer">Privacy Policy</span>.
                   </p>
                </div>

                <button className="w-full bg-[#D4AF37] text-[#0F172A] py-6 rounded-md font-medium text-[10px] uppercase tracking-[3px] hover:scale-[1.02] transition-all shadow-xl shadow-[#D4AF37]/20">
                   Create My Diaspora Account
                </button>

                <div className="pt-6 border-t border-[#0F172A]/5 text-center">
                   <p className="text-[10px] font-medium uppercase tracking-widest opacity-60">Already have an account? <span className="text-[#00BFFF] cursor-pointer hover:underline">Login here</span></p>
                </div>
             </div>
          </div>
        </div>

        {/* Right Side: Benefits & Trust */}
        <aside className="w-full lg:w-2/5 lg:pt-56">
          <div className="space-y-12">
             <div className="space-y-8">
                <h3 className="text-[10px] font-medium uppercase tracking-[4px] opacity-30">Exclusive Benefits</h3>
                {[
                  { t: "Global Access", d: "Real-time dashboard from anywhere in the world.", i: "🌎" },
                  { t: "Automated Payouts", d: "Rent collection to international or local accounts.", i: "💰" },
                  { t: "Secure Vault", d: "Digital document storage with 8 Layers verification.", i: "🛡️" },
                  { t: "Dedicated Advisor", d: "WhatsApp support in your specific timezone.", i: "📱" }
                ].map((b, i) => (
                  <div key={i} className="flex gap-6 items-start group">
                     <div className="w-12 h-12 bg-white rounded-md flex items-center justify-center text-2xl shadow-sm border border-[#0F172A]/5 group-hover:scale-110 transition-transform">{b.i}</div>
                     <div>
                        <h4 className="font-medium text-lg mb-1">{b.t}</h4>
                        <p className="text-xs opacity-60 leading-relaxed font-medium">{b.d}</p>
                     </div>
                  </div>
                ))}
             </div>

             <div className="bg-syntry-obsidian text-[#F8F1E3] p-10 rounded-[3rem] shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4AF37]/5 rounded-md blur-2xl"></div>
                <div className="space-y-6 relative z-10">
                   <div className="flex items-center gap-4 border-b border-white/5 pb-4">
                      <span className="text-[#A8E6CF]">🔐</span>
                      <p className="text-[9px] font-medium uppercase tracking-widest">Bank-grade encryption active</p>
                   </div>
                   <div className="flex items-center gap-4 border-b border-white/5 pb-4">
                      <span className="text-[#A8E6CF]">🛡️</span>
                      <p className="text-[9px] font-medium uppercase tracking-widest">Data never shared without consent</p>
                   </div>
                   <div className="flex items-center gap-4">
                      <span className="text-[#D4AF37]">✨</span>
                      <p className="text-[9px] font-medium uppercase tracking-widest">Trusted by 180+ Diaspora Owners</p>
                   </div>
                </div>
             </div>

             <div className="text-center md:text-left pt-8">
                <p className="text-xs font-medium opacity-30 italic">"After signing up, you can immediately verify your land or check your buying power."</p>
             </div>
          </div>
        </aside>
      </main>

      <GlobalFooter />
    </div>
  );
};

export default DiasporaSignupPage;
