# Firebase Social Authentication Setup

This app now supports Google, Facebook, and X (Twitter) login using Firebase Authentication.

## Setup Instructions

### 1. Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project" and follow the steps
3. Once created, click on the Web icon (</>) to add a web app
4. Copy the Firebase configuration object

### 2. Update Firebase Configuration

Open `src/firebase.js` and replace the placeholder values with your actual Firebase credentials:

```javascript
const firebaseConfig = {
  apiKey: "YOUR_ACTUAL_API_KEY",
  authDomain: "your-project-id.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project-id.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
}
```

### 3. Enable Authentication Providers in Firebase

#### Google Sign-In
1. In Firebase Console, go to **Authentication** > **Sign-in method**
2. Enable **Google** provider
3. Add your app's domain to authorized domains

#### Facebook Login
1. Create a Facebook App at [Facebook Developers](https://developers.facebook.com/)
2. Get your **App ID** and **App Secret**
3. In Firebase Console, enable **Facebook** provider
4. Enter your Facebook App ID and App Secret
5. Copy the OAuth redirect URI from Firebase
6. In Facebook App settings, add this redirect URI to **Valid OAuth Redirect URIs**

#### X (Twitter) Login
1. Create a Twitter App at [Twitter Developer Portal](https://developer.twitter.com/)
2. Get your **API Key** and **API Secret Key**
3. In Firebase Console, enable **Twitter** provider
4. Enter your Twitter API credentials
5. Copy the callback URL from Firebase
6. In Twitter App settings, enable "3-legged OAuth" and add the callback URL

### 4. Configure Authorized Domains

In Firebase Console:
- Go to **Authentication** > **Settings** > **Authorized domains**
- Add your domains:
  - `localhost` (for development)
  - Your production domain (when deploying)

### 5. Mobile App Setup (Capacitor)

For Android/iOS apps, you need to:

#### Android:
1. Download `google-services.json` from Firebase Console
2. Place it in `android/app/` folder
3. Update `android/app/build.gradle`:
```gradle
apply plugin: 'com.google.gms.google-services'
```

#### iOS:
1. Download `GoogleService-Info.plist` from Firebase Console
2. Add it to your Xcode project

### 6. Current Implementation

The app now:
- ✅ Uses Firebase Authentication for social login
- ✅ Supports Google, Facebook, and X/Twitter
- ✅ Handles popup-based authentication (web)
- ✅ Handles redirect-based authentication (mobile)
- ✅ Stores user data (uid, email, displayName, photoURL)
- ✅ Auto-fills profile with user information from social provider
- ✅ Provides error handling for common issues

### 7. Testing

**Important**: Social login will only work after you:
1. Replace the placeholder Firebase config with your actual credentials
2. Enable the authentication providers in Firebase Console
3. Configure the OAuth apps (Facebook, Twitter) if using those providers

For now, if credentials are not configured, the app will show an alert with the error message.

### 8. Security Notes

- Never commit your Firebase config with actual credentials to public repositories
- Use environment variables for production deployments
- Consider using Firebase App Check to prevent abuse
- Enable email enumeration protection in Firebase settings

## Quick Test Without Full Setup

To test the UI without configuring all providers:
- The buttons are functional and will attempt to authenticate
- If Firebase is not configured, you'll see an error message
- The app gracefully handles errors and provides feedback

## Need Help?

- [Firebase Authentication Documentation](https://firebase.google.com/docs/auth)
- [Firebase Web Setup](https://firebase.google.com/docs/web/setup)
- [Capacitor Firebase Plugin](https://github.com/capawesome-team/capacitor-firebase)
