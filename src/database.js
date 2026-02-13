import { ref, set, get, update, push, remove, serverTimestamp, query, orderByChild, equalTo } from "firebase/database";
import { rtDb } from "./firebase";
import { Capacitor } from '@capacitor/core';

class DatabaseService {
  constructor() {
    this.isWeb = Capacitor.getPlatform() === 'web';
  }

  async initialize() {
    console.log('Firebase Database service initializing...');
    try {
      // Basic connectivity check: try to read a shared node or root
      const snapshot = await get(ref(rtDb, '.info/connected'));
      console.log('Firebase connection status:', snapshot.val());
      return true;
    } catch (err) {
      console.warn('Firebase connection failed:', err.message);
      return false;
    }
  }

  // --- USER METHODS ---
  async saveUser(userData) {
    if (!userData.uid) return null;
    try {
      const userRef = ref(rtDb, `users/${userData.uid}`);
      const dataToSave = {
        ...userData,
        lastUpdated: serverTimestamp()
      };
      await set(userRef, dataToSave);
      return dataToSave;
    } catch (err) {
      console.error('Error saving user:', err);
      return userData;
    }
  }

  async getUser(uid) {
    if (!uid) return null;
    try {
      const snapshot = await get(ref(rtDb, `users/${uid}`));
      return snapshot.exists() ? snapshot.val() : null;
    } catch (err) {
      console.error('Error getting user:', err);
      return null;
    }
  }

  async getAllUsers() {
    try {
      const snapshot = await get(ref(rtDb, 'users'));
      if (!snapshot.exists()) return [];
      const users = [];
      snapshot.forEach((child) => {
        users.push(child.val());
      });
      return users.sort((a, b) => (b.lastUpdated || 0) - (a.lastUpdated || 0));
    } catch (err) {
      console.error('Error getting all users:', err);
      return [];
    }
  }

  // --- POST METHODS ---
  async savePost(post) {
    try {
      const id = post.id || push(ref(rtDb, 'posts')).key;
      const postRef = ref(rtDb, `posts/${id}`);
      const dataToSave = {
        ...post,
        id,
        timestamp: post.timestamp || new Date().toISOString()
      };
      await set(postRef, dataToSave);
      return dataToSave;
    } catch (err) {
      console.error('Error saving post:', err);
      throw err; // Propagate error to caller
    }
  }

  async getPosts() {
    try {
      const snapshot = await get(ref(rtDb, 'posts'));
      if (!snapshot.exists()) return [];
      const posts = [];
      snapshot.forEach((child) => {
        posts.push(child.val());
      });
      return posts.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    } catch (err) {
      console.error('Error getting posts:', err);
      return [];
    }
  }

  async getUserPosts(uid) {
    if (!uid) return [];
    try {
      const postsRef = ref(rtDb, 'posts');
      const userPostsQuery = query(postsRef, orderByChild('userId'), equalTo(uid));
      const snapshot = await get(userPostsQuery);
      if (!snapshot.exists()) return [];
      const posts = [];
      snapshot.forEach((child) => {
        posts.push(child.val());
      });
      return posts.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    } catch (err) {
      console.error('Error getting user posts:', err);
      return [];
    }
  }

  async deletePost(id) {
    try {
      await remove(ref(rtDb, `posts/${id}`));
      return true;
    } catch (err) {
      console.error('Error deleting post:', err);
      return false;
    }
  }

  async deletePostsByUser(uid) {
    try {
      const snapshot = await get(ref(rtDb, 'posts'));
      if (!snapshot.exists()) return true;

      const updates = {};
      snapshot.forEach((child) => {
        if (child.val().userId === uid) {
          updates[`posts/${child.key}`] = null;
        }
      });
      await update(ref(rtDb), updates);
      return true;
    } catch (err) {
      console.error('Error deleting user posts:', err);
      return false;
    }
  }

  // --- AD METHODS ---
  async saveAd(ad) {
    try {
      const id = ad.id || push(ref(rtDb, 'ads')).key;
      const adRef = ref(rtDb, `ads/${id}`);
      const dataToSave = {
        ...ad,
        id,
        timestamp: ad.timestamp || new Date().toISOString()
      };
      await set(adRef, dataToSave);
      return dataToSave;
    } catch (err) {
      console.error('Error saving ad:', err);
      return ad;
    }
  }

  async getAds() {
    try {
      const snapshot = await get(ref(rtDb, 'ads'));
      if (!snapshot.exists()) return [];
      const ads = [];
      snapshot.forEach((child) => {
        ads.push(child.val());
      });
      return ads.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    } catch (err) {
      console.error('Error getting ads:', err);
      return [];
    }
  }

  async deleteAd(id) {
    try {
      await remove(ref(rtDb, `ads/${id}`));
      return true;
    } catch (err) {
      console.error('Error deleting ad:', err);
      return false;
    }
  }

  // --- FEEDBACK METHODS ---
  async saveFeedback(feedback) {
    try {
      const id = push(ref(rtDb, 'feedbacks')).key;
      const feedbackRef = ref(rtDb, `feedbacks/${id}`);
      const dataToSave = {
        ...feedback,
        id,
        timestamp: new Date().toISOString()
      };
      await set(feedbackRef, dataToSave);
      return dataToSave;
    } catch (err) {
      console.error('Error saving feedback:', err);
      return feedback;
    }
  }

