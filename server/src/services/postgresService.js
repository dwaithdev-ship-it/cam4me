import pool from '../config/database.js';
import bcrypt from 'bcrypt';

export class PostgresService {
    // ==================== AUTH & USER METHODS ====================

    async createUser(userData) {
        const { email, password, username, name, device_id } = userData;
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const query = `
            INSERT INTO users (email, password, username, name, device_id)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING id, email, username, role, created_at, device_id
        `;
        const values = [email, hashedPassword, username, name, device_id];
        const result = await pool.query(query, values);
        return result.rows[0];
    }

    async getUserByEmail(email) {
        const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        return result.rows[0] || null;
    }

    async getUserByDeviceId(deviceId) {
        const result = await pool.query('SELECT * FROM users WHERE device_id = $1', [deviceId]);
        return result.rows[0] || null;
    }

    async getUserById(id) {
        const result = await pool.query('SELECT id, email, username, name, mobile, photo_url, bio, role, state, district, constituency, mandal, village, selected_city, selected_category, setup_completed, created_at FROM users WHERE id = $1', [id]);
        return result.rows[0] || null;
    }

    async updateUserProfile(id, profileData) {
        const { name, bio, photo_url, username, mobile, state, district, constituency, mandal, village, selected_city, selected_category, setup_completed, password, device_id } = profileData;

        let hashedPassword = null;
        if (password) {
            const salt = await bcrypt.genSalt(10);
            hashedPassword = await bcrypt.hash(password, salt);
        }

        const query = `
            UPDATE users SET 
                name = COALESCE($1, name),
                bio = COALESCE($2, bio),
                photo_url = COALESCE($3, photo_url),
                username = COALESCE($4, username),
                mobile = COALESCE($5, mobile),
                state = COALESCE($6, state),
                district = COALESCE($7, district),
                constituency = COALESCE($8, constituency),
                mandal = COALESCE($9, mandal),
                village = COALESCE($10, village),
                selected_city = COALESCE($11, selected_city),
                selected_category = COALESCE($12, selected_category),
                setup_completed = COALESCE($13, setup_completed),
                password = COALESCE($14, password),
                device_id = COALESCE($15, device_id),
                updated_at = CURRENT_TIMESTAMP
            WHERE id = $16
            RETURNING id, email, username, name, mobile, photo_url, bio, role, selected_city, selected_category, setup_completed, device_id
        `;
        const values = [name, bio, photo_url, username, mobile, state, district, constituency, mandal, village, selected_city, selected_category, setup_completed, hashedPassword, device_id, id];
        const result = await pool.query(query, values);
        return result.rows[0];
    }

    async updateUserRole(id, role) {
        const query = `UPDATE users SET role = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2 RETURNING id, role`;
        const result = await pool.query(query, [role, id]);
        return result.rows[0];
    }


    async getAllUsers() {
        const result = await pool.query('SELECT id, email, username, name, role, created_at FROM users ORDER BY created_at DESC');
        return result.rows;
    }

    async deleteUser(id) {
        // Delete related records first due to foreign key constraints (some miss ON DELETE CASCADE)
        await pool.query('DELETE FROM posts WHERE user_id = $1', [id]);
        await pool.query('DELETE FROM feedbacks WHERE user_id = $1', [id]);
        await pool.query('DELETE FROM notifications WHERE target_user_id = $1', [id]);

        await pool.query('DELETE FROM users WHERE id = $1', [id]);
        return true;
    }

    // ==================== POST METHODS ====================

    async createPost(postData) {
        const { user_id, message, post_images, post_videos } = postData;
        const query = `
            INSERT INTO posts (user_id, message, post_images, post_videos)
            VALUES ($1, $2, $3, $4)
            RETURNING *
        `;
        const values = [user_id, message, post_images || [], post_videos || []];
        const result = await pool.query(query, values);
        return result.rows[0];
    }

