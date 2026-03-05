import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const connectionString = process.env.DATABASE_URL || `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;
const pool = new pg.Pool({ connectionString });

try {
    const categories = await pool.query("SELECT * FROM admin_masterdata_category");
    console.log('Categories Count:', categories.rows.length);
    console.log('Categories:', categories.rows.slice(0, 5));

    const cities = await pool.query("SELECT * FROM admin_masterdata_city");
    console.log('Cities Count:', cities.rows.length);

    const ads = await pool.query("SELECT * FROM ads");
    console.log('Ads Count:', ads.rows.length);
} catch (e) {
    console.error('DB Error:', e.message);
} finally {
    await pool.end();
}
