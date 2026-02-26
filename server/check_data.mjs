import pg from 'pg';
const pool = new pg.Pool({ connectionString: 'postgresql://admin:admin123@localhost:5433/chatcam' });

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
