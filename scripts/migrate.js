
import pg from 'pg';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set } from 'firebase/database';
import dotenv from 'dotenv';

dotenv.config();

// PostgreSQL Configuration
const pgConfig = {
    user: 'postgres',
    host: 'localhost',
    database: 'cam4me',
    password: 'Dwaithdevkalyan@123',
    port: 5432,
};

// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyA9MlPuA2w86FNMaMnMrsE1vR-RQDNxdKs",
    authDomain: "cam4me-project.firebaseapp.com",
    projectId: "cam4me-project",
    databaseURL: "https://cam4me-project-default-rtdb.firebaseio.com",
    storageBucket: "cam4me-project.firebasestorage.app",
    messagingSenderId: "163790979810",
    appId: "1:163790979810:web:2a0d44b844a0135c3914bb"
};

const app = initializeApp(firebaseConfig);
const rtDb = getDatabase(app);

const pool = new pg.Pool(pgConfig);

async function migrateTable(tableName, firebasePath) {
    console.log(`Migrating ${tableName} to ${firebasePath}...`);
    try {
        const result = await pool.query(`SELECT * FROM ${tableName}`);
        const rows = result.rows;

        for (const row of rows) {
            const id = row.id || row.uid;
            if (!id) continue;

            const data = { ...row };
            if (tableName === 'ads' && typeof data.targetLocations === 'string') {
                try { data.targetLocations = JSON.parse(data.targetLocations); } catch (e) { data.targetLocations = []; }
            }
            await set(ref(rtDb, `${firebasePath}/${id}`), data);
        }
        console.log(`Successfully migrated ${rows.length} rows from ${tableName}`);
    } catch (err) {
        console.error(`Error migrating ${tableName}:`, err.message);
        throw err; // Propagate error to stop migration
    }
}

async function runMigration() {
    try {
        await migrateTable('users', 'users');
        await migrateTable('posts', 'posts');
        await migrateTable('ads', 'ads');
        await migrateTable('feedbacks', 'feedbacks');
        await migrateTable('notifications', 'notifications');
        console.log('Migration complete!');
    } catch (err) {
        console.error('Migration failed deeply:', err.message);
    } finally {
        await pool.end();
        process.exit(0);
    }
}

runMigration();
