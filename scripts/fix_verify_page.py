import os

filepath = 'app/verify-land-now/page.jsx'
with open(filepath, 'r') as f:
    content = f.read()

# Replace hard borders
content = content.replace('border-slate-100', 'border-white/10')

# Make nested cards glassmorphic instead of solid obsidian
content = content.replace('bg-[#0F172A]', 'bg-white/5 backdrop-blur-md')
# BUT wait! We want the main background to be #0F172A.
# Let's be careful.
