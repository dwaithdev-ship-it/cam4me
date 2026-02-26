# Cam4me Backend Server

Node.js Express backend for Cam4me application with PostgreSQL (Neon) and ImageKit.io integration.

## Architecture

```
Mobile App → Firebase Auth → ID Token → Node.js Backend → PostgreSQL + ImageKit
```

## Setup

### 1. Install Dependencies

```bash
cd server
npm install
```

### 2. Configure Environment Variables

Create a `.env` file in the `server` directory:

```env
PORT=5000
NODE_ENV=development

# Neon PostgreSQL
DATABASE_URL=postgresql://Dwaith.devkalyan:Dwaithdevkalyan@123@ep-xxx.region.aws.neon.tech/cam4me?sslmode=require

# Firebase Admin SDK
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYOUR_KEY_HERE\n-----END PRIVATE KEY-----\n"
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxx@your-project.iam.gserviceaccount.com

# ImageKit.io
IMAGEKIT_PUBLIC_KEY=your_public_key
IMAGEKIT_PRIVATE_KEY=your_private_key
IMAGEKIT_URL_ENDPOINT=https://ik.imagekit.io/your_id

# Client URL (for CORS)
CLIENT_URL=http://localhost:5173
```

### 3. Setup Database

Run the schema SQL on your Neon PostgreSQL database:

```bash
psql $DATABASE_URL < ../schema.sql
```

### 4. Start Server

Development mode:
```bash
npm run dev
```

Production mode:
```bash
npm start
```

## API Endpoints

### Users
- `GET /api/users/me` - Get current user (auth required)
- `PUT /api/users/me` - Update current user (auth required)
- `GET /api/users` - Get all users (auth required)
- `GET /api/users/mobile/:mobile` - Get user by mobile
- `DELETE /api/users/:uid` - Delete user (auth required)

### Posts
- `POST /api/posts` - Create post with media (auth required)
- `GET /api/posts` - Get all posts
- `GET /api/posts/user/:uid` - Get user posts
- `DELETE /api/posts/:id` - Delete post (auth required)

### Ads
- `POST /api/ads` - Create ad with image (auth required)
- `GET /api/ads` - Get all ads
- `DELETE /api/ads/:id` - Delete ad (auth required)

### Feedbacks
- `POST /api/feedbacks` - Create feedback (auth required)
- `GET /api/feedbacks` - Get all feedbacks (auth required)

### Notifications
- `POST /api/notifications` - Create notification (auth required)
- `GET /api/notifications` - Get all notifications
- `PUT /api/notifications/:id` - Update notification (auth required)
- `DELETE /api/notifications/:id` - Delete notification (auth required)

### Master Data
- `GET /api/master-data` - Get master data
- `PUT /api/master-data` - Update master data (auth required)

### Health
- `GET /health` - Health check endpoint

## Authentication

All protected endpoints require a Firebase ID token in the Authorization header:

```
Authorization: Bearer <firebase-id-token>
```

## Media Upload

Images and videos are automatically uploaded to ImageKit.io when creating posts or ads. Send base64-encoded files in the request body:

```json
{
  "message": "Post message",
  "images": ["base64-encoded-image-1", "base64-encoded-image-2"],
  "videos": ["base64-encoded-video-1"]
}
```

## Project Structure

```
server/
├── src/
│   ├── config/          # Configuration files
│   │   ├── database.js  # PostgreSQL connection
│   │   ├── firebase.js  # Firebase Admin
│   │   └── imagekit.js  # ImageKit config
│   ├── middleware/      # Express middleware
│   │   ├── auth.js      # Firebase token verification
│   │   └── errorHandler.js
│   ├── routes/          # API routes
│   │   ├── users.js
│   │   ├── posts.js
│   │   ├── ads.js
│   │   ├── feedbacks.js
│   │   ├── notifications.js
│   │   └── masterData.js
│   ├── services/        # Business logic
│   │   ├── postgresService.js
│   │   └── imagekitService.js
│   └── server.js        # Entry point
├── package.json
└── .env
```

## Next Steps

1. Get Firebase Admin SDK credentials from Firebase Console
2. Get ImageKit.io credentials from ImageKit dashboard
3. Setup Neon PostgreSQL database and run schema
4. Configure `.env` file with all credentials
5. Test API endpoints with Postman
6. Update frontend to use this backend API