  async getAllFeedbacks() {
    try {
      const snapshot = await get(ref(rtDb, 'feedbacks'));
      if (!snapshot.exists()) return [];
      const feedbacks = [];
      snapshot.forEach((child) => {
        feedbacks.push(child.val());
      });
      return feedbacks.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    } catch (err) {
      console.error('Error getting feedbacks:', err);
      return [];
    }
  }

  // --- NOTIFICATION METHODS ---
  async saveNotification(notification) {
    try {
      const id = notification.id || push(ref(rtDb, 'notifications')).key;
      const notifRef = ref(rtDb, `notifications/${id}`);
      const now = new Date().toISOString();
      const dataToSave = {
        ...notification,
        id,
        createdAt: notification.createdAt || now,
        updatedAt: now
      };
      await set(notifRef, dataToSave);
      return dataToSave;
    } catch (err) {
      console.error('Error saving notification:', err);
      return notification;
    }
  }

  async getNotifications() {
    try {
      const snapshot = await get(ref(rtDb, 'notifications'));
      if (!snapshot.exists()) return [];
      const notifications = [];
      snapshot.forEach((child) => {
        notifications.push(child.val());
      });
      return notifications.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } catch (err) {
      console.error('Error getting notifications:', err);
      return [];
    }
  }

  async updateNotification(id, updates) {
    try {
      const notifRef = ref(rtDb, `notifications/${id}`);
      const dataToUpdate = {
        ...updates,
        updatedAt: new Date().toISOString()
      };
      await update(notifRef, dataToUpdate);
      const snapshot = await get(notifRef);
      return snapshot.val();
    } catch (err) {
      console.error('Error updating notification:', err);
      return null;
    }
  }

  async deleteNotification(id) {
    try {
      await remove(ref(rtDb, `notifications/${id}`));
      return true;
    } catch (err) {
      console.error('Error deleting notification:', err);
      return false;
    }
  }

  async deleteUser(uid) {
    try {
      await remove(ref(rtDb, `users/${uid}`));
      await this.deletePostsByUser(uid);
      return true;
    } catch (err) {
      console.error('Error deleting user:', err);
      return false;
    }
  }


  // --- ADMIN MASTER DATA METHODS (PostgreSQL Migration) ---
  async getMasterData() {
    const API_BASE_URL = 'http://localhost:5006/api/master-data';
    try {
      console.log(`[Database] Fetching master data from ${API_BASE_URL}...`);
      const [locationsRes, citiesRes, categoriesRes] = await Promise.all([
        fetch(`${API_BASE_URL}/locations`),
        fetch(`${API_BASE_URL}/cities`),
        fetch(`${API_BASE_URL}/categories`)
      ]);

      if (!locationsRes.ok || !citiesRes.ok || !categoriesRes.ok) {
        throw new Error(`API failed: Locations(${locationsRes.status}), Cities(${citiesRes.status}), Categories(${categoriesRes.status})`);
      }
      const locationRows = await locationsRes.json();
      const citiesData = await citiesRes.json();
      const categoriesData = await categoriesRes.json();

      // Transform location flat rows into intended hierarchy
      const locations = {};
      locationRows.forEach(row => {
        const { state_name, district_name, constituency_name, mandal_name } = row;
        if (!locations[state_name]) locations[state_name] = {};
        if (!locations[state_name][district_name]) locations[state_name][district_name] = {};
        if (!locations[state_name][district_name][constituency_name]) locations[state_name][district_name][constituency_name] = [];
        if (!locations[state_name][district_name][constituency_name].includes(mandal_name)) {
          locations[state_name][district_name][constituency_name].push(mandal_name);
        }
      });

      const categories = categoriesData.map(item => item.name);
      const cities = citiesData.map(item => item.name);

      return { locations, categories, cities };
    } catch (err) {
      console.warn('PostgreSQL API error, falling back to Firebase:', err.message);
      try {
        const snapshot = await get(ref(rtDb, 'admin/masterData'));
        return snapshot.exists() ? snapshot.val() : { locations: {}, categories: [], cities: [] };
      } catch (fbErr) {
        console.error('Firebase fallback failed:', fbErr);
        return { locations: {}, categories: [], cities: [] };
      }
    }
  }

  async saveMasterData(data) {
    // Note: Admin data additions handled via specific POST endpoints in server.js
    // This method remains for backward compatibility or direct Firebase sync if needed.
    try {
      const masterDataRef = ref(rtDb, 'admin/masterData');
      const dataToSave = {
        ...data,
        lastUpdated: new Date().toISOString()
      };
      await set(masterDataRef, dataToSave);
      return dataToSave;
    } catch (err) {
      console.error('Error saving master data:', err);
      return null;
    }
  }

  // --- SESSION METHODS ---
  async saveSession(sessionData) {
    try {
      const sessionRef = push(ref(rtDb, 'sessions'));
      await set(sessionRef, {
        ...sessionData,
        timestamp: sessionData.timestamp || new Date().toISOString()
      });
      return true;
    } catch (err) {
      console.error('Error saving session:', err);
      return false;
    }
  }
}

export const database = new DatabaseService();
