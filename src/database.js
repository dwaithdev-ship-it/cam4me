
import { Capacitor } from '@capacitor/core';

class DatabaseService {
  constructor() {
    this.isWeb = Capacitor.getPlatform() === 'web';
    this.apiUrl = this.isWeb ? '/api' : 'http://localhost:5000/api';
  }

  async fetchWithTimeout(url, options = {}, timeout = 5000) {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout);
    try {
      const response = await fetch(url, {
        ...options,
        signal: controller.signal
      });
      clearTimeout(id);
      return response;
    } catch (err) {
      clearTimeout(id);
      throw err;
    }
  }

  async initialize() {
    console.log('Database service initializing...');
    try {
      // 1.5s timeout for initial check to avoid long blocking
      const resp = await this.fetchWithTimeout(`${this.apiUrl}/users`, { method: 'GET' }, 1500);
      if (resp.ok) {
        console.log('Backend connection successful');

        const users = await resp.json();

        if (this.isWeb && (!users || users.length === 0)) {
          console.log('Database empty, attempting migration...');
          await this.migrateFromLocalStorage(true);
        } else if (this.isWeb && !localStorage.getItem('postgres_migrated')) {
          this.migrateFromLocalStorage(false);
        }
        return true;
      }
      return false;
    } catch (err) {
      console.warn('Backend connection failed/timed out (' + err.message + '). Using offline/fallback mode if available.');
      return false;
    }
  }

  async migrateFromLocalStorage(force = false) {
    const migrated = localStorage.getItem('postgres_migrated');
    if (migrated && !force) return;

    console.log('Starting migration from localStorage to PostgreSQL...');
    try {
      // Migrate users
      const usersStr = localStorage.getItem('sq_users');
      if (usersStr) {
        const users = JSON.parse(usersStr);
        for (const uid in users) {
          await this.saveUser(users[uid]);
        }
      }

      // Migrate posts
      const postsStr = localStorage.getItem('sq_posts');
      if (postsStr) {
        const posts = JSON.parse(postsStr);
        for (const post of posts) {
          await this.savePost(post);
        }
      }

      // Migrate ads
      const adsStr = localStorage.getItem('sq_ads');
      if (adsStr) {
        const ads = JSON.parse(adsStr);
        for (const ad of ads) {
          await this.saveAd(ad);
        }
      }

      // Migrate feedbacks
      const feedbacksStr = localStorage.getItem('sq_feedbacks');
      if (feedbacksStr) {
        const feedbacks = JSON.parse(feedbacksStr);
        for (const fb of feedbacks) {
          await this.saveFeedback(fb);
        }
      }

      localStorage.setItem('postgres_migrated', 'true');
      console.log('Migration completed');
    } catch (err) {
      console.error('Migration failed:', err);
    }
  }

  async saveUser(userData) {
    try {
      const res = await this.fetchWithTimeout(`${this.apiUrl}/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
      });
      return await res.json();
    } catch (err) {
      console.error('Error saving user:', err);
      return userData;
    }
  }

  async getUser(uid) {
    try {
      const res = await this.fetchWithTimeout(`${this.apiUrl}/users/${uid}`);
      if (!res.ok) return null;
      return await res.json();
    } catch (err) {
      console.error('Error getting user:', err);
      return null;
    }
  }

  async getAllUsers() {
    try {
      const res = await this.fetchWithTimeout(`${this.apiUrl}/users`);
      return await res.json();
    } catch (err) {
      console.error('Error getting all users:', err);
      return [];
    }
  }

  async savePost(post) {
    try {
      const res = await this.fetchWithTimeout(`${this.apiUrl}/posts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(post)
      });
      return await res.json();
    } catch (err) {
      console.error('Error saving post:', err);
      return post;
    }
  }

  async getPosts() {
    try {
      const res = await this.fetchWithTimeout(`${this.apiUrl}/posts`);
      if (!res.ok) return [];
      return await res.json();
    } catch (err) {
      console.error('Error getting posts:', err);
      return [];
    }
  }

  async deletePostsByUser(uid) {
    try {
      const res = await this.fetchWithTimeout(`${this.apiUrl}/posts/user/${uid}`, { method: 'DELETE' });
      const data = await res.json();
      return data.success;
    } catch (err) {
      return false;
    }
  }

  async saveAd(ad) {
    try {
      const res = await this.fetchWithTimeout(`${this.apiUrl}/ads`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(ad)
      });
      return await res.json();
    } catch (err) {
      return ad;
    }
  }

  async getAds() {
    try {
      const res = await this.fetchWithTimeout(`${this.apiUrl}/ads`);
      if (!res.ok) return [];
      return await res.json();
    } catch (err) {
      return [];
    }
  }

  async deleteAd(id) {
    try {
      const res = await this.fetchWithTimeout(`${this.apiUrl}/ads/${id}`, { method: 'DELETE' });
      const data = await res.json();
      return data.success;
    } catch (err) {
      return false;
    }
  }

  async saveFeedback(feedback) {
    try {
      const res = await this.fetchWithTimeout(`${this.apiUrl}/feedbacks`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(feedback)
      });
      return await res.json();
    } catch (err) {
      return feedback;
    }
  }

  async getAllFeedbacks() {
    try {
      const res = await this.fetchWithTimeout(`${this.apiUrl}/feedbacks`);
      if (!res.ok) return [];
      return await res.json();
    } catch (err) {
      return [];
    }
  }

  async deleteUser(uid) {
    return false;
  }
}

export const database = new DatabaseService();
