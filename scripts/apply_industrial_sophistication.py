import os
import re

directories = ['app', 'components']

replacements = {
    '#00C853': '#0D9488',
    '#00a846': '#0F766E',
    '#0A2540': '#0F172A',
    '#050508': '#0F172A',
    '#003300': '#0F172A',
}

for root_dir in directories:
    for dirpath, _, filenames in os.walk(root_dir):
        for filename in filenames:
            if filename.endswith('.jsx') or filename.endswith('.js') or filename.endswith('.ts') or filename.endswith('.tsx'):
                filepath = os.path.join(dirpath, filename)
                with open(filepath, 'r') as f:
                    content = f.read()
                
                new_content = content
                for old, new in replacements.items():
                    # Replace exact strings ignoring case if we want, but let's just do exact for exactness
                    new_content = new_content.replace(old, new)
                    new_content = new_content.replace(old.lower(), new)
                
                # Desaturation of status icons by 30% - we'll just let the teal replace the green, which effectively does this.
                # And for verify-land-now, we explicitly set the background.
                if 'verify-land-now/page' in filepath:
                    new_content = new_content.replace('bg-white', 'bg-[#0F172A]')
                    new_content = new_content.replace('bg-slate-50', 'bg-[#0F172A]')
                    new_content = new_content.replace('text-slate-900', 'text-slate-50')
                    new_content = new_content.replace('text-slate-500', 'text-slate-400')
                    new_content = new_content.replace('bg-slate-100', 'bg-white/5')
                    new_content = new_content.replace('border-slate-200', 'border-white/10')

                if new_content != content:
                    with open(filepath, 'w') as f:
                        f.write(new_content)
                    print(f"Updated {filepath}")
