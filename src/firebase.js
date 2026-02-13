import { getDatabase } from "firebase/database";
import { initializeApp } from "firebase/app";
import { Capacitor } from "@capacitor/core";
import { FirebaseAuthentication } from "@capacitor-firebase/authentication";
import { getAuth, GoogleAuthProvider, FacebookAuthProvider, TwitterAuthProvider, getAdditionalUserInfo, signInWithPopup, signInWithCredential, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { getFirestore, doc, deleteDoc } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// User's Real Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyA9MlPuA2w86FNMaMnMrsE1vR-RQDNxdKs",
  authDomain: "cam4me-project.firebaseapp.com",
  projectId: "cam4me-project",
  databaseURL: "https://cam4me-project-default-rtdb.firebaseio.com",
  storageBucket: "cam4me-project.firebasestorage.app",
  messagingSenderId: "163790979810",
  appId: "1:163790979810:web:2a0d44b844a0135c3914bb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);
const rtDb = getDatabase(app);

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

export { auth, db, rtDb, deleteUserData, getAdditionalUserInfo, RecaptchaVerifier, signInWithPhoneNumber };
export default app;

