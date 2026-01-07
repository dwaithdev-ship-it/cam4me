const admin = require('firebase-admin');
const path = require('path');

async function main() {
  const [,, serviceAccountPath, email, newPassword] = process.argv;

  if (!serviceAccountPath || !email || !newPassword) {
    console.error('Usage: node scripts/set_user_password.cjs <serviceAccountKey.json> <email> <newPassword>');
    process.exit(1);
  }

  const fullPath = path.isAbsolute(serviceAccountPath) ? serviceAccountPath : path.join(process.cwd(), serviceAccountPath);

  try {
    const serviceAccount = require(fullPath);
    admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });

    const user = await admin.auth().getUserByEmail(email);
    await admin.auth().updateUser(user.uid, { password: newPassword });
    console.log(`Password for ${email} set successfully (uid: ${user.uid}).`);
    process.exit(0);
  } catch (err) {
    console.error('Error setting password:', err);
    process.exit(2);
  }
}

main();
