import pg from 'pg';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load env vars
dotenv.config({ path: path.join(__dirname, '../../.env') });

const { Pool } = pg;

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

async function applySchema() {
    try {
        const schemaPath = path.join(__dirname, '../../location_schema.sql');
        const schemaSql = fs.readFileSync(schemaPath, 'utf8');

        console.log('🚀 Applying Location Schema...');
        await pool.query(schemaSql);
        console.log('✅ Schema applied successfully!');

    } catch (error) {
        console.error('❌ Error applying schema:', error);
    } finally {
        await pool.end();
    }
}

applySchema();
