"use client";
import React, { useState } from 'react';
import GlobalHeader from '@/components/GlobalHeader';
import GlobalFooter from '@/components/GlobalFooter';

const MyRequestsPage = () => {
  const [activeTab, setActiveTab] = useState('active');

  const requests = [
    {
      id: 1,
      title: "Aburi Hills Nodal Sector 4",
      status: "Interest Sent",
      date: "Dec 18, 2023",
      progress: 40,
      type: "Property Interest",
      img: "[Property Photo]"
    },
    {
      id: 2,
      title: "Legon Hills Serene Parcel",
      status: "Under Advisor Review",
      date: "Dec 15, 2023",
      progress: 60,
      type: "Mortgage Application",
      img: "[Property Photo]"
    }
  ];

  return (
    <div className="bg-[#F8F1E3] min-h-screen text-[#0F172A] font-sans">
      <GlobalHeader />

      <main className="pt-32 pb-20 px-4 md:px-8 max-w-7xl mx-auto">
        <header className="mb-12">
          <h1 className="text-4xl font-medium mb-4 tracking-tight">My Requests</h1>
          <p className="text-lg opacity-70 mb-8">Maintain statutory oversight of your property interests and mortgage progress.</p>
          
          {/* Tab Navigation */}
          <div className="flex gap-8 border-b border-[#0F172A]/10">
            <button 
              onClick={() => setActiveTab('active')}
              className={`pb-4 text-sm font-medium uppercase tracking-widest relative transition-all ${activeTab === 'active' ? 'text-[#0F172A]' : 'opacity-40 hover:opacity-100'}`}
            >
              Active Requests
              {activeTab === 'active' && <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#D4AF37]"></div>}
            </button>
            <button 
              onClick={() => setActiveTab('past')}
              className={`pb-4 text-sm font-medium uppercase tracking-widest relative transition-all ${activeTab === 'past' ? 'text-[#0F172A]' : 'opacity-40 hover:opacity-100'}`}
            >
              Past History
              {activeTab === 'past' && <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#D4AF37]"></div>}
            </button>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Requests List */}
          <div className="lg:col-span-2 space-y-6">
            {activeTab === 'active' ? (
              requests.map((req) => (
                <div key={req.id} className="bg-white border border-[#D4AF37]/20 p-6 rounded-md shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row gap-6 items-center">
                  <div className="w-full md:w-32 h-24 bg-syntry-obsidian/5 rounded-md flex items-center justify-center text-[8px] opacity-40 italic">
                    {req.img}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="text-[10px] font-medium text-[#D4AF37] uppercase tracking-widest">{req.type}</p>
                        <h3 className="text-xl font-medium">{req.title}</h3>
                      </div>
                      <span className="bg-[#1D9E75]/10 text-[#1D9E75] text-[10px] font-medium px-3 py-1 rounded-md uppercase tracking-tighter">
                        {req.status}
                      </span>
                    </div>
                    <p className="text-xs opacity-40 mb-4">Submitted on {req.date}</p>
                    
                    <div className="flex items-center gap-4">
                      <div className="flex-1 h-1 bg-syntry-obsidian/5 rounded-md overflow-hidden">
                        <div className="h-full bg-[#00BFFF]" style={{ width: `${req.progress}%` }}></div>
                      </div>
                      <span className="text-[10px] font-medium opacity-60">{req.progress}%</span>
                    </div>
                  </div>
                  <button className="w-full md:w-auto bg-syntry-obsidian text-[#F8F1E3] px-6 py-3 rounded-md font-medium text-xs hover:bg-[#004d00] transition-all">
                    View Tracker
                  </button>
                </div>
              ))
            ) : (
              <div className="py-20 text-center opacity-40 italic">No past history found.</div>
            )}
          </div>

          {/* Status Legend & Support */}
          <aside className="space-y-8">
            <div className="bg-syntry-obsidian text-[#F8F1E3] p-8 rounded-md shadow-xl border border-[#D4AF37]/20">
              <h4 className="font-medium text-lg mb-6 text-[#D4AF37]">Status Legend</h4>
              <ul className="space-y-4">
                <li className="flex gap-3">
                  <span className="w-1.5 h-1.5 bg-[#1D9E75] rounded-md mt-1.5"></span>
                  <div>
                    <p className="text-xs font-medium uppercase tracking-tight">Interest Sent</p>
                    <p className="text-[10px] opacity-60">Seller is being notified of your verified offer.</p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="w-1.5 h-1.5 bg-[#00BFFF] rounded-md mt-1.5"></span>
                  <div>
                    <p className="text-xs font-medium uppercase tracking-tight">Advisor Review</p>
                    <p className="text-[10px] opacity-60">Syntry facilitator is curating the statutory reports.</p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="w-1.5 h-1.5 bg-[#D4AF37] rounded-md mt-1.5"></span>
                  <div>
                    <p className="text-xs font-medium uppercase tracking-tight">Sent to Bank</p>
                    <p className="text-[10px] opacity-60">Mortgage documents are under institutional underwriting.</p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="bg-white border border-[#D4AF37]/20 p-8 rounded-md shadow-sm">
              <h4 className="font-medium text-lg mb-4">Need Assistance?</h4>
              <p className="text-xs opacity-60 mb-6 font-medium">Your dedicated advisor Kwame is monitoring your requests.</p>
              <a 
                href="https://wa.me/233531102292" 
                className="bg-[#25D366] text-white w-full py-4 rounded-md font-medium hover:scale-105 transition-all flex items-center justify-center gap-3 text-sm mb-4"
              >
                Chat via WhatsApp
              </a>
            </div>
          </aside>
        </div>
      </main>

      <GlobalFooter />
    </div>
  );
};

export default MyRequestsPage;
