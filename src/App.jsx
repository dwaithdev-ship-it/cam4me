// Placeholder function for Ad Manager password change
function handleChangeAdManagerPassword() {
  // TODO: Implement password change logic
  console.log('handleChangeAdManagerPassword called');
}
import { useState, useEffect, useRef, useCallback } from 'react'
import './App.css'
import { database } from './database'
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera'
import { Geolocation } from '@capacitor/geolocation'
import { Capacitor } from '@capacitor/core'


/** 
 * FIREBASE RESTORED - CONNECTED TO LIVE BACKEND 
 */
import { auth, googleProvider, facebookProvider, twitterProvider, db } from './firebase'
import { onAuthStateChanged, signInWithPopup, signInWithRedirect, signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth'
import { doc, setDoc, deleteDoc, updateDoc, collection, query, where, onSnapshot, getDoc } from 'firebase/firestore'
// Firestore only used for Auth if necessary, but all app data moves to database.js (SQLite)

// Storage is still local for this iteration or uses Base64


// Authorized Accounts Configuration
// ⚠️ In a real app, use Firebase Custom Claims or Firestore Roles for better security
const AUTHORIZED_ADMINS = ['dwaith.dev@gmail.com']
const AUTHORIZED_MANAGERS = ['dwaith.dev@gmail.com']

function App() {
  const [time, setTime] = useState('')
  const [showRecords, setShowRecords] = useState(false)
  const [records, setRecords] = useState([])
  const [dbInitialized, setDbInitialized] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('newest')
  const [currentScreen, setCurrentScreen] = useState('signup') // signup, signin, terms, profile, location, search, form, newpost, feed, menu
  const [authData, setAuthData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [profileData, setProfileData] = useState({
    name: '',
    photo: null
  })
  const [locationPermission, setLocationPermission] = useState('not-asked')
  const [preciselocation, setPreciseLocation] = useState(true)
  const [showCityList, setShowCityList] = useState(false)
  const [showCategoryList, setShowCategoryList] = useState(false)
  const [selectedCity, setSelectedCity] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [userPost, setUserPost] = useState(null)
  const [communityPosts, setCommunityPosts] = useState([])
  const [newMessage, setNewMessage] = useState('')
  const [postText, setPostText] = useState('')
  const [postImage, setPostImage] = useState(null)
  const [editingPostId, setEditingPostId] = useState(null)
  const [isEditing, setIsEditing] = useState(false)
  const textareaRef = useRef(null)

  const cities = ['Guntur', 'Vijayawada', 'Hyderabad', 'Visakhapatnam', 'Tirupati', 'Warangal']
  const categories = [
    'Cameras & drone',
    'Video editing & Album design',
    'Printing lab',
    'Human Resources',
    'Photography',
    'Event Management'
  ]
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    village: '',
    mandal: '',
    district: '',
    state: ''
  })
  const [adminAuth, setAdminAuth] = useState({ email: '', password: '' })
  const [adManagerAuth, setAdManagerAuth] = useState({ email: '', password: '' })

  // New State for Ad Manager & Admin
  const [ads, setAds] = useState([])
  const [blockedUsers, setBlockedUsers] = useState([]) // Will be synced from Firestore
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState('')
  const [otpSent, setOtpSent] = useState(false)
  const [otpValue, setOtpValue] = useState('')
  const [generatedOtp, setGeneratedOtp] = useState('') // Simulated for Proof of Concept or real integration
  const [otpTarget, setOtpTarget] = useState('email') // 'email' or 'mobile'
  const [resetStep, setResetStep] = useState('request') // 'request', 'verify', 'new_password'
  const [tempMobile, setTempMobile] = useState('') // For mobile OTP

  // Form State for Ad Manager (Create/Edit)
  const [adFormData, setAdFormData] = useState({
    id: null,
    image: null,
    text: '',
    link: '',
    startDate: new Date(Date.now() - (new Date().getTimezoneOffset() * 60000)).toISOString().slice(0, 16),
    endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000 - (new Date().getTimezoneOffset() * 60000)).toISOString().slice(0, 16),
    targetLocations: [],
    runMode: 'all' // 'all' or 'targeted'
  })

  const [showLocationModal, setShowLocationModal] = useState(false)
  const [tempLocation, setTempLocation] = useState({ name: '', type: 'radius', radius: 5, region: 'Full Country' })
  const [locationSuggestions, setLocationSuggestions] = useState([])
  const [feedbackMessage, setFeedbackMessage] = useState('')
  const [feedbacks, setFeedbacks] = useState([]) // For admin view

  // Notification Management State
  const [notifications, setNotifications] = useState([])
  const [notificationFormData, setNotificationFormData] = useState({
    id: null,
    title: '',
    message: '',
    scheduledDate: '',
    scheduledTime: '',
    isScheduled: false,
    scheduleEnabled: true,
    status: 'draft'
  })
  const [editingNotificationId, setEditingNotificationId] = useState(null)

  // User Notification State
  const [showUserNotificationsModal, setShowUserNotificationsModal] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [showProfileImagePicker, setShowProfileImagePicker] = useState(false);




  // Universal suggestions fetching via Nominatim API
  // Also Import missing dependencies for query/onSnapshot


  useEffect(() => {
    const fetchSuggestions = async () => {
      if (tempLocation.name.length >= 3) {
        try {
          const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(tempLocation.name)}&limit=5`);
          const data = await response.json();
          setLocationSuggestions(data.map(item => item.display_name));
        } catch (error) {
          console.error('Search error:', error);
        }
      } else {
        setLocationSuggestions([]);
      }
    };
    const timer = setTimeout(fetchSuggestions, 500);
    return () => clearTimeout(timer);
  }, [tempLocation.name])


  const [currentUser, setCurrentUser] = useState(null)
  const [savingAd, setSavingAd] = useState(false)
  const [lastAdError, setLastAdError] = useState(null)
  const [runtimeError, setRuntimeError] = useState(null)

  // -------------------------------------------------------------
  // LOCAL STORAGE EFFECTS (Replaces Firebase Listeners)
  // -------------------------------------------------------------

  // 0. Initialize Database
  useEffect(() => {
    initializeDatabase();
  }, []);

  // Global error handlers to capture runtime exceptions and show an overlay
  useEffect(() => {
    const onError = (event) => {
      try {
        const err = event.error || event.message || String(event);
        setRuntimeError(err);
      } catch (e) {
        setRuntimeError('Unknown error');
      }
    };
    const onRejection = (event) => {
      try {
        setRuntimeError(event.reason || 'Unhandled Promise rejection');
      } catch (e) {
        setRuntimeError('Unhandled Promise rejection');
      }
    };
    window.addEventListener('error', onError);
    window.addEventListener('unhandledrejection', onRejection);
    return () => {
      window.removeEventListener('error', onError);
      window.removeEventListener('unhandledrejection', onRejection);
    };
  }, []);

  // 1. Auth Persistence (Firebase Auth + SQLite Data)
  // 1. Auth Status Observer
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL
        });
      } else {
        setCurrentUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  // Reset/Close notification modal on auth change
  useEffect(() => {
    setShowUserNotificationsModal(false);
  }, [currentUser]);

  // 1b. Auth-Based Navigation & Profile Sync (Reactive)
  useEffect(() => {
    if (!currentUser) return;

    const syncAndNavigate = async () => {
      try {
        let data = await database.getUser(currentUser.uid);

        // Data Recovery: If local missing, try Firestore
        if (!data) {
          console.log("Local data missing, checking Firestore...");
          try {
            const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
            if (userDoc.exists()) {
              console.log("Found backup in Firestore, restoring...");
              data = userDoc.data();
              await database.saveUser(data); // Restore to local
            }
          } catch (cloudErr) {
            console.warn("Firestore fetch failed:", cloudErr);
          }
        }

        if (data) {
          setProfileData({ name: data.name || currentUser.displayName || '', photo: data.photo || currentUser.photoURL || null });
          setFormData({
            name: data.name || '',
            mobile: data.mobile || '',
            village: data.village || '',
            mandal: data.mandal || '',
            district: data.district || '',
            state: data.state || ''
          });
          setSelectedCity(data.selectedCity || '');
          setSelectedCategory(data.selectedCategory || '');

          const isAdmin = AUTHORIZED_ADMINS.includes(currentUser.email);
          const isManager = AUTHORIZED_MANAGERS.includes(currentUser.email);

          if (currentScreen === 'signin' || currentScreen === 'signup' || currentScreen === 'terms') {
            // Only redirect to terms/profile if NOT an authorized staff member
            if (!isAdmin && !isManager) {
              if (data.setupCompleted) setCurrentScreen('feed');
              else if (data.termsAccepted) setCurrentScreen('profile');
              else setCurrentScreen('terms');
            } else {
              // For staff, go to feed if they have a user profile, otherwise stay put or manual navigation
              if (data.setupCompleted) setCurrentScreen('feed');
            }
          }
        } else {
          // New User or No Data Found
          const isAdmin = AUTHORIZED_ADMINS.includes(currentUser.email);
          const isManager = AUTHORIZED_MANAGERS.includes(currentUser.email);

          if (currentScreen === 'signin' || currentScreen === 'signup' || currentScreen === 'terms') {
            if (!isAdmin && !isManager) {
              setCurrentScreen('terms');
            }
          }
        }

        const allPosts = await database.getPosts();
        const myLastPost = allPosts.find(p => p.userId === currentUser.uid);
        if (myLastPost) setUserPost(myLastPost);
      } catch (err) {
        console.error("Auth sync error:", err);
      }
    };
    syncAndNavigate();
  }, [currentUser, AUTHORIZED_ADMINS, AUTHORIZED_MANAGERS]);

  // Sync Post Text when entering 'newpost' screen
  const hasInitializedPostRef = useRef(false)

  // Reset ref when leaving screen
  useEffect(() => {
    if (currentScreen !== 'newpost') {
      hasInitializedPostRef.current = false;
    }
  }, [currentScreen]);

  // Handle data sync
  useEffect(() => {
    if (currentScreen === 'newpost') {
      // Case 1: Just entered screen (or first load)
      if (!hasInitializedPostRef.current) {
        if (userPost) {
          // Existing user post - load it in read-only mode
          setPostText(userPost.message || '')
          setPostImage(userPost.postImage || null)
          setEditingPostId(userPost.id)
          setIsEditing(false)
        } else {
          // No post - start fresh in edit mode
          setPostText('')
          setPostImage(null)
          setEditingPostId(null)
          setIsEditing(true)
        }
        hasInitializedPostRef.current = true;
      }
      // Case 2: Post loaded LATE (after entering screen) 
      // Only update if we haven't started editing yet (safe update)
      else if (userPost && !isEditing && !postText && !postImage) {
        setPostText(userPost.message || '')
        setPostImage(userPost.postImage || null)
        setEditingPostId(userPost.id)
      }
    }
  }, [currentScreen, userPost]);

  // 2. Sync Ads & Posts (Local Polling)
  useEffect(() => {
    const refreshLocalData = async () => {
      try {
        const [localAds, localPosts] = await Promise.all([
          database.getAds(),
          database.getPosts()
        ]);
        setAds(localAds);
        setCommunityPosts(localPosts);

        if (currentUser) {
          const myLastPost = localPosts.find(p => p.userId === currentUser.uid);
          if (myLastPost && JSON.stringify(myLastPost) !== JSON.stringify(userPost)) {
            setUserPost(myLastPost);
          } else if (!myLastPost && userPost) {
            setUserPost(null);
          }
        }
      } catch (err) {
        console.error("Sync Error:", err);
      }
    };
    refreshLocalData();
    const interval = setInterval(refreshLocalData, 3000);
    return () => clearInterval(interval);
  }, [currentUser]);

  // 4. Sync Blocked Users
  useEffect(() => {
    const syncBlocked = () => {
      const blocked = JSON.parse(localStorage.getItem('blockedUsers') || '[]')
      setBlockedUsers(blocked)
    }
    syncBlocked()
    const interval = setInterval(syncBlocked, 5000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      const hours = String(now.getHours()).padStart(2, '0')
      const minutes = String(now.getMinutes()).padStart(2, '0')
      setTime(`${hours}:${minutes}`)
    }
    updateTime()
    const interval = setInterval(updateTime, 60000)
    return () => clearInterval(interval)
  }, [])

  // Removed localStorage effects to rely on Firebase



  // Robust DataURL to Blob conversion
  const dataURLtoBlob = (dataurl) => {
    try {
      const arr = dataurl.split(',')
      const mime = arr[0].match(/:(.*?);/)[1]
      const bstr = atob(arr[1])
      let n = bstr.length
      const u8arr = new Uint8Array(n)
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n)
      }
      return new Blob([u8arr], { type: mime })
    } catch (e) {
      console.error('Blob conversion error:', e)
      return null
    }
  }

  const uploadFile = async (dataUrl, path) => {
    // Local persistence mode only - return data unchanged
    return dataUrl;
  }

  const loadRecords = async () => {
    try {
      const list = await database.getAllUsers();
      setRecords(list);
    } catch (error) {
      console.error('Failed to load records:', error);
    }
  }

  const initializeDatabase = async () => {
    try {
      const success = await database.initialize()
      setDbInitialized(success)
      if (success) {
        await loadRecords()
      }
    } catch (error) {
      console.error('Failed to initialize database:', error)
    }
  }

  // Sync all user records for Admin from SQLite
  useEffect(() => {
    if (currentScreen === 'admin_users' || currentScreen === 'debug') {
      loadRecords();
      const interval = setInterval(loadRecords, 5000);
      return () => clearInterval(interval);
    }
  }, [currentScreen]);

  const handleAuthChange = (e) => {
    setAuthData({
      ...authData,
      [e.target.name]: e.target.value
    })
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  // Helper to save session data (PostgreSQL)
  const saveSessionData = async (screen, completed = false) => {
    if (!currentUser) return;

    try {
      const updatedData = {
        uid: currentUser.uid,
        email: currentUser.email,
        lastScreen: screen,
        setupCompleted: completed,
        termsAccepted: true, // If we are saving session data beyond terms screen
        name: profileData.name || formData.name || '',
        photo: profileData.photo || null,
        selectedCity,
        selectedCategory,
        mobile: formData.mobile || '',
        village: formData.village || '',
        mandal: formData.mandal || '',
        district: formData.district || '',
        state: formData.state || '',
        lastUpdated: new Date().toISOString()
      }

      await database.saveUser(updatedData);
      console.log('Session data synced to PostgreSQL');
    } catch (err) {
      console.error('Failed to sync session to PostgreSQL:', err);
    }
  }

  const handleLogout = async () => {
    if (window.confirm('Are you sure you want to logout?')) {
      try {
        await signOut(auth);
        // State clearing handled by onAuthStateChanged
        setAuthData({ email: '', password: '', confirmPassword: '' })
        setProfileData({ name: '', photo: null })
        setSelectedCity('')
        setSelectedCategory('')
        setFormData({ name: '', mobile: '', village: '', mandal: '', district: '', state: '' })
        setLocationPermission('not-asked')
        setUserPost(null)
        setCommunityPosts([])
        setPostText('')
        setPostImage(null)
        setEditingPostId(null)
        setIsEditing(true)
        hasInitializedPostRef.current = false;

        setCurrentScreen('signup')
        alert('You have been logged out successfully')
      } catch (err) {
        console.error("Logout Error:", err);
      }
    }
  }

  const handleAcceptTerms = async () => {
    // If user is logged in, we check their Firestore data (which is already in local state via onAuthStateChanged)
    if (profileData.name && selectedCity && selectedCategory) {
      await saveSessionData('feed', true)
      setCurrentScreen('feed')
      return
    }

    // Otherwise, continue with profile setup
    await saveSessionData('profile')
    setCurrentScreen('profile')
  }

  const handleSignUp = async (e) => {
    e.preventDefault()
    if (authData.password !== authData.confirmPassword) return alert('Passwords do not match!')

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, authData.email, authData.password);
      const user = userCredential.user;

      const userData = {
        uid: user.uid,
        email: user.email,
        setupCompleted: false,
        termsAccepted: false
      };

      // Save to Local SQLite
      await database.saveUser(userData);

      // Save to Cloud Firestore (Backup)
      try {
        await setDoc(doc(db, 'users', user.uid), userData);
      } catch (e) { console.warn("Cloud save failed:", e); }

      // Navigation is now reactively handled by the Auth useEffect
    } catch (error) {
      console.error("Signup Error:", error);
      alert("Error creating account: " + error.message);
    }
  }

  const handleSignIn = async (e) => {
    e.preventDefault()
    try {
      await signInWithEmailAndPassword(auth, authData.email, authData.password);
      // Navigation is now reactively handled by the Auth useEffect
    } catch (error) {
      console.error("Signin Error:", error);
      alert("Login failed: " + error.message);
    }
  }

  /* 
   * LOCAL STORAGE SOCIAL LOGIN SIMULATION 
   */
  const handleSocialLogin = async (providerName) => {
    try {
      let provider;
      if (providerName === 'Google') provider = googleProvider;
      if (providerName === 'Facebook') provider = facebookProvider;
      if (providerName === 'Twitter' || providerName === 'X') provider = twitterProvider;

      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Sync with Local SQLite
      await database.saveUser({
        uid: user.uid,
        email: user.email,
        name: user.displayName,
        photo: user.photoURL,
        setupCompleted: false
      });

      alert(`Welcome ${user.displayName || user.email}`);
    } catch (error) {
      console.error("Social Login Error:", error);
      // Don't show alert if user simply closed the popup
      if (error.code === 'auth/cancelled-popup-request' || error.code === 'auth/popup-closed-by-user') {
        return; // User intentionally cancelled, no error message needed
      }
      if (error.code === 'auth/unauthorized-domain') {
        alert(`Social Login Failed: Domain not authorized.\n\nTo fix this: Go to Firebase Console -> Authentication -> Settings -> Authorized Domains and add this IP address: ${window.location.hostname}`);
      } else {
        alert("Social Login Failed: " + error.message);
      }
    }
  }


  const handleAdminAuthChange = (e) => {
    setAdminAuth({ ...adminAuth, [e.target.name]: e.target.value })
  }

  const handleAdManagerAuthChange = (e) => {
    setAdManagerAuth({ ...adManagerAuth, [e.target.name]: e.target.value })
  }


  const handleAdminLogin = async (e) => {
    e.preventDefault();
    // For admin, we can still use local check for specific email BUT verify with Firebase Auth
    // or just assume if they want to login as admin they must use the proper email.

    // Let's use Firebase Auth to ensure it's the real owner of the email
    if (AUTHORIZED_ADMINS.includes(adminAuth.email)) {
      try {
        await signInWithEmailAndPassword(auth, adminAuth.email, adminAuth.password);
        setCurrentScreen('admin_dashboard');
      } catch (err) {
        console.error('Admin login error:', err);
        alert("Admin Login Failed: " + (err.code || err.message) + "\nCheck the email/password or enable Email/Password sign-in in Firebase console.");
      }
    } else {
      alert("Access Denied: Not an Admin Email");
    }
  }

  const handleForgotPassword = async (e) => {
    e.preventDefault()
    if (!forgotPasswordEmail) return alert("Please enter your email");

    try {
      await sendPasswordResetEmail(auth, forgotPasswordEmail);
      alert("Password reset email sent! Check your inbox.");
      setCurrentScreen('signin');
    } catch (err) {
      console.error("Reset Error:", err);
      alert("Failed to send reset email: " + err.message);
    }
  }

  const handleVerifyOTP = () => {
    if (otpValue === generatedOtp) {
      setResetStep('new_password')
    } else {
      alert('Invalid OTP!')
    }
  }

  const handleResetPassword = async (newPassword) => {
    // This part is tricky without Re-authentication for a logged in user,
    // or using a server-side action for a non-logged in user via OTP.
    // For simplicity with Simulated Mobile OTP, we'll just alert.
    alert('In a production app, this would securely update your password via a backend service or Firebase Admin SDK. For Email, the link already handles this.')
    setCurrentScreen('signin')
  }

  const handleAdManagerLogin = async (e) => {
    e.preventDefault()

    if (AUTHORIZED_MANAGERS.includes(adManagerAuth.email)) {
      try {
        await signInWithEmailAndPassword(auth, adManagerAuth.email, adManagerAuth.password);
        setCurrentScreen('ad_manager_dashboard');
        alert(`Welcome Ad Manager: ${adManagerAuth.email}`);
      } catch (err) {
        console.error('Ad Manager login error:', err);
        alert("Login Failed: " + (err.code || err.message) + "\nCheck the email/password or enable Email/Password sign-in in Firebase console.");
      }
    } else {
      alert('Access Denied: This account is not an Ad Manager.')
    }
  }

  const handleSendResetForAdmin = async () => {
    if (!adminAuth.email) return alert('Enter admin email first');
    try {
      await sendPasswordResetEmail(auth, adminAuth.email);
      alert('Password reset email sent to ' + adminAuth.email);
    } catch (err) {
      console.error('Admin reset error:', err);
      alert('Failed to send reset email: ' + (err.code || err.message));
    }
  }

  const handleSendResetForManager = async () => {
    if (!adManagerAuth.email) return alert('Enter manager email first');
    try {
      await sendPasswordResetEmail(auth, adManagerAuth.email);
      alert('Password reset email sent to ' + adManagerAuth.email);
    } catch (err) {
      console.error('Manager reset error:', err);
      alert('Failed to send reset email: ' + (err.code || err.message));
    }
  }

  const handleTakePhoto = async (e) => {
    if (e) {
      e.preventDefault()
      e.stopPropagation()
    }

    // Check if Capacitor is available (mobile) or we're on web
    const isWeb = !window.Capacitor || window.Capacitor.getPlatform() === 'web'

    if (isWeb) {
      // For web, create a file input
      const input = document.createElement('input')
      input.type = 'file'
      input.accept = 'image/*'
      // Removed input.capture to allow generic file picker (Camera/Gallery)

      input.onchange = (event) => {
        const file = event.target.files[0]
        if (file) {
          const reader = new FileReader()
          reader.onload = (e) => {
            setProfileData({ ...profileData, photo: e.target.result })
          }
          reader.readAsDataURL(file)
        }
      }

      input.click()
      return
    }

    // Mobile app - show picker
    setShowProfileImagePicker(true)
  }

  const handleProfileImageSelect = async (source) => {
    setShowProfileImagePicker(false)
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: true,
        resultType: CameraResultType.DataUrl,
        source: source
      })

      if (image && image.dataUrl) {
        setProfileData({ ...profileData, photo: image.dataUrl })
      }
    } catch (error) {
      console.error('Error taking photo:', error)
    }
  }

  const handleProfileChange = (e) => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value })
  }

  const handleProfileContinue = () => {
    if (!profileData.name) {
      alert('Please enter your name')
      return
    }
    saveSessionData('location')
    setCurrentScreen('location')
  }

  const handleLocationPermission = async (choice) => {
    try {
      if (choice === 'allow-always' || choice === 'allow-once') {
        const permission = await Geolocation.requestPermissions()
        if (permission.location === 'granted') {
          const position = await Geolocation.getCurrentPosition({
            enableHighAccuracy: preciselocation
          })
          console.log('Location:', position)
          setLocationPermission('granted')
        }
      } else {
        setLocationPermission('denied')
      }
      saveSessionData('search')
      setCurrentScreen('search')
    } catch (error) {
      console.error('Error getting location:', error)
      saveSessionData('search')
      setCurrentScreen('search')
    }
  }

  const handleCitySelect = (city) => {
    setSelectedCity(city)
    setShowCityList(false)
  }

  const handleCategorySelect = (category) => {
    setSelectedCategory(category)
    setShowCategoryList(false)
  }

  const handleSearchContinue = () => {
    if (selectedCity && selectedCategory) {
      saveSessionData('form')
      setCurrentScreen('form')
    } else {
      alert('Please select both City and Category')
    }
  }


  const handleFeedbackSubmit = async (e) => {
    e.preventDefault();
    if (!feedbackMessage.trim()) return alert("Please enter your feedback message.");

    try {
      await database.saveFeedback({
        userId: currentUser.uid,
        userEmail: currentUser.email,
        userName: profileData.name || currentUser.displayName || 'Anonymous',
        message: feedbackMessage.trim()
      });
      alert("Thanks for submitting your feedback");
      setFeedbackMessage('');
      setCurrentScreen('menu');
    } catch (err) {
      console.error("Feedback submission error:", err);
      alert("Failed to submit feedback. Please try again.");
    }
  };

  const loadFeedbacks = async () => {
    try {
      const data = await database.getAllFeedbacks();
      setFeedbacks(data);
    } catch (err) {
      console.error("Failed to load feedbacks:", err);
    }
  };

  // Notification Management Handlers
  // Notification Management Handlers
  const loadNotifications = useCallback(async () => {
    try {
      const data = await database.getNotifications();
      setNotifications(data);

      // Calculate unread count for user
      if (currentUser && data && data.length > 0) {
        const storageKey = `read_notifications_${currentUser.uid}`;
        const readIds = JSON.parse(localStorage.getItem(storageKey) || '[]');
        // Filter for sent notifications that are not in readIds
        const validUnread = data.filter(n => n.status === 'sent' && !readIds.includes(n.id));
        setUnreadCount(validUnread.length);
      } else {
        setUnreadCount(0);
      }
    } catch (err) {
      console.error("Failed to load notifications:", err);
    }
  }, [currentUser]);

  const markNotificationsAsRead = () => {
    if (!currentUser) return;
    const sentNotifications = notifications.filter(n => n.status === 'sent').map(n => n.id);
    const storageKey = `read_notifications_${currentUser.uid}`;
    const existingRead = JSON.parse(localStorage.getItem(storageKey) || '[]');
    const newRead = [...new Set([...existingRead, ...sentNotifications])];
    localStorage.setItem(storageKey, JSON.stringify(newRead));
    setUnreadCount(0);
  };

  useEffect(() => {
    loadNotifications();
    // Poll for notifications
    const interval = setInterval(loadNotifications, 30000);
    return () => clearInterval(interval);
  }, [loadNotifications]);

  const handleNotificationFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNotificationFormData({
      ...notificationFormData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSaveNotification = async () => {
    if (!notificationFormData.title.trim()) {
      return alert("Please enter a notification title");
    }
    if (!notificationFormData.message.trim()) {
      return alert("Please enter a notification message");
    }

    try {
      const notificationData = {
        ...notificationFormData,
        id: notificationFormData.id || 'notif_' + Date.now(),
        createdAt: notificationFormData.createdAt || new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      await database.saveNotification(notificationData);
      await loadNotifications();

      // Reset form
      setNotificationFormData({
        id: null,
        title: '',
        message: '',
        scheduledDate: '',
        scheduledTime: '',
        isScheduled: false,
        scheduleEnabled: true,
        status: 'draft'
      });
      setEditingNotificationId(null);

      alert(notificationFormData.id ? "Notification updated successfully" : "Notification created successfully");
      setCurrentScreen('admin_notifications');
    } catch (err) {
      console.error("Error saving notification:", err);
      alert("Failed to save notification. Please try again.");
    }
  };

  const handleEditNotification = (notification) => {
    setNotificationFormData({
      id: notification.id,
      title: notification.title || '',
      message: notification.message || '',
      scheduledDate: notification.scheduledDate || '',
      scheduledTime: notification.scheduledTime || '',
      isScheduled: notification.isScheduled || false,
      scheduleEnabled: notification.scheduleEnabled !== undefined ? notification.scheduleEnabled : true,
      status: notification.status || 'draft',
      createdAt: notification.createdAt
    });
    setEditingNotificationId(notification.id);
    setCurrentScreen('admin_notification_form');
  };

  const handleDeleteNotification = async (id) => {
    if (!window.confirm("Are you sure you want to delete this notification?")) {
      return;
    }

    try {
      await database.deleteNotification(id);
      await loadNotifications();
      alert("Notification deleted successfully");
    } catch (err) {
      console.error("Error deleting notification:", err);
      alert("Failed to delete notification. Please try again.");
    }
  };

  const handleToggleSchedule = async (notification) => {
    // If called via the new generic buttons, notification arg has the NEW desired state in it already
    // If called via legacy toggle (if any), we need to toggle

    // Check if notification passed is the raw object or has modified props
    // We fetch the current fresh object from state just to be safe if we were toggling
    const current = notifications.find(n => n.id === notification.id);
    if (!current) return;

    const newEnabled = notification.scheduleEnabled !== undefined ? notification.scheduleEnabled : !current.scheduleEnabled;

    try {
      await database.updateNotification(notification.id, { scheduleEnabled: newEnabled });
      loadNotifications();
    } catch (err) {
      console.error("Error toggling schedule:", err);
    }
  };


  const handleSendNotification = async (notification) => {
    if (!window.confirm("Send this notification to all users now?")) {
      return;
    }

    try {
      await database.updateNotification(notification.id, {
        status: 'sent',
        sentAt: new Date().toISOString()
      });
      await loadNotifications();
      alert("Notification sent successfully!");
    } catch (err) {
      console.error("Error sending notification:", err);
      alert("Failed to send notification");
    }
  };

  useEffect(() => {
    if (currentScreen === 'admin_feedbacks') {
      loadFeedbacks();
    }
  }, [currentScreen]);

  useEffect(() => {
    if (currentScreen === 'admin_notifications' || currentScreen === 'admin_notification_form') {
      loadNotifications();
    }
  }, [currentScreen]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!currentUser) return alert('Please sign in first');

    try {
      await database.saveUser({
        uid: currentUser.uid,
        name: formData.name,
        mobile: formData.mobile,
        village: formData.village,
        mandal: formData.mandal,
        district: formData.district,
        state: formData.state,
        photo: profileData.photo,
        selectedCity,
        selectedCategory,
        setupCompleted: true
      });
      setCurrentScreen('newpost');
    } catch (err) {
      alert("Failed to save profile: " + err.message);
    }
  }

  const handleGalleryUpload = async () => {
    try {
      // Check if Capacitor is available (mobile) or we're on web
      const isWeb = !window.Capacitor || window.Capacitor.getPlatform() === 'web'

      if (isWeb) {
        // For web, create a file input
        const input = document.createElement('input')
        input.type = 'file'
        input.accept = 'image/*'
        input.style.display = 'none'
        document.body.appendChild(input)

        input.onchange = (event) => {
          const file = event.target.files[0]
          if (file) {
            const reader = new FileReader()
            reader.onload = (e) => {
              setPostImage(e.target.result)
            }
            reader.onerror = (e) => {
              console.error("FileReader error", e)
              alert("Failed to read image file")
            }
            reader.readAsDataURL(file)
          }
          document.body.removeChild(input)
        }

        // Safety cleanup if user cancels (optional, but keeps DOM clean eventually)
        // setTimeout(() => { if(document.body.contains(input)) document.body.removeChild(input) }, 60000)

        input.click()
        return
      }

      // Mobile app - use Capacitor Camera
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Photos
      })

      if (image && image.dataUrl) {
        setPostImage(image.dataUrl)
      }
    } catch (error) {
      console.error('Error selecting image:', error)
      if (error.message && !error.message.includes('User cancelled')) {
        alert('Failed to select image. Please try again.')
      }
    }
  }

  const handleCameraCapture = async () => {
    try {
      // Check if Capacitor is available (mobile) or we're on web
      const isWeb = !window.Capacitor || window.Capacitor.getPlatform() === 'web'

      if (isWeb) {
        // For web, create a file input with camera capture
        const input = document.createElement('input')
        input.type = 'file'
        input.accept = 'image/*'
        input.capture = 'environment' // Request camera on mobile browsers

        input.onchange = (event) => {
          const file = event.target.files[0]
          if (file) {
            const reader = new FileReader()
            reader.onload = (e) => {
              setPostImage(e.target.result)
            }
            reader.readAsDataURL(file)
          }
        }

        input.click()
        return
      }

      // Mobile app - use Capacitor Camera
      const permissions = await Camera.checkPermissions()

      if (permissions.camera === 'denied') {
        const requested = await Camera.requestPermissions()
        if (requested.camera === 'denied') {
          alert('Camera permissions are required. Please enable camera access in your device settings.')
          return
        }
      }

      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: true,
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Camera // Use camera directly
      })

      if (image && image.dataUrl) {
        setPostImage(image.dataUrl)
      }
    } catch (error) {
      console.error('Error capturing photo:', error)
      if (error.message && !error.message.includes('User cancelled')) {
        alert('Failed to access camera. Please try again or check camera permissions.')
      }
    }
  }

  const handleEditPost = () => {
    if (currentScreen !== 'newpost') {
      setCurrentScreen('newpost')
    } else {
      setIsEditing(true)
      // Focus and move cursor to end
      setTimeout(() => {
        if (textareaRef.current) {
          textareaRef.current.focus()
          const length = textareaRef.current.value.length
          textareaRef.current.setSelectionRange(length, length)
        }
      }, 50)
    }
  }

  const handleInlineSave = async () => {
    if (!userPost || !userPost.id) return alert('No post found to update')

    const updatedAt = new Date().toISOString()
    const updatedPost = { ...userPost, message: newMessage, lastEdited: updatedAt }

    // Update LocalStorage 'posts'
    let allPosts = JSON.parse(localStorage.getItem('posts') || '[]')
    const idx = allPosts.findIndex(p => p.id === userPost.id)
    if (idx >= 0) {
      allPosts[idx] = updatedPost
      setUserPost(updatedPost)
      alert('Post updated successfully')
    }
  }

  // Save ad handler with logging and loading state
  // Save ad handler (LocalStorage)
  const saveAd = async () => {
    console.log('[DEBUG] saveAd called', adFormData);
    if (savingAd) return
    if (!adFormData.image) return alert('Please upload an ad banner image first!')
    if (!window.confirm('Are you sure you want to save this campaign?')) return

    setSavingAd(true)
    try {
      // 1. Prepare Ad Data
      const finalAdImage = adFormData.image // No upload needed, already DataURL
      const adData = {
        ...adFormData,
        image: finalAdImage,
        createdBy: currentUser?.uid || 'unknown',
        id: adFormData.id || Date.now(),
        timestamp: new Date().toISOString()
      }
      console.log('[DEBUG] About to save adData', adData);
      // 2. Save to PostgreSQL
      await database.saveAd(adData);
      alert('Successfully saved the ad to PostgreSQL!');
      setCurrentScreen('ad_manager_dashboard')
    } catch (err) {
      console.error('[DEBUG] Save ad failed:', err)
      alert('Failed to save ad: ' + err.message)
    } finally {
      setSavingAd(false)
    }
  }

  const handlePublishPost = async () => {
    if (!postText) return alert('Please write something for your post')

    // Prepare data
    const finalProfilePhoto = profileData.photo || null
    const finalPostImage = postImage || null

    const postData = {
      id: editingPostId || Date.now(),
      userId: currentUser.uid,
      userName: profileData.name || 'User',
      userPhoto: finalProfilePhoto,
      postImage: finalPostImage,
      message: postText,
      village: formData.village || '',
      district: formData.district || '',
      state: formData.state || '',
      timestamp: new Date().toISOString(),
      likes: []
    }

    // Save to PostgreSQL 'posts'
    try {
      await database.savePost(postData);

      // Update local state
      setUserPost(postData);

      // Reset form (keep the updated post visible in read-only mode)
      setPostText(postData.message)
      setPostImage(postData.postImage)
      setEditingPostId(postData.id)
      setIsEditing(false) // Go back to read-only view
      // setCurrentScreen('feed') // Keep user on screen as per implicit flow, or user might want to go to feed?
      // User request implies "make changes for profile -> edit option -> last post displayed -> edit".
      // Usually "Post" button implies "Done". Let's send them to feed as is standard, or keep them here?
      // Standard behavior is to go to feed. But to satisfy "last post displayed", we can stay?
      // "Post Published to Feed!" implies we go there. I will keep existing behavior.
      setCurrentScreen('feed')
      alert(editingPostId ? "Post Updated Successfully!" : "Post Published to Feed!");
    } catch (err) {
      console.error("Publish Error:", err);
      alert("Failed to publish post: " + err.message);
    }
  }

  const loadCommunityPosts = () => {
    // Sample community posts (in real app, fetch from backend filtered by category)
    const samplePosts = [
      {
        id: 1,
        userName: 'Suresh Reddy',
        mobile: '99112 99112',
        district: 'Guntur',
        category: selectedCategory,
        timestamp: '4 march 2026',
        status: 'Avaliable/Busy',
        message: 'By using this app, you certify that you have read and reviewed this Agreement and that you agree to comply with its terms. If you do not want to be bound by the terms of this Agreement, you agree to comply with its terms. If you do not want to be...',
        avatar: '#FF6B6B',
        userId: 'sample_1'
      },
      {
        id: 2,
        userName: 'Madhusudan',
        mobile: '96002 99002',
        district: 'Guntur',
        category: selectedCategory,
        timestamp: '5 march 2026',
        status: 'Avaliable/Busy',
        message: 'By using this app, you certify that you have read and reviewed this Agreement and that you agree to comply with its terms. If you do not want to be bound by the terms of this Agreement, you agree to comply with its terms. If you do not want to be...',
        avatar: '#FF1493',
        userId: 'sample_2'
      },
      {
        id: 3,
        userName: 'Madhusudan',
        mobile: '96002 99002',
        district: 'Guntur',
        category: selectedCategory,
        timestamp: '5 march 2026',
        status: 'Avaliable/Busy',
        message: 'By using this app, you certify that you have read and reviewed this Agreement and that you agree to comply with its terms. If you do not want to be bound by the terms of this Agreement, you agree to comply with its terms. If you do not want to be...',
        avatar: '#00BFFF',
        userId: 'sample_3'
      },
      {
        id: 4,
        userName: 'Madhusudan',
        mobile: '96002 99002',
        district: 'Guntur',
        category: selectedCategory,
        timestamp: '5 march 2026',
        status: 'Avaliable/Busy',
        message: 'By using this app, you certify that you have read and reviewed this Agreement and that you agree to comply with its terms. If you do not want to be bound by the terms of this Agreement, you agree to comply with its terms. If you do not want to be...',
        avatar: '#9370DB',
        userId: 'sample_4'
      },
      {
        id: 5,
        userName: 'Madhusudan',
        mobile: '96002 99002',
        district: 'Guntur',
        category: selectedCategory,
        timestamp: '5 march 2026',
        status: 'Avaliable/Busy',
        message: 'By using this app, you certify that you have read and reviewed this Agreement and that you agree to comply with its terms. If you do not want to be bound by the terms of this Agreement, you agree to comply with its terms. If you do not want to be...',
        avatar: '#FF8C00',
        userId: 'sample_5'
      }
    ]
    setCommunityPosts(samplePosts)
  }

  const deleteRecord = async (id) => {
    try {
      await database.deleteRecord(id)
      await loadRecords()
    } catch (error) {
      console.error('Failed to delete record:', error)
      alert('Failed to delete record.')
    }
  }

  const clearAllRecords = async () => {
    if (window.confirm('Are you sure you want to clear all records?')) {
      try {
        await database.clearAllRecords()
        await loadRecords()
      } catch (error) {
        console.error('Failed to clear records:', error)
        alert('Failed to clear records.')
      }
    }
  }

  const exportToCSV = () => {
    if (records.length === 0) {
      alert('No records to export')
      return
    }

    // Create CSV content
    const headers = ['ID', 'Timestamp', 'Name', 'Mobile', 'Village', 'Mandal', 'District', 'State']
    const csvContent = [
      headers.join(','),
      ...records.map(record => [
        record.id,
        `"${record.timestamp}"`,
        `"${record.name}"`,
        record.mobile,
        `"${record.village}"`,
        `"${record.mandal}"`,
        `"${record.district}"`,
        `"${record.state}"`
      ].join(','))
    ].join('\n')

    // Create and download file
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    const url = URL.createObjectURL(blob)
    link.setAttribute('href', url)
    link.setAttribute('download', `chatcam_records_${new Date().getTime()}.csv`)
    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const getFilteredRecords = () => {
    let filtered = records.filter(record => !blockedUsers.includes(record.id))

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(record =>
        record.name.toLowerCase().includes(query) ||
        record.mobile.includes(query) ||
        record.village.toLowerCase().includes(query) ||
        record.mandal.toLowerCase().includes(query) ||
        record.district.toLowerCase().includes(query) ||
        record.state.toLowerCase().includes(query)
      )
    }

    // Apply sorting
    if (sortBy === 'newest') {
      filtered.sort((a, b) => b.id - a.id)
    } else if (sortBy === 'oldest') {
      filtered.sort((a, b) => a.id - b.id)
    } else if (sortBy === 'name') {
      filtered.sort((a, b) => a.name.localeCompare(b.name))
    } else if (sortBy === 'district') {
      filtered.sort((a, b) => a.district.localeCompare(b.district))
    }

    return filtered
  }

  const getAnalytics = () => {
    const today = new Date().toLocaleDateString()
    const todayRecords = records.filter(record =>
      record.timestamp.includes(today)
    )

    const districts = [...new Set(records.map(r => r.district))]
    const states = [...new Set(records.map(r => r.state))]

    return {
      total: records.length,
      today: todayRecords.length,
      districts: districts.length,
      states: states.length
    }
  }

  // Debug Screen to View Database Records
  // Debug Screen to View Active State
  if (runtimeError) {
    return (
      <div style={{ padding: 30, color: 'white', background: '#111', minHeight: '100vh' }}>
        <h2 style={{ color: '#ff6666' }}>Runtime Error</h2>
        <pre style={{ whiteSpace: 'pre-wrap', color: '#fff' }}>{String(runtimeError)}</pre>
        <div style={{ marginTop: 20 }}>
          <button onClick={() => window.location.reload()} style={{ padding: '8px 12px' }}>Reload</button>
        </div>
      </div>
    )
  }
  if (currentScreen === 'debug') {
    return (
      <div className="app-container">
        <div className="status-bar"><span className="time">{time}</span></div>
        <div className="debug-header">
          <button className="debug-back-btn" onClick={() => setCurrentScreen('menu')}>← Back</button>
          <h1>Cloud Debug</h1>
        </div>
        <div className="debug-content">
          <div className="debug-section">
            <h2>🔑 Current User</h2>
            <pre className="debug-data">{JSON.stringify(currentUser ? { uid: currentUser.uid, email: currentUser.email } : 'Guest', null, 2)}</pre>
          </div>
          <div className="debug-section">
            <h2>🏠 Active Document</h2>
            <pre className="debug-data">{JSON.stringify(formData, null, 2)}</pre>
          </div>
          <div className="debug-section">
            <h2>📝 Last Post</h2>
            <pre className="debug-data">{JSON.stringify(userPost, null, 2)}</pre>
          </div>
          <div className="debug-section">
            <h2>📢 Ads Synced: {ads.length}</h2>
          </div>
        </div>
      </div>
    )
  }

  // Sign Up Screen
  if (currentScreen === 'signup') {
    return (
      <div className="app-container">
        <div className="status-bar">
          <span className="time">{time}</span>
        </div>

        <div className="content">
          <div className="camera-logo-gradient">
            <img src="/cam4me_logo.png" alt="CAM4ME Logo" style={{ width: '100px', height: '100px', objectFit: 'contain' }} />
          </div>

          <h1 className="auth-title">Sign Up</h1>

          <form onSubmit={handleSignUp} className="auth-form">
            <div className="form-group">
              <label>Email address</label>
              <input
                type="email"
                name="email"
                value={authData.email}
                onChange={handleAuthChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Create Password</label>
              <input
                type="password"
                name="password"
                value={authData.password}
                onChange={handleAuthChange}
                required
                minLength="6"
              />
            </div>

            <div className="form-group">
              <label>Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={authData.confirmPassword}
                onChange={handleAuthChange}
                required
                minLength="6"
              />
            </div>

            <button type="submit" className="auth-submit-btn">Sign Up</button>
          </form>

          <div className="social-divider">
            <span>Connect with</span>
          </div>

          <div className="social-buttons">
            <button className="social-btn google" onClick={() => handleSocialLogin('Google')}>
              <svg width="24" height="24" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
            </button>
            <button className="social-btn facebook" onClick={() => handleSocialLogin('Facebook')}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="#1877F2">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </button>
            <button className="social-btn twitter" onClick={() => handleSocialLogin('X')}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </button>
          </div>

          <div className="auth-footer">
            <span>Already have account? </span>
            <button type="button" className="link-btn" onClick={() => setCurrentScreen('signin')}>Sign in</button>
          </div>

          <div className="staff-login-links" style={{ marginTop: '20px', display: 'flex', justifyContent: 'center', gap: '15px', fontSize: '12px' }}>
            <button type="button" className="link-btn" onClick={() => setCurrentScreen('admin_login')} style={{ color: '#666' }}>Admin Login</button>
            <span style={{ color: '#ccc' }}>|</span>
            <button type="button" className="link-btn" onClick={() => setCurrentScreen('ad_manager_login')} style={{ color: '#666' }}>Ad Manager Login</button>
          </div>
        </div>
      </div>
    )
  }

  // Sign In Screen
  if (currentScreen === 'signin') {
    return (
      <div className="app-container">
        <div className="status-bar">
          <span className="time">{time}</span>
        </div>

        <div className="content">
          <div className="camera-logo-gradient">
            <img src="/cam4me_logo.png" alt="CAM4ME Logo" style={{ width: '100px', height: '100px', objectFit: 'contain' }} />
          </div>

          <h1 className="auth-title">Sign In</h1>

          <form onSubmit={handleSignIn} className="auth-form">
            <div className="form-group">
              <label>Email address</label>
              <input
                type="email"
                name="email"
                value={authData.email}
                onChange={handleAuthChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                name="password"
                value={authData.password}
                onChange={handleAuthChange}
                required
              />
            </div>

            <button type="submit" className="auth-submit-btn">Sign In</button>
          </form>

          <div style={{ textAlign: 'center', marginTop: '10px' }}>
            <button type="button" className="link-btn" onClick={() => {
              setResetStep('request')
              setCurrentScreen('forgot_password')
            }} style={{ color: '#FFD700', fontSize: '13px' }}>Forgot Password?</button>
          </div>

          <div className="social-divider">
            <span>Connect with</span>
          </div>

          <div className="social-buttons">
            <button className="social-btn google" onClick={() => handleSocialLogin('Google')}>
              <svg width="24" height="24" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
            </button>
            <button className="social-btn facebook" onClick={() => handleSocialLogin('Facebook')}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="#1877F2">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </button>
            <button className="social-btn twitter" onClick={() => handleSocialLogin('X')}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </button>
          </div>

          <div className="auth-footer">
            <span>Don't have an account? </span>
            <button type="button" className="link-btn" onClick={() => setCurrentScreen('signup')}>Sign up</button>
          </div>

          <div className="staff-login-links" style={{ marginTop: '20px', display: 'flex', justifyContent: 'center', gap: '15px', fontSize: '12px' }}>
            <button type="button" className="link-btn" onClick={() => setCurrentScreen('admin_login')} style={{ color: '#666' }}>Admin Login</button>
            <span style={{ color: '#ccc' }}>|</span>
            <button type="button" className="link-btn" onClick={() => setCurrentScreen('ad_manager_login')} style={{ color: '#666' }}>Ad Manager Login</button>
          </div>
        </div>
      </div>
    )
  }

  // Show Terms & Conditions after authentication
  if (currentScreen === 'terms') {
    return (
      <div className="app-container">
        <div className="status-bar">
          <span className="time">{time}</span>
        </div>

        <div className="content">
          <div className="terms-header">
            <button className="back-btn-icon" onClick={() => setCurrentScreen('signup')}>←</button>
            <button className="help-btn-icon">?</button>
          </div>

          <div className="camera-logo-gradient">
            <img src="/cam4me_logo.png" alt="CAM4ME Logo" style={{ width: '100px', height: '100px', objectFit: 'contain' }} />
          </div>

          <div className="terms-intro">
            <h2>Hello 👋</h2>
            <p>Before you create an account, please read and accept our Terms & Conditions</p>
          </div>

          <div className="terms-box">
            <h3>Terms & Conditions</h3>
            <p className="terms-updated">Last updated: 4 February 2026</p>
            <div className="terms-content">
              <p>Please read these terms and conditions ("terms and conditions", "terms") carefully before using DailyUI mobile application ("app", "service") operated by DailyUI ("us", "we", "our").</p>

              <h4>1. Conditions of use</h4>
              <p>By using this app, you certify that you have read and reviewed this Agreement and that you agree to comply with its terms. If you do not want to be bound by the terms of this Agreement, you are advised to stop using the app accordingly. DailyUI only grants use and access of this app, its products, and its services to those who have accepted its terms.</p>

              <h4>2. Privacy policy</h4>
              <p>Before you continue using our app, we advise you to read our privacy policy regarding our user data collection. It will help you better understand our practices.</p>

              <h4>3. Age restriction</h4>
              <p>You must be at least 18 (eighteen) years of age before you can use this app. By using this app, you warrant that you are at least 18 years of age and you may legally adhere to this Agreement.</p>

              <h4>4. Intellectual property</h4>
              <p>You agree that all materials, products, and services provided on this app are the property of DailyUI, its affiliates, directors, officers, employees, agents, suppliers, or licensors including all copyrights, trade secrets, trademarks, patents, and other intellectual property.</p>
            </div>
          </div>

          <div className="terms-buttons">
            <button className="decline-btn" onClick={() => setCurrentScreen('signup')}>Decline</button>
            <button className="accept-btn" onClick={handleAcceptTerms}>Accept</button>
          </div>
        </div>
      </div>
    )
  }

  // Helper to get random ad (only active ones)
  // Helper to get random ad (only active ones and matching location)
  const getRandomAd = () => {
    const localNow = new Date()
    const now = new Date(localNow.getTime() - (localNow.getTimezoneOffset() * 60000)).toISOString().slice(0, 16)
    const activeAds = ads.filter(ad => {
      // 1. Time check (If no dates, it's always active)
      if (!ad.startDate || !ad.endDate) return true;

      const isStarted = now >= ad.startDate;
      const isEnded = now > ad.endDate;

      if (!isStarted || isEnded) return false;

      // 2. Targeting check
      if (!ad.runMode || ad.runMode === 'all') return true;

      if (ad.runMode === 'targeted') {
        const userLoc = (selectedCity || formData.district || formData.state || '').toLowerCase();
        if (!userLoc) return true; // Show if user hasn't set location

        return ad.targetLocations.some(loc => {
          const targetName = loc.name.toLowerCase();
          // Simple match: user in Guntur, ad targets Guntur
          return targetName.includes(userLoc) || userLoc.includes(targetName);
        });
      }
      return true;
    });

    if (activeAds.length === 0) return null
    return activeAds[Math.floor(Math.random() * activeAds.length)]
  }

  // Helper to ensure URL is absolute
  const ensureAbsoluteUrl = (url) => {
    if (!url) return '#'
    if (url.startsWith('http://') || url.startsWith('https://')) return url
    return `https://${url}`
  }

  // Profile Setup Screen
  if (currentScreen === 'profile') {
    const currentAd = getRandomAd()

    return (
      <div className="app-container">
        <div className="status-bar">
          <span className="time">{time}</span>
        </div>

        <div className="content profile-content">
          <div className="profile-header">
            <button
              className="profile-back-btn"
              onClick={() => setCurrentScreen('feed')}
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
              </svg>
            </button>
            <div className="profile-logo-small">
              <img src="/cam4me_logo.png" alt="CAM4ME" style={{ width: '40px', height: '40px', objectFit: 'contain' }} />
            </div>
            <div style={{ width: '44px' }}></div> {/* Spacer to keep logo centered */}
          </div>

          <div className="ad-banner">
            <span className="ad-label">Ad</span>
            {currentAd ? (
              <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                <a
                  href={ensureAbsoluteUrl(currentAd.link)}
                  target="_blank"
                  rel="noreferrer"
                  onClick={(e) => { if (!currentAd.link) e.preventDefault() }}
                  style={{ display: 'block', width: '100%' }}
                >
                  <img src={currentAd.image} alt="Advertisement" className="ad-image-main" />
                </a>
                {currentAd.text && (
                  <div className="ad-text-container">
                    <p className="ad-text">{currentAd.text}</p>
                  </div>
                )}
              </div>
            ) : (
              <div style={{ width: '100%' }}>
                <img
                  src="https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=800&q=80"
                  alt="Advertisement"
                  className="ad-image-main"
                />
                <div className="ad-text-container">
                  <p className="ad-text">Your Ad could be here! Reach thousands of users.</p>
                </div>
              </div>
            )}
          </div>

          <div className="photo-upload-section">
            <div className="photo-circle">
              {profileData.photo ? (
                <img src={profileData.photo} alt="Profile" className="profile-photo" />
              ) : (
                <div className="photo-placeholder"></div>
              )}
              <button className="camera-btn" onClick={handleTakePhoto} type="button">
                <svg width="30" height="30" viewBox="0 0 30 30" fill="white">
                  <rect x="6" y="10" width="18" height="13" rx="2" stroke="white" strokeWidth="1.5" fill="none" />
                  <circle cx="15" cy="16.5" r="3.5" stroke="white" strokeWidth="1.5" fill="none" />
                  <path d="M10 10 L11 8 L19 8 L20 10" stroke="white" strokeWidth="1.5" fill="none" />
                </svg>
              </button>
            </div>
          </div>

          <div className="profile-name-input">
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={profileData.name}
              onChange={handleProfileChange}
              placeholder="Enter your name"
            />
          </div>

          <button className="continue-btn" onClick={handleProfileContinue}>
            continue
          </button>

          {showProfileImagePicker && (
            <div style={{
              position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
              background: 'rgba(0,0,0,0.8)', zIndex: 9999,
              display: 'flex', alignItems: 'center', justifyContent: 'center'
            }} onClick={() => setShowProfileImagePicker(false)}>
              <div style={{
                background: '#1a1a1a', padding: '24px', borderRadius: '16px',
                width: '80%', maxWidth: '300px', textAlign: 'center',
                border: '1px solid #333'
              }} onClick={e => e.stopPropagation()}>
                <h3 style={{ color: 'white', marginBottom: '20px', marginTop: 0 }}>Change Profile Photo</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <button onClick={() => handleProfileImageSelect(CameraSource.Camera)} style={{
                    padding: '12px', borderRadius: '8px', border: 'none',
                    background: '#333', color: 'white', fontSize: '16px', cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px'
                  }}>
                    <span>📷</span> Take Photo
                  </button>
                  <button onClick={() => handleProfileImageSelect(CameraSource.Photos)} style={{
                    padding: '12px', borderRadius: '8px', border: 'none',
                    background: '#333', color: 'white', fontSize: '16px', cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px'
                  }}>
                    <span>🖼️</span> Choose from Gallery
                  </button>
                  <button onClick={() => setShowProfileImagePicker(false)} style={{
                    padding: '12px', borderRadius: '8px', border: 'none',
                    background: 'transparent', color: '#888', fontSize: '14px', cursor: 'pointer', marginTop: '8px'
                  }}>
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }

  // Location Permission Screen
  if (currentScreen === 'location') {
    return (
      <div className="app-container">
        <div className="status-bar">
          <span className="time">{time}</span>
        </div>

        <div className="content location-content">
          <div className="profile-logo-small">
            <img src="/cam4me_logo.png" alt="CAM4ME" style={{ width: '40px', height: '40px', objectFit: 'contain' }} />
          </div>

          <div className="location-permission-card">
            <div className="location-icon">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="white">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
              </svg>
            </div>

            <h2 className="location-title">Allow Maps to access this device's precise location?</h2>

            <div className="location-options">
              <div
                className={`location-option ${preciselocation ? 'active' : ''}`}
                onClick={() => setPreciseLocation(true)}
              >
                <div className="map-visual precise">
                  <svg width="100" height="100" viewBox="0 0 100 100">
                    <defs>
                      <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                        <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#E0E0E0" strokeWidth="0.5" />
                      </pattern>
                    </defs>
                    <rect width="100" height="100" fill="url(#grid)" />
                    <circle cx="50" cy="50" r="8" fill="#1976D2" />
                    <circle cx="50" cy="50" r="15" fill="none" stroke="#1976D2" strokeWidth="2" opacity="0.3" />
                  </svg>
                </div>
                <span>Precise</span>
              </div>

              <div
                className={`location-option ${!preciselocation ? 'active' : ''}`}
                onClick={() => setPreciseLocation(false)}
              >
                <div className="map-visual approximate">
                  <svg width="100" height="100" viewBox="0 0 100 100">
                    <path d="M20 80 Q30 60, 40 70 T60 65 T80 75" stroke="#FFA726" strokeWidth="2" fill="none" />
                    <path d="M30 50 Q40 45, 50 48 T70 52" stroke="#FFA726" strokeWidth="2" fill="none" />
                    <path d="M15 30 L85 30" stroke="#90CAF9" strokeWidth="3" />
                    <circle cx="45" cy="60" r="6" fill="#1976D2" />
                    <circle cx="55" cy="55" r="6" fill="#1976D2" />
                  </svg>
                </div>
                <span>Approximate</span>
              </div>
            </div>

            <div className="location-buttons">
              <button
                className="location-btn primary"
                onClick={() => handleLocationPermission('allow-always')}
              >
                While using the app
              </button>
              <button
                className="location-btn secondary"
                onClick={() => handleLocationPermission('allow-once')}
              >
                Only this time
              </button>
              <button
                className="location-btn tertiary"
                onClick={() => handleLocationPermission('deny')}
              >
                Don't allow
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // City and Category Search Screen
  if (currentScreen === 'search') {
    const topAd = getRandomAd()
    const bottomAd = getRandomAd()

    return (
      <div className="app-container">
        <div className="status-bar">
          <span className="time">{time}</span>
        </div>

        <div className="content search-content">
          <div className="profile-logo-small">
            <img src="/cam4me_logo.png" alt="CAM4ME" style={{ width: '40px', height: '40px', objectFit: 'contain' }} />
          </div>

          <div className="ad-banner search-ad-top">
            <span className="ad-label">Ad</span>
            {topAd ? (
              <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                <a
                  href={ensureAbsoluteUrl(topAd.link)}
                  target="_blank"
                  rel="noreferrer"
                  onClick={(e) => { if (!topAd.link) e.preventDefault() }}
                  style={{ display: 'block', width: '100%' }}
                >
                  <img src={topAd.image} alt="Advertisement" className="ad-image-main" />
                </a>
                {topAd.text && (
                  <div className="ad-text-container">
                    <p className="ad-text">{topAd.text}</p>
                  </div>
                )}
              </div>
            ) : (
              <div style={{ width: '100%' }}>
                <img
                  src="https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&q=80"
                  alt="Advertisement"
                  className="ad-image-main"
                />
                <div className="ad-text-container">
                  <p className="ad-text">Promote your business here!</p>
                </div>
              </div>
            )}
          </div>

          <div className="search-buttons">
            <div className="search-btn-container">
              <button
                className={`search-btn city-btn ${showCityList ? 'expanded' : ''}`}
                onClick={() => setShowCityList(!showCityList)}
              >
                <span>{selectedCity || 'City'}</span>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
                </svg>
              </button>
              {showCityList && (
                <div className="dropdown-list city-list">
                  {cities.map((city, index) => (
                    <div
                      key={index}
                      className={`dropdown-item ${selectedCity === city ? 'selected' : ''}`}
                      onClick={() => handleCitySelect(city)}
                    >
                      {city}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="search-btn-container">
              <button
                className={`search-btn category-btn ${showCategoryList ? 'expanded' : ''}`}
                onClick={() => setShowCategoryList(!showCategoryList)}
              >
                <span>{selectedCategory || 'Category'}</span>
              </button>
              {showCategoryList && (
                <div className="dropdown-list category-list">
                  {categories.map((category, index) => (
                    <div
                      key={index}
                      className={`dropdown-item ${selectedCategory === category ? 'selected' : ''}`}
                      onClick={() => handleCategorySelect(category)}
                    >
                      {category}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {selectedCity && selectedCategory && (
            <button className="search-continue-btn" onClick={handleSearchContinue}>
              Continue to Form
            </button>
          )}

          <div className="ad-banner search-ad-bottom">
            <span className="ad-label">Ad</span>
            {bottomAd ? (
              <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                <a
                  href={ensureAbsoluteUrl(bottomAd.link)}
                  target="_blank"
                  rel="noreferrer"
                  onClick={(e) => { if (!bottomAd.link) e.preventDefault() }}
                  style={{ display: 'block', width: '100%' }}
                >
                  <img src={bottomAd.image} alt="Advertisement" className="ad-image-main" />
                </a>
                {bottomAd.text && (
                  <div className="ad-text-container">
                    <p className="ad-text">{bottomAd.text}</p>
                  </div>
                )}
              </div>
            ) : (
              <div style={{ width: '100%' }}>
                <img
                  src="https://images.unsplash.com/photo-1533154683836-84ea7a0bc310?w=800&q=80"
                  alt="Advertisement"
                  className="ad-image-main"
                />
                <div className="ad-text-container">
                  <p className="ad-text">Advertise your services globally.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }

  // New Post Creation Screen
  if (currentScreen === 'newpost') {
    return (
      <div className="app-container newpost-container">
        <div className="status-bar">
          <span className="time">{time}</span>
        </div>

        <div className="newpost-header">
          <button className="newpost-home-btn" onClick={() => setCurrentScreen('feed')}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
              <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
            </svg>
          </button>
          <div className="newpost-camera-logo">
            <img src="/logo_camera.png" alt="CAM4ME" style={{ height: '28px', objectFit: 'contain' }} />
          </div>
          <button className="newpost-menu-btn" onClick={() => setCurrentScreen('menu')}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
              <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
            </svg>
          </button>
        </div>

        <h1 className="newpost-title">New Post</h1>

        <div className="newpost-content">
          <div className="newpost-user-info">
            <div className="newpost-avatar" style={{ background: '#4A90E2' }}>
              {profileData.photo ? (
                <img src={profileData.photo} alt="User" />
              ) : (
                profileData.name.charAt(0).toUpperCase()
              )}
            </div>
            <div className="newpost-user-details">
              <h2>{profileData.name}  {formData.mobile}</h2>
              <p>{selectedCity}        {formData.state}</p>
            </div>
          </div>

          <textarea
            ref={textareaRef}
            className="newpost-textarea"
            placeholder="What's on your mind?"
            value={postText}
            onChange={(e) => setPostText(e.target.value)}
            rows="6"
            readOnly={!isEditing}
            style={{ opacity: isEditing ? 1 : 0.8, cursor: isEditing ? 'text' : 'default' }}
          />

          {postImage && (
            <div className="newpost-image-preview" style={{ position: 'relative' }}>
              <img src={postImage} alt="Post" />
              {isEditing && (
                <button
                  onClick={() => setPostImage(null)}
                  style={{
                    position: 'absolute',
                    top: '5px',
                    right: '5px',
                    background: 'rgba(0,0,0,0.6)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '50%',
                    width: '24px',
                    height: '24px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '16px',
                    fontWeight: 'bold'
                  }}
                >
                  ×
                </button>
              )}
            </div>
          )}

          <div className="newpost-actions">

            <button className="newpost-action-btn gallery-btn" onClick={handleGalleryUpload}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" />
              </svg>
              Gallery
            </button>
            <button className="newpost-action-btn edit-btn" onClick={handleEditPost}>
              Edit
            </button>
            <button className="newpost-action-btn post-btn" onClick={handlePublishPost}>
              {editingPostId ? 'Update' : 'Post'}
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Menu/Profile Screen
  if (currentScreen === 'menu') {
    return (
      <div className="app-container menu-container">
        <div className="status-bar">
          <span className="time">{time}</span>
        </div>

        <div className="menu-header">
          <button className="menu-home-btn" onClick={() => setCurrentScreen('feed')}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
              <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
            </svg>
          </button>
          <div className="menu-camera-logo">
            <img src="/cam4me_logo.png" alt="CAM4ME" style={{ width: '40px', height: '40px', objectFit: 'contain' }} />
          </div>
          <button className="menu-hamburger-btn" onClick={() => setCurrentScreen('feed')}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
              <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
            </svg>
          </button>
        </div>

        <div className="menu-title-bar">
          <h1>Menu</h1>
          <button className="menu-settings-btn">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
              <path d="M19.14,12.94c0.04-0.3,0.06-0.61,0.06-0.94c0-0.32-0.02-0.64-0.07-0.94l2.03-1.58c0.18-0.14,0.23-0.41,0.12-0.61 l-1.92-3.32c-0.12-0.22-0.37-0.29-0.59-0.22l-2.39,0.96c-0.5-0.38-1.03-0.7-1.62-0.94L14.4,2.81c-0.04-0.24-0.24-0.41-0.48-0.41 h-3.84c-0.24,0-0.43,0.17-0.47,0.41L9.25,5.35C8.66,5.59,8.12,5.92,7.63,6.29L5.24,5.33c-0.22-0.08-0.47,0-0.59,0.22L2.74,8.87 C2.62,9.08,2.66,9.34,2.86,9.48l2.03,1.58C4.84,11.36,4.8,11.69,4.8,12s0.02,0.64,0.07,0.94l-2.03,1.58 c-0.18,0.14-0.23,0.41-0.12,0.61l1.92,3.32c0.12,0.22,0.37,0.29,0.59,0.22l2.39-0.96c0.5,0.38,1.03,0.7,1.62,0.94l0.36,2.54 c0.05,0.24,0.24,0.41,0.48,0.41h3.84c0.24,0,0.44-0.17,0.47-0.41l0.36-2.54c0.59-0.24,1.13-0.56,1.62-0.94l2.39,0.96 c0.22,0.08,0.47,0,0.59-0.22l1.92-3.32c0.12-0.22,0.07-0.47-0.12-0.61L19.14,12.94z M12,15.6c-1.98,0-3.6-1.62-3.6-3.6 s1.62-3.6,3.6-3.6s3.6,1.62,3.6,3.6S13.98,15.6,12,15.6z" />
            </svg>
          </button>
        </div>

        <div className="menu-content">
          <div className="menu-profile-section">
            <div className="menu-avatar" style={{ background: '#4A90E2' }}>
              {profileData.photo ? (
                <img src={profileData.photo} alt="User" />
              ) : (
                profileData.name.charAt(0).toUpperCase()
              )}
            </div>
            <div className="menu-profile-info">
              <h2>{profileData.name}  {formData.mobile}</h2>
              <p className="menu-location">{selectedCity}        {formData.state}</p>
              <button className="menu-edit-profile" onClick={() => setCurrentScreen('profile')}>Edit Profile</button>
            </div>
          </div>

          <div className="menu-location-change">
            <div className="location-change-content">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="#00F5FF">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
              </svg>
              <div>
                <h3>Change your location</h3>
                <p>Hyderabad</p>
              </div>
            </div>
            <button className="location-arrow">›</button>
          </div>

          <h3 className="menu-section-title">About App</h3>

          <div className="menu-items">
            {/* 
            <div className="menu-item" onClick={() => setCurrentScreen('debug')} style={{ cursor: 'pointer' }}>
              <div className="menu-item-content">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="#00F5FF">
                  <path d="M20 8h-2.81c-.45-.78-1.07-1.45-1.82-1.96L17 4.41 15.59 3l-2.17 2.17C12.96 5.06 12.49 5 12 5c-.49 0-.96.06-1.41.17L8.41 3 7 4.41l1.62 1.63C7.88 6.55 7.26 7.22 6.81 8H4v2h2.09c-.05.33-.09.66-.09 1v1H4v2h2v1c0 .34.04.67.09 1H4v2h2.81c1.04 1.79 2.97 3 5.19 3s4.15-1.21 5.19-3H20v-2h-2.09c.05-.33.09-.66.09-1v-1h2v-2h-2v-1c0-.34-.04-.67-.09-1H20V8zm-6 8h-4v-2h4v2zm0-4h-4v-2h4v2z" />
                </svg>
                <span style={{ color: '#00F5FF' }}>View Database Records</span>
              </div>
              <button className="menu-arrow">›</button>
            </div>
            */}

            <div className="menu-item">
              <div className="menu-item-content">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                  <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="2" fill="none" />
                  <path d="M12 16v-4m0-4h.01" stroke="white" strokeWidth="2" strokeLinecap="round" />
                </svg>
                <span>About us</span>
              </div>
              <button className="menu-arrow">›</button>
            </div>

            <div className="menu-item">
              <div className="menu-item-content">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                  <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z" />
                </svg>
                <span>Privacy Policy</span>
              </div>
              <button className="menu-arrow">›</button>
            </div>

            <div className="menu-item" onClick={() => setCurrentScreen('feedback')}>
              <div className="menu-item-content">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                  <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z" />
                </svg>
                <span>Feedback</span>
              </div>
              <button className="menu-arrow">›</button>
            </div>

            <div className="menu-item" onClick={() => {
              setResetStep('request')
              setCurrentScreen('forgot_password')
            }} style={{ cursor: 'pointer' }}>
              <div className="menu-item-content">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="#FFD700">
                  <path d="M12.65 10C11.83 7.67 9.61 6 7 6c-3.31 0-6 2.69-6 6s2.69 6 6 6c2.61 0 4.83-1.67 5.65-4H17v4h4v-4h2v-4H12.65zM7 14c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z" />
                </svg>
                <span style={{ color: '#FFD700' }}>Change Password</span>
              </div>
              <button className="menu-arrow">›</button>
            </div>

            <div className="menu-item" onClick={handleLogout} style={{ cursor: 'pointer', marginTop: '10px', borderTop: '1px solid #444', paddingTop: '10px' }}>
              <div className="menu-item-content">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="#FF4444">
                  <path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z" />
                </svg>
                <span style={{ color: '#FF4444' }}>Logout</span>
              </div>
              <button className="menu-arrow">›</button>
            </div>
          </div>
        </div>
      </div>
    )
  }


  // Admin Login Screen
  if (currentScreen === 'admin_login') {
    return (
      <div className="app-container">
        <div className="status-bar">
          <span className="time">{time}</span>
        </div>

        <div className="content">
          <div className="camera-logo-gradient">
            {/* Reusing logo with different colors for Admin */}
            <svg width="100" height="100" viewBox="0 0 100 100" fill="none">
              <rect x="20" y="35" width="60" height="45" rx="5" stroke="#FF4444" strokeWidth="3" fill="none" />
              <circle cx="50" cy="57.5" r="12" stroke="#FF4444" strokeWidth="3" fill="none" />
              <line x1="20" y1="75" x2="80" y2="75" stroke="#FF4444" strokeWidth="3" />
            </svg>
          </div>

          <h1 className="auth-title" style={{ color: '#FF4444' }}>Admin Login</h1>
          <p style={{ textAlign: 'center', color: '#666', marginBottom: '20px' }}>Restricted Access</p>

          <form onSubmit={handleAdminLogin} className="auth-form">
            <div className="form-group">
              <label>Admin Email</label>
              <input
                type="email"
                name="email"
                value={adminAuth.email}
                onChange={handleAdminAuthChange}
                required
                placeholder="admin@cam4me.com"
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                name="password"
                value={adminAuth.password}
                onChange={handleAdminAuthChange}
                required
              />
            </div>

            <button type="submit" className="auth-submit-btn" style={{ background: 'linear-gradient(to right, #FF4444, #CC0000)' }}>Login as Admin</button>
          </form>

          <div style={{ textAlign: 'center', marginTop: '10px' }}>
            <button type="button" className="link-btn" onClick={() => {
              setResetStep('request')
              setCurrentScreen('forgot_password')
            }} style={{ color: '#FF4444', fontSize: '13px' }}>Forgot Password?</button>
          </div>

          <div className="auth-footer">
            <button type="button" className="link-btn" onClick={() => setCurrentScreen('signin')}>Back to User Login</button>
          </div>
        </div>
      </div>
    )
  }

  // Ad Manager Login Screen
  if (currentScreen === 'ad_manager_login') {
    return (
      <div className="app-container">
        <div className="status-bar">
          <span className="time">{time}</span>
        </div>

        <div className="content">
          <div className="camera-logo-gradient">
            {/* Reusing logo with different colors for Ad Manager */}
            <svg width="100" height="100" viewBox="0 0 100 100" fill="none">
              <rect x="20" y="35" width="60" height="45" rx="5" stroke="#FFD700" strokeWidth="3" fill="none" />
              <circle cx="50" cy="57.5" r="12" stroke="#FFD700" strokeWidth="3" fill="none" />
              <line x1="20" y1="75" x2="80" y2="75" stroke="#FFD700" strokeWidth="3" />
            </svg>
          </div>

          <h1 className="auth-title" style={{ color: '#FFD700' }}>Ad Manager</h1>
          <p style={{ textAlign: 'center', color: '#666', marginBottom: '20px' }}>Advertising Portal</p>

          <form onSubmit={handleAdManagerLogin} className="auth-form">
            <div className="form-group">
              <label>Manager Email</label>
              <input
                type="email"
                name="email"
                value={adManagerAuth.email}
                onChange={handleAdManagerAuthChange}
                required
                placeholder="ads@cam4me.com"
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                name="password"
                value={adManagerAuth.password}
                onChange={handleAdManagerAuthChange}
                required
              />
            </div>

            <button type="submit" className="auth-submit-btn" style={{ background: 'linear-gradient(to right, #FFD700, #FFA500)' }}>Login as Manager</button>
          </form>

          <div style={{ textAlign: 'center', marginTop: '10px' }}>
            <button type="button" className="link-btn" onClick={() => {
              setResetStep('request')
              setCurrentScreen('forgot_password')
            }} style={{ color: '#FFD700', fontSize: '13px' }}>Forgot Password?</button>
          </div>

          <div className="auth-footer">
            <button type="button" className="link-btn" onClick={() => setCurrentScreen('signin')}>Back to User Login</button>
          </div>
        </div>
      </div>
    )
  }

  // Forgot Password Screen
  if (currentScreen === 'forgot_password') {
    return (
      <div className="app-container">
        <div className="status-bar">
          <span className="time">{time}</span>
        </div>

        <div className="common-header">
          <button
            className="header-btn"
            onClick={() => currentUser ? setCurrentScreen('menu') : setCurrentScreen('signin')}
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
            </svg>
          </button>
          <div className="header-logo-container">
            <svg width="40" height="40" viewBox="0 0 100 100" fill="none">
              <rect x="20" y="35" width="60" height="45" rx="5" stroke="#FFD700" strokeWidth="3" fill="none" />
              <circle cx="50" cy="57.5" r="12" stroke="#FFD700" strokeWidth="3" fill="none" />
              <line x1="20" y1="75" x2="80" y2="75" stroke="#FFD700" strokeWidth="3" />
            </svg>
          </div>
          <div style={{ width: '44px' }}></div> {/* Spacer */}
        </div>

        <div className="content">
          <h1 className="auth-title">Reset Password</h1>

          {resetStep === 'request' && (
            <form onSubmit={handleForgotPassword} className="auth-form">
              <div className="form-group">
                <label>Select Recovery Method</label>
                <div style={{ display: 'flex', gap: '10px', marginTop: '5px' }}>
                  <button type="button" onClick={() => setOtpTarget('email')} style={{ flex: 1, padding: '10px', borderRadius: '8px', background: otpTarget === 'email' ? '#FFD700' : 'transparent', color: otpTarget === 'email' ? 'black' : 'white', border: '1px solid #FFD700' }}>Email</button>
                  <button type="button" onClick={() => setOtpTarget('mobile')} style={{ flex: 1, padding: '10px', borderRadius: '8px', background: otpTarget === 'mobile' ? '#FFD700' : 'transparent', color: otpTarget === 'mobile' ? 'black' : 'white', border: '1px solid #FFD700' }}>Mobile</button>
                </div>
              </div>

              {otpTarget === 'email' ? (
                <div className="form-group">
                  <label>Email Address</label>
                  <input type="email" value={forgotPasswordEmail} onChange={(e) => setForgotPasswordEmail(e.target.value)} required placeholder="Enter your email" />
                </div>
              ) : (
                <div className="form-group">
                  <label>Mobile Number</label>
                  <input type="tel" value={tempMobile} onChange={(e) => setTempMobile(e.target.value)} required placeholder="Enter registered mobile" />
                </div>
              )}

              <button type="submit" className="auth-submit-btn" style={{ background: '#FFD700', color: 'black' }}>
                {otpTarget === 'email' ? 'Send Reset Link' : 'Send OTP'}
              </button>
            </form>
          )}

          {resetStep === 'verify' && (
            <div className="auth-form">
              <div className="form-group">
                <label>Enter 6-Digit OTP</label>
                <input type="text" maxLength="6" value={otpValue} onChange={(e) => setOtpValue(e.target.value)} placeholder="000000" style={{ textAlign: 'center', fontSize: '24px', letterSpacing: '5px', background: 'white', color: 'black' }} />
              </div>
              <button onClick={handleVerifyOTP} className="auth-submit-btn" style={{ background: '#FFD700', color: 'black' }}>Verify OTP</button>
            </div>
          )}

          {resetStep === 'new_password' && (
            <div className="auth-form">
              <div className="form-group" style={{ marginBottom: '15px' }}>
                <label>Create New Password</label>
                <input type="password" placeholder="New Password" id="new-pwd-reset" style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ccc' }} />
              </div>
              <button onClick={() => handleResetPassword(document.getElementById('new-pwd-reset').value)} className="auth-submit-btn" style={{ background: '#FFD700', color: 'black' }}>Update Password</button>
            </div>
          )}


        </div>
      </div>
    )
  }

  // Admin Dashboard
  if (currentScreen === 'admin_dashboard') {
    return (
      <div className="app-container">
        <div className="status-bar">
          <span className="time">{time}</span>
        </div>
        <div className="debug-header" style={{ background: '#FF4444', height: '60px', display: 'flex', alignItems: 'center', padding: '0 16px', justifyContent: 'space-between' }}>
          <button className="header-btn" onClick={handleLogout} style={{ color: 'white' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z" />
            </svg>
          </button>
          <h1 style={{ fontSize: '18px', margin: 0, color: 'white', flex: 1, textAlign: 'center' }}>Admin Dashboard</h1>
          <div style={{ width: '44px' }}></div>
        </div>
        <div className="debug-content">
          <div className="debug-section">
            <h2>User Management</h2>
            <p>Total Users: 1,245</p>
            <p>Active Today: 450</p>
            <button className="auth-submit-btn" style={{ marginTop: '10px', background: '#333' }} onClick={() => setCurrentScreen('admin_users')}>Manage Users</button>
          </div>
          <div className="debug-section">
            <h2>System Health</h2>
            <p>Database: OTIS</p>
            <p>Server Status: Online</p>
            <button className="auth-submit-btn" style={{ marginTop: '10px', background: '#333' }} onClick={() => setCurrentScreen('admin_feedbacks')}>User Feedbacks</button>
          </div>
          <div className="debug-section">
            <h2>📢 Notification Management</h2>
            <p>Total Notifications: {notifications.length}</p>
            <p>Scheduled: {notifications.filter(n => n.isScheduled && n.scheduleEnabled).length}</p>
            <button className="auth-submit-btn" style={{ marginTop: '10px', background: '#4A90E2' }} onClick={() => setCurrentScreen('admin_notifications')}>Manage Notifications</button>
          </div>
        </div>
      </div>
    )
  }

  // Ad Manager Dashboard
  if (currentScreen === 'ad_manager_dashboard') {
    // Filter only active ads (by date)
    const now = new Date();
    const activeAds = ads.filter(ad => {
      if (!ad.startDate || !ad.endDate) return false;
      const start = new Date(ad.startDate);
      const end = new Date(ad.endDate);
      return start <= now && end >= now;
    });
    return (
      <div className="app-container">
        <div className="status-bar">
          <span className="time">{time}</span>
        </div>
        <div className="debug-header" style={{ background: '#FFD700', height: '60px', display: 'flex', alignItems: 'center', padding: '0 16px', justifyContent: 'space-between' }}>
          <button className="header-btn" onClick={handleLogout} style={{ color: 'black' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z" />
            </svg>
          </button>
          <h1 style={{ fontSize: '18px', margin: 0, color: 'black', flex: 1, textAlign: 'center' }}>Ad Manager</h1>
          <div style={{ width: '44px' }}></div>
        </div>
        <div className="debug-content">
          <div className="debug-section">
            <h2>Active Campaigns</h2>
            <div style={{ color: '#c00', fontSize: '12px', marginBottom: '10px' }}>Now: {now.toString()}</div>
            {activeAds.length > 0 ? (
              activeAds.map((ad, idx) => (
                <div key={ad.id || idx} className="ad-banner" style={{ margin: '15px 0', position: 'relative', background: '#f5f5f5', padding: '10px', borderRadius: '8px' }}>
                  <span className="ad-label">Active</span>
                  <img src={ad.image} alt={`Ad ${idx}`} style={{ width: '100%', borderRadius: '8px', border: '1px solid #eee' }} />
                  <div style={{ marginTop: '10px' }}>
                    {ad.text && <p style={{ fontSize: '14px', marginBottom: '5px', whiteSpace: 'pre-wrap' }}>{ad.text}</p>}
                    {ad.link && (
                      <a href={ad.link} target="_blank" rel="noreferrer" style={{ color: '#007bff', fontSize: '13px', textDecoration: 'none' }}>
                        {ad.link} ↗
                      </a>
                    )}
                    <div style={{ marginTop: '8px', fontSize: '12px', color: '#666', borderTop: '1px solid #ddd', paddingTop: '5px' }}>
                      <strong>Duration:</strong><br />
                      From: {String(ad.startDate).replace('T', ' ')}<br />
                      To: {String(ad.endDate).replace('T', ' ')}
                    </div>
                  </div>
                  <div style={{ position: 'absolute', top: '10px', right: '10px', display: 'flex', gap: '5px' }}>
                    <button
                      onClick={() => {
                        setAdFormData({
                          id: ad.id,
                          firebaseId: ad.firebaseId,
                          image: ad.image,
                          text: ad.text || '',
                          link: ad.link || '',
                          startDate: ad.startDate || new Date(Date.now() - (new Date().getTimezoneOffset() * 60000)).toISOString().slice(0, 16),
                          endDate: ad.endDate || new Date(Date.now() + 7 * 24 * 60 * 60 * 1000 - (new Date().getTimezoneOffset() * 60000)).toISOString().slice(0, 16),
                          targetLocations: ad.targetLocations || [],
                          runMode: ad.runMode || 'all'
                        })
                        setCurrentScreen('ad_manager_create')
                      }}
                      style={{
                        background: 'rgba(255, 255, 255, 0.9)',
                        color: '#333',
                        border: 'none',
                        borderRadius: '50%',
                        width: '30px',
                        height: '30px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 'bold'
                      }}
                      title="Edit Ad"
                    >
                      ✎
                    </button>
                    <button
                      onClick={async () => {
                        if (window.confirm('Delete this ad?')) {
                          try {
                            await database.deleteAd(ad.id);
                            setAds(ads.filter(a => a.id !== ad.id));
                          } catch (err) {
                            console.error('Delete error:', err);
                            alert('Failed to delete ad');
                          }
                        }
                      }}
                      style={{
                        background: 'rgba(255, 0, 0, 0.8)',
                        color: 'white',
                        border: 'none',
                        borderRadius: '50%',
                        width: '30px',
                        height: '30px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 'bold'
                      }}
                      title="Delete Ad"
                    >
                      🗑
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p>No active campaigns found.</p>
            )}

            <button
              className="auth-submit-btn"
              style={{ marginTop: '20px', background: 'linear-gradient(to right, #FFD700, #FFA500)', color: 'black' }}
              onClick={() => {
                setAdFormData({
                  id: null,
                  image: null,
                  text: '',
                  link: '',
                  startDate: new Date(Date.now() - (new Date().getTimezoneOffset() * 60000)).toISOString().slice(0, 16),
                  endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000 - (new Date().getTimezoneOffset() * 60000)).toISOString().slice(0, 16),
                  targetLocations: [],
                  runMode: 'all'
                })
                setCurrentScreen('ad_manager_create')
              }}
            >
              + Post New Ad
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Admin User Management Screen
  if (currentScreen === 'admin_users') {
    return (
      <div className="app-container">
        <div className="status-bar">
          <span className="time">{time}</span>
        </div>
        <div className="debug-header" style={{ background: '#FF4444', height: '60px', display: 'flex', alignItems: 'center', padding: '0 16px', justifyContent: 'space-between' }}>
          <button className="header-btn" onClick={() => setCurrentScreen('admin_dashboard')} style={{ color: 'white' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
            </svg>
          </button>
          <h1 style={{ fontSize: '18px', margin: 0, color: 'white', flex: 1, textAlign: 'center' }}>Manage Users</h1>
          <div style={{ width: '44px' }}></div>
        </div>
        <div className="debug-content">
          <div className="debug-section">
            <h2>Registered Users ({records.length})</h2>
            {records.map((record) => {
              const isBlocked = blockedUsers.includes(record.id) || blockedUsers.includes(record.uid)
              return (
                <div key={record.id || record.uid} className="record-card" style={{ marginBottom: '15px', padding: '15px', background: '#222', borderRadius: '10px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                      <h3 style={{ margin: 0, color: 'white' }}>{record.name || 'Unnamed User'}</h3>
                      <p style={{ margin: '5px 0', fontSize: '13px', color: '#aaa' }}>{record.mobile || 'No mobile'}</p>
                      <p style={{ margin: '2px 0', fontSize: '12px', color: '#888' }}>{record.district}, {record.state}</p>
                      <p style={{ margin: '8px 0 0 0', fontSize: '12px', color: isBlocked ? '#FF4444' : '#4CAF50', fontWeight: 'bold' }}>
                        Status: {isBlocked ? 'DISABLED' : 'ACTIVE'}
                      </p>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <button
                        onClick={async () => {
                          try {
                            const userId = record.id || record.uid
                            let newBlocked
                            if (isBlocked) {
                              newBlocked = blockedUsers.filter(id => id !== userId)
                            } else {
                              if (confirm('Are you sure you want to disable this user for suspicious activity?')) {
                                newBlocked = [...blockedUsers, userId]
                              } else {
                                return
                              }
                            }
                            // Save to Firestore
                            await setDoc(doc(db, 'system', 'moderation'), { blockedUsers: newBlocked }, { merge: true })
                            // Update local state and localStorage for immediate persist
                            setBlockedUsers(newBlocked)
                            localStorage.setItem('blockedUsers', JSON.stringify(newBlocked))
                          } catch (err) {
                            alert("Failed to update status: " + err.message)
                          }
                        }}
                        style={{
                          padding: '8px 12px',
                          borderRadius: '5px',
                          border: 'none',
                          background: isBlocked ? '#4CAF50' : '#FF4444',
                          color: 'white',
                          cursor: 'pointer',
                          fontSize: '12px',
                          fontWeight: 'bold'
                        }}
                      >
                        {isBlocked ? 'Enable' : 'Disable'}
                      </button>
                      <button
                        onClick={async () => {
                          if (!confirm('Permanently delete this user account? This removes their profile from both the cloud and this local device.')) return
                          try {
                            const targetUid = record.uid || record.id

                            // 1. Delete from Local SQLite (Profile + Posts)
                            await database.deleteUser(targetUid)
                            await database.deletePostsByUser(targetUid)

                            // 2. Delete from Cloud Firestore (if applicable)
                            try {
                              await deleteDoc(doc(db, 'users', targetUid))
                            } catch (firestoreErr) {
                              console.warn('Cloud deletion skipped (may not exist):', firestoreErr)
                            }

                            alert('User deleted successfully from local database and cloud.')
                            loadRecords() // Refresh the local list
                          } catch (err) {
                            console.error('Failed to delete user:', err)
                            alert('Failed to delete user: ' + (err.message || err))
                          }
                        }}
                        style={{
                          padding: '8px 12px',
                          borderRadius: '5px',
                          border: 'none',
                          background: '#555',
                          color: 'white',
                          cursor: 'pointer',
                          fontSize: '12px'
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}
            {records.length === 0 && <p className="debug-empty" style={{ textAlign: 'center', padding: '20px', color: '#666' }}>No users found in database.</p>}
          </div>
        </div>
      </div>
    )
  }

  // Admin Feedbacks Screen
  if (currentScreen === 'admin_feedbacks') {
    return (
      <div className="app-container">
        <div className="status-bar">
          <span className="time">{time}</span>
        </div>
        <div className="debug-header" style={{ background: '#FF4444', height: '60px', display: 'flex', alignItems: 'center', padding: '0 16px', justifyContent: 'space-between' }}>
          <button className="header-btn" onClick={() => setCurrentScreen('admin_dashboard')} style={{ color: 'white' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
            </svg>
          </button>
          <h1 style={{ fontSize: '18px', margin: 0, color: 'white', flex: 1, textAlign: 'center' }}>User Feedbacks</h1>
          <div style={{ width: '44px' }}></div>
        </div>
        <div className="debug-content">
          <div className="debug-section">
            <h2>Recent Feedbacks ({feedbacks.length})</h2>
            {feedbacks.map((fb) => (
              <div key={fb.id} className="record-card" style={{ marginBottom: '15px', padding: '15px', background: '#222', borderRadius: '10px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <div>
                    <h3 style={{ margin: 0, color: 'white', fontSize: '16px' }}>{fb.userName}</h3>
                    <p style={{ margin: '2px 0', fontSize: '12px', color: '#00F5FF' }}>{fb.userEmail}</p>
                  </div>
                  <span style={{ fontSize: '11px', color: '#666' }}>{new Date(fb.timestamp).toLocaleDateString()}</span>
                </div>
                <div style={{ background: 'rgba(255,255,255,0.05)', padding: '10px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)' }}>
                  <p style={{ margin: 0, color: '#eee', fontSize: '14px', lineHeight: '1.4', whiteSpace: 'pre-wrap' }}>{fb.message}</p>
                </div>
              </div>
            ))}
            {feedbacks.length === 0 && <p className="debug-empty" style={{ textAlign: 'center', padding: '20px', color: '#666' }}>No feedbacks found.</p>}
          </div>
        </div>
      </div>
    )
  }

  // User Feedback Submission Screen
  if (currentScreen === 'feedback') {
    return (
      <div className="app-container">
        <div className="status-bar">
          <span className="time">{time}</span>
        </div>
        <div className="common-header">
          <button className="header-btn" onClick={() => setCurrentScreen('menu')}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
            </svg>
          </button>
          <div className="header-logo-container">
            <h1 style={{ color: 'white', fontSize: '18px', margin: 0 }}>Feedback</h1>
          </div>
          <div style={{ width: '44px' }}></div>
        </div>

        <div className="content" style={{ padding: '20px' }}>
          <div style={{ textAlign: 'center', marginBottom: '30px' }}>
            <div style={{
              width: '80px',
              height: '80px',
              background: 'rgba(0, 245, 255, 0.1)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 15px'
            }}>
              <svg width="40" height="40" viewBox="0 0 24 24" fill="#00F5FF">
                <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z" />
              </svg>
            </div>
            <h2 style={{ color: 'white', fontSize: '22px', marginBottom: '10px' }}>Help us improve!</h2>
            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '14px', lineHeight: '1.5' }}>
              Have an issue or a suggestion? Please elaborate below. We'll look into it as soon as possible.
            </p>
          </div>

          <form onSubmit={handleFeedbackSubmit} className="auth-form" style={{ width: '100%', maxWidth: '100%' }}>
            <div className="form-group">
              <label style={{ color: 'rgba(255,255,255,0.9)', marginBottom: '8px' }}>Your Message</label>
              <textarea
                placeholder="Describe your issue or suggestions here..."
                value={feedbackMessage}
                onChange={(e) => setFeedbackMessage(e.target.value)}
                required
                style={{
                  width: '100%',
                  minHeight: '200px',
                  padding: '15px',
                  borderRadius: '12px',
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  color: 'white',
                  fontSize: '15px',
                  resize: 'none'
                }}
              ></textarea>
            </div>
            <button type="submit" className="auth-submit-btn" style={{
              marginTop: '20px',
              background: 'linear-gradient(90deg, #00F5FF, #0099CC)',
              color: 'black',
              fontWeight: 'bold'
            }}>
              Submit Feedback
            </button>
          </form>
        </div>
      </div>
    )
  }

  // Ad Manager Create Screen
  if (currentScreen === 'ad_manager_create') {
    return (
      <div className="app-container">
        <div className="status-bar">
          <span className="time">{time}</span>
        </div>
        <div className="debug-header" style={{ background: '#FFD700', height: '60px', display: 'flex', alignItems: 'center', padding: '0 16px', justifyContent: 'space-between' }}>
          <button className="header-btn" onClick={() => setCurrentScreen('ad_manager_dashboard')} style={{ color: 'black' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
            </svg>
          </button>
          <h1 style={{ fontSize: '18px', margin: 0, color: 'black', flex: 1, textAlign: 'center' }}>{adFormData.id ? 'Edit Ad' : 'Post New Ad'}</h1>
          <div style={{ width: '44px' }}></div>
        </div>
        <div style={{ flex: 1, overflowY: 'auto', padding: '0 20px 20px' }}>
          <div className="auth-form" style={{ padding: '10px 0', maxWidth: '100%', gap: '10px' }}>
            <div className="form-group">
              <label style={{ color: 'white', fontWeight: '700', textShadow: '0 1px 3px rgba(0,0,0,0.8)' }}>1. Upload Ad Banner (1920 x 1080 ONLY)</label>
              <div
                style={{
                  border: '2px dashed #FFD700',
                  padding: '20px',
                  borderRadius: '10px',
                  textAlign: 'center',
                  marginTop: '10px',
                  cursor: 'pointer',
                  background: 'rgba(255, 255, 255, 0.05)',
                  position: 'relative',
                  overflow: 'hidden',
                  minHeight: '100px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
                onClick={() => document.getElementById('ad-upload').click()}
              >
                {adFormData.image ? (
                  <>
                    <img src={adFormData.image} alt="Selected" style={{ width: '100%', maxHeight: '150px', objectFit: 'contain', borderRadius: '8px', opacity: 0.9 }} />
                    <p style={{ color: '#00FF88', fontWeight: 'bold', marginTop: '5px', fontSize: '13px' }}>✓ Image Selected</p>
                  </>
                ) : (
                  <p style={{ color: 'white' }}>Click to select image</p>
                )}
                <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.6)', display: 'block', marginTop: '2px' }}>Must be exactly 1920x1080 pixels</span>
              </div>
              <input
                id="ad-upload"
                type="file"
                accept="image/*"
                style={{ display: 'none' }}
                onChange={(e) => {
                  const file = e.target.files[0]
                  if (file) {
                    const img = new Image()
                    img.src = URL.createObjectURL(file)
                    img.onload = () => {
                      const reader = new FileReader()
                      reader.onload = (ev) => {
                        setAdFormData({ ...adFormData, image: ev.target.result })
                      }
                      reader.readAsDataURL(file)

                      if (img.width !== 1920 || img.height !== 1080) {
                        alert(`Note: Recommended size is 1920x1080. \nActual: ${img.width}x${img.height}. \nYour image still saved but may look distorted.`)
                      }
                    }
                  }
                }}
              />
            </div>

            <div className="form-group">
              <label style={{ color: 'white', fontWeight: '700', textShadow: '0 1px 3px rgba(0,0,0,0.8)' }}>2. Ad Text / Description (Optional)</label>
              <textarea
                placeholder="Write something about this ad..."
                value={adFormData.text}
                onChange={(e) => setAdFormData({ ...adFormData, text: e.target.value })}
                rows="2"
                style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ccc', background: 'white', color: 'black', fontSize: '14px' }}
              />
            </div>

            <div className="form-group">
              <label style={{ color: 'white', fontWeight: '700', textShadow: '0 1px 3px rgba(0,0,0,0.8)' }}>3. Website Link (Optional)</label>
              <input
                type="url"
                placeholder="https://example.com"
                value={adFormData.link}
                onChange={(e) => setAdFormData({ ...adFormData, link: e.target.value })}
                style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ccc', background: 'white', color: 'black' }}
              />
            </div>

            <div className="form-group">
              <label style={{ color: 'white', fontWeight: '700', textShadow: '0 1px 3px rgba(0,0,0,0.8)' }}>4. Duration (Start & End Time)</label>
              <div style={{ display: 'flex', gap: '10px', marginTop: '5px' }}>
                <div style={{ flex: 1 }}>
                  <span style={{ fontSize: '12px', color: 'white' }}>Start</span>
                  <input
                    type="datetime-local"
                    value={adFormData.startDate}
                    onChange={(e) => setAdFormData({ ...adFormData, startDate: e.target.value })}
                    style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ccc', background: 'white', color: 'black' }}
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <span style={{ fontSize: '12px', color: 'white' }}>End</span>
                  <input
                    type="datetime-local"
                    value={adFormData.endDate}
                    onChange={(e) => setAdFormData({ ...adFormData, endDate: e.target.value })}
                    style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ccc', background: 'white', color: 'black' }}
                  />
                </div>
              </div>
            </div>

            <div className="form-group">
              <label style={{ color: 'white', fontWeight: '700', textShadow: '0 1px 3px rgba(0,0,0,0.8)' }}>5. Run Ad For:</label>
              <div style={{ display: 'flex', gap: '10px', marginTop: '5px' }}>
                <button
                  onClick={() => setAdFormData({ ...adFormData, runMode: 'all' })}
                  style={{ flex: 1, padding: '12px', borderRadius: '8px', border: adFormData.runMode === 'all' ? '2px solid #FFD700' : '1px solid #666', background: adFormData.runMode === 'all' ? '#FFD700' : 'transparent', color: adFormData.runMode === 'all' ? 'black' : 'white', fontWeight: 'bold' }}
                >All Cam4Me Users</button>
                <button
                  onClick={() => setAdFormData({ ...adFormData, runMode: 'targeted' })}
                  style={{ flex: 1, padding: '12px', borderRadius: '8px', border: adFormData.runMode === 'targeted' ? '2px solid #FFD700' : '1px solid #666', background: adFormData.runMode === 'targeted' ? '#FFD700' : 'transparent', color: adFormData.runMode === 'targeted' ? 'black' : 'white', fontWeight: 'bold' }}
                >Target Locations</button>
              </div>
            </div>

            {adFormData.runMode === 'targeted' && (
              <div className="form-group">
                <label style={{ color: 'white', fontWeight: '700', textShadow: '0 1px 3px rgba(0,0,0,0.8)' }}>6. Select Target Locations</label>
                <button
                  type="button"
                  onClick={() => setShowLocationModal(true)}
                  style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '2px solid #FFD700', background: 'transparent', color: '#FFD700', fontWeight: '600', marginTop: '5px' }}
                >📍 Add New Location</button>
                <div style={{ marginTop: '10px', display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {adFormData.targetLocations.map((loc, idx) => (
                    <div key={idx} style={{ background: 'rgba(255,255,255,0.1)', padding: '5px 12px', borderRadius: '20px', fontSize: '13px', color: 'white', border: '1px solid white' }}>
                      {loc.name} ({loc.targetingLabel})
                      <span onClick={() => setAdFormData({ ...adFormData, targetLocations: adFormData.targetLocations.filter((_, i) => i !== idx) })} style={{ marginLeft: '8px', cursor: 'pointer', color: '#FF6B6B' }}>×</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <button
              onClick={async () => { await saveAd() }}
              className="auth-submit-btn"
              style={{ background: '#FFD700', color: 'black', marginTop: '20px' }}
              disabled={savingAd}
            >{savingAd ? 'Saving...' : 'Save Ad'}</button>
            {lastAdError && (
              <div style={{ marginTop: '10px', color: 'white', background: 'rgba(255,0,0,0.15)', padding: '8px', borderRadius: '6px' }}>
                <strong>Last error:</strong> {lastAdError}
              </div>
            )}
          </div>
        </div>


        {showLocationModal && (
          <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.8)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ background: 'white', width: '90%', maxWidth: '400px', borderRadius: '20px', padding: '20px' }}>
              <h3>Targeting</h3>
              <div style={{ position: 'relative', marginTop: '5px' }}>
                <input
                  type="text"
                  placeholder="Search (e.g. Telangana, India, Guntur...)"
                  value={tempLocation.name}
                  onChange={(e) => {
                    setTempLocation({ ...tempLocation, name: e.target.value })
                    // Automatic fetch triggered by useEffect for high speed
                  }}
                  style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #ccc', color: 'black' }}
                />
                {locationSuggestions.length > 0 && (
                  <div style={{ position: 'absolute', top: '100%', left: 0, right: 0, background: 'white', zIndex: 100, border: '1px solid #ccc', borderRadius: '10px', marginTop: '5px', boxShadow: '0 8px 16px rgba(0,0,0,0.15)', overflow: 'hidden' }}>
                    {locationSuggestions.map((s, i) => (
                      <div key={i} onClick={() => {
                        let type = 'Full Area';
                        if (s.toLowerCase().includes('district')) type = 'Full District';
                        if (s.toLowerCase().includes('state') || ['telangana', 'andhra pradesh', 'new york'].includes(s.toLowerCase())) type = 'Full State';
                        if (['india', 'usa', 'canada', 'australia'].includes(s.toLowerCase())) type = 'Full Country';
                        if (['asia', 'europe'].includes(s.toLowerCase())) type = 'Full Continent';
                        if (s.toLowerCase().includes('world')) type = 'Full World';

                        setTempLocation({ ...tempLocation, name: s, region: type });
                        setLocationSuggestions([]);
                        const mapOverlay = document.querySelector('.map-scan-overlay');
                        if (mapOverlay) {
                          mapOverlay.style.opacity = '1';
                          setTimeout(() => { if (mapOverlay) mapOverlay.style.opacity = '0'; }, 300);
                        }
                      }} style={{ padding: '12px 15px', cursor: 'pointer', borderBottom: '1px solid #f0f0f0', color: '#333' }}>{s}</div>
                    ))}
                  </div>
                )}
              </div>

              {/* REAL LIVE MAP VIEW */}
              <div style={{ width: '100%', height: '220px', background: '#eef2f7', borderRadius: '16px', marginBottom: '15px', marginTop: '15px', position: 'relative', overflow: 'hidden', border: '2px solid #ddd' }}>
                {tempLocation.name ? (
                  <iframe
                    title="Real Map"
                    width="100%"
                    height="100%"
                    frameBorder="0"
                    src={`https://maps.google.com/maps?q=${encodeURIComponent(tempLocation.name)}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
                    style={{ filter: 'grayscale(0.1) contrast(1.1)' }}
                  ></iframe>
                ) : (
                  <div style={{ padding: '60px', textAlign: 'center', color: '#666' }}>
                    <div style={{ fontSize: '40px' }}>🗺️</div>
                    <p>Searching for Map...</p>
                  </div>
                )}
                <div className="map-scan-overlay" style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(25, 118, 210, 0.1)', opacity: 0, transition: 'opacity 0.2s', zIndex: 5, pointerEvents: 'none' }}></div>

                {/* Visual Center Marker overlay if needed */}
                {tempLocation.name && (
                  <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -100%)', zIndex: 10, pointerEvents: 'none' }}>
                    <div style={{ fontSize: '30px', filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.5))' }}>📍</div>
                  </div>
                )}

                {/* Radius Overlay on Map */}
                {tempLocation.type === 'radius' && tempLocation.name && (
                  <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: `${Math.min(200, tempLocation.radius * 3)}px`,
                    height: `${Math.min(200, tempLocation.radius * 3)}px`,
                    border: '3px solid #1976D2',
                    background: 'rgba(25, 118, 210, 0.2)',
                    borderRadius: '50%',
                    pointerEvents: 'none',
                    zIndex: 8,
                    animation: 'pulse 2s infinite'
                  }}></div>
                )}
              </div>

              <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
                <button onClick={() => setTempLocation({ ...tempLocation, type: 'radius' })} style={{ flex: 1, padding: '10px', background: tempLocation.type === 'radius' ? '#1976D2' : '#f0f0f0', color: tempLocation.type === 'radius' ? 'white' : '#666', border: 'none', borderRadius: '10px', fontWeight: '600', cursor: 'pointer' }}>Radius (KM)</button>
                <button onClick={() => setTempLocation({ ...tempLocation, type: 'region' })} style={{ flex: 1, padding: '10px', background: tempLocation.type === 'region' ? '#1976D2' : '#f0f0f0', color: tempLocation.type === 'region' ? 'white' : '#666', border: 'none', borderRadius: '10px', fontWeight: '600', cursor: 'pointer' }}>Entire Region</button>
              </div>

              {tempLocation.type === 'radius' ? (
                <div style={{ marginBottom: '15px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span style={{ fontSize: '13px', color: '#666', fontWeight: '600' }}>Adjust Radius</span>
                    <span style={{ fontSize: '14px', fontWeight: '800', color: '#1976D2' }}>{tempLocation.radius} KM</span>
                  </div>
                  <input type="range" min="1" max="100" value={tempLocation.radius} onChange={(e) => setTempLocation({ ...tempLocation, radius: parseInt(e.target.value) })} style={{ width: '100%', accentColor: '#1976D2' }} />
                </div>
              ) : (
                <div style={{ marginBottom: '15px' }}>
                  <label style={{ fontSize: '13px', color: '#666', display: 'block', marginBottom: '8px', fontWeight: '600' }}>Region detected:</label>
                  <select value={tempLocation.region} onChange={(e) => setTempLocation({ ...tempLocation, region: e.target.value })} style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #ccc', background: '#f9f9f9', color: 'black' }}>
                    <option>{tempLocation.region}</option>
                  </select>
                </div>
              )}

              <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                <button onClick={() => {
                  if (!tempLocation.name) return alert('Select a location first!');
                  const label = tempLocation.type === 'radius' ? `${tempLocation.radius}km` : tempLocation.region;
                  setAdFormData({ ...adFormData, targetLocations: [...adFormData.targetLocations, { ...tempLocation, targetingLabel: label, id: Date.now() }] });
                  setTempLocation({ name: '', type: 'radius', radius: 5, region: 'Full Country' });
                  alert('Location Added!');
                }} style={{ flex: 1, padding: '14px', background: '#1976D2', color: 'white', border: 'none', borderRadius: '12px', fontWeight: 'bold', cursor: 'pointer', boxShadow: '0 4px 10px rgba(25, 118, 210, 0.2)' }}>+ Add Location</button>
                <button onClick={() => setShowLocationModal(false)} style={{ padding: '14px 20px', background: '#FFD700', color: 'black', border: 'none', borderRadius: '12px', fontWeight: 'bold', cursor: 'pointer' }}>Done</button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Admin Notifications List Screen
  if (currentScreen === 'admin_notifications') {
    return (
      <div className="app-container">
        <div className="status-bar">
          <span className="time">{time}</span>
        </div>
        <div className="debug-header" style={{ background: '#4A90E2', height: '60px', display: 'flex', alignItems: 'center', padding: '0 16px', justifyContent: 'space-between' }}>
          <button className="header-btn" onClick={() => setCurrentScreen('admin_dashboard')} style={{ color: 'white' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
            </svg>
          </button>
          <h1 style={{ fontSize: '18px', margin: 0, color: 'white', flex: 1, textAlign: 'center' }}>Manage Notifications</h1>
          <button className="header-btn" onClick={() => {
            setNotificationFormData({
              id: null,
              title: '',
              message: '',
              scheduledDate: '',
              scheduledTime: '',
              isScheduled: false,
              scheduleEnabled: true,
              status: 'draft'
            });
            setEditingNotificationId(null);
            setCurrentScreen('admin_notification_form');
          }} style={{ color: 'white', fontSize: '24px' }}>
            +
          </button>
        </div>
        <div className="debug-content" style={{ padding: '16px' }}>
          {notifications.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px 20px', color: '#666' }}>
              <p style={{ fontSize: '48px', margin: '0 0 16px 0' }}>📢</p>
              <p style={{ fontSize: '16px', marginBottom: '8px' }}>No notifications yet</p>
              <p style={{ fontSize: '14px', color: '#999' }}>Create your first notification to get started</p>
            </div>
          ) : (
            notifications.map((notification) => (
              <div key={notification.id} style={{ background: '#f5f5f5', borderRadius: '12px', padding: '16px', marginBottom: '12px', border: '1px solid #e0e0e0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                  <h3 style={{ margin: 0, fontSize: '16px', color: '#333', flex: 1 }}>{notification.title}</h3>
                  <span style={{
                    padding: '4px 12px',
                    borderRadius: '12px',
                    fontSize: '11px',
                    fontWeight: 'bold',
                    background: notification.status === 'sent' ? '#4CAF50' : notification.status === 'scheduled' ? '#FF9800' : '#999',
                    color: 'white'
                  }}>
                    {notification.status || 'draft'}
                  </span>
                </div>
                <p style={{ margin: '8px 0', fontSize: '14px', color: '#666', lineHeight: '1.5' }}>{notification.message}</p>

                {notification.isScheduled && (
                  <div style={{ background: '#fff', padding: '8px 12px', borderRadius: '8px', marginTop: '8px', fontSize: '13px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                      <span>🕒</span>
                      <span style={{ fontWeight: '600' }}>Scheduled:</span>
                      <span>{notification.scheduledDate} at {notification.scheduledTime}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span>{notification.scheduleEnabled ? '✅' : '⏸️'}</span>
                        <span style={{ color: notification.scheduleEnabled ? '#4CAF50' : '#999', fontWeight: 'bold' }}>
                          {notification.scheduleEnabled ? 'Active' : 'Disabled'}
                        </span>
                      </div>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <button
                          onClick={() => {
                            if (notification.scheduleEnabled) return;
                            const n = { ...notification, scheduleEnabled: true };
                            handleToggleSchedule(n); // We reuse the toggle logic but pass expected state if logic allows, or just toggle
                          }}
                          disabled={notification.scheduleEnabled}
                          style={{
                            padding: '6px 12px',
                            background: notification.scheduleEnabled ? '#e0e0e0' : '#4CAF50',
                            color: notification.scheduleEnabled ? '#999' : 'white',
                            border: 'none',
                            borderRadius: '6px',
                            fontSize: '11px',
                            cursor: notification.scheduleEnabled ? 'default' : 'pointer',
                            fontWeight: '600'
                          }}
                        >
                          Enable
                        </button>
                        <button
                          onClick={() => {
                            if (!notification.scheduleEnabled) return;
                            const n = { ...notification, scheduleEnabled: false };
                            handleToggleSchedule(n);
                          }}
                          disabled={!notification.scheduleEnabled}
                          style={{
                            padding: '6px 12px',
                            background: !notification.scheduleEnabled ? '#e0e0e0' : '#FF9800',
                            color: !notification.scheduleEnabled ? '#999' : 'white',
                            border: 'none',
                            borderRadius: '6px',
                            fontSize: '11px',
                            cursor: !notification.scheduleEnabled ? 'default' : 'pointer',
                            fontWeight: '600'
                          }}
                        >
                          Disable
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
                  <button
                    onClick={() => handleEditNotification(notification)}
                    style={{
                      flex: 1,
                      padding: '10px',
                      background: '#4A90E2',
                      color: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      fontSize: '14px',
                      fontWeight: '600',
                      cursor: 'pointer'
                    }}
                  >
                    ✏️ Edit
                  </button>
                  {notification.status !== 'sent' && (
                    <button
                      onClick={() => handleSendNotification(notification)}
                      style={{
                        flex: 1,
                        padding: '10px',
                        background: '#4CAF50',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        fontSize: '14px',
                        fontWeight: '600',
                        cursor: 'pointer'
                      }}
                    >
                      📤 Send Now
                    </button>
                  )}
                  <button
                    onClick={() => handleDeleteNotification(notification.id)}
                    style={{
                      padding: '10px 16px',
                      background: '#f44336',
                      color: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      fontSize: '14px',
                      fontWeight: '600',
                      cursor: 'pointer'
                    }}
                  >
                    🗑️
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    );
  }

  // Admin Notification Form Screen
  if (currentScreen === 'admin_notification_form') {
    return (
      <div className="app-container">
        <div className="status-bar">
          <span className="time">{time}</span>
        </div>
        <div className="debug-header" style={{ background: '#4A90E2', height: '60px', display: 'flex', alignItems: 'center', padding: '0 16px', justifyContent: 'space-between' }}>
          <button className="header-btn" onClick={() => setCurrentScreen('admin_notifications')} style={{ color: 'white' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
            </svg>
          </button>
          <h1 style={{ fontSize: '18px', margin: 0, color: 'white', flex: 1, textAlign: 'center' }}>
            {editingNotificationId ? 'Edit Notification' : 'New Notification'}
          </h1>
          <div style={{ width: '44px' }}></div>
        </div>
        <div className="debug-content" style={{ padding: '16px' }}>
          <div className="form-group" style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#333' }}>Title</label>
            <input
              type="text"
              name="title"
              value={notificationFormData.title}
              onChange={handleNotificationFormChange}
              placeholder="Enter notification title"
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '8px',
                border: '1px solid #ddd',
                fontSize: '14px',
                boxSizing: 'border-box'
              }}
            />
          </div>

          <div className="form-group" style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#333' }}>Message</label>
            <textarea
              name="message"
              value={notificationFormData.message}
              onChange={handleNotificationFormChange}
              placeholder="Enter notification message"
              rows="5"
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '8px',
                border: '1px solid #ddd',
                fontSize: '14px',
                resize: 'vertical',
                fontFamily: 'inherit',
                boxSizing: 'border-box'
              }}
            />
          </div>

          <div style={{ background: '#f5f5f5', padding: '16px', borderRadius: '12px', marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '12px' }}>
              <input
                type="checkbox"
                name="isScheduled"
                checked={notificationFormData.isScheduled}
                onChange={handleNotificationFormChange}
                id="isScheduled"
                style={{ marginRight: '8px', width: '18px', height: '18px', cursor: 'pointer' }}
              />
              <label htmlFor="isScheduled" style={{ fontWeight: '600', color: '#333', cursor: 'pointer' }}>
                📅 Schedule Notification
              </label>
            </div>

            {notificationFormData.isScheduled && (
              <div>
                <div className="form-group" style={{ marginBottom: '12px' }}>
                  <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: '#666' }}>Date</label>
                  <input
                    type="date"
                    name="scheduledDate"
                    value={notificationFormData.scheduledDate}
                    onChange={handleNotificationFormChange}
                    style={{
                      width: '100%',
                      padding: '10px',
                      borderRadius: '8px',
                      border: '1px solid #ddd',
                      fontSize: '14px',
                      boxSizing: 'border-box',
                      color: '#000'
                    }}
                  />
                </div>

                <div className="form-group" style={{ marginBottom: '12px' }}>
                  <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: '#666' }}>Time</label>
                  <input
                    type="time"
                    name="scheduledTime"
                    value={notificationFormData.scheduledTime}
                    onChange={handleNotificationFormChange}
                    style={{
                      width: '100%',
                      padding: '10px',
                      borderRadius: '8px',
                      border: '1px solid #ddd',
                      fontSize: '14px',
                      boxSizing: 'border-box',
                      color: '#000'
                    }}
                  />
                </div>

                <div style={{ display: 'flex', alignItems: 'center', padding: '12px', background: '#fff', borderRadius: '8px' }}>
                  <input
                    type="checkbox"
                    name="scheduleEnabled"
                    checked={notificationFormData.scheduleEnabled}
                    onChange={handleNotificationFormChange}
                    id="scheduleEnabled"
                    style={{ marginRight: '8px', width: '18px', height: '18px', cursor: 'pointer' }}
                  />
                  <label htmlFor="scheduleEnabled" style={{ fontSize: '14px', color: '#666', cursor: 'pointer' }}>
                    Enable schedule (uncheck to disable without deleting schedule)
                  </label>
                </div>
              </div>
            )}
          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
            <button
              onClick={handleSaveNotification}
              style={{
                flex: 1,
                padding: '14px',
                background: '#4A90E2',
                color: 'white',
                border: 'none',
                borderRadius: '10px',
                fontSize: '16px',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              {editingNotificationId ? '💾 Update' : '✅ Create'}
            </button>
            <button
              onClick={() => setCurrentScreen('admin_notifications')}
              style={{
                padding: '14px 24px',
                background: '#999',
                color: 'white',
                border: 'none',
                borderRadius: '10px',
                fontSize: '16px',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  }


  // Feed Screen
  if (currentScreen === 'feed') {
    const feedAd = getRandomAd()

    return (
      <div className="app-container feed-container">
        <div className="status-bar">
          <span className="time">{time}</span>
        </div>

        <div className="feed-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', width: '100%', maxWidth: '800px', margin: '0 auto', boxSizing: 'border-box', position: 'relative', zIndex: 100 }}>
          {/* 1. Home */}
          <button className="feed-home-btn" onClick={() => setCurrentScreen('feed')} style={{ background: 'none', border: 'none', padding: 0, color: 'white', cursor: 'pointer' }}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
              <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
            </svg>
          </button>

          {/* 2. Logo */}
          <button className="feed-camera-btn" onClick={() => setCurrentScreen('profile')} style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
            <img src="/cam4me_logo.png" alt="CAM4ME" style={{ height: '28px', objectFit: 'contain', filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.5))' }} />
          </button>

          {/* 3. Bell */}
          <div className="notification-wrapper" style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
            <button
              onClick={() => {
                setShowUserNotificationsModal(!showUserNotificationsModal);
                if (!showUserNotificationsModal && unreadCount > 0) {
                  markNotificationsAsRead();
                }
              }}
              style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', color: 'white', position: 'relative', display: 'flex' }}
            >
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
              </svg>
              {unreadCount > 0 && (
                <span style={{
                  position: 'absolute',
                  top: '-1px',
                  right: '-1px',
                  width: '10px',
                  height: '10px',
                  background: '#ff3b30',
                  borderRadius: '50%',
                  border: '2px solid white'
                }}></span>
              )}
            </button>

            {showUserNotificationsModal && (
              <div style={{
                position: 'absolute',
                top: '140%',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '300px',
                background: 'white',
                borderRadius: '16px',
                boxShadow: '0 10px 40px rgba(0,0,0,0.3)',
                border: 'none',
                zIndex: 1000,
                overflow: 'hidden'
              }}>
                <div style={{ padding: '16px', borderBottom: '1px solid #f0f0f0', fontWeight: 'bold', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#fafafa', color: '#333' }}>
                  <span style={{ fontSize: '16px' }}>Notifications</span>
                  <button onClick={() => setShowUserNotificationsModal(false)} style={{ border: 'none', background: 'none', fontSize: '20px', cursor: 'pointer', color: '#999', display: 'flex', padding: 4 }}>×</button>
                </div>
                <div style={{ maxHeight: '350px', overflowY: 'auto' }}>
                  {notifications.filter(n => n.status === 'sent').length === 0 ? (
                    <div style={{ padding: '40px 20px', textAlign: 'center', color: '#999' }}>
                      <div style={{ fontSize: '32px', marginBottom: '10px', opacity: 0.5 }}>🔔</div>
                      <p style={{ margin: 0 }}>No new notifications</p>
                    </div>
                  ) : (
                    notifications.filter(n => n.status === 'sent').map(n => (
                      <div key={n.id} style={{ padding: '16px', borderBottom: '1px solid #f5f5f5', background: 'white', textAlign: 'left' }}>
                        <h4 style={{ margin: '0 0 6px 0', fontSize: '15px', color: '#333' }}>{n.title}</h4>
                        <p style={{ margin: 0, fontSize: '13px', color: '#666', lineHeight: '1.5' }}>{n.message}</p>
                        <span style={{ display: 'block', fontSize: '11px', color: '#ccc', marginTop: '8px' }}>
                          {new Date(n.updatedAt || n.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          {/* 4. Menu */}
          <button className="feed-menu-btn" onClick={() => setCurrentScreen('menu')} style={{ background: 'none', border: 'none', padding: 0, color: 'white', cursor: 'pointer' }}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
              <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
            </svg>
          </button>
        </div>

        <div className="feed-content">


          <div className="ad-banner feed-ad">
            <span className="ad-label">Ad</span>
            {feedAd ? (
              <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                <a
                  href={ensureAbsoluteUrl(feedAd.link)}
                  target="_blank"
                  rel="noreferrer"
                  onClick={(e) => { if (!feedAd.link) e.preventDefault() }}
                  style={{ display: 'block', width: '100%' }}
                >
                  <img src={feedAd.image} alt="Advertisement" className="ad-image-main" />
                </a>
                {feedAd.text && (
                  <div className="ad-text-container">
                    <p className="ad-text">{feedAd.text}</p>
                  </div>
                )}
              </div>
            ) : (
              <div style={{ width: '100%' }}>
                <img
                  src="https://images.unsplash.com/photo-1604608672516-f1b1f9e4db84?w=800&q=80"
                  alt="Advertisement"
                  className="ad-image-main"
                />
                <div className="ad-text-container">
                  <p className="ad-text">Your Ad could be here! Reach thousands of users in your city.</p>
                </div>
              </div>
            )}
          </div>

          <div className="posts-container">
            {/* User's Own Post */}
            {userPost && (
              <div className="post-card user-post">
                <div className="post-avatar" style={{ background: '#4A90E2' }}>
                  {userPost.photo ? (
                    <img src={userPost.photo} alt="User" />
                  ) : (
                    (profileData.name || 'U').charAt(0).toUpperCase()
                  )}
                </div>
                <div className="post-content">
                  <div className="post-header">
                    <div>
                      <h3>{profileData.name}</h3>
                      <p className="post-meta">{userPost.mobile}</p>
                      {userPost.city && userPost.category && (
                        <p className="post-meta">{userPost.city} • {userPost.category}</p>
                      )}
                    </div>
                    <span className="post-time">{
                      userPost.timestamp.includes('T')
                        ? userPost.timestamp.split('T')[0]
                        : userPost.timestamp.split(',')[0]
                    }</span>
                  </div>
                  {userPost.postImage && (
                    <div className="post-image-container">
                      <img src={userPost.postImage} alt="Post" className="post-image" />
                    </div>
                  )}
                  <p className="post-message">{userPost.message}</p>
                  <p className="post-location">
                    {userPost.village}, {userPost.mandal}, {userPost.district}, {userPost.state}
                  </p>
                  {userPost.lastEdited && (
                    <p className="post-edited">Edited: {userPost.lastEdited.split(',')[0]}</p>
                  )}
                  <div className="user-post-actions">
                    <button className="edit-post-btn" onClick={handleEditPost}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                        <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
                      </svg>
                      Edit
                    </button>
                    <button className="delete-post-btn" onClick={() => {
                      (async () => {
                        if (!window.confirm('Are you sure you want to delete this post?')) return
                        try {
                          if (userPost?.firebaseId) {
                            await deleteDoc(doc(db, 'posts', userPost.firebaseId))
                            await updateDoc(doc(db, 'users', currentUser.uid), { userPost: null })
                          }
                          setUserPost(null)
                          setPostText('')
                          setPostImage(null)
                          alert('Post deleted successfully!')
                        } catch (err) {
                          console.error('Delete post error:', err)
                          alert('Failed to delete post: ' + (err.message || err))
                        }
                      })()
                    }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                        <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
                      </svg>
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            )}

            {communityPosts.filter(p => p.userId !== currentUser?.uid).map((post, idx) => (
              <div key={post.firebaseId || idx} className="post-card">
                <div className="post-avatar" style={{ background: post.avatar || '#ccc' }}>
                  {(post.userName || post.name || '?').charAt(0)}
                </div>
                <div className="post-content">
                  <div className="post-header">
                    <div>
                      <h3>{post.userName || post.name} {post.mobile}</h3>
                      <p className="post-meta">{post.district || post.city} • {post.status || 'Active'}</p>
                      <p className="post-timestamp">{post.timestamp}</p>
                    </div>
                  </div>
                  <p className="post-message">{post.message}</p>
                  <button className="see-more-btn">See more</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (showRecords) {
    const filteredRecords = getFilteredRecords()
    const analytics = getAnalytics()

    return (
      <div className="app-container">
        <div className="status-bar">
          <span className="time">{time}</span>
        </div>

        <div className="content">
          <div className="records-header">
            <h2 className="records-title">Database Records</h2>
            <div className="records-actions">
              <button onClick={() => setShowRecords(false)} className="back-btn">← Back</button>
              <button onClick={exportToCSV} className="export-btn">📥 Export CSV</button>
              {records.length > 0 && (
                <button onClick={clearAllRecords} className="clear-btn">Clear All</button>
              )}
            </div>
          </div>

          <div className="analytics-grid">
            <div className="analytics-card">
              <div className="analytics-value">{analytics.total}</div>
              <div className="analytics-label">Total Records</div>
            </div>
            <div className="analytics-card">
              <div className="analytics-value">{analytics.today}</div>
              <div className="analytics-label">Today</div>
            </div>
            <div className="analytics-card">
              <div className="analytics-value">{analytics.districts}</div>
              <div className="analytics-label">Districts</div>
            </div>
            <div className="analytics-card">
              <div className="analytics-value">{analytics.states}</div>
              <div className="analytics-label">States</div>
            </div>
          </div>

          <div className="search-filter-bar">
            <input
              type="text"
              placeholder="🔍 Search by name, mobile, location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="sort-select"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="name">Sort by Name</option>
              <option value="district">Sort by District</option>
            </select>
          </div>

          <div className="records-count">
            Showing {filteredRecords.length} of {records.length} records
          </div>

          <div className="records-container">
            {filteredRecords.length === 0 ? (
              <div className="no-records">
                {searchQuery ? 'No records match your search' : 'No records found'}
              </div>
            ) : (
              filteredRecords.map((record) => (
                <div key={record.id} className="record-card">
                  <div className="record-header">
                    <span className="record-id">#{record.id}</span>
                    <span className="record-timestamp">{record.timestamp}</span>
                    <button onClick={() => deleteRecord(record.id)} className="delete-btn">×</button>
                  </div>
                  <div className="record-details">
                    <div className="record-item">
                      <span className="record-label">Name:</span>
                      <span className="record-value">{record.name}</span>
                    </div>
                    <div className="record-item">
                      <span className="record-label">Mobile:</span>
                      <span className="record-value">{record.mobile}</span>
                    </div>
                    <div className="record-item">
                      <span className="record-label">Village:</span>
                      <span className="record-value">{record.village}</span>
                    </div>
                    <div className="record-item">
                      <span className="record-label">Mandal:</span>
                      <span className="record-value">{record.mandal}</span>
                    </div>
                    <div className="record-item">
                      <span className="record-label">District:</span>
                      <span className="record-value">{record.district}</span>
                    </div>
                    <div className="record-item">
                      <span className="record-label">State:</span>
                      <span className="record-value">{record.state}</span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="app-container">
      <div className="status-bar">
        <span className="time">{time}</span>
      </div>

      <div className="content">
        <div style={{ width: '100%', display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
          <button
            onClick={() => setCurrentScreen('search')}
            style={{
              background: 'none',
              border: 'none',
              color: 'white',
              cursor: 'pointer',
              padding: '10px'
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
            </svg>
          </button>
          <div className="logo-container" style={{ flex: 1, marginRight: '44px' }}>
            <img src="/logo_bubble.png" alt="CAM4ME Logo" className="logo-image" />
            <h1 className="app-title">CAM4ME</h1>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="form">
          <div className="form-group">
            <label>Name</label>
            <div className="input-with-help">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <button type="button" className="help-icon" onClick={() => alert('Enter your full name')}>
                <span>?</span>
              </button>
            </div>
          </div>

          <div className="form-group">
            <label>Mobile number</label>
            <input
              type="tel"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              pattern="[0-9]{10}"
              required
            />
          </div>

          <div className="form-group">
            <label>Village name</label>
            <input
              type="text"
              name="village"
              value={formData.village}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Mandal name</label>
            <input
              type="text"
              name="mandal"
              value={formData.mandal}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>District name</label>
            <input
              type="text"
              name="district"
              value={formData.district}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>State</label>
            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="submit-btn">Submit</button>
        </form>

        <div className="bottom-bar"></div>
      </div>
    </div>
  )
}

export default App
