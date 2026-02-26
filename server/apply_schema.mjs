import pg from 'pg';
import fs from 'fs';

const pool = new pg.Pool({ connectionString: 'postgresql://admin:admin123@localhost:5433/chatcam' });

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
