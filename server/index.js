
import express from 'express';
import pg from 'pg';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: '50mb' }));

const pool = new pg.Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'cam4me',
    password: 'Dwaithdevkalyan@123',
    port: 5432,
});

// --- USER ENDPOINTS ---
app.post('/api/users', async (req, res) => {
    const user = req.body;
    const query = `
    INSERT INTO users (uid, email, name, photo, mobile, village, mandal, district, state, "setupCompleted", "termsAccepted", "selectedCity", "selectedCategory", "lastScreen", "lastUpdated")
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, CURRENT_TIMESTAMP)
    ON CONFLICT (uid) DO UPDATE SET
      email = EXCLUDED.email,
      name = EXCLUDED.name,
      photo = EXCLUDED.photo,
      mobile = EXCLUDED.mobile,
      village = EXCLUDED.village,
      mandal = EXCLUDED.mandal,
      district = EXCLUDED.district,
      state = EXCLUDED.state,
      "setupCompleted" = EXCLUDED."setupCompleted",
      "termsAccepted" = EXCLUDED."termsAccepted",
      "selectedCity" = EXCLUDED."selectedCity",
      "selectedCategory" = EXCLUDED."selectedCategory",
      "lastScreen" = EXCLUDED."lastScreen",
      "lastUpdated" = CURRENT_TIMESTAMP
    RETURNING *;
  `;
    const values = [
        user.uid, user.email || '', user.name || '', user.photo || '',
        user.mobile || '', user.village || '', user.mandal || '', user.district || '',
        user.state || '', user.setupCompleted || false, user.termsAccepted || false,
        user.selectedCity || '', user.selectedCategory || '', user.lastScreen || ''
    ];
    try {
        const result = await pool.query(query, values);
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});

app.get('/api/users/:uid', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM users WHERE uid = $1', [req.params.uid]);
        res.json(result.rows[0] || null);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/api/users', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM users ORDER BY "lastUpdated" DESC');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// --- POST ENDPOINTS ---
app.post('/api/posts', async (req, res) => {
    const post = req.body;
    const id = post.id || 'p_' + Date.now();
    const query = `
    INSERT INTO posts (id, "userId", "userName", "userPhoto", message, "postImage", village, district, state, timestamp)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
    ON CONFLICT (id) DO UPDATE SET
      "userName" = EXCLUDED."userName",
      "userPhoto" = EXCLUDED."userPhoto",
      message = EXCLUDED.message,
      "postImage" = EXCLUDED."postImage",
      village = EXCLUDED.village,
      district = EXCLUDED.district,
      state = EXCLUDED.state,
      timestamp = EXCLUDED.timestamp
    RETURNING *;
  `;
    const values = [
        id, post.userId, post.userName, post.userPhoto, post.message,
        post.postImage, post.village, post.district, post.state, post.timestamp || new Date().toISOString()
    ];
    try {
        const result = await pool.query(query, values);
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/api/posts', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM posts ORDER BY timestamp DESC');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// --- AD ENDPOINTS ---
app.post('/api/ads', async (req, res) => {
    const ad = req.body;
    const id = ad.id || 'ad_' + Date.now();
    const query = `
    INSERT INTO ads (id, image, text, link, "startDate", "endDate", "targetLocations", "runMode", timestamp)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
    ON CONFLICT (id) DO UPDATE SET
      image = EXCLUDED.image,
      text = EXCLUDED.text,
      link = EXCLUDED.link,
      "startDate" = EXCLUDED."startDate",
      "endDate" = EXCLUDED."endDate",
      "targetLocations" = EXCLUDED."targetLocations",
      "runMode" = EXCLUDED."runMode",
      timestamp = EXCLUDED.timestamp
    RETURNING *;
  `;
    const values = [
        id, ad.image, ad.text, ad.link, ad.startDate, ad.endDate,
        JSON.stringify(ad.targetLocations || []), ad.runMode || 'all', ad.timestamp || new Date().toISOString()
    ];
    try {
        const result = await pool.query(query, values);
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/api/ads', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM ads ORDER BY timestamp DESC');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// --- FEEDBACK ENDPOINTS ---
app.post('/api/feedbacks', async (req, res) => {
    const feedback = req.body;
    const id = 'f_' + Date.now();
    const query = `
    INSERT INTO feedbacks (id, "userId", "userEmail", "userName", message, timestamp)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *;
  `;
    const values = [
        id, feedback.userId, feedback.userEmail, feedback.userName,
        feedback.message, new Date().toISOString()
    ];
    try {
        const result = await pool.query(query, values);
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/api/feedbacks', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM feedbacks ORDER BY timestamp DESC');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// --- NOTIFICATION ENDPOINTS ---
app.post('/api/notifications', async (req, res) => {
    const notification = req.body;
    const id = notification.id || 'notif_' + Date.now();
    const query = `
    INSERT INTO notifications (id, title, message, "scheduledDate", "scheduledTime", "isScheduled", "scheduleEnabled", status, "createdAt", "updatedAt")
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
    ON CONFLICT (id) DO UPDATE SET
      title = EXCLUDED.title,
      message = EXCLUDED.message,
      "scheduledDate" = EXCLUDED."scheduledDate",
      "scheduledTime" = EXCLUDED."scheduledTime",
      "isScheduled" = EXCLUDED."isScheduled",
      "scheduleEnabled" = EXCLUDED."scheduleEnabled",
      status = EXCLUDED.status,
      "updatedAt" = CURRENT_TIMESTAMP
    RETURNING *;
  `;
    const values = [
        id,
        notification.title || '',
        notification.message || '',
        notification.scheduledDate || null,
        notification.scheduledTime || null,
        notification.isScheduled || false,
        notification.scheduleEnabled !== undefined ? notification.scheduleEnabled : true,
        notification.status || 'draft',
        notification.createdAt || new Date().toISOString(),
        new Date().toISOString()
    ];
    try {
        const result = await pool.query(query, values);
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});

app.get('/api/notifications', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM notifications ORDER BY "createdAt" DESC');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.put('/api/notifications/:id', async (req, res) => {
    const { id } = req.params;
    const updates = req.body;

    const fields = [];
    const values = [];
    let paramIndex = 1;

    if (updates.title !== undefined) {
        fields.push(`title = $${paramIndex++}`);
        values.push(updates.title);
    }
    if (updates.message !== undefined) {
        fields.push(`message = $${paramIndex++}`);
        values.push(updates.message);
    }
    if (updates.scheduledDate !== undefined) {
        fields.push(`"scheduledDate" = $${paramIndex++}`);
        values.push(updates.scheduledDate);
    }
    if (updates.scheduledTime !== undefined) {
        fields.push(`"scheduledTime" = $${paramIndex++}`);
        values.push(updates.scheduledTime);
    }
    if (updates.isScheduled !== undefined) {
        fields.push(`"isScheduled" = $${paramIndex++}`);
        values.push(updates.isScheduled);
    }
    if (updates.scheduleEnabled !== undefined) {
        fields.push(`"scheduleEnabled" = $${paramIndex++}`);
        values.push(updates.scheduleEnabled);
    }
    if (updates.status !== undefined) {
        fields.push(`status = $${paramIndex++}`);
        values.push(updates.status);
    }

    fields.push(`"updatedAt" = CURRENT_TIMESTAMP`);
    values.push(id);

    const query = `UPDATE notifications SET ${fields.join(', ')} WHERE id = $${paramIndex} RETURNING *`;

    try {
        const result = await pool.query(query, values);
        res.json(result.rows[0] || null);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});

app.delete('/api/notifications/:id', async (req, res) => {
    try {
        await pool.query('DELETE FROM notifications WHERE id = $1', [req.params.id]);
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: err.message, success: false });
    }
});

const PORT = 5000;
const server = app.listen(PORT, '0.0.0.0', () => {
    console.log(`PostgreSQL Bridge Backend running on port ${PORT}`);
});

// Force keep-alive
setInterval(() => { }, 1000);

process.on('exit', (code) => {
    console.log(`Process exiting with code: ${code}`);
});

process.on('SIGINT', () => {
    console.log('Received SIGINT. Press Control-D to exit.');
    process.exit(0);
});
