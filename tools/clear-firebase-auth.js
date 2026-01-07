/*
 * Script: clear-firebase-auth.js
 * Purpose: Use Firebase Admin SDK to delete all authentication users.
 * WARNING: This permanently deletes all accounts. Use carefully.
 * Usage:
 * 1. Place your Firebase service account JSON at tools/serviceAccountKey.json
 * 2. Install dependencies: npm install firebase-admin
 * 3. Run: node tools/clear-firebase-auth.js
 */

const admin = require('firebase-admin')
const fs = require('fs')

// Edit this list to match the admin and ad-manager emails you want to KEEP
const ALLOWED_EMAILS = [
  'dwaith.dev@gmail.com'
]

const keyPath = './tools/serviceAccountKey.json'
if (!fs.existsSync(keyPath)) {
  console.error('Missing service account key. Place it at tools/serviceAccountKey.json')
  process.exit(1)
}

admin.initializeApp({
  credential: admin.credential.cert(require(keyPath))
})

async function deleteNonAllowedAuthUsers() {
  try {
    let nextPageToken = undefined
    let totalDeleted = 0
    do {
      const listUsersResult = await admin.auth().listUsers(1000, nextPageToken)
      const toDelete = []
      for (const u of listUsersResult.users) {
        const email = u.email || ''
        if (!ALLOWED_EMAILS.includes(email)) {
          toDelete.push(u.uid)
        }
      }

      if (toDelete.length > 0) {
        const res = await admin.auth().deleteUsers(toDelete)
        totalDeleted += res.successCount
        console.log(`Deleted ${res.successCount} users, failed: ${res.failureCount}`)
        if (res.failureCount > 0) console.error(res.errors)
      }

      nextPageToken = listUsersResult.pageToken
    } while (nextPageToken)

    console.log(`Finished. Total auth accounts deleted: ${totalDeleted}`)
  } catch (err) {
    console.error('Error deleting auth users:', err)
  }
}

deleteNonAllowedAuthUsers()

