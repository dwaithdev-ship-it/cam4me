
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, get } from 'firebase/database';

const baseConfig = {
    apiKey: "AIzaSyBqKGvLw0c9-TkBy0vYH8cPjmEAdAKYxcQ",
    authDomain: "cam4me-34dc5.firebaseapp.com",
    projectId: "cam4me-34dc5",
    storageBucket: "cam4me-34dc5.firebasestorage.app",
    messagingSenderId: "323324365264",
    appId: "1:323324365264:web:d17acad5c495b83e27d1d5"
};

const urls = [
    "https://cam4me-34dc5-default-rtdb.firebaseio.com",
    "https://cam4me-34dc5.firebaseio.com",
    "https://cam4me-34dc5-default-rtdb.asia-southeast1.firebasedatabase.app",
    "https://cam4me-34dc5.asia-southeast1.firebasedatabase.app",
];

async function testUrl(url) {
    console.log(`Testing URL: ${url}`);
    const app = initializeApp({ ...baseConfig, databaseURL: url }, url);
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
