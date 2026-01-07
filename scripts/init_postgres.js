
import pg from 'pg';
const { Client } = pg;

const config = {
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: 'Dwaithdevkalyan@123',
    port: 5432,
};

async function init() {
    const client = new Client(config);
    try {
        await client.connect();

        try {
            await client.query('CREATE DATABASE cam4me');
        } catch (err) {
            if (err.code !== '42P04') throw err;
        }
        await client.end();

        const dbClient = new Client({ ...config, database: 'cam4me' });
        await dbClient.connect();

        await dbClient.query('DROP TABLE IF EXISTS feedbacks, ads, posts, users CASCADE');

        const queries = [
            `CREATE TABLE users (
                uid TEXT PRIMARY KEY,
                email TEXT,
                name TEXT,
                photo TEXT,
                mobile TEXT,
                village TEXT,
                mandal TEXT,
                district TEXT,
                state TEXT,
                "setupCompleted" BOOLEAN DEFAULT FALSE,
                "termsAccepted" BOOLEAN DEFAULT FALSE,
                "selectedCity" TEXT,
                "selectedCategory" TEXT,
                "lastScreen" TEXT,
                "lastUpdated" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )`,
            `CREATE TABLE posts (
                id TEXT PRIMARY KEY,
                "userId" TEXT,
                "userName" TEXT,
                "userPhoto" TEXT,
                message TEXT,
                "postImage" TEXT,
                village TEXT,
                district TEXT,
                state TEXT,
                timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )`,
            `CREATE TABLE ads (
                id TEXT PRIMARY KEY,
                image TEXT,
                text TEXT,
                link TEXT,
                "startDate" TEXT,
                "endDate" TEXT,
                "targetLocations" JSONB,
                "runMode" TEXT DEFAULT 'all',
                timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )`,
            `CREATE TABLE feedbacks (
                id TEXT PRIMARY KEY,
                "userId" TEXT,
                "userEmail" TEXT,
                "userName" TEXT,
                message TEXT,
                timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )`
        ];

        for (const query of queries) {
            await dbClient.query(query);
            console.log('Created table');
        }

        console.log('Seeding admin data...');
        await dbClient.query('INSERT INTO users (uid, email, name, "setupCompleted") VALUES ($1, $2, $3, $4)',
            ['admin_1', 'dwaith.dev@gmail.com', 'Dwaith Dev', true]);

        console.log('PostgreSQL Schema initialized successfully.');
        await dbClient.end();
    } catch (err) {
        console.error('Error:', err);
        process.exit(1);
    }
}

init();
