import os
import re

def update_api_calls():
    # Root directory for searching
    root_dir = '/home/dell/.gemini/antigravity/playground/crystal-hubble'
    targets = ['app', 'components']
    
    # Pattern to match fetch('/api/...')
    # It looks for fetch('/api/ followed by any characters until the closing quote
    pattern = re.compile(r"fetch\(['\"]/api/([^'\"]*?)['\"]")
    replacement = r"fetch(`${process.env.NEXT_PUBLIC_API_URL || ''}/api/\1`"

    for target in targets:
        target_path = os.path.join(root_dir, target)
        for dirpath, _, filenames in os.walk(target_path):
            for filename in filenames:
                if filename.endswith(('.jsx', '.js', '.tsx', '.ts')):
                    filepath = os.path.join(dirpath, filename)
                    with open(filepath, 'r', encoding='utf-8') as f:
                        content = f.read()
                    
                    new_content = pattern.sub(replacement, content)
                    
                    if new_content != content:
                        print(f"Updating {filepath}")
                        with open(filepath, 'w', encoding='utf-8') as f:
                            f.write(new_content)

if __name__ == '__main__':
    update_api_calls()
