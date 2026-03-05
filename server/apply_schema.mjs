import pg from 'pg';
import fs from 'fs';
import dotenv from 'dotenv';

dotenv.config();

const connectionString = process.env.DATABASE_URL || `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;
const pool = new pg.Pool({ connectionString });

try {
    const schema = fs.readFileSync('chatcam_schema.sql', 'utf8');
    await pool.query(schema);
    console.log('✅ Schema applied successfully!');

    const res = await pool.query("SELECT table_name FROM information_schema.tables WHERE table_schema='public' ORDER BY table_name");
    console.log('Tables now:', res.rows.map(r => r.table_name));
} catch (e) {
    console.error('Error:', e.message);
} finally {
    await pool.end();
}
