// Load environment variables FIRST
import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import compression from 'compression';

// Import routes
import authRoutes from './routes/auth.js';
import userRoutes from './routes/users.js';
import postRoutes from './routes/posts.js';
import adRoutes from './routes/ads.js';
import feedbackRoutes from './routes/feedbacks.js';
import notificationRoutes from './routes/notifications.js';
import masterDataRoutes from './routes/masterData.js';
import locationRoutes from './routes/locations.js';

// Import middleware
import { errorHandler } from './middleware/errorHandler.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
    origin: true, // Allow all origins in development
    credentials: true
}));

// Compress responses to reduce payload size for mobile/dev over LAN
app.use(compression());

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Request logging
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
    next();
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/ads', adRoutes);
app.use('/api/feedbacks', feedbackRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/master-data', masterDataRoutes);
app.use('/api/locations', locationRoutes);

// Health check
app.get('/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.get('/', (req, res) => {
    res.json({ message: 'ChatCam API Server - PostgreSQL Backend Ready' });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({ error: 'Route not found' });
});

// Error handling (must be last)
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`\n🚀 ChatCam Backend Ready!`);
    console.log(`📡 URL: http://localhost:${PORT}`);
    console.log(`💽 DB: Local PostgreSQL (chatcam)\n`);
});

process.on('SIGTERM', () => process.exit(0));
process.on('SIGINT', () => process.exit(0));
