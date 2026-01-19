
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, get } from 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyA9MlPuA2w86FNMaMnMrsE1vR-RQDNxdKs",
    authDomain: "cam4me-project.firebaseapp.com",
    projectId: "cam4me-project",
    databaseURL: "https://cam4me-project-default-rtdb.firebaseio.com",
    storageBucket: "cam4me-project.firebasestorage.app",
    messagingSenderId: "163790979810",
    appId: "1:163790979810:web:2a0d44b844a0135c3914bb",
    measurementId: "G-84E4N912X2"
};

const app = initializeApp(firebaseConfig);
const rtDb = getDatabase(app);

async function checkFirebase() {
    console.log('Checking Firebase Realtime Database...');
    try {
        const snapshot = await get(ref(rtDb, '/'));
        if (snapshot.exists()) {
            console.log('Data found in Firebase:');
            const data = snapshot.val();
            for (const key in data) {
                console.log(`- ${key}: ${Object.keys(data[key]).length} items`);
            }
        } else {
            console.log('No data found in Firebase root.');
        }
    } catch (err) {
        console.error('Firebase check failed:', err.message);
    } finally {
        process.exit(0);
    }
}
checkFirebase();
