"use client";
import React from 'react';
import GlobalHeader from '../../../components/GlobalHeader';
import GlobalFooter from '../../../components/GlobalFooter';

const BankPartnerPortal = () => {
  const kpis = [
    { label: "Pending Profiles", value: "124", trend: "Review Required" },
    { label: "Verified Properties", value: "3,820", trend: "Mortgage Ready" },
    { label: "Verification Time Saved", value: "70%", trend: "Syntry Efficiency" }
  ];

  const buyers = [
    { id: 1, name: "Kwame Anokye", amount: "GH₵1,250,000", dti: "32%", status: "Fully Verified", date: "2h ago" },
    { id: 2, name: "Ama Serwaa", amount: "GH₵850,000", dti: "28%", status: "Docs Pending", date: "5h ago" }
  ];

  return (
    <div className="bg-[#f0f4f8] min-h-screen text-[#003300] font-sans">
      <GlobalHeader />

      <main className="pt-32 pb-20 px-4 md:px-8 max-w-7xl mx-auto">
        {/* Institutional Header */}
        <section className="mb-12 flex justify-between items-end bg-[#003300] text-[#F8F1E3] p-10 rounded-3xl border border-[#D4AF37]/20 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4AF37]/5 rounded-full blur-3xl -mr-32 -mt-32"></div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-[#D4AF37] mb-2">Institutional Partner</p>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Bank Partner Portal</h1>
            <p className="text-sm opacity-60">Welcome back, Republic Bank Ghana Underwriting Team.</p>
          </div>
          <div className="hidden md:block w-32 h-12 bg-white/10 rounded-lg flex items-center justify-center font-bold text-xs opacity-50 uppercase tracking-tighter">
            Bank Logo
          </div>
        </section>

        {/* Institutional KPI Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {kpis.map((kpi, i) => (
            <div key={i} className="bg-white border border-[#003300]/10 p-8 rounded-2xl shadow-sm">
              <p className="text-[10px] font-bold uppercase tracking-widest opacity-40 mb-2">{kpi.label}</p>
              <h3 className="text-3xl font-bold mb-1">{kpi.value}</h3>
              <p className="text-[10px] font-bold text-[#1D9E75] uppercase">{kpi.trend}</p>
            </div>
          ))}
        </div>

        {/* Incoming Buyer Profiles */}
        <section className="mb-16">
          <div className="flex justify-between items-end mb-8">
            <h2 className="text-2xl font-bold">Incoming Sovereign Buyer Profiles</h2>
            <button className="text-[#00BFFF] text-xs font-bold uppercase tracking-widest hover:underline">View Queue</button>
          </div>
          
          <div className="bg-white border border-[#003300]/10 rounded-3xl overflow-hidden shadow-sm">
            <table className="w-full text-left">
              <thead className="bg-[#003300]/5 text-[10px] font-bold uppercase tracking-widest opacity-60">
                <tr>
                  <th className="px-8 py-5">Buyer Name</th>
                  <th className="px-8 py-5">Pre-Approval</th>
                  <th className="px-8 py-5">DTI Ratio</th>
                  <th className="px-8 py-5">Status</th>
                  <th className="px-8 py-5 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="text-sm divide-y divide-[#003300]/5">
                {buyers.map((buyer) => (
                  <tr key={buyer.id} className="hover:bg-[#003300]/[0.02] transition-all">
                    <td className="px-8 py-6">
                      <p className="font-bold">{buyer.name}</p>
                      <p className="text-[10px] opacity-40">Received {buyer.date}</p>
                    </td>
                    <td className="px-8 py-6 font-bold text-[#D4AF37]">{buyer.amount}</td>
                    <td className="px-8 py-6 font-medium">{buyer.dti}</td>
                    <td className="px-8 py-6">
                      <span className={`text-[10px] font-bold uppercase px-2 py-1 rounded ${buyer.status === 'Fully Verified' ? 'bg-[#1D9E75]/10 text-[#1D9E75]' : 'bg-orange-100 text-orange-600'}`}>
                        {buyer.status}
                      </span>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <button className="bg-[#003300] text-white px-4 py-2 rounded-lg font-bold text-xs hover:bg-[#004d00] transition-all">
                        Review Profile
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Quick Institutional Actions */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          <button className="p-8 bg-white border border-[#00BFFF]/20 rounded-3xl font-bold text-left hover:border-[#00BFFF]/50 transition-all group">
            <p className="text-[10px] uppercase text-[#00BFFF] mb-2 tracking-[2px]">Admin</p>
            <h4 className="text-lg mb-4">Bulk Download Reports</h4>
            <div className="w-8 h-8 rounded-full bg-[#00BFFF]/10 flex items-center justify-center opacity-40 group-hover:opacity-100 transition-all text-[#00BFFF]">↓</div>
          </button>
          
          <button className="p-8 bg-white border border-[#D4AF37]/20 rounded-3xl font-bold text-left hover:border-[#D4AF37]/50 transition-all group">
            <p className="text-[10px] uppercase text-[#D4AF37] mb-2 tracking-[2px]">Dev Center</p>
            <h4 className="text-lg mb-4">Request API Integration</h4>
            <div className="w-8 h-8 rounded-full bg-[#D4AF37]/10 flex items-center justify-center opacity-40 group-hover:opacity-100 transition-all text-[#D4AF37]">⚙️</div>
          </button>

          <button className="p-8 bg-white border border-[#003300]/10 rounded-3xl font-bold text-left hover:border-[#003300]/50 transition-all group">
            <p className="text-[10px] uppercase text-[#003300] opacity-40 mb-2 tracking-[2px]">Liaison</p>
            <h4 className="text-lg mb-4">Contact Syntry Support</h4>
            <div className="w-8 h-8 rounded-full bg-[#003300]/10 flex items-center justify-center opacity-40 group-hover:opacity-100 transition-all text-[#003300]">👤</div>
          </button>
        </section>

        {/* Institutional Badge */}
        <section className="text-center py-12 border-t border-[#003300]/10">
           <div className="inline-flex items-center gap-4 bg-[#1D9E75]/5 px-8 py-4 rounded-full border border-[#1D9E75]/20">
              <span className="text-[#1D9E75] text-xl">⚡</span>
              <p className="text-sm font-bold text-[#1D9E75]">Syntry has reduced statutory verification time by 70% for your team.</p>
           </div>
        </section>
      </main>

      <GlobalFooter />
    </div>
  );
};

export default BankPartnerPortal;
