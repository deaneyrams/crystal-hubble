import os

directories = ['app', 'components']

replacements = {
    'font-black': 'font-medium tracking-tight',
    'font-extrabold': 'font-medium tracking-tight',
    'font-bold': 'font-medium',
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
                    new_content = new_content.replace(old, new)
                
                if new_content != content:
                    with open(filepath, 'w') as f:
                        f.write(new_content)
                    print(f"Updated typography in {filepath}")