    async getAllPosts() {
        const query = `
            SELECT 
                p.*, 
                u.username, 
                u.name, 
                u.photo_url as user_photo,
                u.mobile,
                u.selected_city as city,
                u.selected_category as category,
                u.state,
                u.district,
                u.village
            FROM posts p 
            JOIN users u ON p.user_id = u.id 
            ORDER BY p.timestamp DESC
        `;
        const result = await pool.query(query);
        return result.rows;
    }

    async getPostById(id) {
        const result = await pool.query('SELECT * FROM posts WHERE id = $1', [id]);
        return result.rows[0] || null;
    }

    async deletePost(id) {
        await pool.query('DELETE FROM posts WHERE id = $1', [id]);
        return true;
    }

    async updatePost(id, postData) {
        const { message, post_images, post_videos } = postData;
        const query = `
            UPDATE posts 
            SET message = $1, post_images = $2, post_videos = $3, timestamp = CURRENT_TIMESTAMP
            WHERE id = $4
            RETURNING *
        `;
        const values = [message, post_images || [], post_videos || [], id];
        const result = await pool.query(query, values);
        return result.rows[0];
    }

    async getPostByUserId(userId) {
        const result = await pool.query('SELECT * FROM posts WHERE user_id = $1', [userId]);
        return result.rows[0] || null;
    }

    async deletePostsByUserId(userId) {
        await pool.query('DELETE FROM posts WHERE user_id = $1', [userId]);
        return true;
    }

    // ==================== AD METHODS ====================

    async createAd(adData) {
        const { image_url, text, link, start_date, end_date, run_mode, target_locations } = adData;
        const query = `
            INSERT INTO ads (image_url, text, link, start_date, end_date, run_mode, target_locations)
            VALUES ($1, $2, $3, $4, $5, $6, $7)
            RETURNING *
        `;
        const values = [image_url, text, link, start_date, end_date, run_mode || 'all', JSON.stringify(target_locations || [])];
        const result = await pool.query(query, values);
        return result.rows[0];
    }

    async getActiveAds() {
        const result = await pool.query('SELECT * FROM ads WHERE end_date >= CURRENT_DATE OR end_date IS NULL ORDER BY created_at DESC');
        return result.rows;
    }

    async deleteAd(id) {
        await pool.query('DELETE FROM ads WHERE id = $1', [id]);
        return true;
    }

    // ==================== NOTIFICATION METHODS ====================

    async createNotification(notifData) {
        const { title, message, is_scheduled, scheduled_at, status, target_user_id } = notifData;
        const query = `
            INSERT INTO notifications (title, message, is_scheduled, scheduled_at, status, target_user_id)
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING *
        `;
        const values = [title, message, is_scheduled || false, scheduled_at, status || 'sent', target_user_id];
        const result = await pool.query(query, values);
        return result.rows[0];
    }

    async getUserNotifications(userId) {
        const result = await pool.query(
            'SELECT * FROM notifications WHERE target_user_id = $1 OR target_user_id IS NULL ORDER BY created_at DESC',
            [userId]
        );
        return result.rows;
    }

    async getAllNotifications() {
        const result = await pool.query('SELECT * FROM notifications ORDER BY created_at DESC');
        return result.rows;
    }

    async deleteNotification(id) {
        await pool.query('DELETE FROM notifications WHERE id = $1', [id]);
        return true;
    }

    async createNotification(data) {
        const { title, message, isScheduled, scheduledAt, status, targetUserId } = data;
        const query = `
            INSERT INTO notifications (title, message, is_scheduled, scheduled_at, status, target_user_id)
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING *
        `;
        const values = [title, message, isScheduled || false, scheduledAt || null, status || 'draft', targetUserId || null];
        const result = await pool.query(query, values);
        return result.rows[0];
    }

