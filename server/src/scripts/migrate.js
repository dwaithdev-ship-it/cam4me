import dotenv from 'dotenv';
import admin from 'firebase-admin';
import pg from 'pg';
import path from 'path';
import { fileURLToPath } from 'url';

// Convert current module URL to file path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables from server root
dotenv.config({ path: path.join(__dirname, '../../.env') });

const { Pool } = pg;

// Initialize Firebase Admin
if (!admin.apps.length) {
    const serviceAccount = {
        type: "service_account",
        project_id: process.env.FIREBASE_PROJECT_ID,
        private_key: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
        client_email: process.env.FIREBASE_CLIENT_EMAIL
    };

    // Use URL from .env if provided, otherwise construct default
    const dbUrl = process.env.FIREBASE_DATABASE_URL || `https://${process.env.FIREBASE_PROJECT_ID}.firebaseio.com`;

    console.log(`Connecting to Firebase Database: ${dbUrl}`);

    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL: dbUrl
    });
}

const db = admin.database();

// Initialize PostgreSQL
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

async function migrateUsers() {
    console.log('🚀 Starting User Migration...');
    const usersRef = db.ref('users');
    const snapshot = await usersRef.once('value');
    const users = snapshot.val();

    if (!users) {
        console.log('No users found in Firebase.');
        return;
    }

    const client = await pool.connect();
    let count = 0;
    let errors = 0;

    try {
        await client.query('BEGIN');

        for (const [uid, userData] of Object.entries(users)) {
            try {
                // Map Firebase user fields to PostgreSQL columns
                const query = `
                    INSERT INTO users (
                        uid, email, display_name, name, mobile, photo, 
                        village, mandal, district, state, selected_city, selected_category,
                        created_at, updated_at
                    )
                    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
                    ON CONFLICT (uid) DO UPDATE SET
                        email = EXCLUDED.email,
                        name = EXCLUDED.name,
                        mobile = EXCLUDED.mobile,
                        photo = EXCLUDED.photo,
                        updated_at = EXCLUDED.updated_at
                `;

                const values = [
                    uid,
                    userData.email || null,
                    userData.displayName || userData.name || null,
                    userData.name || null,
                    userData.mobile || null,
                    userData.photo || userData.photoURL || null,
                    userData.village || null,
                    userData.mandal || null,
                    userData.district || null,
                    userData.state || null,
                    userData.selectedCity || userData.city || null,
                    userData.selectedCategory || userData.category || null,
                    userData.createdAt ? new Date(userData.createdAt) : new Date(),
                    new Date()
                ];

                await client.query(query, values);
                count++;
                if (count % 10 === 0) process.stdout.write('.');
            } catch (err) {
                console.error(`\nError migrating user ${uid}:`, err.message);
                errors++;
            }
        }

        await client.query('COMMIT');
        console.log(`\n✅ Migration Complete!`);
        console.log(`Successfully migrated: ${count} users`);
        console.log(`Failed: ${errors} users`);

    } catch (err) {
        await client.query('ROLLBACK');
        console.error('\n❌ Migration Failed:', err);
    } finally {
        client.release();
    }
}

async function migratePosts() {
    console.log('\n🚀 Starting Post Migration...');
    // Similar logic for posts if needed
    // TODO: Implement post migration if posts exist in Firebase
}

async function checkConnection() {
    console.log('🔍 Checking Firebase connections...');

    // Check Auth
    try {
        const listUsersResult = await admin.auth().listUsers(1);
        console.log('✅ Firebase Auth connected successfully.');
        console.log(`   Found ${listUsersResult.users.length} users in Auth.`);
    } catch (error) {
        console.error('❌ Firebase Auth connection failed:', error.message);
        return false;
    }

    // Check Database
    try {
        const dbRef = db.ref('.info/connected');
        // We can't really "await" connected in admin sdk the same way, but let's try reading root
        await db.ref('/').limitToFirst(1).once('value');
        console.log('✅ Firebase Database connected successfully.');
        return true;
    } catch (error) {
        console.error('❌ Firebase Database connection failed:', error.message);
        console.error('   URL used:', admin.app().options.databaseURL);
        return false;
    }
}

async function run() {
    try {
        const connected = await checkConnection();
        if (!connected) {
            console.error('Aborting migration due to connection errors.');
            return;
        }

        await migrateUsers();
        // await migratePosts();
    } catch (err) {
        console.error('Migration script error:', err);
    } finally {
        await pool.end();
        process.exit();
    }
}

run();
