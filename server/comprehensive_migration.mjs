import pg from 'pg';
const pool = new pg.Pool({ connectionString: 'postgresql://admin:admin123@localhost:5433/chatcam' });

const migrations = [
    // Users table additions
    "ALTER TABLE users ADD COLUMN IF NOT EXISTS selected_city VARCHAR(100);",
    "ALTER TABLE users ADD COLUMN IF NOT EXISTS selected_category VARCHAR(100);",
    "ALTER TABLE users ADD COLUMN IF NOT EXISTS bio TEXT;",
    "ALTER TABLE users ADD COLUMN IF NOT EXISTS state VARCHAR(100);",
    "ALTER TABLE users ADD COLUMN IF NOT EXISTS district VARCHAR(100);",
    "ALTER TABLE users ADD COLUMN IF NOT EXISTS constituency VARCHAR(100);",
    "ALTER TABLE users ADD COLUMN IF NOT EXISTS mandal VARCHAR(100);",
    "ALTER TABLE users ADD COLUMN IF NOT EXISTS village VARCHAR(100);",
    "ALTER TABLE users ADD COLUMN IF NOT EXISTS photo_url TEXT;",
    "ALTER TABLE users ADD COLUMN IF NOT EXISTS mobile VARCHAR(15);",
    "ALTER TABLE users ADD COLUMN IF NOT EXISTS setup_completed BOOLEAN DEFAULT FALSE;",
    "ALTER TABLE users ADD COLUMN IF NOT EXISTS role VARCHAR(20) DEFAULT 'user';",

    // Ads table fixes
    "ALTER TABLE ads ADD COLUMN IF NOT EXISTS run_mode VARCHAR(20) DEFAULT 'all';",
    "ALTER TABLE ads ADD COLUMN IF NOT EXISTS target_locations JSONB DEFAULT '[]';",
    "ALTER TABLE ads ADD COLUMN IF NOT EXISTS start_date DATE;",
    "ALTER TABLE ads ADD COLUMN IF NOT EXISTS end_date DATE;"
];

async function runMigrations() {
    for (const sql of migrations) {
        try {
            await pool.query(sql);
            console.log(`Success: ${sql}`);
        } catch (err) {
            console.warn(`Skipped/Failed: ${sql} - ${err.message}`);
        }
    }
}

runMigrations().then(() => {
    console.log('Migrations complete');
    pool.end();
});
