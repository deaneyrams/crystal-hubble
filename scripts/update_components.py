import re

def update_components():
    with open('components/InstitutionalDashboard.jsx', 'r') as f:
        text = f.read()

    # 1. Update NAV Logo
    old_nav_logo = '<span className="text-xl font-head font-black tracking-tight text-text-primary hidden md:block">Syntry.co</span>'
    new_nav_logo = '<span className="text-xl font-head font-black tracking-tight text-text-primary hidden md:block"><span className="font-mono text-accent-teal">Syn</span><span className="after:content-[\'_\'] after:animate-pulse">try</span>.co</span>'
    text = text.replace(old_nav_logo, new_nav_logo)

    # 2. Update Primary & Secondary Buttons
    # "Unlock Pro Analytics" -> Primary
    primary_btn_1 = 'bg-bg-base hover:bg-accent-teal text-text-primary hover:text-text-primary font-head font-black uppercase tracking-widest text-[10px] border border-accent-teal/50 rounded-btn transition-all shadow-xl'
    new_primary_1 = 'bg-accent-teal text-bg-base font-head font-bold uppercase tracking-widest text-[10px] rounded-btn hover:opacity-85 transition-all active:scale-95 shadow-[inset_0_1px_0_rgba(255,255,255,0.15)] flex justify-center items-center group'
    
    # We will just replace common button combinations with the new base styles where appropriate.
    # The 'Explore Verified Network' secondary button:
    old_exp = 'bg-transparent border-2 border-accent-teal text-accent-teal hover:bg-accent-teal hover:text-text-primary px-8 py-4 rounded-btn font-head font-bold uppercase tracking-widest text-xs transition-all w-full md:w-auto'
    new_exp = 'border border-accent-teal/30 text-accent-teal bg-transparent hover:bg-accent-teal/10 px-8 py-4 rounded-btn font-head font-bold uppercase tracking-widest text-xs transition-all w-full md:w-auto flex items-center justify-center'

    text = text.replace(old_exp, new_exp)

    # Another primary button
    old_auth = 'bg-gradient-to-br from-[#0D1B2A] to-gray-900 border border-accent-gold text-text-primary uppercase tracking-widest font-black rounded-btn hover:scale-[0.98] transition-transform shadow-[0_10px_20px_rgba(212,175,55,0.25)] text-xs'
    new_auth = 'bg-accent-teal text-bg-base font-head font-bold uppercase tracking-widest rounded-btn hover:opacity-85 transition-all active:scale-95 shadow-[inset_0_1px_0_rgba(255,255,255,0.15)] text-xs flex justify-center items-center group'
    text = text.replace(old_auth, new_auth)
    
    # Adding chevron to Send Magic Link text
    text = text.replace('Send Magic Link\n                           </button>', 'Send Magic Link <span className="ml-2 transition-transform group-hover:translate-x-1">›</span>\n                           </button>')

    # 3. Earn Cards Monograms (Replacing Emojis)
    # 💰 -> <span className="w-8 h-8 rounded-full bg-accent-gold/10 border border-accent-gold/20 flex items-center justify-center text-accent-gold font-mono text-[13px]">RP</span>
    text = text.replace('💰 Referral Payout Tracker', '<span className="w-8 h-8 rounded-full bg-accent-gold/10 border border-accent-gold/20 flex items-center justify-center text-accent-gold font-mono text-[13px] mr-2">RP</span> Referral Payout Tracker')
    
    # Vault 📈
    text = text.replace('text-2xl animate-pulse">📈</span>', 'w-8 h-8 rounded-full bg-accent-gold/10 border border-accent-gold/20 flex items-center justify-center text-accent-gold font-mono text-[13px] animate-pulse">VP</span>')

    # 4. Footer .border-glow 
    # Let's find the footer and add border-glow class.
    # Wait, the footer might be in a different file or inside InstitutionalDashboard.
    old_dock = 'border-t border-white/60 pb-[padding-bottom:env(safe-area-inset-bottom)]'
    new_dock = 'border-glow pb-[padding-bottom:env(safe-area-inset-bottom)]'
    text = text.replace(old_dock, new_dock)
    
    # 5. Fix remaining "font-mono border-l-2 border-accent-teal pl-3" for Eyebrow labels.
    # Current eyebrows: text-[10px] uppercase font-bold text-text-secondary tracking-widest
    old_eyebrow = 'text-[10px] uppercase font-bold text-text-secondary tracking-widest'
    new_eyebrow = 'font-mono text-accent-teal text-xs border-l-2 border-accent-teal pl-3 capitalize'
    text = text.replace(old_eyebrow, new_eyebrow)
    
    # Current eyebrows: text-[10px] text-text-muted uppercase tracking-widest font-bold
    old_eyebrow2 = 'text-[10px] text-text-muted uppercase tracking-widest font-bold'
    new_eyebrow2 = 'font-mono text-accent-teal text-xs border-l-2 border-accent-teal pl-3 capitalize'
    text = text.replace(old_eyebrow2, new_eyebrow2)

    with open('components/InstitutionalDashboard.jsx', 'w') as f:
        f.write(text)

if __name__ == '__main__':
    update_components()
