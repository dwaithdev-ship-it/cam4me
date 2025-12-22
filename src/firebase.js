import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider, FacebookAuthProvider, TwitterAuthProvider } from 'firebase/auth'

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBqKGvLw0c9-TkBy0vYH8cPjmEAdAKYxcQ",
  authDomain: "cam4me-34dc5.firebaseapp.com",
  projectId: "cam4me-34dc5",
  storageBucket: "cam4me-34dc5.firebasestorage.app",
  messagingSenderId: "323324365264",
  appId: "1:323324365264:web:43fa76c2633d6e4727d1d5"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Initialize Firebase Authentication
export const auth = getAuth(app)

// Initialize Auth Providers
export const googleProvider = new GoogleAuthProvider()
export const facebookProvider = new FacebookAuthProvider()
export const twitterProvider = new TwitterAuthProvider()

// Configure providers
googleProvider.setCustomParameters({
  prompt: 'select_account'
})

export default app
