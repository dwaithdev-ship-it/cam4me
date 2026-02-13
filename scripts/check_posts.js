
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, get } from 'firebase/database';

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

async function checkPosts() {
    console.log('Checking Posts in Firebase...');
    try {
        const snapshot = await get(ref(rtDb, 'posts'));
        if (snapshot.exists()) {
            const posts = snapshot.val();
            for (const id in posts) {
                console.log(`Post ${id}: timestamp=${posts[id].timestamp}`);
            }
        } else {
            console.log('No posts found.');
        }
    } catch (err) {
        console.error('Check failed:', err.message);
    } finally {
        process.exit(0);
    }
}
checkPosts();
