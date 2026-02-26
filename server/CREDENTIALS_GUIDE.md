# Getting Missing Credentials

## 1. Firebase Admin SDK Service Account

### Steps:
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select project: **cam4me-prod**
3. Click the gear icon ⚙️ → **Project settings**
4. Go to **Service accounts** tab
5. Click **Generate new private key**
6. Download the JSON file
7. Open the JSON file and extract:
   - `private_key` → Copy to `FIREBASE_PRIVATE_KEY` in `.env`
   - `client_email` → Copy to `FIREBASE_CLIENT_EMAIL` in `.env`

**Important**: The private key will have `\n` characters. Keep them as literal `\n` in the .env file.

## 2. ImageKit Private Key and URL Endpoint

### Steps:
1. Go to [ImageKit Dashboard](https://imagekit.io/dashboard)
2. Navigate to **Developer options** → **API keys**
3. Copy:
   - **Private key** → `IMAGEKIT_PRIVATE_KEY` in `.env`
   - **URL endpoint** → `IMAGEKIT_URL_ENDPOINT` in `.env`

## 3. Neon PostgreSQL Connection String

### Steps:
1. Go to [Neon Console](https://console.neon.tech/)
2. Login with credentials:
   - Username: Dwaith.devkalyan
   - Password: Dwaithdevkalyan@123
3. Select or create project
4. Go to **Connection Details**
5. Copy the connection string
6. Update `DATABASE_URL` in `.env`

The connection string should look like:
```
postgresql://Dwaith.devkalyan:Dwaithdevkalyan@123@ep-xxx-xxx.region.aws.neon.tech/cam4me?sslmode=require
```

## 4. Run Database Schema

Once you have the Neon connection string, run:

```bash
# From the cam4me directory
psql "YOUR_NEON_CONNECTION_STRING" < schema.sql
```

Or use Neon's SQL Editor in the web console to paste and run the schema.sql content.

## Current Status

✅ Firebase Project ID: `cam4me-prod`
✅ ImageKit Public Key: `public_r5/MbIUgcOEYGMAiNvkvCQa4x3I=`
⏳ Firebase Private Key: Needs download
⏳ Firebase Client Email: Needs download
⏳ ImageKit Private Key: Needs from dashboard
⏳ ImageKit URL Endpoint: Needs from dashboard
⏳ Neon Connection String: Needs from console
⏳ Database Schema: Needs to be run
