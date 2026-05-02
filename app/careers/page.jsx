"use client";
import React from 'react';
import GlobalHeader from '@/components/GlobalHeader';
import GlobalFooter from '@/components/GlobalFooter';
import "../globals.css";

const CareersPage = () => {
  const jobs = [
    { title: "Protocol Engineer", type: "Full-Time", loc: "Accra / Remote", desc: "Build the underlying 8-Layer Statutory Exchange logic." },
    { title: "Geospatial Data Scientist", type: "Full-Time", loc: "Remote", desc: "Optimize our satellite geofencing and cadastral matching algorithms." },
    { title: "Institutional Sales Lead", type: "Commission", loc: "Accra", desc: "Onboard major banks and real estate funds to the Syntry Node." }
  ];

  return (
    <div className="bg-[#0F172A] min-h-screen text-white font-sans">
      <GlobalHeader />
      <main className="pt-40 pb-20 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-24">
          <h1 className="text-6xl md:text-[8rem] font-medium tracking-tight italic tracking-tighter leading-none mb-8">Join the <span className="text-[#0D9488]">Sovereign.</span></h1>
          <p className="text-xl md:text-2xl text-slate-400 font-medium max-w-2xl mx-auto">
            We are building the trust layer of the world's most resilient real estate markets. Join us in Accra or remotely.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {jobs.map((job, i) => (
            <div key={i} className="bg-white/5 border border-white/10 p-10 rounded-[2.5rem] hover:border-[#0D9488]/40 hover:bg-[#0D9488]/5 transition-all group">
              <div className="text-[10px] font-medium tracking-tight uppercase tracking-widest text-[#0D9488] mb-4">{job.type} • {job.loc}</div>
              <h3 className="text-3xl font-medium mb-6 italic">{job.title}</h3>
              <p className="text-slate-400 font-medium leading-relaxed mb-10">{job.desc}</p>
              <button onClick={() => alert('Sending application interest to careers@syntry.co')} className="w-full bg-white text-black py-4 rounded-xl font-medium hover:bg-[#0D9488] hover:text-white transition-all shadow-lg">
                Apply Now
              </button>
            </div>
          ))}
        </div>

        <div className="mt-32 border-t border-white/5 pt-20 text-center">
          <h2 className="text-3xl font-medium mb-6 italic">Don't see a fit?</h2>
          <p className="text-lg text-slate-500 mb-8 font-medium">We are always looking for visionary engineers, surveyors, and analysts.</p>
          <a href="mailto:careers@syntry.co" className="text-[#0D9488] text-xl font-medium underline underline-offset-[10px] hover:text-white transition-colors">
            Send an open inquiry →
          </a>
        </div>
      </main>
      <GlobalFooter />
    </div>
  );
};

export default CareersPage;
