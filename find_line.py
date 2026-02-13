
with open(r'c:\Users\home\projects\cam4me\src\App.jsx', 'r', encoding='utf-8') as f:
    lines = f.readlines()
    for i, line in enumerate(lines):
        if "if (currentScreen === 'ad_manager_dashboard')" in line:
            print(f"Found at line {i+1}")
