-- Create ChatCam Database Schema
-- Database: chatcam

-- 1. Users Table (Email & Password based auth)
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL, -- Hashed with bcrypt
    name VARCHAR(100),
    mobile VARCHAR(15) UNIQUE,
    photo_url TEXT,
    bio TEXT,
    state VARCHAR(100),
    district VARCHAR(100),
    constituency VARCHAR(100),
    mandal VARCHAR(100),
    village VARCHAR(100),
    selected_city VARCHAR(100),
    selected_category VARCHAR(100),
    setup_completed BOOLEAN DEFAULT FALSE,
    role VARCHAR(20) DEFAULT 'user', -- 'user', 'admin'
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Posts Table
CREATE TABLE IF NOT EXISTS posts (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    message TEXT,
    post_images TEXT[], -- Array of ImageKit URLs
    post_videos TEXT[], -- Array of ImageKit URLs
    likes_count INTEGER DEFAULT 0,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. Ads Table
CREATE TABLE IF NOT EXISTS ads (
    id SERIAL PRIMARY KEY,
    image_url TEXT NOT NULL,
    text TEXT,
    link TEXT,
    start_date DATE,
    end_date DATE,
    run_mode VARCHAR(20) DEFAULT 'all', -- 'all', 'targeted'
    target_locations JSONB DEFAULT '[]',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 4. Notifications Table
CREATE TABLE IF NOT EXISTS notifications (
    id SERIAL PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    message TEXT,
    is_scheduled BOOLEAN DEFAULT FALSE,
    scheduled_at TIMESTAMP,
    status VARCHAR(20) DEFAULT 'draft', -- 'draft', 'sent', 'cancelled'
    target_user_id INTEGER REFERENCES users(id), -- NULL for global/broadcast
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 5. Feedback Table
CREATE TABLE IF NOT EXISTS feedbacks (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
    message TEXT NOT NULL,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 6. Location Hierarchy (Optional but kept for continuity)
CREATE TABLE IF NOT EXISTS states (id SERIAL PRIMARY KEY, name VARCHAR(100) UNIQUE);
CREATE TABLE IF NOT EXISTS districts (id SERIAL PRIMARY KEY, state_id INTEGER REFERENCES states(id), name VARCHAR(100));
CREATE TABLE IF NOT EXISTS constituencies (id SERIAL PRIMARY KEY, district_id INTEGER REFERENCES districts(id), name VARCHAR(100));
CREATE TABLE IF NOT EXISTS mandals (id SERIAL PRIMARY KEY, constituency_id INTEGER REFERENCES constituencies(id), name VARCHAR(100));
CREATE TABLE IF NOT EXISTS villages (id SERIAL PRIMARY KEY, mandal_id INTEGER REFERENCES mandals(id), name VARCHAR(100));

-- Indexes for performance
CREATE INDEX idx_posts_user_id ON posts(user_id);
CREATE INDEX idx_feedbacks_user_id ON feedbacks(user_id);
CREATE INDEX idx_users_email ON users(email);
