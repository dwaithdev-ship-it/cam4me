import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, FacebookAuthProvider, TwitterAuthProvider } from "firebase/auth";
import { getFirestore, doc, deleteDoc } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// User's Real Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyA9MlPuA2w86FNMaMnMrsE1vR-RQDNxdKs",
  authDomain: "cam4me-project.firebaseapp.com",
  projectId: "cam4me-project",
  storageBucket: "cam4me-project.firebasestorage.app",
  messagingSenderId: "163790979810",
  appId: "1:163790979810:web:2a0d44b844a0135c3914bb",
  measurementId: "G-84E4N912X2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();
const twitterProvider = new TwitterAuthProvider();

// Utility to delete user data (admin function)
const deleteUserData = async (userId) => {
  try {
    await deleteDoc(doc(db, "users", userId));
    return true;
  } catch (error) {
    console.error("Error deleting user data:", error);
    throw error;
  }
};

export { auth, googleProvider, facebookProvider, twitterProvider, db, deleteUserData };
export default app;
