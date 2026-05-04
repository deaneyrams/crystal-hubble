"use client";
import React from 'react';
import GlobalHeader from '../../../components/GlobalHeader';
import GlobalFooter from '../../../components/GlobalFooter';
import "../../globals.css";

export default function AdminLoginPage() {
  return (
    <div className="bg-syntry-obsidian min-h-screen text-white font-sans flex flex-col">
      <GlobalHeader />

      <main className="flex-grow flex items-center justify-center pt-32 pb-20 px-4">
        <div className="w-full max-w-md bg-white/5 border border-white/10 rounded-[2.5rem] p-10 backdrop-blur-xl shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-syntry-teal-600/10 rounded-bl-full blur-3xl group-hover:scale-150 transition-transform duration-1000"></div>
          
          <div className="text-center mb-8 relative z-10">
            <h1 className="text-3xl font-medium tracking-tight tracking-tight mb-2">Institutional Access</h1>
            <p className="text-slate-400 font-medium italic">Sovereign Node Auth Required</p>
          </div>

          <form className="space-y-6 relative z-10" onSubmit={(e) => { e.preventDefault(); window.location.href = "/admin/command-center"; }}>
            <div>
              <label className="block text-[10px] font-medium uppercase tracking-widest text-slate-500 mb-2 pl-2">Node Identifier</label>
              <input type="text" placeholder="NODE-XX-YYYY" required className="w-full bg-white/10 border border-white/10 rounded-md px-6 py-4 focus:outline-none focus:border-[#0D9488] transition-all font-mono text-sm" />
            </div>
            <div>
              <label className="block text-[10px] font-medium uppercase tracking-widest text-slate-500 mb-2 pl-2">Encryption Key</label>
              <input type="password" placeholder="••••••••••••" required className="w-full bg-white/10 border border-white/10 rounded-md px-6 py-4 focus:outline-none focus:border-[#0D9488] transition-all font-mono text-sm" />
            </div>

            <button type="submit" className="w-full bg-syntry-teal-600 text-white py-4 rounded-md font-medium tracking-tight text-lg hover:bg-[#0F766E] transition-all shadow-[0_15px_30px_-10px_rgba(0,200,83,0.3)]">
              Authorize Node Access
            </button>
          </form>

          <div className="mt-8 text-center relative z-10">
            <a href="/login" className="text-xs font-medium text-slate-500 hover:text-white transition-colors">Standard User Login →</a>
          </div>
        </div>
      </main>

      <GlobalFooter />
    </div>
  );
}
