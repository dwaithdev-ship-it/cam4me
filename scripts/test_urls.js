
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, get } from 'firebase/database';

const baseConfig = {
    apiKey: "AIzaSyA9MlPuA2w86FNMaMnMrsE1vR-RQDNxdKs",
    authDomain: "cam4me-project.firebaseapp.com",
    projectId: "cam4me-project",
    storageBucket: "cam4me-project.firebasestorage.app",
    messagingSenderId: "163790979810",
    appId: "1:163790979810:web:2a0d44b844a0135c3914bb",
    measurementId: "G-84E4N912X2"
};

const urls = [
    "https://cam4me-project-default-rtdb.firebaseio.com",
    "https://cam4me-project.firebaseio.com",
    "https://cam4me-project-default-rtdb.asia-southeast1.firebasedatabase.app",
    "https://cam4me-project.asia-southeast1.firebasedatabase.app",
];

async function testUrl(url) {
    console.log(`Testing URL: ${url}`);
    const app = initializeApp({ ...baseConfig, databaseURL: url }, url); // Unique name per app
    const rtDb = getDatabase(app);
    try {
        const timeout = new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout')), 5000));
        const check = get(ref(rtDb, '.info/connected'));
        const snapshot = await Promise.race([check, timeout]);
        console.log(`URL ${url} is valid! Connection status:`, snapshot.val());
        return true;
    } catch (err) {
        console.error(`URL ${url} failed:`, err.message);
        return false;
    }
}

async function runTests() {
    for (const url of urls) {
        if (await testUrl(url)) {
            console.log('FOUND CORRECT URL:', url);
            break;
        }
    }
    process.exit(0);
}

runTests();
