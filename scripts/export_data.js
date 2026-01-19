
import pg from 'pg';
import fs from 'fs';
import path from 'path';

const pool = new pg.Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'cam4me',
    password: 'Dwaithdevkalyan@123',
    port: 5432,
});

async function exportTable(tableName) {
    try {
        const res = await pool.query(`SELECT * FROM ${tableName}`);
        const filePath = path.join('c:/Users/home/projects/cam4me/scripts', `${tableName}.json`);
        fs.writeFileSync(filePath, JSON.stringify(res.rows, null, 2));
        console.log(`Successfully exported ${tableName} to ${filePath}`);
    } catch (err) {
        console.error(`Error exporting ${tableName}:`, err.message);
    }
}

async function run() {
    const tables = ['users', 'posts', 'ads', 'feedbacks', 'notifications'];
    for (const table of tables) {
        await exportTable(table);
    }
    await pool.end();
}

run();
