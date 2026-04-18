'use client';

import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

export default function NewsTicker() {
  const [messages, setMessages] = useState([
     "⚠️ ALERT: Tetteh Quarshie Bridge Expansion 40% Complete",
     "⚖️ REFORM: 70% Upfront Premium now mandatory for all Public Land Leases",
     "✅ NODE 08: Daily Asset Audit Active"
  ]);

  useEffect(() => {
    const fetchRecentVerifications = async () => {
      const { data, error } = await supabase
        .from('plots')
        .select('id, location, status')
        .eq('status', 'verified')
        .order('updated_at', { ascending: false })
        .limit(5);

      if (data && data.length > 0) {
        const liveMessages = data.map(plot => `🛡️ NODE 08: Plot ${plot.id} successfully verified and vaulted in ${plot.location} [100% Secure]`);
        setMessages(prev => [...liveMessages, ...prev].slice(0, 8));
      }
    };

    fetchRecentVerifications();

    // Real-time listener for newly verified plots
    const channel = supabase
      .channel('ticker-live')
      .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'plots', filter: "status=eq.verified" }, (payload) => {
         const newPlot = payload.new;
         setMessages(prev => [`🛡️ NODE 08: Plot ${newPlot.id} successfully verified and vaulted in ${newPlot.location} [100% Secure]`, ...prev].slice(0, 8));
      })
      .subscribe();

    return () => {
       supabase.removeChannel(channel);
    };
  }, []);

  return (
    <div className="fixed bottom-0 w-full bg-[#0D1B2A] border-t border-[#D4AF37]/30 backdrop-blur-md py-3 overflow-hidden z-[500]">
      <div className="whitespace-nowrap animate-ticker inline-block">
         <span className="flex gap-16 items-center text-xs font-mono uppercase tracking-widest text-[#2DD4BF]">
            {messages.map((msg, idx) => (
               <React.Fragment key={idx}>
                  <span>{msg}</span>
                  <span className="text-[#D4AF37] opacity-60">///</span>
               </React.Fragment>
            ))}
            {/* Duplicate for infinite seamless scroll */}
            {messages.map((msg, idx) => (
               <React.Fragment key={`dup-${idx}`}>
                  <span>{msg}</span>
                  <span className="text-[#D4AF37] opacity-60">///</span>
               </React.Fragment>
            ))}
         </span>
      </div>
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes custom-ticker {
           0% { transform: translateX(0); }
           100% { transform: translateX(-50%); }
        }
        .animate-ticker {
           animation: custom-ticker 40s linear infinite;
        }
      `}} />
    </div>
  );
}
