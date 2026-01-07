
import pg from 'pg';
const pool = new pg.Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'cam4me',
    password: 'Dwaithdevkalyan@123',
    port: 5432,
});

async function check() {
    try {
        const res = await pool.query('SELECT tablename FROM pg_catalog.pg_tables WHERE schemaname = \'public\'');
        console.log('Tables:', res.rows.map(r => r.tablename));

        for (const table of res.rows.map(r => r.tablename)) {
            const count = await pool.query(`SELECT COUNT(*) FROM ${table}`);
            console.log(`Table ${table} has ${count.rows[0].count} rows`);
            if (table === 'users') {
                const users = await pool.query('SELECT uid, email, name FROM users LIMIT 5');
                console.log('Sample users:', users.rows);
            }
        }
        await pool.end();
    } catch (err) {
        console.error('Error checking DB:', err);
    }
}
check();
