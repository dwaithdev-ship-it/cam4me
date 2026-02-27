import { Capacitor } from '@capacitor/core';

class DatabaseService {
  constructor() {
    this.isWeb = Capacitor.getPlatform() === 'web';
    // Determine base URL for API calls
    // 1. If running on a native device (Capacitor), prefer VITE_API_URL or fallback to a local network address.
    // 2. If running in a web browser, keep existing logic (localhost or same origin).
    if (Capacitor.isNativePlatform && Capacitor.isNativePlatform()) {
      this.baseUrl = import.meta.env.VITE_API_URL || 'http://10.0.2.2:5000/api'; // Android emulator localhost
    } else {
      this.baseUrl = import.meta.env.VITE_API_URL || (window.location.origin.includes('localhost') || window.location.origin.includes('127.0.0.1')
        ? 'http://localhost:5000/api'
        : `${window.location.origin}/api`);
    }
  }

  getHeaders() {
    const token = localStorage.getItem('chatcam_token');
    return {
      'Content-Type': 'application/json',
      'Authorization': token ? `Bearer ${token}` : ''
    };
  }

  async initialize() {
    console.log('Database service initializing (Connecting to Express API)...');
    try {
      // Use health check path that matches backend regardless of frontend port
      // If VITE_API_URL is set, derive health URL from it; otherwise fallback to localhost
      const healthUrl = this.baseUrl.replace('/api', '/health');
      try {
        const response = await fetch(healthUrl);
        if (response.ok) return true;
      } catch (e) { /* ignore */ }
      // Fallback to default localhost health endpoint
      try {
        const fallback = await fetch('http://localhost:5000/health');
        return fallback.ok;
      } catch (e) { return false; }
    } catch (err) {
      console.warn('Backend API connection failed:', err.message);
      return false;
    }
  }

