import pg from 'pg';
const pool = new pg.Pool({ connectionString: 'postgresql://admin:admin123@localhost:5433/chatcam' });

try {
    const res = await pool.query("SELECT table_name FROM information_schema.tables WHERE table_schema='public'");
    console.log(JSON.stringify(res.rows.map(r => r.table_name)));
} catch (e) {
    console.error('DB Error:', e.message);
} finally {
    await pool.end();
}
