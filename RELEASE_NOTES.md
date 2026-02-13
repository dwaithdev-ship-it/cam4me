# Project Release Notes - Cam4Me

## 1. Project Overview
**Cam4Me** is a hyper-local community engagement platform designed for mobile users. It allows users to view local feeds, post updates, and interact with community categories. The project includes specialized dashboards for **Ad Managers** and **System Admins**.

---

## 2. User Roles & Access
| Role | Access URL | Features |
| :--- | :--- | :--- |
| **User** | `/` | Home Feed, Profile Setup, Post Updates (Media + Text), Category Filtering. |
| **Ad Manager** | `/ad-manager` | Create/Manage targeted ads, set date ranges, upload media, target specific locations. |
| **Admin** | `/admin` | User management (Block/Delete), Master Data management (States/Cities), Analytics dashboard. |

---

## 3. Technical Stack & Dependencies
### Core Technologies:
- **Frontend**: React (v19), Vite (v7)
- **Database**: Firebase Realtime Database & Firestore (Backup)
- **Authentication**: Firebase Auth (Email/Social)
- **Mobile Integration**: Capacitor (Android/iOS support)
- **Media**: ImageKit (Image optimization)

### Dependencies (package.json):
- `@capacitor/core`, `@capacitor/camera`, `@capacitor/geolocation`, `@capacitor/preferences`
- `firebase`, `react`, `react-dom`
- `imagekit`, `react-loader-spinner`
- `vite` (Dev server)

---

## 4. Key Processes & Flows

### A. Authentication & Profile Setup (Optimized)
- **Sign-Up**: Users register via Email/Password. The process is non-blocking (instantly navigates to Profile Setup) while database writes happen in the background.
- **Sign-In**: Uses **Local Storage Caching**. The app shows the User Feed immediately using cached profile data while syncing with Firebase in the background.
- **Ad Manager UI Refinement**: Removed redundant "Active" badges from ad banners in the manager dashboard for a cleaner, less cluttered interface.
- **Real Email OTP for Password Security**: Integrated **EmailJS** to send 6-digit verification codes for both "Forgot Password" and "Change Password" flows. This ensures a higher level of security by requiring multi-step verification before password updates are permitted.
- **Feed Media Visibility & Video Support**: Resolved an issue where photos and videos were not appearing in the user's latest post. Optimized video playback for mobile browsers (Safari/Chrome) with auto-play compatibility.
- **Profile Image Optimization**: Profile photos are automatically compressed (max 800px) on the client-side to ensure lightning-fast uploads on mobile networks.
- **Optimistic Navigation**: Profile setup transitions are instant; the "Continue" button moves to the next screen immediately while data persists in the background.
- **One-Device Policy**: Accounts are locked to the first device used (except for Admins) to ensure security.

### B. Home Feed & Posting
- **Smart Filtering**: Feed logic cross-references the user's selected location against `City`, `District`, `State`, `Mandal`, and `Village` fields of posts.
- **Media Upload**: Supports compressed images and videos with progress tracking.

### C. Ad Management
- **Targeting**: Ads can be "Global" or "Targeted" to specific regions.
- **Scheduling**: Supports Start/End date-time pickers with custom UI for mobile-friendly interaction.

---

## 5. Performance & Mobile Access

### Performance Enhancements:
- **Zero-Latency Login**: IP detection and non-critical profile syncs are now non-blocking background tasks.
- **Image Preloading**: Critical assets (Welcome logos) are pre-imported and pre-loaded to prevent "flicker".
- **Compact UI**: Ad Manager and Admin forms are optimized for small mobile screens (reduced padding, responsive flex layouts).

### Mobile Access (Development):
- **Command**: `npm run dev` (starts on port 5173 with `--host` flag).
- **Access**: Mobile devices on the same Wi-Fi must use the computer's **Local IP** (e.g., `http://192.168.x.x:5173`).
- **Public Tunnel**: Use `npm run share` for a public `serveo.net` link if Wi-Fi access is blocked by firewalls.
- **Production URL**: [https://cam4me-project.web.app](https://cam4me-project.web.app) (Successfully Deployed)

---

## 6. Troubleshooting
- **Port Conflict**: If port 5173 is in use, kill the process using `netstat -ano | findstr :5173` and `taskkill /F /PID <PID>`.
- **Firewall**: Ensure port 5173 is allowed in Windows Firewall for IP-based mobile access.
- **Broken Images**: Ensure logos are located in `src/assets/` and explicitly imported in `App.jsx`.

---
*Generated: February 10, 2026*
