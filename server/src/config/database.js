import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pg;

const isProduction = process.env.NODE_ENV === 'production';

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    // Limit connections and set sensible timeouts
    max: parseInt(process.env.DB_MAX_CONN || '20', 10),
    idleTimeoutMillis: parseInt(process.env.DB_IDLE_TIMEOUT_MS || '30000', 10),
    // Disable SSL for local development
    ssl: isProduction ? { rejectUnauthorized: false } : false
});

let _dbConnectedLogged = false;
pool.on('connect', () => {
    if (!_dbConnectedLogged) {
        console.log(`✅ Connected to PostgreSQL database: ${process.env.DB_NAME || 'chatcam'}`);
        _dbConnectedLogged = true;
    }
});

pool.on('error', (err) => {
    console.error('❌ PostgreSQL pool error:', err);
    process.exit(-1);
});

export default pool;
