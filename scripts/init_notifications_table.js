import pg from 'pg';
const pool = new pg.Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'cam4me',
    password: 'Dwaithdevkalyan@123',
    port: 5432,
});

async function run() {
    try {
        const query = `
        CREATE TABLE IF NOT EXISTS notifications (
            id TEXT PRIMARY KEY,
            title TEXT,
            message TEXT,
            "scheduledDate" TEXT,
            "scheduledTime" TEXT,
            "isScheduled" BOOLEAN DEFAULT FALSE,
            "scheduleEnabled" BOOLEAN DEFAULT TRUE,
            status TEXT DEFAULT 'draft',
            "createdAt" TIMESTAMP,
            "updatedAt" TIMESTAMP
        );
        `;
        await pool.query(query);
        console.log("Table notifications created successfully.");
        await pool.end();
    } catch (err) {
        console.error(err);
    }
}
run();
