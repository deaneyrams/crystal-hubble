"use client";
import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

export default function GlobalHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    
    try {
      const handleScroll = () => {
        setIsScrolled(window.scrollY > 20);
      };
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    } catch (e) {
      console.warn("GlobalHeader scroll audit failed: window context missing.");
    }
  }, [mounted]);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const navLinks = [
    { label: 'HOME', href: '/' },
    { label: 'HOW IT WORKS', href: '/how-it-works' },
    { label: 'BUYING POWER', href: '/dashboard/pre-approval' },
    { label: 'MARKETPLACE', href: '/marketplace' },
    { label: 'MORTGAGE', href: '/mortgage' },
    { label: 'DIASPORA', href: '/diaspora' },
    { label: 'OWNERS', href: '/owners' },
    { label: 'INSTITUTIONS', href: '/institutions' },
    { label: 'PRICING', href: '/pricing' }
  ];

  if (!mounted) return null; // Absolute Safety Guard

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-[2000] h-20 transition-all duration-500 bg-[#003300] ${
          isScrolled 
            ? 'border-b border-[#D4AF37]/20 shadow-xl' 
            : 'border-b border-white/5'
        }`}
      >
        <div className="max-w-[1400px] mx-auto h-full px-6 flex items-center justify-between">
          
          {/* LOGO */}
          <a href="/" className="group flex items-center gap-0">
            <div className="flex items-center gap-0">
              <span className="text-2xl md:text-3xl font-bold tracking-tighter uppercase text-[#D4AF37]">SYN</span>
              <span className="text-2xl md:text-3xl font-bold tracking-tighter uppercase text-[#F8F1E3]">TRY</span>
            </div>
          </a>

          {/* DESKTOP NAV */}
          <nav className="hidden xl:flex items-center gap-6">
            {navLinks.map((link) => (
              <a 
                key={link.label} 
                href={link.href}
                className={`font-bold text-[8px] tracking-[2.5px] uppercase transition-all duration-300 hover:text-[#D4AF37] ${
                  pathname === link.href ? 'text-[#D4AF37]' : 'text-[#F8F1E3]/80'
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* ACTION */}
          <div className="flex items-center gap-6">
            <a href="/login" className="hidden lg:block text-[#F8F1E3]/60 font-bold text-[10px] uppercase tracking-widest hover:text-[#D4AF37] transition-all">
              Login
            </a>
            <a href="/verify-land-now" className="hidden md:block bg-[#D4AF37] text-[#003300] px-8 py-3.5 rounded-2xl font-bold text-[10px] uppercase tracking-[2px] hover:scale-105 transition-all shadow-xl shadow-[#D4AF37]/20">
              Verify Land Now – Free
            </a>
            
            {/* MOBILE TOGGLE */}
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="xl:hidden flex flex-col gap-1.5 p-2 z-50"
            >
              <div className={`w-6 h-0.5 bg-[#F8F1E3] transition-all ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <div className={`w-6 h-0.5 bg-[#F8F1E3] transition-all ${isMobileMenuOpen ? 'opacity-0' : ''}`} />
              <div className={`w-6 h-0.5 bg-[#F8F1E3] transition-all ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </button>
          </div>
        </div>
      </header>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            className="fixed inset-0 z-[1999] bg-[#003300] flex flex-col items-center justify-center p-8 xl:hidden"
          >
            <nav className="flex flex-col items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className={`text-2xl font-bold tracking-[3px] uppercase ${
                    pathname === link.href ? 'text-[#D4AF37]' : 'text-[#F8F1E3]/60'
                  }`}
                >
                  {link.label}
                </a>
              ))}
              <a href="/verify-land-now" className="mt-8 bg-[#D4AF37] text-[#003300] px-10 py-4 rounded-2xl font-bold text-sm uppercase tracking-widest">
                Verify Land Now – Free
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