    async updateNotification(id, data) {
        const { title, message, isScheduled, scheduledAt, status, targetUserId } = data;

        const query = `
            UPDATE notifications SET 
                title = COALESCE($1, title),
                message = COALESCE($2, message),
                is_scheduled = COALESCE($3, is_scheduled),
                scheduled_at = COALESCE($4, scheduled_at),
                status = COALESCE($5, status),
                target_user_id = COALESCE($6, target_user_id)
            WHERE id = $7
            RETURNING *
        `;
        // map scheduleEnabled from frontend to is_scheduled if passed
        const isSched = data.scheduleEnabled !== undefined ? data.scheduleEnabled : isScheduled;

        const values = [title, message, isSched, scheduledAt, status, targetUserId, id];
        const result = await pool.query(query, values);
        return result.rows[0];
    }

    // ==================== FEEDBACK METHODS ====================

    async createFeedback(feedbackData) {
        const { user_id, message } = feedbackData;
        const result = await pool.query(
            'INSERT INTO feedbacks (user_id, message) VALUES ($1, $2) RETURNING *',
            [user_id, message]
        );
        return result.rows[0];
    }

    async getAllFeedbacks() {
        const query = `
            SELECT f.*, u.username, u.email 
            FROM feedbacks f 
            LEFT JOIN users u ON f.user_id = u.id 
            ORDER BY f.timestamp DESC
        `;
        const result = await pool.query(query);
        return result.rows;
    }

    // ==================== MASTER DATA (ADMIN FLAT TABLES) ====================

    async getAllMasterDataLocations() {
        const result = await pool.query('SELECT * FROM admin_masterdata_location ORDER BY state_name, district_name, constituency_name, mandal_name');
        return result.rows;
    }

    async saveMasterLocation(data) {
        const { state_name, district_name, constituency_name, mandal_name } = data;

        // Check for exact duplicate first to avoid clutter
        const checkQuery = `
            SELECT id FROM admin_masterdata_location 
            WHERE state_name = $1 AND district_name = $2 AND constituency_name = $3 AND mandal_name = $4
        `;
        const existing = await pool.query(checkQuery, [state_name, district_name, constituency_name, mandal_name]);
        if (existing.rows.length > 0) return existing.rows[0];

        const query = `
            INSERT INTO admin_masterdata_location (state_name, district_name, constituency_name, mandal_name)
            VALUES ($1, $2, $3, $4)
            RETURNING *
        `;
        const result = await pool.query(query, [state_name, district_name, constituency_name, mandal_name]);
        return result.rows[0];
    }

    async deleteMasterLocation(data) {
        const { state_name, district_name, constituency_name, mandal_name } = data;
        let query = 'DELETE FROM admin_masterdata_location WHERE state_name = $1';
        let values = [state_name];

        if (district_name) {
            query += ' AND district_name = $2';
            values.push(district_name);
            if (constituency_name) {
                query += ' AND constituency_name = $3';
                values.push(constituency_name);
                if (mandal_name) {
                    query += ' AND mandal_name = $4';
                    values.push(mandal_name);
                }
            }
        }
        await pool.query(query, values);
        return true;
    }

    async saveCity(name) {
        const result = await pool.query('INSERT INTO admin_masterdata_city (name) VALUES ($1) ON CONFLICT DO NOTHING RETURNING *', [name]);
        return result.rows[0];
    }

    async deleteCity(name) {
        await pool.query('DELETE FROM admin_masterdata_city WHERE name = $1', [name]);
        return true;
    }

    async saveCategory(name) {
        const result = await pool.query('INSERT INTO admin_masterdata_category (name) VALUES ($1) ON CONFLICT DO NOTHING RETURNING *', [name]);
        return result.rows[0];
    }

    async deleteCategory(name) {
        await pool.query('DELETE FROM admin_masterdata_category WHERE name = $1', [name]);
        return true;
    }

    // ==================== LEGACY MASTER DATA (LOCATION) METHODS ====================

    // ==================== CATEGORY & CITY METHODS ====================

    async getCategories() {
        const result = await pool.query('SELECT * FROM admin_masterdata_category ORDER BY name ASC');
        return result.rows;
    }

    async getCities() {
        const result = await pool.query('SELECT * FROM admin_masterdata_city ORDER BY name ASC');
        return result.rows;
    }
}

export const postgresService = new PostgresService();
