"use client";
import React from 'react';

export default function GlobalFooter() {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);
  const footerLinks = {
    company: [
      { label: 'ABOUT SYNTRY', href: '/vision' },
      { label: 'CAREERS', href: '/careers' },
      { label: 'CONTACT', href: '/contact' }
    ],
    product: [
      { label: 'HOW IT WORKS', href: '/how-it-works' },
      { label: 'MARKETPLACE', href: '/marketplace' },
      { label: 'CHECK MY PROPERTY', href: '/check-my-property' },
      { label: 'MORTGAGE ENABLEMENT', href: '/mortgage' }
    ],
    forYou: [
      { label: 'FOR DIASPORA', href: '/diaspora' },
      { label: 'FOR OWNERS', href: '/owners' },
      { label: 'FOR INSTITUTIONS', href: '/institutions' }
    ],
    resources: [
      { label: 'FAQ', href: '/support' },
      { label: 'MARKET INSIGHTS', href: '/invest' },
      { label: 'API DOCUMENTATION', href: '/partner/api-docs' },
      { label: 'SECURITY COMMAND', href: '/security' }
    ],
    legal: [
      { label: 'PRIVACY PROTOCOL', href: '/privacy' },
      { label: 'LEGAL ACCORD', href: '/legal/accord' },
      { label: 'STATUTORY AUDIT', href: '/how-it-works' }
    ]
  };

  if (!mounted) return <div className="min-h-[400px] bg-[#0F172A] min-h-screen" />; // Safety Ghost Shell

  return (
    <footer className="bg-[#0F172A] pt-32 pb-16 px-6 overflow-hidden border-t border-white/5 relative z-10">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-16 lg:gap-12 mb-24 text-center md:text-left">
          
          {/* Column 1: Company */}
          <div className="space-y-8">
            <h4 className="text-[#D4AF37] font-sans text-[11px] uppercase tracking-[4px] font-medium">Company</h4>
            <ul className="flex flex-col gap-5">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-[10px] font-sans tracking-[2px] text-white/30 hover:text-[#D4AF37] transition-colors uppercase font-medium">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2: Product */}
          <div className="space-y-8">
            <h4 className="text-[#D4AF37] font-sans text-[11px] uppercase tracking-[4px] font-medium">Product</h4>
            <ul className="flex flex-col gap-5">
              {footerLinks.product.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-[10px] font-sans tracking-[2px] text-white/30 hover:text-[#D4AF37] transition-colors uppercase font-medium">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: For You */}
          <div className="space-y-8">
            <h4 className="text-[#D4AF37] font-sans text-[11px] uppercase tracking-[4px] font-medium">For You</h4>
            <ul className="flex flex-col gap-5">
              {footerLinks.forYou.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-[10px] font-sans tracking-[2px] text-white/30 hover:text-[#D4AF37] transition-colors uppercase font-medium">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Resources */}
          <div className="space-y-8">
            <h4 className="text-[#D4AF37] font-sans text-[11px] uppercase tracking-[4px] font-medium">Resources</h4>
            <ul className="flex flex-col gap-5">
              {footerLinks.resources.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-[10px] font-sans tracking-[2px] text-white/30 hover:text-[#D4AF37] transition-colors uppercase font-medium">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 5: Legal */}
          <div className="space-y-8">
            <h4 className="text-[#D4AF37] font-sans text-[11px] uppercase tracking-[4px] font-medium">Legal</h4>
            <ul className="flex flex-col gap-5">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-[10px] font-sans tracking-[2px] text-white/30 hover:text-[#D4AF37] transition-colors uppercase font-medium">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Contact & Statutory Block */}
        <div className="pt-20 border-t border-white/5 flex flex-col items-center text-center space-y-12">
           <div className="space-y-4">
              <h3 className="text-white text-2xl font-medium italic tracking-tight uppercase">Call or WhatsApp 0531102292 | info@syntry.co</h3>
              <div className="flex justify-center items-center gap-8 opacity-40 grayscale hover:grayscale-0 transition-all">
                 <span className="text-white text-[10px] border border-white/20 px-3 py-1 rounded">MTN MoMo</span>
                 <span className="text-white text-[10px] border border-white/20 px-3 py-1 rounded">Vodafone Cash</span>
                 <span className="text-white text-[10px] border border-white/20 px-3 py-1 rounded">Bank Transfer</span>
              </div>
           </div>

           <div className="flex flex-col md:flex-row items-center justify-between w-full pt-12 gap-8">
              <p className="font-mono text-[9px] tracking-[3px] text-white/20 uppercase">
                © 2026 Syntry.co • Built for Ghana. Designed for the Future.
              </p>
              <div className="flex items-center gap-4">
                 <div className="flex gap-1 h-3">
                    <div className="w-4 bg-red-600"></div>
                    <div className="w-4 bg-yellow-400"></div>
                    <div className="w-4 bg-green-700"></div>
                 </div>
                 <span className="font-mono text-[9px] tracking-[2px] text-[#D4AF37] uppercase font-medium tracking-tight">
                    Verified Security Layer Active
                 </span>
              </div>
           </div>
        </div>
      </div>
    </footer>
  );
}
