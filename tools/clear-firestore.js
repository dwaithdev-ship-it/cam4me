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

const keyPath = './tools/serviceAccountKey.json'
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

async function clearOnlyUserData() {
  try {
    // Identify all users who have posts
    const postsSnap = await db.collection('posts').get()
    const userIdsWithPosts = new Set()
    for (const p of postsSnap.docs) {
      const pdata = p.data()
      if (pdata && pdata.userId) userIdsWithPosts.add(pdata.userId)
    }

    if (userIdsWithPosts.size === 0) {
      console.log('No posts found. Nothing to delete.')
      return
    }

    // Find user documents for those userIds, excluding allowed emails
    const toDeleteUids = []
    const usersSnap = await db.collection('users').where('__name__', 'in', Array.from(userIdsWithPosts)).get()
    for (const docRef of usersSnap.docs) {
      const data = docRef.data()
      const email = (data.email || '').toLowerCase()
      if (!ALLOWED_EMAILS.map(e => e.toLowerCase()).includes(email)) {
        toDeleteUids.push({ firebaseId: docRef.id, uid: docRef.id, email })
      }
    }

    console.log('Found', toDeleteUids.length, 'user documents to delete (they had posts)')

    // Delete posts authored by these users, and delete their user documents
    let deletedPosts = 0
    for (const u of toDeleteUids) {
      // Delete posts for this user
      const userPosts = postsSnap.docs.filter(p => p.data().userId === u.uid)
      for (const pdoc of userPosts) {
        await db.collection('posts').doc(pdoc.id).delete()
        deletedPosts++
      }

      // Delete the user document
      await db.collection('users').doc(u.firebaseId).delete()
    }

    console.log(`Deleted ${toDeleteUids.length} user docs and ${deletedPosts} posts from Firestore`)
  } catch (err) {
    console.error('Error clearing user data from Firestore:', err)
  }
}

clearOnlyUserData()
