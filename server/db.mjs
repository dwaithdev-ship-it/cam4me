import dotenv from 'dotenv';
import pg from 'pg';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '.env') });

export function getConnectionString() {
    const envUrl = process.env.DATABASE_URL?.trim();
    if (envUrl) return envUrl;

    const user = process.env.DB_USER || 'admin';
    const password = process.env.DB_PASSWORD || 'admin123';
    const host = process.env.DB_HOST || 'localhost';
    const port = process.env.DB_PORT || '5433';
    const name = process.env.DB_NAME || 'chatcam';
    return `postgresql://${user}:${password}@${host}:${port}/${name}`;
}

export function createPool() {
    const connectionString = getConnectionString();
    const isLocal = /localhost|127\.0\.0\.1/i.test(connectionString);
    const sslFlag = process.env.DB_SSL || process.env.DATABASE_SSL || '';
    const wantsSsl = /sslmode=require/i.test(connectionString) || /^(true|1|yes|require)$/i.test(sslFlag);
    return new pg.Pool({
        connectionString,
        ssl: isLocal || !wantsSsl ? false : { rejectUnauthorized: false },
        connectionTimeoutMillis: 5000
    });
}
