import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const targetDb = process.env.DB_NAME || 'chatcam';
const adminConn = `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/postgres`;
const pool = new pg.Pool({ connectionString: adminConn });

async function ensureDatabase() {
    try {
        const res = await pool.query('SELECT 1 FROM pg_database WHERE datname = $1', [targetDb]);
        if (res.rowCount === 0) {
            console.log(`Database ${targetDb} not found. Creating...`);
            await pool.query(`CREATE DATABASE "${targetDb}"`);
            console.log(`✅ Created database ${targetDb}`);
        } else {
            console.log(`✅ Database ${targetDb} already exists`);
        }
    } catch (err) {
        console.error('Error checking/creating database:', err.message);
        process.exit(1);
    } finally {
        await pool.end();
    }
}

ensureDatabase();
