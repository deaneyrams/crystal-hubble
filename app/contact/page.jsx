"use client";
import React from 'react';
import GlobalHeader from '../../components/GlobalHeader';
import GlobalFooter from '../../components/GlobalFooter';
import "../globals.css";

const ContactPage = () => {
  return (
    <div className="bg-[#F8F1E3] min-h-screen text-[#0F172A] font-sans">
      <GlobalHeader />
      <main className="pt-40 pb-20 px-6 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20">
        <div>
          <h1 className="text-6xl md:text-7xl font-medium tracking-tight italic mb-10 tracking-tight leading-none">Get in <span className="text-[#D4AF37]">Touch.</span></h1>
          <p className="text-xl opacity-80 font-medium leading-relaxed mb-12">
            Whether you are an owner, investor, or institutional partner, our protocol team is ready to secure your property legacy.
          </p>

          <div className="space-y-8">
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 bg-white rounded-md flex items-center justify-center text-3xl shadow-sm">📍</div>
              <div>
                <p className="font-medium text-lg">Main Secretariat</p>
                <p className="font-medium opacity-60">East Legon, Accra, Ghana</p>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 bg-white rounded-md flex items-center justify-center text-3xl shadow-sm">📱</div>
              <div>
                <p className="font-medium text-lg">WhatsApp Hotline</p>
                <p className="font-medium opacity-60">053 110 2292</p>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 bg-white rounded-md flex items-center justify-center text-3xl shadow-sm">📧</div>
              <div>
                <p className="font-medium text-lg">Email Support</p>
                <p className="font-medium opacity-60">info@syntry.co</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-10 md:p-16 rounded-[4rem] shadow-2xl border-4 border-white">
          <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); alert('Message sent to Syntry Protocol Team.'); }}>
            <div>
              <label className="block text-[10px] font-medium uppercase tracking-widest opacity-40 mb-2 pl-2">Full Name</label>
              <input type="text" placeholder="Kwame Osei" className="w-full bg-[#F8F1E3]/50 border border-[#0F172A]/10 rounded-md px-6 py-4 focus:outline-none focus:border-[#D4AF37] transition-all font-medium" />
            </div>
            <div>
              <label className="block text-[10px] font-medium uppercase tracking-widest opacity-40 mb-2 pl-2">Email Address</label>
              <input type="email" placeholder="kwame@example.com" className="w-full bg-[#F8F1E3]/50 border border-[#0F172A]/10 rounded-md px-6 py-4 focus:outline-none focus:border-[#D4AF37] transition-all font-medium" />
            </div>
            <div>
              <label className="block text-[10px] font-medium uppercase tracking-widest opacity-40 mb-2 pl-2">Message</label>
              <textarea placeholder="How can we help you today?" className="w-full bg-[#F8F1E3]/50 border border-[#0F172A]/10 rounded-md px-6 py-4 focus:outline-none focus:border-[#D4AF37] transition-all font-medium h-40 resize-none"></textarea>
            </div>
            <button type="submit" className="w-full bg-syntry-obsidian text-[#D4AF37] py-5 rounded-md font-medium tracking-tight text-xl hover:scale-[1.02] transition-all shadow-xl">
              Send Message
            </button>
          </form>
        </div>
      </main>
      <GlobalFooter />
    </div>
  );
};

export default ContactPage;