  // --- AUTH METHODS ---
  async login(email, password, deviceId) {
    try {
      const response = await fetch(`${this.baseUrl}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, device_id: deviceId })
      });
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('chatcam_token', data.token);
        localStorage.setItem('chatcam_user', JSON.stringify(data.user));
      }
      return { ok: response.ok, ...data };
    } catch (err) {
      console.warn('Login network error:', err.message);
      return { ok: false, error: 'Network Error', message: 'Unable to reach backend. Ensure the server is running and your device can access http://<PC_IP>:5000' };
    }
  }

  async register(userData) {
    try {
      const response = await fetch(`${this.baseUrl}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
      });
      const data = await response.json();
      return { ok: response.ok, ...data };
    } catch (err) {
      console.warn('Register network error:', err.message);
      return { ok: false, error: 'Network Error', message: 'Unable to reach backend. Ensure the server is running and your device can access http://<PC_IP>:5000' };
    }
  }

  logout() {
    localStorage.removeItem('chatcam_token');
    localStorage.removeItem('chatcam_user');
  }

  // --- USER METHODS ---
  async getProfile() {
    const response = await fetch(`${this.baseUrl}/users/profile`, {
      headers: this.getHeaders()
    });
    return response.ok ? await response.json() : null;
  }

  async updateProfile(profileData) {
    const response = await fetch(`${this.baseUrl}/users/profile`, {
      method: 'PUT',
      headers: this.getHeaders(),
      body: JSON.stringify(profileData)
    });
    return { ok: response.ok, ...await response.json() };
  }

  async saveUser(userData) {
    // Alias for updateProfile used in legacy parts of App.jsx
    return this.updateProfile(userData);
  }

  async updateUserRole(id, role) {
    const response = await fetch(`${this.baseUrl}/users/${id}/role`, {
      method: 'PATCH',
      headers: this.getHeaders(),
      body: JSON.stringify({ role })
    });
    return response.ok;
  }

  async changePassword(newPassword) {
    const response = await fetch(`${this.baseUrl}/users/profile`, {
      method: 'PUT',
      headers: this.getHeaders(),
      body: JSON.stringify({ password: newPassword })
    });
    return { ok: response.ok, ...await response.json() };
  }

  async getAllUsers() {
    const response = await fetch(`${this.baseUrl}/users`, {
      headers: this.getHeaders()
    });
    return response.ok ? await response.json() : [];
  }

  async deleteUser(id) {
    const response = await fetch(`${this.baseUrl}/users/${id}`, {
      method: 'DELETE',
      headers: this.getHeaders()
    });
    return response.ok;
  }

  async checkDeviceExists(deviceId) {
    try {
      const response = await fetch(`${this.baseUrl}/auth/check-device/${deviceId}`, {
        headers: this.getHeaders()
      });
      return response.ok ? await response.json() : { exists: false };
    } catch (e) {
      console.warn('checkDeviceExists network error:', e.message);
      return { exists: false, error: 'Network Error' };
    }
  }

  // Debug/Admin legacy methods
  async deleteRecord(id) {
    return this.deleteUser(id);
  }

  async clearAllRecords() {
    console.warn('clearAllRecords called but not implemented for production security');
    return true;
  }

  // --- MASTER DATA METHODS ---
  async getMasterData() {
    const response = await fetch(`${this.baseUrl}/master-data`, {
      headers: this.getHeaders()
    });
    return response.ok ? await response.json() : null;
  }

  async saveLocation(data) {
    const response = await fetch(`${this.baseUrl}/master-data/locations`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(data)
    });
    return response.ok;
  }

  async deleteLocation(data) {
    const response = await fetch(`${this.baseUrl}/master-data/locations`, {
      method: 'DELETE',
      headers: this.getHeaders(),
      body: JSON.stringify(data)
    });
    return response.ok;
  }

  async saveCity(name) {
    const response = await fetch(`${this.baseUrl}/master-data/cities`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify({ name })
    });
    return response.ok;
  }

  async deleteCity(name) {
    const response = await fetch(`${this.baseUrl}/master-data/cities`, {
      method: 'DELETE',
      headers: this.getHeaders(),
      body: JSON.stringify({ name })
    });
    return response.ok;
  }

  async saveCategory(name) {
    const response = await fetch(`${this.baseUrl}/master-data/categories`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify({ name })
    });
    return response.ok;
  }

  async deleteCategory(name) {
    const response = await fetch(`${this.baseUrl}/master-data/categories`, {
      method: 'DELETE',
      headers: this.getHeaders(),
      body: JSON.stringify({ name })
    });
    return response.ok;
  }

  // --- POST METHODS ---
  async savePost(post) {
    const response = await fetch(`${this.baseUrl}/posts`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(post)
    });
    if (!response.ok) return null;
    const newPost = await response.json();
    return {
      ...newPost,
      userId: newPost.user_id,
      postImages: newPost.post_images,
      postVideos: newPost.post_videos
    };
  }

  async getPosts() {
    const response = await fetch(`${this.baseUrl}/posts`, {
      headers: this.getHeaders()
    });
    if (!response.ok) return [];
    const posts = await response.json();
    return posts.map(post => ({
      ...post,
      userId: post.user_id,
      postImages: post.post_images,
      postVideos: post.post_videos,
      userName: post.username,
      userPhoto: post.user_photo
    }));
  }

  async deletePost(id) {
    const response = await fetch(`${this.baseUrl}/posts/${id}`, {
      method: 'DELETE',
      headers: this.getHeaders()
    });
    return response.ok;
  }

  async deletePostsByUser(userId) {
    const response = await fetch(`${this.baseUrl}/posts/user/${userId}`, {
      method: 'DELETE',
      headers: this.getHeaders()
    });
    return response.ok;
  }

  // --- AD METHODS ---
  async saveAd(ad) {
    const response = await fetch(`${this.baseUrl}/ads`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(ad)
    });
    return response.ok ? await response.json() : null;
  }

  async getAds() {
    const response = await fetch(`${this.baseUrl}/ads`, {
      headers: this.getHeaders()
    });
    if (!response.ok) return [];
    const ads = await response.json();
    return ads.map(ad => {
      let parsedLocations = [];
      try {
        parsedLocations = typeof ad.target_locations === 'string' ? JSON.parse(ad.target_locations) : (ad.target_locations || []);
      } catch (e) { }

      return {
        ...ad,
        startDate: ad.start_date,
        endDate: ad.end_date,
        image: ad.image_url,
        runMode: ad.run_mode,
        targetLocations: parsedLocations
      };
    });
  }

  async deleteAd(id) {
    const response = await fetch(`${this.baseUrl}/ads/${id}`, {
      method: 'DELETE',
      headers: this.getHeaders()
    });
    return response.ok;
  }

  // --- FEEDBACK METHODS ---
  async saveFeedback(feedbackData) {
    const response = await fetch(`${this.baseUrl}/feedbacks`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(feedbackData)
    });
    return response.ok ? await response.json() : null;
  }

  async getAllFeedbacks() {
    const response = await fetch(`${this.baseUrl}/feedbacks`, {
      headers: this.getHeaders()
    });
    return response.ok ? await response.json() : [];
  }

  // --- NOTIFICATION METHODS ---
  async getNotifications() {
    const response = await fetch(`${this.baseUrl}/notifications`, {
      headers: this.getHeaders()
    });
    return response.ok ? await response.json() : [];
  }

  async saveNotification(notification) {
    const response = await fetch(`${this.baseUrl}/notifications`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(notification)
    });
    return response.ok ? await response.json() : null;
  }

  async updateNotification(id, data) {
    const response = await fetch(`${this.baseUrl}/notifications/${id}`, {
      method: 'PATCH',
      headers: this.getHeaders(),
      body: JSON.stringify(data)
    });
    if (!response.ok) throw new Error('Failed to update notification');
    return await response.json();
  }

  async deleteNotification(id) {
    const response = await fetch(`${this.baseUrl}/notifications/${id}`, {
      method: 'DELETE',
      headers: this.getHeaders()
    });
    if (!response.ok) throw new Error('Failed to delete notification');
    return true;
  }
}


export const database = new DatabaseService();
