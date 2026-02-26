-- Cam4me PostgreSQL Database Schema
-- Neon PostgreSQL Database

-- Users Table
CREATE TABLE IF NOT EXISTS users (
  uid VARCHAR(255) PRIMARY KEY,
  email VARCHAR(255) UNIQUE,
  display_name VARCHAR(255),
  name VARCHAR(255),
  mobile VARCHAR(20) UNIQUE,
  photo TEXT,
  village TEXT,
  mandal TEXT,
  district VARCHAR(255),
  state VARCHAR(255),
  selected_city VARCHAR(255),
  selected_category VARCHAR(100),
  trusted_device_id VARCHAR(255),
  last_device_id VARCHAR(255),
  last_ip VARCHAR(50),
  last_login_time TIMESTAMP,
  setup_completed BOOLEAN DEFAULT FALSE,
  terms_accepted BOOLEAN DEFAULT FALSE,
  has_completed_onboarding BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Posts Table
CREATE TABLE IF NOT EXISTS posts (
  id SERIAL PRIMARY KEY,
  user_id VARCHAR(255) REFERENCES users(uid) ON DELETE CASCADE,
  message TEXT,
  post_image TEXT,
  post_images TEXT[],
  post_videos TEXT[],
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create index on user_id for faster queries
CREATE INDEX IF NOT EXISTS idx_posts_user_id ON posts(user_id);
CREATE INDEX IF NOT EXISTS idx_posts_timestamp ON posts(timestamp DESC);

-- Ads Table
CREATE TABLE IF NOT EXISTS ads (
  id SERIAL PRIMARY KEY,
  image TEXT,
  text TEXT,
  link TEXT,
  start_date TIMESTAMP,
  end_date TIMESTAMP,
  run_mode VARCHAR(20) DEFAULT 'all',
  target_locations JSONB,
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create index for active ads queries
CREATE INDEX IF NOT EXISTS idx_ads_dates ON ads(start_date, end_date);

-- Feedbacks Table
CREATE TABLE IF NOT EXISTS feedbacks (
  id SERIAL PRIMARY KEY,
  user_id VARCHAR(255) REFERENCES users(uid) ON DELETE SET NULL,
  message TEXT NOT NULL,
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Notifications Table
CREATE TABLE IF NOT EXISTS notifications (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  scheduled_date DATE,
  scheduled_time TIME,
  is_scheduled BOOLEAN DEFAULT FALSE,
  schedule_enabled BOOLEAN DEFAULT TRUE,
  status VARCHAR(50) DEFAULT 'draft',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Master Data Table
CREATE TABLE IF NOT EXISTS master_data (
  id SERIAL PRIMARY KEY,
  locations JSONB,
  categories TEXT[],
  last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert default master data if not exists
INSERT INTO master_data (locations, categories, last_updated)
SELECT 
  '{"Andhra Pradesh": {"Visakhapatnam": ["Visakhapatnam", "Gajuwaka", "Anakapalle"], "Vijayawada": ["Vijayawada", "Gudivada", "Machilipatnam"], "Guntur": ["Guntur", "Tenali", "Narasaraopet"], "Nellore": ["Nellore", "Kavali", "Gudur"], "Kurnool": ["Kurnool", "Adoni", "Nandyal"], "Tirupati": ["Tirupati", "Madanapalle", "Chittoor"]}, "Telangana": {"Hyderabad": ["Hyderabad", "Secunderabad", "Cyberabad"], "Warangal": ["Warangal", "Kazipet", "Hanamkonda"], "Nizamabad": ["Nizamabad", "Bodhan", "Kamareddy"], "Karimnagar": ["Karimnagar", "Ramagundam", "Jagtial"], "Khammam": ["Khammam", "Kothagudem", "Palwancha"]}}'::jsonb,
  ARRAY['Men', 'Women', 'Couple'],
  CURRENT_TIMESTAMP
WHERE NOT EXISTS (SELECT 1 FROM master_data LIMIT 1);

-- Sessions Table (for tracking)
CREATE TABLE IF NOT EXISTS sessions (
  id SERIAL PRIMARY KEY,
  user_id VARCHAR(255) REFERENCES users(uid) ON DELETE CASCADE,
  device_id VARCHAR(255),
  ip_address VARCHAR(50),
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_sessions_user_id ON sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_sessions_timestamp ON sessions(timestamp DESC);
