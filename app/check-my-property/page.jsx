'use client';
import { Suspense, useState, useRef } from 'react';
import GlobalHeader from '../../components/GlobalHeader';
import GlobalFooter from '../../components/GlobalFooter';

export default function CheckMyPropertyPage() {
  const [isVerifying, setIsVerifying] = useState(false);
  const [locationStatus, setLocationStatus] = useState('');
  const [coordinates, setCoordinates] = useState(null);
  const [inputType, setInputType] = useState('none'); // 'title', 'ghanapost', 'upload'

  const handleAutoDetect = () => {
    if (!navigator.geolocation) {
      setLocationStatus('Geolocation is not supported by your browser.');
      return;
    }
    
    setIsVerifying(true);
    setLocationStatus('Requesting access to orbital satellites...');
    
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude.toFixed(6);
        const lng = position.coords.longitude.toFixed(6);
        setCoordinates({ lat, lng });
        setLocationStatus(`GPS Locked: ${lat}, ${lng}. Indexing 8-Layer data...`);
        setIsVerifying(false);
        
        // Potential logic to show results or move to next step
      },
      (error) => {
        setIsVerifying(false);
        switch(error.code) {
          case error.PERMISSION_DENIED:
            setLocationStatus('Location access denied. Please enable GPS permissions.');
            break;
          case error.POSITION_UNAVAILABLE:
            setLocationStatus('Location information is unavailable.');
            break;
          case error.TIMEOUT:
            setLocationStatus('Location request timed out.');
            break;
          default:
            setLocationStatus('An unknown error occurred during detection.');
            break;
        }
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  };

  return (
    <Suspense fallback={<div className="bg-white min-h-screen" />}>
      <div className="bg-white min-h-screen text-slate-900 font-sans flex flex-col overflow-x-hidden">
        <GlobalHeader />

        <main className="flex-grow pt-32 pb-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* HERO SECTION: CLEAN LIGHT THEME */}
            <section className="py-20 md:py-32 text-center lg:text-left flex flex-col lg:flex-row items-center gap-16">
              <div className="lg:w-3/5 space-y-8 animate-in fade-in slide-in-from-left-8 duration-700">
                
                <div className="inline-flex items-center gap-2 bg-[#00C853]/10 px-4 py-2 rounded-full border border-[#00C853]/20">
                  <span className="w-1.5 h-1.5 bg-[#00C853] rounded-full animate-pulse shadow-[0_0_8px_#00C853]"></span>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#00C853]">Protocol v4.0 Active</span>
                </div>

                <h1 className="text-4xl md:text-6xl lg:text-[72px] font-black leading-[1.05] tracking-tight text-slate-900">
                  Check My Property – <br />
                  <span className="text-[#00C853]">Instant 8-Layer Verification</span>
                </h1>
                
                <p className="text-lg md:text-xl text-slate-500 font-medium leading-relaxed max-w-2xl">
                  Auto-detect your GPS • Get land history • AI document analysis • <span className="text-slate-900 font-bold border-b-2 border-[#00C853]/30">Zero Litigation Check</span>
                </p>

                <div className="flex flex-col gap-6">
                  {/* Primary Action */}
                  <div className="relative group max-w-md">
                    <button 
                      onClick={handleAutoDetect}
                      disabled={isVerifying}
                      className="w-full bg-[#00C853] text-white px-8 py-6 rounded-2xl font-black text-lg md:text-xl shadow-[0_20px_40px_-10px_rgba(0,200,83,0.3)] hover:shadow-[0_25px_50px_-10px_rgba(0,200,83,0.4)] hover:-translate-y-1 transition-all flex items-center justify-center gap-3 disabled:opacity-70 border-b-4 border-[#00a846]"
                    >
                      {isVerifying ? (
                        <span className="flex items-center gap-2">
                           <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                           Detecting...
                        </span>
                      ) : (
                        <>📍 Auto-Detect My Location & Coordinates</>
                      )}
                    </button>
                    
                    {locationStatus && (
                      <div className={`mt-4 p-4 rounded-xl text-sm font-bold flex items-center gap-3 animate-in slide-in-from-top-2 ${coordinates ? 'bg-[#00C853]/10 text-[#00C853] border border-[#00C853]/20' : 'bg-slate-50 text-slate-500 border border-slate-200'}`}>
                        {coordinates ? '✅' : '📡'} {locationStatus}
                      </div>
                    )}
                  </div>

                  {/* Secondary Actions */}
                  <div className="flex flex-wrap gap-3">
                    <button 
                      onClick={() => setInputType('title')} 
                      className="bg-white border-2 border-slate-200 text-slate-600 px-6 py-3 rounded-xl font-bold text-sm hover:border-[#00C853] hover:text-[#00C853] transition-all hover:shadow-md"
                    >
                      Enter Title Number
                    </button>
                    <button 
                      onClick={() => setInputType('ghanapost')} 
                      className="bg-white border-2 border-slate-200 text-slate-600 px-6 py-3 rounded-xl font-bold text-sm hover:border-[#00C853] hover:text-[#00C853] transition-all hover:shadow-md"
                    >
                      Enter GhanaPost GPS
                    </button>
                    <button 
                      onClick={() => setInputType('upload')} 
                      className="bg-white border-2 border-slate-200 text-slate-600 px-6 py-3 rounded-xl font-bold text-sm hover:border-[#00C853] hover:text-[#00C853] transition-all hover:shadow-md"
                    >
                      Upload Documents
                    </button>
                  </div>

                  <p className="text-[12px] font-bold text-slate-400 uppercase tracking-[2px] flex items-center gap-2">
                    <span className="text-lg">⏱️</span> Takes &lt;60 seconds • Results sent to WhatsApp & Email
                  </p>
                </div>
              </div>

              {/* Decorative Visual side */}
              <div className="hidden lg:flex lg:w-2/5 justify-center relative">
                <div className="absolute inset-0 bg-[#00C853]/5 rounded-full blur-[120px] -z-10"></div>
                <div className="w-full aspect-square bg-slate-50 rounded-[4rem] border border-slate-100 shadow-inner p-12 relative overflow-hidden flex flex-col justify-between group">
                  <div className="flex justify-between items-start">
                    <div className="w-16 h-16 bg-white rounded-2xl shadow-sm border border-slate-100 flex items-center justify-center text-3xl">🏛️</div>
                    <div className="px-4 py-2 bg-[#00C853]/10 text-[#00C853] rounded-xl text-[10px] font-black uppercase tracking-widest border border-[#00C853]/20">Sovereign Secured</div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="h-2 w-3/4 bg-slate-200 rounded-full"></div>
                    <div className="h-2 w-1/2 bg-slate-200 rounded-full opacity-60"></div>
                    <div className="h-32 w-full bg-slate-100 rounded-2xl mt-12 overflow-hidden border border-slate-200 relative">
                       <div className="absolute inset-0 bg-[radial-gradient(#00C853_1px,transparent_1px)] [background-size:20px_20px] opacity-10"></div>
                       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-[#00C853] rounded-full border-4 border-white shadow-xl animate-bounce"></div>
                    </div>
                  </div>

                  <div className="flex gap-4">
                     <div className="flex-1 h-3 bg-[#00C853] rounded-full"></div>
                     <div className="flex-1 h-3 bg-[#00C853] rounded-full"></div>
                     <div className="flex-1 h-3 bg-slate-200 rounded-full"></div>
                  </div>
                </div>

                {/* Satellite Tags */}
                <div className="absolute -top-6 -right-6 bg-white border border-slate-100 p-4 rounded-2xl shadow-xl animate-bounce duration-[3000ms]">
                   <p className="text-[8px] font-black text-[#00C853] uppercase tracking-widest mb-1 font-mono">Sat Link Active</p>
                   <p className="text-xs font-bold text-slate-900">GA-LOC: 301.2</p>
                </div>
              </div>
            </section>

          </div>
        </main>

        <GlobalFooter />
      </div>
    </Suspense>
  );
}
