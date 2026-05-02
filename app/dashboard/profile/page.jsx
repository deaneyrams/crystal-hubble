"use client";
import React from 'react';
import GlobalHeader from '@/components/GlobalHeader';
import GlobalFooter from '@/components/GlobalFooter';

const MyProfilePage = () => {
  const user = {
    name: "Kwame Anokye",
    status: "Syntry Verified Member",
    purchasingPower: "GH₵1,250,000",
    verifiedProperties: 3,
    activeInterests: 2,
    mortgageApps: 1
  };

  const personalInfo = [
    { label: "Full Name", value: "Kwame Anokye" },
    { label: "Phone Number", value: "+233 53 110 2292" },
    { label: "Email Address", value: "k.anokye@domain.com" },
    { label: "Ghana Card", value: "GHA-722100XXX-1" }
  ];

  const documents = [
    { name: "Ghana Card (National ID)", expiry: "Oct 2028", status: "Verified" },
    { name: "Proof of Income (3 Mo.)", expiry: "Dec 2023", status: "Verified" },
    { name: "Bank Statements", expiry: "Jan 2024", status: "Verified" },
    { name: "SSNIT Statement", expiry: "N/A", status: "Verified" }
  ];

  return (
    <div className="bg-[#F8F1E3] min-h-screen text-[#0F172A] font-sans">
      <GlobalHeader />

      <main className="pt-32 pb-20 px-4 md:px-8 max-w-4xl mx-auto">
        {/* Profile Header */}
        <section className="mb-12 flex flex-col md:flex-row items-center gap-8 text-center md:text-left">
          <div className="w-32 h-32 bg-[#0F172A] text-[#D4AF37] rounded-full flex items-center justify-center text-4xl font-medium border-4 border-[#D4AF37]/20 shadow-xl">
            KA
          </div>
          <div>
            <h1 className="text-4xl font-medium mb-2 tracking-tight">{user.name}</h1>
            <div className="flex items-center gap-2 justify-center md:justify-start">
              <span className="w-2 h-2 bg-[#1D9E75] rounded-full animate-pulse"></span>
              <p className="text-xs font-medium uppercase tracking-widest text-[#1D9E75]">{user.status}</p>
            </div>
          </div>
        </section>

        {/* Account Overview Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {[
            { l: "Purchasing Power", v: user.purchasingPower, c: "text-[#D4AF37]" },
            { l: "Verified Plots", v: user.verifiedProperties, c: "text-[#0F172A]" },
            { l: "Mortgage Apps", v: user.mortgageApps, c: "text-[#00BFFF]" },
            { l: "Active Interests", v: user.activeInterests, c: "text-[#0F172A]" }
          ].map((stat, i) => (
            <div key={i} className="bg-white border border-[#D4AF37]/10 p-6 rounded-2xl shadow-sm">
              <p className="text-[10px] font-medium uppercase tracking-widest opacity-40 mb-1">{stat.l}</p>
              <p className={`text-sm md:text-lg font-medium ${stat.c}`}>{stat.v}</p>
            </div>
          ))}
        </div>

        {/* Info & Documents */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white border border-[#D4AF37]/20 p-8 rounded-3xl shadow-sm">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-sm font-medium uppercase tracking-widest text-[#D4AF37]">Personal Information</h3>
              <button className="text-[#00BFFF] text-[10px] font-medium uppercase tracking-widest hover:underline">Edit</button>
            </div>
            <div className="space-y-6">
              {personalInfo.map((info, i) => (
                <div key={i} className="border-b border-[#0F172A]/5 pb-4 last:border-0 last:pb-0">
                  <p className="text-[10px] opacity-40 uppercase font-medium mb-1">{info.label}</p>
                  <p className="text-sm font-medium">{info.value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white border border-[#D4AF37]/20 p-8 rounded-3xl shadow-sm">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-sm font-medium uppercase tracking-widest text-[#D4AF37]">Linked Documents</h3>
              <button className="text-[#00BFFF] text-[10px] font-medium uppercase tracking-widest hover:underline">Vault</button>
            </div>
            <div className="space-y-4">
              {documents.map((doc, i) => (
                <div key={i} className="flex justify-between items-center p-3 bg-[#F8F1E3]/50 rounded-xl border border-[#0F172A]/5">
                  <div>
                    <p className="text-xs font-medium mb-1">{doc.name}</p>
                    <p className="text-[10px] opacity-40 font-medium uppercase">Exp: {doc.expiry}</p>
                  </div>
                  <span className="text-[9px] font-medium bg-[#1D9E75]/10 text-[#1D9E75] px-2 py-1 rounded-full uppercase tracking-tighter">
                    {doc.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Security & Preferences */}
        <div className="bg-[#0F172A] text-[#F8F1E3] p-10 rounded-[3rem] border border-[#D4AF37]/20 shadow-2xl mb-12">
          <h3 className="text-2xl font-medium mb-10">Security & Preferences</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">Two-Factor Auth</p>
                  <p className="text-xs opacity-60">WhatsApp & Email alerts active</p>
                </div>
                <div className="w-10 h-5 bg-[#D4AF37] rounded-full relative">
                  <div className="absolute right-1 top-1 w-3 h-3 bg-[#0F172A] rounded-full"></div>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <p className="font-medium">Change Sovereign PIN</p>
                <button className="text-[#D4AF37] text-xs font-medium uppercase tracking-widest hover:underline">Manage</button>
              </div>
            </div>
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <p className="font-medium">Preferred Banks</p>
                <div className="flex gap-2">
                   <span className="bg-white/10 px-2 py-1 rounded text-[10px] font-medium">Ecobank</span>
                   <span className="bg-white/10 px-2 py-1 rounded text-[10px] font-medium">Republic</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <p className="font-medium">Login History</p>
                <button className="text-[#D4AF37] text-xs font-medium uppercase tracking-widest hover:underline">View</button>
              </div>
            </div>
          </div>
        </div>

        {/* Support & Action */}
        <div className="flex flex-col md:flex-row gap-4 mb-20">
           <a href="https://wa.me/233531102292" className="flex-1 bg-[#25D366] text-white p-6 rounded-2xl font-medium flex items-center justify-center gap-4 hover:scale-[1.02] transition-all">
             Chat with Support Advisor
           </a>
           <button className="flex-1 border-2 border-[#D4AF37] text-[#0F172A] p-6 rounded-2xl font-medium flex items-center justify-center gap-4 hover:bg-[#D4AF37]/5 transition-all">
             Download Verified Profile
           </button>
        </div>

        {/* Danger Zone */}
        <div className="border-t border-[#0F172A]/10 pt-12 text-center md:text-left">
          <button className="text-red-500 text-xs font-medium uppercase tracking-widest opacity-60 hover:opacity-100 transition-opacity">
            Permanent Account Deletion
          </button>
          <p className="text-[10px] opacity-40 mt-2 font-medium">All 8-layer verification data and sovereign credentials will be revoked immediately.</p>
        </div>
      </main>

      <GlobalFooter />
    </div>
  );
};

export default MyProfilePage;
