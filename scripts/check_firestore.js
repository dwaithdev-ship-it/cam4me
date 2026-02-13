
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, limit, query } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyA9MlPuA2w86FNMaMnMrsE1vR-RQDNxdKs",
    authDomain: "cam4me-project.firebaseapp.com",
    projectId: "cam4me-project",
    storageBucket: "cam4me-project.firebasestorage.app",
    messagingSenderId: "163790979810",
    appId: "1:163790979810:web:2a0d44b844a0135c3914bb",
    measurementId: "G-84E4N912X2"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function checkFirestore() {
    console.log('Checking Firestore Database...');
    const collections = ['users', 'posts', 'ads', 'notifications'];
    try {
        for (const coll of collections) {
            console.log(`Checking collection: ${coll}...`);
            const q = query(collection(db, coll), limit(1));
            const snapshot = await getDocs(q);
            console.log(`Collection ${coll}: ${snapshot.empty ? 'Empty' : 'Has data'}`);
        }
    } catch (err) {
        console.error('Firestore check failed:', err.message);
    } finally {
        process.exit(0);
    }
}
checkFirestore();
