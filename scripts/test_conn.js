
import pg from 'pg';
const pool = new pg.Pool({
    user: 'postgres',
    host: '192.168.29.122',
    database: 'cam4me',
    password: 'Dwaithdevkalyan@123',
    port: 5432,
});

async function test() {
    console.log('Testing connection to 192.168.29.122...');
    try {
        const res = await pool.query('SELECT NOW()');
        console.log('Connection successful! Server time:', res.rows[0].now);

        const tables = await pool.query("SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'");
        console.log('Tables found:', tables.rows.map(r => r.table_name));
    } catch (err) {
        console.error('Connection failed:', err.message);
    } finally {
        await pool.end();
    }
}
test();
