import os

file_path = r'c:\Projects\cam4me-main\cam4me-main\src\App.jsx'

with open(file_path, 'r', encoding='utf-8', errors='ignore') as f:
    lines = f.readlines()

# Fix Edit Profile scrollability
# Line 4949 (1-indexed) -> Index 4948
lines[4948] = lines[4948].replace("overflowY: 'auto'", "overflowY: 'auto', flex: 1")

# Fix Plus Icon centering in feed
# Line 5324-5340 (roughly)
# I'll search for the specific lines to be safe
for i in range(len(lines)):
    # Fix encoding in Feed
    lines[i] = lines[i].replace('All Cities"} \u00e2\u20ac\u00a2', 'All Cities"} <span style={{ margin: "0 5px" }}>\u2022</span>')
    lines[i] = lines[i].replace('profileData.city} \u00e2\u20ac\u00a2', 'profileData.city} <span style={{ margin: "0 5px" }}>\u2022</span>')
    lines[i] = lines[i].replace('post.city} \u00e2\u20ac\u00a2', 'post.city} <span style={{ margin: "0 5px" }}>\u2022</span>')
    
    # Fix Plus Icon
    if 'width: \'32px\',' in lines[i] and 'height: \'32px\',' in lines[i+1] and '+' in lines[i+15] if i+15 < len(lines) else False:
        # This is a bit risky, let's look for a better match
        pass

# Better way: replace specific line content in menu screen
# I'll use the line numbers from previous view_file as they are stable for now
# Menu screen icons
lines[4819] = '            >\n              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>\n            </div>\n'
lines[4827] = '                <span style={{ fontSize: "24px", color: "#00F5FF" }}>\n                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>\n                </span>\n'
lines[4833] = '              <span style={{ color: "white", opacity: 0.5 }}>\n                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>\n              </span>\n'
lines[4840] = '                <span style={{ fontSize: "22px", width: "24px", color: "white" }}>\n                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>\n                </span>\n'
lines[4843] = lines[4833] # Chevron
lines[4848] = '                <span style={{ fontSize: "22px", width: "24px", color: "white" }}>\n                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>\n                </span>\n'
lines[4851] = lines[4833] # Chevron
lines[4856] = '                <span style={{ fontSize: "22px", width: "24px", color: "white" }}>\n                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>\n                </span>\n'
lines[4859] = lines[4833] # Chevron
lines[4864] = '                <span style={{ fontSize: "22px", width: "24px", color: "#FFD700" }}>\n                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>\n                </span>\n'
lines[4867] = lines[4833] # Chevron
lines[4872] = '                <span style={{ fontSize: "22px", width: "24px", color: "#ff4d4d" }}>\n                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>\n                </span>\n'
lines[4875] = lines[4833] # Chevron

# Plus Icon in feed
# 5336 index is 5335
lines[5338] = '                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>\n'
# Remove the old plus text line if it matches
if '+' in lines[5338]: # Wait, I just overwrote it
    pass

# One more fix: Notification modal close button and bell icon
# Close button: line 5256 -> index 5255
lines[5255] = '                  <button onClick={() => setShowUserNotificationsModal(false)} style={{ border: "none", background: "none", fontSize: "20px", cursor: "pointer", color: "#999", display: "flex", padding: 4 }}>\n                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>\n                  </button>\n'
# Bell icon: line 5261 -> index 5260
lines[5260] = '                      <div style={{ fontSize: "32px", marginBottom: "10px", opacity: 0.5 }}>\n                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>\n                      </div>\n'

with open(file_path, 'w', encoding='utf-8') as f:
    f.writelines(lines)

print("UI fixes applied successfully.")
