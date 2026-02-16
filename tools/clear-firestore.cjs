/*
 * Script: clear-firestore.js
 * Purpose: Use Firebase Admin SDK to delete Firestore collections: users, posts, ads, records
 * WARNING: This permanently deletes data. Use carefully.
 * Usage:
 * 1. Place your Firebase service account JSON at tools/serviceAccountKey.json
 * 2. Install dependencies: npm install firebase-admin
 * 3. Run: node tools/clear-firestore.js
 */

const admin = require('firebase-admin')
const fs = require('fs')

const path = require('path')
const keyPath = path.join(__dirname, 'serviceAccountKey.json')
if (!fs.existsSync(keyPath)) {
  console.error('Missing service account key. Place it at tools/serviceAccountKey.json')
  process.exit(1)
}

admin.initializeApp({
  credential: admin.credential.cert(require(keyPath))
})

const db = admin.firestore()

// Edit this list to match the admin and ad-manager emails you want to KEEP
const ALLOWED_EMAILS = [
  'dwaith.dev@gmail.com'
]

async function clearAllUserData() {
  try {
    console.log('Starting Firestore cleanup...')

    // 1. Clear ALL posts
    const postsSnap = await db.collection('posts').get()
    console.log(`Deleting ${postsSnap.size} posts...`)
    for (const doc of postsSnap.docs) {
      await doc.ref.delete()
    }

    // 2. Clear users (except allowed)
    const usersSnap = await db.collection('users').get()
    let deletedUsers = 0
    console.log(`Checking ${usersSnap.size} users...`)
    for (const doc of usersSnap.docs) {
      const data = doc.data()
      const email = (data.email || '').toLowerCase()
      if (!ALLOWED_EMAILS.map(e => e.toLowerCase()).includes(email)) {
        await doc.ref.delete()
        deletedUsers++
      }
    }

    console.log(`Cleanup finished. Deleted ${postsSnap.size} posts and ${deletedUsers} users from Firestore.`)
  } catch (err) {
    console.error('Error clearing Firestore data:', err)
  }
}

clearAllUserData()
