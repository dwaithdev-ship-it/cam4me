import express from 'express';
import pg from 'pg';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = 5006;

app.use(cors());
app.use(express.json());

// Request Logger
app.use((req, res, next) => {
    console.log(`[Request] ${req.method} ${req.url}`);
    next();
});

// Root Route
app.get('/', (req, res) => {
    res.send('Cam4Me Server Running');
});

// PostgreSQL Pool
const pool = new pg.Pool({
    user: 'myuser',
    host: '127.0.0.1',
    database: 'cam4me',
    password: 'mypassword',
    port: 5432,
});

// Endpoints

// 1. Locations (Hierarchical)
app.get('/api/master-data/locations', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM admin_masterdata_location ORDER BY state_name, district_name, constituency_name, mandal_name');
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Database error' });
    }
});

// New Specialized Hierarchical Endpoints
app.get('/api/master-data/locations/states', async (req, res) => {
    try {
        const result = await pool.query('SELECT DISTINCT state_name FROM admin_masterdata_location ORDER BY state_name');
        res.json(result.rows.map(r => r.state_name));
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Database error' });
    }
});

app.get('/api/master-data/locations/districts', async (req, res) => {
    const { state } = req.query;
    try {
        const result = await pool.query('SELECT DISTINCT district_name FROM admin_masterdata_location WHERE state_name = $1 ORDER BY district_name', [state]);
        res.json(result.rows.map(r => r.district_name));
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Database error' });
    }
});

app.get('/api/master-data/locations/constituencies', async (req, res) => {
    const { district } = req.query;
    try {
        const result = await pool.query('SELECT DISTINCT constituency_name FROM admin_masterdata_location WHERE district_name = $1 ORDER BY constituency_name', [district]);
        res.json(result.rows.map(r => r.constituency_name));
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Database error' });
    }
});

app.get('/api/master-data/locations/mandals', async (req, res) => {
    const { constituency } = req.query;
    try {
        const result = await pool.query('SELECT DISTINCT mandal_name FROM admin_masterdata_location WHERE constituency_name = $1 ORDER BY mandal_name', [constituency]);
        res.json(result.rows.map(r => r.mandal_name));
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Database error' });
    }
});

app.post('/api/master-data/locations', async (req, res) => {
    const { state_name, district_name, constituency_name, mandal_name } = req.body;
    try {
        await pool.query(
            'INSERT INTO admin_masterdata_location (state_name, district_name, constituency_name, mandal_name) VALUES ($1, $2, $3, $4)',
            [state_name, district_name, constituency_name, mandal_name]
        );
        res.status(201).json({ message: 'Location added' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Database error' });
    }
});

// 2. Cities (Independent)
app.get('/api/master-data/cities', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM admin_masterdata_city ORDER BY name');
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Database error' });
    }
});

app.post('/api/master-data/cities', async (req, res) => {
    const { name } = req.body;
    try {
        await pool.query('INSERT INTO admin_masterdata_city (name) VALUES ($1)', [name]);
        res.status(201).json({ message: 'City added' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Database error' });
    }
});

// 3. Categories (Independent)
app.get('/api/master-data/categories', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM admin_masterdata_category ORDER BY name');
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Database error' });
    }
});

app.post('/api/master-data/categories', async (req, res) => {
    const { name } = req.body;
    try {
        await pool.query('INSERT INTO admin_masterdata_category (name) VALUES ($1)', [name]);
        res.status(201).json({ message: 'Category added' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Database error' });
    }
});

// 4. Device Management Endpoints

// Check if device exists in database
app.get('/api/device/:deviceId', async (req, res) => {
    const { deviceId } = req.params;
    try {
        const result = await pool.query('SELECT user_id FROM users WHERE device_id = $1', [deviceId]);
        if (result.rows.length > 0) {
            res.json({ exists: true, userId: result.rows[0].user_id });
        } else {
            res.json({ exists: false });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Database error' });
    }
});

// Get user by device ID
app.get('/api/user/by-device/:deviceId', async (req, res) => {
    const { deviceId } = req.params;
    try {
        const result = await pool.query('SELECT * FROM users WHERE device_id = $1', [deviceId]);
        if (result.rows.length > 0) {
            res.json(result.rows[0]);
        } else {
            res.status(404).json({ error: 'User not found for this device' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Database error' });
    }
});

// Validate device access for a user (check if device matches)
app.post('/api/user/validate-device', async (req, res) => {
    const { userId, deviceId } = req.body;
    try {
        const result = await pool.query('SELECT device_id FROM users WHERE user_id = $1', [userId]);
        if (result.rows.length > 0) {
            const storedDeviceId = result.rows[0].device_id;
            if (storedDeviceId === deviceId) {
                res.json({ valid: true, message: 'Device matches' });
            } else {
                res.json({ valid: false, message: 'Your account is locked with another device, please use that device to login.' });
            }
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Database error' });
    }
});

// Connection Test and Startup
(async () => {
    try {
        console.log('[PostgreSQL] Testing database connection...');
        const client = await pool.connect();
        console.log('[PostgreSQL] Database connection successful!');
        client.release();
    } catch (err) {
        console.warn('---------------------------------------------------------');
        console.warn('[WARNING] Database connection failed!');
        console.warn('The master-data server is running, but PostgreSQL features will not work.');
        console.warn('Check if your PostgreSQL service is running on 127.0.0.1:5432.');
        console.warn('Error Details:', err.message);
        console.warn('---------------------------------------------------------');
    } finally {
        console.log('Registered Routes:');
        if (app.router && app.router.stack) {
            app.router.stack.forEach(r => {
                if (r.route && r.route.path) {
                    console.log(r.route.path);
                }
            });
        }

        const server = app.listen(port, () => {
            console.log(`[Server] PostgreSQL bridge running at http://localhost:${port}`);
        });

        // Keep the process alive
        setInterval(() => {
            // Heartbeat
        }, 10000);
    }
})();
