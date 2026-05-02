"use client";
import React, { useState } from 'react';
import GlobalHeader from '@/components/GlobalHeader';
import GlobalFooter from '@/components/GlobalFooter';

const SupportTicketsPage = () => {
  const [activeTab, setActiveTab] = useState('All');

  const tickets = [
    { id: "SR-8291", subject: "Question about Mortgage Pre-Approval", status: "In Progress", date: "Oct 24, 2023", update: "2 hours ago", category: "Mortgage" },
    { id: "SR-8120", subject: "Plot verification timeline for Aburi", status: "Resolved", date: "Oct 20, 2023", update: "1 day ago", category: "Verification" },
    { id: "SR-8005", subject: "MoMo payment verification fail", status: "Open", date: "Oct 18, 2023", update: "3 days ago", category: "Billing" }
  ];

  const filteredTickets = activeTab === 'All' ? tickets : tickets.filter(t => t.status === activeTab);

  return (
    <div className="bg-[#fdfcf9] min-h-screen text-[#0F172A] font-sans">
      <GlobalHeader />

      <main className="pt-32 pb-20 px-4 md:px-8 max-w-5xl mx-auto">
        <header className="mb-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div>
            <h1 className="text-4xl font-medium tracking-tight mb-2">Support Tickets</h1>
            <p className="opacity-60 text-sm font-medium">Manage your statutory and technical inquiries.</p>
          </div>
          <button className="bg-[#00BFFF] text-[#0F172A] px-10 py-4 rounded-2xl font-medium text-xs uppercase tracking-widest hover:scale-[1.02] transition-all shadow-xl">
             New Ticket
          </button>
        </header>

        {/* Filters */}
        <div className="flex gap-4 border-b border-[#0F172A]/5 mb-10 pb-2 overflow-x-auto no-scrollbar">
           {['All', 'Open', 'In Progress', 'Resolved'].map(tab => (
             <button 
               key={tab}
               onClick={() => setActiveTab(tab)}
               className={`px-6 py-2 rounded-full text-[10px] font-medium uppercase tracking-widest transition-all whitespace-nowrap ${activeTab === tab ? 'bg-[#0F172A] text-white' : 'opacity-40 hover:opacity-100 italic'}`}
             >
               {tab}
             </button>
           ))}
        </div>

        {/* Ticket List */}
        <div className="space-y-4 mb-16">
          {filteredTickets.length > 0 ? (
            filteredTickets.map((ticket) => (
               <div key={ticket.id} className="bg-white border border-[#0F172A]/5 p-8 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-8 shadow-sm group hover:border-[#D4AF37]/20 transition-all">
                  <div className="flex gap-6 items-center w-full md:w-2/3">
                     <div className="w-12 h-12 bg-[#0F172A]/5 rounded-full flex items-center justify-center text-xs font-medium text-[#D4AF37]">#</div>
                     <div>
                        <h4 className="font-medium text-base mb-1 group-hover:text-[#D4AF37] transition-all">{ticket.subject}</h4>
                        <p className="text-[10px] font-medium opacity-40 uppercase tracking-[2px]">{ticket.id} • {ticket.category}</p>
                     </div>
                  </div>
                  <div className="text-center md:text-right w-full md:w-auto">
                     <span className={`text-[9px] font-medium uppercase px-4 py-1.5 rounded-full mb-2 inline-block ${
                       ticket.status === 'Resolved' ? 'bg-[#1D9E75]/10 text-[#1D9E75]' : 
                       ticket.status === 'In Progress' ? 'bg-orange-50 text-orange-500' : 'bg-blue-50 text-blue-500'
                     }`}>
                       {ticket.status}
                     </span>
                     <p className="text-[9px] font-medium opacity-30 uppercase tracking-widest leading-none">Updated {ticket.update}</p>
                  </div>
               </div>
            ))
          ) : (
            <div className="py-32 text-center opacity-40 italic border-2 border-dashed border-[#0F172A]/5 rounded-[3rem]">
               <p className="text-4xl mb-4">📬</p>
               <h3 className="text-xl font-medium">No tickets yet.</h3>
               <p className="text-xs">Need help? Open a new ticket or chat with us below.</p>
            </div>
          )}
        </div>

        {/* Quick Help Section */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
           <div className="bg-white border border-[#0F172A]/5 p-10 rounded-[2.5rem] shadow-sm flex flex-col justify-between">
              <div>
                 <h4 className="text-sm font-medium uppercase tracking-widest opacity-40 mb-4">Statutory FAQ</h4>
                 <p className="text-lg font-medium mb-6 italic">Quick answers to common property and mortgage questions.</p>
              </div>
              <a href="/dashboard/support" className="text-[10px] font-medium text-[#D4AF37] uppercase tracking-widest hover:underline">Browse FAQ Library</a>
           </div>
           
           <div className="bg-[#25D366] text-white p-10 rounded-[2.5rem] shadow-xl flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
              <div>
                 <h4 className="text-sm font-medium uppercase tracking-widest opacity-60 mb-4">Live Liaison</h4>
                 <p className="text-lg font-medium mb-6 italic">Direct chat with a mortgage or property advisor.</p>
              </div>
              <a href="https://wa.me/233531102292" className="bg-white text-[#25D366] py-3 rounded-xl font-medium text-[10px] uppercase tracking-widest text-center hover:scale-[1.02] transition-all">
                 WhatsApp 0531102292
              </a>
           </div>
        </section>
      </main>

      <GlobalFooter />
    </div>
  );
};

export default SupportTicketsPage;
