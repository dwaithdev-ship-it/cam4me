import fs from 'fs';
import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const connectionString = process.env.DATABASE_URL || `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;
const pool = new pg.Pool({ connectionString });

async function importSql(filePath) {
    try {
        const sql = fs.readFileSync(filePath, 'utf8');
        console.log(`Read ${filePath} (${sql.length} bytes)`);
        // Execute as a single query. The dump uses multiple statements separated by semicolons.
        await pool.query(sql);
        console.log('✅ Import completed successfully.');
    } catch (err) {
        console.error('❌ Import failed:', err.message);
    } finally {
        await pool.end();
    }
}

const file = 'migrations/chatcam_data_only.sql';
importSql(file);
