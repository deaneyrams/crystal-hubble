"use client";
import React, { useState } from 'react';
import GlobalHeader from '@/components/GlobalHeader';
import GlobalFooter from '@/components/GlobalFooter';

const NotificationsPage = () => {
  const [filter, setFilter] = useState('All');

  const notifications = [
    {
      id: 1,
      type: 'Mortgage',
      title: "Your pre-approval letter is ready",
      message: "The Syntry Mortgage Enablement Team has issued your digital pre-approval for GH₵1,250,000.",
      time: "2 hours ago",
      action: "Download PDF",
      isNew: true
    },
    {
      id: 2,
      type: 'Property',
      title: "Advisor Review Completed",
      message: "Kwame has reviewed your interest in Aburi Hills Nodal Sector 4. Statutory reports are being prepared.",
      time: "5 hours ago",
      action: "View Tracker",
      isNew: false
    },
    {
      id: 3,
      type: 'System',
      title: "Document Verification Success",
      message: "Your Ghana Card and Payslips have been successfully verified across 8 technical layers.",
      time: "1 day ago",
      isNew: false
    }
  ];

  const filtered = filter === 'All' ? notifications : notifications.filter(n => n.type === filter);

  return (
    <div className="bg-[#F8F1E3] min-h-screen text-[#0F172A] font-sans">
      <GlobalHeader />

      <main className="pt-32 pb-20 px-4 md:px-8 max-w-4xl mx-auto">
        <header className="flex justify-between items-end mb-12">
          <div>
            <h1 className="text-4xl font-medium mb-2 tracking-tight">Notifications</h1>
            <p className="text-sm opacity-60">Stay synchronized with your sovereign portfolio updates.</p>
          </div>
          <button className="text-[10px] font-medium uppercase tracking-widest text-[#00BFFF] hover:underline">
            Mark all as read
          </button>
        </header>

        {/* Filter Tabs */}
        <div className="flex gap-6 border-b border-[#0F172A]/10 mb-8 overflow-x-auto no-scrollbar">
          {['All', 'Mortgage', 'Property', 'System'].map((tab) => (
            <button 
              key={tab}
              onClick={() => setFilter(tab)}
              className={`pb-4 text-xs font-medium uppercase tracking-widest relative whitespace-nowrap ${filter === tab ? 'text-[#0F172A]' : 'opacity-40'}`}
            >
              {tab}
              {filter === tab && <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#D4AF37]"></div>}
            </button>
          ))}
        </div>

        {/* Notification List */}
        <div className="space-y-4">
          {filtered.length > 0 ? (
            filtered.map((note) => (
              <div key={note.id} className={`bg-white border p-6 rounded-md shadow-sm flex gap-6 items-start transition-all ${note.isNew ? 'border-[#1D9E75]/30 bg-[#1D9E75]/5' : 'border-[#D4AF37]/10'}`}>
                <div className={`w-10 h-10 rounded-md flex items-center justify-center shrink-0 ${note.isNew ? 'bg-[#1D9E75] text-white' : 'bg-syntry-obsidian/5 text-[#0F172A]'}`}>
                  {note.type === 'Mortgage' && '💳'}
                  {note.type === 'Property' && '🏠'}
                  {note.type === 'System' && '⚙️'}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-1">
                    <h4 className="font-medium text-base">{note.title}</h4>
                    <span className="text-[10px] opacity-40 font-medium uppercase">{note.time}</span>
                  </div>
                  <p className="text-sm opacity-70 leading-relaxed mb-4">{note.message}</p>
                  {note.action && (
                    <button className="text-[#00BFFF] text-xs font-medium uppercase tracking-widest hover:underline flex items-center gap-2">
                      {note.action} ↗
                    </button>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="py-20 text-center space-y-4">
              <div className="text-4xl opacity-20">🍃</div>
              <p className="text-lg font-medium opacity-40 italic">You're all caught up!</p>
              <a href="/marketplace" className="text-[#00BFFF] text-xs font-medium uppercase tracking-widest inline-block">
                Browse Marketplace
              </a>
            </div>
          )}
        </div>
      </main>

      <GlobalFooter />
    </div>
  );
};

export default NotificationsPage;
