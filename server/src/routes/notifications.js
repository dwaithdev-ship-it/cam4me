import express from 'express';
import { verifyToken, isAdmin } from '../middleware/auth.js';
import { postgresService } from '../services/postgresService.js';

const router = express.Router();

// GET notifications for current user
router.get('/', verifyToken, async (req, res) => {
    try {
        const notifications = await postgresService.getUserNotifications(req.user.id);
        res.json(notifications);
    } catch (error) {
        console.error('Fetch Notifications Error:', error);
        res.status(500).json({ error: 'Failed to fetch notifications' });
    }
});

// GET all notifications (Admin only)
router.get('/all', verifyToken, isAdmin, async (req, res) => {
    try {
        const notifications = await postgresService.getAllNotifications();
        res.json(notifications);
    } catch (error) {
        console.error('Fetch All Notifications Error:', error);
        res.status(500).json({ error: 'Failed to fetch notifications' });
    }
});

// CREATE notification (Admin only)
router.post('/', verifyToken, isAdmin, async (req, res) => {
    try {
        const notification = await postgresService.createNotification(req.body);
        res.status(201).json(notification);
    } catch (error) {
        console.error('Create Notification Error:', error);
        res.status(500).json({ error: 'Failed to create notification' });
    }
});

// UPDATE notification (Admin only)
router.patch('/:id', verifyToken, isAdmin, async (req, res) => {
    try {
        const notification = await postgresService.updateNotification(req.params.id, req.body);
        res.json(notification);
    } catch (error) {
        console.error('Update Notification Error:', error);
        res.status(500).json({ error: 'Failed to update notification' });
    }
});

// DELETE notification (Admin only)
router.delete('/:id', verifyToken, isAdmin, async (req, res) => {
    try {
        await postgresService.deleteNotification(req.params.id);
        res.json({ message: 'Notification deleted successfully' });
    } catch (error) {
        console.error('Delete Notification Error:', error);
        res.status(500).json({ error: 'Failed to delete notification' });
    }
});

export default router;
