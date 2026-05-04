'use client';
import React, { useState } from 'react';
import GlobalHeader from '../../components/GlobalHeader';
import GlobalFooter from '../../components/GlobalFooter';

export default function RegisterPage() {
  const [activeTab, setActiveTab] = useState('signup');
  const [showPassword, setShowPassword] = useState(false);
  const [isTermsAccepted, setIsTermsAccepted] = useState(false);
  const [authError, setAuthError] = useState('');

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    if (!isTermsAccepted) {
      setAuthError('You must agree to the Terms & Privacy Policy to continue.');
      return;
    }
    setAuthError('');
    // Logic for signup here
    console.log("Signup submitted");
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    // Logic for login here
    console.log("Login submitted");
  };

  const SocialAuthButtons = ({ mode }) => (
    <div className="space-y-3">
      <button 
        type="button" 
        onClick={() => console.log(`${mode} with Google`)}
        className="w-full flex items-center justify-center gap-3 bg-white border-2 border-slate-200 text-slate-700 py-3.5 rounded-md font-medium hover:bg-slate-50 hover:border-slate-300 transition-all group"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="group-hover:scale-110 transition-transform">
          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
        </svg>
        Continue with Google
      </button>
      <button 
        type="button" 
        onClick={() => console.log(`${mode} with Apple`)}
        className="w-full flex items-center justify-center gap-3 bg-slate-900 border-2 border-slate-900 text-white py-3.5 rounded-md font-medium hover:bg-slate-800 hover:border-slate-800 transition-all shadow-md group"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="group-hover:scale-110 transition-transform">
          <path d="M16.365 1.488C15.426 1.488 14.28 2.062 13.568 2.864c-.655.736-1.127 1.83-1.127 2.864h.013c.961 0 2.22-.628 2.888-1.39.585-.68 1.096-1.745 1.096-2.736-.013-.013-.053-.027-.073-.114zM16.892 5.952c-1.282.027-2.458.831-3.126.831-.669 0-1.701-.736-2.825-.723-1.47.013-2.825.856-3.587 2.193-1.55 2.71-1.1s 6.848.428 9.471C8.25 18.98 9.387 20.304 10.844 20.33c1.376.027 1.964-.83 3.557-.83 1.576 0 2.097.803 3.543.83 1.483.027 2.458-1.162 3.06-2.031.575-.923 1.002-1.872 1.002-1.926-.027-.013-1.804-.696-1.83-2.75-.013-1.725 1.403-2.553 1.47-2.592-1.323-1.926-3.328-1.939-3.754-1.979z"/>
        </svg>
        Continue with Apple
      </button>
    </div>
  );

  return (
    <div className="bg-slate-50 min-h-screen text-slate-900 font-sans flex flex-col">
      <GlobalHeader />

      <main className="flex-grow flex items-center justify-center pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        
        <div className="w-full max-w-6xl flex flex-col lg:flex-row items-center lg:items-stretch justify-center gap-16 lg:gap-24">
            
            {/* Left Column: Auth Card */}
            <div className="w-full max-w-[480px] flex flex-col justify-center relative">
           
           {/* Header / Intro */}
           <div className="text-center mb-8">
              <div className="inline-block bg-syntry-teal-600/10 p-3 rounded-md mb-6 border border-[#0D9488]/20 shadow-sm">
                 <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="#0D9488"/>
                    <path d="M2 17L12 22L22 17M2 12L12 17L22 12" stroke="#0D9488" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                 </svg>
              </div>
              <h1 className="text-2xl md:text-3xl font-medium tracking-tight tracking-tight text-slate-900 mb-2">
                 Welcome to Syntry
              </h1>
              <p className="text-slate-500 font-medium">Your Sovereign Property Exchange</p>
           </div>

           {/* Main Tabbed Container */}
           <div className="bg-white border border-slate-200 rounded-[2rem] shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] overflow-hidden">
              
              {/* Tab Switcher */}
              <div className="flex border-b border-slate-100 bg-slate-50/50">
                 <button 
                   onClick={() => { setActiveTab('login'); setAuthError(''); }}
                   className={`flex-1 py-5 text-sm font-medium uppercase tracking-wider transition-colors relative ${activeTab === 'login' ? 'text-slate-900' : 'text-slate-400 hover:text-slate-600'}`}
                 >
                    Log In
                    {activeTab === 'login' && <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-syntry-teal-600 rounded-t-full"></div>}
                 </button>
                 <button 
                   onClick={() => { setActiveTab('signup'); setAuthError(''); }}
                   className={`flex-1 py-5 text-sm font-medium uppercase tracking-wider transition-colors relative ${activeTab === 'signup' ? 'text-slate-900' : 'text-slate-400 hover:text-slate-600'}`}
                 >
                    Sign Up
                    {activeTab === 'signup' && <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-syntry-teal-600 rounded-t-full"></div>}
                 </button>
              </div>

              {/* Tab Content */}
              <div className="p-8 md:p-10">
                 {activeTab === 'login' ? (
                   <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                     <form className="space-y-5" onSubmit={handleLoginSubmit}>
                       
                       <div>
                         <label className="block text-sm font-medium text-slate-900 mb-2">Email or Phone/WhatsApp</label>
                         <input 
                           type="text" 
                           placeholder="Enter your credential" 
                           className="w-full bg-slate-50 border border-slate-200 text-slate-900 px-4 py-3.5 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0D9488]/50 focus:border-[#0D9488] transition-all font-medium placeholder-slate-400"
                         />
                       </div>

                       <div>
                         <label className="block text-sm font-medium text-slate-900 mb-2">Password</label>
                         <div className="relative">
                           <input 
                             type={showPassword ? "text" : "password"} 
                             placeholder="••••••••" 
                             className="w-full bg-slate-50 border border-slate-200 text-slate-900 px-4 py-3.5 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0D9488]/50 focus:border-[#0D9488] transition-all font-medium placeholder-slate-400 pr-16"
                           />
                           <button 
                             type="button"
                             onClick={() => setShowPassword(!showPassword)}
                             className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 font-medium text-[11px] uppercase tracking-wider"
                           >
                             {showPassword ? 'Hide' : 'Show'}
                           </button>
                         </div>
                       </div>

                       <div className="flex items-center justify-between mt-2">
                         <label className="flex items-center gap-2 cursor-pointer group">
                           <div className="border border-slate-300 w-5 h-5 rounded flex items-center justify-center transition-colors group-hover:border-[#0D9488]">
                             <input type="checkbox" className="hidden" />
                             {/* Custom checkbox visual */}
                             <div className="w-3 h-3 bg-syntry-teal-600 rounded-sm opacity-0 group-active:opacity-50"></div>
                           </div>
                           <span className="text-sm font-medium text-slate-600 select-none group-hover:text-slate-900 transition-colors">Remember me</span>
                         </label>
                         <a href="/reset-password" className="text-sm font-medium text-syntry-teal-600 hover:text-[#0F766E] transition-colors">Forgot Password?</a>
                       </div>

                       <div className="pt-2">
                         <button type="submit" className="w-full bg-syntry-teal-600 text-white py-4 rounded-md font-medium text-lg hover:bg-[#0F766E] transition-colors shadow-[0_10px_20px_-10px_rgba(0,200,83,0.4)]">
                           Log In
                         </button>
                       </div>

                     </form>

                     <div className="flex items-center gap-4 my-8">
                       <div className="h-px bg-slate-100 flex-1"></div>
                       <span className="text-[10px] font-medium text-slate-400 uppercase tracking-widest text-center whitespace-nowrap">Or Secure Login Via</span>
                       <div className="h-px bg-slate-100 flex-1"></div>
                     </div>

                     <SocialAuthButtons mode="Login" />

                     <div className="mt-8 text-center">
                       <a href="/admin/login" className="text-xs font-medium text-slate-400 hover:text-slate-600 transition-colors underline underline-offset-4 decoration-slate-200 hover:decoration-slate-400">
                         Staff / Developer Login
                       </a>
                     </div>
                   </div>
                 ) : (
                   <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                     <form className="space-y-4" onSubmit={handleSignupSubmit}>
                       
                       {authError && (
                         <div className="bg-red-50 border border-red-100 text-red-600 text-[13px] font-medium py-3 px-4 rounded-md mb-4 animate-in fade-in duration-300">
                           ⚠️ {authError}
                         </div>
                       )}

                       <div>
                         <label className="block text-sm font-medium text-slate-900 mb-1.5">Full Name</label>
                         <input 
                           type="text" 
                           placeholder="Kwame Mensah" 
                           className="w-full bg-slate-50 border border-slate-200 text-slate-900 px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0D9488]/50 focus:border-[#0D9488] transition-all font-medium placeholder-slate-400"
                         />
                       </div>

                       <div>
                         <label className="block text-sm font-medium text-slate-900 mb-1.5">Email Address</label>
                         <input 
                           type="email" 
                           placeholder="kwame@example.com" 
                           className="w-full bg-slate-50 border border-slate-200 text-slate-900 px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0D9488]/50 focus:border-[#0D9488] transition-all font-medium placeholder-slate-400"
                         />
                       </div>

                       <div>
                         <label className="block text-sm font-medium text-slate-900 mb-1.5">WhatsApp / Phone Number</label>
                         <div className="flex border border-slate-200 rounded-md overflow-hidden focus-within:ring-2 focus-within:ring-[#0D9488]/50 focus-within:border-[#0D9488] transition-all">
                           <div className="bg-slate-100 px-4 py-3 border-r border-slate-200 flex items-center justify-center text-slate-600 font-medium whitespace-nowrap">
                             +233
                           </div>
                           <input 
                             type="tel" 
                             placeholder="53 110 2292" 
                             className="w-full bg-slate-50 text-slate-900 px-4 py-3 focus:outline-none font-medium placeholder-slate-400"
                           />
                         </div>
                       </div>

                       <div>
                         <label className="block text-sm font-medium text-slate-900 mb-1.5">Password</label>
                         <div className="relative">
                           <input 
                             type={showPassword ? "text" : "password"} 
                             placeholder="••••••••" 
                             className="w-full bg-slate-50 border border-slate-200 text-slate-900 px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0D9488]/50 focus:border-[#0D9488] transition-all font-medium placeholder-slate-400 pr-16"
                           />
                           <button 
                             type="button"
                             onClick={() => setShowPassword(!showPassword)}
                             className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 font-medium text-[11px] uppercase tracking-wider"
                           >
                             {showPassword ? 'Hide' : 'Show'}
                           </button>
                         </div>
                       </div>
                       
                       <div>
                         <label className="block text-sm font-medium text-slate-900 mb-1.5">Confirm Password</label>
                         <input 
                           type={showPassword ? "text" : "password"} 
                           placeholder="••••••••" 
                           className="w-full bg-slate-50 border border-slate-200 text-slate-900 px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0D9488]/50 focus:border-[#0D9488] transition-all font-medium placeholder-slate-400"
                         />
                       </div>

                       <div>
                         <label className="block text-sm font-medium text-slate-900 mb-1.5">I am a...</label>
                         <div className="relative">
                           <select defaultValue="" className="w-full bg-slate-50 border border-slate-200 text-slate-900 px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0D9488]/50 focus:border-[#0D9488] transition-all font-medium appearance-none">
                             <option value="" disabled>Select your account type</option>
                             <option value="owner">Property Owner</option>
                             <option value="diaspora">Diaspora Investor</option>
                             <option value="developer">Real Estate Developer</option>
                             <option value="institution">Institution / Bank / Fund</option>
                             <option value="staff">Staff / Developer</option>
                           </select>
                           <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                             <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6l6-6"/></svg>
                           </div>
                         </div>
                       </div>

                       <div className="pt-2">
                         <label className="flex items-start gap-3 cursor-pointer group">
                           <div className={`relative flex items-center justify-center w-6 h-6 mt-0.5 rounded border-2 transition-all ${isTermsAccepted ? 'border-[#0D9488] bg-syntry-teal-600' : 'border-slate-300 bg-slate-50 group-hover:border-[#0D9488]'}`}>
                             <input 
                               type="checkbox" 
                               className="absolute opacity-0 cursor-pointer w-full h-full z-10" 
                               checked={isTermsAccepted}
                               onChange={(e) => {
                                 setIsTermsAccepted(e.target.checked);
                                 if (e.target.checked) setAuthError('');
                               }}
                             />
                             <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" className={`transition-transform duration-300 ${isTermsAccepted ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`}>
                                <polyline points="20 6 9 17 4 12"></polyline>
                             </svg>
                           </div>
                           <span className="text-[13px] font-medium text-slate-600 leading-snug select-none group-hover:text-slate-900 transition-colors">
                             I agree to the <a href="/legal/accord" className="text-syntry-teal-600 font-medium hover:underline">Terms of Service</a>, <a href="/privacy" className="text-syntry-teal-600 font-medium hover:underline">Privacy Policy</a>, and consent to digital KYC processing.
                           </span>
                         </label>
                       </div>

                       <div className="pt-4">
                         <button 
                           type="submit" 
                           className={`w-full py-4 rounded-md font-medium text-lg transition-all shadow-[0_10px_20px_-10px_rgba(0,200,83,0.4)] ${isTermsAccepted ? 'bg-syntry-teal-600 text-white hover:bg-[#0F766E]' : 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none'}`}
                         >
                           Create Free Account
                         </button>
                       </div>

                     </form>

                     <div className="flex items-center gap-4 my-8">
                       <div className="h-px bg-slate-100 flex-1"></div>
                       <span className="text-[10px] font-medium text-slate-400 uppercase tracking-widest text-center whitespace-nowrap">Or Secure Sign Up Via</span>
                       <div className="h-px bg-slate-100 flex-1"></div>
                     </div>

                     <SocialAuthButtons mode="Sign Up" />

                     <div className="mt-8 text-center text-sm font-medium text-slate-500">
                       Already have an account? <button type="button" onClick={() => setActiveTab('login')} className="text-syntry-teal-600 font-medium hover:underline focus:outline-none">Log In</button>
                     </div>
                   </div>
                 )}
              </div>

           </div>

           {/* Security Badges Moved Up for Visibility */}
           <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
             <div className="flex items-center gap-1.5 bg-green-50 border border-green-100 px-2 py-1 rounded text-[9px] font-medium text-syntry-teal-600 uppercase tracking-wider">
               <span className="w-1.5 h-1.5 bg-syntry-teal-600 rounded-md animate-pulse"></span> Verified Security Layer Active
             </div>
             <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 px-2 py-1 rounded text-[9px] font-medium text-slate-500 uppercase tracking-wider">
               Powered by AWS
             </div>
             <div className="flex items-center gap-1.5 bg-syntry-teal-600/5 border border-[#0D9488]/20 px-2 py-1 rounded text-[9px] font-medium text-syntry-teal-600 uppercase tracking-wider">
               8 Layers Protected
             </div>
           </div>

           {/* Trust Bar Below Card */}
           <div className="mt-10 text-center">
              <div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-3 text-[11px] font-medium text-slate-400 uppercase tracking-widest bg-white border border-slate-200 py-3 px-6 rounded-md shadow-sm">
                 <span className="flex items-center gap-2"><span className="text-syntry-teal-600">✓</span> 8 Layers of Grounded Truth</span>
                 <span className="hidden md:block text-slate-300">•</span>
                 <span className="flex items-center gap-2"><span className="text-syntry-teal-600">✓</span> Zero Litigation</span>
                 <span className="hidden md:block text-slate-300">•</span>
                 <span className="flex items-center gap-2"><span className="text-syntry-teal-600">✓</span> Bank-Level Security</span>
              </div>
           </div>

        </div>

        {/* Right Column: Trust & Support Sidebar */}
        <div className="w-full max-w-lg flex flex-col justify-center">
               
               <div className="mb-10 text-center lg:text-left">
                  <h2 className="text-3xl md:text-4xl font-medium tracking-tight tracking-tight text-slate-900 mb-4 animate-in fade-in slide-in-from-right-4 duration-500">
                     Why thousands of Ghanaians trust Syntry
                  </h2>
                  <p className="text-slate-500 font-medium text-lg leading-relaxed">
                     The only protocol engineered to eliminate land fraud through immutable sovereign validation.
                  </p>
               </div>

               <div className="space-y-6 mb-12">
                  {[
                    { icon: '🛡️', title: 'Zero Litigation Guarantee', desc: '8-Layer audit shields assets from native and statutory claims.' },
                    { icon: '💰', title: 'Automated Rent Routing', desc: 'Direct MoMo and Bank API transfers on the 1st of every month.' },
                    { icon: '📈', title: 'Real-time Valuation', desc: 'Track your portfolio against live sovereign market indices.' },
                    { icon: '🏦', title: 'Bank Ready APY', desc: 'Instantly qualify for institutional mortgage liquidity.' }
                  ].map((feature, i) => (
                    <div key={i} className="flex items-start gap-5 group">
                      <div className="w-12 h-12 rounded-md bg-syntry-teal-600/10 text-syntry-teal-600 flex items-center justify-center text-xl flex-shrink-0 shadow-sm border border-[#0D9488]/20 group-hover:scale-110 transition-transform">
                        {feature.icon}
                      </div>
                      <div>
                        <h4 className="font-medium text-slate-900 mb-1 lg:text-lg group-hover:text-syntry-teal-600 transition-colors">{feature.title}</h4>
                        <p className="text-sm text-slate-500 font-medium leading-relaxed">{feature.desc}</p>
                      </div>
                    </div>
                  ))}
               </div>

               {/* Trust Testimonial */}
               <div className="bg-white border border-slate-200 p-8 rounded-md shadow-sm mb-12 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-syntry-teal-600/5 rounded-bl-full -mr-10 -mt-10 group-hover:scale-110 transition-transform duration-700"></div>
                  <p className="text-slate-600 font-medium italic mb-6 relative z-10 text-[15px] leading-relaxed">
                     "Syntry’s immutable title verification saved us GH₵40,000 in potential litigation fees on a single transaction in East Legon."
                  </p>
                  <div className="flex items-center gap-4 relative z-10">
                     <div className="w-10 h-10 bg-slate-100 rounded-md flex items-center justify-center font-medium text-slate-600 text-xs border border-slate-200">TA</div>
                     <div>
                        <p className="font-medium text-slate-900 text-sm">Theophilus Asare</p>
                        <p className="text-[11px] text-syntry-teal-600 font-medium uppercase tracking-wider">Independent Developer</p>
                     </div>
                  </div>
               </div>

               {/* Need Help CTA */}
               <div className="bg-slate-900 rounded-[2rem] p-8 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-syntry-teal-600/15 rounded-bl-[4rem] -mr-10 -mt-10 group-hover:scale-110 transition-transform duration-700"></div>
                  <div className="relative z-10 text-center sm:text-left">
                     <h3 className="text-white font-medium mb-1.5 text-lg">Need help getting started?</h3>
                     <p className="text-slate-400 text-sm font-medium">Our onboarding team answers in 2 minutes.</p>
                  </div>
                  <a href="https://wa.me/233531102292" className="relative z-10 bg-syntry-teal-600 text-white px-6 py-3.5 rounded-md text-sm font-medium shadow-[0_10px_20px_-10px_rgba(0,200,83,0.4)] hover:bg-[#0F766E] transition-colors whitespace-nowrap flex items-center gap-2 group-hover:scale-105">
                     <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.052.005C5.495.005.158 5.346.155 11.907a11.78 11.78 0 0 0 1.579 5.894L0 24l6.357-1.667a11.8 11.8 0 0 0 5.69 1.46h.005c6.554 0 11.895-5.34 11.898-11.903a11.82 11.82 0 0 0-3.486-8.414z"/></svg>
                     053 110 2292
                  </a>
               </div>

        </div>

      </div>
      </main>

      {/* Mini Auth Footer */}
      <footer className="w-full bg-slate-100/50 border-t border-slate-200 py-6 mt-10">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs font-medium text-slate-500">© 2026 Syntry.co. Guaranteed cryptographic land certainty.</p>
            <div className="flex items-center flex-wrap justify-center gap-4 lg:gap-6 text-[11px] lg:text-xs font-medium text-slate-400 font-sans">
               <a href="/how-it-works" className="hover:text-slate-900 transition-colors pointer-events-auto">How it Works</a>
               <a href="/marketplace" className="hover:text-slate-900 transition-colors pointer-events-auto">Marketplace</a>
               <a href="/owners" className="hover:text-slate-900 transition-colors pointer-events-auto">Owners</a>
               <a href="/diaspora" className="hover:text-slate-900 transition-colors pointer-events-auto">Diaspora</a>
               <a href="/institutions" className="hover:text-slate-900 transition-colors pointer-events-auto">Institutions</a>
               <a href="/pricing" className="hover:text-slate-900 transition-colors pointer-events-auto">Pricing</a>
            </div>
         </div>
      </footer>
    </div>
  );
}
