import { CapacitorSQLite, SQLiteConnection } from '@capacitor-community/sqlite';
import { Capacitor } from '@capacitor/core';

class DatabaseService {
  constructor() {
    this.sqlite = new SQLiteConnection(CapacitorSQLite);
    this.db = null;
    this.dbName = 'chatcam.db';
    this.isWeb = Capacitor.getPlatform() === 'web';
  }

  async initialize() {
    try {
      if (this.isWeb) {
        // For web, use localStorage as fallback
        console.log('Running on web, using localStorage');
        return true;
      }

      // Create database connection
      this.db = await this.sqlite.createConnection(
        this.dbName,
        false,
        'no-encryption',
        1,
        false
      );

      await this.db.open();

      // Create table if not exists
      const createTableQuery = `
        CREATE TABLE IF NOT EXISTS records (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL,
          mobile TEXT NOT NULL,
          village TEXT NOT NULL,
          mandal TEXT NOT NULL,
          district TEXT NOT NULL,
          state TEXT NOT NULL,
          timestamp TEXT NOT NULL
        );
      `;

      await this.db.execute(createTableQuery);
      console.log('Database initialized successfully');
      return true;
    } catch (error) {
      console.error('Database initialization error:', error);
      return false;
    }
  }

  async insertRecord(data) {
    try {
      if (this.isWeb) {
        // Fallback to localStorage for web
        const records = JSON.parse(localStorage.getItem('chatcam_records') || '[]');
        const record = {
          ...data,
          id: Date.now(),
          timestamp: new Date().toLocaleString()
        };
        records.push(record);
        localStorage.setItem('chatcam_records', JSON.stringify(records));
        return record;
      }

      const query = `
        INSERT INTO records (name, mobile, village, mandal, district, state, timestamp)
        VALUES (?, ?, ?, ?, ?, ?, ?);
      `;

      const timestamp = new Date().toLocaleString();
      const values = [
        data.name,
        data.mobile,
        data.village,
        data.mandal,
        data.district,
        data.state,
        timestamp
      ];

      const result = await this.db.run(query, values);
      console.log('Record inserted successfully:', result);
      
      return {
        ...data,
        id: result.changes.lastId,
        timestamp
      };
    } catch (error) {
      console.error('Insert record error:', error);
      throw error;
    }
  }

  async getAllRecords() {
    try {
      if (this.isWeb) {
        // Fallback to localStorage for web
        return JSON.parse(localStorage.getItem('chatcam_records') || '[]');
      }

      const query = 'SELECT * FROM records ORDER BY id DESC;';
      const result = await this.db.query(query);
      
      return result.values || [];
    } catch (error) {
      console.error('Get all records error:', error);
      return [];
    }
  }

  async deleteRecord(id) {
    try {
      if (this.isWeb) {
        // Fallback to localStorage for web
        const records = JSON.parse(localStorage.getItem('chatcam_records') || '[]');
        const filtered = records.filter(record => record.id !== id);
        localStorage.setItem('chatcam_records', JSON.stringify(filtered));
        return true;
      }

      const query = 'DELETE FROM records WHERE id = ?;';
      await this.db.run(query, [id]);
      console.log('Record deleted successfully');
      return true;
    } catch (error) {
      console.error('Delete record error:', error);
      return false;
    }
  }

  async clearAllRecords() {
    try {
      if (this.isWeb) {
        // Fallback to localStorage for web
        localStorage.removeItem('chatcam_records');
        return true;
      }

      const query = 'DELETE FROM records;';
      await this.db.run(query);
      console.log('All records cleared successfully');
      return true;
    } catch (error) {
      console.error('Clear all records error:', error);
      return false;
    }
  }

  async close() {
    try {
      if (this.db && !this.isWeb) {
        await this.db.close();
        console.log('Database closed');
      }
    } catch (error) {
      console.error('Close database error:', error);
    }
  }
}

export const database = new DatabaseService();
