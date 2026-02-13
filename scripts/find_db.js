
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, get } from 'firebase/database';

const firebaseConfig = {
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
    "https://cam4me-34dc5-default-rtdb.europe-west1.firebasedatabase.app"
];

async function test() {
    for (const url of urls) {
        console.log(`Testing ${url}...`);
        const app = initializeApp({ ...firebaseConfig, databaseURL: url }, url);
        const db = getDatabase(app);
        try {
            const timeout = new Promise((_, rej) => setTimeout(rej, 3000, 'Timeout'));
            await Promise.race([get(ref(db, '.info/connected')), timeout]);
            console.log(`Match found: ${url}`);
            process.exit(0);
        } catch (e) {
            console.log(`Failed: ${url} (${e})`);
        }
    }
    console.log('No URL matched.');
    process.exit(1);
}
test();
