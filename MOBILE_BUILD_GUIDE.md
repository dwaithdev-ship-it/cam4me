# CAM4ME Mobile Build Guide

## 📱 Android Build Steps

### Prerequisites
- ✅ Android Studio installed
- ✅ Java JDK 11 or higher
- ✅ Android SDK installed via Android Studio

### Step 1: Build Web Assets
```powershell
npm run build
```

### Step 2: Sync Capacitor
```powershell
npx cap sync android
```

### Step 3: Add Firebase to Android

1. **Download google-services.json**
   - Go to Firebase Console → Project Settings
   - Under "Your apps" section, find your Android app (or add one)
   - Click "Add app" → Select Android icon
   - Enter package name: `com.cam4me.app` (or your package name)
   - Download `google-services.json`
   - Place it in: `android/app/google-services.json`

2. **Update android/build.gradle** (project level)
   ```gradle
   buildscript {
       dependencies {
           classpath 'com.google.gms:google-services:4.4.0'
       }
   }
   ```

3. **Update android/app/build.gradle** (app level)
   Add at the bottom:
   ```gradle
   apply plugin: 'com.google.gms.google-services'
   ```

### Step 4: Open in Android Studio
```powershell
npx cap open android
```

### Step 5: Build APK in Android Studio
1. Wait for Gradle sync to complete
2. Go to **Build** → **Build Bundle(s) / APK(s)** → **Build APK(s)**
3. Once done, click "locate" to find your APK
4. Install on device: `adb install app-debug.apk`

### Alternative: Build from Command Line
```powershell
cd android
.\gradlew assembleDebug
```
APK location: `android/app/build/outputs/apk/debug/app-debug.apk`

---

## 🍎 iOS Build Steps

### Prerequisites
- ✅ macOS computer (required for iOS development)
- ✅ Xcode installed (from Mac App Store)
- ✅ Apple Developer Account ($99/year for App Store)

### Step 1: Build Web Assets
```bash
npm run build
```

### Step 2: Add iOS Platform (if not added)
```bash
npx cap add ios
```

### Step 3: Sync Capacitor
```bash
npx cap sync ios
```

### Step 4: Add Firebase to iOS

1. **Download GoogleService-Info.plist**
   - Go to Firebase Console → Project Settings
   - Under "Your apps" section, find your iOS app (or add one)
   - Click "Add app" → Select iOS icon
   - Enter iOS bundle ID: `com.cam4me.app`
   - Download `GoogleService-Info.plist`

2. **Add to Xcode Project**
   - Open Xcode: `npx cap open ios`
   - Drag `GoogleService-Info.plist` into the `App` folder in Xcode
   - Make sure "Copy items if needed" is checked
   - Click "Finish"

### Step 5: Configure Signing
1. In Xcode, select your project in the navigator
2. Select the **App** target
3. Go to **Signing & Capabilities** tab
4. Check **Automatically manage signing**
5. Select your **Team** (Apple Developer Account)
6. Xcode will generate a bundle identifier

### Step 6: Build and Run
1. Select a simulator or connected iOS device from the top toolbar
2. Click the **Play** button (▶) or press `Cmd + R`
3. App will build and launch on the device/simulator

### Step 7: Archive for App Store (Production)
1. Select **Any iOS Device** as the target
2. Go to **Product** → **Archive**
3. Once archived, click **Distribute App**
4. Follow the wizard to upload to App Store Connect

---

## 🔧 Common Issues & Fixes

### Android Issues

**Issue: "SDK location not found"**
```powershell
# Create local.properties in android/ folder
echo "sdk.dir=C:\\Users\\YOUR_USERNAME\\AppData\\Local\\Android\\Sdk" > android/local.properties
```

**Issue: "Gradle build failed"**
- Open Android Studio
- File → Invalidate Caches → Invalidate and Restart
- Try sync again

**Issue: App crashes on startup**
- Check `google-services.json` is in the correct location
- Verify package name matches Firebase

### iOS Issues

**Issue: "No signing certificate"**
- Xcode → Preferences → Accounts
- Add your Apple ID
- Download certificates

**Issue: "Module 'Firebase' not found"**
```bash
cd ios/App
pod install
```

---

## 📦 Quick Commands Reference

### Development
```powershell
# Run web dev server
npm run dev

# Build for production
npm run build

# Sync all platforms
npx cap sync
```

### Android
```powershell
# Open Android Studio
npx cap open android

# Run on device
npx cap run android

# Build debug APK
cd android; .\gradlew assembleDebug

# Build release APK (signed)
cd android; .\gradlew assembleRelease
```

### iOS (macOS only)
```bash
# Open Xcode
npx cap open ios

# Run on device
npx cap run ios

# Update pods
cd ios/App; pod install
```

---

## 🚀 Testing Your Build

### Android Testing
1. **Emulator**: Use Android Studio AVD Manager
2. **Physical Device**: 
   - Enable Developer Options
   - Enable USB Debugging
   - Connect via USB
   - Run: `adb devices` to verify

### iOS Testing
1. **Simulator**: Select from Xcode dropdown
2. **Physical Device**:
   - Connect iPhone/iPad via USB
   - Trust computer on device
   - Select device in Xcode
   - Run app

---

## 📱 Platform-Specific Features

### Features Working on Mobile:
- ✅ Camera API (take photos)
- ✅ Geolocation (GPS)
- ✅ SQLite database
- ✅ Firebase Authentication
- ✅ Native app performance

### Differences from Web:
- Uses redirect-based OAuth (not popup)
- Native camera integration
- Persistent local database
- Better performance
- Offline capabilities

---

## 🔐 Production Build Checklist

### Before Publishing:

**Both Platforms:**
- [ ] Test all features thoroughly
- [ ] Update version numbers
- [ ] Create app icons (1024x1024 original)
- [ ] Create splash screens
- [ ] Test on multiple devices
- [ ] Check Firebase quota limits

**Android:**
- [ ] Generate signed release APK
- [ ] Create app listing in Google Play Console
- [ ] Add screenshots (phone, tablet)
- [ ] Write app description
- [ ] Set up pricing & distribution

**iOS:**
- [ ] Archive and upload to App Store Connect
- [ ] Create app listing in App Store Connect
- [ ] Add screenshots (multiple sizes)
- [ ] Submit for review
- [ ] Wait for Apple approval (1-3 days)

---

## 📞 Need Help?

- Capacitor Docs: https://capacitorjs.com/docs
- Firebase iOS Setup: https://firebase.google.com/docs/ios/setup
- Firebase Android Setup: https://firebase.google.com/docs/android/setup
- Android Developer Guide: https://developer.android.com
- iOS Developer Guide: https://developer.apple.com
