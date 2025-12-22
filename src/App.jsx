import { useState, useEffect } from 'react'
import './App.css'
import { database } from './database'
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera'
import { Geolocation } from '@capacitor/geolocation'
import { Capacitor } from '@capacitor/core'
import { auth, googleProvider, facebookProvider, twitterProvider } from './firebase'
import { signInWithPopup, signInWithRedirect, getRedirectResult } from 'firebase/auth'

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

  useEffect(() => {
    initializeDatabase()
  }, [])

  // Check for existing user session on app load
  useEffect(() => {
    const checkUserSession = async () => {
      try {
        const storedUser = localStorage.getItem('chatcam_user')
        const userSession = localStorage.getItem('chatcam_session')
        
        if (storedUser && userSession) {
          const user = JSON.parse(storedUser)
          const session = JSON.parse(userSession)
          
          // Restore user data
          setAuthData({ ...authData, email: user.email })
          
          if (session.profileData) {
            setProfileData(session.profileData)
          }
          if (session.selectedCity) {
            setSelectedCity(session.selectedCity)
          }
          if (session.selectedCategory) {
            setSelectedCategory(session.selectedCategory)
          }
          if (session.formData) {
            setFormData(session.formData)
          }
          if (session.locationPermission) {
            setLocationPermission(session.locationPermission)
          }
          if (session.userPost) {
            setUserPost(session.userPost)
          }
          
          // If user has completed setup, go directly to feed
          if (session.setupCompleted) {
            setCurrentScreen('feed')
            loadCommunityPosts()
          } else {
            // Resume where they left off
            setCurrentScreen(session.lastScreen || 'terms')
          }
        }
      } catch (error) {
        console.error('Error restoring session:', error)
      }
    }
    
    checkUserSession()
  }, [])

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

  const loadRecords = async () => {
    try {
      const data = await database.getAllRecords()
      setRecords(data)
    } catch (error) {
      console.error('Failed to load records:', error)
    }
  }

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

  // Helper function to save session data
  const saveSessionData = (screen, completed = false) => {
    const sessionData = {
      lastScreen: screen,
      setupCompleted: completed,
      profileData,
      selectedCity,
      selectedCategory,
      formData,
      locationPermission,
      userPost
    }
    localStorage.setItem('chatcam_session', JSON.stringify(sessionData))
  }

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      // Clear all stored data
      localStorage.removeItem('chatcam_user')
      localStorage.removeItem('chatcam_session')
      
      // Reset all state
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
      
      // Go back to signup screen
      setCurrentScreen('signup')
      alert('You have been logged out successfully')
    }
  }

  const handleAcceptTerms = () => {
    // Check if user has already completed setup before
    const storedSession = localStorage.getItem('chatcam_session')
    if (storedSession) {
      const session = JSON.parse(storedSession)
      // If user already completed setup and has profile data, go to feed
      if (session.profileData?.name && session.selectedCity && session.selectedCategory) {
        saveSessionData('feed', true)
        setCurrentScreen('feed')
        loadCommunityPosts()
        return
      }
    }
    // Otherwise, continue with profile setup
    saveSessionData('profile')
    setCurrentScreen('profile')
  }

  const handleSignUp = (e) => {
    e.preventDefault()
    if (authData.password !== authData.confirmPassword) {
      alert('Passwords do not match!')
      return
    }
    // Store user data (in real app, this would be sent to backend)
    localStorage.setItem('chatcam_user', JSON.stringify({ email: authData.email }))
    localStorage.setItem('chatcam_session', JSON.stringify({
      lastScreen: 'terms',
      setupCompleted: false
    }))
    setCurrentScreen('terms')
  }

  const handleSignIn = (e) => {
    e.preventDefault()
    // In real app, validate credentials against backend
    localStorage.setItem('chatcam_user', JSON.stringify({ email: authData.email }))
    localStorage.setItem('chatcam_session', JSON.stringify({
      lastScreen: 'terms',
      setupCompleted: false
    }))
    setCurrentScreen('terms')
  }

  const handleSocialLogin = async (providerName) => {
    try {
      let provider
      switch(providerName) {
        case 'Google':
          provider = googleProvider
          break
        case 'Facebook':
          provider = facebookProvider
          break
        case 'X':
          provider = twitterProvider
          break
        default:
          alert('Invalid provider')
          return
      }

      // Use popup for web, redirect for mobile
      let result
      if (window.Capacitor?.isNativePlatform()) {
        await signInWithRedirect(auth, provider)
        // Result will be handled on page load
        return
      } else {
        result = await signInWithPopup(auth, provider)
      }

      // Get user information
      const user = result.user
      console.log('User signed in:', user)

      // Store user data
      localStorage.setItem('chatcam_user', JSON.stringify({
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        provider: providerName
      }))

      // Store session data
      const sessionData = {
        lastScreen: 'terms',
        setupCompleted: false,
        profileData: {
          name: user.displayName || '',
          photo: user.photoURL || null
        }
      }
      localStorage.setItem('chatcam_session', JSON.stringify(sessionData))

      // Update profile data with user info
      setProfileData({
        name: user.displayName || '',
        photo: user.photoURL || null
      })

      setAuthData({
        email: user.email,
        password: '',
        confirmPassword: ''
      })

      // Navigate to terms
      setCurrentScreen('terms')
      alert(`Successfully signed in with ${providerName}!`)

    } catch (error) {
      console.error('Social login error:', error)
      
      // Handle specific errors
      if (error.code === 'auth/popup-closed-by-user') {
        alert('Login cancelled. Please try again.')
      } else if (error.code === 'auth/account-exists-with-different-credential') {
        alert('An account already exists with the same email address but different sign-in credentials.')
      } else if (error.code === 'auth/popup-blocked') {
        alert('Pop-up was blocked by your browser. Please allow pop-ups for this site.')
      } else {
        alert(`${providerName} login failed: ${error.message}\n\nNote: You need to configure Firebase credentials in src/firebase.js`)
      }
    }
  }

  const handleTakePhoto = async (e) => {
    if (e) {
      e.preventDefault()
      e.stopPropagation()
    }
    
    try {
      // Check if Capacitor is available (mobile) or we're on web
      const isWeb = !window.Capacitor || window.Capacitor.getPlatform() === 'web'
      
      if (isWeb) {
        // For web, create a file input
        const input = document.createElement('input')
        input.type = 'file'
        input.accept = 'image/*'
        input.capture = 'environment' // Request camera on mobile browsers
        
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
      
      // Mobile app - use Capacitor Camera
      const permissions = await Camera.checkPermissions()
      
      if (permissions.camera === 'denied' || permissions.photos === 'denied') {
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
        source: CameraSource.Prompt // Let user choose camera or gallery
      })
      
      if (image && image.dataUrl) {
        setProfileData({ ...profileData, photo: image.dataUrl })
      }
    } catch (error) {
      console.error('Error taking photo:', error)
      if (error.message && !error.message.includes('User cancelled')) {
        alert('Failed to access camera. Please try again or check camera permissions.')
      }
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

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    try {
      // Save to SQLite database
      await database.insertRecord(formData)
      
      // Save session
      saveSessionData('newpost')
      
      // Go to new post creation page
      setCurrentScreen('newpost')
    } catch (error) {
      console.error('Failed to submit form:', error)
      alert('Failed to save data. Please try again.')
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
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: true,
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
    // Load existing post data into edit mode
    if (userPost) {
      setPostText(userPost.message || '')
      setPostImage(userPost.postImage || null)
      setCurrentScreen('newpost')
    }
  }

  const handlePublishPost = () => {
    if (!postText) {
      alert('Please write something for your post')
      return
    }

    // Create or update user post
    const post = {
      id: userPost?.id || Date.now(),
      ...formData,
      city: selectedCity,
      category: selectedCategory,
      photo: profileData.photo,
      postImage: postImage,
      message: postText,
      timestamp: userPost ? userPost.timestamp : new Date().toLocaleString(),
      lastEdited: userPost ? new Date().toLocaleString() : null,
      isUserPost: true
    }
    setUserPost(post)
    
    // Mark setup as completed
    saveSessionData('feed', true)
    
    // Load community posts
    loadCommunityPosts()
    
    // Go to feed
    setCurrentScreen('feed')
    alert(userPost ? 'Post updated successfully!' : 'Post published successfully!')
  }

  const loadCommunityPosts = () => {
    // Sample community posts (in real app, fetch from backend filtered by category)
    const samplePosts = [
      {
        id: 1,
        name: 'Suresh Reddy',
        mobile: '99112 99112',
        city: 'Guntur',
        category: selectedCategory,
        timestamp: '4 march 2026',
        status: 'Avaliable/Busy',
        message: 'By using this app, you certify that you have read and reviewed this Agreement and that you agree to comply with its terms. If you do not want to be bound by the terms of this Agreement, you agree to comply with its terms. If you do not want to be...',
        avatar: '#FF6B6B'
      },
      {
        id: 2,
        name: 'Madhusudan',
        mobile: '96002 99002',
        city: 'Guntur',
        category: selectedCategory,
        timestamp: '5 march 2026',
        status: 'Avaliable/Busy',
        message: 'By using this app, you certify that you have read and reviewed this Agreement and that you agree to comply with its terms. If you do not want to be bound by the terms of this Agreement, you agree to comply with its terms. If you do not want to be...',
        avatar: '#FF1493'
      },
      {
        id: 3,
        name: 'Madhusudan',
        mobile: '96002 99002',
        city: 'Guntur',
        category: selectedCategory,
        timestamp: '5 march 2026',
        status: 'Avaliable/Busy',
        message: 'By using this app, you certify that you have read and reviewed this Agreement and that you agree to comply with its terms. If you do not want to be bound by the terms of this Agreement, you agree to comply with its terms. If you do not want to be...',
        avatar: '#00BFFF'
      },
      {
        id: 4,
        name: 'Madhusudan',
        mobile: '96002 99002',
        city: 'Guntur',
        category: selectedCategory,
        timestamp: '5 march 2026',
        status: 'Avaliable/Busy',
        message: 'By using this app, you certify that you have read and reviewed this Agreement and that you agree to comply with its terms. If you do not want to be bound by the terms of this Agreement, you agree to comply with its terms. If you do not want to be...',
        avatar: '#9370DB'
      },
      {
        id: 5,
        name: 'Madhusudan',
        mobile: '96002 99002',
        city: 'Guntur',
        category: selectedCategory,
        timestamp: '5 march 2026',
        status: 'Avaliable/Busy',
        message: 'By using this app, you certify that you have read and reviewed this Agreement and that you agree to comply with its terms. If you do not want to be bound by the terms of this Agreement, you agree to comply with its terms. If you do not want to be...',
        avatar: '#FF8C00'
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
    let filtered = [...records]

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
  if (currentScreen === 'debug') {
    const userData = JSON.parse(localStorage.getItem('chatcam_user') || '{}')
    const sessionData = JSON.parse(localStorage.getItem('chatcam_session') || '{}')
    const formRecords = JSON.parse(localStorage.getItem('chatcam_records') || '[]')

    return (
      <div className="app-container">
        <div className="status-bar">
          <span className="time">{time}</span>
        </div>

        <div className="debug-header">
          <button className="debug-back-btn" onClick={() => setCurrentScreen('menu')}>← Back</button>
          <h1>Database Records</h1>
        </div>

        <div className="debug-content">
          <div className="debug-section">
            <h2>🔐 User Data (chatcam_user)</h2>
            <pre className="debug-data">{JSON.stringify(userData, null, 2)}</pre>
          </div>

          <div className="debug-section">
            <h2>💾 Session Data (chatcam_session)</h2>
            <pre className="debug-data">{JSON.stringify(sessionData, null, 2)}</pre>
          </div>

          <div className="debug-section">
            <h2>📋 Form Records (chatcam_records) - {formRecords.length} records</h2>
            {formRecords.length > 0 ? (
              formRecords.map((record, index) => (
                <div key={record.id} className="debug-record">
                  <h3>Record #{index + 1} (ID: {record.id})</h3>
                  <pre className="debug-data">{JSON.stringify(record, null, 2)}</pre>
                </div>
              ))
            ) : (
              <p className="debug-empty">No form records found</p>
            )}
          </div>

          <div className="debug-section">
            <h2>ℹ️ Database Info</h2>
            <div className="debug-info">
              <p><strong>Platform:</strong> {Capacitor.getPlatform()}</p>
              <p><strong>Storage Type:</strong> {Capacitor.getPlatform() === 'web' ? 'localStorage' : 'SQLite'}</p>
              <p><strong>Database Name:</strong> chatcam.db</p>
            </div>
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
            <svg width="100" height="100" viewBox="0 0 100 100" fill="none">
              <rect x="20" y="35" width="60" height="45" rx="5" stroke="url(#gradientCyan)" strokeWidth="3" fill="none"/>
              <circle cx="50" cy="57.5" r="12" stroke="url(#gradientCyan)" strokeWidth="3" fill="none"/>
              <line x1="20" y1="75" x2="80" y2="75" stroke="url(#gradientCyan)" strokeWidth="3"/>
              <path d="M35 35 L40 25 L60 25 L65 35" stroke="url(#gradientMagenta)" strokeWidth="3" fill="none"/>
              <defs>
                <linearGradient id="gradientCyan" x1="0" y1="0" x2="100" y2="100">
                  <stop offset="0%" stopColor="#00F5FF"/>
                  <stop offset="100%" stopColor="#0099CC"/>
                </linearGradient>
                <linearGradient id="gradientMagenta" x1="0" y1="0" x2="100" y2="0">
                  <stop offset="0%" stopColor="#FF00FF"/>
                  <stop offset="100%" stopColor="#CC0099"/>
                </linearGradient>
              </defs>
            </svg>
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
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
            </button>
            <button className="social-btn facebook" onClick={() => handleSocialLogin('Facebook')}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="#1877F2">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </button>
            <button className="social-btn twitter" onClick={() => handleSocialLogin('X')}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </button>
          </div>

          <div className="auth-footer">
            <span>Already have account? </span>
            <button className="link-btn" onClick={() => setCurrentScreen('signin')}>Sign in</button>
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
            <svg width="100" height="100" viewBox="0 0 100 100" fill="none">
              <rect x="20" y="35" width="60" height="45" rx="5" stroke="url(#gradientCyan2)" strokeWidth="3" fill="none"/>
              <circle cx="50" cy="57.5" r="12" stroke="url(#gradientCyan2)" strokeWidth="3" fill="none"/>
              <line x1="20" y1="75" x2="80" y2="75" stroke="url(#gradientCyan2)" strokeWidth="3"/>
              <path d="M35 35 L40 25 L60 25 L65 35" stroke="url(#gradientMagenta2)" strokeWidth="3" fill="none"/>
              <defs>
                <linearGradient id="gradientCyan2" x1="0" y1="0" x2="100" y2="100">
                  <stop offset="0%" stopColor="#00F5FF"/>
                  <stop offset="100%" stopColor="#0099CC"/>
                </linearGradient>
                <linearGradient id="gradientMagenta2" x1="0" y1="0" x2="100" y2="0">
                  <stop offset="0%" stopColor="#FF00FF"/>
                  <stop offset="100%" stopColor="#CC0099"/>
                </linearGradient>
              </defs>
            </svg>
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

          <div className="social-divider">
            <span>Connect with</span>
          </div>

          <div className="social-buttons">
            <button className="social-btn google" onClick={() => handleSocialLogin('Google')}>
              <svg width="24" height="24" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
            </button>
            <button className="social-btn facebook" onClick={() => handleSocialLogin('Facebook')}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="#1877F2">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </button>
            <button className="social-btn twitter" onClick={() => handleSocialLogin('X')}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </button>
          </div>

          <div className="auth-footer">
            <span>Don't have an account? </span>
            <button className="link-btn" onClick={() => setCurrentScreen('signup')}>Sign up</button>
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
            <button className="back-btn-icon" onClick={() => window.history.back()}>←</button>
            <button className="help-btn-icon">?</button>
          </div>

          <div className="camera-logo-gradient">
            <svg width="100" height="100" viewBox="0 0 100 100" fill="none">
              <rect x="20" y="35" width="60" height="45" rx="5" stroke="url(#gradientCyan)" strokeWidth="3" fill="none"/>
              <circle cx="50" cy="57.5" r="12" stroke="url(#gradientCyan)" strokeWidth="3" fill="none"/>
              <line x1="20" y1="75" x2="80" y2="75" stroke="url(#gradientCyan)" strokeWidth="3"/>
              <path d="M35 35 L40 25 L60 25 L65 35" stroke="url(#gradientMagenta)" strokeWidth="3" fill="none"/>
              <defs>
                <linearGradient id="gradientCyan" x1="0" y1="0" x2="100" y2="100">
                  <stop offset="0%" stopColor="#00F5FF"/>
                  <stop offset="100%" stopColor="#0099CC"/>
                </linearGradient>
                <linearGradient id="gradientMagenta" x1="0" y1="0" x2="100" y2="0">
                  <stop offset="0%" stopColor="#FF00FF"/>
                  <stop offset="100%" stopColor="#CC0099"/>
                </linearGradient>
              </defs>
            </svg>
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

  // Profile Setup Screen
  if (currentScreen === 'profile') {
    return (
      <div className="app-container">
        <div className="status-bar">
          <span className="time">{time}</span>
        </div>
        
        <div className="content profile-content">
          <div className="profile-logo-small">
            <svg width="40" height="40" viewBox="0 0 100 100" fill="none">
              <rect x="20" y="35" width="60" height="45" rx="5" stroke="url(#gradientCyanSmall)" strokeWidth="3" fill="none"/>
              <circle cx="50" cy="57.5" r="12" stroke="url(#gradientCyanSmall)" strokeWidth="3" fill="none"/>
              <line x1="20" y1="75" x2="80" y2="75" stroke="url(#gradientCyanSmall)" strokeWidth="3"/>
              <defs>
                <linearGradient id="gradientCyanSmall" x1="0" y1="0" x2="100" y2="100">
                  <stop offset="0%" stopColor="#00F5FF"/>
                  <stop offset="100%" stopColor="#0099CC"/>
                </linearGradient>
              </defs>
            </svg>
          </div>

          <div className="ad-banner">
            <span className="ad-label">Ad</span>
            <img src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=300&fit=crop" alt="Advertisement" />
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
                  <rect x="6" y="10" width="18" height="13" rx="2" stroke="white" strokeWidth="1.5" fill="none"/>
                  <circle cx="15" cy="16.5" r="3.5" stroke="white" strokeWidth="1.5" fill="none"/>
                  <path d="M10 10 L11 8 L19 8 L20 10" stroke="white" strokeWidth="1.5" fill="none"/>
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
            <svg width="40" height="40" viewBox="0 0 100 100" fill="none">
              <rect x="20" y="35" width="60" height="45" rx="5" stroke="url(#gradientCyanLoc)" strokeWidth="3" fill="none"/>
              <circle cx="50" cy="57.5" r="12" stroke="url(#gradientCyanLoc)" strokeWidth="3" fill="none"/>
              <line x1="20" y1="75" x2="80" y2="75" stroke="url(#gradientCyanLoc)" strokeWidth="3"/>
              <defs>
                <linearGradient id="gradientCyanLoc" x1="0" y1="0" x2="100" y2="100">
                  <stop offset="0%" stopColor="#00F5FF"/>
                  <stop offset="100%" stopColor="#0099CC"/>
                </linearGradient>
              </defs>
            </svg>
          </div>

          <div className="location-permission-card">
            <div className="location-icon">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="white">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
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
                        <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#E0E0E0" strokeWidth="0.5"/>
                      </pattern>
                    </defs>
                    <rect width="100" height="100" fill="url(#grid)"/>
                    <circle cx="50" cy="50" r="8" fill="#1976D2"/>
                    <circle cx="50" cy="50" r="15" fill="none" stroke="#1976D2" strokeWidth="2" opacity="0.3"/>
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
                    <path d="M20 80 Q30 60, 40 70 T60 65 T80 75" stroke="#FFA726" strokeWidth="2" fill="none"/>
                    <path d="M30 50 Q40 45, 50 48 T70 52" stroke="#FFA726" strokeWidth="2" fill="none"/>
                    <path d="M15 30 L85 30" stroke="#90CAF9" strokeWidth="3"/>
                    <circle cx="45" cy="60" r="6" fill="#1976D2"/>
                    <circle cx="55" cy="55" r="6" fill="#1976D2"/>
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
    return (
      <div className="app-container">
        <div className="status-bar">
          <span className="time">{time}</span>
        </div>
        
        <div className="content search-content">
          <div className="profile-logo-small">
            <svg width="40" height="40" viewBox="0 0 100 100" fill="none">
              <rect x="20" y="35" width="60" height="45" rx="5" stroke="url(#gradientCyanSearch)" strokeWidth="3" fill="none"/>
              <circle cx="50" cy="57.5" r="12" stroke="url(#gradientCyanSearch)" strokeWidth="3" fill="none"/>
              <line x1="20" y1="75" x2="80" y2="75" stroke="url(#gradientCyanSearch)" strokeWidth="3"/>
              <defs>
                <linearGradient id="gradientCyanSearch" x1="0" y1="0" x2="100" y2="100">
                  <stop offset="0%" stopColor="#00F5FF"/>
                  <stop offset="100%" stopColor="#0099CC"/>
                </linearGradient>
              </defs>
            </svg>
          </div>

          <div className="ad-banner search-ad-top">
            <span className="ad-label">Ad</span>
            <img src="https://images.unsplash.com/photo-1604608672516-f1b1f9e4db84?w=800&h=300&fit=crop" alt="Advertisement" />
          </div>

          <div className="search-buttons">
            <div className="search-btn-container">
              <button 
                className={`search-btn city-btn ${showCityList ? 'expanded' : ''}`}
                onClick={() => setShowCityList(!showCityList)}
              >
                <span>City</span>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
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
              {selectedCity && !showCityList && (
                <div className="selected-value">{selectedCity}</div>
              )}
            </div>

            <div className="search-btn-container">
              <button 
                className={`search-btn category-btn ${showCategoryList ? 'expanded' : ''}`}
                onClick={() => setShowCategoryList(!showCategoryList)}
              >
                <span>Category</span>
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
              {selectedCategory && !showCategoryList && (
                <div className="selected-value category-value">{selectedCategory}</div>
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
            <img src="https://images.unsplash.com/photo-1532375810709-75b1da00537c?w=800&h=400&fit=crop" alt="Advertisement" />
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
          <button className="newpost-home-btn" onClick={() => setCurrentScreen('feed')}>🏠</button>
          <div className="newpost-camera-logo">
            <svg width="40" height="40" viewBox="0 0 100 100" fill="none">
              <rect x="20" y="35" width="60" height="45" rx="5" stroke="url(#gradNewPost)" strokeWidth="3" fill="none"/>
              <circle cx="50" cy="57.5" r="12" stroke="url(#gradNewPost)" strokeWidth="3" fill="none"/>
              <defs>
                <linearGradient id="gradNewPost" x1="0" y1="0" x2="100" y2="100">
                  <stop offset="0%" stopColor="#00F5FF"/>
                  <stop offset="100%" stopColor="#FF00FF"/>
                </linearGradient>
              </defs>
            </svg>
          </div>
          <button className="newpost-menu-btn">☰</button>
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
            className="newpost-textarea"
            placeholder="What's on your mind?"
            value={postText}
            onChange={(e) => setPostText(e.target.value)}
            rows="6"
          />

          {postImage && (
            <div className="newpost-image-preview">
              <img src={postImage} alt="Post" />
            </div>
          )}

          <div className="newpost-actions">
            <button className="newpost-action-btn camera-btn" onClick={handleCameraCapture}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 15.2c1.71 0 3.1-1.39 3.1-3.1s-1.39-3.1-3.1-3.1-3.1 1.39-3.1 3.1 1.39 3.1 3.1 3.1z"/>
                <path d="M9 2L7.17 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2h-3.17L15 2H9zm3 15c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z"/>
              </svg>
              Camera
            </button>
            <button className="newpost-action-btn gallery-btn" onClick={handleGalleryUpload}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>
              </svg>
              Gallery
            </button>
            <button className="newpost-action-btn edit-btn" onClick={() => setCurrentScreen('form')}>
              Edit
            </button>
            <button className="newpost-action-btn post-btn" onClick={handlePublishPost}>
              Post
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
          <button className="menu-home-btn" onClick={() => setCurrentScreen('feed')}>🏠</button>
          <div className="menu-camera-logo">
            <svg width="40" height="40" viewBox="0 0 100 100" fill="none">
              <rect x="20" y="35" width="60" height="45" rx="5" stroke="url(#gradMenu)" strokeWidth="3" fill="none"/>
              <circle cx="50" cy="57.5" r="12" stroke="url(#gradMenu)" strokeWidth="3" fill="none"/>
              <defs>
                <linearGradient id="gradMenu" x1="0" y1="0" x2="100" y2="100">
                  <stop offset="0%" stopColor="#00F5FF"/>
                  <stop offset="100%" stopColor="#FF00FF"/>
                </linearGradient>
              </defs>
            </svg>
          </div>
          <button className="menu-hamburger-btn">☰</button>
        </div>

        <div className="menu-title-bar">
          <h1>Menu</h1>
          <button className="menu-settings-btn">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
              <path d="M19.14,12.94c0.04-0.3,0.06-0.61,0.06-0.94c0-0.32-0.02-0.64-0.07-0.94l2.03-1.58c0.18-0.14,0.23-0.41,0.12-0.61 l-1.92-3.32c-0.12-0.22-0.37-0.29-0.59-0.22l-2.39,0.96c-0.5-0.38-1.03-0.7-1.62-0.94L14.4,2.81c-0.04-0.24-0.24-0.41-0.48-0.41 h-3.84c-0.24,0-0.43,0.17-0.47,0.41L9.25,5.35C8.66,5.59,8.12,5.92,7.63,6.29L5.24,5.33c-0.22-0.08-0.47,0-0.59,0.22L2.74,8.87 C2.62,9.08,2.66,9.34,2.86,9.48l2.03,1.58C4.84,11.36,4.8,11.69,4.8,12s0.02,0.64,0.07,0.94l-2.03,1.58 c-0.18,0.14-0.23,0.41-0.12,0.61l1.92,3.32c0.12,0.22,0.37,0.29,0.59,0.22l2.39-0.96c0.5,0.38,1.03,0.7,1.62,0.94l0.36,2.54 c0.05,0.24,0.24,0.41,0.48,0.41h3.84c0.24,0,0.44-0.17,0.47-0.41l0.36-2.54c0.59-0.24,1.13-0.56,1.62-0.94l2.39,0.96 c0.22,0.08,0.47,0,0.59-0.22l1.92-3.32c0.12-0.22,0.07-0.47-0.12-0.61L19.14,12.94z M12,15.6c-1.98,0-3.6-1.62-3.6-3.6 s1.62-3.6,3.6-3.6s3.6,1.62,3.6,3.6S13.98,15.6,12,15.6z"/>
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
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
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
            <div className="menu-item" onClick={() => setCurrentScreen('debug')} style={{ cursor: 'pointer' }}>
              <div className="menu-item-content">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="#00F5FF">
                  <path d="M20 8h-2.81c-.45-.78-1.07-1.45-1.82-1.96L17 4.41 15.59 3l-2.17 2.17C12.96 5.06 12.49 5 12 5c-.49 0-.96.06-1.41.17L8.41 3 7 4.41l1.62 1.63C7.88 6.55 7.26 7.22 6.81 8H4v2h2.09c-.05.33-.09.66-.09 1v1H4v2h2v1c0 .34.04.67.09 1H4v2h2.81c1.04 1.79 2.97 3 5.19 3s4.15-1.21 5.19-3H20v-2h-2.09c.05-.33.09-.66.09-1v-1h2v-2h-2v-1c0-.34-.04-.67-.09-1H20V8zm-6 8h-4v-2h4v2zm0-4h-4v-2h4v2z" />
                </svg>
                <span style={{ color: '#00F5FF' }}>View Database Records</span>
              </div>
              <button className="menu-arrow">›</button>
            </div>

            <div className="menu-item">
              <div className="menu-item-content">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                  <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="2" fill="none"/>
                  <path d="M12 16v-4m0-4h.01" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                </svg>
                <span>About us</span>
              </div>
              <button className="menu-arrow">›</button>
            </div>

            <div className="menu-item">
              <div className="menu-item-content">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                  <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"/>
                </svg>
                <span>Privacy Policy</span>
              </div>
              <button className="menu-arrow">›</button>
            </div>

            <div className="menu-item">
              <div className="menu-item-content">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                  <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z"/>
                </svg>
                <span>Feedback</span>
              </div>
              <button className="menu-arrow">›</button>
            </div>

            <div className="menu-item">
              <div className="menu-item-content">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                  <path d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zM6 20V4h7v5h5v11H6z"/>
                </svg>
                <span>Regulations & Conditions</span>
              </div>
              <button className="menu-arrow">›</button>
            </div>

            <div className="menu-item" onClick={handleLogout} style={{ cursor: 'pointer' }}>
              <div className="menu-item-content">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="#FF4444">
                  <path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z"/>
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

  // Feed Screen
  if (currentScreen === 'feed') {
    return (
      <div className="app-container feed-container">
        <div className="status-bar">
          <span className="time">{time}</span>
        </div>

        <div className="feed-header">
          <button className="feed-home-btn">🏠</button>
          <button className="feed-camera-btn" onClick={() => setCurrentScreen('profile')}>
            <svg width="30" height="30" viewBox="0 0 100 100" fill="none">
              <rect x="20" y="35" width="60" height="45" rx="5" stroke="url(#gradFeed)" strokeWidth="3" fill="none"/>
              <circle cx="50" cy="57.5" r="12" stroke="url(#gradFeed)" strokeWidth="3" fill="none"/>
              <defs>
                <linearGradient id="gradFeed" x1="0" y1="0" x2="100" y2="100">
                  <stop offset="0%" stopColor="#00F5FF"/>
                  <stop offset="100%" stopColor="#FF00FF"/>
                </linearGradient>
              </defs>
            </svg>
          </button>
          <button className="feed-menu-btn" onClick={() => setCurrentScreen('menu')}>☰</button>
        </div>

        <div className="feed-content">
          <div className="feed-search-bar">
            <div className="feed-avatar" style={{ background: '#4A90E2' }}></div>
            <input 
              type="text" 
              placeholder="Write message"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
            />
            <button className="feed-add-btn">+</button>
          </div>

          <div className="ad-banner feed-ad">
            <span className="ad-label">Ad</span>
            <img src="https://images.unsplash.com/photo-1604608672516-f1b1f9e4db84?w=800&h=200&fit=crop" alt="Advertisement" />
          </div>

          <div className="posts-container">
            {/* User's Own Post */}
            {userPost && (
              <div className="post-card user-post">
                <div className="post-avatar" style={{ background: '#4A90E2' }}>
                  {userPost.photo ? (
                    <img src={userPost.photo} alt="User" />
                  ) : (
                    profileData.name.charAt(0).toUpperCase()
                  )}
                </div>
                <div className="post-content">
                  <div className="post-header">
                    <div>
                      <h3>{profileData.name}</h3>
                      <p className="post-meta">{userPost.mobile}</p>
                      <p className="post-meta">{userPost.city} • {userPost.category}</p>
                    </div>
                    <span className="post-time">{userPost.timestamp.split(',')[0]}</span>
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
                        <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
                      </svg>
                      Edit
                    </button>
                    <button className="delete-post-btn" onClick={() => {
                      if (window.confirm('Are you sure you want to delete this post?')) {
                        setUserPost(null)
                        setPostText('')
                        setPostImage(null)
                        alert('Post deleted successfully!')
                      }
                    }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                        <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
                      </svg>
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Community Posts */}
            {communityPosts.map((post) => (
              <div key={post.id} className="post-card">
                <div className="post-avatar" style={{ background: post.avatar }}>
                  {post.name.charAt(0)}
                </div>
                <div className="post-content">
                  <div className="post-header">
                    <div>
                      <h3>{post.name} {post.mobile}</h3>
                      <p className="post-meta">{post.city} • {post.status}</p>
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
        <div className="logo-container">
          <img src="/logo.png" alt="ChatCam Logo" className="logo-image" />
          <h1 className="app-title">ChatCam</h1>
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
