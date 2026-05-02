"use client";

import { useState, useEffect } from 'react';

const slides = [
  {
    title: "Slide 1: The New Law",
    content: "Welcome to Syntry. Per the March 2026 Ministerial Reform, all public land leases now require a 70% upfront premium. We make this payment safe.",
    icon: (
      <svg className="w-16 h-16 text-[#00F5D4]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    )
  },
  {
    title: "Slide 2: The Escrow Vault",
    content: "When you pay your premium, your funds aren't sent to a person—they are locked in our Stripe-powered Escrow Vault. Your status will turn 'Gold (Reserved)'.",
    icon: (
      <svg className="w-16 h-16 text-[#FFD700]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    )
  },
  {
    title: "Slide 3: The Ministerial Key",
    content: "Our system waits for the mandatory Ministerial Oversight ID. Once your application is approved by the Minister (a legal requirement as of today), the 70% is released to the state, and your Sovereign Deed is minted.",
    icon: (
      <svg className="w-16 h-16 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-4.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
      </svg>
    )
  },
  {
    title: "Slide 4: Your Digital Form 5",
    content: "Your final Deed is a Revised Form 5 instrument, fully compliant with the 2026 digital portal. You are now the verified owner of a high-growth asset.",
    icon: (
      <svg className="w-16 h-16 text-[#00F5D4]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    )
  }
];

export default function OnboardingWalkthrough() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const hasSeenOnboarding = localStorage.getItem('syntry_onboarding_seen');
    if (!hasSeenOnboarding) {
      setIsVisible(true);
    }
  }, []);

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      setIsVisible(false);
      localStorage.setItem('syntry_onboarding_seen', 'true');
    }
  };

  const handleSkip = () => {
    setIsVisible(false);
    localStorage.setItem('syntry_onboarding_seen', 'true');
  };

  if (!isVisible) return null;

  const activeSlide = slides[currentSlide];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-[#050810]/95 backdrop-blur-md animate-in fade-in duration-500"></div>
      
      {/* Modal content */}
      <div className="relative w-full max-w-lg bg-[#0E1629] border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl animate-in zoom-in-95 duration-500 overflow-hidden group">
        
        {/* Animated Glow Backdrops */}
        <div className="absolute -top-24 -left-24 w-64 h-64 bg-indigo-600/20 rounded-full blur-[100px] animate-pulse"></div>
        <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-[#00F5D4]/10 rounded-full blur-[100px] animate-pulse"></div>

        <div className="relative z-10 flex flex-col items-center text-center">
          
          {/* Progress Dots */}
          <div className="flex gap-2 mb-10">
            {slides.map((_, i) => (
              <div 
                key={i} 
                className={`h-1 rounded-full transition-all duration-500 ${i === currentSlide ? 'w-8 bg-[#00F5D4]' : 'w-2 bg-white/10'}`}
              ></div>
            ))}
          </div>

          {/* Icon with Animation Key */}
          <div className="mb-8 p-6 rounded-2xl bg-white/5 border border-white/5 shadow-inner">
             {activeSlide.icon}
          </div>

          <h2 className="text-2xl md:text-3xl font-medium text-white mb-6 tracking-tight">
            {activeSlide.title.split(': ')[1]}
          </h2>
          
          <p className="text-gray-400 text-lg leading-relaxed mb-12 min-h-[120px]">
            {activeSlide.content}
          </p>

          <div className="flex flex-col w-full gap-4">
            <button 
              onClick={handleNext}
              className="w-full bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white font-medium py-4 rounded-xl transition-all duration-300 shadow-[0_0_20px_rgba(79,70,229,0.3)] hover:scale-[1.02] active:scale-95 border border-indigo-400/30"
            >
              {currentSlide === slides.length - 1 ? 'Get Started' : 'Continue Walkthrough'}
            </button>
            <button 
              onClick={handleSkip}
              className="w-full text-gray-500 hover:text-white text-sm font-semibold tracking-widest uppercase transition-colors py-2"
            >
              Skip Onboarding
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
