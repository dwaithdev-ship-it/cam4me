import express from 'express';
import { verifyToken, isAdmin } from '../middleware/auth.js';
import { postgresService } from '../services/postgresService.js';

const router = express.Router();

// SUBMIT feedback
router.post('/', verifyToken, async (req, res) => {
    try {
        const feedback = await postgresService.createFeedback({
            user_id: req.user.id,
            message: req.body.message
        });
        res.status(201).json(feedback);
    } catch (error) {
        console.error('Submit Feedback Error:', error);
        res.status(500).json({ error: 'Failed to submit feedback' });
    }
});

// GET all feedback (Admin only)
router.get('/', verifyToken, isAdmin, async (req, res) => {
    try {
        const feedbacks = await postgresService.getAllFeedbacks();
        res.json(feedbacks);
    } catch (error) {
        console.error('Fetch Feedbacks Error:', error);
        res.status(500).json({ error: 'Failed to fetch feedbacks' });
    }
});

export default router;
