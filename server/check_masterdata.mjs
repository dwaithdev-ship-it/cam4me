import pg from 'pg';
import dotenv from 'dotenv';
dotenv.config();
const connectionString = process.env.DATABASE_URL || `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;
const pool = new pg.Pool({ connectionString });
(async () => {
  try {
    const a = await pool.query('SELECT COUNT(*) FROM admin_masterdata_location');
    const b = await pool.query('SELECT COUNT(*) FROM admin_masterdata_city');
    console.log('locations:', a.rows[0].count, 'cities:', b.rows[0].count);
  } catch (err) {
    console.error('Check failed:', err.message);
  } finally { await pool.end(); }
})();
