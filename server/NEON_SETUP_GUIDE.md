# Neon Database Setup - Simplified Guide

## You Already Have a Project! ✅

I can see from your screenshot that you have:
- ✅ Project: "Cam4me" 
- ✅ Branch: "production"
- ✅ Storage: 0.5GB (free tier - perfect for our needs!)

## Step 1: Get Connection String

1. In your Neon Console (where you are now), click **"Connection string"** button at the top
2. Or look for the **"Connect"** button
3. You'll see a connection string like:
   ```
   postgresql://username:password@ep-xxx-xxx.region.aws.neon.tech/neondb?sslmode=require
   ```
4. **Copy this entire string**

## Step 2: Update Backend .env

1. Open `server/.env` file
2. Replace the `DATABASE_URL` line with your copied connection string:
   ```env
   DATABASE_URL=postgresql://your-actual-connection-string-here
   ```
3. Save the file

## Step 3: Run Database Schema

You have 2 options:

### Option A: Using Neon SQL Editor (Easiest!)

1. In Neon Console, click **"SQL Editor"** in the left sidebar
2. Open the file `schema.sql` from your project folder
3. Copy ALL the content (it's a long file with CREATE TABLE statements)
4. Paste it into the Neon SQL Editor
5. Click the **"Run"** button (or press Ctrl+Enter)
6. Wait for it to complete - you should see "Success" messages

### Option B: Using Command Line

If you have PostgreSQL installed:
```bash
psql "YOUR_CONNECTION_STRING" < schema.sql
```

## Step 4: Verify Tables Created

In the SQL Editor, run this query:
```sql
SELECT table_name FROM information_schema.tables WHERE table_schema = 'public';
```

You should see 7 tables:
- users
- posts
- ads
- feedbacks
- notifications
- master_data
- sessions

## Step 5: Test Backend Server

```bash
cd server
npm run dev
```

If successful, you'll see:
```
✅ Connected to PostgreSQL database
✅ Firebase Admin initialized
✅ ImageKit initialized
🚀 Cam4me API Server
📡 Running on port 5000
```

## Troubleshooting

**"Cannot find SQL Editor"**
- Look in the left sidebar for "SQL Editor" or "Tables"
- Or click on "Branches" → "production" → "SQL Editor"

**"Database doesn't exist"**
- The default database is usually called "neondb"
- You can use that, no need to create a new one
- Just make sure your connection string points to it

**Need Help?**
Share your connection string (you can hide the password part) and I'll help you format it correctly!
